import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, V as createAstro, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { l as userFromCookies } from "./auth_CSZwb3EQ.mjs";
import { y as product } from "./data_DdRaT7LY.mjs";
import { t as $$Base } from "./Base_BQ2Y903t.mjs";
import { l as viewOf, r as buildLine } from "./cart_DNQqdeQo.mjs";
import { t as $$CheckoutView } from "./CheckoutView_D9-PDl5T.mjs";
//#region src/pages/checkout/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Slug = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	if (!(Astro.locals.user || userFromCookies(Astro.cookies))) return Astro.redirect(`/account/login?next=${encodeURIComponent(Astro.url.pathname + Astro.url.search)}`, 302);
	const p = product(String(Astro.params.slug || ""));
	if (!p) return Astro.redirect("/products", 302);
	const view = viewOf(null, [buildLine(p, Number(Astro.url.searchParams.get("qty")) || 1)]);
	if (!view.totals.itemCount) return Astro.redirect(`/products/${p.slug}`, 302);
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": `Checkout: ${p.name} | Virnobyte Secure Order`,
		"description": `Order ${p.name} online with secure UPI, card or NetBanking payment, or Cash on Delivery.`,
		"canonical": `/checkout/${p.slug}`,
		"noindex": true
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "CheckoutView", $$CheckoutView, {
		"lines": view.lines,
		"totals": view.totals,
		"mode": "buy",
		"slug": p.slug
	})} ` })}`;
}, "C:/Programming section/virnobyte/src/pages/checkout/[slug].astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/checkout/[slug].astro";
var $$url = "/checkout/[slug].html";
//#endregion
//#region \0virtual:astro:page:src/pages/checkout/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
