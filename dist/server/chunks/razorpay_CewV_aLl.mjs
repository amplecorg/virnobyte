import { u as getPaymentConfig } from "./cart_DNQqdeQo.mjs";
import { createHmac, timingSafeEqual } from "node:crypto";
//#region src/lib/commerce/razorpay.ts
/**
* Thin Razorpay REST client (no SDK dependency).
* Docs: https://razorpay.com/docs/api/orders/ and /docs/payments/server-integration/nodejs/
*
* Flow: server creates a Razorpay order for the exact amount → browser pays in
* Razorpay Checkout → server verifies the returned signature with the key secret.
* The webhook is the safety net when the browser never comes back.
*/
var API = "https://api.razorpay.com/v1";
function authHeader() {
	const { keyId, keySecret } = getPaymentConfig().razorpay;
	return "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
}
function safeEqualHex(a, b) {
	const x = Buffer.from(String(a || ""), "utf8");
	const y = Buffer.from(String(b || ""), "utf8");
	return x.length === y.length && timingSafeEqual(x, y);
}
var hmacHex = (payload, secret) => createHmac("sha256", secret).update(payload).digest("hex");
/** Creates a Razorpay order. `amountRupees` is converted to paise here and nowhere else. */
async function createRazorpayOrder(params) {
	try {
		const res = await fetch(`${API}/orders`, {
			method: "POST",
			headers: {
				Authorization: authHeader(),
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				amount: Math.round(params.amountRupees * 100),
				currency: "INR",
				receipt: params.receipt.slice(0, 40),
				notes: params.notes || {}
			}),
			signal: AbortSignal.timeout(15e3)
		});
		const data = await res.json().catch(() => ({}));
		if (!res.ok || !data.id) {
			console.error("[Razorpay] create order failed:", res.status, data?.error?.description || data);
			return {
				success: false,
				error: "Could not start the online payment. Please try again or choose Cash on Delivery."
			};
		}
		return {
			success: true,
			id: data.id,
			amount: data.amount
		};
	} catch (err) {
		console.error("[Razorpay] create order exception:", err?.message);
		return {
			success: false,
			error: "Could not reach the payment gateway. Please try again."
		};
	}
}
/**
* Checkout success signature: HMAC-SHA256("<razorpay_order_id>|<razorpay_payment_id>", key_secret).
* `razorpayOrderId` must be the id stored on OUR order, never the one sent by the browser.
*/
function verifyPaymentSignature(razorpayOrderId, paymentId, signature, keySecret = getPaymentConfig().razorpay.keySecret) {
	if (!razorpayOrderId || !paymentId || !signature || !keySecret) return false;
	return safeEqualHex(hmacHex(`${razorpayOrderId}|${paymentId}`, keySecret), signature);
}
/** Webhook signature: HMAC-SHA256(raw request body, webhook secret) in the X-Razorpay-Signature header. */
function verifyWebhookSignature(rawBody, signature, webhookSecret = getPaymentConfig().razorpay.webhookSecret) {
	if (!rawBody || !signature || !webhookSecret) return false;
	return safeEqualHex(hmacHex(rawBody, webhookSecret), signature);
}
/** Asks Razorpay whether an order has been paid; used to reconcile orders left pending. */
async function fetchRazorpayOrderState(razorpayOrderId) {
	try {
		const headers = { Authorization: authHeader() };
		const res = await fetch(`${API}/orders/${encodeURIComponent(razorpayOrderId)}`, {
			headers,
			signal: AbortSignal.timeout(15e3)
		});
		if (!res.ok) return {
			paid: false,
			paymentId: ""
		};
		if ((await res.json()).status !== "paid") return {
			paid: false,
			paymentId: ""
		};
		const pres = await fetch(`${API}/orders/${encodeURIComponent(razorpayOrderId)}/payments`, {
			headers,
			signal: AbortSignal.timeout(15e3)
		});
		return {
			paid: true,
			paymentId: ((pres.ok ? await pres.json() : { items: [] }).items || []).find((p) => p.status === "captured")?.id || ""
		};
	} catch (err) {
		console.error("[Razorpay] fetch order exception:", err?.message);
		return {
			paid: false,
			paymentId: ""
		};
	}
}
//#endregion
export { verifyWebhookSignature as i, fetchRazorpayOrderState as n, verifyPaymentSignature as r, createRazorpayOrder as t };
