import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { o as run, r as get } from "./db_BuYoLur0.mjs";
import { a as rateLimit } from "./auth_aUnzSDsO.mjs";
import { n as getSettings } from "./settings_BEEwhVl7.mjs";
import { S as saveEnquiry } from "./data__NbXfEkj.mjs";
import { a as inr } from "./format_CFs_vaoZ.mjs";
import { a as missing, c as resolve, d as catalog, l as status, n as checkBuild, s as price, u as summary } from "./engine_DxL34PI1.mjs";
import { randomBytes } from "node:crypto";
//#region src/pages/api/pc/build.ts
var build_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST
});
var PHONE = /^[+]?[0-9 ()-]{10,16}$/;
var json = (body, status = 200) => new Response(JSON.stringify(body), {
	status,
	headers: {
		"Content-Type": "application/json",
		"Cache-Control": "no-store"
	}
});
function clean(sel) {
	const n = (v) => Number.isInteger(Number(v)) && Number(v) > 0 ? Number(v) : void 0;
	const arr = (v) => Array.isArray(v) ? v.map(n).filter((x) => !!x).slice(0, 6) : [];
	return {
		cpu: n(sel?.cpu),
		motherboard: n(sel?.motherboard),
		ram: n(sel?.ram),
		gpu: n(sel?.gpu),
		cooler: n(sel?.cooler),
		psu: n(sel?.psu),
		case: n(sel?.case),
		storage: arr(sel?.storage),
		extra: arr(sel?.extra)
	};
}
/** Load a saved build by its share code. */
var GET = ({ url }) => {
	const code = url.searchParams.get("code") ?? "";
	const row = get("SELECT parts FROM pc_builds WHERE code = ?", code.toUpperCase());
	if (!row) return json({ error: "Build not found." }, 404);
	return json({ selection: JSON.parse(row.parts) });
};
var POST = async ({ request, clientAddress, locals }) => {
	if (!rateLimit(`pc:${clientAddress}`, 20, 6e5)) return json({ error: "Too many requests. Please call or WhatsApp us." }, 429);
	let body;
	try {
		body = await request.json();
	} catch {
		return json({ error: "Invalid request." }, 400);
	}
	const intent = ["quote", "order"].includes(body?.intent) ? body.intent : "save";
	const selection = clean(body?.selection);
	const parts = catalog();
	const r = resolve(selection, new Map(parts.map((p) => [p.id, p])));
	const issues = checkBuild(r);
	const miss = missing(r);
	const st = status(issues, miss);
	const s = getSettings();
	const pr = price(r, s.pcbuilder);
	if (intent !== "save") {
		if (st === "error") return json({
			error: "This build has a compatibility issue. Fix it before requesting a quote.",
			issues
		}, 422);
		if (st === "incomplete") return json({
			error: "Choose all required parts before requesting a quote.",
			missing: miss
		}, 422);
		const name = String(body?.name ?? "").trim().slice(0, 120);
		const phone = String(body?.phone ?? "").trim().slice(0, 30);
		if (!name || !PHONE.test(phone)) return json({
			error: "Add your name and a valid mobile number.",
			field: !name ? "name" : "phone"
		}, 422);
	}
	let code = "";
	do
		code = randomBytes(5).toString("base64url").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
	while (code.length < 6 || get("SELECT 1 FROM pc_builds WHERE code = ?", code));
	const sum = summary(r);
	const lines = pr.lines.map((l) => `${l.name} — ${inr(l.price)}`).join("\n");
	const statusCol = intent === "save" ? "saved" : intent === "order" ? "ordered" : "quote";
	run("INSERT INTO pc_builds (code, user_id, name, phone, email, notes, parts, summary, subtotal, total, status) VALUES (?,?,?,?,?,?,?,?,?,?,?)", code, locals.user?.id ?? null, String(body?.name ?? "").slice(0, 120), String(body?.phone ?? "").slice(0, 30), String(body?.email ?? "").slice(0, 160), String(body?.notes ?? "").slice(0, 2e3), JSON.stringify(selection), JSON.stringify(sum), pr.subtotal, pr.total, statusCol);
	if (intent !== "save") saveEnquiry({
		kind: "pc-build",
		name: String(body.name).trim(),
		phone: String(body.phone).trim(),
		email: String(body?.email ?? "").trim(),
		topic: `Custom PC ${intent === "order" ? "order" : "quote"} · build ${code} · ${inr(pr.total)}`,
		message: `${lines}\n\nTotal (server-priced): ${inr(pr.total)}\nWarnings: ${issues.filter((i) => i.level === "warning").map((i) => i.title).join("; ") || "none"}\n\n${String(body?.notes ?? "")}`,
		preferred: intent === "order" ? "Order — confirm and collect payment" : "Quote"
	});
	return json({
		code,
		status: st,
		total: pr.total,
		url: `/custom-pc-builder?build=${code}`
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/pc/build@_@ts
var page = () => build_exports;
//#endregion
export { page };
