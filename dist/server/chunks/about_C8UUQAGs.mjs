import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, P as defineScriptVars, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as getSettings, t as contactInfo } from "./settings_C74a6Mrw.mjs";
import { T as services } from "./data_rJFB0L58.mjs";
import { a as $$Picture } from "./_astro_assets_DgDUkxWr.mjs";
import { r as breadcrumbs, s as localBusiness, t as $$Base } from "./Base_ac1XVCJk.mjs";
import { t as $$Photo } from "./Photo_BNi-rElU.mjs";
import { t as $$PageHero } from "./PageHero_DW8T4Exq.mjs";
import { t as $$CtaBand } from "./CtaBand_BbYudQr6.mjs";
//#region src/assets/team/saurabh-virnodkar.jpg
var saurabh_virnodkar_default = new Proxy({
	"src": "/_astro/saurabh-virnodkar.CBWsTzUI.jpg",
	"width": 830,
	"height": 1051,
	"format": "jpg"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Programming section/virnobyte/src/assets/team/saurabh-virnodkar.jpg";
	return target[name];
} });
//#endregion
//#region src/assets/team/shubham-virnodkar.png
var shubham_virnodkar_default = new Proxy({
	"src": "/_astro/shubham-virnodkar.BIKQeShR.png",
	"width": 449,
	"height": 556,
	"format": "png"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Programming section/virnobyte/src/assets/team/shubham-virnodkar.png";
	return target[name];
} });
//#endregion
//#region src/assets/team/sandesh-autade.jpg
var sandesh_autade_default = new Proxy({
	"src": "/_astro/sandesh-autade.BxmFhCye.jpg",
	"width": 560,
	"height": 682,
	"format": "jpg"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Programming section/virnobyte/src/assets/team/sandesh-autade.jpg";
	return target[name];
} });
//#endregion
//#region src/assets/team/sagar-bansode.webp
var sagar_bansode_default = new Proxy({
	"src": "/_astro/sagar-bansode.B_4aBhF9.webp",
	"width": 1254,
	"height": 1254,
	"format": "webp"
}, { get(target, name, receiver) {
	if (name === "clone") return structuredClone(target);
	if (name === "fsPath") return "C:/Programming section/virnobyte/src/assets/team/sagar-bansode.webp";
	return target[name];
} });
//#endregion
//#region src/lib/content/leadership.ts
var LEADERS = [
	{
		slug: "saurabh-virnodkar",
		name: "Mr. Saurabh Virnodkar",
		role: "Head of Technology & Infrastructure",
		area: "Technology",
		founder: true,
		photo: saurabh_virnodkar_default,
		focus: "50% 18%",
		vision: [
			"Virnobyte’s vision is to establish a technology-driven organization recognized for delivering resilient, secure, scalable, and future-ready IT solutions to businesses of all sizes.",
			"We are committed to continuously expanding our capabilities across IT infrastructure, enterprise hardware, networking, cybersecurity, cloud computing, data backup and recovery, systems integration, and technical support, enabling our clients to operate with greater efficiency, resilience, and confidence.",
			"At Virnobyte, technology is regarded as a strategic business enabler—addressing complex operational challenges, enhancing productivity, minimizing downtime, strengthening security, and supporting sustainable long-term growth. Our approach is centred on adopting advanced and emerging technologies while maintaining rigorous standards of quality, reliability, innovation, security, and service excellence.",
			"As Virnobyte continues to expand, the organization will strategically invest in advanced technical capabilities, skilled professionals, streamlined service delivery frameworks, robust infrastructure, and emerging technologies. The long-term objective is to establish Virnobyte as a trusted technology partner for businesses across India, delivering measurable value and supporting their ongoing digital transformation."
		]
	},
	{
		slug: "shubham-virnodkar",
		name: "Mr. Shubham Virnodkar",
		role: "Head of Legal, Finance & Governance",
		area: "Finance & Governance",
		founder: true,
		photo: shubham_virnodkar_default,
		focus: "50% 22%",
		vision: [
			"Virnobyte’s vision is to build a financially resilient, legally compliant, transparent, and responsibly governed organization positioned for sustainable long-term growth.",
			"The organization is committed to maintaining rigorous financial discipline, strategic budgeting, accurate financial reporting, regulatory compliance, enterprise risk management, and sound corporate governance while supporting Virnobyte’s broader strategic objectives and expansion initiatives.",
			"At Virnobyte, strong financial stewardship, legal integrity, and governance excellence are regarded as fundamental pillars for establishing credibility and long-term trust with customers, employees, business partners, investors, regulators, and other key stakeholders.",
			"As Virnobyte continues to scale, the focus will remain on developing robust financial, legal, compliance, and governance frameworks that strengthen accountability, support informed executive decision-making, mitigate organizational risk, safeguard business interests, and enable responsible expansion into new markets and strategic opportunities."
		]
	},
	{
		slug: "sandesh-autade",
		name: "Mr. Sandesh Autade",
		role: "Head of Client Acquisition & Business Development",
		area: "Business Development",
		founder: false,
		photo: sandesh_autade_default,
		focus: "50% 25%",
		vision: [
			"Virnobyte’s vision is to cultivate enduring business relationships by developing a comprehensive understanding of each client’s technology requirements and delivering reliable, cost-efficient, scalable, and business-focused IT solutions.",
			"Our objective extends beyond the delivery of products and services. We strive to establish Virnobyte as a strategic technology partner that supports clients through professional engagement, transparent communication, responsive technical assistance, and solutions aligned with their operational and commercial priorities.",
			"Virnobyte is committed to expanding its presence across the corporate, SME, and enterprise segments by strengthening client acquisition, strategic partnerships, service excellence, and long-term account relationships.",
			"As the organization continues to grow, we will further enhance our capabilities across IT hardware, networking infrastructure, Annual Maintenance Contract services, security solutions, software support, systems integration, and technology consulting. Our focus will remain on delivering sustainable business value, strengthening customer relationships, and creating mutually beneficial partnerships that contribute to long-term growth."
		]
	},
	{
		slug: "sagar-bansode",
		name: "Mr. Sagar Bansode",
		role: "Head of Human Resources, Administration & Legal Coordination",
		area: "People & Administration",
		founder: false,
		photo: sagar_bansode_default,
		focus: "50% 22%",
		vision: [
			"Virnobyte’s vision is to cultivate a professional, disciplined, people-centric, and well-governed organization where employees are empowered to develop, perform at a high level, and contribute with confidence and accountability.",
			"The organization is committed to establishing robust human resources frameworks, transparent workplace policies, efficient administrative systems, structured employee development programs, effective legal coordination, and a positive organizational culture that supports both workforce excellence and sustainable business growth.",
			"At Virnobyte, people are recognized as a critical foundation of organizational strength. By attracting capable talent, fostering continuous professional development, maintaining equitable and transparent employment practices, and ensuring efficient administrative operations, we aim to build a dependable, engaged, and high-performing workforce.",
			"As Virnobyte continues to expand, the focus will remain on strengthening organizational structure, employee engagement, workforce governance, compliance processes, internal administration, and cross-functional coordination to support responsible, scalable, and sustainable growth."
		]
	}
];
/** The company-level vision: the opening line of the technology vision, which frames the other three. */
var COMPANY_VISION = "To establish a technology-driven organization recognized for delivering resilient, secure, scalable, and future-ready IT solutions to businesses of all sizes — and to be a trusted technology partner for businesses across India.";
//#endregion
//#region src/pages/about.astro
var about_exports = /* @__PURE__ */ __exportAll({
	default: () => $$About,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$About = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$About;
	const s = getSettings();
	const c = contactInfo(s);
	const svc = services();
	const years = (/* @__PURE__ */ new Date()).getFullYear() - s.business.foundedYear;
	const crumbs = [{
		name: "Home",
		href: "/"
	}, {
		name: "About",
		href: "/about"
	}];
	const co = s.company;
	const PROFILE = [
		{
			k: "Registered name",
			v: co.legalName
		},
		{
			k: "Company type",
			v: co.companyType
		},
		{
			k: "CIN",
			v: co.cin
		},
		{
			k: "Incorporated",
			v: co.incorporatedOn
		},
		{
			k: "GSTIN",
			v: co.gstin
		},
		{
			k: "PAN",
			v: co.pan
		},
		{
			k: "TAN",
			v: co.tan
		},
		{
			k: "Udyam (MSME)",
			v: co.udyam ? `${co.udyam}${co.msmeCategory ? ` · ${co.msmeCategory}` : ""}` : ""
		},
		{
			k: "Startup India (DPIIT)",
			v: co.dpiit
		},
		{
			k: "Founders",
			v: LEADERS.filter((l) => l.founder).map((l) => l.name.replace(/^Mr\.\s*/, "")).join(" & ")
		},
		{
			k: "Accounts & billing",
			v: [co.accountsEmail, co.billingPhone].filter(Boolean).join(" · ")
		},
		{
			k: "Website",
			v: co.website
		},
		{
			k: "Registered office",
			v: co.registeredOffice,
			wide: true
		}
	].filter((r) => r.v);
	const VALUES = [
		{
			t: "Customer first",
			d: "We recommend what solves your problem, even when that is the cheaper option."
		},
		{
			t: "Transparency",
			d: "Diagnosis before repair, itemised quotes, and no work without your approval."
		},
		{
			t: "Reliability",
			d: "Tested components, tidy installations and records of what was done."
		},
		{
			t: "Integrity",
			d: "Your devices and data are handled with care and kept private."
		}
	];
	const CERTIFICATES = [
		{
			id: "dpiit",
			title: "Certificate of Recognition",
			authority: "Ministry of Commerce & Industry · DPIIT",
			subtitle: "Government of India · Startup India",
			regLabel: "Certificate No.",
			regNumber: "DIPP264419",
			date: "29-05-2026",
			validity: "Valid up to 27-04-2036",
			description: "Recognized as an innovative startup working in the IT Services sector under the Startup India initiative.",
			image: "/certificates/certificate-1.jpg",
			badge: "Startup India"
		},
		{
			id: "mca",
			title: "Certificate of Incorporation",
			authority: "Ministry of Corporate Affairs",
			subtitle: "Central Registration Centre, Govt. of India",
			regLabel: "CIN",
			regNumber: "U95111PN2026PTC255068",
			date: "28-04-2026",
			validity: "Company Limited by Shares",
			description: "Incorporated under the Companies Act, 2013 as Virnobyte Private Limited.",
			image: "/certificates/certificate-5.jpg",
			badge: "MCA Incorporated"
		},
		{
			id: "gst",
			title: "GST Registration Certificate",
			authority: "Goods & Services Tax Network",
			subtitle: "Government of India · Form GST REG-06",
			regLabel: "GSTIN",
			regNumber: "27AAMCV1703G1ZD",
			date: "09-05-2026",
			validity: "Regular Taxpayer",
			description: "Government-registered GST enterprise authorized for computer hardware, IT networking & repair services.",
			image: "/certificates/certificate-6.jpg",
			badge: "GST Certified"
		},
		{
			id: "msme",
			title: "Udyam Registration Certificate",
			authority: "Ministry of Micro, Small & Medium Enterprises",
			subtitle: "Government of India · MSME",
			regLabel: "Udyam Reg. No.",
			regNumber: "UDYAM-MH-26-1136149",
			date: "09-05-2026",
			validity: "Enterprise Type: Micro",
			description: "National Industry Classification for computer consultancy, peripheral hardware & IT support services.",
			image: "/certificates/certificate-3.jpg",
			badge: "MSME Certified"
		},
		{
			id: "pan",
			title: "Corporate Permanent Account Number (e-PAN)",
			authority: "Income Tax Department",
			subtitle: "Government of India",
			regLabel: "PAN",
			regNumber: "AAMCV1703G",
			date: "28-04-2026",
			validity: "Permanent Corporate Tax ID",
			description: "Statutory corporate permanent account number issued to Virnobyte Private Limited.",
			image: "/certificates/certificate-4.jpg",
			badge: "Income Tax"
		},
		{
			id: "tan",
			title: "Tax Deduction Account Number (TAN)",
			authority: "Income Tax Department",
			subtitle: "Government of India",
			regLabel: "TAN",
			regNumber: "PNEV29601F",
			date: "28-04-2026",
			validity: "Section 397(1) Compliant",
			description: "Tax Deduction & Collection Account allotment under the Income Tax Act for compliant corporate operations.",
			image: "/certificates/certificate-2.jpg",
			badge: "Income Tax"
		}
	];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "About Virnobyte | IT Solutions & Computer Services in Pune",
		"description": `Virnobyte is a hardware, networking and IT services company in Chikhali, Pimpri-Chinchwad, serving homes and businesses across Pune since ${s.business.foundedYear}.`,
		"canonical": "/about",
		"image": "/og/pages/about.jpg",
		"jsonLd": [localBusiness(Astro.site, s), breadcrumbs(Astro.site, crumbs)],
		"data-astro-cid-ta2fbyqs": true
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PageHero", $$PageHero, {
		"crumbs": crumbs,
		"eyebrow": `Since ${s.business.foundedYear} · ${c.locality}, ${c.city}`,
		"title": "About Virnobyte",
		"lede": `A Pune hardware, networking and IT services company that repairs, installs and supports technology for homes and businesses — from a workshop in ${c.locality}.`,
		"image": "virnobyte-custom-it-solutions-server",
		"imageAlt": "Server rack with organised network cabling",
		"data-astro-cid-ta2fbyqs": true
	})} ${maybeRenderHead($$result)}<section class="section" data-astro-cid-ta2fbyqs> <div class="wrap about" data-astro-cid-ta2fbyqs> <div class="prose" data-reveal data-astro-cid-ta2fbyqs> <h2 data-astro-cid-ta2fbyqs>Who we are</h2> <p data-astro-cid-ta2fbyqs> ${c.legalName} is based at Sadichha Complex near Mahadev Temple Road, Jadhav Wadi, in ${c.locality}. We provide computer and laptop repair,
          networking, CCTV installation, printer services, software support, annual maintenance contracts and on-site technical help for
          customers in ${c.city} and across Pune.
