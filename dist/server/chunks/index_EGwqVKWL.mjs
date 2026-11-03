import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { V as createAstro } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
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
	const prod = Astro.url.searchParams.get("product") || Astro.url.searchParams.get("slug");
	if (prod) return Astro.redirect(`/checkout/${encodeURIComponent(prod)}`, 302);
	return Astro.redirect("/products", 302);
}, "C:/Programming section/virnobyte/src/pages/checkout/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/checkout/index.astro";
var $$url = "/checkout.html";
//#endregion
//#region \0virtual:astro:page:src/pages/checkout/index@_@astro
var page = () => checkout_exports;
//#endregion
export { page };
