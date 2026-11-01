import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { i as getDbStatus, r as get } from "./db_VNCUNG5f.mjs";
import process from "node:process";
//#region src/pages/api/health.ts
var health_exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var GET = async () => {
	let dbOk = false;
	let testQueryError = null;
	try {
		dbOk = get("SELECT 1 as num")?.num === 1;
	} catch (err) {
		testQueryError = {
			name: err?.name,
			message: err?.message
		};
	}
	const dbStatus = typeof getDbStatus === "function" ? getDbStatus() : { ok: dbOk };
	return new Response(JSON.stringify({
		status: dbOk ? "healthy" : "degraded",
		nodeVersion: process.version,
		platform: process.platform,
		cwd: process.cwd(),
		dataDir: dbStatus.dataDir || process.env.DATA_DIR || "default",
		port: process.env.PORT || "3000",
		host: process.env.HOST || "0.0.0.0",
		dbOk,
		dbStatus,
		testQueryError
	}, null, 2), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "no-store, no-cache"
		}
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/health@_@ts
var page = () => health_exports;
//#endregion
export { page };
