import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, T as Fragment, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as all, o as run, r as get } from "./db_CG0-C7Y2.mjs";
import { c as setPassword } from "./auth_D-dTm5Q5.mjs";
import { n as getSettings } from "./settings_AhSsv2yB.mjs";
import { a as coinBalance, f as nextCardNumber, h as plans, n as activateMembership, o as coinHistory, r as addCoins, s as currentMembership } from "./data_CkdtwXhb.mjs";
import { r as formatDate, s as num } from "./format_B1bSNQa_.mjs";
import { t as $$Field } from "./Field_DozAohjX.mjs";
import { t as $$MembershipCard } from "./MembershipCard_Bf21kN_X.mjs";
import { t as $$Admin } from "./Admin_spHaxvNL.mjs";
//#region src/pages/admin/members/[id].astro
var _id__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Id,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Id = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Id;
	const uid = Number(Astro.params.id);
	const admin = Astro.locals.user;
	const s = getSettings();
	let member = get("SELECT * FROM users WHERE id = ? AND role = 'customer'", uid);
	if (!member) return Astro.redirect("/admin/members");
	let flash = "";
	let error = "";
	const tmpPw = Astro.cookies.get("vb_tmp_pw")?.value;
	if (tmpPw) Astro.cookies.delete("vb_tmp_pw", { path: `/admin/members/${uid}` });
	if (Astro.request.method === "POST") {
		const f = await Astro.request.formData();
		const action = String(f.get("_action"));
		const str = (k) => String(f.get(k) ?? "").trim();
		try {
			switch (action) {
				case "profile": {
					const email = str("email");
					if (!str("name") || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error("Name and a valid email are required.");
					if (get("SELECT 1 FROM users WHERE email = ? AND id != ?", email, uid)) throw new Error("Another account uses this email.");
					run("UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?", str("name"), email, str("phone"), uid);
					flash = "Member details saved.";
					break;
				}
				case "password":
					if (str("password").length < 8) throw new Error("Use at least 8 characters.");
					setPassword(uid, str("password"));
					flash = "Password changed. The member has been signed out of other devices.";
					break;
				case "issue": {
					const planId = Number(f.get("plan_id"));
					if (!planId) throw new Error("Choose a plan.");
					const res = run("INSERT INTO memberships (user_id, plan_id, card_number, status) VALUES (?, ?, ?, 'pending')", uid, planId, nextCardNumber());
					if (f.get("activate") === "on") activateMembership(Number(res.lastInsertRowid), admin.id);
					flash = f.get("activate") === "on" ? "Card issued and activated. Welcome coins credited." : "Card issued — awaiting activation.";
					break;
				}
				case "activate":
					activateMembership(Number(f.get("membership_id")), admin.id, str("start_date") || void 0);
					flash = "Card activated. Welcome coins credited.";
					break;
				case "card": {
					const mid = Number(f.get("membership_id"));
					const card = str("card_number").toUpperCase().replace(/\s+/g, "");
					if (!/^[A-Z0-9]{6,20}$/.test(card)) throw new Error("Card number: 6–20 letters and digits.");
					if (get("SELECT 1 FROM memberships WHERE card_number = ? AND id != ?", card, mid)) throw new Error("That card number is already in use.");
					const status = str("status");
					if (![
						"pending",
						"active",
						"expired",
						"cancelled"
					].includes(status)) throw new Error("Invalid status.");
					run("UPDATE memberships SET plan_id = ?, card_number = ?, status = ?, start_date = ?, end_date = ?, visits_used = ?, notes = ? WHERE id = ? AND user_id = ?", Number(f.get("plan_id")), card, status, str("start_date") || null, str("end_date") || null, Math.max(0, Number(f.get("visits_used")) || 0), str("notes"), mid, uid);
					flash = "Card updated.";
					break;
				}
				case "visit": {
					const mid = Number(f.get("membership_id"));
					run("UPDATE memberships SET visits_used = visits_used + 1 WHERE id = ? AND user_id = ?", mid, uid);
					flash = "Doorstep visit recorded.";
					break;
				}
				case "coins": {
					const amount = Math.trunc(Number(f.get("amount")));
					const reason = str("reason");
					if (!reason) throw new Error("Add a reason — the member sees it in their coin history.");
					addCoins(uid, str("direction") === "debit" ? -Math.abs(amount) : Math.abs(amount), reason, admin.id);
					flash = `${num(Math.abs(amount))} coins ${str("direction") === "debit" ? "redeemed" : "credited"}.`;
					break;
				}
				case "delete":
					run("DELETE FROM users WHERE id = ?", uid);
					return Astro.redirect("/admin/members", 303);
			}
		} catch (e) {
			error = e.message;
		}
		member = get("SELECT * FROM users WHERE id = ?", uid);
	}
	const planList = plans(true);
	const m = currentMembership(uid);
	const cards = all("SELECT m.*, p.name AS plan FROM memberships m JOIN plans p ON p.id = m.plan_id WHERE user_id = ? ORDER BY id DESC", uid);
	const balance = coinBalance(uid);
	const ledger = coinHistory(uid, 200);
	const created = Astro.url.searchParams.get("created");
	const planOpts = planList.map((p) => ({
		value: String(p.id),
		label: `${p.name}${p.active ? "" : " (not on sale)"}`
	}));
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": member.name,
		"active": "members"
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="page-head"> <div> <a href="/admin/members" class="small">← Members</a> <h1>${member.name}</h1> <p>Member since ${formatDate(member.created_at)} · ${member.phone} · ${member.email}</p> </div> </div> ${created && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">Member created.${tmpPw && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` Temporary password: <code>${tmpPw}</code> — share it with the customer now; it will not be shown again.` })}`}</p>`}${flash && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">${flash}</p>`}${error && renderTemplate`<p class="alert alert--error" role="alert" style="margin-bottom:14px">${error}</p>`}<div class="split-2"> <div> ${m ? renderTemplate`<section class="panel"> <div class="panel-head"> <h2>Membership card</h2> <span${addAttribute(["pill", m.status], "class:list")}>${m.status}</span> </div> ${m.status === "pending" && renderTemplate`<form method="post" class="inline-form" style="margin-bottom:16px"> <input type="hidden" name="_action" value="activate"> <input type="hidden" name="membership_id"${addAttribute(m.id, "value")}> ${renderComponent($$result, "Field", $$Field, {
		"label": "Start date",
		"name": "start_date",
		"type": "date",
		"value": (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	})} <button class="btn" type="submit">Activate and credit ${num(m.plan.coins)} coins</button> </form>`} <form method="post"> <input type="hidden" name="_action" value="card"> <input type="hidden" name="membership_id"${addAttribute(m.id, "value")}> <div class="form-grid"> ${renderComponent($$result, "Field", $$Field, {
		"class": "half",
		"label": "Plan",
		"name": "plan_id",
		"type": "select",
		"required": true,
		"value": String(m.plan_id),
		"options": planOpts
	})} ${renderComponent($$result, "Field", $$Field, {
		"class": "half",
		"label": "Card number",
		"name": "card_number",
		"required": true,
		"value": m.card_number
	})} ${renderComponent($$result, "Field", $$Field, {
		"class": "half",
		"label": "Status",
		"name": "status",
		"type": "select",
		"required": true,
		"value": m.status,
		"options": [
			{
				value: "pending",
				label: "Awaiting activation"
			},
			{
				value: "active",
				label: "Active"
			},
			{
				value: "expired",
				label: "Expired"
			},
			{
				value: "cancelled",
				label: "Cancelled"
			}
		]
	})} ${renderComponent($$result, "Field", $$Field, {
		"class": "half",
		"label": `Doorstep visits used (of ${m.plan.doorstep_visits})`,
		"name": "visits_used",
		"type": "number",
		"min": 0,
		"value": m.visits_used
	})} ${renderComponent($$result, "Field", $$Field, {
		"class": "half",
		"label": "Valid from",
		"name": "start_date",
		"type": "date",
		"value": m.start_date ?? ""
	})} ${renderComponent($$result, "Field", $$Field, {
		"class": "half",
		"label": "Valid until",
		"name": "end_date",
		"type": "date",
		"value": m.end_date ?? ""
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Internal notes",
		"name": "notes",
		"type": "textarea",
		"rows": 2,
		"value": m.notes
	})} </div> <div class="btn-row" style="margin-top:14px"> <button class="btn" type="submit">Save card</button> </div> </form> ${m.status === "active" && renderTemplate`<form method="post" style="margin-top:10px"> <input type="hidden" name="_action" value="visit"> <input type="hidden" name="membership_id"${addAttribute(m.id, "value")}> <button class="btn btn--ghost" type="submit"${addAttribute(m.visits_used >= m.plan.doorstep_visits, "disabled")}>
Record a doorstep visit (${Math.max(0, m.plan.doorstep_visits - m.visits_used)} left)
</button> </form>`} </section>` : null} ${(!m || m.status === "expired" || m.status === "cancelled") && renderTemplate`<section class="panel"> <h2 style="margin-bottom:12px">${m ? "Issue a new card (renewal)" : "Issue a membership card"}</h2> <form method="post" class="inline-form"> <input type="hidden" name="_action" value="issue"> ${renderComponent($$result, "Field", $$Field, {
		"label": "Plan",
		"name": "plan_id",
		"type": "select",
		"required": true,
		"options": planOpts
	})} <label class="switch"><input type="checkbox" name="activate" checked> Activate now (payment received)</label> <button class="btn" type="submit">Issue card</button> </form> </section>`} <section class="panel"> <div class="panel-head"> <h2>${s.coins.name}</h2> <strong style="font-size:1.5rem">${num(balance)}</strong> </div> <form method="post" class="inline-form"> <input type="hidden" name="_action" value="coins"> <div class="field" style="flex:0 1 150px"> <label for="dir">Action</label> <select id="dir" name="direction"> <option value="credit">Credit (add)</option> <option value="debit">Redeem (subtract)</option> </select> </div> ${renderComponent($$result, "Field", $$Field, {
		"label": "Coins",
		"name": "amount",
		"type": "number",
		"required": true,
		"min": 1,
		"step": 1
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Reason (visible to member)",
		"name": "reason",
		"required": true,
		"placeholder": "e.g. Redeemed on invoice #1042"
	})} <button class="btn" type="submit">Apply</button> </form> ${ledger.length > 0 && renderTemplate`<div class="table-wrap" style="margin-top:16px"> <table class="tbl"> <thead><tr><th scope="col">Date</th><th scope="col">Reason</th><th scope="col" class="num">Coins</th></tr></thead> <tbody> ${ledger.map((l) => renderTemplate`<tr> <td>${formatDate(l.created_at)}</td> <td>${l.reason}</td> <td class="num"${addAttribute(`color:var(${l.delta > 0 ? "--ok" : "--danger"});font-weight:700`, "style")}>${l.delta > 0 ? "+" : "−"}${num(Math.abs(l.delta))}</td> </tr>`)} </tbody> </table> </div>`} </section> ${cards.length > 1 && renderTemplate`<section class="panel"> <h2 style="margin-bottom:12px">Card history</h2> <table class="tbl"> <thead><tr><th scope="col">Card</th><th scope="col">Plan</th><th scope="col">Status</th><th scope="col">Valid</th></tr></thead> <tbody> ${cards.map((c) => renderTemplate`<tr><td><code>${c.card_number}</code></td><td>${c.plan}</td><td><span${addAttribute(["pill", c.status], "class:list")}>${c.status}</span></td><td>${formatDate(c.start_date)} – ${formatDate(c.end_date)}</td></tr>`)} </tbody> </table> </section>`} <section class="panel"> <h2 style="margin-bottom:12px">Member details</h2> <form method="post"> <input type="hidden" name="_action" value="profile"> <div class="form-grid"> ${renderComponent($$result, "Field", $$Field, {
		"class": "half",
		"label": "Name on card",
		"name": "name",
		"required": true,
		"value": member.name
	})} ${renderComponent($$result, "Field", $$Field, {
		"class": "half",
		"label": "Mobile",
		"name": "phone",
		"type": "tel",
		"value": member.phone
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Email (sign-in)",
		"name": "email",
		"type": "email",
		"required": true,
		"value": member.email
	})} </div> <button class="btn" type="submit" style="margin-top:14px">Save details</button> </form> <form method="post" class="inline-form" style="margin-top:20px"> <input type="hidden" name="_action" value="password"> ${renderComponent($$result, "Field", $$Field, {
		"label": "New password",
		"name": "password",
		"type": "text",
		"minlength": 8,
		"hint": "For customers who forgot theirs."
	})} <button class="btn btn--ghost" type="submit">Set password</button> </form> </section> <form method="post" data-confirm="Delete this member, their cards and coin history? This cannot be undone." style="margin-top:16px"> <input type="hidden" name="_action" value="delete"> <button class="btn btn--danger" type="submit">Delete member</button> </form> </div> <aside class="sticky-col"> <div class="panel"> <h2 style="margin-bottom:12px">Card as the member sees it</h2> ${m ? renderTemplate`${renderComponent($$result, "MembershipCard", $$MembershipCard, {
		"planName": m.plan.name,
		"from": m.plan.card_from,
		"to": m.plan.card_to,
		"text": m.plan.card_text,
		"pattern": m.plan.card_pattern,
		"holder": member.name,
		"number": m.card_number,
		"validThru": m.end_date,
		"coins": balance,
		"status": m.status
	})}` : renderTemplate`<p class="muted">No card issued yet.</p>`} ${m && renderTemplate`<dl class="kv" style="margin-top:14px"> <dt>Coin value</dt><dd>₹${num(balance * s.coins.valueInr)}</dd> <dt>Visits left</dt><dd>${Math.max(0, m.plan.doorstep_visits - m.visits_used)} of ${m.plan.doorstep_visits}</dd> <dt>Valid until</dt><dd>${formatDate(m.end_date) || "—"}</dd> </dl>`} </div> </aside> </div> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/admin/members/[id].astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/members/[id].astro";
var $$url = "/admin/members/[id].html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/members/[id]@_@astro
var page = () => _id__exports;
//#endregion
export { page };
