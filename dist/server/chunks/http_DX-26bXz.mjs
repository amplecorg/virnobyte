//#region src/lib/commerce/http.ts
var json = (body, status = 200) => new Response(JSON.stringify(body), {
	status,
	headers: {
		"Content-Type": "application/json",
		"Cache-Control": "private, no-store"
	}
});
var isSecure = (ctx) => ctx.url.protocol === "https:" || ctx.request.headers.get("x-forwarded-proto") === "https";
async function readJson(request) {
	try {
		const body = await request.json();
		return body && typeof body === "object" ? body : {};
	} catch {
		return {};
	}
}
//#endregion
export { json as n, readJson as r, isSecure as t };
