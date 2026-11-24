import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, T as Fragment, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { a as inr, r as formatDate } from "./format_6aaLy6w7.mjs";
import { y as shippingSummaries } from "./stock_CkuKY_dx.mjs";
import { t as $$Icon } from "./Icon_DmevXm4a.mjs";
import { t as $$Admin } from "./Admin_jHwtJnua.mjs";
/* empty css                    */
import { t as $$FilterBar } from "./FilterBar_Z0B8yZID.mjs";
import { t as RESOURCES } from "./resources_B1Whtlrk.mjs";
import { i as readFilters, n as listRows, t as filterOptions } from "./forms_DglaNJcN.mjs";
//#region src/pages/admin/r/[resource]/index.astro
var _resource__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const def = RESOURCES[Astro.params.resource];
	if (!def) return Astro.redirect("/admin");
	const sp = Astro.url.searchParams;
	const q = sp.get("q")?.trim() ?? "";
	const values = readFilters(def, sp);
	const sort = sp.get("sort") ?? "";
	const { rows, count, total } = listRows(def, q, values, sort);
	const filters = (def.filters ?? []).map((f) => f.type === "select" ? {
		...f,
		resolvedOptions: filterOptions(def, f)
	} : f);
	const filtered = q || Object.keys(values).length > 0;
	const plural = (w) => /[^aeiou]y$/.test(w) ? w.slice(0, -1) + "ies" : /(s|x|ch|sh)$/.test(w) ? w + "es" : w + "s";
	const saved = Astro.url.searchParams.get("saved");
	const deleted = Astro.url.searchParams.get("deleted");
	const first = def.columns[0].name;
	const isOrders = def.key === "orders";
	const shipping = isOrders ? shippingSummaries(rows.map((r) => Number(r.id))) : /* @__PURE__ */ new Map();
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": def.label,
		"active": def.key
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="page-head"> <div> <h1>${def.label}</h1> ${def.intro && renderTemplate`<p>${def.intro}</p>`} </div> ${def.canCreate !== false && renderTemplate`<a class="btn"${addAttribute(`/admin/r/${def.key}/new`, "href")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "plus" })} New ${def.singular} </a>`} </div> ${saved && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">Saved.</p>`}${deleted && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">Deleted.</p>`}${renderComponent($$result, "FilterBar", $$FilterBar, {
		"filters": filters,
		"values": values,
		"q": q,
		"sorts": def.sorts,
		"sort": sort,
		"count": count,
		"shown": Math.min(count, 500),
		"total": def.sumColumn ? total : null,
		"noun": plural(def.singular),
		"one": def.singular,
		"searchable": !!def.search?.length
	})} <div class="table-wrap"> ${rows.length ? renderTemplate`<table class="tbl"> <thead> <tr> ${def.columns.map((c) => renderTemplate`<th scope="col"${addAttribute(c.type === "money" ? "num" : void 0, "class")}>${c.label}</th>`)} ${def.publicUrl && renderTemplate`<th scope="col"><span class="sr-only">View</span></th>`} </tr> </thead> <tbody> ${rows.map((r) => {
		const url = def.publicUrl?.(r);
		return renderTemplate`<tr> ${def.columns.map((c) => {
			const v = r[c.name];
			const content = c.type === "bool" ? renderTemplate`<span${addAttribute(["pill", v ? "on" : "off"], "class:list")}>${v ? "Yes" : "No"}</span>` : c.type === "money" ? v == null ? "—" : inr(v) : c.type === "date" ? formatDate(v) : c.type === "status" ? renderTemplate`<span${addAttribute(["pill", v], "class:list")}>${v}</span>` : v;
			const ship = isOrders && c.name === "order_status" ? shipping.get(r.id) : void 0;
			return renderTemplate`<td${addAttribute([c.type === "money" && "num", ship && "inv"], "class:list")}> ${c.name === first ? renderTemplate`<a class="row-link"${addAttribute(`/admin/r/${def.key}/${r.id}`, "href")}>${content || "(untitled)"}</a>` : content} ${ship && renderTemplate`<a${addAttribute(`/admin/r/orders/${r.id}#shipping`, "href")} style="display:block;margin-top:4px;text-decoration:none"> <span${addAttribute(["pill", ship.tone], "class:list")}>${ship.label}</span> ${ship.detail && renderTemplate`<span class="small muted" style="display:block;margin-top:2px">${ship.detail}</span>`} </a>`} </td>`;
		})} ${def.publicUrl && renderTemplate`<td class="num"> ${url && renderTemplate`<a${addAttribute(url, "href")} target="_blank" rel="noopener" class="small" aria-label="View on site">
View ${renderComponent($$result, "Icon", $$Icon, {
			"name": "external",
			"size": 14
		})} </a>`} </td>`} </tr>`;
	})} </tbody> </table>` : renderTemplate`<p class="empty-state"> ${filtered ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`Nothing matches these filters. <a${addAttribute(Astro.url.pathname, "href")}>Clear filters</a>` })}` : `No ${def.label.toLowerCase()} yet.`} </p>`} </div> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/admin/r/[resource]/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/r/[resource]/index.astro";
var $$url = "/admin/r/[resource].html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/r/[resource]/index@_@astro
var page = () => _resource__exports;
//#endregion
export { page };
