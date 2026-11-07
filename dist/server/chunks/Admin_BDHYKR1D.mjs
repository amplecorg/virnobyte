import { A as renderTemplate, D as renderSlot, M as renderHead, N as addAttribute, V as createAstro, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as renderScript, t as $$Icon } from "./Icon_Ck1f1YF9.mjs";
import { r as get } from "./db_BuYoLur0.mjs";
//#region src/layouts/Admin.astro
createAstro("https://virnobyte.com");
var $$Admin = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Admin;
	const { title, active } = Astro.props;
	const user = Astro.locals.user;
	const newEnq = get("SELECT COUNT(*) AS n FROM enquiries WHERE status = 'new'").n;
	const pending = get("SELECT COUNT(*) AS n FROM memberships WHERE status = 'pending'").n;
	const pcReq = get("SELECT COUNT(*) AS n FROM pc_builds WHERE status IN ('quote','ordered')").n;
	const newOrders = get("SELECT COUNT(*) AS n FROM orders WHERE order_status = 'CONFIRMED'")?.n ?? 0;
	const NAV = [
		{
			group: "Overview",
			items: [{
				href: "/admin",
				label: "Dashboard",
				key: "dashboard",
				icon: "dashboard"
			}]
		},
		{
			group: "Membership",
			items: [
				{
					href: "/admin/members",
					label: "Members & coins",
					key: "members",
					icon: "users",
					badge: pending
				},
				{
					href: "/admin/r/plans",
					label: "Plans & card design",
					key: "plans",
					icon: "credit-card"
				},
				{
					href: "/admin/settings#coins",
					label: "Coin program",
					key: "coins",
					icon: "coin"
				}
			]
		},
		{
			group: "E-Commerce & Orders",
			items: [
				{
					href: "/admin/r/orders",
					label: "Customer Orders",
					key: "orders",
					icon: "receipt",
					badge: newOrders
				},
				{
					href: "/admin/r/products",
					label: "Products Catalog",
					key: "products",
					icon: "shield"
				},
				{
					href: "/admin/settings#payments",
					label: "Cashfree & Checkout",
					key: "payments",
					icon: "credit-card"
				}
			]
		},
		{
			group: "Leads",
			items: [{
				href: "/admin/r/enquiries",
				label: "Enquiries",
				key: "enquiries",
				icon: "mail",
				badge: newEnq
			}, {
				href: "/admin/r/pc_builds",
				label: "PC build requests",
				key: "pc_builds",
				icon: "wrench",
				badge: pcReq
			}]
		},
		{
			group: "PC builder",
			items: [
				{
					href: "/admin/r/pc_parts",
					label: "Parts & prices",
					key: "pc_parts",
					icon: "cpu"
				},
				{
					href: "/admin/r/pc_presets",
					label: "Preset builds",
					key: "pc_presets",
					icon: "shield"
				},
				{
					href: "/admin/settings#pcbuilder",
					label: "GST & fees",
					key: "pcsettings",
					icon: "receipt"
				}
			]
		},
		{
			group: "Content",
			items: [
				{
					href: "/admin/r/services",
					label: "Services",
					key: "services",
					icon: "wrench"
				},
				{
					href: "/admin/r/posts",
					label: "Blog",
					key: "posts",
					icon: "file-text"
				},
				{
					href: "/admin/r/faqs",
					label: "FAQs",
					key: "faqs",
					icon: "message"
				},
				{
					href: "/admin/r/products",
					label: "Products",
					key: "products",
					icon: "shield"
				},
				{
					href: "/admin/r/projects",
					label: "Portfolio",
					key: "projects",
					icon: "briefcase"
				},
				{
					href: "/admin/r/gallery",
					label: "Gallery",
					key: "gallery",
					icon: "image"
				},
				{
					href: "/admin/r/jobs",
					label: "Careers",
					key: "jobs",
					icon: "clock"
				},
				{
					href: "/admin/r/testimonials",
					label: "Testimonials",
					key: "testimonials",
					icon: "message"
				},
				{
					href: "/admin/r/pages",
					label: "Legal & profile pages",
					key: "pages",
					icon: "file-text"
				}
			]
		},
		{
			group: "Site",
			items: [{
				href: "/admin/settings",
				label: "Business, home & SEO",
				key: "settings",
				icon: "settings"
			}]
		}
	];
	return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>${title} · Virnobyte admin</title><link rel="icon" href="/favicon.ico"><link rel="preload" href="/fonts/AmazonEmber_W_Rg.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/fonts/AmazonEmber_W_Bd.woff2" as="font" type="font/woff2" crossorigin><script>
      if (typeof localStorage !== 'undefined' && localStorage.getItem('vb_sidebar_collapsed') === 'true' && window.matchMedia('(min-width: 900px)').matches) {
        document.documentElement.classList.add('sidebar-collapsed');
      }
    <\/script>${renderHead($$result)}</head> <body class="admin"> <a class="skip-link" href="#content">Skip to content</a> <div class="shell" id="admin-shell"> <aside class="side" id="admin-side"> <div class="side-head"> <a class="logo" href="/admin" title="Virnobyte Admin"> <img src="/virnobyte-logo.png" alt="" width="32" height="25"> <span class="logo-text">Virnobyte <span class="logo-badge">admin</span></span> </a> <button type="button" class="side-toggle" id="sidebar-toggle" aria-label="Toggle sidebar" title="Minimize sidebar (Ctrl+B)"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "panel-close",
		"size": 18,
		"class": "icon-collapse"
	})} ${renderComponent($$result, "Icon", $$Icon, {
		"name": "panel-open",
		"size": 18,
		"class": "icon-expand"
	})} </button> </div> <details class="navwrap" open> <summary>Menu</summary> <nav aria-label="Admin"> ${NAV.map((g) => renderTemplate`<div class="group"> <p>${g.group}</p> ${g.items.map((i) => renderTemplate`<a${addAttribute(i.href, "href")}${addAttribute(active === i.key ? "page" : void 0, "aria-current")}${addAttribute(i.label, "title")}> <span class="nav-icon">${renderComponent($$result, "Icon", $$Icon, {
		"name": i.icon,
		"size": 18
	})}</span> <span class="nav-label">${i.label}</span> ${i.badge ? renderTemplate`<b class="badge">${i.badge}</b>` : null} </a>`)} </div>`)} </nav> </details> <div class="me"> <span class="small me-email">${user.email}</span> <div class="me-actions"> <a href="/" target="_blank" rel="noopener" class="small" title="View site"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "external",
		"size": 16
	})} <span>View site</span> </a> <form method="post" action="/account/logout"> <button type="submit" class="linkish small" title="Sign out"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "logout",
		"size": 16
	})} <span>Sign out</span> </button> </form> </div> </div> </aside> <main id="content" class="content"> <div class="mobile-bar"> <button type="button" class="mobile-toggle" id="mobile-sidebar-toggle" aria-label="Toggle menu"> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "menu",
		"size": 18
	})} <span>Menu</span> </button> <span class="mobile-title">${title}</span> </div> ${renderSlot($$result, $$slots["default"])} </main> </div>${renderScript($$result, "C:/Programming section/virnobyte/src/layouts/Admin.astro?astro&type=script&index=0&lang.ts")}</body> </html>`;
}, "C:/Programming section/virnobyte/src/layouts/Admin.astro", void 0);
//#endregion
export { $$Admin as t };
