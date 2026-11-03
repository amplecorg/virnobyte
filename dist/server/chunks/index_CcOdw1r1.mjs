import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Icon } from "./Icon_CAVYTX4O.mjs";
import { t as $$Base } from "./Base_DFqffn11.mjs";
import { n as getSettings, t as contactInfo } from "./settings_C_iTiq7V.mjs";
import { a as coinBalance, o as coinHistory, s as currentMembership } from "./data_D0xPvenu.mjs";
import { r as formatDate, s as num } from "./format_B1bSNQa_.mjs";
import { t as $$MembershipCard } from "./MembershipCard_1TdByYI4.mjs";
//#region src/pages/account/index.astro
var account_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const user = Astro.locals.user;
	if (user.role === "admin") return Astro.redirect("/admin");
	const s = getSettings();
	const c = contactInfo(s);
	const m = currentMembership(user.id);
	const balance = coinBalance(user.id);
	const history = coinHistory(user.id);
	const visitsLeft = m ? Math.max(0, m.plan.doorstep_visits - m.visits_used) : 0;
	const requested = Astro.url.searchParams.get("requested");
	const STATUS = {
		pending: "Awaiting activation",
		active: "Active",
		expired: "Expired",
		cancelled: "Cancelled"
	};
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "My account | Virnobyte",
		"description": "Your Virnobyte membership card, coin balance and service visits.",
		"noindex": true,
		"data-astro-cid-6hujh7qn": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<section class="section" data-astro-cid-6hujh7qn> <div class="wrap acct" data-astro-cid-6hujh7qn> <header class="head" data-astro-cid-6hujh7qn> <div data-astro-cid-6hujh7qn> <span class="eyebrow" data-astro-cid-6hujh7qn>My account</span> <h1 data-astro-cid-6hujh7qn>Hello, ${user.name.split(" ")[0]}</h1> </div> <form method="post" action="/account/logout" data-astro-cid-6hujh7qn> <button class="btn btn--ghost btn--sm" type="submit" data-astro-cid-6hujh7qn>${renderComponent($$result, "Icon", $$Icon, {
		"name": "logout",
		"data-astro-cid-6hujh7qn": true
	})} Sign out</button> </form> </header> ${requested && renderTemplate`<p class="alert alert--ok" role="status" data-astro-cid-6hujh7qn>Your card request has been sent. We will call you on ${user.phone || "your number"} to confirm and activate it.</p>`} ${m ? renderTemplate`<div class="grid-a" data-astro-cid-6hujh7qn> <div class="card-col" data-astro-cid-6hujh7qn> ${renderComponent($$result, "MembershipCard", $$MembershipCard, {
		"planName": m.plan.name,
		"from": m.plan.card_from,
		"to": m.plan.card_to,
		"text": m.plan.card_text,
		"pattern": m.plan.card_pattern,
		"holder": user.name,
		"number": m.card_number,
		"validThru": m.end_date,
		"coins": balance,
		"status": m.status,
		"data-astro-cid-6hujh7qn": true
	})} <p class="small muted" data-astro-cid-6hujh7qn>${s.card.terms}</p> </div> <dl class="stats" data-astro-cid-6hujh7qn> <div data-astro-cid-6hujh7qn> <dt data-astro-cid-6hujh7qn>${s.coins.name}</dt> <dd data-astro-cid-6hujh7qn>${num(balance)}</dd> <span class="small muted" data-astro-cid-6hujh7qn>Worth ₹${num(balance * s.coins.valueInr)}</span> </div> <div data-astro-cid-6hujh7qn> <dt data-astro-cid-6hujh7qn>Doorstep visits left</dt> <dd data-astro-cid-6hujh7qn>${m.status === "active" ? `${visitsLeft} of ${m.plan.doorstep_visits}` : "—"}</dd> </div> <div data-astro-cid-6hujh7qn> <dt data-astro-cid-6hujh7qn>Status</dt> <dd data-astro-cid-6hujh7qn>${STATUS[m.status]}</dd> ${m.end_date && renderTemplate`<span class="small muted" data-astro-cid-6hujh7qn>${m.status === "expired" ? "Expired" : "Valid until"} ${formatDate(m.end_date)}</span>`} </div> <div data-astro-cid-6hujh7qn> <dt data-astro-cid-6hujh7qn>Plan</dt> <dd data-astro-cid-6hujh7qn>${m.plan.name}</dd> <a class="small" href="/membership" data-astro-cid-6hujh7qn>See plan benefits</a> </div> </dl> </div>` : renderTemplate`<div class="card empty" data-astro-cid-6hujh7qn> <h2 data-astro-cid-6hujh7qn>You don't have a membership card yet</h2> <p class="muted" data-astro-cid-6hujh7qn>Members get a year of free service labour, repair discounts, doorstep visits and ${s.coins.name} on their card.</p> <a class="btn" href="/membership" data-astro-cid-6hujh7qn>Choose a plan</a> </div>`} <section class="card" aria-labelledby="hist-h" data-astro-cid-6hujh7qn> <h2 id="hist-h" class="h-sm" data-astro-cid-6hujh7qn>Coin history</h2> ${history.length ? renderTemplate`<table class="ledger" data-astro-cid-6hujh7qn> <thead data-astro-cid-6hujh7qn> <tr data-astro-cid-6hujh7qn><th scope="col" data-astro-cid-6hujh7qn>Date</th><th scope="col" data-astro-cid-6hujh7qn>Details</th><th scope="col" class="r" data-astro-cid-6hujh7qn>Coins</th></tr> </thead> <tbody data-astro-cid-6hujh7qn> ${history.map((h) => renderTemplate`<tr data-astro-cid-6hujh7qn> <td data-astro-cid-6hujh7qn>${formatDate(h.created_at)}</td> <td data-astro-cid-6hujh7qn>${h.reason}</td> <td${addAttribute(["r", h.delta > 0 ? "plus" : "minus"], "class:list")} data-astro-cid-6hujh7qn>${h.delta > 0 ? "+" : "−"}${num(Math.abs(h.delta))}</td> </tr>`)} </tbody> </table>` : renderTemplate`<p class="muted" data-astro-cid-6hujh7qn>No coin activity yet. Coins appear here when your card is activated.</p>`} </section> <section class="card help" data-astro-cid-6hujh7qn> <h2 class="h-sm" data-astro-cid-6hujh7qn>Need a technician?</h2> <p class="muted" data-astro-cid-6hujh7qn>Book a doorstep visit or bring your device to our ${c.locality} workshop. Mention your card number.</p> <div class="btn-row" data-astro-cid-6hujh7qn> <a class="btn" href="/contact#book" data-astro-cid-6hujh7qn>Book a Service</a> <a class="btn btn--ghost"${addAttribute(c.whatsappUrl(m ? `Hi, I'm a member (card ${m.card_number}). I need help with` : void 0), "href")} rel="noopener" target="_blank" data-astro-cid-6hujh7qn>${renderComponent($$result, "Icon", $$Icon, {
		"name": "whatsapp",
		"data-astro-cid-6hujh7qn": true
	})} WhatsApp</a> </div> </section> </div> </section> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/account/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/account/index.astro";
var $$url = "/account.html";
//#endregion
//#region \0virtual:astro:page:src/pages/account/index@_@astro
var page = () => account_exports;
//#endregion
export { page };
