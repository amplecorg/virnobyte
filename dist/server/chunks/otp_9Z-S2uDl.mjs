import { c as tx, i as get, r as db } from "./db_CrQR8QZK.mjs";
import { n as getSettings } from "./settings_C74a6Mrw.mjs";
import { n as isProduction, r as sendEmail } from "./mail_DcBTvtJo.mjs";
import { n as escapeHtml } from "./format_6aaLy6w7.mjs";
import { m as reconcileOrderStock } from "./stock_CkuKY_dx.mjs";
import { a as emptyCartById } from "./cart_CxOmW9DG.mjs";
import { createHash, randomInt } from "node:crypto";
//#region src/lib/commerce/invoice.ts
/**
* GST tax invoices for website orders.
*
* Shop prices are GST-inclusive, so each line's taxable value is worked back from its price:
*   taxable = gross × 100 / (100 + rate)
* Delivery inside the company's GST state → CGST + SGST (half the rate each);
* delivery to any other state → IGST at the full rate (place of supply = delivery state).
*
* Numbers look like VPL/WEB/26-27/1 and run per Indian financial year (April–March).
* A number is issued once — when an online order is paid, or when a COD order is confirmed —
* and never changes afterwards.
*/
/** Financial year label for a date, e.g. 16 Jun 2026 → "26-27", 10 Feb 2027 → "26-27". */
function financialYear(d = /* @__PURE__ */ new Date()) {
	const y = d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1;
	return `${String(y).slice(2)}-${String(y + 1).slice(2)}`;
}
/** True once the order is a completed sale that should carry a tax invoice. */
function invoiceEligible(o) {
	if (o.order_status === "CANCELLED") return false;
	return o.payment_status === "PAID" || o.payment_method === "cod" && o.order_status !== "PENDING_PAYMENT" && o.order_status !== "AWAITING_OTP";
}
/**
* Issues the next invoice number for an order if it is eligible and has none yet.
* Safe to call repeatedly (browser callback, webhook, page view): only the first call assigns.
*/
function ensureInvoiceNumber(orderRef) {
	const d = db();
	if (!d) return "";
	const o = get("SELECT * FROM orders WHERE order_id = ?", orderRef);
	if (!o) return "";
	if (o.invoice_no) return o.invoice_no;
	if (!invoiceEligible(o)) return "";
	const prefix = getSettings().company.invoicePrefix || "VPL/WEB";
	let issued = "";
	tx(() => {
		const fresh = d.prepare("SELECT invoice_no FROM orders WHERE id = ?").get(o.id);
		if (fresh?.invoice_no) {
			issued = fresh.invoice_no;
			return;
		}
		const fy = financialYear(/* @__PURE__ */ new Date());
		d.prepare("INSERT INTO invoice_counters (fy, last) VALUES (?, 0) ON CONFLICT(fy) DO NOTHING").run(fy);
		d.prepare("UPDATE invoice_counters SET last = last + 1 WHERE fy = ?").run(fy);
		const { last } = d.prepare("SELECT last FROM invoice_counters WHERE fy = ?").get(fy);
		issued = `${prefix}/${fy}/${last}`;
		d.prepare("UPDATE orders SET invoice_no = ?, invoice_date = date('now', 'localtime'), updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(issued, o.id);
	});
	return issued;
}
var r2 = (n) => Math.round(n * 100) / 100;
function computeInvoice(items, order) {
	const co = getSettings().company;
	const defRate = Number(co.defaultGstPercent) || 18;
	const intraState = norm(order.state) === norm(co.gstState || "Maharashtra");
	const src = items.map((i) => ({
		name: i.product_name,
		hsn: i.hsn || co.defaultHsn || "8471",
		quantity: i.quantity,
		unit: "NOS",
		gross: i.line_total,
		gstRate: Number(i.gst_rate) || defRate
	}));
	if (order.delivery_fee > 0) src.push({
		name: "Delivery charges",
		hsn: "996812",
		quantity: 1,
		unit: "SVC",
		gross: order.delivery_fee,
		gstRate: defRate
	});
	const lines = src.map((l, i) => {
		const taxable = r2(l.gross * 100 / (100 + l.gstRate));
		return {
			sno: i + 1,
			...l,
			taxable,
			rate: r2(taxable / l.quantity)
		};
	});
	const byHsn = /* @__PURE__ */ new Map();
	for (const l of lines) {
		const tax = r2(l.gross - l.taxable);
		const half = r2(tax / 2);
		const key = `${l.hsn}|${l.gstRate}`;
		const row = byHsn.get(key) ?? {
			hsn: l.hsn,
			gstRate: l.gstRate,
			taxable: 0,
			cgst: 0,
			sgst: 0,
			igst: 0,
			tax: 0
		};
		row.taxable = r2(row.taxable + l.taxable);
		if (intraState) {
			row.cgst = r2(row.cgst + half);
			row.sgst = r2(row.sgst + r2(tax - half));
		} else row.igst = r2(row.igst + tax);
		row.tax = r2(row.cgst + row.sgst + row.igst);
		byHsn.set(key, row);
	}
	const hsnSummary = [...byHsn.values()];
	const sum = (k) => r2(hsnSummary.reduce((a, r) => a + r[k], 0));
	const taxable = sum("taxable");
	const cgst = sum("cgst");
	const sgst = sum("sgst");
	const igst = sum("igst");
	const tax = r2(cgst + sgst + igst);
	const total = order.total_amount + (Number(order.coin_discount) || 0);
	return {
		lines,
		intraState,
		taxable,
		cgst,
		sgst,
		igst,
		tax,
		roundOff: r2(total - (taxable + tax)),
		total,
		quantity: items.reduce((a, i) => a + i.quantity, 0),
		hsnSummary
	};
}
var norm = (s) => String(s || "").toLowerCase().replace(/[^a-z]/g, "");
var ONES = [
	"",
	"One",
	"Two",
	"Three",
	"Four",
	"Five",
	"Six",
	"Seven",
	"Eight",
	"Nine",
	"Ten",
	"Eleven",
	"Twelve",
	"Thirteen",
	"Fourteen",
	"Fifteen",
	"Sixteen",
	"Seventeen",
	"Eighteen",
	"Nineteen"
];
var TENS = [
	"",
	"",
	"Twenty",
	"Thirty",
	"Forty",
	"Fifty",
	"Sixty",
	"Seventy",
	"Eighty",
	"Ninety"
];
function below1000(n) {
	const h = Math.floor(n / 100);
	const r = n % 100;
	const parts = [];
	if (h) parts.push(`${ONES[h]} Hundred`);
	if (r) parts.push(r < 20 ? ONES[r] : `${TENS[Math.floor(r / 10)]}${r % 10 ? ` ${ONES[r % 10]}` : ""}`);
	return parts.join(" ");
}
/** 3720 → "Three Thousand Seven Hundred Twenty Rupees"; paise are added when present. */
function amountInWords(amount) {
	const rupees = Math.floor(Math.abs(amount));
	const paise = Math.round((Math.abs(amount) - rupees) * 100);
	const words = (n) => {
		if (n === 0) return "Zero";
		const crore = Math.floor(n / 1e7);
		const lakh = Math.floor(n % 1e7 / 1e5);
		const thousand = Math.floor(n % 1e5 / 1e3);
		const rest = n % 1e3;
		return [
			crore ? `${words(crore)} Crore` : "",
			lakh ? `${below1000(lakh)} Lakh` : "",
			thousand ? `${below1000(thousand)} Thousand` : "",
			rest ? below1000(rest) : ""
		].filter(Boolean).join(" ");
	};
	return `${words(rupees)} Rupees${paise ? ` and ${words(paise)} Paise` : ""}`;
}
/** 3152.54 → "3,152.54" (Indian grouping, always two decimals). */
var money = (n) => n.toLocaleString("en-IN", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});
//#endregion
//#region src/lib/sms.ts
/**
* Optional free SMS for OTP codes through textbee.dev: an open-source app on any Android phone
* sends the SMS from that phone's own SIM (no DLT registration, no per-message fee beyond the
* SIM plan). Free plan is roughly 50 SMS/day — email OTP always goes out as well.
* Set the API key and device ID in Admin → Settings → Email, Google Sign-in & OTP
* (or TEXTBEE_API_KEY / TEXTBEE_DEVICE_ID). Without them, OTPs go by email only.
*/
function smsConfig() {
	let s = {};
	try {
		s = getSettings().signin || {};
	} catch {}
	const apiKey = String(s.textbeeApiKey || process.env.TEXTBEE_API_KEY || "").trim();
	const deviceId = String(s.textbeeDeviceId || process.env.TEXTBEE_DEVICE_ID || "").trim();
	return {
		apiKey,
		deviceId,
		enabled: Boolean(apiKey && deviceId)
	};
}
/** Sends a one-time code to a 10-digit Indian mobile. Returns false when SMS is off or the send failed. */
async function sendOtpSms(phone10, code) {
	const cfg = smsConfig();
	const digits = String(phone10).replace(/\D/g, "").slice(-10);
	if (!cfg.enabled || digits.length !== 10) return false;
	const biz = getSettings().business.name;
	try {
		const res = await fetch("https://api.textbee.dev/api/v1/gateway/send-sms", {
			method: "POST",
			headers: {
				"x-api-key": cfg.apiKey,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				deviceId: cfg.deviceId,
				recipients: [`+91${digits}`],
				message: `${code} is your ${biz} order confirmation code. Valid 10 minutes. Do not share it.`
			}),
			signal: AbortSignal.timeout(1e4)
		});
		if (!res.ok) {
			console.warn("[SMS] textbee refused the OTP:", res.status, (await res.text().catch(() => "")).slice(0, 200));
			return false;
		}
		return true;
	} catch (e) {
		console.warn("[SMS] textbee request failed:", e?.message);
		return false;
	}
}
var MAX_ATTEMPTS = 5;
var MAX_SENDS = 5;
var RESEND_SECONDS = 60;
var hashCode = (orderId, code) => createHash("sha256").update(`${orderId}:${code}`).digest("hex");
function codOtpEnabled() {
	return (getSettings().signin || {}).codOtp !== false;
}
function loadOrder(orderRef) {
	return get(`SELECT o.id, o.order_id, o.user_id, o.customer_name, o.customer_phone, o.customer_email, o.order_status, o.cart_id, o.total_amount,
            u.email AS account_email
     FROM orders o LEFT JOIN users u ON u.id = o.user_id WHERE o.order_id = ?`, orderRef);
}
/** "ri***@gmail.com" — enough for the customer to recognise, not enough to leak the address. */
function maskEmail(email) {
	const [u, dom] = email.split("@");
	if (!dom) return email;
	return `${u.slice(0, 2)}${"*".repeat(Math.max(1, u.length - 2))}@${dom}`;
}
/** Creates (or replaces) the code and sends it. `resend` applies the 60-second cooldown and send limit. */
async function sendOrderOtp(orderRef, resend = false) {
	const d = db();
	const o = loadOrder(orderRef);
	if (!d || !o) return {
		ok: false,
		error: "Order not found."
	};
	if (o.order_status !== "AWAITING_OTP") return {
		ok: false,
		error: "This order is already confirmed."
	};
	const to = (o.customer_email || o.account_email || "").trim();
	if (!to) return {
		ok: false,
		error: "We have no email address for this order. Please call us to confirm it."
	};
	const existing = d.prepare("SELECT sends, last_sent_at FROM order_otps WHERE order_id = ?").get(o.id);
	if (resend && existing) {
		const since = (Date.now() - +/* @__PURE__ */ new Date(existing.last_sent_at.replace(" ", "T") + "Z")) / 1e3;
		if (since < RESEND_SECONDS) return {
			ok: false,
			error: `Please wait ${Math.ceil(RESEND_SECONDS - since)} seconds before asking for a new code.`
		};
		if (existing.sends >= MAX_SENDS) return {
			ok: false,
			error: "Too many codes sent for this order. Please call us to confirm it."
		};
	}
	const code = String(randomInt(0, 1e6)).padStart(6, "0");
	d.prepare(`INSERT INTO order_otps (order_id, code_hash, sent_to, expires_at, attempts, sends, last_sent_at)
     VALUES (?, ?, ?, datetime('now', '+10 minutes'), 0, 1, datetime('now'))
     ON CONFLICT(order_id) DO UPDATE SET code_hash = excluded.code_hash, sent_to = excluded.sent_to,
       expires_at = excluded.expires_at, attempts = 0, sends = sends + 1, last_sent_at = datetime('now'), verified_at = NULL`).run(o.id, hashCode(o.id, code), to);
	const biz = getSettings().business.name;
	const mail = await sendEmail({
		to,
		subject: `${code} is your ${biz} order code`,
		text: `Hello ${o.customer_name},\n\nYour code to confirm Cash on Delivery order ${o.order_id} is: ${code}\n\nIt is valid for 10 minutes. If you did not place this order, ignore this email.\n\n${biz}`,
		html: `<div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #e2e8f0;border-radius:12px">
<p>Hello ${escapeHtml(o.customer_name)},</p>
<p>Your code to confirm Cash on Delivery order <b>${escapeHtml(o.order_id)}</b> is:</p>
<p style="font-size:32px;font-weight:800;letter-spacing:8px;margin:18px 0;color:#0b2545">${code}</p>
<p style="color:#64748b;font-size:13px">Valid for 10 minutes. If you did not place this order, you can ignore this email.</p></div>`
	});
	const sms = await sendOtpSms(o.customer_phone, code);
	if (!mail.success && !sms) return {
		ok: false,
		error: "We could not send the code. Please try again in a minute or call us."
	};
	return {
		ok: true,
		sentTo: [mail.success && !mail.devMode ? maskEmail(to) : "", sms ? `+91 ******${o.customer_phone.slice(-4)}` : ""].filter(Boolean).join(" and ") || maskEmail(to),
		devCode: mail.devMode && !isProduction() ? code : void 0
	};
}
/** Checks the typed code; on success the order is confirmed exactly like a COD order used to be. */
function verifyOrderOtp(orderRef, code) {
	const d = db();
	const o = loadOrder(orderRef);
	if (!d || !o) return {
		ok: false,
		error: "Order not found."
	};
	if (o.order_status !== "AWAITING_OTP") return { ok: true };
	const row = d.prepare("SELECT code_hash, expires_at, attempts FROM order_otps WHERE order_id = ?").get(o.id);
	if (!row) return {
		ok: false,
		error: "Please ask for a code first."
	};
	if (row.attempts >= MAX_ATTEMPTS) return {
		ok: false,
		error: "Too many wrong codes. Ask for a new code."
	};
	if (+/* @__PURE__ */ new Date(row.expires_at.replace(" ", "T") + "Z") < Date.now()) return {
		ok: false,
		error: "This code has expired. Ask for a new code."
	};
	const clean = String(code).replace(/\D/g, "");
	if (clean.length !== 6 || hashCode(o.id, clean) !== row.code_hash) {
		d.prepare("UPDATE order_otps SET attempts = attempts + 1 WHERE order_id = ?").run(o.id);
		const left = MAX_ATTEMPTS - row.attempts - 1;
		return {
			ok: false,
			error: left > 0 ? `That code is not right. ${left} attempt${left === 1 ? "" : "s"} left.` : "Too many wrong codes. Ask for a new code."
		};
	}
	const res = d.prepare("UPDATE orders SET order_status = 'CONFIRMED', updated_at = CURRENT_TIMESTAMP WHERE id = ? AND order_status = 'AWAITING_OTP'").run(o.id);
	d.prepare("UPDATE order_otps SET verified_at = datetime('now') WHERE order_id = ?").run(o.id);
	if (Number(res.changes) > 0) {
		emptyCartById(o.cart_id);
		ensureInvoiceNumber(o.order_id);
		reconcileOrderStock(o.id);
	}
	return { ok: true };
}
//#endregion
export { amountInWords as a, invoiceEligible as c, verifyOrderOtp as i, money as l, maskEmail as n, computeInvoice as o, sendOrderOtp as r, ensureInvoiceNumber as s, codOtpEnabled as t };
