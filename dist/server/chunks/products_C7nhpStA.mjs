import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, T as Fragment, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as renderScript } from "./script_BaVSnVKi.mjs";
import { t as contactInfo } from "./settings_C74a6Mrw.mjs";
import { u as userFromCookies } from "./auth_CFhoV3Rg.mjs";
import { b as products } from "./data_rJFB0L58.mjs";
import { i as resolveImage, t as PHOTOS } from "./images_zUoD11cq.mjs";
import { t as getImage } from "./_astro_assets_DgDUkxWr.mjs";
import { a as itemList, r as breadcrumbs, t as $$Base } from "./Base_ac1XVCJk.mjs";
import { t as $$Icon } from "./Icon_DmevXm4a.mjs";
import { t as $$Breadcrumbs } from "./Breadcrumbs_dgueMOWz.mjs";
import { t as $$CtaBand } from "./CtaBand_BbYudQr6.mjs";
//#region src/pages/products.astro
var products_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Products,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Products = createComponent(async ($$result, $$props, $$slots) => {
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
	async function img(key, width = 720) {
		if (!key) return null;
		const r = resolveImage(key);
		if (r.kind === "upload") return {
			src: r.src,
			kind: "cutout"
		};
		return {
			src: (await getImage({
				src: r.meta,
				width: Math.min(width, r.meta.width),
				format: "webp",
				quality: 78
			})).src,
			kind: "photo"
		};
	}
	const imagesOf = (p) => (Array.isArray(p.images) && p.images.length ? p.images : p.image ? [p.image] : []).filter(Boolean);
	const inr = (v) => v === null || v === void 0 || Number.isNaN(v) ? "" : "₹" + Math.round(v).toLocaleString("en-IN");
	const discountOf = (p) => p.price && p.mrp && p.mrp > p.price ? Math.round((p.mrp - p.price) / p.mrp * 100) : 0;
	const ratingOf = (p) => {
		const n = parseFloat(p.rating);
		return Number.isFinite(n) && n > 0 ? Math.min(5, n) : 0;
	};
	const ratingCountOf = (p) => {
		const m = (p.rating_count || "").match(/\d[\d,]*/);
		return m ? m[0] : "";
	};
	const bulletsOf = (p, n = 3) => (p.summary || "").split("\n").map((l) => l.replace(/^[•\-\s]+/, "").trim()).filter(Boolean).slice(0, n);
	const buyHref = (slug) => user ? `/checkout/${slug}` : `/account/login?next=${encodeURIComponent(`/checkout/${slug}`)}`;
	const cards = await Promise.all(items.map(async (p) => {
		const list = imagesOf(p);
		const [a, b] = await Promise.all([img(list[0]), img(list[1])]);
		return {
			p,
			main: a ?? await img("virnobyte-hardware-solutions"),
			alt: b,
			discount: discountOf(p),
			rating: ratingOf(p),
			ratingCount: ratingCountOf(p),
			bullets: bulletsOf(p),
			buyable: !!(p.price && p.in_stock)
		};
	}));
	const catNames = [...new Set(items.map((p) => p.category).filter(Boolean))];
	const categories = await Promise.all(catNames.map(async (name) => {
		const inCat = cards.filter((x) => x.p.category === name);
		const cover = inCat.find((x) => x.main)?.main ?? null;
		return {
			name,
			count: inCat.length,
			cover
		};
	}));
	categories.sort((a, b) => b.count - a.count);
	const featured = cards.find((x) => x.p.category === "Desktops" && x.p.price) ?? cards.find((x) => x.p.price) ?? cards[0];
	const bestDeal = [...cards].filter((x) => x !== featured && x.discount).sort((a, b) => b.discount - a.discount)[0];
	const heroImg = featured ? await img(imagesOf(featured.p)[0], 1600) : null;
	const builderImg = await getImage({
		src: PHOTOS["virnobyte-build-08-rgb-gaming-pc"],
		width: 900,
		format: "webp",
		quality: 75
	});
	const prices = items.map((p) => p.price || 0).filter(Boolean);
	const PRICE_BANDS = [
		{
			id: "all",
			label: "Any price",
			min: 0,
			max: Infinity
		},
		{
			id: "u5",
			label: "Under ₹5,000",
			min: 0,
			max: 5e3
		},
		{
			id: "5-20",
			label: "₹5,000 – ₹20,000",
			min: 5e3,
			max: 2e4
		},
		{
			id: "20-50",
			label: "₹20,000 – ₹50,000",
			min: 2e4,
			max: 5e4
		},
		{
			id: "o50",
			label: "Above ₹50,000",
			min: 5e4,
			max: Infinity
		}
	].map((b) => ({
		...b,
		count: b.id === "all" ? items.length : prices.filter((v) => v >= b.min && v < b.max).length
	}));
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
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="store" data-astro-cid-rcy7iuhi> <!-- ── Hero ───────────────────────────────────────────── --><section class="st-hero" data-astro-cid-rcy7iuhi> <div class="wrap" data-astro-cid-rcy7iuhi> <div class="st-crumbs" data-astro-cid-rcy7iuhi>${renderComponent($$result, "Breadcrumbs", $$Breadcrumbs, {
		"items": crumbs,
		"data-astro-cid-rcy7iuhi": true
	})}</div> <div class="st-hero-grid" data-astro-cid-rcy7iuhi> ${featured && renderTemplate`<a class="st-feature"${addAttribute(`/products/${featured.p.slug}`, "href")} data-astro-cid-rcy7iuhi> <div class="st-feature-copy" data-astro-cid-rcy7iuhi> <span class="st-kicker" data-astro-cid-rcy7iuhi>Featured build</span> <h1 data-astro-cid-rcy7iuhi>
The Virnobyte store
<span data-astro-cid-rcy7iuhi>${featured.p.name}</span> </h1> <ul class="st-feature-specs" data-astro-cid-rcy7iuhi> ${featured.bullets.slice(0, 3).map((b) => renderTemplate`<li data-astro-cid-rcy7iuhi>${b}</li>`)} </ul> <div class="st-feature-price" data-astro-cid-rcy7iuhi> <strong data-astro-cid-rcy7iuhi>${inr(featured.p.price)}</strong> ${featured.discount > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <s data-astro-cid-rcy7iuhi>${inr(featured.p.mrp)}</s> <span class="st-save" data-astro-cid-rcy7iuhi>${featured.discount}% off</span> ` })}`} </div> <span class="st-feature-cta" data-astro-cid-rcy7iuhi>
Shop now ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 18,
		"data-astro-cid-rcy7iuhi": true
	})} </span> </div> ${heroImg && renderTemplate`<div class="st-feature-media" data-astro-cid-rcy7iuhi> <img${addAttribute(heroImg.src, "src")} alt="" loading="eager" fetchpriority="high" decoding="async" data-astro-cid-rcy7iuhi> </div>`} </a>`} <div class="st-promos" data-astro-cid-rcy7iuhi> ${bestDeal && renderTemplate`<a class="st-promo st-promo--deal"${addAttribute(`/products/${bestDeal.p.slug}`, "href")} data-astro-cid-rcy7iuhi> <div data-astro-cid-rcy7iuhi> <span class="st-kicker" data-astro-cid-rcy7iuhi>Deal of the week</span> <h2 data-astro-cid-rcy7iuhi>${bestDeal.p.name}</h2> <p class="st-promo-price" data-astro-cid-rcy7iuhi> <strong data-astro-cid-rcy7iuhi>${inr(bestDeal.p.price)}</strong> <span class="st-save" data-astro-cid-rcy7iuhi>-${bestDeal.discount}%</span> </p> </div> ${bestDeal.main && renderTemplate`<img${addAttribute(bestDeal.main.src, "src")} alt=""${addAttribute(["st-promo-img", bestDeal.main.kind], "class:list")} loading="eager" decoding="async" data-astro-cid-rcy7iuhi>`} </a>`} <a class="st-promo st-promo--build" href="/custom-pc-builder" data-astro-cid-rcy7iuhi> <img${addAttribute(builderImg.src, "src")} alt="" class="st-promo-bg" loading="eager" decoding="async" data-astro-cid-rcy7iuhi> <div data-astro-cid-rcy7iuhi> <span class="st-kicker" data-astro-cid-rcy7iuhi>PC Builder</span> <h2 data-astro-cid-rcy7iuhi>Design your own PC</h2> <p data-astro-cid-rcy7iuhi>Pick every part. We assemble, stress-test and deliver.</p> </div> <span class="st-round" data-astro-cid-rcy7iuhi>${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 18,
		"data-astro-cid-rcy7iuhi": true
	})}</span> </a> </div> </div> <ul class="st-perks" data-astro-cid-rcy7iuhi> <li data-astro-cid-rcy7iuhi>${renderComponent($$result, "Icon", $$Icon, {
		"name": "shield",
		"size": 18,
		"data-astro-cid-rcy7iuhi": true
	})} <span data-astro-cid-rcy7iuhi><strong data-astro-cid-rcy7iuhi>Genuine hardware</strong> with invoice</span></li> <li data-astro-cid-rcy7iuhi>${renderComponent($$result, "Icon", $$Icon, {
		"name": "clock",
		"size": 18,
		"data-astro-cid-rcy7iuhi": true
	})} <span data-astro-cid-rcy7iuhi><strong data-astro-cid-rcy7iuhi>7-day</strong> replacement</span></li> <li data-astro-cid-rcy7iuhi>${renderComponent($$result, "Icon", $$Icon, {
		"name": "wrench",
		"size": 18,
		"data-astro-cid-rcy7iuhi": true
	})} <span data-astro-cid-rcy7iuhi><strong data-astro-cid-rcy7iuhi>Free setup</strong> in ${c.locality} &amp; Pune</span></li> <li data-astro-cid-rcy7iuhi>${renderComponent($$result, "Icon", $$Icon, {
		"name": "receipt",
		"size": 18,
		"data-astro-cid-rcy7iuhi": true
	})} <span data-astro-cid-rcy7iuhi><strong data-astro-cid-rcy7iuhi>Secure checkout</strong> &amp; GST bill</span></li> </ul> </div> </section> <!-- ── Category tiles ─────────────────────────────────── --> <section class="st-cats wrap" aria-labelledby="st-cats-h" data-astro-cid-rcy7iuhi> <h2 id="st-cats-h" class="st-section-title" data-astro-cid-rcy7iuhi>Shop by category</h2> <div class="st-cat-row" role="list" data-astro-cid-rcy7iuhi> <button type="button" class="st-cat on" data-cat-tile="" role="listitem" aria-pressed="true" data-astro-cid-rcy7iuhi> <span class="st-cat-media st-cat-media--all" data-astro-cid-rcy7iuhi>${renderComponent($$result, "Icon", $$Icon, {
		"name": "dashboard",
		"size": 26,
		"data-astro-cid-rcy7iuhi": true
	})}</span> <span class="st-cat-name" data-astro-cid-rcy7iuhi>Everything</span> <span class="st-cat-count" data-astro-cid-rcy7iuhi>${items.length} items</span> </button> ${categories.map((cat) => renderTemplate`<button type="button" class="st-cat"${addAttribute(cat.name, "data-cat-tile")} role="listitem" aria-pressed="false" data-astro-cid-rcy7iuhi> <span${addAttribute(["st-cat-media", cat.cover?.kind], "class:list")} data-astro-cid-rcy7iuhi> ${cat.cover && renderTemplate`<img${addAttribute(cat.cover.src, "src")} alt="" loading="lazy" decoding="async" data-astro-cid-rcy7iuhi>`} </span> <span class="st-cat-name" data-astro-cid-rcy7iuhi>${cat.name}</span> <span class="st-cat-count" data-astro-cid-rcy7iuhi> ${cat.count} item${cat.count === 1 ? "" : "s"} </span> </button>`)} </div> </section> <!-- ── Catalogue ──────────────────────────────────────── --> <section class="st-catalog wrap" aria-labelledby="st-title" data-astro-cid-rcy7iuhi> <aside class="st-filters" id="st-filters" aria-label="Filters" data-filters data-astro-cid-rcy7iuhi> <div class="st-filters-head" data-astro-cid-rcy7iuhi> <h2 data-astro-cid-rcy7iuhi>Filters</h2> <button type="button" class="st-link" data-reset data-astro-cid-rcy7iuhi>Clear all</button> <button type="button" class="st-close" data-filters-close aria-label="Close filters" data-astro-cid-rcy7iuhi>${renderComponent($$result, "Icon", $$Icon, {
		"name": "close",
		"size": 20,
		"data-astro-cid-rcy7iuhi": true
	})}</button> </div> <fieldset class="st-fs" data-astro-cid-rcy7iuhi> <legend data-astro-cid-rcy7iuhi>Category</legend> ${categories.map((cat) => renderTemplate`<label class="st-check" data-astro-cid-rcy7iuhi> <input type="checkbox" name="cat"${addAttribute(cat.name, "value")} data-astro-cid-rcy7iuhi> <span class="st-box" data-astro-cid-rcy7iuhi></span> <span class="st-check-label" data-astro-cid-rcy7iuhi>${cat.name}</span> <span class="st-check-count" data-astro-cid-rcy7iuhi>${cat.count}</span> </label>`)} </fieldset> <fieldset class="st-fs" data-astro-cid-rcy7iuhi> <legend data-astro-cid-rcy7iuhi>Price</legend> ${PRICE_BANDS.map((b, i) => renderTemplate`<label class="st-check st-radio" data-astro-cid-rcy7iuhi> <input type="radio" name="price"${addAttribute(b.id, "value")}${addAttribute(b.min, "data-min")}${addAttribute(b.max === Infinity ? "" : b.max, "data-max")}${addAttribute(i === 0, "checked")} data-astro-cid-rcy7iuhi> <span class="st-box" data-astro-cid-rcy7iuhi></span> <span class="st-check-label" data-astro-cid-rcy7iuhi>${b.label}</span> <span class="st-check-count" data-astro-cid-rcy7iuhi>${b.count}</span> </label>`)} </fieldset> <fieldset class="st-fs" data-astro-cid-rcy7iuhi> <legend data-astro-cid-rcy7iuhi>Availability &amp; offers</legend> <label class="st-switch" data-astro-cid-rcy7iuhi> <input type="checkbox" name="stock" data-astro-cid-rcy7iuhi> <span class="st-track" data-astro-cid-rcy7iuhi><span data-astro-cid-rcy7iuhi></span></span>
