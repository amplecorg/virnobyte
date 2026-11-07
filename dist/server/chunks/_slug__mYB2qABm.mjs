import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as getSettings, t as contactInfo } from "./settings_DMNw6G8Y.mjs";
import { v as product } from "./data_Bq_0n-xJ.mjs";
import { a as inr } from "./format_CFs_vaoZ.mjs";
import { t as $$Base } from "./Base_fXkZMcl0.mjs";
import { i as resolveImage } from "./images_4iK9SaiJ.mjs";
import { n as getCashfreeConfig } from "./cashfree_KVS3-8wO.mjs";
//#region src/pages/checkout/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Slug = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const { slug } = Astro.params;
	const p = product(slug);
	if (!p) return Astro.redirect("/products", 302);
	contactInfo();
	getSettings();
	const cfConfig = getCashfreeConfig();
	function getPhotoUrls(images) {
		if (!images || !images.length) return [];
		return images.map((imgKey) => {
			const res = resolveImage(imgKey);
			return res.kind === "upload" ? res.src : res.meta.src;
		});
	}
	const coverPhoto = getPhotoUrls(Array.isArray(p.images) && p.images.length ? p.images : p.image ? [p.image] : [])[0] || "/virnobyte-circuit-board.webp";
	const price = p.price || 0;
	const mrp = p.mrp || price;
	const discount = mrp > price ? mrp - price : 0;
	const discountPercent = mrp > price ? Math.round(discount / mrp * 100) : 0;
	const specs = (p.summary || "").split("\n").map((s) => s.trim().replace(/^[•\-\*]\s*/, "")).filter(Boolean).slice(0, 4);
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": `Checkout: ${p.name} | Virnobyte Secure Order`,
		"description": `Order ${p.name} online with secure Cashfree payment gateway, UPI, or Cash on Delivery. Free doorstep delivery in Pune & PCMC.`,
		"canonical": `/checkout/${p.slug}`,
		"data-astro-cid-jy63szwu": true
	}, { "default": async ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="fk-checkout-page" data-astro-cid-jy63szwu> <div class="wrap" data-astro-cid-jy63szwu>  <div class="fk-checkout-header" data-astro-cid-jy63szwu> <a href="/" class="fk-checkout-logo" data-astro-cid-jy63szwu> <img src="/virnobyte-logo.png" alt="Virnobyte" width="28" height="22" data-astro-cid-jy63szwu> <span data-astro-cid-jy63szwu>Virnobyte <span class="fk-logo-sub" data-astro-cid-jy63szwu>Assured</span></span> </a> <div class="fk-secure-badge" data-astro-cid-jy63szwu> <span class="fk-ssl-icon" data-astro-cid-jy63szwu>🔒</span> <span data-astro-cid-jy63szwu>100% Safe &amp; Secure Checkout</span> </div> </div>  <div class="fk-checkout-grid" data-astro-cid-jy63szwu>  <div class="fk-checkout-main" data-astro-cid-jy63szwu>  <div class="fk-step-card" data-astro-cid-jy63szwu> <div class="fk-step-head active" data-astro-cid-jy63szwu> <span class="fk-step-num" data-astro-cid-jy63szwu>1</span> <span class="fk-step-title" data-astro-cid-jy63szwu>ORDER SUMMARY</span> <span class="fk-step-badge" data-astro-cid-jy63szwu>1 ITEM</span> </div> <div class="fk-step-body" data-astro-cid-jy63szwu> <div class="fk-order-item" data-astro-cid-jy63szwu> <div class="fk-item-thumb" data-astro-cid-jy63szwu> <img${addAttribute(coverPhoto, "src")}${addAttribute(p.name, "alt")} loading="lazy" data-astro-cid-jy63szwu> </div> <div class="fk-item-details" data-astro-cid-jy63szwu> <h2 class="fk-item-title" data-astro-cid-jy63szwu>${p.name}</h2> <div class="fk-item-meta" data-astro-cid-jy63szwu> <span class="fk-item-category" data-astro-cid-jy63szwu>Category: ${p.category}</span> <span class="fk-item-assured" data-astro-cid-jy63szwu>✓ Virnobyte ${p.badge || "Assured"}</span> </div> ${specs.length > 0 && renderTemplate`<ul class="fk-item-specs" data-astro-cid-jy63szwu> ${specs.map((s) => renderTemplate`<li data-astro-cid-jy63szwu>• ${s}</li>`)} </ul>`} <div class="fk-item-price-row" data-astro-cid-jy63szwu> ${discountPercent > 0 && renderTemplate`<span class="fk-item-mrp" data-astro-cid-jy63szwu>${inr(mrp)}</span>`} <span class="fk-item-price" data-astro-cid-jy63szwu>${price ? inr(price) : "Best Price"}</span> ${discountPercent > 0 && renderTemplate`<span class="fk-item-discount" data-astro-cid-jy63szwu>${discountPercent}% Off</span>`} </div> <div class="fk-delivery-promise-chip" data-astro-cid-jy63szwu> <span data-astro-cid-jy63szwu>🚚 <strong data-astro-cid-jy63szwu>${p.delivery_text || "Free Delivery by Tomorrow"}</strong> — Doorstep setup in PCMC &amp; Pune</span> </div> </div> </div> </div> </div>  <form id="fk-checkout-form" class="fk-form" toolname="order_product" tooldescription="Place an order enquiry for a certified computer, laptop, or hardware product from Virnobyte." data-astro-cid-jy63szwu> <input type="hidden" name="slug"${addAttribute(p.slug, "value")} data-astro-cid-jy63szwu> <input type="hidden" name="quantity" id="fk-qty-input" value="1" data-astro-cid-jy63szwu>  <div class="fk-step-card" data-astro-cid-jy63szwu> <div class="fk-step-head active" data-astro-cid-jy63szwu> <span class="fk-step-num" data-astro-cid-jy63szwu>2</span> <span class="fk-step-title" data-astro-cid-jy63szwu>DELIVERY ADDRESS</span> </div> <div class="fk-step-body" data-astro-cid-jy63szwu> <div class="fk-form-grid" data-astro-cid-jy63szwu> <div class="fk-field" data-astro-cid-jy63szwu> <label for="cust-name" data-astro-cid-jy63szwu>Full Name <span class="req" data-astro-cid-jy63szwu>*</span></label> <input type="text" id="cust-name" name="customerName" placeholder="e.g. Rahul Sharma" required data-astro-cid-jy63szwu> </div> <div class="fk-field" data-astro-cid-jy63szwu> <label for="cust-phone" data-astro-cid-jy63szwu>10-Digit Mobile Number <span class="req" data-astro-cid-jy63szwu>*</span></label> <input type="tel" id="cust-phone" name="customerPhone" placeholder="10-digit mobile number" pattern="[0-9]{10}" maxlength="10" required data-astro-cid-jy63szwu> </div> <div class="fk-field" data-astro-cid-jy63szwu> <label for="cust-pincode" data-astro-cid-jy63szwu>Pincode <span class="req" data-astro-cid-jy63szwu>*</span></label> <input type="text" id="cust-pincode" name="pincode" placeholder="e.g. 411062, 411019" maxlength="6" required data-astro-cid-jy63szwu> </div> <div class="fk-field" data-astro-cid-jy63szwu> <label for="cust-email" data-astro-cid-jy63szwu>Email Address (for invoice receipt)</label> <input type="email" id="cust-email" name="customerEmail" placeholder="e.g. rahul@example.com" data-astro-cid-jy63szwu> </div> <div class="fk-field fk-full" data-astro-cid-jy63szwu> <label for="cust-address1" data-astro-cid-jy63szwu>Flat, House no., Building, Apartment <span class="req" data-astro-cid-jy63szwu>*</span></label> <input type="text" id="cust-address1" name="addressLine1" placeholder="Flat No. 402, Building A, Sai Residency" required data-astro-cid-jy63szwu> </div> <div class="fk-field fk-full" data-astro-cid-jy63szwu> <label for="cust-address2" data-astro-cid-jy63szwu>Area, Street, Sector, Village, Landmark</label> <input type="text" id="cust-address2" name="addressLine2" placeholder="Near Bright Computer Education, Mahadev Temple Road, Jadhav Wadi, Chikhali" data-astro-cid-jy63szwu> </div> <div class="fk-field" data-astro-cid-jy63szwu> <label for="cust-city" data-astro-cid-jy63szwu>City / District <span class="req" data-astro-cid-jy63szwu>*</span></label> <input type="text" id="cust-city" name="city" value="Pimpri-Chinchwad, Pune" required data-astro-cid-jy63szwu> </div> <div class="fk-field" data-astro-cid-jy63szwu> <label for="cust-state" data-astro-cid-jy63szwu>State <span class="req" data-astro-cid-jy63szwu>*</span></label> <input type="text" id="cust-state" name="state" value="Maharashtra" required data-astro-cid-jy63szwu> </div> <div class="fk-field fk-full" data-astro-cid-jy63szwu> <label data-astro-cid-jy63szwu>Address Type</label> <div class="fk-radio-pills" data-astro-cid-jy63szwu> <label class="fk-pill-label" data-astro-cid-jy63szwu> <input type="radio" name="addressType" value="Home" checked data-astro-cid-jy63szwu> <span data-astro-cid-jy63szwu>🏠 Home (All day delivery)</span> </label> <label class="fk-pill-label" data-astro-cid-jy63szwu> <input type="radio" name="addressType" value="Work" data-astro-cid-jy63szwu> <span data-astro-cid-jy63szwu>🏢 Work (Delivery between 10 AM - 6 PM)</span> </label> </div> </div> </div> </div> </div>  <div class="fk-step-card" data-astro-cid-jy63szwu> <div class="fk-step-head active" data-astro-cid-jy63szwu> <span class="fk-step-num" data-astro-cid-jy63szwu>3</span> <span class="fk-step-title" data-astro-cid-jy63szwu>PAYMENT OPTIONS</span> <span class="fk-step-badge" data-astro-cid-jy63szwu>CASHFREE / COD</span> </div> <div class="fk-step-body" data-astro-cid-jy63szwu> <div class="fk-payment-options" data-astro-cid-jy63szwu>  ${cfConfig.enableOnline && renderTemplate`<label class="fk-pay-option active" id="pay-opt-cashfree" data-astro-cid-jy63szwu> <div class="fk-pay-radio" data-astro-cid-jy63szwu> <input type="radio" name="paymentMethod" value="cashfree" checked data-astro-cid-jy63szwu> </div> <div class="fk-pay-info" data-astro-cid-jy63szwu> <div class="fk-pay-title-row" data-astro-cid-jy63szwu> <span class="fk-pay-name" data-astro-cid-jy63szwu>UPI / Credit &amp; Debit Card / NetBanking / Wallets</span> <span class="fk-rec-tag" data-astro-cid-jy63szwu>Recommended</span> </div> <p class="fk-pay-desc" data-astro-cid-jy63szwu>
Pay securely via <strong data-astro-cid-jy63szwu>Cashfree Payment Gateway</strong>. Supports Google Pay, PhonePe, Paytm, BHIM, all major bank cards, and NetBanking.
</p> <div class="fk-pay-icons" data-astro-cid-jy63szwu> <span class="fk-icon-pill" data-astro-cid-jy63szwu>GPay</span> <span class="fk-icon-pill" data-astro-cid-jy63szwu>PhonePe</span> <span class="fk-icon-pill" data-astro-cid-jy63szwu>Paytm</span> <span class="fk-icon-pill" data-astro-cid-jy63szwu>UPI</span> <span class="fk-icon-pill" data-astro-cid-jy63szwu>Cards</span> <span class="fk-icon-pill" data-astro-cid-jy63szwu>NetBanking</span> </div> </div> </label>`}  ${cfConfig.enableCod && renderTemplate`<label class="fk-pay-option" id="pay-opt-cod" data-astro-cid-jy63szwu> <div class="fk-pay-radio" data-astro-cid-jy63szwu> <input type="radio" name="paymentMethod" value="cod" data-astro-cid-jy63szwu> </div> <div class="fk-pay-info" data-astro-cid-jy63szwu> <div class="fk-pay-title-row" data-astro-cid-jy63szwu> <span class="fk-pay-name" data-astro-cid-jy63szwu>Cash on Delivery (Pay at Doorstep)</span> </div> <p class="fk-pay-desc" data-astro-cid-jy63szwu>
Pay via cash or UPI to our technician after doorstep delivery, unboxing, and testing of your hardware.
</p> </div> </label>`} </div> <div class="fk-order-notes-box" data-astro-cid-jy63szwu> <label for="cust-notes" data-astro-cid-jy63szwu>Order Notes or Technician Requests (optional)</label> <textarea id="cust-notes" name="notes" rows="2" placeholder="e.g. Please bring an HDMI cable, or install Windows 11 Chrome &amp; MS Office." data-astro-cid-jy63szwu></textarea> </div>  <div class="fk-submit-bar" data-astro-cid-jy63szwu> <button type="submit" id="fk-btn-place-order" class="fk-btn-submit" data-astro-cid-jy63szwu> <span data-astro-cid-jy63szwu>COMPLETE ORDER • ${price ? inr(price) : "SUBMIT"}</span> <span class="fk-arrow-btn" data-astro-cid-jy63szwu>➔</span> </button> <p class="fk-submit-guarantee" data-astro-cid-jy63szwu>
🛡️ By placing this order, you agree to Virnobyte's <a href="/terms-and-conditions" target="_blank" data-astro-cid-jy63szwu>Terms of Service</a> &amp; 7-Day Replacement Policy.
</p> </div> </div> </div> </form> </div>  <aside class="fk-checkout-sidebar" data-astro-cid-jy63szwu> <div class="fk-price-card" data-astro-cid-jy63szwu> <h3 class="fk-price-head" data-astro-cid-jy63szwu>PRICE DETAILS</h3> <div class="fk-price-rows" data-astro-cid-jy63szwu> <div class="fk-prow" data-astro-cid-jy63szwu> <span data-astro-cid-jy63szwu>Price (1 item)</span> <span data-astro-cid-jy63szwu>${inr(mrp)}</span> </div> ${discount > 0 && renderTemplate`<div class="fk-prow" data-astro-cid-jy63szwu> <span data-astro-cid-jy63szwu>Discount</span> <span class="fk-green-text" data-astro-cid-jy63szwu>− ${inr(discount)}</span> </div>`} <div class="fk-prow" data-astro-cid-jy63szwu> <span data-astro-cid-jy63szwu>Delivery Charges</span> <span class="fk-green-text" data-astro-cid-jy63szwu>FREE</span> </div> <div class="fk-prow" data-astro-cid-jy63szwu> <span data-astro-cid-jy63szwu>Doorstep Installation &amp; Demo</span> <span class="fk-green-text" data-astro-cid-jy63szwu>FREE</span> </div> <div class="fk-total-row" data-astro-cid-jy63szwu> <span data-astro-cid-jy63szwu>Total Amount</span> <span class="fk-final-total" data-astro-cid-jy63szwu>${price ? inr(price) : "Best Price"}</span> </div> </div> ${discount > 0 && renderTemplate`<div class="fk-saving-box" data-astro-cid-jy63szwu> <span data-astro-cid-jy63szwu>🎉 You will save <strong data-astro-cid-jy63szwu>${inr(discount)}</strong> on this order!</span> </div>`} <div class="fk-trust-assurances" data-astro-cid-jy63szwu> <div class="fk-assure-item" data-astro-cid-jy63szwu> <span class="fk-assure-icon" data-astro-cid-jy63szwu>🛡️</span> <span data-astro-cid-jy63szwu>Safe and Secure Payments via Cashfree</span> </div> <div class="fk-assure-item" data-astro-cid-jy63szwu> <span class="fk-assure-icon" data-astro-cid-jy63szwu>✔️</span> <span data-astro-cid-jy63szwu>100% Authentic Products &amp; Warranty</span> </div> <div class="fk-assure-item" data-astro-cid-jy63szwu> <span class="fk-assure-icon" data-astro-cid-jy63szwu>🔄</span> <span data-astro-cid-jy63szwu>7-Day Replacement Guarantee</span> </div> </div> </div> </aside> </div> </div> </div> <script src="https://sdk.cashfree.com/js/v3/cashfree.js"><\/script><script>
    (function () {
      const form = document.getElementById('fk-checkout-form');
      const submitBtn = document.getElementById('fk-btn-place-order');
      const payOptions = document.querySelectorAll('.fk-pay-option');

      // Radio selection highlight
      payOptions.forEach((opt) => {
        opt.addEventListener('click', () => {
          payOptions.forEach((o) => o.classList.remove('active'));
          opt.classList.add('active');
        });
      });

      if (!form) return;

      form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const btnText = submitBtn.querySelector('span');
        const origText = btnText ? btnText.textContent : 'COMPLETE ORDER';
        if (btnText) btnText.textContent = 'Processing Order...';
        submitBtn.disabled = true;

        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        try {
          const res = await fetch('/api/checkout/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          const data = await res.json();

          if (!res.ok || !data.ok) {
            alert(data.error || 'Failed to process order. Please check your details and try again.');
            if (btnText) btnText.textContent = origText;
            submitBtn.disabled = false;
            return;
          }

          // Case 1: Cash on Delivery or Test Mode Direct Redirect
          if (data.paymentMethod === 'cod' || data.isTestMode) {
            window.location.href = data.redirectUrl;
            return;
          }

          // Case 2: Cashfree Live/Sandbox Payment Gateway via SDK
          if (data.paymentSessionId && typeof window.Cashfree === 'function') {
            const cashfree = window.Cashfree({
              mode: data.env === 'PROD' ? 'production' : 'sandbox',
            });

            cashfree.checkout({
              paymentSessionId: data.paymentSessionId,
              redirectTarget: '_self',
            });
          } else {
            // Fallback redirect
            window.location.href = data.redirectUrl || '/order-success?order_id=' + data.orderId;
          }
        } catch (err) {
          console.error('Checkout error:', err);
          alert('A network error occurred. Please try again.');
          if (btnText) btnText.textContent = origText;
          submitBtn.disabled = false;
        }
      });
    })();
  <\/script>` })}`;
}, "C:/Programming section/virnobyte/src/pages/checkout/[slug].astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/checkout/[slug].astro";
var $$url = "/checkout/[slug].html";
//#endregion
//#region \0virtual:astro:page:src/pages/checkout/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
