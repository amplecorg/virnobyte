//#region src/lib/commerce/http.ts
var json = (body, status = 200) => new Response(JSON.stringify(body), {
	status,
	headers: {
		"Content-Type": "application/json",
		"Cache-Control": "private, no-store"
	}
});
var isSecure = (ctx) => ctx.url.protocol === "https:" || ctx.request.headers.get("x-forwarded-proto") === "https";
function getPublicOrigin(ctx) {
	const req = ctx.request;
	const proto = req.headers.get("x-forwarded-proto") || ctx.url.protocol.replace(":", "");
	const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || ctx.url.host;
	if (proto === "https") return `https://${host}`;
	const siteUrl = (process.env.PUBLIC_SITE_URL || "").trim().replace(/\/+$/, "");
	if (siteUrl && siteUrl.startsWith("https://")) return siteUrl;
	if (host.includes("localhost") || host.includes("127.0.0.1")) return "https://virnobyte.com";
	return `https://${host}`;
}
async function readJson(request) {
	try {
		const body = await request.json();
		return body && typeof body === "object" ? body : {};
	} catch {
		return {};
	}
}
//#endregion
export { readJson as i, isSecure as n, json as r, getPublicOrigin as t };
