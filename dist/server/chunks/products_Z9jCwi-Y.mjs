import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Icon } from "./Icon_CAVYTX4O.mjs";
import { t as $$Base } from "./Base_OysXX2EZ.mjs";
import { t as contactInfo } from "./settings_D4sn-e6I.mjs";
import { v as products } from "./data_Bs0BnE5b.mjs";
import { t as $$Photo } from "./Photo_DaKSvGuY.mjs";
import { t as $$PageHero } from "./PageHero_DuIY_j_o.mjs";
import { t as $$CtaBand } from "./CtaBand_B5-iRTmH.mjs";
import { n as breadcrumbs } from "./schema_CPu37s2y.mjs";
import { a as inr } from "./format_B1bSNQa_.mjs";
//#region src/pages/products.astro
var products_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Products,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Products = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Products;
	const c = contactInfo();
	const items = products();
	const cats = [...new Set(items.map((p) => p.category))];
	const anchor = (t) => t.toLowerCase().replace(/[^a-z]+/g, "-");
	const crumbs = [{
		name: "Home",
		href: "/"
	}, {
		name: "Products",
		href: "/products"
	}];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Laptops, CCTV & IT Hardware in Pimpri-Chinchwad | Virnobyte",
		"description": "New and refurbished laptops and desktops, printers, CCTV kits, routers, SSDs, RAM and UPS from Virnobyte in Chikhali — supplied, installed and supported locally.",
		"canonical": "/products",
		"image": "/og/pages/products.jpg",
		"jsonLd": breadcrumbs(Astro.site, crumbs),
		"data-astro-cid-rcy7iuhi": true
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PageHero", $$PageHero, {
		"crumbs": crumbs,
		"eyebrow": "Supplied, installed and supported",
		"title": "IT hardware and products",
		"lede": `Ask for current prices and availability. We confirm stock, explain your options and install what you buy. Visit us in ${c.locality} or enquire on WhatsApp.`,
		"data-astro-cid-rcy7iuhi": true
	})} ${maybeRenderHead($$result)}<section class="section" data-astro-cid-rcy7iuhi> <div class="wrap" data-astro-cid-rcy7iuhi> <nav class="cats" aria-label="Product categories" data-astro-cid-rcy7iuhi> ${cats.map((cat) => renderTemplate`<a${addAttribute(`#${anchor(cat)}`, "href")} class="chip" data-astro-cid-rcy7iuhi>${cat}</a>`)} </nav> ${cats.map((cat) => renderTemplate`<section class="cat"${addAttribute(anchor(cat), "id")}${addAttribute(`h-${anchor(cat)}`, "aria-labelledby")} data-astro-cid-rcy7iuhi> <h2${addAttribute(`h-${anchor(cat)}`, "id")} data-astro-cid-rcy7iuhi>${cat}</h2> <ul class="grid-p" data-astro-cid-rcy7iuhi> ${items.filter((p) => p.category === cat).map((p) => renderTemplate`<li class="prod" data-reveal data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Photo", $$Photo, {
		"image": p.image,
		"alt": p.name,
		"sizes": "(min-width: 1200px) 25vw, (min-width: 700px) 45vw, 100vw",
		"widths": [
			480,
			768,
			1080
		],
		"data-astro-cid-rcy7iuhi": true
	})} <div class="pb" data-astro-cid-rcy7iuhi> <div class="tags" data-astro-cid-rcy7iuhi> <span class="chip" data-astro-cid-rcy7iuhi>${p.condition}</span> ${!p.in_stock && renderTemplate`<span class="chip" data-astro-cid-rcy7iuhi>On order</span>`} </div> <h3 data-astro-cid-rcy7iuhi>${p.name}</h3> <p class="small muted" data-astro-cid-rcy7iuhi>${p.summary}</p> <p class="price" data-astro-cid-rcy7iuhi> ${p.price ? renderTemplate`<strong data-astro-cid-rcy7iuhi>${inr(p.price)}</strong>` : renderTemplate`<strong data-astro-cid-rcy7iuhi>Ask for price</strong>`} ${p.price && p.mrp > p.price && renderTemplate`<s class="muted small" data-astro-cid-rcy7iuhi>${inr(p.mrp)}</s>`} </p> <a class="btn btn--ghost btn--sm"${addAttribute(c.whatsappUrl(`Hi ${c.name}, I'm interested in: ${p.name}`), "href")} rel="noopener" target="_blank" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "whatsapp",
		"data-astro-cid-rcy7iuhi": true
	})} Enquire on WhatsApp
</a> </div> </li>`)} </ul> </section>`)} </div> </section> ${renderComponent($$result, "CtaBand", $$CtaBand, {
		"heading": "Not sure what to buy?",
		"text": "Tell us what you use your computer for and your budget. We will recommend a setup and install it.",
		"data-astro-cid-rcy7iuhi": true
	})} ` })}`;
}, "C:/Programming section/virnobyte/src/pages/products.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/products.astro";
var $$url = "/products.html";
//#endregion
//#region \0virtual:astro:page:src/pages/products@_@astro
var page = () => products_exports;
//#endregion
export { page };
