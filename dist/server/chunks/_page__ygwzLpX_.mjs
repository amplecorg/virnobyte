import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent, z as unescapeHTML } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Base } from "./Base_DoZQEqYh.mjs";
import { n as getSettings, t as contactInfo } from "./settings_Y_6jYxNr.mjs";
import { p as page$1 } from "./data_cYs3p9oo.mjs";
import { t as $$PageHero } from "./PageHero_DuIY_j_o.mjs";
import { t as $$CtaBand } from "./CtaBand_D5DCH3AS.mjs";
import { a as localBusiness, n as breadcrumbs } from "./schema_UjY2ZCpY.mjs";
import { o as markdown, r as formatDate } from "./format_B1bSNQa_.mjs";
//#region src/pages/[page].astro
var _page__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Page,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Page = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Page;
	const ALLOWED = [
		"privacy-policy",
		"terms-and-conditions",
		"company-profile"
	];
	const slug = Astro.params.page;
	if (!ALLOWED.includes(slug)) return Astro.rewrite("/404");
	const p = page$1(slug);
	if (!p) return Astro.rewrite("/404");
	const s = getSettings();
	const c = contactInfo(s);
	const crumbs = [{
		name: "Home",
		href: "/"
	}, {
		name: p.title,
		href: `/${slug}`
	}];
	const isProfile = slug === "company-profile";
	const TITLES = {
		"privacy-policy": `Privacy Policy | ${c.name}`,
		"terms-and-conditions": `Terms & Conditions | ${c.name}`,
		"company-profile": `${c.name} Company Profile | IT Services Company in Pune`
	};
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": TITLES[slug],
		"description": p.description,
		"canonical": `/${slug}`,
		"jsonLd": [breadcrumbs(Astro.site, crumbs), ...isProfile ? [localBusiness(Astro.site, s)] : []],
		"data-astro-cid-6raifcry": true
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PageHero", $$PageHero, {
		"crumbs": crumbs,
		"title": p.title,
		"lede": isProfile ? p.description : `Last updated ${formatDate(p.updated_at)}`,
		"data-astro-cid-6raifcry": true
	})} ${maybeRenderHead($$result)}<section class="section" data-astro-cid-6raifcry> <div class="wrap layout" data-astro-cid-6raifcry> <div class="prose" data-astro-cid-6raifcry>${unescapeHTML(markdown(p.body))}</div> ${isProfile && renderTemplate`<aside class="card facts" aria-label="Company facts" data-astro-cid-6raifcry> <dl data-astro-cid-6raifcry> <div data-astro-cid-6raifcry><dt data-astro-cid-6raifcry>Company</dt><dd data-astro-cid-6raifcry>${c.legalName}</dd></div> <div data-astro-cid-6raifcry><dt data-astro-cid-6raifcry>Established</dt><dd data-astro-cid-6raifcry>${s.business.foundedYear}</dd></div> <div data-astro-cid-6raifcry><dt data-astro-cid-6raifcry>Address</dt><dd data-astro-cid-6raifcry>${c.fullAddress}</dd></div> <div data-astro-cid-6raifcry><dt data-astro-cid-6raifcry>Phone</dt><dd data-astro-cid-6raifcry><a${addAttribute(c.tel, "href")} data-astro-cid-6raifcry>${c.phone}</a></dd></div> <div data-astro-cid-6raifcry><dt data-astro-cid-6raifcry>Email</dt><dd data-astro-cid-6raifcry><a${addAttribute(c.mailto, "href")} data-astro-cid-6raifcry>${c.email}</a></dd></div> <div data-astro-cid-6raifcry><dt data-astro-cid-6raifcry>Service areas</dt><dd data-astro-cid-6raifcry>${s.business.serviceAreas.join(", ")}</dd></div> </dl> </aside>`} </div> </section> ${isProfile && renderTemplate`${renderComponent($$result, "CtaBand", $$CtaBand, { "data-astro-cid-6raifcry": true })}`}` })}`;
}, "C:/Programming section/virnobyte/src/pages/[page].astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/[page].astro";
var $$url = "/[page].html";
//#endregion
//#region \0virtual:astro:page:src/pages/[page]@_@astro
var page = () => _page__exports;
//#endregion
export { page };
