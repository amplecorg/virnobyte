import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as renderScript } from "./script_BaVSnVKi.mjs";
import { n as getSettings } from "./settings_C74a6Mrw.mjs";
import { h as planById, s as currentMembership } from "./data_rJFB0L58.mjs";
import { a as inr, s as num } from "./format_6aaLy6w7.mjs";
import { t as getPaymentConfig } from "./payments_BiY7FehB.mjs";
import { t as $$Base } from "./Base_ac1XVCJk.mjs";
import { t as $$MembershipCard } from "./MembershipCard_D9OWERb3.mjs";
//#region src/pages/membership/checkout/[id].astro
var _id__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Id,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Id = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Id;
	const plan = planById(Number(Astro.params.id));
	if (!plan || !plan.active) return Astro.redirect("/membership", 302);
	const user = Astro.locals.user;
	if (!user) return Astro.redirect(`/account/register?plan=${plan.id}`, 302);
	if (currentMembership(user.id)?.status === "active") return Astro.redirect("/account", 302);
	const cfg = getPaymentConfig();
	const s = getSettings();
	const gatewayName = cfg.gateway === "cashfree" ? "Cashfree" : "Razorpay";
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": `Buy the ${plan.name} card | Virnobyte`,
		"description": `Pay online for the Virnobyte ${plan.name} membership card.`,
		"canonical": `/membership/checkout/${plan.id}`,
		"noindex": true,
		"data-astro-cid-6kdq2ipj": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<section class="section" data-astro-cid-6kdq2ipj> <div class="wrap mc-grid" data-astro-cid-6kdq2ipj> <div class="mc-main" data-astro-cid-6kdq2ipj> <a href="/membership" class="back-btn" data-astro-cid-6kdq2ipj>All plans</a> <h1 data-astro-cid-6kdq2ipj>Get the ${plan.name} card</h1> ${!cfg.onlineAvailable ? renderTemplate`<div class="mc-box" data-astro-cid-6kdq2ipj> <p data-astro-cid-6kdq2ipj>Online payment is not available right now. Request the card and pay at our counter or during the first visit.</p> <form method="post" action="/api/membership" data-astro-cid-6kdq2ipj> <input type="hidden" name="plan_id"${addAttribute(plan.id, "value")} data-astro-cid-6kdq2ipj> <input type="hidden" name="request" value="1" data-astro-cid-6kdq2ipj> <button class="btn" type="submit" data-astro-cid-6kdq2ipj>Request the ${plan.name} card</button> </form> </div>` : renderTemplate`<form id="mc-form" class="mc-box" novalidate data-astro-cid-6kdq2ipj> <input type="hidden" name="planId"${addAttribute(plan.id, "value")} data-astro-cid-6kdq2ipj> <h2 data-astro-cid-6kdq2ipj>Card holder &amp; service address</h2> <p class="small muted" data-astro-cid-6kdq2ipj>The name is printed on your card. The address is where our technicians come for doorstep visits.</p> <div class="mc-fields" data-astro-cid-6kdq2ipj> <label data-astro-cid-6kdq2ipj>Full name on card<input name="customerName" required autocomplete="name"${addAttribute(user.name, "value")} data-astro-cid-6kdq2ipj></label> <label data-astro-cid-6kdq2ipj>Mobile number<input name="customerPhone" required inputmode="tel" autocomplete="tel"${addAttribute(user.phone, "value")} placeholder="10-digit mobile" data-astro-cid-6kdq2ipj></label> <label class="wide" data-astro-cid-6kdq2ipj>Email<input name="customerEmail" type="email" autocomplete="email"${addAttribute(user.email, "value")} data-astro-cid-6kdq2ipj></label> <label class="wide" data-astro-cid-6kdq2ipj>House / flat, building<input name="addressLine1" required autocomplete="address-line1" data-astro-cid-6kdq2ipj></label> <label class="wide" data-astro-cid-6kdq2ipj>Area, street, landmark<input name="addressLine2" autocomplete="address-line2" data-astro-cid-6kdq2ipj></label> <label data-astro-cid-6kdq2ipj>Pincode<input name="pincode" required inputmode="numeric" maxlength="6" autocomplete="postal-code" data-astro-cid-6kdq2ipj></label> <label data-astro-cid-6kdq2ipj>City<input name="city" value="Pune" autocomplete="address-level2" data-astro-cid-6kdq2ipj></label> <label data-astro-cid-6kdq2ipj>State<input name="state" value="Maharashtra" autocomplete="address-level1" data-astro-cid-6kdq2ipj></label> </div> <p class="mc-error" id="mc-error" role="alert" hidden data-astro-cid-6kdq2ipj></p> <button class="btn btn--block" id="mc-pay" type="submit" data-astro-cid-6kdq2ipj><span data-label data-astro-cid-6kdq2ipj>Pay ${inr(plan.price)} securely</span></button> <p class="small muted" data-astro-cid-6kdq2ipj>Pay by UPI, card, NetBanking or wallet via ${gatewayName}. Your card is activated and ${num(plan.coins)} ${s.coins.name} are credited as soon as the payment succeeds. A GST invoice is issued automatically.</p> </form>`} </div> <aside class="mc-side" data-astro-cid-6kdq2ipj> ${renderComponent($$result, "MembershipCard", $$MembershipCard, {
		"planName": plan.name,
		"from": plan.card_from,
		"to": plan.card_to,
		"text": plan.card_text,
		"pattern": plan.card_pattern,
		"coins": plan.coins,
		"holder": user.name,
		"data-astro-cid-6kdq2ipj": true
	})} <dl class="mc-sum" data-astro-cid-6kdq2ipj> <div data-astro-cid-6kdq2ipj><dt data-astro-cid-6kdq2ipj>${plan.name} membership · ${Math.round(plan.validity_days / 30.4)} months</dt><dd data-astro-cid-6kdq2ipj>${inr(plan.mrp > plan.price ? plan.mrp : plan.price)}</dd></div> ${plan.mrp > plan.price && renderTemplate`<div data-astro-cid-6kdq2ipj><dt data-astro-cid-6kdq2ipj>Discount</dt><dd class="ok" data-astro-cid-6kdq2ipj>− ${inr(plan.mrp - plan.price)}</dd></div>`} <div class="tot" data-astro-cid-6kdq2ipj><dt data-astro-cid-6kdq2ipj>To pay</dt><dd data-astro-cid-6kdq2ipj>${inr(plan.price)}</dd></div> </dl> <ul class="ticks small" data-astro-cid-6kdq2ipj> <li data-astro-cid-6kdq2ipj>${num(plan.coins)} ${s.coins.name} credited on activation</li> <li data-astro-cid-6kdq2ipj>${plan.doorstep_visits} doorstep visits included</li> ${plan.benefits.slice(0, 4).map((b) => renderTemplate`<li data-astro-cid-6kdq2ipj>${b}</li>`)} </ul> </aside> </div> </section> ` })}${renderScript($$result, "C:/Programming section/virnobyte/src/pages/membership/checkout/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Programming section/virnobyte/src/pages/membership/checkout/[id].astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/membership/checkout/[id].astro";
var $$url = "/membership/checkout/[id].html";
//#endregion
//#region \0virtual:astro:page:src/pages/membership/checkout/[id]@_@astro
var page = () => _id__exports;
//#endregion
export { page };
