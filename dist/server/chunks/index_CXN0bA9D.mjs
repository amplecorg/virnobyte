import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Base } from "./Base_D1NnyMaX.mjs";
import { _ as posts } from "./data_Bs0BnE5b.mjs";
import { t as $$Photo } from "./Photo_DaKSvGuY.mjs";
import { t as $$PageHero } from "./PageHero_DuIY_j_o.mjs";
import { n as breadcrumbs } from "./schema_CPu37s2y.mjs";
import { c as readingMinutes, r as formatDate } from "./format_B1bSNQa_.mjs";
//#region src/pages/blog/index.astro
var blog_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const list = posts();
	const crumbs = [{
		name: "Home",
		href: "/"
	}, {
		name: "Blog",
		href: "/blog"
	}];
	const [lead, ...rest] = list;
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "IT Tips & Guides for Homes and Businesses | Virnobyte Blog",
		"description": "Practical guides on computer and laptop problems, CCTV maintenance, office networks, data recovery and IT AMC from Virnobyte's technicians in Pune.",
		"canonical": "/blog",
		"image": "/og/pages/blog.jpg",
		"jsonLd": breadcrumbs(Astro.site, crumbs),
		"data-astro-cid-x255k2k2": true
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PageHero", $$PageHero, {
		"crumbs": crumbs,
		"eyebrow": "Guides",
		"title": "Practical IT advice from our workshop",
		"lede": "What we see every week in Pimpri-Chinchwad and Pune, written up so you can fix, prevent or plan.",
		"data-astro-cid-x255k2k2": true
	})} ${maybeRenderHead($$result)}<section class="section" data-astro-cid-x255k2k2> <div class="wrap" data-astro-cid-x255k2k2> ${list.length === 0 && renderTemplate`<p class="lede" data-astro-cid-x255k2k2>New guides are on the way.</p>`} ${lead && renderTemplate`<a${addAttribute(`/blog/${lead.slug}`, "href")} class="lead" data-reveal data-astro-cid-x255k2k2> ${renderComponent($$result, "Photo", $$Photo, {
		"image": lead.image,
		"alt": lead.title,
		"eager": true,
		"sizes": "(min-width: 1024px) 55vw, 100vw",
		"widths": [
			768,
			1080,
			1440,
			1920
		],
		"data-astro-cid-x255k2k2": true
	})} <div class="lead-body" data-astro-cid-x255k2k2> <span class="small muted" data-astro-cid-x255k2k2>${formatDate(lead.published_at)} · ${readingMinutes(lead.body)} min read</span> <h2 data-astro-cid-x255k2k2>${lead.title}</h2> <p class="lede" data-astro-cid-x255k2k2>${lead.description}</p> </div> </a>`} <ul class="posts" data-astro-cid-x255k2k2> ${rest.map((p) => renderTemplate`<li data-reveal data-astro-cid-x255k2k2> <a${addAttribute(`/blog/${p.slug}`, "href")} class="post" data-astro-cid-x255k2k2> ${renderComponent($$result, "Photo", $$Photo, {
		"image": p.image,
		"alt": p.title,
		"sizes": "(min-width: 1000px) 30vw, 100vw",
		"widths": [
			480,
			768,
			1080
		],
		"data-astro-cid-x255k2k2": true
	})} <span class="small muted" data-astro-cid-x255k2k2>${formatDate(p.published_at)} · ${readingMinutes(p.body)} min read</span> <h2 class="h-post" data-astro-cid-x255k2k2>${p.title}</h2> <p class="small muted" data-astro-cid-x255k2k2>${p.description}</p> </a> </li>`)} </ul> </div> </section> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/blog/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/blog/index.astro";
var $$url = "/blog.html";
//#endregion
//#region \0virtual:astro:page:src/pages/blog/index@_@astro
var page = () => blog_exports;
//#endregion
export { page };
