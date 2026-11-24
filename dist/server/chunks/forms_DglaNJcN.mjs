import { i as get, n as all, o as json, s as run, t as UPLOAD_DIR } from "./db_CrQR8QZK.mjs";
import { u as slugify } from "./format_6aaLy6w7.mjs";
import { join } from "node:path";
import { randomBytes } from "node:crypto";
import sharp from "sharp";
//#region src/lib/admin/forms.ts
/** Converts an uploaded image to WebP (max 3840px wide) and returns its public path. */
async function saveUpload(file, hint = "virnobyte") {
	if (!file.type.startsWith("image/")) throw new Error("Upload an image file (JPG, PNG or WebP).");
	if (file.size > 26214400) throw new Error("Images must be smaller than 25 MB.");
	const buf = Buffer.from(await file.arrayBuffer());
	const out = await sharp(buf, { failOn: "error" }).rotate().resize({
		width: 3840,
		withoutEnlargement: true
	}).webp({ quality: 82 }).toBuffer({ resolveWithObject: true });
	const name = `${slugify(hint || file.name.replace(/\.\w+$/, "")).slice(0, 60) || "image"}-${randomBytes(3).toString("hex")}-${out.info.width}x${out.info.height}.webp`;
	await sharp(out.data).toFile(join(UPLOAD_DIR, name));
	return `/uploads/${name}`;
}
function faqsToText(v) {
	return json(v, []).map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");
}
function textToFaqs(t) {
	return t.replace(/\r\n/g, "\n").split(/\n\s*\n(?=Q:)/).map((block) => {
		const m = /^Q:\s*([\s\S]*?)\nA:\s*([\s\S]*)$/.exec(block.trim());
		return m ? {
			q: m[1].trim(),
			a: m[2].trim()
		} : null;
	}).filter((x) => !!x && !!x.q && !!x.a);
}
/** Value to show in the form control for a stored DB value. */
function toFormValue(f, v) {
	if (v == null) return "";
	if (f.type === "list") return json(v, []).join("\n");
	if (f.type === "faqs") return faqsToText(v);
	if (f.type === "kv") return kvToText(v);
	if (f.type === "images") {
		if (Array.isArray(v)) return JSON.stringify(v);
		if (typeof v === "string") {
			const s = v.trim();
			if (s.startsWith("[")) return s;
			return JSON.stringify(s ? [s] : []);
		}
		return "[]";
	}
	return String(v);
}
/** Parses posted form data into a DB row for the resource. Returns errors keyed by field. */
async function parseForm(def, form, id) {
	const row = {};
	const errors = {};
	for (const f of def.fields) {
		if (f.type === "readonly") continue;
		const raw = form.get(f.name);
		let val = typeof raw === "string" ? raw.trim() : "";
		switch (f.type) {
			case "bool":
				val = raw === "on" || raw === "1" ? 1 : 0;
				break;
			case "number":
				val = val === "" ? 0 : Math.trunc(Number(val));
				if (!Number.isFinite(val)) errors[f.name] = "Enter a whole number.";
				break;
			case "money":
				val = val === "" ? null : Math.round(Number(val.replace(/[₹,\s]/g, "")));
				if (val != null && !Number.isFinite(val)) errors[f.name] = "Enter an amount in rupees, e.g. 1499.";
				if (val == null && [
					"price",
					"salary_min",
					"salary_max",
					"mrp"
				].includes(f.name) && def.table !== "products") val = 0;
				break;
			case "slug":
				val = slugify(val || String(form.get("name") ?? form.get("title") ?? ""));
				if (!val) errors[f.name] = "Enter a web address name using letters, numbers and hyphens (e.g. laptop-repair).";
				else if (get(`SELECT 1 FROM ${def.table} WHERE slug = ? AND id != ?`, val, id ?? -1)) errors[f.name] = "Another item is already using this web address URL. Please choose a different one.";
				break;
			case "list":
				val = JSON.stringify(val.split(/\r?\n/).map((s) => s.trim()).filter(Boolean));
				break;
			case "faqs":
				val = JSON.stringify(textToFaqs(val));
				break;
			case "kv":
				val = JSON.stringify(textToKv(val));
				break;
			case "color":
				if (!/^#[0-9a-f]{6}$/i.test(val)) errors[f.name] = "Pick a colour.";
				break;
			case "date":
				if (val && !/^\d{4}-\d{2}-\d{2}$/.test(val)) errors[f.name] = "Use the date picker.";
				break;
			case "image": {
				const up = form.get(`${f.name}__upload`);
				if (up instanceof File && up.size > 0) try {
					val = await saveUpload(up, String(form.get("slug") || form.get("title") || form.get("name") || form.get("caption") || ""));
				} catch (e) {
					errors[f.name] = e.message;
				}
				break;
			}
			case "images": {
				let list = [];
				try {
					if (typeof val === "string" && val.trim().startsWith("[")) list = JSON.parse(val.trim());
					else if (val) list = [String(val).trim()];
				} catch {
					list = [];
				}
				if (!Array.isArray(list)) list = [];
				const uploads = form.getAll(`${f.name}__upload`);
				const hint = String(form.get("slug") || form.get("title") || form.get("name") || "product");
				for (const up of uploads) if (up instanceof File && up.size > 0) try {
					const url = await saveUpload(up, hint);
					list.push(url);
				} catch (e) {
					errors[f.name] = e.message;
				}
				val = JSON.stringify(list);
				if (def.table === "products") row.image = list[0] || "";
				break;
			}
		}
		if (f.required && (val === "" || val == null || val === "[]")) errors[f.name] = errors[f.name] ?? `${f.label} is required.`;
		if (f.max && typeof val === "string" && val.length > f.max + 40) errors[f.name] = `Keep this under about ${f.max} characters.`;
		row[f.name] = val;
	}
	const blocked = def.validate?.(row);
	if (blocked) errors._form = blocked;
	return {
		row,
		errors
	};
}
function saveRow(def, row, id) {
	const cols = Object.keys(row);
	if (def.table === "pages" || def.table === "posts") {
		if (def.table === "pages" || id) {
			cols.push("updated_at");
			row.updated_at = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		}
	}
	const vals = cols.map((c) => row[c]);
	if (id) {
		run(`UPDATE ${def.table} SET ${cols.map((c) => `${c} = ?`).join(", ")} WHERE id = ?`, ...vals, id);
		return id;
	}
	const res = run(`INSERT INTO ${def.table} (${cols.join(", ")}) VALUES (${cols.map(() => "?").join(", ")})`, ...vals);
	return Number(res.lastInsertRowid);
}
/** Reads the active filter values for a resource from the URL (only declared filters are honoured). */
function readFilters(def, sp) {
	const out = {};
	for (const f of def.filters ?? []) if (f.type === "daterange" || f.type === "range") for (const k of [`${f.name}_from`, `${f.name}_to`]) {
		const v = sp.get(k)?.trim();
		if (v) out[k] = v;
	}
	else {
		const v = sp.get(f.name)?.trim();
		if (v) out[f.name] = v;
	}
	return out;
}
/** Options for a select filter: explicit list → the form field's options → distinct values in the table. */
function filterOptions(def, f) {
	if (f.options) return f.options;
	const field = def.fields.find((x) => x.name === f.name && x.options?.length);
	if (field?.options) return field.options;
	return all(`SELECT DISTINCT ${f.name} AS v FROM ${def.table} WHERE ${f.name} IS NOT NULL AND ${f.name} != '' ORDER BY 1 LIMIT 100`).map((r) => ({
		value: String(r.v),
		label: String(r.v)
	}));
}
function listRows(def, q, filters = {}, sortKey = "") {
	const where = [];
	const params = [];
	if (q && def.search?.length) {
		where.push(`(${def.search.map((c) => `${c} LIKE ?`).join(" OR ")})`);
		def.search.forEach(() => params.push(`%${q}%`));
	}
	for (const f of def.filters ?? []) if (f.type === "select" && filters[f.name] != null) {
		where.push(`${f.name} = ?`);
		params.push(filters[f.name]);
	} else if (f.type === "bool" && (filters[f.name] === "1" || filters[f.name] === "0")) {
		const test = f.sql ?? `${f.name} = 1`;
		where.push(filters[f.name] === "1" ? `(${test})` : `NOT (${test})`);
	} else if (f.type === "daterange") {
		const from = filters[`${f.name}_from`];
		const to = filters[`${f.name}_to`];
		if (from && /^\d{4}-\d{2}-\d{2}$/.test(from)) {
			where.push(`date(${f.name}) >= ?`);
			params.push(from);
		}
		if (to && /^\d{4}-\d{2}-\d{2}$/.test(to)) {
			where.push(`date(${f.name}) <= ?`);
			params.push(to);
		}
	} else if (f.type === "range") {
		const from = Number(String(filters[`${f.name}_from`] ?? "").replace(/[₹,\s]/g, ""));
		const to = Number(String(filters[`${f.name}_to`] ?? "").replace(/[₹,\s]/g, ""));
		if (filters[`${f.name}_from`] && Number.isFinite(from)) {
			where.push(`${f.name} >= ?`);
			params.push(from);
		}
		if (filters[`${f.name}_to`] && Number.isFinite(to)) {
			where.push(`${f.name} <= ?`);
			params.push(to);
		}
	}
	const whereSql = where.length ? "WHERE " + where.join(" AND ") : "";
	const order = def.sorts?.find((x) => x.value === sortKey)?.sql ?? def.orderBy;
	const rows = all(`SELECT * FROM ${def.table} ${whereSql} ORDER BY ${order} LIMIT 500`, ...params);
	const agg = get(`SELECT COUNT(*) AS n${def.sumColumn ? `, COALESCE(SUM(${def.sumColumn}), 0) AS total` : ", 0 AS total"} FROM ${def.table} ${whereSql}`, ...params) ?? {
		n: rows.length,
		total: 0
	};
	return {
		rows,
		count: agg.n,
		total: agg.total
	};
}
/** Specs editor: one "key: value" per line. Numbers, true/false and [a, b] lists are typed. */
function kvToText(v) {
	const o = json(v, {});
	return Object.entries(o).map(([k, x]) => `${k}: ${Array.isArray(x) ? `[${x.join(", ")}]` : x}`).join("\n");
}
function typed(raw) {
	const t = raw.trim();
	if (/^\[.*\]$/.test(t)) return t.slice(1, -1).split(",").map((x) => typed(x)).filter((x) => x !== "");
	if (t === "true") return true;
	if (t === "false") return false;
	if (t !== "" && !isNaN(Number(t))) return Number(t);
	return t;
}
function textToKv(t) {
	const o = {};
	for (const line of t.split(/\r?\n/)) {
		const i = line.indexOf(":");
		if (i < 1) continue;
		o[line.slice(0, i).trim()] = typed(line.slice(i + 1));
	}
	return o;
}
//#endregion
export { saveRow as a, readFilters as i, listRows as n, saveUpload as o, parseForm as r, toFormValue as s, filterOptions as t };
