import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Base } from "./Base_DoZQEqYh.mjs";
import { n as getSettings, t as contactInfo } from "./settings_Y_6jYxNr.mjs";
import { u as job } from "./data_cYs3p9oo.mjs";
import { t as $$Breadcrumbs } from "./Breadcrumbs_dgueMOWz.mjs";
import { t as $$Photo } from "./Photo_DaKSvGuY.mjs";
import { i as jobPostingNode, n as breadcrumbs } from "./schema_UjY2ZCpY.mjs";
import { a as inr } from "./format_B1bSNQa_.mjs";
import { t as $$Field } from "./Field_DozAohjX.mjs";
import { t as $$StepForm } from "./StepForm_BGS17Hry.mjs";
//#region src/pages/careers/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Slug = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const j = job(Astro.params.slug);
	if (!j) return Astro.rewrite("/404");
	const s = getSettings();
	const c = contactInfo(s);
	const site = Astro.site;
	const crumbs = [
		{
			name: "Home",
			href: "/"
		},
		{
			name: "Careers",
			href: "/careers"
		},
		{
			name: j.title,
			href: `/careers/${j.slug}`
		}
	];
	const TYPE = {
		FULL_TIME: "Full-time",
		PART_TIME: "Part-time",
		INTERN: "Internship",
		CONTRACTOR: "Contract"
	};
	const pay = `${inr(j.salary_min)}–${inr(j.salary_max)}`;
	const sent = Astro.url.searchParams.get("sent");
	const error = Astro.url.searchParams.get("error");
	const jobPosting = jobPostingNode(site, j, c);
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": `${j.title} Job in ${c.locality}, ${c.city} | ${c.name} Careers`,
		"description": `${j.title} at ${c.name}, ${c.locality}: ${pay} per month, ${TYPE[j.employment_type] ?? ""}. ${j.promise}`.slice(0, 300),
		"canonical": `/careers/${j.slug}`,
		"image": `/og/careers/${j.slug}.jpg`,
		"jsonLd": [jobPosting, breadcrumbs(site, crumbs)],
		"data-astro-cid-p2hioexs": true
	}, { "default": ($$result) => renderTemplate`  ${maybeRenderHead($$result)}<section class="j-hero" data-astro-cid-p2hioexs> ${renderComponent($$result, "Photo", $$Photo, {
		"image": j.image,
		"alt": "",
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
		"data-astro-cid-p2hioexs": true
	})} <div class="wrap inner" data-astro-cid-p2hioexs> ${renderComponent($$result, "Breadcrumbs", $$Breadcrumbs, {
		"items": crumbs,
		"tone": "dark",
		"data-astro-cid-p2hioexs": true
	})} <h1 data-astro-cid-p2hioexs>${j.title}</h1> <p class="lede" data-astro-cid-p2hioexs>${j.promise}</p> <dl class="facts" data-astro-cid-p2hioexs> <div data-astro-cid-p2hioexs><dt data-astro-cid-p2hioexs>Monthly pay</dt><dd data-astro-cid-p2hioexs>${pay}</dd></div> <div data-astro-cid-p2hioexs><dt data-astro-cid-p2hioexs>Location</dt><dd data-astro-cid-p2hioexs>${j.location}</dd></div> <div data-astro-cid-p2hioexs><dt data-astro-cid-p2hioexs>Type</dt><dd data-astro-cid-p2hioexs>${TYPE[j.employment_type] ?? j.employment_type}</dd></div> </dl> <a class="btn" href="#apply" data-astro-cid-p2hioexs>Apply in 5 minutes</a> </div> </section>  <section class="section" data-astro-cid-p2hioexs> <div class="wrap two" data-astro-cid-p2hioexs> <div class="stack" data-reveal data-astro-cid-p2hioexs> <span class="eyebrow" data-astro-cid-p2hioexs>The role</span> <h2 data-astro-cid-p2hioexs>What this job is</h2> <p class="lede" data-astro-cid-p2hioexs>${j.about_role}</p> </div> <dl class="keys" data-reveal data-astro-cid-p2hioexs> <div data-astro-cid-p2hioexs><dt data-astro-cid-p2hioexs>Experience</dt><dd data-astro-cid-p2hioexs>${j.experience || "Open to freshers"}</dd></div> <div data-astro-cid-p2hioexs><dt data-astro-cid-p2hioexs>Pay</dt><dd data-astro-cid-p2hioexs>${pay} / month</dd></div> <div data-astro-cid-p2hioexs><dt data-astro-cid-p2hioexs>Where</dt><dd data-astro-cid-p2hioexs>${c.locality} workshop + field visits</dd></div> </dl> </div> </section>  <section class="section--tight section--night" data-astro-cid-p2hioexs> <div class="wrap stack" data-reveal data-astro-cid-p2hioexs> <span class="eyebrow" data-astro-cid-p2hioexs>The direction</span> <p class="dir" data-astro-cid-p2hioexs>${s.careers.direction}</p> </div> </section>  ${j.duties.length > 0 && renderTemplate`<section class="section" data-astro-cid-p2hioexs> <div class="wrap" data-astro-cid-p2hioexs> <div class="section-head" data-reveal data-astro-cid-p2hioexs> <span class="eyebrow" data-astro-cid-p2hioexs>The job</span> <h2 data-astro-cid-p2hioexs>What you will do each day</h2> </div> <ul class="duties" data-astro-cid-p2hioexs> ${j.duties.map((d) => renderTemplate`<li class="card" data-reveal data-astro-cid-p2hioexs>${d}</li>`)} </ul> </div> </section>`} <section class="section section--white" data-astro-cid-p2hioexs> <div class="wrap two" data-astro-cid-p2hioexs> <div class="stack" data-reveal data-astro-cid-p2hioexs> <span class="eyebrow" data-astro-cid-p2hioexs>Pay and growth</span> <h2 data-astro-cid-p2hioexs>${pay} a month</h2> ${j.pay_note && renderTemplate`<p class="lede" data-astro-cid-p2hioexs>${j.pay_note}</p>`} </div> ${j.growth.length > 0 && renderTemplate`<ol class="ladder" data-reveal aria-label="Career path" data-astro-cid-p2hioexs> ${j.growth.map((g, i) => renderTemplate`<li${addAttribute([i === 0 && "now"], "class:list")} data-astro-cid-p2hioexs>${g}${i === 0 && renderTemplate`<span class="small" data-astro-cid-p2hioexs> — you start here</span>`}</li>`)} </ol>`} </div> </section>  <section class="section" id="apply-section" data-astro-cid-p2hioexs> <div class="wrap apply" data-astro-cid-p2hioexs> <div class="stack" data-astro-cid-p2hioexs> ${j.fits.length > 0 && renderTemplate`<div data-reveal data-astro-cid-p2hioexs> <span class="eyebrow" data-astro-cid-p2hioexs>Who fits</span> <h2 class="h-sm" data-astro-cid-p2hioexs>Tick what applies to you</h2> <p class="small muted" data-astro-cid-p2hioexs>Your answers are added to your application.</p> </div>`} <div data-reveal data-astro-cid-p2hioexs> <span class="eyebrow" data-astro-cid-p2hioexs>How we hire</span> <ol class="hire" data-astro-cid-p2hioexs> ${s.careers.steps.map((st) => renderTemplate`<li data-astro-cid-p2hioexs><strong data-astro-cid-p2hioexs>${st.title}</strong><span data-astro-cid-p2hioexs>${st.detail}</span><em data-astro-cid-p2hioexs>${st.duration}</em></li>`)} </ol> </div> </div> <div class="card form-card" data-astro-cid-p2hioexs> <h2 id="apply" class="h-sm" data-astro-cid-p2hioexs>Apply for ${j.title}</h2> ${sent && renderTemplate`<p class="alert alert--ok" role="status" data-astro-cid-p2hioexs>Application received. We will call you within the time shown in “How we hire”.</p>`} ${error === "fields" && renderTemplate`<p class="alert alert--error" role="alert" data-astro-cid-p2hioexs>Add your name and a valid mobile number, then send again.</p>`} ${error === "rate" && renderTemplate`<p class="alert alert--error" role="alert" data-astro-cid-p2hioexs>Too many attempts from this connection. Please WhatsApp us instead.</p>`} ${renderComponent($$result, "StepForm", $$StepForm, {
		"action": "/api/apply",
		"id": "apply-form",
		"submitLabel": "Send application",
		"draftKey": `job-${j.slug}`,
		"data-astro-cid-p2hioexs": true
	}, { "default": ($$result) => renderTemplate` <input type="hidden" name="job"${addAttribute(j.slug, "value")} data-astro-cid-p2hioexs> ${j.fits.length > 0 && renderTemplate`<fieldset data-step data-title="Who fits" data-astro-cid-p2hioexs> <legend data-astro-cid-p2hioexs>Which of these describe you?</legend> <div class="checks" data-astro-cid-p2hioexs> ${j.fits.map((f) => renderTemplate`<label class="check" data-astro-cid-p2hioexs> <input type="checkbox" name="fits"${addAttribute(f, "value")} data-astro-cid-p2hioexs> <span data-astro-cid-p2hioexs>${f}</span> </label>`)} </div> </fieldset>`}<fieldset data-step data-title="Experience" data-astro-cid-p2hioexs> <legend data-astro-cid-p2hioexs>Your experience</legend> ${renderComponent($$result, "Field", $$Field, {
		"label": "Experience in hardware or IT",
		"name": "experience",
		"type": "select",
		"required": true,
		"options": [
			"Fresher",
			"Less than 1 year",
			"1–3 years",
			"3–5 years",
			"More than 5 years"
		],
		"msgRequired": "Choose the option closest to your experience.",
		"data-astro-cid-p2hioexs": true
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "When can you start?",
		"name": "notice",
		"type": "select",
		"required": true,
		"options": [
			"Immediately",
			"Within 2 weeks",
			"Within a month",
			"More than a month"
		],
		"msgRequired": "Choose when you could start.",
		"data-astro-cid-p2hioexs": true
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Anything we should know",
		"name": "message",
		"type": "textarea",
		"rows": 3,
		"hint": "Skills, certifications, or the kind of work you enjoy.",
		"data-astro-cid-p2hioexs": true
	})} </fieldset> <fieldset data-step data-title="Contact details" data-astro-cid-p2hioexs> <legend data-astro-cid-p2hioexs>How can we reach you?</legend> ${renderComponent($$result, "Field", $$Field, {
		"label": "Full name",
		"name": "name",
		"required": true,
		"autocomplete": "name",
		"msgRequired": "Enter your full name.",
		"data-astro-cid-p2hioexs": true
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Mobile number",
		"name": "phone",
		"type": "tel",
		"required": true,
		"autocomplete": "tel",
		"inputmode": "tel",
		"pattern": "\\+?[0-9 \\(\\)\\-]{10,16}",
		"msgRequired": "Enter a mobile number so we can call you.",
		"msgPattern": "Enter a 10-digit mobile number, e.g. 98765 43210.",
		"data-astro-cid-p2hioexs": true
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Email",
		"name": "email",
		"type": "email",
		"autocomplete": "email",
		"data-astro-cid-p2hioexs": true
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Where do you live?",
		"name": "area",
		"hint": "Area or locality, e.g. Moshi, Nigdi, Bhosari.",
		"data-astro-cid-p2hioexs": true
	})} </fieldset> ` })} </div> </div> </section> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/careers/[slug].astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/careers/[slug].astro";
var $$url = "/careers/[slug].html";
//#endregion
//#region \0virtual:astro:page:src/pages/careers/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