In stock only
</label> <label class="st-switch" data-astro-cid-rcy7iuhi> <input type="checkbox" name="deal" data-astro-cid-rcy7iuhi> <span class="st-track" data-astro-cid-rcy7iuhi><span data-astro-cid-rcy7iuhi></span></span>
30% off or more
</label> <label class="st-switch" data-astro-cid-rcy7iuhi> <input type="checkbox" name="refurb" data-astro-cid-rcy7iuhi> <span class="st-track" data-astro-cid-rcy7iuhi><span data-astro-cid-rcy7iuhi></span></span>
Certified refurbished
</label> </fieldset> <div class="st-help" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "message",
		"size": 20,
		"data-astro-cid-rcy7iuhi": true
	})} <div data-astro-cid-rcy7iuhi> <strong data-astro-cid-rcy7iuhi>Not sure what to buy?</strong> <p data-astro-cid-rcy7iuhi>Tell us your budget — an engineer will suggest the right part.</p> <a${addAttribute(c.whatsapp ?? "/contact", "href")} rel="noopener" data-astro-cid-rcy7iuhi>Ask on WhatsApp</a> </div> </div> <button type="button" class="st-apply" data-filters-close data-astro-cid-rcy7iuhi>Show <span data-count-inline data-astro-cid-rcy7iuhi>${items.length}</span> products</button> </aside> <div class="st-scrim" data-filters-close data-astro-cid-rcy7iuhi></div> <div class="st-main" data-astro-cid-rcy7iuhi> <div class="st-toolbar" data-toolbar data-astro-cid-rcy7iuhi> <div class="st-search" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "search",
		"size": 18,
		"data-astro-cid-rcy7iuhi": true
	})} <input type="search" id="st-q" placeholder="Search laptops, SSDs, CCTV kits…" aria-label="Search products" autocomplete="off" data-astro-cid-rcy7iuhi> <kbd aria-hidden="true" data-astro-cid-rcy7iuhi>/</kbd> </div> <button type="button" class="st-filter-btn" data-filters-open aria-controls="st-filters" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "settings",
		"size": 17,
		"data-astro-cid-rcy7iuhi": true
	})} Filters <span class="st-badge" data-active-n hidden data-astro-cid-rcy7iuhi>0</span> </button> <label class="st-sort" data-astro-cid-rcy7iuhi> <span data-astro-cid-rcy7iuhi>Sort</span> <select id="st-sort" aria-label="Sort products" data-astro-cid-rcy7iuhi> <option value="featured" data-astro-cid-rcy7iuhi>Featured</option> <option value="price-low" data-astro-cid-rcy7iuhi>Price: low to high</option> <option value="price-high" data-astro-cid-rcy7iuhi>Price: high to low</option> <option value="discount" data-astro-cid-rcy7iuhi>Biggest discount</option> <option value="rating" data-astro-cid-rcy7iuhi>Top rated</option> </select> </label> <div class="st-view" role="group" aria-label="Layout" data-astro-cid-rcy7iuhi> <button type="button" class="on" data-view="grid" aria-pressed="true" aria-label="Grid view" data-astro-cid-rcy7iuhi> <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-rcy7iuhi><rect x="3" y="3" width="7" height="7" rx="1.5" data-astro-cid-rcy7iuhi></rect><rect x="14" y="3" width="7" height="7" rx="1.5" data-astro-cid-rcy7iuhi></rect><rect x="3" y="14" width="7" height="7" rx="1.5" data-astro-cid-rcy7iuhi></rect><rect x="14" y="14" width="7" height="7" rx="1.5" data-astro-cid-rcy7iuhi></rect></svg> </button> <button type="button" data-view="list" aria-pressed="false" aria-label="List view" data-astro-cid-rcy7iuhi> <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-rcy7iuhi><rect x="3" y="4" width="6" height="6" rx="1.5" data-astro-cid-rcy7iuhi></rect><rect x="3" y="14" width="6" height="6" rx="1.5" data-astro-cid-rcy7iuhi></rect><path d="M13 6h8M13 9h5M13 16h8M13 19h5" data-astro-cid-rcy7iuhi></path></svg> </button> </div> </div> <div class="st-meta" data-astro-cid-rcy7iuhi> <h2 id="st-title" data-title data-astro-cid-rcy7iuhi>All products</h2> <p data-astro-cid-rcy7iuhi><span data-count data-astro-cid-rcy7iuhi>${items.length}</span> results</p> <div class="st-chips" data-chips data-astro-cid-rcy7iuhi></div> </div> <ul class="st-grid" data-grid data-astro-cid-rcy7iuhi> ${cards.map((x, i) => renderTemplate`<li class="st-card" data-card${addAttribute(`${x.p.name} ${x.p.category} ${x.bullets.join(" ")}`.toLowerCase(), "data-name")}${addAttribute(x.p.category, "data-cat")}${addAttribute(x.p.price || 0, "data-price")}${addAttribute(x.discount, "data-discount")}${addAttribute(x.rating, "data-rating")}${addAttribute(x.p.in_stock ? 1 : 0, "data-stock")}${addAttribute((x.p.condition || "").toLowerCase(), "data-cond")}${addAttribute(i, "data-order")} data-astro-cid-rcy7iuhi> <a${addAttribute(`/products/${x.p.slug}`, "href")} class="st-card-media"${addAttribute(x.p.name, "aria-label")} data-astro-cid-rcy7iuhi> ${x.main && renderTemplate`<img${addAttribute(x.main.src, "src")}${addAttribute(x.p.name, "alt")}${addAttribute(["st-img", x.main.kind], "class:list")}${addAttribute(i < 4 ? "eager" : "lazy", "loading")} decoding="async" data-astro-cid-rcy7iuhi>`} ${x.alt && renderTemplate`<img${addAttribute(x.alt.src, "src")} alt=""${addAttribute(["st-img st-img--alt", x.alt.kind], "class:list")} loading="lazy" decoding="async" data-astro-cid-rcy7iuhi>`} <span class="st-tags" data-astro-cid-rcy7iuhi> ${x.discount > 0 && renderTemplate`<span class="st-tag st-tag--off" data-astro-cid-rcy7iuhi>-${x.discount}%</span>`} ${x.p.condition === "Refurbished" && renderTemplate`<span class="st-tag st-tag--refurb" data-astro-cid-rcy7iuhi>Refurbished</span>`} ${x.p.badge && x.p.badge !== "Assured" && renderTemplate`<span class="st-tag" data-astro-cid-rcy7iuhi>${x.p.badge}</span>`} </span> </a> <div class="st-card-body" data-astro-cid-rcy7iuhi> <p class="st-card-cat" data-astro-cid-rcy7iuhi> ${x.p.category} ${x.p.badge === "Assured" && renderTemplate`<span class="st-assured" title="Tested and certified by Virnobyte" data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "shield",
		"size": 12,
		"data-astro-cid-rcy7iuhi": true
	})} Assured
