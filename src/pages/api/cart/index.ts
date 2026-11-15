import type { APIRoute } from 'astro';
import { clearCart, getCart } from '@/lib/commerce/cart';
import { isSecure, json } from '@/lib/commerce/http';

/** GET /api/cart — current cart with live prices and totals. */
export const GET: APIRoute = (ctx) => json({ ok: true, cart: getCart(ctx.cookies, ctx.locals.user, isSecure(ctx)) });

/** DELETE /api/cart — empty the cart. */
export const DELETE: APIRoute = (ctx) => json({ ok: true, cart: clearCart(ctx.cookies, ctx.locals.user, isSecure(ctx)) });
