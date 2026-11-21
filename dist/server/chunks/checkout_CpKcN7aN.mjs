import { r as db } from "./db_DdeOHGNv.mjs";
import { n as getSettings } from "./settings_D-p7f3sg.mjs";
import { u as getPaymentConfig } from "./cart_DNQqdeQo.mjs";
import { a as markOrderPaid, r as getOrder, t as attachGatewayOrder } from "./orders_wTHzsAQs.mjs";
import { n as fetchRazorpayOrderState, t as createRazorpayOrder } from "./razorpay_CewV_aLl.mjs";
//#region src/lib/cashfree.ts
/** Cashfree credentials come from the shared payment config (admin settings, then env). */
function cashfreeApi() {
	const { cashfree } = getPaymentConfig();
	return {
		...cashfree,
		baseUrl: cashfree.env === "PROD" ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg"
	};
}
/**
* Creates an order session on Cashfree Payment Gateway.
* Callers must check `getPaymentConfig().onlineAvailable` first; there is no simulated mode.
*/
async function createCashfreeOrder(params) {
	const cfg = cashfreeApi();
	if (!cfg.configured) return {
		success: false,
		orderId: params.orderId,
		error: "Online payment is not configured."
	};
	const rawDigits = params.customerPhone.replace(/\D/g, "");
	const cleanPhone = rawDigits.length >= 10 ? rawDigits.slice(-10) : "9999999999";
	const cleanEmail = params.customerEmail && params.customerEmail.includes("@") ? params.customerEmail : `customer_${params.orderId.toLowerCase().replace(/[^a-z0-9]/g, "")}@virnobyte.com`;
	const payload = {
		order_id: params.orderId,
		order_amount: Math.round(params.amount),
		order_currency: "INR",
		customer_details: {
			customer_id: `cust_${cleanPhone}`,
			customer_name: params.customerName || "Customer",
			customer_email: cleanEmail,
			customer_phone: cleanPhone
		},
		order_meta: { return_url: params.returnUrl },
		order_note: params.note || "Virnobyte Order"
	};
	try {
		const res = await fetch(`${cfg.baseUrl}/orders`, {
			method: "POST",
			headers: {
				"x-client-id": cfg.appId,
				"x-client-secret": cfg.secretKey,
				"x-api-version": "2023-08-01",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payload)
		});
		const data = await res.json();
		if (!res.ok || !data.payment_session_id) {
			console.error("[Cashfree] Create Order Error:", res.status, data);
			const errorMsg = data.type === "authentication_error" || typeof data.message === "string" && data.message.toLowerCase().includes("authentication") ? "Payment gateway error: Cashfree authentication failed. Please verify your Cashfree App ID, Secret Key & Environment (Test/Prod) in Admin Settings, or choose Cash on Delivery." : data.message || "Failed to initialize payment with Cashfree.";
			return {
				success: false,
				orderId: params.orderId,
				error: errorMsg
			};
		}
		return {
			success: true,
			orderId: data.order_id || params.orderId,
			cfOrderId: data.cf_order_id,
			paymentSessionId: data.payment_session_id,
			isTestMode: cfg.env === "TEST"
		};
	} catch (err) {
		console.error("Cashfree Request Exception:", err);
		return {
			success: false,
			orderId: params.orderId,
			error: err.message || "Network error connecting to Cashfree Payment Gateway."
		};
	}
}
/**
* Verifies an order's payment status with Cashfree.
*/
async function verifyCashfreeOrder(orderId) {
	const cfg = cashfreeApi();
	if (!cfg.configured) return {
		isPaid: false,
		status: "UNCONFIGURED"
	};
	try {
		const res = await fetch(`${cfg.baseUrl}/orders/${encodeURIComponent(orderId)}`, {
			method: "GET",
			headers: {
				"x-client-id": cfg.appId,
				"x-client-secret": cfg.secretKey,
				"x-api-version": "2023-08-01"
			}
		});
		if (!res.ok) return {
			isPaid: false,
			status: "UNKNOWN"
		};
		const data = await res.json();
		return {
			isPaid: data.order_status === "PAID",
			status: data.order_status || "PENDING",
			data
		};
	} catch (err) {
		console.error("Error verifying Cashfree order:", err);
		return {
			isPaid: false,
			status: "ERROR"
		};
	}
}
//#endregion
//#region src/lib/commerce/checkout.ts
/**
* Opens (or re-opens) the gateway order for an unpaid online order.
* Safe to call repeatedly: an existing gateway order is reused, so a retry never double-charges.
*/
async function startOnlinePayment(order, origin) {
	const cfg = getPaymentConfig();
	if (!cfg.onlineAvailable || order.gateway !== cfg.gateway) return {
		ok: false,
		error: "Online payment is not available right now. Please choose Cash on Delivery or call us."
	};
	if (cfg.gateway === "razorpay") {
		let rzpId = order.gateway_order_id;
		if (!rzpId) {
			const created = await createRazorpayOrder({
				amountRupees: order.total_amount,
				receipt: order.order_id,
				notes: {
					order_id: order.order_id,
					phone: order.customer_phone
				}
			});
			if (!created.success || !created.id) return {
				ok: false,
				error: created.error || "Could not start the payment."
			};
			rzpId = created.id;
			attachGatewayOrder(order.order_id, rzpId);
		}
		return {
			ok: true,
			intent: {
				gateway: "razorpay",
				key: cfg.razorpay.keyId,
				razorpayOrderId: rzpId,
				amount: order.total_amount * 100,
				currency: "INR",
				name: getSettings().business.name,
				description: `Order ${order.order_id}`,
				prefill: {
					name: order.customer_name,
					email: order.customer_email,
					contact: order.customer_phone
				}
			}
		};
	}
	let sessionId = String(order.cashfree_session_id || "");
	if (!sessionId) {
		const cf = await createCashfreeOrder({
			orderId: order.order_id,
			amount: order.total_amount,
			customerName: order.customer_name,
			customerPhone: order.customer_phone,
			customerEmail: order.customer_email,
			returnUrl: `${origin}/api/checkout/verify?order_id={order_id}`,
			note: `Virnobyte order ${order.order_id}`
		});
		if (!cf.success || !cf.paymentSessionId) return {
			ok: false,
			error: cf.error || "Could not start the payment."
		};
		sessionId = cf.paymentSessionId;
		db()?.prepare("UPDATE orders SET cashfree_order_id = ?, cashfree_session_id = ?, gateway_order_id = ? WHERE order_id = ?").run(String(cf.cfOrderId || ""), sessionId, String(cf.cfOrderId || ""), order.order_id);
	}
	return {
		ok: true,
		intent: {
			gateway: "cashfree",
			paymentSessionId: sessionId,
			mode: cfg.cashfree.env === "PROD" ? "production" : "sandbox"
		}
	};
}
/**
* Asks the gateway directly whether a pending order was paid. Covers the case where
* the shopper paid but the browser never returned and no webhook has arrived yet.
*/
async function reconcileOrder(orderRef) {
	const order = getOrder(orderRef);
	if (!order || order.payment_status !== "PENDING") return order;
	const cfg = getPaymentConfig();
	if (order.gateway === "razorpay" && order.gateway_order_id && cfg.razorpay.configured) {
		const state = await fetchRazorpayOrderState(order.gateway_order_id);
		if (state.paid) markOrderPaid(order.order_id, state.paymentId);
	} else if (order.gateway === "cashfree" && cfg.cashfree.configured) {
		const state = await verifyCashfreeOrder(order.order_id);
		if (state.isPaid) markOrderPaid(order.order_id, String(state.data?.cf_order_id || ""));
	}
	return getOrder(orderRef);
}
//#endregion
export { startOnlinePayment as n, reconcileOrder as t };
