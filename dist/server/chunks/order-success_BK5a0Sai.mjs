import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as renderScript } from "./script_BaVSnVKi.mjs";
import { t as contactInfo } from "./settings_C74a6Mrw.mjs";
import { a as inr } from "./format_6aaLy6w7.mjs";
import { t as reconcileOrder } from "./checkout_DN7LKdrE.mjs";
import { o as getCart } from "./cart_CxOmW9DG.mjs";
import { s as ensureInvoiceNumber } from "./otp_9Z-S2uDl.mjs";
import { o as orderItems } from "./orders_CyaozYjD.mjs";
import { t as $$Base } from "./Base_ac1XVCJk.mjs";
import { t as $$Icon } from "./Icon_DmevXm4a.mjs";
//#region src/pages/order-success.astro
var order_success_exports = /* @__PURE__ */ __exportAll({
	default: () => $$OrderSuccess,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$OrderSuccess = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$OrderSuccess;
	const orderId = Astro.url.searchParams.get("order_id");
	if (!orderId) return Astro.redirect("/products", 302);
	const order = await reconcileOrder(orderId).catch(() => void 0);
	if (!order) return Astro.redirect("/products", 302);
	const user = Astro.locals.user;
	if (order.user_id && (!user || user.id !== order.user_id && user.role !== "admin")) return Astro.redirect(`/account/login?next=${encodeURIComponent(Astro.url.pathname + Astro.url.search)}`, 302);
	if (order.order_status === "AWAITING_OTP") return Astro.redirect(`/order-verify?order_id=${encodeURIComponent(order.order_id)}`, 302);
	const items = orderItems(order.id);
	const c = contactInfo();
	const isPaid = order.payment_status === "PAID";
	const isCod = order.payment_method === "cod";
	const isCancelled = order.order_status === "CANCELLED";
	const awaitingPayment = !isPaid && !isCod && !isCancelled && order.payment_status === "PENDING";
	const confirmed = (isPaid || isCod) && !isCancelled;
	const invoiceNo = confirmed ? order.invoice_no || ensureInvoiceNumber(order.order_id) : "";
	const invoiceHref = `/account/invoice/${encodeURIComponent(order.order_id)}`;
	const gatewayLabel = order.gateway === "cashfree" ? "Cashfree" : order.gateway === "razorpay" ? "Razorpay" : "online payment";
	const secure = Astro.url.protocol === "https:" || Astro.request.headers.get("x-forwarded-proto") === "https";
	getCart(Astro.cookies, Astro.locals.user, secure);
	const whatsappTrackUrl = c.whatsappUrl(`Hi ${c.name}, I placed an order on the website. Order ID: ${order.order_id} (Amount: ${inr(order.total_amount)}). Please confirm dispatch and technician visit.`);
	const heading = confirmed ? "Order Placed Successfully!" : awaitingPayment ? "Payment Pending" : isCancelled ? "Order Cancelled" : "Payment Not Completed";
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": `${confirmed ? "Order Confirmed" : "Order"}: ${order.order_id} | Virnobyte`,
		"description": "Your Virnobyte order details and payment status.",
		"noindex": true,
		"data-astro-cid-x5326zfu": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="fk-success-page" data-astro-cid-x5326zfu> <div class="wrap wrap--narrow" data-astro-cid-x5326zfu> <div class="fk-success-card" data-astro-cid-x5326zfu> <div class="fk-success-icon-wrap" data-astro-cid-x5326zfu> <div${addAttribute(["fk-checkmark-circle", { "fk-checkmark-circle--wait": !confirmed }], "class:list")} data-astro-cid-x5326zfu> <span class="fk-checkmark" data-astro-cid-x5326zfu>${confirmed ? "✓" : "!"}</span> </div> </div> <h1 class="fk-success-heading" data-astro-cid-x5326zfu>${heading}</h1> ${confirmed && order.kind === "membership" ? renderTemplate`<p class="fk-success-sub" data-astro-cid-x5326zfu>
Payment received. Your <strong data-astro-cid-x5326zfu>${order.product_name}</strong> is now <strong data-astro-cid-x5326zfu>active</strong> and your welcome coins are on it.
            See it in <a href="/account" data-astro-cid-x5326zfu>your account</a>.
</p>` : confirmed ? renderTemplate`<p class="fk-success-sub" data-astro-cid-x5326zfu>
Thank you for choosing <strong data-astro-cid-x5326zfu>Virnobyte Assured</strong>. Your order is confirmed and our technician is preparing it for delivery.
</p>` : awaitingPayment ? renderTemplate`<p class="fk-success-sub" data-astro-cid-x5326zfu>
Your order is saved but <strong data-astro-cid-x5326zfu>not yet confirmed</strong> — we have not received the payment. Complete the payment below to confirm it.
            If money was already debited, this page updates once the bank confirms.
</p>` : renderTemplate`<p class="fk-success-sub" data-astro-cid-x5326zfu>This order is not active. Please contact us if you need help or want to order again.</p>`} ${awaitingPayment && renderTemplate`<div class="fk-pay-now" data-astro-cid-x5326zfu> <button type="button" class="fk-btn-pay-now" id="fk-pay-now"${addAttribute(order.order_id, "data-order")} data-astro-cid-x5326zfu>
Complete Payment • ${inr(order.total_amount)} </button> <p class="fk-pay-now-error" id="fk-pay-now-error" role="alert" data-astro-cid-x5326zfu></p> </div>`}  <div class="fk-order-summary-box" data-astro-cid-x5326zfu> <div class="fk-sum-row" data-astro-cid-x5326zfu> <span class="fk-sum-label" data-astro-cid-x5326zfu>Order Reference ID:</span> <span class="fk-sum-value fk-code" data-astro-cid-x5326zfu>${order.order_id}</span> </div> <div class="fk-sum-row" data-astro-cid-x5326zfu> <span class="fk-sum-label" data-astro-cid-x5326zfu>${items.length > 1 ? `Items Ordered (${items.length}):` : "Item Ordered:"}</span> <span class="fk-sum-value" data-astro-cid-x5326zfu> ${items.length > 0 ? renderTemplate`<ul class="fk-sum-items" data-astro-cid-x5326zfu> ${items.map((it) => renderTemplate`<li data-astro-cid-x5326zfu> <span data-astro-cid-x5326zfu><strong data-astro-cid-x5326zfu>${it.product_name}</strong> × ${it.quantity}</span> <span data-astro-cid-x5326zfu>${inr(it.line_total)}</span> </li>`)} </ul>` : renderTemplate`<span data-astro-cid-x5326zfu><strong data-astro-cid-x5326zfu>${order.product_name}</strong> (Qty: ${order.quantity})</span>`} </span> </div> ${order.delivery_fee > 0 && renderTemplate`<div class="fk-sum-row" data-astro-cid-x5326zfu> <span class="fk-sum-label" data-astro-cid-x5326zfu>Delivery Charges:</span> <span class="fk-sum-value" data-astro-cid-x5326zfu>${inr(order.delivery_fee)}</span> </div>`} ${order.coin_discount > 0 && renderTemplate`<div class="fk-sum-row" data-astro-cid-x5326zfu> <span class="fk-sum-label" data-astro-cid-x5326zfu>Paid with Virno Coins (${order.coins_used}):</span> <span class="fk-sum-value" style="color:#388e3c" data-astro-cid-x5326zfu>− ${inr(order.coin_discount)}</span> </div>`} <div class="fk-sum-row" data-astro-cid-x5326zfu> <span class="fk-sum-label" data-astro-cid-x5326zfu>Total Amount:</span> <span class="fk-sum-value fk-price-val" data-astro-cid-x5326zfu>${inr(order.total_amount)}</span> </div> <div class="fk-sum-row" data-astro-cid-x5326zfu> <span class="fk-sum-label" data-astro-cid-x5326zfu>Payment Mode:</span> <span class="fk-sum-value" data-astro-cid-x5326zfu> ${isPaid ? renderTemplate`<span class="fk-status-pill paid" data-astro-cid-x5326zfu>✓ Paid via ${gatewayLabel}</span>` : isCod ? renderTemplate`<span class="fk-status-pill cod" data-astro-cid-x5326zfu>🕒 Cash on Delivery (Pay at Doorstep)</span>` : renderTemplate`<span class="fk-status-pill pending" data-astro-cid-x5326zfu>⏳ Payment Pending</span>`} </span> </div> ${confirmed && renderTemplate`<div class="fk-sum-row" data-astro-cid-x5326zfu> <span class="fk-sum-label" data-astro-cid-x5326zfu>Estimated Delivery:</span> <span class="fk-sum-value fk-green-val" data-astro-cid-x5326zfu>🚚 Tomorrow by 6:00 PM (Doorstep Setup &amp; Testing)</span> </div>`} <div class="fk-sum-row" data-astro-cid-x5326zfu> <span class="fk-sum-label" data-astro-cid-x5326zfu>Delivering To:</span> <span class="fk-sum-value fk-address-val" data-astro-cid-x5326zfu> ${order.customer_name} (${order.customer_phone})<br data-astro-cid-x5326zfu> ${order.address_line1}, ${order.address_line2 ? order.address_line2 + ", " : ""}${order.city} - ${order.pincode} (${order.state})
</span> </div> </div> ${confirmed && renderTemplate`<div class="fk-next-steps" data-astro-cid-x5326zfu> <h3 data-astro-cid-x5326zfu>What happens next?</h3> <ol data-astro-cid-x5326zfu> <li data-astro-cid-x5326zfu><strong data-astro-cid-x5326zfu>35-Point Diagnostic:</strong> Our technician runs hardware burn-in benchmarks, checks all ports, and prepares genuine OS &amp; software.</li> <li data-astro-cid-x5326zfu><strong data-astro-cid-x5326zfu>Doorstep Arrival:</strong> We dispatch your order in safe anti-static packaging directly to your doorstep.</li> <li data-astro-cid-x5326zfu><strong data-astro-cid-x5326zfu>On-Site Setup:</strong> Our engineer unboxes, powers on, and tests your hardware in front of you.</li> </ol> </div>`}  <div class="fk-success-actions" data-astro-cid-x5326zfu> ${invoiceNo && renderTemplate`<a${addAttribute(invoiceHref, "href")} class="fk-btn-invoice" target="_blank" rel="noopener" data-astro-cid-x5326zfu> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "receipt",
		"size": 20,
		"data-astro-cid-x5326zfu": true
	})} <span data-astro-cid-x5326zfu>Tax Invoice <small data-astro-cid-x5326zfu>${invoiceNo}</small></span> </a>`} <a${addAttribute(whatsappTrackUrl, "href")} target="_blank" rel="noopener" class="fk-btn-track-wa" data-astro-cid-x5326zfu> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "whatsapp",
		"size": 20,
		"data-astro-cid-x5326zfu": true
	})} <span data-astro-cid-x5326zfu>Track Order on WhatsApp</span> </a> <a href="/products" class="fk-btn-continue" data-astro-cid-x5326zfu> <span data-astro-cid-x5326zfu>Continue Shopping</span> <span data-astro-cid-x5326zfu>➔</span> </a> </div> </div> </div> </div> ` })}${renderScript($$result, "C:/Programming section/virnobyte/src/pages/order-success.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Programming section/virnobyte/src/pages/order-success.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/order-success.astro";
var $$url = "/order-success.html";
//#endregion
//#region \0virtual:astro:page:src/pages/order-success@_@astro
var page = () => order_success_exports;
//#endregion
export { page };
