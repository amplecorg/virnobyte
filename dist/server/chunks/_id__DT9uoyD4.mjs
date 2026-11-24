import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, T as Fragment, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as renderScript } from "./script_BaVSnVKi.mjs";
import { i as get, n as all, s as run } from "./db_CrQR8QZK.mjs";
import { _ as setStock, c as confirmSourceStock, h as removeStockRow, i as USABLE_SQL, x as syncProducts } from "./stock_CkuKY_dx.mjs";
import { t as $$Field } from "./Field_DozAohjX.mjs";
import { t as getPublicOrigin } from "./http_B1Mo43QL.mjs";
import { t as $$Admin } from "./Admin_jHwtJnua.mjs";
import { t as $$InventoryNav } from "./InventoryNav_B758Thv_.mjs";
import { n as when, t as ago } from "./format_DKM6ep4K.mjs";
import { n as revokePortal, t as issuePortalToken } from "./vendor_12Z6vgmZ.mjs";
//#region src/pages/admin/inventory/sources/[id].astro
var _id__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Id,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Id = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Id;
	const isNew = Astro.params.id === "new";
	const sid = isNew ? 0 : Number(Astro.params.id);
	let src = isNew ? void 0 : get("SELECT * FROM inv_sources WHERE id = ?", sid);
	if (!isNew && !src) return Astro.redirect("/admin/inventory/sources");
	const admin = Astro.locals.user;
	const actor = `Admin: ${admin.name || admin.email}`;
	const origin = ["localhost", "127.0.0.1"].includes(Astro.url.hostname) ? Astro.url.origin : getPublicOrigin(Astro);
	const listedProductIds = () => all("SELECT product_id FROM inv_stock WHERE source_id = ?", sid).map((r) => r.product_id);
	let flash = Astro.url.searchParams.get("created") ? "Vendor added. Next step: press “Create Seller Hub link” on the right and send it to them on WhatsApp." : "";
	let error = "";
	let portalLink = "";
	if (Astro.request.method === "POST") {
		const f = await Astro.request.formData();
		const str = (k) => String(f.get(k) ?? "").trim();
		const int = (k, def) => {
			const v = Math.trunc(Number(str(k)));
			return Number.isFinite(v) && str(k) !== "" ? v : def;
		};
		try {
			switch (str("_action")) {
				case "details": {
					const own = src?.kind === "own";
					const name = str("name");
					const email = str("email").toLowerCase();
					const method = own ? "manual" : str("update_method") === "manual" ? "manual" : "portal";
					if (name.length < 2) throw new Error("Enter the vendor name.");
					if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Check the email address.");
					const vals = [
						name,
						str("contact_name"),
						str("phone"),
						email,
						str("city"),
						own ? 0 : Math.max(1, int("priority", 10)),
						own ? 1 : f.get("active") === "on" ? 1 : 0,
						method,
						own ? 0 : Math.max(0, int("stale_hours", 24)),
						str("notes")
					];
					const cols = "name, contact_name, phone, email, city, priority, active, update_method, stale_hours, notes";
					if (isNew) {
						const res = run(`INSERT INTO inv_sources (kind, ${cols}) VALUES ('vendor', ?,?,?,?,?,?,?,?,?,?)`, ...vals);
						return Astro.redirect(`/admin/inventory/sources/${Number(res.lastInsertRowid)}?created=1`, 303);
					}
					run(`UPDATE inv_sources SET ${cols.split(", ").map((c) => `${c} = ?`).join(", ")} WHERE id = ?`, ...vals, sid);
					syncProducts(listedProductIds());
					flash = "Saved.";
					break;
				}
				case "portal_link":
					portalLink = `${origin}/vendor/access?t=${issuePortalToken(sid)}`;
					flash = "New Seller Hub link created. Any older link for this vendor has stopped working.";
					break;
				case "portal_revoke":
					revokePortal(sid);
					flash = "Seller Hub access removed. The vendor is signed out everywhere.";
					break;
				case "save_stock": {
					const changed = all("SELECT product_id, qty, sku FROM inv_stock WHERE source_id = ?", sid).map((c) => {
						const raw = f.get(`qty_${c.product_id}`);
						if (raw == null) return null;
						const qty = Math.max(0, Math.trunc(Number(String(raw).replace(/[,\s]/g, "")) || 0));
						const sku = str(`sku_${c.product_id}`);
						return qty !== c.qty || sku !== c.sku ? {
							productId: c.product_id,
							qty,
							sku
						} : null;
					}).filter((x) => !!x);
					if (changed.length) setStock(sid, changed, "SET", actor, str("note"));
					else confirmSourceStock(sid);
					flash = changed.length ? `${changed.length} product${changed.length === 1 ? "" : "s"} updated.` : "Nothing changed — stock marked as checked.";
					break;
				}
				case "confirm":
					confirmSourceStock(sid);
					flash = "Stock confirmed as current.";
					break;
				case "add_product": {
					const pid = Number(str("product_id"));
					if (!pid) throw new Error("Choose a product.");
					setStock(sid, [{
						productId: pid,
						qty: int("qty", 0),
						sku: str("sku")
					}], "SET", actor, "Added to source");
					flash = "Product added.";
					break;
				}
				case "remove":
					removeStockRow(sid, Number(str("product_id")), actor);
					flash = "Product removed from this vendor.";
					break;
				case "delete": {
					if (src?.kind === "own") throw new Error("Your own stock cannot be deleted.");
					if (get("SELECT 1 FROM inv_allocations WHERE source_id = ? LIMIT 1", sid)) throw new Error("This vendor has order history. Switch it off instead, so past orders keep their records.");
					const ids = listedProductIds();
					run("DELETE FROM inv_sources WHERE id = ?", sid);
					syncProducts(ids);
					return Astro.redirect("/admin/inventory/sources?deleted=1", 303);
				}
			}
		} catch (e) {
			error = e.message;
		}
		if (!isNew) src = get("SELECT * FROM inv_sources WHERE id = ?", sid);
	}
	const s = src ?? {
		kind: "vendor",
		name: "",
		contact_name: "",
		phone: "",
		email: "",
		city: "",
		priority: 10,
		active: 1,
		update_method: "portal",
		stale_hours: 48,
		notes: ""
	};
	const own = s.kind === "own";
	const usable = !isNew && !!get(`SELECT 1 FROM inv_sources s WHERE s.id = ? AND ${USABLE_SQL}`, sid);
	const stock = isNew ? [] : all(`SELECT st.*, p.name, p.slug, p.published, COALESCE(ip.tracked, 0) AS tracked,
         (SELECT COALESCE(SUM(a.qty), 0) FROM inv_allocations a WHERE a.source_id = st.source_id AND a.product_id = st.product_id
            AND (a.status IN ('ASSIGNED','ACCEPTED') OR (a.status = 'HELD' AND a.expires_at > datetime('now')))) AS reserved
       FROM inv_stock st JOIN products p ON p.id = st.product_id LEFT JOIN inv_products ip ON ip.product_id = st.product_id
       WHERE st.source_id = ? ORDER BY p.name`, sid);
	const listed = new Set(stock.map((r) => r.product_id));
	const addable = isNew ? [] : all("SELECT id, name FROM products ORDER BY name").filter((p) => !listed.has(p.id));
	const openLines = isNew ? 0 : get("SELECT COUNT(*) AS n FROM inv_allocations WHERE source_id = ? AND status IN ('ASSIGNED','ACCEPTED')", sid).n;
	const title = isNew ? "Add vendor" : s.name;
	const invite = portalLink ? `Hello ${s.contact_name || s.name}, this is Virnobyte. Here is your private Seller Hub link. Open it to add the products you sell, keep your stock up to date and ship our orders:\n${portalLink}\n\nPlease keep this link private.` : "";
	const digits = String(s.phone ?? "").replace(/\D/g, "").replace(/^0+/, "");
	const waPhone = digits.length === 10 ? `91${digits}` : digits.length >= 11 ? digits : "";
	const waUrl = invite && waPhone ? `https://wa.me/${waPhone}?text=${encodeURIComponent(invite)}` : "";
	const mailUrl = invite && s.email ? `mailto:${s.email}?subject=${encodeURIComponent("Your Virnobyte Seller Hub link")}&body=${encodeURIComponent(invite)}` : "";
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": title,
		"active": "vendors"
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="inv"> <div class="page-head"> <div> <a href="/admin/inventory/sources" class="back-btn">Vendors</a> <h1>${title}</h1> ${!isNew && renderTemplate`<p> ${own ? "Your own stock — always used first." : !s.active ? "Switched off — nothing is sold from this vendor." : !stock.length ? "New vendor — no products yet. Send them their Seller Hub link so they can add what they sell." : usable ? `Stock confirmed ${ago(s.stock_updated_at)} — being sold.` : `Stock last confirmed ${ago(s.stock_updated_at)} — out of date, so it is not being sold until they confirm.`} ${openLines > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` · <a${addAttribute(`/admin/inventory/fulfilment?source=${sid}`, "href")}>${openLines} item${openLines === 1 ? "" : "s"} waiting to ship</a>` })}`} </p>`} </div> </div> ${renderComponent($$result, "InventoryNav", $$InventoryNav, { "active": "sources" })} ${flash && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">${flash}</p>`} ${error && renderTemplate`<p class="alert alert--error" role="alert" style="margin-bottom:14px">${error}</p>`} ${portalLink && renderTemplate`<section class="panel" style="border-color:#9fd8bf"> <h2 style="margin-bottom:8px">Send ${s.name} their Seller Hub link</h2> <p class="small muted" style="margin-bottom:12px">It is shown only now. Anyone with the link can see this vendor's orders and change its stock, so send it only to them.</p> <div class="btn-row" style="margin-bottom:12px"> ${waUrl && renderTemplate`<a class="btn"${addAttribute(waUrl, "href")} target="_blank" rel="noopener">Send on WhatsApp</a>`} ${mailUrl && renderTemplate`<a class="btn btn--ghost"${addAttribute(mailUrl, "href")}>Send by email</a>`} </div> <div class="link-box"> <input id="portal-link" readonly${addAttribute(portalLink, "value")} aria-label="Seller Hub link"> <button class="btn btn--sm btn--ghost" type="button" data-copy="portal-link">Copy link</button> </div> ${!waUrl && renderTemplate`<p class="small muted" style="margin-top:8px">Add the vendor's phone number above to send it on WhatsApp in one click.</p>`} </section>`} <div${addAttribute([!isNew && "split-2"], "class:list")}> <section class="panel"> <h2 style="margin-bottom:12px">${isNew ? "Vendor details" : "Details"}</h2> <form method="post"> <input type="hidden" name="_action" value="details"> <div class="form-grid"> ${renderComponent($$result, "Field", $$Field, {
		"class": "half",
		"label": own ? "Name" : "Vendor / business name",
		"name": "name",
		"required": true,
		"value": s.name
	})} ${renderComponent($$result, "Field", $$Field, {
		"class": "half",
		"label": "Contact person",
		"name": "contact_name",
		"value": s.contact_name
	})} ${renderComponent($$result, "Field", $$Field, {
		"class": "half",
		"label": "Phone / WhatsApp",
		"name": "phone",
		"type": "tel",
		"value": s.phone
	})} ${renderComponent($$result, "Field", $$Field, {
		"class": "half",
		"label": "Email (order emails go here)",
		"name": "email",
		"type": "email",
		"value": s.email,
		"hint": own ? "Leave blank to use the business email." : "Without an email, order emails come to you instead."
	})} ${renderComponent($$result, "Field", $$Field, {
		"class": "half",
		"label": "City",
		"name": "city",
		"value": s.city
	})} ${!own && renderTemplate`${renderComponent($$result, "Field", $$Field, {
		"class": "half",
		"label": "Priority (1 = used first)",
		"name": "priority",
		"type": "number",
		"min": 1,
		"step": 1,
		"value": s.priority
	})}`} ${!own && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` ${renderComponent($$result, "Field", $$Field, {
		"class": "half",
		"label": "How this vendor updates stock",
		"name": "update_method",
		"type": "select",
		"value": s.update_method,
		"options": [{
			value: "portal",
			label: "Vendor manages it in their Seller Hub"
		}, {
			value: "manual",
			label: "I update it here"
		}]
	})} ${renderComponent($$result, "Field", $$Field, {
		"class": "half",
		"label": "Stop selling their stock if not confirmed for (hours)",
		"name": "stale_hours",
		"type": "number",
		"min": 0,
		"step": 1,
		"value": s.stale_hours,
		"hint": "0 = never goes out of date. 24–48 is safe for most vendors."
	})} <label class="switch"><input type="checkbox" name="active"${addAttribute(!!s.active, "checked")}> Active (sell this vendor's stock)</label> ` })}`} ${renderComponent($$result, "Field", $$Field, {
		"label": "Internal notes",
		"name": "notes",
		"type": "textarea",
		"rows": 2,
		"value": s.notes
	})} </div> <button class="btn" type="submit" style="margin-top:14px">${isNew ? "Add vendor" : "Save details"}</button> </form> </section> ${!isNew && renderTemplate`<div> ${!own && renderTemplate`<section class="panel"> <h2 style="margin-bottom:8px">Seller Hub access</h2> <p class="small muted" style="margin-bottom:12px">
The vendor's own dashboard: orders to ship (no prices), their inventory with + / − stock controls, and packing slips. Opens from a private link — no password needed.
${s.portal_token_hash ? ` Link active · last used ${ago(s.portal_last_seen)}.` : " No link issued yet."} </p> <div class="btn-row"> <form method="post"${addAttribute(s.portal_token_hash ? "Create a new link? The current link will stop working." : void 0, "data-confirm")}> <input type="hidden" name="_action" value="portal_link"> <button class="btn btn--sm" type="submit">${s.portal_token_hash ? "Create new link" : "Create Seller Hub link"}</button> </form> ${s.portal_token_hash && renderTemplate`<form method="post" data-confirm="Remove Seller Hub access for this vendor?"> <input type="hidden" name="_action" value="portal_revoke"> <button class="btn btn--sm btn--ghost" type="submit">Remove access</button> </form>`} </div> </section>`} </div>`} </div> ${!isNew && renderTemplate`<section class="panel"> <div class="panel-head"> <h2>Products &amp; stock at ${s.name}</h2> <form method="post"> <input type="hidden" name="_action" value="confirm"> <button class="btn btn--sm btn--ghost" type="submit" title="The vendor confirmed every number is still right">Mark stock as checked</button> </form> </div> ${stock.length ? renderTemplate`<form method="post"> <input type="hidden" name="_action" value="save_stock"> <div class="table-wrap"> <table class="tbl"> <thead> <tr> <th scope="col">Product</th> <th scope="col">Vendor SKU / code</th> <th scope="col" class="num">On hand</th> <th scope="col" class="num">Reserved</th> <th scope="col">Updated</th> <th scope="col"><span class="sr-only">Remove</span></th> </tr> </thead> <tbody> ${stock.map((r) => renderTemplate`<tr> <td> <a class="row-link"${addAttribute(`/admin/inventory/products/${r.product_id}`, "href")}>${r.name}</a> <div class="small muted">${r.slug}${!r.tracked && " · not tracked"}${!r.published && " · hidden"}</div> </td> <td><input class="sku-in"${addAttribute(`sku_${r.product_id}`, "name")}${addAttribute(r.sku, "value")}${addAttribute(`SKU for ${r.name}`, "aria-label")}></td> <td class="num"><input class="qty-in" type="number" min="0" step="1"${addAttribute(`qty_${r.product_id}`, "name")}${addAttribute(r.qty, "value")}${addAttribute(`Units of ${r.name}`, "aria-label")}></td> <td class="num">${r.reserved || ""}</td> <td class="small">${when(r.updated_at)}</td> <td><button class="btn btn--sm btn--ghost" type="submit"${addAttribute(`rm-${r.product_id}`, "form")}>Remove</button></td> </tr>`)} </tbody> </table> </div> <div class="inline-form" style="margin-top:12px"> <div class="field"> <label for="note">Note for the stock log (optional)</label> <input id="note" name="note" placeholder="e.g. Vendor confirmed on call"> </div> <button class="btn" type="submit">Save stock</button> </div> </form>` : renderTemplate`<p class="muted">No products yet. Add them below, or the vendor can add them in their Seller Hub.</p>`} ${stock.map((r) => renderTemplate`<form method="post"${addAttribute(`rm-${r.product_id}`, "id")}${addAttribute(`Remove ${r.name} from ${s.name}?`, "data-confirm")} hidden> <input type="hidden" name="_action" value="remove"> <input type="hidden" name="product_id"${addAttribute(r.product_id, "value")}> </form>`)} ${addable.length > 0 && renderTemplate`<form method="post" class="inline-form" style="margin-top:18px;padding-top:16px;border-top:1px solid var(--line)"> <input type="hidden" name="_action" value="add_product"> <div class="field"> <label for="ap">Add product</label> <select id="ap" name="product_id" required> <option value="">Choose…</option> ${addable.map((p) => renderTemplate`<option${addAttribute(p.id, "value")}>${p.name}</option>`)} </select> </div> <div class="field" style="flex:0 1 120px"> <label for="aq">Units</label> <input id="aq" name="qty" type="number" min="0" step="1" value="0"> </div> <div class="field"> <label for="as">Vendor SKU / code</label> <input id="as" name="sku"> </div> <button class="btn btn--ghost" type="submit">Add</button> </form>`} <p class="small muted" style="margin-top:12px">Adding a product here also starts tracking it, so the site follows live stock.</p> </section>`} ${!isNew && !own && renderTemplate`<form method="post"${addAttribute(`Delete ${s.name}? This cannot be undone.`, "data-confirm")} style="margin-top:8px"> <input type="hidden" name="_action" value="delete"> <button class="btn btn--danger" type="submit">Delete vendor</button> </form>`} </div> ` })}${renderScript($$result, "C:/Programming section/virnobyte/src/pages/admin/inventory/sources/[id].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Programming section/virnobyte/src/pages/admin/inventory/sources/[id].astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/inventory/sources/[id].astro";
var $$url = "/admin/inventory/sources/[id].html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/inventory/sources/[id]@_@astro
var page = () => _id__exports;
//#endregion
export { page };
