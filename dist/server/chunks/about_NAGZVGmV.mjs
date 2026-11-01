import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, P as defineScriptVars, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Base } from "./Base_OysXX2EZ.mjs";
import { n as getSettings, t as contactInfo } from "./settings_D4sn-e6I.mjs";
import { C as services } from "./data_Bs0BnE5b.mjs";
import { t as $$Photo } from "./Photo_DaKSvGuY.mjs";
import { t as $$PageHero } from "./PageHero_DuIY_j_o.mjs";
import { t as $$CtaBand } from "./CtaBand_B5-iRTmH.mjs";
import { a as localBusiness, n as breadcrumbs } from "./schema_CPu37s2y.mjs";
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
</p> <p class="cert-jump-note" data-astro-cid-ta2fbyqs> <a href="#certificates" class="cert-jump-btn" data-astro-cid-ta2fbyqs> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ta2fbyqs> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-ta2fbyqs></path> <polyline points="9 12 11 14 15 10" data-astro-cid-ta2fbyqs></polyline> </svg> <span data-astro-cid-ta2fbyqs>View our 6 Government Registrations & Certifications ↓</span> </a> </p> </div> <div class="side" data-reveal data-astro-cid-ta2fbyqs> <div class="card mv" data-astro-cid-ta2fbyqs> <h2 data-astro-cid-ta2fbyqs>Our mission</h2> <p data-astro-cid-ta2fbyqs>To deliver reliable, transparent and customer-focused technology solutions through quality service, trusted support and continuous improvement for homes and businesses.</p> </div> <div class="card mv" data-astro-cid-ta2fbyqs> <h2 data-astro-cid-ta2fbyqs>Our vision</h2> <p data-astro-cid-ta2fbyqs>To become a trusted technology partner for homes and businesses by delivering dependable hardware, networking and IT support while continuously improving quality, innovation and long-term value.</p> </div> </div> </div> </section> <section class="section section--white" data-astro-cid-ta2fbyqs> <div class="wrap" data-astro-cid-ta2fbyqs> <div class="section-head" data-reveal data-astro-cid-ta2fbyqs> <span class="eyebrow" data-astro-cid-ta2fbyqs>What guides the work</span> <h2 data-astro-cid-ta2fbyqs>Customer-first, and transparent about it</h2> </div> <ul class="values" data-astro-cid-ta2fbyqs> ${VALUES.map((v) => renderTemplate`<li data-reveal data-astro-cid-ta2fbyqs> <h3 data-astro-cid-ta2fbyqs>${v.t}</h3> <p data-astro-cid-ta2fbyqs>${v.d}</p> </li>`)} </ul> </div> </section>  <section class="section cert-section" id="certificates" data-astro-cid-ta2fbyqs> <div class="wrap" data-astro-cid-ta2fbyqs> <div class="section-head cert-head" data-reveal data-astro-cid-ta2fbyqs> <div class="cert-eyebrow-wrap" data-astro-cid-ta2fbyqs> <span class="cert-pill" data-astro-cid-ta2fbyqs>Official Accreditations</span> <span class="cert-sub-pill" data-astro-cid-ta2fbyqs>Quality You Can Trust</span> </div> <h2 data-astro-cid-ta2fbyqs>Government Registrations & Corporate Certificates</h2> <p class="lede" data-astro-cid-ta2fbyqs>
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
