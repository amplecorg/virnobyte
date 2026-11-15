import { db } from '../db';
import { getSettings } from '../settings';
import { createCashfreeOrder, verifyCashfreeOrder } from '../cashfree';
import { attachGatewayOrder, getOrder, markOrderPaid, type OrderRow } from './orders';
import { getPaymentConfig } from './payments';
import { createRazorpayOrder, fetchRazorpayOrderState } from './razorpay';

/** What the browser needs to open the gateway's payment window. Never contains a secret. */
export type PaymentIntent =
  | {
      gateway: 'razorpay';
      key: string;
      razorpayOrderId: string;
      amount: number;
      currency: 'INR';
      name: string;
      description: string;
      prefill: { name: string; email: string; contact: string };
    }
  | { gateway: 'cashfree'; paymentSessionId: string; mode: 'production' | 'sandbox' };

/**
 * Opens (or re-opens) the gateway order for an unpaid online order.
 * Safe to call repeatedly: an existing gateway order is reused, so a retry never double-charges.
 */
export async function startOnlinePayment(order: OrderRow, origin: string): Promise<{ ok: true; intent: PaymentIntent } | { ok: false; error: string }> {
  const cfg = getPaymentConfig();
  if (!cfg.onlineAvailable || order.gateway !== cfg.gateway) {
    return { ok: false, error: 'Online payment is not available right now. Please choose Cash on Delivery or call us.' };
  }

  if (cfg.gateway === 'razorpay') {
    let rzpId = order.gateway_order_id;
    if (!rzpId) {
      const created = await createRazorpayOrder({
        amountRupees: order.total_amount,
        receipt: order.order_id,
        notes: { order_id: order.order_id, phone: order.customer_phone },
      });
      if (!created.success || !created.id) return { ok: false, error: created.error || 'Could not start the payment.' };
      rzpId = created.id;
      attachGatewayOrder(order.order_id, rzpId);
    }
    return {
      ok: true,
      intent: {
        gateway: 'razorpay',
        key: cfg.razorpay.keyId,
        razorpayOrderId: rzpId,
        amount: order.total_amount * 100,
        currency: 'INR',
        name: getSettings().business.name,
        description: `Order ${order.order_id}`,
        prefill: { name: order.customer_name, email: order.customer_email, contact: order.customer_phone },
      },
    };
  }

  // Cashfree
  let sessionId = String((order as any).cashfree_session_id || '');
  if (!sessionId) {
    const cf = await createCashfreeOrder({
      orderId: order.order_id,
      amount: order.total_amount,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      customerEmail: order.customer_email,
      returnUrl: `${origin}/api/checkout/verify?order_id={order_id}`,
      note: `Virnobyte order ${order.order_id}`,
    });
    if (!cf.success || !cf.paymentSessionId) return { ok: false, error: cf.error || 'Could not start the payment.' };
    sessionId = cf.paymentSessionId;
    db()
      ?.prepare('UPDATE orders SET cashfree_order_id = ?, cashfree_session_id = ?, gateway_order_id = ? WHERE order_id = ?')
      .run(String(cf.cfOrderId || ''), sessionId, String(cf.cfOrderId || ''), order.order_id);
  }
  return { ok: true, intent: { gateway: 'cashfree', paymentSessionId: sessionId, mode: cfg.cashfree.env === 'PROD' ? 'production' : 'sandbox' } };
}

/**
 * Asks the gateway directly whether a pending order was paid. Covers the case where
 * the shopper paid but the browser never returned and no webhook has arrived yet.
 */
export async function reconcileOrder(orderRef: string): Promise<OrderRow | undefined> {
  const order = getOrder(orderRef);
  if (!order || order.payment_status !== 'PENDING') return order;
  const cfg = getPaymentConfig();
  if (order.gateway === 'razorpay' && order.gateway_order_id && cfg.razorpay.configured) {
    const state = await fetchRazorpayOrderState(order.gateway_order_id);
    if (state.paid) markOrderPaid(order.order_id, state.paymentId);
  } else if (order.gateway === 'cashfree' && cfg.cashfree.configured) {
    const state = await verifyCashfreeOrder(order.order_id);
    if (state.isPaid) markOrderPaid(order.order_id, String(state.data?.cf_order_id || ''));
  }
  return getOrder(orderRef);
}
