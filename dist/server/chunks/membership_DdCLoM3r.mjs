import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { S as requestMembership, h as planById } from "./data_rJFB0L58.mjs";
import { t as getPaymentConfig } from "./payments_BiY7FehB.mjs";
//#region src/pages/api/membership.ts
var membership_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
/**
* "Get the card" button on /membership. With online payment set up, buyers go to the card
* checkout and pay; otherwise the old flow records a request and payment is taken at the counter.
*/
var POST = async ({ request, redirect, locals }) => {
	const form = await request.formData();
	const planId = Number(form.get("plan_id"));
	const plan = planById(planId);
	if (!plan || !plan.active) return redirect("/membership", 303);
	if (!locals.user) return redirect(`/account/register?plan=${plan.id}`, 303);
	if (form.get("request") !== "1" && getPaymentConfig().onlineAvailable) return redirect(`/membership/checkout/${plan.id}`, 303);
	requestMembership(locals.user.id, plan.id);
	return redirect("/account?requested=1", 303);
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/membership@_@ts
var page = () => membership_exports;
//#endregion
export { page };
