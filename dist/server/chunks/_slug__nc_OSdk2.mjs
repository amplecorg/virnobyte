import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as renderScript, t as $$Icon } from "./Icon_CAVYTX4O.mjs";
import { t as $$Base } from "./Base_C1ZfuIuG.mjs";
import { t as contactInfo } from "./settings_AhSsv2yB.mjs";
import { v as product, y as products } from "./data_CkdtwXhb.mjs";
import { i as resolveImage } from "./images_4iK9SaiJ.mjs";
import { t as $$CtaBand } from "./CtaBand_BEqDDx06.mjs";
import { a as inr } from "./format_B1bSNQa_.mjs";
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
	products().filter((item) => item.id !== p.id && item.category === p.category).slice(0, 4);
	function getPhotoUrls(images) {
		if (!images || !images.length) return [];
		return images.map((imgKey) => {
			const res = resolveImage(imgKey);
			return res.kind === "upload" ? res.src : res.meta.src;
		});
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
	p.category, `${p.category.toLowerCase().replace(/[^a-z]+/g, "-")}`, p.name, `${p.slug}`;
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": `${p.name} | Virnobyte Pune`,
		"description": `${p.name} - ${p.summary ? p.summary.slice(0, 150) : "Supplied, tested, and backed by local warranty from Virnobyte in Chikhali, Pune."}`,
		"canonical": `/products/${p.slug}`,
		"image": photoUrls[0],
		"data-astro-cid-cezwlk7t": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="fk-detail-page" data-astro-cid-cezwlk7t> <div class="wrap" data-astro-cid-cezwlk7t>  <nav class="fk-detail-crumbs" aria-label="Breadcrumbs" data-astro-cid-cezwlk7t> <a href="/" data-astro-cid-cezwlk7t>Home</a> <span class="fk-sep" data-astro-cid-cezwlk7t>/</span> <a href="/products" data-astro-cid-cezwlk7t>Products</a> <span class="fk-sep" data-astro-cid-cezwlk7t>/</span> <a href="/products" data-astro-cid-cezwlk7t>${p.category}</a> <span class="fk-sep" data-astro-cid-cezwlk7t>/</span> <span class="fk-current-crumb" data-astro-cid-cezwlk7t>${p.name}</span> </nav>  <div class="fk-detail-grid" data-astro-cid-cezwlk7t>  <div class="fk-detail-left" data-astro-cid-cezwlk7t> <div class="fk-gallery-wrapper" data-astro-cid-cezwlk7t>  <div class="fk-detail-stage" id="fk-detail-stage" data-astro-cid-cezwlk7t> <img id="fk-detail-main-img" class="fk-detail-main-img"${addAttribute(photoUrls[0], "src")}${addAttribute(p.name, "alt")} data-astro-cid-cezwlk7t> ${discount && renderTemplate`<div class="fk-detail-discount-badge" data-astro-cid-cezwlk7t> <span data-astro-cid-cezwlk7t>↓ ${discount}% OFF</span> </div>`} <button type="button" class="fk-detail-wishlist" id="fk-wishlist-toggle" aria-label="Wishlist" data-astro-cid-cezwlk7t>
♥
</button> <div class="fk-trust-shield-pill" data-astro-cid-cezwlk7t> <span class="fk-shield-icon" data-astro-cid-cezwlk7t>🛡️</span> <span data-astro-cid-cezwlk7t>${p.badge ? `Virnobyte • ${p.badge}` : "Trust Shield • Verified"}</span> </div> ${hasMultiple && renderTemplate`<span class="fk-detail-counter" data-astro-cid-cezwlk7t> <span id="fk-counter-active" data-astro-cid-cezwlk7t>1</span> / ${photoUrls.length} </span>`} <div class="fk-zoom-hint" data-astro-cid-cezwlk7t> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "search",
		"size": 13,
		"data-astro-cid-cezwlk7t": true
	})} <span data-astro-cid-cezwlk7t>Hover to inspect • Click for full screen</span> </div> </div>  ${hasMultiple && renderTemplate`<div class="fk-detail-thumbs" id="fk-detail-thumbs" aria-label="Product thumbnails" data-astro-cid-cezwlk7t> ${photoUrls.map((url, idx) => renderTemplate`<button type="button"${addAttribute(["fk-detail-thumb-btn", { active: idx === 0 }], "class:list")}${addAttribute(idx, "data-index")}${addAttribute(`View photo ${idx + 1}`, "aria-label")} data-astro-cid-cezwlk7t> <img${addAttribute(url, "src")} alt="" loading="lazy" data-astro-cid-cezwlk7t> </button>`)} </div>`} </div>  <div class="fk-detail-actions" data-astro-cid-cezwlk7t> ${p.price ? renderTemplate`<a class="fk-action-btn fk-btn-buy"${addAttribute(`/checkout/${p.slug}`, "href")} data-astro-cid-cezwlk7t> <span data-astro-cid-cezwlk7t>⚡ Buy Now</span> </a>` : null} <a class="fk-action-btn fk-btn-whatsapp-buy"${addAttribute(c.whatsappUrl(`Hi ${c.name}, I want to order / enquire about: ${p.name} (Code: ${p.slug}, Price: ${p.price ? inr(p.price) : "Best Price"}). Please confirm availability and delivery.`), "href")} target="_blank" rel="noopener" data-astro-cid-cezwlk7t> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "whatsapp",
		"size": 20,
		"data-astro-cid-cezwlk7t": true
	})} <span data-astro-cid-cezwlk7t>Enquire &amp; Order on WhatsApp</span> </a> <a class="fk-action-btn fk-btn-call"${addAttribute(c.tel, "href")} data-astro-cid-cezwlk7t> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "phone",
		"size": 18,
		"data-astro-cid-cezwlk7t": true
	})} <span data-astro-cid-cezwlk7t>Call Technician: ${c.phone}</span> </a> </div> </div>  <div class="fk-detail-right" data-astro-cid-cezwlk7t> <div class="fk-brand-line" data-astro-cid-cezwlk7t> <span class="fk-brand-tag" data-astro-cid-cezwlk7t>Visit ${p.category} Store</span> <span class="fk-sku-pill" data-astro-cid-cezwlk7t>ID: ${p.slug}</span> </div> <h1 class="fk-detail-title" data-astro-cid-cezwlk7t>${p.name}</h1>  <div class="fk-detail-rating-row" data-astro-cid-cezwlk7t> <div class="fk-rating-pill-green" data-astro-cid-cezwlk7t> <span data-astro-cid-cezwlk7t>${p.rating || "4.5"}</span> <span class="fk-star-icon" data-astro-cid-cezwlk7t>★</span> </div> <span class="fk-rating-text" data-astro-cid-cezwlk7t>${p.rating_count || "128 Ratings & 42 Customer Reviews"}</span> <span class="fk-sep-dot" data-astro-cid-cezwlk7t>•</span> <span class="fk-assured-tag" data-astro-cid-cezwlk7t>✓ Virnobyte ${p.badge || "Assured"}</span> </div>  <div class="fk-detail-price-box" data-astro-cid-cezwlk7t> <div class="fk-price-row" data-astro-cid-cezwlk7t> ${discount && renderTemplate`<span class="fk-discount-pill" data-astro-cid-cezwlk7t>↓ ${discount}%</span>`} ${p.mrp && p.price && p.mrp > p.price && renderTemplate`<span class="fk-mrp-crossed" data-astro-cid-cezwlk7t>${inr(p.mrp)}</span>`} ${p.price ? renderTemplate`<span class="fk-final-price" data-astro-cid-cezwlk7t>${inr(p.price)}</span>` : renderTemplate`<span class="fk-final-price ask" data-astro-cid-cezwlk7t>Ask for Price</span>`} </div> ${p.offer_tag && renderTemplate`<div class="fk-discount-callout" data-astro-cid-cezwlk7t> <span data-astro-cid-cezwlk7t>🏷️ ${p.offer_tag}</span> </div>`} ${p.diagnostic_setup && renderTemplate`<div class="fk-fee-note" data-astro-cid-cezwlk7t> <span data-astro-cid-cezwlk7t>+ ${p.diagnostic_setup} Included</span> </div>`} </div>  <div class="fk-offers-card" data-astro-cid-cezwlk7t> <div class="fk-offer-heading" data-astro-cid-cezwlk7t> <span class="fk-wow-tag" data-astro-cid-cezwlk7t>WOW! DEAL</span> <span class="fk-wow-text" data-astro-cid-cezwlk7t> ${p.wow_deal || "Exchange Old Laptop / PC & save up to ₹15,000"} </span> </div> <div class="fk-offer-list" data-astro-cid-cezwlk7t> <div class="fk-offer-item" data-astro-cid-cezwlk7t> <span class="fk-offer-badge" data-astro-cid-cezwlk7t>Bank Offer</span> <span data-astro-cid-cezwlk7t>5% Instant Cashback on Direct UPI / Card Payment</span> </div> <div class="fk-offer-item" data-astro-cid-cezwlk7t> <span class="fk-offer-badge" data-astro-cid-cezwlk7t>No Cost EMI</span> <span data-astro-cid-cezwlk7t>Available from <strong data-astro-cid-cezwlk7t>₹2,999/month</strong> on major cards</span> </div> <div class="fk-offer-item" data-astro-cid-cezwlk7t> <span class="fk-offer-badge" data-astro-cid-cezwlk7t>Partner Offer</span> <span data-astro-cid-cezwlk7t>Free Data Transfer from your old system + Antivirus Setup</span> </div> </div> </div>  <div class="fk-delivery-box" data-astro-cid-cezwlk7t> <div class="fk-delivery-head" data-astro-cid-cezwlk7t> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "pin",
		"size": 16,
		"data-astro-cid-cezwlk7t": true
	})} <span data-astro-cid-cezwlk7t>Deliver to: <strong data-astro-cid-cezwlk7t>Pune &amp; PCMC (411019, 411062, 411033...)</strong></span> </div> <p class="fk-delivery-promise" data-astro-cid-cezwlk7t>
