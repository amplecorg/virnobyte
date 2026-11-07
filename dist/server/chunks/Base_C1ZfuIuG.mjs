import { A as renderTemplate, D as renderSlot, M as renderHead, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent, z as unescapeHTML } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as renderScript, t as $$Icon } from "./Icon_CAVYTX4O.mjs";
import { l as userFromCookies } from "./auth_D-dTm5Q5.mjs";
import { n as getSettings, t as contactInfo } from "./settings_AhSsv2yB.mjs";
import { w as services } from "./data_CkdtwXhb.mjs";
//#region node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-opsz-normal.woff2?url
var bricolage_grotesque_latin_opsz_normal_default = "/_astro/bricolage-grotesque-latin-opsz-normal.Cre6nC2_.woff2";
//#endregion
//#region src/components/SEO.astro
createAstro("https://virnobyte.com");
var $$SEO = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$SEO;
	const { title, description, canonical, image = "/og/default.jpg", imageAlt, type = "website", noindex = false, jsonLd, publishedTime, modifiedTime } = Astro.props;
	const settings = getSettings();
	const site = Astro.site ?? new URL(Astro.url.origin);
	const path = (canonical ?? Astro.url.pathname).toLowerCase().replace(/\/+$/, "") || "/";
	const canonicalUrl = /^https?:/.test(path) ? path : new URL(path, site).href;
	const imageUrl = /^https?:/.test(image) ? image : new URL(image, site).href;
	const graph = jsonLd ? Array.isArray(jsonLd) ? jsonLd : [jsonLd] : [];
	const ld = (o) => JSON.stringify(o).replace(/</g, "\\u003c");
	return renderTemplate`<title>${title}</title> <meta name="description"${addAttribute(description, "content")}> <link rel="canonical"${addAttribute(canonicalUrl, "href")}> <meta name="robots"${addAttribute(noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1", "content")}> <meta property="og:type"${addAttribute(type, "content")}> <meta property="og:site_name"${addAttribute(settings.business.name, "content")}> <meta property="og:locale" content="en_IN"> <meta property="og:title"${addAttribute(title, "content")}> <meta property="og:description"${addAttribute(description, "content")}> <meta property="og:url"${addAttribute(canonicalUrl, "content")}> <meta property="og:image"${addAttribute(imageUrl, "content")}> <meta property="og:image:width" content="1200"> <meta property="og:image:height" content="630"> <meta property="og:image:alt"${addAttribute(imageAlt ?? title, "content")}> ${publishedTime && renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>`} ${modifiedTime && renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>`} <meta name="twitter:card" content="summary_large_image"> <meta name="twitter:title"${addAttribute(title, "content")}> <meta name="twitter:description"${addAttribute(description, "content")}> <meta name="twitter:image"${addAttribute(imageUrl, "content")}> <meta name="twitter:image:alt"${addAttribute(imageAlt ?? title, "content")}> ${settings.seo.googleVerification && renderTemplate`<meta name="google-site-verification"${addAttribute(settings.seo.googleVerification, "content")}>`} ${settings.seo.bingVerification && renderTemplate`<meta name="msvalidate.01"${addAttribute(settings.seo.bingVerification, "content")}>`} ${graph.map((node) => renderTemplate`<script type="application/ld+json">${unescapeHTML(ld(node))}<\/script>`)}`;
}, "C:/Programming section/virnobyte/src/components/SEO.astro", void 0);
//#endregion
//#region src/components/Header.astro
createAstro("https://virnobyte.com");
var $$Header = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Header;
	const settings = getSettings();
	const c = contactInfo(settings);
	const svc = services();
	const user = userFromCookies(Astro.cookies);
	const path = Astro.url.pathname;
	const is = (p) => p === "/" ? path === "/" : path === p || path.startsWith(p + "/");
	const NAV = [
		{
			href: "/custom-pc-builder",
			label: "PC Builder",
			pill: "3D"
		},
		{
			href: "/membership",
			label: "Membership"
		},
		{
			href: "/products",
			label: "Products"
		},
		{
			href: "/portfolio",
			label: "Portfolio"
		},
		{
			href: "/about",
			label: "About"
		},
		{
			href: "/blog",
			label: "Blog"
		},
		{
			href: "/contact",
			label: "Contact"
		}
	];
	const groups = [...new Set(svc.map((s) => s.group_name))];
	return renderTemplate`${settings.announcement.text && renderTemplate`${maybeRenderHead($$result)}<div class="announce" data-astro-cid-nen7h5rs> <div class="wrap announce-inner" data-astro-cid-nen7h5rs> ${settings.announcement.href ? renderTemplate`<a${addAttribute(settings.announcement.href, "href")} data-astro-cid-nen7h5rs>${settings.announcement.text}</a>` : renderTemplate`<span data-astro-cid-nen7h5rs>${settings.announcement.text}</span>`} </div> </div>`} <header class="site-header" data-header data-astro-cid-nen7h5rs> <div class="wrap bar" data-astro-cid-nen7h5rs> <a href="/" class="brand"${addAttribute(`${c.name} home`, "aria-label")} data-astro-cid-nen7h5rs> <img src="/virnobyte-logo.png" alt="" width="44" height="34" class="brand-logo" data-astro-cid-nen7h5rs> <span class="brand-text" data-astro-cid-nen7h5rs>${c.name}</span> </a> <!-- Desktop Navigation (Screen width >= 1200px) --> <nav class="nav" aria-label="Main Navigation" data-astro-cid-nen7h5rs> <details class="services-menu" data-dropdown data-astro-cid-nen7h5rs> <summary${addAttribute(is("/services") ? "page" : void 0, "aria-current")} data-astro-cid-nen7h5rs> <span data-astro-cid-nen7h5rs>Services</span> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "chevron",
		"size": 16,
		"data-astro-cid-nen7h5rs": true
	})} </summary> <div class="mega" data-astro-cid-nen7h5rs> <div class="mega-grid" data-astro-cid-nen7h5rs> ${groups.map((g) => renderTemplate`<div class="mega-col" data-astro-cid-nen7h5rs> <p class="mega-group" data-astro-cid-nen7h5rs>${g}</p> <ul data-astro-cid-nen7h5rs> ${svc.filter((s) => s.group_name === g).map((s) => renderTemplate`<li data-astro-cid-nen7h5rs> <a${addAttribute(`/services/${s.slug}`, "href")} data-astro-cid-nen7h5rs>${s.name}</a> </li>`)} </ul> </div>`)} </div> </div> </details> ${NAV.map((n) => renderTemplate`<a${addAttribute(n.href, "href")}${addAttribute(is(n.href) ? "page" : void 0, "aria-current")} class="nav-link" data-astro-cid-nen7h5rs> <span data-astro-cid-nen7h5rs>${n.label}</span> ${n.pill && renderTemplate`<span class="nav-pill" data-astro-cid-nen7h5rs>${n.pill}</span>`} </a>`)} </nav> <div class="actions" data-astro-cid-nen7h5rs> <a class="phone"${addAttribute(c.tel, "href")} data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "phone",
		"size": 18,
		"data-astro-cid-nen7h5rs": true
	})} <span data-astro-cid-nen7h5rs>${c.phone}</span> </a> <a class="icon-btn account-btn"${addAttribute(user ? user.role === "admin" ? "/admin" : "/account" : "/account/login", "href")}${addAttribute(user ? "Your account" : "Sign in", "aria-label")}${addAttribute(user ? user.role === "admin" ? "Admin Panel" : "My Account" : "Sign In", "title")} data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "user",
		"size": 20,
		"data-astro-cid-nen7h5rs": true
	})} </a> <a class="btn btn--sm book" href="/contact#book" data-astro-cid-nen7h5rs>Book a Service</a> <!-- Responsive Mobile/Tablet Hamburger Trigger (< 1200px) --> <button type="button" class="mobile-toggle" id="mobile-menu-toggle" aria-expanded="false" aria-controls="mobile-drawer" aria-label="Toggle navigation menu" data-astro-cid-nen7h5rs> <span class="icon-menu-open" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "menu",
		"size": 24,
		"data-astro-cid-nen7h5rs": true
	})} </span> <span class="icon-menu-close" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "close",
		"size": 24,
		"data-astro-cid-nen7h5rs": true
	})} </span> </button> </div> </div> </header> <!-- ── Responsive Mobile & Tablet Off-Canvas Drawer ───────────── --> <div class="mobile-drawer" id="mobile-drawer" aria-hidden="true" data-astro-cid-nen7h5rs> <div class="drawer-backdrop" id="drawer-backdrop" data-astro-cid-nen7h5rs></div> <aside class="drawer-panel" role="dialog" aria-modal="true" aria-label="Mobile Navigation" data-astro-cid-nen7h5rs> <div class="drawer-top" data-astro-cid-nen7h5rs> <a href="/" class="drawer-brand" data-astro-cid-nen7h5rs> <img src="/virnobyte-logo.png" alt="" width="36" height="28" data-astro-cid-nen7h5rs> <span data-astro-cid-nen7h5rs>${c.name}</span> </a> <button type="button" class="drawer-close-btn" id="mobile-drawer-close" aria-label="Close menu" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "close",
		"size": 22,
		"data-astro-cid-nen7h5rs": true
	})} </button> </div> <div class="drawer-cta-band" data-astro-cid-nen7h5rs> <a class="btn btn--block drawer-book-btn" href="/contact#book" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "calendar",
		"size": 18,
		"data-astro-cid-nen7h5rs": true
	})} <span data-astro-cid-nen7h5rs>Book a Service Online</span> </a> <div class="drawer-quick-contacts" data-astro-cid-nen7h5rs> <a class="quick-contact-btn"${addAttribute(c.tel, "href")} data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "phone",
		"size": 16,
		"data-astro-cid-nen7h5rs": true
	})} <span data-astro-cid-nen7h5rs>Call ${c.phone}</span> </a> <a class="quick-contact-btn quick-contact-btn--wa"${addAttribute(c.whatsappUrl(), "href")} target="_blank" rel="noopener" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "whatsapp",
		"size": 16,
		"data-astro-cid-nen7h5rs": true
	})} <span data-astro-cid-nen7h5rs>WhatsApp</span> </a> </div> </div> <div class="drawer-scroll-area" data-astro-cid-nen7h5rs> <nav class="drawer-nav" aria-label="Mobile Navigation Links" data-astro-cid-nen7h5rs> <!-- Expandable Accordion for Services --><details class="drawer-accordion" data-astro-cid-nen7h5rs> <summary class="drawer-nav-link drawer-nav-link--summary" data-astro-cid-nen7h5rs> <span class="drawer-link-title" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "wrench",
		"size": 20,
		"class": "drawer-icon",
		"data-astro-cid-nen7h5rs": true
	})} <span data-astro-cid-nen7h5rs>IT Services & Repairs</span> </span> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "chevron",
		"size": 16,
		"class": "drawer-chevron",
		"data-astro-cid-nen7h5rs": true
	})} </summary> <div class="drawer-accordion-content" data-astro-cid-nen7h5rs> <a href="/services" class="drawer-sub-all" data-astro-cid-nen7h5rs>View All ${svc.length} IT Services →</a> <ul class="drawer-sub-grid" data-astro-cid-nen7h5rs> ${svc.map((s) => renderTemplate`<li data-astro-cid-nen7h5rs> <a${addAttribute(`/services/${s.slug}`, "href")} data-astro-cid-nen7h5rs>${s.name}</a> </li>`)} </ul> </div> </details> <a href="/" class="drawer-nav-link"${addAttribute(is("/") ? "page" : void 0, "aria-current")} data-astro-cid-nen7h5rs> <span class="drawer-link-title" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "home",
		"size": 20,
		"class": "drawer-icon",
		"data-astro-cid-nen7h5rs": true
	})} <span data-astro-cid-nen7h5rs>Home</span> </span> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 16,
		"class": "drawer-arrow",
		"data-astro-cid-nen7h5rs": true
	})} </a> <a href="/custom-pc-builder" class="drawer-nav-link"${addAttribute(is("/custom-pc-builder") ? "page" : void 0, "aria-current")} data-astro-cid-nen7h5rs> <span class="drawer-link-title" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "external",
		"size": 20,
		"class": "drawer-icon",
		"data-astro-cid-nen7h5rs": true
	})} <span data-astro-cid-nen7h5rs>Custom PC Builder</span> <span class="drawer-pill drawer-pill--3d" data-astro-cid-nen7h5rs>3D</span> </span> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 16,
		"class": "drawer-arrow",
		"data-astro-cid-nen7h5rs": true
	})} </a> <a href="/membership" class="drawer-nav-link"${addAttribute(is("/membership") ? "page" : void 0, "aria-current")} data-astro-cid-nen7h5rs> <span class="drawer-link-title" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "coin",
		"size": 20,
		"class": "drawer-icon",
		"data-astro-cid-nen7h5rs": true
	})} <span data-astro-cid-nen7h5rs>Membership Card & Coins</span> </span> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 16,
		"class": "drawer-arrow",
		"data-astro-cid-nen7h5rs": true
	})} </a> <a href="/products" class="drawer-nav-link"${addAttribute(is("/products") ? "page" : void 0, "aria-current")} data-astro-cid-nen7h5rs> <span class="drawer-link-title" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "receipt",
		"size": 20,
		"class": "drawer-icon",
		"data-astro-cid-nen7h5rs": true
	})} <span data-astro-cid-nen7h5rs>Products & Hardware</span> </span> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 16,
		"class": "drawer-arrow",
		"data-astro-cid-nen7h5rs": true
	})} </a> <a href="/portfolio" class="drawer-nav-link"${addAttribute(is("/portfolio") ? "page" : void 0, "aria-current")} data-astro-cid-nen7h5rs> <span class="drawer-link-title" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "directions",
		"size": 20,
		"class": "drawer-icon",
		"data-astro-cid-nen7h5rs": true
	})} <span data-astro-cid-nen7h5rs>Our Portfolio</span> </span> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 16,
		"class": "drawer-arrow",
		"data-astro-cid-nen7h5rs": true
	})} </a> <a href="/about" class="drawer-nav-link"${addAttribute(is("/about") ? "page" : void 0, "aria-current")} data-astro-cid-nen7h5rs> <span class="drawer-link-title" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "user",
		"size": 20,
		"class": "drawer-icon",
		"data-astro-cid-nen7h5rs": true
	})} <span data-astro-cid-nen7h5rs>About Virnobyte</span> </span> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 16,
		"class": "drawer-arrow",
		"data-astro-cid-nen7h5rs": true
	})} </a> <a href="/about#certificates" class="drawer-nav-link drawer-nav-link--highlight" data-astro-cid-nen7h5rs> <span class="drawer-link-title" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "shield",
		"size": 20,
		"class": "drawer-icon",
		"data-astro-cid-nen7h5rs": true
	})} <span data-astro-cid-nen7h5rs>Our Certificates</span> <span class="drawer-pill drawer-pill--cert" data-astro-cid-nen7h5rs>Verified</span> </span> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 16,
		"class": "drawer-arrow",
		"data-astro-cid-nen7h5rs": true
	})} </a> <a href="/blog" class="drawer-nav-link"${addAttribute(is("/blog") ? "page" : void 0, "aria-current")} data-astro-cid-nen7h5rs> <span class="drawer-link-title" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "mail",
		"size": 20,
		"class": "drawer-icon",
		"data-astro-cid-nen7h5rs": true
	})} <span data-astro-cid-nen7h5rs>Blog & Workshop Guides</span> </span> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 16,
		"class": "drawer-arrow",
		"data-astro-cid-nen7h5rs": true
	})} </a> <a href="/contact" class="drawer-nav-link"${addAttribute(is("/contact") ? "page" : void 0, "aria-current")} data-astro-cid-nen7h5rs> <span class="drawer-link-title" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "pin",
		"size": 20,
		"class": "drawer-icon",
		"data-astro-cid-nen7h5rs": true
	})} <span data-astro-cid-nen7h5rs>Contact & Workshop</span> </span> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 16,
		"class": "drawer-arrow",
		"data-astro-cid-nen7h5rs": true
	})} </a> <a href="/faq" class="drawer-nav-link"${addAttribute(is("/faq") ? "page" : void 0, "aria-current")} data-astro-cid-nen7h5rs> <span class="drawer-link-title" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "clock",
		"size": 20,
		"class": "drawer-icon",
		"data-astro-cid-nen7h5rs": true
	})} <span data-astro-cid-nen7h5rs>FAQ & Help</span> </span> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 16,
		"class": "drawer-arrow",
		"data-astro-cid-nen7h5rs": true
	})} </a> <a href="/careers" class="drawer-nav-link"${addAttribute(is("/careers") ? "page" : void 0, "aria-current")} data-astro-cid-nen7h5rs> <span class="drawer-link-title" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "plus",
		"size": 20,
		"class": "drawer-icon",
		"data-astro-cid-nen7h5rs": true
	})} <span data-astro-cid-nen7h5rs>Careers at Virnobyte</span> </span> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 16,
		"class": "drawer-arrow",
		"data-astro-cid-nen7h5rs": true
	})} </a> </nav> </div> <div class="drawer-bottom" data-astro-cid-nen7h5rs> <a class="drawer-user-card"${addAttribute(user ? user.role === "admin" ? "/admin" : "/account" : "/account/login", "href")} data-astro-cid-nen7h5rs> <div class="drawer-user-icon" data-astro-cid-nen7h5rs> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "user",
		"size": 20,
		"data-astro-cid-nen7h5rs": true
	})} </div> <div class="drawer-user-info" data-astro-cid-nen7h5rs> <span class="drawer-user-name" data-astro-cid-nen7h5rs>${user ? user.name : "Sign In / Portal"}</span> <span class="drawer-user-desc" data-astro-cid-nen7h5rs>${user ? user.role === "admin" ? "Open Admin Control" : "Membership Account" : "Access your coins and cards"}</span> </div> ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 16,
		"data-astro-cid-nen7h5rs": true
	})} </a> <p class="drawer-legal" data-astro-cid-nen7h5rs>Sadichha Complex, Jadhav Wadi, Chikhali, Pune</p> </div> </aside> </div> <script>
  (() => {
    const header = document.querySelector('[data-header]');
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    const closeBtn = document.getElementById('mobile-drawer-close');

    function openMenu() {
      if (!drawer) return;
      drawer.classList.add('is-active');
      header?.classList.add('is-menu-open');
      toggleBtn?.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      if (!drawer) return;
      drawer.classList.remove('is-active');
      header?.classList.remove('is-menu-open');
      toggleBtn?.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    toggleBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      if (drawer?.classList.contains('is-active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    closeBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });

    backdrop?.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });

    // Close when clicking ANY navigation link inside the drawer
    drawer?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer?.classList.contains('is-active')) {
        closeMenu();
        toggleBtn?.focus();
      }
    });

    // Close automatically when resized to desktop (>= 1200px)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1200 && drawer?.classList.contains('is-active')) {
        closeMenu();
      }
    });
  })();
<\/script>`;
}, "C:/Programming section/virnobyte/src/components/Header.astro", void 0);
//#endregion
//#region src/components/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const settings = getSettings();
	const c = contactInfo(settings);
	const footerServices = services().filter((s) => s.footer);
	const social = Object.entries(settings.business.social).filter(([, v]) => v);
	const SOCIAL_LABEL = {
		facebook: "Facebook",
		x: "X",
		linkedin: "LinkedIn",
		instagram: "Instagram"
	};
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	return renderTemplate`${maybeRenderHead($$result)}<footer class="site-footer" data-astro-cid-jo6i4kqk> <div class="wrap" data-astro-cid-jo6i4kqk> <div class="top" data-astro-cid-jo6i4kqk> <div class="nap" data-astro-cid-jo6i4kqk> <a href="/" class="brand" data-astro-cid-jo6i4kqk> <img src="/virnobyte-logo.png" alt="" width="40" height="31" loading="lazy" data-astro-cid-jo6i4kqk> <span data-astro-cid-jo6i4kqk>${c.name}</span> </a> <p class="tag" data-astro-cid-jo6i4kqk>Computer repair, CCTV, networking and IT support for homes and businesses in Chikhali, Pimpri-Chinchwad and Pune.</p> <address data-astro-cid-jo6i4kqk> ${c.street},<br data-astro-cid-jo6i4kqk>${c.locality}, ${c.city},<br data-astro-cid-jo6i4kqk>${c.region} – ${c.postalCode}, ${c.country} </address> <ul class="contact" data-astro-cid-jo6i4kqk> <li data-astro-cid-jo6i4kqk>${renderComponent($$result, "Icon", $$Icon, {
		"name": "phone",
		"size": 18,
		"data-astro-cid-jo6i4kqk": true
	})}<a${addAttribute(c.tel, "href")} data-astro-cid-jo6i4kqk>${c.phone}</a></li> <li data-astro-cid-jo6i4kqk>${renderComponent($$result, "Icon", $$Icon, {
		"name": "whatsapp",
		"size": 18,
		"data-astro-cid-jo6i4kqk": true
	})}<a${addAttribute(c.whatsappUrl(), "href")} rel="noopener" target="_blank" data-astro-cid-jo6i4kqk>WhatsApp ${c.whatsapp}</a></li> <li data-astro-cid-jo6i4kqk>${renderComponent($$result, "Icon", $$Icon, {
		"name": "mail",
		"size": 18,
		"data-astro-cid-jo6i4kqk": true
	})}<a${addAttribute(c.mailto, "href")} data-astro-cid-jo6i4kqk>${c.email}</a></li> <li data-astro-cid-jo6i4kqk>${renderComponent($$result, "Icon", $$Icon, {
		"name": "directions",
		"size": 18,
		"data-astro-cid-jo6i4kqk": true
	})}<a${addAttribute(c.directions, "href")} rel="noopener" target="_blank" data-astro-cid-jo6i4kqk>Get directions</a></li> </ul> </div> <nav class="cols" aria-label="Footer" data-astro-cid-jo6i4kqk> <div data-astro-cid-jo6i4kqk> <h2 data-astro-cid-jo6i4kqk>Company</h2> <ul data-astro-cid-jo6i4kqk> <li data-astro-cid-jo6i4kqk><a href="/about" data-astro-cid-jo6i4kqk>About Virnobyte</a></li> <li data-astro-cid-jo6i4kqk><a href="/about#certificates" data-astro-cid-jo6i4kqk>Our Certificates</a></li> <li data-astro-cid-jo6i4kqk><a href="/contact" data-astro-cid-jo6i4kqk>Contact</a></li> <li data-astro-cid-jo6i4kqk><a href="/careers" data-astro-cid-jo6i4kqk>Careers</a></li> <li data-astro-cid-jo6i4kqk><a href="/company-profile" data-astro-cid-jo6i4kqk>Company Profile</a></li> <li data-astro-cid-jo6i4kqk><a href="/membership" data-astro-cid-jo6i4kqk>Membership card</a></li> <li data-astro-cid-jo6i4kqk><a href="/custom-pc-builder" data-astro-cid-jo6i4kqk>Custom PC Builder</a></li> <li data-astro-cid-jo6i4kqk><a href="/faq" data-astro-cid-jo6i4kqk>FAQ</a></li> <li data-astro-cid-jo6i4kqk><a href="/blog" data-astro-cid-jo6i4kqk>Blog</a></li> </ul> </div> <div data-astro-cid-jo6i4kqk> <h2 data-astro-cid-jo6i4kqk>Services</h2> <ul data-astro-cid-jo6i4kqk> ${footerServices.map((s) => renderTemplate`<li data-astro-cid-jo6i4kqk><a${addAttribute(`/services/${s.slug}`, "href")} data-astro-cid-jo6i4kqk>${s.name}</a></li>`)} </ul> </div> <div data-astro-cid-jo6i4kqk> <h2 data-astro-cid-jo6i4kqk>Locations</h2> <ul data-astro-cid-jo6i4kqk> ${settings.business.serviceAreas.map((a) => renderTemplate`<li data-astro-cid-jo6i4kqk>${a}</li>`)} </ul> <h2 class="mt" data-astro-cid-jo6i4kqk>Legal</h2> <ul data-astro-cid-jo6i4kqk> <li data-astro-cid-jo6i4kqk><a href="/privacy-policy" data-astro-cid-jo6i4kqk>Privacy Policy</a></li> <li data-astro-cid-jo6i4kqk><a href="/terms-and-conditions" data-astro-cid-jo6i4kqk>Terms &amp; Conditions</a></li> </ul> </div> </nav> </div> <div class="bottom" data-astro-cid-jo6i4kqk> <p data-astro-cid-jo6i4kqk>© ${year} ${c.legalName.replace(/\.$/, "")}. All rights reserved.</p> ${social.length > 0 && renderTemplate`<ul class="social" data-astro-cid-jo6i4kqk> ${social.map(([k, href]) => renderTemplate`<li data-astro-cid-jo6i4kqk><a${addAttribute(href, "href")} rel="noopener me" target="_blank" data-astro-cid-jo6i4kqk>${SOCIAL_LABEL[k] ?? k}</a></li>`)} </ul>`} </div> </div> </footer> <nav class="action-bar" aria-label="Quick contact" data-astro-cid-jo6i4kqk> <a${addAttribute(c.tel, "href")} data-astro-cid-jo6i4kqk>${renderComponent($$result, "Icon", $$Icon, {
		"name": "phone",
		"size": 20,
		"data-astro-cid-jo6i4kqk": true
	})} Call</a> <a${addAttribute(c.whatsappUrl(), "href")} rel="noopener" target="_blank" data-astro-cid-jo6i4kqk>${renderComponent($$result, "Icon", $$Icon, {
		"name": "whatsapp",
		"size": 20,
		"data-astro-cid-jo6i4kqk": true
	})} WhatsApp</a> <a href="/contact#book" class="primary" data-astro-cid-jo6i4kqk>${renderComponent($$result, "Icon", $$Icon, {
		"name": "calendar",
		"size": 20,
		"data-astro-cid-jo6i4kqk": true
	})} Book</a> </nav>`;
}, "C:/Programming section/virnobyte/src/components/Footer.astro", void 0);
//#endregion
//#region src/layouts/Base.astro
createAstro("https://virnobyte.com");
var $$Base = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Base;
	const { preloadImage, ...seo } = Astro.props;
	return renderTemplate`<html lang="en-IN"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">${renderComponent($$result, "SEO", $$SEO, { ...seo })}<link rel="preload"${addAttribute(bricolage_grotesque_latin_opsz_normal_default, "href")} as="font" type="font/woff2" crossorigin>${preloadImage && renderTemplate`<link rel="preload" as="image"${addAttribute(preloadImage.srcset, "imagesrcset")}${addAttribute(preloadImage.sizes, "imagesizes")}${addAttribute(preloadImage.type, "type")} fetchpriority="high">`}<link rel="icon" href="/favicon.ico" sizes="32x32"><link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><meta name="theme-color" content="#0b1724"><meta name="format-detection" content="telephone=no"><script>document.documentElement.classList.add('js');<\/script>${renderHead($$result)}</head> <body> <a class="skip-link" href="#main">Skip to content</a> ${renderComponent($$result, "Header", $$Header, {})} <main id="main"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})}${renderScript($$result, "C:/Programming section/virnobyte/src/layouts/Base.astro?astro&type=script&index=0&lang.ts")}</body> </html>`;
}, "C:/Programming section/virnobyte/src/layouts/Base.astro", void 0);
//#endregion
export { $$Base as t };
