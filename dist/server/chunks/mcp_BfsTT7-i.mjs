import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { n as getSettings, t as contactInfo } from "./settings_DMNw6G8Y.mjs";
import { w as services, y as products } from "./data_Bq_0n-xJ.mjs";
//#region src/pages/api/mcp.ts
var mcp_exports = /* @__PURE__ */ __exportAll({ ALL: () => ALL });
var ALL = async ({ request, url }) => {
	if (request.method === "OPTIONS") return new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization"
		}
	});
	const s = getSettings();
	const c = contactInfo(s);
	if (request.method === "GET") return new Response(JSON.stringify({
		status: "ok",
		server: "virnobyte-mcp",
		version: "1.0.0",
		capabilities: ["tools"]
	}), { headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*"
	} });
	let body;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({
			jsonrpc: "2.0",
			error: {
				code: -32700,
				message: "Parse error"
			},
			id: null
		}), {
			status: 400,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			}
		});
	}
	const { id = 1, method, params } = body;
	const corsHeaders = {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*"
	};
	if (method === "initialize") return new Response(JSON.stringify({
		jsonrpc: "2.0",
		id,
		result: {
			protocolVersion: "2024-11-05",
			serverInfo: {
				name: "virnobyte",
				version: "1.0.0"
			},
			capabilities: { tools: {} }
		}
	}), { headers: corsHeaders });
	if (method === "tools/list") return new Response(JSON.stringify({
		jsonrpc: "2.0",
		id,
		result: { tools: [
			{
				name: "search_services",
				description: "Search available IT, computer repair, laptop repair, Mac repair, network, and AMC services with pricing and diagnostic details in Pune & PCMC.",
				inputSchema: {
					type: "object",
					properties: { query: {
						type: "string",
						description: "Search query"
					} }
				}
			},
			{
				name: "search_products",
				description: "Search refurbished and new computers, laptops, mice, monitors, accessories, and components available at Virnobyte.",
				inputSchema: {
					type: "object",
					properties: {
						query: {
							type: "string",
							description: "Product search query"
						},
						category: {
							type: "string",
							description: "Optional category"
						}
					}
				}
			},
			{
				name: "get_business_info",
				description: "Get business contact details, doorstep coverage areas (Pune & PCMC), operating hours, and warranty policy.",
				inputSchema: {
					type: "object",
					properties: {}
				}
			}
		] }
	}), { headers: corsHeaders });
	if (method === "tools/call") {
		const toolName = params?.name;
		const args = params?.arguments || {};
		if (toolName === "search_services") {
			const q = (args.query || "").toLowerCase();
			const all = services();
			const matched = q ? all.filter((x) => x.name.toLowerCase().includes(q) || x.short.toLowerCase().includes(q)) : all;
			return new Response(JSON.stringify({
				jsonrpc: "2.0",
				id,
				result: { content: [{
					type: "text",
					text: JSON.stringify(matched.slice(0, 5))
				}] }
			}), { headers: corsHeaders });
		}
		if (toolName === "search_products") {
			const q = (args.query || "").toLowerCase();
			const all = products();
			const matched = q ? all.filter((x) => x.name.toLowerCase().includes(q) || x.summary && x.summary.toLowerCase().includes(q)) : all;
			return new Response(JSON.stringify({
				jsonrpc: "2.0",
				id,
				result: { content: [{
					type: "text",
					text: JSON.stringify(matched.slice(0, 5))
				}] }
			}), { headers: corsHeaders });
		}
		if (toolName === "get_business_info") return new Response(JSON.stringify({
			jsonrpc: "2.0",
			id,
			result: { content: [{
				type: "text",
				text: JSON.stringify({
					name: c.name,
					legalName: c.legalName,
					phone: c.phone,
					whatsapp: c.whatsapp,
					email: c.email,
					address: `${c.street}, ${c.locality}, ${c.city} ${c.postalCode}`,
					serviceAreas: s.business.serviceAreas,
					hours: s.business.hours || "Mo-Sa 09:30-20:30"
				})
			}] }
		}), { headers: corsHeaders });
		return new Response(JSON.stringify({
			jsonrpc: "2.0",
			id,
			error: {
				code: -32601,
				message: `Tool '${toolName}' not found`
			}
		}), {
			status: 404,
			headers: corsHeaders
		});
	}
	return new Response(JSON.stringify({
		jsonrpc: "2.0",
		id,
		error: {
			code: -32601,
			message: "Method not supported"
		}
	}), {
		status: 404,
		headers: corsHeaders
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/mcp@_@ts
var page = () => mcp_exports;
//#endregion
export { page };
