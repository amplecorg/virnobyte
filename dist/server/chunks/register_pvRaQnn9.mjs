import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { r as get } from "./db_DQxgWG_z.mjs";
import { a as rateLimit, o as registerCustomer, r as createSession } from "./auth_iehkRLLM.mjs";
import { m as planById, x as requestMembership } from "./data_D0xPvenu.mjs";
import { t as $$Auth } from "./Auth_ByV6KzxV.mjs";
import { t as $$Field } from "./Field_DozAohjX.mjs";
//#region src/pages/account/register.astro
var register_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Register,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Register = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Register;
	const planId = Number(Astro.url.searchParams.get("plan")) || null;
	const plan = planId ? planById(planId) : void 0;
	const errors = {};
	const values = {
		name: "",
		email: "",
		phone: ""
	};
	if (Astro.request.method === "POST") {
		const form = await Astro.request.formData();
		values.name = String(form.get("name") ?? "").trim();
		values.email = String(form.get("email") ?? "").trim();
		values.phone = String(form.get("phone") ?? "").trim();
		const password = String(form.get("password") ?? "");
		if (!values.name) errors.name = "Enter your name as it should appear on your card.";
		if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) errors.email = "Enter an email address like name@example.com.";
		else if (get("SELECT 1 FROM users WHERE email = ?", values.email)) errors.email = "An account with this email already exists. Sign in instead.";
		if (!/^[+]?[0-9 ()-]{10,16}$/.test(values.phone)) errors.phone = "Enter a 10-digit mobile number, e.g. 98765 43210.";
		if (password.length < 8) errors.password = "Use at least 8 characters.";
		if (!rateLimit(`reg:${Astro.clientAddress}`, 5, 36e5)) errors.form = "Too many accounts created from this connection. Please call us.";
		if (!Object.keys(errors).length) {
			const id = registerCustomer({
				...values,
				password
			});
			const isSecure = Astro.url.protocol === "https:" || Astro.request.headers.get("x-forwarded-proto") === "https";
			createSession(Astro.cookies, id, isSecure);
			if (plan && plan.active) {
				requestMembership(id, plan.id);
				return Astro.redirect("/account?requested=1", 303);
			}
			return Astro.redirect("/account", 303);
		}
	}
	return renderTemplate`${renderComponent($$result, "Auth", $$Auth, {
		"title": "Create an account | Virnobyte",
		"heading": plan ? `Get the ${plan.name} card` : "Create your account",
		"lede": plan ? "Create an account to request your card. We will call to confirm and activate it." : "Track your membership card, coins and service visits."
	}, { "default": ($$result) => renderTemplate`${errors.form && renderTemplate`${maybeRenderHead($$result)}<p class="alert alert--error" role="alert">${errors.form}</p>`}<form method="post" novalidate> ${renderComponent($$result, "Field", $$Field, {
		"label": "Full name",
		"name": "name",
		"required": true,
		"autocomplete": "name",
		"value": values.name,
		"error": errors.name,
		"hint": "Printed on your membership card."
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Email",
		"name": "email",
		"type": "email",
		"required": true,
		"autocomplete": "email",
		"value": values.email,
		"error": errors.email
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Mobile number",
		"name": "phone",
		"type": "tel",
		"required": true,
		"autocomplete": "tel",
		"inputmode": "tel",
		"value": values.phone,
		"error": errors.phone
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Password",
		"name": "password",
		"type": "password",
		"required": true,
		"autocomplete": "new-password",
		"minlength": 8,
		"error": errors.password,
		"hint": "At least 8 characters."
	})} <button class="btn btn--block" type="submit">${plan ? `Create account and request ${plan.name}` : "Create account"}</button> </form> <p class="small muted">Already have an account? <a href="/account/login">Sign in</a>.</p> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/account/register.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/account/register.astro";
var $$url = "/account/register.html";
//#endregion
//#region \0virtual:astro:page:src/pages/account/register@_@astro
var page = () => register_exports;
//#endregion
export { page };
