import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, T as Fragment, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as all } from "./db_CrQR8QZK.mjs";
import { t as $$Admin } from "./Admin_jHwtJnua.mjs";
import { t as $$InventoryNav } from "./InventoryNav_B758Thv_.mjs";
import { n as when } from "./format_DKM6ep4K.mjs";
//#region src/pages/admin/inventory/movements.astro
var movements_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Movements,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Movements = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Movements;
	const sp = Astro.url.searchParams;
	const source = Number(sp.get("source")) || 0;
	const product = Number(sp.get("product")) || 0;
	const kind = sp.get("kind") ?? "";
	const KINDS = {
		SET: "Set by admin",
		PORTAL: "Vendor (seller hub)",
		SHIPPED: "Shipped to customer",
		RETURNED: "Returned",
		ADJUST: "Adjustment"
	};
	const where = [];
	const params = [];
	if (source) {
		where.push("m.source_id = ?");
		params.push(source);
	}
	if (product) {
		where.push("m.product_id = ?");
		params.push(product);
	}
	if (KINDS[kind]) {
		where.push("m.kind = ?");
		params.push(kind);
	}
	const rows = all(`SELECT m.*, s.name AS source_name, p.name AS product_name FROM inv_movements m
   LEFT JOIN inv_sources s ON s.id = m.source_id LEFT JOIN products p ON p.id = m.product_id
   ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY m.id DESC LIMIT 400`, ...params);
	const sources = all("SELECT id, name FROM inv_sources ORDER BY CASE kind WHEN 'own' THEN 0 ELSE 1 END, name");
	const productName = product ? all("SELECT name FROM products WHERE id = ?", product)[0]?.name : "";
	const sel = "min-height:40px;border:1.5px solid var(--line-strong);border-radius:8px;padding:0 8px";
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": "Stock history",
		"active": "inventory"
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="inv"> <div class="page-head"> <div> <h1>Stock history</h1> <p>Every change to a quantity, who made it and why. Quantities only — no prices.${productName && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` Showing <b>${productName}</b> · <a href="/admin/inventory/movements">all products</a>` })}`}</p> </div> </div> ${renderComponent($$result, "InventoryNav", $$InventoryNav, { "active": "movements" })} <form method="get" class="toolbar"> ${product > 0 && renderTemplate`<input type="hidden" name="product"${addAttribute(product, "value")}>`} <select name="source" aria-label="Stock with"${addAttribute(sel, "style")}> <option value="">Everyone</option> ${sources.map((s) => renderTemplate`<option${addAttribute(s.id, "value")}${addAttribute(s.id === source, "selected")}>${s.name}</option>`)} </select> <select name="kind" aria-label="Type"${addAttribute(sel, "style")}> <option value="">All changes</option> ${Object.entries(KINDS).map(([k, label]) => renderTemplate`<option${addAttribute(k, "value")}${addAttribute(k === kind, "selected")}>${label}</option>`)} </select> <button class="btn btn--sm btn--ghost" type="submit">Filter</button> </form> <div class="table-wrap"> ${rows.length ? renderTemplate`<table class="tbl"> <thead> <tr> <th scope="col">When</th> <th scope="col">Product</th> <th scope="col">Stock with</th> <th scope="col">Change</th> <th scope="col" class="num">Units</th> <th scope="col" class="num">Now</th> <th scope="col">By</th> </tr> </thead> <tbody> ${rows.map((m) => renderTemplate`<tr> <td class="small">${when(m.created_at)}</td> <td><a${addAttribute(`/admin/inventory/products/${m.product_id}`, "href")}>${m.product_name ?? `#${m.product_id}`}</a></td> <td>${m.source_name ?? "—"}</td> <td> ${KINDS[m.kind] ?? m.kind} ${(m.ref || m.note) && renderTemplate`<div class="small muted">${[m.ref, m.note].filter(Boolean).join(" · ")}</div>`} </td> <td class="num"><span${addAttribute(m.delta > 0 ? "delta-pos" : "delta-neg", "class")}>${m.delta > 0 ? "+" : "−"}${Math.abs(m.delta)}</span></td> <td class="num">${m.qty_after}</td> <td class="small">${m.actor}</td> </tr>`)} </tbody> </table>` : renderTemplate`<p class="muted" style="padding:16px">No stock changes yet.</p>`} </div> </div> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/admin/inventory/movements.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/inventory/movements.astro";
var $$url = "/admin/inventory/movements.html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/inventory/movements@_@astro
var page = () => movements_exports;
//#endregion
export { page };
