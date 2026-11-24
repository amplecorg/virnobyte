import { n as getSettings } from "./settings_C74a6Mrw.mjs";
//#region src/lib/commerce/payments.ts
var env = (name) => (process.env[name] || "").trim();
function getPaymentConfig() {
	const p = getSettings().payments || {};
	const pick = (setting, envName) => String(setting || "").trim() || env(envName);
	const razorpay = {
		keyId: pick(p.razorpayKeyId, "RAZORPAY_KEY_ID").trim(),
		keySecret: pick(p.razorpayKeySecret, "RAZORPAY_KEY_SECRET").trim(),
		webhookSecret: pick(p.razorpayWebhookSecret, "RAZORPAY_WEBHOOK_SECRET").trim(),
		configured: false,
		testMode: false
	};
	razorpay.configured = Boolean(razorpay.keyId && razorpay.keySecret);
	razorpay.testMode = razorpay.keyId.startsWith("rzp_test_");
	const cashfree = {
		appId: pick(p.cashfreeAppId, "CASHFREE_APP_ID").trim(),
		secretKey: pick(p.cashfreeSecretKey, "CASHFREE_SECRET_KEY").trim(),
		env: String(p.cashfreeEnv || env("CASHFREE_ENV") || "TEST").toUpperCase().trim() === "PROD" ? "PROD" : "TEST",
		configured: false
	};
	cashfree.configured = Boolean(cashfree.appId && cashfree.secretKey);
	const gateway = p.gateway === "razorpay" || p.gateway === "cashfree" ? p.gateway : "offline";
	const enabled = p.enabled !== false;
	const gatewayReady = gateway === "razorpay" ? razorpay.configured : gateway === "cashfree" ? cashfree.configured : false;
	return {
		enabled,
		gateway,
		onlineAvailable: enabled && p.enableOnline !== false && gatewayReady,
		codAvailable: enabled && p.enableCod !== false,
		deliveryFee: Math.max(0, Math.round(Number(p.deliveryFee) || 0)),
		minFreeDelivery: Math.max(0, Math.round(Number(p.minFreeDelivery) || 0)),
		razorpay,
		cashfree
	};
}
//#endregion
export { getPaymentConfig as t };
