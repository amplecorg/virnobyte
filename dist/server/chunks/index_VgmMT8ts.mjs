import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { n as getSettings } from "./settings_DMNw6G8Y.mjs";
import { _ as posts } from "./data_Bq_0n-xJ.mjs";
import { l as readingMinutes, r as formatDate } from "./format_CFs_vaoZ.mjs";
import { a as itemList, r as breadcrumbs, t as $$Base } from "./Base_fXkZMcl0.mjs";
import { t as $$Photo } from "./Photo_DaKSvGuY.mjs";
import { t as $$PageHero } from "./PageHero_DuIY_j_o.mjs";
//#region src/pages/blog/index.astro
var blog_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const s = getSettings();
	const isAdmin = Astro.locals.user?.role === "admin";
	const list = posts();
	const crumbs = [{
		name: "Home",
		href: "/"
	}, {
		name: "Blog",
		href: "/blog"
	}];
	const [lead, ...rest] = list;
	const leadRatio = s.blog?.leadImageSize === "natural" ? "auto" : (s.blog?.leadImageSize || "16/9").replace("/", " / ");
	const leadFit = s.blog?.leadImageSize === "natural" ? "contain" : "cover";
	const gridRatio = s.blog?.gridImageSize === "natural" ? "auto" : (s.blog?.gridImageSize || "16/10").replace("/", " / ");
	const gridFit = s.blog?.gridImageSize === "natural" ? "contain" : "cover";
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": `${s.blog?.title || "IT Tips & Guides for Homes and Businesses"} | Virnobyte Blog`,
		"description": s.blog?.lede || "Practical guides on computer and laptop problems, CCTV maintenance, office networks, data recovery and IT AMC from Virnobyte's technicians in Pune.",
		"canonical": "/blog",
		"image": "/og/pages/blog.jpg",
		"jsonLd": [breadcrumbs(Astro.site, crumbs), itemList(Astro.site, "Virnobyte IT Guides and Troubleshooting Articles", list.map((p) => ({
			name: p.title,
			url: `/blog/${p.slug}`,
			description: p.description
		})))],
		"data-astro-cid-x255k2k2": true
	}, { "default": ($$result) => renderTemplate`${isAdmin && renderTemplate`${maybeRenderHead($$result)}<div class="admin-blog-toolbar" data-astro-cid-x255k2k2> <div class="wrap admin-blog-toolbar-inner" data-astro-cid-x255k2k2> <div class="admin-toolbar-status" data-astro-cid-x255k2k2> <span class="admin-chip" data-astro-cid-x255k2k2>⚡ Admin Mode</span> <span class="admin-toolbar-text" data-astro-cid-x255k2k2>You can edit this page, customize image sizes, and manage all blog content.</span> </div> <div class="admin-toolbar-actions" data-astro-cid-x255k2k2> <a href="/admin/settings#blog" class="admin-btn admin-btn-edit" data-astro-cid-x255k2k2>
✏️ Edit Page Content &amp; Image Sizes
</a> <a href="/admin/r/posts/new" class="admin-btn admin-btn-new" data-astro-cid-x255k2k2>
➕ New Post
</a> <a href="/admin/r/posts" class="admin-btn admin-btn-manage" data-astro-cid-x255k2k2>
📂 All Articles (${list.length})
</a> </div> </div> </div>`}${renderComponent($$result, "PageHero", $$PageHero, {
		"crumbs": crumbs,
		"eyebrow": s.blog?.eyebrow || "Guides",
		"title": s.blog?.title || "Practical IT advice from our workshop",
		"lede": s.blog?.lede || "What we see every week in Pimpri-Chinchwad and Pune, written up so you can fix, prevent or plan.",
		"data-astro-cid-x255k2k2": true
	})} <section class="section"${addAttribute(`--lead-aspect: ${leadRatio}; --lead-fit: ${leadFit}; --grid-aspect: ${gridRatio}; --grid-fit: ${gridFit};`, "style")} data-astro-cid-x255k2k2> <div class="wrap" data-astro-cid-x255k2k2> ${list.length === 0 && renderTemplate`<p class="lede" data-astro-cid-x255k2k2>New guides are on the way.</p>`} ${lead && renderTemplate`<div class="lead-wrapper" data-astro-cid-x255k2k2> <a${addAttribute(`/blog/${lead.slug}`, "href")} class="lead" data-reveal data-astro-cid-x255k2k2> <div class="lead-img-box" data-astro-cid-x255k2k2> ${renderComponent($$result, "Photo", $$Photo, {
		"image": lead.image,
		"alt": lead.title,
		"eager": true,
		"sizes": "(min-width: 1024px) 55vw, 100vw",
		"widths": [
			768,
			1080,
			1440,
			1920
		],
		"data-astro-cid-x255k2k2": true
	})} </div> <div class="lead-body" data-astro-cid-x255k2k2> <span class="small muted" data-astro-cid-x255k2k2>${formatDate(lead.published_at)} · ${readingMinutes(lead.body)} min read</span> <h2 data-astro-cid-x255k2k2>${lead.title}</h2> <p class="lede" data-astro-cid-x255k2k2>${lead.description}</p> </div> </a> ${isAdmin && renderTemplate`<a${addAttribute(`/admin/r/posts/${lead.id}`, "href")} class="admin-card-edit-btn" title="Edit this article in Admin" data-astro-cid-x255k2k2>
✏️ Edit Article
</a>`} </div>`} <ul class="posts" data-astro-cid-x255k2k2> ${rest.map((p) => renderTemplate`<li class="post-item" data-reveal data-astro-cid-x255k2k2> <a${addAttribute(`/blog/${p.slug}`, "href")} class="post" data-astro-cid-x255k2k2> <div class="post-img-box" data-astro-cid-x255k2k2> ${renderComponent($$result, "Photo", $$Photo, {
		"image": p.image,
		"alt": p.title,
		"sizes": "(min-width: 1000px) 30vw, 100vw",
		"widths": [
			480,
			768,
			1080
		],
		"data-astro-cid-x255k2k2": true
	})} </div> <span class="small muted" data-astro-cid-x255k2k2>${formatDate(p.published_at)} · ${readingMinutes(p.body)} min read</span> <h2 class="h-post" data-astro-cid-x255k2k2>${p.title}</h2> <p class="small muted" data-astro-cid-x255k2k2>${p.description}</p> </a> ${isAdmin && renderTemplate`<a${addAttribute(`/admin/r/posts/${p.id}`, "href")} class="admin-card-edit-btn"${addAttribute(`Edit "${p.title}" in Admin`, "title")} data-astro-cid-x255k2k2>
✏️ Edit
</a>`} </li>`)} </ul> </div> </section> ` })}`;
}, "C:/Programming section/virnobyte/src/pages/blog/index.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/blog/index.astro";
var $$url = "/blog.html";
//#endregion
//#region \0virtual:astro:page:src/pages/blog/index@_@astro
var page = () => blog_exports;
//#endregion
export { page };