</p> <p data-astro-cid-ta2fbyqs>
Alongside services, we supply new and refurbished laptops and desktops, printers, CCTV systems, networking equipment, RAM, SSDs,
          UPS units and other hardware — so customers can get advice, equipment and installation from one place.
</p> <h2 data-astro-cid-ta2fbyqs>Experience</h2> <p data-astro-cid-ta2fbyqs> ${years > 0 ? `With more than ${years} years of hands-on work, ` : ""}our technicians have seen most of the ways computers,
          networks and CCTV systems fail. That experience is what lets us diagnose accurately, quote honestly and fix things properly the first time.
</p> <h2 data-astro-cid-ta2fbyqs>How we work</h2> <p data-astro-cid-ta2fbyqs>
Every job starts with a diagnosis. We explain what we found, give you an itemised quote, and begin only after you approve it.
          We use tested components, keep a record of the work, and stay reachable afterwards. That approach is why many customers
          move from one-off repairs to our <a href="/membership" data-astro-cid-ta2fbyqs>membership card</a> or an <a href="/services/amc-services" data-astro-cid-ta2fbyqs>IT AMC</a>.
</p> <p class="cert-jump-note" data-astro-cid-ta2fbyqs> <a href="#certificates" class="cert-jump-btn" data-astro-cid-ta2fbyqs> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ta2fbyqs> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-ta2fbyqs></path> <polyline points="9 12 11 14 15 10" data-astro-cid-ta2fbyqs></polyline> </svg> <span data-astro-cid-ta2fbyqs>View our 6 Government Registrations & Certifications ↓</span> </a> </p> </div> <div class="side" data-reveal data-astro-cid-ta2fbyqs> <div class="card mv" data-astro-cid-ta2fbyqs> <h2 data-astro-cid-ta2fbyqs>Our mission</h2> <p data-astro-cid-ta2fbyqs>To deliver reliable, transparent and customer-focused technology solutions through quality service, trusted support and continuous improvement for homes and businesses.</p> </div> <div class="card mv" data-astro-cid-ta2fbyqs> <h2 data-astro-cid-ta2fbyqs>Our vision</h2> <p data-astro-cid-ta2fbyqs>${COMPANY_VISION}</p> <a class="mv-link" href="#vision" data-astro-cid-ta2fbyqs>Read the vision of our leadership ↓</a> </div> </div> </div> </section> <section class="section section--white" data-astro-cid-ta2fbyqs> <div class="wrap" data-astro-cid-ta2fbyqs> <div class="section-head" data-reveal data-astro-cid-ta2fbyqs> <span class="eyebrow" data-astro-cid-ta2fbyqs>What guides the work</span> <h2 data-astro-cid-ta2fbyqs>Customer-first, and transparent about it</h2> </div> <ul class="values" data-astro-cid-ta2fbyqs> ${VALUES.map((v) => renderTemplate`<li data-reveal data-astro-cid-ta2fbyqs> <h3 data-astro-cid-ta2fbyqs>${v.t}</h3> <p data-astro-cid-ta2fbyqs>${v.d}</p> </li>`)} </ul> </div> </section>  <section class="section lead-section" aria-labelledby="leadership-h" id="leadership" data-astro-cid-ta2fbyqs> <div class="wrap" data-astro-cid-ta2fbyqs> <div class="section-head" data-reveal data-astro-cid-ta2fbyqs> <span class="eyebrow" data-astro-cid-ta2fbyqs>Leadership</span> <h2 id="leadership-h" data-astro-cid-ta2fbyqs>The people behind ${co.legalName}</h2> <p class="lede" data-astro-cid-ta2fbyqs>Founded by Saurabh and Shubham Virnodkar, Virnobyte is led by a four-member team covering technology, finance and governance, client relationships, and people.</p> </div> <ul class="leaders" data-astro-cid-ta2fbyqs> ${LEADERS.map((l) => renderTemplate`<li class="leader" data-reveal data-astro-cid-ta2fbyqs> <a${addAttribute(`#vision-${l.slug}`, "href")} class="leader-photo"${addAttribute(`Read the vision of ${l.name}`, "aria-label")} data-astro-cid-ta2fbyqs> ${renderComponent($$result, "Picture", $$Picture, {
		"src": l.photo,
		"alt": `${l.name}, ${l.role}, ${co.legalName}`,
		"formats": ["avif", "webp"],
		"widths": [
			320,
			480,
			640
		].filter((w) => w <= l.photo.width),
		"sizes": "(min-width: 1100px) 280px, (min-width: 640px) 45vw, 90vw",
		"loading": "lazy",
		"style": `object-position:${l.focus}`,
		"data-astro-cid-ta2fbyqs": true
	})} ${l.founder && renderTemplate`<span class="leader-badge" data-astro-cid-ta2fbyqs>Co-Founder</span>`} </a> <div class="leader-body" data-astro-cid-ta2fbyqs> <h3 data-astro-cid-ta2fbyqs>${l.name}</h3> <p class="leader-role" data-astro-cid-ta2fbyqs>${l.role}</p> </div> </li>`)} </ul> </div> </section>  <section class="section section--white vision-section" aria-labelledby="vision-h" id="vision" data-astro-cid-ta2fbyqs> <div class="wrap" data-astro-cid-ta2fbyqs> <div class="section-head" data-reveal data-astro-cid-ta2fbyqs> <span class="eyebrow" data-astro-cid-ta2fbyqs>Vision</span> <h2 id="vision-h" data-astro-cid-ta2fbyqs>Where Virnobyte is going</h2> <p class="lede" data-astro-cid-ta2fbyqs>Each member of the leadership team on the company they are building.</p> </div> <div class="visions" data-astro-cid-ta2fbyqs> ${LEADERS.map((l) => renderTemplate`<article class="vision"${addAttribute(`vision-${l.slug}`, "id")} data-reveal data-astro-cid-ta2fbyqs> <header class="vision-who" data-astro-cid-ta2fbyqs> ${renderComponent($$result, "Picture", $$Picture, {
		"src": l.photo,
		"alt": "",
		"formats": ["avif", "webp"],
		"widths": [160],
		"sizes": "56px",
		"loading": "lazy",
		"class": "vision-avatar",
		"style": `object-position:${l.focus}`,
		"data-astro-cid-ta2fbyqs": true
	})} <div data-astro-cid-ta2fbyqs> <strong data-astro-cid-ta2fbyqs>${l.name}</strong> <span data-astro-cid-ta2fbyqs>${l.role}${l.founder ? " · Co-Founder" : ""}</span> </div> <span class="vision-area" data-astro-cid-ta2fbyqs>${l.area}</span> </header> <blockquote data-astro-cid-ta2fbyqs> <p class="vision-lead" data-astro-cid-ta2fbyqs>“${l.vision[0]}</p> <details data-astro-cid-ta2fbyqs> <summary data-astro-cid-ta2fbyqs>Read the full vision</summary> ${l.vision.slice(1).map((para, i, a) => renderTemplate`<p data-astro-cid-ta2fbyqs>${para}${i === a.length - 1 ? "”" : ""}</p>`)} </details> </blockquote> <footer class="vision-sign" data-astro-cid-ta2fbyqs>— ${l.name}, ${l.role}, ${co.legalName}</footer> </article>`)} </div> </div> </section>  <section class="section" aria-labelledby="profile-h" id="company-profile" data-astro-cid-ta2fbyqs> <div class="wrap profile" data-astro-cid-ta2fbyqs> <div class="section-head" data-reveal data-astro-cid-ta2fbyqs> <span class="eyebrow" data-astro-cid-ta2fbyqs>Company profile</span> <h2 id="profile-h" data-astro-cid-ta2fbyqs>${co.legalName} at a glance</h2> <p class="lede" data-astro-cid-ta2fbyqs>
Registered with the Ministry of Corporate Affairs, GST-registered, MSME (Udyam) registered and recognised under Startup India.
          These are the details printed on our tax invoices.
</p> </div> <dl class="profile-grid" data-reveal data-astro-cid-ta2fbyqs> ${PROFILE.map((r) => renderTemplate`<div${addAttribute(["profile-row", { wide: r.wide }], "class:list")} data-astro-cid-ta2fbyqs> <dt data-astro-cid-ta2fbyqs>${r.k}</dt> <dd data-astro-cid-ta2fbyqs>${r.v}</dd> </div>`)} </dl> </div> </section>  <section class="section cert-section" id="certificates" data-astro-cid-ta2fbyqs> <div class="wrap" data-astro-cid-ta2fbyqs> <div class="section-head cert-head" data-reveal data-astro-cid-ta2fbyqs> <div class="cert-eyebrow-wrap" data-astro-cid-ta2fbyqs> <span class="cert-pill" data-astro-cid-ta2fbyqs>Official Accreditations</span> <span class="cert-sub-pill" data-astro-cid-ta2fbyqs>Quality You Can Trust</span> </div> <h2 data-astro-cid-ta2fbyqs>Government Registrations & Corporate Certificates</h2> <p class="lede" data-astro-cid-ta2fbyqs>
Virnobyte Private Limited is an incorporated, government-certified IT company. Every document below reflects our statutory compliance,
          tax registration, and formal recognition under Indian regulatory bodies.
</p> </div> <div class="cert-grid" data-astro-cid-ta2fbyqs> ${CERTIFICATES.map((cert, index) => renderTemplate`<article class="cert-card" data-reveal${addAttribute(index, "data-cert-index")} data-astro-cid-ta2fbyqs> <div class="cert-thumb-container" data-astro-cid-ta2fbyqs> <img${addAttribute(cert.image, "src")}${addAttribute(`${cert.title} - ${cert.authority}`, "alt")} class="cert-thumbnail" loading="lazy" width="600" height="850" data-astro-cid-ta2fbyqs> <div class="cert-overlay" data-astro-cid-ta2fbyqs> <button type="button" class="cert-trigger-btn"${addAttribute(index, "data-open-cert")}${addAttribute(`Enlarge ${cert.title}`, "aria-label")} data-astro-cid-ta2fbyqs> <span class="cert-icon-circle" data-astro-cid-ta2fbyqs> <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ta2fbyqs> <circle cx="11" cy="11" r="8" data-astro-cid-ta2fbyqs></circle> <line x1="21" y1="21" x2="16.65" y2="16.65" data-astro-cid-ta2fbyqs></line> <line x1="11" y1="8" x2="11" y2="14" data-astro-cid-ta2fbyqs></line> <line x1="8" y1="11" x2="14" y2="11" data-astro-cid-ta2fbyqs></line> </svg> </span> <span class="cert-trigger-text" data-astro-cid-ta2fbyqs>Click to Inspect Document</span> </button> </div> <span class="cert-card-badge" data-astro-cid-ta2fbyqs>${cert.badge}</span> </div> <div class="cert-details" data-astro-cid-ta2fbyqs> <div class="cert-auth-row" data-astro-cid-ta2fbyqs> <span class="cert-authority" data-astro-cid-ta2fbyqs>${cert.authority}</span> <span class="cert-date" data-astro-cid-ta2fbyqs>${cert.date}</span> </div> <h3 class="cert-name" data-astro-cid-ta2fbyqs>${cert.title}</h3> <div class="cert-id-tag" data-astro-cid-ta2fbyqs> <span class="cert-id-label" data-astro-cid-ta2fbyqs>${cert.regLabel}:</span> <code class="cert-id-value" data-astro-cid-ta2fbyqs>${cert.regNumber}</code> </div> <p class="cert-summary" data-astro-cid-ta2fbyqs>${cert.description}</p> <div class="cert-card-footer" data-astro-cid-ta2fbyqs> <span class="cert-validity-status" data-astro-cid-ta2fbyqs> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ta2fbyqs> <polyline points="20 6 9 17 4 12" data-astro-cid-ta2fbyqs></polyline> </svg> ${cert.validity} </span> <button type="button" class="cert-link-btn"${addAttribute(index, "data-open-cert")} data-astro-cid-ta2fbyqs>
Full View ↗
</button> </div> </div> </article>`)} </div> </div> </section>  <dialog id="cert-dialog" class="cert-dialog" aria-label="Certificate Full View" data-astro-cid-ta2fbyqs> <div class="cert-dialog-backdrop" data-close-cert data-astro-cid-ta2fbyqs></div> <div class="cert-dialog-window" data-astro-cid-ta2fbyqs> <header class="cert-dialog-top" data-astro-cid-ta2fbyqs> <div class="cert-dialog-meta" data-astro-cid-ta2fbyqs> <span id="modal-authority" class="cert-modal-eyebrow" data-astro-cid-ta2fbyqs></span> <h3 id="modal-title" class="cert-modal-title" data-astro-cid-ta2fbyqs></h3> <p id="modal-details" class="cert-modal-sub" data-astro-cid-ta2fbyqs></p> </div> <div class="cert-dialog-btns" data-astro-cid-ta2fbyqs> <a id="modal-download" href="#" target="_blank" class="cert-modal-btn cert-modal-btn--secondary" title="Open high resolution image in new tab" data-astro-cid-ta2fbyqs> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ta2fbyqs> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" data-astro-cid-ta2fbyqs></path> <polyline points="15 3 21 3 21 9" data-astro-cid-ta2fbyqs></polyline> <line x1="10" y1="14" x2="21" y2="3" data-astro-cid-ta2fbyqs></line> </svg> <span data-astro-cid-ta2fbyqs>High-Res</span> </a> <button type="button" class="cert-modal-btn cert-modal-btn--close" data-close-cert aria-label="Close preview" data-astro-cid-ta2fbyqs> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ta2fbyqs> <line x1="18" y1="6" x2="6" y2="18" data-astro-cid-ta2fbyqs></line> <line x1="6" y1="6" x2="18" y2="18" data-astro-cid-ta2fbyqs></line> </svg> </button> </div> </header> <div class="cert-dialog-stage" data-astro-cid-ta2fbyqs> <button type="button" class="cert-nav-arrow cert-nav-arrow--prev" id="cert-prev" aria-label="Previous certificate" data-astro-cid-ta2fbyqs> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ta2fbyqs> <polyline points="15 18 9 12 15 6" data-astro-cid-ta2fbyqs></polyline> </svg> </button> <div class="cert-dialog-img-holder" data-astro-cid-ta2fbyqs> <img id="modal-img" src="" alt="Certificate Document" class="cert-modal-image" data-astro-cid-ta2fbyqs> </div> <button type="button" class="cert-nav-arrow cert-nav-arrow--next" id="cert-next" aria-label="Next certificate" data-astro-cid-ta2fbyqs> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ta2fbyqs> <polyline points="9 18 15 12 9 6" data-astro-cid-ta2fbyqs></polyline> </svg> </button> </div> <footer class="cert-dialog-bottom" data-astro-cid-ta2fbyqs> <span id="modal-counter" class="cert-modal-counter" data-astro-cid-ta2fbyqs>1 of 6</span> <span class="cert-modal-hint" data-astro-cid-ta2fbyqs>Use Left/Right arrows to navigate · Press Esc to close</span> </footer> </div> </dialog> <section class="section" data-astro-cid-ta2fbyqs> <div class="wrap split" data-astro-cid-ta2fbyqs> <div class="stack" data-reveal data-astro-cid-ta2fbyqs> <span class="eyebrow" data-astro-cid-ta2fbyqs>Technology and services</span> <h2 data-astro-cid-ta2fbyqs>What our team handles</h2> <p class="lede" data-astro-cid-ta2fbyqs>Repairs, installations and ongoing support across ${svc.length} service areas:</p> <ul class="svc-list" data-astro-cid-ta2fbyqs> ${svc.map((x) => renderTemplate`<li data-astro-cid-ta2fbyqs><a${addAttribute(`/services/${x.slug}`, "href")} data-astro-cid-ta2fbyqs>${x.name}</a></li>`)} </ul> </div> <div class="stack" data-reveal data-astro-cid-ta2fbyqs> <span class="eyebrow" data-astro-cid-ta2fbyqs>Service coverage</span> <h2 data-astro-cid-ta2fbyqs>Where we work</h2> <p data-astro-cid-ta2fbyqs>
Walk-in repairs are handled at our ${c.locality} workshop. Our technicians visit homes, shops and offices across ${c.city}
and Pune for on-site repairs, installations, networking and AMC visits.
</p> <ul class="ticks" data-astro-cid-ta2fbyqs> ${s.business.serviceAreas.map((a) => renderTemplate`<li data-astro-cid-ta2fbyqs>${a}</li>`)} </ul> ${renderComponent($$result, "Photo", $$Photo, {
		"image": "virnobyte-wifi-router-setup",
		"alt": "Wi-Fi router connected with a network cable during an installation",
		"sizes": "(min-width: 1024px) 45vw, 100vw",
		"class": "cov-img",
		"data-astro-cid-ta2fbyqs": true
	})} </div> </div> </section> ${renderComponent($$result, "CtaBand", $$CtaBand, { "data-astro-cid-ta2fbyqs": true })} ` })} <script>(function(){${defineScriptVars({ CERTIFICATES })}
  const dialog = document.getElementById('cert-dialog');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalAuthority = document.getElementById('modal-authority');
  const modalDetails = document.getElementById('modal-details');
  const modalDownload = document.getElementById('modal-download');
  const modalCounter = document.getElementById('modal-counter');
  const prevBtn = document.getElementById('cert-prev');
  const nextBtn = document.getElementById('cert-next');

  let activeIndex = 0;

  function loadCert(idx) {
    activeIndex = (idx + CERTIFICATES.length) % CERTIFICATES.length;
    const cert = CERTIFICATES[activeIndex];
    if (!cert) return;

    modalImg.src = cert.image;
    modalImg.alt = \`\${cert.title} - \${cert.authority}\`;
    modalTitle.textContent = cert.title;
    modalAuthority.textContent = \`\${cert.authority} • \${cert.subtitle}\`;
    modalDetails.textContent = \`\${cert.regLabel}: \${cert.regNumber}  |  \${cert.validity}\`;
    modalDownload.href = cert.image;
    modalCounter.textContent = \`\${activeIndex + 1} of \${CERTIFICATES.length}\`;

    if (dialog && !dialog.open) {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      document.body.style.overflow = 'hidden';
    }
  }

  function dismissModal() {
    if (dialog) {
      if (typeof dialog.close === 'function') {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('[data-open-cert]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(btn.getAttribute('data-open-cert'), 10);
      loadCert(isNaN(idx) ? 0 : idx);
    });
  });

  document.querySelectorAll('[data-close-cert]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      dismissModal();
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', () => loadCert(activeIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => loadCert(activeIndex + 1));

  window.addEventListener('keydown', (e) => {
    if (!dialog || !dialog.open) return;
    if (e.key === 'Escape') dismissModal();
    if (e.key === 'ArrowLeft') loadCert(activeIndex - 1);
    if (e.key === 'ArrowRight') loadCert(activeIndex + 1);
  });
})();<\/script>`;
}, "C:/Programming section/virnobyte/src/pages/about.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/about.astro";
var $$url = "/about.html";
//#endregion
//#region \0virtual:astro:page:src/pages/about@_@astro
var page = () => about_exports;
//#endregion
export { page };
