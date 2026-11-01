import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Base } from "./Base_CDuYVyrv.mjs";
import { n as getSettings, t as contactInfo } from "./settings_abVAYuB4.mjs";
import { h as plans, i as allFaqs, s as currentMembership } from "./data_BjEY30i2.mjs";
import { t as $$PageHero } from "./PageHero_DuIY_j_o.mjs";
import { t as $$CtaBand } from "./CtaBand_9vtqEDUH.mjs";
import { n as breadcrumbs, r as faqPage } from "./schema_6duAGBx4.mjs";
import { a as inr, s as num } from "./format_B1bSNQa_.mjs";
import { t as $$MembershipCard } from "./MembershipCard_RdCT1YeS.mjs";
import { t as $$FaqList } from "./FaqList_DYYYvqt2.mjs";
//#region src/pages/membership.astro
var membership_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Membership,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Membership = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Membership;
	const s = getSettings();
	const c = contactInfo(s);
	const list = plans();
	const user = Astro.locals.user;
	const mine = user ? currentMembership(user.id) : void 0;
	const faqs = allFaqs().filter((f) => f.topic === "Membership").map((f) => ({
		q: f.question,
		a: f.answer
	}));
	const crumbs = [{
		name: "Home",
		href: "/"
	}, {
		name: "Membership",
		href: "/membership"
	}];
	const requested = Astro.url.searchParams.get("requested");
	const coinValue = s.coins.valueInr === 1 ? "1 coin = ₹1" : `1 coin = ₹${s.coins.valueInr}`;
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "IT Membership Card & Plans in Pune | Virnobyte",
		"description": `Virnobyte IT membership cards for Pune homes and offices: a year of free service labour, repair discounts, doorstep visits and ${s.coins.name} on your card.`,
		"canonical": "/membership",
		"image": "/og/pages/membership.jpg",
		"jsonLd": [breadcrumbs(Astro.site, crumbs), ...faqs.length ? [faqPage(faqs)] : []],
		"data-astro-cid-bixxm6oe": true
	}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "PageHero", $$PageHero, {
		"crumbs": crumbs,
		"eyebrow": `Membership card · ${s.coins.name}`,
		"title": "A membership card that pays for your IT support",
		"lede": `Pick a plan, and your card comes loaded with ${s.coins.name} (${coinValue}), free service labour for a year and doorstep visits from our technicians.`,
		"data-astro-cid-bixxm6oe": true
	})} ${requested && renderTemplate`${maybeRenderHead($$result)}<div class="wrap" style="margin-top:var(--space-6)" data-astro-cid-bixxm6oe> <p class="alert alert--ok" role="status" data-astro-cid-bixxm6oe>
Your request has been sent. We will call you to confirm and collect payment, then activate your card. You can follow its status in <a href="/account" data-astro-cid-bixxm6oe>your account</a>.
</p> </div>`}<section class="section" aria-labelledby="plans-h" data-astro-cid-bixxm6oe> <div class="wrap" data-astro-cid-bixxm6oe> <h2 id="plans-h" class="sr-only" data-astro-cid-bixxm6oe>Membership plans</h2> <ul class="plans" data-astro-cid-bixxm6oe> ${list.map((p) => renderTemplate`<li${addAttribute(["plan", { featured: p.featured }], "class:list")} data-reveal data-astro-cid-bixxm6oe> ${p.badge && renderTemplate`<span class="badge" data-astro-cid-bixxm6oe>${p.badge}</span>`} ${renderComponent($$result, "MembershipCard", $$MembershipCard, {
		"planName": p.name,
		"from": p.card_from,
		"to": p.card_to,
		"text": p.card_text,
		"pattern": p.card_pattern,
		"coins": p.coins,
		"holder": "Member name",
		"data-astro-cid-bixxm6oe": true
	})} <div class="plan-body" data-astro-cid-bixxm6oe> <h3 data-astro-cid-bixxm6oe>${p.name} membership</h3> <p class="muted small" data-astro-cid-bixxm6oe>${p.tagline}</p> <p class="price" data-astro-cid-bixxm6oe> <strong data-astro-cid-bixxm6oe>${inr(p.price)}</strong> <span class="muted" data-astro-cid-bixxm6oe> / year</span> ${p.mrp > p.price && renderTemplate`<s class="muted" data-astro-cid-bixxm6oe>${inr(p.mrp)}</s>`} </p> <dl class="keys" data-astro-cid-bixxm6oe> <div data-astro-cid-bixxm6oe><dt data-astro-cid-bixxm6oe>${s.coins.name}</dt><dd data-astro-cid-bixxm6oe>${num(p.coins)}</dd></div> <div data-astro-cid-bixxm6oe><dt data-astro-cid-bixxm6oe>Doorstep visits</dt><dd data-astro-cid-bixxm6oe>${p.doorstep_visits}</dd></div> <div data-astro-cid-bixxm6oe><dt data-astro-cid-bixxm6oe>Validity</dt><dd data-astro-cid-bixxm6oe>${Math.round(p.validity_days / 30.4)} months</dd></div> </dl> <ul class="ticks" data-astro-cid-bixxm6oe> ${p.benefits.map((b) => renderTemplate`<li data-astro-cid-bixxm6oe>${b}</li>`)} </ul> ${mine && (mine.status === "active" || mine.status === "pending") ? renderTemplate`<p class="small muted mine" data-astro-cid-bixxm6oe> ${mine.plan_id === p.id ? `This is your ${mine.status === "active" ? "current" : "requested"} plan.` : "You already have a card. Contact us to change plans."} </p>` : renderTemplate`<form method="post" action="/api/membership" data-astro-cid-bixxm6oe> <input type="hidden" name="plan_id"${addAttribute(p.id, "value")} data-astro-cid-bixxm6oe> <button${addAttribute(["btn btn--block", { "btn--ghost": !p.featured }], "class:list")} type="submit" data-astro-cid-bixxm6oe>
Get the ${p.name} card
</button> </form>`} </div> </li>`)} </ul> <p class="small muted note" data-astro-cid-bixxm6oe>
Payment is collected at our counter or during the first visit — your card is activated as soon as it is confirmed.
</p> </div> </section> <section class="section section--night" aria-labelledby="coins-h" data-astro-cid-bixxm6oe> <div class="wrap coins" data-astro-cid-bixxm6oe> <div class="stack" data-reveal data-astro-cid-bixxm6oe> <span class="eyebrow" data-astro-cid-bixxm6oe>How ${s.coins.name} work</span> <h2 id="coins-h" data-astro-cid-bixxm6oe>Coins land on your card the day it is activated</h2> <p class="lede" data-astro-cid-bixxm6oe> ${coinValue}. Use them on repair labour, consumables and products${s.coins.maxRedeemPercent > 0 ? `, for up to ${s.coins.maxRedeemPercent}% of any bill` : ""}.
${s.coins.expiryMonths > 0 ? ` Coins stay valid for ${s.coins.expiryMonths} months from when they are credited.` : ""} </p> <ul class="ticks" data-astro-cid-bixxm6oe> ${s.coins.rules.map((r) => renderTemplate`<li data-astro-cid-bixxm6oe>${r}</li>`)} </ul> </div> <ol class="how" data-reveal data-astro-cid-bixxm6oe> <li data-astro-cid-bixxm6oe><strong data-astro-cid-bixxm6oe>Choose a plan</strong><span data-astro-cid-bixxm6oe>Request it here or at our ${c.locality} counter.</span></li> <li data-astro-cid-bixxm6oe><strong data-astro-cid-bixxm6oe>We confirm and collect payment</strong><span data-astro-cid-bixxm6oe>A quick call to confirm your details.</span></li> <li data-astro-cid-bixxm6oe><strong data-astro-cid-bixxm6oe>Card activated, coins credited</strong><span data-astro-cid-bixxm6oe>Your card number and validity are issued.</span></li> <li data-astro-cid-bixxm6oe><strong data-astro-cid-bixxm6oe>Track everything online</strong><span data-astro-cid-bixxm6oe>Sign in to see your balance, visits left and history.</span></li> </ol> </div> </section> ${faqs.length > 0 && renderTemplate`<section class="section" aria-labelledby="mfaq-h" data-astro-cid-bixxm6oe> <div class="wrap faq-wrap" data-astro-cid-bixxm6oe> <h2 id="mfaq-h" data-astro-cid-bixxm6oe>Membership questions</h2> ${renderComponent($$result, "FaqList", $$FaqList, {
		"faqs": faqs,
		"data-astro-cid-bixxm6oe": true
	})} </div> </section>`}${renderComponent($$result, "CtaBand", $$CtaBand, {
		"heading": "Prefer to ask first?",
		"text": "Message us on WhatsApp and we will help you choose the right plan.",
		"whatsappText": `Hi ${c.name}, I'd like to know more about the membership card.`,
		"data-astro-cid-bixxm6oe": true
	})} ` })}`;
}, "C:/Programming section/virnobyte/src/pages/membership.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/membership.astro";
var $$url = "/membership.html";
//#endregion
//#region \0virtual:astro:page:src/pages/membership@_@astro
var page = () => membership_exports;
//#endregion
export { page };
