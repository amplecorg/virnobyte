import { t as sequence, ut as defineMiddleware } from "./chunks/sequence_BTIhAKFo.mjs";
import { n as all, r as db } from "./chunks/db_CrQR8QZK.mjs";
import { n as getSettings } from "./chunks/settings_C74a6Mrw.mjs";
import { r as sendEmail } from "./chunks/mail_DcBTvtJo.mjs";
import { u as userFromCookies } from "./chunks/auth_CFhoV3Rg.mjs";
import { n as escapeHtml } from "./chunks/format_6aaLy6w7.mjs";
import { t as generatePageMarkdown } from "./chunks/agent-markdown_DaH_EGiH.mjs";
import { f as onLowStock, l as expireHolds, m as reconcileOrderStock, o as allocationsByIds, p as onStockEvents, x as syncProducts } from "./chunks/stock_CkuKY_dx.mjs";
import { t as reconcileOrder } from "./chunks/checkout_DN7LKdrE.mjs";
import { n as refundOrderCoins } from "./chunks/coins_DfNIwne_.mjs";
//#region src/lib/inventory/notify.ts
/**
* Emails sent by inventory. Fire-and-forget: a mail failure never blocks an order or a stock update.
* Vendors only ever receive what they need to ship — products, quantities and the delivery
* address. Prices and amounts are never included.
*/
var env = typeof process !== "undefined" ? process.env : {};
var siteOrigin = () => (env.PUBLIC_SITE_URL || "https://virnobyte.com").trim().replace(/\/+$/, "");
/** Where internal inventory alerts go: INVENTORY_ALERT_EMAIL, else the business email. */
var teamEmail = () => env.INVENTORY_ALERT_EMAIL || getSettings().business.email;
var h = (s) => escapeHtml(String(s ?? ""));
function shell(title, bodyHtml) {
	return `<!doctype html><html><body style="margin:0;background:#f4f6f9;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#1e293b">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:28px 12px"><tr><td align="center">
<table role="presentation" width="100%" style="max-width:600px;background:#fff;border:1px solid #e2e8f0;border-radius:12px" cellpadding="0" cellspacing="0">
<tr><td style="background:#0b2545;padding:20px 28px;border-radius:12px 12px 0 0;color:#fff;font-weight:800;font-size:20px">VIRNO<span style="color:#38bdf8">BYTE</span></td></tr>
<tr><td style="padding:26px 28px"><h1 style="margin:0 0 14px;font-size:20px">${h(title)}</h1>${bodyHtml}</td></tr>
</table></td></tr></table></body></html>`;
}
function itemsTable(rows) {
	return `<table role="presentation" width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px;margin:12px 0">
<tr style="background:#f8fafc"><th align="left">Product</th><th align="left">Your SKU</th><th align="right">Qty</th></tr>
${rows.map((r) => `<tr style="border-top:1px solid #e2e8f0"><td>${h(r.product_name)}</td><td>${h(r.sku || "—")}</td><td align="right"><b>${r.qty}</b></td></tr>`).join("")}
</table>`;
}
function addressBlock(r) {
	return `<p style="margin:12px 0;padding:12px 14px;background:#f8fafc;border-radius:8px;font-size:14px;line-height:1.5">
<b>Ship to:</b> ${h(r.customer_name)} · ${h(r.customer_phone)}<br>${h(r.address_line1)}${r.address_line2 ? `, ${h(r.address_line2)}` : ""}<br>${h(r.city)}, ${h(r.state)} ${h(r.pincode)}</p>`;
}
function addressText(r) {
	return `Ship to: ${r.customer_name}, ${r.customer_phone}\n${r.address_line1}${r.address_line2 ? `, ${r.address_line2}` : ""}\n${r.city}, ${r.state} ${r.pincode}`;
}
var groupBy = (xs, key) => xs.reduce((m, x) => ((m[key(x)] ??= []).push(x), m), {});
async function send(to, subject, html, text) {
	if (!to) return;
	const res = await sendEmail({
		to,
		subject,
		html,
		text
	});
	if (!res.success) console.warn(`[Inventory] email to ${to} failed: ${res.error}`);
}
async function notifyAssigned(ids) {
	const rows = allocationsByIds(ids).filter((r) => r.status === "ASSIGNED" || r.status === "UNASSIGNED");
	const portal = `${siteOrigin()}/vendor`;
	for (const group of Object.values(groupBy(rows, (r) => `${r.source_id ?? "none"}|${r.order_ref}`))) {
		const r = group[0];
		const ref = r.order_ref;
		const admin = `${siteOrigin()}/admin/r/orders/${r.order_id}#shipping`;
		if (r.status === "UNASSIGNED" || !r.source_id) {
			await send(teamEmail(), `Action needed: no vendor has stock for order ${ref}`, shell(`Order ${ref} needs a vendor`, `<p>No vendor had enough stock for these items. Open the order and choose who ships them.</p>${itemsTable(group)}<p><a href="${admin}">Open the order</a></p>`), `No vendor had enough stock for order ${ref}:\n${group.map((g) => `- ${g.product_name} × ${g.qty}`).join("\n")}\n\nChoose a vendor: ${admin}`);
			continue;
		}
		if (r.source_kind === "own" || !r.source_email) {
			await send(teamEmail(), `Ship order ${ref} from ${r.source_name}`, shell(`Ship order ${ref}`, `<p>These items will ship from <b>${h(r.source_name)}</b>${r.source_kind === "vendor" ? " (no email on file — please tell them)" : ""}.</p>${itemsTable(group)}${addressBlock(r)}<p><a href="${admin}">Open the order</a></p>`), `Items to ship from ${r.source_name} for order ${ref}:\n${group.map((g) => `- ${g.product_name} × ${g.qty}`).join("\n")}\n\n${addressText(r)}\n\n${admin}`);
			continue;
		}
		await send(r.source_email, `New order to ship: ${ref}`, shell(`New order to ship: ${ref}`, `<p>Hello ${h(r.source_name)}, please pack and ship these items directly to the customer.</p>${itemsTable(group)}${addressBlock(r)}
<p>When it is on its way, confirm the shipment with the courier and tracking number in your Seller Hub. If you cannot ship it, use "Can't ship this order?" there.</p>
<p><a href="${portal}/orders" style="display:inline-block;background:#0b2545;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600">Open Seller Hub orders</a></p>
<p style="font-size:13px;color:#64748b">Please send it in plain packaging with the Virnobyte order number ${h(ref)} on the parcel.</p>`), `Hello ${r.source_name},\n\nPlease ship these items for Virnobyte order ${ref}:\n${group.map((g) => `- ${g.product_name}${g.sku ? ` (${g.sku})` : ""} × ${g.qty}`).join("\n")}\n\n${addressText(r)}\n\nWhen shipped, confirm it with the courier and tracking number in your Seller Hub: ${portal}/orders\n\nVirnobyte`);
	}
}
async function notifyCancelled(ids) {
	const rows = allocationsByIds(ids);
	for (const group of Object.values(groupBy(rows, (r) => `${r.source_id}|${r.order_ref}`))) {
		const r = group[0];
		await send(r.source_kind === "vendor" && r.source_email ? r.source_email : teamEmail(), `Do not ship: order ${r.order_ref} cancelled`, shell(`Please do not ship order ${r.order_ref}`, `<p>These items were cancelled or moved to another source. If already packed, please put them back into stock.</p>${itemsTable(group)}`), `Please do not ship order ${r.order_ref}. Cancelled items:\n${group.map((g) => `- ${g.product_name} × ${g.qty}`).join("\n")}\n\nVirnobyte`);
	}
}
async function notifyLow(alerts) {
	const link = `${siteOrigin()}/admin/inventory/products`;
	await send(teamEmail(), alerts.length === 1 ? `Low stock: ${alerts[0].name} (${alerts[0].available} left)` : `Low stock on ${alerts.length} products`, shell("Low stock", `<table role="presentation" width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px">
<tr style="background:#f8fafc"><th align="left">Product</th><th align="right">Available</th></tr>
${alerts.map((a) => `<tr style="border-top:1px solid #e2e8f0"><td>${h(a.name)}</td><td align="right"><b style="color:${a.available ? "#7a4d00" : "#b91c1c"}">${a.available ? a.available : "Out of stock"}</b></td></tr>`).join("")}
</table><p><a href="${link}">Open inventory</a></p>`), alerts.map((a) => `- ${a.name}: ${a.available ? `${a.available} left` : "OUT OF STOCK"}`).join("\n") + `\n\n${link}`);
}
var registered = false;
/** Wires the mailer into the stock engine. Called once on first use (see jobs.ts). */
function registerInventoryNotifications() {
	if (registered) return;
	registered = true;
	onStockEvents((e) => {
		if (e.assigned.length) notifyAssigned(e.assigned).catch((err) => console.warn("[Inventory] notify assigned:", err));
		if (e.cancelled.length) notifyCancelled(e.cancelled).catch((err) => console.warn("[Inventory] notify cancelled:", err));
	});
	onLowStock((alerts) => void notifyLow(alerts).catch((err) => console.warn("[Inventory] notify low stock:", err)));
}
//#endregion
//#region src/lib/commerce/housekeeping.ts
var ABANDON_HOURS = 24;
/**
* Orders that were never finished: a COD order whose OTP was never entered, or an online order
* that was never paid. After 24 hours they are cancelled, their coins go back to the customer and
* any held stock is released. Online orders are first re-checked with the gateway, so a real
* payment that simply reached us late is never cancelled.
*/
async function closeAbandonedOrders() {
	const d = db();
	if (!d) return 0;
	const stale = all(`SELECT id, order_id, order_status FROM orders
     WHERE order_status IN ('AWAITING_OTP','PENDING_PAYMENT') AND payment_status != 'PAID'
       AND created_at <= datetime('now', '-${ABANDON_HOURS} hours')
     LIMIT 50`);
	let closed = 0;
	for (const o of stale) {
		if (o.order_status === "PENDING_PAYMENT") {
			const fresh = await reconcileOrder(o.order_id).catch(() => void 0);
			if (!fresh || fresh.payment_status === "PAID") continue;
		}
		const why = o.order_status === "AWAITING_OTP" ? "OTP not entered within 24 hours" : "not paid within 24 hours";
		const res = d.prepare(`UPDATE orders SET order_status = 'CANCELLED', notes = trim(notes || ' [Auto-cancelled: ' || ? || ']'), updated_at = CURRENT_TIMESTAMP
         WHERE id = ? AND order_status = ? AND payment_status != 'PAID'`).run(why, o.id, o.order_status);
		if (!Number(res.changes)) continue;
		refundOrderCoins(o.order_id, o.order_status === "AWAITING_OTP" ? "order not confirmed" : "order not paid");
		reconcileOrderStock(o.id);
		closed++;
	}
	return closed;
}
//#endregion
//#region src/lib/inventory/jobs.ts
/**
* Background upkeep, started once per app process on the first request:
*  - every minute: release holds whose online payment never arrived
*  - every 5 minutes: full re-sync, so vendors whose stock went out of date stop counting
* Every step is idempotent, so several processes sharing the database is fine.
*/
var G = globalThis;
function startInventoryJobs() {
	registerInventoryNotifications();
	if (G.__vbInventoryJobs) return;
	G.__vbInventoryJobs = true;
	let tick = 0;
	let busy = false;
	const run = async () => {
		if (busy) return;
		busy = true;
		try {
			expireHolds();
			if (tick % 5 === 0) {
				syncProducts();
				await closeAbandonedOrders();
			}
		} catch (e) {
			console.warn("[Inventory] background job failed:", e);
		} finally {
			tick++;
			busy = false;
		}
	};
	const first = setTimeout(run, 3e3);
	const every = setInterval(run, 6e4);
	first.unref?.();
	every.unref?.();
}
//#endregion
//#region src/middleware.ts
var LEGACY = {
	"/memberships": "/membership",
	"/shop": "/products",
	"/my-account": "/account",
	"/terms-conditions": "/terms-and-conditions",
	"/terms-and-condition": "/terms-and-conditions",
	"/refund_returns": "/terms-and-conditions",
	"/policies": "/terms-and-conditions",
	"/cpu-desktop-and-laptop": "/services/computer-repair",
	"/annual-maintenance-contract": "/services/amc-services",
	"/latest-news": "/blog",
	"/contact-us": "/contact",
	"/our-certificates": "/about#certificates",
	"/our-leadership-vision": "/about",
	"/about-us": "/about",
	"/product/canon-printer": "/products",
	"/product/basic-plan": "/membership",
	"/product/professional-it-support": "/membership",
	"/product/enterprise-it-care": "/membership",
	"/product/premium-it-partner": "/membership"
};
var PRIVATE = /^\/(admin|account|api|vendor)(\/|$)/;
var SHOPPER = /^\/(cart|checkout|order-success|order-verify)(\/|$)/;
var onRequest$1 = defineMiddleware(async (ctx, next) => {
	try {
		startInventoryJobs();
	} catch (err) {
		console.error("[Inventory] could not start background jobs:", err?.message);
	}
	const url = ctx.url;
	const pathname = new URL(ctx.request.url).pathname;
	if (!pathname.startsWith("/_") && !pathname.startsWith("/uploads/") && ctx.request.method === "GET") {
		let clean = pathname.replace(/\/{2,}/g, "/");
		if (clean.length > 1 && clean.endsWith("/")) clean = clean.replace(/\/+$/, "");
		if (!PRIVATE.test(clean)) clean = clean.toLowerCase();
		const target = LEGACY[clean] ?? clean;
		if (target !== pathname) return ctx.redirect(target + url.search, 301);
	}
	const accept = ctx.request.headers.get("accept") || "";
	if ((accept.includes("text/markdown") || accept.includes("text/x-markdown") || url.searchParams.get("format") === "markdown") && ctx.request.method === "GET" && !PRIVATE.test(pathname) && !SHOPPER.test(pathname)) {
		const md = generatePageMarkdown(pathname, url.origin);
		if (md) return new Response(md, {
			status: 200,
			headers: {
				"Content-Type": "text/markdown; charset=utf-8",
				"Vary": "Accept",
				"X-Content-Type-Options": "nosniff",
				"Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400"
			}
		});
	}
	let user = null;
	try {
		user = userFromCookies(ctx.cookies);
	} catch (err) {
		console.error("[Middleware Auth Error]:", err?.message);
	}
	ctx.locals.user = user;
	if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
		if (!user || user.role !== "admin") return ctx.redirect(`/admin/login?next=${encodeURIComponent(pathname)}`);
	}
	if (pathname.startsWith("/api/admin") && (!user || user.role !== "admin")) return new Response("Forbidden", { status: 403 });
	if (pathname === "/account" || pathname.startsWith("/account/") && !/^\/account\/(login|register|forgot-password|reset-password|google|google\/callback)$/.test(pathname)) {
		if (!user) return ctx.redirect(`/account/login?next=${encodeURIComponent(pathname + url.search)}`);
	}
	if (pathname === "/checkout" || pathname.startsWith("/checkout/")) {
		if (!user) return ctx.redirect(`/account/login?next=${encodeURIComponent(pathname + url.search)}`);
	}
	const res = await next();
	const h = res.headers;
	h.set("X-Content-Type-Options", "nosniff");
	h.set("Referrer-Policy", "strict-origin-when-cross-origin");
	h.set("X-Frame-Options", "SAMEORIGIN");
	h.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
	if (PRIVATE.test(pathname) || SHOPPER.test(pathname)) {
		h.set("Cache-Control", "private, no-store");
		h.set("X-Robots-Tag", "noindex, nofollow");
	} else if (!h.has("Cache-Control") && (h.get("content-type") ?? "").includes("text/html")) h.set("Cache-Control", user ? "private, no-cache" : "public, max-age=0, s-maxage=60, stale-while-revalidate=600");
	return res;
});
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(onRequest$1);
//#endregion
export { onRequest };
