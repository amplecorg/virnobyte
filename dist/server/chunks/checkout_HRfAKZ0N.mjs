import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { a as rateLimit, u as userFromCookies } from "./auth_CFhoV3Rg.mjs";
import { h as planById } from "./data_rJFB0L58.mjs";
import { t as getPaymentConfig } from "./payments_BiY7FehB.mjs";
import { n as startOnlinePayment } from "./checkout_DN7LKdrE.mjs";
import { n as createMembershipOrder } from "./membership-checkout_DPKYpToG.mjs";
import { c as validateCustomer } from "./orders_CyaozYjD.mjs";
import { i as readJson, r as json, t as getPublicOrigin } from "./http_B1Mo43QL.mjs";
//#region src/pages/api/membership/checkout.ts
var checkout_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
/**
* POST /api/membership/checkout — { planId, customerName, customerPhone, ...address }
* Creates the membership purchase and opens the payment gateway. The price always comes from the plan.
*/
var POST = async (ctx) => {
	if (!rateLimit(`mcheckout:${ctx.clientAddress}`, 12, 6e5)) return json({
		ok: false,
		error: "Too many attempts. Please wait a few minutes and try again."
	}, 429);
	const user = ctx.locals.user || userFromCookies(ctx.cookies);
	if (!user) return json({
		ok: false,
		error: "Please sign in first.",
		requiresLogin: true
	}, 401);
	const body = await readJson(ctx.request);
	const plan = planById(Number(body.planId));
	if (!plan || !plan.active) return json({
		ok: false,
		error: "This plan is not on sale right now."
	}, 404);
	const cfg = getPaymentConfig();
	if (!cfg.onlineAvailable) return json({
		ok: false,
		error: "Online payment is not available right now. Please request the card and pay at our counter."
	}, 503);
	const checked = validateCustomer(body);
	if (!checked.ok) return json({
		ok: false,
		error: checked.error
	}, 400);
	try {
		const order = createMembershipOrder({
			userId: user.id,
			plan,
			customer: checked.customer,
			gateway: cfg.gateway
		});
		const redirectUrl = `/order-success?order_id=${encodeURIComponent(order.order_id)}`;
		const started = await startOnlinePayment(order, getPublicOrigin(ctx));
		if (!started.ok) return json({
			ok: false,
			error: started.error,
			orderId: order.order_id,
			redirectUrl
		}, 502);
		return json({
			ok: true,
			orderId: order.order_id,
			payment: started.intent,
			redirectUrl
		});
	} catch (e) {
		console.error("[Membership checkout] failed:", e);
		return json({
			ok: false,
			error: e?.message?.startsWith("You already") ? e.message : "We could not start the payment. Please try again or call us."
		}, 400);
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/membership/checkout@_@ts
var page = () => checkout_exports;
//#endregion
export { page };
