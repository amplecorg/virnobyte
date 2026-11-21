import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { a as rateLimit, l as userFromCookies } from "./auth_CSZwb3EQ.mjs";
import { i as readJson, r as json, t as getPublicOrigin } from "./http_B1Mo43QL.mjs";
import { n as startOnlinePayment, t as reconcileOrder } from "./checkout_U2KjswQm.mjs";
//#region src/pages/api/checkout/retry.ts
var retry_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
/** POST /api/checkout/retry { orderId } — "Complete payment" for an order still awaiting payment. */
var POST = async (ctx) => {
	if (!rateLimit(`retry:${ctx.clientAddress}`, 12, 6e5)) return json({
		ok: false,
		error: "Too many attempts. Please wait a few minutes and try again."
	}, 429);
	const user = ctx.locals.user || userFromCookies(ctx.cookies);
	if (!user) return json({
		ok: false,
		error: "Please sign in to complete payment.",
		requiresLogin: true
	}, 401);
	const body = await readJson(ctx.request);
	const order = await reconcileOrder(String(body.orderId || ""));
	if (!order) return json({
		ok: false,
		error: "Order not found."
	}, 404);
	if (order.user_id && user.id !== order.user_id && user.role !== "admin") return json({
		ok: false,
		error: "Access denied."
	}, 403);
	const redirectUrl = `/order-success?order_id=${encodeURIComponent(order.order_id)}`;
	if (order.payment_status === "PAID") return json({
		ok: true,
		paid: true,
		redirectUrl
	});
	if (order.payment_status !== "PENDING" || order.order_status === "CANCELLED") return json({
		ok: false,
		error: "This order can no longer be paid online. Please contact us."
	}, 400);
	const started = await startOnlinePayment(order, getPublicOrigin(ctx));
	if (!started.ok) return json({
		ok: false,
		error: started.error
	}, 502);
	return json({
		ok: true,
		orderId: order.order_id,
		payment: started.intent,
		redirectUrl
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/checkout/retry@_@ts
var page = () => retry_exports;
//#endregion
export { page };
