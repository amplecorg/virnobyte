import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { a as rateLimit } from "./auth_CSZwb3EQ.mjs";
import { c as setCartQuantity, n as addToCart, s as removeFromCart, t as CartError } from "./cart_Dct9yH5N.mjs";
import { n as json, r as readJson, t as isSecure } from "./http_DX-26bXz.mjs";
//#region src/pages/api/cart/items.ts
var items_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	PATCH: () => PATCH,
	POST: () => POST
});
var fail = (err) => {
	if (err instanceof CartError) return json({
		ok: false,
		error: err.message
	}, err.status);
	console.error("[Cart API]", err);
	return json({
		ok: false,
		error: "Something went wrong with your cart. Please try again."
	}, 500);
};
/** POST /api/cart/items { slug, quantity? } — add a product (quantities stack, capped per item). */
var POST = async (ctx) => {
	if (!rateLimit(`cart:${ctx.clientAddress}`, 120, 6e5)) return json({
		ok: false,
		error: "Too many requests. Please slow down."
	}, 429);
	const body = await readJson(ctx.request);
	try {
		return json({
			ok: true,
			cart: addToCart(ctx.cookies, ctx.locals.user, isSecure(ctx), String(body.slug || ""), Number(body.quantity) || 1)
		});
	} catch (err) {
		return fail(err);
	}
};
/** PATCH /api/cart/items { productId, quantity } — set an exact quantity (0 removes the line). */
var PATCH = async (ctx) => {
	const body = await readJson(ctx.request);
	try {
		return json({
			ok: true,
			cart: setCartQuantity(ctx.cookies, ctx.locals.user, isSecure(ctx), Number(body.productId), Number(body.quantity))
		});
	} catch (err) {
		return fail(err);
	}
};
/** DELETE /api/cart/items { productId } — remove a line. */
var DELETE = async (ctx) => {
	const body = await readJson(ctx.request);
	try {
		return json({
			ok: true,
			cart: removeFromCart(ctx.cookies, ctx.locals.user, isSecure(ctx), Number(body.productId))
		});
	} catch (err) {
		return fail(err);
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/cart/items@_@ts
var page = () => items_exports;
//#endregion
export { page };
