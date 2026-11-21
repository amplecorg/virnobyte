import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { a as markOrderPaid, r as getOrder } from "./orders_wTHzsAQs.mjs";
import { i as readJson, r as json } from "./http_B1Mo43QL.mjs";
import { t as reconcileOrder } from "./checkout_U2KjswQm.mjs";
import { r as verifyPaymentSignature } from "./razorpay_CewV_aLl.mjs";
//#region src/pages/api/checkout/verify.ts
var verify_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST
});
/**
* POST /api/checkout/verify — called by Razorpay Checkout's success handler.
* Body: { orderId, razorpay_payment_id, razorpay_signature }
* The signature is checked against the Razorpay order id stored on OUR order,
* so a signature from a different (cheaper) order can never pay for this one.
*/
var POST = async (ctx) => {
	const body = await readJson(ctx.request);
	const order = getOrder(String(body.orderId || ""));
	if (!order || order.gateway !== "razorpay" || !order.gateway_order_id) return json({
		ok: false,
		error: "Order not found."
	}, 404);
	const redirectUrl = `/order-success?order_id=${encodeURIComponent(order.order_id)}`;
	if (order.payment_status === "PAID") return json({
		ok: true,
		redirectUrl
	});
	const paymentId = String(body.razorpay_payment_id || "");
	if (!verifyPaymentSignature(order.gateway_order_id, paymentId, String(body.razorpay_signature || ""))) {
		console.warn("[Checkout] Razorpay signature mismatch for", order.order_id);
		return json({
			ok: false,
			error: "We could not confirm this payment. If money was debited, it will be confirmed or refunded automatically.",
			redirectUrl
		}, 400);
	}
	markOrderPaid(order.order_id, paymentId);
	return json({
		ok: true,
		redirectUrl
	});
};
/** GET /api/checkout/verify?order_id= — Cashfree return URL; also a safe "check again" link. */
var GET = async ({ url, redirect }) => {
	const orderId = url.searchParams.get("order_id");
	if (!orderId) return redirect("/products", 302);
	try {
		await reconcileOrder(orderId);
	} catch (err) {
		console.error("[Checkout] reconcile failed:", err);
	}
	return redirect(`/order-success?order_id=${encodeURIComponent(orderId)}`, 303);
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/checkout/verify@_@ts
var page = () => verify_exports;
//#endregion
export { page };
