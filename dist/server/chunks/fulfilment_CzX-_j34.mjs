import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as all } from "./db_CrQR8QZK.mjs";
import { b as stockBySource, n as STATUS_LABEL, t as ALLOCATION_SELECT, u as fulfil } from "./stock_CkuKY_dx.mjs";
import { t as $$Admin } from "./Admin_jHwtJnua.mjs";
import { t as $$InventoryNav } from "./InventoryNav_B758Thv_.mjs";
import { n as when } from "./format_DKM6ep4K.mjs";
//#region src/pages/admin/inventory/fulfilment.astro
var fulfilment_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Fulfilment,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Fulfilment = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Fulfilment;
	const admin = Astro.locals.user;
	let flash = "";
	let error = "";
	if (Astro.request.method === "POST") {
		const f = await Astro.request.formData();
		const str = (k) => String(f.get(k) ?? "").trim();
		try {
			flash = fulfil(Number(str("alloc_id")), str("_action"), {
				kind: "admin",
				name: `Admin: ${admin.name || admin.email}`
			}, {
				courier: str("courier"),
				trackingNo: str("tracking_no"),
				note: str("note"),
				sourceId: Number(str("source_id")) || void 0,
				restock: f.get("restock") === "on"
			});
		} catch (e) {
			error = e.message;
		}
	}
	const sp = Astro.url.searchParams;
	const status = sp.get("status") ?? "open";
	const sourceFilter = Number(sp.get("source")) || 0;
	const orderQ = sp.get("order")?.trim() ?? "";
	const GROUPS = {
		open: [
			"UNASSIGNED",
			"ASSIGNED",
			"ACCEPTED"
		],
		UNASSIGNED: ["UNASSIGNED"],
		ASSIGNED: ["ASSIGNED", "ACCEPTED"],
		SHIPPED: ["SHIPPED"],
		DELIVERED: ["DELIVERED"],
		HELD: ["HELD"],
		closed: [
			"REJECTED",
			"CANCELLED",
			"EXPIRED",
			"RETURNED"
		]
	};
	const where = [];
	const params = [];
	if (orderQ) {
		where.push("(o.order_id LIKE ? OR o.customer_name LIKE ? OR o.customer_phone LIKE ?)");
		params.push(`%${orderQ}%`, `%${orderQ}%`, `%${orderQ}%`);
	} else if (GROUPS[status]) {
		where.push(`a.status IN (${GROUPS[status].map(() => "?").join(",")})`);
		params.push(...GROUPS[status]);
	}
	if (sourceFilter) {
		where.push("a.source_id = ?");
		params.push(sourceFilter);
	}
	const rows = all(`${ALLOCATION_SELECT} ${where.length ? "WHERE " + where.join(" AND ") : ""}
   ORDER BY CASE a.status WHEN 'UNASSIGNED' THEN 0 WHEN 'ASSIGNED' THEN 1 WHEN 'ACCEPTED' THEN 2 ELSE 3 END, a.id DESC LIMIT 300`, ...params);
	const counts = Object.fromEntries(all("SELECT status, COUNT(*) AS n FROM inv_allocations GROUP BY status").map((r) => [r.status, r.n]));
	const count = (k) => (GROUPS[k] ?? []).reduce((n, s) => n + (counts[s] ?? 0), 0);
	const sources = all("SELECT id, name, active FROM inv_sources ORDER BY CASE kind WHEN 'own' THEN 0 ELSE 1 END, priority, name");
	const TABS = [
		["open", "To ship"],
		["UNASSIGNED", "No vendor yet"],
		["ASSIGNED", "Waiting to ship"],
		["SHIPPED", "Shipped"],
		["DELIVERED", "Delivered"],
		["HELD", "Awaiting payment"],
		["closed", "Closed"]
	];
	const tabLink = (k) => `/admin/inventory/fulfilment?status=${k}${sourceFilter ? `&source=${sourceFilter}` : ""}`;
	const self = Astro.url.pathname + Astro.url.search;
	const freeAt = (productId) => new Map(stockBySource(productId).filter((s) => s.usable).map((s) => [s.source_id, Math.max(0, s.free)]));
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": "All shipments",
		"active": "inventory"
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="inv"> <div class="page-head"> <div> <h1>All shipments</h1> <p>Every item and who is shipping it. Vendors update these from their Seller Hub; you can also do it on each order’s page.</p> </div> </div> ${renderComponent($$result, "InventoryNav", $$InventoryNav, { "active": "fulfilment" })} ${flash && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">${flash}</p>`} ${error && renderTemplate`<p class="alert alert--error" role="alert" style="margin-bottom:14px">${error}</p>`} <div class="toolbar"> <nav class="tabs" aria-label="Status"> ${TABS.map(([k, label]) => renderTemplate`<a${addAttribute(tabLink(k), "href")}${addAttribute(!orderQ && k === status ? "true" : void 0, "aria-current")}> ${label}${count(k) ? ` (${count(k)})` : ""} </a>`)} </nav> <form method="get" style="margin-left:auto;display:flex;gap:8px;flex-wrap:wrap"> <input type="hidden" name="status"${addAttribute(status, "value")}> <select name="source" aria-label="Vendor" style="min-height:40px;border:1.5px solid var(--line-strong);border-radius:8px;padding:0 8px" onchange="this.form.submit()"> <option value="">All vendors</option> ${sources.map((s) => renderTemplate`<option${addAttribute(s.id, "value")}${addAttribute(s.id === sourceFilter, "selected")}>${s.name}</option>`)} </select> <input type="search" name="order"${addAttribute(orderQ, "value")} placeholder="Order ID, customer or phone" aria-label="Search orders"> </form> </div> <div class="table-wrap"> ${rows.length ? renderTemplate`<table class="tbl"> <thead> <tr> <th scope="col">Order</th> <th scope="col">Item</th> <th scope="col">Vendor</th> <th scope="col">Status</th> <th scope="col">Ship to</th> <th scope="col">Actions</th> </tr> </thead> <tbody> ${rows.map((r) => {
		const free = [
			"UNASSIGNED",
			"ASSIGNED",
			"ACCEPTED"
		].includes(r.status) ? freeAt(r.product_id) : /* @__PURE__ */ new Map();
		return renderTemplate`<tr> <td> <a class="row-link"${addAttribute(`/admin/r/orders/${r.order_id}#shipping`, "href")}>${r.order_ref}</a> <div class="small muted">${when(r.created_at)}</div> </td> <td> <a${addAttribute(`/admin/inventory/products/${r.product_id}`, "href")}>${r.product_name}</a> × <b>${r.qty}</b> ${r.sku && renderTemplate`<div class="small muted">SKU ${r.sku}</div>`} </td> <td>${r.source_name ?? renderTemplate`<span class="muted">—</span>`}</td> <td> <span${addAttribute(["pill", `s-${r.status}`], "class:list")}>${STATUS_LABEL[r.status]}</span> ${r.courier && renderTemplate`<div class="small">${r.courier}${r.tracking_no && ` · ${r.tracking_no}`}</div>`} ${r.note && renderTemplate`<div class="small muted">${r.note}</div>`} </td> <td class="addr"> ${r.customer_name} · ${r.customer_phone} <br> ${r.city}, ${r.pincode} </td> <td> <div class="acts"> ${(r.status === "ASSIGNED" || r.status === "ACCEPTED") && renderTemplate`<details class="more"> <summary>Ship</summary> <form method="post"${addAttribute(self, "action")}> <input type="hidden" name="alloc_id"${addAttribute(r.id, "value")}> <input type="text" name="courier" placeholder="Courier" aria-label="Courier"> <input type="text" name="tracking_no" placeholder="Tracking no." aria-label="Tracking number"> <button class="btn btn--sm" name="_action" value="ship">Mark shipped</button> </form> </details>`} ${r.status === "SHIPPED" && renderTemplate`<form method="post"${addAttribute(self, "action")}> <input type="hidden" name="alloc_id"${addAttribute(r.id, "value")}> <button class="btn btn--sm btn--ghost" name="_action" value="deliver">Mark delivered</button> </form>`} ${[
			"UNASSIGNED",
			"ASSIGNED",
			"ACCEPTED"
		].includes(r.status) && renderTemplate`<details class="more"> <summary>${r.status === "UNASSIGNED" ? "Choose vendor" : "Change vendor"}</summary> <form method="post"${addAttribute(self, "action")}> <input type="hidden" name="alloc_id"${addAttribute(r.id, "value")}> <select name="source_id" required aria-label="Vendor"> <option value="">Choose…</option> ${sources.filter((s) => s.id !== r.source_id).map((s) => renderTemplate`<option${addAttribute(s.id, "value")}>${s.name} (${free.get(s.id) ?? 0} in stock)${s.active ? "" : " – off"}</option>`)} </select> <button class="btn btn--sm" name="_action" value="assign">Assign</button> </form> </details>`} ${(r.status === "ASSIGNED" || r.status === "ACCEPTED") && renderTemplate`<details class="more"> <summary>Vendor can’t ship</summary> <form method="post"${addAttribute(self, "action")}> <input type="hidden" name="alloc_id"${addAttribute(r.id, "value")}> <input type="text" name="note" placeholder="Reason" required aria-label="Reason"> <button class="btn btn--sm btn--danger" name="_action" value="reject">Pass to another vendor</button> </form> </details>`} ${(r.status === "SHIPPED" || r.status === "DELIVERED") && renderTemplate`<details class="more"> <summary>Returned</summary> <form method="post"${addAttribute(self, "action")}> <input type="hidden" name="alloc_id"${addAttribute(r.id, "value")}> <input type="text" name="note" placeholder="Note" aria-label="Note"> <label class="small"><input type="checkbox" name="restock"> Back into ${r.source_name ?? "stock"}</label> <button class="btn btn--sm btn--ghost" name="_action" value="return">Mark returned</button> </form> </details>`} ${[
			"HELD",
			"UNASSIGNED",
			"ASSIGNED",
			"ACCEPTED"
		].includes(r.status) && renderTemplate`<form method="post"${addAttribute(self, "action")} data-confirm="Cancel just this item? The vendor is told not to ship it. The order itself is not cancelled."> <input type="hidden" name="alloc_id"${addAttribute(r.id, "value")}> <button class="btn btn--sm btn--ghost" name="_action" value="cancel">Cancel item</button> </form>`} </div> </td> </tr>`;
	})} </tbody> </table>` : renderTemplate`<p class="muted" style="padding:16px">${orderQ ? "No orders match." : "Nothing here."}</p>`} </div> </div> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/admin/inventory/fulfilment.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/inventory/fulfilment.astro";
var $$url = "/admin/inventory/fulfilment.html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/inventory/fulfilment@_@astro
var page = () => fulfilment_exports;
//#endregion
export { page };
