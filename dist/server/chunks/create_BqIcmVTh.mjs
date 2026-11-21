import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { a as rateLimit } from "./auth_CSZwb3EQ.mjs";
import { y as product } from "./data_DdRaT7LY.mjs";
import { l as viewOf, o as getCart, r as buildLine, u as getPaymentConfig } from "./cart_DNQqdeQo.mjs";
import { c as validateCustomer, n as createOrder } from "./orders_wTHzsAQs.mjs";
import { i as readJson, n as isSecure, r as json, t as getPublicOrigin } from "./http_B1Mo43QL.mjs";
import { n as startOnlinePayment } from "./checkout_U2KjswQm.mjs";
//#region src/pages/api/checkout/create.ts
var create_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
/**
* POST /api/checkout/create
* Body: delivery fields + paymentMethod ('online' | 'cod') + either
*   { mode: 'cart' }                → order everything purchasable in the cart
*   { mode: 'buy', slug, quantity } → Buy Now for a single product (cart untouched)
*
* The browser never sends prices: lines and totals are rebuilt from the database here.
*/
var POST = async (ctx) => {
	if (!rateLimit(`checkout:${ctx.clientAddress}`, 12, 6e5)) return json({
		ok: false,
		error: "Too many attempts. Please wait a few minutes and try again."
	}, 429);
	try {
		const user = ctx.locals.user;
		if (!user) return json({
			ok: false,
			error: "Please sign in to place your order.",
			requiresLogin: true
		}, 401);
		const body = await readJson(ctx.request);
		const cfg = getPaymentConfig();
		if (!cfg.enabled) return json({
			ok: false,
			error: "Online ordering is switched off right now. Please call us to order."
		}, 503);
		const checked = validateCustomer(body);
		if (!checked.ok) return json({
			ok: false,
			error: checked.error
		}, 400);
		const method = body.paymentMethod === "cod" ? "cod" : "online";
		if (method === "cod" && !cfg.codAvailable) return json({
			ok: false,
			error: "Cash on Delivery is not available. Please pay online."
		}, 400);
		if (method === "online" && !cfg.onlineAvailable) return json({
			ok: false,
			error: "Online payment is not available right now. Please choose Cash on Delivery."
		}, 400);
		let view;
		if (body.mode === "buy") {
			const p = product(String(body.slug || ""));
			if (!p) return json({
				ok: false,
				error: "This product is no longer available."
			}, 404);
			view = viewOf(null, [buildLine(p, Number(body.quantity) || 1)]);
		} else view = getCart(ctx.cookies, user, isSecure(ctx));
		if (!view.totals.itemCount) return json({
			ok: false,
			error: view.lines[0]?.unavailableReason || "Your cart is empty."
		}, 400);
		const order = createOrder({
			lines: view.lines,
			totals: view.totals,
			customer: checked.customer,
			paymentMethod: method,
			gateway: cfg.gateway,
			userId: user.id,
			cartId: view.cartId
		});
		const redirectUrl = `/order-success?order_id=${encodeURIComponent(order.order_id)}`;
		if (method === "cod") {
			if (view.cartId) getCart(ctx.cookies, user, isSecure(ctx));
			return json({
				ok: true,
				orderId: order.order_id,
				paymentMethod: "cod",
				redirectUrl
			});
		}
		const started = await startOnlinePayment(order, getPublicOrigin(ctx));
		if (!started.ok) return json({
			ok: false,
			error: started.error,
			orderId: order.order_id
		}, 502);
		return json({
			ok: true,
			orderId: order.order_id,
			paymentMethod: "online",
			payment: started.intent,
			redirectUrl
		});
	} catch (err) {
		console.error("[Checkout] create failed:", err);
		return json({
			ok: false,
			error: "We could not place your order. Please try again or call us."
		}, 500);
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/checkout/create@_@ts
var page = () => create_exports;
//#endregion
export { page };
