import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as all } from "./db_CrQR8QZK.mjs";
import { s as num } from "./format_6aaLy6w7.mjs";
import { i as USABLE_SQL } from "./stock_CkuKY_dx.mjs";
import { t as $$Icon } from "./Icon_DmevXm4a.mjs";
import { t as $$Admin } from "./Admin_jHwtJnua.mjs";
import { t as $$InventoryNav } from "./InventoryNav_B758Thv_.mjs";
import { t as ago } from "./format_DKM6ep4K.mjs";
//#region src/pages/admin/inventory/sources/index.astro
var sources_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const sources = all(`SELECT s.*, CASE WHEN ${USABLE_SQL} THEN 1 ELSE 0 END AS usable,
     (SELECT COUNT(*) FROM inv_stock st WHERE st.source_id = s.id) AS products,
     (SELECT COALESCE(SUM(qty), 0) FROM inv_stock st WHERE st.source_id = s.id) AS units,
     (SELECT COUNT(*) FROM inv_allocations a WHERE a.source_id = s.id AND a.status IN ('ASSIGNED','ACCEPTED')) AS open_lines,
     (SELECT COUNT(*) FROM inv_allocations a WHERE a.source_id = s.id AND a.status IN ('SHIPPED','DELIVERED') AND a.updated_at >= datetime('now', '-30 days')) AS shipped_30
   FROM inv_sources s ORDER BY CASE s.kind WHEN 'own' THEN 0 ELSE 1 END, s.active DESC, s.priority, s.name`);
	const METHOD = {
		manual: "You",
		portal: "Vendor (Seller Hub)"
	};
	const deleted = Astro.url.searchParams.get("deleted");
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": "Vendors",
		"active": "vendors"
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="inv"> <div class="page-head"> <div> <h1>Vendors</h1> <p>Everyone who ships orders for you. Orders go to your own stock first, then to the vendor with the lowest priority number.</p> </div> <a class="btn" href="/admin/inventory/sources/new">${renderComponent($$result, "Icon", $$Icon, { "name": "plus" })} Add vendor</a> </div> ${renderComponent($$result, "InventoryNav", $$InventoryNav, { "active": "sources" })} ${deleted && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">Vendor deleted.</p>`} <div class="table-wrap"> <table class="tbl"> <thead> <tr> <th scope="col">Vendor</th> <th scope="col" class="num">Priority</th> <th scope="col">Stock updates</th> <th scope="col">Stock checked</th> <th scope="col" class="num">Products</th> <th scope="col" class="num">Units</th> <th scope="col" class="num">Waiting to ship</th> <th scope="col" class="num">Shipped, 30 days</th> </tr> </thead> <tbody> ${sources.map((s) => renderTemplate`<tr> <td> <a class="row-link"${addAttribute(`/admin/inventory/sources/${s.id}`, "href")}>${s.name}</a> <div class="small muted">${s.kind === "own" ? "Your own stock" : [s.contact_name, s.city].filter(Boolean).join(" · ") || "Vendor"}</div> </td> <td class="num">${s.kind === "own" ? "—" : s.priority}</td> <td>${s.kind === "own" ? "You" : METHOD[s.update_method]}</td> <td> ${!s.active ? renderTemplate`<span class="pill">Switched off</span>` : s.kind === "own" ? renderTemplate`<span class="pill good">Always selling</span>` : s.usable ? renderTemplate`<span class="pill good">${ago(s.stock_updated_at)}</span>` : renderTemplate`<span class="pill bad"${addAttribute(`Not confirmed within ${s.stale_hours} hours, so it is not being sold`, "title")}>Paused · ${ago(s.stock_updated_at)}</span>`} </td> <td class="num">${num(s.products)}</td> <td class="num">${num(s.units)}</td> <td class="num">${s.open_lines || ""}</td> <td class="num">${s.shipped_30 || ""}</td> </tr>`)} </tbody> </table> </div> </div> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/admin/inventory/sources/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/inventory/sources/index.astro";
var $$url = "/admin/inventory/sources.html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/inventory/sources/index@_@astro
var page = () => sources_exports;
//#endregion
export { page };
