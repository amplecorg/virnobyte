import { createHmac, timingSafeEqual } from 'node:crypto';
import { getPaymentConfig } from './payments';

/**
 * Thin Razorpay REST client (no SDK dependency).
 * Docs: https://razorpay.com/docs/api/orders/ and /docs/payments/server-integration/nodejs/
 *
 * Flow: server creates a Razorpay order for the exact amount → browser pays in
 * Razorpay Checkout → server verifies the returned signature with the key secret.
 * The webhook is the safety net when the browser never comes back.
 */
const API = 'https://api.razorpay.com/v1';

function authHeader() {
  const { keyId, keySecret } = getPaymentConfig().razorpay;
  return 'Basic ' + Buffer.from(`${keyId}:${keySecret}`).toString('base64');
}

function safeEqualHex(a: string, b: string) {
  const x = Buffer.from(String(a || ''), 'utf8');
  const y = Buffer.from(String(b || ''), 'utf8');
  return x.length === y.length && timingSafeEqual(x, y);
}

export const hmacHex = (payload: string, secret: string) => createHmac('sha256', secret).update(payload).digest('hex');

export interface RazorpayOrderResult {
  success: boolean;
  id?: string;
  amount?: number;
  error?: string;
}

/** Creates a Razorpay order. `amountRupees` is converted to paise here and nowhere else. */
export async function createRazorpayOrder(params: {
  amountRupees: number;
  receipt: string;
  notes?: Record<string, string>;
}): Promise<RazorpayOrderResult> {
  try {
    const res = await fetch(`${API}/orders`, {
      method: 'POST',
      headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Math.round(params.amountRupees * 100),
        currency: 'INR',
        receipt: params.receipt.slice(0, 40),
        notes: params.notes || {},
      }),
      signal: AbortSignal.timeout(15000),
    });
    const data = (await res.json().catch(() => ({}))) as any;
    if (!res.ok || !data.id) {
      console.error('[Razorpay] create order failed:', res.status, data?.error?.description || data);
      // The gateway's own message (e.g. "Authentication failed") is for the server log, not the shopper.
      return { success: false, error: 'Could not start the online payment. Please try again or choose Cash on Delivery.' };
    }
    return { success: true, id: data.id, amount: data.amount };
  } catch (err: any) {
    console.error('[Razorpay] create order exception:', err?.message);
    return { success: false, error: 'Could not reach the payment gateway. Please try again.' };
  }
}

/**
 * Checkout success signature: HMAC-SHA256("<razorpay_order_id>|<razorpay_payment_id>", key_secret).
 * `razorpayOrderId` must be the id stored on OUR order, never the one sent by the browser.
 */
export function verifyPaymentSignature(razorpayOrderId: string, paymentId: string, signature: string, keySecret = getPaymentConfig().razorpay.keySecret) {
  if (!razorpayOrderId || !paymentId || !signature || !keySecret) return false;
  return safeEqualHex(hmacHex(`${razorpayOrderId}|${paymentId}`, keySecret), signature);
}

/** Webhook signature: HMAC-SHA256(raw request body, webhook secret) in the X-Razorpay-Signature header. */
export function verifyWebhookSignature(rawBody: string, signature: string, webhookSecret = getPaymentConfig().razorpay.webhookSecret) {
  if (!rawBody || !signature || !webhookSecret) return false;
  return safeEqualHex(hmacHex(rawBody, webhookSecret), signature);
}

/** Asks Razorpay whether an order has been paid; used to reconcile orders left pending. */
export async function fetchRazorpayOrderState(razorpayOrderId: string): Promise<{ paid: boolean; paymentId: string }> {
  try {
    const headers = { Authorization: authHeader() };
    const res = await fetch(`${API}/orders/${encodeURIComponent(razorpayOrderId)}`, { headers, signal: AbortSignal.timeout(15000) });
    if (!res.ok) return { paid: false, paymentId: '' };
    const order = (await res.json()) as any;
    if (order.status !== 'paid') return { paid: false, paymentId: '' };
    const pres = await fetch(`${API}/orders/${encodeURIComponent(razorpayOrderId)}/payments`, { headers, signal: AbortSignal.timeout(15000) });
    const payments = pres.ok ? ((await pres.json()) as any) : { items: [] };
    const captured = (payments.items || []).find((p: any) => p.status === 'captured');
    return { paid: true, paymentId: captured?.id || '' };
  } catch (err: any) {
    console.error('[Razorpay] fetch order exception:', err?.message);
    return { paid: false, paymentId: '' };
  }
}
