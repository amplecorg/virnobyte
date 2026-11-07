import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as renderScript, t as $$Icon } from "./Icon_Ck1f1YF9.mjs";
import { t as contactInfo } from "./settings_BEEwhVl7.mjs";
import { v as product, y as products } from "./data__NbXfEkj.mjs";
import { a as inr } from "./format_CFs_vaoZ.mjs";
import { c as productNode, r as breadcrumbs, t as $$Base } from "./Base_BVqJxxBb.mjs";
import { i as resolveImage } from "./images_4iK9SaiJ.mjs";
import { t as $$CtaBand } from "./CtaBand_CBQsmf5J.mjs";
//#region src/pages/products/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Slug = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	const p = product(slug);
	if (!p) return Astro.redirect("/products", 302);
	const c = contactInfo();
	const allProducts = products();
	function getPhotoUrls(images) {
		if (!images || !images.length) return [];
		return images.map((imgKey) => {
			const res = resolveImage(imgKey);
			return res.kind === "upload" ? res.src : res.meta.src;
		});
	}
	const sameCategory = allProducts.filter((item) => item.id !== p.id && item.category === p.category);
	const otherProducts = allProducts.filter((item) => item.id !== p.id && item.category !== p.category);
	const suggestions = [...sameCategory, ...otherProducts];
	function formatAmzPrice(price) {
		if (!price) return null;
		return new Intl.NumberFormat("en-IN", {
			style: "currency",
			currency: "INR",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(price);
	}
	function getAmzStars(ratingStr) {
		const val = parseFloat(ratingStr || "4.2");
		const full = Math.floor(val);
		const half = val % 1 >= .3;
		let s = "★".repeat(full);
		if (half && s.length < 5) s += "★";
		while (s.length < 5) s += "☆";
		return s.slice(0, 5);
	}
	function getAmzCount(countStr) {
		if (!countStr) return "128";
		const m = countStr.match(/\d[\d,]*/);
		return m ? m[0] : "128";
	}
	function getAmzDeliveryDate() {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() + 2);
		return d.toLocaleDateString("en-IN", {
			weekday: "long",
			month: "long",
			day: "numeric"
		});
	}
	const amzDeliveryDate = getAmzDeliveryDate();
	function getCardImage(prod) {
		const resolved = getPhotoUrls(Array.isArray(prod.images) && prod.images.length ? prod.images : prod.image ? [prod.image] : []);
		return resolved.length ? resolved[0] : "/virnobyte-circuit-board.webp";
	}
	function calcDiscount(price, mrp) {
		if (!price || !mrp || mrp <= price) return null;
		return Math.round((mrp - price) / mrp * 100);
	}
	const resolvedPhotos = getPhotoUrls(Array.isArray(p.images) && p.images.length ? p.images : p.image ? [p.image] : []);
	const photoUrls = resolvedPhotos.length ? resolvedPhotos : ["/virnobyte-circuit-board.webp"];
	const hasMultiple = photoUrls.length > 1;
	function parseSpecs(summary) {
		if (!summary) return [];
		return summary.split("\n").map((s) => s.trim().replace(/^[•\-\*]\s*/, "")).filter(Boolean);
	}
	const specs = parseSpecs(p.summary);
	const discount = p.price && p.mrp && p.mrp > p.price ? Math.round((p.mrp - p.price) / p.mrp * 100) : null;
	function parseBadge(text, defaultBadge) {
		const m = (text || "").match(/^\[(.*?)\]\s*(.*)$/);
		if (m) return {
			badge: m[1],
			text: m[2]
		};
		return {
			badge: defaultBadge,
			text
		};
	}
	function formatPerk(text) {
		if (!text) return "";
		const trimmed = text.trim();
		if (trimmed.startsWith("+")) return trimmed;
		return `+ ${trimmed}${trimmed.toLowerCase().includes("included") ? "" : " Included"}`;
	}
	const crumbs = [
		{
			name: "Home",
			href: "/"
		},
		{
			name: "Products",
			href: "/products"
		},
		{
			name: p.category,
			href: `/products#${p.category.toLowerCase().replace(/[^a-z]+/g, "-")}`
		},
		{
			name: p.name,
			href: `/products/${p.slug}`
		}
	];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": `${p.name} | Virnobyte Pune`,
		"description": `${p.name} - ${p.summary ? p.summary.slice(0, 150) : "Supplied, tested, and backed by local warranty from Virnobyte in Chikhali, Pune."}`,
		"canonical": `/products/${p.slug}`,
		"image": photoUrls[0],
		"jsonLd": [productNode(Astro.site || Astro.url.origin, p), breadcrumbs(Astro.site || Astro.url.origin, crumbs)],
		"data-astro-cid-cezwlk7t": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="fk-detail-page" data-astro-cid-cezwlk7t> <div class="wrap" data-astro-cid-cezwlk7t>  <nav class="fk-detail-crumbs" aria-label="Breadcrumbs" data-astro-cid-cezwlk7t> <a href="/" data-astro-cid-cezwlk7t>Home</a> <span class="fk-sep" data-astro-cid-cezwlk7t>/</span> <a href="/products" data-astro-cid-cezwlk7t>Products</a> <span class="fk-sep" data-astro-cid-cezwlk7t>/</span> <a href="/products" data-astro-cid-cezwlk7t>${p.category}</a> <span class="fk-sep" data-astro-cid-cezwlk7t>/</span> <span class="fk-current-crumb" data-astro-cid-cezwlk7t>${p.name}</span> </nav>  <div class="fk-detail-grid" data-astro-cid-cezwlk7t>  <div class="fk-detail-left" data-astro-cid-cezwlk7t> <div class="fk-gallery-wrapper" data-astro-cid-cezwlk7t>  <div class="fk-detail-stage" id="fk-detail-stage" data-astro-cid-cezwlk7t> <img id="fk-detail-main-img" class="fk-detail-main-img"${addAttribute(photoUrls[0], "src")}${addAttribute(p.name, "alt")} data-astro-cid-cezwlk7t> ${discount && renderTemplate`<div class="fk-detail-discount-badge" data-astro-cid-cezwlk7t> <span data-astro-cid-cezwlk7t>↓ ${discount}% OFF</span> </div>`} <button type="button" class="fk-detail-wishlist" id="fk-wishlist-toggle" aria-label="Wishlist" data-astro-cid-cezwlk7t>
♥
</button> <div class="fk-trust-shield-pill" data-astro-cid-cezwlk7t> <span class="fk-shield-icon" data-astro-cid-cezwlk7t>🛡️</span> <span data-astro-cid-cezwlk7t>${p.badge ? `Virnobyte • ${p.badge}` : "Trust Shield • Verified"}</span> </div> ${hasMultiple && renderTemplate`<span class="fk-detail-counter" data-astro-cid-cezwlk7t> <span id="fk-counter-active" data-astro-cid-cezwlk7t>1</span> / ${photoUrls.length} </span>`} <div class="fk-zoom-hint" data-astro-cid-cezwlk7t> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "search",
		"size": 13,
		"data-astro-cid-cezwlk7t": true
	})} <span data-astro-cid-cezwlk7t>Hover to inspect • Click for full screen</span> </div> </div>  ${hasMultiple && renderTemplate`<div class="fk-detail-thumbs" id="fk-detail-thumbs" aria-label="Product thumbnails" data-astro-cid-cezwlk7t> ${photoUrls.map((url, idx) => renderTemplate`<button type="button"${addAttribute(["fk-detail-thumb-btn", { active: idx === 0 }], "class:list")}${addAttribute(idx, "data-index")}${addAttribute(`View photo ${idx + 1}`, "aria-label")} data-astro-cid-cezwlk7t> <img${addAttribute(url, "src")} alt="" loading="lazy" data-astro-cid-cezwlk7t> </button>`)} </div>`} </div>  <div class="fk-detail-actions" data-astro-cid-cezwlk7t> ${p.price ? renderTemplate`<a class="fk-action-btn fk-btn-buy"${addAttribute(`/checkout/${p.slug}`, "href")} data-astro-cid-cezwlk7t> <span data-astro-cid-cezwlk7t>⚡ Buy Now</span> </a>` : null} <a class="fk-action-btn fk-btn-call"${addAttribute(c.tel, "href")} data-astro-cid-cezwlk7t> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "phone",
		"size": 18,
		"data-astro-cid-cezwlk7t": true
	})} <span data-astro-cid-cezwlk7t>Call Technician: ${c.phone}</span> </a> </div> </div>  <div class="fk-detail-right" data-astro-cid-cezwlk7t> <div class="fk-brand-line" data-astro-cid-cezwlk7t> <span class="fk-brand-tag" data-astro-cid-cezwlk7t>Visit ${p.category} Store</span> <span class="fk-sku-pill" data-astro-cid-cezwlk7t>ID: ${p.slug}</span> </div> <h1 class="fk-detail-title" data-astro-cid-cezwlk7t>${p.name}</h1>  <div class="fk-detail-rating-row" data-astro-cid-cezwlk7t> <div class="fk-rating-pill-green" data-astro-cid-cezwlk7t> <span data-astro-cid-cezwlk7t>${p.rating || "4.5"}</span> <span class="fk-star-icon" data-astro-cid-cezwlk7t>★</span> </div> <span class="fk-rating-text" data-astro-cid-cezwlk7t>${p.rating_count || "128 Ratings & 42 Customer Reviews"}</span> <span class="fk-sep-dot" data-astro-cid-cezwlk7t>•</span> <span class="fk-assured-tag" data-astro-cid-cezwlk7t>✓ Virnobyte ${p.badge || "Assured"}</span> </div>  <div class="fk-detail-price-box" data-astro-cid-cezwlk7t> <div class="fk-price-row" data-astro-cid-cezwlk7t> ${discount && renderTemplate`<span class="fk-discount-pill" data-astro-cid-cezwlk7t>↓ ${discount}%</span>`} ${p.mrp && p.price && p.mrp > p.price && renderTemplate`<span class="fk-mrp-crossed" data-astro-cid-cezwlk7t>${inr(p.mrp)}</span>`} ${p.price ? renderTemplate`<span class="fk-final-price" data-astro-cid-cezwlk7t>${inr(p.price)}</span>` : renderTemplate`<span class="fk-final-price ask" data-astro-cid-cezwlk7t>Ask for Price</span>`} </div>  ${p.offer_tag ? renderTemplate`<div class="fk-discount-callout" data-astro-cid-cezwlk7t> <span data-astro-cid-cezwlk7t>🏷️ ${p.offer_tag}</span> </div>` : null}  ${p.diagnostic_setup ? renderTemplate`<div class="fk-fee-note" data-astro-cid-cezwlk7t> <span data-astro-cid-cezwlk7t>${formatPerk(p.diagnostic_setup)}</span> </div>` : null} </div>  ${(p.wow_deal || p.bank_offer || p.emi_offer || p.partner_offer) && renderTemplate`<div class="fk-offers-card" data-astro-cid-cezwlk7t> ${p.wow_deal && (() => {
		const { badge, text } = parseBadge(p.wow_deal, "WOW! DEAL");
		return renderTemplate`<div class="fk-offer-heading" data-astro-cid-cezwlk7t> <span class="fk-wow-tag" data-astro-cid-cezwlk7t>${badge}</span> <span class="fk-wow-text" data-astro-cid-cezwlk7t>${text}</span> </div>`;
	})()} ${(p.bank_offer || p.emi_offer || p.partner_offer) && renderTemplate`<div class="fk-offer-list" data-astro-cid-cezwlk7t> ${p.bank_offer && (() => {
		const { badge, text } = parseBadge(p.bank_offer, "Bank Offer");
		return renderTemplate`<div class="fk-offer-item" data-astro-cid-cezwlk7t> <span class="fk-offer-badge" data-astro-cid-cezwlk7t>${badge}</span> <span data-astro-cid-cezwlk7t>${text}</span> </div>`;
	})()} ${p.emi_offer && (() => {
		const { badge, text } = parseBadge(p.emi_offer, "No Cost EMI");
		return renderTemplate`<div class="fk-offer-item" data-astro-cid-cezwlk7t> <span class="fk-offer-badge" data-astro-cid-cezwlk7t>${badge}</span> <span data-astro-cid-cezwlk7t>${text}</span> </div>`;
	})()} ${p.partner_offer && (() => {
		const { badge, text } = parseBadge(p.partner_offer, "Partner Offer");
		return renderTemplate`<div class="fk-offer-item" data-astro-cid-cezwlk7t> <span class="fk-offer-badge" data-astro-cid-cezwlk7t>${badge}</span> <span data-astro-cid-cezwlk7t>${text}</span> </div>`;
	})()} </div>`} </div>`}  ${(p.delivery_text || p.delivery_sub) && renderTemplate`<div class="fk-delivery-box" data-astro-cid-cezwlk7t> <div class="fk-delivery-head" data-astro-cid-cezwlk7t> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "pin",
		"size": 16,
		"data-astro-cid-cezwlk7t": true
	})} <span data-astro-cid-cezwlk7t>Deliver to: <strong data-astro-cid-cezwlk7t>Pune &amp; PCMC (411019, 411062, 411033...)</strong></span> </div> <p class="fk-delivery-promise" data-astro-cid-cezwlk7t>
🚚 <strong data-astro-cid-cezwlk7t>${p.delivery_text || "Free Doorstep Delivery"}</strong>${p.delivery_sub ? ` — ${p.delivery_sub}` : ""} </p> </div>`}  ${(p.warranty || p.replacement_policy || p.diagnostic_setup) && renderTemplate`<div class="fk-services-strip" data-astro-cid-cezwlk7t> ${p.warranty && renderTemplate`<div class="fk-service-cell" data-astro-cid-cezwlk7t> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "shield",
		"size": 20,
		"class": "fk-serv-icon",
		"data-astro-cid-cezwlk7t": true
	})} <div class="fk-serv-text" data-astro-cid-cezwlk7t> <strong data-astro-cid-cezwlk7t>Warranty</strong> <span data-astro-cid-cezwlk7t>${p.warranty}</span> </div> </div>`} ${p.replacement_policy && renderTemplate`<div class="fk-service-cell" data-astro-cid-cezwlk7t> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "clock",
		"size": 20,
		"class": "fk-serv-icon",
		"data-astro-cid-cezwlk7t": true
	})} <div class="fk-serv-text" data-astro-cid-cezwlk7t> <strong data-astro-cid-cezwlk7t>Replacement</strong> <span data-astro-cid-cezwlk7t>${p.replacement_policy}</span> </div> </div>`} ${p.diagnostic_setup && renderTemplate`<div class="fk-service-cell" data-astro-cid-cezwlk7t> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "wrench",
		"size": 20,
		"class": "fk-serv-icon",
		"data-astro-cid-cezwlk7t": true
	})} <div class="fk-serv-text" data-astro-cid-cezwlk7t> <strong data-astro-cid-cezwlk7t>Diagnostic / Setup</strong> <span data-astro-cid-cezwlk7t>${p.diagnostic_setup.replace(/^\+\s*/, "").replace(/\s+Included$/i, "")}</span> </div> </div>`} </div>`}  <div class="fk-specs-section" data-astro-cid-cezwlk7t> <h2 class="fk-specs-heading" data-astro-cid-cezwlk7t>Product Highlights &amp; Specifications</h2> <ul class="fk-detail-specs-list" data-astro-cid-cezwlk7t> ${specs.length > 0 ? specs.map((spec) => renderTemplate`<li data-astro-cid-cezwlk7t> <span class="fk-spec-bullet" data-astro-cid-cezwlk7t>•</span> <span class="fk-spec-content" data-astro-cid-cezwlk7t>${spec}</span> </li>`) : renderTemplate`<li data-astro-cid-cezwlk7t> <span class="fk-spec-bullet" data-astro-cid-cezwlk7t>•</span> <span class="fk-spec-content" data-astro-cid-cezwlk7t>${p.summary || "Certified genuine hardware benchmarked by Virnobyte."}</span> </li>`} </ul> </div>  <div class="fk-overview-box" data-astro-cid-cezwlk7t> <h3 data-astro-cid-cezwlk7t>Virnobyte Certification &amp; Inspection</h3> <p data-astro-cid-cezwlk7t>
