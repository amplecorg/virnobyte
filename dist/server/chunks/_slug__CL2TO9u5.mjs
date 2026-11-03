import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent, z as unescapeHTML } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as renderScript, t as $$Icon } from "./Icon_CAVYTX4O.mjs";
import { t as $$Base } from "./Base_BChkAF8j.mjs";
import { n as getSettings, t as contactInfo } from "./settings_Y_6jYxNr.mjs";
import { C as service, _ as posts, w as services } from "./data_BsFNaZtg.mjs";
import { t as $$PageHero } from "./PageHero_DuIY_j_o.mjs";
import { t as $$CtaBand } from "./CtaBand_D5DCH3AS.mjs";
import { n as breadcrumbs, o as serviceNode, r as faqPage } from "./schema_UjY2ZCpY.mjs";
import { o as markdown } from "./format_B1bSNQa_.mjs";
import { t as $$BookingForm } from "./BookingForm_zEo1MivR.mjs";
import { t as $$FaqList } from "./FaqList_DYYYvqt2.mjs";
import { t as $$ServiceGrid } from "./ServiceGrid_BDgragIJ.mjs";
//#region src/components/ThreeShowcase.astro
var $$ThreeShowcase = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<div class="three-showcase card" data-reveal data-astro-cid-ugl2etp7> <div class="showcase-header" data-astro-cid-ugl2etp7> <div class="badge-live" data-astro-cid-ugl2etp7> <span class="dot" data-astro-cid-ugl2etp7></span> <strong data-astro-cid-ugl2etp7>Interactive Three.js WebGL Engine</strong> </div> <span class="hint-text" data-astro-cid-ugl2etp7>Click & drag to rotate 3D model</span> </div> <div class="canvas-container" id="webgl-canvas-box" data-astro-cid-ugl2etp7> <canvas id="futuristic-webgl-canvas" data-astro-cid-ugl2etp7></canvas> <div class="stats-ribbon" data-astro-cid-ugl2etp7> <div class="stat-item" data-astro-cid-ugl2etp7> <span class="stat-num" data-astro-cid-ugl2etp7>4K UHD</span> <span class="stat-label" data-astro-cid-ugl2etp7>Texture Mapping</span> </div> <div class="stat-item" data-astro-cid-ugl2etp7> <span class="stat-num" data-astro-cid-ugl2etp7>60+ FPS</span> <span class="stat-label" data-astro-cid-ugl2etp7>GPU Accelerated</span> </div> <div class="stat-item" data-astro-cid-ugl2etp7> <span class="stat-num" data-astro-cid-ugl2etp7>Three.js</span> <span class="stat-label" data-astro-cid-ugl2etp7>PBR Shaders</span> </div> <div class="stat-item" data-astro-cid-ugl2etp7> <span class="stat-num" data-astro-cid-ugl2etp7>100%</span> <span class="stat-label" data-astro-cid-ugl2etp7>Mobile Responsive</span> </div> </div> </div> </div>${renderScript($$result, "C:/Programming section/virnobyte/src/components/ThreeShowcase.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Programming section/virnobyte/src/components/ThreeShowcase.astro", void 0);
//#endregion
//#region src/pages/services/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Slug = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const svc = service(Astro.params.slug);
	if (!svc) return Astro.rewrite("/404");
	const s = getSettings();
	const c = contactInfo(s);
	const site = Astro.site;
	const crumbs = [
		{
			name: "Home",
			href: "/"
		},
		{
			name: "Services",
			href: "/services"
		},
		{
			name: svc.name,
			href: `/services/${svc.slug}`
		}
	];
	const related = services().filter((x) => x.slug !== svc.slug && x.group_name === svc.group_name).slice(0, 3);
	const guides = posts().filter((p) => p.related.includes(svc.slug)).slice(0, 3);
	const PROCESS = [
		["Tell us the problem", "Call, WhatsApp or book online with a short description."],
		["Diagnosis and quote", "We find the cause and give you an itemised quote to approve."],
		["Repair or install", "Done at our Chikhali workshop or on-site, with tested parts."],
		["Hand-over and support", "We explain what was done and any warranty that applies."]
	];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": svc.title,
		"description": svc.description,
		"canonical": `/services/${svc.slug}`,
		"image": `/og/services/${svc.slug}.jpg`,
		"imageAlt": `${svc.name} by ${c.name}`,
		"jsonLd": [
			serviceNode(site, svc, s.business.serviceAreas),
			breadcrumbs(site, crumbs),
			...svc.faqs.length ? [faqPage(svc.faqs)] : []
		],
		"data-astro-cid-njl2q4gy": true
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PageHero", $$PageHero, {
		"crumbs": crumbs,
		"eyebrow": `${svc.group_name} · ${s.business.serviceAreas.join(", ")}`,
		"title": svc.h1,
		"lede": svc.short,
		"image": svc.image,
		"imageAlt": `${svc.name} service by ${c.name}`,
		"data-astro-cid-njl2q4gy": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="btn-row" data-astro-cid-njl2q4gy> <a class="btn" href="#book" data-astro-cid-njl2q4gy>${renderComponent($$result, "Icon", $$Icon, {
		"name": "calendar",
		"data-astro-cid-njl2q4gy": true
	})} Book Service</a> <a class="btn btn--ghost"${addAttribute(c.tel, "href")} data-astro-cid-njl2q4gy>${renderComponent($$result, "Icon", $$Icon, {
		"name": "phone",
		"data-astro-cid-njl2q4gy": true
	})} Call ${c.name}</a> <a class="btn btn--ghost"${addAttribute(c.whatsappUrl(`Hi ${c.name}, I need help with ${svc.name.toLowerCase()}.`), "href")} rel="noopener" target="_blank" data-astro-cid-njl2q4gy>${renderComponent($$result, "Icon", $$Icon, {
		"name": "whatsapp",
		"data-astro-cid-njl2q4gy": true
	})} WhatsApp ${c.name}</a> </div> ` })} <section class="section" data-astro-cid-njl2q4gy> <div class="wrap layout" data-astro-cid-njl2q4gy> <article class="main" data-astro-cid-njl2q4gy> <div class="prose" data-reveal data-astro-cid-njl2q4gy>${unescapeHTML(markdown(svc.intro))}</div> ${svc.note && renderTemplate`<p class="note" data-reveal data-astro-cid-njl2q4gy> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "shield",
		"data-astro-cid-njl2q4gy": true
	})} ${svc.note} </p>`} ${svc.slug === "website-development" && renderTemplate`${renderComponent($$result, "ThreeShowcase", $$ThreeShowcase, { "data-astro-cid-njl2q4gy": true })}`} <div class="split" data-reveal data-astro-cid-njl2q4gy> ${svc.problems.length > 0 && renderTemplate`<div class="card" data-astro-cid-njl2q4gy> <h2 class="h-sm" data-astro-cid-njl2q4gy>Common problems we fix</h2> <ul class="plain" data-astro-cid-njl2q4gy> ${svc.problems.map((p) => renderTemplate`<li data-astro-cid-njl2q4gy>${p}</li>`)} </ul> </div>`} ${svc.includes.length > 0 && renderTemplate`<div class="card" data-astro-cid-njl2q4gy> <h2 class="h-sm" data-astro-cid-njl2q4gy>What our ${svc.name.toLowerCase()} service includes</h2> <ul class="ticks" data-astro-cid-njl2q4gy> ${svc.includes.map((p) => renderTemplate`<li data-astro-cid-njl2q4gy>${p}</li>`)} </ul> </div>`} </div> <div class="process" data-reveal data-astro-cid-njl2q4gy> <h2 class="h-sm" data-astro-cid-njl2q4gy>How it works</h2> <ol data-astro-cid-njl2q4gy> ${PROCESS.map(([t, d]) => renderTemplate`<li data-astro-cid-njl2q4gy><strong data-astro-cid-njl2q4gy>${t}</strong><span data-astro-cid-njl2q4gy>${d}</span></li>`)} </ol> </div> ${svc.benefits.length > 0 && renderTemplate`<div class="benefits" data-reveal data-astro-cid-njl2q4gy> <h2 class="h-sm" data-astro-cid-njl2q4gy>Why customers choose ${c.name}</h2> <ul class="ticks" data-astro-cid-njl2q4gy> ${svc.benefits.map((b) => renderTemplate`<li data-astro-cid-njl2q4gy>${b}</li>`)} </ul> <div class="btn-row" data-astro-cid-njl2q4gy> <a class="btn" href="#book" data-astro-cid-njl2q4gy>Request a Quote</a> <a class="btn btn--ghost"${addAttribute(c.directions, "href")} rel="noopener" target="_blank" data-astro-cid-njl2q4gy>${renderComponent($$result, "Icon", $$Icon, {
		"name": "directions",
		"data-astro-cid-njl2q4gy": true
	})} Get Directions</a> </div> </div>`} ${svc.faqs.length > 0 && renderTemplate`<div class="faq" data-reveal data-astro-cid-njl2q4gy> <h2 class="h-sm" data-astro-cid-njl2q4gy>${svc.name} FAQs</h2> ${renderComponent($$result, "FaqList", $$FaqList, {
		"faqs": svc.faqs,
		"data-astro-cid-njl2q4gy": true
	})} </div>`} </article> <aside class="side" aria-label="Contact and booking" data-astro-cid-njl2q4gy> <div class="card sticky" data-astro-cid-njl2q4gy> <h2 class="h-sm" id="book" data-astro-cid-njl2q4gy>Book ${svc.name.toLowerCase()}</h2> <p class="small muted" data-astro-cid-njl2q4gy>Three short steps. We call back to confirm.</p> ${renderComponent($$result, "BookingForm", $$BookingForm, {
		"preset": svc.name,
		"data-astro-cid-njl2q4gy": true
	})} <hr data-astro-cid-njl2q4gy> <address class="small" data-astro-cid-njl2q4gy> <strong data-astro-cid-njl2q4gy>${c.name}</strong><br data-astro-cid-njl2q4gy> ${c.street}, ${c.locality}, ${c.city}, ${c.region} – ${c.postalCode}<br data-astro-cid-njl2q4gy> <a${addAttribute(c.tel, "href")} data-astro-cid-njl2q4gy>${c.phone}</a> </address> </div> </aside> </div> </section> ${guides.length > 0 && renderTemplate`<section class="section--tight section--white" data-astro-cid-njl2q4gy> <div class="wrap" data-astro-cid-njl2q4gy> <h2 class="h-sm" data-astro-cid-njl2q4gy>Guides about ${svc.name.toLowerCase()}</h2> <ul class="guides" data-astro-cid-njl2q4gy> ${guides.map((g) => renderTemplate`<li data-astro-cid-njl2q4gy><a${addAttribute(`/blog/${g.slug}`, "href")} data-astro-cid-njl2q4gy>${g.title}</a></li>`)} </ul> </div> </section>`}${related.length > 0 && renderTemplate`<section class="section" data-astro-cid-njl2q4gy> <div class="wrap" data-astro-cid-njl2q4gy> <div class="section-head" data-astro-cid-njl2q4gy> <h2 data-astro-cid-njl2q4gy>Related services</h2> </div> ${renderComponent($$result, "ServiceGrid", $$ServiceGrid, {
		"items": related,
		"data-astro-cid-njl2q4gy": true
	})} </div> </section>`}${renderComponent($$result, "CtaBand", $$CtaBand, {
		"heading": `Need ${svc.name.toLowerCase()} in ${c.locality}, ${c.city} or Pune?`,
		"whatsappText": `Hi ${c.name}, I need help with ${svc.name.toLowerCase()}.`,
		"data-astro-cid-njl2q4gy": true
	})} ` })}`;
}, "C:/Programming section/virnobyte/src/pages/services/[slug].astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/services/[slug].astro";
var $$url = "/services/[slug].html";
//#endregion
//#region \0virtual:astro:page:src/pages/services/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
