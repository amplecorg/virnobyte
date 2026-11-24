import { o as json, r as db } from "./db_CrQR8QZK.mjs";
import { _ as setStock, h as removeStockRow, t as ALLOCATION_SELECT, u as fulfil } from "./stock_CkuKY_dx.mjs";
import { i as resolveImage } from "./images_zUoD11cq.mjs";
//#region src/lib/inventory/seller.ts
/**
* Read models and actions for the vendor's Seller Hub. Every function is scoped to one
* source id, so a vendor can only ever see or change their own listings and order lines.
* Nothing here exposes prices.
*/
function D() {
	const d = db();
	if (!d) throw new Error("The Seller Hub is unavailable right now.");
	return d;
}
function productImage(image, images) {
	const key = json(images, [])[0] || image || "";
	if (!key) return "";
	try {
		const res = resolveImage(key);
		return res.kind === "upload" ? res.src : res.meta.src;
	} catch {
		return "";
	}
}
var TAB_STATUS = {
	unshipped: ["ASSIGNED", "ACCEPTED"],
	shipped: ["SHIPPED"],
	delivered: ["DELIVERED", "RETURNED"],
	cancelled: ["CANCELLED", "REJECTED"]
};
var parseUtc = (s) => s ? new Date(s.includes("T") ? s : s.replace(" ", "T") + "Z") : null;
function sellerOrders(sourceId, tab, q = "", limit = 100) {
	const statuses = TAB_STATUS[tab];
	const params = [sourceId, ...statuses];
	let search = "";
	if (q) {
		search = " AND (o.order_id LIKE ? OR o.customer_name LIKE ?)";
		params.push(`%${q}%`, `%${q}%`);
	}
	const rows = D().prepare(`${ALLOCATION_SELECT.replace("SELECT a.id,", "SELECT p.image AS p_image, p.images AS p_images, a.id,")}
       WHERE a.source_id = ? AND a.status IN (${statuses.map(() => "?").join(",")})${search}
       ORDER BY ${tab === "unshipped" ? "a.assigned_at ASC" : "a.updated_at DESC"}, a.id
       LIMIT 400`).all(...params);
	const byOrder = /* @__PURE__ */ new Map();
	for (const r of rows) {
		let o = byOrder.get(r.order_id);
		if (!o) {
			const assigned = parseUtc(r.assigned_at);
			const shipBy = assigned ? /* @__PURE__ */ new Date(+assigned + 1728e5) : null;
			o = {
				orderId: r.order_id,
				ref: r.order_ref,
				placedAt: r.created_at,
				assignedAt: r.assigned_at,
				shipBy,
				late: tab === "unshipped" && !!shipBy && shipBy.getTime() < Date.now(),
				customer: {
					name: r.customer_name,
					phone: r.customer_phone,
					line1: r.address_line1,
					line2: r.address_line2,
					city: r.city,
					state: r.state,
					pincode: r.pincode
				},
				lines: []
			};
			byOrder.set(r.order_id, o);
		}
		o.lines.push({
			...r,
			image: productImage(r.p_image, r.p_images)
		});
	}
	return [...byOrder.values()].slice(0, limit);
}
function sellerCounts(sourceId) {
	const d = D();
	const n = (sql, ...p) => d.prepare(sql).get(sourceId, ...p).n;
	return {
		toShip: n("SELECT COUNT(DISTINCT order_id) AS n FROM inv_allocations WHERE source_id = ? AND status IN ('ASSIGNED','ACCEPTED')"),
		late: n(`SELECT COUNT(DISTINCT order_id) AS n FROM inv_allocations WHERE source_id = ? AND status IN ('ASSIGNED','ACCEPTED') AND assigned_at <= datetime('now', '-48 hours')`),
		inTransit: n("SELECT COUNT(DISTINCT order_id) AS n FROM inv_allocations WHERE source_id = ? AND status = 'SHIPPED'"),
		shipped7: n("SELECT COUNT(DISTINCT order_id) AS n FROM inv_allocations WHERE source_id = ? AND status IN ('SHIPPED','DELIVERED') AND shipped_at >= datetime('now', '-7 days')"),
		delivered30: n("SELECT COUNT(DISTINCT order_id) AS n FROM inv_allocations WHERE source_id = ? AND status = 'DELIVERED' AND delivered_at >= datetime('now', '-30 days')")
	};
}
function linesOf(sourceId, orderId, statuses) {
	return D().prepare(`SELECT id FROM inv_allocations WHERE source_id = ? AND order_id = ? AND status IN (${statuses.map(() => "?").join(",")})`).all(sourceId, orderId, ...statuses).map((r) => r.id);
}
var actorOf = (vendor) => ({
	kind: "vendor",
	name: `Vendor: ${vendor.name}`,
	sourceId: vendor.id
});
/** Confirms shipment of every unshipped line this vendor has in the order. */
function confirmShipment(vendor, orderId, courier, trackingNo) {
	if (!courier.trim()) throw new Error("Choose or type the courier.");
	const ids = linesOf(vendor.id, orderId, ["ASSIGNED", "ACCEPTED"]);
	if (!ids.length) throw new Error("This order has nothing left to ship.");
	for (const id of ids) fulfil(id, "ship", actorOf(vendor), {
		courier,
		trackingNo
	});
	return `Shipment confirmed for ${ids.length} item${ids.length === 1 ? "" : "s"}.`;
}
function markDelivered(vendor, orderId) {
	const ids = linesOf(vendor.id, orderId, ["SHIPPED"]);
	if (!ids.length) throw new Error("Nothing in this order is waiting for delivery.");
	for (const id of ids) fulfil(id, "deliver", actorOf(vendor));
	return "Marked as delivered. Thank you!";
}
/** "Cancel order" for the vendor = cannot fulfil: Virnobyte passes the items to another source. */
function cannotFulfil(vendor, orderId, reason) {
	if (!reason.trim()) throw new Error("Choose a reason.");
	const ids = linesOf(vendor.id, orderId, ["ASSIGNED", "ACCEPTED"]);
	if (!ids.length) throw new Error("This order can no longer be cancelled.");
	const productIds = D().prepare(`SELECT DISTINCT product_id FROM inv_allocations WHERE id IN (${ids.map(() => "?").join(",")})`).all(...ids).map((r) => r.product_id);
	for (const id of ids) fulfil(id, "reject", actorOf(vendor), { note: reason });
	if (/^out of stock/i.test(reason)) {
		saveAvailability(vendor, productIds.map((productId) => ({
			productId,
			available: 0
		})));
		return "Order cancelled for you, and those products are now marked out of stock. Virnobyte will handle the order.";
	}
	return "Order cancelled for you. Virnobyte will handle it — no need to ship.";
}
var RESERVED = `COALESCE((SELECT SUM(a.qty) FROM inv_allocations a WHERE a.source_id = st.source_id AND a.product_id = st.product_id
  AND (a.status IN ('ASSIGNED','ACCEPTED') OR (a.status = 'HELD' AND a.expires_at > datetime('now')))), 0)`;
