import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, T as Fragment, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as renderScript } from "./script_BaVSnVKi.mjs";
import { i as get, n as all, s as run } from "./db_CrQR8QZK.mjs";
import { b as stockBySource, d as isTracked, m as reconcileOrderStock, n as STATUS_LABEL, t as ALLOCATION_SELECT, u as fulfil, x as syncProducts } from "./stock_CkuKY_dx.mjs";
import { n as refundOrderCoins } from "./coins_DfNIwne_.mjs";
import { t as activatePaidMembership } from "./membership-checkout_DPKYpToG.mjs";
import { t as $$Icon } from "./Icon_DmevXm4a.mjs";
import { t as $$MembershipCard } from "./MembershipCard_D9OWERb3.mjs";
import { t as $$Admin } from "./Admin_jHwtJnua.mjs";
/* empty css                    */
import { n as when } from "./format_DKM6ep4K.mjs";
import { t as $$AdminField } from "./AdminField_CfQlHeR8.mjs";
import { t as RESOURCES } from "./resources_B1Whtlrk.mjs";
import { a as saveRow, r as parseForm, s as toFormValue } from "./forms_DglaNJcN.mjs";
//#region src/components/admin/OrderShipping.astro
createAstro("https://virnobyte.com");
var $$OrderShipping = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$OrderShipping;
	const { orderId } = Astro.props;
	const lines = all(`${ALLOCATION_SELECT} WHERE a.order_id = ? AND a.status NOT IN ('EXPIRED') ORDER BY CASE WHEN a.status IN ('REJECTED','CANCELLED') THEN 1 ELSE 0 END, a.id`, orderId);
	const vendors = all("SELECT id, name, kind, active FROM inv_sources ORDER BY CASE kind WHEN 'own' THEN 0 ELSE 1 END, priority, name");
	const lateCut = Date.now() - 1728e5;
	const isLate = (l) => (l.status === "ASSIGNED" || l.status === "ACCEPTED") && !!l.assigned_at && +/* @__PURE__ */ new Date(l.assigned_at.replace(" ", "T") + "Z") < lateCut;
	const open = (s) => [
		"UNASSIGNED",
		"ASSIGNED",
		"ACCEPTED"
	].includes(s);
	const COURIERS = [
		"Delhivery",
		"Blue Dart",
		"DTDC",
		"Ekart",
		"Xpressbees",
		"Shadowfax",
		"Ecom Express",
		"India Post",
		"Own delivery"
	];
	const LABEL = {
		...STATUS_LABEL,
		ASSIGNED: "Waiting to ship",
		ACCEPTED: "Waiting to ship",
		REJECTED: "Vendor could not ship"
	};
	return renderTemplate`${lines.length > 0 && renderTemplate`${maybeRenderHead($$result)}<section class="panel inv" id="shipping"> <div class="panel-head"> <h2>Shipping</h2> <span class="small muted">Vendors ship these items straight to the customer.</span> </div> <datalist id="admin-couriers">${COURIERS.map((c) => renderTemplate`<option${addAttribute(c, "value")}></option>`)}</datalist> <div class="table-wrap" style="border:0"> <table class="tbl"> <thead> <tr><th scope="col">Item</th><th scope="col">Shipped by</th><th scope="col">Status</th><th scope="col">Actions</th></tr> </thead> <tbody> ${lines.map((l) => {
		const free = open(l.status) ? new Map(stockBySource(l.product_id).filter((s) => s.usable).map((s) => [s.source_id, Math.max(0, s.free)])) : /* @__PURE__ */ new Map();
		const closed = l.status === "REJECTED" || l.status === "CANCELLED";
		return renderTemplate`<tr${addAttribute(closed ? "opacity:.6" : void 0, "style")}> <td>${l.product_name} × <b>${l.qty}</b>${l.sku && renderTemplate`<div class="small muted">SKU ${l.sku}</div>`}</td> <td>${l.source_name ?? renderTemplate`<span class="muted">Nobody yet</span>`}</td> <td> <span${addAttribute(["pill", isLate(l) ? "bad" : `s-${l.status}`], "class:list")}>${isLate(l) ? "Late" : LABEL[l.status]}</span> ${l.courier && renderTemplate`<div class="small">${l.courier}${l.tracking_no && ` · ${l.tracking_no}`}</div>`} ${l.shipped_at && renderTemplate`<div class="small muted">Shipped ${when(l.shipped_at)}</div>`} ${l.note && renderTemplate`<div class="small muted">${l.note}</div>`} </td> <td> <div class="acts"> ${open(l.status) && renderTemplate`<details class="more"> <summary>${l.status === "UNASSIGNED" ? "Choose vendor" : "Change vendor"}</summary> <form method="post"> <input type="hidden" name="_ship_action" value="assign"> <input type="hidden" name="alloc_id"${addAttribute(l.id, "value")}> <select name="source_id" required aria-label="Vendor"> <option value="">Choose…</option> ${vendors.filter((v) => v.id !== l.source_id).map((v) => renderTemplate`<option${addAttribute(v.id, "value")}>${v.name} (${free.get(v.id) ?? 0} in stock)${v.active ? "" : " – off"}</option>`)} </select> <button class="btn btn--sm" type="submit">Save</button> </form> </details>`} ${(l.status === "ASSIGNED" || l.status === "ACCEPTED") && renderTemplate`<details class="more"> <summary>Mark shipped</summary> <form method="post"> <input type="hidden" name="_ship_action" value="ship"> <input type="hidden" name="alloc_id"${addAttribute(l.id, "value")}> <input type="text" name="courier" list="admin-couriers" placeholder="Courier" aria-label="Courier"> <input type="text" name="tracking_no" placeholder="Tracking no." aria-label="Tracking number"> <button class="btn btn--sm" type="submit">Save</button> </form> </details>`} ${l.status === "SHIPPED" && renderTemplate`<form method="post"> <input type="hidden" name="_ship_action" value="deliver"> <input type="hidden" name="alloc_id"${addAttribute(l.id, "value")}> <button class="btn btn--sm btn--ghost" type="submit">Mark delivered</button> </form>`} ${(l.status === "SHIPPED" || l.status === "DELIVERED") && renderTemplate`<details class="more"> <summary>Returned</summary> <form method="post"> <input type="hidden" name="_ship_action" value="return"> <input type="hidden" name="alloc_id"${addAttribute(l.id, "value")}> <label class="small"><input type="checkbox" name="restock"> Put back in stock</label> <button class="btn btn--sm btn--ghost" type="submit">Mark returned</button> </form> </details>`} ${open(l.status) && renderTemplate`<form method="post" data-confirm="Cancel just this item? The vendor is told not to ship it. To cancel the whole order, set the order status to Cancelled."> <input type="hidden" name="_ship_action" value="cancel"> <input type="hidden" name="alloc_id"${addAttribute(l.id, "value")}> <button class="btn btn--sm btn--ghost" type="submit">Cancel item</button> </form>`} </div> </td> </tr>`;
	})} </tbody> </table> </div> </section>`}`;
}, "C:/Programming section/virnobyte/src/components/admin/OrderShipping.astro", void 0);
//#endregion
//#region src/pages/admin/r/[resource]/[id].astro
var _id__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Id,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Id = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Id;
	const def = RESOURCES[Astro.params.resource];
	if (!def) return Astro.redirect("/admin");
	const isNew = Astro.params.id === "new";
	if (isNew && def.canCreate === false) return Astro.redirect(`/admin/r/${def.key}`);
	const id = isNew ? null : Number(Astro.params.id);
	let row = id ? get(`SELECT * FROM ${def.table} WHERE id = ?`, id) : {};
	if (!row) return Astro.redirect(`/admin/r/${def.key}`);
	let errors = {};
	let values = {};
	const DEFAULTS = {
		published: 1,
		active: 1,
		in_stock: 1,
		sort: 0,
		validity_days: 365,
		card_from: "#0f2a4a",
		card_to: "#2a5d8f",
		card_text: "#ffffff",
		card_pattern: "circuit",
		employment_type: "FULL_TIME",
		location: "Chikhali, Pimpri-Chinchwad",
		condition: "New",
		topic: "General",
		group_name: "Repair & support",
		published_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		posted_at: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		benefits: "[]",
		images: "[]",
		category: def.key === "projects" ? "cctv-projects" : def.key === "products" ? "Laptops" : "",
		rating: def.key === "products" ? "4.5" : "",
		rating_count: def.key === "products" ? "128 Ratings & 42 Reviews" : "",
		badge: def.key === "products" ? "Assured" : "",
		offer_tag: "",
		wow_deal: "",
		bank_offer: "",
		emi_offer: "",
		partner_offer: "",
		warranty: "",
		replacement_policy: "",
		diagnostic_setup: "",
		delivery_text: "",
		delivery_sub: ""
	};
	if (isNew) row = Object.fromEntries(def.fields.map((f) => [f.name, DEFAULTS[f.name] ?? ""]));
	if (Astro.request.method === "POST") {
		const form = await Astro.request.formData();
		const shipAction = String(form.get("_ship_action") ?? "");
		if (def.key === "orders" && id && shipAction) {
			let msg = "";
			try {
				const u = Astro.locals.user;
				const allocId = Number(form.get("alloc_id"));
				if (!get("SELECT 1 FROM inv_allocations WHERE id = ? AND order_id = ?", allocId, id)) throw new Error("That item is not part of this order.");
				msg = fulfil(allocId, shipAction, {
					kind: "admin",
					name: `Admin: ${u.name || u.email}`
				}, {
					courier: String(form.get("courier") ?? ""),
					trackingNo: String(form.get("tracking_no") ?? ""),
					sourceId: Number(form.get("source_id")) || void 0,
					restock: form.get("restock") === "on"
				});
			} catch (e) {
				msg = `Error: ${e.message}`;
			}
			return Astro.redirect(`/admin/r/orders/${id}?ship=${encodeURIComponent(msg)}#shipping`, 303);
		}
		if (form.get("_action") === "delete" && id && def.canDelete !== false) {
			if (def.key === "plans" && get("SELECT 1 FROM memberships WHERE plan_id = ?", id)) errors._form = "Members hold cards on this plan. Turn off \"On sale\" instead of deleting it.";
			else {
				run(`DELETE FROM ${def.table} WHERE id = ?`, id);
				return Astro.redirect(`/admin/r/${def.key}?deleted=1`, 303);
			}
		} else {
			const parsed = await parseForm(def, form, id);
			errors = parsed.errors;
			if (!Object.keys(errors).length) try {
				const newId = saveRow(def, parsed.row, id);
				if (def.key === "products") syncProducts([newId]);
				if (def.key === "orders") {
					reconcileOrderStock(newId);
					const o = get("SELECT order_id, order_status, payment_status, kind, membership_id FROM orders WHERE id = ?", newId);
					if (o?.order_status === "CANCELLED") refundOrderCoins(o.order_id, "order cancelled");
					else if (o?.payment_status === "PAID") activatePaidMembership(o);
				}
				return Astro.redirect(form.get("_action") === "save_close" ? `/admin/r/${def.key}?saved=1` : `/admin/r/${def.key}/${newId}?saved=1`, 303);
			} catch (saveErr) {
				console.error("[Admin Save Error]:", saveErr);
				errors._form = "Could not save record: " + (saveErr?.message || String(saveErr));
			}
			for (const f of def.fields) {
				const raw = form.get(f.name);
				values[f.name] = f.type === "bool" ? raw === "on" ? "1" : "0" : typeof raw === "string" ? raw : toFormValue(f, parsed.row[f.name]);
				if ((f.type === "image" || f.type === "images") && parsed.row[f.name]) values[f.name] = parsed.row[f.name];
			}
		}
	}
	for (const f of def.fields) if (!(f.name in values)) values[f.name] = toFormValue(f, row[f.name]);
	const saved = Astro.url.searchParams.get("saved");
	const titleField = def.fields.find((f) => [
		"name",
		"title",
		"question",
		"caption"
	].includes(f.name));
	const heading = isNew ? `New ${def.singular}` : titleField && row[titleField.name] || `Edit ${def.singular}`;
	const publicUrl = !isNew ? def.publicUrl?.(row) : null;
	const isPlan = def.key === "plans";
	const stockTracked = def.key === "products" && id ? isTracked(id) : false;
	const orderHasStock = def.key === "orders" && id ? !!get("SELECT 1 FROM inv_allocations WHERE order_id = ? LIMIT 1", id) : false;
	const shipMsg = Astro.url.searchParams.get("ship") ?? "";
	let lastSection = "";
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": heading,
		"active": def.key
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="page-head"> <div> <a${addAttribute(`/admin/r/${def.key}`, "href")} class="back-btn">${def.label}</a> <h1>${heading}</h1> </div> ${publicUrl && renderTemplate`<a class="btn btn--ghost"${addAttribute(publicUrl, "href")} target="_blank" rel="noopener">
View on site ${renderComponent($$result, "Icon", $$Icon, {
		"name": "external",
		"size": 16
	})} </a>`} </div> ${saved && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">Saved. Changes are live on the website.</p>`}${stockTracked && renderTemplate`<p class="alert" style="margin-bottom:14px">
Stock for this product is controlled by <a${addAttribute(`/admin/inventory/products/${id}`, "href")}>Inventory</a>: "In stock" below is set automatically from live vendor and own stock.
</p>`}${shipMsg && renderTemplate`<p${addAttribute(["alert", shipMsg.startsWith("Error: ") ? "alert--error" : "alert--ok"], "class:list")} role="status" style="margin-bottom:14px"> ${shipMsg.replace(/^Error: /, "")} </p>`}${orderHasStock && id && renderTemplate`${renderComponent($$result, "OrderShipping", $$OrderShipping, { "orderId": id })}`}${errors._form && renderTemplate`<p class="alert alert--error" role="alert" style="margin-bottom:14px">${errors._form}</p>`}${Object.keys(errors).filter((k) => k !== "_form").length > 0 && renderTemplate`<p class="alert alert--error" role="alert" style="margin-bottom:14px">Some fields need attention — see the messages below.</p>`}<div${addAttribute([isPlan && "split-2"], "class:list")}> <form method="post" enctype="multipart/form-data" id="edit-form"> <div class="panel"> <div class="form-grid"> ${def.fields.map((f) => {
		const showSection = f.section && f.section !== lastSection;
		if (f.section) lastSection = f.section;
		return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` ${showSection && renderTemplate`<h2 class="section-title">${f.section}</h2>`} ${renderComponent($$result, "AdminField", $$AdminField, {
			"field": f,
			"value": values[f.name] ?? "",
			"error": errors[f.name]
		})} ` })}`;
	})} </div> </div> <div class="sticky-actions"> <div class="btn-row"> <button class="btn" type="submit" name="_action" value="save">Save</button> <button class="btn btn--ghost" type="submit" name="_action" value="save_close">Save and close</button> </div> </div> </form> ${isPlan && renderTemplate`<aside class="sticky-col"> <div class="panel"> <h2 style="margin-bottom:12px">Card preview</h2> ${renderComponent($$result, "MembershipCard", $$MembershipCard, {
		"live": true,
		"planName": values.name || "Plan",
		"from": values.card_from || "#0f2a4a",
		"to": values.card_to || "#2a5d8f",
		"text": values.card_text || "#ffffff",
		"pattern": values.card_pattern || "circuit",
		"coins": Number(values.coins) || 0,
		"holder": "Member name"
	})} <p class="small muted" style="margin-top:12px">Updates as you edit. Every member card on this plan uses this design.</p> </div> </aside>`} </div> ${!isNew && def.canDelete !== false && renderTemplate`<form method="post"${addAttribute(`Delete this ${def.singular}? This cannot be undone.`, "data-confirm")} style="margin-top:24px"> <button class="btn btn--danger" type="submit" name="_action" value="delete">Delete ${def.singular}</button> </form>`}` })} ${isPlan && renderTemplate`${renderScript($$result, "C:/Programming section/virnobyte/src/pages/admin/r/[resource]/[id].astro?astro&type=script&index=0&lang.ts")}`}${renderScript($$result, "C:/Programming section/virnobyte/src/pages/admin/r/[resource]/[id].astro?astro&type=script&index=1&lang.ts")}`;
}, "C:/Programming section/virnobyte/src/pages/admin/r/[resource]/[id].astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/r/[resource]/[id].astro";
var $$url = "/admin/r/[resource]/[id].html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/r/[resource]/[id]@_@astro
var page = () => _id__exports;
//#endregion
export { page };
