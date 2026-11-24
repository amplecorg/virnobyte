import { randomBytes } from 'node:crypto';
import { all, db, get, txImmediate } from '../db';
import { emptyCartById } from './cart';
import type { Line, Totals } from './pricing';
import { ensureInvoiceNumber } from './invoice';
import { afterOrderPlaced, reconcileOrderStock, reserveForOrder, type OrderLineForStock } from '../inventory/stock';
import { codOtpEnabled } from './otp';
import { spendCoinsForOrder } from './coins';
import { activatePaidMembership } from './membership-checkout';

/**
 * Orders are immutable snapshots: one `orders` row + one `order_items` row per line,
 * priced at the moment of checkout.
 *
 * Lifecycle
 *   COD:    order_status CONFIRMED,       payment_status COD_PENDING
 *   Online: order_status PENDING_PAYMENT, payment_status PENDING
 *           → markOrderPaid() → CONFIRMED / PAID   (browser callback or webhook, whichever lands first)
 */
export interface CustomerInput {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  addressLine1: string;
  addressLine2: string;
  pincode: string;
  city: string;
  state: string;
  addressType: string;
  notes: string;
  /** Optional, for a business (B2B) tax invoice. */
  customerCompany: string;
  customerGstin: string;
}

export interface OrderRow {
  id: number;
  order_id: string;
  user_id: number | null;
  cart_id: number | null;
  product_name: string;
  quantity: number;
  items_count: number;
  subtotal: number;
  discount: number;
  delivery_fee: number;
  total_amount: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  address_line1: string;
  address_line2: string;
  pincode: string;
  city: string;
  state: string;
  payment_method: string;
  payment_status: string;
  order_status: string;
  gateway: string;
  gateway_order_id: string;
  gateway_payment_id: string;
  invoice_no: string;
  invoice_date: string | null;
  customer_company: string;
  customer_gstin: string;
  paid_at: string | null;
  created_at: string;
  coins_used: number;
  coin_discount: number;
  kind: string;
  membership_id: number | null;
}

export interface OrderItemRow {
  product_slug: string;
  product_name: string;
  image: string;
  quantity: number;
  unit_price: number;
  mrp: number;
  line_total: number;
  hsn: string;
  gst_rate: number;
}

const clean = (v: unknown, max: number) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

/** Normalises and validates the delivery form. Returns either a clean customer or a message for the shopper. */
export function validateCustomer(input: Record<string, unknown>): { ok: true; customer: CustomerInput } | { ok: false; error: string } {
  const digits = String(input.customerPhone ?? '').replace(/\D/g, '');
  const phone = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits.length === 11 && digits.startsWith('0') ? digits.slice(1) : digits;
  const customer: CustomerInput = {
    customerName: clean(input.customerName, 80),
    customerPhone: phone,
    customerEmail: clean(input.customerEmail, 120).toLowerCase(),
    addressLine1: clean(input.addressLine1, 200),
    addressLine2: clean(input.addressLine2, 200),
    pincode: String(input.pincode ?? '').replace(/\D/g, ''),
    city: clean(input.city, 80) || 'Pune',
    state: clean(input.state, 80) || 'Maharashtra',
    addressType: input.addressType === 'Work' ? 'Work' : 'Home',
    notes: clean(input.notes, 500),
    customerCompany: clean(input.customerCompany, 120),
    customerGstin: String(input.customerGstin ?? '').toUpperCase().replace(/\s+/g, '').slice(0, 15),
  };
  if (customer.customerName.length < 2) return { ok: false, error: 'Please enter your full name.' };
  if (!/^[6-9]\d{9}$/.test(customer.customerPhone)) return { ok: false, error: 'Please enter a valid 10-digit mobile number.' };
  if (!/^[1-9]\d{5}$/.test(customer.pincode)) return { ok: false, error: 'Please enter a valid 6-digit pincode.' };
  if (customer.addressLine1.length < 5) return { ok: false, error: 'Please enter your house / flat and building.' };
  if (customer.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.customerEmail)) return { ok: false, error: 'Please check the email address.' };
  if (customer.customerGstin && !/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(customer.customerGstin)) {
    return { ok: false, error: 'Please check the GSTIN — it should be 15 characters, e.g. 27AAMCV1703G1ZD.' };
  }
  if (customer.customerGstin && !customer.customerCompany) return { ok: false, error: 'Please enter the registered business name for the GST invoice.' };
  return { ok: true, customer };
}

