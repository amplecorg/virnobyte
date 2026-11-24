import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { a as rateLimit, l as siteOrigin, r as createSession } from "./auth_CFhoV3Rg.mjs";
import { n as isSecure } from "./http_B1Mo43QL.mjs";
import { a as userForGoogle, i as googleProfile, r as googleConfig, t as GOOGLE_STATE_COOKIE } from "./google_CvESN5mz.mjs";
//#region src/pages/account/google/callback.ts
var callback_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
/** GET /account/google/callback — Google sends the shopper back here with a one-time code. */
var GET = async (ctx) => {
	const fail = (msg) => ctx.redirect(`/account/login?google_error=${encodeURIComponent(msg)}`, 303);
	if (!googleConfig().enabled) return fail("Google sign-in is not set up.");
	if (!rateLimit(`google:${ctx.clientAddress}`, 20, 6e5)) return fail("Too many attempts. Please wait a few minutes.");
	let saved = {};
	try {
		saved = JSON.parse(ctx.cookies.get("vb_g_state")?.value || "{}");
	} catch {}
	ctx.cookies.delete(GOOGLE_STATE_COOKIE, { path: "/account/google" });
	const code = ctx.url.searchParams.get("code");
	const state = ctx.url.searchParams.get("state");
	if (ctx.url.searchParams.get("error")) return fail("Google sign-in was cancelled.");
	if (!code || !state || !saved.state || state !== saved.state) return fail("That sign-in link expired. Please try again.");
	try {
		const profile = await googleProfile(code, `${siteOrigin(ctx)}/account/google/callback`);
		const user = userForGoogle(profile);
		createSession(ctx.cookies, user.id, isSecure(ctx));
		return ctx.redirect(saved.next || "/account", 303);
	} catch (e) {
		console.warn("[Google sign-in] failed:", e?.message);
		return fail(e?.message || "Google sign-in failed. Please try again.");
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/account/google/callback@_@ts
var page = () => callback_exports;
//#endregion
export { page };