🚚 <strong data-astro-cid-cezwlk7t>${p.delivery_text || "Free Doorstep Delivery by Tomorrow"}</strong> — ${p.delivery_sub || "Delivered, unboxed, and demonstrated by our certified technician."} </p> </div>  <div class="fk-services-strip" data-astro-cid-cezwlk7t> ${p.warranty && renderTemplate`<div class="fk-service-cell" data-astro-cid-cezwlk7t> ${renderComponent($$result, "Icon", $$Icon, {
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
	})} <div class="fk-serv-text" data-astro-cid-cezwlk7t> <strong data-astro-cid-cezwlk7t>Diagnostic / Setup</strong> <span data-astro-cid-cezwlk7t>${p.diagnostic_setup}</span> </div> </div>`} </div>  <div class="fk-specs-section" data-astro-cid-cezwlk7t> <h2 class="fk-specs-heading" data-astro-cid-cezwlk7t>Product Highlights &amp; Specifications</h2> <ul class="fk-detail-specs-list" data-astro-cid-cezwlk7t> ${specs.length > 0 ? specs.map((spec) => renderTemplate`<li data-astro-cid-cezwlk7t> <span class="fk-spec-bullet" data-astro-cid-cezwlk7t>•</span> <span class="fk-spec-content" data-astro-cid-cezwlk7t>${spec}</span> </li>`) : renderTemplate`<li data-astro-cid-cezwlk7t> <span class="fk-spec-bullet" data-astro-cid-cezwlk7t>•</span> <span class="fk-spec-content" data-astro-cid-cezwlk7t>${p.summary || "Certified genuine hardware benchmarked by Virnobyte."}</span> </li>`} </ul> </div>  <div class="fk-overview-box" data-astro-cid-cezwlk7t> <h3 data-astro-cid-cezwlk7t>Virnobyte Certification &amp; Inspection</h3> <p data-astro-cid-cezwlk7t>
Every unit goes through a thorough 35-point hardware check: battery health test, display color &amp; dead-pixel verification, thermal paste renewal, port testing, and stress benchmarking.
</p> </div> </div> </div> </div> </div> ${renderComponent($$result, "CtaBand", $$CtaBand, {
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