/** e.g. VB-261115-K7Q2M9XD — date for humans, 40 random bits so order pages cannot be guessed. */
function newOrderRef() {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const rand = [...randomBytes(8)].map((b) => alphabet[b % alphabet.length]).join('');
  return `VB-${ymd}-${rand}`;
}

export function createOrder(input: {
  lines: Line[];
  totals: Totals;
  customer: CustomerInput;
  paymentMethod: 'cod' | 'online';
  gateway: string;
  userId: number | null;
  cartId: number | null;
  /** Virno Coins put towards this order (already checked with coinQuote). */
  coins?: { coins: number; discount: number };
}): OrderRow {
  const d = db();
  if (!d) throw new Error('Orders are unavailable right now. Please call us to place your order.');
  const lines = input.lines.filter((l) => l.available);
  if (!lines.length) throw new Error('There is nothing to order.');

  const { customer: c, totals } = input;
  const cod = input.paymentMethod === 'cod';
  // COD orders wait for the customer's OTP before they are confirmed (Admin → Settings can switch this off).
  const needsOtp = cod && codOtpEnabled();
  const coinsUsed = input.userId && input.coins && input.coins.coins > 0 ? input.coins : { coins: 0, discount: 0 };
  const payable = Math.max(1, totals.total - coinsUsed.discount);
  const orderRef = newOrderRef();
  const first = lines[0];
  // Legacy single-product columns stay filled so the admin list reads naturally.
  const summary = lines.map((l) => (l.quantity > 1 ? `${l.name} × ${l.quantity}` : l.name)).join(' + ').slice(0, 250);

  // Statements are prepared directly (not via run()) so any failure rolls the whole order back.
  // IMMEDIATE takes the write lock first, so the stock check below cannot race another checkout.
  let orderDbId = 0;
  txImmediate(() => {
    const res = d
      .prepare(
        `INSERT INTO orders (
          order_id, product_id, product_name, product_slug, quantity, unit_price, mrp,
          discount, delivery_fee, total_amount, subtotal, items_count,
          customer_name, customer_phone, customer_email,
          address_line1, address_line2, pincode, city, state, address_type,
          payment_method, payment_status, order_status, gateway, notes, user_id, cart_id,
          customer_company, customer_gstin, coins_used, coin_discount
        ) VALUES (?,?,?,?,?,?,?, ?,?,?,?,?, ?,?,?, ?,?,?,?,?,?, ?,?,?,?,?,?,?, ?,?,?,?)`,
      )
      .run(
        orderRef, first.productId, summary, first.slug, totals.itemCount, first.unitPrice, first.mrp,
        totals.discount, totals.deliveryFee, payable, totals.subtotal, lines.length,
        c.customerName, c.customerPhone, c.customerEmail,
        c.addressLine1, c.addressLine2, c.pincode, c.city, c.state, c.addressType,
        cod ? 'cod' : input.gateway, cod ? 'COD_PENDING' : 'PENDING', cod ? (needsOtp ? 'AWAITING_OTP' : 'CONFIRMED') : 'PENDING_PAYMENT',
        cod ? '' : input.gateway, c.notes, input.userId, input.cartId,
        c.customerCompany, c.customerGstin, coinsUsed.coins, coinsUsed.discount,
      );
    orderDbId = Number(res.lastInsertRowid);
    // Coins leave the balance with the order (refunded automatically if it never completes).
    if (input.userId && coinsUsed.coins) spendCoinsForOrder(input.userId, coinsUsed.coins, orderRef);
    const item = d.prepare(
      `INSERT INTO order_items (order_id, product_id, product_slug, product_name, image, quantity, unit_price, mrp, line_total, hsn, gst_rate)
       VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    );
    // HSN and GST rate are snapshotted so later catalogue edits never change an issued invoice.
    const taxOf = d.prepare('SELECT hsn, gst_rate FROM products WHERE id = ?');
    const stockLines: OrderLineForStock[] = [];
    for (const l of lines) {
      const t = (taxOf.get(l.productId) as { hsn: string; gst_rate: number } | undefined) ?? { hsn: '', gst_rate: 0 };
      const r = item.run(orderDbId, l.productId, l.slug, l.name, l.image, l.quantity, l.unitPrice, l.mrp, l.lineTotal, t.hsn || '', t.gst_rate || 0);
      stockLines.push({ itemId: Number(r.lastInsertRowid), productId: l.productId, qty: l.quantity, name: l.name });
    }
    // Dropship inventory: reserve units at a source (throws StockError, rolling back, if someone else got them first).
    // Only a confirmed COD order is sent to vendors; one waiting for its OTP just holds the stock.
    reserveForOrder(orderDbId, stockLines, cod && !needsOtp);
  });
  afterOrderPlaced(orderDbId);

  // A confirmed COD order is final now; OTP and online orders keep the cart until confirmed / paid.
  if (cod && !needsOtp) {
    emptyCartById(input.cartId);
    ensureInvoiceNumber(orderRef);
  }
  return getOrder(orderRef)!;
}

export const getOrder = (orderRef: string) => get<OrderRow>('SELECT * FROM orders WHERE order_id = ?', String(orderRef || ''));

export const getOrderByGatewayId = (gatewayOrderId: string) =>
  gatewayOrderId ? get<OrderRow>('SELECT * FROM orders WHERE gateway_order_id = ?', gatewayOrderId) : undefined;

export const orderItems = (orderDbId: number) =>
  all<OrderItemRow>('SELECT product_slug, product_name, image, quantity, unit_price, mrp, line_total, hsn, gst_rate FROM order_items WHERE order_id = ? ORDER BY id', orderDbId);

export const ordersForUser = (userId: number, limit = 20) =>
  all<OrderRow>('SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC LIMIT ?', userId, limit);

export function attachGatewayOrder(orderRef: string, gatewayOrderId: string) {
  db()?.prepare('UPDATE orders SET gateway_order_id = ?, updated_at = CURRENT_TIMESTAMP WHERE order_id = ?').run(gatewayOrderId, orderRef);
}

/**
 * Idempotent: the browser callback and the webhook can both report the same payment,
 * in any order, and the order is marked paid exactly once. Returns true when this call did it.
 */
export function markOrderPaid(orderRef: string, paymentId: string): boolean {
  const d = db();
  if (!d) return false;
  const res = d
    .prepare(
      `UPDATE orders SET payment_status = 'PAID', gateway_payment_id = ?, paid_at = datetime('now'),
         order_status = CASE WHEN order_status = 'PENDING_PAYMENT' THEN 'CONFIRMED' ELSE order_status END,
         updated_at = CURRENT_TIMESTAMP
       WHERE order_id = ? AND payment_status != 'PAID'`,
    )
    .run(paymentId || '', orderRef);
  const changed = Number(res.changes) > 0;
  if (changed) {
    const order = getOrder(orderRef);
    emptyCartById(order?.cart_id);
    ensureInvoiceNumber(orderRef);
    // Held stock becomes an assignment and the shipping source is notified.
    if (order) reconcileOrderStock(order.id);
    // A paid membership card is activated straight away, with its welcome coins.
    if (order) {
      try {
        activatePaidMembership(order);
      } catch (e) {
        console.error('[Membership] could not activate paid card for', orderRef, e);
      }
    }
  }
  return changed;
}
