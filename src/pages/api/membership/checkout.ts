import type { APIRoute } from 'astro';
import { rateLimit, userFromCookies } from '@/lib/auth';
import { planById } from '@/lib/data';
import { startOnlinePayment } from '@/lib/commerce/checkout';
import { getPublicOrigin, json, readJson } from '@/lib/commerce/http';
import { validateCustomer } from '@/lib/commerce/orders';
import { getPaymentConfig } from '@/lib/commerce/payments';
import { createMembershipOrder } from '@/lib/commerce/membership-checkout';

/**
 * POST /api/membership/checkout — { planId, customerName, customerPhone, ...address }
 * Creates the membership purchase and opens the payment gateway. The price always comes from the plan.
 */
export const POST: APIRoute = async (ctx) => {
  if (!rateLimit(`mcheckout:${ctx.clientAddress}`, 12, 10 * 60_000)) {
    return json({ ok: false, error: 'Too many attempts. Please wait a few minutes and try again.' }, 429);
  }
  const user = ctx.locals.user || userFromCookies(ctx.cookies);
  if (!user) return json({ ok: false, error: 'Please sign in first.', requiresLogin: true }, 401);

  const body = await readJson(ctx.request);
  const plan = planById(Number(body.planId));
  if (!plan || !plan.active) return json({ ok: false, error: 'This plan is not on sale right now.' }, 404);
  const cfg = getPaymentConfig();
  if (!cfg.onlineAvailable) return json({ ok: false, error: 'Online payment is not available right now. Please request the card and pay at our counter.' }, 503);

  const checked = validateCustomer(body);
  if (!checked.ok) return json({ ok: false, error: checked.error }, 400);

  try {
    const order = createMembershipOrder({ userId: user.id, plan, customer: checked.customer, gateway: cfg.gateway });
    const redirectUrl = `/order-success?order_id=${encodeURIComponent(order.order_id)}`;
    const started = await startOnlinePayment(order, getPublicOrigin(ctx));
    if (!started.ok) return json({ ok: false, error: started.error, orderId: order.order_id, redirectUrl }, 502);
    return json({ ok: true, orderId: order.order_id, payment: started.intent, redirectUrl });
  } catch (e: any) {
    console.error('[Membership checkout] failed:', e);
    return json({ ok: false, error: e?.message?.startsWith('You already') ? e.message : 'We could not start the payment. Please try again or call us.' }, 400);
  }
};
