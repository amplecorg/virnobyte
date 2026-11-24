/**
 * GST tax invoices for website orders.
 *
 * Shop prices are GST-inclusive, so each line's taxable value is worked back from its price:
 *   taxable = gross × 100 / (100 + rate)
 * Delivery inside the company's GST state → CGST + SGST (half the rate each);
 * delivery to any other state → IGST at the full rate (place of supply = delivery state).
 *
 * Numbers look like VPL/WEB/26-27/1 and run per Indian financial year (April–March).
 * A number is issued once — when an online order is paid, or when a COD order is confirmed —
 * and never changes afterwards.
 */
import { db, get, tx } from '../db';
import { getSettings } from '../settings';

export interface InvoiceOrder {
  id: number;
  order_id: string;
  invoice_no: string;
  invoice_date: string | null;
  created_at: string;
  paid_at?: string | null;
  payment_method: string;
  payment_status: string;
  order_status: string;
  gateway: string;
  gateway_payment_id: string;
  delivery_fee: number;
  total_amount: number;
  state: string;
}

/** Financial year label for a date, e.g. 16 Jun 2026 → "26-27", 10 Feb 2027 → "26-27". */
export function financialYear(d = new Date()) {
  const y = d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1;
  return `${String(y).slice(2)}-${String(y + 1).slice(2)}`;
}

/** True once the order is a completed sale that should carry a tax invoice. */
export function invoiceEligible(o: Pick<InvoiceOrder, 'payment_status' | 'payment_method' | 'order_status'>) {
  if (o.order_status === 'CANCELLED') return false;
  return o.payment_status === 'PAID' || (o.payment_method === 'cod' && o.order_status !== 'PENDING_PAYMENT' && o.order_status !== 'AWAITING_OTP');
}

/**
 * Issues the next invoice number for an order if it is eligible and has none yet.
 * Safe to call repeatedly (browser callback, webhook, page view): only the first call assigns.
 */
