import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Base } from "./Base_BChkAF8j.mjs";
import { w as services } from "./data_BsFNaZtg.mjs";
import { t as $$PageHero } from "./PageHero_DuIY_j_o.mjs";
import { t as $$CtaBand } from "./CtaBand_D5DCH3AS.mjs";
import { n as breadcrumbs } from "./schema_UjY2ZCpY.mjs";
import { t as $$ServiceGrid } from "./ServiceGrid_BDgragIJ.mjs";
//#region src/pages/services/index.astro
var services_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const all = services();
	const groups = [...new Set(all.map((s) => s.group_name))];
	const crumbs = [{
		name: "Home",
		href: "/"
	}, {
		name: "Services",
		href: "/services"
	}];
	const INTRO = {
		"Repair & support": "Diagnosis-first repairs for computers, laptops, printers and storage — walk in at Chikhali or book a doorstep visit.",
		"Security & networks": "CCTV and networks planned around your premises, installed cleanly and documented.",
		"Business IT": "Ongoing support, 3D futuristic web development, infrastructure and planning for offices, brands and growing teams."
	};
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "IT Services in Pune & Pimpri-Chinchwad | Virnobyte",
		"description": "Computer and laptop repair, CCTV, networking, 3D website development, data recovery, IT AMC, and business IT services from Virnobyte in Chikhali, Pimpri-Chinchwad and Pune.",
		"canonical": "/services",
		"jsonLd": breadcrumbs(Astro.site, crumbs)
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PageHero", $$PageHero, {
		"crumbs": crumbs,
		"eyebrow": "Chikhali · Pimpri-Chinchwad · Pune",
		"title": "IT services for homes and businesses in Pune",
		"lede": `${all.length} services, one local team. Every job starts with a diagnosis and an itemised quote you approve.`
	})} ${groups.map((g) => renderTemplate`${maybeRenderHead($$result)}<section class="section"${addAttribute(`g-${g}`, "aria-labelledby")}> <div class="wrap"> <div class="section-head" data-reveal> <h2${addAttribute(`g-${g}`, "id")}>${g}</h2> ${INTRO[g] && renderTemplate`<p class="lede">${INTRO[g]}</p>`} </div> ${renderComponent($$result, "ServiceGrid", $$ServiceGrid, { "items": all.filter((s) => s.group_name === g) })} </div> </section>`)}${renderComponent($$result, "CtaBand", $$CtaBand, {})} ` })}`;
}, "C:/Programming section/virnobyte/src/pages/services/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/services/index.astro";
var $$url = "/services.html";
//#endregion
//#region \0virtual:astro:page:src/pages/services/index@_@astro
var page = () => services_exports;
//#endregion
export { page };
