import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Base } from "./Base_C1ZfuIuG.mjs";
import { C as service, b as projects, t as PORTFOLIO_CATEGORIES } from "./data_CkdtwXhb.mjs";
import { t as $$PageHero } from "./PageHero_DuIY_j_o.mjs";
import { t as $$CtaBand } from "./CtaBand_BEqDDx06.mjs";
import { n as breadcrumbs } from "./schema_DpnEjatQ.mjs";
import { t as $$ProjectList } from "./ProjectList_CSD7GJfp.mjs";
//#region src/pages/portfolio/[category].astro
var _category__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Category,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Category = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Category;
	const slug = Astro.params.category;
	const cat = PORTFOLIO_CATEGORIES[slug];
	if (!cat) return Astro.rewrite("/404");
	const items = projects(slug);
	const svc = service(cat.service);
	const crumbs = [
		{
			name: "Home",
			href: "/"
		},
		{
			name: "Portfolio",
			href: "/portfolio"
		},
		{
			name: cat.name,
			href: `/portfolio/${slug}`
		}
	];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": `${cat.name} in Pune & Pimpri-Chinchwad | Virnobyte`,
		"description": `${cat.blurb} Completed by Virnobyte for customers in Chikhali, Pimpri-Chinchwad and Pune.`,
		"canonical": `/portfolio/${slug}`,
		"image": `/og/portfolio/${slug}.jpg`,
		"noindex": items.length === 0,
		"jsonLd": breadcrumbs(Astro.site, crumbs)
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PageHero", $$PageHero, {
		"crumbs": crumbs,
		"eyebrow": "Portfolio",
		"title": cat.name,
		"lede": cat.blurb
	}, { "default": ($$result) => renderTemplate`${svc && renderTemplate`${maybeRenderHead($$result)}<p><a${addAttribute(`/services/${svc.slug}`, "href")}>About our ${svc.name.toLowerCase()} service</a></p>`}` })} <section class="section"> <div class="wrap"> ${items.length ? renderTemplate`${renderComponent($$result, "ProjectList", $$ProjectList, { "items": items })}` : renderTemplate`<div class="card" style="max-width:720px"> <h2 style="font-size:1.25rem">Projects are being documented</h2> <p class="muted" style="margin-top:8px">
We are adding write-ups of recent ${cat.name.toLowerCase()} with customer permission. Meanwhile, ask us for references for similar work.
</p> </div>`} </div> </section> ${renderComponent($$result, "CtaBand", $$CtaBand, {})} ` })}`;
}, "C:/Programming section/virnobyte/src/pages/portfolio/[category].astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/portfolio/[category].astro";
var $$url = "/portfolio/[category].html";
//#endregion
//#region \0virtual:astro:page:src/pages/portfolio/[category]@_@astro
var page = () => _category__exports;
//#endregion
export { page };
