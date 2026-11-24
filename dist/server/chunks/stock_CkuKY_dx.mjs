import { l as txImmediate, r as db } from "./db_CrQR8QZK.mjs";
var STATUS_LABEL = {
	HELD: "Awaiting payment",
	ASSIGNED: "Waiting to ship",
	ACCEPTED: "Waiting to ship",
	SHIPPED: "Shipped",
	DELIVERED: "Delivered",
	UNASSIGNED: "No vendor yet",
	REJECTED: "Vendor couldn't ship",
	CANCELLED: "Cancelled",
	EXPIRED: "Payment timed out",
	RETURNED: "Returned"
};
var StockError = class extends Error {
	status = 409;
};
function D() {
	const d = db();
	if (!d) throw new Error("Inventory is unavailable right now.");
	return d;
}
/** A source counts only while active and (for vendors) its stock was confirmed within stale_hours. */
var USABLE_SQL = `s.active = 1 AND (s.kind = 'own' OR s.stale_hours <= 0 OR (s.stock_updated_at IS NOT NULL AND s.stock_updated_at >= datetime('now', '-' || s.stale_hours || ' hours')))`;
var RESERVED_SQL = `COALESCE((SELECT SUM(a.qty) FROM inv_allocations a
  WHERE a.source_id = st.source_id AND a.product_id = st.product_id
    AND (a.status IN ('ASSIGNED','ACCEPTED') OR (a.status = 'HELD' AND a.expires_at > datetime('now')))), 0)`;
