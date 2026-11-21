import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { r as db } from "./db_DdeOHGNv.mjs";
import { a as markOrderPaid, i as getOrderByGatewayId } from "./orders_wTHzsAQs.mjs";
import { i as verifyWebhookSignature } from "./razorpay_CewV_aLl.mjs";
//#region src/pages/api/webhooks/razorpay.ts
var razorpay_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
/**
* POST /api/webhooks/razorpay
* Razorpay Dashboard → Settings → Webhooks → events: payment.captured, order.paid.
* This is the source of truth for payments when the shopper's browser never returns.
* Every delivery is signature-checked and logged once (duplicates are acknowledged and ignored).
*/
var POST = async ({ request }) => {
	const raw = await request.text();
	if (!verifyWebhookSignature(raw, request.headers.get("x-razorpay-signature") || "")) return new Response("Invalid signature", { status: 400 });
	let event;
	try {
		event = JSON.parse(raw);
	} catch {
		return new Response("Bad payload", { status: 400 });
	}
	const payment = event?.payload?.payment?.entity;
	const rzpOrderId = String(payment?.order_id || event?.payload?.order?.entity?.id || "");
	const order = getOrderByGatewayId(rzpOrderId);
	const eventId = request.headers.get("x-razorpay-event-id") || `${event?.event}:${payment?.id || rzpOrderId}`;
	const d = db();
	if (d) {
		const logged = d.prepare("INSERT OR IGNORE INTO payment_events (provider, event_id, event_type, order_ref, payload) VALUES (?,?,?,?,?)").run("razorpay", eventId, String(event?.event || ""), order?.order_id || "", raw.slice(0, 2e4));
		if (!Number(logged.changes)) return new Response("Duplicate", { status: 200 });
	}
	if (order && (event.event === "payment.captured" || event.event === "order.paid")) {
		const paidPaise = Number(payment?.amount ?? event?.payload?.order?.entity?.amount_paid ?? 0);
		if (paidPaise === order.total_amount * 100) markOrderPaid(order.order_id, String(payment?.id || ""));
		else console.error("[Razorpay webhook] amount mismatch for", order.order_id, paidPaise, order.total_amount * 100);
	}
	return new Response("OK", { status: 200 });
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/webhooks/razorpay@_@ts
var page = () => razorpay_exports;
//#endregion
export { page };
