import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Icon } from "./Icon_CAVYTX4O.mjs";
import { t as $$Base } from "./Base_DFqffn11.mjs";
import { b as projects, t as PORTFOLIO_CATEGORIES } from "./data_D0xPvenu.mjs";
import { t as $$PageHero } from "./PageHero_DuIY_j_o.mjs";
import { t as $$CtaBand } from "./CtaBand_BNLk0gfY.mjs";
import { n as breadcrumbs } from "./schema_D3llm4Na.mjs";
import { t as $$ProjectList } from "./ProjectList_CSD7GJfp.mjs";
//#region src/pages/portfolio/index.astro
var portfolio_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const all = projects();
	const crumbs = [{
		name: "Home",
		href: "/"
	}, {
		name: "Portfolio",
		href: "/portfolio"
	}];
	const cats = Object.entries(PORTFOLIO_CATEGORIES).map(([slug, c]) => ({
		slug,
		...c,
		count: all.filter((p) => p.category === slug).length
	}));
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "IT, CCTV & Networking Projects in Pune | Virnobyte Portfolio",
		"description": "Virnobyte project portfolio: CCTV installations, office networks, office IT setups and hardware installations for businesses in Pimpri-Chinchwad and Pune.",
		"canonical": "/portfolio",
		"image": "/og/pages/portfolio.jpg",
		"jsonLd": breadcrumbs(Astro.site, crumbs),
		"data-astro-cid-ght3iha2": true
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PageHero", $$PageHero, {
		"crumbs": crumbs,
		"eyebrow": "Our work",
		"title": "Projects across Pimpri-Chinchwad and Pune",
		"lede": "CCTV, networking, office IT and hardware installations, documented with the scope of each job.",
		"data-astro-cid-ght3iha2": true
	})} ${maybeRenderHead($$result)}<section class="section" data-astro-cid-ght3iha2> <div class="wrap" data-astro-cid-ght3iha2> <ul class="cats" data-astro-cid-ght3iha2> ${cats.map((c) => renderTemplate`<li data-reveal data-astro-cid-ght3iha2> <a${addAttribute(`/portfolio/${c.slug}`, "href")} class="cat" data-astro-cid-ght3iha2> <h2 data-astro-cid-ght3iha2>${c.name}</h2> <p class="small muted" data-astro-cid-ght3iha2>${c.blurb}</p> <span class="small" data-astro-cid-ght3iha2>${c.count ? `${c.count} project${c.count > 1 ? "s" : ""}` : "Projects coming soon"} ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 16,
		"data-astro-cid-ght3iha2": true
	})}</span> </a> </li>`)} </ul> ${all.length > 0 && renderTemplate`<div class="latest" data-astro-cid-ght3iha2> <h2 data-astro-cid-ght3iha2>Recent projects</h2> ${renderComponent($$result, "ProjectList", $$ProjectList, {
		"items": all.slice(0, 6),
		"data-astro-cid-ght3iha2": true
	})} </div>`} </div> </section> ${renderComponent($$result, "CtaBand", $$CtaBand, {
		"heading": "Planning a similar project?",
		"text": "Book a site visit. We survey, plan and quote before anything is installed.",
		"data-astro-cid-ght3iha2": true
	})} ` })}`;
}, "C:/Programming section/virnobyte/src/pages/portfolio/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/portfolio/index.astro";
var $$url = "/portfolio.html";
//#endregion
//#region \0virtual:astro:page:src/pages/portfolio/index@_@astro
var page = () => portfolio_exports;
//#endregion
export { page };