/** Every source that lists this product, in shipping order, with usable = 1 when it may sell. */
function stockBySource(productId) {
	return D().prepare(`SELECT st.source_id, s.name, s.kind, s.priority, st.qty, st.sku, st.updated_at, s.stock_updated_at, s.active,
              ${RESERVED_SQL} AS reserved,
              st.qty - ${RESERVED_SQL} AS free,
              CASE WHEN ${USABLE_SQL} THEN 1 ELSE 0 END AS usable
       FROM inv_stock st JOIN inv_sources s ON s.id = st.source_id
       WHERE st.product_id = ?
       ORDER BY CASE s.kind WHEN 'own' THEN 0 ELSE 1 END, s.priority, s.id`).all(productId);
}
function isTracked(productId) {
	const d = db();
	if (!d) return false;
	return !!d.prepare("SELECT tracked FROM inv_products WHERE product_id = ?").get(productId)?.tracked;
}
/** Live sellable units, or null when the product is not controlled by inventory. */
function availableFor(productId) {
	if (!isTracked(productId)) return null;
	return stockBySource(productId).filter((s) => s.usable).reduce((n, s) => n + Math.max(0, s.free), 0);
}
function track(productId) {
	D().prepare("INSERT OR IGNORE INTO inv_products (product_id, tracked) VALUES (?, 1)").run(productId);
}
function setTracking(productId, tracked, lowLevel) {
	const d = D();
	d.prepare("INSERT OR IGNORE INTO inv_products (product_id, tracked) VALUES (?, ?)").run(productId, tracked ? 1 : 0);
	d.prepare("UPDATE inv_products SET tracked = ? WHERE product_id = ?").run(tracked ? 1 : 0, productId);
	if (lowLevel != null && Number.isFinite(lowLevel)) d.prepare("UPDATE inv_products SET low_level = ?, low_alerted = 0 WHERE product_id = ?").run(Math.max(0, Math.trunc(lowLevel)), productId);
	syncProducts([productId]);
}
var lowStockHandler = null;
/** Registered by notify.ts so this module never imports the mailer (keeps it cycle-free and testable). */
function onLowStock(fn) {
	lowStockHandler = fn;
}
/**
* Recomputes availability for tracked products (all of them when `ids` is omitted) and writes
* products.in_stock. Returns how many products changed between in stock and out of stock.
*/
function syncProducts(ids) {
	const d = db();
	if (!d) return 0;
	const rows = ids?.length ? d.prepare(`SELECT ip.*, p.name, p.in_stock FROM inv_products ip JOIN products p ON p.id = ip.product_id WHERE ip.tracked = 1 AND ip.product_id IN (${ids.map(() => "?").join(",")})`).all(...ids) : d.prepare("SELECT ip.*, p.name, p.in_stock FROM inv_products ip JOIN products p ON p.id = ip.product_id WHERE ip.tracked = 1").all();
	let flipped = 0;
	const alerts = [];
	const setStock = d.prepare("UPDATE products SET in_stock = ? WHERE id = ?");
	const setCache = d.prepare("UPDATE inv_products SET available = ?, low_alerted = ?, synced_at = datetime('now') WHERE product_id = ?");
	for (const r of rows) {
		const avail = stockBySource(r.product_id).filter((s) => s.usable).reduce((n, s) => n + Math.max(0, s.free), 0);
		const inStock = avail > 0 ? 1 : 0;
		if (inStock !== r.in_stock) {
			setStock.run(inStock, r.product_id);
			flipped++;
		}
		const low = avail <= r.low_level;
		if (low && !r.low_alerted) alerts.push({
			productId: r.product_id,
			name: r.name,
			available: avail,
			lowLevel: r.low_level
		});
		setCache.run(avail, low ? 1 : 0, r.product_id);
	}
	if (alerts.length && lowStockHandler) try {
		lowStockHandler(alerts);
	} catch (e) {
		console.warn("[Inventory] low-stock alert failed:", e);
	}
	return flipped;
}
function logMovement(sourceId, productId, delta, qtyAfter, kind, ref, note, actor) {
	D().prepare("INSERT INTO inv_movements (source_id, product_id, delta, qty_after, kind, ref, note, actor) VALUES (?,?,?,?,?,?,?,?)").run(sourceId, productId, delta, qtyAfter, kind, ref, note.slice(0, 300), actor.slice(0, 120));
}
function touchSource(sourceId) {
	D().prepare("UPDATE inv_sources SET stock_updated_at = datetime('now') WHERE id = ?").run(sourceId);
}
/** Sets the absolute quantity a source holds. Must run inside a transaction or on its own. */
function writeQty(sourceId, productId, qty, kind, actor, note = "", sku) {
	const d = D();
	const q = Math.max(0, Math.trunc(Number(qty) || 0));
	const cur = d.prepare("SELECT qty, sku FROM inv_stock WHERE source_id = ? AND product_id = ?").get(sourceId, productId);
	if (!cur) {
		d.prepare("INSERT INTO inv_stock (source_id, product_id, qty, sku) VALUES (?,?,?,?)").run(sourceId, productId, q, (sku ?? "").trim().slice(0, 80));
		track(productId);
		if (q) logMovement(sourceId, productId, q, q, kind, "", note, actor);
		return q;
	}
	const newSku = sku == null ? cur.sku : sku.trim().slice(0, 80);
	if (cur.qty === q && newSku === cur.sku) {
		d.prepare("UPDATE inv_stock SET updated_at = datetime('now') WHERE source_id = ? AND product_id = ?").run(sourceId, productId);
		return 0;
	}
	d.prepare("UPDATE inv_stock SET qty = ?, sku = ?, updated_at = datetime('now') WHERE source_id = ? AND product_id = ?").run(q, newSku, sourceId, productId);
	if (cur.qty !== q) logMovement(sourceId, productId, q - cur.qty, q, kind, "", note, actor);
	return q - cur.qty;
}
/** Updates several quantities for one source in one transaction, marks the source as freshly updated, and re-syncs products. */
function setStock(sourceId, rows, kind, actor, note = "") {
	txImmediate(() => {
		for (const r of rows) writeQty(sourceId, r.productId, r.qty, kind, actor, note, r.sku);
		touchSource(sourceId);
	});
	syncProducts(rows.map((r) => r.productId));
}
function removeStockRow(sourceId, productId, actor) {
	txImmediate(() => {
		const cur = D().prepare("SELECT qty FROM inv_stock WHERE source_id = ? AND product_id = ?").get(sourceId, productId);
		if (!cur) return;
		D().prepare("DELETE FROM inv_stock WHERE source_id = ? AND product_id = ?").run(sourceId, productId);
		if (cur.qty) logMovement(sourceId, productId, -cur.qty, 0, "ADJUST", "", "Removed from this source", actor);
	});
	syncProducts([productId]);
}
/** "Everything I listed is still correct" — refreshes the source's last-update time without changing numbers. */
function confirmSourceStock(sourceId) {
	const d = D();
	touchSource(sourceId);
	d.prepare("UPDATE inv_stock SET updated_at = datetime('now') WHERE source_id = ?").run(sourceId);
	syncProducts(d.prepare("SELECT product_id FROM inv_stock WHERE source_id = ?").all(sourceId).map((r) => r.product_id));
}
function insertAllocation(i, sourceId, qty, status) {
	const res = D().prepare(`INSERT INTO inv_allocations (order_id, order_item_id, product_id, source_id, qty, status, expires_at, assigned_at)
       VALUES (?,?,?,?,?,?,
         CASE WHEN ? = 'HELD' THEN datetime('now', '+30 minutes') END,
         CASE WHEN ? = 'ASSIGNED' THEN datetime('now') END)`).run(i.orderId, i.itemId, i.productId, sourceId, qty, status, status, status);
	return Number(res.lastInsertRowid);
}
/** Splits a line across sources in shipping order. Returns the new allocation ids. Call inside a transaction. */
function allocate(i) {
	const exclude = new Set(i.excludeSources ?? []);
	const sources = stockBySource(i.productId).filter((s) => s.usable && s.free > 0 && !exclude.has(s.source_id));
	const total = sources.reduce((n, s) => n + s.free, 0);
	if (total < i.qty && !i.allowShort) throw new StockError(total > 0 ? `Only ${total} unit${total === 1 ? "" : "s"} of ${i.name} left. Please lower the quantity.` : `${i.name} just went out of stock. Please remove it from your order.`);
	const ids = [];
	let need = i.qty;
	for (const s of sources) {
		if (need <= 0) break;
		const take = Math.min(need, s.free);
		ids.push(insertAllocation(i, s.source_id, take, i.status));
		need -= take;
	}
	if (need > 0) ids.push(insertAllocation(i, null, need, "UNASSIGNED"));
	return ids;
}
/**
* Reserves stock for a new order. Runs inside the order's transaction, so a shortfall rolls
* the whole order back. Confirmed (COD) orders are assigned straight away; online ones are held.
*/
function reserveForOrder(orderId, lines, confirmed) {
	const ids = [];
	for (const l of lines) {
		if (!l.productId || !isTracked(l.productId)) continue;
		ids.push(...allocate({
			orderId,
			itemId: l.itemId,
			productId: l.productId,
			qty: l.qty,
			status: confirmed ? "ASSIGNED" : "HELD",
			name: l.name
		}));
	}
	return ids;
}
function orderProductIds(orderId) {
	return D().prepare("SELECT DISTINCT product_id FROM inv_allocations WHERE order_id = ?").all(orderId).map((r) => r.product_id);
}
var eventHandler = null;
/** notify.ts registers the mailer here. */
function onStockEvents(fn) {
	eventHandler = fn;
}
function emit(e) {
	if (!eventHandler || !e.assigned.length && !e.cancelled.length) return;
	try {
		eventHandler(e);
	} catch (err) {
		console.warn("[Inventory] notification failed:", err);
	}
}
/** Call after the order transaction committed: syncs products and tells sources about confirmed lines. */
function afterOrderPlaced(orderId) {
	const d = db();
	if (!d) return;
	syncProducts(orderProductIds(orderId));
	emit({
		assigned: d.prepare("SELECT id FROM inv_allocations WHERE order_id = ? AND status IN ('ASSIGNED','UNASSIGNED')").all(orderId).map((r) => r.id),
		cancelled: []
	});
}
/** Payment received (or COD confirmed): turn holds into assignments, re-allocating any hold that expired meanwhile. */
function commitOrder(orderId) {
	const d = D();
	const assigned = [];
	txImmediate(() => {
		const live = d.prepare("SELECT id FROM inv_allocations WHERE order_id = ? AND status = 'HELD' AND expires_at > datetime('now')").all(orderId);
		d.prepare("UPDATE inv_allocations SET status = 'ASSIGNED', expires_at = NULL, assigned_at = datetime('now'), updated_at = datetime('now') WHERE order_id = ? AND status = 'HELD' AND expires_at > datetime('now')").run(orderId);
		assigned.push(...live.map((r) => r.id));
		d.prepare("UPDATE inv_allocations SET status = 'EXPIRED', updated_at = datetime('now') WHERE order_id = ? AND status = 'HELD'").run(orderId);
		if (!d.prepare("SELECT 1 FROM inv_allocations WHERE order_id = ? LIMIT 1").get(orderId)) return;
		const items = d.prepare("SELECT id, product_id, product_name, quantity FROM order_items WHERE order_id = ?").all(orderId);
		for (const it of items) {
			if (!it.product_id || !isTracked(it.product_id)) continue;
			const covered = d.prepare("SELECT COALESCE(SUM(qty), 0) AS n FROM inv_allocations WHERE order_item_id = ? AND status IN ('ASSIGNED','ACCEPTED','SHIPPED','DELIVERED','UNASSIGNED')").get(it.id).n;
			const need = it.quantity - covered;
			if (need > 0) assigned.push(...allocate({
				orderId,
				itemId: it.id,
				productId: it.product_id,
				qty: need,
				status: "ASSIGNED",
				name: it.product_name,
				allowShort: true
			}));
		}
	});
	return assigned;
}
function cancelOrderLines(orderId) {
	const d = D();
	const rows = d.prepare("SELECT id, status FROM inv_allocations WHERE order_id = ? AND status IN ('HELD','ASSIGNED','ACCEPTED','UNASSIGNED')").all(orderId);
	if (!rows.length) return [];
	d.prepare("UPDATE inv_allocations SET status = 'CANCELLED', updated_at = datetime('now') WHERE order_id = ? AND status IN ('HELD','ASSIGNED','ACCEPTED','UNASSIGNED')").run(orderId);
	return rows.filter((r) => r.status === "ASSIGNED" || r.status === "ACCEPTED").map((r) => r.id);
}
/**
* Brings an order's stock in line with its current status. Idempotent; safe to call after
* payment callbacks, webhooks and every admin save of the order.
*/
function reconcileOrderStock(orderId) {
	const d = db();
	if (!d) return;
	const o = d.prepare("SELECT id, order_status, payment_status, payment_method FROM orders WHERE id = ?").get(orderId);
	if (!o) return;
	let events = {
		assigned: [],
		cancelled: []
	};
	if (o.order_status === "CANCELLED") events.cancelled = txImmediate(() => cancelOrderLines(orderId));
	else if (o.payment_status === "PAID" || o.payment_method === "cod" && o.order_status !== "PENDING_PAYMENT" && o.order_status !== "AWAITING_OTP") events.assigned = commitOrder(orderId);
	else return;
	syncProducts(orderProductIds(orderId));
	advanceOrderStatus(orderId);
	emit(events);
}
/** Releases holds whose payment never arrived. Returns how many were released. */
function expireHolds() {
	const d = db();
	if (!d) return 0;
	const rows = d.prepare("SELECT DISTINCT product_id FROM inv_allocations WHERE status = 'HELD' AND expires_at <= datetime('now')").all();
	if (!rows.length) return 0;
	const res = d.prepare("UPDATE inv_allocations SET status = 'EXPIRED', updated_at = datetime('now') WHERE status = 'HELD' AND expires_at <= datetime('now')").run();
	syncProducts(rows.map((r) => r.product_id));
	return Number(res.changes) || 0;
}
var ORDER_RANK = {
	CONFIRMED: 0,
	PROCESSING: 1,
	OUT_FOR_DELIVERY: 2,
	DELIVERED: 3
};
/** Moves the order forward (never backward) when every line is handled by inventory. */
function advanceOrderStatus(orderId) {
	const d = db();
	if (!d) return;
	const o = d.prepare("SELECT order_status FROM orders WHERE id = ?").get(orderId);
	if (!o || !(o.order_status in ORDER_RANK)) return;
	const items = d.prepare("SELECT id FROM order_items WHERE order_id = ?").all(orderId);
	if (!items.length) return;
	const live = d.prepare("SELECT order_item_id, status FROM inv_allocations WHERE order_id = ? AND status NOT IN ('REJECTED','CANCELLED','EXPIRED','RETURNED')").all(orderId);
	if (items.some((it) => !live.some((a) => a.order_item_id === it.id))) return;
	const all = (s) => live.every((a) => s.includes(a.status));
	const target = all(["DELIVERED"]) ? "DELIVERED" : all(["SHIPPED", "DELIVERED"]) ? "OUT_FOR_DELIVERY" : live.some((a) => [
		"ACCEPTED",
		"SHIPPED",
		"DELIVERED"
	].includes(a.status)) ? "PROCESSING" : null;
	if (target && ORDER_RANK[target] > ORDER_RANK[o.order_status]) d.prepare("UPDATE orders SET order_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(target, orderId);
}
var ALLOWED_FROM = {
	accept: ["ASSIGNED"],
	reject: ["ASSIGNED", "ACCEPTED"],
	ship: ["ASSIGNED", "ACCEPTED"],
	deliver: ["SHIPPED"],
	assign: [
		"UNASSIGNED",
		"ASSIGNED",
		"ACCEPTED"
	],
	return: ["SHIPPED", "DELIVERED"],
	cancel: [
		"HELD",
		"ASSIGNED",
		"ACCEPTED",
		"UNASSIGNED"
	]
};
var VENDOR_ACTIONS = [
	"accept",
	"reject",
	"ship",
	"deliver"
];
/** Applies one fulfilment step. Throws an Error with a message fit to show the user. */
function fulfil(allocId, action, actor, input = {}) {
	const d = D();
	const events = {
		assigned: [],
		cancelled: []
	};
	let message = "";
	const a = d.prepare("SELECT a.*, o.order_id AS order_ref, o.order_status FROM inv_allocations a JOIN orders o ON o.id = a.order_id WHERE a.id = ?").get(allocId);
	if (!a) throw new Error("That order line no longer exists.");
	if (actor.kind === "vendor" && (a.source_id !== actor.sourceId || !VENDOR_ACTIONS.includes(action))) throw new Error("This order line is not assigned to you.");
	if (!ALLOWED_FROM[action]?.includes(a.status)) throw new Error(`This line is "${STATUS_LABEL[a.status] ?? a.status}" and cannot be changed that way.`);
	const note = String(input.note ?? "").trim().slice(0, 300);
	txImmediate(() => {
		switch (action) {
			case "accept":
				d.prepare("UPDATE inv_allocations SET status = 'ACCEPTED', updated_at = datetime('now') WHERE id = ?").run(allocId);
				message = "Accepted. Please ship it soon and add the tracking number.";
				break;
			case "ship": {
				const courier = String(input.courier ?? "").trim().slice(0, 80);
				const tracking = String(input.trackingNo ?? "").trim().slice(0, 80);
				if (actor.kind === "vendor" && !courier) throw new Error("Enter the courier name.");
				d.prepare("UPDATE inv_allocations SET status = 'SHIPPED', courier = ?, tracking_no = ?, note = CASE WHEN ? != '' THEN ? ELSE note END, shipped_at = datetime('now'), updated_at = datetime('now') WHERE id = ?").run(courier, tracking, note, note, allocId);
				if (a.source_id) {
					const cur = d.prepare("SELECT qty FROM inv_stock WHERE source_id = ? AND product_id = ?").get(a.source_id, a.product_id);
					if (cur) {
						const after = Math.max(0, cur.qty - a.qty);
						d.prepare("UPDATE inv_stock SET qty = ?, updated_at = datetime('now') WHERE source_id = ? AND product_id = ?").run(after, a.source_id, a.product_id);
						logMovement(a.source_id, a.product_id, after - cur.qty, after, "SHIPPED", a.order_ref, tracking ? `${courier} ${tracking}`.trim() : courier, actor.name);
					}
				}
				message = "Marked as shipped.";
				break;
			}
			case "deliver":
				d.prepare("UPDATE inv_allocations SET status = 'DELIVERED', delivered_at = datetime('now'), updated_at = datetime('now') WHERE id = ?").run(allocId);
				message = "Marked as delivered.";
				break;
			case "reject": {
				if (!note) throw new Error("Add a short reason for rejecting.");
				d.prepare("UPDATE inv_allocations SET status = 'REJECTED', note = ?, updated_at = datetime('now') WHERE id = ?").run(note, allocId);
				const refused = d.prepare("SELECT DISTINCT source_id FROM inv_allocations WHERE order_item_id IS ? AND order_id = ? AND product_id = ? AND status = 'REJECTED' AND source_id IS NOT NULL").all(a.order_item_id, a.order_id, a.product_id).map((r) => r.source_id);
				const name = d.prepare("SELECT name FROM products WHERE id = ?").get(a.product_id)?.name ?? "Product";
				events.assigned = allocate({
					orderId: a.order_id,
					itemId: a.order_item_id,
					productId: a.product_id,
					qty: a.qty,
					status: "ASSIGNED",
					name,
					excludeSources: refused,
					allowShort: true
				});
				message = "Rejected. The order line has been passed on.";
				break;
			}
			case "assign": {
				const sid = Number(input.sourceId);
				const src = d.prepare("SELECT id, active FROM inv_sources WHERE id = ?").get(sid);
				if (!src) throw new Error("Choose a source.");
				if (src.id === a.source_id) throw new Error("This line is already with that source.");
				if (a.status === "ASSIGNED" || a.status === "ACCEPTED") events.cancelled.push(allocId);
				if (a.status === "UNASSIGNED") {
					d.prepare("UPDATE inv_allocations SET source_id = ?, status = 'ASSIGNED', assigned_at = datetime('now'), updated_at = datetime('now') WHERE id = ?").run(sid, allocId);
					events.assigned.push(allocId);
				} else {
					d.prepare("UPDATE inv_allocations SET status = 'CANCELLED', note = 'Moved to another source', updated_at = datetime('now') WHERE id = ?").run(allocId);
					events.assigned.push(insertAllocation({
						orderId: a.order_id,
						itemId: a.order_item_id,
						productId: a.product_id,
						qty: a.qty,
						status: "ASSIGNED",
						name: ""
					}, sid, a.qty, "ASSIGNED"));
				}
				message = "Assigned.";
				break;
			}
			case "return":
				d.prepare("UPDATE inv_allocations SET status = 'RETURNED', note = CASE WHEN ? != '' THEN ? ELSE note END, updated_at = datetime('now') WHERE id = ?").run(note, note, allocId);
				if (input.restock && a.source_id) {
					const cur = d.prepare("SELECT qty FROM inv_stock WHERE source_id = ? AND product_id = ?").get(a.source_id, a.product_id);
					if (cur) {
						d.prepare("UPDATE inv_stock SET qty = ?, updated_at = datetime('now') WHERE source_id = ? AND product_id = ?").run(cur.qty + a.qty, a.source_id, a.product_id);
						logMovement(a.source_id, a.product_id, a.qty, cur.qty + a.qty, "RETURNED", a.order_ref, note, actor.name);
					}
				}
				message = input.restock ? "Marked as returned and added back to stock." : "Marked as returned.";
				break;
			case "cancel":
				d.prepare("UPDATE inv_allocations SET status = 'CANCELLED', note = CASE WHEN ? != '' THEN ? ELSE note END, updated_at = datetime('now') WHERE id = ?").run(note, note, allocId);
				if (a.status === "ASSIGNED" || a.status === "ACCEPTED") events.cancelled.push(allocId);
				message = "Line cancelled. The order itself is unchanged.";
		}
	});
	syncProducts([a.product_id]);
	advanceOrderStatus(a.order_id);
	emit(events);
	return message;
}
var ALLOCATION_SELECT = `
  SELECT a.id, a.order_id, o.order_id AS order_ref, o.order_status, a.product_id,
         COALESCE(p.name, oi.product_name, 'Product') AS product_name, COALESCE(p.slug, oi.product_slug, '') AS product_slug,
         COALESCE(st.sku, '') AS sku, a.qty, a.status, a.source_id, s.name AS source_name, s.kind AS source_kind, s.email AS source_email,
         a.courier, a.tracking_no, a.note, a.created_at, a.assigned_at, a.shipped_at,
         o.customer_name, o.customer_phone, o.address_line1, o.address_line2, o.city, o.state, o.pincode
  FROM inv_allocations a
  JOIN orders o ON o.id = a.order_id
  LEFT JOIN order_items oi ON oi.id = a.order_item_id
  LEFT JOIN products p ON p.id = a.product_id
  LEFT JOIN inv_sources s ON s.id = a.source_id
  LEFT JOIN inv_stock st ON st.source_id = a.source_id AND st.product_id = a.product_id`;
/** One-line shipping state per order, for the Customer Orders list. Orders without inventory lines are omitted. */
function shippingSummaries(orderIds) {
	const out = /* @__PURE__ */ new Map();
	const d = db();
	if (!d || !orderIds.length) return out;
	const rows = d.prepare(`SELECT a.order_id, a.status, a.courier, a.tracking_no, a.assigned_at, s.name AS source_name
       FROM inv_allocations a LEFT JOIN inv_sources s ON s.id = a.source_id
       WHERE a.order_id IN (${orderIds.map(() => "?").join(",")}) AND a.status NOT IN ('REJECTED','EXPIRED')`).all(...orderIds);
	const byOrder = /* @__PURE__ */ new Map();
	for (const r of rows) (byOrder.get(r.order_id) ?? byOrder.set(r.order_id, []).get(r.order_id)).push(r);
	const lateCut = Date.now() - 1728e5;
	for (const [orderId, list] of byOrder) {
		const live = list.filter((r) => r.status !== "CANCELLED");
		const has = (...s) => live.some((r) => s.includes(r.status));
		const all = (...s) => live.length > 0 && live.every((r) => s.includes(r.status));
		const late = live.some((r) => (r.status === "ASSIGNED" || r.status === "ACCEPTED") && r.assigned_at && +/* @__PURE__ */ new Date(r.assigned_at.replace(" ", "T") + "Z") < lateCut);
		const vendors = [...new Set(live.map((r) => r.source_name).filter(Boolean))];
		const shipped = live.find((r) => r.courier);
		const detail = [vendors.length > 1 ? `${vendors.length} vendors` : vendors[0] ?? "", shipped ? `${shipped.courier} ${shipped.tracking_no}`.trim() : ""].filter(Boolean).join(" · ");
		const s = !live.length ? {
			label: "Cancelled",
			tone: "",
			detail
		} : has("UNASSIGNED") ? {
			label: "No vendor yet",
			tone: "bad",
			detail
		} : has("HELD") ? {
			label: "Awaiting payment",
			tone: "",
			detail
		} : all("DELIVERED", "RETURNED") ? {
			label: "Delivered",
			tone: "good",
			detail
		} : all("SHIPPED", "DELIVERED", "RETURNED") ? {
			label: "Shipped",
			tone: "info",
			detail
		} : late ? {
			label: "Late",
			tone: "bad",
			detail
		} : has("SHIPPED", "DELIVERED") ? {
			label: "Partly shipped",
			tone: "info",
			detail
		} : {
			label: "Waiting to ship",
			tone: "warn",
			detail
		};
		out.set(orderId, s);
	}
	return out;
}
function allocationsByIds(ids) {
	if (!ids.length) return [];
	return D().prepare(`${ALLOCATION_SELECT} WHERE a.id IN (${ids.map(() => "?").join(",")}) ORDER BY a.id`).all(...ids);
}
//#endregion
export { setStock as _, afterOrderPlaced as a, stockBySource as b, confirmSourceStock as c, isTracked as d, onLowStock as f, reserveForOrder as g, removeStockRow as h, USABLE_SQL as i, expireHolds as l, reconcileOrderStock as m, STATUS_LABEL as n, allocationsByIds as o, onStockEvents as p, StockError as r, availableFor as s, ALLOCATION_SELECT as t, fulfil as u, setTracking as v, syncProducts as x, shippingSummaries as y };
