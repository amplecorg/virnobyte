import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { i as saveUpload } from "./forms_DRPNG8o2.mjs";
//#region src/pages/api/admin/upload.ts
var upload_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request, locals }) => {
	if (!locals.user || locals.user.role !== "admin") return new Response(JSON.stringify({
		ok: false,
		error: "Unauthorized"
	}), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	try {
		const formData = await request.formData();
		const files = [];
		for (const key of [
			"files",
			"file",
			"images__upload"
		]) {
			const list = formData.getAll(key);
			for (const item of list) if (item instanceof File && item.size > 0) files.push(item);
		}
		if (!files.length) return new Response(JSON.stringify({
			ok: false,
			error: "No files selected"
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const hint = String(formData.get("hint") || formData.get("slug") || formData.get("name") || "product");
		const urls = [];
		for (const f of files) {
			const url = await saveUpload(f, hint);
			urls.push(url);
		}
		return new Response(JSON.stringify({
			ok: true,
			urls
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		return new Response(JSON.stringify({
			ok: false,
			error: err?.message || "Upload failed"
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin/upload@_@ts
var page = () => upload_exports;
//#endregion
export { page };
