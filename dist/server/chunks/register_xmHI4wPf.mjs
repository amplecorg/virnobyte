import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { i as get } from "./db_CrQR8QZK.mjs";
import { a as rateLimit, o as registerCustomer, r as createSession } from "./auth_CFhoV3Rg.mjs";
import { h as planById } from "./data_rJFB0L58.mjs";
import { t as $$Auth } from "./Auth_KbON-ISe.mjs";
import { t as $$Field } from "./Field_DozAohjX.mjs";
import { t as $$GoogleButton } from "./GoogleButton_CLhKzoAk.mjs";
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
	const next = Astro.url.searchParams.get("next");
	const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : null;
	const isCheckout = safeNext && safeNext.startsWith("/checkout");
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
			if (plan && plan.active) return Astro.redirect(`/membership/checkout/${plan.id}`, 303);
			return Astro.redirect(safeNext ?? "/account", 303);
		}
	}
	return renderTemplate`${renderComponent($$result, "Auth", $$Auth, {
		"title": isCheckout ? "Create an account to order | Virnobyte" : "Create an account | Virnobyte",
		"heading": plan ? `Get the ${plan.name} card` : isCheckout ? "Create your account to order" : "Create your account",
		"lede": plan ? "Create an account, then pay online and your card is active straight away." : isCheckout ? "Create an account to complete your checkout and track doorstep delivery." : "Track your membership card, coins and service visits."
	}, { "default": ($$result) => renderTemplate`${isCheckout && renderTemplate`${maybeRenderHead($$result)}<div style="background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; padding: 12px 14px; border-radius: 8px; margin-bottom: 16px; font-size: 0.9rem;">
🛒 <strong>Fast Checkout:</strong> Create your account to place this order and track your delivery.
</div>`}${errors.form && renderTemplate`<p class="alert alert--error" role="alert">${errors.form}</p>`}${renderComponent($$result, "GoogleButton", $$GoogleButton, { "next": plan ? `/membership/checkout/${plan.id}` : safeNext })} <form method="post" novalidate> ${renderComponent($$result, "Field", $$Field, {
		"label": "Full name",
		"name": "name",
		"required": true,
		"autocomplete": "name",
		"value": values.name,
		"error": errors.name,
		"hint": "Your full name for delivery."
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
	})} <button class="btn btn--block" type="submit">${plan ? `Create account and continue` : isCheckout ? "Create Account & Proceed to Checkout" : "Create account"}</button> </form> <p class="small muted">Already have an account? <a${addAttribute(`/account/login${safeNext ? `?next=${encodeURIComponent(safeNext)}` : ""}`, "href")}>Sign in</a>.</p> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/account/register.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/account/register.astro";
var $$url = "/account/register.html";
//#endregion
//#region \0virtual:astro:page:src/pages/account/register@_@astro
var page = () => register_exports;
//#endregion
export { page };
