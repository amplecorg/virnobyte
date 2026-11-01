import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as getSettings } from "./settings_DhHzJVWR.mjs";
import { i as groupCardNumber, s as num, t as cardExpiry } from "./format_B1bSNQa_.mjs";
//#region src/components/MembershipCard.astro
createAstro("https://virnobyte.com");
var $$MembershipCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$MembershipCard;
	const s = getSettings();
	const { planName, from, to, text = "#ffffff", pattern = "circuit", holder = "Your name", number = `${s.card.prefix}00 0000 0000`, validThru = null, coins = 0, status = "sample", live = false, class: cls } = Astro.props;
	const statusLabel = {
		pending: "Awaiting activation",
		expired: "Expired",
		cancelled: "Cancelled"
	};
	return renderTemplate`${maybeRenderHead($$result)}<div${addAttribute([
		"vcard",
		`pattern-${pattern}`,
		`status-${status}`,
		cls
	], "class:list")}${addAttribute(`--from:${from};--to:${to};--fg:${text}`, "style")}${addAttribute(live ? "" : void 0, "data-card")} role="img"${addAttribute(`${s.business.name} ${planName} membership card${status !== "sample" ? `, ${num(coins)} ${s.coins.name}` : ""}`, "aria-label")} data-astro-cid-6iyi3csp> <div class="face" data-astro-cid-6iyi3csp> <svg class="traces" viewBox="0 0 400 252" preserveAspectRatio="xMidYMid slice" aria-hidden="true" data-astro-cid-6iyi3csp> <g fill="none" stroke="currentColor" stroke-width="1.2" data-astro-cid-6iyi3csp> <path d="M-10 40h120l20 20h90l16-16h180" data-astro-cid-6iyi3csp></path> <path d="M-10 70h70l18 18h70" data-astro-cid-6iyi3csp></path> <path d="M250 252v-60l22-22h140" data-astro-cid-6iyi3csp></path> <path d="M300 252v-38l14-14h96" data-astro-cid-6iyi3csp></path> <path d="M150 252v-30l-16-16H80l-14-14H-10" data-astro-cid-6iyi3csp></path> <path d="M330 -10v52l18 18h62" data-astro-cid-6iyi3csp></path> </g> <g fill="currentColor" data-astro-cid-6iyi3csp> <circle cx="130" cy="60" r="3" data-astro-cid-6iyi3csp></circle><circle cx="236" cy="44" r="3" data-astro-cid-6iyi3csp></circle><circle cx="128" cy="88" r="3" data-astro-cid-6iyi3csp></circle> <circle cx="272" cy="170" r="3" data-astro-cid-6iyi3csp></circle><circle cx="314" cy="200" r="3" data-astro-cid-6iyi3csp></circle><circle cx="134" cy="206" r="3" data-astro-cid-6iyi3csp></circle> <circle cx="348" cy="60" r="3" data-astro-cid-6iyi3csp></circle> </g> </svg> <div class="row top" data-astro-cid-6iyi3csp> <span class="issuer" data-astro-cid-6iyi3csp> <img src="/virnobyte-logo-white.png" alt="" width="30" height="23" loading="lazy" data-astro-cid-6iyi3csp> ${s.business.name} </span> <div class="plan-wrap" data-astro-cid-6iyi3csp> <span class="plan" data-f="name" data-astro-cid-6iyi3csp>${planName}</span> ${statusLabel[status] && renderTemplate`<span class="ribbon" data-astro-cid-6iyi3csp>${statusLabel[status]}</span>`} </div> </div> <div class="row mid" data-astro-cid-6iyi3csp> <span class="chip" aria-hidden="true" data-astro-cid-6iyi3csp><i data-astro-cid-6iyi3csp></i><i data-astro-cid-6iyi3csp></i><i data-astro-cid-6iyi3csp></i></span> <span class="coins" data-astro-cid-6iyi3csp> <span class="coin" aria-hidden="true" data-astro-cid-6iyi3csp>V</span> <span data-astro-cid-6iyi3csp> <b data-f="coins" data-astro-cid-6iyi3csp>${num(coins)}</b> <small data-astro-cid-6iyi3csp>${s.coins.name}</small> </span> </span> </div> <div class="number" data-f="number" data-astro-cid-6iyi3csp>${groupCardNumber(number)}</div> <div class="row bottom" data-astro-cid-6iyi3csp> <span class="holder" data-astro-cid-6iyi3csp> <small data-astro-cid-6iyi3csp>Member</small> <span data-f="holder" data-astro-cid-6iyi3csp>${holder}</span> </span> <span class="valid" data-astro-cid-6iyi3csp> <small data-astro-cid-6iyi3csp>Valid thru</small> <span data-f="valid" data-astro-cid-6iyi3csp>${cardExpiry(validThru)}</span> </span> </div> </div> </div>`;
}, "C:/Programming section/virnobyte/src/components/MembershipCard.astro", void 0);
//#endregion
export { $$MembershipCard as t };
