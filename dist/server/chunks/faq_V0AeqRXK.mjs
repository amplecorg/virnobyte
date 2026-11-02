import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Base } from "./Base_CZeqfHer.mjs";
import { C as services, i as allFaqs } from "./data_BsT_AAm4.mjs";
import { t as $$PageHero } from "./PageHero_DuIY_j_o.mjs";
import { t as $$CtaBand } from "./CtaBand_D5DCH3AS.mjs";
import { n as breadcrumbs, r as faqPage } from "./schema_UjY2ZCpY.mjs";
import { t as $$FaqList } from "./FaqList_DYYYvqt2.mjs";
//#region src/pages/faq.astro
var faq_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Faq,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Faq = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Faq;
	const general = allFaqs();
	const topics = [...new Set(general.map((f) => f.topic))];
	const anchor = (t) => t.toLowerCase().replace(/[^a-z]+/g, "-");
	const serviceFaqs = services().map((s) => ({
		...s,
		own: s.faqs.filter((f) => !general.some((g) => g.question === f.q))
	})).filter((s) => s.own.length);
	const crumbs = [{
		name: "Home",
		href: "/"
	}, {
		name: "FAQ",
		href: "/faq"
	}];
	const visible = [...general.map((f) => ({
		q: f.question,
		a: f.answer
	})), ...serviceFaqs.flatMap((s) => s.own)];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "IT Services FAQ | Computer Repair, CCTV & AMC | Virnobyte",
		"description": "Answers about computer and laptop repair costs, doorstep service, CCTV installation, networking, data recovery, IT AMC and membership cards at Virnobyte in Pune.",
		"canonical": "/faq",
		"jsonLd": [breadcrumbs(Astro.site, crumbs), faqPage(visible)],
		"data-astro-cid-vagwt47q": true
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PageHero", $$PageHero, {
		"crumbs": crumbs,
		"eyebrow": "Help",
		"title": "Frequently asked questions",
		"lede": "Straight answers about how we work, what to expect, and how to get help quickly.",
		"data-astro-cid-vagwt47q": true
	})} ${maybeRenderHead($$result)}<section class="section" data-astro-cid-vagwt47q> <div class="wrap faq-page" data-astro-cid-vagwt47q> <nav class="toc" aria-label="FAQ topics" data-astro-cid-vagwt47q> <p class="eyebrow" data-astro-cid-vagwt47q>Topics</p> <ul data-astro-cid-vagwt47q> ${topics.map((t) => renderTemplate`<li data-astro-cid-vagwt47q><a${addAttribute(`#${anchor(t)}`, "href")} data-astro-cid-vagwt47q>${t}</a></li>`)} <li data-astro-cid-vagwt47q><a href="#by-service" data-astro-cid-vagwt47q>By service</a></li> </ul> </nav> <div class="groups" data-astro-cid-vagwt47q> ${topics.map((t) => renderTemplate`<section${addAttribute(anchor(t), "id")} data-reveal data-astro-cid-vagwt47q> <h2 data-astro-cid-vagwt47q>${t}</h2> ${renderComponent($$result, "FaqList", $$FaqList, {
		"faqs": general.filter((f) => f.topic === t).map((f) => ({
			q: f.question,
			a: f.answer
		})),
		"data-astro-cid-vagwt47q": true
	})} </section>`)} <section id="by-service" data-astro-cid-vagwt47q> <h2 data-astro-cid-vagwt47q>By service</h2> ${serviceFaqs.map((s) => renderTemplate`<div class="svc" data-reveal data-astro-cid-vagwt47q> <h3 data-astro-cid-vagwt47q><a${addAttribute(`/services/${s.slug}`, "href")} data-astro-cid-vagwt47q>${s.name}</a></h3> ${renderComponent($$result, "FaqList", $$FaqList, {
		"faqs": s.own,
		"data-astro-cid-vagwt47q": true
	})} </div>`)} </section> </div> </div> </section> ${renderComponent($$result, "CtaBand", $$CtaBand, {
		"heading": "Still have a question?",
		"text": "Call or WhatsApp us and a technician will answer directly.",
		"data-astro-cid-vagwt47q": true
	})} ` })}`;
}, "C:/Programming section/virnobyte/src/pages/faq.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/faq.astro";
var $$url = "/faq.html";
//#endregion
//#region \0virtual:astro:page:src/pages/faq@_@astro
var page = () => faq_exports;
//#endregion
export { page };
