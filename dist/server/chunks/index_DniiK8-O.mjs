import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Icon } from "./Icon_CAVYTX4O.mjs";
import { a as inr, r as formatDate } from "./format_B1bSNQa_.mjs";
import { t as $$Admin } from "./Admin_CdVwoBhd.mjs";
import { t as RESOURCES } from "./resources_6a2CSiND.mjs";
import { t as listRows } from "./forms_BLnL9JDQ.mjs";
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
	const q = Astro.url.searchParams.get("q")?.trim() ?? "";
	const status = def.key === "enquiries" ? Astro.url.searchParams.get("status") ?? "" : "";
	const rows = listRows(def, q, status ? {
		col: "status",
		val: status
	} : void 0);
	const saved = Astro.url.searchParams.get("saved");
	const deleted = Astro.url.searchParams.get("deleted");
	const first = def.columns[0].name;
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": def.label,
		"active": def.key
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="page-head"> <div> <h1>${def.label}</h1> ${def.intro && renderTemplate`<p>${def.intro}</p>`} </div> ${def.canCreate !== false && renderTemplate`<a class="btn"${addAttribute(`/admin/r/${def.key}/new`, "href")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "plus" })} New ${def.singular} </a>`} </div> ${saved && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">Saved.</p>`}${deleted && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">Deleted.</p>`}<div class="toolbar"> ${def.search && renderTemplate`<form method="get" role="search"> ${status && renderTemplate`<input type="hidden" name="status"${addAttribute(status, "value")}>`} <input type="search" name="q"${addAttribute(q, "value")}${addAttribute(`Search ${def.label.toLowerCase()}`, "placeholder")}${addAttribute(`Search ${def.label}`, "aria-label")}> </form>`} ${def.key === "enquiries" && renderTemplate`<nav class="tabs" aria-label="Filter by status"> ${[
		["", "All"],
		["new", "New"],
		["contacted", "Contacted"],
		["closed", "Closed"]
	].map(([v, l]) => renderTemplate`<a${addAttribute(v ? `?status=${v}` : "?", "href")}${addAttribute(status === v ? "true" : void 0, "aria-current")}>${l}</a>`)} </nav>`} </div> <div class="table-wrap"> ${rows.length ? renderTemplate`<table class="tbl"> <thead> <tr> ${def.columns.map((c) => renderTemplate`<th scope="col"${addAttribute(c.type === "money" ? "num" : void 0, "class")}>${c.label}</th>`)} ${def.publicUrl && renderTemplate`<th scope="col"><span class="sr-only">View</span></th>`} </tr> </thead> <tbody> ${rows.map((r) => {
		const url = def.publicUrl?.(r);
		return renderTemplate`<tr> ${def.columns.map((c) => {
			const v = r[c.name];
			const content = c.type === "bool" ? renderTemplate`<span${addAttribute(["pill", v ? "on" : "off"], "class:list")}>${v ? "Yes" : "No"}</span>` : c.type === "money" ? v == null ? "—" : inr(v) : c.type === "date" ? formatDate(v) : c.type === "status" ? renderTemplate`<span${addAttribute(["pill", v], "class:list")}>${v}</span>` : v;
			return renderTemplate`<td${addAttribute(c.type === "money" ? "num" : void 0, "class")}> ${c.name === first ? renderTemplate`<a class="row-link"${addAttribute(`/admin/r/${def.key}/${r.id}`, "href")}>${content || "(untitled)"}</a>` : content} </td>`;
		})} ${def.publicUrl && renderTemplate`<td class="num"> ${url && renderTemplate`<a${addAttribute(url, "href")} target="_blank" rel="noopener" class="small" aria-label="View on site">
View ${renderComponent($$result, "Icon", $$Icon, {
			"name": "external",
			"size": 14
		})} </a>`} </td>`} </tr>`;
	})} </tbody> </table>` : renderTemplate`<p class="empty-state">${q ? `Nothing matches “${q}”.` : `No ${def.label.toLowerCase()} yet.`}</p>`} </div> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/admin/r/[resource]/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/r/[resource]/index.astro";
var $$url = "/admin/r/[resource].html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/r/[resource]/index@_@astro
var page = () => _resource__exports;
//#endregion
export { page };
