import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { i as clearCart, o as getCart } from "./cart_DNQqdeQo.mjs";
import { n as isSecure, r as json } from "./http_B1Mo43QL.mjs";
//#region src/pages/api/cart/index.ts
var cart_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET
});
/** GET /api/cart — current cart with live prices and totals. */
var GET = (ctx) => json({
	ok: true,
	cart: getCart(ctx.cookies, ctx.locals.user, isSecure(ctx))
});
/** DELETE /api/cart — empty the cart. */
var DELETE = (ctx) => json({
	ok: true,
	cart: clearCart(ctx.cookies, ctx.locals.user, isSecure(ctx))
});
//#endregion
//#region \0virtual:astro:page:src/pages/api/cart/index@_@ts
var page = () => cart_exports;
//#endregion
export { page };
