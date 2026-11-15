import type { APIRoute } from 'astro';
import { db } from '@/lib/db';
import { getOrderByGatewayId, markOrderPaid } from '@/lib/commerce/orders';
import { verifyWebhookSignature } from '@/lib/commerce/razorpay';

/**
 * POST /api/webhooks/razorpay
 * Razorpay Dashboard → Settings → Webhooks → events: payment.captured, order.paid.
 * This is the source of truth for payments when the shopper's browser never returns.
 * Every delivery is signature-checked and logged once (duplicates are acknowledged and ignored).
 */
export const POST: APIRoute = async ({ request }) => {
  const raw = await request.text();
  if (!verifyWebhookSignature(raw, request.headers.get('x-razorpay-signature') || '')) {
    return new Response('Invalid signature', { status: 400 });
  }

  let event: any;
  try {
    event = JSON.parse(raw);
  } catch {
    return new Response('Bad payload', { status: 400 });
  }

  const payment = event?.payload?.payment?.entity;
  const rzpOrderId = String(payment?.order_id || event?.payload?.order?.entity?.id || '');
  const order = getOrderByGatewayId(rzpOrderId);
  const eventId = request.headers.get('x-razorpay-event-id') || `${event?.event}:${payment?.id || rzpOrderId}`;

  const d = db();
  if (d) {
    const logged = d
      .prepare('INSERT OR IGNORE INTO payment_events (provider, event_id, event_type, order_ref, payload) VALUES (?,?,?,?,?)')
      .run('razorpay', eventId, String(event?.event || ''), order?.order_id || '', raw.slice(0, 20000));
    if (!Number(logged.changes)) return new Response('Duplicate', { status: 200 });
  }

  if (order && (event.event === 'payment.captured' || event.event === 'order.paid')) {
    // Never trust the event alone for the amount: it must match what we charged.
    const paidPaise = Number(payment?.amount ?? event?.payload?.order?.entity?.amount_paid ?? 0);
    if (paidPaise === order.total_amount * 100) {
      markOrderPaid(order.order_id, String(payment?.id || ''));
    } else {
      console.error('[Razorpay webhook] amount mismatch for', order.order_id, paidPaise, order.total_amount * 100);
    }
  }
  return new Response('OK', { status: 200 });
};
