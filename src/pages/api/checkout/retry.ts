import type { APIRoute } from 'astro';
import { rateLimit } from '@/lib/auth';
import { reconcileOrder, startOnlinePayment } from '@/lib/commerce/checkout';
import { getPublicOrigin, json, readJson } from '@/lib/commerce/http';

/** POST /api/checkout/retry { orderId } — "Complete payment" for an order still awaiting payment. */
export const POST: APIRoute = async (ctx) => {
  if (!rateLimit(`retry:${ctx.clientAddress}`, 12, 10 * 60_000)) {
    return json({ ok: false, error: 'Too many attempts. Please wait a few minutes and try again.' }, 429);
  }
  const user = ctx.locals.user;
  if (!user) {
    return json({ ok: false, error: 'Please sign in to complete payment.', requiresLogin: true }, 401);
  }
  const body = await readJson(ctx.request);
  // First ask the gateway: the earlier attempt may have succeeded after all.
  const order = await reconcileOrder(String(body.orderId || ''));
  if (!order) return json({ ok: false, error: 'Order not found.' }, 404);
  if (order.user_id && user.id !== order.user_id && user.role !== 'admin') {
    return json({ ok: false, error: 'Access denied.' }, 403);
  }
  const redirectUrl = `/order-success?order_id=${encodeURIComponent(order.order_id)}`;
  if (order.payment_status === 'PAID') return json({ ok: true, paid: true, redirectUrl });
  if (order.payment_status !== 'PENDING' || order.order_status === 'CANCELLED') {
    return json({ ok: false, error: 'This order can no longer be paid online. Please contact us.' }, 400);
  }
  const started = await startOnlinePayment(order, getPublicOrigin(ctx));
  if (!started.ok) return json({ ok: false, error: started.error }, 502);
  return json({ ok: true, orderId: order.order_id, payment: started.intent, redirectUrl });
};
