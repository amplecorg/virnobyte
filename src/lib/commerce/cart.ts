import { randomBytes } from 'node:crypto';
import type { AstroCookies } from 'astro';
import { all, get, run } from '../db';
import { hydrateProduct, type Product } from '../data';
import { resolveImage } from '../images';
import type { User } from '../auth';
import { getPaymentConfig } from './payments';
import { clampQty, computeTotals, MAX_QTY, type Line, type Totals } from './pricing';
import { availableFor } from '../inventory/stock';

/**
 * Server-side cart.
 *
 * - The browser holds only an opaque, httpOnly token (`vb_cart`); contents live in SQLite.
 * - `vb_cart_n` is a readable unit count used by the header badge. Public pages are
 *   CDN-cached, so cart state is never rendered into shared HTML.
 * - Lines store product + quantity only. Prices are read from `products` on every view,
 *   so a shopper can never check out at a stale or tampered price.
 */
export const CART_COOKIE = 'vb_cart';
export const CART_COUNT_COOKIE = 'vb_cart_n';
const CART_DAYS = 30;

interface CartRow {
  id: number;
  token: string;
  user_id: number | null;
}

export interface CartView {
  cartId: number | null;
  lines: Line[];
  totals: Totals;
  /** Units in the cart including unavailable lines (header badge). */
  count: number;
  hasUnavailable: boolean;
}

export class CartError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export function productImageUrl(p: Pick<Product, 'image' | 'images'>): string {
  const key = (Array.isArray(p.images) && p.images[0]) || p.image || '';
  const res = resolveImage(key);
  return res.kind === 'upload' ? res.src : res.meta.src;
}

export function buildLine(p: Product, quantity: number): Line {
  const unitPrice = Math.max(0, Math.round(Number(p.price) || 0));
  const mrp = Math.max(unitPrice, Math.round(Number(p.mrp) || 0));
  const wanted = clampQty(quantity);
  // Inventory-tracked products sell only what the sources hold right now.
  const live = availableFor(p.id);
  const maxQty = live == null ? MAX_QTY : Math.min(MAX_QTY, live);
  const qty = live != null && live > 0 ? Math.min(wanted, live) : wanted;
  const stockNote =
    live != null && live > 0 && wanted > live
      ? `Only ${live} left — quantity lowered to ${live}`
      : live != null && live > 0 && live <= 3
        ? `Only ${live} left`
        : '';
  const unavailableReason = !unitPrice
    ? 'Price on request — contact us to order'
    : !p.in_stock || live === 0
      ? 'Currently out of stock'
      : '';
  return {
    productId: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    image: productImageUrl(p),
    quantity: qty,
    unitPrice,
    mrp,
    lineTotal: unitPrice * qty,
    available: !unavailableReason,
    unavailableReason,
    maxQty: Math.max(1, maxQty),
    stockNote: unavailableReason ? '' : stockNote,
  };
}

export function viewOf(cartId: number | null, lines: Line[]): CartView {
  const cfg = getPaymentConfig();
  return {
    cartId,
    lines,
    totals: computeTotals(lines, cfg),
    count: lines.reduce((n, l) => n + l.quantity, 0),
    hasUnavailable: lines.some((l) => !l.available),
  };
}

function setCartCookie(cookies: AstroCookies, token: string, secure: boolean) {
  cookies.set(CART_COOKIE, token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure,
    maxAge: CART_DAYS * 86400,
  });
}

export function syncCountCookie(cookies: AstroCookies, count: number, secure: boolean) {
  if (count > 0) {
    cookies.set(CART_COUNT_COOKIE, String(count), { path: '/', sameSite: 'lax', secure, maxAge: CART_DAYS * 86400 });
  } else if (cookies.has(CART_COUNT_COOKIE)) {
    cookies.delete(CART_COUNT_COOKIE, { path: '/' });
  }
}

/** Folds every other cart owned by this user into `target` (e.g. phone cart + laptop cart). */
function mergeUserCarts(target: CartRow, userId: number) {
  const others = all<CartRow>('SELECT id, token, user_id FROM carts WHERE user_id = ? AND id != ?', userId, target.id);
  for (const o of others) {
    run(
      `INSERT INTO cart_items (cart_id, product_id, quantity)
       SELECT ?, product_id, quantity FROM cart_items WHERE cart_id = ?
       ON CONFLICT(cart_id, product_id) DO UPDATE SET quantity = MIN(?, quantity + excluded.quantity)`,
      target.id,
      o.id,
      MAX_QTY,
    );
    run('DELETE FROM carts WHERE id = ?', o.id);
  }
}