</span>`} </p> <h3 class="st-card-title" data-astro-cid-rcy7iuhi> <a${addAttribute(`/products/${x.p.slug}`, "href")} data-astro-cid-rcy7iuhi>${x.p.name}</a> </h3> ${x.rating > 0 && renderTemplate`<p class="st-rating"${addAttribute(`Rated ${x.rating} out of 5`, "aria-label")} data-astro-cid-rcy7iuhi> <span class="st-stars"${addAttribute(`--rating:${x.rating}`, "style")} aria-hidden="true" data-astro-cid-rcy7iuhi></span> <span data-astro-cid-rcy7iuhi>${x.rating.toFixed(1)}</span> ${x.ratingCount && renderTemplate`<span class="st-muted" data-astro-cid-rcy7iuhi>(${x.ratingCount})</span>`} </p>`} ${x.bullets.length > 0 && renderTemplate`<ul class="st-bullets" data-astro-cid-rcy7iuhi> ${x.bullets.map((b) => renderTemplate`<li data-astro-cid-rcy7iuhi>${b}</li>`)} </ul>`} <div class="st-price" data-astro-cid-rcy7iuhi> ${x.p.price ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <strong data-astro-cid-rcy7iuhi>${inr(x.p.price)}</strong> ${x.discount > 0 && renderTemplate`<s data-astro-cid-rcy7iuhi>${inr(x.p.mrp)}</s>`} ${x.discount > 0 && x.p.mrp && x.p.price && renderTemplate`<span class="st-saving" data-astro-cid-rcy7iuhi>Save ${inr(x.p.mrp - x.p.price)}</span>`} ` })}` : renderTemplate`<strong class="st-ask" data-astro-cid-rcy7iuhi>Price on request</strong>`} </div> <p${addAttribute(["st-stock", { out: !x.p.in_stock }], "class:list")} data-astro-cid-rcy7iuhi> <span class="st-dot" data-astro-cid-rcy7iuhi></span> ${x.p.in_stock ? x.p.delivery_text || "In stock" : "Out of stock"} ${x.p.warranty && renderTemplate`<span class="st-muted" data-astro-cid-rcy7iuhi> · ${x.p.warranty}</span>`} </p> <div class="st-actions" data-astro-cid-rcy7iuhi> ${x.buyable ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` <button type="button" class="st-btn st-btn--cart"${addAttribute(x.p.slug, "data-add-to-cart")} data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "cart",
		"size": 17,
		"data-astro-cid-rcy7iuhi": true
	})} <span data-label data-astro-cid-rcy7iuhi>Add to cart</span> </button> <a class="st-btn st-btn--buy"${addAttribute(buyHref(x.p.slug), "href")} data-astro-cid-rcy7iuhi>
