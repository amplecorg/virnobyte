import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Base } from "./Base_CDuYVyrv.mjs";
import { C as services } from "./data_BjEY30i2.mjs";
//#region src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$404 = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$404;
	Astro.response.status = 404;
	const top = services().filter((s) => s.footer).slice(0, 6);
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Page not found | Virnobyte",
		"description": "The page you were looking for could not be found.",
		"noindex": true,
		"canonical": "/404"
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<section class="section"> <div class="wrap stack" style="max-width:760px"> <span class="eyebrow">Error 404</span> <h1>This page isn't here</h1> <p class="lede">The link may be old or mistyped. These pages are the most likely matches:</p> <ul class="ticks"> ${top.map((s) => renderTemplate`<li><a${addAttribute(`/services/${s.slug}`, "href")}>${s.name}</a></li>`)} <li><a href="/membership">Membership card</a></li> <li><a href="/contact">Contact Virnobyte</a></li> </ul> <p><a class="btn" href="/">Go to the home page</a></p> </div> </section> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/404.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/404.astro";
var $$url = "/404.html";
//#endregion
//#region \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
//#endregion
export { page };
