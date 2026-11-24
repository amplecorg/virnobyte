import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, V as createAstro, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { u as userFromCookies } from "./auth_CFhoV3Rg.mjs";
import { o as getCart } from "./cart_CxOmW9DG.mjs";
import { t as $$Base } from "./Base_ac1XVCJk.mjs";
import { t as $$CheckoutView } from "./CheckoutView_CB6kXFf3.mjs";
//#region src/pages/checkout/index.astro
var checkout_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const user = Astro.locals.user || userFromCookies(Astro.cookies);
	if (!user) return Astro.redirect(`/account/login?next=${encodeURIComponent(Astro.url.pathname + Astro.url.search)}`, 302);
	const prod = Astro.url.searchParams.get("product") || Astro.url.searchParams.get("slug");
	if (prod) return Astro.redirect(`/checkout/${encodeURIComponent(prod)}`, 302);
	const secure = Astro.url.protocol === "https:" || Astro.request.headers.get("x-forwarded-proto") === "https";
	const view = getCart(Astro.cookies, user, secure);
	if (!view.totals.itemCount) return Astro.redirect("/cart", 302);
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Checkout | Virnobyte Secure Order",
		"description": "Enter your delivery address and pay securely to complete your Virnobyte order.",
		"canonical": "/checkout",
		"noindex": true
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "CheckoutView", $$CheckoutView, {
		"lines": view.lines,
		"totals": view.totals,
		"mode": "cart"
	})} ` })}`;
}, "C:/Programming section/virnobyte/src/pages/checkout/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/checkout/index.astro";
var $$url = "/checkout.html";
//#endregion
//#region \0virtual:astro:page:src/pages/checkout/index@_@astro
var page = () => checkout_exports;
//#endregion
export { page };
