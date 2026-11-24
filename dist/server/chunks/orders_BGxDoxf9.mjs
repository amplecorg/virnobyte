import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, T as Fragment, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as STATUS_LABEL } from "./stock_CkuKY_dx.mjs";
import { n as when } from "./format_DKM6ep4K.mjs";
import { a as vendorFromCookies } from "./vendor_12Z6vgmZ.mjs";
import { t as $$Vendor } from "./Vendor_CItrIIYU.mjs";
import { i as confirmShipment, l as sellerCounts, n as cannotFulfil, o as markDelivered, u as sellerOrders } from "./seller_BRFr-ybJ.mjs";
//#region src/pages/vendor/orders.astro
var orders_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Orders,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Orders = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Orders;
	const vendor = vendorFromCookies(Astro.cookies);
	const sp = Astro.url.searchParams;
	const TABS = [
		["unshipped", "Unshipped"],
		["shipped", "Shipped"],
		["delivered", "Delivered"],
		["cancelled", "Cancelled"]
	];
	const tab = TABS.find(([k]) => k === sp.get("tab"))?.[0] ?? "unshipped";
	const q = sp.get("q")?.trim() ?? "";
	let flash = "";
	let error = "";
	if (vendor && Astro.request.method === "POST") {
		const f = await Astro.request.formData();
		const str = (k) => String(f.get(k) ?? "").trim();
		const orderId = Number(str("order_id"));
		try {
			switch (str("_action")) {
				case "ship":
					flash = confirmShipment(vendor, orderId, str("courier"), str("tracking_no"));
					break;
				case "deliver":
					flash = markDelivered(vendor, orderId);
					break;
				case "cancel": flash = cannotFulfil(vendor, orderId, str("reason") ? [str("reason"), str("other")].filter(Boolean).join(": ") : "");
			}
		} catch (e) {
			error = e.message;
		}
	}
	const counts = vendor ? sellerCounts(vendor.id) : null;
	const orders = vendor ? q ? [
		"unshipped",
		"shipped",
		"delivered",
		"cancelled"
	].flatMap((t) => sellerOrders(vendor.id, t, q).map((o) => ({
		...o,
		tab: t
	}))) : sellerOrders(vendor.id, tab).map((o) => ({
		...o,
		tab
	})) : [];
	const COURIERS = [
		"Delhivery",
		"Blue Dart",
		"DTDC",
		"Ekart",
		"Xpressbees",
		"Shadowfax",
		"Ecom Express",
		"India Post",
		"Professional Couriers",
		"Own delivery"
	];
	const REASONS = [
		"Out of stock",
		"Item damaged / failed check",
		"Cannot deliver to this pincode",
		"Price or listing error",
		"Other"
	];
	const fmt = (d) => d ? d.toLocaleString("en-IN", {
		timeZone: "Asia/Kolkata",
		weekday: "short",
		day: "numeric",
		month: "short",
		hour: "numeric",
		minute: "2-digit"
	}) : "—";
	const tabLink = (k) => `/vendor/orders?tab=${k}`;
	return renderTemplate`${renderComponent($$result, "Vendor", $$Vendor, {
		"title": "Orders",
		"vendorName": vendor?.name,
		"active": "orders",
		"toShip": counts?.toShip
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="sh-head"> <div> <h1>Manage orders</h1> <p>Ship within 48 hours of an order arriving, then press Confirm shipment and add the courier and tracking number.</p> </div> </div> ${flash && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">${flash}</p>`}${error && renderTemplate`<p class="alert alert--error" role="alert" style="margin-bottom:14px">${error}</p>`}<nav class="sh-tabs" aria-label="Order status"> ${TABS.map(([k, label]) => renderTemplate`<a${addAttribute(tabLink(k), "href")}${addAttribute(!q && k === tab ? "true" : void 0, "aria-current")}> ${label}${k === "unshipped" && counts?.toShip ? ` (${counts.toShip})` : k === "shipped" && counts?.inTransit ? ` (${counts.inTransit})` : ""} </a>`)} </nav> <form method="get" class="sh-tools"> <input type="hidden" name="tab"${addAttribute(tab, "value")}> <input type="search" name="q"${addAttribute(q, "value")} placeholder="Search order ID or customer name" aria-label="Search orders"> <button class="btn btn--sm btn--ghost" type="submit">Search</button> ${q && renderTemplate`<a class="small"${addAttribute(tabLink(tab), "href")}>Clear</a>`} </form> <datalist id="couriers">${COURIERS.map((c) => renderTemplate`<option${addAttribute(c, "value")}></option>`)}</datalist> ${orders.length ? orders.map((o) => renderTemplate`<article${addAttribute(["sh-order", o.late && "late"], "class:list")}> <div class="sh-order-head"> <div><span>Order ID</span><b>${o.ref}</b></div> <div><span>Order received</span><b>${when(o.assignedAt ?? o.placedAt)}</b></div> ${o.tab === "unshipped" && renderTemplate`<div${addAttribute([o.late && "late-tag"], "class:list")}> <span>${o.late ? "Late — ship now" : "Ship by"}</span> <b${addAttribute([o.late && "late-tag"], "class:list")}>${fmt(o.shipBy)}</b> </div>`} ${o.tab !== "unshipped" && renderTemplate`<div><span>Status</span><b>${STATUS_LABEL[o.lines[0].status]}</b></div>`} </div> <div class="sh-order-body"> <div> ${o.lines.map((l) => renderTemplate`<div class="sh-item"> ${l.image ? renderTemplate`<img class="sh-thumb"${addAttribute(l.image, "src")} alt="" loading="lazy">` : renderTemplate`<span class="sh-thumb empty">No photo</span>`} <div> <div class="sh-item-name">${l.product_name}</div> <div class="sh-meta">${l.sku ? `Your SKU: ${l.sku}` : "No SKU set"}</div> <span class="sh-qty">Qty: ${l.qty}</span> ${l.status === "REJECTED" && l.note && renderTemplate`<div class="sh-meta">Reason: ${l.note}</div>`} </div> </div>`)} </div> <div class="sh-addr"> ${o.tab === "unshipped" || o.tab === "shipped" ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <h3>Ship to</h3> <b>${o.customer.name}</b> <br> ${o.customer.line1} ${o.customer.line2 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<br>${o.customer.line2}` })}`} <br> ${o.customer.city}, ${o.customer.state} ${o.customer.pincode} <br>
Phone: <a${addAttribute(`tel:+91${o.customer.phone}`, "href")}>${o.customer.phone}</a> ` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <h3>Customer</h3> ${o.customer.name}, ${o.customer.city} ` })}`} </div> <div class="sh-actions no-print"> ${o.tab === "unshipped" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <details class="sh-more"${addAttribute(o.late, "open")}> <summary class="btn btn--sm sh-primary">Confirm shipment</summary> <form method="post" class="sh-drop"> <input type="hidden" name="_action" value="ship"> <input type="hidden" name="order_id"${addAttribute(o.orderId, "value")}> <label>
Courier
<input name="courier" list="couriers" required placeholder="e.g. Delhivery" autocomplete="off"> </label> <label>
Tracking number <span class="muted">(optional)</span> <input name="tracking_no" placeholder="AWB / tracking ID" autocomplete="off"> </label> <button class="btn btn--sm" type="submit">Confirm shipment</button> </form> </details> <a class="btn btn--sm btn--ghost"${addAttribute(`/vendor/slip?order=${encodeURIComponent(o.ref)}`, "href")} target="_blank" rel="noopener">Print packing slip</a> <details class="sh-more"> <summary class="sh-linkbtn">Can't ship this order?</summary> <form method="post" class="sh-drop" data-confirm="Cancel this order for you? Virnobyte will give it to another seller."> <input type="hidden" name="_action" value="cancel"> <input type="hidden" name="order_id"${addAttribute(o.orderId, "value")}> <label>
Reason
<select name="reason" required> <option value="">Choose…</option> ${REASONS.map((r) => renderTemplate`<option${addAttribute(r, "value")}>${r}</option>`)} </select> </label> <label>
Details <span class="muted">(optional)</span> <input name="other" placeholder="Anything we should know"> </label> <button class="btn btn--sm btn--danger" type="submit">Cancel order</button> </form> </details> ` })}`} ${o.tab === "shipped" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <div class="sh-track"> ${o.lines[0].courier}${o.lines[0].tracking_no && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` · <b>${o.lines[0].tracking_no}</b>` })}`} <br>
Shipped ${when(o.lines[0].shipped_at)} </div> <form method="post"> <input type="hidden" name="_action" value="deliver"> <input type="hidden" name="order_id"${addAttribute(o.orderId, "value")}> <button class="btn btn--sm btn--ghost" type="submit">Mark as delivered</button> </form> <a class="sh-linkbtn"${addAttribute(`/vendor/slip?order=${encodeURIComponent(o.ref)}`, "href")} target="_blank" rel="noopener">Packing slip</a> ` })}`} ${o.tab === "delivered" && o.lines[0].courier && renderTemplate`<div class="sh-track">${o.lines[0].courier}${o.lines[0].tracking_no && ` · ${o.lines[0].tracking_no}`}</div>`} ${o.tab === "cancelled" && renderTemplate`<p class="small muted">Do not ship. No action needed.</p>`} </div> </div> </article>`) : renderTemplate`<section class="sh-card sh-empty"> <b>${q ? "No orders match your search" : tab === "unshipped" ? "No orders to ship" : "Nothing here yet"}</b> ${tab === "unshipped" && !q ? "New orders appear here and in your email as soon as a customer buys." : ""} </section>`}` })}`;
}, "C:/Programming section/virnobyte/src/pages/vendor/orders.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/vendor/orders.astro";
var $$url = "/vendor/orders.html";
//#endregion
//#region \0virtual:astro:page:src/pages/vendor/orders@_@astro
var page = () => orders_exports;
//#endregion
export { page };
