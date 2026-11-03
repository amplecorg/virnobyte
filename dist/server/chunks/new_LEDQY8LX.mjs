import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { c as hashPassword, o as run, r as get } from "./db_DQxgWG_z.mjs";
import { h as plans, n as activateMembership, x as requestMembership } from "./data_BsFNaZtg.mjs";
import { t as $$Field } from "./Field_DozAohjX.mjs";
import { t as $$Admin } from "./Admin_AG2XxGYm.mjs";
import { randomBytes } from "node:crypto";
//#region src/pages/admin/members/new.astro
var new_exports = /* @__PURE__ */ __exportAll({
	default: () => $$New,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$New = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$New;
	const planList = plans(true);
	const errors = {};
	const v = {
		name: "",
		email: "",
		phone: "",
		plan: "",
		activate: "1"
	};
	if (Astro.request.method === "POST") {
		const f = await Astro.request.formData();
		v.name = String(f.get("name") ?? "").trim();
		v.email = String(f.get("email") ?? "").trim();
		v.phone = String(f.get("phone") ?? "").trim();
		v.plan = String(f.get("plan") ?? "");
		v.activate = f.get("activate") === "on" ? "1" : "0";
		const password = String(f.get("password") ?? "");
		if (!v.name) errors.name = "Enter the member’s name.";
		if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) errors.email = "Enter a valid email; the member signs in with it.";
		else if (get("SELECT 1 FROM users WHERE email = ?", v.email)) errors.email = "A user with this email already exists.";
		if (!/^[+]?[0-9 ()-]{10,16}$/.test(v.phone)) errors.phone = "Enter a 10-digit mobile number.";
		if (password && password.length < 8) errors.password = "Use at least 8 characters, or leave empty to generate one.";
		if (!Object.keys(errors).length) {
			const pw = password || randomBytes(6).toString("base64url");
			const res = run("INSERT INTO users (name, email, phone, password_hash, role) VALUES (?,?,?,?, 'customer')", v.name, v.email, v.phone, hashPassword(pw));
			const uid = Number(res.lastInsertRowid);
			if (v.plan) {
				const mid = requestMembership(uid, Number(v.plan));
				if (v.activate === "1") activateMembership(mid, Astro.locals.user.id);
			}
			Astro.cookies.set("vb_tmp_pw", pw, {
				path: `/admin/members/${uid}`,
				httpOnly: true,
				sameSite: "strict",
				maxAge: 120
			});
			return Astro.redirect(`/admin/members/${uid}?created=1`, 303);
		}
	}
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": "Add member",
		"active": "members"
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="page-head"> <div> <a href="/admin/members" class="small">← Members</a> <h1>Add member</h1> <p>Create an account for a walk-in customer and issue their card in one step.</p> </div> </div> <form method="post" class="panel" style="max-width:760px"> <div class="form-grid"> ${renderComponent($$result, "Field", $$Field, {
		"label": "Full name",
		"name": "name",
		"required": true,
		"value": v.name,
		"error": errors.name,
		"hint": "Printed on the card."
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Email",
		"name": "email",
		"type": "email",
		"required": true,
		"value": v.email,
		"error": errors.email
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Mobile",
		"name": "phone",
		"type": "tel",
		"required": true,
		"value": v.phone,
		"error": errors.phone
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Password",
		"name": "password",
		"type": "text",
		"error": errors.password,
		"hint": "Leave empty to generate a temporary password."
	})} ${renderComponent($$result, "Field", $$Field, {
		"label": "Membership plan",
		"name": "plan",
		"type": "select",
		"value": v.plan,
		"options": planList.map((p) => ({
			value: String(p.id),
			label: `${p.name} — ₹${p.price} · ${p.coins} coins`
		})),
		"hint": "Leave empty to create the account without a card."
	})} <label class="switch"><input type="checkbox" name="activate"${addAttribute(v.activate === "1", "checked")}> Activate the card now and credit welcome coins (payment received)</label> </div> <div class="sticky-actions"><button class="btn" type="submit">Create member</button></div> </form> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/admin/members/new.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/members/new.astro";
var $$url = "/admin/members/new.html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/members/new@_@astro
var page = () => new_exports;
//#endregion
export { page };
