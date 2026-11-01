import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { i as destroySession } from "./auth_BKr3at0j.mjs";
//#region src/pages/account/logout.ts
var logout_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = ({ cookies, redirect }) => {
	destroySession(cookies);
	return redirect("/", 303);
};
//#endregion
//#region \0virtual:astro:page:src/pages/account/logout@_@ts
var page = () => logout_exports;
//#endregion
export { page };
