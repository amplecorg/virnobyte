import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as renderScript, t as $$Icon } from "./Icon_CAVYTX4O.mjs";
import { t as getImage } from "./_astro_assets_DgDUkxWr.mjs";
import { t as $$Base } from "./Base_C1ZfuIuG.mjs";
import { n as getSettings, t as contactInfo } from "./settings_AhSsv2yB.mjs";
import { T as testimonials, _ as posts, h as plans, l as homeFaqs, w as services } from "./data_CkdtwXhb.mjs";
import { i as resolveImage } from "./images_4iK9SaiJ.mjs";
import { t as $$Photo } from "./Photo_DaKSvGuY.mjs";
import { t as $$CtaBand } from "./CtaBand_BEqDDx06.mjs";
import { a as localBusiness, r as faqPage, s as website } from "./schema_DpnEjatQ.mjs";
import { r as formatDate, s as num } from "./format_B1bSNQa_.mjs";
import { t as $$MembershipCard } from "./MembershipCard_Bf21kN_X.mjs";
import { t as $$FaqList } from "./FaqList_DYYYvqt2.mjs";
import { t as $$ServiceGrid } from "./ServiceGrid_BDgragIJ.mjs";
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
	const heroImg = resolveImage(s.home.heroImage);
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
	const TRACES = [
		"M800 90H610l-30 30H430l-26 26H300",
		"M800 170H660l-24-24H520",
		"M800 250H700l-40 40H560l-20 20H420",
		"M800 330H640l-30-30H500l-24 24H380",
		"M800 420H720l-28 28H600l-26-26H470",
		"M800 500H660l-36 36H520",
		"M690 0v60l-30 30",
		"M560 600v-70l24-24h70"
	];
	const NODES = [
		[300, 146],
		[520, 146],
		[420, 310],
		[380, 324],
		[470, 422],
		[520, 536],
		[660, 90],
		[654, 506]
	];
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
			...faqs.length ? [faqPage(faqs)] : []
		],
		"preloadImage": preload ? {
			srcset: preload.srcSet.attribute,
			sizes: heroSizes,
			type: "image/avif"
		} : void 0,
		"data-astro-cid-lcdefpme": true
	}, { "default": ($$result) => renderTemplate`  ${maybeRenderHead($$result)}<section class="hero" data-astro-cid-lcdefpme> ${renderComponent($$result, "Photo", $$Photo, {
		"image": s.home.heroImage,
		"alt": s.home.heroAlt,
		"eager": true,
		"sizes": heroSizes,
		"widths": [
			768,
			1080,
			1440,
			1920,
			2560,
			3840
		],
		"class": "hero-img",
		"position": "60% 50%",
		"data-astro-cid-lcdefpme": true
	})} <!-- Current pulses along circuit traces: the same motif as the membership card --> <svg class="hero-traces" viewBox="0 0 800 600" preserveAspectRatio="xMaxYMid slice" aria-hidden="true" data-astro-cid-lcdefpme> <g class="tr-base" data-astro-cid-lcdefpme> ${TRACES.map((d) => renderTemplate`<path${addAttribute(d, "d")} data-astro-cid-lcdefpme></path>`)} </g> <g class="tr-pulse" data-astro-cid-lcdefpme> ${TRACES.map((d, i) => renderTemplate`<path${addAttribute(d, "d")} pathLength="100"${addAttribute(`animation-delay:${i * .9 % 5.4}s;animation-duration:${4.5 + i % 3}s`, "style")} data-astro-cid-lcdefpme></path>`)} </g> <g class="tr-nodes" data-astro-cid-lcdefpme> ${NODES.map(([x, y], i) => renderTemplate`<circle${addAttribute(x, "cx")}${addAttribute(y, "cy")} r="3.5"${addAttribute(`animation-delay:${i * .7}s`, "style")} data-astro-cid-lcdefpme></circle>`)} </g> </svg> <div class="wrap hero-inner" data-astro-cid-lcdefpme> <span class="eyebrow live" data-astro-cid-lcdefpme><span class="dot" aria-hidden="true" data-astro-cid-lcdefpme></span>${s.home.eyebrow}</span> <h1 data-astro-cid-lcdefpme>${s.home.h1}</h1> <p class="hero-lede" data-astro-cid-lcdefpme>${s.home.lede}</p> <p class="fixes" data-astro-cid-lcdefpme> <span class="fixes-label" data-astro-cid-lcdefpme>We fix</span> <span class="rotator" data-rotator aria-hidden="true" data-astro-cid-lcdefpme> ${rotating.map((r, i) => renderTemplate`<a${addAttribute(`/services/${r.slug}`, "href")}${addAttribute(["rot-item", { on: i === 0 }], "class:list")} tabindex="-1" data-astro-cid-lcdefpme>${r.label}</a>`)} </span> <span class="sr-only" data-astro-cid-lcdefpme>${rotating.map((r) => r.label).join(", ")}</span> </p> <div class="btn-row" data-astro-cid-lcdefpme> <a class="btn" href="/contact#book" data-astro-cid-lcdefpme>${renderComponent($$result, "Icon", $$Icon, {
		"name": "calendar",
		"data-astro-cid-lcdefpme": true
	})} Book a Service</a> <a class="btn btn--light"${addAttribute(c.tel, "href")} data-astro-cid-lcdefpme>${renderComponent($$result, "Icon", $$Icon, {
		"name": "phone",
		"data-astro-cid-lcdefpme": true
	})} Call Now</a> <a class="btn btn--light"${addAttribute(c.whatsappUrl(), "href")} rel="noopener" target="_blank" data-astro-cid-lcdefpme>${renderComponent($$result, "Icon", $$Icon, {
		"name": "whatsapp",
		"data-astro-cid-lcdefpme": true
	})} WhatsApp Now</a> </div> <dl class="facts" data-astro-cid-lcdefpme> ${s.home.facts.map((f) => renderTemplate`<div data-astro-cid-lcdefpme> <dt data-astro-cid-lcdefpme>${f.label}</dt> <dd data-astro-cid-lcdefpme>${f.value}</dd> </div>`)} </dl> </div> </section>  <section class="section" aria-labelledby="services-h" data-astro-cid-lcdefpme> <div class="wrap" data-astro-cid-lcdefpme> <div class="section-head" data-reveal data-astro-cid-lcdefpme> <span class="eyebrow" data-astro-cid-lcdefpme>What we fix, install and support</span> <h2 id="services-h" data-astro-cid-lcdefpme>Computer repair, CCTV, networking and IT support under one roof</h2> <p class="lede" data-astro-cid-lcdefpme>
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