Buy now
</a> ` })}` : renderTemplate`<a class="st-btn st-btn--cart"${addAttribute(x.p.price ? `/products/${x.p.slug}` : "/contact", "href")} data-astro-cid-rcy7iuhi> ${x.p.price ? "View details" : "Ask for price"} </a>`} </div> </div> </li>`)} </ul> <div class="st-empty" data-empty hidden data-astro-cid-rcy7iuhi> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "search",
		"size": 34,
		"data-astro-cid-rcy7iuhi": true
	})} <h3 data-astro-cid-rcy7iuhi>No products match</h3> <p data-astro-cid-rcy7iuhi>Try a different word, or clear the filters to see everything.</p> <button type="button" class="st-btn st-btn--cart" data-reset data-astro-cid-rcy7iuhi>Clear filters</button> </div> <a class="st-builder-band" href="/custom-pc-builder" data-astro-cid-rcy7iuhi> <div data-astro-cid-rcy7iuhi> <span class="st-kicker" data-astro-cid-rcy7iuhi>Can’t find the exact spec?</span> <h2 data-astro-cid-rcy7iuhi>Build a PC around your work, game or budget</h2> </div> <span class="st-round st-round--light" data-astro-cid-rcy7iuhi>${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 20,
		"data-astro-cid-rcy7iuhi": true
	})}</span> </a> </div> </section> </div> ${renderComponent($$result, "CtaBand", $$CtaBand, {
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
