import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, T as Fragment, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as renderScript, t as $$Icon } from "./Icon_CAVYTX4O.mjs";
import { o as run, r as get } from "./db_DgpM4awz.mjs";
import { t as $$MembershipCard } from "./MembershipCard_WLmIZgIv.mjs";
import { t as $$Admin } from "./Admin_Dgg6he94.mjs";
import { t as $$AdminField } from "./AdminField_p2UUjYP-.mjs";
import { t as RESOURCES } from "./resources_Bilaft9N.mjs";
import { a as toFormValue, n as parseForm, r as saveRow } from "./forms_D7cfCAIR.mjs";
//#region src/pages/admin/r/[resource]/[id].astro
var _id__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Id,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Id = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Id;
	const def = RESOURCES[Astro.params.resource];
	if (!def) return Astro.redirect("/admin");
	const isNew = Astro.params.id === "new";
	if (isNew && def.canCreate === false) return Astro.redirect(`/admin/r/${def.key}`);
	const id = isNew ? null : Number(Astro.params.id);
	let row = id ? get(`SELECT * FROM ${def.table} WHERE id = ?`, id) : {};
	if (!row) return Astro.redirect(`/admin/r/${def.key}`);
	let errors = {};
	let values = {};
	const DEFAULTS = {
		published: 1,
		active: 1,
		in_stock: 1,
		sort: 0,
		validity_days: 365,
		card_from: "#0f2a4a",
		card_to: "#2a5d8f",
		card_text: "#ffffff",
		card_pattern: "circuit",
		employment_type: "FULL_TIME",
		location: "Chikhali, Pimpri-Chinchwad",
		condition: "New",
		topic: "General",
		group_name: "Repair & support",
		published_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		posted_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		benefits: "[]",
		category: def.key === "projects" ? "cctv-projects" : ""
	};
	if (isNew) row = Object.fromEntries(def.fields.map((f) => [f.name, DEFAULTS[f.name] ?? ""]));
	if (Astro.request.method === "POST") {
		const form = await Astro.request.formData();
		if (form.get("_action") === "delete" && id && def.canDelete !== false) {
			if (def.key === "plans" && get("SELECT 1 FROM memberships WHERE plan_id = ?", id)) errors._form = "Members hold cards on this plan. Turn off \"On sale\" instead of deleting it.";
			else {
				run(`DELETE FROM ${def.table} WHERE id = ?`, id);
				return Astro.redirect(`/admin/r/${def.key}?deleted=1`, 303);
			}
		} else {
			const parsed = await parseForm(def, form, id);
			errors = parsed.errors;
			if (!Object.keys(errors).length) {
				const newId = saveRow(def, parsed.row, id);
				return Astro.redirect(form.get("_action") === "save_close" ? `/admin/r/${def.key}?saved=1` : `/admin/r/${def.key}/${newId}?saved=1`, 303);
			}
			for (const f of def.fields) {
				const raw = form.get(f.name);
				values[f.name] = f.type === "bool" ? raw === "on" ? "1" : "0" : typeof raw === "string" ? raw : toFormValue(f, parsed.row[f.name]);
				if (f.type === "image" && parsed.row[f.name]) values[f.name] = parsed.row[f.name];
			}
		}
	}
	for (const f of def.fields) if (!(f.name in values)) values[f.name] = toFormValue(f, row[f.name]);
	const saved = Astro.url.searchParams.get("saved");
	const titleField = def.fields.find((f) => [
		"name",
		"title",
		"question",
		"caption"
	].includes(f.name));
	const heading = isNew ? `New ${def.singular}` : titleField && row[titleField.name] || `Edit ${def.singular}`;
	const publicUrl = !isNew ? def.publicUrl?.(row) : null;
	const isPlan = def.key === "plans";
	let lastSection = "";
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": heading,
		"active": def.key
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="page-head"> <div> <a${addAttribute(`/admin/r/${def.key}`, "href")} class="small">← ${def.label}</a> <h1>${heading}</h1> </div> ${publicUrl && renderTemplate`<a class="btn btn--ghost"${addAttribute(publicUrl, "href")} target="_blank" rel="noopener">
View on site ${renderComponent($$result, "Icon", $$Icon, {
		"name": "external",
		"size": 16
	})} </a>`} </div> ${saved && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">Saved. Changes are live on the website.</p>`}${errors._form && renderTemplate`<p class="alert alert--error" role="alert" style="margin-bottom:14px">${errors._form}</p>`}${Object.keys(errors).filter((k) => k !== "_form").length > 0 && renderTemplate`<p class="alert alert--error" role="alert" style="margin-bottom:14px">Some fields need attention — see the messages below.</p>`}<div${addAttribute([isPlan && "split-2"], "class:list")}> <form method="post" enctype="multipart/form-data" id="edit-form"> <div class="panel"> <div class="form-grid"> ${def.fields.map((f) => {
		const showSection = f.section && f.section !== lastSection;
		if (f.section) lastSection = f.section;
		return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` ${showSection && renderTemplate`<h2 class="section-title">${f.section}</h2>`} ${renderComponent($$result, "AdminField", $$AdminField, {
			"field": f,
			"value": values[f.name] ?? "",
			"error": errors[f.name]
		})} ` })}`;
	})} </div> </div> <div class="sticky-actions"> <div class="btn-row"> <button class="btn" type="submit" name="_action" value="save">Save</button> <button class="btn btn--ghost" type="submit" name="_action" value="save_close">Save and close</button> </div> </div> </form> ${isPlan && renderTemplate`<aside class="sticky-col"> <div class="panel"> <h2 style="margin-bottom:12px">Card preview</h2> ${renderComponent($$result, "MembershipCard", $$MembershipCard, {
		"live": true,
		"planName": values.name || "Plan",
		"from": values.card_from || "#0f2a4a",
		"to": values.card_to || "#2a5d8f",
		"text": values.card_text || "#ffffff",
		"pattern": values.card_pattern || "circuit",
		"coins": Number(values.coins) || 0,
		"holder": "Member name"
	})} <p class="small muted" style="margin-top:12px">Updates as you edit. Every member card on this plan uses this design.</p> </div> </aside>`} </div> ${!isNew && def.canDelete !== false && renderTemplate`<form method="post"${addAttribute(`Delete this ${def.singular}? This cannot be undone.`, "data-confirm")} style="margin-top:24px"> <button class="btn btn--danger" type="submit" name="_action" value="delete">Delete ${def.singular}</button> </form>`}` })} ${isPlan && renderTemplate`${renderScript($$result, "C:/Programming section/virnobyte/src/pages/admin/r/[resource]/[id].astro?astro&type=script&index=0&lang.ts")}`}`;
}, "C:/Programming section/virnobyte/src/pages/admin/r/[resource]/[id].astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/r/[resource]/[id].astro";
var $$url = "/admin/r/[resource]/[id].html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/r/[resource]/[id]@_@astro
var page = () => _id__exports;
//#endregion
export { page };
