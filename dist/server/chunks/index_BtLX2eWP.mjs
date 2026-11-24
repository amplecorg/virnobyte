import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { l as siteOrigin } from "./auth_CFhoV3Rg.mjs";
import { n as isSecure } from "./http_B1Mo43QL.mjs";
import { n as googleAuthUrl, r as googleConfig, t as GOOGLE_STATE_COOKIE } from "./google_CvESN5mz.mjs";
import { randomBytes } from "node:crypto";
//#region src/pages/account/google/index.ts
var google_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
/** GET /account/google?next=/checkout — sends the shopper to Google's account chooser. */
var GET = (ctx) => {
	if (!googleConfig().enabled) return ctx.redirect("/account/login", 302);
	const next = ctx.url.searchParams.get("next") ?? "";
	const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "";
	const state = randomBytes(24).toString("base64url");
	ctx.cookies.set(GOOGLE_STATE_COOKIE, JSON.stringify({
		state,
		next: safeNext
	}), {
		path: "/account/google",
		httpOnly: true,
		sameSite: "lax",
		secure: isSecure(ctx),
		maxAge: 600
	});
	return ctx.redirect(googleAuthUrl(`${siteOrigin(ctx)}/account/google/callback`, state), 302);
};
//#endregion
//#region \0virtual:astro:page:src/pages/account/google/index@_@ts
var page = () => google_exports;
//#endregion
export { page };
