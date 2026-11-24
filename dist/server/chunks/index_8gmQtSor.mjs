import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as renderScript } from "./script_BaVSnVKi.mjs";
import { n as getSettings, t as contactInfo } from "./settings_C74a6Mrw.mjs";
import { E as testimonials, T as services, g as plans, l as homeFaqs, v as posts } from "./data_rJFB0L58.mjs";
import { r as formatDate, s as num } from "./format_6aaLy6w7.mjs";
import { i as resolveImage, t as PHOTOS } from "./images_zUoD11cq.mjs";
import { a as $$Picture, t as getImage } from "./_astro_assets_DgDUkxWr.mjs";
import { a as itemList, i as faqPage, s as localBusiness, t as $$Base, u as website } from "./Base_ac1XVCJk.mjs";
import { t as $$Icon } from "./Icon_DmevXm4a.mjs";
import { t as $$Photo } from "./Photo_BNi-rElU.mjs";
import { t as $$CtaBand } from "./CtaBand_BbYudQr6.mjs";
import { t as $$MembershipCard } from "./MembershipCard_D9OWERb3.mjs";
import { t as $$FaqList } from "./FaqList_DYYYvqt2.mjs";
import { t as $$ServiceGrid } from "./ServiceGrid_BK742c2q.mjs";
//#region src/components/HeroBuild.astro
var $$HeroBuild = createComponent(($$result, $$props, $$slots) => {
	const BUILD_FRAMES = [
		{
			key: "virnobyte-build-01-motherboard",
			label: "Preparing the motherboard",
			origin: "30% 40%"
		},
		{
			key: "virnobyte-build-02-cpu-install",
			label: "Seating the processor",
			origin: "35% 55%"
		},
		{
			key: "virnobyte-build-03-cpu-cooler",
			label: "Mounting the CPU cooler",
			origin: "50% 40%"
		},
		{
			key: "virnobyte-build-04-ram",
			label: "Installing dual-channel RAM",
			origin: "60% 50%"
		},
		{
			key: "virnobyte-build-05-nvme-ssd",
			label: "Fitting the NVMe SSD",
			origin: "55% 60%"
		},
		{
			key: "virnobyte-build-06-gpu",
			label: "Installing the graphics card",
			origin: "45% 55%"
		},
		{
			key: "virnobyte-build-07-cable-management",
			label: "Routing power & cables",
			origin: "40% 45%"
		},
		{
			key: "virnobyte-build-08-rgb-gaming-pc",
			label: "Power on · POST ✓ System ready",
			origin: "50% 50%"
		}
	];
	const N = BUILD_FRAMES.length;
	const widths = [
		768,
		1080,
		1440,
		1920,
		2560,
		3840
	];
	return renderTemplate`${maybeRenderHead($$result)}<div class="hb" data-hb aria-hidden="true" data-astro-cid-mij6gbd6> <div class="hb-stage" data-astro-cid-mij6gbd6> ${BUILD_FRAMES.map((f, i) => renderTemplate`<div${addAttribute(["hb-layer", { on: i === 0 }], "class:list")} data-hb-layer${addAttribute(i % 2 ? "left" : "up", "data-dir")}${addAttribute(f.label, "data-label")}${addAttribute(`--o:${f.origin}`, "style")} data-astro-cid-mij6gbd6> ${renderComponent($$result, "Picture", $$Picture, {
		"src": PHOTOS[f.key],
		"alt": "",
		"formats": ["avif", "webp"],
		"widths": widths.filter((w) => w <= PHOTOS[f.key].width),
		"sizes": "100vw",
		"loading": i === 0 ? "eager" : "lazy",
		"fetchpriority": i === 0 ? "high" : "low",
		"decoding": i === 0 ? "sync" : "async",
		"class": "hb-img",
		"data-astro-cid-mij6gbd6": true
	})} <span class="hb-seam" data-astro-cid-mij6gbd6></span> </div>`)} </div> <div class="hb-grid" data-astro-cid-mij6gbd6></div> <!-- Assembly HUD --> <div class="hb-hud" data-astro-cid-mij6gbd6> <span class="hb-dot" data-astro-cid-mij6gbd6></span> <span class="hb-step" data-hb-num data-astro-cid-mij6gbd6>01 / ${String(N).padStart(2, "0")}</span> <span class="hb-label" data-hb-label data-astro-cid-mij6gbd6>${BUILD_FRAMES[0].label}</span> <span class="hb-bars" data-astro-cid-mij6gbd6> ${BUILD_FRAMES.map((_, i) => renderTemplate`<span${addAttribute(["hb-bar", { on: i === 0 }], "class:list")} data-hb-bar data-astro-cid-mij6gbd6><i data-astro-cid-mij6gbd6></i></span>`)} </span> </div> </div>${renderScript($$result, "C:/Programming section/virnobyte/src/components/HeroBuild.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Programming section/virnobyte/src/components/HeroBuild.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
createAstro("https://virnobyte.com");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const s = getSettings();
	const c = contactInfo(s);
	const site = Astro.site;
	const allServices = services();
	const featured = allServices.filter((x) => x.footer).slice(0, 8);
	const planList = plans();
	const faqs = homeFaqs().map((f) => ({
		q: f.question,
		a: f.answer
	}));
	const reviews = testimonials();
	const latest = posts(3);
	const years = (/* @__PURE__ */ new Date()).getFullYear() - s.business.foundedYear;
	const heroImg = resolveImage("virnobyte-build-01-motherboard");
	const heroSizes = "100vw";
	const preload = heroImg.kind === "asset" ? await getImage({
		src: heroImg.meta,
		format: "avif",
		widths: [
			768,
			1080,
			1440,
			1920,
			2560,
			3840
		].filter((w) => w <= heroImg.meta.width),
		sizes: heroSizes
	}) : null;
	const FIX_LABELS = {
		"laptop-repair": "laptops",
		"computer-repair": "desktops",
		"cctv-installation": "CCTV cameras",
		networking: "office Wi-Fi",
		"data-recovery": "failed hard disks",
		"printer-repair": "printers",
		"virus-removal": "virus infections",
		"inverter-installation": "power backup",
		"software-installation": "Windows installs",
		"amc-services": "office IT, every month"
	};
	const rotating = allServices.filter((x) => FIX_LABELS[x.slug]).map((x) => ({
		slug: x.slug,
		label: FIX_LABELS[x.slug]
	}));
	const h1Cut = s.home.h1.indexOf(" & ");
	const h1Main = h1Cut > 0 ? s.home.h1.slice(0, h1Cut) : s.home.h1;
	const h1Accent = h1Cut > 0 ? s.home.h1.slice(h1Cut + 1) : "";
	const STEPS = [
		{
			title: "Tell us the problem",
			text: "Call, WhatsApp, book online or walk in. Many issues can be narrowed down over the phone."
		},
		{
			title: "Diagnosis and quote",
			text: "We find the cause, then give you an itemised quote. Nothing is changed until you approve it."
		},
		{
			title: "Repair or install",
			text: "At our Chikhali workshop or at your door, with tested parts and a record of what was done."
		},
		{
			title: "Hand-over and support",
			text: "We show you the fix, explain any warranty, and stay reachable if the problem returns."
		}
	];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Virnobyte – IT Services, Computer Repair & IT Solutions in Pune",
		"description": "Virnobyte provides computer repair, laptop repair, CCTV installation, networking, IT support, data recovery and business IT solutions in Chikhali, Pimpri-Chinchwad and Pune.",
		"canonical": "/",
		"jsonLd": [
			localBusiness(site, s),
			website(site, s.business.name),
			itemList(site, "Featured IT Services", allServices.slice(0, 8).map((svc) => ({
				name: svc.name,
				url: `/services/${svc.slug}`,
				description: svc.short
			}))),
			...faqs.length ? [faqPage(faqs)] : []
		],
		"preloadImage": preload ? {
			srcset: preload.srcSet.attribute,
			sizes: heroSizes,
			type: "image/avif"
		} : void 0,
		"data-astro-cid-lcdefpme": true
	}, { "default": ($$result) => renderTemplate`  ${maybeRenderHead($$result)}<section class="hero" data-astro-cid-lcdefpme> <!-- Background: auto-playing 4K PC assembly sequence -->${renderComponent($$result, "HeroBuild", $$HeroBuild, { "data-astro-cid-lcdefpme": true })} <div class="wrap hero-inner" data-astro-cid-lcdefpme> <span class="eyebrow hero-chip" data-astro-cid-lcdefpme>${s.home.eyebrow}</span> <h1 data-astro-cid-lcdefpme>${h1Main}${h1Accent && renderTemplate`<span class="h1-accent" data-astro-cid-lcdefpme> ${h1Accent}</span>`}</h1> <p class="hero-lede" data-astro-cid-lcdefpme>${s.home.lede}</p> <p class="fixes" data-astro-cid-lcdefpme> <span class="fixes-label" data-astro-cid-lcdefpme>We fix</span> <span class="rotator" data-rotator aria-hidden="true" data-astro-cid-lcdefpme> ${rotating.map((r, i) => renderTemplate`<a${addAttribute(`/services/${r.slug}`, "href")}${addAttribute(["rot-item", { on: i === 0 }], "class:list")} tabindex="-1" data-astro-cid-lcdefpme>${r.label}</a>`)} </span> <span class="sr-only" data-astro-cid-lcdefpme>${rotating.map((r) => r.label).join(", ")}</span> </p> <div class="hero-ctas" data-astro-cid-lcdefpme> <a class="btn hero-cta" href="/contact#book" data-astro-cid-lcdefpme>Book a Service</a> <a class="btn hero-cta hero-cta--ghost" href="/custom-pc-builder" data-astro-cid-lcdefpme>Build your PC</a> </div> <dl class="facts" data-astro-cid-lcdefpme> ${s.home.facts.map((f) => renderTemplate`<div data-astro-cid-lcdefpme> <dt data-astro-cid-lcdefpme>${f.label}</dt> <dd data-astro-cid-lcdefpme>${f.value}</dd> </div>`)} </dl> </div> </section>  <section class="section" aria-labelledby="services-h" data-astro-cid-lcdefpme> <div class="wrap" data-astro-cid-lcdefpme> <div class="section-head" data-reveal data-astro-cid-lcdefpme> <span class="eyebrow" data-astro-cid-lcdefpme>What we fix, install and support</span> <h2 id="services-h" data-astro-cid-lcdefpme>Computer repair, CCTV, networking and IT support under one roof</h2> <p class="lede" data-astro-cid-lcdefpme>
Whether it is a single laptop with a cracked screen or a 30-seat office that needs a network, CCTV and
          yearly maintenance, the same team handles it — from our workshop in ${c.locality} and on-site across ${c.city} and Pune.
</p> </div> ${renderComponent($$result, "ServiceGrid", $$ServiceGrid, {
		"items": featured,
		"data-astro-cid-lcdefpme": true
	})} <p class="all-link" data-reveal data-astro-cid-lcdefpme> <a class="btn btn--ghost" href="/services" data-astro-cid-lcdefpme>See all ${allServices.length} IT services ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"data-astro-cid-lcdefpme": true
	})}</a> </p> </div> </section>  <section class="section section--white" aria-labelledby="process-h" data-astro-cid-lcdefpme> <div class="wrap" data-astro-cid-lcdefpme> <div class="section-head" data-reveal data-astro-cid-lcdefpme> <span class="eyebrow" data-astro-cid-lcdefpme>How a job works</span> <h2 id="process-h" data-astro-cid-lcdefpme>You approve the quote before any work begins</h2> </div> <ol class="steps" data-astro-cid-lcdefpme> ${STEPS.map((st, i) => renderTemplate`<li data-reveal data-astro-cid-lcdefpme> <span class="step-n" aria-hidden="true" data-astro-cid-lcdefpme>${i + 1}</span> <h3 data-astro-cid-lcdefpme>${st.title}</h3> <p data-astro-cid-lcdefpme>${st.text}</p> </li>`)} </ol> </div> </section>  ${planList.length > 0 && renderTemplate`<section class="section section--night member" aria-labelledby="member-h" data-astro-cid-lcdefpme> <div class="wrap member-grid" data-astro-cid-lcdefpme> <div class="member-copy" data-reveal data-astro-cid-lcdefpme> <span class="eyebrow" data-astro-cid-lcdefpme>Virnobyte membership card</span> <h2 id="member-h" data-astro-cid-lcdefpme>A year of IT support in your wallet — with ${s.coins.name} to spend</h2> <p class="lede" data-astro-cid-lcdefpme>
Members get free service labour for a year, discounts on repairs and software, doorstep visits, and coins
              credited straight to their card. Every card shows its live coin balance when you sign in.
</p> <ul class="ticks" data-astro-cid-lcdefpme> <li data-astro-cid-lcdefpme>Plans from ₹${num(Math.min(...planList.map((p) => p.price)))} a year</li> <li data-astro-cid-lcdefpme>Up to ${num(Math.max(...planList.map((p) => p.coins)))} ${s.coins.name} on activation (${s.coins.valueInr === 1 ? "1 coin = ₹1" : `1 coin = ₹${s.coins.valueInr}`})</li> <li data-astro-cid-lcdefpme>Up to ${Math.max(...planList.map((p) => p.doorstep_visits))} doorstep visits included</li> </ul> <div class="btn-row" data-astro-cid-lcdefpme> <a class="btn" href="/membership" data-astro-cid-lcdefpme>Compare membership plans</a> </div> </div> <div class="fan" data-reveal aria-hidden="true" data-astro-cid-lcdefpme> ${planList.slice(0, 3).map((p, i) => renderTemplate`<div${addAttribute(`fan-card f${i}`, "class")} data-astro-cid-lcdefpme> ${renderComponent($$result, "MembershipCard", $$MembershipCard, {
		"planName": p.name,
		"from": p.card_from,
		"to": p.card_to,
		"text": p.card_text,
		"pattern": p.card_pattern,
		"coins": p.coins,
		"status": "sample",
		"holder": "Member name",
		"data-astro-cid-lcdefpme": true
	})} </div>`)} </div> </div> </section>`} <section class="section" aria-labelledby="local-h" data-astro-cid-lcdefpme> <div class="wrap local" data-astro-cid-lcdefpme> <div class="stack" data-reveal data-astro-cid-lcdefpme> <span class="eyebrow" data-astro-cid-lcdefpme>Local IT support</span> <h2 id="local-h" data-astro-cid-lcdefpme>Computer and laptop repair in Chikhali, Pimpri-Chinchwad and Pune</h2> <p class="lede" data-astro-cid-lcdefpme>
