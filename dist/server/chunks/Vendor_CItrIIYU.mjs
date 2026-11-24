import { A as renderTemplate, D as renderSlot, M as renderHead, N as addAttribute, V as createAstro } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as renderScript } from "./script_BaVSnVKi.mjs";
/* empty css                 */
/* empty css                */
/* empty css                    */
//#region src/layouts/Vendor.astro
createAstro("https://virnobyte.com");
var $$Vendor = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Vendor;
	const { title, vendorName, active, toShip = 0 } = Astro.props;
	const NAV = [
		{
			key: "home",
			href: "/vendor",
			label: "Home"
		},
		{
			key: "orders",
			href: "/vendor/orders",
			label: "Orders",
			badge: toShip
		},
		{
			key: "inventory",
			href: "/vendor/inventory",
			label: "Inventory"
		}
	];
	return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><meta name="referrer" content="no-referrer"><title>${title} · Virnobyte Seller Hub</title><link rel="icon" href="/favicon.ico">${renderHead($$result)}</head> <body class="admin seller"> <header class="sh-top"> <a class="sh-brand" href="/vendor"> <img src="/virnobyte-logo-white.png" alt="" width="34" height="27"> <span>Virnobyte <b>Seller Hub</b></span> </a> ${vendorName && renderTemplate`<nav class="sh-nav" aria-label="Seller Hub"> ${NAV.map((n) => renderTemplate`<a${addAttribute(n.href, "href")}${addAttribute(active === n.key ? "page" : void 0, "aria-current")}> ${n.label} ${n.badge ? renderTemplate`<span class="sh-badge">${n.badge}</span>` : null} </a>`)} </nav>`} ${vendorName && renderTemplate`<div class="sh-me"> <span class="sh-me-name">${vendorName}</span> <form method="post" action="/vendor/logout"> <button class="sh-signout" type="submit">Sign out</button> </form> </div>`} </header> <main class="sh-main inv"> ${vendorName ? renderTemplate`${renderSlot($$result, $$slots["default"])}` : renderTemplate`<section class="sh-card sh-signin"> <h1>Please open your Seller Hub link</h1> <p>Your Seller Hub opens from the private link Virnobyte sent you on WhatsApp or email. If you lost it, ask Virnobyte for a new one.</p> </section>`} </main>${renderScript($$result, "C:/Programming section/virnobyte/src/layouts/Vendor.astro?astro&type=script&index=0&lang.ts")}</body> </html>`;
}, "C:/Programming section/virnobyte/src/layouts/Vendor.astro", void 0);
//#endregion
export { $$Vendor as t };
