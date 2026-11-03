import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, T as Fragment, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { a as rateLimit, n as createPasswordReset } from "./auth_iehkRLLM.mjs";
import { t as $$Auth } from "./Auth_DaauRaEw.mjs";
import { t as $$Field } from "./Field_DozAohjX.mjs";
//#region src/pages/account/forgot-password.astro
var forgot_password_exports = /* @__PURE__ */ __exportAll({
	default: () => $$ForgotPassword,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$ForgotPassword = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ForgotPassword;
	if (Astro.locals.user) return Astro.redirect("/account");
	let error = "";
	let email = "";
	let submitted = false;
	let devUrl = void 0;
	if (Astro.request.method === "POST") {
		const form = await Astro.request.formData();
		if (form.get("website")) submitted = true;
		else {
			email = String(form.get("email") ?? "").trim();
			if (!rateLimit(`forgot-pw:${Astro.clientAddress}`, 5, 9e5)) error = "Too many requests. Please wait 15 minutes before trying again.";
			else if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) error = "Please enter a valid email address.";
			else {
				const res = await createPasswordReset(email, Astro.url.origin);
				if (!res.success && res.error) error = res.error;
				else {
					submitted = true;
					devUrl = res.devUrl;
				}
			}
		}
	}
	return renderTemplate`${renderComponent($$result, "Auth", $$Auth, {
		"title": "Forgot Password | Virnobyte",
		"heading": "Reset your password",
		"lede": "Enter the email address associated with your account and we will send you a link to reset your password."
	}, { "default": ($$result) => renderTemplate`${submitted ? renderTemplate`${maybeRenderHead($$result)}<div> <p class="alert alert--ok" role="status">
If an account with that email exists, we have sent instructions to reset your password. Please check your inbox and spam folder.
</p> ${devUrl && renderTemplate`<div class="alert" style="margin-top: 1rem; word-break: break-all; background: #e0f2fe; border-color: #7dd3fc; color: #0369a1;"> <strong>Local Development Notice:</strong> SMTP is not configured in <code>.env</code>. You can use this generated link to test:
<div style="margin-top: 0.5rem;"> <a${addAttribute(devUrl, "href")} style="text-decoration: underline; font-weight: 600;">${devUrl}</a> </div> </div>`} <p class="small muted" style="margin-top: 1.5rem;"> <a href="/account/login">&larr; Return to sign in</a> </p> </div>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` ${error && renderTemplate`<p class="alert alert--error" role="alert">${error}</p>`} <form method="post" novalidate> <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off"> ${renderComponent($$result, "Field", $$Field, {
		"label": "Email address",
		"name": "email",
		"type": "email",
		"required": true,
		"autocomplete": "email",
		"value": email,
		"hint": "We will send a secure reset link to this address."
	})} <button class="btn btn--block" type="submit">Send reset link</button> </form> <p class="small muted">
Remember your password? <a href="/account/login">Sign in</a>.
</p> ` })}`}` })}`;
}, "C:/Programming section/virnobyte/src/pages/account/forgot-password.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/account/forgot-password.astro";
var $$url = "/account/forgot-password.html";
//#endregion
//#region \0virtual:astro:page:src/pages/account/forgot-password@_@astro
var page = () => forgot_password_exports;
//#endregion
export { page };
