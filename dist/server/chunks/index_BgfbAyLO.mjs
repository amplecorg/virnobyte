import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as all } from "./db_CrQR8QZK.mjs";
import { s as num } from "./format_6aaLy6w7.mjs";
import { v as setTracking } from "./stock_CkuKY_dx.mjs";
import { t as $$Admin } from "./Admin_jHwtJnua.mjs";
import { t as $$InventoryNav } from "./InventoryNav_B758Thv_.mjs";
//#region src/pages/admin/inventory/products/index.astro
var products_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	let flash = "";
	let error = "";
	if (Astro.request.method === "POST") {
		const f = await Astro.request.formData();
		const id = Number(f.get("product_id"));
		try {
			if (f.get("_action") === "track" && id) {
				setTracking(id, true);
				flash = "Stock is now automatic. Add units (yours or a vendor’s) so it can be sold.";
			} else if (f.get("_action") === "untrack" && id) {
				setTracking(id, false);
				flash = "Stock is now manual. Check the \"In stock\" switch on the product page.";
			}
		} catch (e) {
			error = e.message;
		}
	}
	const sp = Astro.url.searchParams;
	const view = sp.get("view") ?? "all";
	const q = sp.get("q")?.trim() ?? "";
	const where = [];
	const params = [];
	if (view === "tracked") where.push("ip.tracked = 1");
	if (view === "untracked") where.push("COALESCE(ip.tracked, 0) = 0");
	if (view === "out") where.push("ip.tracked = 1 AND ip.available = 0");
	if (view === "low") where.push("ip.tracked = 1 AND ip.available <= ip.low_level");
	if (q) {
		where.push("(p.name LIKE ? OR p.slug LIKE ? OR p.category LIKE ?)");
		params.push(`%${q}%`, `%${q}%`, `%${q}%`);
	}
	const rows = all(`SELECT p.id, p.name, p.slug, p.category, p.published, p.in_stock, ip.tracked, ip.available, ip.low_level,
     (SELECT group_concat(s.name || ': ' || st.qty, ' · ') FROM inv_stock st JOIN inv_sources s ON s.id = st.source_id WHERE st.product_id = p.id) AS breakdown,
     (SELECT COUNT(*) FROM inv_allocations a WHERE a.product_id = p.id AND a.status IN ('HELD','ASSIGNED','ACCEPTED')) AS open_lines
   FROM products p LEFT JOIN inv_products ip ON ip.product_id = p.id
   ${where.length ? "WHERE " + where.join(" AND ") : ""}
   ORDER BY COALESCE(ip.tracked, 0) DESC, p.sort, p.id LIMIT 500`, ...params);
	const VIEWS = [
		["all", "All products"],
		["tracked", "Automatic"],
		["untracked", "Manual"],
		["out", "Out of stock"],
		["low", "Low stock"]
	];
	const link = (v) => `/admin/inventory/products?view=${v}${q ? `&q=${encodeURIComponent(q)}` : ""}`;
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": "Stock",
		"active": "inventory"
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="inv"> <div class="page-head"> <div> <h1>Stock</h1> <p>Products with automatic stock are sold only while you or a vendor has units. Products set to manual keep the "In stock" switch on the product page.</p> </div> </div> ${renderComponent($$result, "InventoryNav", $$InventoryNav, { "active": "products" })} ${flash && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">${flash}</p>`} ${error && renderTemplate`<p class="alert alert--error" role="alert" style="margin-bottom:14px">${error}</p>`} <div class="toolbar"> <nav class="tabs" aria-label="Show"> ${VIEWS.map(([v, label]) => renderTemplate`<a${addAttribute(link(v), "href")}${addAttribute(v === view ? "true" : void 0, "aria-current")}>${label}</a>`)} </nav> <form method="get" style="margin-left:auto;display:flex;gap:8px"> <input type="hidden" name="view"${addAttribute(view, "value")}> <input type="search" name="q"${addAttribute(q, "value")} placeholder="Search products" aria-label="Search products"> </form> </div> <div class="table-wrap"> ${rows.length ? renderTemplate`<table class="tbl"> <thead> <tr> <th scope="col">Product</th> <th scope="col">Stock control</th> <th scope="col" class="num">Available now</th> <th scope="col">Where the stock is</th> <th scope="col" class="num">Waiting to ship</th> <th scope="col">On the site</th> <th scope="col"><span class="sr-only">Actions</span></th> </tr> </thead> <tbody> ${rows.map((r) => renderTemplate`<tr> <td> <a class="row-link"${addAttribute(`/admin/inventory/products/${r.id}`, "href")}>${r.name}</a> <div class="small muted">${r.category}${!r.published && " · hidden"}</div> </td> <td>${r.tracked ? renderTemplate`<span class="pill info">Automatic</span>` : renderTemplate`<span class="pill">Manual</span>`}</td> <td class="num"> ${r.tracked ? r.available > 0 ? renderTemplate`<span${addAttribute(["pill", r.available <= r.low_level ? "warn" : "good"], "class:list")}>${num(r.available)}</span>` : renderTemplate`<span class="pill bad">0</span>` : "—"} </td> <td class="small">${r.breakdown || renderTemplate`<span class="muted">Nobody has stock yet</span>`}</td> <td class="num">${r.open_lines || ""}</td> <td>${r.in_stock ? "In stock" : renderTemplate`<span style="color:var(--danger)">Out of stock</span>`}</td> <td> <form method="post"${addAttribute(r.tracked ? void 0 : "Switch this product to automatic stock? Until you or a vendor adds units it will show as out of stock on the site.", "data-confirm")}> <input type="hidden" name="product_id"${addAttribute(r.id, "value")}> ${r.tracked ? renderTemplate`<a class="btn btn--sm btn--ghost"${addAttribute(`/admin/inventory/products/${r.id}`, "href")}>Edit stock</a>` : renderTemplate`<button class="btn btn--sm btn--ghost" type="submit" name="_action" value="track">Make automatic</button>`} </form> </td> </tr>`)} </tbody> </table>` : renderTemplate`<p class="muted" style="padding:16px">No products match.</p>`} </div> </div> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/admin/inventory/products/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/inventory/products/index.astro";
var $$url = "/admin/inventory/products.html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/inventory/products/index@_@astro
var page = () => products_exports;
//#endregion
export { page };
