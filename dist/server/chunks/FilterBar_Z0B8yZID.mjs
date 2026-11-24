import { A as renderTemplate, N as addAttribute, T as Fragment, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as renderScript } from "./script_BaVSnVKi.mjs";
import { a as inr } from "./format_6aaLy6w7.mjs";
//#region src/components/admin/FilterBar.astro
createAstro("https://virnobyte.com");
var $$FilterBar = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$FilterBar;
	const { filters, values, q = "", searchPlaceholder, sorts = [], sort = "", count, shown, total = null, noun, one, searchable = true } = Astro.props;
	const url = Astro.url;
	const tabFilter = filters.find((f) => f.type === "select" && f.tabs);
	const panelFilters = filters.filter((f) => f !== tabFilter);
	const withParams = (patch) => {
		const u = new URL(url);
		for (const [k, v] of Object.entries(patch)) if (v == null || v === "") u.searchParams.delete(k);
		else u.searchParams.set(k, v);
		u.searchParams.delete("saved");
		u.searchParams.delete("deleted");
		return u.pathname + (u.search || "?");
	};
	const labelOf = (f, v) => f.type === "select" ? f.resolvedOptions?.find((o) => o.value === v)?.label ?? v : f.type === "bool" ? v === "1" ? f.yes ?? "Yes" : f.no ?? "No" : v;
	const chips = [];
	if (q) chips.push({
		text: `“${q}”`,
		href: withParams({ q: null })
	});
	for (const f of panelFilters) if (f.type === "daterange" || f.type === "range") {
		const from = values[`${f.name}_from`];
		const to = values[`${f.name}_to`];
		if (from || to) {
			const p = f.type === "range" ? f.prefix ?? "" : "";
			const text = from && to ? `${p}${from} – ${p}${to}` : from ? `from ${p}${from}` : `up to ${p}${to}`;
			chips.push({
				text: `${f.label}: ${text}`,
				href: withParams({
					[`${f.name}_from`]: null,
					[`${f.name}_to`]: null
				})
			});
		}
	} else if (values[f.name]) chips.push({
		text: `${f.label}: ${labelOf(f, values[f.name])}`,
		href: withParams({ [f.name]: null })
	});
	const anyActive = chips.length > 0 || !!(tabFilter && values[tabFilter.name]) || !!sort;
	const clearHref = url.pathname;
	const openPanel = chips.some((c) => !c.text.startsWith("“"));
	return renderTemplate`${tabFilter && renderTemplate`${maybeRenderHead($$result)}<nav class="tabs fb-tabs"${addAttribute(`Filter by ${tabFilter.label.toLowerCase()}`, "aria-label")} data-astro-cid-zmq5seqh> <a${addAttribute(withParams({ [tabFilter.name]: null }), "href")}${addAttribute(!values[tabFilter.name] ? "true" : void 0, "aria-current")} data-astro-cid-zmq5seqh>All</a> ${tabFilter.resolvedOptions?.map((o) => renderTemplate`<a${addAttribute(withParams({ [tabFilter.name]: o.value }), "href")}${addAttribute(values[tabFilter.name] === o.value ? "true" : void 0, "aria-current")} data-astro-cid-zmq5seqh>${o.label}</a>`)} </nav>`} <form method="get" class="fb" data-filterbar data-astro-cid-zmq5seqh> ${tabFilter && values[tabFilter.name] && renderTemplate`<input type="hidden"${addAttribute(tabFilter.name, "name")}${addAttribute(values[tabFilter.name], "value")} data-astro-cid-zmq5seqh>`} <div class="fb-top" data-astro-cid-zmq5seqh> ${searchable && renderTemplate`<input type="search" name="q"${addAttribute(q, "value")}${addAttribute(searchPlaceholder ?? `Search ${noun}`, "placeholder")}${addAttribute(`Search ${noun}`, "aria-label")} data-astro-cid-zmq5seqh>`} ${panelFilters.length > 0 && renderTemplate`<button type="button" class="fb-toggle"${addAttribute(openPanel ? "true" : "false", "aria-expanded")} aria-controls="fb-panel" data-fb-toggle data-astro-cid-zmq5seqh> <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-zmq5seqh><path d="M3 5h18l-7 8v6l-4 2v-8z" data-astro-cid-zmq5seqh></path></svg>
