import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as renderScript } from "./Icon_CCv9Ixst.mjs";
import { l as userFromCookies } from "./auth_CSZwb3EQ.mjs";
import { a as inr } from "./format_6aaLy6w7.mjs";
import { t as $$Base } from "./Base_BQ2Y903t.mjs";
import { o as getCart, u as getPaymentConfig } from "./cart_DNQqdeQo.mjs";
//#region src/pages/cart.astro
var cart_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Cart,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Cart = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Cart;
	const user = Astro.locals.user || userFromCookies(Astro.cookies);
	const secure = Astro.url.protocol === "https:" || Astro.request.headers.get("x-forwarded-proto") === "https";
	const cart = getCart(Astro.cookies, user, secure);
	const { lines, totals } = cart;
	const cfg = getPaymentConfig();
	const toFreeDelivery = totals.deliveryFee > 0 ? cfg.minFreeDelivery - totals.subtotal : 0;
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Your Cart | Virnobyte",
		"description": "Review the items in your Virnobyte cart before checkout.",
		"canonical": "/cart",
		"noindex": true,
		"data-astro-cid-suuixics": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="vc-page" data-astro-cid-suuixics> <div class="wrap" data-astro-cid-suuixics>  <div id="vc-root"${addAttribute(cart.count, "data-count")} data-astro-cid-suuixics> ${lines.length === 0 ? renderTemplate`<div class="vc-empty" data-astro-cid-suuixics> <div class="vc-empty-icon" aria-hidden="true" data-astro-cid-suuixics>🛒</div> <h1 data-astro-cid-suuixics>Your cart is empty</h1> <p data-astro-cid-suuixics>Browse laptops, desktops, CCTV kits and accessories — every product is tested before delivery.</p> <a class="vc-btn-primary" href="/products" data-astro-cid-suuixics>Shop Products</a> </div>` : renderTemplate`<div class="vc-grid" data-astro-cid-suuixics> <section class="vc-main" aria-label="Cart items" data-astro-cid-suuixics> <header class="vc-head" data-astro-cid-suuixics> <h1 data-astro-cid-suuixics>My Cart <span data-astro-cid-suuixics>(${cart.count} item${cart.count === 1 ? "" : "s"})</span></h1> <a href="/products" data-astro-cid-suuixics>Continue shopping</a> </header> <ul class="vc-list" data-astro-cid-suuixics> ${lines.map((l) => renderTemplate`<li${addAttribute(["vc-line", { "vc-line--off": !l.available }], "class:list")} data-astro-cid-suuixics> <a class="vc-thumb"${addAttribute(`/products/${l.slug}`, "href")} data-astro-cid-suuixics> <img${addAttribute(l.image, "src")} alt="" loading="lazy" data-astro-cid-suuixics> </a> <div class="vc-info" data-astro-cid-suuixics> <a class="vc-name"${addAttribute(`/products/${l.slug}`, "href")} data-astro-cid-suuixics>${l.name}</a> <span class="vc-cat" data-astro-cid-suuixics>${l.category}</span> ${l.available ? renderTemplate`<div class="vc-price-row" data-astro-cid-suuixics> <span class="vc-price" data-astro-cid-suuixics>${inr(l.lineTotal)}</span> ${l.mrp > l.unitPrice && renderTemplate`<span class="vc-mrp" data-astro-cid-suuixics>${inr(l.mrp * l.quantity)}</span>`} ${l.mrp > l.unitPrice && renderTemplate`<span class="vc-off" data-astro-cid-suuixics>${Math.round((l.mrp - l.unitPrice) / l.mrp * 100)}% off</span>`} ${l.quantity > 1 && renderTemplate`<span class="vc-each" data-astro-cid-suuixics>${inr(l.unitPrice)} each</span>`} </div>` : renderTemplate`<p class="vc-unavailable" data-astro-cid-suuixics>${l.unavailableReason}</p>`} <div class="vc-controls" data-astro-cid-suuixics> ${l.available && renderTemplate`<div class="vc-qty" role="group"${addAttribute(`Quantity for ${l.name}`, "aria-label")} data-astro-cid-suuixics> <button type="button"${addAttribute(l.quantity - 1, "data-cart-qty")}${addAttribute(l.productId, "data-product")} aria-label="Decrease quantity"${addAttribute(l.quantity <= 1, "disabled")} data-astro-cid-suuixics>−</button> <span aria-live="polite" data-astro-cid-suuixics>${l.quantity}</span> <button type="button"${addAttribute(l.quantity + 1, "data-cart-qty")}${addAttribute(l.productId, "data-product")} aria-label="Increase quantity"${addAttribute(l.quantity >= 10, "disabled")} data-astro-cid-suuixics>+</button> </div>`} <button type="button" class="vc-remove" data-cart-qty="0"${addAttribute(l.productId, "data-product")} data-astro-cid-suuixics>REMOVE</button> </div> </div> </li>`)} </ul> <div class="vc-place" data-astro-cid-suuixics> ${totals.itemCount > 0 ? user ? renderTemplate`<a class="vc-btn-primary" href="/checkout" data-astro-cid-suuixics>PLACE ORDER</a>` : renderTemplate`<div class="vc-place-login-wrap" data-astro-cid-suuixics> <a class="vc-btn-primary" href="/account/login?next=/checkout" data-astro-cid-suuixics>SIGN IN TO PLACE ORDER</a> <span class="vc-auth-notice" data-astro-cid-suuixics>🔒 Sign in required to order</span> </div>` : renderTemplate`<span class="vc-btn-primary vc-btn-disabled" data-astro-cid-suuixics>PLACE ORDER</span>`} </div> </section> <aside class="vc-side" aria-label="Price details" data-astro-cid-suuixics> <div class="vc-card" data-astro-cid-suuixics> <h2 data-astro-cid-suuixics>PRICE DETAILS</h2> <dl data-astro-cid-suuixics> <div data-astro-cid-suuixics> <dt data-astro-cid-suuixics>Price (${totals.itemCount} item${totals.itemCount === 1 ? "" : "s"})</dt> <dd data-astro-cid-suuixics>${inr(totals.mrpTotal)}</dd> </div> ${totals.discount > 0 && renderTemplate`<div data-astro-cid-suuixics> <dt data-astro-cid-suuixics>Discount</dt> <dd class="vc-green" data-astro-cid-suuixics>− ${inr(totals.discount)}</dd> </div>`} <div data-astro-cid-suuixics> <dt data-astro-cid-suuixics>Delivery Charges</dt> ${totals.deliveryFee > 0 ? renderTemplate`<dd data-astro-cid-suuixics>${inr(totals.deliveryFee)}</dd>` : renderTemplate`<dd class="vc-green" data-astro-cid-suuixics>FREE</dd>`} </div> <div class="vc-total" data-astro-cid-suuixics> <dt data-astro-cid-suuixics>Total Amount</dt> <dd data-astro-cid-suuixics>${inr(totals.total)}</dd> </div> </dl> ${totals.discount > 0 && renderTemplate`<p class="vc-save" data-astro-cid-suuixics>You will save ${inr(totals.discount)} on this order</p>`} ${toFreeDelivery > 0 && renderTemplate`<p class="vc-hint" data-astro-cid-suuixics>Add ${inr(toFreeDelivery)} more for free delivery.</p>`} ${cart.hasUnavailable && renderTemplate`<p class="vc-hint" data-astro-cid-suuixics>Unavailable items are not included in the total.</p>`} </div> <p class="vc-secure" data-astro-cid-suuixics>🛡️ Safe and secure payments. 100% authentic products with a 7-day replacement guarantee.</p> </aside> </div>`} </div> <p class="vc-error" id="vc-error" role="alert" data-astro-cid-suuixics></p> </div> </div> ` })}${renderScript($$result, "C:/Programming section/virnobyte/src/pages/cart.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Programming section/virnobyte/src/pages/cart.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/cart.astro";
var $$url = "/cart.html";
//#endregion
//#region \0virtual:astro:page:src/pages/cart@_@astro
var page = () => cart_exports;
//#endregion
export { page };
