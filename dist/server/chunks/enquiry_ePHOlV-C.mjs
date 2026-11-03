import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { a as rateLimit } from "./auth_iehkRLLM.mjs";
import { S as saveEnquiry } from "./data_D0xPvenu.mjs";
//#region src/pages/api/enquiry.ts
var enquiry_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var PHONE = /^[+]?[0-9 ()-]{10,16}$/;
var clip = (v, n) => String(v ?? "").trim().slice(0, n);
var POST = async ({ request, redirect, clientAddress }) => {
	const form = await request.formData();
	const back = clip(form.get("source"), 200);
	const safeBack = back.startsWith("/") && !back.startsWith("//") ? back : "/contact";
	if (clip(form.get("website"), 200)) return redirect(`${safeBack}?sent=1#book`, 303);
	if (!rateLimit(`enq:${clientAddress}`, 8, 6e5)) return redirect(`${safeBack}?error=rate#book`, 303);
	const name = clip(form.get("name"), 120);
	const phone = clip(form.get("phone"), 30);
	if (!name || !PHONE.test(phone)) return redirect(`${safeBack}?error=fields#book`, 303);
	saveEnquiry({
		kind: "service",
		name,
		phone,
		email: clip(form.get("email"), 160),
		topic: clip(form.get("topic"), 120),
		message: clip(form.get("message"), 3e3),
		area: clip(form.get("area"), 120),
		preferred: clip(form.get("preferred"), 120)
	});
	return redirect(`${safeBack}?sent=1#book`, 303);
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/enquiry@_@ts
var page = () => enquiry_exports;
//#endregion
export { page };
