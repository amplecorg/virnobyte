import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, T as Fragment, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as all } from "./db_CrQR8QZK.mjs";
import { n as getSettings } from "./settings_C74a6Mrw.mjs";
import { t as ALLOCATION_SELECT } from "./stock_CkuKY_dx.mjs";
import { n as when } from "./format_DKM6ep4K.mjs";
import { a as vendorFromCookies } from "./vendor_12Z6vgmZ.mjs";
import { t as $$Vendor } from "./Vendor_CItrIIYU.mjs";
//#region src/pages/vendor/slip.astro
var slip_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slip,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Slip = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slip;
	const vendor = vendorFromCookies(Astro.cookies);
	const ref = Astro.url.searchParams.get("order") ?? "";
	const lines = vendor ? all(`${ALLOCATION_SELECT} WHERE a.source_id = ? AND o.order_id = ? AND a.status IN ('ASSIGNED','ACCEPTED','SHIPPED','DELIVERED') ORDER BY a.id`, vendor.id, ref) : [];
	const o = lines[0];
	const b = getSettings().business;
	return renderTemplate`${renderComponent($$result, "Vendor", $$Vendor, {
		"title": `Packing slip ${ref}`,
		"vendorName": vendor?.name
	}, { "default": ($$result) => renderTemplate`${o ? renderTemplate`${maybeRenderHead($$result)}<section class="sh-card" style="max-width:760px;margin:0 auto"> <div class="no-print btn-row" style="justify-content:flex-end;margin-bottom:12px"> <button class="btn btn--sm" type="button" onclick="window.print()">Print</button> </div> <div style="display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;border-bottom:2px solid #0f1b2d;padding-bottom:12px;margin-bottom:16px"> <div> <img src="/virnobyte-logo.png" alt="Virnobyte" width="48" height="38"> <div style="font-weight:800;font-size:1.2rem">${b.name}</div> <div class="small">${b.phone} · ${b.email}</div> </div> <div style="text-align:right"> <div style="font-size:1.3rem;font-weight:800">Packing slip</div> <div>Order <b>${o.order_ref}</b></div> <div class="small">Ordered ${when(o.created_at)}</div> </div> </div> <div style="margin-bottom:16px"> <div class="small muted" style="text-transform:uppercase;letter-spacing:.05em">Ship to</div> <div style="font-size:1.05rem;line-height:1.5"> <b>${o.customer_name}</b> <br> ${o.address_line1} ${o.address_line2 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`<br>${o.address_line2}` })}`} <br> ${o.city}, ${o.state} ${o.pincode} <br>
Phone: ${o.customer_phone} </div> </div> <table class="sh-inv"> <thead> <tr><th>Item</th><th>SKU</th><th class="num">Qty</th></tr> </thead> <tbody> ${lines.map((l) => renderTemplate`<tr><td>${l.product_name}</td><td>${l.sku || "—"}</td><td class="num"><b>${l.qty}</b></td></tr>`)} </tbody> </table> <p class="small muted" style="margin-top:18px">Packed and shipped by ${vendor?.name} on behalf of ${b.name}. Questions about this order? Call ${b.phone}.</p> </section>` : renderTemplate`<section class="sh-card sh-empty"><b>Packing slip not found</b>This order is not assigned to you.</section>`}` })}`;
}, "C:/Programming section/virnobyte/src/pages/vendor/slip.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/vendor/slip.astro";
var $$url = "/vendor/slip.html";
//#endregion
//#region \0virtual:astro:page:src/pages/vendor/slip@_@astro
var page = () => slip_exports;
//#endregion
export { page };
