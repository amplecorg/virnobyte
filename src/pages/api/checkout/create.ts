import type { APIRoute } from 'astro';
import { rateLimit, userFromCookies } from '@/lib/auth';
import { product } from '@/lib/data';
import { buildLine, getCart, viewOf } from '@/lib/commerce/cart';
import { startOnlinePayment } from '@/lib/commerce/checkout';
import { getPublicOrigin, isSecure, json, readJson } from '@/lib/commerce/http';
import { createOrder, validateCustomer } from '@/lib/commerce/orders';
import { getPaymentConfig } from '@/lib/commerce/payments';
import { StockError } from '@/lib/inventory/stock';
import { coinQuote } from '@/lib/commerce/coins';
import { sendOrderOtp } from '@/lib/commerce/otp';

/**
 * POST /api/checkout/create
 * Body: delivery fields + paymentMethod ('online' | 'cod') + either
 *   { mode: 'cart' }                → order everything purchasable in the cart
 *   { mode: 'buy', slug, quantity } → Buy Now for a single product (cart untouched)
 *
 * The browser never sends prices: lines and totals are rebuilt from the database here.
 */
export const POST: APIRoute = async (ctx) => {
  if (!rateLimit(`checkout:${ctx.clientAddress}`, 12, 10 * 60_000)) {
    return json({ ok: false, error: 'Too many attempts. Please wait a few minutes and try again.' }, 429);
  }

  try {
    const user = ctx.locals.user || userFromCookies(ctx.cookies);
    if (!user) {
      return json({ ok: false, error: 'Please sign in to place your order.', requiresLogin: true }, 401);
    }

    const body = await readJson(ctx.request);
    const cfg = getPaymentConfig();
    if (!cfg.enabled) return json({ ok: false, error: 'Online ordering is switched off right now. Please call us to order.' }, 503);

    const checked = validateCustomer(body);
    if (!checked.ok) return json({ ok: false, error: checked.error }, 400);

    const method: 'cod' | 'online' = body.paymentMethod === 'cod' ? 'cod' : 'online';
    if (method === 'cod' && !cfg.codAvailable) return json({ ok: false, error: 'Cash on Delivery is not available. Please pay online.' }, 400);
    if (method === 'online' && !cfg.onlineAvailable) {
      return json({ ok: false, error: 'Online payment is not available right now. Please choose Cash on Delivery.' }, 400);
    }

    // Build the order lines from trusted data only.
    let view;
    if (body.mode === 'buy') {
      const p = product(String(body.slug || ''));
      if (!p) return json({ ok: false, error: 'This product is no longer available.' }, 404);
      view = viewOf(null, [buildLine(p, Number(body.quantity) || 1)]);
    } else {
      view = getCart(ctx.cookies, user, isSecure(ctx));
    }
    if (!view.totals.itemCount) {
      return json({ ok: false, error: view.lines[0]?.unavailableReason || 'Your cart is empty.' }, 400);
    }

    // Virno Coins: the browser only says "use my coins"; how many is worked out here from the real balance.
    const useCoins = body.useCoins === 'on' || body.useCoins === true;
    const quote = useCoins ? coinQuote(user.id, view.totals.subtotal) : null;

    const order = createOrder({
      lines: view.lines,
      totals: view.totals,
      customer: checked.customer,
      paymentMethod: method,
      gateway: cfg.gateway,
      userId: user.id,
      cartId: view.cartId,
      coins: quote && quote.coins ? { coins: quote.coins, discount: quote.discount } : undefined,
    });
    const redirectUrl = `/order-success?order_id=${encodeURIComponent(order.order_id)}`;

    if (method === 'cod') {
      if (order.order_status === 'AWAITING_OTP') {
        // Send the code now; the verify page lets the customer ask again if it does not arrive.
        await sendOrderOtp(order.order_id).catch((e) => console.warn('[Checkout] OTP send failed:', e));
        return json({ ok: true, orderId: order.order_id, paymentMethod: 'cod', redirectUrl: `/order-verify?order_id=${encodeURIComponent(order.order_id)}` });
      }
      // Re-read so the header badge cookie reflects the now-empty cart.
      if (view.cartId) getCart(ctx.cookies, user, isSecure(ctx));
      return json({ ok: true, orderId: order.order_id, paymentMethod: 'cod', redirectUrl });
    }

    const started = await startOnlinePayment(order, getPublicOrigin(ctx));
    if (!started.ok) return json({ ok: false, error: started.error, orderId: order.order_id }, 502);
    return json({ ok: true, orderId: order.order_id, paymentMethod: 'online', payment: started.intent, redirectUrl });
  } catch (err: any) {
    // Someone else bought the last units between the cart page and this request.
    if (err instanceof StockError) return json({ ok: false, error: err.message }, 409);
    if (String(err?.message || '').startsWith('Your coin balance changed')) return json({ ok: false, error: err.message }, 409);
    console.error('[Checkout] create failed:', err);
    return json({ ok: false, error: 'We could not place your order. Please try again or call us.' }, 500);
  }
};