export function ensureInvoiceNumber(orderRef: string): string {
  const d = db();
  if (!d) return '';
  const o = get<InvoiceOrder>('SELECT * FROM orders WHERE order_id = ?', orderRef);
  if (!o) return '';
  if (o.invoice_no) return o.invoice_no;
  if (!invoiceEligible(o)) return '';

  const prefix = getSettings().company.invoicePrefix || 'VPL/WEB';
  let issued = '';
  tx(() => {
    // Re-check inside the transaction so two concurrent callers cannot both number the order.
    const fresh = d.prepare('SELECT invoice_no FROM orders WHERE id = ?').get(o.id) as { invoice_no: string };
    if (fresh?.invoice_no) {
      issued = fresh.invoice_no;
      return;
    }
    const now = new Date();
    const fy = financialYear(now);
    d.prepare('INSERT INTO invoice_counters (fy, last) VALUES (?, 0) ON CONFLICT(fy) DO NOTHING').run(fy);
    d.prepare('UPDATE invoice_counters SET last = last + 1 WHERE fy = ?').run(fy);
    const { last } = d.prepare('SELECT last FROM invoice_counters WHERE fy = ?').get(fy) as { last: number };
    issued = `${prefix}/${fy}/${last}`;
    d.prepare("UPDATE orders SET invoice_no = ?, invoice_date = date('now', 'localtime'), updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(issued, o.id);
  });
  return issued;
}

// ── Amounts ─────────────────────────────────────────────────────

const r2 = (n: number) => Math.round(n * 100) / 100;

export interface InvoiceLine {
  sno: number;
  name: string;
  hsn: string;
  quantity: number;
  unit: string;
  rate: number; // taxable unit rate
  taxable: number;
  gstRate: number;
  gross: number; // GST-inclusive line total
}

export interface InvoiceTotals {
  lines: InvoiceLine[];
  intraState: boolean;
  taxable: number;
  cgst: number;
  sgst: number;
  igst: number;
  tax: number;
  roundOff: number;
  total: number;
  quantity: number;
  hsnSummary: { hsn: string; gstRate: number; taxable: number; cgst: number; sgst: number; igst: number; tax: number }[];
}

export function computeInvoice(
  items: { product_name: string; quantity: number; unit_price: number; line_total: number; hsn?: string; gst_rate?: number }[],
  order: { delivery_fee: number; total_amount: number; state: string; coin_discount?: number },
): InvoiceTotals {
  const co = getSettings().company;
  const defRate = Number(co.defaultGstPercent) || 18;
  const intraState = norm(order.state) === norm(co.gstState || 'Maharashtra');

  const src = items.map((i) => ({
    name: i.product_name,
    hsn: i.hsn || co.defaultHsn || '8471',
    quantity: i.quantity,
    unit: 'NOS',
    gross: i.line_total,
    gstRate: Number(i.gst_rate) || defRate,
  }));
  if (order.delivery_fee > 0) {
    src.push({ name: 'Delivery charges', hsn: '996812', quantity: 1, unit: 'SVC', gross: order.delivery_fee, gstRate: defRate });
  }

  const lines: InvoiceLine[] = src.map((l, i) => {
    const taxable = r2((l.gross * 100) / (100 + l.gstRate));
    return { sno: i + 1, ...l, taxable, rate: r2(taxable / l.quantity) };
  });

  const byHsn = new Map<string, InvoiceTotals['hsnSummary'][number]>();
  for (const l of lines) {
    const tax = r2(l.gross - l.taxable);
    const half = r2(tax / 2);
    const key = `${l.hsn}|${l.gstRate}`;
    const row = byHsn.get(key) ?? { hsn: l.hsn, gstRate: l.gstRate, taxable: 0, cgst: 0, sgst: 0, igst: 0, tax: 0 };
    row.taxable = r2(row.taxable + l.taxable);
    if (intraState) {
      row.cgst = r2(row.cgst + half);
      row.sgst = r2(row.sgst + r2(tax - half));
    } else {
      row.igst = r2(row.igst + tax);
    }
    row.tax = r2(row.cgst + row.sgst + row.igst);
    byHsn.set(key, row);
  }
  const hsnSummary = [...byHsn.values()];
  const sum = (k: 'taxable' | 'cgst' | 'sgst' | 'igst') => r2(hsnSummary.reduce((a, r) => a + r[k], 0));
  const taxable = sum('taxable');
  const cgst = sum('cgst');
  const sgst = sum('sgst');
  const igst = sum('igst');
  const tax = r2(cgst + sgst + igst);
  // Virno Coins are treated like a voucher: the sale (and its GST) is the full value, and the
  // coins are shown afterwards as part of the payment. total_amount is what the customer paid in money.
  const total = order.total_amount + (Number(order.coin_discount) || 0);
  return {
    lines,
    intraState,
    taxable,
    cgst,
    sgst,
    igst,
    tax,
    roundOff: r2(total - (taxable + tax)),
    total,
    quantity: items.reduce((a, i) => a + i.quantity, 0),
    hsnSummary,
  };
}

const norm = (s: string) => String(s || '').toLowerCase().replace(/[^a-z]/g, '');

// ── Words (Indian numbering) ─────────────────────────────────────

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function below1000(n: number): string {
  const h = Math.floor(n / 100);
  const r = n % 100;
  const parts: string[] = [];
  if (h) parts.push(`${ONES[h]} Hundred`);
  if (r) parts.push(r < 20 ? ONES[r] : `${TENS[Math.floor(r / 10)]}${r % 10 ? ` ${ONES[r % 10]}` : ''}`);
  return parts.join(' ');
}

/** 3720 → "Three Thousand Seven Hundred Twenty Rupees"; paise are added when present. */
export function amountInWords(amount: number): string {
  const rupees = Math.floor(Math.abs(amount));
  const paise = Math.round((Math.abs(amount) - rupees) * 100);
  const words = (n: number) => {
    if (n === 0) return 'Zero';
    const crore = Math.floor(n / 1e7);
    const lakh = Math.floor((n % 1e7) / 1e5);
    const thousand = Math.floor((n % 1e5) / 1e3);
    const rest = n % 1e3;
    return [
      crore ? `${words(crore)} Crore` : '',
      lakh ? `${below1000(lakh)} Lakh` : '',
      thousand ? `${below1000(thousand)} Thousand` : '',
      rest ? below1000(rest) : '',
    ].filter(Boolean).join(' ');
  };
  return `${words(rupees)} Rupees${paise ? ` and ${words(paise)} Paise` : ''}`;
}

/** 3152.54 → "3,152.54" (Indian grouping, always two decimals). */
export const money = (n: number) => n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
