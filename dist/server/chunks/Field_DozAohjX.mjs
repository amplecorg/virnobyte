import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, x as spreadAttributes } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
//#region src/components/Field.astro
createAstro("https://virnobyte.com");
var $$Field = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Field;
	const p = Astro.props;
	const id = `f-${p.name}-${Math.random().toString(36).slice(2, 7)}`;
	const describedBy = [p.hint ? `${id}-hint` : "", `${id}-err`].filter(Boolean).join(" ");
	const common = {
		id,
		name: p.name,
		required: p.required,
		"aria-describedby": describedBy,
		"aria-invalid": p.error ? "true" : void 0,
		"data-label": p.label,
		"data-msg-required": p.msgRequired,
		"data-msg-pattern": p.msgPattern
	};
	const opts = (p.options ?? []).map((o) => typeof o === "string" ? {
		value: o,
		label: o
	} : o);
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["field", p.class], "class:list")}${addAttribute(p.error ? "" : void 0, "data-invalid")}> <label${addAttribute(id, "for")}>${p.label}${!p.required && renderTemplate`<span class="muted"> (optional)</span>`}</label> ${p.hint && renderTemplate`<span class="hint"${addAttribute(`${id}-hint`, "id")}>${p.hint}</span>`} ${p.type === "textarea" ? renderTemplate`<textarea${spreadAttributes(common)}${addAttribute(p.rows ?? 4, "rows")}${addAttribute(p.placeholder, "placeholder")}${addAttribute(p.minlength, "minlength")}>${p.value ?? ""}</textarea>` : p.type === "select" ? renderTemplate`<select${spreadAttributes(common)}> <option value="">Choose…</option> ${opts.map((o) => renderTemplate`<option${addAttribute(o.value, "value")}${addAttribute(String(p.value ?? "") === o.value, "selected")}> ${o.label} </option>`)} </select>` : renderTemplate`<input${spreadAttributes(common)}${addAttribute(p.type ?? "text", "type")}${addAttribute(p.value ?? void 0, "value")}${addAttribute(p.autocomplete, "autocomplete")}${addAttribute(p.pattern, "pattern")}${addAttribute(p.placeholder, "placeholder")}${addAttribute(p.minlength, "minlength")}${addAttribute(p.inputmode, "inputmode")}${addAttribute(p.min, "min")}${addAttribute(p.max, "max")}${addAttribute(p.step, "step")}>`} <span class="error"${addAttribute(`${id}-err`, "id")} aria-live="polite">${p.error ?? ""}</span> </div>`;
}, "C:/Programming section/virnobyte/src/components/Field.astro", void 0);
//#endregion
export { $$Field as t };
