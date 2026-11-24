import { sendEmail } from '../mail';
import { getSettings } from '../settings';
import { escapeHtml } from '../format';
import { allocationsByIds, onLowStock, onStockEvents, type AllocationView, type LowStockAlert } from './stock';

/**
 * Emails sent by inventory. Fire-and-forget: a mail failure never blocks an order or a stock update.
 * Vendors only ever receive what they need to ship — products, quantities and the delivery
 * address. Prices and amounts are never included.
 */

const env = (typeof process !== 'undefined' ? process.env : {}) as Record<string, string | undefined>;

export const siteOrigin = () => (env.PUBLIC_SITE_URL || 'https://virnobyte.com').trim().replace(/\/+$/, '');

/** Where internal inventory alerts go: INVENTORY_ALERT_EMAIL, else the business email. */
const teamEmail = () => env.INVENTORY_ALERT_EMAIL || getSettings().business.email;

const h = (s: unknown) => escapeHtml(String(s ?? ''));

function shell(title: string, bodyHtml: string) {
  return `<!doctype html><html><body style="margin:0;background:#f4f6f9;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#1e293b">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:28px 12px"><tr><td align="center">
<table role="presentation" width="100%" style="max-width:600px;background:#fff;border:1px solid #e2e8f0;border-radius:12px" cellpadding="0" cellspacing="0">
<tr><td style="background:#0b2545;padding:20px 28px;border-radius:12px 12px 0 0;color:#fff;font-weight:800;font-size:20px">VIRNO<span style="color:#38bdf8">BYTE</span></td></tr>
<tr><td style="padding:26px 28px"><h1 style="margin:0 0 14px;font-size:20px">${h(title)}</h1>${bodyHtml}</td></tr>
</table></td></tr></table></body></html>`;
}

function itemsTable(rows: AllocationView[]) {
  return `<table role="presentation" width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px;margin:12px 0">
<tr style="background:#f8fafc"><th align="left">Product</th><th align="left">Your SKU</th><th align="right">Qty</th></tr>
${rows.map((r) => `<tr style="border-top:1px solid #e2e8f0"><td>${h(r.product_name)}</td><td>${h(r.sku || '—')}</td><td align="right"><b>${r.qty}</b></td></tr>`).join('')}
</table>`;
}

function addressBlock(r: AllocationView) {
  return `<p style="margin:12px 0;padding:12px 14px;background:#f8fafc;border-radius:8px;font-size:14px;line-height:1.5">
<b>Ship to:</b> ${h(r.customer_name)} · ${h(r.customer_phone)}<br>${h(r.address_line1)}${r.address_line2 ? `, ${h(r.address_line2)}` : ''}<br>${h(r.city)}, ${h(r.state)} ${h(r.pincode)}</p>`;
}

function addressText(r: AllocationView) {
  return `Ship to: ${r.customer_name}, ${r.customer_phone}\n${r.address_line1}${r.address_line2 ? `, ${r.address_line2}` : ''}\n${r.city}, ${r.state} ${r.pincode}`;
}

const groupBy = <T>(xs: T[], key: (x: T) => string) =>
  xs.reduce<Record<string, T[]>>((m, x) => ((m[key(x)] ??= []).push(x), m), {});

async function send(to: string, subject: string, html: string, text: string) {
  if (!to) return;
  const res = await sendEmail({ to, subject, html, text });
  if (!res.success) console.warn(`[Inventory] email to ${to} failed: ${res.error}`);
}

