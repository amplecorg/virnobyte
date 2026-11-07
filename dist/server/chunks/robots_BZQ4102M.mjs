import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
//#region src/pages/robots.txt.ts
var robots_txt_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = ({ site }) => {
	const body = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /account
Disallow: /api/
Disallow: /og-cache/

# AI & Agent Directives
Content-Signal: search=yes, ai-train=no

# Machine-Readable LLM Context & Agent Index
Sitemap: ${site ? new URL(site).origin : "https://virnobyte.com"}/sitemap.xml
`;
	return new Response(body, { headers: {
		"Content-Type": "text/plain; charset=utf-8",
		"Cache-Control": "public, max-age=3600"
	} });
};
//#endregion
//#region \0virtual:astro:page:src/pages/robots.txt@_@ts
var page = () => robots_txt_exports;
//#endregion
export { page };
