import { createHash, randomInt } from 'node:crypto';
import { db, get } from '../db';
import { getSettings } from '../settings';
import { escapeHtml } from '../format';
import { isProduction, sendEmail } from '../mail';
import { sendOtpSms } from '../sms';
import { emptyCartById } from './cart';
import { ensureInvoiceNumber } from './invoice';
import { reconcileOrderStock } from '../inventory/stock';

/**
 * One-time code that confirms a Cash-on-Delivery order (stops fake COD orders).
 * The order waits as AWAITING_OTP — no invoice, cart kept, stock only held — until the
 * customer types the 6-digit code we emailed (and SMSed free via textbee.dev, when set up).
 */
export const OTP_MINUTES = 10;
const MAX_ATTEMPTS = 5;
const MAX_SENDS = 5;
const RESEND_SECONDS = 60;

const hashCode = (orderId: number, code: string) => createHash('sha256').update(`${orderId}:${code}`).digest('hex');

export function codOtpEnabled(): boolean {
  return ((getSettings() as any).signin || {}).codOtp !== false;
}

interface OtpOrder {
  id: number;
  order_id: string;
  user_id: number | null;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  order_status: string;
  cart_id: number | null;
  total_amount: number;
}

function loadOrder(orderRef: string) {
  return get<OtpOrder & { account_email: string | null }>(
    `SELECT o.id, o.order_id, o.user_id, o.customer_name, o.customer_phone, o.customer_email, o.order_status, o.cart_id, o.total_amount,
            u.email AS account_email
     FROM orders o LEFT JOIN users u ON u.id = o.user_id WHERE o.order_id = ?`,
    orderRef,
  );
}

/** "ri***@gmail.com" — enough for the customer to recognise, not enough to leak the address. */
export function maskEmail(email: string) {
  const [u, dom] = email.split('@');
  if (!dom) return email;
  return `${u.slice(0, 2)}${'*'.repeat(Math.max(1, u.length - 2))}@${dom}`;
}

export interface OtpSendResult {
  ok: boolean;
  error?: string;
  sentTo?: string;
  /** Only on this computer during development without email set up. Never on the live site. */
  devCode?: string;
}

/** Creates (or replaces) the code and sends it. `resend` applies the 60-second cooldown and send limit. */
export async function sendOrderOtp(orderRef: string, resend = false): Promise<OtpSendResult> {
  const d = db();
  const o = loadOrder(orderRef);
  if (!d || !o) return { ok: false, error: 'Order not found.' };
  if (o.order_status !== 'AWAITING_OTP') return { ok: false, error: 'This order is already confirmed.' };
  const to = (o.customer_email || o.account_email || '').trim();
  if (!to) return { ok: false, error: 'We have no email address for this order. Please call us to confirm it.' };

  const existing = d.prepare('SELECT sends, last_sent_at FROM order_otps WHERE order_id = ?').get(o.id) as { sends: number; last_sent_at: string } | undefined;
  if (resend && existing) {
    const since = (Date.now() - +new Date(existing.last_sent_at.replace(' ', 'T') + 'Z')) / 1000;
    if (since < RESEND_SECONDS) return { ok: false, error: `Please wait ${Math.ceil(RESEND_SECONDS - since)} seconds before asking for a new code.` };
    if (existing.sends >= MAX_SENDS) return { ok: false, error: 'Too many codes sent for this order. Please call us to confirm it.' };
  }

  const code = String(randomInt(0, 1_000_000)).padStart(6, '0');
  d.prepare(
    `INSERT INTO order_otps (order_id, code_hash, sent_to, expires_at, attempts, sends, last_sent_at)
     VALUES (?, ?, ?, datetime('now', '+${OTP_MINUTES} minutes'), 0, 1, datetime('now'))
     ON CONFLICT(order_id) DO UPDATE SET code_hash = excluded.code_hash, sent_to = excluded.sent_to,
       expires_at = excluded.expires_at, attempts = 0, sends = sends + 1, last_sent_at = datetime('now'), verified_at = NULL`,
  ).run(o.id, hashCode(o.id, code), to);

  const biz = getSettings().business.name;
  const mail = await sendEmail({
    to,
    subject: `${code} is your ${biz} order code`,
    text: `Hello ${o.customer_name},\n\nYour code to confirm Cash on Delivery order ${o.order_id} is: ${code}\n\nIt is valid for ${OTP_MINUTES} minutes. If you did not place this order, ignore this email.\n\n${biz}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px">
<p>Hello ${escapeHtml(o.customer_name)},</p>
<p>Your code to confirm Cash on Delivery order <b>${escapeHtml(o.order_id)}</b> is:</p>
<p style="font-size:32px;font-weight:800;letter-spacing:8px;margin:18px 0;color:#0b2545">${code}</p>
<p style="color:#64748b;font-size:13px">Valid for ${OTP_MINUTES} minutes. If you did not place this order, you can ignore this email.</p></div>`,
  });
  const sms = await sendOtpSms(o.customer_phone, code);
  if (!mail.success && !sms) return { ok: false, error: 'We could not send the code. Please try again in a minute or call us.' };
  return {
    ok: true,
    sentTo: [mail.success && !mail.devMode ? maskEmail(to) : '', sms ? `+91 ******${o.customer_phone.slice(-4)}` : ''].filter(Boolean).join(' and ') || maskEmail(to),
    devCode: mail.devMode && !isProduction() ? code : undefined,
  };
}

export type VerifyResult = { ok: true } | { ok: false; error: string };

/** Checks the typed code; on success the order is confirmed exactly like a COD order used to be. */
export function verifyOrderOtp(orderRef: string, code: string): VerifyResult {
  const d = db();
  const o = loadOrder(orderRef);
  if (!d || !o) return { ok: false, error: 'Order not found.' };
  if (o.order_status !== 'AWAITING_OTP') return { ok: true };
  const row = d.prepare('SELECT code_hash, expires_at, attempts FROM order_otps WHERE order_id = ?').get(o.id) as
    | { code_hash: string; expires_at: string; attempts: number }
    | undefined;
  if (!row) return { ok: false, error: 'Please ask for a code first.' };
  if (row.attempts >= MAX_ATTEMPTS) return { ok: false, error: 'Too many wrong codes. Ask for a new code.' };
  if (+new Date(row.expires_at.replace(' ', 'T') + 'Z') < Date.now()) return { ok: false, error: 'This code has expired. Ask for a new code.' };
  const clean = String(code).replace(/\D/g, '');
  if (clean.length !== 6 || hashCode(o.id, clean) !== row.code_hash) {
    d.prepare('UPDATE order_otps SET attempts = attempts + 1 WHERE order_id = ?').run(o.id);
    const left = MAX_ATTEMPTS - row.attempts - 1;
    return { ok: false, error: left > 0 ? `That code is not right. ${left} attempt${left === 1 ? '' : 's'} left.` : 'Too many wrong codes. Ask for a new code.' };
  }

  // Confirm once, even if the page is submitted twice.
  const res = d
    .prepare("UPDATE orders SET order_status = 'CONFIRMED', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND order_status = 'AWAITING_OTP'")
    .run(o.id);
  d.prepare("UPDATE order_otps SET verified_at = datetime('now') WHERE order_id = ?").run(o.id);
  if (Number(res.changes) > 0) {
    emptyCartById(o.cart_id);
    ensureInvoiceNumber(o.order_id);
    // Held stock becomes an assignment and the shipping vendor is emailed.
    reconcileOrderStock(o.id);
  }
  return { ok: true };
}
