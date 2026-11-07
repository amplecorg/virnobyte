import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { A as renderTemplate, N as addAttribute, V as createAstro, j as maybeRenderHead, w as renderComponent, z as unescapeHTML } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { t as $$Icon } from "./Icon_Ck1f1YF9.mjs";
import { n as getSettings } from "./settings_DMNw6G8Y.mjs";
import { _ as posts, g as post, w as services } from "./data_Bq_0n-xJ.mjs";
import { l as readingMinutes, o as markdown, r as formatDate } from "./format_CFs_vaoZ.mjs";
import { n as article, r as breadcrumbs, t as $$Base } from "./Base_fXkZMcl0.mjs";
import { t as $$Breadcrumbs } from "./Breadcrumbs_dgueMOWz.mjs";
import { t as $$Photo } from "./Photo_DaKSvGuY.mjs";
import { t as $$CtaBand } from "./CtaBand_C1Ldw7-J.mjs";
//#region src/pages/blog/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$Slug = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const isAdmin = Astro.locals.user?.role === "admin";
	const p = post(Astro.params.slug, isAdmin);
	if (!p) return Astro.rewrite("/404");
	const s = getSettings();
	const site = Astro.site;
	const crumbs = [
		{
			name: "Home",
			href: "/"
		},
		{
			name: "Blog",
			href: "/blog"
		},
		{
			name: p.title,
			href: `/blog/${p.slug}`
		}
	];
	const related = services().filter((x) => p.related.includes(x.slug));
	const more = posts(4).filter((x) => x.slug !== p.slug).slice(0, 3);
	const og = `/og/posts/${p.slug}.jpg`;
	const imgSize = p.image_size || "21/9";
	let coverAspect = "21 / 9";
	let coverMaxHeight = "none";
	if (imgSize === "16/9") coverAspect = "16 / 9";
	else if (imgSize === "16/10") coverAspect = "16 / 10";
	else if (imgSize === "4/3") coverAspect = "4 / 3";
	else if (imgSize === "natural") {
		coverAspect = "auto";
		coverMaxHeight = "560px";
	} else if (imgSize === "compact") {
		coverAspect = "21 / 9";
		coverMaxHeight = "320px";
	} else if (imgSize === "large") {
		coverAspect = "16 / 9";
		coverMaxHeight = "560px";
	}
	const coverFit = imgSize === "natural" ? p.image_fit || "contain" : p.image_fit || "cover";
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": `${p.title} | ${s.business.name}`,
		"description": p.description,
		"canonical": `/blog/${p.slug}`,
		"type": "article",
		"image": og,
		"publishedTime": p.published_at,
		"modifiedTime": p.updated_at,
		"jsonLd": [article(site, p, new URL(og, site).href), breadcrumbs(site, crumbs)],
		"data-astro-cid-zg7dkzxc": true
	}, { "default": ($$result) => renderTemplate`${isAdmin && renderTemplate`${maybeRenderHead($$result)}<div class="admin-article-toolbar" data-astro-cid-zg7dkzxc> <div class="wrap admin-article-toolbar-inner" data-astro-cid-zg7dkzxc> <div class="admin-toolbar-status" data-astro-cid-zg7dkzxc> <span class="admin-chip" data-astro-cid-zg7dkzxc>⚡ Admin Mode</span> <span data-astro-cid-zg7dkzxc>Editing article: <strong data-astro-cid-zg7dkzxc>${p.title}</strong></span> <span${addAttribute(["admin-status-pill", p.published ? "published" : "draft"], "class:list")} data-astro-cid-zg7dkzxc> ${p.published ? "● Published" : "○ Draft"} </span> <span class="admin-size-indicator" data-astro-cid-zg7dkzxc>Image Size: <strong data-astro-cid-zg7dkzxc>${p.image_size || "21/9"}</strong> (${p.image_fit || "cover"})</span> </div> <div class="admin-toolbar-actions" data-astro-cid-zg7dkzxc> <a${addAttribute(`/admin/r/posts/${p.id}`, "href")} class="admin-btn admin-btn-edit" data-astro-cid-zg7dkzxc>
✏️ Edit Content &amp; Image Size
</a> <a href="/admin/r/posts/new" class="admin-btn admin-btn-new" data-astro-cid-zg7dkzxc>
➕ New Post
</a> <a href="/admin/r/posts" class="admin-btn admin-btn-manage" data-astro-cid-zg7dkzxc>
📂 All Posts
</a> </div> </div> </div>`}<article data-astro-cid-zg7dkzxc> <header class="section--tight head" data-astro-cid-zg7dkzxc> <div class="wrap narrow stack" data-astro-cid-zg7dkzxc> ${renderComponent($$result, "Breadcrumbs", $$Breadcrumbs, {
		"items": crumbs,
		"data-astro-cid-zg7dkzxc": true
	})} <h1 data-astro-cid-zg7dkzxc>${p.title}</h1> <p class="lede" data-astro-cid-zg7dkzxc>${p.description}</p> <p class="small muted" data-astro-cid-zg7dkzxc>
By ${p.author || `the ${s.business.name} team`} · <time${addAttribute(p.published_at, "datetime")} data-astro-cid-zg7dkzxc>${formatDate(p.published_at)}</time> · ${readingMinutes(p.body)} min read
</p> </div> <div class="wrap cover"${addAttribute(`--cover-aspect: ${coverAspect}; --cover-max-height: ${coverMaxHeight}; --cover-fit: ${coverFit};`, "style")} data-astro-cid-zg7dkzxc> ${renderComponent($$result, "Photo", $$Photo, {
		"image": p.image,
		"alt": p.title,
		"eager": true,
		"sizes": "(min-width: 1200px) 1100px, 100vw",
		"widths": [
			768,
			1080,
			1440,
			1920,
			2560
		],
		"data-astro-cid-zg7dkzxc": true
	})} </div> </header> <div class="section--tight" data-astro-cid-zg7dkzxc> <div class="wrap narrow body" data-astro-cid-zg7dkzxc> <div class="prose" data-astro-cid-zg7dkzxc>${unescapeHTML(markdown(p.body))}</div> ${related.length > 0 && renderTemplate`<aside class="card rel" aria-label="Related services" data-astro-cid-zg7dkzxc> <h2 data-astro-cid-zg7dkzxc>Related services</h2> <ul data-astro-cid-zg7dkzxc> ${related.map((r) => renderTemplate`<li data-astro-cid-zg7dkzxc> <a${addAttribute(`/services/${r.slug}`, "href")} class="text-link" data-astro-cid-zg7dkzxc> ${r.name} ${renderComponent($$result, "Icon", $$Icon, {
		"name": "arrow",
		"size": 16,
		"data-astro-cid-zg7dkzxc": true
	})} </a> <span class="small muted" data-astro-cid-zg7dkzxc>${r.short}</span> </li>`)} </ul> </aside>`} </div> </div> </article> ${more.length > 0 && renderTemplate`<section class="section section--white" data-astro-cid-zg7dkzxc> <div class="wrap" data-astro-cid-zg7dkzxc> <h2 class="more-h" data-astro-cid-zg7dkzxc>More guides</h2> <ul class="more" data-astro-cid-zg7dkzxc> ${more.map((m) => renderTemplate`<li data-astro-cid-zg7dkzxc> <a${addAttribute(`/blog/${m.slug}`, "href")} data-astro-cid-zg7dkzxc>${m.title}</a> <span class="small muted" data-astro-cid-zg7dkzxc>${formatDate(m.published_at)}</span> </li>`)} </ul> </div> </section>`}${renderComponent($$result, "CtaBand", $$CtaBand, { "data-astro-cid-zg7dkzxc": true })} ` })}`;
}, "C:/Programming section/virnobyte/src/pages/blog/[slug].astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/blog/[slug].astro";
var $$url = "/blog/[slug].html";
//#endregion
//#region \0virtual:astro:page:src/pages/blog/[slug]@_@astro
var page = () => _slug__exports;
//#endregion
export { page };