async function notifyAssigned(ids: number[]) {
  const rows = allocationsByIds(ids).filter((r) => r.status === 'ASSIGNED' || r.status === 'UNASSIGNED');
  const portal = `${siteOrigin()}/vendor`;
  // Vendors with an email get their own items, one email per order.
  for (const group of Object.values(groupBy(rows, (r) => `${r.source_id ?? 'none'}|${r.order_ref}`))) {
    const r = group[0];
    const ref = r.order_ref;
    const admin = `${siteOrigin()}/admin/r/orders/${r.order_id}#shipping`;
    if (r.status === 'UNASSIGNED' || !r.source_id) {
      await send(
        teamEmail(),
        `Action needed: no vendor has stock for order ${ref}`,
        shell(`Order ${ref} needs a vendor`, `<p>No vendor had enough stock for these items. Open the order and choose who ships them.</p>${itemsTable(group)}<p><a href="${admin}">Open the order</a></p>`),
        `No vendor had enough stock for order ${ref}:\n${group.map((g) => `- ${g.product_name} × ${g.qty}`).join('\n')}\n\nChoose a vendor: ${admin}`,
      );
      continue;
    }
    if (r.source_kind === 'own' || !r.source_email) {
      await send(
        teamEmail(),
        `Ship order ${ref} from ${r.source_name}`,
        shell(`Ship order ${ref}`, `<p>These items will ship from <b>${h(r.source_name)}</b>${r.source_kind === 'vendor' ? ' (no email on file — please tell them)' : ''}.</p>${itemsTable(group)}${addressBlock(r)}<p><a href="${admin}">Open the order</a></p>`),
        `Items to ship from ${r.source_name} for order ${ref}:\n${group.map((g) => `- ${g.product_name} × ${g.qty}`).join('\n')}\n\n${addressText(r)}\n\n${admin}`,
      );
      continue;
    }
    await send(
      r.source_email,
      `New order to ship: ${ref}`,
      shell(
        `New order to ship: ${ref}`,
        `<p>Hello ${h(r.source_name)}, please pack and ship these items directly to the customer.</p>${itemsTable(group)}${addressBlock(r)}
<p>When it is on its way, confirm the shipment with the courier and tracking number in your Seller Hub. If you cannot ship it, use "Can't ship this order?" there.</p>
<p><a href="${portal}/orders" style="display:inline-block;background:#0b2545;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600">Open Seller Hub orders</a></p>
<p style="font-size:13px;color:#64748b">Please send it in plain packaging with the Virnobyte order number ${h(ref)} on the parcel.</p>`,
      ),
      `Hello ${r.source_name},\n\nPlease ship these items for Virnobyte order ${ref}:\n${group.map((g) => `- ${g.product_name}${g.sku ? ` (${g.sku})` : ''} × ${g.qty}`).join('\n')}\n\n${addressText(r)}\n\nWhen shipped, confirm it with the courier and tracking number in your Seller Hub: ${portal}/orders\n\nVirnobyte`,
    );
  }
}

async function notifyCancelled(ids: number[]) {
  const rows = allocationsByIds(ids);
  for (const group of Object.values(groupBy(rows, (r) => `${r.source_id}|${r.order_ref}`))) {
    const r = group[0];
    const to = r.source_kind === 'vendor' && r.source_email ? r.source_email : teamEmail();
    await send(
      to,
      `Do not ship: order ${r.order_ref} cancelled`,
      shell(`Please do not ship order ${r.order_ref}`, `<p>These items were cancelled or moved to another source. If already packed, please put them back into stock.</p>${itemsTable(group)}`),
      `Please do not ship order ${r.order_ref}. Cancelled items:\n${group.map((g) => `- ${g.product_name} × ${g.qty}`).join('\n')}\n\nVirnobyte`,
    );
  }
}

async function notifyLow(alerts: LowStockAlert[]) {
  const link = `${siteOrigin()}/admin/inventory/products`;
  await send(
    teamEmail(),
    alerts.length === 1 ? `Low stock: ${alerts[0].name} (${alerts[0].available} left)` : `Low stock on ${alerts.length} products`,
    shell(
      'Low stock',
      `<table role="presentation" width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px">
<tr style="background:#f8fafc"><th align="left">Product</th><th align="right">Available</th></tr>
${alerts.map((a) => `<tr style="border-top:1px solid #e2e8f0"><td>${h(a.name)}</td><td align="right"><b style="color:${a.available ? '#7a4d00' : '#b91c1c'}">${a.available ? a.available : 'Out of stock'}</b></td></tr>`).join('')}
</table><p><a href="${link}">Open inventory</a></p>`,
    ),
    alerts.map((a) => `- ${a.name}: ${a.available ? `${a.available} left` : 'OUT OF STOCK'}`).join('\n') + `\n\n${link}`,
  );
}

let registered = false;
/** Wires the mailer into the stock engine. Called once on first use (see jobs.ts). */
export function registerInventoryNotifications() {
  if (registered) return;
  registered = true;
  onStockEvents((e) => {
    if (e.assigned.length) void notifyAssigned(e.assigned).catch((err) => console.warn('[Inventory] notify assigned:', err));
    if (e.cancelled.length) void notifyCancelled(e.cancelled).catch((err) => console.warn('[Inventory] notify cancelled:', err));
  });
  onLowStock((alerts) => void notifyLow(alerts).catch((err) => console.warn('[Inventory] notify low stock:', err)));
}
