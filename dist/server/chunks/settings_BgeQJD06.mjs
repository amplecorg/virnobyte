import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { o as run, r as get } from "./db_DgpM4awz.mjs";
import { c as setPassword } from "./auth_DFm_x978.mjs";
import { n as getSettings, r as saveSetting } from "./settings_D4sn-e6I.mjs";
import { h as plans } from "./data_Bs0BnE5b.mjs";
import { t as $$MembershipCard } from "./MembershipCard_WLmIZgIv.mjs";
import { t as $$Admin } from "./Admin_Dgg6he94.mjs";
import { t as $$AdminField } from "./AdminField_p2UUjYP-.mjs";
import { i as saveUpload } from "./forms_D7cfCAIR.mjs";
//#region src/pages/admin/settings.astro
var settings_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Settings,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Settings = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Settings;
	const currentUser = Astro.locals.user;
	const SECTIONS = [
		{
			key: "business",
			title: "Business details (NAP)",
			intro: "Name, address and phone appear in the header, footer, contact page, map, membership cards and LocalBusiness schema. Keep them identical to your Google Business Profile.",
			fields: [
				{
					name: "name",
					label: "Business name",
					type: "text",
					required: true,
					half: true
				},
				{
					name: "legalName",
					label: "Legal name",
					type: "text",
					half: true
				},
				{
					name: "phone",
					label: "Phone",
					type: "text",
					required: true,
					half: true
				},
				{
					name: "whatsapp",
					label: "WhatsApp number",
					type: "text",
					required: true,
					half: true
				},
				{
					name: "email",
					label: "Email",
					type: "text",
					half: true
				},
				{
					name: "foundedYear",
					label: "Founded (year)",
					type: "number",
					half: true
				},
				{
					name: "street",
					label: "Street address",
					type: "textarea",
					rows: 2,
					required: true,
					help: "Comma-separated, e.g. Office No. 1, Sadichha Complex, …"
				},
				{
					name: "locality",
					label: "Locality",
					type: "text",
					half: true
				},
				{
					name: "city",
					label: "City",
					type: "text",
					half: true
				},
				{
					name: "region",
					label: "State",
					type: "text",
					half: true
				},
				{
					name: "postalCode",
					label: "PIN code",
					type: "text",
					half: true
				},
				{
					name: "country",
					label: "Country",
					type: "text",
					half: true
				},
				{
					name: "hours",
					label: "Opening hours",
					type: "text",
					half: true,
					help: "Leave empty until confirmed — shown on the contact page when set."
				},
				{
					name: "serviceAreas",
					label: "Service areas",
					type: "list",
					help: "One per line. Only areas you genuinely serve."
				},
				{
					name: "social.facebook",
					label: "Facebook URL",
					type: "text",
					half: true
				},
				{
					name: "social.instagram",
					label: "Instagram URL",
					type: "text",
					half: true
				},
				{
					name: "social.linkedin",
					label: "LinkedIn URL",
					type: "text",
					half: true
				},
				{
					name: "social.x",
					label: "X (Twitter) URL",
					type: "text",
					half: true
				}
			]
		},
		{
			key: "coins",
			title: "Coin program",
			intro: "Rules for the coins shown on every membership card. Welcome coins per plan are set on each plan.",
			fields: [
				{
					name: "name",
					label: "Coin name",
					type: "text",
					required: true,
					half: true
				},
				{
					name: "valueInr",
					label: "Value of 1 coin (₹)",
					type: "number",
					half: true
				},
				{
					name: "maxRedeemPercent",
					label: "Max % of a bill payable with coins",
					type: "number",
					half: true,
					help: "0 = no limit shown."
				},
				{
					name: "expiryMonths",
					label: "Coins expire after (months)",
					type: "number",
					half: true,
					help: "0 = no expiry shown."
				},
				{
					name: "rules",
					label: "Coin rules",
					type: "list",
					help: "Shown on the membership page. One rule per line."
				}
			]
		},
		{
			key: "card",
			title: "Membership card",
			intro: "Card numbering and the line printed under each member card.",
			fields: [
				{
					name: "prefix",
					label: "Card number prefix",
					type: "text",
					half: true,
					help: "Letters only, e.g. VB → VB2600000001"
				},
				{
					name: "issuerLine",
					label: "Issuer label",
					type: "text",
					half: true
				},
				{
					name: "terms",
					label: "Card note",
					type: "text"
				}
			]
		},
		{
			key: "home",
			title: "Home page hero",
			intro: "The first screen of the website. Keep the H1 focused on your main service and location.",
			fields: [
				{
					name: "eyebrow",
					label: "Line above the heading",
					type: "text"
				},
				{
					name: "h1",
					label: "Main heading (H1)",
					type: "text",
					required: true,
					max: 70
				},
				{
					name: "lede",
					label: "Supporting text",
					type: "textarea",
					rows: 3,
					max: 220
				},
				{
					name: "facts.0.value",
					label: "Fact 1 value",
					type: "text",
					half: true
				},
				{
					name: "facts.0.label",
					label: "Fact 1 label",
					type: "text",
					half: true
				},
				{
					name: "facts.1.value",
					label: "Fact 2 value",
					type: "text",
					half: true
				},
				{
					name: "facts.1.label",
					label: "Fact 2 label",
					type: "text",
					half: true
				},
				{
					name: "facts.2.value",
					label: "Fact 3 value",
					type: "text",
					half: true
				},
				{
					name: "facts.2.label",
					label: "Fact 3 label",
					type: "text",
					half: true
				},
				{
					name: "heroImage",
					label: "Hero photo",
					type: "image",
					help: "A real photo of your workshop works best. Shown full-screen, so upload at least 2560px wide."
				},
				{
					name: "heroAlt",
					label: "Hero photo description (alt text)",
					type: "text"
				}
			]
		},
		{
			key: "careers",
			title: "Careers page",
			intro: "Shared by the careers hub and every role page.",
			fields: [
				{
					name: "promise",
					label: "Hero promise",
					type: "textarea",
					rows: 2
				},
				{
					name: "direction",
					label: "Where the company is going",
					type: "textarea",
					rows: 3
				},
				{
					name: "steps",
					label: "How we hire",
					type: "list",
					help: "One step per line: Title | what happens | how long it takes"
				},
				{
					name: "heroImage",
					label: "Careers hero photo",
					type: "image"
				}
			]
		},
		{
			key: "pcbuilder",
			title: "PC builder pricing",
			intro: "How totals are calculated in the custom PC builder. Fees of 0 are not shown to customers.",
			fields: [
				{
					name: "gstPercent",
					label: "GST %",
					type: "number",
					half: true
				},
				{
					name: "pricesIncludeGst",
					label: "Part prices include GST",
					type: "bool",
					half: true
				},
				{
					name: "assemblyFee",
					label: "Assembly & testing fee (₹)",
					type: "number",
					half: true
				},
				{
					name: "deliveryFee",
					label: "Delivery fee (₹)",
					type: "number",
					half: true
				},
				{
					name: "note",
					label: "Price note shown to customers",
					type: "textarea",
					rows: 2
				}
			]
		},
		{
			key: "announcement",
			title: "Announcement bar",
			intro: "Optional strip above the header, e.g. a festival offer. Leave empty to hide.",
			fields: [{
				name: "text",
				label: "Text",
				type: "text",
				half: true
			}, {
				name: "href",
				label: "Link (optional)",
				type: "text",
				half: true
			}]
		},
		{
			key: "seo",
			title: "Search engines",
			intro: "Verification codes from Google Search Console and Bing Webmaster Tools (content value only).",
			fields: [{
				name: "googleVerification",
				label: "Google verification code",
				type: "text",
				half: true
			}, {
				name: "bingVerification",
				label: "Bing verification code",
				type: "text",
				half: true
			}]
		}
	];
	const getPath = (o, path) => path.split(".").reduce((a, k) => a == null ? a : a[k], o);
	function setPath(o, path, v) {
		const ks = path.split(".");
		let cur = o;
		ks.slice(0, -1).forEach((k, i) => {
			if (cur[k] == null) cur[k] = /^\d+$/.test(ks[i + 1]) ? [] : {};
			cur = cur[k];
		});
		cur[ks[ks.length - 1]] = v;
	}
	let settings = getSettings();
	let flash = "";
	let error = "";
	const errors = {};
	if (Astro.request.method === "POST") {
		const form = await Astro.request.formData();
		if (form.get("_action") === "admin_account") {
			const adminEmail = String(form.get("admin_email") ?? "").trim().toLowerCase();
			const adminName = String(form.get("admin_name") ?? "").trim();
			const newPassword = String(form.get("new_password") ?? "");
			if (!adminEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(adminEmail)) error = "Please enter a valid admin email address.";
			else if (get("SELECT id FROM users WHERE lower(email) = ? AND id != ?", adminEmail, currentUser.id)) error = "Another user account already uses this email address.";
			else {
				run("UPDATE users SET email = ?, name = ? WHERE id = ?", adminEmail, adminName || currentUser.name, currentUser.id);
				if (newPassword) {
					if (newPassword.length < 8) error = "New password must be at least 8 characters long.";
					else setPassword(currentUser.id, newPassword);
				}
				if (!error) {
					flash = "Admin account updated successfully. Your new login email is now active.";
					currentUser.email = adminEmail;
					if (adminName) currentUser.name = adminName;
				}
			}
		} else {
			const sec = SECTIONS.find((x) => x.key === form.get("_section"));
			if (sec) {
				const value = structuredClone(settings[sec.key]);
				for (const f of sec.fields) {
					const raw = String(form.get(f.name) ?? "").trim();
					let v = raw;
					if (f.type === "number") v = Math.max(0, Math.trunc(Number(raw) || 0));
					if (f.type === "bool") v = form.get(f.name) === "on";
					if (f.type === "list") {
						const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
						v = sec.key === "careers" && f.name === "steps" ? lines.map((l) => {
							const [title, detail = "", duration = ""] = l.split("|").map((x) => x.trim());
							return {
								title,
								detail,
								duration
							};
						}) : lines;
					}
					if (f.type === "image") {
						const up = form.get(`${f.name}__upload`);
						if (up instanceof File && up.size > 0) try {
							v = await saveUpload(up, `virnobyte-${sec.key}-hero`);
						} catch (e) {
							errors[`${sec.key}.${f.name}`] = e.message;
						}
					}
					if (f.required && !v) errors[`${sec.key}.${f.name}`] = `${f.label} is required.`;
					setPath(value, f.name, v);
				}
				if (sec.key === "card") value.prefix = String(value.prefix).toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4) || "VB";
				if (Object.keys(errors).length) error = "Some fields need attention.";
				else {
					saveSetting(sec.key, value);
					settings = getSettings();
					flash = `${sec.title} saved. Changes are live on the website.`;
				}
			}
		}
	}
	function formValue(sec, f) {
		const v = getPath(settings[sec.key], f.name);
		if (f.type === "list") {
			if (sec.key === "careers" && f.name === "steps") return v.map((s) => `${s.title} | ${s.detail} | ${s.duration}`).join("\n");
			return v.join("\n");
		}
		if (f.type === "bool") return v ? "1" : "0";
		return v == null ? "" : String(v);
	}
	const sample = plans()[1] ?? plans()[0];
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, {
		"title": "Settings",
		"active": "settings"
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<div class="page-head"> <div> <h1>Website & Admin Settings</h1> <p>Each section saves separately and updates immediately.</p> </div> <nav class="tabs" aria-label="Sections"> <a href="#account">Admin Account</a> ${SECTIONS.map((s) => renderTemplate`<a${addAttribute(`#${s.key}`, "href")}>${s.title}</a>`)} </nav> </div> ${flash && renderTemplate`<p class="alert alert--ok" role="status" style="margin-bottom:14px">${flash}</p>`}${error && renderTemplate`<p class="alert alert--error" role="alert" style="margin-bottom:14px">${error}</p>`} <section class="panel" id="account" style="scroll-margin-top:20px; border-left: 4px solid var(--accent, #0b2545);"> <form method="post"> <input type="hidden" name="_action" value="admin_account"> <h2>Administrator Login Account</h2> <p class="small muted" style="margin:4px 0 14px">
Manage the login credentials used to access the /admin portal.
</p> <div class="form-grid"> <div class="field"> <label for="admin_name">Admin Display Name</label> <input id="admin_name" name="admin_name" type="text"${addAttribute(currentUser.name, "value")} required> </div> <div class="field"> <label for="admin_email">Admin Login Email</label> <input id="admin_email" name="admin_email" type="email"${addAttribute(currentUser.email, "value")} required autocomplete="email"> <span class="hint">The email address you use to sign in to /admin.</span> </div> <div class="field" style="grid-column: 1 / -1;"> <label for="new_password">New Password (optional)</label> <input id="new_password" name="new_password" type="password"${addAttribute(8, "minlength")} autocomplete="new-password" placeholder="Leave empty to keep your existing password"> <span class="hint">Only enter a value if you wish to change your password (minimum 8 characters).</span> </div> </div> <button class="btn" type="submit" style="margin-top:14px">Save Admin Account</button> </form> </section> ${SECTIONS.map((sec) => renderTemplate`<section class="panel"${addAttribute(sec.key, "id")} style="scroll-margin-top:20px"> <div${addAttribute(sec.key === "coins" || sec.key === "card" ? "split-2" : void 0, "class")}> <form method="post" enctype="multipart/form-data"> <input type="hidden" name="_section"${addAttribute(sec.key, "value")}> <h2>${sec.title}</h2> <p class="small muted" style="margin:4px 0 14px">${sec.intro}</p> <div class="form-grid"> ${sec.fields.map((f) => renderTemplate`${renderComponent($$result, "AdminField", $$AdminField, {
		"field": f,
		"scope": `${sec.key}-`,
		"value": formValue(sec, f),
		"error": errors[`${sec.key}.${f.name}`]
	})}`)} </div> <button class="btn" type="submit" style="margin-top:14px">Save ${sec.title.toLowerCase()}</button> </form> ${(sec.key === "coins" || sec.key === "card") && sample && renderTemplate`<div> ${renderComponent($$result, "MembershipCard", $$MembershipCard, {
		"planName": sample.name,
		"from": sample.card_from,
		"to": sample.card_to,
		"text": sample.card_text,
		"pattern": sample.card_pattern,
		"coins": sample.coins,
		"holder": "Member name",
		"number": `${settings.card.prefix}2600000001`,
		"validThru": "2027-10-07",
		"status": "active"
	})} <p class="small muted" style="margin-top:8px">Preview with the ${sample.name} plan. Card colours are edited under <a href="/admin/r/plans">Plans & card design</a>.</p> </div>`} </div> </section>`)}` })}`;
}, "C:/Programming section/virnobyte/src/pages/admin/settings.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/admin/settings.astro";
var $$url = "/admin/settings.html";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/settings@_@astro
var page = () => settings_exports;
//#endregion
export { page };
