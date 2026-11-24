import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, T as Fragment, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { i as get, n as all } from "./db_CrQR8QZK.mjs";
import { s as num } from "./format_6aaLy6w7.mjs";
import { _ as setStock, b as stockBySource, d as isTracked, h as removeStockRow, n as STATUS_LABEL, s as availableFor, t as ALLOCATION_SELECT, v as setTracking } from "./stock_CkuKY_dx.mjs";
import { t as $$Admin } from "./Admin_jHwtJnua.mjs";
import { t as $$InventoryNav } from "./InventoryNav_B758Thv_.mjs";
import { n as when, t as ago } from "./format_DKM6ep4K.mjs";
//#region src/pages/admin/inventory/products/[id].astro
var _id__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Id,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Id = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Id;
	const pid = Number(Astro.params.id);
	const product = get("SELECT id, name, slug, category, published, in_stock FROM products WHERE id = ?", pid);
	if (!product) return Astro.redirect("/admin/inventory/products");
	const admin = Astro.locals.user;
	const actor = `Admin: ${admin.name || admin.email}`;
	let flash = "";
	let error = "";
	if (Astro.request.method === "POST") {
		const f = await Astro.request.formData();
		const str = (k) => String(f.get(k) ?? "").trim();
		try {
			switch (str("_action")) {
				case "tracking":
					setTracking(pid, f.get("tracked") === "on", Number(str("low_level")));
					flash = "Saved.";
					break;
				case "save_stock": {
					let changed = 0;
					for (const s of stockBySource(pid)) {
						const rawQty = f.get(`qty_${s.source_id}`);
						if (rawQty == null) continue;
						const qty = Math.max(0, Math.trunc(Number(String(rawQty).replace(/[,\s]/g, "")) || 0));
						const sku = str(`sku_${s.source_id}`);
						if (qty !== s.qty || sku !== s.sku) {
							setStock(s.source_id, [{
								productId: pid,
								qty,
								sku
							}], "SET", actor, str("note"));
							changed++;
						}
					}
					flash = changed ? "Stock saved." : "Nothing changed.";
					break;
				}
				case "add_source": {
					const sid = Number(str("source_id"));
					if (!sid) throw new Error("Choose a source.");
					setStock(sid, [{
						productId: pid,
						qty: Number(str("qty")) || 0,
						sku: str("sku")
					}], "SET", actor, "Added to source");
					flash = "Added.";
					break;
				}
				case "remove":
					removeStockRow(Number(str("source_id")), pid, actor);
					flash = "Removed.";
			}
		} catch (e) {
			error = e.message;
		}
	}
	const tracked = isTracked(pid);
	const settings = get("SELECT low_level FROM inv_products WHERE product_id = ?", pid) ?? { low_level: 2 };
	const sources = stockBySource(pid);
	const available = availableFor(pid);
	const onSite = get("SELECT in_stock FROM products WHERE id = ?", pid)?.in_stock;
	const listed = new Set(sources.map((s) => s.source_id));
	const otherSources = all("SELECT id, name, active FROM inv_sources ORDER BY CASE kind WHEN 'own' THEN 0 ELSE 1 END, name").filter((s) => !listed.has(s.id));
	const lines = all(`${ALLOCATION_SELECT} WHERE a.product_id = ? ORDER BY a.id DESC LIMIT 25`, pid);
	const moves = all(`SELECT m.*, s.name AS source_name FROM inv_movements m LEFT JOIN inv_sources s ON s.id = m.source_id WHERE m.product_id = ? ORDER BY m.id DESC LIMIT 40`, pid);
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": `Stock · ${product.name}`,
		"active": "inventory"
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="inv"> <div class="page-head"> <div> <a href="/admin/inventory/products" class="back-btn">Stock</a> <h1>${product.name}</h1> <p> ${tracked ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate`Available to sell now: <b>${num(available ?? 0)}</b>` })}` : "Manual stock — the \"In stock\" switch on the product page applies."} · On the site:${" "} <b>${onSite ? "In stock" : "Out of stock"}</b> </p> </div> <a class="btn btn--ghost"${addAttribute(`/admin/r/products/${pid}`, "href")}>Edit product details</a> </div> ${renderComponent($$result, "InventoryNav", $$InventoryNav, { "active": "products" })} ${flash && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">${flash}</p>`} ${error && renderTemplate`<p class="alert alert--error" role="alert" style="margin-bottom:14px">${error}</p>`} <section class="panel"> <h2 style="margin-bottom:12px">Stock control</h2> <form method="post" class="inline-form"> <input type="hidden" name="_action" value="tracking"> <label class="switch"><input type="checkbox" name="tracked"${addAttribute(tracked, "checked")}> Automatic: show "In stock" only while units are available</label> <div class="field" style="flex:0 1 200px"> <label for="low">Low-stock alert at or below</label> <input id="low" name="low_level" type="number" min="0" step="1"${addAttribute(settings.low_level, "value")}> </div> <button class="btn" type="submit">Save</button> </form> </section> <section class="panel"> <div class="panel-head"><h2>Who has stock</h2><span class="small muted">Orders go to your own stock first, then to vendors in priority order.</span></div> ${sources.length ? renderTemplate`<form method="post"> <input type="hidden" name="_action" value="save_stock"> <div class="table-wrap"> <table class="tbl"> <thead> <tr> <th scope="col">Stock with</th> <th scope="col">Vendor SKU / code</th> <th scope="col" class="num">On hand</th> <th scope="col" class="num">Reserved</th> <th scope="col" class="num">Free</th> <th scope="col">Selling?</th> <th scope="col">Updated</th> <th scope="col"><span class="sr-only">Remove</span></th> </tr> </thead> <tbody> ${sources.map((s) => renderTemplate`<tr> <td><a class="row-link"${addAttribute(`/admin/inventory/sources/${s.source_id}`, "href")}>${s.name}</a></td> <td><input class="sku-in"${addAttribute(`sku_${s.source_id}`, "name")}${addAttribute(s.sku, "value")}${addAttribute(`SKU at ${s.name}`, "aria-label")}></td> <td class="num"><input class="qty-in" type="number" min="0" step="1"${addAttribute(`qty_${s.source_id}`, "name")}${addAttribute(s.qty, "value")}${addAttribute(`Units at ${s.name}`, "aria-label")}></td> <td class="num">${s.reserved || ""}</td> <td class="num"><b>${Math.max(0, s.free)}</b></td> <td> ${s.usable ? renderTemplate`<span class="pill good">Yes</span>` : !s.active ? renderTemplate`<span class="pill">Vendor off</span>` : renderTemplate`<span class="pill bad" title="The vendor has not confirmed stock recently">Out of date</span>`} </td> <td class="small">${ago(s.updated_at)}</td> <td> <button class="btn btn--sm btn--ghost" type="submit"${addAttribute(`rm-${s.source_id}`, "form")}>Remove</button> </td> </tr>`)} </tbody> </table> </div> <div class="inline-form" style="margin-top:12px"> <div class="field"> <label for="note">Note for the stock log (optional)</label> <input id="note" name="note" placeholder="e.g. Counted on shelf"> </div> <button class="btn" type="submit">Save stock</button> </div> </form>` : renderTemplate`<p class="muted">Nobody has stock of this product yet. Add yours or a vendor’s below.</p>`} ${sources.map((s) => renderTemplate`<form method="post"${addAttribute(`rm-${s.source_id}`, "id")}${addAttribute(`Remove ${product.name} from ${s.name}?`, "data-confirm")} hidden> <input type="hidden" name="_action" value="remove"> <input type="hidden" name="source_id"${addAttribute(s.source_id, "value")}> </form>`)} ${otherSources.length > 0 && renderTemplate`<form method="post" class="inline-form" style="margin-top:18px;padding-top:16px;border-top:1px solid var(--line)"> <input type="hidden" name="_action" value="add_source"> <div class="field"> <label for="src">Add stock with</label> <select id="src" name="source_id" required> <option value="">Choose…</option> ${otherSources.map((s) => renderTemplate`<option${addAttribute(s.id, "value")}>${s.name}${s.active ? "" : " (off)"}</option>`)} </select> </div> <div class="field" style="flex:0 1 120px"> <label for="aq">Units</label> <input id="aq" name="qty" type="number" min="0" step="1" value="0"> </div> <div class="field"> <label for="as">Vendor SKU / code</label> <input id="as" name="sku" placeholder="As in their stock list"> </div> <button class="btn btn--ghost" type="submit">Add</button> </form>`} </section> <div class="split-2"> <section class="panel"> <div class="panel-head"><h2>Recent orders</h2><a class="small" href="/admin/inventory/fulfilment">All shipments</a></div> ${lines.length ? renderTemplate`<table class="tbl"> <tbody> ${lines.map((l) => renderTemplate`<tr> <td><a class="row-link"${addAttribute(`/admin/r/orders/${l.order_id}#shipping`, "href")}>${l.order_ref}</a><div class="small muted">${when(l.created_at)}</div></td> <td class="num">× ${l.qty}</td> <td>${l.source_name ?? "—"}</td> <td><span${addAttribute(["pill", `s-${l.status}`], "class:list")}>${STATUS_LABEL[l.status]}</span></td> </tr>`)} </tbody> </table>` : renderTemplate`<p class="muted">No orders for this product yet.</p>`} </section> <section class="panel"> <div class="panel-head"><h2>Stock history</h2><a class="small"${addAttribute(`/admin/inventory/movements?product=${pid}`, "href")}>Full history</a></div> ${moves.length ? renderTemplate`<table class="tbl"> <tbody> ${moves.map((m) => renderTemplate`<tr> <td class="small">${when(m.created_at)}</td> <td>${m.source_name ?? "—"}<div class="small muted">${m.kind}${m.ref && ` · ${m.ref}`}${m.note && ` · ${m.note}`}</div></td> <td class="num"><span${addAttribute(m.delta > 0 ? "delta-pos" : "delta-neg", "class")}>${m.delta > 0 ? "+" : "−"}${Math.abs(m.delta)}</span><div class="small muted">→ ${m.qty_after}</div></td> </tr>`)} </tbody> </table>` : renderTemplate`<p class="muted">No stock changes yet.</p>`} </section> </div> </div> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/admin/inventory/products/[id].astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/inventory/products/[id].astro";
var $$url = "/admin/inventory/products/[id].html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/inventory/products/[id]@_@astro
var page = () => _id__exports;
//#endregion
export { page };
