import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Icon } from "./Icon_CAVYTX4O.mjs";
import { t as $$Base } from "./Base_OysXX2EZ.mjs";
import { n as getSettings, t as contactInfo } from "./settings_D4sn-e6I.mjs";
import { d as jobs } from "./data_Bs0BnE5b.mjs";
import { t as $$Breadcrumbs } from "./Breadcrumbs_dgueMOWz.mjs";
import { t as $$Photo } from "./Photo_DaKSvGuY.mjs";
import { n as breadcrumbs } from "./schema_CPu37s2y.mjs";
import { a as inr } from "./format_B1bSNQa_.mjs";
//#region src/pages/careers/index.astro
var careers_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const s = getSettings();
	const c = contactInfo(s);
	const open = jobs();
	const crumbs = [{
		name: "Home",
		href: "/"
	}, {
		name: "Careers",
		href: "/careers"
	}];
	const TYPE = {
		FULL_TIME: "Full-time",
		PART_TIME: "Part-time",
		INTERN: "Internship",
		CONTRACTOR: "Contract"
	};
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Careers at Virnobyte | IT Technician Jobs in Pimpri-Chinchwad",
		"description": `Work at Virnobyte in ${c.locality}, Pimpri-Chinchwad: computer, laptop, CCTV and networking roles with pay shown upfront and a clear path to grow.`,
		"canonical": "/careers",
		"image": "/og/pages/careers.jpg",
		"jsonLd": breadcrumbs(Astro.site, crumbs),
		"data-astro-cid-usty5cq5": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<section class="c-hero" data-astro-cid-usty5cq5> ${renderComponent($$result, "Photo", $$Photo, {
		"image": s.careers.heroImage,
		"alt": "Computer components on a technician's workbench",
		"eager": true,
		"sizes": "100vw",
		"widths": [
			768,
			1080,
			1440,
			1920,
			2560,
			3840
		],
		"class": "bg",
		"data-astro-cid-usty5cq5": true
	})} <div class="wrap inner" data-astro-cid-usty5cq5> ${renderComponent($$result, "Breadcrumbs", $$Breadcrumbs, {
		"items": crumbs,
		"tone": "dark",
		"data-astro-cid-usty5cq5": true
	})} <h1 data-astro-cid-usty5cq5>Fix real IT problems. Grow into the team that runs them.</h1> <p class="lede" data-astro-cid-usty5cq5>${s.careers.promise}</p> <dl class="facts" data-astro-cid-usty5cq5> <div data-astro-cid-usty5cq5><dt data-astro-cid-usty5cq5>Based in</dt><dd data-astro-cid-usty5cq5>${c.locality}, ${c.city}</dd></div> <div data-astro-cid-usty5cq5><dt data-astro-cid-usty5cq5>Work</dt><dd data-astro-cid-usty5cq5>Workshop + field</dd></div> <div data-astro-cid-usty5cq5><dt data-astro-cid-usty5cq5>Pay</dt><dd data-astro-cid-usty5cq5>Shown on every role</dd></div> </dl> <a class="btn" href="#roles" data-astro-cid-usty5cq5>See open roles</a> </div> </section> <section class="section" id="roles" aria-labelledby="roles-h" data-astro-cid-usty5cq5> <div class="wrap" data-astro-cid-usty5cq5> <div class="section-head" data-astro-cid-usty5cq5> <h2 id="roles-h" data-astro-cid-usty5cq5>Open roles</h2> </div> ${open.length ? renderTemplate`<ul class="roles" data-astro-cid-usty5cq5> ${open.map((j) => renderTemplate`<li data-reveal data-astro-cid-usty5cq5> <a${addAttribute(`/careers/${j.slug}`, "href")} class="role" data-astro-cid-usty5cq5> <div data-astro-cid-usty5cq5> <h3 data-astro-cid-usty5cq5>${j.title}</h3> <p class="small muted" data-astro-cid-usty5cq5>${j.promise}</p> </div> <dl data-astro-cid-usty5cq5> <div data-astro-cid-usty5cq5><dt data-astro-cid-usty5cq5>Pay</dt><dd data-astro-cid-usty5cq5>${inr(j.salary_min)}–${inr(j.salary_max)} / month</dd></div> <div data-astro-cid-usty5cq5><dt data-astro-cid-usty5cq5>Type</dt><dd data-astro-cid-usty5cq5>${TYPE[j.employment_type] ?? j.employment_type}</dd></div> <div data-astro-cid-usty5cq5><dt data-astro-cid-usty5cq5>Location</dt><dd data-astro-cid-usty5cq5>${j.location}</dd></div> </dl> <span class="go" data-astro-cid-usty5cq5>${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"data-astro-cid-usty5cq5": true
	})}</span> </a> </li>`)} </ul>` : renderTemplate`<div class="card empty" data-astro-cid-usty5cq5> <h3 data-astro-cid-usty5cq5>No open roles right now</h3> <p class="muted" data-astro-cid-usty5cq5>
We hire technicians a few times a year. Send your name, phone number and experience to <a${addAttribute(c.mailto, "href")} data-astro-cid-usty5cq5>${c.email}</a> or
              WhatsApp <a${addAttribute(c.whatsappUrl("Hi, I would like to apply for a technician role at Virnobyte."), "href")} rel="noopener" target="_blank" data-astro-cid-usty5cq5>${c.whatsapp}</a> and we will contact you when a role opens.
</p> </div>`} </div> </section> <section class="section section--white" data-astro-cid-usty5cq5> <div class="wrap dir" data-astro-cid-usty5cq5> <div class="stack" data-reveal data-astro-cid-usty5cq5> <span class="eyebrow" data-astro-cid-usty5cq5>Where we are going</span> <h2 data-astro-cid-usty5cq5>The direction</h2> <p class="lede" data-astro-cid-usty5cq5>${s.careers.direction}</p> </div> <div data-reveal data-astro-cid-usty5cq5> <h2 class="h-sm" data-astro-cid-usty5cq5>How we hire</h2> <ol class="hire" data-astro-cid-usty5cq5> ${s.careers.steps.map((st) => renderTemplate`<li data-astro-cid-usty5cq5><strong data-astro-cid-usty5cq5>${st.title}</strong><span data-astro-cid-usty5cq5>${st.detail}</span><em data-astro-cid-usty5cq5>${st.duration}</em></li>`)} </ol> </div> </div> </section> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/careers/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/careers/index.astro";
var $$url = "/careers.html";
//#endregion
//#region \0virtual:astro:page:src/pages/careers/index@_@astro
var page = () => careers_exports;
//#endregion
export { page };
