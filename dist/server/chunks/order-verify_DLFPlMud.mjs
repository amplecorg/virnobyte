import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { i as get } from "./db_CrQR8QZK.mjs";
import { a as rateLimit } from "./auth_CFhoV3Rg.mjs";
import { a as inr } from "./format_6aaLy6w7.mjs";
import { o as getCart } from "./cart_CxOmW9DG.mjs";
import { i as verifyOrderOtp, n as maskEmail, r as sendOrderOtp } from "./otp_9Z-S2uDl.mjs";
import { t as $$Base } from "./Base_ac1XVCJk.mjs";
import { n as isSecure } from "./http_B1Mo43QL.mjs";
//#region src/pages/order-verify.astro
var order_verify_exports = /* @__PURE__ */ __exportAll({
	default: () => $$OrderVerify,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$OrderVerify = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$OrderVerify;
	const ref = Astro.url.searchParams.get("order_id") ?? "";
	const user = Astro.locals.user;
	if (!user) return Astro.redirect(`/account/login?next=${encodeURIComponent(Astro.url.pathname + Astro.url.search)}`, 302);
	const order = get("SELECT o.*, u.email AS account_email FROM orders o LEFT JOIN users u ON u.id = o.user_id WHERE o.order_id = ?", ref);
	if (!order || order.user_id !== user.id && user.role !== "admin") return Astro.redirect("/account", 302);
	const successUrl = `/order-success?order_id=${encodeURIComponent(ref)}`;
	if (order.order_status !== "AWAITING_OTP") return Astro.redirect(successUrl, 302);
	let error = "";
	let info = "";
	let devCode = "";
	if (Astro.request.method === "POST") {
		const f = await Astro.request.formData();
		if (!rateLimit(`otp:${Astro.clientAddress}`, 30, 9e5)) error = "Too many attempts. Please wait a few minutes.";
		else if (f.get("_action") === "resend") {
			const r = await sendOrderOtp(ref, true);
			if (r.ok) {
				info = `A new code was sent to ${r.sentTo}.`;
				devCode = r.devCode ?? "";
			} else error = r.error ?? "Could not send the code.";
		} else {
			const r = verifyOrderOtp(ref, String(f.get("code") ?? ""));
			if (r.ok) {
				getCart(Astro.cookies, user, isSecure(Astro));
				return Astro.redirect(successUrl, 303);
			}
			error = r.error;
		}
	}
	const sentTo = maskEmail(String(order.customer_email || order.account_email || ""));
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Confirm your order | Virnobyte",
		"description": "Enter the code we emailed to confirm your Cash on Delivery order.",
		"canonical": "/order-verify",
		"noindex": true,
		"data-astro-cid-2fqk2t7j": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<section class="section" data-astro-cid-2fqk2t7j> <div class="wrap" style="max-width:520px" data-astro-cid-2fqk2t7j> <div class="ov-card" data-astro-cid-2fqk2t7j> <p class="ov-step" data-astro-cid-2fqk2t7j>Almost done · Order ${order.order_id}</p> <h1 data-astro-cid-2fqk2t7j>Confirm your order</h1> <p data-astro-cid-2fqk2t7j>
We sent a 6-digit code to <b data-astro-cid-2fqk2t7j>${sentTo}</b>. Enter it below to confirm your Cash on Delivery order of <b data-astro-cid-2fqk2t7j>${inr(order.total_amount)}</b>.
          The code is valid for ${10} minutes.
</p> ${error && renderTemplate`<p class="alert alert--error" role="alert" data-astro-cid-2fqk2t7j>${error}</p>`} ${info && renderTemplate`<p class="alert alert--ok" role="status" data-astro-cid-2fqk2t7j>${info}</p>`} ${devCode && renderTemplate`<p class="alert" style="background:#e0f2fe;border-color:#7dd3fc;color:#0369a1" data-astro-cid-2fqk2t7j>Testing on this computer (email not set up): your code is <b data-astro-cid-2fqk2t7j>${devCode}</b>. The live site never shows this.</p>`} <form method="post" class="ov-form" data-astro-cid-2fqk2t7j> <input type="hidden" name="_action" value="verify" data-astro-cid-2fqk2t7j> <label for="otp" class="sr-only" data-astro-cid-2fqk2t7j>6-digit code</label> <input id="otp" name="code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" required placeholder="••••••" autofocus data-astro-cid-2fqk2t7j> <button class="btn btn--block" type="submit" data-astro-cid-2fqk2t7j>Confirm order</button> </form> <form method="post" class="ov-resend" data-astro-cid-2fqk2t7j> <input type="hidden" name="_action" value="resend" data-astro-cid-2fqk2t7j> <span class="small muted" data-astro-cid-2fqk2t7j>Didn't get it? Check spam, or</span> <button class="small" type="submit" style="background:none;border:0;padding:0;color:var(--link, #0a66c2);font-weight:700;text-decoration:underline;cursor:pointer" data-astro-cid-2fqk2t7j>send a new code</button> </form> <p class="small muted" data-astro-cid-2fqk2t7j>Your order is not confirmed and nothing ships until you enter the code.</p> </div> </div> </section> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/order-verify.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/order-verify.astro";
var $$url = "/order-verify.html";
//#endregion
//#region \0virtual:astro:page:src/pages/order-verify@_@astro
var page = () => order_verify_exports;
//#endregion
export { page };
