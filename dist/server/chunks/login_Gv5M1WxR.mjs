import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { a as rateLimit, r as createSession, t as authenticate } from "./auth_iehkRLLM.mjs";
import { t as $$Auth } from "./Auth_DaauRaEw.mjs";
import { t as $$Field } from "./Field_DozAohjX.mjs";
//#region src/pages/admin/login.astro
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
	const safeNext = next && next.startsWith("/admin") ? next : "/admin";
	let error = "";
	let email = "";
	if (Astro.locals.user?.role === "admin") return Astro.redirect(safeNext);
	if (Astro.request.method === "POST") {
		const form = await Astro.request.formData();
		email = String(form.get("email") ?? "").trim();
		if (!rateLimit(`admin-login:${Astro.clientAddress}`, 8, 9e5)) error = "Too many attempts. Wait 15 minutes and try again.";
		else {
			const user = authenticate(email, String(form.get("password") ?? ""));
			if (!user || user.role !== "admin") error = "These details do not match an administrator account.";
			else {
				const isSecure = Astro.url.protocol === "https:" || Astro.request.headers.get("x-forwarded-proto") === "https";
				createSession(Astro.cookies, user.id, isSecure);
				return Astro.redirect(safeNext, 303);
			}
		}
	}
	return renderTemplate`${renderComponent($$result, "Auth", $$Auth, {
		"title": "Admin sign in | Virnobyte",
		"heading": "Admin sign in"
	}, { "default": ($$result) => renderTemplate`${error && renderTemplate`${maybeRenderHead($$result)}<p class="alert alert--error" role="alert">${error}</p>`}<form method="post"> ${renderComponent($$result, "Field", $$Field, {
		"label": "Email",
		"name": "email",
		"type": "email",
		"required": true,
		"autocomplete": "username",
		"value": email
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Password",
		"name": "password",
		"type": "password",
		"required": true,
		"autocomplete": "current-password"
	})} <div style="display: flex; justify-content: flex-end; margin-top: -0.5rem; margin-bottom: 0.25rem;"> <a href="/account/forgot-password" class="small muted">Forgot password?</a> </div> <button class="btn btn--block" type="submit">Sign in</button> </form> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/admin/login.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/login.astro";
var $$url = "/admin/login.html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/login@_@astro
var page = () => login_exports;
//#endregion
export { page };
