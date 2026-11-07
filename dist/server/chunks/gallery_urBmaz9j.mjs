import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { c as gallery } from "./data__NbXfEkj.mjs";
import { r as breadcrumbs, t as $$Base } from "./Base_BVqJxxBb.mjs";
import { t as $$Photo } from "./Photo_DaKSvGuY.mjs";
import { t as $$PageHero } from "./PageHero_DuIY_j_o.mjs";
import { t as $$CtaBand } from "./CtaBand_CBQsmf5J.mjs";
//#region src/pages/gallery.astro
var gallery_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Gallery,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Gallery = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Gallery;
	const items = gallery();
	const crumbs = [{
		name: "Home",
		href: "/"
	}, {
		name: "Gallery",
		href: "/gallery"
	}];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Gallery | Workshop & Installation Photos | Virnobyte",
		"description": "Photos from Virnobyte's workshop in Chikhali and installations across Pimpri-Chinchwad and Pune: CCTV, networking, repairs and office IT.",
		"canonical": "/gallery",
		"noindex": items.length === 0,
		"jsonLd": breadcrumbs(Astro.site, crumbs),
		"data-astro-cid-3mhbem3k": true
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PageHero", $$PageHero, {
		"crumbs": crumbs,
		"eyebrow": "Gallery",
		"title": "From the workshop and on-site",
		"lede": "Real photos of our repairs and installations.",
		"data-astro-cid-3mhbem3k": true
	})} ${maybeRenderHead($$result)}<section class="section" data-astro-cid-3mhbem3k> <div class="wrap" data-astro-cid-3mhbem3k> ${items.length ? renderTemplate`<ul class="gal" data-astro-cid-3mhbem3k> ${items.map((g) => renderTemplate`<li data-reveal data-astro-cid-3mhbem3k> <figure data-astro-cid-3mhbem3k> ${renderComponent($$result, "Photo", $$Photo, {
		"image": g.image,
		"alt": g.caption || "Virnobyte project photo",
		"sizes": "(min-width: 1200px) 33vw, (min-width: 700px) 50vw, 100vw",
		"widths": [
			480,
			768,
			1080,
			1440
		],
		"data-astro-cid-3mhbem3k": true
	})} ${g.caption && renderTemplate`<figcaption class="small muted" data-astro-cid-3mhbem3k>${g.caption}</figcaption>`} </figure> </li>`)} </ul>` : renderTemplate`<p class="lede" data-astro-cid-3mhbem3k>Photos are being added. Follow our <a href="/portfolio" data-astro-cid-3mhbem3k>portfolio</a> for project write-ups.</p>`} </div> </section> ${renderComponent($$result, "CtaBand", $$CtaBand, { "data-astro-cid-3mhbem3k": true })} ` })}`;
}, "C:/Programming section/virnobyte/src/pages/gallery.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/gallery.astro";
var $$url = "/gallery.html";
//#endregion
//#region \0virtual:astro:page:src/pages/gallery@_@astro
var page = () => gallery_exports;
//#endregion
export { page };
