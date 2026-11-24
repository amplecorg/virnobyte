import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { a as rateLimit } from "./auth_CFhoV3Rg.mjs";
import { n as isSecure } from "./http_B1Mo43QL.mjs";
import { r as signInVendor } from "./vendor_12Z6vgmZ.mjs";
import { t as $$Vendor } from "./Vendor_CItrIIYU.mjs";
//#region src/pages/vendor/access.astro
var access_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Access,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Access = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Access;
	const token = Astro.url.searchParams.get("t") ?? "";
	const allowed = rateLimit(`vendor-access:${Astro.clientAddress}`, 20, 6e5);
	if (allowed && token ? signInVendor(Astro.cookies, token, isSecure(Astro)) : void 0) return Astro.redirect("/vendor", 303);
	return renderTemplate`${renderComponent($$result, "Vendor", $$Vendor, { "title": "Sign in" }, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<section class="panel" style="max-width:520px;margin:40px auto"> <h1 style="margin-bottom:10px">This link does not work</h1> <p>${allowed ? "The portal link is old, was replaced, or was copied incompletely." : "Too many attempts. Please wait a few minutes."} Please ask Virnobyte for a new link.</p> </section> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/vendor/access.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/vendor/access.astro";
var $$url = "/vendor/access.html";
//#endregion
//#region \0virtual:astro:page:src/pages/vendor/access@_@astro
var page = () => access_exports;
//#endregion
export { page };