Every unit goes through a thorough 35-point hardware check: battery health test, display color &amp; dead-pixel verification, thermal paste renewal, port testing, and stress benchmarking.
</p> </div> </div> </div>  ${suggestions.length > 0 && renderTemplate`<section class="amz-suggestions-section" aria-label="Related Products &amp; Recommendations" data-astro-cid-cezwlk7t> <div class="amz-sug-header" data-astro-cid-cezwlk7t> <h2 class="amz-sug-title" data-astro-cid-cezwlk7t>Related products with free delivery on eligible orders</h2> <span class="amz-sug-page-indicator" id="amz-page-indicator" data-astro-cid-cezwlk7t>Page 1 of ${Math.max(1, Math.ceil(suggestions.length / 5))}</span> </div> <div class="amz-carousel-wrapper" data-astro-cid-cezwlk7t>  <button type="button" class="amz-carousel-arrow amz-arrow-prev" id="amz-carousel-prev" aria-label="Previous suggestions" title="Previous" data-astro-cid-cezwlk7t>
‹
</button>  <div class="amz-carousel-track" id="amz-carousel-track" role="region" aria-label="Suggested products carousel" data-astro-cid-cezwlk7t> ${suggestions.map((item) => {
		const itemImg = getCardImage(item);
		const itemDisc = calcDiscount(item.price, item.mrp);
		const itemPriceFormatted = formatAmzPrice(item.price);
		const itemMrpFormatted = formatAmzPrice(item.mrp);
		const stars = getAmzStars(item.rating);
		const reviewCount = getAmzCount(item.rating_count);
		return renderTemplate`<article class="amz-card" data-astro-cid-cezwlk7t> <a${addAttribute(`/products/${item.slug}`, "href")} class="amz-card-media"${addAttribute(item.name, "aria-label")} data-astro-cid-cezwlk7t> <img${addAttribute(itemImg, "src")}${addAttribute(item.name, "alt")} loading="lazy" decoding="async" data-astro-cid-cezwlk7t> </a> <div class="amz-card-details" data-astro-cid-cezwlk7t> <a${addAttribute(`/products/${item.slug}`, "href")} class="amz-card-title"${addAttribute(item.name, "title")} data-astro-cid-cezwlk7t> ${item.name} </a>  <div class="amz-rating-row" data-astro-cid-cezwlk7t> <span class="amz-stars"${addAttribute(`${item.rating || "4.2"} out of 5 stars`, "aria-label")} data-astro-cid-cezwlk7t> ${stars} </span> <a${addAttribute(`/products/${item.slug}`, "href")} class="amz-rating-count" data-astro-cid-cezwlk7t> ${reviewCount} </a> </div>  <div class="amz-price-row" data-astro-cid-cezwlk7t> ${itemDisc ? renderTemplate`<span class="amz-discount-pct" data-astro-cid-cezwlk7t>-${itemDisc}%</span>` : null} ${itemPriceFormatted ? renderTemplate`<span class="amz-main-price" data-astro-cid-cezwlk7t>${itemPriceFormatted}</span>` : renderTemplate`<span class="amz-main-price amz-ask" data-astro-cid-cezwlk7t>Ask for Price</span>`} </div>  ${item.badge ? renderTemplate`<div class="amz-badge-row" data-astro-cid-cezwlk7t> <span class="amz-badge-pill" data-astro-cid-cezwlk7t>#1 Best Seller</span> </div>` : null}  ${itemMrpFormatted && item.price && item.mrp && item.mrp > item.price ? renderTemplate`<div class="amz-mrp-row" data-astro-cid-cezwlk7t> <span data-astro-cid-cezwlk7t>M.R.P.: </span> <span class="amz-mrp-crossed" data-astro-cid-cezwlk7t>${itemMrpFormatted}</span> </div>` : null}  <div class="amz-delivery-info" data-astro-cid-cezwlk7t> <p class="amz-del-date" data-astro-cid-cezwlk7t>
Get it by <strong data-astro-cid-cezwlk7t>${amzDeliveryDate}</strong> </p> <p class="amz-del-ship" data-astro-cid-cezwlk7t>FREE Delivery over ₹499.</p> <p class="amz-del-fulfill" data-astro-cid-cezwlk7t>Fulfilled by Virnobyte.</p> </div> </div> </article>`;
	})} </div>  <button type="button" class="amz-carousel-arrow amz-arrow-next" id="amz-carousel-next" aria-label="Next suggestions" title="Next" data-astro-cid-cezwlk7t>
›
</button> </div> </section>`}  ${suggestions.length > 0 && renderTemplate`<section class="amz-suggestions-section" aria-label="Related Products &amp; Recommendations" data-astro-cid-cezwlk7t> <div class="amz-sug-header" data-astro-cid-cezwlk7t> <h2 class="amz-sug-title" data-astro-cid-cezwlk7t>Related products with free delivery on eligible orders</h2> <span class="amz-sug-page-indicator" id="amz-page-indicator" data-astro-cid-cezwlk7t>Page 1 of ${Math.max(1, Math.ceil(suggestions.length / 5))}</span> </div> <div class="amz-carousel-wrapper" data-astro-cid-cezwlk7t>  <button type="button" class="amz-carousel-arrow amz-arrow-prev" id="amz-carousel-prev" aria-label="Previous suggestions" title="Previous" data-astro-cid-cezwlk7t>
‹
</button>  <div class="amz-carousel-track" id="amz-carousel-track" role="region" aria-label="Suggested products carousel" data-astro-cid-cezwlk7t> ${suggestions.map((item) => {
		const itemImg = getCardImage(item);
		const itemDisc = calcDiscount(item.price, item.mrp);
		const itemPriceFormatted = formatAmzPrice(item.price);
		const itemMrpFormatted = formatAmzPrice(item.mrp);
		const stars = getAmzStars(item.rating);
		const reviewCount = getAmzCount(item.rating_count);
		return renderTemplate`<article class="amz-card" data-astro-cid-cezwlk7t> <a${addAttribute(`/products/${item.slug}`, "href")} class="amz-card-media"${addAttribute(item.name, "aria-label")} data-astro-cid-cezwlk7t> <img${addAttribute(itemImg, "src")}${addAttribute(item.name, "alt")} loading="lazy" decoding="async" data-astro-cid-cezwlk7t> </a> <div class="amz-card-details" data-astro-cid-cezwlk7t> <a${addAttribute(`/products/${item.slug}`, "href")} class="amz-card-title"${addAttribute(item.name, "title")} data-astro-cid-cezwlk7t> ${item.name} </a>  <div class="amz-rating-row" data-astro-cid-cezwlk7t> <span class="amz-stars"${addAttribute(`${item.rating || "4.2"} out of 5 stars`, "aria-label")} data-astro-cid-cezwlk7t> ${stars} </span> <a${addAttribute(`/products/${item.slug}`, "href")} class="amz-rating-count" data-astro-cid-cezwlk7t> ${reviewCount} </a> </div>  <div class="amz-price-row" data-astro-cid-cezwlk7t> ${itemDisc ? renderTemplate`<span class="amz-discount-pct" data-astro-cid-cezwlk7t>-${itemDisc}%</span>` : null} ${itemPriceFormatted ? renderTemplate`<span class="amz-main-price" data-astro-cid-cezwlk7t>${itemPriceFormatted}</span>` : renderTemplate`<span class="amz-main-price amz-ask" data-astro-cid-cezwlk7t>Ask for Price</span>`} </div>  ${item.badge ? renderTemplate`<div class="amz-badge-row" data-astro-cid-cezwlk7t> <span class="amz-badge-pill" data-astro-cid-cezwlk7t>#1 Best Seller</span> </div>` : null}  ${itemMrpFormatted && item.price && item.mrp && item.mrp > item.price ? renderTemplate`<div class="amz-mrp-row" data-astro-cid-cezwlk7t> <span data-astro-cid-cezwlk7t>M.R.P.: </span> <span class="amz-mrp-crossed" data-astro-cid-cezwlk7t>${itemMrpFormatted}</span> </div>` : null}  <div class="amz-delivery-info" data-astro-cid-cezwlk7t> <p class="amz-del-date" data-astro-cid-cezwlk7t>
Get it by <strong data-astro-cid-cezwlk7t>${amzDeliveryDate}</strong> </p> <p class="amz-del-ship" data-astro-cid-cezwlk7t>FREE Delivery over ₹499.</p> <p class="amz-del-fulfill" data-astro-cid-cezwlk7t>Fulfilled by Virnobyte.</p> </div> </div> </article>`;
	})} </div>  <button type="button" class="amz-carousel-arrow amz-arrow-next" id="amz-carousel-next" aria-label="Next suggestions" title="Next" data-astro-cid-cezwlk7t>
›
</button> </div> </section>`} </div> </div> ${renderComponent($$result, "CtaBand", $$CtaBand, {
		"heading": "Have questions about specifications or want a live video demo?",
		"text": "Message our workshop technicians directly on WhatsApp. We can show you the device, run benchmarks, and confirm compatibility.",
		"data-astro-cid-cezwlk7t": true
	})} ` })}${renderScript($$result, "C:/Programming section/virnobyte/src/pages/products/[slug].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Programming section/virnobyte/src/pages/products/[slug].astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/products/[slug].astro";
var $$url = "/products/[slug].html";
//#endregion
//#region \0virtual:astro:page:src/pages/products/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
