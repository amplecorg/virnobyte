import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { o as run, r as get } from "./db_Ci4TfReA.mjs";
import { r as verifyCashfreeOrder } from "./cashfree_KVS3-8wO.mjs";
//#region src/pages/api/checkout/verify.ts
var verify_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async ({ url, redirect }) => {
	const orderId = url.searchParams.get("order_id");
	if (!orderId) return redirect("/products", 302);
	try {
		if (get("SELECT id, payment_status FROM orders WHERE order_id = ?", orderId)) {
			if ((await verifyCashfreeOrder(orderId)).isPaid) run("UPDATE orders SET payment_status = 'PAID', updated_at = CURRENT_TIMESTAMP WHERE order_id = ?", orderId);
		}
		return redirect(`/order-success?order_id=${encodeURIComponent(orderId)}`, 303);
	} catch (err) {
		console.error("Verify order error:", err);
		return redirect(`/order-success?order_id=${encodeURIComponent(orderId)}`, 303);
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/checkout/verify@_@ts
var page = () => verify_exports;
//#endregion
export { page };
