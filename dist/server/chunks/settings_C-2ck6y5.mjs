import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { i as get, s as run } from "./db_CrQR8QZK.mjs";
import { n as getSettings, r as saveSetting } from "./settings_C74a6Mrw.mjs";
import { r as sendEmail, t as isMailConfigured } from "./mail_DcBTvtJo.mjs";
import { c as setPassword, l as siteOrigin } from "./auth_CFhoV3Rg.mjs";
import { g as plans } from "./data_rJFB0L58.mjs";
import { t as $$MembershipCard } from "./MembershipCard_D9OWERb3.mjs";
import { t as $$Admin } from "./Admin_jHwtJnua.mjs";
import { t as $$AdminField } from "./AdminField_CfQlHeR8.mjs";
import { o as saveUpload } from "./forms_DglaNJcN.mjs";
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
			key: "company",
			title: "Company profile & invoicing",
			intro: "Registered company details. Shown in the Company profile on the About page and printed on every website tax invoice. Keep them identical to your GST and MCA records.",
			fields: [
				{
					name: "legalName",
					label: "Registered company name",
					type: "text",
					required: true,
					half: true
				},
				{
					name: "companyType",
					label: "Company type",
					type: "text",
					half: true
				},
				{
					name: "cin",
					label: "CIN",
					type: "text",
					half: true
				},
				{
					name: "incorporatedOn",
					label: "Incorporated on",
					type: "text",
					half: true,
					help: "DD-MM-YYYY"
				},
				{
					name: "gstin",
					label: "GSTIN",
					type: "text",
					required: true,
					half: true
				},
				{
					name: "pan",
					label: "PAN",
					type: "text",
					half: true
				},
				{
					name: "gstState",
					label: "GST state (place of business)",
					type: "text",
					half: true,
					help: "Orders delivered in this state get CGST + SGST; other states get IGST."
				},
				{
					name: "gstStateCode",
					label: "GST state code",
					type: "text",
					half: true
				},
				{
					name: "tan",
					label: "TAN",
					type: "text",
					half: true
				},
				{
					name: "udyam",
					label: "Udyam registration no.",
					type: "text",
					half: true
				},
				{
					name: "msmeCategory",
					label: "MSME category",
					type: "text",
					half: true
				},
				{
					name: "dpiit",
					label: "DPIIT (Startup India) certificate no.",
					type: "text",
					half: true
				},
				{
					name: "registeredOffice",
					label: "Registered office address",
					type: "textarea",
					rows: 2,
					required: true
				},
				{
					name: "accountsEmail",
					label: "Accounts / billing email",
					type: "text",
					half: true
				},
				{
					name: "billingPhone",
					label: "Billing phone",
					type: "text",
					half: true
				},
				{
					name: "website",
					label: "Website",
					type: "text",
					half: true
				},
				{
					name: "invoicePrefix",
					label: "Website invoice prefix",
					type: "text",
					half: true,
					help: "Invoice numbers become PREFIX/26-27/1, 2, 3… and restart each financial year. Keep it different from your billing software series (e.g. VPL/SL)."
				},
				{
					name: "defaultHsn",
					label: "Default HSN code",
					type: "text",
					half: true,
					help: "Used for products without their own HSN."
				},
				{
					name: "defaultGstPercent",
					label: "Default GST %",
					type: "number",
					half: true
				},
				{
					name: "invoiceTerms",
					label: "Invoice terms & conditions",
					type: "list",
					help: "One term per line."
				},
				{
					name: "declaration",
					label: "Invoice declaration",
					type: "textarea",
					rows: 2
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
					name: "redeemAtCheckout",
					label: "Let customers use coins at website checkout",
					type: "bool",
					half: true,
					help: "Shows “Use your coins” on the checkout page, like Flipkart SuperCoins."
				},
				{
					name: "maxRedeemPercent",
					label: "Max % of a bill payable with coins",
					type: "number",
					half: true,
					help: "e.g. 20 = coins can pay up to 20% of the items’ price. 0 = no % limit."
				},
				{
					name: "maxCoinsPerOrder",
					label: "Max coins per order",
					type: "number",
					half: true,
					help: "0 = no cap."
				},
				{
					name: "minOrderForCoins",
					label: "Minimum order to use coins (₹)",
					type: "number",
					half: true,
					help: "0 = any order."
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
				},
				{
					name: "heroVideo",
					label: "Hero video – 1080p MP4 path",
					type: "text",
					help: "e.g. /video/hero-1080.mp4. Plays silently over the hero photo. Leave empty to show the photo only."
				},
				{
					name: "heroVideo4k",
					label: "Hero video – 4K MP4 path",
					type: "text",
					half: true,
					help: "e.g. /video/hero-2160.mp4. Sent only to large screens."
				},
				{
					name: "heroVideoMobile",
					label: "Hero video – mobile MP4 path",
					type: "text",
					half: true,
					help: "e.g. /video/hero-720.mp4. Sent to phones."
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
		},
		{
			key: "payments",
			title: "Payments, Cart & Checkout",
			intro: "Choose the payment gateway and enter its keys to accept UPI, cards, NetBanking and wallets. Until the selected gateway has keys, the store offers Cash on Delivery only — orders are never marked paid without a real payment. For Razorpay, also add a webhook in the Razorpay Dashboard pointing to /api/webhooks/razorpay (events: payment.captured, order.paid) and paste its secret below.",
			fields: [
				{
					name: "enabled",
					label: "Enable checkout on website",
					type: "bool",
					half: true
				},
				{
					name: "gateway",
					label: "Payment gateway",
					type: "select",
					half: true,
					options: [
						{
							value: "razorpay",
							label: "Razorpay"
						},
						{
							value: "cashfree",
							label: "Cashfree"
						},
						{
							value: "offline",
							label: "Cash on Delivery (COD) only"
						}
					]
				},
				{
					name: "razorpayKeyId",
					label: "Razorpay Key ID",
					type: "text",
					half: true,
					help: "Razorpay Dashboard → Account & Settings → API Keys. Starts with rzp_test_ (test mode) or rzp_live_."
				},
				{
					name: "razorpayKeySecret",
					label: "Razorpay Key Secret",
					type: "text",
					half: true,
					help: "Shown once when the key is generated. Can instead be set as RAZORPAY_KEY_SECRET on the server."
				},
				{
					name: "razorpayWebhookSecret",
					label: "Razorpay Webhook Secret",
					type: "text",
					half: true,
					help: "The secret you typed when creating the webhook. Confirms payments even if the customer closes the browser."
				},
				{
					name: "cashfreeEnv",
					label: "Cashfree environment",
					type: "select",
					half: true,
					options: [{
						value: "TEST",
						label: "Sandbox / Test Mode (sandbox.cashfree.com)"
					}, {
						value: "PROD",
						label: "Production / Live Mode (api.cashfree.com)"
					}]
				},
				{
					name: "cashfreeAppId",
					label: "Cashfree App / Client ID",
					type: "text",
					half: true,
					help: "Obtain from Cashfree Merchant Dashboard → Developers → API Keys."
				},
				{
					name: "cashfreeSecretKey",
					label: "Cashfree Secret Key",
					type: "text",
					half: true,
					help: "Secret Key from Cashfree API Keys. Stored securely."
				},
				{
					name: "enableCod",
					label: "Enable Cash on Delivery (Pay at Doorstep)",
					type: "bool",
					half: true
				},
				{
					name: "enableOnline",
					label: "Enable Online UPI / Cards / NetBanking",
					type: "bool",
					half: true
				},
				{
					name: "deliveryFee",
					label: "Standard delivery fee (₹)",
					type: "number",
					half: true,
					help: "Set 0 for Free Delivery."
				},
				{
					name: "minFreeDelivery",
					label: "Free delivery order minimum (₹)",
					type: "number",
					half: true
				}
			]
		},
		{
			key: "signin",
			title: "Email, Google Sign-in & OTP",
			intro: "Outgoing email sends password-reset links, order OTP codes and vendor order emails. For Gmail / Google Workspace use host smtp.gmail.com, port 587, your full address as user, and an App Password (Google Account → Security → App passwords). Use “Send test email” below after saving.",
			fields: [
				{
					name: "smtpHost",
					label: "SMTP host",
					type: "text",
					half: true,
					help: "e.g. smtp.gmail.com or smtp.hostinger.com"
				},
				{
					name: "smtpPort",
					label: "SMTP port",
					type: "number",
					half: true,
					help: "587 (STARTTLS) or 465 (SSL)."
				},
				{
					name: "smtpUser",
					label: "SMTP username",
					type: "text",
					half: true,
					help: "Usually the full email address."
				},
				{
					name: "smtpPass",
					label: "SMTP password / app password",
					type: "text",
					half: true
				},
				{
					name: "smtpFrom",
					label: "Send emails as",
					type: "text",
					half: true,
					help: "e.g. Virnobyte <info@virnobyte.com>. Blank = the SMTP username."
				},
				{
					name: "smtpSecure",
					label: "Use SSL (port 465)",
					type: "bool",
					half: true
				},
				{
					name: "googleClientId",
					label: "Google OAuth Client ID",
					type: "text",
					half: true,
					help: "Google Cloud Console → APIs & Services → Credentials → OAuth client ID (Web application). Blank hides the Google button."
				},
				{
					name: "googleClientSecret",
					label: "Google OAuth Client Secret",
					type: "text",
					half: true
				},
				{
					name: "codOtp",
					label: "Ask for an OTP before confirming Cash on Delivery orders",
					type: "bool",
					half: true
				},
				{
					name: "textbeeApiKey",
					label: "textbee.dev API key (optional, free SMS OTP)",
					type: "text",
					half: true,
					help: "Free: install the textbee app on a spare Android phone with a SIM, sign in at textbee.dev, and copy the API key. Blank = OTP by email only."
				},
				{
					name: "textbeeDeviceId",
					label: "textbee.dev device ID",
					type: "text",
					half: true,
					help: "textbee.dev dashboard → Devices. SMS go out from that phone’s SIM (free plan ≈ 50 SMS/day; email is always sent too)."
				}
			]
		},
		{
			key: "blog",
			title: "Blog Page Header & Image Sizes",
			intro: "Customize the main blog listing page (/blog), including the page title, intro text, and card image display sizes.",
			fields: [
				{
					name: "eyebrow",
					label: "Eyebrow tagline",
					type: "text",
					half: true
				},
				{
					name: "title",
					label: "Blog main title",
					type: "text",
					required: true,
					half: true
				},
				{
					name: "lede",
					label: "Introductory description",
					type: "textarea",
					rows: 2,
					required: true
				},
				{
					name: "leadImageSize",
					label: "Lead article image size",
					type: "select",
					half: true,
					options: [
						{
							value: "16/9",
							label: "Standard Cinematic (16:9)"
						},
						{
							value: "21/9",
							label: "Wide Banner (21:9)"
						},
						{
							value: "4/3",
							label: "Classic Photo (4:3)"
						},
						{
							value: "natural",
							label: "Natural Height (No crop)"
						}
					]
				},
				{
					name: "gridImageSize",
					label: "Grid articles image size",
					type: "select",
					half: true,
					options: [
						{
							value: "16/10",
							label: "Editorial (16:10)"
						},
						{
							value: "16/9",
							label: "Standard Cinematic (16:9)"
						},
						{
							value: "4/3",
							label: "Classic Photo (4:3)"
						},
						{
							value: "1/1",
							label: "Square (1:1)"
						},
						{
							value: "natural",
							label: "Natural Height (No crop)"
						}
					]
				}
			]
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
		} else if (form.get("_action") === "test_email") {
			const to = String(form.get("test_to") ?? "").trim() || currentUser.email;
			if (!isMailConfigured()) error = "Email is not set up yet: fill in the SMTP host, username and password above and save first.";
			else {
				const res = await sendEmail({
					to,
					subject: "Virnobyte test email",
					text: "This is a test email from your Virnobyte website. Email sending works.",
					html: "<p>This is a test email from your Virnobyte website. <b>Email sending works.</b></p>"
				});
				if (res.success) flash = `Test email sent to ${to}. Check the inbox (and spam folder).`;
				else error = `The mail server refused the email: ${res.error}. Check the host, port, username and app password.`;
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
				if (sec.key === "company") {
					for (const k of [
						"gstin",
						"pan",
						"cin",
						"tan"
					]) value[k] = String(value[k] ?? "").toUpperCase().replace(/\s+/g, "");
					if (value.gstin && !/^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(value.gstin)) errors["company.gstin"] = "Enter a valid 15-character GSTIN, e.g. 27AAMCV1703G1ZD.";
					value.invoicePrefix = String(value.invoicePrefix || "VPL/WEB").replace(/\s+/g, "").replace(/\/+$/, "");
					value.defaultGstPercent = Math.min(28, value.defaultGstPercent || 18);
					if (Object.keys(errors).length) error = "Some fields need attention.";
				}
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
	const googleRedirect = `${siteOrigin(Astro)}/account/google/callback`;
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
	})}`)} </div> <button class="btn" type="submit" style="margin-top:14px">Save ${sec.title.toLowerCase()}</button> </form> ${sec.key === "signin" && renderTemplate`<div style="margin-top:18px;padding-top:16px;border-top:1px solid var(--line);display:grid;gap:14px"> <form method="post" class="inline-form"> <input type="hidden" name="_action" value="test_email"> <div class="field"> <label for="test_to">Send a test email to</label> <input id="test_to" name="test_to" type="email"${addAttribute(currentUser.email, "value")}> </div> <button class="btn btn--ghost" type="submit">Send test email</button> </form> <p class="small muted">
Email status: <b>${isMailConfigured() ? "set up" : "not set up — password reset and OTP emails are NOT being delivered"}</b>.
<br>
Google sign-in: in your OAuth client, add this <b>Authorised redirect URI</b>: <code>${googleRedirect}</code> </p> </div>`} ${(sec.key === "coins" || sec.key === "card") && sample && renderTemplate`<div> ${renderComponent($$result, "MembershipCard", $$MembershipCard, {
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
