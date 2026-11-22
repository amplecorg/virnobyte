import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, T as Fragment, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as renderScript, t as $$Icon } from "./Icon_CCv9Ixst.mjs";
import { l as userFromCookies } from "./auth_CSZwb3EQ.mjs";
import { t as contactInfo } from "./settings_D-p7f3sg.mjs";
import { b as products } from "./data_DdRaT7LY.mjs";
import { a as itemList, r as breadcrumbs, t as $$Base } from "./Base_BQ2Y903t.mjs";
import { t as $$Breadcrumbs } from "./Breadcrumbs_dgueMOWz.mjs";
import { i as resolveImage } from "./images_4iK9SaiJ.mjs";
import { t as $$CtaBand } from "./CtaBand_Bae7MGYm.mjs";
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
	const user = Astro.locals.user || userFromCookies(Astro.cookies);
	const c = contactInfo();
	const items = products();
	const crumbs = [{
		name: "Home",
		href: "/"
	}, {
		name: "Products",
		href: "/products"
	}];
	function getPhotoUrl(imgKey) {
		if (!imgKey) return "/virnobyte-circuit-board.webp";
		if (imgKey.startsWith("/uploads/")) return imgKey;
		const res = resolveImage(imgKey);
		return res.kind === "upload" ? res.src : res.meta.src;
	}
	function getCardImage(p) {
		const rawList = Array.isArray(p.images) && p.images.length ? p.images : p.image ? [p.image] : [];
		if (rawList.length && rawList[0]) return getPhotoUrl(rawList[0]);
		return "/virnobyte-circuit-board.webp";
	}
	function getDiscount(price, mrp) {
		if (!price || !mrp || mrp <= price) return null;
		return Math.round((mrp - price) / mrp * 100);
	}
	function formatDecimalPrice(val) {
		if (val === null || val === void 0 || isNaN(val)) return "";
		return "₹" + val.toLocaleString("en-IN", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});
	}
	function getStars(ratingStr) {
		const fullStars = Math.min(5, Math.max(1, Math.floor(parseFloat(ratingStr || "4.5") || 4.5)));
		return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
	}
	function getReviewCount(countStr) {
		if (!countStr) return "128";
		const match = countStr.match(/\d+/);
		return match ? match[0] : "128";
	}
	const targetDate = /* @__PURE__ */ new Date();
	targetDate.setDate(targetDate.getDate() + 2);
	const deliveryDateFormatted = targetDate.toLocaleDateString("en-IN", {
		weekday: "long",
		day: "numeric",
		month: "long"
	});
	const hpCategories = [
		{
			id: "all",
			label: "All Products",
			titleName: "All Hardware Products",
			catMatch: "All",
			image: getPhotoUrl("virnobyte-hardware-solutions")
		},
		{
			id: "laptops",
			label: "Laptops",
			titleName: "Laptops & Notebooks",
			catMatch: "Laptops",
			image: getPhotoUrl("/uploads/lap001-5dc673-1976x1272.webp")
		},
		{
			id: "desktops",
			label: "Desktops",
			titleName: "Desktops & Custom PCs",
			catMatch: "Desktops",
			image: getPhotoUrl("virnobyte-gaming-pc-build")
		},
		{
			id: "cctv",
			label: "CCTV & Security",
			titleName: "CCTV & Security Surveillance",
			catMatch: "CCTV",
			image: getPhotoUrl("virnobyte-cctv-installation-pune")
		},
		{
			id: "components",
			label: "Storage & SSDs",
			titleName: "SSDs, RAM & Storage Upgrades",
			catMatch: "Components",
			image: getPhotoUrl("virnobyte-hard-disk-drive")
		},
		{
			id: "accessories",
			label: "Accessories",
			titleName: "Keyboards, Mice & Peripherals",
			catMatch: "Keyboards & Mice,Electronics",
			image: getPhotoUrl("/uploads/mouse-216f29-800x800.webp")
		},
		{
			id: "networking",
			label: "Commercial Solutions",
			titleName: "Routers, Power Backup & Enterprise Solutions",
			catMatch: "Networking,Power backup",
			image: getPhotoUrl("virnobyte-wifi-router-setup")
		}
	];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "IT Hardware, Laptops & Computer Products in Pune | Virnobyte",
		"description": "Shop certified laptops, custom PCs, CCTV kits, SSDs, RAM upgrades, routers, and power backup from Virnobyte in Chikhali, Pune. Doorstep delivery, warranty and installation.",
		"canonical": "/products",
		"image": "/og/pages/products.jpg",
		"jsonLd": [breadcrumbs(Astro.site, crumbs), itemList(Astro.site, "Virnobyte Certified Hardware Catalog", items.map((it) => ({
			name: it.name,
			url: `/products/${it.slug}`,
			description: it.summary
		})))],
		"data-astro-cid-rcy7iuhi": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="hp-ecommerce-topbar" data-astro-cid-rcy7iuhi> <div class="wrap hp-topbar-inner" data-astro-cid-rcy7iuhi> <div class="hp-breadcrumbs-wrap" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Breadcrumbs", $$Breadcrumbs, {
		"items": crumbs,
		"data-astro-cid-rcy7iuhi": true
	})} </div> <div class="hp-store-trust-badges" data-astro-cid-rcy7iuhi> <span class="hp-trust-tag" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "shield",
		"size": 13,
		"data-astro-cid-rcy7iuhi": true
	})} 100% Genuine Certified Hardware
