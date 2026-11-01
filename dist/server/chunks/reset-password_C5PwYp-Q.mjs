import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, T as Fragment, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { a as rateLimit, s as resetPasswordWithToken, u as validateResetToken } from "./auth_BKr3at0j.mjs";
import { t as $$Auth } from "./Auth_DJo9hwk_.mjs";
import { t as $$Field } from "./Field_DozAohjX.mjs";
//#region src/pages/account/reset-password.astro
var reset_password_exports = /* @__PURE__ */ __exportAll({
	default: () => $$ResetPassword,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$ResetPassword = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ResetPassword;
	const token = String(Astro.url.searchParams.get("token") ?? "").trim();
	let tokenError = "";
	let formError = "";
	if (!token) tokenError = "Password reset token is missing. Please check the link from your email.";
	else {
		const check = validateResetToken(token);
		if (!check.valid) tokenError = check.error || "This password reset link is invalid or has expired.";
	}
	if (!tokenError && Astro.request.method === "POST") {
		if (!rateLimit(`reset-pw:${Astro.clientAddress}`, 10, 9e5)) formError = "Too many attempts. Please wait 15 minutes before trying again.";
		else {
			const form = await Astro.request.formData();
			const password = String(form.get("password") ?? "");
			const confirmPassword = String(form.get("confirmPassword") ?? "");
			if (password.length < 8) formError = "Password must be at least 8 characters long.";
			else if (password !== confirmPassword) formError = "Passwords do not match. Please verify and re-enter.";
			else {
				const res = resetPasswordWithToken(token, password);
				if (!res.success) formError = res.error || "Failed to update password. Please request a new link.";
				else return Astro.redirect("/account/login?reset=1", 303);
			}
		}
	}
	return renderTemplate`${renderComponent($$result, "Auth", $$Auth, {
		"title": "Reset Password | Virnobyte",
		"heading": "Set a new password",
		"lede": "Choose a secure password of at least 8 characters for your account."
	}, { "default": ($$result) => renderTemplate`${tokenError ? renderTemplate`${maybeRenderHead($$result)}<div> <p class="alert alert--error" role="alert">${tokenError}</p> <div style="margin-top: 1.5rem;"> <a href="/account/forgot-password" class="btn btn--block">Request a new reset link</a> </div> <p class="small muted" style="margin-top: 1.5rem;"> <a href="/account/login">&larr; Return to sign in</a> </p> </div>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` ${formError && renderTemplate`<p class="alert alert--error" role="alert">${formError}</p>`} <form method="post" novalidate> ${renderComponent($$result, "Field", $$Field, {
		"label": "New Password",
		"name": "password",
		"type": "password",
		"required": true,
		"autocomplete": "new-password",
		"minlength": 8,
		"hint": "At least 8 characters."
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Confirm New Password",
		"name": "confirmPassword",
		"type": "password",
		"required": true,
		"autocomplete": "new-password",
		"minlength": 8
	})} <button class="btn btn--block" type="submit">Update password</button> </form> <p class="small muted"> <a href="/account/login">&larr; Cancel and return to sign in</a> </p> ` })}`}` })}`;
}, "C:/Programming section/virnobyte/src/pages/account/reset-password.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/account/reset-password.astro";
var $$url = "/account/reset-password.html";
//#endregion
//#region \0virtual:astro:page:src/pages/account/reset-password@_@astro
var page = () => reset_password_exports;
//#endregion
export { page };
