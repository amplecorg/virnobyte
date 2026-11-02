import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { a as rateLimit } from "./auth_iehkRLLM.mjs";
import { u as job, x as saveEnquiry } from "./data_BsT_AAm4.mjs";
//#region src/pages/api/apply.ts
var apply_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var PHONE = /^[+]?[0-9 ()-]{10,16}$/;
var clip = (v, n) => String(v ?? "").trim().slice(0, n);
var POST = async ({ request, redirect, clientAddress }) => {
	const form = await request.formData();
	const slug = clip(form.get("job"), 120);
	const role = job(slug);
	const back = role ? `/careers/${role.slug}` : "/careers";
	if (clip(form.get("website"), 200)) return redirect(`${back}?sent=1#apply`, 303);
	if (!rateLimit(`apply:${clientAddress}`, 5, 18e5)) return redirect(`${back}?error=rate#apply`, 303);
	const name = clip(form.get("name"), 120);
	const phone = clip(form.get("phone"), 30);
	if (!name || !PHONE.test(phone)) return redirect(`${back}?error=fields#apply`, 303);
	const fits = form.getAll("fits").map((v) => `✓ ${String(v).slice(0, 200)}`).join("\n");
	saveEnquiry({
		kind: "job",
		name,
		phone,
		email: clip(form.get("email"), 160),
		topic: role ? role.title : "General application",
		area: clip(form.get("area"), 120),
		preferred: clip(form.get("notice"), 120),
		message: [
			`Experience: ${clip(form.get("experience"), 200)}`,
			fits && `Checklist:\n${fits}`,
			clip(form.get("message"), 3e3)
		].filter(Boolean).join("\n\n")
	});
	return redirect(`${back}?sent=1#apply`, 303);
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/apply@_@ts
var page = () => apply_exports;
//#endregion
export { page };