Our office is on Mahadev Temple Road in Jadhav Wadi, Chikhali — easy to reach from Moshi, Talawade, Akurdi,
          Nigdi and the rest of Pimpri-Chinchwad. Bring in a laptop or desktop for diagnosis, or book a technician to
          visit your home or office.
</p> <p class="muted" data-astro-cid-lcdefpme> ${years > 0 ? `For more than ${years} years, ` : ""}businesses across Pune have relied on us for IT support:
          setting up office networks and Wi-Fi, installing CCTV for shops and factories, recovering data from failed
          drives, and keeping systems healthy under an annual maintenance contract. Homes call us for slow computers,
          broken laptop screens, printer problems and virus clean-ups.
</p> <address class="nap" data-astro-cid-lcdefpme> <strong data-astro-cid-lcdefpme>${c.name}</strong><br data-astro-cid-lcdefpme> ${c.street},<br data-astro-cid-lcdefpme>${c.locality}, ${c.city}, ${c.region} – ${c.postalCode} </address> <div class="btn-row" data-astro-cid-lcdefpme> <a class="btn btn--ghost"${addAttribute(c.directions, "href")} rel="noopener" target="_blank" data-astro-cid-lcdefpme>${renderComponent($$result, "Icon", $$Icon, {
		"name": "directions",
		"data-astro-cid-lcdefpme": true
	})} Get Directions</a> <a class="btn btn--ghost"${addAttribute(c.tel, "href")} data-astro-cid-lcdefpme>${renderComponent($$result, "Icon", $$Icon, {
		"name": "phone",
		"data-astro-cid-lcdefpme": true
	})} ${c.phone}</a> </div> </div> <div class="map" data-reveal data-astro-cid-lcdefpme> <iframe${addAttribute(`Map showing ${c.name} in ${c.locality}, ${c.city}`, "title")}${addAttribute(c.mapEmbed, "src")} loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen data-astro-cid-lcdefpme></iframe> </div> </div> </section> ${reviews.length > 0 && renderTemplate`<section class="section section--white" aria-labelledby="reviews-h" data-astro-cid-lcdefpme> <div class="wrap" data-astro-cid-lcdefpme> <div class="section-head" data-reveal data-astro-cid-lcdefpme> <span class="eyebrow" data-astro-cid-lcdefpme>Customers</span> <h2 id="reviews-h" data-astro-cid-lcdefpme>What customers say after the job</h2> </div> <ul class="quotes" data-astro-cid-lcdefpme> ${reviews.map((r) => renderTemplate`<li data-reveal data-astro-cid-lcdefpme> <blockquote data-astro-cid-lcdefpme> <p data-astro-cid-lcdefpme>“${r.quote}”</p> <footer data-astro-cid-lcdefpme> <strong data-astro-cid-lcdefpme>${r.name}</strong> ${r.role && renderTemplate`<span class="muted" data-astro-cid-lcdefpme>${r.role}</span>`} </footer> </blockquote> </li>`)} </ul> </div> </section>`}${faqs.length > 0 && renderTemplate`<section class="section" aria-labelledby="faq-h" data-astro-cid-lcdefpme> <div class="wrap two-col" data-astro-cid-lcdefpme> <div class="section-head" data-reveal data-astro-cid-lcdefpme> <span class="eyebrow" data-astro-cid-lcdefpme>Questions</span> <h2 id="faq-h" data-astro-cid-lcdefpme>Before you book</h2> <p class="lede" data-astro-cid-lcdefpme>
Answers to what people ask us most. More on the <a href="/faq" data-astro-cid-lcdefpme>FAQ page</a>.
</p> </div> <div data-reveal data-astro-cid-lcdefpme> ${renderComponent($$result, "FaqList", $$FaqList, {
		"faqs": faqs,
		"data-astro-cid-lcdefpme": true
	})} </div> </div> </section>`}${latest.length > 0 && renderTemplate`<section class="section section--white" aria-labelledby="blog-h" data-astro-cid-lcdefpme> <div class="wrap" data-astro-cid-lcdefpme> <div class="section-head" data-reveal data-astro-cid-lcdefpme> <span class="eyebrow" data-astro-cid-lcdefpme>Guides</span> <h2 id="blog-h" data-astro-cid-lcdefpme>Practical IT advice from the workshop</h2> </div> <ul class="posts" data-astro-cid-lcdefpme> ${latest.map((p) => renderTemplate`<li data-reveal data-astro-cid-lcdefpme> <a${addAttribute(`/blog/${p.slug}`, "href")} class="post" data-astro-cid-lcdefpme> ${renderComponent($$result, "Photo", $$Photo, {
		"image": p.image,
		"alt": p.title,
		"sizes": "(min-width: 1000px) 30vw, 100vw",
		"widths": [
			480,
			768,
			1080
		],
		"data-astro-cid-lcdefpme": true
	})} <span class="small muted" data-astro-cid-lcdefpme>${formatDate(p.published_at)}</span> <h3 data-astro-cid-lcdefpme>${p.title}</h3> </a> </li>`)} </ul> </div> </section>`}${renderComponent($$result, "CtaBand", $$CtaBand, { "data-astro-cid-lcdefpme": true })} ` })}${renderScript($$result, "C:/Programming section/virnobyte/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Programming section/virnobyte/src/pages/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
