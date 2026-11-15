import type { APIRoute } from 'astro';
import { addToCart, CartError, removeFromCart, setCartQuantity } from '@/lib/commerce/cart';
import { isSecure, json, readJson } from '@/lib/commerce/http';
import { rateLimit } from '@/lib/auth';

const fail = (err: unknown) => {
  if (err instanceof CartError) return json({ ok: false, error: err.message }, err.status);
  console.error('[Cart API]', err);
  return json({ ok: false, error: 'Something went wrong with your cart. Please try again.' }, 500);
};

/** POST /api/cart/items { slug, quantity? } — add a product (quantities stack, capped per item). */
export const POST: APIRoute = async (ctx) => {
  if (!rateLimit(`cart:${ctx.clientAddress}`, 120, 10 * 60_000)) return json({ ok: false, error: 'Too many requests. Please slow down.' }, 429);
  const body = await readJson(ctx.request);
  try {
    return json({ ok: true, cart: addToCart(ctx.cookies, ctx.locals.user, isSecure(ctx), String(body.slug || ''), Number(body.quantity) || 1) });
  } catch (err) {
    return fail(err);
  }
};

/** PATCH /api/cart/items { productId, quantity } — set an exact quantity (0 removes the line). */
export const PATCH: APIRoute = async (ctx) => {
  const body = await readJson(ctx.request);
  try {
    return json({ ok: true, cart: setCartQuantity(ctx.cookies, ctx.locals.user, isSecure(ctx), Number(body.productId), Number(body.quantity)) });
  } catch (err) {
    return fail(err);
  }
};

/** DELETE /api/cart/items { productId } — remove a line. */
export const DELETE: APIRoute = async (ctx) => {
  const body = await readJson(ctx.request);
  try {
    return json({ ok: true, cart: removeFromCart(ctx.cookies, ctx.locals.user, isSecure(ctx), Number(body.productId)) });
  } catch (err) {
    return fail(err);
  }
};
