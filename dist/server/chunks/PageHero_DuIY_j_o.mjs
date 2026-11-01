import { A as renderTemplate, D as renderSlot, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Breadcrumbs } from "./Breadcrumbs_dgueMOWz.mjs";
import { t as $$Photo } from "./Photo_DaKSvGuY.mjs";
//#region src/components/PageHero.astro
createAstro("https://virnobyte.com");
var $$PageHero = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$PageHero;
	const { crumbs, eyebrow, title, lede, image, imageAlt = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<section${addAttribute(["page-hero", { "has-image": image }], "class:list")} data-astro-cid-75ysl5lo> <div class="wrap grid-hero" data-astro-cid-75ysl5lo> <div class="copy" data-astro-cid-75ysl5lo> ${renderComponent($$result, "Breadcrumbs", $$Breadcrumbs, {
		"items": crumbs,
		"data-astro-cid-75ysl5lo": true
	})} ${eyebrow && renderTemplate`<span class="eyebrow" data-astro-cid-75ysl5lo>${eyebrow}</span>`} <h1 data-astro-cid-75ysl5lo>${title}</h1> ${lede && renderTemplate`<p class="lede" data-astro-cid-75ysl5lo>${lede}</p>`} ${renderSlot($$result, $$slots["default"])} </div> ${image && renderTemplate`<div class="media" data-astro-cid-75ysl5lo> ${renderComponent($$result, "Photo", $$Photo, {
		"image": image,
		"alt": imageAlt,
		"eager": true,
		"sizes": "(min-width: 1100px) 45vw, 100vw",
		"widths": [
			480,
			768,
			1080,
			1440,
			1920,
			2560
		],
		"data-astro-cid-75ysl5lo": true
	})} </div>`} </div> </section>`;
}, "C:/Programming section/virnobyte/src/components/PageHero.astro", void 0);
//#endregion
export { $$PageHero as t };