</span> <span class="hp-trust-tag" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "clock",
		"size": 13,
		"data-astro-cid-rcy7iuhi": true
	})} 7-Day Replacement Policy
</span> <span class="hp-trust-tag" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "wrench",
		"size": 13,
		"data-astro-cid-rcy7iuhi": true
	})} Free Setup in ${c.locality} &amp; Pune
</span> </div> </div> </div> <section class="section hp-catalog-section" data-astro-cid-rcy7iuhi> <div class="wrap" data-astro-cid-rcy7iuhi>  <div class="hp-category-bar-wrapper" data-astro-cid-rcy7iuhi> <div class="hp-category-bar" role="tablist" aria-label="Browse by Category" data-astro-cid-rcy7iuhi> ${hpCategories.map((cat, idx) => renderTemplate`<button type="button"${addAttribute(["hp-cat-tile", { active: idx === 0 }], "class:list")}${addAttribute(cat.catMatch, "data-hp-cat")}${addAttribute(cat.titleName, "data-title-name")} role="tab"${addAttribute(idx === 0 ? "true" : "false", "aria-selected")} data-astro-cid-rcy7iuhi> <div class="hp-cat-img-well" data-astro-cid-rcy7iuhi> <img${addAttribute(cat.image, "src")}${addAttribute(cat.label, "alt")} loading="lazy" decoding="async" data-astro-cid-rcy7iuhi> </div> <span class="hp-cat-label" data-astro-cid-rcy7iuhi>${cat.label}</span> </button>`)} </div> </div>  <div class="hp-toolbar" data-astro-cid-rcy7iuhi> <div class="hp-search-box" data-astro-cid-rcy7iuhi> <span class="hp-search-icon" aria-hidden="true" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "search",
		"size": 17,
		"data-astro-cid-rcy7iuhi": true
	})} </span> <input type="search" id="hp-product-search" placeholder="Search laptops, SSDs, CCTV kits, desktop PCs, accessories..." aria-label="Search products" data-astro-cid-rcy7iuhi> <button type="button" id="hp-search-clear" class="hp-search-clear" aria-label="Clear search" style="display:none;" data-astro-cid-rcy7iuhi>✕</button> </div> <div class="hp-sort-row" data-astro-cid-rcy7iuhi> <span class="hp-sort-label" data-astro-cid-rcy7iuhi>Sort:</span> <div class="hp-sort-pills" data-astro-cid-rcy7iuhi> <button type="button" class="hp-sort-btn active" data-sort="relevance" data-astro-cid-rcy7iuhi>Popularity</button> <button type="button" class="hp-sort-btn" data-sort="price-low" data-astro-cid-rcy7iuhi>Price: Low to High</button> <button type="button" class="hp-sort-btn" data-sort="price-high" data-astro-cid-rcy7iuhi>Price: High to Low</button> <button type="button" class="hp-sort-btn" data-sort="discount" data-astro-cid-rcy7iuhi>Biggest Discount</button> </div> </div> </div>  <div class="hp-related-section" data-astro-cid-rcy7iuhi> <div class="hp-catalog-meta-row" data-astro-cid-rcy7iuhi> <div class="hp-catalog-title-group" data-astro-cid-rcy7iuhi> <h1 class="hp-catalog-title" id="hp-catalog-category-name" data-astro-cid-rcy7iuhi>All Hardware Products</h1> <span class="hp-catalog-count-pill" id="hp-item-count" data-astro-cid-rcy7iuhi>${items.length} Products</span> </div> <div class="hp-catalog-assurance" data-astro-cid-rcy7iuhi> <span data-astro-cid-rcy7iuhi>🚚 Free doorstep delivery &amp; on-site hardware setup across PCMC &amp; Pune</span> </div> </div>  <div class="hp-products-grid" id="hp-products-grid" data-astro-cid-rcy7iuhi> ${items.map((p) => {
		const cardImg = getCardImage(p);
		const discount = getDiscount(p.price, p.mrp);
		const priceFormatted = formatDecimalPrice(p.price);
		const mrpFormatted = formatDecimalPrice(p.mrp);
		const stars = getStars(p.rating);
		const reviewCount = getReviewCount(p.rating_count);
		return renderTemplate`<article class="amz-card" data-product-card${addAttribute(p.name.toLowerCase(), "data-name")}${addAttribute(p.category, "data-category")}${addAttribute(p.price || 0, "data-price")}${addAttribute(discount || 0, "data-discount")}${addAttribute(p.id, "data-id")} data-astro-cid-rcy7iuhi>  <a${addAttribute(`/products/${p.slug}`, "href")} class="amz-card-media"${addAttribute(p.name, "aria-label")} data-astro-cid-rcy7iuhi> <img${addAttribute(cardImg, "src")}${addAttribute(p.name, "alt")} loading="lazy" decoding="async" data-astro-cid-rcy7iuhi> </a>  <div class="amz-card-details" data-astro-cid-rcy7iuhi>  <a${addAttribute(`/products/${p.slug}`, "href")} class="amz-card-title"${addAttribute(p.name, "title")} data-astro-cid-rcy7iuhi> ${p.name} </a>  <div class="amz-rating-row" data-astro-cid-rcy7iuhi> <span class="amz-stars"${addAttribute(`${p.rating || "4.5"} out of 5 stars`, "aria-label")} data-astro-cid-rcy7iuhi> ${stars} </span> <a${addAttribute(`/products/${p.slug}`, "href")} class="amz-rating-count" data-astro-cid-rcy7iuhi> ${reviewCount} </a> </div>  <div class="amz-price-row" data-astro-cid-rcy7iuhi> ${discount ? renderTemplate`<span class="amz-discount-pct" data-astro-cid-rcy7iuhi>-${discount}%</span>` : null} ${priceFormatted ? renderTemplate`<span class="amz-main-price" data-astro-cid-rcy7iuhi>${priceFormatted}</span>` : renderTemplate`<span class="amz-main-price amz-ask" data-astro-cid-rcy7iuhi>Ask for Price</span>`} </div>  <div class="amz-badge-row" data-astro-cid-rcy7iuhi> <span class="amz-badge-pill" data-astro-cid-rcy7iuhi>#1 Best Seller</span> </div>  ${mrpFormatted && p.price && p.mrp && p.mrp > p.price ? renderTemplate`<div class="amz-mrp-row" data-astro-cid-rcy7iuhi> <span data-astro-cid-rcy7iuhi>M.R.P.: </span> <span class="amz-mrp-crossed" data-astro-cid-rcy7iuhi>${mrpFormatted}</span> </div>` : null}  <div class="amz-delivery-info" data-astro-cid-rcy7iuhi> <p class="amz-del-date" data-astro-cid-rcy7iuhi>
Get it by <strong data-astro-cid-rcy7iuhi>${deliveryDateFormatted}</strong> </p> <p class="amz-del-ship" data-astro-cid-rcy7iuhi>FREE Delivery over ₹499.</p> <p class="amz-del-fulfill" data-astro-cid-rcy7iuhi>Fulfilled by Virnobyte.</p> </div>  <div class="amz-card-actions" data-astro-cid-rcy7iuhi> ${p.price && p.in_stock ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <button type="button" class="amz-btn-cart"${addAttribute(p.slug, "data-add-to-cart")} data-astro-cid-rcy7iuhi>
Add to Cart
</button> <a${addAttribute(user ? `/checkout/${p.slug}` : `/account/login?next=${encodeURIComponent(`/checkout/${p.slug}`)}`, "href")} class="amz-btn-buynow" data-astro-cid-rcy7iuhi>
⚡ Buy Now
</a> ` })}` : renderTemplate`<a${addAttribute(`/products/${p.slug}`, "href")} class="amz-btn-view" data-astro-cid-rcy7iuhi>
View Details
</a>`} </div> </div> </article>`;
	})} </div>  <div id="hp-no-results" class="hp-no-results" style="display: none;" data-astro-cid-rcy7iuhi> <div class="hp-no-results-box" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "search",
		"size": 38,
		"data-astro-cid-rcy7iuhi": true
	})} <h3 data-astro-cid-rcy7iuhi>No products found</h3> <p data-astro-cid-rcy7iuhi>Try searching with another keyword or click "All Products" in the category bar above.</p> <button type="button" class="hp-reset-btn" id="hp-reset-filters" data-astro-cid-rcy7iuhi>Reset Filters</button> </div> </div> </div> </div> </section> ${renderComponent($$result, "CtaBand", $$CtaBand, {
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