Filters${chips.length - (q ? 1 : 0) > 0 && renderTemplate`<span class="fb-count" data-astro-cid-zmq5seqh>${chips.length - (q ? 1 : 0)}</span>`} </button>`} ${sorts.length > 1 && renderTemplate`<label class="fb-sort" data-astro-cid-zmq5seqh> <span data-astro-cid-zmq5seqh>Sort</span> <select name="sort" data-autosubmit data-astro-cid-zmq5seqh> ${sorts.map((s, i) => renderTemplate`<option${addAttribute(i === 0 ? "" : s.value, "value")}${addAttribute((sort || "") === (i === 0 ? "" : s.value), "selected")} data-astro-cid-zmq5seqh>${s.label}</option>`)} </select> </label>`} <button class="btn fb-apply" type="submit" data-astro-cid-zmq5seqh>Apply</button> </div> ${panelFilters.length > 0 && renderTemplate`<div class="fb-panel" id="fb-panel"${addAttribute(!openPanel, "hidden")} data-astro-cid-zmq5seqh> ${panelFilters.map((f) => f.type === "select" ? renderTemplate`<label class="fb-field" data-astro-cid-zmq5seqh> <span data-astro-cid-zmq5seqh>${f.label}</span> <select${addAttribute(f.name, "name")} data-autosubmit data-astro-cid-zmq5seqh> <option value="" data-astro-cid-zmq5seqh>All</option> ${f.resolvedOptions?.map((o) => renderTemplate`<option${addAttribute(o.value, "value")}${addAttribute(values[f.name] === o.value, "selected")} data-astro-cid-zmq5seqh>${o.label}</option>`)} </select> </label>` : f.type === "bool" ? renderTemplate`<label class="fb-field" data-astro-cid-zmq5seqh> <span data-astro-cid-zmq5seqh>${f.label}</span> <select${addAttribute(f.name, "name")} data-autosubmit data-astro-cid-zmq5seqh> <option value="" data-astro-cid-zmq5seqh>All</option> <option value="1"${addAttribute(values[f.name] === "1", "selected")} data-astro-cid-zmq5seqh>${f.yes ?? "Yes"}</option> <option value="0"${addAttribute(values[f.name] === "0", "selected")} data-astro-cid-zmq5seqh>${f.no ?? "No"}</option> </select> </label>` : f.type === "daterange" ? renderTemplate`<fieldset class="fb-field fb-range" data-astro-cid-zmq5seqh> <legend data-astro-cid-zmq5seqh>${f.label}</legend> <input type="date"${addAttribute(`${f.name}_from`, "name")}${addAttribute(values[`${f.name}_from`] ?? "", "value")}${addAttribute(`${f.label} from`, "aria-label")} data-astro-cid-zmq5seqh> <span aria-hidden="true" data-astro-cid-zmq5seqh>–</span> <input type="date"${addAttribute(`${f.name}_to`, "name")}${addAttribute(values[`${f.name}_to`] ?? "", "value")}${addAttribute(`${f.label} to`, "aria-label")} data-astro-cid-zmq5seqh> <span class="fb-presets" data-astro-cid-zmq5seqh> <button type="button" data-days="0"${addAttribute(f.name, "data-for")} data-astro-cid-zmq5seqh>Today</button> <button type="button" data-days="7"${addAttribute(f.name, "data-for")} data-astro-cid-zmq5seqh>7 days</button> <button type="button" data-days="30"${addAttribute(f.name, "data-for")} data-astro-cid-zmq5seqh>30 days</button> <button type="button" data-month${addAttribute(f.name, "data-for")} data-astro-cid-zmq5seqh>This month</button> </span> </fieldset>` : renderTemplate`<fieldset class="fb-field fb-range" data-astro-cid-zmq5seqh> <legend data-astro-cid-zmq5seqh>${f.label}</legend> <input type="number" inputmode="numeric" min="0"${addAttribute(`${f.name}_from`, "name")}${addAttribute(values[`${f.name}_from`] ?? "", "value")}${addAttribute(`Min ${f.prefix ?? ""}`, "placeholder")}${addAttribute(`${f.label} minimum`, "aria-label")} data-astro-cid-zmq5seqh> <span aria-hidden="true" data-astro-cid-zmq5seqh>–</span> <input type="number" inputmode="numeric" min="0"${addAttribute(`${f.name}_to`, "name")}${addAttribute(values[`${f.name}_to`] ?? "", "value")}${addAttribute(`Max ${f.prefix ?? ""}`, "placeholder")}${addAttribute(`${f.label} maximum`, "aria-label")} data-astro-cid-zmq5seqh> </fieldset>`)} </div>`} </form> <div class="fb-summary" data-astro-cid-zmq5seqh> <p data-astro-cid-zmq5seqh> <strong data-astro-cid-zmq5seqh>${count.toLocaleString("en-IN")}</strong> ${count === 1 && one ? one : noun}${anyActive ? count === 1 ? " matches" : " match" : ""} ${count > shown && renderTemplate`<span class="muted" data-astro-cid-zmq5seqh> · showing the first ${shown}</span>`} ${total != null && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` · total <strong data-astro-cid-zmq5seqh>${inr(total)}</strong>` })}`} </p> ${chips.length > 0 && renderTemplate`<ul class="fb-chips" aria-label="Active filters" data-astro-cid-zmq5seqh> ${chips.map((c) => renderTemplate`<li data-astro-cid-zmq5seqh> <a${addAttribute(c.href, "href")}${addAttribute(`Remove filter ${c.text}`, "aria-label")} data-astro-cid-zmq5seqh>${c.text} <span aria-hidden="true" data-astro-cid-zmq5seqh>×</span></a> </li>`)} </ul>`} ${anyActive && renderTemplate`<a class="small fb-clear"${addAttribute(clearHref, "href")} data-astro-cid-zmq5seqh>Clear all</a>`} </div>${renderScript($$result, "C:/Programming section/virnobyte/src/components/admin/FilterBar.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Programming section/virnobyte/src/components/admin/FilterBar.astro", void 0);
//#endregion
export { $$FilterBar as t };
