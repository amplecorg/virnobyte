import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { i as signOutVendor } from "./vendor_12Z6vgmZ.mjs";
//#region src/pages/vendor/logout.ts
var logout_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = (ctx) => {
	signOutVendor(ctx.cookies);
	return ctx.redirect("/vendor", 303);
};
//#endregion
//#region \0virtual:astro:page:src/pages/vendor/logout@_@ts
var page = () => logout_exports;
//#endregion
export { page };
