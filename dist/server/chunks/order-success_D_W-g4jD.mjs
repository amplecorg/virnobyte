import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Icon } from "./Icon_CAVYTX4O.mjs";
import { r as get } from "./db_DQxgWG_z.mjs";
import { t as $$Base } from "./Base_DFqffn11.mjs";
import { t as contactInfo } from "./settings_C_iTiq7V.mjs";
import { a as inr } from "./format_B1bSNQa_.mjs";
//#region src/pages/order-success.astro
var order_success_exports = /* @__PURE__ */ __exportAll({
	default: () => $$OrderSuccess,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$OrderSuccess = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$OrderSuccess;
	const orderId = Astro.url.searchParams.get("order_id");
	if (!orderId) return Astro.redirect("/products", 302);
	const order = get("SELECT * FROM orders WHERE order_id = ?", orderId);
	if (!order) return Astro.redirect("/products", 302);
	const c = contactInfo();
	const isPaid = order.payment_status === "PAID";
	const isCod = order.payment_method === "cod";
	const whatsappTrackUrl = c.whatsappUrl(`Hi ${c.name}, I placed an order on the website! Order ID: ${order.order_id} (${order.product_name}, Amount: ${inr(order.total_amount)}). Please confirm dispatch and technician visit.`);
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": `Order Confirmed: ${order.order_id} | Virnobyte`,
		"description": "Your order has been placed successfully with Virnobyte.",
		"data-astro-cid-x5326zfu": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="fk-success-page" data-astro-cid-x5326zfu> <div class="wrap wrap--narrow" data-astro-cid-x5326zfu> <div class="fk-success-card" data-astro-cid-x5326zfu>  <div class="fk-success-icon-wrap" data-astro-cid-x5326zfu> <div class="fk-checkmark-circle" data-astro-cid-x5326zfu> <span class="fk-checkmark" data-astro-cid-x5326zfu>✓</span> </div> </div> <h1 class="fk-success-heading" data-astro-cid-x5326zfu>Order Placed Successfully!</h1> <p class="fk-success-sub" data-astro-cid-x5326zfu>
Thank you for choosing <strong data-astro-cid-x5326zfu>Virnobyte Assured</strong>. Your order is confirmed and our technician is preparing your system for delivery.
</p>  <div class="fk-order-summary-box" data-astro-cid-x5326zfu> <div class="fk-sum-row" data-astro-cid-x5326zfu> <span class="fk-sum-label" data-astro-cid-x5326zfu>Order Reference ID:</span> <span class="fk-sum-value fk-code" data-astro-cid-x5326zfu>${order.order_id}</span> </div> <div class="fk-sum-row" data-astro-cid-x5326zfu> <span class="fk-sum-label" data-astro-cid-x5326zfu>Item Ordered:</span> <span class="fk-sum-value" data-astro-cid-x5326zfu><strong data-astro-cid-x5326zfu>${order.product_name}</strong> (Qty: ${order.quantity})</span> </div> <div class="fk-sum-row" data-astro-cid-x5326zfu> <span class="fk-sum-label" data-astro-cid-x5326zfu>Total Amount:</span> <span class="fk-sum-value fk-price-val" data-astro-cid-x5326zfu>${inr(order.total_amount)}</span> </div> <div class="fk-sum-row" data-astro-cid-x5326zfu> <span class="fk-sum-label" data-astro-cid-x5326zfu>Payment Mode:</span> <span class="fk-sum-value" data-astro-cid-x5326zfu> ${isPaid ? renderTemplate`<span class="fk-status-pill paid" data-astro-cid-x5326zfu>✓ Paid via Cashfree</span>` : isCod ? renderTemplate`<span class="fk-status-pill cod" data-astro-cid-x5326zfu>🕒 Cash on Delivery (Pay at Doorstep)</span>` : renderTemplate`<span class="fk-status-pill pending" data-astro-cid-x5326zfu>⏳ Payment Pending</span>`} </span> </div> <div class="fk-sum-row" data-astro-cid-x5326zfu> <span class="fk-sum-label" data-astro-cid-x5326zfu>Estimated Delivery:</span> <span class="fk-sum-value fk-green-val" data-astro-cid-x5326zfu>🚚 Tomorrow by 6:00 PM (Doorstep Setup &amp; Testing)</span> </div> <div class="fk-sum-row" data-astro-cid-x5326zfu> <span class="fk-sum-label" data-astro-cid-x5326zfu>Delivering To:</span> <span class="fk-sum-value fk-address-val" data-astro-cid-x5326zfu> ${order.customer_name} (${order.customer_phone})<br data-astro-cid-x5326zfu> ${order.address_line1}, ${order.address_line2 ? order.address_line2 + ", " : ""}${order.city} - ${order.pincode} (${order.state})
</span> </div> </div>  <div class="fk-next-steps" data-astro-cid-x5326zfu> <h3 data-astro-cid-x5326zfu>What happens next?</h3> <ol data-astro-cid-x5326zfu> <li data-astro-cid-x5326zfu><strong data-astro-cid-x5326zfu>35-Point Diagnostic:</strong> Our technician runs hardware burn-in benchmarks, checks all ports, and prepares genuine OS &amp; software.</li> <li data-astro-cid-x5326zfu><strong data-astro-cid-x5326zfu>Doorstep Arrival:</strong> We dispatch your order in safe anti-static packaging directly to your doorstep.</li> <li data-astro-cid-x5326zfu><strong data-astro-cid-x5326zfu>On-Site Setup:</strong> Our engineer unboxes, powers on, and tests your hardware in front of you.</li> </ol> </div>  <div class="fk-success-actions" data-astro-cid-x5326zfu> <a${addAttribute(whatsappTrackUrl, "href")} target="_blank" rel="noopener" class="fk-btn-track-wa" data-astro-cid-x5326zfu> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "whatsapp",
		"size": 20,
		"data-astro-cid-x5326zfu": true
	})} <span data-astro-cid-x5326zfu>Track Order on WhatsApp</span> </a> <a href="/products" class="fk-btn-continue" data-astro-cid-x5326zfu> <span data-astro-cid-x5326zfu>Continue Shopping</span> <span data-astro-cid-x5326zfu>➔</span> </a> </div> </div> </div> </div> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/order-success.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/order-success.astro";
var $$url = "/order-success.html";
//#endregion
//#region \0virtual:astro:page:src/pages/order-success@_@astro
var page = () => order_success_exports;
//#endregion
export { page };
