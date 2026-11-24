import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as renderScript } from "./script_BaVSnVKi.mjs";
import { c as confirmSourceStock } from "./stock_CkuKY_dx.mjs";
import { t as ago } from "./format_DKM6ep4K.mjs";
import { a as vendorFromCookies } from "./vendor_12Z6vgmZ.mjs";
import { t as $$Vendor } from "./Vendor_CItrIIYU.mjs";
import { a as listings, c as saveAvailability, l as sellerCounts, r as catalogSearch, s as removeListing, t as addListing } from "./seller_BRFr-ybJ.mjs";
//#region src/pages/vendor/inventory.astro
var inventory_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Inventory,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Inventory = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Inventory;
	const vendor = vendorFromCookies(Astro.cookies);
	const sp = Astro.url.searchParams;
	const view = [
		"all",
		"active",
		"low",
		"out"
	].includes(sp.get("view") ?? "") ? sp.get("view") : "all";
	const q = sp.get("q")?.trim() ?? "";
	const adding = sp.has("add");
	const addQ = sp.get("find")?.trim() ?? "";
	let flash = "";
	let error = "";
	if (vendor && Astro.request.method === "POST") {
		const f = await Astro.request.formData();
		const str = (k) => String(f.get(k) ?? "").trim();
		try {
			switch (str("_action")) {
				case "save": {
					const edits = [...f.keys()].filter((k) => k.startsWith("avail_")).map((k) => {
						const productId = Number(k.slice(6));
						return {
							productId,
							available: Number(str(k)),
							sku: f.has(`sku_${productId}`) ? str(`sku_${productId}`) : void 0
						};
					});
					const n = saveAvailability(vendor, edits);
					flash = n ? `Saved. ${n} product${n === 1 ? "" : "s"} updated and your stock is confirmed.` : "No changes — your stock is confirmed as correct.";
					break;
				}
				case "confirm":
					confirmSourceStock(vendor.id);
					flash = "Thank you — your stock is confirmed as correct.";
					break;
				case "add":
					addListing(vendor, Number(str("product_id")), str("sku"), Number(str("available")));
					flash = "Product added to your inventory.";
					break;
				case "remove":
					removeListing(vendor, Number(str("product_id")));
					flash = "Product removed from your inventory.";
			}
		} catch (e) {
			error = e.message;
		}
	}
	const all = vendor ? listings(vendor.id) : [];
	const statusOf = (avail) => avail === 0 ? "out" : avail <= 2 ? "low" : "active";
	const counts = {
		all: all.length,
		active: all.filter((l) => l.available > 2).length,
		low: all.filter((l) => statusOf(l.available) === "low").length,
		out: all.filter((l) => l.available === 0).length
	};
	const rows = all.filter((l) => view === "all" || statusOf(l.available) === view).filter((l) => !q || `${l.name} ${l.sku} ${l.category}`.toLowerCase().includes(q.toLowerCase()));
	const results = vendor && adding ? catalogSearch(vendor.id, addQ) : [];
	const orderCounts = vendor ? sellerCounts(vendor.id) : null;
	const lastConfirmed = vendor ? all.reduce((m, l) => !m || l.updated_at > m ? l.updated_at : m, null) : null;
	const VIEWS = [
		["all", "All"],
		["active", "In stock"],
		["low", "Low stock"],
		["out", "Out of stock"]
	];
	const STATUS_TEXT = {
		active: "In stock",
		low: "Low stock",
		out: "Out of stock"
	};
	return renderTemplate`${renderComponent($$result, "Vendor", $$Vendor, {
		"title": "Inventory",
		"vendorName": vendor?.name,
		"active": "inventory",
		"toShip": orderCounts?.toShip
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="sh-head"> <div> <h1>Manage inventory</h1> <p>Set how many units you can sell right now. Use + and −, then save.${lastConfirmed && ` Last change ${ago(lastConfirmed)}.`}</p> </div> <div class="btn-row"> ${all.length > 0 && renderTemplate`<form method="post"> <input type="hidden" name="_action" value="confirm"> <button class="btn btn--sm btn--ghost" type="submit">All stock is correct</button> </form>`} <a class="btn btn--sm sh-primary"${addAttribute(adding ? "/vendor/inventory" : "/vendor/inventory?add=1", "href")}>${adding ? "Close" : "+ Add a product"}</a> </div> </div> ${flash && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">${flash}</p>`}${error && renderTemplate`<p class="alert alert--error" role="alert" style="margin-bottom:14px">${error}</p>`}${adding && renderTemplate`<section class="sh-card"> <div class="sh-card-head"> <h2>Add a product from the Virnobyte catalogue</h2> </div> <form method="get" class="sh-tools"> <input type="hidden" name="add" value="1"> <input type="search" name="find"${addAttribute(addQ, "value")} placeholder="Search products, e.g. ThinkPad, SSD, CCTV" aria-label="Search the catalogue" autofocus> <button class="btn btn--sm btn--ghost" type="submit">Search</button> </form> ${results.length ? renderTemplate`<div class="sh-results"> ${results.map((p) => renderTemplate`<div class="sh-result"> ${p.image ? renderTemplate`<img class="sh-thumb" style="width:56px;height:56px"${addAttribute(p.image, "src")} alt="" loading="lazy">` : renderTemplate`<span class="sh-thumb empty" style="width:56px;height:56px">—</span>`} <div> <div class="sh-item-name">${p.name}</div> <div class="sh-meta">${p.category}</div> </div> <form method="post"> <input type="hidden" name="_action" value="add"> <input type="hidden" name="product_id"${addAttribute(p.id, "value")}> <input name="sku" placeholder="Your SKU (optional)" style="width:150px" aria-label="Your SKU"> <input name="available" type="number" min="0" step="1" value="1" style="width:80px" aria-label="Units available"> <button class="btn btn--sm" type="submit">Add</button> </form> </div>`)} </div>` : renderTemplate`<p class="muted">${addQ ? "No matching products you are not already selling." : "You already list every product in the catalogue."}</p>`} </section>`}<nav class="sh-tabs" aria-label="Filter"> ${VIEWS.map(([k, label]) => renderTemplate`<a${addAttribute(`/vendor/inventory?view=${k}${q ? `&q=${encodeURIComponent(q)}` : ""}`, "href")}${addAttribute(k === view ? "true" : void 0, "aria-current")}> ${label} (${counts[k]})
</a>`)} </nav> <form method="get" class="sh-tools"> <input type="hidden" name="view"${addAttribute(view, "value")}> <input type="search" name="q"${addAttribute(q, "value")} placeholder="Search by product name or SKU" aria-label="Search your inventory"> <button class="btn btn--sm btn--ghost" type="submit">Search</button> </form> ${rows.length ? renderTemplate`<form method="post" id="inv-form" class="sh-card" style="padding:0;overflow:hidden"> <input type="hidden" name="_action" value="save"> <table class="sh-inv"> <thead> <tr> <th style="width:76px"><span class="sr-only">Photo</span></th> <th>Product</th> <th>Status</th> <th>Your SKU</th> <th>Available to sell</th> <th class="num">Waiting to ship</th> <th><span class="sr-only">Remove</span></th> </tr> </thead> <tbody> ${rows.map((l) => renderTemplate`<tr data-row> <td class="sh-c-img">${l.image ? renderTemplate`<img class="sh-thumb"${addAttribute(l.image, "src")} alt="" loading="lazy">` : renderTemplate`<span class="sh-thumb empty">—</span>`}</td> <td> <div class="sh-item-name">${l.name}</div> <div class="sh-meta">${l.category} · updated ${ago(l.updated_at)}</div> </td> <td><span${addAttribute(["sh-status", statusOf(l.available)], "class:list")}>${STATUS_TEXT[statusOf(l.available)]}</span></td> <td><input class="sh-sku"${addAttribute(`sku_${l.product_id}`, "name")}${addAttribute(l.sku, "value")}${addAttribute(l.sku, "data-orig")} placeholder="—"${addAttribute(`Your SKU for ${l.name}`, "aria-label")}></td> <td> <div class="sh-step"> <button type="button" data-step="-1"${addAttribute(`One less ${l.name}`, "aria-label")}>−</button> <input type="number" min="0" step="1" inputmode="numeric"${addAttribute(`avail_${l.product_id}`, "name")}${addAttribute(l.available, "value")}${addAttribute(l.available, "data-orig")}${addAttribute(`Units of ${l.name} available`, "aria-label")}> <button type="button" data-step="1"${addAttribute(`One more ${l.name}`, "aria-label")}>+</button> </div> <button type="button" class="sh-linkbtn" style="display:block;font-size:12px;padding-top:6px" data-zero>Mark out of stock</button> </td> <td class="num">${l.reserved || "—"}</td> <td> <button class="sh-linkbtn" style="color:#b91c1c;font-size:13px" type="submit"${addAttribute(`rm-${l.product_id}`, "form")}>Remove</button> </td> </tr>`)} </tbody> </table> </form>` : renderTemplate`<section class="sh-card sh-empty"> <b>${all.length ? "No products match" : "Your inventory is empty"}</b> ${all.length ? "Try another filter or search." : "Use “+ Add a product” to choose what you will sell through Virnobyte."} </section>`}${rows.map((l) => renderTemplate`<form method="post"${addAttribute(`rm-${l.product_id}`, "id")}${addAttribute(`Stop selling ${l.name}?`, "data-confirm")} hidden> <input type="hidden" name="_action" value="remove"> <input type="hidden" name="product_id"${addAttribute(l.product_id, "value")}> </form>`)}<div class="sh-savebar" id="savebar" role="region" aria-label="Unsaved changes"> <div class="sh-savebar-inner"> <span id="savebar-text">You have unsaved changes</span> <div class="btn-row"> <button class="btn btn--sm btn--ghost" type="button" id="discard">Discard</button> <button class="btn btn--sm sh-primary" type="submit" form="inv-form">Save changes</button> </div> </div> </div> ` })}${renderScript($$result, "C:/Programming section/virnobyte/src/pages/vendor/inventory.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Programming section/virnobyte/src/pages/vendor/inventory.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/vendor/inventory.astro";
var $$url = "/vendor/inventory.html";
//#endregion
//#region \0virtual:astro:page:src/pages/vendor/inventory@_@astro
var page = () => inventory_exports;
//#endregion
export { page };
