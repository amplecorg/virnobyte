import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, T as Fragment, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as renderScript, t as $$Icon } from "./Icon_CAVYTX4O.mjs";
import { t as $$Base } from "./Base_BChkAF8j.mjs";
import { t as contactInfo } from "./settings_Y_6jYxNr.mjs";
import { y as products } from "./data_BsFNaZtg.mjs";
import { i as resolveImage } from "./images_4iK9SaiJ.mjs";
import { t as $$PageHero } from "./PageHero_DuIY_j_o.mjs";
import { t as $$CtaBand } from "./CtaBand_D5DCH3AS.mjs";
import { n as breadcrumbs } from "./schema_UjY2ZCpY.mjs";
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
	const crumbs = [{
		name: "Home",
		href: "/"
	}, {
		name: "Products",
		href: "/products"
	}];
	function getPhotoUrls(images) {
		if (!images || !images.length) return [];
		return images.map((imgKey) => {
			const res = resolveImage(imgKey);
			return res.kind === "upload" ? res.src : res.meta.src;
		});
	}
	function parseSpecs(summary) {
		if (!summary) return [];
		return summary.split("\n").map((s) => s.trim().replace(/^[•\-\*]\s*/, "")).filter(Boolean);
	}
	function getDiscount(price, mrp) {
		if (!price || !mrp || mrp <= price) return null;
		return Math.round((mrp - price) / mrp * 100);
	}
	const categories = ["All", ...new Set(items.map((p) => p.category))];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "IT Hardware, Laptops & Computer Products in Pune | Virnobyte",
		"description": "Shop certified laptops, custom PCs, CCTV kits, SSDs, RAM upgrades, routers, and power backup from Virnobyte in Chikhali, Pune. Doorstep delivery, warranty and installation.",
		"canonical": "/products",
		"image": "/og/pages/products.jpg",
		"jsonLd": breadcrumbs(Astro.site, crumbs),
		"data-astro-cid-rcy7iuhi": true
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PageHero", $$PageHero, {
		"crumbs": crumbs,
		"eyebrow": "Virnobyte Assured Tech Store",
		"title": "IT Hardware & Certified Products",
		"lede": `Browse our verified laptops, custom gaming & office PCs, CCTV security kits, SSDs and networking gear. Tested by engineers, backed by local warranty and doorstep setup across ${c.locality} & Pune.`,
		"data-astro-cid-rcy7iuhi": true
	})} ${maybeRenderHead($$result)}<section class="section fk-store-section" data-astro-cid-rcy7iuhi> <div class="wrap" data-astro-cid-rcy7iuhi>  <div class="fk-toolbar" data-astro-cid-rcy7iuhi> <div class="fk-search-box" style="position: relative; display: flex; align-items: center; width: 100%;" data-astro-cid-rcy7iuhi> <span class="fk-search-icon-wrap" aria-hidden="true" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); display: inline-flex; align-items: center; justify-content: center; pointer-events: none; z-index: 2; width: 18px; height: 18px; color: #878787;" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "search",
		"size": 18,
		"data-astro-cid-rcy7iuhi": true
	})} </span> <input type="search" id="fk-product-search" placeholder="Search laptops, SSDs, CCTV kits, desktop PCs..." aria-label="Search products" data-astro-cid-rcy7iuhi> <button type="button" id="fk-search-clear" class="fk-search-clear" aria-label="Clear search" style="display:none;" data-astro-cid-rcy7iuhi>✕</button> </div> <div class="fk-filter-pills" role="tablist" aria-label="Filter by category" data-astro-cid-rcy7iuhi> ${categories.map((cat, i) => renderTemplate`<button type="button"${addAttribute(["fk-pill", { active: i === 0 }], "class:list")}${addAttribute(cat, "data-filter-cat")} role="tab"${addAttribute(i === 0 ? "true" : "false", "aria-selected")} data-astro-cid-rcy7iuhi> ${cat} ${cat === "All" ? ` (${items.length})` : ""} </button>`)} </div> <div class="fk-sort-bar" data-astro-cid-rcy7iuhi> <span class="fk-sort-label" data-astro-cid-rcy7iuhi>Sort By:</span> <div class="fk-sort-options" data-astro-cid-rcy7iuhi> <button type="button" class="fk-sort-btn active" data-sort="relevance" data-astro-cid-rcy7iuhi>Popularity</button> <button type="button" class="fk-sort-btn" data-sort="price-low" data-astro-cid-rcy7iuhi>Price — Low to High</button> <button type="button" class="fk-sort-btn" data-sort="price-high" data-astro-cid-rcy7iuhi>Price — High to Low</button> <button type="button" class="fk-sort-btn" data-sort="discount" data-astro-cid-rcy7iuhi>Biggest Discount</button> </div> </div> </div>  <div class="fk-products-container" id="fk-products-container" data-astro-cid-rcy7iuhi> <div class="fk-products-list" id="fk-products-list" data-astro-cid-rcy7iuhi> ${items.map((p) => {
		const resolvedPhotos = getPhotoUrls(Array.isArray(p.images) && p.images.length ? p.images : p.image ? [p.image] : []);
		const photoUrls = resolvedPhotos.length ? resolvedPhotos : ["/virnobyte-circuit-board.webp"];
		const hasMultiple = photoUrls.length > 1;
		const specs = parseSpecs(p.summary);
		const discount = getDiscount(p.price, p.mrp);
		return renderTemplate`<article class="fk-card" data-product-card${addAttribute(p.name.toLowerCase(), "data-name")}${addAttribute(p.category, "data-category")}${addAttribute(p.price || 0, "data-price")}${addAttribute(discount || 0, "data-discount")}${addAttribute(p.id, "data-id")} data-astro-cid-rcy7iuhi>  <div class="fk-col-media" data-astro-cid-rcy7iuhi> <div class="fk-media-box" data-prod-gallery${addAttribute(JSON.stringify(photoUrls), "data-photos")}${addAttribute(p.name, "data-name")} data-astro-cid-rcy7iuhi> <a${addAttribute(`/products/${p.slug}`, "href")} class="fk-img-anchor"${addAttribute(`View ${p.name}`, "aria-label")} data-astro-cid-rcy7iuhi> <img${addAttribute(photoUrls[0], "src")}${addAttribute(p.name, "alt")} class="fk-main-img" loading="lazy" decoding="async" data-astro-cid-rcy7iuhi> </a> ${discount && renderTemplate`<div class="fk-discount-badge" data-astro-cid-rcy7iuhi> <span data-astro-cid-rcy7iuhi>↓ ${discount}% OFF</span> </div>`} <div class="fk-assured-badge" title="Virnobyte Assured - 100% Genuine &amp; Tested" data-astro-cid-rcy7iuhi> <span class="fk-assured-tick" data-astro-cid-rcy7iuhi>✓</span> <span class="fk-assured-text" data-astro-cid-rcy7iuhi>Assured</span> </div> ${hasMultiple && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <button type="button" class="fk-nav-btn fk-prev-btn" aria-label="Previous photo" data-astro-cid-rcy7iuhi>‹</button> <button type="button" class="fk-nav-btn fk-next-btn" aria-label="Next photo" data-astro-cid-rcy7iuhi>›</button> <span class="fk-counter-badge" data-astro-cid-rcy7iuhi> <span class="active-num" data-astro-cid-rcy7iuhi>1</span>/${photoUrls.length} </span> ` })}`} <button type="button" class="fk-wishlist-btn" aria-label="Save to wishlist" title="Wishlist" data-astro-cid-rcy7iuhi>
♥
</button> </div>  ${hasMultiple && renderTemplate`<div class="fk-thumb-strip" aria-label="Product photos" data-astro-cid-rcy7iuhi> ${photoUrls.slice(0, 6).map((url, idx) => renderTemplate`<button type="button"${addAttribute(["fk-thumb-btn", { active: idx === 0 }], "class:list")}${addAttribute(idx, "data-index")}${addAttribute(`View photo ${idx + 1}`, "aria-label")} data-astro-cid-rcy7iuhi> <img${addAttribute(url, "src")} alt="" loading="lazy" data-astro-cid-rcy7iuhi> </button>`)} ${photoUrls.length > 6 && renderTemplate`<a${addAttribute(`/products/${p.slug}`, "href")} class="fk-thumb-more" title="View all photos" data-astro-cid-rcy7iuhi>
+${photoUrls.length - 6} </a>`} </div>`} </div>  <div class="fk-col-info" data-astro-cid-rcy7iuhi> <div class="fk-badges-row" data-astro-cid-rcy7iuhi> <span${addAttribute(["fk-condition-tag", { refurbished: p.condition === "Refurbished" }], "class:list")} data-astro-cid-rcy7iuhi> ${p.condition === "Refurbished" ? "Certified Refurbished (Grade A++)" : "Brand New Sealed"} </span> ${p.in_stock ? renderTemplate`<span class="fk-stock-tag in-stock" data-astro-cid-rcy7iuhi>In Stock • Fast Dispatch</span>` : renderTemplate`<span class="fk-stock-tag on-order" data-astro-cid-rcy7iuhi>On Order</span>`} </div> <h2 class="fk-title" data-astro-cid-rcy7iuhi> <a${addAttribute(`/products/${p.slug}`, "href")} data-astro-cid-rcy7iuhi>${p.name}</a> </h2> <div class="fk-rating-row" data-astro-cid-rcy7iuhi> <div class="fk-rating-pill" data-astro-cid-rcy7iuhi> <span data-astro-cid-rcy7iuhi>4.5</span> <span class="fk-star" data-astro-cid-rcy7iuhi>★</span> </div> <span class="fk-rating-count" data-astro-cid-rcy7iuhi>128 Ratings &amp; 42 Reviews</span> </div>  <ul class="fk-specs-list" data-astro-cid-rcy7iuhi> ${specs.length > 0 ? specs.map((spec) => renderTemplate`<li data-astro-cid-rcy7iuhi> <span class="fk-bullet" data-astro-cid-rcy7iuhi>•</span> <span class="fk-spec-item" data-astro-cid-rcy7iuhi>${spec}</span> </li>`) : renderTemplate`<li data-astro-cid-rcy7iuhi> <span class="fk-bullet" data-astro-cid-rcy7iuhi>•</span> <span class="fk-spec-item" data-astro-cid-rcy7iuhi>${p.summary || "Certified genuine hardware inspected by Virnobyte technicians."}</span> </li>`} </ul> <div class="fk-trust-row" data-astro-cid-rcy7iuhi> <span class="fk-trust-item" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
			"name": "shield",
			"size": 14,
			"data-astro-cid-rcy7iuhi": true
		})} <span data-astro-cid-rcy7iuhi>1 Year Virnobyte Warranty</span> </span> <span class="fk-trust-item" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
			"name": "clock",
			"size": 14,
			"data-astro-cid-rcy7iuhi": true
		})} <span data-astro-cid-rcy7iuhi>7-Day Replacement Guarantee</span> </span> <span class="fk-trust-item" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
			"name": "wrench",
			"size": 14,
			"data-astro-cid-rcy7iuhi": true
		})} <span data-astro-cid-rcy7iuhi>Free On-Site Diagnostic Setup</span> </span> </div> </div>  <div class="fk-col-price" data-astro-cid-rcy7iuhi> <div class="fk-price-block" data-astro-cid-rcy7iuhi> <div class="fk-price-main" data-astro-cid-rcy7iuhi> ${p.price ? renderTemplate`<span class="fk-current-price" data-astro-cid-rcy7iuhi>${inr(p.price)}</span>` : renderTemplate`<span class="fk-ask-price" data-astro-cid-rcy7iuhi>Ask for Price</span>`} ${p.mrp && p.price && p.mrp > p.price && renderTemplate`<span class="fk-mrp-price" data-astro-cid-rcy7iuhi>${inr(p.mrp)}</span>`} ${discount && renderTemplate`<span class="fk-discount-green" data-astro-cid-rcy7iuhi>${discount}% off</span>`} </div> <div class="fk-special-tag" data-astro-cid-rcy7iuhi> <span data-astro-cid-rcy7iuhi>Special Price</span> </div> <p class="fk-offer-text" data-astro-cid-rcy7iuhi>
🏷️ <strong data-astro-cid-rcy7iuhi>Extra ₹1,000 off</strong> with Virnobyte Card
</p> <div class="fk-delivery-text" data-astro-cid-rcy7iuhi> <strong data-astro-cid-rcy7iuhi>Free Delivery by Tomorrow</strong> <span data-astro-cid-rcy7iuhi>Doorstep setup &amp; testing in PCMC &amp; Pune</span> </div> </div> <div class="fk-actions-block" data-astro-cid-rcy7iuhi> <a class="fk-btn-whatsapp"${addAttribute(c.whatsappUrl(`Hi ${c.name}, I want to buy / enquire about: ${p.name} (Code: ${p.slug}, Price: ${p.price ? inr(p.price) : "Best Price"}). Is it available?`), "href")} target="_blank" rel="noopener" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
			"name": "whatsapp",
			"size": 18,
			"data-astro-cid-rcy7iuhi": true
		})} <span data-astro-cid-rcy7iuhi>Enquire on WhatsApp</span> </a> <a${addAttribute(`/products/${p.slug}`, "href")} class="fk-btn-details" data-astro-cid-rcy7iuhi> <span data-astro-cid-rcy7iuhi>View Full Specs &amp; Photos →</span> </a> </div> </div> </article>`;
	})} </div>  <div id="fk-no-results" class="fk-no-results" style="display: none;" data-astro-cid-rcy7iuhi> <div class="fk-no-results-box" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "search",
		"size": 40,
		"data-astro-cid-rcy7iuhi": true
	})} <h3 data-astro-cid-rcy7iuhi>No products found</h3> <p data-astro-cid-rcy7iuhi>Try searching with another keyword or select "All" from the category filters.</p> <button type="button" class="btn btn--ghost" id="fk-reset-filters" data-astro-cid-rcy7iuhi>Reset Filters</button> </div> </div> </div> </div> </section> ${renderComponent($$result, "CtaBand", $$CtaBand, {
		"heading": "Need a customized system or special IT hardware?",
		"text": "Tell our PCMC engineers your requirements. We source, benchmark, install, and support laptops, servers, and networks.",
		"data-astro-cid-rcy7iuhi": true
	})} ` })}${renderScript($$result, "C:/Programming section/virnobyte/src/pages/products.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Programming section/virnobyte/src/pages/products.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/products.astro";
var $$url = "/products.html";
//#endregion
//#region \0virtual:astro:page:src/pages/products@_@astro
var page = () => products_exports;
//#endregion
export { page };