/** Finds the caller's cart without creating one. Claims a guest cart on sign-in. */
function findCart(cookies: AstroCookies, user: User | null, secure: boolean): CartRow | undefined {
  const token = cookies.get(CART_COOKIE)?.value;
  let cart = token ? get<CartRow>('SELECT id, token, user_id FROM carts WHERE token = ?', token) : undefined;

  // A cart that belongs to an account is only visible while that account is signed in.
  if (cart && cart.user_id != null && cart.user_id !== user?.id) cart = undefined;

  if (user) {
    if (cart && cart.user_id == null) {
      run('UPDATE carts SET user_id = ? WHERE id = ?', user.id, cart.id);
      cart.user_id = user.id;
    }
    if (cart) {
      mergeUserCarts(cart, user.id);
    } else {
      cart = get<CartRow>('SELECT id, token, user_id FROM carts WHERE user_id = ? ORDER BY updated_at DESC, id DESC LIMIT 1', user.id);
      if (cart) setCartCookie(cookies, cart.token, secure);
    }
  }
  return cart;
}

function ensureCart(cookies: AstroCookies, user: User | null, secure: boolean): CartRow {
  const existing = findCart(cookies, user, secure);
  if (existing) return existing;
  const token = randomBytes(24).toString('base64url');
  const res = run('INSERT INTO carts (token, user_id) VALUES (?, ?)', token, user?.id ?? null);
  const id = Number(res.lastInsertRowid);
  if (!id) throw new CartError('The cart is unavailable right now. Please try again.', 503);
  setCartCookie(cookies, token, secure);
  // Housekeeping: abandoned guest carts older than the cookie lifetime.
  run(`DELETE FROM carts WHERE user_id IS NULL AND updated_at < datetime('now', '-${CART_DAYS} days')`);
  return { id, token, user_id: user?.id ?? null };
}

function loadLines(cartId: number): Line[] {
  // Products that were unpublished or deleted disappear from the cart.
  run('DELETE FROM cart_items WHERE cart_id = ? AND product_id NOT IN (SELECT id FROM products WHERE published = 1)', cartId);
  const rows = all<any>(
    `SELECT p.*, ci.quantity AS cart_qty FROM cart_items ci
     JOIN products p ON p.id = ci.product_id
     WHERE ci.cart_id = ? ORDER BY ci.id`,
    cartId,
  );
  return rows.map((r) => buildLine(hydrateProduct(r), r.cart_qty));
}

const touch = (cartId: number) => run("UPDATE carts SET updated_at = datetime('now') WHERE id = ?", cartId);

export function getCart(cookies: AstroCookies, user: User | null, secure: boolean): CartView {
  const cart = findCart(cookies, user, secure);
  const view = viewOf(cart?.id ?? null, cart ? loadLines(cart.id) : []);
  syncCountCookie(cookies, view.count, secure);
  return view;
}

export function addToCart(cookies: AstroCookies, user: User | null, secure: boolean, slug: string, quantity = 1): CartView {
  const row = get<any>('SELECT * FROM products WHERE slug = ? AND published = 1', String(slug || ''));
  if (!row) throw new CartError('This product is no longer available.', 404);
  const line = buildLine(hydrateProduct(row), 1);
  if (!line.available) throw new CartError(line.unavailableReason);

  const cart = ensureCart(cookies, user, secure);
  run(
    `INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)
     ON CONFLICT(cart_id, product_id) DO UPDATE SET quantity = MIN(?, quantity + excluded.quantity)`,
    cart.id,
    row.id,
    clampQty(quantity),
    MAX_QTY,
  );
  touch(cart.id);
  return getCart(cookies, user, secure);
}

export function setCartQuantity(cookies: AstroCookies, user: User | null, secure: boolean, productId: number, quantity: number): CartView {
  const cart = findCart(cookies, user, secure);
  if (cart) {
    if (Math.floor(Number(quantity)) <= 0) {
      run('DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?', cart.id, productId);
    } else {
      run('UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?', clampQty(quantity), cart.id, productId);
    }
    touch(cart.id);
  }
  return getCart(cookies, user, secure);
}

export function removeFromCart(cookies: AstroCookies, user: User | null, secure: boolean, productId: number): CartView {
  return setCartQuantity(cookies, user, secure, productId, 0);
}

export function clearCart(cookies: AstroCookies, user: User | null, secure: boolean): CartView {
  const cart = findCart(cookies, user, secure);
  if (cart) run('DELETE FROM cart_items WHERE cart_id = ?', cart.id);
  return getCart(cookies, user, secure);
}

/** Used after an order is placed or paid, where no browser cookies are in reach (e.g. a webhook). */
export function emptyCartById(cartId: number | null | undefined) {
  if (cartId) run('DELETE FROM cart_items WHERE cart_id = ?', cartId);
}
