import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as renderScript } from "./Icon_CAVYTX4O.mjs";
import { t as getImage } from "./_astro_assets_DgDUkxWr.mjs";
import { n as PHOTO_KEYS, r as photoLabel, t as PHOTOS } from "./images_4iK9SaiJ.mjs";
//#region src/components/admin/AdminField.astro
createAstro("https://virnobyte.com");
var $$AdminField = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AdminField;
	const { field: f, value, error, scope = "" } = Astro.props;
	const id = `af-${scope}${f.name}`.replace(/\./g, "-");
	let thumbs = {};
	let preview = "";
	if (f.type === "image") {
		const entries = await Promise.all(PHOTO_KEYS.map(async (k) => [k, (await getImage({
			src: PHOTOS[k],
			width: 480,
			format: "webp"
		})).src]));
		thumbs = Object.fromEntries(entries);
		preview = value.startsWith("/uploads/") ? value : thumbs[value] ?? "";
	}
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute(["field", { half: f.half }], "class:list")}${addAttribute(error ? "" : void 0, "data-invalid")}> ${f.type === "bool" ? renderTemplate`<label class="switch"> <input type="checkbox"${addAttribute(f.name, "name")}${addAttribute(value === "1", "checked")}> ${f.label} </label>` : renderTemplate`<label${addAttribute(id, "for")}> ${f.label} ${f.required && renderTemplate`<span class="muted"> *</span>`} </label>`} ${f.help && renderTemplate`<span class="hint">${f.help}</span>`} ${(f.type === "text" || f.type === "slug") && renderTemplate`<input${addAttribute(id, "id")}${addAttribute(f.name, "name")} type="text"${addAttribute(value, "value")}${addAttribute(f.required, "required")}${addAttribute(f.max, "data-max")}>`} ${(f.type === "number" || f.type === "money") && renderTemplate`<input${addAttribute(id, "id")}${addAttribute(f.name, "name")} type="number" inputmode="numeric"${addAttribute(value, "value")} step="1">`} ${f.type === "date" && renderTemplate`<input${addAttribute(id, "id")}${addAttribute(f.name, "name")} type="date"${addAttribute(value.slice(0, 10), "value")}>`} ${(f.type === "textarea" || f.type === "markdown" || f.type === "list" || f.type === "faqs" || f.type === "kv") && renderTemplate`<textarea${addAttribute(id, "id")}${addAttribute(f.name, "name")}${addAttribute(f.rows ?? (f.type === "faqs" ? 10 : f.type === "list" ? 6 : 4), "rows")}${addAttribute(f.type !== "textarea" ? "mono" : void 0, "class")}${addAttribute(f.max, "data-max")}${addAttribute(f.type === "faqs" ? "Q: Question?\nA: Answer.\n\nQ: Next question?\nA: Answer." : void 0, "placeholder")}>${value}</textarea>`} ${f.type === "select" && renderTemplate`<select${addAttribute(id, "id")}${addAttribute(f.name, "name")}> ${f.options.map((o) => renderTemplate`<option${addAttribute(o.value, "value")}${addAttribute(o.value === value, "selected")}> ${o.label} </option>`)} </select>`} ${f.type === "color" && renderTemplate`<div class="color-row"> <input${addAttribute(id, "id")}${addAttribute(f.name, "name")} type="color"${addAttribute(value || "#0b2545", "value")}${addAttribute(f.name, "data-color-for")}> <code class="small">${value}</code> </div>`} ${f.type === "image" && renderTemplate`<div class="img-field" data-img-field${addAttribute(JSON.stringify(thumbs), "data-thumbs")}> ${preview && renderTemplate`<img class="preview"${addAttribute(preview, "src")} alt="" loading="lazy">`} <select${addAttribute(id, "id")}${addAttribute(f.name, "name")}> <option value="">No image</option> ${value.startsWith("/uploads/") && renderTemplate`<option${addAttribute(value, "value")} selected>
Uploaded: ${value.split("/").pop()} </option>`} <optgroup label="Photo library (4K)"> ${PHOTO_KEYS.map((k) => renderTemplate`<option${addAttribute(k, "value")}${addAttribute(k === value, "selected")}> ${photoLabel(k)} </option>`)} </optgroup> </select> <label class="small">
Or upload a new photo (converted to WebP, up to 3840px):
<input type="file"${addAttribute(`${f.name}__upload`, "name")} accept="image/jpeg,image/png,image/webp"> </label> </div>`} ${f.type === "readonly" && renderTemplate`<p style="white-space:pre-wrap;margin:0">${value || "—"}</p>`} ${f.max && renderTemplate`<span class="count" data-count></span>`} ${error && renderTemplate`<span class="error">${error}</span>`} </div>${renderScript($$result, "C:/Programming section/virnobyte/src/components/admin/AdminField.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Programming section/virnobyte/src/components/admin/AdminField.astro", void 0);
//#endregion
export { $$AdminField as t };
