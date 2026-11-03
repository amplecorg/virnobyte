import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Icon } from "./Icon_CAVYTX4O.mjs";
import { t as $$Base } from "./Base_BChkAF8j.mjs";
import { n as getSettings, t as contactInfo } from "./settings_Y_6jYxNr.mjs";
import { t as $$Breadcrumbs } from "./Breadcrumbs_dgueMOWz.mjs";
import { a as localBusiness, n as breadcrumbs } from "./schema_UjY2ZCpY.mjs";
import { t as $$BookingForm } from "./BookingForm_zEo1MivR.mjs";
//#region src/pages/contact.astro
var contact_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Contact,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Contact = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Contact;
	const s = getSettings();
	const c = contactInfo(s);
	const crumbs = [{
		name: "Home",
		href: "/"
	}, {
		name: "Contact",
		href: "/contact"
	}];
	const sent = Astro.url.searchParams.get("sent");
	const error = Astro.url.searchParams.get("error");
	const preset = Astro.url.searchParams.get("service") ?? void 0;
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Contact Virnobyte | IT Services in Chikhali, Pimpri-Chinchwad",
		"description": `Contact Virnobyte for computer repair, laptop repair, CCTV, networking and IT support. Visit us at Sadichha Complex, Chikhali, Pimpri-Chinchwad or call ${c.phone}.`,
		"canonical": "/contact",
		"image": "/og/pages/contact.jpg",
		"jsonLd": [localBusiness(Astro.site, s), breadcrumbs(Astro.site, crumbs)],
		"data-astro-cid-6bfsojfh": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<section class="section contact" data-astro-cid-6bfsojfh> <div class="wrap grid-c" data-astro-cid-6bfsojfh> <div class="info" data-astro-cid-6bfsojfh> ${renderComponent($$result, "Breadcrumbs", $$Breadcrumbs, {
		"items": crumbs,
		"data-astro-cid-6bfsojfh": true
	})} <h1 data-astro-cid-6bfsojfh>Contact Virnobyte</h1> <p class="lede" data-astro-cid-6bfsojfh>
Visit our workshop in ${c.locality}, call or WhatsApp us, or book a service online. We reply to every request and confirm visits by phone.
</p> <address class="nap" data-astro-cid-6bfsojfh> ${c.addressLines.map((l, i) => i === 0 ? renderTemplate`<strong data-astro-cid-6bfsojfh>${l}</strong>` : renderTemplate`<span data-astro-cid-6bfsojfh>${l}${i < c.addressLines.length - 1 ? "," : ""}</span>`)} </address> <dl class="lines" data-astro-cid-6bfsojfh> <div data-astro-cid-6bfsojfh> <dt data-astro-cid-6bfsojfh>Phone</dt> <dd data-astro-cid-6bfsojfh><a${addAttribute(c.tel, "href")} data-astro-cid-6bfsojfh>${c.phone}</a></dd> </div> <div data-astro-cid-6bfsojfh> <dt data-astro-cid-6bfsojfh>WhatsApp</dt> <dd data-astro-cid-6bfsojfh><a${addAttribute(c.whatsappUrl(), "href")} rel="noopener" target="_blank" data-astro-cid-6bfsojfh>${c.whatsapp}</a></dd> </div> <div data-astro-cid-6bfsojfh> <dt data-astro-cid-6bfsojfh>Email</dt> <dd data-astro-cid-6bfsojfh><a${addAttribute(c.mailto, "href")} data-astro-cid-6bfsojfh>${c.email}</a></dd> </div> ${s.business.hours && renderTemplate`<div data-astro-cid-6bfsojfh> <dt data-astro-cid-6bfsojfh>Hours</dt> <dd data-astro-cid-6bfsojfh>${s.business.hours}</dd> </div>`} <div data-astro-cid-6bfsojfh> <dt data-astro-cid-6bfsojfh>Service areas</dt> <dd data-astro-cid-6bfsojfh>${s.business.serviceAreas.join(", ")}</dd> </div> </dl> <div class="btn-row" data-astro-cid-6bfsojfh> <a class="btn"${addAttribute(c.tel, "href")} data-astro-cid-6bfsojfh>${renderComponent($$result, "Icon", $$Icon, {
		"name": "phone",
		"data-astro-cid-6bfsojfh": true
	})} Call Now</a> <a class="btn btn--ghost"${addAttribute(c.whatsappUrl(), "href")} rel="noopener" target="_blank" data-astro-cid-6bfsojfh>${renderComponent($$result, "Icon", $$Icon, {
		"name": "whatsapp",
		"data-astro-cid-6bfsojfh": true
	})} WhatsApp Now</a> <a class="btn btn--ghost"${addAttribute(c.directions, "href")} rel="noopener" target="_blank" data-astro-cid-6bfsojfh>${renderComponent($$result, "Icon", $$Icon, {
		"name": "directions",
		"data-astro-cid-6bfsojfh": true
	})} Get Directions</a> <a class="btn btn--ghost"${addAttribute(c.mailto, "href")} data-astro-cid-6bfsojfh>${renderComponent($$result, "Icon", $$Icon, {
		"name": "mail",
		"data-astro-cid-6bfsojfh": true
	})} Send Email</a> </div> </div> <div class="card form-card" data-astro-cid-6bfsojfh> <h2 id="book" data-astro-cid-6bfsojfh>Book a service</h2> ${sent && renderTemplate`<p class="alert alert--ok" role="status" data-astro-cid-6bfsojfh>Thank you — your request has been received. We will call you shortly to confirm.</p>`} ${error === "fields" && renderTemplate`<p class="alert alert--error" role="alert" data-astro-cid-6bfsojfh>Please add your name and a valid mobile number, then send the form again.</p>`} ${error === "rate" && renderTemplate`<p class="alert alert--error" role="alert" data-astro-cid-6bfsojfh>We have received several requests from this connection. Please call or WhatsApp us instead.</p>`} ${renderComponent($$result, "BookingForm", $$BookingForm, {
		"preset": preset,
		"source": "/contact",
		"data-astro-cid-6bfsojfh": true
	})} </div> </div> </section> <section class="map-wrap" aria-label="Map" data-astro-cid-6bfsojfh> <iframe${addAttribute(`Map showing ${c.name}, ${c.locality}, ${c.city}`, "title")}${addAttribute(c.mapEmbed, "src")} loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen data-astro-cid-6bfsojfh></iframe> </section> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/contact.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/contact.astro";
var $$url = "/contact.html";
//#endregion
//#region \0virtual:astro:page:src/pages/contact@_@astro
var page = () => contact_exports;
//#endregion
export { page };
