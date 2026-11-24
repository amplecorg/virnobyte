import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as all } from "./db_CrQR8QZK.mjs";
import { c as confirmSourceStock } from "./stock_CkuKY_dx.mjs";
import { t as ago } from "./format_DKM6ep4K.mjs";
import { a as vendorFromCookies } from "./vendor_12Z6vgmZ.mjs";
import { t as $$Vendor } from "./Vendor_CItrIIYU.mjs";
import { a as listings, l as sellerCounts, u as sellerOrders } from "./seller_BRFr-ybJ.mjs";
//#region src/pages/vendor/index.astro
var vendor_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const vendor = vendorFromCookies(Astro.cookies);
	let flash = "";
	if (vendor && Astro.request.method === "POST") {
		if ((await Astro.request.formData()).get("_action") === "confirm") {
			confirmSourceStock(vendor.id);
			flash = "Thank you — your stock is confirmed as correct.";
		}
	}
	const src = vendor ? all("SELECT stock_updated_at, stale_hours FROM inv_sources WHERE id = ?", vendor.id)[0] : null;
	const counts = vendor ? sellerCounts(vendor.id) : null;
	const toShip = vendor ? sellerOrders(vendor.id, "unshipped", "", 5) : [];
	const items = vendor ? listings(vendor.id) : [];
	const outOf = items.filter((l) => l.available === 0);
	const low = items.filter((l) => l.available > 0 && l.available <= 2);
	const hoursSince = src?.stock_updated_at ? (Date.now() - +/* @__PURE__ */ new Date(src.stock_updated_at.replace(" ", "T") + "Z")) / 36e5 : Infinity;
	const stale = !!src?.stale_hours && hoursSince > src.stale_hours;
	const dueSoon = !!src?.stale_hours && !stale && hoursSince > src.stale_hours * .6;
	const fmtShipBy = (d) => d ? d.toLocaleString("en-IN", {
		timeZone: "Asia/Kolkata",
		weekday: "short",
		day: "numeric",
		month: "short",
		hour: "numeric",
		minute: "2-digit"
	}) : "—";
	return renderTemplate`${renderComponent($$result, "Vendor", $$Vendor, {
		"title": "Home",
		"vendorName": vendor?.name,
		"active": "home",
		"toShip": counts?.toShip
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="sh-head"> <div> <h1>Hello, ${vendor?.name}</h1> <p>Here is what needs your attention today.</p> </div> </div> ${flash && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">${flash}</p>`}${items.length === 0 ? renderTemplate`<section class="sh-card"> <h2>Welcome! Let's get you selling</h2> <ol style="margin:0 0 14px;padding-left:20px;line-height:1.9"> <li><b>Add the products you sell</b> and how many you have.</li> <li>When an order comes, you get an email and it shows under <b>Orders</b>.</li> <li>Pack it, ship it, and press <b>Confirm shipment</b>.</li> </ol> <a class="btn sh-primary" href="/vendor/inventory?add=1">+ Add your first product</a> </section>` : renderTemplate`<div${addAttribute(["sh-banner", stale ? "bad" : dueSoon ? "" : "ok"], "class:list")}> <p> ${stale ? `Your products are paused: stock not confirmed for ${src?.stale_hours} hours. Check your numbers and confirm.` : `Stock confirmed ${ago(src?.stock_updated_at)}.${src?.stale_hours ? ` Please confirm at least every ${src.stale_hours} hours to keep selling.` : ""}`} </p> <div class="btn-row"> <a class="btn btn--sm btn--ghost" href="/vendor/inventory">Update stock</a> <form method="post"> <input type="hidden" name="_action" value="confirm"> <button class="btn btn--sm" type="submit">My stock is correct</button> </form> </div> </div>`}<div class="sh-metrics"> <a class="sh-metric" href="/vendor/orders"><span>Orders to ship</span><b>${counts?.toShip ?? 0}</b><small>View orders →</small></a> <a${addAttribute(["sh-metric", counts?.late ? "alert-red" : ""], "class:list")} href="/vendor/orders"><span>Late shipments</span><b>${counts?.late ?? 0}</b><small>Ship within 48 hours</small></a> <a class="sh-metric" href="/vendor/orders?tab=shipped"><span>On the way</span><b>${counts?.inTransit ?? 0}</b><small>Shipped orders →</small></a> <a${addAttribute(["sh-metric", outOf.length ? "alert-red" : ""], "class:list")} href="/vendor/inventory?view=out"><span>Out of stock</span><b>${outOf.length}</b><small>Restock →</small></a> <a class="sh-metric" href="/vendor/inventory"><span>Your products</span><b>${items.length}</b><small>Manage inventory →</small></a> </div> <div class="split-2"> <section class="sh-card"> <div class="sh-card-head"> <h2>Orders to ship</h2> <a class="small" href="/vendor/orders">See all</a> </div> ${toShip.length ? renderTemplate`<ul class="sh-list"> ${toShip.map((o) => renderTemplate`<li> <span> <a${addAttribute(`/vendor/orders?q=${encodeURIComponent(o.ref)}`, "href")}><b>${o.ref}</b></a> <span class="sh-meta"> ${o.lines.map((l) => `${l.product_name} × ${l.qty}`).join(", ").slice(0, 90)} </span> </span> <span class="small"${addAttribute(o.late ? "color:#b91c1c;font-weight:700;white-space:nowrap" : "white-space:nowrap", "style")}> ${o.late ? "Late" : "Ship by"} ${fmtShipBy(o.shipBy)} </span> </li>`)} </ul>` : renderTemplate`<div class="sh-empty"><b>All caught up</b>New orders appear here and in your email.</div>`} </section> <section class="sh-card"> <div class="sh-card-head"> <h2>Stock to look at</h2> <a class="small" href="/vendor/inventory">Inventory</a> </div> ${outOf.length + low.length ? renderTemplate`<ul class="sh-list"> ${[...outOf, ...low].slice(0, 8).map((l) => renderTemplate`<li> <span>${l.name}</span> <span${addAttribute(["sh-status", l.available ? "low" : "out"], "class:list")}>${l.available ? `${l.available} left` : "Out of stock"}</span> </li>`)} </ul>` : renderTemplate`<div class="sh-empty"><b>Stock looks good</b>No products are out of stock or running low.</div>`} <p class="small muted" style="margin-top:10px">Last 30 days: ${counts?.delivered30 ?? 0} orders delivered · ${counts?.shipped7 ?? 0} shipped this week.</p> </section> </div> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/vendor/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/vendor/index.astro";
var $$url = "/vendor.html";
//#endregion
//#region \0virtual:astro:page:src/pages/vendor/index@_@astro
var page = () => vendor_exports;
//#endregion
export { page };
