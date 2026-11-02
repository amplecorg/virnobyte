import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { a as rateLimit, r as createSession, t as authenticate } from "./auth_iehkRLLM.mjs";
import { t as $$Auth } from "./Auth_B2iQHsS6.mjs";
import { t as $$Field } from "./Field_DozAohjX.mjs";
//#region src/pages/account/login.astro
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Login,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Login = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Login;
	const next = Astro.url.searchParams.get("next");
	const reset = Astro.url.searchParams.get("reset");
	const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : null;
	let error = "";
	let email = "";
	if (Astro.request.method === "POST") {
		const form = await Astro.request.formData();
		email = String(form.get("email") ?? "").trim();
		const password = String(form.get("password") ?? "");
		if (!rateLimit(`login:${Astro.clientAddress}`, 10, 9e5)) error = "Too many sign-in attempts. Wait 15 minutes and try again.";
		else {
			const user = authenticate(email, password);
			if (!user) error = "That email and password do not match an account.";
			else {
				const isSecure = Astro.url.protocol === "https:" || Astro.request.headers.get("x-forwarded-proto") === "https";
				createSession(Astro.cookies, user.id, isSecure);
				return Astro.redirect(safeNext ?? (user.role === "admin" ? "/admin" : "/account"), 303);
			}
		}
	}
	return renderTemplate`${renderComponent($$result, "Auth", $$Auth, {
		"title": "Sign in | Virnobyte",
		"heading": "Sign in to your account",
		"lede": "See your membership card, coin balance and service history."
	}, { "default": ($$result) => renderTemplate`${reset === "1" && renderTemplate`${maybeRenderHead($$result)}<p class="alert alert--ok" role="status">
Your password has been reset successfully. Please sign in with your new password.
</p>`}${error && renderTemplate`<p class="alert alert--error" role="alert">${error}</p>`}<form method="post"> ${renderComponent($$result, "Field", $$Field, {
		"label": "Email",
		"name": "email",
		"type": "email",
		"required": true,
		"autocomplete": "email",
		"value": email
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Password",
		"name": "password",
		"type": "password",
		"required": true,
		"autocomplete": "current-password"
	})} <div style="display: flex; justify-content: flex-end; margin-top: -0.5rem; margin-bottom: 0.25rem;"> <a href="/account/forgot-password" class="small muted">Forgot password?</a> </div> <button class="btn btn--block" type="submit">Sign in</button> </form> <p class="small muted">
New here? <a${addAttribute(`/account/register${safeNext ? `?next=${encodeURIComponent(safeNext)}` : ""}`, "href")}>Create an account</a>.
</p> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/account/login.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/account/login.astro";
var $$url = "/account/login.html";
//#endregion
//#region \0virtual:astro:page:src/pages/account/login@_@astro
var page = () => login_exports;
//#endregion
export { page };