function listings(sourceId) {
	return D().prepare(`SELECT st.product_id, st.sku, st.qty, st.updated_at, p.name, p.category, p.slug, p.image AS p_image, p.images AS p_images,
              ${RESERVED} AS reserved
       FROM inv_stock st JOIN products p ON p.id = st.product_id
       WHERE st.source_id = ? ORDER BY p.name COLLATE NOCASE`).all(sourceId).map((r) => ({
		product_id: r.product_id,
		name: r.name,
		category: r.category,
		slug: r.slug,
		image: productImage(r.p_image, r.p_images),
		sku: r.sku,
		qty: r.qty,
		reserved: r.reserved,
		available: Math.max(0, r.qty - r.reserved),
		updated_at: r.updated_at
	}));
}
/**
* The vendor edits "Available" (what they can still sell). Units already promised to orders
* are added back, so the stored on-hand count stays right.
*/
function saveAvailability(vendor, edits) {
	const current = new Map(listings(vendor.id).map((l) => [l.product_id, l]));
	const rows = edits.filter((e) => current.has(e.productId)).map((e) => {
		const l = current.get(e.productId);
		const available = Math.max(0, Math.min(1e5, Math.trunc(e.available) || 0));
		return {
			productId: e.productId,
			qty: available + l.reserved,
			sku: e.sku ?? l.sku,
			changed: available !== l.available || e.sku != null && e.sku !== l.sku
		};
	}).filter((r) => r.changed);
	setStock(vendor.id, rows, "PORTAL", `Vendor: ${vendor.name}`);
	return rows.length;
}
/** Products from the Virnobyte catalogue the vendor does not list yet. */
function catalogSearch(sourceId, q, limit = 20) {
	const like = `%${q.trim()}%`;
	return D().prepare(`SELECT p.id, p.name, p.category, p.image, p.images FROM products p
       WHERE p.published = 1 AND p.id NOT IN (SELECT product_id FROM inv_stock WHERE source_id = ?)
         AND (? = '%%' OR p.name LIKE ? OR p.category LIKE ?)
       ORDER BY p.name COLLATE NOCASE LIMIT ?`).all(sourceId, like, like, like, limit).map((p) => ({
		id: p.id,
		name: p.name,
		category: p.category,
		image: productImage(p.image, p.images)
	}));
}
function addListing(vendor, productId, sku, available) {
	if (!D().prepare("SELECT id FROM products WHERE id = ? AND published = 1").get(productId)) throw new Error("That product is not in the catalogue.");
	setStock(vendor.id, [{
		productId,
		qty: Math.max(0, Math.trunc(available) || 0),
		sku: sku.trim()
	}], "PORTAL", `Vendor: ${vendor.name}`);
}
function removeListing(vendor, productId) {
	if (D().prepare("SELECT 1 FROM inv_allocations WHERE source_id = ? AND product_id = ? AND status IN ('ASSIGNED','ACCEPTED') LIMIT 1").get(vendor.id, productId)) throw new Error("This product has orders waiting to ship. Ship or cancel them first.");
	removeStockRow(vendor.id, productId, `Vendor: ${vendor.name}`);
}
//#endregion
export { listings as a, saveAvailability as c, confirmShipment as i, sellerCounts as l, cannotFulfil as n, markDelivered as o, catalogSearch as r, removeListing as s, addListing as t, sellerOrders as u };
