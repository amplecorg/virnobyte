import { t as __exportAll } from "./chunks/rolldown-runtime_8H4AJuhK.mjs";
import { D as LocalsReassigned, E as LocalsNotAnObject, G as ReservedSlotName, H as PrerenderClientAddressNotAvailable, I as NoManifestAvailable, J as SessionStorageInitError, K as ResponseSentError, O as MiddlewareNoDataOrNextCalled, X as StaticClientAddressNotAvailable, Y as SessionStorageSaveError, a as AstroResponseHeadersReassigned, et as i18nNoLocaleFoundInPath, h as ForbiddenRewrite, i as ActionsReturnedInvalidDataError, k as MiddlewareNotAResponse, n as isAstroError, o as CacheNotEnabled, r as ActionNotFoundError, s as ClientAddressNotAvailable, t as AstroError } from "./chunks/errors_CAafeVI3.mjs";
import { $ as pathHasLocale, B as renderEndpoint, C as renderJSX, Ct as slash, E as chunkToString, Et as generateCspDigest, G as getCustom500Route, H as createAsyncManifestMemo, I as isRenderInstruction, J as isRoute404, K as getDefaultStatusCode, L as normalizeCspResourceEntry, O as renderSlotToString, Q as normalizeThePath, R as pushDirective, S as renderPage, St as removeTrailingForwardSlash, Tt as decodeKey, U as createManifestMemo, W as getCustom404Route, X as getErrorRoutePath, Y as isRoute500, Z as normalizeTheLocale, _ as DEFAULT_404_ROUTE, a as getRouteGenerator, at as fetchStateSymbol, b as readBodyWithLimit, bt as removeLeadingForwardSlash, c as getOriginPathname, ct as responseSentSymbol$1, d as validateAndDecodePathname, dt as appendForwardSlash, et as ASTRO_ERROR_HEADER, f as getLogger, ft as collapseDuplicateSlashes, g as astroToRuntimeLogger, h as AstroIntegrationLogger, ht as isInternalPath, i as getRouteCache, it as clientAddressSymbol, k as isRenderTemplateResult, l as setOriginPathname, lt as shouldAppendForwardSlash, mt as hasFileExtension, n as getParams, nt as REDIRECT_STATUS_CODES, o as getEnvironment, ot as nodeRequestAbortControllerCleanupSymbol, p as getResolvedLogger, pt as collapseDuplicateTrailingSlashes, q as routeHasHtmlExtension, r as getProps, rt as REROUTABLE_STATUS_CODES, s as copyRequest, st as originPathnameSymbol, t as sequence, tt as ASTRO_GENERATOR, u as MultiLevelEncodingError, ut as defineMiddleware, v as SERVER_ISLAND_COMPONENT, vt as joinPaths, wt as stripRequestBase, y as BodySizeLimitError, yt as prependForwardSlash$1 } from "./chunks/sequence_BTIhAKFo.mjs";
import { n as matchPattern } from "./chunks/remote_BgpFkaRQ.mjs";
import React, { createElement, memo } from "react";
import ReactDOM from "react-dom/server";
import picomatch from "picomatch";
import { parse, stringify, unflatten } from "devalue";
import colors from "piccolore";
import { parseCookie, stringifySetCookie } from "cookie";
import { escape } from "html-escaper";
import { createStorage } from "unstorage";
import { AsyncLocalStorage } from "node:async_hooks";
import fs, { createReadStream } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { Http2ServerResponse } from "node:http2";
import url from "node:url";
import http from "node:http";
import https from "node:https";
import enableDestroy from "server-destroy";
import os from "node:os";
import send from "send";
//#region node_modules/astro/dist/core/middleware/noop-middleware.js
var NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
	return await next();
};
//#endregion
//#region node_modules/astro/dist/core/app/manifest.js
function deserializeManifest(serializedManifest, routesList) {
	const routes = [];
	if (serializedManifest.routes) for (const serializedRoute of serializedManifest.routes) routes.push({
		...serializedRoute,
		routeData: deserializeRouteData(serializedRoute.routeData)
	});
	if (routesList) for (const route of routesList?.routes) routes.push({
		file: "",
		links: [],
		scripts: [],
		styles: [],
		routeData: route
	});
	const assets = new Set(serializedManifest.assets);
	const componentMetadata = new Map(serializedManifest.componentMetadata);
	const inlinedScripts = new Map(serializedManifest.inlinedScripts);
	const clientDirectives = new Map(serializedManifest.clientDirectives);
	const key = decodeKey(serializedManifest.key);
	return {
		middleware() {
			return { onRequest: NOOP_MIDDLEWARE_FN };
		},
		...serializedManifest,
		rootDir: new URL(serializedManifest.rootDir),
		srcDir: new URL(serializedManifest.srcDir),
		publicDir: new URL(serializedManifest.publicDir),
		outDir: new URL(serializedManifest.outDir),
		cacheDir: new URL(serializedManifest.cacheDir),
		buildClientDir: new URL(serializedManifest.buildClientDir),
		buildServerDir: new URL(serializedManifest.buildServerDir),
		assets,
		componentMetadata,
		inlinedScripts,
		clientDirectives,
		routes,
		key
	};
}
function deserializeRouteData(rawRouteData) {
	return {
		route: rawRouteData.route,
		type: rawRouteData.type,
		pattern: new RegExp(rawRouteData.pattern),
		params: rawRouteData.params,
		component: rawRouteData.component,
		pathname: rawRouteData.pathname || void 0,
		segments: rawRouteData.segments,
		prerender: rawRouteData.prerender,
		redirect: rawRouteData.redirect,
		redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
		fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
			return deserializeRouteData(fallback);
		}),
		isIndex: rawRouteData.isIndex,
		origin: rawRouteData.origin,
		distURL: rawRouteData.distURL
	};
}
function deserializeRouteInfo(rawRouteInfo) {
	return {
		styles: rawRouteInfo.styles,
		file: rawRouteInfo.file,
		links: rawRouteInfo.links,
		scripts: rawRouteInfo.scripts,
		routeData: deserializeRouteData(rawRouteInfo.routeData)
	};
}
//#endregion
//#region \0astro:react:opts
var _astro_react_opts_default = {
	include: void 0,
	exclude: void 0,
	experimentalReactChildren: false,
	experimentalDisableStreaming: false
};
//#endregion
//#region node_modules/@astrojs/react/dist/context.js
var contexts = /* @__PURE__ */ new WeakMap();
var ID_PREFIX = "r";
function getContext(rendererContextResult) {
	if (contexts.has(rendererContextResult)) return contexts.get(rendererContextResult);
	const ctx = {
		currentIndex: 0,
		get id() {
			return ID_PREFIX + this.currentIndex.toString();
		}
	};
	contexts.set(rendererContextResult, ctx);
	return ctx;
}
function incrementId(rendererContextResult) {
	const ctx = getContext(rendererContextResult);
	const id = ctx.id;
	ctx.currentIndex++;
	return id;
}
//#endregion
//#region node_modules/@astrojs/react/dist/static-html.js
var StaticHtml = ({ value, name, hydrate = true }) => {
	if (value == null || value.trim() === "") return null;
	return createElement(hydrate ? "astro-slot" : "astro-static-slot", {
		name,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: value }
	});
};
var static_html_default = memo(StaticHtml, () => true);
//#endregion
//#region node_modules/@astrojs/internal-helpers/dist/create-filter.js
function ensureArray(thing) {
	if (Array.isArray(thing)) return thing;
	if (thing == null) return [];
	return [thing];
}
function toMatcher(pattern) {
	if (pattern instanceof RegExp) return pattern;
	const normalized = slash(pattern);
	const fn = picomatch(normalized, { dot: true });
	return { test: (what) => fn(what) };
}
function createFilter(include, exclude) {
	const includeMatchers = ensureArray(include).map(toMatcher);
	const excludeMatchers = ensureArray(exclude).map(toMatcher);
	if (!includeMatchers.length && !excludeMatchers.length) return (id) => typeof id === "string" && !id.includes("\0");
	return function(id) {
		if (typeof id !== "string") return false;
		if (id.includes("\0")) return false;
		const pathId = slash(id);
		for (const matcher of excludeMatchers) {
			if (matcher instanceof RegExp) matcher.lastIndex = 0;
			if (matcher.test(pathId)) return false;
		}
		for (const matcher of includeMatchers) {
			if (matcher instanceof RegExp) matcher.lastIndex = 0;
			if (matcher.test(pathId)) return true;
		}
		return !includeMatchers.length;
	};
}
//#endregion
//#region node_modules/@astrojs/react/dist/server.js
var slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
var reactTypeof = /* @__PURE__ */ Symbol.for("react.element");
var reactTransitionalTypeof = /* @__PURE__ */ Symbol.for("react.transitional.element");
var filter = _astro_react_opts_default?.include || _astro_react_opts_default?.exclude ? createFilter(_astro_react_opts_default.include, _astro_react_opts_default.exclude) : null;
async function check(Component, props, children, metadata) {
	if (typeof Component === "object") return Component["$$typeof"]?.toString().slice(7).startsWith("react") ?? false;
	if (typeof Component !== "function") return false;
	if (Component.name === "QwikComponent") return false;
	if (typeof Component === "function" && Component["$$typeof"] === /* @__PURE__ */ Symbol.for("react.forward_ref")) return false;
	if (Component.prototype != null && typeof Component.prototype.render === "function") return React.Component.isPrototypeOf(Component) || React.PureComponent.isPrototypeOf(Component);
	if (filter && metadata?.componentUrl && !filter(metadata.componentUrl)) return false;
	let isReactComponent = false;
	function Tester(...args) {
		try {
			const vnode = Component(...args);
			if (vnode && (vnode["$$typeof"] === reactTypeof || vnode["$$typeof"] === reactTransitionalTypeof)) isReactComponent = true;
		} catch {}
		return React.createElement("div");
	}
	await renderToStaticMarkup.call(this, Tester, props, children);
	return isReactComponent;
}
async function getNodeWritable() {
	let { Writable } = await import(
		/* @vite-ignore */
		"node:stream"
);
	return Writable;
}
function needsHydration(metadata) {
	return metadata?.astroStaticSlot ? !!metadata.hydrate : true;
}
async function renderToStaticMarkup(Component, props, { default: children, ...slotted }, metadata) {
	let prefix;
	if (this && this.result) prefix = incrementId(this.result);
	const attrs = { prefix };
	delete props["class"];
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		const name = slotName(key);
		slots[name] = React.createElement(static_html_default, {
			hydrate: needsHydration(metadata),
			value,
			name
		});
	}
	const newProps = {
		...props,
		...slots
	};
	const newChildren = children ?? props.children;
	if (children && _astro_react_opts_default.experimentalReactChildren) {
		attrs["data-react-children"] = true;
		newProps.children = (await import("./chunks/vnode-children_B6vVcKTz.mjs").then((mod) => mod.default))(children);
	} else if (newChildren != null) newProps.children = React.createElement(static_html_default, {
		hydrate: needsHydration(metadata),
		value: newChildren
	});
	const formState = this ? await getFormState(this) : void 0;
	if (formState) {
		attrs["data-action-result"] = JSON.stringify(formState[0]);
		attrs["data-action-key"] = formState[1];
		attrs["data-action-name"] = formState[2];
	}
	const vnode = React.createElement(Component, newProps);
	const renderOptions = {
		identifierPrefix: prefix,
		formState
	};
	let html;
	if (_astro_react_opts_default.experimentalDisableStreaming) html = ReactDOM.renderToString(vnode);
	else if ("renderToReadableStream" in ReactDOM) html = await renderToReadableStreamAsync(vnode, renderOptions);
	else html = await renderToPipeableStreamAsync(vnode, renderOptions);
	html = html.replace(/<link\s[^>]*rel="(?:preload|modulepreload|stylesheet|preconnect|dns-prefetch)"[^>]*>/g, "");
	return {
		html,
		attrs
	};
}
async function getFormState({ result }) {
	const { request, actionResult } = result;
	if (!actionResult) return void 0;
	if (!isFormRequest(request.headers.get("content-type"))) return void 0;
	const { searchParams } = new URL(request.url);
	const actionKey = (await request.clone().formData()).get("$ACTION_KEY")?.toString();
	const actionName = searchParams.get("_action");
	if (!actionKey || !actionName) return void 0;
	return [
		actionResult,
		actionKey,
		actionName
	];
}
async function renderToPipeableStreamAsync(vnode, options) {
	const Writable = await getNodeWritable();
	let html = "";
	return new Promise((resolve, reject) => {
		let error = void 0;
		let stream = ReactDOM.renderToPipeableStream(vnode, {
			...options,
			onError(err) {
				error = err;
				reject(error);
			},
			onAllReady() {
				stream.pipe(new Writable({
					write(chunk, _encoding, callback) {
						html += chunk.toString("utf-8");
						callback();
					},
					destroy() {
						resolve(html);
					}
				}));
			}
		});
	});
}
async function readResult(stream) {
	const reader = stream.getReader();
	let result = "";
	const decoder = new TextDecoder("utf-8");
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			if (value) result += decoder.decode(value);
			else decoder.decode(/* @__PURE__ */ new Uint8Array());
			return result;
		}
		result += decoder.decode(value, { stream: true });
	}
}
async function renderToReadableStreamAsync(vnode, options) {
	return await readResult(await ReactDOM.renderToReadableStream(vnode, options));
}
var formContentTypes$1 = ["application/x-www-form-urlencoded", "multipart/form-data"];
function isFormRequest(contentType) {
	const type = contentType?.split(";")[0].toLowerCase();
	return formContentTypes$1.some((t) => type === t);
}
//#endregion
//#region \0virtual:astro:renderers
var renderers = [Object.assign({
	"name": "@astrojs/react",
	"clientEntrypoint": "@astrojs/react/client.js",
	"serverEntrypoint": "@astrojs/react/server.js"
}, { ssr: {
	name: "@astrojs/react",
	check,
	renderToStaticMarkup,
	supportsAstroStaticSlot: true
} })];
[
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"type": "page",
			"component": "_server-islands.astro",
			"params": ["name"],
			"segments": [[{
				"content": "_server-islands",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "name",
				"dynamic": true,
				"spread": false
			}]],
			"pattern": "^\\/_server-islands\\/([^/]+?)\\/?$",
			"prerender": false,
			"isIndex": false,
			"fallbackRoutes": [],
			"route": "/_server-islands/[name]",
			"origin": "internal",
			"distURL": [],
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/_image",
			"component": "node_modules/astro/dist/assets/endpoint/node.js",
			"params": [],
			"pathname": "/_image",
			"pattern": "^\\/_image\\/?$",
			"segments": [[{
				"content": "_image",
				"dynamic": false,
				"spread": false
			}]],
			"type": "endpoint",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"isIndex": false,
			"origin": "internal",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/404",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/404\\/?$",
			"segments": [[{
				"content": "404",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/404.astro",
			"pathname": "/404",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/500",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/500\\/?$",
			"segments": [[{
				"content": "500",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/500.astro",
			"pathname": "/500",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/about",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/about\\/?$",
			"segments": [[{
				"content": "about",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/about.astro",
			"pathname": "/about",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/account/forgot-password",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/account\\/forgot-password\\/?$",
			"segments": [[{
				"content": "account",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "forgot-password",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/account/forgot-password.astro",
			"pathname": "/account/forgot-password",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/account/login",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/account\\/login\\/?$",
			"segments": [[{
				"content": "account",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "login",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/account/login.astro",
			"pathname": "/account/login",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/account/logout",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/account\\/logout\\/?$",
			"segments": [[{
				"content": "account",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "logout",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/account/logout.ts",
			"pathname": "/account/logout",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/account/register",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/account\\/register\\/?$",
			"segments": [[{
				"content": "account",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "register",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/account/register.astro",
			"pathname": "/account/register",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/account/reset-password",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/account\\/reset-password\\/?$",
			"segments": [[{
				"content": "account",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "reset-password",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/account/reset-password.astro",
			"pathname": "/account/reset-password",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/account",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/account\\/?$",
			"segments": [[{
				"content": "account",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/account/index.astro",
			"pathname": "/account",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin/login",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/admin\\/login\\/?$",
			"segments": [[{
				"content": "admin",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "login",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/admin/login.astro",
			"pathname": "/admin/login",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin/members/new",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/admin\\/members\\/new\\/?$",
			"segments": [
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "members",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "new",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/admin/members/new.astro",
			"pathname": "/admin/members/new",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin/members/[id]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/admin\\/members\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "members",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["id"],
			"component": "src/pages/admin/members/[id].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin/members",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/admin\\/members\\/?$",
			"segments": [[{
				"content": "admin",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "members",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/admin/members/index.astro",
			"pathname": "/admin/members",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin/r/[resource]/[id]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/admin\\/r\\/([^/]+?)\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "r",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "resource",
					"dynamic": true,
					"spread": false
				}],
				[{
					"content": "id",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["resource", "id"],
			"component": "src/pages/admin/r/[resource]/[id].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin/r/[resource]",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/admin\\/r\\/([^/]+?)\\/?$",
			"segments": [
				[{
					"content": "admin",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "r",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "resource",
					"dynamic": true,
					"spread": false
				}]
			],
			"params": ["resource"],
			"component": "src/pages/admin/r/[resource]/index.astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin/settings",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/admin\\/settings\\/?$",
			"segments": [[{
				"content": "admin",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "settings",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/admin/settings.astro",
			"pathname": "/admin/settings",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/admin",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/admin\\/?$",
			"segments": [[{
				"content": "admin",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/admin/index.astro",
			"pathname": "/admin",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/apply",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/apply\\/?$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "apply",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/apply.ts",
			"pathname": "/api/apply",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/enquiry",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/enquiry\\/?$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "enquiry",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/enquiry.ts",
			"pathname": "/api/enquiry",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/health",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/health\\/?$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "health",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/health.ts",
			"pathname": "/api/health",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/membership",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/membership\\/?$",
			"segments": [[{
				"content": "api",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "membership",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/api/membership.ts",
			"pathname": "/api/membership",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/api/pc/build",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/api\\/pc\\/build\\/?$",
			"segments": [
				[{
					"content": "api",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "pc",
					"dynamic": false,
					"spread": false
				}],
				[{
					"content": "build",
					"dynamic": false,
					"spread": false
				}]
			],
			"params": [],
			"component": "src/pages/api/pc/build.ts",
			"pathname": "/api/pc/build",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/blog/[slug]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/blog\\/([^/]+?)\\/?$",
			"segments": [[{
				"content": "blog",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "slug",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["slug"],
			"component": "src/pages/blog/[slug].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/blog",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/blog\\/?$",
			"segments": [[{
				"content": "blog",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/blog/index.astro",
			"pathname": "/blog",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/careers/[slug]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/careers\\/([^/]+?)\\/?$",
			"segments": [[{
				"content": "careers",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "slug",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["slug"],
			"component": "src/pages/careers/[slug].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/careers",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/careers\\/?$",
			"segments": [[{
				"content": "careers",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/careers/index.astro",
			"pathname": "/careers",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/contact",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/contact\\/?$",
			"segments": [[{
				"content": "contact",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/contact.astro",
			"pathname": "/contact",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/custom-pc-builder",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/custom-pc-builder\\/?$",
			"segments": [[{
				"content": "custom-pc-builder",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/custom-pc-builder.astro",
			"pathname": "/custom-pc-builder",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/faq",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/faq\\/?$",
			"segments": [[{
				"content": "faq",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/faq.astro",
			"pathname": "/faq",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/gallery",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/gallery\\/?$",
			"segments": [[{
				"content": "gallery",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/gallery.astro",
			"pathname": "/gallery",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/membership",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/membership\\/?$",
			"segments": [[{
				"content": "membership",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/membership.astro",
			"pathname": "/membership",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/og/[...path]",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/og(?:\\/(.*?))?\\/?$",
			"segments": [[{
				"content": "og",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "...path",
				"dynamic": true,
				"spread": true
			}]],
			"params": ["...path"],
			"component": "src/pages/og/[...path].ts",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/our-certificates",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/our-certificates\\/?$",
			"segments": [[{
				"content": "our-certificates",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/our-certificates.astro",
			"pathname": "/our-certificates",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/portfolio/[category]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/portfolio\\/([^/]+?)\\/?$",
			"segments": [[{
				"content": "portfolio",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "category",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["category"],
			"component": "src/pages/portfolio/[category].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/portfolio",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/portfolio\\/?$",
			"segments": [[{
				"content": "portfolio",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/portfolio/index.astro",
			"pathname": "/portfolio",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/products",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/products\\/?$",
			"segments": [[{
				"content": "products",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/products.astro",
			"pathname": "/products",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/robots.txt",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/robots\\.txt$",
			"segments": [[{
				"content": "robots.txt",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/robots.txt.ts",
			"pathname": "/robots.txt",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services/[slug]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/services\\/([^/]+?)\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "slug",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["slug"],
			"component": "src/pages/services/[slug].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/services",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/services\\/?$",
			"segments": [[{
				"content": "services",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/services/index.astro",
			"pathname": "/services",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/sitemap.xml",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/sitemap\\.xml$",
			"segments": [[{
				"content": "sitemap.xml",
				"dynamic": false,
				"spread": false
			}]],
			"params": [],
			"component": "src/pages/sitemap.xml.ts",
			"pathname": "/sitemap.xml",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/uploads/[...path]",
			"isIndex": false,
			"type": "endpoint",
			"pattern": "^\\/uploads(?:\\/(.*?))?\\/?$",
			"segments": [[{
				"content": "uploads",
				"dynamic": false,
				"spread": false
			}], [{
				"content": "...path",
				"dynamic": true,
				"spread": true
			}]],
			"params": ["...path"],
			"component": "src/pages/uploads/[...path].ts",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/[page]",
			"isIndex": false,
			"type": "page",
			"pattern": "^\\/([^/]+?)\\/?$",
			"segments": [[{
				"content": "page",
				"dynamic": true,
				"spread": false
			}]],
			"params": ["page"],
			"component": "src/pages/[page].astro",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	},
	{
		"file": "",
		"links": [],
		"scripts": [],
		"styles": [],
		"routeData": {
			"route": "/",
			"isIndex": true,
			"type": "page",
			"pattern": "^\\/$",
			"segments": [],
			"params": [],
			"component": "src/pages/index.astro",
			"pathname": "/",
			"prerender": false,
			"fallbackRoutes": [],
			"distURL": [],
			"origin": "project",
			"_meta": { "trailingSlash": "ignore" }
		}
	}
].map(deserializeRouteInfo);
//#endregion
//#region \0virtual:astro:pages
var _page0 = () => import("./chunks/node_DMwl7Oq-.mjs");
var _page1 = () => import("./chunks/404_COXv_u68.mjs");
var _page2 = () => import("./chunks/500_RAc8nShM.mjs");
var _page3 = () => import("./chunks/about_9N5FJ-wH.mjs");
var _page4 = () => import("./chunks/forgot-password_DEy16reM.mjs");
var _page5 = () => import("./chunks/login_DdJIcNE-.mjs");
var _page6 = () => import("./chunks/logout_BRBuJzn0.mjs");
var _page7 = () => import("./chunks/register_CRe8SSNa.mjs");
var _page8 = () => import("./chunks/reset-password_9zreVjuW.mjs");
var _page9 = () => import("./chunks/index_CYFKImPn.mjs");
var _page10 = () => import("./chunks/login_CZq34ScL.mjs");
var _page11 = () => import("./chunks/new_CzSkRgLo.mjs");
var _page12 = () => import("./chunks/_id__CYUm3yTE.mjs");
var _page13 = () => import("./chunks/index_B-kiViB1.mjs");
var _page14 = () => import("./chunks/_id__Bc15goHL.mjs");
var _page15 = () => import("./chunks/index_CxgrjieB.mjs");
var _page16 = () => import("./chunks/settings_Cz8PEB9d.mjs");
var _page17 = () => import("./chunks/index_BHBRh_gg.mjs");
var _page18 = () => import("./chunks/apply_Bh2eUaDj.mjs");
var _page19 = () => import("./chunks/enquiry_7ZfbfMsv.mjs");
var _page20 = () => import("./chunks/health_BvlxOCOU.mjs");
var _page21 = () => import("./chunks/membership_BKOPISME.mjs");
var _page22 = () => import("./chunks/build_gs0nyyVg.mjs");
var _page23 = () => import("./chunks/_slug__DGwvG2js.mjs");
var _page24 = () => import("./chunks/index_CdBneloy.mjs");
var _page25 = () => import("./chunks/_slug__tNrRtXfW.mjs");
var _page26 = () => import("./chunks/index_gL4NJvNu.mjs");
var _page27 = () => import("./chunks/contact_CVKWmTOj.mjs");
var _page28 = () => import("./chunks/custom-pc-builder_CoG59DZJ.mjs");
var _page29 = () => import("./chunks/faq_CyOtROi1.mjs");
var _page30 = () => import("./chunks/gallery_BIYP58k2.mjs");
var _page31 = () => import("./chunks/membership_b2YTcAKW.mjs");
var _page32 = () => import("./chunks/_.._nf2uYSbJ.mjs");
var _page33 = () => import("./chunks/our-certificates_CXbdkzx6.mjs");
var _page34 = () => import("./chunks/_category__D1vNllFe.mjs");
var _page35 = () => import("./chunks/index_Dnj4uNOa.mjs");
var _page36 = () => import("./chunks/products_BbbNj9w5.mjs");
var _page37 = () => import("./chunks/robots_DpNP1ERy.mjs");
var _page38 = () => import("./chunks/_slug__CgneqJX6.mjs");
var _page39 = () => import("./chunks/index_fmEZCdcu.mjs");
var _page40 = () => import("./chunks/sitemap_jtcrbJN5.mjs");
var _page41 = () => import("./chunks/_.._CFheeKwo.mjs");
var _page42 = () => import("./chunks/_page__DhPWjX7v.mjs");
var _page43 = () => import("./chunks/index_BPo4b1K7.mjs");
var pageMap = /* @__PURE__ */ new Map([
	["node_modules/astro/dist/assets/endpoint/node.js", _page0],
	["src/pages/404.astro", _page1],
	["src/pages/500.astro", _page2],
	["src/pages/about.astro", _page3],
	["src/pages/account/forgot-password.astro", _page4],
	["src/pages/account/login.astro", _page5],
	["src/pages/account/logout.ts", _page6],
	["src/pages/account/register.astro", _page7],
	["src/pages/account/reset-password.astro", _page8],
	["src/pages/account/index.astro", _page9],
	["src/pages/admin/login.astro", _page10],
	["src/pages/admin/members/new.astro", _page11],
	["src/pages/admin/members/[id].astro", _page12],
	["src/pages/admin/members/index.astro", _page13],
	["src/pages/admin/r/[resource]/[id].astro", _page14],
	["src/pages/admin/r/[resource]/index.astro", _page15],
	["src/pages/admin/settings.astro", _page16],
	["src/pages/admin/index.astro", _page17],
	["src/pages/api/apply.ts", _page18],
	["src/pages/api/enquiry.ts", _page19],
	["src/pages/api/health.ts", _page20],
	["src/pages/api/membership.ts", _page21],
	["src/pages/api/pc/build.ts", _page22],
	["src/pages/blog/[slug].astro", _page23],
	["src/pages/blog/index.astro", _page24],
	["src/pages/careers/[slug].astro", _page25],
	["src/pages/careers/index.astro", _page26],
	["src/pages/contact.astro", _page27],
	["src/pages/custom-pc-builder.astro", _page28],
	["src/pages/faq.astro", _page29],
	["src/pages/gallery.astro", _page30],
	["src/pages/membership.astro", _page31],
	["src/pages/og/[...path].ts", _page32],
	["src/pages/our-certificates.astro", _page33],
	["src/pages/portfolio/[category].astro", _page34],
	["src/pages/portfolio/index.astro", _page35],
	["src/pages/products.astro", _page36],
	["src/pages/robots.txt.ts", _page37],
	["src/pages/services/[slug].astro", _page38],
	["src/pages/services/index.astro", _page39],
	["src/pages/sitemap.xml.ts", _page40],
	["src/pages/uploads/[...path].ts", _page41],
	["src/pages/[page].astro", _page42],
	["src/pages/index.astro", _page43]
]);
//#endregion
//#region \0virtual:astro:manifest
var _manifest = deserializeManifest({"rootDir":"file:///C:/Programming%20section/virnobyte/","cacheDir":"file:///C:/Programming%20section/virnobyte/node_modules/.astro/","outDir":"file:///C:/Programming%20section/virnobyte/dist/","srcDir":"file:///C:/Programming%20section/virnobyte/src/","publicDir":"file:///C:/Programming%20section/virnobyte/public/","buildClientDir":"file:///C:/Programming%20section/virnobyte/dist/client/","buildServerDir":"file:///C:/Programming%20section/virnobyte/dist/server/","adapterName":"@astrojs/node","assetsDir":"_astro","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","distURL":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[],"routeData":{"route":"/_image","component":"node_modules/astro/dist/assets/endpoint/node.js","params":[],"pathname":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"type":"endpoint","prerender":false,"fallbackRoutes":[],"distURL":[],"isIndex":false,"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[],"routeData":{"route":"/500","isIndex":false,"type":"page","pattern":"^\\/500\\/?$","segments":[[{"content":"500","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/500.astro","pathname":"/500","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".crumbs[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld]{font-size:var(--fs-small);color:var(--ink-3);flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;display:flex}.crumbs[data-astro-cid-vx4iavld] li[data-astro-cid-vx4iavld]+li[data-astro-cid-vx4iavld]:before{content:\"/\";opacity:.6;margin-right:6px}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--ink-2);text-decoration:none}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]:hover{text-decoration:underline}.crumbs[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:var(--ink);font-weight:600}.dark[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld],.dark[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--on-night-2)}.dark[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:#fff}\n.page-hero[data-astro-cid-75ysl5lo]{padding-block:var(--space-7) var(--space-8);background:var(--surface);border-bottom:1px solid var(--line)}.grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-6);align-items:center;display:grid}.copy[data-astro-cid-75ysl5lo]{gap:var(--space-4);justify-items:start;display:grid}.copy[data-astro-cid-75ysl5lo] h1[data-astro-cid-75ysl5lo]{max-width:18ch}.media[data-astro-cid-75ysl5lo] img{aspect-ratio:4/3;object-fit:cover;border-radius:var(--radius-l);width:100%}@media (width>=1100px){.has-image[data-astro-cid-75ysl5lo] .grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-8);grid-template-columns:1.1fr 1fr}}\n.cta[data-astro-cid-hwvj6ntz]{padding-block:var(--space-8)}.inner[data-astro-cid-hwvj6ntz]{gap:var(--space-6);align-items:end;display:grid}.copy[data-astro-cid-hwvj6ntz]{gap:var(--space-4);max-width:760px;display:grid}@media (width>=1100px){.inner[data-astro-cid-hwvj6ntz]{grid-template-columns:1.2fr 1fr}.btn-row[data-astro-cid-hwvj6ntz]{justify-content:flex-end}}\n"},{"type":"external","src":"_astro/about.C_GFN2_t.css"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".box[data-astro-cid-znuz4gjs]{gap:var(--space-5);max-width:480px;padding:var(--space-6);margin-inline:auto;display:grid}.box[data-astro-cid-znuz4gjs] h1[data-astro-cid-znuz4gjs]{font-size:var(--fs-title)}.box[data-astro-cid-znuz4gjs] form{gap:var(--space-4);display:grid}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/account/forgot-password","isIndex":false,"type":"page","pattern":"^\\/account\\/forgot-password\\/?$","segments":[[{"content":"account","dynamic":false,"spread":false}],[{"content":"forgot-password","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/account/forgot-password.astro","pathname":"/account/forgot-password","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".box[data-astro-cid-znuz4gjs]{gap:var(--space-5);max-width:480px;padding:var(--space-6);margin-inline:auto;display:grid}.box[data-astro-cid-znuz4gjs] h1[data-astro-cid-znuz4gjs]{font-size:var(--fs-title)}.box[data-astro-cid-znuz4gjs] form{gap:var(--space-4);display:grid}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/account/login","isIndex":false,"type":"page","pattern":"^\\/account\\/login\\/?$","segments":[[{"content":"account","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/account/login.astro","pathname":"/account/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[],"routeData":{"route":"/account/logout","isIndex":false,"type":"endpoint","pattern":"^\\/account\\/logout\\/?$","segments":[[{"content":"account","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/account/logout.ts","pathname":"/account/logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".box[data-astro-cid-znuz4gjs]{gap:var(--space-5);max-width:480px;padding:var(--space-6);margin-inline:auto;display:grid}.box[data-astro-cid-znuz4gjs] h1[data-astro-cid-znuz4gjs]{font-size:var(--fs-title)}.box[data-astro-cid-znuz4gjs] form{gap:var(--space-4);display:grid}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/account/register","isIndex":false,"type":"page","pattern":"^\\/account\\/register\\/?$","segments":[[{"content":"account","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/account/register.astro","pathname":"/account/register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".box[data-astro-cid-znuz4gjs]{gap:var(--space-5);max-width:480px;padding:var(--space-6);margin-inline:auto;display:grid}.box[data-astro-cid-znuz4gjs] h1[data-astro-cid-znuz4gjs]{font-size:var(--fs-title)}.box[data-astro-cid-znuz4gjs] form{gap:var(--space-4);display:grid}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/account/reset-password","isIndex":false,"type":"page","pattern":"^\\/account\\/reset-password\\/?$","segments":[[{"content":"account","dynamic":false,"spread":false}],[{"content":"reset-password","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/account/reset-password.astro","pathname":"/account/reset-password","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"external","src":"_astro/MembershipCard.DKgBbw9p.css"},{"type":"inline","content":".acct[data-astro-cid-6hujh7qn]{gap:var(--space-6);max-width:calc(1200px + 2 * var(--gutter));display:grid}.head[data-astro-cid-6hujh7qn]{justify-content:space-between;align-items:end;gap:var(--space-4);flex-wrap:wrap;display:flex}.head[data-astro-cid-6hujh7qn] h1[data-astro-cid-6hujh7qn]{font-size:var(--fs-title)}.grid-a[data-astro-cid-6hujh7qn]{gap:var(--space-6);align-items:center;display:grid}.card-col[data-astro-cid-6hujh7qn]{gap:var(--space-3);justify-items:start;display:grid}.stats[data-astro-cid-6hujh7qn]{gap:var(--space-4);grid-template-columns:repeat(2,minmax(0,1fr));margin:0;display:grid}.stats[data-astro-cid-6hujh7qn] div[data-astro-cid-6hujh7qn]{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:var(--space-4) var(--space-5);align-content:start;gap:2px;display:grid}.stats[data-astro-cid-6hujh7qn] dt[data-astro-cid-6hujh7qn]{font-size:var(--fs-small);color:var(--ink-3)}.stats[data-astro-cid-6hujh7qn] dd[data-astro-cid-6hujh7qn]{letter-spacing:-.02em;font-variant-numeric:tabular-nums;margin:0;font-size:clamp(1.375rem,1.1rem + 1vw,2rem);font-weight:800}@media (width>=960px){.grid-a[data-astro-cid-6hujh7qn]{gap:var(--space-7);grid-template-columns:minmax(320px,440px) 1fr}}.empty[data-astro-cid-6hujh7qn],.help[data-astro-cid-6hujh7qn]{gap:var(--space-3);justify-items:start;display:grid}.h-sm[data-astro-cid-6hujh7qn]{margin-bottom:var(--space-3);font-size:1.25rem}.ledger[data-astro-cid-6hujh7qn]{border-collapse:collapse;width:100%;font-size:var(--fs-small)}.ledger[data-astro-cid-6hujh7qn] th[data-astro-cid-6hujh7qn],.ledger[data-astro-cid-6hujh7qn] td[data-astro-cid-6hujh7qn]{text-align:left;border-bottom:1px solid var(--line);padding:10px 8px}.ledger[data-astro-cid-6hujh7qn] th[data-astro-cid-6hujh7qn]{color:var(--ink-3);font-weight:600}.r[data-astro-cid-6hujh7qn]{font-variant-numeric:tabular-nums;white-space:nowrap;text-align:right!important}.plus[data-astro-cid-6hujh7qn]{color:var(--ok);font-weight:700}.minus[data-astro-cid-6hujh7qn]{color:var(--danger);font-weight:700}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/account","isIndex":true,"type":"page","pattern":"^\\/account\\/?$","segments":[[{"content":"account","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/account/index.astro","pathname":"/account","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".box[data-astro-cid-znuz4gjs]{gap:var(--space-5);max-width:480px;padding:var(--space-6);margin-inline:auto;display:grid}.box[data-astro-cid-znuz4gjs] h1[data-astro-cid-znuz4gjs]{font-size:var(--fs-title)}.box[data-astro-cid-znuz4gjs] form{gap:var(--space-4);display:grid}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/admin/login","isIndex":false,"type":"page","pattern":"^\\/admin\\/login\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/login.astro","pathname":"/admin/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"external","src":"_astro/Admin.C51T2cWw.css"}],"routeData":{"route":"/admin/members/new","isIndex":false,"type":"page","pattern":"^\\/admin\\/members\\/new\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"members","dynamic":false,"spread":false}],[{"content":"new","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/members/new.astro","pathname":"/admin/members/new","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"external","src":"_astro/Admin.C51T2cWw.css"},{"type":"external","src":"_astro/MembershipCard.DKgBbw9p.css"}],"routeData":{"route":"/admin/members/[id]","isIndex":false,"type":"page","pattern":"^\\/admin\\/members\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"members","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/admin/members/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"external","src":"_astro/Admin.C51T2cWw.css"}],"routeData":{"route":"/admin/members","isIndex":true,"type":"page","pattern":"^\\/admin\\/members\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"members","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/members/index.astro","pathname":"/admin/members","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"external","src":"_astro/Admin.C51T2cWw.css"},{"type":"external","src":"_astro/MembershipCard.DKgBbw9p.css"}],"routeData":{"route":"/admin/r/[resource]/[id]","isIndex":false,"type":"page","pattern":"^\\/admin\\/r\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"r","dynamic":false,"spread":false}],[{"content":"resource","dynamic":true,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["resource","id"],"component":"src/pages/admin/r/[resource]/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"external","src":"_astro/Admin.C51T2cWw.css"}],"routeData":{"route":"/admin/r/[resource]","isIndex":true,"type":"page","pattern":"^\\/admin\\/r\\/([^/]+?)\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"r","dynamic":false,"spread":false}],[{"content":"resource","dynamic":true,"spread":false}]],"params":["resource"],"component":"src/pages/admin/r/[resource]/index.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"external","src":"_astro/Admin.C51T2cWw.css"},{"type":"external","src":"_astro/MembershipCard.DKgBbw9p.css"}],"routeData":{"route":"/admin/settings","isIndex":false,"type":"page","pattern":"^\\/admin\\/settings\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/settings.astro","pathname":"/admin/settings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"external","src":"_astro/Admin.C51T2cWw.css"}],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[],"routeData":{"route":"/api/apply","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/apply\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"apply","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/apply.ts","pathname":"/api/apply","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[],"routeData":{"route":"/api/enquiry","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/enquiry\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"enquiry","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/enquiry.ts","pathname":"/api/enquiry","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[],"routeData":{"route":"/api/health","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/health\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"health","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/health.ts","pathname":"/api/health","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[],"routeData":{"route":"/api/membership","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/membership\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"membership","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/membership.ts","pathname":"/api/membership","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[],"routeData":{"route":"/api/pc/build","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/pc\\/build\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"pc","dynamic":false,"spread":false}],[{"content":"build","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/pc/build.ts","pathname":"/api/pc/build","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".crumbs[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld]{font-size:var(--fs-small);color:var(--ink-3);flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;display:flex}.crumbs[data-astro-cid-vx4iavld] li[data-astro-cid-vx4iavld]+li[data-astro-cid-vx4iavld]:before{content:\"/\";opacity:.6;margin-right:6px}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--ink-2);text-decoration:none}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]:hover{text-decoration:underline}.crumbs[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:var(--ink);font-weight:600}.dark[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld],.dark[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--on-night-2)}.dark[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:#fff}\n.cta[data-astro-cid-hwvj6ntz]{padding-block:var(--space-8)}.inner[data-astro-cid-hwvj6ntz]{gap:var(--space-6);align-items:end;display:grid}.copy[data-astro-cid-hwvj6ntz]{gap:var(--space-4);max-width:760px;display:grid}@media (width>=1100px){.inner[data-astro-cid-hwvj6ntz]{grid-template-columns:1.2fr 1fr}.btn-row[data-astro-cid-hwvj6ntz]{justify-content:flex-end}}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"},{"type":"inline","content":".head[data-astro-cid-zg7dkzxc]{background:var(--surface);border-bottom:1px solid var(--line);padding-bottom:0}.narrow[data-astro-cid-zg7dkzxc]{max-width:calc(780px + 2 * var(--gutter))}.head[data-astro-cid-zg7dkzxc] h1[data-astro-cid-zg7dkzxc]{font-size:clamp(2rem,1.4rem + 2.6vw,3.5rem)}.cover[data-astro-cid-zg7dkzxc]{max-width:calc(1200px + 2 * var(--gutter));margin-top:var(--space-7);transform:translateY(var(--space-6))}.cover[data-astro-cid-zg7dkzxc] img{aspect-ratio:2;object-fit:cover;border-radius:var(--radius-l);width:100%}.body[data-astro-cid-zg7dkzxc]{padding-top:var(--space-7);gap:var(--space-7);display:grid}.prose[data-astro-cid-zg7dkzxc]{font-size:var(--fs-body)}.rel[data-astro-cid-zg7dkzxc] h2[data-astro-cid-zg7dkzxc]{margin-bottom:var(--space-4);font-size:1.25rem}.rel[data-astro-cid-zg7dkzxc] ul[data-astro-cid-zg7dkzxc]{gap:var(--space-4);margin:0;padding:0;list-style:none;display:grid}.rel[data-astro-cid-zg7dkzxc] li[data-astro-cid-zg7dkzxc]{gap:2px;display:grid}.more-h[data-astro-cid-zg7dkzxc]{margin-bottom:var(--space-5)}.more[data-astro-cid-zg7dkzxc]{gap:var(--space-4);margin:0;padding:0;list-style:none;display:grid}.more[data-astro-cid-zg7dkzxc] li[data-astro-cid-zg7dkzxc]{padding-bottom:var(--space-4);border-bottom:1px solid var(--line);gap:2px;display:grid}.more[data-astro-cid-zg7dkzxc] a[data-astro-cid-zg7dkzxc]{font-size:1.125rem;font-weight:650}\n"}],"routeData":{"route":"/blog/[slug]","isIndex":false,"type":"page","pattern":"^\\/blog\\/([^/]+?)\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/blog/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".crumbs[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld]{font-size:var(--fs-small);color:var(--ink-3);flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;display:flex}.crumbs[data-astro-cid-vx4iavld] li[data-astro-cid-vx4iavld]+li[data-astro-cid-vx4iavld]:before{content:\"/\";opacity:.6;margin-right:6px}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--ink-2);text-decoration:none}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]:hover{text-decoration:underline}.crumbs[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:var(--ink);font-weight:600}.dark[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld],.dark[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--on-night-2)}.dark[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:#fff}\n.page-hero[data-astro-cid-75ysl5lo]{padding-block:var(--space-7) var(--space-8);background:var(--surface);border-bottom:1px solid var(--line)}.grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-6);align-items:center;display:grid}.copy[data-astro-cid-75ysl5lo]{gap:var(--space-4);justify-items:start;display:grid}.copy[data-astro-cid-75ysl5lo] h1[data-astro-cid-75ysl5lo]{max-width:18ch}.media[data-astro-cid-75ysl5lo] img{aspect-ratio:4/3;object-fit:cover;border-radius:var(--radius-l);width:100%}@media (width>=1100px){.has-image[data-astro-cid-75ysl5lo] .grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-8);grid-template-columns:1.1fr 1fr}}\n.lead[data-astro-cid-x255k2k2]{gap:var(--space-5);color:inherit;margin-bottom:var(--space-8);align-items:center;text-decoration:none;display:grid}.lead[data-astro-cid-x255k2k2] img{aspect-ratio:16/9;object-fit:cover;border-radius:var(--radius-l);width:100%}.lead-body[data-astro-cid-x255k2k2]{gap:var(--space-3);display:grid}.lead[data-astro-cid-x255k2k2]:hover h2[data-astro-cid-x255k2k2],.post[data-astro-cid-x255k2k2]:hover h2[data-astro-cid-x255k2k2]{color:var(--accent);text-decoration:underline}@media (width>=1024px){.lead[data-astro-cid-x255k2k2]{gap:var(--space-7);grid-template-columns:1.3fr 1fr}}.posts[data-astro-cid-x255k2k2]{gap:var(--space-7) var(--space-5);grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));margin:0;padding:0;list-style:none;display:grid}.post[data-astro-cid-x255k2k2]{gap:var(--space-3);color:inherit;text-decoration:none;display:grid}.post[data-astro-cid-x255k2k2] img{aspect-ratio:16/10;object-fit:cover;border-radius:var(--radius);width:100%}.h-post[data-astro-cid-x255k2k2]{font-size:1.25rem}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".crumbs[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld]{font-size:var(--fs-small);color:var(--ink-3);flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;display:flex}.crumbs[data-astro-cid-vx4iavld] li[data-astro-cid-vx4iavld]+li[data-astro-cid-vx4iavld]:before{content:\"/\";opacity:.6;margin-right:6px}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--ink-2);text-decoration:none}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]:hover{text-decoration:underline}.crumbs[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:var(--ink);font-weight:600}.dark[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld],.dark[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--on-night-2)}.dark[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:#fff}\n.stepform[data-astro-cid-u5ipmuwy]{gap:var(--space-5);min-width:0;display:grid}.stepform[data-astro-cid-u5ipmuwy]>*{min-width:0}.stepform[data-astro-cid-u5ipmuwy] fieldset{gap:var(--space-4);border:0;min-width:0;margin:0;padding:0;display:grid}.stepform[data-astro-cid-u5ipmuwy] fieldset>legend{margin-bottom:var(--space-2);padding:0;font-size:1.25rem;font-weight:750}.stepform[data-astro-cid-u5ipmuwy] .two{gap:var(--space-4);display:grid}@media (width>=560px){.stepform[data-astro-cid-u5ipmuwy] .two{grid-template-columns:1fr 1fr}}.progress-meta[data-astro-cid-u5ipmuwy]{font-size:var(--fs-small);color:var(--ink-2);justify-content:space-between;margin-bottom:8px;font-weight:650;display:flex}.bar[data-astro-cid-u5ipmuwy]{background:var(--line);border-radius:999px;height:6px;overflow:hidden}.bar[data-astro-cid-u5ipmuwy] span[data-astro-cid-u5ipmuwy]{background:var(--accent);border-radius:inherit;width:0;height:100%;transition:width .3s;display:block}.nav[data-astro-cid-u5ipmuwy]{gap:var(--space-3);justify-content:space-between;display:flex}.nav[data-astro-cid-u5ipmuwy] [data-astro-cid-u5ipmuwy][data-next],.nav[data-astro-cid-u5ipmuwy] [data-astro-cid-u5ipmuwy][data-submit]{margin-left:auto}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"},{"type":"external","src":"_astro/_slug_.BKi2wgMm.css"}],"routeData":{"route":"/careers/[slug]","isIndex":false,"type":"page","pattern":"^\\/careers\\/([^/]+?)\\/?$","segments":[[{"content":"careers","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/careers/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".crumbs[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld]{font-size:var(--fs-small);color:var(--ink-3);flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;display:flex}.crumbs[data-astro-cid-vx4iavld] li[data-astro-cid-vx4iavld]+li[data-astro-cid-vx4iavld]:before{content:\"/\";opacity:.6;margin-right:6px}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--ink-2);text-decoration:none}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]:hover{text-decoration:underline}.crumbs[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:var(--ink);font-weight:600}.dark[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld],.dark[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--on-night-2)}.dark[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:#fff}\n.c-hero[data-astro-cid-usty5cq5]{isolation:isolate;color:#fff;background:var(--night);align-items:end;min-height:min(80svh,820px);display:grid;position:relative;overflow:hidden}.c-hero[data-astro-cid-usty5cq5] .bg{object-fit:cover;z-index:-2;width:100%;height:100%;position:absolute;inset:0}.c-hero[data-astro-cid-usty5cq5]:after{content:\"\";z-index:-1;background:linear-gradient(#0b172466,#0b1724f2);position:absolute;inset:0}.inner[data-astro-cid-usty5cq5]{gap:var(--space-5);padding-block:var(--space-8) var(--space-7);justify-items:start;display:grid}.inner[data-astro-cid-usty5cq5] h1[data-astro-cid-usty5cq5]{max-width:16ch}.inner[data-astro-cid-usty5cq5] .lede[data-astro-cid-usty5cq5]{color:#dde6ef}.facts[data-astro-cid-usty5cq5]{gap:var(--space-4);width:100%;max-width:820px;padding-top:var(--space-4);border-top:1px solid #ffffff40;grid-template-columns:repeat(3,minmax(0,1fr));margin:0;display:grid}.facts[data-astro-cid-usty5cq5] div[data-astro-cid-usty5cq5]{flex-direction:column-reverse;justify-content:flex-end;display:flex}.facts[data-astro-cid-usty5cq5] dt[data-astro-cid-usty5cq5]{font-size:var(--fs-small);color:#c9d6e3}.facts[data-astro-cid-usty5cq5] dd[data-astro-cid-usty5cq5]{margin:0;font-size:clamp(1rem,.9rem + .6vw,1.375rem);font-weight:750}@media (width>=1024px){.c-hero[data-astro-cid-usty5cq5]{min-height:calc(100svh - var(--header-h))}}.roles[data-astro-cid-usty5cq5]{gap:var(--space-4);margin:0;padding:0;list-style:none;display:grid}.role[data-astro-cid-usty5cq5]{gap:var(--space-4);padding:var(--space-5);background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);color:inherit;align-items:center;text-decoration:none;display:grid}.role[data-astro-cid-usty5cq5]:hover{border-color:var(--ink)}.role[data-astro-cid-usty5cq5] h3[data-astro-cid-usty5cq5]{font-size:1.375rem}.role[data-astro-cid-usty5cq5] dl[data-astro-cid-usty5cq5]{gap:var(--space-3);grid-template-columns:repeat(auto-fit,minmax(140px,1fr));margin:0;display:grid}.role[data-astro-cid-usty5cq5] dl[data-astro-cid-usty5cq5] div[data-astro-cid-usty5cq5]{flex-direction:column-reverse;justify-content:flex-end;display:flex}.role[data-astro-cid-usty5cq5] dt[data-astro-cid-usty5cq5]{font-size:var(--fs-small);color:var(--ink-3)}.role[data-astro-cid-usty5cq5] dd[data-astro-cid-usty5cq5]{margin:0;font-weight:650}.go[data-astro-cid-usty5cq5]{color:var(--accent);display:none}@media (width>=900px){.role[data-astro-cid-usty5cq5]{grid-template-columns:1.2fr 1.5fr auto}.go[data-astro-cid-usty5cq5]{display:block}}.empty[data-astro-cid-usty5cq5]{gap:var(--space-3);max-width:760px;display:grid}.dir[data-astro-cid-usty5cq5]{gap:var(--space-7);display:grid}.h-sm[data-astro-cid-usty5cq5]{margin-bottom:var(--space-4);font-size:1.5rem}.hire[data-astro-cid-usty5cq5]{counter-reset:h;margin:0;padding:0;list-style:none;display:grid}.hire[data-astro-cid-usty5cq5] li[data-astro-cid-usty5cq5]{counter-increment:h;gap:2px var(--space-3);padding:var(--space-4) 0;border-top:1px solid var(--line);grid-template-columns:2.25rem 1fr auto;align-items:baseline;display:grid}.hire[data-astro-cid-usty5cq5] li[data-astro-cid-usty5cq5]:before{content:counter(h);color:var(--accent);grid-row:span 2;font-size:1.25rem;font-weight:800}.hire[data-astro-cid-usty5cq5] span[data-astro-cid-usty5cq5]{color:var(--ink-2);font-size:var(--fs-small);grid-column:2}.hire[data-astro-cid-usty5cq5] em[data-astro-cid-usty5cq5]{font-style:normal;font-size:var(--fs-small);color:var(--ink-2);white-space:nowrap;grid-area:1/3;font-weight:650}@media (width>=1024px){.dir[data-astro-cid-usty5cq5]{gap:var(--space-8);grid-template-columns:1fr 1fr}}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/careers","isIndex":true,"type":"page","pattern":"^\\/careers\\/?$","segments":[[{"content":"careers","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/careers/index.astro","pathname":"/careers","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".crumbs[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld]{font-size:var(--fs-small);color:var(--ink-3);flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;display:flex}.crumbs[data-astro-cid-vx4iavld] li[data-astro-cid-vx4iavld]+li[data-astro-cid-vx4iavld]:before{content:\"/\";opacity:.6;margin-right:6px}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--ink-2);text-decoration:none}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]:hover{text-decoration:underline}.crumbs[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:var(--ink);font-weight:600}.dark[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld],.dark[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--on-night-2)}.dark[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:#fff}\n.stepform[data-astro-cid-u5ipmuwy]{gap:var(--space-5);min-width:0;display:grid}.stepform[data-astro-cid-u5ipmuwy]>*{min-width:0}.stepform[data-astro-cid-u5ipmuwy] fieldset{gap:var(--space-4);border:0;min-width:0;margin:0;padding:0;display:grid}.stepform[data-astro-cid-u5ipmuwy] fieldset>legend{margin-bottom:var(--space-2);padding:0;font-size:1.25rem;font-weight:750}.stepform[data-astro-cid-u5ipmuwy] .two{gap:var(--space-4);display:grid}@media (width>=560px){.stepform[data-astro-cid-u5ipmuwy] .two{grid-template-columns:1fr 1fr}}.progress-meta[data-astro-cid-u5ipmuwy]{font-size:var(--fs-small);color:var(--ink-2);justify-content:space-between;margin-bottom:8px;font-weight:650;display:flex}.bar[data-astro-cid-u5ipmuwy]{background:var(--line);border-radius:999px;height:6px;overflow:hidden}.bar[data-astro-cid-u5ipmuwy] span[data-astro-cid-u5ipmuwy]{background:var(--accent);border-radius:inherit;width:0;height:100%;transition:width .3s;display:block}.nav[data-astro-cid-u5ipmuwy]{gap:var(--space-3);justify-content:space-between;display:flex}.nav[data-astro-cid-u5ipmuwy] [data-astro-cid-u5ipmuwy][data-next],.nav[data-astro-cid-u5ipmuwy] [data-astro-cid-u5ipmuwy][data-submit]{margin-left:auto}\n.grid-c[data-astro-cid-6bfsojfh]{gap:var(--space-7);display:grid}.info[data-astro-cid-6bfsojfh]{gap:var(--space-5);align-content:start;display:grid}.nap[data-astro-cid-6bfsojfh]{padding:var(--space-5);background:var(--surface);border:1px solid var(--line);border-left:4px solid var(--accent);border-radius:var(--radius-s);max-width:460px;font-style:normal;line-height:1.55;display:grid}.nap[data-astro-cid-6bfsojfh] strong[data-astro-cid-6bfsojfh]{margin-bottom:4px;font-size:1.25rem}.lines[data-astro-cid-6bfsojfh]{gap:var(--space-3);margin:0;display:grid}.lines[data-astro-cid-6bfsojfh] div[data-astro-cid-6bfsojfh]{gap:var(--space-3);grid-template-columns:130px 1fr;display:grid}.lines[data-astro-cid-6bfsojfh] dt[data-astro-cid-6bfsojfh]{color:var(--ink-3);font-size:var(--fs-small);padding-top:2px}.lines[data-astro-cid-6bfsojfh] dd[data-astro-cid-6bfsojfh]{font-variant-numeric:tabular-nums;margin:0;font-weight:600}.form-card[data-astro-cid-6bfsojfh]{gap:var(--space-5);align-content:start;display:grid}.form-card[data-astro-cid-6bfsojfh] h2[data-astro-cid-6bfsojfh]{scroll-margin-top:calc(var(--header-h) + 16px);font-size:1.5rem}.map-wrap[data-astro-cid-6bfsojfh] iframe[data-astro-cid-6bfsojfh]{background:var(--line);border:0;width:100%;height:clamp(320px,45vw,560px);display:block}@media (width>=1100px){.grid-c[data-astro-cid-6bfsojfh]{gap:var(--space-8);grid-template-columns:1fr minmax(420px,560px)}}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".crumbs[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld]{font-size:var(--fs-small);color:var(--ink-3);flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;display:flex}.crumbs[data-astro-cid-vx4iavld] li[data-astro-cid-vx4iavld]+li[data-astro-cid-vx4iavld]:before{content:\"/\";opacity:.6;margin-right:6px}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--ink-2);text-decoration:none}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]:hover{text-decoration:underline}.crumbs[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:var(--ink);font-weight:600}.dark[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld],.dark[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--on-night-2)}.dark[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:#fff}\n.faqs[data-astro-cid-bppbuphv]{border-top:1px solid var(--line)}details[data-astro-cid-bppbuphv]{border-bottom:1px solid var(--line)}summary[data-astro-cid-bppbuphv]{justify-content:space-between;align-items:center;gap:var(--space-4);padding:var(--space-5) 0;cursor:pointer;min-height:48px;list-style:none;display:flex}summary[data-astro-cid-bppbuphv]::-webkit-details-marker{display:none}.q[data-astro-cid-bppbuphv]{font-weight:700;line-height:1.35}.pm[data-astro-cid-bppbuphv]{border:1.5px solid var(--line-strong);border-radius:50%;flex:none;width:28px;height:28px;position:relative}.pm[data-astro-cid-bppbuphv]:before,.pm[data-astro-cid-bppbuphv]:after{content:\"\";background:var(--ink);width:11px;height:1.8px;transition:transform .2s;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.pm[data-astro-cid-bppbuphv]:after{transform:translate(-50%,-50%)rotate(90deg)}details[data-astro-cid-bppbuphv][open] .pm[data-astro-cid-bppbuphv]:after{transform:translate(-50%,-50%)rotate(0)}details[data-astro-cid-bppbuphv] p[data-astro-cid-bppbuphv]{padding-bottom:var(--space-5);color:var(--ink-2);max-width:70ch}\n"},{"type":"external","src":"_astro/custom-pc-builder.DIcBSVS3.css"},{"type":"inline","content":".cta[data-astro-cid-hwvj6ntz]{padding-block:var(--space-8)}.inner[data-astro-cid-hwvj6ntz]{gap:var(--space-6);align-items:end;display:grid}.copy[data-astro-cid-hwvj6ntz]{gap:var(--space-4);max-width:760px;display:grid}@media (width>=1100px){.inner[data-astro-cid-hwvj6ntz]{grid-template-columns:1.2fr 1fr}.btn-row[data-astro-cid-hwvj6ntz]{justify-content:flex-end}}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/custom-pc-builder","isIndex":false,"type":"page","pattern":"^\\/custom-pc-builder\\/?$","segments":[[{"content":"custom-pc-builder","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/custom-pc-builder.astro","pathname":"/custom-pc-builder","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".crumbs[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld]{font-size:var(--fs-small);color:var(--ink-3);flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;display:flex}.crumbs[data-astro-cid-vx4iavld] li[data-astro-cid-vx4iavld]+li[data-astro-cid-vx4iavld]:before{content:\"/\";opacity:.6;margin-right:6px}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--ink-2);text-decoration:none}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]:hover{text-decoration:underline}.crumbs[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:var(--ink);font-weight:600}.dark[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld],.dark[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--on-night-2)}.dark[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:#fff}\n.faqs[data-astro-cid-bppbuphv]{border-top:1px solid var(--line)}details[data-astro-cid-bppbuphv]{border-bottom:1px solid var(--line)}summary[data-astro-cid-bppbuphv]{justify-content:space-between;align-items:center;gap:var(--space-4);padding:var(--space-5) 0;cursor:pointer;min-height:48px;list-style:none;display:flex}summary[data-astro-cid-bppbuphv]::-webkit-details-marker{display:none}.q[data-astro-cid-bppbuphv]{font-weight:700;line-height:1.35}.pm[data-astro-cid-bppbuphv]{border:1.5px solid var(--line-strong);border-radius:50%;flex:none;width:28px;height:28px;position:relative}.pm[data-astro-cid-bppbuphv]:before,.pm[data-astro-cid-bppbuphv]:after{content:\"\";background:var(--ink);width:11px;height:1.8px;transition:transform .2s;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.pm[data-astro-cid-bppbuphv]:after{transform:translate(-50%,-50%)rotate(90deg)}details[data-astro-cid-bppbuphv][open] .pm[data-astro-cid-bppbuphv]:after{transform:translate(-50%,-50%)rotate(0)}details[data-astro-cid-bppbuphv] p[data-astro-cid-bppbuphv]{padding-bottom:var(--space-5);color:var(--ink-2);max-width:70ch}\n.page-hero[data-astro-cid-75ysl5lo]{padding-block:var(--space-7) var(--space-8);background:var(--surface);border-bottom:1px solid var(--line)}.grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-6);align-items:center;display:grid}.copy[data-astro-cid-75ysl5lo]{gap:var(--space-4);justify-items:start;display:grid}.copy[data-astro-cid-75ysl5lo] h1[data-astro-cid-75ysl5lo]{max-width:18ch}.media[data-astro-cid-75ysl5lo] img{aspect-ratio:4/3;object-fit:cover;border-radius:var(--radius-l);width:100%}@media (width>=1100px){.has-image[data-astro-cid-75ysl5lo] .grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-8);grid-template-columns:1.1fr 1fr}}\n.cta[data-astro-cid-hwvj6ntz]{padding-block:var(--space-8)}.inner[data-astro-cid-hwvj6ntz]{gap:var(--space-6);align-items:end;display:grid}.copy[data-astro-cid-hwvj6ntz]{gap:var(--space-4);max-width:760px;display:grid}@media (width>=1100px){.inner[data-astro-cid-hwvj6ntz]{grid-template-columns:1.2fr 1fr}.btn-row[data-astro-cid-hwvj6ntz]{justify-content:flex-end}}\n.faq-page[data-astro-cid-vagwt47q]{gap:var(--space-7);display:grid}.toc[data-astro-cid-vagwt47q] ul[data-astro-cid-vagwt47q]{margin:var(--space-3) 0 0;gap:var(--space-2);flex-wrap:wrap;padding:0;list-style:none;display:flex}.toc[data-astro-cid-vagwt47q] a[data-astro-cid-vagwt47q]{border:1px solid var(--line);background:var(--surface);font-weight:600;font-size:var(--fs-small);color:var(--ink);border-radius:999px;padding:8px 14px;text-decoration:none;display:inline-block}.groups[data-astro-cid-vagwt47q]{gap:var(--space-8);display:grid}.groups[data-astro-cid-vagwt47q] h2[data-astro-cid-vagwt47q]{margin-bottom:var(--space-4);scroll-margin-top:calc(var(--header-h) + 16px)}.svc[data-astro-cid-vagwt47q]{margin-top:var(--space-6)}.svc[data-astro-cid-vagwt47q] h3[data-astro-cid-vagwt47q]{margin-bottom:var(--space-2)}@media (width>=1100px){.faq-page[data-astro-cid-vagwt47q]{gap:var(--space-8);grid-template-columns:240px minmax(0,860px)}.toc[data-astro-cid-vagwt47q]{top:calc(var(--header-h) + 24px);align-self:start;position:sticky}.toc[data-astro-cid-vagwt47q] ul[data-astro-cid-vagwt47q]{flex-direction:column}}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/faq","isIndex":false,"type":"page","pattern":"^\\/faq\\/?$","segments":[[{"content":"faq","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faq.astro","pathname":"/faq","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".crumbs[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld]{font-size:var(--fs-small);color:var(--ink-3);flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;display:flex}.crumbs[data-astro-cid-vx4iavld] li[data-astro-cid-vx4iavld]+li[data-astro-cid-vx4iavld]:before{content:\"/\";opacity:.6;margin-right:6px}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--ink-2);text-decoration:none}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]:hover{text-decoration:underline}.crumbs[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:var(--ink);font-weight:600}.dark[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld],.dark[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--on-night-2)}.dark[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:#fff}\n.page-hero[data-astro-cid-75ysl5lo]{padding-block:var(--space-7) var(--space-8);background:var(--surface);border-bottom:1px solid var(--line)}.grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-6);align-items:center;display:grid}.copy[data-astro-cid-75ysl5lo]{gap:var(--space-4);justify-items:start;display:grid}.copy[data-astro-cid-75ysl5lo] h1[data-astro-cid-75ysl5lo]{max-width:18ch}.media[data-astro-cid-75ysl5lo] img{aspect-ratio:4/3;object-fit:cover;border-radius:var(--radius-l);width:100%}@media (width>=1100px){.has-image[data-astro-cid-75ysl5lo] .grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-8);grid-template-columns:1.1fr 1fr}}\n.cta[data-astro-cid-hwvj6ntz]{padding-block:var(--space-8)}.inner[data-astro-cid-hwvj6ntz]{gap:var(--space-6);align-items:end;display:grid}.copy[data-astro-cid-hwvj6ntz]{gap:var(--space-4);max-width:760px;display:grid}@media (width>=1100px){.inner[data-astro-cid-hwvj6ntz]{grid-template-columns:1.2fr 1fr}.btn-row[data-astro-cid-hwvj6ntz]{justify-content:flex-end}}\n.gal[data-astro-cid-3mhbem3k]{columns:3 320px;column-gap:var(--space-4);margin:0;padding:0;list-style:none}.gal[data-astro-cid-3mhbem3k] li[data-astro-cid-3mhbem3k]{break-inside:avoid;margin-bottom:var(--space-4)}figure[data-astro-cid-3mhbem3k]{gap:8px;margin:0;display:grid}figure[data-astro-cid-3mhbem3k] img{border-radius:var(--radius);width:100%}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/gallery","isIndex":false,"type":"page","pattern":"^\\/gallery\\/?$","segments":[[{"content":"gallery","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/gallery.astro","pathname":"/gallery","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".crumbs[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld]{font-size:var(--fs-small);color:var(--ink-3);flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;display:flex}.crumbs[data-astro-cid-vx4iavld] li[data-astro-cid-vx4iavld]+li[data-astro-cid-vx4iavld]:before{content:\"/\";opacity:.6;margin-right:6px}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--ink-2);text-decoration:none}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]:hover{text-decoration:underline}.crumbs[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:var(--ink);font-weight:600}.dark[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld],.dark[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--on-night-2)}.dark[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:#fff}\n.faqs[data-astro-cid-bppbuphv]{border-top:1px solid var(--line)}details[data-astro-cid-bppbuphv]{border-bottom:1px solid var(--line)}summary[data-astro-cid-bppbuphv]{justify-content:space-between;align-items:center;gap:var(--space-4);padding:var(--space-5) 0;cursor:pointer;min-height:48px;list-style:none;display:flex}summary[data-astro-cid-bppbuphv]::-webkit-details-marker{display:none}.q[data-astro-cid-bppbuphv]{font-weight:700;line-height:1.35}.pm[data-astro-cid-bppbuphv]{border:1.5px solid var(--line-strong);border-radius:50%;flex:none;width:28px;height:28px;position:relative}.pm[data-astro-cid-bppbuphv]:before,.pm[data-astro-cid-bppbuphv]:after{content:\"\";background:var(--ink);width:11px;height:1.8px;transition:transform .2s;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.pm[data-astro-cid-bppbuphv]:after{transform:translate(-50%,-50%)rotate(90deg)}details[data-astro-cid-bppbuphv][open] .pm[data-astro-cid-bppbuphv]:after{transform:translate(-50%,-50%)rotate(0)}details[data-astro-cid-bppbuphv] p[data-astro-cid-bppbuphv]{padding-bottom:var(--space-5);color:var(--ink-2);max-width:70ch}\n.page-hero[data-astro-cid-75ysl5lo]{padding-block:var(--space-7) var(--space-8);background:var(--surface);border-bottom:1px solid var(--line)}.grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-6);align-items:center;display:grid}.copy[data-astro-cid-75ysl5lo]{gap:var(--space-4);justify-items:start;display:grid}.copy[data-astro-cid-75ysl5lo] h1[data-astro-cid-75ysl5lo]{max-width:18ch}.media[data-astro-cid-75ysl5lo] img{aspect-ratio:4/3;object-fit:cover;border-radius:var(--radius-l);width:100%}@media (width>=1100px){.has-image[data-astro-cid-75ysl5lo] .grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-8);grid-template-columns:1.1fr 1fr}}\n"},{"type":"external","src":"_astro/MembershipCard.DKgBbw9p.css"},{"type":"inline","content":".cta[data-astro-cid-hwvj6ntz]{padding-block:var(--space-8)}.inner[data-astro-cid-hwvj6ntz]{gap:var(--space-6);align-items:end;display:grid}.copy[data-astro-cid-hwvj6ntz]{gap:var(--space-4);max-width:760px;display:grid}@media (width>=1100px){.inner[data-astro-cid-hwvj6ntz]{grid-template-columns:1.2fr 1fr}.btn-row[data-astro-cid-hwvj6ntz]{justify-content:flex-end}}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"},{"type":"inline","content":".plans[data-astro-cid-bixxm6oe]{gap:var(--space-6);grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr));align-items:start;margin:0;padding:0;list-style:none;display:grid}.plan[data-astro-cid-bixxm6oe]{gap:var(--space-5);padding:var(--space-5);background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-l);display:grid;position:relative}.plan[data-astro-cid-bixxm6oe].featured{border:2px solid var(--ink)}.badge[data-astro-cid-bixxm6oe]{top:-14px;left:var(--space-5);background:var(--ink);color:#fff;font-size:var(--fs-small);z-index:2;border-radius:999px;padding:4px 12px;font-weight:700;position:absolute}.plan[data-astro-cid-bixxm6oe] .vcard{max-width:none}.plan-body[data-astro-cid-bixxm6oe]{gap:var(--space-4);display:grid}.plan-body[data-astro-cid-bixxm6oe] h3[data-astro-cid-bixxm6oe]{font-size:1.375rem}.price[data-astro-cid-bixxm6oe]{flex-wrap:wrap;align-items:baseline;gap:8px;display:flex}.price[data-astro-cid-bixxm6oe] strong[data-astro-cid-bixxm6oe]{font-size:var(--fs-title);letter-spacing:-.03em;font-weight:800}.keys[data-astro-cid-bixxm6oe]{border-block:1px solid var(--line);padding-block:var(--space-4);grid-template-columns:repeat(3,1fr);margin:0;display:grid}.keys[data-astro-cid-bixxm6oe] div[data-astro-cid-bixxm6oe]{flex-direction:column-reverse;justify-content:flex-end;display:flex}.keys[data-astro-cid-bixxm6oe] dt[data-astro-cid-bixxm6oe]{font-size:var(--fs-small);color:var(--ink-3)}.keys[data-astro-cid-bixxm6oe] dd[data-astro-cid-bixxm6oe]{font-variant-numeric:tabular-nums;margin:0;font-size:1.25rem;font-weight:750}.note[data-astro-cid-bixxm6oe]{margin-top:var(--space-5);max-width:80ch}.mine[data-astro-cid-bixxm6oe]{padding:var(--space-3);background:var(--paper);border-radius:var(--radius-s)}.coins[data-astro-cid-bixxm6oe]{gap:var(--space-7);display:grid}.how[data-astro-cid-bixxm6oe]{gap:var(--space-4);counter-reset:h;margin:0;padding:0;list-style:none;display:grid}.how[data-astro-cid-bixxm6oe] li[data-astro-cid-bixxm6oe]{counter-increment:h;gap:2px var(--space-3);padding:var(--space-4) 0;border-top:1px solid #ffffff24;grid-template-columns:2.5rem 1fr;display:grid}.how[data-astro-cid-bixxm6oe] li[data-astro-cid-bixxm6oe]:before{content:counter(h);color:#9ec9ff;grid-row:span 2;font-size:1.5rem;font-weight:800}.how[data-astro-cid-bixxm6oe] span[data-astro-cid-bixxm6oe]{color:var(--on-night-2);font-size:var(--fs-small)}@media (width>=1024px){.coins[data-astro-cid-bixxm6oe]{gap:var(--space-8);grid-template-columns:1.1fr 1fr;align-items:center}}.faq-wrap[data-astro-cid-bixxm6oe]{gap:var(--space-5);max-width:960px;display:grid}\n"}],"routeData":{"route":"/membership","isIndex":false,"type":"page","pattern":"^\\/membership\\/?$","segments":[[{"content":"membership","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/membership.astro","pathname":"/membership","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[],"routeData":{"route":"/og/[...path]","isIndex":false,"type":"endpoint","pattern":"^\\/og(?:\\/(.*?))?\\/?$","segments":[[{"content":"og","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"src/pages/og/[...path].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[],"routeData":{"route":"/our-certificates","isIndex":false,"type":"page","pattern":"^\\/our-certificates\\/?$","segments":[[{"content":"our-certificates","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/our-certificates.astro","pathname":"/our-certificates","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".crumbs[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld]{font-size:var(--fs-small);color:var(--ink-3);flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;display:flex}.crumbs[data-astro-cid-vx4iavld] li[data-astro-cid-vx4iavld]+li[data-astro-cid-vx4iavld]:before{content:\"/\";opacity:.6;margin-right:6px}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--ink-2);text-decoration:none}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]:hover{text-decoration:underline}.crumbs[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:var(--ink);font-weight:600}.dark[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld],.dark[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--on-night-2)}.dark[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:#fff}\n.page-hero[data-astro-cid-75ysl5lo]{padding-block:var(--space-7) var(--space-8);background:var(--surface);border-bottom:1px solid var(--line)}.grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-6);align-items:center;display:grid}.copy[data-astro-cid-75ysl5lo]{gap:var(--space-4);justify-items:start;display:grid}.copy[data-astro-cid-75ysl5lo] h1[data-astro-cid-75ysl5lo]{max-width:18ch}.media[data-astro-cid-75ysl5lo] img{aspect-ratio:4/3;object-fit:cover;border-radius:var(--radius-l);width:100%}@media (width>=1100px){.has-image[data-astro-cid-75ysl5lo] .grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-8);grid-template-columns:1.1fr 1fr}}\n.projects[data-astro-cid-pf5okai3]{gap:var(--space-6);grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr));margin:0;padding:0;list-style:none;display:grid}.proj[data-astro-cid-pf5okai3]{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden}.proj[data-astro-cid-pf5okai3] img{aspect-ratio:16/9;object-fit:cover;width:100%}.pb[data-astro-cid-pf5okai3]{padding:var(--space-5);gap:var(--space-3);display:grid}.pb[data-astro-cid-pf5okai3] h3[data-astro-cid-pf5okai3]{font-size:1.25rem}\n.cta[data-astro-cid-hwvj6ntz]{padding-block:var(--space-8)}.inner[data-astro-cid-hwvj6ntz]{gap:var(--space-6);align-items:end;display:grid}.copy[data-astro-cid-hwvj6ntz]{gap:var(--space-4);max-width:760px;display:grid}@media (width>=1100px){.inner[data-astro-cid-hwvj6ntz]{grid-template-columns:1.2fr 1fr}.btn-row[data-astro-cid-hwvj6ntz]{justify-content:flex-end}}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/portfolio/[category]","isIndex":false,"type":"page","pattern":"^\\/portfolio\\/([^/]+?)\\/?$","segments":[[{"content":"portfolio","dynamic":false,"spread":false}],[{"content":"category","dynamic":true,"spread":false}]],"params":["category"],"component":"src/pages/portfolio/[category].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".crumbs[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld]{font-size:var(--fs-small);color:var(--ink-3);flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;display:flex}.crumbs[data-astro-cid-vx4iavld] li[data-astro-cid-vx4iavld]+li[data-astro-cid-vx4iavld]:before{content:\"/\";opacity:.6;margin-right:6px}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--ink-2);text-decoration:none}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]:hover{text-decoration:underline}.crumbs[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:var(--ink);font-weight:600}.dark[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld],.dark[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--on-night-2)}.dark[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:#fff}\n.page-hero[data-astro-cid-75ysl5lo]{padding-block:var(--space-7) var(--space-8);background:var(--surface);border-bottom:1px solid var(--line)}.grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-6);align-items:center;display:grid}.copy[data-astro-cid-75ysl5lo]{gap:var(--space-4);justify-items:start;display:grid}.copy[data-astro-cid-75ysl5lo] h1[data-astro-cid-75ysl5lo]{max-width:18ch}.media[data-astro-cid-75ysl5lo] img{aspect-ratio:4/3;object-fit:cover;border-radius:var(--radius-l);width:100%}@media (width>=1100px){.has-image[data-astro-cid-75ysl5lo] .grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-8);grid-template-columns:1.1fr 1fr}}\n.projects[data-astro-cid-pf5okai3]{gap:var(--space-6);grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr));margin:0;padding:0;list-style:none;display:grid}.proj[data-astro-cid-pf5okai3]{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden}.proj[data-astro-cid-pf5okai3] img{aspect-ratio:16/9;object-fit:cover;width:100%}.pb[data-astro-cid-pf5okai3]{padding:var(--space-5);gap:var(--space-3);display:grid}.pb[data-astro-cid-pf5okai3] h3[data-astro-cid-pf5okai3]{font-size:1.25rem}\n.cta[data-astro-cid-hwvj6ntz]{padding-block:var(--space-8)}.inner[data-astro-cid-hwvj6ntz]{gap:var(--space-6);align-items:end;display:grid}.copy[data-astro-cid-hwvj6ntz]{gap:var(--space-4);max-width:760px;display:grid}@media (width>=1100px){.inner[data-astro-cid-hwvj6ntz]{grid-template-columns:1.2fr 1fr}.btn-row[data-astro-cid-hwvj6ntz]{justify-content:flex-end}}\n.cats[data-astro-cid-ght3iha2]{gap:var(--space-4);grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));margin:0;padding:0;list-style:none;display:grid}.cat[data-astro-cid-ght3iha2]{gap:var(--space-2);height:100%;padding:var(--space-5);background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);color:inherit;text-decoration:none;display:grid}.cat[data-astro-cid-ght3iha2]:hover{border-color:var(--ink)}.cat[data-astro-cid-ght3iha2] h2[data-astro-cid-ght3iha2]{font-size:1.25rem}.cat[data-astro-cid-ght3iha2] span[data-astro-cid-ght3iha2]{color:var(--accent);margin-top:var(--space-2);align-items:center;gap:6px;font-weight:650;display:inline-flex}.latest[data-astro-cid-ght3iha2]{margin-top:var(--space-8);gap:var(--space-5);display:grid}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/portfolio","isIndex":true,"type":"page","pattern":"^\\/portfolio\\/?$","segments":[[{"content":"portfolio","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/portfolio/index.astro","pathname":"/portfolio","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".crumbs[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld]{font-size:var(--fs-small);color:var(--ink-3);flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;display:flex}.crumbs[data-astro-cid-vx4iavld] li[data-astro-cid-vx4iavld]+li[data-astro-cid-vx4iavld]:before{content:\"/\";opacity:.6;margin-right:6px}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--ink-2);text-decoration:none}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]:hover{text-decoration:underline}.crumbs[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:var(--ink);font-weight:600}.dark[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld],.dark[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--on-night-2)}.dark[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:#fff}\n.page-hero[data-astro-cid-75ysl5lo]{padding-block:var(--space-7) var(--space-8);background:var(--surface);border-bottom:1px solid var(--line)}.grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-6);align-items:center;display:grid}.copy[data-astro-cid-75ysl5lo]{gap:var(--space-4);justify-items:start;display:grid}.copy[data-astro-cid-75ysl5lo] h1[data-astro-cid-75ysl5lo]{max-width:18ch}.media[data-astro-cid-75ysl5lo] img{aspect-ratio:4/3;object-fit:cover;border-radius:var(--radius-l);width:100%}@media (width>=1100px){.has-image[data-astro-cid-75ysl5lo] .grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-8);grid-template-columns:1.1fr 1fr}}\n.cta[data-astro-cid-hwvj6ntz]{padding-block:var(--space-8)}.inner[data-astro-cid-hwvj6ntz]{gap:var(--space-6);align-items:end;display:grid}.copy[data-astro-cid-hwvj6ntz]{gap:var(--space-4);max-width:760px;display:grid}@media (width>=1100px){.inner[data-astro-cid-hwvj6ntz]{grid-template-columns:1.2fr 1fr}.btn-row[data-astro-cid-hwvj6ntz]{justify-content:flex-end}}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"},{"type":"inline","content":".cats[data-astro-cid-rcy7iuhi]{gap:var(--space-2);margin-bottom:var(--space-6);flex-wrap:wrap;display:flex}.cats[data-astro-cid-rcy7iuhi] a[data-astro-cid-rcy7iuhi]{text-decoration:none}.cat[data-astro-cid-rcy7iuhi]+.cat[data-astro-cid-rcy7iuhi]{margin-top:var(--space-8)}.cat[data-astro-cid-rcy7iuhi] h2[data-astro-cid-rcy7iuhi]{margin-bottom:var(--space-5);scroll-margin-top:calc(var(--header-h) + 16px)}.grid-p[data-astro-cid-rcy7iuhi]{gap:var(--space-5);grid-template-columns:repeat(auto-fill,minmax(min(100%,280px),1fr));margin:0;padding:0;list-style:none;display:grid}.prod[data-astro-cid-rcy7iuhi]{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);grid-template-rows:auto 1fr;display:grid;overflow:hidden}.prod[data-astro-cid-rcy7iuhi] img{aspect-ratio:4/3;object-fit:cover;width:100%}.pb[data-astro-cid-rcy7iuhi]{padding:var(--space-5);gap:var(--space-3);align-content:start;justify-items:start;display:grid}.tags[data-astro-cid-rcy7iuhi]{gap:6px;display:flex}.price[data-astro-cid-rcy7iuhi]{align-items:baseline;gap:8px;display:flex}.price[data-astro-cid-rcy7iuhi] strong[data-astro-cid-rcy7iuhi]{font-size:1.25rem}\n"}],"routeData":{"route":"/products","isIndex":false,"type":"page","pattern":"^\\/products\\/?$","segments":[[{"content":"products","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/products.astro","pathname":"/products","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".crumbs[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld]{font-size:var(--fs-small);color:var(--ink-3);flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;display:flex}.crumbs[data-astro-cid-vx4iavld] li[data-astro-cid-vx4iavld]+li[data-astro-cid-vx4iavld]:before{content:\"/\";opacity:.6;margin-right:6px}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--ink-2);text-decoration:none}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]:hover{text-decoration:underline}.crumbs[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:var(--ink);font-weight:600}.dark[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld],.dark[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--on-night-2)}.dark[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:#fff}\n.faqs[data-astro-cid-bppbuphv]{border-top:1px solid var(--line)}details[data-astro-cid-bppbuphv]{border-bottom:1px solid var(--line)}summary[data-astro-cid-bppbuphv]{justify-content:space-between;align-items:center;gap:var(--space-4);padding:var(--space-5) 0;cursor:pointer;min-height:48px;list-style:none;display:flex}summary[data-astro-cid-bppbuphv]::-webkit-details-marker{display:none}.q[data-astro-cid-bppbuphv]{font-weight:700;line-height:1.35}.pm[data-astro-cid-bppbuphv]{border:1.5px solid var(--line-strong);border-radius:50%;flex:none;width:28px;height:28px;position:relative}.pm[data-astro-cid-bppbuphv]:before,.pm[data-astro-cid-bppbuphv]:after{content:\"\";background:var(--ink);width:11px;height:1.8px;transition:transform .2s;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.pm[data-astro-cid-bppbuphv]:after{transform:translate(-50%,-50%)rotate(90deg)}details[data-astro-cid-bppbuphv][open] .pm[data-astro-cid-bppbuphv]:after{transform:translate(-50%,-50%)rotate(0)}details[data-astro-cid-bppbuphv] p[data-astro-cid-bppbuphv]{padding-bottom:var(--space-5);color:var(--ink-2);max-width:70ch}\n.page-hero[data-astro-cid-75ysl5lo]{padding-block:var(--space-7) var(--space-8);background:var(--surface);border-bottom:1px solid var(--line)}.grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-6);align-items:center;display:grid}.copy[data-astro-cid-75ysl5lo]{gap:var(--space-4);justify-items:start;display:grid}.copy[data-astro-cid-75ysl5lo] h1[data-astro-cid-75ysl5lo]{max-width:18ch}.media[data-astro-cid-75ysl5lo] img{aspect-ratio:4/3;object-fit:cover;border-radius:var(--radius-l);width:100%}@media (width>=1100px){.has-image[data-astro-cid-75ysl5lo] .grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-8);grid-template-columns:1.1fr 1fr}}\n.stepform[data-astro-cid-u5ipmuwy]{gap:var(--space-5);min-width:0;display:grid}.stepform[data-astro-cid-u5ipmuwy]>*{min-width:0}.stepform[data-astro-cid-u5ipmuwy] fieldset{gap:var(--space-4);border:0;min-width:0;margin:0;padding:0;display:grid}.stepform[data-astro-cid-u5ipmuwy] fieldset>legend{margin-bottom:var(--space-2);padding:0;font-size:1.25rem;font-weight:750}.stepform[data-astro-cid-u5ipmuwy] .two{gap:var(--space-4);display:grid}@media (width>=560px){.stepform[data-astro-cid-u5ipmuwy] .two{grid-template-columns:1fr 1fr}}.progress-meta[data-astro-cid-u5ipmuwy]{font-size:var(--fs-small);color:var(--ink-2);justify-content:space-between;margin-bottom:8px;font-weight:650;display:flex}.bar[data-astro-cid-u5ipmuwy]{background:var(--line);border-radius:999px;height:6px;overflow:hidden}.bar[data-astro-cid-u5ipmuwy] span[data-astro-cid-u5ipmuwy]{background:var(--accent);border-radius:inherit;width:0;height:100%;transition:width .3s;display:block}.nav[data-astro-cid-u5ipmuwy]{gap:var(--space-3);justify-content:space-between;display:flex}.nav[data-astro-cid-u5ipmuwy] [data-astro-cid-u5ipmuwy][data-next],.nav[data-astro-cid-u5ipmuwy] [data-astro-cid-u5ipmuwy][data-submit]{margin-left:auto}\n.cta[data-astro-cid-hwvj6ntz]{padding-block:var(--space-8)}.inner[data-astro-cid-hwvj6ntz]{gap:var(--space-6);align-items:end;display:grid}.copy[data-astro-cid-hwvj6ntz]{gap:var(--space-4);max-width:760px;display:grid}@media (width>=1100px){.inner[data-astro-cid-hwvj6ntz]{grid-template-columns:1.2fr 1fr}.btn-row[data-astro-cid-hwvj6ntz]{justify-content:flex-end}}\n"},{"type":"external","src":"_astro/_slug_.Ckxsa_cR.css"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"},{"type":"inline","content":".svc-grid[data-astro-cid-2rgb55cq]{gap:var(--space-5);grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));margin:0;padding:0;list-style:none;display:grid}.svc[data-astro-cid-2rgb55cq]{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);height:100%;color:inherit;grid-template-rows:auto 1fr;text-decoration:none;transition:border-color .2s,box-shadow .2s,transform .2s;display:grid;overflow:hidden}.svc[data-astro-cid-2rgb55cq]:hover{border-color:var(--line-strong);box-shadow:var(--shadow);transform:translateY(-2px)}.svc[data-astro-cid-2rgb55cq] img{aspect-ratio:16/10;object-fit:cover;width:100%}.body[data-astro-cid-2rgb55cq]{gap:var(--space-2);padding:var(--space-5);align-content:start;display:grid}.body[data-astro-cid-2rgb55cq] p[data-astro-cid-2rgb55cq]{color:var(--ink-2);font-size:var(--fs-small)}.more[data-astro-cid-2rgb55cq]{margin-top:var(--space-2);color:var(--accent);font-weight:650;font-size:var(--fs-small);align-items:center;gap:6px;display:inline-flex}.svc[data-astro-cid-2rgb55cq]:hover .more[data-astro-cid-2rgb55cq]{text-decoration:underline}\n"}],"routeData":{"route":"/services/[slug]","isIndex":false,"type":"page","pattern":"^\\/services\\/([^/]+?)\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/services/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".crumbs[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld]{font-size:var(--fs-small);color:var(--ink-3);flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;display:flex}.crumbs[data-astro-cid-vx4iavld] li[data-astro-cid-vx4iavld]+li[data-astro-cid-vx4iavld]:before{content:\"/\";opacity:.6;margin-right:6px}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--ink-2);text-decoration:none}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]:hover{text-decoration:underline}.crumbs[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:var(--ink);font-weight:600}.dark[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld],.dark[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--on-night-2)}.dark[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:#fff}\n.page-hero[data-astro-cid-75ysl5lo]{padding-block:var(--space-7) var(--space-8);background:var(--surface);border-bottom:1px solid var(--line)}.grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-6);align-items:center;display:grid}.copy[data-astro-cid-75ysl5lo]{gap:var(--space-4);justify-items:start;display:grid}.copy[data-astro-cid-75ysl5lo] h1[data-astro-cid-75ysl5lo]{max-width:18ch}.media[data-astro-cid-75ysl5lo] img{aspect-ratio:4/3;object-fit:cover;border-radius:var(--radius-l);width:100%}@media (width>=1100px){.has-image[data-astro-cid-75ysl5lo] .grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-8);grid-template-columns:1.1fr 1fr}}\n.svc-grid[data-astro-cid-2rgb55cq]{gap:var(--space-5);grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));margin:0;padding:0;list-style:none;display:grid}.svc[data-astro-cid-2rgb55cq]{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);height:100%;color:inherit;grid-template-rows:auto 1fr;text-decoration:none;transition:border-color .2s,box-shadow .2s,transform .2s;display:grid;overflow:hidden}.svc[data-astro-cid-2rgb55cq]:hover{border-color:var(--line-strong);box-shadow:var(--shadow);transform:translateY(-2px)}.svc[data-astro-cid-2rgb55cq] img{aspect-ratio:16/10;object-fit:cover;width:100%}.body[data-astro-cid-2rgb55cq]{gap:var(--space-2);padding:var(--space-5);align-content:start;display:grid}.body[data-astro-cid-2rgb55cq] p[data-astro-cid-2rgb55cq]{color:var(--ink-2);font-size:var(--fs-small)}.more[data-astro-cid-2rgb55cq]{margin-top:var(--space-2);color:var(--accent);font-weight:650;font-size:var(--fs-small);align-items:center;gap:6px;display:inline-flex}.svc[data-astro-cid-2rgb55cq]:hover .more[data-astro-cid-2rgb55cq]{text-decoration:underline}\n.cta[data-astro-cid-hwvj6ntz]{padding-block:var(--space-8)}.inner[data-astro-cid-hwvj6ntz]{gap:var(--space-6);align-items:end;display:grid}.copy[data-astro-cid-hwvj6ntz]{gap:var(--space-4);max-width:760px;display:grid}@media (width>=1100px){.inner[data-astro-cid-hwvj6ntz]{grid-template-columns:1.2fr 1fr}.btn-row[data-astro-cid-hwvj6ntz]{justify-content:flex-end}}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/services","isIndex":true,"type":"page","pattern":"^\\/services\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/index.astro","pathname":"/services","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[],"routeData":{"route":"/sitemap.xml","isIndex":false,"type":"endpoint","pattern":"^\\/sitemap\\.xml$","segments":[[{"content":"sitemap.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/sitemap.xml.ts","pathname":"/sitemap.xml","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[],"routeData":{"route":"/uploads/[...path]","isIndex":false,"type":"endpoint","pattern":"^\\/uploads(?:\\/(.*?))?\\/?$","segments":[[{"content":"uploads","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"src/pages/uploads/[...path].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".crumbs[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld]{font-size:var(--fs-small);color:var(--ink-3);flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none;display:flex}.crumbs[data-astro-cid-vx4iavld] li[data-astro-cid-vx4iavld]+li[data-astro-cid-vx4iavld]:before{content:\"/\";opacity:.6;margin-right:6px}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--ink-2);text-decoration:none}.crumbs[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]:hover{text-decoration:underline}.crumbs[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:var(--ink);font-weight:600}.dark[data-astro-cid-vx4iavld] ol[data-astro-cid-vx4iavld],.dark[data-astro-cid-vx4iavld] a[data-astro-cid-vx4iavld]{color:var(--on-night-2)}.dark[data-astro-cid-vx4iavld] span[data-astro-cid-vx4iavld]{color:#fff}\n.page-hero[data-astro-cid-75ysl5lo]{padding-block:var(--space-7) var(--space-8);background:var(--surface);border-bottom:1px solid var(--line)}.grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-6);align-items:center;display:grid}.copy[data-astro-cid-75ysl5lo]{gap:var(--space-4);justify-items:start;display:grid}.copy[data-astro-cid-75ysl5lo] h1[data-astro-cid-75ysl5lo]{max-width:18ch}.media[data-astro-cid-75ysl5lo] img{aspect-ratio:4/3;object-fit:cover;border-radius:var(--radius-l);width:100%}@media (width>=1100px){.has-image[data-astro-cid-75ysl5lo] .grid-hero[data-astro-cid-75ysl5lo]{gap:var(--space-8);grid-template-columns:1.1fr 1fr}}\n.cta[data-astro-cid-hwvj6ntz]{padding-block:var(--space-8)}.inner[data-astro-cid-hwvj6ntz]{gap:var(--space-6);align-items:end;display:grid}.copy[data-astro-cid-hwvj6ntz]{gap:var(--space-4);max-width:760px;display:grid}@media (width>=1100px){.inner[data-astro-cid-hwvj6ntz]{grid-template-columns:1.2fr 1fr}.btn-row[data-astro-cid-hwvj6ntz]{justify-content:flex-end}}\n.layout[data-astro-cid-6raifcry]{gap:var(--space-7);display:grid}.facts[data-astro-cid-6raifcry] dl[data-astro-cid-6raifcry]{gap:var(--space-4);margin:0;display:grid}.facts[data-astro-cid-6raifcry] dt[data-astro-cid-6raifcry]{font-size:var(--fs-small);color:var(--ink-3)}.facts[data-astro-cid-6raifcry] dd[data-astro-cid-6raifcry]{margin:0;font-weight:600}@media (width>=1100px){.layout[data-astro-cid-6raifcry]{gap:var(--space-8);grid-template-columns:minmax(0,1fr) 380px;align-items:start}}\n"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"}],"routeData":{"route":"/[page]","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/?$","segments":[[{"content":"page","dynamic":true,"spread":false}]],"params":["page"],"component":"src/pages/[page].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"_astro/page.BsuiZEAU.js"}],"styles":[{"type":"external","src":"_astro/Icon.Begzp8Xw.css"},{"type":"inline","content":".faqs[data-astro-cid-bppbuphv]{border-top:1px solid var(--line)}details[data-astro-cid-bppbuphv]{border-bottom:1px solid var(--line)}summary[data-astro-cid-bppbuphv]{justify-content:space-between;align-items:center;gap:var(--space-4);padding:var(--space-5) 0;cursor:pointer;min-height:48px;list-style:none;display:flex}summary[data-astro-cid-bppbuphv]::-webkit-details-marker{display:none}.q[data-astro-cid-bppbuphv]{font-weight:700;line-height:1.35}.pm[data-astro-cid-bppbuphv]{border:1.5px solid var(--line-strong);border-radius:50%;flex:none;width:28px;height:28px;position:relative}.pm[data-astro-cid-bppbuphv]:before,.pm[data-astro-cid-bppbuphv]:after{content:\"\";background:var(--ink);width:11px;height:1.8px;transition:transform .2s;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.pm[data-astro-cid-bppbuphv]:after{transform:translate(-50%,-50%)rotate(90deg)}details[data-astro-cid-bppbuphv][open] .pm[data-astro-cid-bppbuphv]:after{transform:translate(-50%,-50%)rotate(0)}details[data-astro-cid-bppbuphv] p[data-astro-cid-bppbuphv]{padding-bottom:var(--space-5);color:var(--ink-2);max-width:70ch}\n.svc-grid[data-astro-cid-2rgb55cq]{gap:var(--space-5);grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));margin:0;padding:0;list-style:none;display:grid}.svc[data-astro-cid-2rgb55cq]{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);height:100%;color:inherit;grid-template-rows:auto 1fr;text-decoration:none;transition:border-color .2s,box-shadow .2s,transform .2s;display:grid;overflow:hidden}.svc[data-astro-cid-2rgb55cq]:hover{border-color:var(--line-strong);box-shadow:var(--shadow);transform:translateY(-2px)}.svc[data-astro-cid-2rgb55cq] img{aspect-ratio:16/10;object-fit:cover;width:100%}.body[data-astro-cid-2rgb55cq]{gap:var(--space-2);padding:var(--space-5);align-content:start;display:grid}.body[data-astro-cid-2rgb55cq] p[data-astro-cid-2rgb55cq]{color:var(--ink-2);font-size:var(--fs-small)}.more[data-astro-cid-2rgb55cq]{margin-top:var(--space-2);color:var(--accent);font-weight:650;font-size:var(--fs-small);align-items:center;gap:6px;display:inline-flex}.svc[data-astro-cid-2rgb55cq]:hover .more[data-astro-cid-2rgb55cq]{text-decoration:underline}\n"},{"type":"external","src":"_astro/MembershipCard.DKgBbw9p.css"},{"type":"external","src":"_astro/Base.DxZkcLZm.css"},{"type":"inline","content":".cta[data-astro-cid-hwvj6ntz]{padding-block:var(--space-8)}.inner[data-astro-cid-hwvj6ntz]{gap:var(--space-6);align-items:end;display:grid}.copy[data-astro-cid-hwvj6ntz]{gap:var(--space-4);max-width:760px;display:grid}@media (width>=1100px){.inner[data-astro-cid-hwvj6ntz]{grid-template-columns:1.2fr 1fr}.btn-row[data-astro-cid-hwvj6ntz]{justify-content:flex-end}}\n"},{"type":"external","src":"_astro/index.BKFuR_d7.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"serverLike":true,"middlewareMode":"classic","site":"https://virnobyte.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Programming section/virnobyte/src/pages/500.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/admin/members/[id].astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/admin/members/index.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/admin/members/new.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/admin/r/[resource]/[id].astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/admin/r/[resource]/index.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/admin/settings.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/account/forgot-password.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/account/login.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/account/register.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/account/reset-password.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/admin/login.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/[page].astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/about.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/account/index.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/blog/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/blog/index.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/careers/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/careers/index.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/custom-pc-builder.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/faq.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/gallery.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/membership.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/portfolio/[category].astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/portfolio/index.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/products.astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/services/[slug].astro",{"propagation":"none","containsHead":true}],["C:/Programming section/virnobyte/src/pages/services/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000virtual:astro:middleware":"virtual_astro_middleware.mjs","\u0000virtual:astro:server-island-manifest":"chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs","\u0000virtual:astro:session-driver":"chunks/_virtual_astro_session-driver_DS5V7T-N.mjs","\u0000virtual:astro:actions/noop-entrypoint":"chunks/noop-entrypoint_Z3zFhrGC.mjs","C:/Programming section/virnobyte/node_modules/@astrojs/react/dist/vnode-children.js":"chunks/vnode-children_B6vVcKTz.mjs","@astrojs/node/server.js":"entry.mjs","\u0000virtual:astro:page:src/pages/404@_@astro":"chunks/404_COXv_u68.mjs","\u0000virtual:astro:page:src/pages/500@_@astro":"chunks/500_RAc8nShM.mjs","C:/Programming section/virnobyte/src/components/pc/Viewer3D.tsx":"_astro/Viewer3D.Ctjzs7wv.js","\u0000virtual:astro:page:src/pages/uploads/[...path]@_@ts":"chunks/_.._CFheeKwo.mjs","\u0000virtual:astro:page:src/pages/og/[...path]@_@ts":"chunks/_.._nf2uYSbJ.mjs","\u0000virtual:astro:page:src/pages/portfolio/[category]@_@astro":"chunks/_category__D1vNllFe.mjs","\u0000virtual:astro:page:src/pages/admin/r/[resource]/[id]@_@astro":"chunks/_id__Bc15goHL.mjs","\u0000virtual:astro:page:src/pages/admin/members/[id]@_@astro":"chunks/_id__CYUm3yTE.mjs","\u0000virtual:astro:page:src/pages/[page]@_@astro":"chunks/_page__DhPWjX7v.mjs","\u0000virtual:astro:page:src/pages/services/[slug]@_@astro":"chunks/_slug__CgneqJX6.mjs","\u0000virtual:astro:page:src/pages/blog/[slug]@_@astro":"chunks/_slug__DGwvG2js.mjs","\u0000virtual:astro:page:src/pages/careers/[slug]@_@astro":"chunks/_slug__tNrRtXfW.mjs","\u0000virtual:astro:page:src/pages/about@_@astro":"chunks/about_9N5FJ-wH.mjs","\u0000virtual:astro:page:src/pages/api/apply@_@ts":"chunks/apply_Bh2eUaDj.mjs","\u0000virtual:astro:page:src/pages/api/pc/build@_@ts":"chunks/build_gs0nyyVg.mjs","\u0000virtual:astro:page:src/pages/contact@_@astro":"chunks/contact_CVKWmTOj.mjs","\u0000virtual:astro:page:src/pages/custom-pc-builder@_@astro":"chunks/custom-pc-builder_CoG59DZJ.mjs","\u0000virtual:astro:page:src/pages/api/enquiry@_@ts":"chunks/enquiry_7ZfbfMsv.mjs","\u0000virtual:astro:page:src/pages/faq@_@astro":"chunks/faq_CyOtROi1.mjs","\u0000virtual:astro:page:src/pages/account/forgot-password@_@astro":"chunks/forgot-password_DEy16reM.mjs","\u0000virtual:astro:page:src/pages/gallery@_@astro":"chunks/gallery_BIYP58k2.mjs","\u0000virtual:astro:page:src/pages/api/health@_@ts":"chunks/health_BvlxOCOU.mjs","\u0000virtual:astro:page:src/pages/admin/members/index@_@astro":"chunks/index_B-kiViB1.mjs","\u0000virtual:astro:page:src/pages/admin/index@_@astro":"chunks/index_BHBRh_gg.mjs","\u0000virtual:astro:page:src/pages/index@_@astro":"chunks/index_BPo4b1K7.mjs","\u0000virtual:astro:page:src/pages/account/index@_@astro":"chunks/index_CYFKImPn.mjs","\u0000virtual:astro:page:src/pages/blog/index@_@astro":"chunks/index_CdBneloy.mjs","\u0000virtual:astro:page:src/pages/admin/r/[resource]/index@_@astro":"chunks/index_CxgrjieB.mjs","\u0000virtual:astro:page:src/pages/portfolio/index@_@astro":"chunks/index_Dnj4uNOa.mjs","\u0000virtual:astro:page:src/pages/services/index@_@astro":"chunks/index_fmEZCdcu.mjs","\u0000virtual:astro:page:src/pages/careers/index@_@astro":"chunks/index_gL4NJvNu.mjs","\u0000virtual:astro:page:src/pages/admin/login@_@astro":"chunks/login_CZq34ScL.mjs","\u0000virtual:astro:page:src/pages/account/login@_@astro":"chunks/login_DdJIcNE-.mjs","\u0000virtual:astro:page:src/pages/account/logout@_@ts":"chunks/logout_BRBuJzn0.mjs","\u0000virtual:astro:page:src/pages/api/membership@_@ts":"chunks/membership_BKOPISME.mjs","\u0000virtual:astro:page:src/pages/membership@_@astro":"chunks/membership_b2YTcAKW.mjs","\u0000virtual:astro:page:src/pages/admin/members/new@_@astro":"chunks/new_CzSkRgLo.mjs","\u0000virtual:astro:page:node_modules/astro/dist/assets/endpoint/node@_@js":"chunks/node_DMwl7Oq-.mjs","\u0000virtual:astro:page:src/pages/our-certificates@_@astro":"chunks/our-certificates_CXbdkzx6.mjs","\u0000virtual:astro:page:src/pages/products@_@astro":"chunks/products_BbbNj9w5.mjs","\u0000virtual:astro:page:src/pages/account/register@_@astro":"chunks/register_CRe8SSNa.mjs","\u0000virtual:astro:page:src/pages/account/reset-password@_@astro":"chunks/reset-password_9zreVjuW.mjs","\u0000virtual:astro:page:src/pages/robots.txt@_@ts":"chunks/robots_DpNP1ERy.mjs","\u0000virtual:astro:page:src/pages/admin/settings@_@astro":"chunks/settings_Cz8PEB9d.mjs","C:/Programming section/virnobyte/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C8tXJbcq.mjs","\u0000virtual:astro:page:src/pages/sitemap.xml@_@ts":"chunks/sitemap_jtcrbJN5.mjs","C:/Programming section/virnobyte/src/layouts/Admin.astro?astro&type=script&index=0&lang.ts":"_astro/Admin.astro_astro_type_script_index_0_lang.DI812GlE.js","C:/Programming section/virnobyte/src/components/admin/AdminField.astro?astro&type=script&index=0&lang.ts":"_astro/AdminField.astro_astro_type_script_index_0_lang.DEsK-vUr.js","C:/Programming section/virnobyte/src/layouts/Base.astro?astro&type=script&index=0&lang.ts":"_astro/Base.astro_astro_type_script_index_0_lang.CnBvNxoM.js","@/components/pc/PCBuilder.tsx":"_astro/PCBuilder.Bg2-0UXL.js","C:/Programming section/virnobyte/src/components/StepForm.astro?astro&type=script&index=0&lang.ts":"_astro/StepForm.astro_astro_type_script_index_0_lang.CVBjVyLe.js","C:/Programming section/virnobyte/src/components/ThreeShowcase.astro?astro&type=script&index=0&lang.ts":"_astro/ThreeShowcase.astro_astro_type_script_index_0_lang.BY7MpAp1.js","C:/Programming section/virnobyte/src/pages/admin/r/[resource]/[id].astro?astro&type=script&index=0&lang.ts":"_astro/_id_.astro_astro_type_script_index_0_lang.Do70LPzW.js","@astrojs/react/client.js":"_astro/client.0BLGK6fD.js","C:/Programming section/virnobyte/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.BcreEzd6.js","astro:scripts/page.js":"_astro/page.BsuiZEAU.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Programming section/virnobyte/src/layouts/Admin.astro?astro&type=script&index=0&lang.ts","var e=document.getElementById(`sidebar-toggle`),t=document.getElementById(`mobile-sidebar-toggle`),n=document.querySelector(`.navwrap`),r=t=>{document.documentElement.classList.toggle(`sidebar-collapsed`,t),localStorage.setItem(`vb_sidebar_collapsed`,String(t)),e&&(e.setAttribute(`title`,t?`Maximize sidebar (Ctrl+B)`:`Minimize sidebar (Ctrl+B)`),e.setAttribute(`aria-label`,t?`Maximize sidebar`:`Minimize sidebar`))};e?.addEventListener(`click`,()=>{window.matchMedia(`(max-width: 899px)`).matches?n&&(n.open=!n.open):r(!document.documentElement.classList.contains(`sidebar-collapsed`))}),t?.addEventListener(`click`,()=>{n&&(n.open=!n.open,n.open&&n.scrollIntoView({behavior:`smooth`}))}),document.addEventListener(`keydown`,e=>{(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()===`b`&&!e.altKey&&(e.preventDefault(),r(!document.documentElement.classList.contains(`sidebar-collapsed`)))}),n&&matchMedia(`(max-width: 899px)`).matches&&(n.open=!1),document.querySelectorAll(`[data-max]`).forEach(e=>{let t=e.closest(`.field`)?.querySelector(`[data-count]`),n=Number(e.dataset.max),r=()=>{t&&(t.textContent=`${e.value.length} / ${n}`,t.classList.toggle(`over`,e.value.length>n))};e.addEventListener(`input`,r),r()}),document.querySelectorAll(`form[data-confirm]`).forEach(e=>e.addEventListener(`submit`,t=>{confirm(e.dataset.confirm)||t.preventDefault()}));"],["C:/Programming section/virnobyte/src/components/admin/AdminField.astro?astro&type=script&index=0&lang.ts","document.querySelectorAll(`[data-img-field]`).forEach(e=>{if(e.dataset.bound)return;e.dataset.bound=`1`;let t=JSON.parse(e.dataset.thumbs||`{}`),n=e.querySelector(`select`);n.addEventListener(`change`,()=>{let r=e.querySelector(`img.preview`),i=n.value.startsWith(`/uploads/`)?n.value:t[n.value];if(!i)return r?.remove();r||(r=document.createElement(`img`),r.className=`preview`,r.alt=``,e.prepend(r)),r.src=i})}),document.querySelectorAll(`[data-color-for]`).forEach(e=>{e.addEventListener(`input`,()=>{let t=e.parentElement?.querySelector(`code`);t&&(t.textContent=e.value)})});"],["C:/Programming section/virnobyte/src/layouts/Base.astro?astro&type=script&index=0&lang.ts","var e=document.querySelectorAll(`[data-dropdown]`);document.addEventListener(`click`,t=>{e.forEach(e=>{e.open&&!e.contains(t.target)&&(e.open=!1)})}),document.addEventListener(`keydown`,t=>{t.key===`Escape`&&e.forEach(e=>{e.open&&(e.open=!1,e.querySelector(`summary`)?.focus())})});var t=document.querySelectorAll(`[data-reveal]`);if(`IntersectionObserver`in window&&!matchMedia(`(prefers-reduced-motion: reduce)`).matches){let e=new IntersectionObserver(t=>{for(let n of t)n.isIntersecting&&(n.target.classList.add(`is-in`),e.unobserve(n.target))},{rootMargin:`0px 0px -8% 0px`,threshold:.08});t.forEach(t=>e.observe(t))}else t.forEach(e=>e.classList.add(`is-in`));"],["C:/Programming section/virnobyte/src/components/StepForm.astro?astro&type=script&index=0&lang.ts","function e(e){let t=e.dataset.label||e.name,n=e.validity;return n.valueMissing?e.dataset.msgRequired||`Enter your ${t.toLowerCase()}.`:n.typeMismatch&&e.type===`email`?`Enter an email address like name@example.com.`:n.patternMismatch?e.dataset.msgPattern||`Check the ${t.toLowerCase()} and try again.`:n.tooShort?`Use at least ${e.getAttribute(`minlength`)} characters.`:``}function t(t){let n=t.closest(`.field`),r=n?.querySelector(`.error`),i=t.checkValidity()?``:e(t);return r&&(r.textContent=i),i?(n?.setAttribute(`data-invalid`,``),t.setAttribute(`aria-invalid`,`true`)):(n?.removeAttribute(`data-invalid`),t.removeAttribute(`aria-invalid`)),!i}document.querySelectorAll(`[data-stepform]`).forEach(e=>{let n=[...e.querySelectorAll(`fieldset[data-step]`)],r=e.querySelector(`[data-prev]`),i=e.querySelector(`[data-next]`),a=e.querySelector(`[data-submit]`),o=e.querySelector(`.progress`),s=e.querySelector(`[data-bar]`),c=e.querySelector(`[data-step-label]`),l=e.querySelector(`[data-step-count]`),u=e.querySelector(`[data-announce]`),d=`vb-draft:`+e.dataset.draft,f=()=>[...e.querySelectorAll(`input, select, textarea`)].filter(e=>e.name&&e.name!==`website`&&e.type!==`hidden`&&e.type!==`file`),p=0;try{let t=JSON.parse(localStorage.getItem(d)||`{}`);f().forEach(e=>{t[e.name]!=null&&(e instanceof HTMLInputElement&&(e.type===`checkbox`||e.type===`radio`)?e.checked=t[e.name]===e.value||Array.isArray(t[e.name])&&t[e.name].includes(e.value):e.value||=t[e.name])}),Object.keys(t).length&&(e.querySelector(`[data-draft-note]`).hidden=!1)}catch{}e.addEventListener(`input`,n=>{let r=n.target;r.closest(`.field`)?.hasAttribute(`data-invalid`)&&t(r);try{let t={};f().forEach(e=>{e instanceof HTMLInputElement&&e.type===`checkbox`?e.checked&&(t[e.name]=[...t[e.name]||[],e.value]):e instanceof HTMLInputElement&&e.type===`radio`?e.checked&&(t[e.name]=e.value):e.type!==`password`&&(t[e.name]=e.value)}),localStorage.setItem(d,JSON.stringify(t)),e.querySelector(`[data-draft-note]`).hidden=!1}catch{}}),e.addEventListener(`focusout`,e=>{let n=e.target;n.matches(`input, select, textarea`)&&n.value&&t(n)});function m(e=!1){n.length<2||(n.forEach((e,t)=>e.hidden=t!==p),r.hidden=p===0,i.hidden=p===n.length-1,a.hidden=p!==n.length-1,o.hidden=!1,s.style.width=`${(p+1)/n.length*100}%`,c.textContent=n[p].dataset.title||``,l.textContent=`Step ${p+1} of ${n.length}`,u.textContent=`Step ${p+1} of ${n.length}: ${n[p].dataset.title||``}`,e&&n[p].querySelector(`input, select, textarea`)?.focus())}function h(e){let r=[...n[e].querySelectorAll(`input, select, textarea`)].filter(e=>e.name),i=r.map(t).every(Boolean);return i||r.find(e=>!e.checkValidity())?.focus(),i}i.addEventListener(`click`,()=>{h(p)&&(p++,m(!0))}),r.addEventListener(`click`,()=>{p--,m(!0)}),e.addEventListener(`submit`,e=>{for(let t=0;t<n.length;t++)if(!h(t)){e.preventDefault(),p=t,m(!0);return}a.disabled=!0,a.textContent=`Sending…`;try{localStorage.removeItem(d)}catch{}}),m()});"],["C:/Programming section/virnobyte/src/pages/admin/r/[resource]/[id].astro?astro&type=script&index=0&lang.ts","var e=document.getElementById(`edit-form`),t=document.querySelector(`[data-card]`),n=new Intl.NumberFormat(`en-IN`),r=()=>{if(!t)return;let r=t=>e.elements.namedItem(t)?.value??``;t.style.setProperty(`--from`,r(`card_from`)),t.style.setProperty(`--to`,r(`card_to`)),t.style.setProperty(`--fg`,r(`card_text`)),t.className=t.className.replace(/pattern-\\w+/,`pattern-${r(`card_pattern`)||`circuit`}`);let i=t.querySelector(`[data-f=\"name\"]`);i&&(i.textContent=r(`name`)||`Plan`);let a=t.querySelector(`[data-f=\"coins\"]`);a&&(a.textContent=n.format(Number(r(`coins`))||0))};e.addEventListener(`input`,r),e.addEventListener(`change`,r);"],["C:/Programming section/virnobyte/src/pages/index.astro?astro&type=script&index=0&lang.ts","var e=document.querySelector(`[data-rotator]`);if(e&&!matchMedia(`(prefers-reduced-motion: reduce)`).matches){let t=[...e.querySelectorAll(`.rot-item`)],n=0;setInterval(()=>{if(document.hidden||t.length<2)return;let e=t[n];n=(n+1)%t.length;let r=t[n];e.classList.remove(`on`),e.classList.add(`out`),r.classList.remove(`out`),r.classList.add(`on`),setTimeout(()=>e.classList.remove(`out`),520)},2200)}"]],"assets":["/_astro/Admin.C51T2cWw.css","/_astro/Base.DxZkcLZm.css","/_astro/Icon.Begzp8Xw.css","/_astro/MembershipCard.DKgBbw9p.css","/_astro/PCBuilder.Bg2-0UXL.js","/_astro/PCBuilder.x4wrwazp.css","/_astro/ThreeShowcase.astro_astro_type_script_index_0_lang.BY7MpAp1.js","/_astro/Viewer3D.Ctjzs7wv.js","/_astro/_slug_.BKi2wgMm.css","/_astro/_slug_.Ckxsa_cR.css","/_astro/about.C_GFN2_t.css","/_astro/bricolage-grotesque-latin-ext-opsz-normal.IcJDqblK.woff2","/_astro/bricolage-grotesque-latin-opsz-normal.Cre6nC2_.woff2","/_astro/bricolage-grotesque-vietnamese-opsz-normal.D9N6E8K1.woff2","/_astro/client.0BLGK6fD.js","/_astro/client.Ddivo6MN.js","/_astro/custom-pc-builder.DIcBSVS3.css","/_astro/index.BKFuR_d7.css","/_astro/jsx-runtime.CWLBoBiw.js","/_astro/page.BsuiZEAU.js","/_astro/page.BsuiZEAU.js","/_astro/react.iDfmHsyG.js","/_astro/rolldown-runtime.hePW80VL.js","/_astro/three.module.D5BEcoC6.js","/_astro/virnobyte-amc-services.BWT14KUr.jpg","/_astro/virnobyte-business-meeting.BtISMXZY.jpg","/_astro/virnobyte-careers-team.DigBKJt0.jpg","/_astro/virnobyte-cctv-installation-pune.CyuvPwn_.jpg","/_astro/virnobyte-circuit-board.BkbwfuS9.jpg","/_astro/virnobyte-cloud-backup.OcGR4QAv.jpg","/_astro/virnobyte-computer-repair-cpu.C6vCnvpf.jpg","/_astro/virnobyte-custom-it-solutions-server.DBZWr7-H.jpg","/_astro/virnobyte-data-recovery-hard-disk.DixZ92L0.jpg","/_astro/virnobyte-gaming-pc-build.CuCadrd8.jpg","/_astro/virnobyte-hard-disk-drive.B8FBTRYv.jpg","/_astro/virnobyte-hardware-solutions.ppy4R9io.jpg","/_astro/virnobyte-inverter-installation.BqRFpXcf.jpg","/_astro/virnobyte-it-consulting.R3ohvNAY.jpg","/_astro/virnobyte-laptop-repair.BqNW7frr.jpg","/_astro/virnobyte-laptop-workspace.mLZ7mogZ.jpg","/_astro/virnobyte-networking-services.GtgUWFtK.jpg","/_astro/virnobyte-office-it-setup.DtuSsoHL.jpg","/_astro/virnobyte-office-it-team.CqrN5Tqu.jpg","/_astro/virnobyte-printer-repair.ki-ViVk3.jpg","/_astro/virnobyte-software-installation.Dne5TMWg.jpg","/_astro/virnobyte-software-solutions.D_DmmWqT.jpg","/_astro/virnobyte-technician-computer-repair.d-faX5u-.jpg","/_astro/virnobyte-virus-removal-security.C_JkYOIc.jpg","/_astro/virnobyte-wifi-router-setup.u2XMMeqO.jpg","/apple-touch-icon.png","/certificates/certificate-1.jpg","/certificates/certificate-2.jpg","/certificates/certificate-3.jpg","/certificates/certificate-4.jpg","/certificates/certificate-5.jpg","/certificates/certificate-6.jpg","/favicon-32.png","/favicon.ico","/icon-192.png","/icon-512.png","/site.webmanifest","/virnobyte-logo-white.png","/virnobyte-logo.png"],"buildFormat":"file","checkOrigin":false,"actionBodySizeLimit":1048576,"serverIslandBodySizeLimit":1048576,"allowedDomains":[],"key":"+FRBQ2kQfxQb+4bNBN4geM05x12X5yjS59JtOLC0b40=","sessionConfig":{"driver":"unstorage/drivers/fs-lite","options":{"base":"C:\\Programming section\\virnobyte\\node_modules\\.astro\\sessions"}},"image":{},"devToolbar":{"enabled":false,"debugInfoOutput":""},"logLevel":"info","shouldInjectCspMetaTags":false});
var manifestRoutes = _manifest.routes;
var manifest = Object.assign(_manifest, {
	renderers,
	actions: () => import("./chunks/noop-entrypoint_Z3zFhrGC.mjs"),
	middleware: () => import("./virtual_astro_middleware.mjs"),
	sessionDriver: () => import("./chunks/_virtual_astro_session-driver_DS5V7T-N.mjs"),
	serverIslandMappings: () => import("./chunks/_virtual_astro_server-island-manifest_C1Q2srgE.mjs"),
	routes: manifestRoutes,
	pageMap
});
function getAmbientManifest() {
	const manifest$1 = manifest;
	if (!manifest$1) throw new AstroError(NoManifestAvailable);
	return manifest$1;
}
//#endregion
//#region node_modules/astro/dist/core/app/render-options.js
var renderOptionsSymbol = /* @__PURE__ */ Symbol.for("astro.renderOptions");
function getRenderOptions(request) {
	return Reflect.get(request, renderOptionsSymbol);
}
function setRenderOptions(request, options) {
	Reflect.set(request, renderOptionsSymbol, options);
}
//#endregion
//#region node_modules/astro/dist/core/app/origin-check.js
var SAFE_METHODS = [
	"GET",
	"HEAD",
	"OPTIONS"
];
function isForbiddenCrossOriginRequest(request, url, isPrerendered) {
	if (isPrerendered) return false;
	if (SAFE_METHODS.includes(request.method)) return false;
	switch (request.headers.get("sec-fetch-site")) {
		case "":
		case null: break;
		case "same-origin":
		case "none": return false;
		default: return true;
	}
	const origin = request.headers.get("origin");
	if (!origin) return false;
	return origin !== url.origin;
}
function createCrossOriginForbiddenResponse(request) {
	return new Response(`Cross-site ${request.method} form submissions are forbidden`, { status: 403 });
}
function createOriginCheckMiddleware() {
	return defineMiddleware((context, next) => {
		const { request, url, isPrerendered } = context;
		if (isForbiddenCrossOriginRequest(request, url, isPrerendered)) return createCrossOriginForbiddenResponse(request);
		return next();
	});
}
//#endregion
//#region node_modules/astro/dist/core/fetch/features.js
var FetchFeatures = {
	redirects: 1,
	sessions: 2,
	actions: 4,
	middleware: 8,
	i18n: 16,
	cache: 32
};
var ALL_FETCH_FEATURES = FetchFeatures.redirects | FetchFeatures.sessions | FetchFeatures.actions | FetchFeatures.middleware | FetchFeatures.i18n | FetchFeatures.cache;
var usedFeatures = /* @__PURE__ */ new WeakMap();
function markFeatureUsed(manifest, feature) {
	const entry = usedFeatures.get(manifest);
	if (entry) entry.bits |= feature;
	else usedFeatures.set(manifest, { bits: feature });
}
function getUsedFeatures(manifest) {
	return usedFeatures.get(manifest)?.bits ?? 0;
}
//#endregion
//#region node_modules/astro/dist/core/routing/invalid-encoding.js
function rejectInvalidEncoding(state) {
	if (state.invalidEncoding) return new Response(null, {
		status: 400,
		statusText: "Bad Request"
	});
}
var ACTION_QUERY_PARAMS = {
	actionName: "_action",
	actionPayload: "_astroActionPayload"
};
//#endregion
//#region node_modules/astro/dist/actions/runtime/client.js
var codeToStatusMap = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAYMENT_REQUIRED: 402,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	NOT_ACCEPTABLE: 406,
	PROXY_AUTHENTICATION_REQUIRED: 407,
	REQUEST_TIMEOUT: 408,
	CONFLICT: 409,
	GONE: 410,
	LENGTH_REQUIRED: 411,
	PRECONDITION_FAILED: 412,
	CONTENT_TOO_LARGE: 413,
	URI_TOO_LONG: 414,
	UNSUPPORTED_MEDIA_TYPE: 415,
	RANGE_NOT_SATISFIABLE: 416,
	EXPECTATION_FAILED: 417,
	MISDIRECTED_REQUEST: 421,
	UNPROCESSABLE_CONTENT: 422,
	LOCKED: 423,
	FAILED_DEPENDENCY: 424,
	TOO_EARLY: 425,
	UPGRADE_REQUIRED: 426,
	PRECONDITION_REQUIRED: 428,
	TOO_MANY_REQUESTS: 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
	UNAVAILABLE_FOR_LEGAL_REASONS: 451,
	INTERNAL_SERVER_ERROR: 500,
	NOT_IMPLEMENTED: 501,
	BAD_GATEWAY: 502,
	SERVICE_UNAVAILABLE: 503,
	GATEWAY_TIMEOUT: 504,
	HTTP_VERSION_NOT_SUPPORTED: 505,
	VARIANT_ALSO_NEGOTIATES: 506,
	INSUFFICIENT_STORAGE: 507,
	LOOP_DETECTED: 508,
	NETWORK_AUTHENTICATION_REQUIRED: 511
};
var statusToCodeMap = Object.fromEntries(Object.entries(codeToStatusMap).map(([key, value]) => [value, key]));
var ActionError = class ActionError extends Error {
	type = "AstroActionError";
	code = "INTERNAL_SERVER_ERROR";
	status = 500;
	constructor(params) {
		super(params.message);
		this.code = params.code;
		this.status = ActionError.codeToStatus(params.code);
		if (params.stack) this.stack = params.stack;
	}
	static codeToStatus(code) {
		return codeToStatusMap[code];
	}
	static statusToCode(status) {
		return statusToCodeMap[status] ?? "INTERNAL_SERVER_ERROR";
	}
	static fromJson(body) {
		if (isInputError(body)) return new ActionInputError(body.issues);
		if (isActionError(body)) return new ActionError(body);
		return new ActionError({ code: "INTERNAL_SERVER_ERROR" });
	}
};
function isActionError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionError";
}
function isInputError(error) {
	return typeof error === "object" && error != null && "type" in error && error.type === "AstroActionInputError" && "issues" in error && Array.isArray(error.issues);
}
var ActionInputError = class extends ActionError {
	type = "AstroActionInputError";
	issues;
	fields;
	constructor(issues) {
		super({
			message: `Failed to validate: ${JSON.stringify(issues, null, 2)}`,
			code: "BAD_REQUEST"
		});
		this.issues = issues;
		this.fields = {};
		for (const issue of issues) if (issue.path.length > 0) {
			const key = issue.path[0].toString();
			this.fields[key] ??= [];
			this.fields[key]?.push(issue.message);
		}
	}
};
function deserializeActionResult(res) {
	if (res.type === "error") {
		let json;
		try {
			json = JSON.parse(res.body);
		} catch {
			return {
				data: void 0,
				error: new ActionError({
					message: res.body,
					code: "INTERNAL_SERVER_ERROR"
				})
			};
		}
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"PUBLIC_SITE_URL": "https://virnobyte.com",
			"SITE": "https://virnobyte.com",
			"SSR": true
		}, { OS: "Windows_NT" })?.PROD) return {
			error: ActionError.fromJson(json),
			data: void 0
		};
		else {
			const error = ActionError.fromJson(json);
			error.stack = actionResultErrorStack.get();
			return {
				error,
				data: void 0
			};
		}
	}
	if (res.type === "empty") return {
		data: void 0,
		error: void 0
	};
	return {
		data: parse(res.body, { URL: (href) => new URL(href) }),
		error: void 0
	};
}
var actionResultErrorStack = /* @__PURE__ */ (function actionResultErrorStackFn() {
	let errorStack;
	return {
		set(stack) {
			errorStack = stack;
		},
		get() {
			return errorStack;
		}
	};
})();
function getActionQueryString(name) {
	return `?${new URLSearchParams({ [ACTION_QUERY_PARAMS.actionName]: name }).toString()}`;
}
//#endregion
//#region node_modules/astro/dist/actions/utils.js
function hasActionPayload(locals) {
	return "_actionPayload" in locals;
}
function createGetActionResult(locals) {
	return (actionFn) => {
		if (!hasActionPayload(locals) || actionFn.toString() !== getActionQueryString(locals._actionPayload.actionName)) return;
		return deserializeActionResult(locals._actionPayload.actionResult);
	};
}
function createCallAction(context) {
	return (baseAction, input) => {
		Reflect.set(context, ACTION_API_CONTEXT_SYMBOL, true);
		return baseAction.bind(context)(input);
	};
}
//#endregion
//#region node_modules/astro/dist/core/cookies/cookies.js
var DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
var DELETED_VALUE = "deleted";
var responseSentSymbol = /* @__PURE__ */ Symbol.for("astro.responseSent");
var identity = (value) => value;
var AstroCookie = class {
	value;
	constructor(value) {
		this.value = value;
	}
	json() {
		if (this.value === void 0) throw new Error(`Cannot convert undefined to an object.`);
		return JSON.parse(this.value);
	}
	number() {
		return Number(this.value);
	}
	boolean() {
		if (this.value === "false") return false;
		if (this.value === "0") return false;
		return Boolean(this.value);
	}
};
var AstroCookies = class {
	#request;
	#requestValues;
	#outgoing;
	#consumed;
	#logger;
	constructor(request, logger) {
		this.#request = request;
		this.#requestValues = null;
		this.#outgoing = null;
		this.#consumed = false;
		this.#logger = logger;
	}
	/**
	* Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
	* in a Set-Cookie header added to the response.
	* @param key The cookie to delete
	* @param options Options related to this deletion, such as the path of the cookie.
	*/
	delete(key, options) {
		this.#ensureOutgoingMap().set(key, [
			DELETED_VALUE,
			stringifySetCookie({
				...options,
				name: key,
				value: DELETED_VALUE,
				expires: DELETED_EXPIRATION,
				maxAge: void 0
			}),
			false
		]);
	}
	/**
	* Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
	* request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
	* from that set call, overriding any values already part of the request.
	* @param key The cookie to get.
	* @returns An object containing the cookie value as well as convenience methods for converting its value.
	*/
	get(key, options = void 0) {
		if (this.#outgoing?.has(key)) {
			let [serializedValue, , isSetValue] = this.#outgoing.get(key);
			if (isSetValue) return new AstroCookie(serializedValue);
			else return;
		}
		const decode = options?.decode ?? decodeURIComponent;
		const values = this.#ensureParsed();
		if (key in values) {
			const value = values[key];
			if (value !== void 0) {
				let decodedValue;
				try {
					decodedValue = decode(value);
				} catch (_error) {
					decodedValue = value;
				}
				return new AstroCookie(decodedValue);
			}
		}
	}
	/**
	* Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
	* part of the initial request or set via Astro.cookies.set(key)
	* @param key The cookie to check for.
	* @param _options This parameter is no longer used.
	* @returns
	*/
	has(key, _options) {
		if (this.#outgoing?.has(key)) {
			let [, , isSetValue] = this.#outgoing.get(key);
			return isSetValue;
		}
		return this.#ensureParsed()[key] !== void 0;
	}
	/**
	* Astro.cookies.set(key, value) is used to set a cookie's value. If provided
	* an object it will be stringified via JSON.stringify(value). Additionally you
	* can provide options customizing how this cookie will be set, such as setting httpOnly
	* in order to prevent the cookie from being read in client-side JavaScript.
	* @param key The name of the cookie to set.
	* @param value A value, either a string or other primitive or an object.
	* @param options Options for the cookie, such as the path and security settings.
	*/
	set(key, value, options) {
		if (this.#consumed) this.#logger.warn("SKIP_FORMAT", "Astro.cookies.set() was called after the cookies had already been sent to the browser.\nThis may have happened if this method was called in an imported component.\nPlease make sure that Astro.cookies.set() is only called in the frontmatter of the main page.");
		let serializedValue;
		if (typeof value === "string") serializedValue = value;
		else {
			let toStringValue = value.toString();
			if (toStringValue === Object.prototype.toString.call(value)) serializedValue = JSON.stringify(value);
			else serializedValue = toStringValue;
		}
		const { encode, ...attributes } = options ?? {};
		this.#ensureOutgoingMap().set(key, [
			serializedValue,
			stringifySetCookie({
				...attributes,
				name: key,
				value: serializedValue
			}, { encode }),
			true
		]);
		if (this.#request[responseSentSymbol]) throw new AstroError({ ...ResponseSentError });
	}
	/**
	* Merges a new AstroCookies instance into the current instance. Any new cookies
	* will be added to the current instance, overwriting any existing cookies with the same name.
	*/
	merge(cookies) {
		const outgoing = cookies.#outgoing;
		if (outgoing) for (const [key, value] of outgoing) this.#ensureOutgoingMap().set(key, value);
	}
	/**
	* Astro.cookies.header() returns an iterator for the cookies that have previously
	* been set by either Astro.cookies.set() or Astro.cookies.delete().
	* This method is primarily used by adapters to set the header on outgoing responses.
	* @returns
	*/
	*headers() {
		if (this.#outgoing == null) return;
		for (const [, value] of this.#outgoing) yield value[1];
	}
	/**
	* Marks the cookies as consumed and returns the header values.
	* After consumption, any subsequent `set()` calls will warn.
	*/
	consume() {
		this.#consumed = true;
		return this.headers();
	}
	/**
	* @deprecated Use the instance method `cookies.consume()` instead.
	* Kept for backward compatibility with adapters.
	*/
	static consume(cookies) {
		return cookies.consume();
	}
	#ensureParsed() {
		if (!this.#requestValues) this.#parse();
		if (!this.#requestValues) this.#requestValues = /* @__PURE__ */ Object.create(null);
		return this.#requestValues;
	}
	#ensureOutgoingMap() {
		if (!this.#outgoing) this.#outgoing = /* @__PURE__ */ new Map();
		return this.#outgoing;
	}
	#parse() {
		const raw = this.#request.headers.get("cookie");
		if (!raw) return;
		this.#requestValues = parseCookie(raw, { decode: identity });
	}
};
//#endregion
//#region node_modules/astro/dist/core/cookies/response.js
var astroCookiesSymbol = /* @__PURE__ */ Symbol.for("astro.cookies");
function attachCookiesToResponse(response, cookies) {
	Reflect.set(response, astroCookiesSymbol, cookies);
}
function getCookiesFromResponse(response) {
	let cookies = Reflect.get(response, astroCookiesSymbol);
	if (cookies != null) return cookies;
	else return;
}
function* getSetCookiesFromResponse(response) {
	const cookies = getCookiesFromResponse(response);
	if (!cookies) return [];
	for (const headerValue of cookies.consume()) yield headerValue;
	return [];
}
//#endregion
//#region node_modules/astro/dist/core/routing/pattern.js
function getPattern(segments, base, addTrailingSlash) {
	const pathname = segments.map((segment) => {
		if (segment.length === 1 && segment[0].spread) return "(?:\\/(.*?))?";
		else return "\\/" + segment.map((part) => {
			if (part.spread) return "(.*?)";
			else if (part.dynamic) return "([^/]+?)";
			else return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		}).join("");
	}).join("");
	const trailing = addTrailingSlash && segments.length ? getTrailingSlashPattern(addTrailingSlash) : "$";
	let initial = "\\/";
	if (addTrailingSlash === "never" && base !== "/" && pathname !== "") initial = "";
	return new RegExp(`^${pathname || initial}${trailing}`);
}
function getTrailingSlashPattern(addTrailingSlash) {
	if (addTrailingSlash === "always") return "\\/$";
	if (addTrailingSlash === "never") return "$";
	return "\\/?$";
}
//#endregion
//#region node_modules/astro/dist/core/render/slots.js
function getFunctionExpression(slot) {
	if (!slot) return;
	const expressions = slot?.expressions?.filter((e) => isRenderInstruction(e) === false || isRenderTemplateResult(e));
	if (expressions?.length !== 1) return;
	const expression = expressions[0];
	if (isRenderTemplateResult(expression)) return getFunctionExpression(expression);
	return expression;
}
var Slots = class {
	#result;
	#slots;
	#logger;
	constructor(result, slots, logger) {
		this.#result = result;
		this.#slots = slots;
		this.#logger = logger;
		if (slots) for (const key of Object.keys(slots)) {
			if (this[key] !== void 0) throw new AstroError({
				...ReservedSlotName,
				message: ReservedSlotName.message(key)
			});
			Object.defineProperty(this, key, {
				get() {
					return true;
				},
				enumerable: true
			});
		}
	}
	has(name) {
		if (!this.#slots) return false;
		return Boolean(this.#slots[name]);
	}
	async render(name, args = []) {
		if (!this.#slots || !this.has(name)) return;
		const result = this.#result;
		if (!Array.isArray(args)) this.#logger.warn(null, `Expected second parameter to be an array, received a ${typeof args}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as an item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`);
		else if (args.length > 0) {
			const slotValue = this.#slots[name];
			const component = typeof slotValue === "function" ? await slotValue(result) : await slotValue;
			const expression = getFunctionExpression(component);
			if (expression) {
				const slot = async () => typeof expression === "function" ? expression(...args) : expression;
				return await renderSlotToString(result, slot).then((res) => {
					return res;
				});
			}
			if (typeof component === "function") return await renderJSX(result, component(...args)).then((res) => res != null ? String(res) : res);
		}
		const content = await renderSlotToString(result, this.#slots[name]);
		return chunkToString(result, content);
	}
};
//#endregion
//#region node_modules/astro/dist/i18n/fallback.js
function computeFallbackRoute(options) {
	const { pathname, responseStatus, fallback, fallbackType, locales, defaultLocale, strategy } = options;
	if (responseStatus !== 404) return { type: "none" };
	if (!fallback || Object.keys(fallback).length === 0) return { type: "none" };
	const segments = pathname.split("/");
	const urlLocale = segments.find((segment) => {
		for (const locale of locales) if (typeof locale === "string") {
			if (locale === segment) return true;
		} else if (locale.path === segment) return true;
		return false;
	});
	if (!urlLocale) return { type: "none" };
	if (!Object.keys(fallback).includes(urlLocale)) return { type: "none" };
	const fallbackLocale = fallback[urlLocale];
	const pathFallbackLocale = getPathByLocale(fallbackLocale, locales);
	const localeIndex = segments.indexOf(urlLocale);
	let newPathname;
	if (pathFallbackLocale === defaultLocale && strategy === "pathname-prefix-other-locales") {
		segments.splice(localeIndex, 1);
		newPathname = segments.join("/") || "/";
	} else {
		segments[localeIndex] = pathFallbackLocale;
		newPathname = segments.join("/");
	}
	return {
		type: fallbackType,
		pathname: newPathname
	};
}
//#endregion
//#region node_modules/astro/dist/i18n/router.js
var I18nRouter = class {
	#strategy;
	#defaultLocale;
	#locales;
	#base;
	#domains;
	constructor(options) {
		this.#strategy = options.strategy;
		this.#defaultLocale = options.defaultLocale;
		this.#locales = options.locales;
		this.#base = options.base === "/" ? "/" : removeTrailingForwardSlash(options.base || "");
		this.#domains = options.domains;
	}
	/**
	* Evaluate routing strategy for a pathname.
	* Returns decision object (not HTTP Response).
	*/
	match(pathname, context) {
		if (this.shouldSkipProcessing(pathname, context)) return { type: "continue" };
		switch (this.#strategy) {
			case "manual": return { type: "continue" };
			case "pathname-prefix-always": return this.matchPrefixAlways(pathname, context);
			case "domains-prefix-always":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlways(pathname, context);
			case "pathname-prefix-other-locales": return this.matchPrefixOtherLocales(pathname, context);
			case "domains-prefix-other-locales":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixOtherLocales(pathname, context);
			case "pathname-prefix-always-no-redirect": return this.matchPrefixAlwaysNoRedirect(pathname, context);
			case "domains-prefix-always-no-redirect":
				if (this.localeHasntDomain(context.currentLocale, context.currentDomain)) return { type: "continue" };
				return this.matchPrefixAlwaysNoRedirect(pathname, context);
			default: return { type: "continue" };
		}
	}
	/**
	* Check if i18n processing should be skipped for this request
	*/
	shouldSkipProcessing(pathname, context) {
		if (pathname.includes("/404") || pathname.includes("/500")) return true;
		if (pathname.includes("/_server-islands/")) return true;
		if (context.isReroute) return true;
		if (context.routeType && context.routeType !== "page" && context.routeType !== "fallback") return true;
		return false;
	}
	/**
	* Strategy: pathname-prefix-always
	* All locales must have a prefix, including the default locale.
	*/
	matchPrefixAlways(pathname, context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return {
			type: "redirect",
			location: `${this.#base === "/" ? "" : this.#base}/${this.#defaultLocale}`
		};
		if (!context.allowUnprefixedPath && !pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-other-locales
	* Default locale has no prefix, other locales must have a prefix.
	*/
	matchPrefixOtherLocales(pathname, _context) {
		let pathnameContainsDefaultLocale = false;
		for (const segment of pathname.split("/")) if (normalizeTheLocale(segment) === normalizeTheLocale(this.#defaultLocale)) {
			pathnameContainsDefaultLocale = true;
			break;
		}
		if (pathnameContainsDefaultLocale) return {
			type: "notFound",
			location: pathname.replace(`/${this.#defaultLocale}`, "")
		};
		return { type: "continue" };
	}
	/**
	* Strategy: pathname-prefix-always-no-redirect
	* Like prefix-always but allows root to serve instead of redirecting
	*/
	matchPrefixAlwaysNoRedirect(pathname, context) {
		if (pathname === this.#base + "/" || pathname === this.#base) return { type: "continue" };
		if (!context.allowUnprefixedPath && !pathHasLocale(pathname, this.#locales)) return { type: "notFound" };
		return { type: "continue" };
	}
	/**
	* Check if the current locale doesn't belong to the configured domain.
	* Used for domain-based routing strategies.
	*/
	localeHasntDomain(currentLocale, currentDomain) {
		if (!this.#domains || !currentDomain) return false;
		if (!currentLocale) return false;
		const localesForDomain = this.#domains[currentDomain];
		if (!localesForDomain) return true;
		return !localesForDomain.includes(currentLocale);
	}
};
//#endregion
//#region node_modules/astro/dist/core/i18n/handler.js
function compileI18n(i18n, base, trailingSlash, format) {
	return {
		config: i18n,
		base,
		trailingSlash,
		format,
		router: new I18nRouter({
			strategy: i18n.strategy,
			defaultLocale: i18n.defaultLocale,
			locales: i18n.locales,
			base,
			domains: i18n.domainLookupTable ? Object.keys(i18n.domainLookupTable).reduce((acc, domain) => {
				const locale = i18n.domainLookupTable[domain];
				if (!acc[domain]) acc[domain] = [];
				acc[domain].push(locale);
				return acc;
			}, {}) : void 0
		})
	};
}
var i18nMemo = createManifestMemo((manifest) => {
	const config = manifest.i18n;
	return config && config.strategy !== "manual" ? compileI18n(config, manifest.base, manifest.trailingSlash, manifest.buildFormat) : null;
});
function getI18n(manifest) {
	return i18nMemo.get(manifest);
}
async function finalizeI18n(compiled, state, response) {
	markFeatureUsed(state.manifest, FetchFeatures.i18n);
	const i18n = compiled.config;
	if (state.skipErrorReroute && typeof i18n.fallback === "undefined") return response;
	if (state.responseRouteType !== "page" && state.responseRouteType !== "fallback") return response;
	const url = state.url;
	const currentLocale = state.computeCurrentLocale();
	const routeData = state.routeData;
	const isPrerendered = routeData.prerender;
	const routerContext = {
		currentLocale,
		currentDomain: url.hostname,
		routeType: state.responseRouteType,
		isReroute: false,
		allowUnprefixedPath: routeData.origin === "external" && !routeData.segments?.[0]?.some((part) => part.dynamic)
	};
	const routeDecision = compiled.router.match(url.pathname, routerContext);
	switch (routeDecision.type) {
		case "redirect": {
			let location = routeDecision.location;
			if (shouldAppendForwardSlash(compiled.trailingSlash, compiled.format)) location = appendForwardSlash(location);
			return new Response(null, {
				status: routeDecision.status ?? 302,
				headers: { Location: location }
			});
		}
		case "notFound": {
			if (isPrerendered) {
				const prerenderedRes = new Response(response.body, {
					status: 404,
					headers: response.headers
				});
				state.skipErrorReroute = true;
				if (routeDecision.location) prerenderedRes.headers.set("Location", routeDecision.location);
				return prerenderedRes;
			}
			const headers = new Headers();
			if (routeDecision.location) headers.set("Location", routeDecision.location);
			return new Response(null, {
				status: 404,
				headers
			});
		}
	}
	if (i18n.fallback && i18n.fallbackType) {
		const effectiveStatus = state.responseRouteType === "fallback" ? 404 : response.status;
		const fallbackDecision = computeFallbackRoute({
			pathname: url.pathname,
			responseStatus: effectiveStatus,
			currentLocale,
			fallback: i18n.fallback,
			fallbackType: i18n.fallbackType,
			locales: i18n.locales,
			defaultLocale: i18n.defaultLocale,
			strategy: i18n.strategy,
			base: compiled.base
		});
		switch (fallbackDecision.type) {
			case "redirect": return new Response(null, {
				status: 302,
				headers: { Location: fallbackDecision.pathname + url.search }
			});
			case "rewrite": try {
				return await state.rewrite(fallbackDecision.pathname + url.search);
			} catch {
				break;
			}
		}
	}
	return response;
}
//#endregion
//#region node_modules/astro/dist/i18n/index.js
function getPathByLocale(locale, locales) {
	for (const loopLocale of locales) if (typeof loopLocale === "string") {
		if (loopLocale === locale) return loopLocale;
	} else for (const code of loopLocale.codes) if (code === locale) return loopLocale.path;
	throw new AstroError(i18nNoLocaleFoundInPath);
}
function getAllCodes(locales) {
	const result = [];
	for (const loopLocale of locales) if (typeof loopLocale === "string") result.push(loopLocale);
	else result.push(...loopLocale.codes);
	return result;
}
//#endregion
//#region node_modules/astro/dist/i18n/utils.js
function parseLocale(header) {
	if (header === "*") return [{
		locale: header,
		qualityValue: void 0
	}];
	const result = [];
	const localeValues = header.split(",").map((str) => str.trim());
	for (const localeValue of localeValues) {
		const split = localeValue.split(";").map((str) => str.trim());
		const localeName = split[0];
		const qualityValue = split[1];
		if (!split) continue;
		if (qualityValue && qualityValue.startsWith("q=")) {
			const qualityValueAsFloat = Number.parseFloat(qualityValue.slice(2));
			if (Number.isNaN(qualityValueAsFloat) || qualityValueAsFloat > 1) result.push({
				locale: localeName,
				qualityValue: void 0
			});
			else result.push({
				locale: localeName,
				qualityValue: qualityValueAsFloat
			});
		} else result.push({
			locale: localeName,
			qualityValue: void 0
		});
	}
	return result;
}
function sortAndFilterLocales(browserLocaleList, locales) {
	const normalizedLocales = getAllCodes(locales).map(normalizeTheLocale);
	return browserLocaleList.filter((browserLocale) => {
		if (browserLocale.locale !== "*") return normalizedLocales.includes(normalizeTheLocale(browserLocale.locale));
		return true;
	}).sort((a, b) => {
		const qa = a.locale === "*" ? a.qualityValue ?? 0 : a.qualityValue ?? 1;
		return (b.locale === "*" ? b.qualityValue ?? 0 : b.qualityValue ?? 1) - qa;
	});
}
function computePreferredLocale(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = void 0;
	if (acceptHeader) {
		const firstResult = sortAndFilterLocales(parseLocale(acceptHeader), locales).at(0);
		if (firstResult && firstResult.locale !== "*") {
			outer: for (const currentLocale of locales) if (typeof currentLocale === "string") {
				if (normalizeTheLocale(currentLocale) === normalizeTheLocale(firstResult.locale)) {
					result = currentLocale;
					break;
				}
			} else for (const currentCode of currentLocale.codes) if (normalizeTheLocale(currentCode) === normalizeTheLocale(firstResult.locale)) {
				result = currentCode;
				break outer;
			}
		}
	}
	return result;
}
function computePreferredLocaleList(request, locales) {
	const acceptHeader = request.headers.get("Accept-Language");
	let result = [];
	if (acceptHeader) {
		const browserLocaleList = sortAndFilterLocales(parseLocale(acceptHeader), locales);
		if (browserLocaleList.length === 1 && browserLocaleList.at(0).locale === "*") return getAllCodes(locales);
		else if (browserLocaleList.length > 0) {
			for (const browserLocale of browserLocaleList) for (const loopLocale of locales) if (typeof loopLocale === "string") {
				if (normalizeTheLocale(loopLocale) === normalizeTheLocale(browserLocale.locale)) result.push(loopLocale);
			} else for (const code of loopLocale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(browserLocale.locale)) result.push(code);
		}
	}
	return result;
}
function computeCurrentLocale(pathname, locales, defaultLocale) {
	for (const segment of pathname.split("/").map(normalizeThePath)) for (const locale of locales) if (typeof locale === "string") {
		if (!segment.includes(locale)) continue;
		if (normalizeTheLocale(locale) === normalizeTheLocale(segment)) return locale;
	} else if (locale.path === segment) return locale.codes.at(0);
	else for (const code of locale.codes) if (normalizeTheLocale(code) === normalizeTheLocale(segment)) return code;
	for (const locale of locales) if (typeof locale === "string") {
		if (locale === defaultLocale) return locale;
	} else if (locale.path === defaultLocale) return locale.codes.at(0);
}
function computeCurrentLocaleFromParams(params, locales) {
	const byNormalizedCode = /* @__PURE__ */ new Map();
	const byPath = /* @__PURE__ */ new Map();
	for (const locale of locales) if (typeof locale === "string") byNormalizedCode.set(normalizeTheLocale(locale), locale);
	else {
		byPath.set(locale.path, locale.codes[0]);
		for (const code of locale.codes) byNormalizedCode.set(normalizeTheLocale(code), code);
	}
	for (const value of Object.values(params)) {
		if (!value) continue;
		const pathMatch = byPath.get(value);
		if (pathMatch) return pathMatch;
		const codeMatch = byNormalizedCode.get(normalizeTheLocale(value));
		if (codeMatch) return codeMatch;
	}
}
//#endregion
//#region node_modules/astro/dist/core/app/prepare-response.js
function prepareResponse(response, { addCookieHeader }) {
	if (addCookieHeader) for (const setCookieHeaderValue of getSetCookiesFromResponse(response)) response.headers.append("set-cookie", setCookieHeaderValue);
	Reflect.set(response, responseSentSymbol$1, true);
}
//#endregion
//#region node_modules/astro/dist/core/pages/handler.js
var EMPTY_SLOTS = Object.freeze({});
async function handlePages(state, ctx) {
	const { logger, streaming } = state;
	state.resetResponseMetadata();
	let response;
	const componentInstance = await state.loadComponentInstance();
	switch (state.routeData.type) {
		case "endpoint":
			response = await renderEndpoint(componentInstance, ctx, state.routeData.prerender, logger, state);
			break;
		case "page": {
			const props = await state.getProps();
			const actionApiContext = state.getActionAPIContext();
			const result = await state.createResult(componentInstance, actionApiContext);
			try {
				response = await renderPage(result, componentInstance?.default, props, state.slots ?? EMPTY_SLOTS, streaming, state.routeData);
			} catch (e) {
				result.cancelled = true;
				throw e;
			}
			state.responseRouteType = "page";
			if (state.routeData.route === "/404" || state.routeData.route === "/500") state.skipErrorReroute = true;
			break;
		}
		case "redirect": return new Response(null, {
			status: 404,
			headers: { [ASTRO_ERROR_HEADER]: "true" }
		});
		case "fallback":
			state.responseRouteType = "fallback";
			return new Response(null, { status: 500 });
	}
	const responseCookies = getCookiesFromResponse(response);
	if (responseCookies) state.cookies.merge(responseCookies);
	state.response = response;
	return response;
}
//#endregion
//#region node_modules/astro/dist/core/routing/match.js
function matchRoute$1(pathname, manifest) {
	if (isRoute404(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute404(route.route));
		if (errorRoute) return errorRoute;
	}
	if (isRoute500(pathname)) {
		const errorRoute = manifest.routes.find((route) => isRoute500(route.route));
		if (errorRoute) return errorRoute;
	}
	return manifest.routes.find((route) => {
		return route.pattern.test(pathname) || route.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
	});
}
function isRoute404or500(route) {
	return isRoute404(route.route) || isRoute500(route.route);
}
function isRouteServerIsland(route) {
	return route.component === SERVER_ISLAND_COMPONENT;
}
//#endregion
//#region node_modules/astro/dist/core/routing/astro-designed-error-pages.js
function ensure404Route(manifest) {
	if (!manifest.routes.some((route) => route.route === "/404")) manifest.routes.push(DEFAULT_404_ROUTE);
	return manifest;
}
//#endregion
//#region node_modules/astro/dist/core/routing/priority.js
function routeComparator(a, b) {
	const commonLength = Math.min(a.segments.length, b.segments.length);
	for (let index = 0; index < commonLength; index++) {
		const aSegment = a.segments[index];
		const bSegment = b.segments[index];
		const aIsStatic = aSegment.every((part) => !part.dynamic && !part.spread);
		const bIsStatic = bSegment.every((part) => !part.dynamic && !part.spread);
		if (aIsStatic && bIsStatic) {
			const aContent = aSegment.map((part) => part.content).join("");
			const bContent = bSegment.map((part) => part.content).join("");
			if (aContent !== bContent) return aContent.localeCompare(bContent);
		}
		if (aIsStatic !== bIsStatic) return aIsStatic ? -1 : 1;
		const aAllDynamic = aSegment.every((part) => part.dynamic);
		if (aAllDynamic !== bSegment.every((part) => part.dynamic)) return aAllDynamic ? 1 : -1;
		const aHasSpread = aSegment.some((part) => part.spread);
		if (aHasSpread !== bSegment.some((part) => part.spread)) return aHasSpread ? 1 : -1;
	}
	const aLength = a.segments.length;
	const bLength = b.segments.length;
	if (aLength !== bLength) {
		const aEndsInRest = a.segments.at(-1)?.some((part) => part.spread);
		const bEndsInRest = b.segments.at(-1)?.some((part) => part.spread);
		if (aEndsInRest !== bEndsInRest && Math.abs(aLength - bLength) === 1) {
			if (aLength > bLength && aEndsInRest) return 1;
			if (bLength > aLength && bEndsInRest) return -1;
		}
		return aLength > bLength ? -1 : 1;
	}
	if (a.type === "endpoint" !== (b.type === "endpoint")) return a.type === "endpoint" ? -1 : 1;
	return a.route.localeCompare(b.route);
}
//#endregion
//#region node_modules/astro/dist/core/routing/router.js
var Router = class {
	#routes;
	#base;
	#baseWithoutTrailingSlash;
	#buildFormat;
	#trailingSlash;
	constructor(routes, options) {
		this.#routes = [...routes].sort(routeComparator);
		this.#base = normalizeBase(options.base);
		this.#baseWithoutTrailingSlash = removeTrailingForwardSlash(this.#base);
		this.#buildFormat = options.buildFormat;
		this.#trailingSlash = options.trailingSlash;
	}
	/**
	* Match an input pathname against the route list.
	* If allowWithoutBase is true, a non-base-prefixed path is still considered.
	*/
	match(inputPathname, { allowWithoutBase = false } = {}) {
		const normalized = getRedirectForPathname(inputPathname);
		if (normalized.redirect) return {
			type: "redirect",
			location: normalized.redirect,
			status: 301
		};
		if (this.#base !== "/") {
			const baseWithSlash = `${this.#baseWithoutTrailingSlash}/`;
			if (this.#trailingSlash === "always" && (normalized.pathname === this.#baseWithoutTrailingSlash || normalized.pathname === this.#base)) return {
				type: "redirect",
				location: baseWithSlash,
				status: 301
			};
			if (this.#trailingSlash === "never" && normalized.pathname === baseWithSlash) return {
				type: "redirect",
				location: this.#baseWithoutTrailingSlash,
				status: 301
			};
		}
		const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
		if (!baseResult) {
			if (!allowWithoutBase) return {
				type: "none",
				reason: "outside-base"
			};
		}
		let pathname = baseResult ?? normalized.pathname;
		if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
		const route = this.#routes.find((candidate) => {
			if (candidate.pattern.test(pathname)) return true;
			return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
		});
		if (!route) return {
			type: "none",
			reason: "no-match"
		};
		return {
			type: "match",
			route,
			params: getParams(route, pathname),
			pathname
		};
	}
	/**
	* Returns all routes that match the given pathname, in priority order.
	* Used when the first match (e.g. a prerendered route) cannot serve
	* the request and subsequent matches need to be tried.
	*/
	matchAll(inputPathname, { allowWithoutBase = false } = {}) {
		const normalized = getRedirectForPathname(inputPathname);
		if (normalized.redirect) return [];
		const baseResult = stripBase(normalized.pathname, this.#base, this.#baseWithoutTrailingSlash, this.#trailingSlash);
		if (!baseResult && !allowWithoutBase) return [];
		let pathname = baseResult ?? normalized.pathname;
		if (this.#buildFormat === "file") pathname = normalizeFileFormatPathname(pathname);
		return this.#routes.filter((candidate) => {
			if (candidate.pattern.test(pathname)) return true;
			return candidate.fallbackRoutes.some((fallbackRoute) => fallbackRoute.pattern.test(pathname));
		});
	}
};
function normalizeBase(base) {
	if (!base) return "/";
	if (base === "/") return base;
	return prependForwardSlash$1(base);
}
function getRedirectForPathname(pathname) {
	let value = prependForwardSlash$1(pathname);
	if (value.startsWith("//")) return {
		pathname: value,
		redirect: `/${value.replace(/^\/+/, "")}`
	};
	return { pathname: value };
}
function stripBase(pathname, base, baseWithoutTrailingSlash, trailingSlash) {
	if (base === "/") return pathname;
	const baseWithSlash = `${baseWithoutTrailingSlash}/`;
	if (pathname === baseWithoutTrailingSlash || pathname === base) return trailingSlash === "always" ? null : "/";
	if (pathname === baseWithSlash) return trailingSlash === "never" ? null : "/";
	if (pathname.startsWith(baseWithSlash)) return pathname.slice(baseWithoutTrailingSlash.length);
	return null;
}
function normalizeFileFormatPathname(pathname) {
	if (pathname.endsWith("/index.html")) {
		const trimmed = pathname.slice(0, -11);
		return trimmed === "" ? "/" : trimmed;
	}
	if (pathname.endsWith(".html")) {
		const trimmed = pathname.slice(0, -5);
		return trimmed === "" ? "/" : trimmed;
	}
	return pathname;
}
//#endregion
//#region node_modules/astro/dist/core/routing/route-table.js
function compileRouteTable(manifest, routes) {
	const routesList = ensure404Route({ routes });
	const router = new Router(routesList.routes, {
		base: manifest.base,
		trailingSlash: manifest.trailingSlash,
		buildFormat: manifest.buildFormat
	});
	return {
		routes: routesList.routes,
		router
	};
}
var routeTables = createManifestMemo((manifest) => compileRouteTable(manifest, (manifest.routes ?? []).map((route) => route.routeData)));
function getRouteTable(manifest) {
	return routeTables.get(manifest);
}
function updateRouteTable(manifest, routes) {
	routeTables.set(manifest, compileRouteTable(manifest, [...routes]));
}
function matchRoute(manifest, pathname) {
	const match = getRouteTable(manifest).router.match(pathname, { allowWithoutBase: true });
	if (match.type !== "match") return void 0;
	return match.route;
}
function matchAllRoutes(manifest, pathname) {
	return getRouteTable(manifest).router.matchAll(pathname, { allowWithoutBase: true });
}
//#endregion
//#region node_modules/astro/dist/core/session/driver.js
var sessionDriverMemo = createAsyncManifestMemo(async (manifest) => {
	if (manifest.sessionDriver) return (await manifest.sessionDriver())?.default || null;
	return null;
});
function getSessionDriver(manifest) {
	return sessionDriverMemo.get(manifest);
}
//#endregion
//#region node_modules/astro/dist/core/session/runtime.js
var PERSIST_SYMBOL = /* @__PURE__ */ Symbol();
var DEFAULT_COOKIE_NAME = "astro-session";
var VALID_COOKIE_REGEX = /^[\w-]+$/;
var UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
var unflatten$1 = (parsed, _) => {
	return unflatten(parsed, { URL: (href) => new URL(href) });
};
var stringify$1 = (data, _) => {
	return stringify(data, { URL: (val) => val instanceof URL && val.href });
};
var AstroSession = class AstroSession {
	#cookies;
	#config;
	#cookieConfig;
	#cookieName;
	#storage;
	#data;
	#sessionID;
	#toDestroy = /* @__PURE__ */ new Set();
	#toDelete = /* @__PURE__ */ new Set();
	#dirty = false;
	#cookieSet = false;
	#sessionIDFromCookie = false;
	#partial = true;
	#logger;
	#driverFactory;
	static #sharedStorage = /* @__PURE__ */ new Map();
	constructor({ cookies, config, runtimeMode, driverFactory, mockStorage, logger }) {
		this.#logger = logger;
		if (!config) throw new AstroError({
			...SessionStorageInitError,
			message: SessionStorageInitError.message("No driver was defined in the session configuration and the adapter did not provide a default driver.")
		});
		this.#cookies = cookies;
		this.#driverFactory = driverFactory;
		const { cookie: cookieConfig = DEFAULT_COOKIE_NAME, ...configRest } = config;
		let cookieConfigObject;
		if (typeof cookieConfig === "object") {
			const { name = DEFAULT_COOKIE_NAME, ...rest } = cookieConfig;
			this.#cookieName = name;
			cookieConfigObject = rest;
		} else this.#cookieName = cookieConfig || DEFAULT_COOKIE_NAME;
		this.#cookieConfig = {
			sameSite: "lax",
			secure: runtimeMode === "production",
			path: "/",
			...cookieConfigObject,
			httpOnly: true
		};
		this.#config = configRest;
		if (mockStorage) this.#storage = mockStorage;
	}
	/**
	* Gets a session value. Returns `undefined` if the session or value does not exist.
	*/
	async get(key) {
		return (await this.#ensureData()).get(key)?.data;
	}
	/**
	* Checks if a session value exists.
	*/
	async has(key) {
		return (await this.#ensureData()).has(key);
	}
	/**
	* Gets all session values.
	*/
	async keys() {
		return (await this.#ensureData()).keys();
	}
	/**
	* Gets all session values.
	*/
	async values() {
		return [...(await this.#ensureData()).values()].map((entry) => entry.data);
	}
	/**
	* Gets all session entries.
	*/
	async entries() {
		return [...(await this.#ensureData()).entries()].map(([key, entry]) => [key, entry.data]);
	}
	/**
	* Deletes a session value.
	*/
	delete(key) {
		this.#data ??= /* @__PURE__ */ new Map();
		this.#data.delete(key);
		if (this.#partial) this.#toDelete.add(key);
		this.#dirty = true;
	}
	/**
	* Sets a session value. The session is created if it does not exist.
	*/
	set(key, value, { ttl } = {}) {
		if (!key) throw new AstroError({
			...SessionStorageSaveError,
			message: "The session key was not provided."
		});
		let cloned;
		try {
			cloned = unflatten$1(JSON.parse(stringify$1(value)));
		} catch (err) {
			throw new AstroError({
				...SessionStorageSaveError,
				message: `The session data for ${key} could not be serialized.`,
				hint: "See the devalue library for all supported types: https://github.com/rich-harris/devalue"
			}, { cause: err });
		}
		if (!this.#cookieSet) {
			this.#setCookie();
			this.#cookieSet = true;
		}
		this.#data ??= /* @__PURE__ */ new Map();
		const lifetime = ttl ?? this.#config.ttl;
		const expires = typeof lifetime === "number" ? Date.now() + lifetime * 1e3 : lifetime;
		this.#data.set(key, {
			data: cloned,
			expires
		});
		this.#dirty = true;
	}
	/**
	* Destroys the session, clearing the cookie and storage if it exists.
	*/
	destroy() {
		const cookieValue = this.#cookies.get(this.#cookieName)?.value;
		const sessionId = this.#sessionID ?? (cookieValue && UUID_REGEX.test(cookieValue) ? cookieValue : void 0);
		if (sessionId) this.#toDestroy.add(sessionId);
		this.#cookies.delete(this.#cookieName, this.#cookieConfig);
		this.#sessionID = void 0;
		this.#data = void 0;
		this.#dirty = true;
	}
	/**
	* Regenerates the session, creating a new session ID. The existing session data is preserved.
	*/
	async regenerate() {
		let data = /* @__PURE__ */ new Map();
		try {
			data = await this.#ensureData();
		} catch (err) {
			this.#logger.error("session", `Failed to load session data during regeneration: ${err}`);
			this.#partial = false;
		}
		const oldSessionId = this.#sessionID;
		this.#sessionID = crypto.randomUUID();
		this.#sessionIDFromCookie = false;
		this.#data = data;
		this.#dirty = true;
		await this.#setCookie();
		if (oldSessionId && this.#storage) this.#storage.removeItem(oldSessionId).catch((err) => {
			this.#logger.error("session", `Failed to remove old session ${oldSessionId}: ${err}`);
		});
	}
	async [PERSIST_SYMBOL]() {
		if (!this.#dirty && !this.#toDestroy.size) return;
		const storage = await this.#ensureStorage();
		if (this.#dirty && this.#data) {
			const data = await this.#ensureData();
			this.#toDelete.forEach((key2) => data.delete(key2));
			const key = this.#ensureSessionID();
			let serialized;
			try {
				serialized = stringify$1(data);
			} catch (err) {
				throw new AstroError({
					...SessionStorageSaveError,
					message: SessionStorageSaveError.message("The session data could not be serialized.", this.#config.driver)
				}, { cause: err });
			}
			await storage.setItem(key, serialized);
			this.#dirty = false;
		}
		if (this.#toDestroy.size > 0) {
			const cleanupPromises = [...this.#toDestroy].map((sessionId) => storage.removeItem(sessionId).catch((err) => {
				this.#logger.error("session", `Failed to remove session ${sessionId}: ${err}`);
			}));
			await Promise.all(cleanupPromises);
			this.#toDestroy.clear();
		}
	}
	get sessionID() {
		return this.#sessionID;
	}
	/**
	* Loads a session from storage with the given ID, and replaces the current session.
	* Any changes made to the current session will be lost.
	* This is not normally needed, as the session is automatically loaded using the cookie.
	* However it can be used to restore a session where the ID has been recorded somewhere
	* else (e.g. in a database).
	*/
	async load(sessionID) {
		this.#sessionID = sessionID;
		this.#data = void 0;
		await this.#setCookie();
		await this.#ensureData();
	}
	/**
	* Sets the session cookie.
	*/
	async #setCookie() {
		if (!VALID_COOKIE_REGEX.test(this.#cookieName)) throw new AstroError({
			...SessionStorageSaveError,
			message: "Invalid cookie name. Cookie names can only contain letters, numbers, and dashes."
		});
		const value = this.#ensureSessionID();
		this.#cookies.set(this.#cookieName, value, this.#cookieConfig);
	}
	/**
	* Attempts to load the session data from storage, or creates a new data object if none exists.
	* If there is existing partial data, it will be merged into the new data object.
	*/
	async #ensureData() {
		if (this.#data && !this.#partial) return this.#data;
		this.#data ??= /* @__PURE__ */ new Map();
		if (!this.#sessionID && !this.#cookies.get(this.#cookieName)?.value) {
			this.#partial = false;
			return this.#data;
		}
		const raw = await (await this.#ensureStorage()).get(this.#ensureSessionID());
		if (!raw) {
			if (this.#sessionIDFromCookie) {
				this.#sessionID = crypto.randomUUID();
				this.#sessionIDFromCookie = false;
				if (this.#cookieSet) await this.#setCookie();
			}
			return this.#data;
		}
		try {
			const storedMap = unflatten$1(raw);
			if (!(storedMap instanceof Map)) {
				this.destroy();
				throw new AstroError({
					...SessionStorageInitError,
					message: SessionStorageInitError.message("The session data was an invalid type.", this.#config.driver)
				});
			}
			const now = Date.now();
			for (const [key, value] of storedMap) {
				const expired = typeof value.expires === "number" && value.expires < now;
				if (!this.#data.has(key) && !this.#toDelete.has(key) && !expired) this.#data.set(key, value);
			}
			this.#partial = false;
			return this.#data;
		} catch (err) {
			this.destroy();
			if (err instanceof AstroError) throw err;
			throw new AstroError({
				...SessionStorageInitError,
				message: SessionStorageInitError.message("The session data could not be parsed.", this.#config.driver)
			}, { cause: err });
		}
	}
	/**
	* Returns the session ID, generating a new one if it does not exist.
	*/
	#ensureSessionID() {
		if (!this.#sessionID) {
			const cookieValue = this.#cookies.get(this.#cookieName)?.value;
			if (cookieValue && UUID_REGEX.test(cookieValue)) {
				this.#sessionID = cookieValue;
				this.#sessionIDFromCookie = true;
			} else this.#sessionID = crypto.randomUUID();
		}
		return this.#sessionID;
	}
	/**
	* Ensures the storage is initialized.
	* This is called automatically when a storage operation is needed.
	*/
	async #ensureStorage() {
		if (this.#storage) return this.#storage;
		if (AstroSession.#sharedStorage.has(this.#config.driver)) {
			this.#storage = AstroSession.#sharedStorage.get(this.#config.driver);
			return this.#storage;
		}
		if (!this.#driverFactory) throw new AstroError({
			...SessionStorageInitError,
			message: SessionStorageInitError.message("Astro could not load the driver correctly. Does it exist?", this.#config.driver)
		});
		const driver = this.#driverFactory;
		try {
			this.#storage = createStorage({ driver: {
				...driver(this.#config.options),
				hasItem() {
					return false;
				},
				getKeys() {
					return [];
				}
			} });
			AstroSession.#sharedStorage.set(this.#config.driver, this.#storage);
			return this.#storage;
		} catch (err) {
			throw new AstroError({
				...SessionStorageInitError,
				message: SessionStorageInitError.message("Unknown error", this.#config.driver)
			}, { cause: err });
		}
	}
};
//#endregion
//#region node_modules/astro/dist/core/session/handler.js
var SESSION_KEY = "session";
function provideSession(state) {
	markFeatureUsed(state.manifest, FetchFeatures.sessions);
	const config = state.manifest.sessionConfig;
	if (!config) return;
	return provideSessionAsync(state, config);
}
async function provideSessionAsync(state, config) {
	const driverFactory = await getSessionDriver(state.manifest);
	if (!driverFactory) return;
	state.provide(SESSION_KEY, {
		create() {
			const cookies = state.cookies;
			return new AstroSession({
				cookies,
				config,
				runtimeMode: getEnvironment(state.manifest).runtimeMode,
				driverFactory,
				mockStorage: null,
				logger: state.logger
			});
		},
		finalize(session) {
			return session[PERSIST_SYMBOL]();
		}
	});
}
//#endregion
//#region node_modules/astro/dist/core/app/validate-headers.js
function getFirstForwardedValue(multiValueHeader) {
	return multiValueHeader?.toString().split(",").map((e) => e.trim())[0];
}
function sanitizeHost(hostname) {
	if (!hostname) return void 0;
	if (/[/\\]/.test(hostname)) return void 0;
	return hostname;
}
function parseHost(host) {
	const parts = host.split(":");
	if (parts.length > 2) return void 0;
	return {
		hostname: parts[0],
		port: parts[1]
	};
}
function matchesAllowedDomains(hostname, protocol, port, allowedDomains) {
	const urlString = `${protocol}://${port ? `${hostname}:${port}` : hostname}`;
	if (!URL.canParse(urlString)) return false;
	const testUrl = new URL(urlString);
	return allowedDomains.some((pattern) => matchPattern(testUrl, pattern));
}
function validateHost(host, protocol, allowedDomains) {
	if (!host || host.length === 0) return void 0;
	if (!allowedDomains || allowedDomains.length === 0) return void 0;
	const sanitized = sanitizeHost(host);
	if (!sanitized) return void 0;
	const parsed = parseHost(sanitized);
	if (!parsed) return void 0;
	const { hostname, port } = parsed;
	if (matchesAllowedDomains(hostname, protocol, port, allowedDomains)) return sanitized;
}
function validateForwardedHeaders(forwardedProtocol, forwardedHost, forwardedPort, allowedDomains) {
	const result = {};
	if (forwardedProtocol) {
		if (allowedDomains && allowedDomains.length > 0) {
			if (allowedDomains.some((pattern) => pattern.protocol !== void 0)) try {
				const testUrl = new URL(`${forwardedProtocol}://example.com`);
				if (allowedDomains.some((pattern) => matchPattern(testUrl, { protocol: pattern.protocol }))) result.protocol = forwardedProtocol;
			} catch {}
			else if (/^https?$/.test(forwardedProtocol)) result.protocol = forwardedProtocol;
		}
	}
	if (forwardedPort && allowedDomains && allowedDomains.length > 0) {
		if (allowedDomains.some((pattern) => pattern.port !== void 0)) {
			if (allowedDomains.some((pattern) => pattern.port === forwardedPort)) result.port = forwardedPort;
		}
	}
	if (forwardedHost && forwardedHost.length > 0 && allowedDomains && allowedDomains.length > 0) {
		const protoForValidation = result.protocol || "https";
		const sanitized = sanitizeHost(forwardedHost);
		const parsed = sanitized ? parseHost(sanitized) : void 0;
		if (sanitized && parsed) {
			const { hostname, port: portFromHost } = parsed;
			if (matchesAllowedDomains(hostname, protoForValidation, result.port || portFromHost, allowedDomains)) result.host = sanitized;
		}
	}
	return result;
}
//#endregion
//#region node_modules/astro/dist/core/output-filename.js
var STATUS_CODE_PAGES = /* @__PURE__ */ new Set(["/404", "/500"]);
function getOutputFilename(buildFormat, name, routeData) {
	if (routeData.type === "endpoint") return name;
	if (name === "/" || name === "") return name === "" ? "index.html" : "/index.html";
	if (buildFormat === "file" || STATUS_CODE_PAGES.has(name)) return `${removeTrailingForwardSlash(name || "index")}.html`;
	if (buildFormat === "preserve" && !routeData.isIndex) return `${removeTrailingForwardSlash(name || "index")}.html`;
	return `${removeTrailingForwardSlash(name)}/index.html`;
}
//#endregion
//#region node_modules/astro/dist/core/errors/default-handler.js
async function renderDefaultError(manifest, request, { status, response: originalResponse, skipMiddleware = false, error, pathname, ...resolvedRenderOptions }) {
	const resolvedPathname = pathname ?? new FetchState(manifest, request).pathname;
	const routeTable = getRouteTable(manifest);
	const errorRouteData = matchRoute$1(getErrorRoutePath(resolvedPathname, status, routeTable.routes, manifest.i18n?.locales, manifest.trailingSlash === "always"), routeTable);
	const url = new URL(request.url);
	if (errorRouteData) {
		if (errorRouteData.prerender) {
			const allowedDomains = manifest.allowedDomains;
			const safeOrigin = validateHost(url.host, url.protocol.replace(":", ""), allowedDomains) ? url.origin : `${url.protocol}//localhost`;
			const statusURL = new URL(`${removeTrailingForwardSlash(manifest.base)}${getOutputFilename(manifest.buildFormat, errorRouteData.route, errorRouteData)}`, safeOrigin);
			if (statusURL.toString() !== request.url && resolvedRenderOptions.prerenderedErrorPageFetch) try {
				const newResponse = mergeResponses(await resolvedRenderOptions.prerenderedErrorPageFetch(statusURL.toString()), originalResponse, {
					status,
					removeContentEncodingHeaders: true
				});
				prepareResponse(newResponse, resolvedRenderOptions);
				return newResponse;
			} catch {
				const response2 = mergeResponses(new Response(null, { status }), originalResponse);
				prepareResponse(response2, resolvedRenderOptions);
				return response2;
			}
		}
		const mod = await getEnvironment(manifest).getComponentByRoute(manifest, errorRouteData);
		const errorState = new FetchState(manifest, request);
		errorState.skipMiddleware = skipMiddleware;
		errorState.clientAddress = resolvedRenderOptions.clientAddress;
		errorState.routeData = errorRouteData;
		errorState.pathname = resolvedPathname;
		errorState.status = status;
		errorState.componentInstance = mod;
		errorState.locals = resolvedRenderOptions.locals ?? {};
		errorState.initialProps = { error };
		try {
			await provideSession(errorState);
			const response2 = await handleMiddleware(errorState, handlePages);
			if (rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, errorState.routeData, response2)) return renderDefaultError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				response: originalResponse,
				skipMiddleware: true,
				pathname: resolvedPathname
			});
			const newResponse = mergeResponses(response2, originalResponse);
			prepareResponse(newResponse, resolvedRenderOptions);
			return newResponse;
		} catch {
			if (skipMiddleware === false) return renderDefaultError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				response: originalResponse,
				skipMiddleware: true,
				pathname: resolvedPathname
			});
		} finally {
			await errorState.finalizeAll();
		}
	}
	const response = mergeResponses(new Response(null, { status }), originalResponse);
	prepareResponse(response, resolvedRenderOptions);
	return response;
}
function mergeResponses(newResponse, originalResponse, override) {
	let newResponseHeaders = newResponse.headers;
	if (override?.removeContentEncodingHeaders) {
		newResponseHeaders = new Headers(newResponseHeaders);
		newResponseHeaders.delete("Content-Encoding");
		newResponseHeaders.delete("Content-Length");
	}
	if (!originalResponse) {
		if (override !== void 0) return new Response(newResponse.body, {
			status: override.status,
			statusText: newResponse.statusText,
			headers: newResponseHeaders
		});
		return newResponse;
	}
	const status = override?.status ? override.status : originalResponse.status === 200 ? newResponse.status : originalResponse.status;
	try {
		originalResponse.headers.delete("Content-type");
		originalResponse.headers.delete("Content-Length");
		originalResponse.headers.delete("Transfer-Encoding");
	} catch {}
	const newHeaders = new Headers();
	const seen = /* @__PURE__ */ new Set();
	for (const [name, value] of originalResponse.headers) {
		newHeaders.append(name, value);
		seen.add(name.toLowerCase());
	}
	for (const [name, value] of newResponseHeaders) {
		const lower = name.toLowerCase();
		if (!seen.has(lower) || lower === "set-cookie") newHeaders.append(name, value);
	}
	const mergedResponse = new Response(newResponse.body, {
		status,
		statusText: status === 200 ? newResponse.statusText : originalResponse.statusText,
		headers: newHeaders
	});
	const originalCookies = getCookiesFromResponse(originalResponse);
	const newCookies = getCookiesFromResponse(newResponse);
	if (originalCookies) {
		if (newCookies) originalCookies.merge(newCookies);
		attachCookiesToResponse(mergedResponse, originalCookies);
	} else if (newCookies) attachCookiesToResponse(mergedResponse, newCookies);
	return mergedResponse;
}
//#endregion
//#region node_modules/astro/dist/core/errors/build-handler.js
async function renderBuildError(manifest, request, options) {
	if (options.status === 500) {
		if (options.response) return options.response;
		throw options.error;
	}
	return renderDefaultError(manifest, request, {
		...options,
		prerenderedErrorPageFetch: void 0
	});
}
//#endregion
//#region node_modules/astro/dist/core/errors/dev-handler.js
async function renderDevError(manifest, request, { skipMiddleware = false, error, status, response: _response, pathname, ...resolvedRenderOptions }, { shouldInjectCspMetaTags }) {
	if (isAstroError(error) && [MiddlewareNoDataOrNextCalled.name, MiddlewareNotAResponse.name].includes(error.name)) throw error;
	const resolvedPathname = pathname ?? new FetchState(manifest, request).pathname;
	const renderRoute = async (routeData) => {
		try {
			const preloadedComponent = await getEnvironment(manifest).getComponentByRoute(manifest, routeData);
			const errorState = new FetchState(manifest, request);
			errorState.skipMiddleware = skipMiddleware;
			errorState.clientAddress = resolvedRenderOptions.clientAddress;
			errorState.shouldInjectCspMetaTags = shouldInjectCspMetaTags ? !!manifest.csp : false;
			errorState.routeData = routeData;
			errorState.pathname = resolvedPathname;
			errorState.status = status;
			errorState.componentInstance = preloadedComponent;
			errorState.locals = resolvedRenderOptions.locals ?? {};
			errorState.initialProps = { error };
			const response = await handleMiddleware(errorState, handlePages);
			if (rewroteToEmptyErrorResponse(skipMiddleware, routeData, errorState.routeData, response)) return renderDevError(manifest, request, {
				...resolvedRenderOptions,
				status,
				error,
				skipMiddleware: true,
				pathname: resolvedPathname
			}, { shouldInjectCspMetaTags });
			if (error) getLogger(manifest).error("router", error.stack || error.message);
			return response;
		} catch (_err) {
			if (skipMiddleware === false) return renderDevError(manifest, request, {
				...resolvedRenderOptions,
				status: 500,
				skipMiddleware: true,
				error: _err,
				pathname: resolvedPathname
			}, { shouldInjectCspMetaTags });
			throw _err;
		}
	};
	if (status === 404) {
		const custom404 = getCustom404Route(getRouteTable(manifest));
		if (custom404) return renderRoute(custom404);
	}
	const custom500 = getCustom500Route(getRouteTable(manifest));
	if (!custom500) throw error;
	else return renderRoute(custom500);
}
//#endregion
//#region node_modules/astro/dist/core/errors/handler.js
function renderErrorPage(manifest, request, options) {
	const env = getEnvironment(manifest);
	switch (env.errorStrategy) {
		case "dev": return renderDevError(manifest, request, options, { shouldInjectCspMetaTags: env.injectCspMetaTagsOnErrorPages });
		case "build": return renderBuildError(manifest, request, options);
		case "default": return renderDefaultError(manifest, request, options);
	}
}
function renderErrorFromState(state, request, options) {
	if (state.renderError) return state.renderError(request, options);
	return renderErrorPage(state.manifest, request, options);
}
function rewroteToEmptyErrorResponse(skipMiddleware, errorRouteData, renderedRouteData, response) {
	return skipMiddleware === false && renderedRouteData !== errorRouteData && response.body === null && REROUTABLE_STATUS_CODES.includes(response.status);
}
//#endregion
//#region node_modules/astro/dist/core/middleware/callMiddleware.js
async function callMiddleware(onRequest, apiContext, responseFunction) {
	let nextCalled = false;
	let responseFunctionPromise = void 0;
	const next = async (payload) => {
		nextCalled = true;
		responseFunctionPromise = responseFunction(apiContext, payload);
		return responseFunctionPromise;
	};
	const middlewarePromise = onRequest(apiContext, next);
	return await Promise.resolve(middlewarePromise).then(async (value) => {
		if (nextCalled) {
			if (typeof value !== "undefined") {
				if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
				return value;
			} else if (responseFunctionPromise) return responseFunctionPromise;
			else throw new AstroError(MiddlewareNotAResponse);
		} else if (typeof value === "undefined") throw new AstroError(MiddlewareNoDataOrNextCalled);
		else if (value instanceof Response === false) throw new AstroError(MiddlewareNotAResponse);
		else return value;
	});
}
//#endregion
//#region node_modules/astro/dist/core/middleware/load.js
var resolvedMiddleware = /* @__PURE__ */ new WeakMap();
var middlewareMemo = createAsyncManifestMemo(async (manifest) => {
	let handler;
	if (manifest.middleware) {
		const internalMiddlewares = [(await manifest.middleware()).onRequest ?? NOOP_MIDDLEWARE_FN];
		if (manifest.checkOrigin) internalMiddlewares.unshift(createOriginCheckMiddleware());
		handler = sequence(...internalMiddlewares);
	} else handler = NOOP_MIDDLEWARE_FN;
	resolvedMiddleware.set(manifest, handler);
	return handler;
});
function getMiddleware(manifest) {
	return middlewareMemo.get(manifest);
}
//#endregion
//#region node_modules/astro/dist/core/cache/runtime/noop.js
var EMPTY_OPTIONS = Object.freeze({ tags: [] });
var NoopAstroCache = class {
	enabled = false;
	set() {}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {}
};
var hasWarned = false;
var DisabledAstroCache = class {
	enabled = false;
	#logger;
	constructor(logger) {
		this.#logger = logger;
	}
	#warn() {
		if (!hasWarned) {
			hasWarned = true;
			this.#logger?.warn("cache", "`cache.set()` was called but caching is not enabled. Configure a cache provider in your Astro config under `cache` to enable caching.");
		}
	}
	set() {
		this.#warn();
	}
	get tags() {
		return [];
	}
	get options() {
		return EMPTY_OPTIONS;
	}
	async invalidate() {
		throw new AstroError(CacheNotEnabled);
	}
};
//#endregion
//#region node_modules/astro/dist/core/middleware/astro-middleware.js
async function handleMiddleware(state, renderRouteCallback) {
	markFeatureUsed(state.manifest, FetchFeatures.middleware);
	await state.getProps();
	const apiContext = state.getAPIContext();
	state.counter++;
	if (state.counter === 4) return new Response("Loop Detected", {
		status: 508,
		statusText: "Astro detected a loop where you tried to call the rewriting logic more than four times."
	});
	const next = async (ctx, payload) => {
		if (payload) {
			state.logger.debug("router", "Called rewriting to:", payload);
			applyRewriteToState(state, payload, await getEnvironment(state.manifest).tryRewrite(state.manifest, payload, state.request));
		}
		return renderRouteCallback(state, ctx);
	};
	let response;
	if (state.skipMiddleware) response = await next(apiContext);
	else {
		const middleware = await getMiddleware(state.manifest);
		response = await callMiddleware(sequence(middleware), apiContext, next);
	}
	attachCookiesToResponse(response, state.cookies);
	state.response = response;
	return response;
}
//#endregion
//#region node_modules/astro/dist/core/util/normalized-url.js
function createNormalizedUrl(requestUrl) {
	return normalizeUrl(new URL(requestUrl));
}
function setPathname(url, pathname) {
	if (url.pathname !== pathname) url.pathname = pathname;
}
function normalizeUrl(url) {
	try {
		setPathname(url, validateAndDecodePathname(url.pathname));
	} catch {
		try {
			setPathname(url, decodeURI(url.pathname));
		} catch {}
	}
	setPathname(url, collapseDuplicateSlashes(url.pathname));
	return url;
}
//#endregion
//#region node_modules/astro/dist/core/rewrites/handler.js
function applyRewriteToState(state, payload, { routeData, componentInstance, newUrl, pathname }, { mergeCookies = false } = {}) {
	const oldPathname = state.pathname;
	const isI18nFallback = routeData.fallbackRoutes && routeData.fallbackRoutes.length > 0;
	if (state.manifest.serverLike && !state.routeData.prerender && routeData.prerender && !isI18nFallback) throw new AstroError({
		...ForbiddenRewrite,
		message: ForbiddenRewrite.message(state.pathname, pathname, routeData.component),
		hint: ForbiddenRewrite.hint(routeData.component)
	});
	state.routeData = routeData;
	state.componentInstance = componentInstance;
	if (payload instanceof Request) state.request = payload;
	else state.request = copyRequest(newUrl, state.request, routeData.prerender, state.logger, state.routeData.route);
	state.url = createNormalizedUrl(state.request.url);
	if (mergeCookies) {
		const newCookies = new AstroCookies(state.request, state.logger);
		if (state.cookies) newCookies.merge(state.cookies);
		state.cookies = newCookies;
	}
	state.params = getParams(routeData, pathname);
	state.pathname = pathname;
	state.isRewriting = true;
	state.status = 200;
	setOriginPathname(state.request, oldPathname, state.manifest.trailingSlash, state.manifest.buildFormat);
	state.invalidateContexts();
}
async function executeRewrite(state, payload) {
	state.logger.debug("router", "Calling rewrite: ", payload);
	applyRewriteToState(state, payload, await getEnvironment(state.manifest).tryRewrite(state.manifest, payload, state.request), { mergeCookies: true });
	return handleMiddleware(state, handlePages);
}
//#endregion
//#region node_modules/astro/dist/core/i18n/domain.js
function computePathnameFromDomain(request, url, i18n, base, trailingSlash, allowedDomains, logger, pathnameFromRequest) {
	let pathname = void 0;
	if (i18n && (i18n.strategy === "domains-prefix-always" || i18n.strategy === "domains-prefix-other-locales" || i18n.strategy === "domains-prefix-always-no-redirect")) {
		const validated = validateForwardedHeaders(getFirstForwardedValue(request.headers.get("X-Forwarded-Proto") ?? void 0), getFirstForwardedValue(request.headers.get("X-Forwarded-Host") ?? void 0), getFirstForwardedValue(request.headers.get("X-Forwarded-Port") ?? void 0), allowedDomains);
		const protocol = validated.protocol ? `${validated.protocol}:` : url.protocol;
		const requestHost = request.headers.get("Host") ?? void 0;
		const validatedRequestHost = allowedDomains?.length ? validateHost(requestHost, protocol.slice(0, -1), allowedDomains) : requestHost;
		let host = validated.host ?? validatedRequestHost;
		if (host && protocol) {
			host = host.split(":")[0];
			try {
				let locale;
				const hostAsUrl = new URL(`${protocol}//${host}`);
				for (const [domainKey, localeValue] of Object.entries(i18n.domainLookupTable)) {
					const domainKeyAsUrl = new URL(domainKey);
					if (hostAsUrl.host === domainKeyAsUrl.host && hostAsUrl.protocol === domainKeyAsUrl.protocol) {
						locale = localeValue;
						break;
					}
				}
				if (locale) {
					const requestPathname = pathnameFromRequest ?? stripRequestBase(url.pathname, base);
					pathname = prependForwardSlash$1(joinPaths(normalizeTheLocale(locale), requestPathname));
					if (trailingSlash === "always") pathname = appendForwardSlash(pathname);
					else if (trailingSlash === "never") pathname = removeTrailingForwardSlash(pathname);
					else if (url.pathname.endsWith("/")) pathname = appendForwardSlash(pathname);
				}
			} catch (e) {
				logger.error("router", `Astro tried to parse ${protocol}//${host} as an URL, but it threw a parsing error. Check the X-Forwarded-Host and X-Forwarded-Proto headers.`);
				logger.error("router", `Error: ${e}`);
			}
		}
	}
	return pathname;
}
//#endregion
//#region node_modules/astro/dist/core/manifest/derived.js
var sites = createManifestMemo((manifest) => manifest.site ? new URL(manifest.site) : void 0);
function getSite(manifest) {
	return sites.get(manifest);
}
//#endregion
//#region node_modules/astro/dist/core/server-islands/mappings.js
async function getServerIslands(manifest) {
	if (manifest.serverIslandMappings) return manifest.serverIslandMappings();
	return {
		serverIslandMap: /* @__PURE__ */ new Map(),
		serverIslandNameMap: /* @__PURE__ */ new Map()
	};
}
//#endregion
//#region node_modules/astro/dist/core/fetch/fetch-state.js
var slotValuesSymbol = /* @__PURE__ */ Symbol("astro.slotValues");
function getFetchStateFromAPIContext(context) {
	const state = context[fetchStateSymbol];
	if (!state) throw new Error("FetchState not found on APIContext. This is an internal error — the context was not created through Astro's request pipeline.");
	return state;
}
var FetchState = class {
	/** The manifest — the single ambient source of static, build-time data. */
	manifest;
	/** The manifest's identity-stable logger, captured once at construction. */
	logger;
	/**
	* Whether page renders stream. From the facade hooks on the fast path,
	* else the environment's default.
	*/
	streaming;
	/**
	* Internal facade hook: late-bound `app.renderError` dispatch. Undefined on
	* bare and custom-handler paths — those fall through to the environment's
	* error strategy (`renderErrorPage`).
	*/
	renderError;
	/**
	* Internal facade hook: late-bound `app.logThisRequest` dispatch. Undefined
	* on bare and custom-handler paths — those fall through to the
	* environment's `logRequest` behavior.
	*/
	logRequest;
	/**
	* The request to render. Mutated during rewrites so subsequent renders
	* see the rewritten URL.
	*/
	request;
	routeData;
	/**
	* The pathname to use for routing and rendering. Starts out as the raw,
	* base-stripped, decoded pathname from the request. May be further
	* normalized by `handleRequest` after routeData is known (in dev, when
	* the matched route has no `.html` extension, `.html` / `/index.html`
	* suffixes are stripped).
	*/
	pathname;
	/** Resolved render options (addCookieHeader, clientAddress, locals, etc.). */
	renderOptions;
	/** When the request started, used to log duration. */
	timeStart;
	/**
	* The route's loaded component module. Set before middleware runs; may
	* be swapped during in-flight rewrites from inside the middleware chain.
	*/
	componentInstance;
	/**
	* Slot overrides supplied by the container API. `undefined` for HTTP
	* requests — `PagesHandler` coalesces to `{}` on read so we don't
	* allocate an empty object per request.
	*/
	slots;
	/**
	* The `Response` produced by handlers, if any. Set after page
	* rendering or middleware completes.
	*/
	response;
	/** Explicitly assigned status; `undefined` until a caller sets one. */
	#status;
	/**
	* Default HTTP status for the rendered response. Callers override
	* before rendering runs (e.g. `handleRequest` sets this from
	* `BaseApp.getDefaultStatusCode`; error handlers set `404` / `500`).
	* Reads `200` until assigned.
	*/
	get status() {
		return this.#status ?? 200;
	}
	set status(value) {
		this.#status = value;
	}
	/**
	* Sets `status` from the matched route (see `getDefaultStatusCode`)
	* unless a caller already assigned one.
	*/
	applyDefaultStatus() {
		if (this.#status === void 0 && this.routeData) this.#status = getDefaultStatusCode(this.manifest, this.routeData, this.pathname);
	}
	/** Whether user middleware should be skipped for this request. */
	skipMiddleware = false;
	/**
	* Set to `true` when the request path was encoded too many times to fully
	* decode (see {@link validateAndDecodePathname}). These requests are
	* rejected with a `400` before middleware or routing run.
	*/
	invalidEncoding = false;
	/** A flag that tells the render content if the rewriting was triggered. */
	isRewriting = false;
	/** A safety net in case of loops (rewrite counter). */
	counter = 0;
	/** Cookies for this request. Created lazily on first access. */
	cookies;
	/** Route params derived from routeData + pathname. Computed lazily. */
	#params;
	get params() {
		if (!this.#params && this.routeData) this.#params = getParams(this.routeData, this.pathname);
		return this.#params;
	}
	set params(value) {
		this.#params = value;
	}
	/** Normalized URL for this request. */
	url;
	/** Client address for this request. */
	clientAddress;
	/** Whether this is a partial render (container API). */
	partial;
	/** Internal metadata about the current response route type. */
	responseRouteType;
	/** Internal flag to prevent rerouting this response to an error page. */
	skipErrorReroute = false;
	/** Whether to inject CSP meta tags. */
	shouldInjectCspMetaTags;
	/** Request-scoped locals object, shared with user middleware. */
	locals = {};
	/**
	* Memoized `props` (see `getProps`). `null` means "not yet computed"
	* — using `null` (rather than `undefined`) keeps the hidden class
	* stable and distinct from a valid-but-empty result.
	*/
	props = null;
	/** Memoized `ActionAPIContext` (see `getActionAPIContext`). */
	actionApiContext = null;
	/** Memoized `APIContext` (see `getAPIContext`). */
	apiContext = null;
	/** Registered context providers keyed by name. Lazy-initialized on first provide(). */
	#providers;
	/** Cached values from resolved providers. Lazy-initialized on first resolve(). */
	#providersResolvedValues;
	/** Cached promise for lazy component instance loading. */
	#componentInstancePromise;
	/** SSR result for the current page render. */
	result;
	/** Initial props (from container/error handler). */
	initialProps = {};
	/** Memoized Astro page partial. */
	#astroPagePartial;
	/**
	* Locale-prefixed pathname derived from the Host header for domain-based
	* i18n routing (e.g. `/en/boats/1/foo`), or `undefined` when the request
	* isn't served from a locale-mapped domain. When set, `this.pathname` is
	* derived from it so locale/param resolution match the route pattern.
	*/
	#domainPathname;
	/** Memoized current locale. */
	#currentLocale;
	/** Memoized preferred locale. */
	#preferredLocale;
	/** Memoized preferred locale list. */
	#preferredLocaleList;
	constructor(manifest, request, options, hooks) {
		this.manifest = manifest;
		this.logger = getLogger(manifest);
		this.streaming = hooks?.streaming ?? getEnvironment(manifest).defaultStreaming(manifest);
		this.renderError = hooks?.renderError;
		this.logRequest = hooks?.logRequest;
		this.request = request;
		options ??= getRenderOptions(request);
		this.routeData = options?.routeData;
		const self = this;
		this.renderOptions = {
			...options ?? {
				addCookieHeader: false,
				clientAddress: void 0,
				prerenderedErrorPageFetch: fetch,
				routeData: void 0,
				waitUntil: void 0
			},
			get locals() {
				return self.locals;
			}
		};
		this.componentInstance = void 0;
		this.slots = void 0;
		const url = new URL(request.url);
		const publicPathname = this.#normalizePathname(url.pathname);
		const pathname = this.#computePathname(publicPathname);
		setPathname(url, publicPathname);
		setPathname(url, collapseDuplicateSlashes(url.pathname));
		const domainPathname = computePathnameFromDomain(request, url, manifest.i18n, manifest.base, manifest.trailingSlash, manifest.allowedDomains, this.logger, pathname);
		if (domainPathname) {
			this.#domainPathname = domainPathname;
			this.pathname = domainPathname;
		} else this.pathname = pathname;
		this.timeStart = performance.now();
		this.clientAddress = options?.clientAddress;
		this.locals = options?.locals ?? {};
		this.url = url;
		this.cookies = new AstroCookies(request, this.logger);
		if (manifest.allowedDomains && manifest.allowedDomains.length > 0 && !this.routeData?.prerender) this.#applyForwardedHeaders();
		if (!Reflect.get(this.request, originPathnameSymbol)) setOriginPathname(this.request, this.pathname, manifest.trailingSlash, manifest.buildFormat);
		this.#resolveRouteData();
	}
	/**
	* Triggers a rewrite. Delegates to the rewrites handler module.
	*/
	rewrite(payload) {
		return executeRewrite(this, payload);
	}
	/**
	* Creates the SSR result for the current page render.
	*/
	async createResult(mod, ctx) {
		const manifest = this.manifest;
		const env = getEnvironment(manifest);
		const { clientDirectives, inlinedScripts, compressHTML } = manifest;
		const renderers = env.getRenderers(manifest);
		const resolve = (specifier) => env.resolve(manifest, specifier);
		const routeData = this.routeData;
		const { links, scripts, styles } = await env.headElements(manifest, routeData);
		const extraStyleHashes = [];
		const extraScriptHashes = [];
		const shouldInjectCspMetaTags = this.shouldInjectCspMetaTags ?? manifest.shouldInjectCspMetaTags;
		const cspAlgorithm = manifest.csp?.algorithm ?? "SHA-256";
		if (shouldInjectCspMetaTags) {
			for (const style of styles) extraStyleHashes.push(await generateCspDigest(style.children, cspAlgorithm));
			for (const script of scripts) extraScriptHashes.push(await generateCspDigest(script.children, cspAlgorithm));
		}
		const componentMetadata = await env.componentMetadata(manifest, routeData) ?? manifest.componentMetadata;
		const headers = new Headers({ "Content-Type": "text/html" });
		const partial = typeof this.partial === "boolean" ? this.partial : Boolean(mod.partial);
		const actionResult = hasActionPayload(this.locals) ? deserializeActionResult(this.locals._actionPayload.actionResult) : void 0;
		const status = this.status;
		const response = {
			status: actionResult?.error ? actionResult?.error.status : status,
			statusText: actionResult?.error ? actionResult?.error.type : "OK",
			get headers() {
				return headers;
			},
			set headers(_) {
				throw new AstroError(AstroResponseHeadersReassigned);
			}
		};
		const state = this;
		const result = {
			base: manifest.base,
			userAssetsBase: manifest.userAssetsBase,
			cancelled: false,
			clientDirectives,
			inlinedScripts,
			componentMetadata,
			compressHTML,
			cookies: this.cookies,
			createAstro: (props, slots) => state.createAstro(result, props, slots, ctx),
			links,
			params: this.params,
			partial,
			pathname: this.pathname,
			renderers,
			resolve,
			response,
			request: this.request,
			scripts,
			styles,
			actionResult,
			async getServerIslandNameMap() {
				return (await getServerIslands(manifest)).serverIslandNameMap ?? /* @__PURE__ */ new Map();
			},
			key: manifest.key,
			trailingSlash: manifest.trailingSlash,
			_metadata: {
				hasHydrationScript: false,
				rendererSpecificHydrationScripts: /* @__PURE__ */ new Set(),
				hasRenderedHead: false,
				renderedScripts: /* @__PURE__ */ new Set(),
				hasDirectives: /* @__PURE__ */ new Set(),
				hasRenderedServerIslandRuntime: false,
				headInTree: false,
				extraHead: [],
				extraStyleHashes,
				extraScriptHashes,
				propagators: /* @__PURE__ */ new Set(),
				routeHasPropagation: false,
				pendingSlotEvaluations: [],
				templateDepth: 0
			},
			cspDestination: manifest.csp?.cspDestination ?? (routeData.prerender ? "meta" : "header"),
			shouldInjectCspMetaTags,
			cspAlgorithm,
			directives: manifest.csp?.directives ? [...manifest.csp.directives] : [],
			scriptHashes: manifest.csp?.scriptHashes ? [...manifest.csp.scriptHashes] : [],
			scriptResources: manifest.csp?.scriptResources ? [...manifest.csp.scriptResources] : [],
			styleHashes: manifest.csp?.styleHashes ? [...manifest.csp.styleHashes] : [],
			styleResources: manifest.csp?.styleResources ? [...manifest.csp.styleResources] : [],
			isStrictDynamic: manifest.csp?.isStrictDynamic ?? false,
			scriptDirective: {
				resources: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.resources] : [],
				hashes: manifest.csp?.scriptDirective ? [...manifest.csp.scriptDirective.hashes] : [],
				strictDynamic: manifest.csp?.scriptDirective?.strictDynamic ?? false
			},
			styleDirective: {
				resources: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.resources] : [],
				hashes: manifest.csp?.styleDirective ? [...manifest.csp.styleDirective.hashes] : []
			},
			speculationRulesContent: manifest.csp?.speculationRulesContent,
			internalFetchHeaders: manifest.internalFetchHeaders
		};
		this.result = result;
		return result;
	}
	/**
	* Creates the Astro global object for a component render.
	*/
	createAstro(result, props, slotValues, apiContext) {
		let astroPagePartial;
		if (this.isRewriting) this.#astroPagePartial = this.createAstroPagePartial(result, apiContext);
		this.#astroPagePartial ??= this.createAstroPagePartial(result, apiContext);
		astroPagePartial = this.#astroPagePartial;
		const Astro = Object.assign(Object.create(astroPagePartial), {
			props,
			self: null
		});
		Object.defineProperty(Astro, slotValuesSymbol, {
			value: slotValues,
			writable: true,
			configurable: true,
			enumerable: false
		});
		return Astro;
	}
	/**
	* Creates the Astro page-level partial (prototype for Astro global).
	*/
	createAstroPagePartial(result, apiContext) {
		const state = this;
		const { cookies, locals, params, logger, url } = this;
		const { response } = result;
		const redirect = (path, status = 302) => {
			if (state.request[responseSentSymbol$1]) throw new AstroError({ ...ResponseSentError });
			return new Response(null, {
				status,
				headers: { Location: path }
			});
		};
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		const callAction = createCallAction(apiContext);
		const partial = {
			generator: ASTRO_GENERATOR,
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			cookies,
			get slots() {
				const slotsByAstro = result._metadata.slotsByAstro ??= /* @__PURE__ */ new WeakMap();
				let slots = slotsByAstro.get(this);
				if (slots === void 0) {
					slots = new Slots(result, this[slotValuesSymbol] ?? null, logger);
					slotsByAstro.set(this, slots);
				}
				return slots;
			},
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			locals,
			redirect,
			rewrite,
			request: this.request,
			response,
			site: getSite(this.manifest),
			getActionResult: createGetActionResult(locals),
			get callAction() {
				return callAction;
			},
			url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return astroToRuntimeLogger(logger);
			}
		};
		this.defineProviderGetters(partial);
		return partial;
	}
	getClientAddress() {
		const { clientAddress } = this;
		const routeData = this.routeData;
		if (routeData.prerender) throw new AstroError({
			...PrerenderClientAddressNotAvailable,
			message: PrerenderClientAddressNotAvailable.message(routeData.component)
		});
		if (clientAddress) return clientAddress;
		if (this.manifest.adapterName) throw new AstroError({
			...ClientAddressNotAvailable,
			message: ClientAddressNotAvailable.message(this.manifest.adapterName)
		});
		throw new AstroError(StaticClientAddressNotAvailable);
	}
	getCookies() {
		return this.cookies;
	}
	getCsp() {
		const state = this;
		if (!this.manifest.csp) {
			if (getEnvironment(this.manifest).runtimeMode === "production") this.logger.warn("csp", `context.csp was used when rendering the route ${colors.green(state.routeData.route)}, but CSP was not configured. For more information, see https://docs.astro.build/en/reference/configuration-reference/#securitycsp`);
			return;
		}
		const warnedFallback = /* @__PURE__ */ new Set();
		const warnFallback = (family, kind) => {
			if (kind === "default" || !state.result) return;
			const defaultResources = (family === "script" ? state.result.scriptDirective : state.result.styleDirective).resources.map(normalizeCspResourceEntry).filter((entry) => entry.kind === "default").map((entry) => entry.resource);
			if (defaultResources.length === 0) return;
			const key = `${family}:${kind}`;
			if (warnedFallback.has(key)) return;
			warnedFallback.add(key);
			const general = `${family}-src`;
			const specific = `${general}-${kind === "element" ? "elem" : "attr"}`;
			state.logger.warn("csp", `A resource was added to \`${specific}\`, but \`${general}\` also defines custom resources (${defaultResources.join(" ")}). Because \`${specific}\` overrides \`${general}\` for its scope (browsers do not fall back), those resources will not apply there. Add them to \`${specific}\` as well if needed.`);
		};
		return {
			insertDirective(payload) {
				if (state.result) state.result.directives = pushDirective(state.result.directives, payload);
			},
			insertScriptResource(payload) {
				if (!state.result) return;
				warnFallback("script", normalizeCspResourceEntry(payload).kind);
				state.result.scriptDirective.resources.push(payload);
			},
			insertStyleResource(payload) {
				if (!state.result) return;
				warnFallback("style", normalizeCspResourceEntry(payload).kind);
				state.result.styleDirective.resources.push(payload);
			},
			insertStyleHash(payload) {
				state.result?.styleDirective.hashes.push(payload);
			},
			insertScriptHash(payload) {
				state.result?.scriptDirective.hashes.push(payload);
			}
		};
	}
	computeCurrentLocale() {
		const { url, manifest: { i18n }, routeData } = this;
		if (!i18n || !routeData) return;
		const { defaultLocale, locales, strategy } = i18n;
		const fallbackTo = strategy === "pathname-prefix-other-locales" || strategy === "domains-prefix-other-locales" ? defaultLocale : void 0;
		if (this.#currentLocale) return this.#currentLocale;
		let computedLocale;
		if (isRouteServerIsland(routeData)) {
			let referer = this.request.headers.get("referer");
			if (referer) {
				if (URL.canParse(referer)) referer = new URL(referer).pathname;
				computedLocale = computeCurrentLocale(referer, locales, defaultLocale);
			}
		} else {
			let pathname = routeData.pathname;
			if (this.#domainPathname) pathname = this.pathname;
			else if (url && !routeData.pattern.test(url.pathname)) {
				for (const fallbackRoute of routeData.fallbackRoutes) if (fallbackRoute.pattern.test(url.pathname)) {
					pathname = fallbackRoute.pathname;
					break;
				}
			}
			pathname = pathname && !isRoute404or500(routeData) ? pathname : url.pathname ?? this.pathname;
			computedLocale = computeCurrentLocale(pathname, locales, defaultLocale);
			if (routeData.params.length > 0) {
				const localeFromParams = computeCurrentLocaleFromParams(this.params, locales);
				if (localeFromParams) computedLocale = localeFromParams;
			}
		}
		this.#currentLocale = computedLocale ?? fallbackTo;
		return this.#currentLocale;
	}
	computePreferredLocale() {
		const { manifest: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocale ??= computePreferredLocale(request, i18n.locales);
	}
	computePreferredLocaleList() {
		const { manifest: { i18n }, request } = this;
		if (!i18n) return;
		return this.#preferredLocaleList ??= computePreferredLocaleList(request, i18n.locales);
	}
	/**
	* Lazily loads the route's component module. Returns the cached
	* instance if already loaded. The promise is cached so concurrent
	* callers share the same load.
	*/
	async loadComponentInstance() {
		if (this.componentInstance) return this.componentInstance;
		if (this.#componentInstancePromise) return this.#componentInstancePromise;
		this.#componentInstancePromise = getEnvironment(this.manifest).getComponentByRoute(this.manifest, this.routeData).then((mod) => {
			this.componentInstance = mod;
			return mod;
		});
		return this.#componentInstancePromise;
	}
	/**
	* Registers a context provider under the given key. Handlers call
	* this to contribute values to the request context (e.g. sessions).
	* The `create` factory is called lazily on the first `resolve(key)`.
	*/
	provide(key, provider) {
		(this.#providers ??= /* @__PURE__ */ new Map()).set(key, provider);
	}
	/**
	* Lazily resolves a provider registered under `key`. Calls
	* `provider.create()` on first access and caches the result.
	* Returns `undefined` if no provider was registered for the key.
	*/
	resolve(key) {
		if (this.#providersResolvedValues?.has(key)) return this.#providersResolvedValues.get(key);
		const provider = this.#providers?.get(key);
		if (!provider) return void 0;
		const value = provider.create();
		(this.#providersResolvedValues ??= /* @__PURE__ */ new Map()).set(key, value);
		return value;
	}
	/**
	* Runs all registered `finalize` callbacks. Should be called after
	* the response is produced, typically in a `finally` block.
	*
	* Returns synchronously (no promise allocation) when nothing needs
	* finalizing — important for the hot path where sessions are not used.
	*/
	finalizeAll() {
		if (!this.#providersResolvedValues || this.#providersResolvedValues.size === 0) return;
		let chain;
		for (const [key, provider] of this.#providers) if (provider.finalize && this.#providersResolvedValues.has(key)) {
			const result = provider.finalize(this.#providersResolvedValues.get(key));
			if (result) chain = chain ? chain.then(() => result) : result;
		}
		return chain;
	}
	/**
	* Adds lazy getters to `target` for each registered provider key.
	* Used by context creation (APIContext, Astro global) so that
	* provider values like `session` and `cache` appear as properties
	* without hard-coding the keys.
	*
	* Always defines a `session` getter (returning `undefined` when no
	* provider is registered) so `ctx.session` / `Astro.session` is a
	* present property regardless of whether the sessions handler was
	* included in the pipeline.
	*/
	defineProviderGetters(target) {
		const state = this;
		if (this.#providers) for (const key of this.#providers.keys()) Object.defineProperty(target, key, {
			get: () => state.resolve(key),
			enumerable: true,
			configurable: true
		});
		if (!this.#providers?.has("session")) {
			let warned = false;
			Object.defineProperty(target, "session", {
				get() {
					if (!warned) {
						warned = true;
						state.logger.warn("session", "`Astro.session` was accessed but no session storage is configured. Either configure the storage manually or use an adapter that provides session storage. For more information, see https://docs.astro.build/en/guides/sessions/");
					}
				},
				enumerable: true,
				configurable: true
			});
		}
	}
	/**
	* Resolves the route to use for this request and stores it on
	* `this.routeData`. If the adapter (or the dev server) provided a
	* `routeData` via render options it's already set and this is a
	* no-op. Otherwise we use the app's synchronous route matcher and
	* fall back to a `404.astro` route so middleware can still run.
	*
	* Called eagerly from the constructor so individual handlers
	* (actions, pages, middleware, etc.) always see a resolved route
	* without the caller needing an extra setup step.
	*
	* Once routeData is known, finalizes `this.pathname`: in dev, if the
	* matched route has no `.html` extension, strip `.html` / `/index.html`
	* suffixes so the rendering pipeline sees the canonical pathname.
	*/
	/**
	* Strip `.html` / `/index.html` suffixes from the pathname so the
	* rendering pipeline sees the canonical route path. Only applies to
	* page routes where `.html` is framework-injected. Endpoint routes
	* preserve `.html` because any such suffix is user-provided (e.g.
	* from `getStaticPaths` params). Skipped when the matched route
	* itself has an `.html` extension in its definition.
	*/
	#stripHtmlExtension() {
		if (this.routeData && this.routeData.type === "page" && !routeHasHtmlExtension(this.routeData)) {
			const original = this.pathname;
			this.pathname = this.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
			if (this.manifest.trailingSlash === "always" && this.pathname !== "" && !this.pathname.endsWith("/")) this.pathname += "/";
			if (this.pathname !== original && this.routeData.pattern.test(original) && !this.routeData.pattern.test(this.pathname)) this.pathname = original;
		}
	}
	#resolveRouteData() {
		if (this.routeData) {
			this.#stripHtmlExtension();
			return;
		}
		const matched = matchRoute(this.manifest, this.pathname);
		if (matched && matched.prerender && this.manifest.serverLike) {
			if (matched.params.length > 0) {
				const allMatches = matchAllRoutes(this.manifest, this.pathname);
				this.routeData = allMatches.find((r) => !r.prerender);
			} else this.routeData = void 0;
		} else this.routeData = matched;
		this.logger.debug("router", "Astro matched the following route for " + this.request.url);
		this.logger.debug("router", "RouteData:\n" + this.routeData);
		if (!this.routeData) {
			const custom404 = getCustom404Route(getRouteTable(this.manifest));
			if (custom404 && !custom404.prerender) this.routeData = custom404;
		}
		if (!this.routeData) {
			this.logger.debug("router", "Astro hasn't found routes that match " + this.request.url);
			this.logger.debug("router", "Here's the available routes:\n", getRouteTable(this.manifest));
			return;
		}
		this.#stripHtmlExtension();
	}
	/**
	* Strips the manifest's base from a normalized request pathname and prepends
	* a forward slash.
	*
	* Mirrors `BaseApp.removeBase`: the router matches against this stripped path
	* while middleware reads the un-stripped `context.url.pathname`, so both must
	* strip the base identically.
	*/
	#computePathname(normalizedPathname) {
		return prependForwardSlash$1(stripRequestBase(normalizedPathname, this.manifest.base));
	}
	/**
	* Decodes and normalizes the public request pathname before deriving the
	* separate pathname used for route matching.
	*/
	#normalizePathname(pathname) {
		try {
			pathname = validateAndDecodePathname(pathname);
		} catch (e) {
			if (e instanceof MultiLevelEncodingError) this.invalidEncoding = true;
			else this.logger.error(null, e.toString());
		}
		return collapseDuplicateSlashes(pathname);
	}
	/**
	* Reads X-Forwarded-Proto, X-Forwarded-Host, and X-Forwarded-Port
	* from the request headers, validates them against the manifest's
	* `allowedDomains`, and updates `this.url` accordingly. Also resolves
	* `clientAddress` from X-Forwarded-For when the host is trusted.
	*
	* Only called when `allowedDomains` is configured — without it,
	* forwarded headers are never trusted.
	*/
	#applyForwardedHeaders() {
		const headers = this.request.headers;
		const allowedDomains = this.manifest.allowedDomains;
		const validated = validateForwardedHeaders(getFirstForwardedValue(headers.get("x-forwarded-proto") ?? void 0), getFirstForwardedValue(headers.get("x-forwarded-host") ?? void 0), getFirstForwardedValue(headers.get("x-forwarded-port") ?? void 0), allowedDomains);
		if (!validated.protocol && !validated.host && !validated.port) return;
		if (validated.protocol) this.url.protocol = validated.protocol + ":";
		if (validated.host) {
			const colonIdx = validated.host.indexOf(":");
			if (colonIdx !== -1) {
				this.url.hostname = validated.host.slice(0, colonIdx);
				this.url.port = validated.host.slice(colonIdx + 1);
			} else {
				this.url.hostname = validated.host;
				this.url.port = "";
			}
		}
		if (validated.port) this.url.port = validated.port;
		if (validated.host !== void 0 && !this.clientAddress) {
			const forwardedFor = getFirstForwardedValue(this.request.headers.get("x-forwarded-for") ?? void 0);
			if (forwardedFor) this.clientAddress = forwardedFor;
		}
		this.request = new Request(this.url, this.request);
	}
	/**
	* Returns the resolved `props` for this render, computing them lazily
	* from the route + component module on first access. If the
	* `initialProps` already carries user-supplied props (e.g. the
	* container API) those are used verbatim.
	*/
	async getProps() {
		if (this.props !== null) return this.props;
		if (Object.keys(this.initialProps).length > 0) {
			this.props = this.initialProps;
			return this.props;
		}
		const mod = await this.loadComponentInstance();
		this.props = await getProps({
			mod,
			routeData: this.routeData,
			routeCache: getRouteCache(this.manifest),
			pathname: this.pathname,
			logger: this.logger,
			serverLike: this.manifest.serverLike,
			base: this.manifest.base,
			trailingSlash: this.manifest.trailingSlash
		});
		return this.props;
	}
	/**
	* Returns the `ActionAPIContext` for this render, creating it lazily.
	* Used by middleware, actions, and page dispatch.
	*/
	getActionAPIContext() {
		if (this.actionApiContext !== null) return this.actionApiContext;
		const state = this;
		const ctx = {
			get cookies() {
				return state.cookies;
			},
			routePattern: this.routeData.route,
			isPrerendered: this.routeData.prerender,
			get clientAddress() {
				return state.getClientAddress();
			},
			get currentLocale() {
				return state.computeCurrentLocale();
			},
			generator: ASTRO_GENERATOR,
			get locals() {
				return state.locals;
			},
			set locals(_) {
				throw new AstroError(LocalsReassigned);
			},
			params: this.params,
			get preferredLocale() {
				return state.computePreferredLocale();
			},
			get preferredLocaleList() {
				return state.computePreferredLocaleList();
			},
			request: this.request,
			site: getSite(this.manifest),
			url: this.url,
			get originPathname() {
				return getOriginPathname(state.request);
			},
			get csp() {
				return state.getCsp();
			},
			get logger() {
				return astroToRuntimeLogger(state.logger);
			}
		};
		this.defineProviderGetters(ctx);
		this.actionApiContext = ctx;
		return this.actionApiContext;
	}
	/**
	* Returns the `APIContext` for this render, creating it lazily from
	* the memoized props + action context.
	*
	* Called before `getProps()` has resolved, the context carries
	* `props: null` and is not memoized; the next call after `getProps()`
	* fills in `props` on the same object. Callers that read `props`
	* must await `getProps()` first.
	*/
	getAPIContext() {
		if (this.apiContext !== null) return this.apiContext;
		const actionApiContext = this.getActionAPIContext();
		const state = this;
		const redirect = (path, status = 302) => new Response(null, {
			status,
			headers: { Location: path }
		});
		const rewrite = async (reroutePayload) => {
			return await state.rewrite(reroutePayload);
		};
		actionApiContext[fetchStateSymbol] = this;
		const apiContext = Object.assign(actionApiContext, {
			props: this.props,
			redirect,
			rewrite,
			getActionResult: createGetActionResult(actionApiContext.locals),
			callAction: createCallAction(actionApiContext)
		});
		if (this.props !== null) this.apiContext = apiContext;
		return apiContext;
	}
	/**
	* Invalidates the cached `APIContext` so the next `getAPIContext()`
	* call re-derives it from the (possibly mutated) state. Used
	* after an in-flight rewrite swaps the route / request / params.
	*/
	invalidateContexts() {
		this.props = null;
		this.actionApiContext = null;
		this.apiContext = null;
	}
	resetResponseMetadata() {
		this.responseRouteType = void 0;
		this.skipErrorReroute = false;
	}
};
//#endregion
//#region node_modules/@astrojs/internal-helpers/dist/object.js
var FORBIDDEN_PATH_KEYS = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
//#endregion
//#region node_modules/astro/dist/actions/noop-actions.js
var NOOP_ACTIONS_MOD = { server: {} };
//#endregion
//#region node_modules/astro/dist/actions/load.js
var actionsMemo = createAsyncManifestMemo(async (manifest) => manifest.actions ? await manifest.actions() : NOOP_ACTIONS_MOD);
function getActions(manifest) {
	return actionsMemo.get(manifest);
}
async function getAction(manifest, path) {
	const pathKeys = path.split(".").map((key) => decodeURIComponent(key));
	let { server } = await getActions(manifest);
	if (!server || !(typeof server === "object")) throw new TypeError(`Expected \`server\` export in actions file to be an object. Received ${typeof server}.`);
	for (const key of pathKeys) {
		if (typeof server === "function") throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		if (FORBIDDEN_PATH_KEYS.has(key)) throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		if (!Object.hasOwn(server, key)) throw new AstroError({
			...ActionNotFoundError,
			message: ActionNotFoundError.message(pathKeys.join("."))
		});
		server = server[key];
	}
	if (typeof server !== "function") throw new TypeError(`Expected handler for action ${pathKeys.join(".")} to be a function. Received ${typeof server}.`);
	return server;
}
//#endregion
//#region node_modules/astro/dist/actions/runtime/server.js
function getActionContext(context) {
	const callerInfo = getCallerInfo(context);
	const actionResultAlreadySet = Boolean(context.locals._actionPayload);
	let action = void 0;
	if (callerInfo && context.request.method === "POST" && !actionResultAlreadySet) action = {
		calledFrom: callerInfo.from,
		name: callerInfo.name,
		handler: async () => {
			const { manifest } = getFetchStateFromAPIContext(context);
			const callerInfoName = shouldAppendForwardSlash(manifest.trailingSlash, manifest.buildFormat) ? removeTrailingForwardSlash(callerInfo.name) : callerInfo.name;
			let baseAction;
			try {
				baseAction = await getAction(manifest, callerInfoName);
			} catch (error) {
				if (error instanceof Error && "name" in error && typeof error.name === "string" && error.name === ActionNotFoundError.name) return {
					data: void 0,
					error: new ActionError({ code: "NOT_FOUND" })
				};
				if (error instanceof URIError) return {
					data: void 0,
					error: new ActionError({ code: "NOT_FOUND" })
				};
				throw error;
			}
			const bodySizeLimit = manifest.actionBodySizeLimit;
			let input;
			try {
				input = await parseRequestBody(context.request, bodySizeLimit);
			} catch (e) {
				if (e instanceof ActionError) return {
					data: void 0,
					error: e
				};
				if (e instanceof TypeError) return {
					data: void 0,
					error: new ActionError({ code: "UNSUPPORTED_MEDIA_TYPE" })
				};
				if (e instanceof SyntaxError) return {
					data: void 0,
					error: new ActionError({
						code: "BAD_REQUEST",
						message: "Invalid JSON request body"
					})
				};
				throw e;
			}
			const omitKeys = [
				"props",
				"getActionResult",
				"callAction",
				"redirect"
			];
			const actionAPIContext = Object.create(Object.getPrototypeOf(context), Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(context)).filter(([key]) => !omitKeys.includes(key))));
			Reflect.set(actionAPIContext, ACTION_API_CONTEXT_SYMBOL, true);
			return baseAction.bind(actionAPIContext)(input);
		}
	};
	function setActionResult(actionName, actionResult) {
		context.locals._actionPayload = {
			actionResult,
			actionName
		};
	}
	return {
		action,
		setActionResult,
		serializeActionResult,
		deserializeActionResult
	};
}
function getCallerInfo(ctx) {
	if (ctx.routePattern === "/_actions/[...path]") return {
		from: "rpc",
		name: ctx.url.pathname.replace(/^.*\/_actions\//, "")
	};
	const queryParam = ctx.url.searchParams.get(ACTION_QUERY_PARAMS.actionName);
	if (queryParam) return {
		from: "form",
		name: queryParam
	};
}
async function parseRequestBody(request, bodySizeLimit) {
	const contentType = request.headers.get("content-type");
	const contentLengthHeader = request.headers.get("content-length");
	const contentLength = contentLengthHeader ? Number.parseInt(contentLengthHeader, 10) : void 0;
	const hasContentLength = typeof contentLength === "number" && Number.isFinite(contentLength);
	if (!contentType) return void 0;
	if (hasContentLength && contentLength > bodySizeLimit) throw new ActionError({
		code: "CONTENT_TOO_LARGE",
		message: `Request body exceeds ${bodySizeLimit} bytes`
	});
	try {
		if (hasContentType(contentType, formContentTypes)) {
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				return await new Request(request.url, {
					method: request.method,
					headers: request.headers,
					body: toArrayBuffer(body)
				}).formData();
			}
			return await request.clone().formData();
		}
		if (hasContentType(contentType, ["application/json"])) {
			if (contentLength === 0) return void 0;
			if (!hasContentLength) {
				const body = await readBodyWithLimit(request.clone(), bodySizeLimit);
				if (body.byteLength === 0) return void 0;
				return JSON.parse(new TextDecoder().decode(body));
			}
			return await request.clone().json();
		}
	} catch (e) {
		if (e instanceof BodySizeLimitError) throw new ActionError({
			code: "CONTENT_TOO_LARGE",
			message: `Request body exceeds ${bodySizeLimit} bytes`
		});
		throw e;
	}
	throw new TypeError("Unsupported content type");
}
var ACTION_API_CONTEXT_SYMBOL = /* @__PURE__ */ Symbol.for("astro.actionAPIContext");
var formContentTypes = ["application/x-www-form-urlencoded", "multipart/form-data"];
function hasContentType(contentType, expected) {
	const type = contentType.split(";")[0].toLowerCase();
	return expected.some((t) => type === t);
}
function serializeActionResult(res) {
	if (res.error) {
		if (Object.assign({
			"ASSETS_PREFIX": void 0,
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
			"PUBLIC_SITE_URL": "https://virnobyte.com",
			"SITE": "https://virnobyte.com",
			"SSR": true
		}, { OS: "Windows_NT" })?.DEV) actionResultErrorStack.set(res.error.stack);
		let body2;
		if (res.error instanceof ActionInputError) body2 = {
			type: res.error.type,
			issues: res.error.issues,
			fields: res.error.fields
		};
		else body2 = {
			...res.error,
			message: res.error.message
		};
		return {
			type: "error",
			status: res.error.status,
			contentType: "application/json",
			body: JSON.stringify(body2)
		};
	}
	if (res.data === void 0) return {
		type: "empty",
		status: 204
	};
	let body;
	try {
		body = stringify(res.data, { URL: (value) => value instanceof URL && value.href });
	} catch (e) {
		let hint = ActionsReturnedInvalidDataError.hint;
		if (res.data instanceof Response) hint = REDIRECT_STATUS_CODES.includes(res.data.status) ? "If you need to redirect when the action succeeds, trigger a redirect where the action is called. See the Actions guide for server and client redirect examples: https://docs.astro.build/en/guides/actions." : "If you need to return a Response object, try using a server endpoint instead. See https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes";
		throw new AstroError({
			...ActionsReturnedInvalidDataError,
			message: ActionsReturnedInvalidDataError.message(String(e)),
			hint
		});
	}
	return {
		type: "data",
		status: 200,
		contentType: "application/json+devalue",
		body
	};
}
function toArrayBuffer(buffer) {
	const copy = new Uint8Array(buffer.byteLength);
	copy.set(buffer);
	return copy.buffer;
}
//#endregion
//#region node_modules/astro/dist/actions/handler.js
function handleAction(apiContext, state) {
	markFeatureUsed(state.manifest, FetchFeatures.actions);
	const invalidEncodingResponse = rejectInvalidEncoding(state);
	if (invalidEncodingResponse) return Promise.resolve(invalidEncodingResponse);
	if (apiContext.isPrerendered) return;
	const { action, setActionResult } = getActionContext(apiContext);
	if (!action) return;
	if (state.manifest.checkOrigin && isForbiddenCrossOriginRequest(apiContext.request, apiContext.url, apiContext.isPrerendered)) return Promise.resolve(createCrossOriginForbiddenResponse(apiContext.request));
	return executeAction(action, setActionResult);
}
async function executeAction(action, setActionResult) {
	const serialized = serializeActionResult(await action.handler());
	if (action.calledFrom === "rpc") {
		if (serialized.type === "empty") return new Response(null, { status: serialized.status });
		return new Response(serialized.body, {
			status: serialized.status,
			headers: { "Content-Type": serialized.contentType }
		});
	}
	setActionResult(action.name, serialized);
}
//#endregion
//#region node_modules/astro/dist/core/routing/3xx.js
function redirectTemplate({ status, absoluteLocation, relativeLocation, from }) {
	const delay = status === 302 ? 2 : 0;
	const rel = escape(String(relativeLocation));
	return `<!doctype html>
<title>Redirecting to: ${rel}</title>
<meta http-equiv="refresh" content="${delay};url=${rel}">
<meta name="robots" content="noindex">
<link rel="canonical" href="${escape(String(absoluteLocation))}">
<body>
	<a href="${rel}">Redirecting ${from ? `from <code>${escape(from)}</code> ` : ""}to <code>${rel}</code></a>
</body>`;
}
//#endregion
//#region node_modules/astro/dist/core/routing/trailing-slash-handler.js
function handleTrailingSlash(state) {
	const invalidEncodingResponse = rejectInvalidEncoding(state);
	if (invalidEncodingResponse) return invalidEncodingResponse;
	const url = new URL(state.request.url);
	const redirect = redirectTrailingSlash(state.manifest.trailingSlash, url.pathname);
	if (redirect === url.pathname) return;
	const addCookieHeader = state.renderOptions.addCookieHeader;
	const status = state.request.method === "GET" ? 301 : 308;
	const location = redirect + url.search;
	const response = new Response(redirectTemplate({
		status,
		relativeLocation: location,
		absoluteLocation: location,
		from: state.request.url
	}), {
		status,
		headers: { location }
	});
	prepareResponse(response, { addCookieHeader });
	return response;
}
function redirectTrailingSlash(trailingSlash, pathname) {
	if (pathname === "/" || isInternalPath(pathname)) return pathname;
	const path = collapseDuplicateTrailingSlashes(pathname, trailingSlash !== "never");
	if (path !== pathname) return path;
	if (trailingSlash === "ignore") return pathname;
	if (trailingSlash === "always" && !hasFileExtension(pathname)) return appendForwardSlash(pathname);
	if (trailingSlash === "never") return removeTrailingForwardSlash(pathname);
	return pathname;
}
//#endregion
//#region node_modules/astro/dist/core/cache/provider.js
var cacheProviderMemo = createAsyncManifestMemo(async (manifest) => {
	if (manifest.cacheProvider) {
		const factory = (await manifest.cacheProvider())?.default || null;
		return factory ? factory(manifest.cacheConfig?.options) : null;
	}
	return null;
});
function getCacheProvider(manifest) {
	return cacheProviderMemo.get(manifest);
}
//#endregion
//#region node_modules/astro/dist/core/cache/runtime/utils.js
function defaultSetHeaders(options) {
	const headers = new Headers();
	const directives = [];
	if (options.maxAge !== void 0) directives.push(`max-age=${options.maxAge}`);
	if (options.swr !== void 0) directives.push(`stale-while-revalidate=${options.swr}`);
	if (directives.length > 0) headers.set("CDN-Cache-Control", directives.join(", "));
	if (options.tags && options.tags.length > 0) headers.set("Cache-Tag", options.tags.join(", "));
	if (options.lastModified) headers.set("Last-Modified", options.lastModified.toUTCString());
	if (options.etag) headers.set("ETag", options.etag);
	return headers;
}
function isLiveDataEntry(value) {
	return value != null && typeof value === "object" && "id" in value && "data" in value && "cacheHint" in value;
}
//#endregion
//#region node_modules/astro/dist/core/cache/runtime/cache.js
var APPLY_HEADERS = /* @__PURE__ */ Symbol.for("astro:cache:apply");
var IS_ACTIVE = /* @__PURE__ */ Symbol.for("astro:cache:active");
var AstroCache = class {
	#options = {};
	#tags = /* @__PURE__ */ new Set();
	#disabled = false;
	#provider;
	enabled = true;
	constructor(provider) {
		this.#provider = provider;
	}
	set(input) {
		if (input === false) {
			this.#disabled = true;
			this.#tags.clear();
			this.#options = {};
			return;
		}
		this.#disabled = false;
		let options;
		if (isLiveDataEntry(input)) {
			if (!input.cacheHint) return;
			options = input.cacheHint;
		} else options = input;
		if ("maxAge" in options && options.maxAge !== void 0) this.#options.maxAge = options.maxAge;
		if ("swr" in options && options.swr !== void 0) this.#options.swr = options.swr;
		if ("etag" in options && options.etag !== void 0) this.#options.etag = options.etag;
		if (options.lastModified !== void 0) {
			if (!this.#options.lastModified || options.lastModified > this.#options.lastModified) this.#options.lastModified = options.lastModified;
		}
		if (options.tags) for (const tag of options.tags) this.#tags.add(tag);
	}
	get tags() {
		return [...this.#tags];
	}
	/**
	* Get the current cache options (read-only snapshot).
	* Includes all accumulated options: maxAge, swr, tags, etag, lastModified.
	*/
	get options() {
		return {
			...this.#options,
			tags: this.tags
		};
	}
	async invalidate(input) {
		if (!this.#provider) throw new AstroError(CacheNotEnabled);
		let options;
		if (isLiveDataEntry(input)) options = { tags: input.cacheHint?.tags ?? [] };
		else options = input;
		return this.#provider.invalidate(options);
	}
	/** @internal */
	[APPLY_HEADERS](response, request) {
		if (this.#disabled) return;
		const finalOptions = {
			...this.#options,
			tags: this.tags
		};
		if (finalOptions.maxAge === void 0 && !finalOptions.tags?.length) return;
		const headers = this.#provider?.setHeaders?.(finalOptions, request) ?? defaultSetHeaders(finalOptions);
		for (const [key, value] of headers) response.headers.set(key, value);
		if (!response.headers.has("Cache-Control") && !response.headers.has("Expires") && (response.headers.has("Last-Modified") || response.headers.has("ETag"))) response.headers.set("Cache-Control", "no-cache");
	}
	/** @internal */
	get [IS_ACTIVE]() {
		return !this.#disabled && (this.#options.maxAge !== void 0 || this.#tags.size > 0);
	}
};
function applyCacheHeaders(cache, response, request) {
	if (APPLY_HEADERS in cache) cache[APPLY_HEADERS](response, request);
}
//#endregion
//#region node_modules/astro/dist/core/routing/parts.js
var ROUTE_DYNAMIC_SPLIT = /\[(.+?\(.+?\)|.+?)\]/;
var ROUTE_SPREAD = /^\.{3}.+$/;
function getParts(part, file) {
	const result = [];
	part.split(ROUTE_DYNAMIC_SPLIT).map((str, i) => {
		if (!str) return;
		const dynamic = i % 2 === 1;
		const [, content] = dynamic ? /([^(]+)$/.exec(str) || [null, null] : [null, str];
		if (!content || dynamic && !/^(?:\.\.\.)?[\w$]+$/.test(content)) throw new Error(`Invalid route ${file} \u2014 parameter name must match /^[a-zA-Z0-9_$]+$/`);
		result.push({
			content,
			dynamic,
			spread: dynamic && ROUTE_SPREAD.test(content)
		});
	});
	return result;
}
//#endregion
//#region node_modules/astro/dist/core/cache/runtime/route-matching.js
function compileCacheRoutes(routes, base, trailingSlash) {
	const compiled = Object.entries(routes).map(([path, options]) => {
		const segments = removeLeadingForwardSlash(path).split("/").filter(Boolean).map((s) => getParts(s, path));
		return {
			pattern: getPattern(segments, base, trailingSlash),
			options,
			segments,
			route: path
		};
	});
	compiled.sort((a, b) => routeComparator({
		segments: a.segments,
		route: a.route,
		type: "page"
	}, {
		segments: b.segments,
		route: b.route,
		type: "page"
	}));
	return compiled;
}
function matchCacheRoute(pathname, compiledRoutes) {
	for (const route of compiledRoutes) if (route.pattern.test(pathname)) return route.options;
	return null;
}
//#endregion
//#region node_modules/astro/dist/core/cache/handler.js
var CACHE_KEY = "cache";
function provideCache(state) {
	const manifest = state.manifest;
	if (!manifest.cacheConfig) {
		state.provide(CACHE_KEY, { create: () => new DisabledAstroCache(state.logger) });
		return;
	}
	if (getEnvironment(manifest).runtimeMode === "development") {
		state.provide(CACHE_KEY, { create: () => new NoopAstroCache() });
		return;
	}
	return provideCacheAsync(state, manifest);
}
async function provideCacheAsync(state, manifest) {
	const cacheProvider = await getCacheProvider(manifest);
	state.provide(CACHE_KEY, { create() {
		const cache = new AstroCache(cacheProvider);
		if (manifest.cacheConfig?.routes) {
			const matched = matchCacheRoute(state.pathname, getCompiledCacheRoutes(manifest));
			if (matched) cache.set(matched);
		}
		return cache;
	} });
}
async function handleCache(state, next) {
	markFeatureUsed(state.manifest, FetchFeatures.cache);
	if (!state.manifest.cacheProvider) return next();
	const cache = state.resolve(CACHE_KEY);
	const cacheProvider = await getCacheProvider(state.manifest);
	if (cacheProvider?.onRequest) {
		const response2 = await cacheProvider.onRequest({
			request: state.request,
			url: new URL(state.request.url),
			waitUntil: state.renderOptions.waitUntil,
			logger: {
				info(msg) {
					state.logger.info("cache", msg);
				},
				warn(msg) {
					state.logger.warn("cache", msg);
				},
				error(msg) {
					state.logger.error("cache", msg);
				}
			}
		}, async () => {
			const res = await next();
			applyCacheHeaders(cache, res, state.request);
			return res;
		});
		response2.headers.delete("CDN-Cache-Control");
		response2.headers.delete("Cache-Tag");
		return response2;
	}
	const response = await next();
	applyCacheHeaders(cache, response, state.request);
	return response;
}
var compiledCacheRoutesMemo = createManifestMemo((manifest) => manifest.cacheConfig?.routes ? compileCacheRoutes(manifest.cacheConfig.routes, manifest.base, manifest.trailingSlash) : []);
function getCompiledCacheRoutes(manifest) {
	return compiledCacheRoutesMemo.get(manifest);
}
//#endregion
//#region node_modules/astro/dist/core/redirects/render.js
function isExternalURL(url) {
	return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
}
function redirectIsExternal(redirect) {
	if (typeof redirect === "string") return isExternalURL(redirect);
	else return isExternalURL(redirect.destination);
}
function computeRedirectStatus(method, redirect, redirectRoute) {
	return redirectRoute && typeof redirect === "object" ? redirect.status : method === "GET" ? 301 : 308;
}
function resolveRedirectTarget(params, redirect, redirectRoute, trailingSlash) {
	if (typeof redirectRoute !== "undefined") return getRouteGenerator(redirectRoute.segments, trailingSlash)(params) || redirectRoute?.pathname || "/";
	else if (typeof redirect === "string") {
		if (redirectIsExternal(redirect)) return redirect;
		else {
			let target = redirect;
			for (const param of Object.keys(params)) {
				const paramValue = params[param];
				target = target.replace(`[${param}]`, () => paramValue).replace(`[...${param}]`, () => paramValue);
			}
			return target;
		}
	} else if (typeof redirect === "undefined") return "/";
	return redirect.destination;
}
async function renderRedirect(state) {
	markFeatureUsed(state.manifest, FetchFeatures.redirects);
	const { redirect, redirectRoute } = state.routeData;
	const status = computeRedirectStatus(state.request.method, redirect, redirectRoute);
	const headers = { location: encodeURI(resolveRedirectTarget(state.params, redirect, redirectRoute, state.manifest.trailingSlash)) };
	if (redirect && redirectIsExternal(redirect)) {
		if (typeof redirect === "string") return Response.redirect(redirect, status);
		else return Response.redirect(redirect.destination, status);
	}
	return new Response(null, {
		status,
		headers
	});
}
//#endregion
//#region node_modules/astro/dist/core/routing/handler.js
function logRequestFromState(state, payload) {
	if (state.logRequest) state.logRequest(payload);
	else getEnvironment(state.manifest).logRequest(state.manifest, payload);
}
function actionsAndPages(state, ctx) {
	if (!state.skipMiddleware) {
		const actionResult = handleAction(ctx, state);
		if (actionResult) return actionResult.then((response) => response ?? handlePages(state, ctx));
	}
	return handlePages(state, ctx);
}
async function handleRequest(state) {
	await getResolvedLogger(state.manifest);
	markFeatureUsed(state.manifest, ALL_FETCH_FEATURES);
	const invalidEncodingResponse = rejectInvalidEncoding(state);
	if (invalidEncodingResponse) return invalidEncodingResponse;
	const trailingSlashRedirect = handleTrailingSlash(state);
	if (trailingSlashRedirect) return trailingSlashRedirect;
	if (!state.routeData) return renderErrorFromState(state, state.request, {
		...state.renderOptions,
		status: 404,
		pathname: state.pathname
	});
	return render(state);
}
async function render(state) {
	const routeData = state.routeData;
	const pathname = state.pathname;
	const request = state.request;
	const { addCookieHeader } = state.renderOptions;
	state.status = getDefaultStatusCode(state.manifest, routeData, pathname);
	let response;
	let finalizeError;
	try {
		const sessionP = state.manifest.sessionConfig ? provideSession(state) : void 0;
		const cacheP = provideCache(state);
		if (sessionP || cacheP) await Promise.all([sessionP, cacheP]);
		markFeatureUsed(state.manifest, FetchFeatures.sessions);
		if (routeData.type === "redirect") {
			const redirectResponse = await renderRedirect(state);
			logRequestFromState(state, {
				pathname,
				method: request.method,
				statusCode: redirectResponse.status,
				isRewrite: false,
				timeStart: state.timeStart
			});
			prepareResponse(redirectResponse, { addCookieHeader });
			state.logger.flush();
			return redirectResponse;
		}
		const i18n = getI18n(state.manifest);
		if (!state.manifest.cacheProvider) {
			markFeatureUsed(state.manifest, FetchFeatures.cache);
			response = await handleMiddleware(state, actionsAndPages);
			if (i18n) response = await finalizeI18n(i18n, state, response);
		} else {
			const runPipeline = async () => {
				let res = await handleMiddleware(state, actionsAndPages);
				if (i18n) res = await finalizeI18n(i18n, state, res);
				return res;
			};
			response = await handleCache(state, runPipeline);
		}
		logRequestFromState(state, {
			pathname,
			method: request.method,
			statusCode: response.status,
			isRewrite: state.isRewriting,
			timeStart: state.timeStart
		});
	} catch (err) {
		state.logger.error(null, err.stack || err.message || String(err));
		return renderErrorFromState(state, request, {
			...state.renderOptions,
			status: 500,
			error: err,
			pathname: state.pathname
		});
	} finally {
		try {
			const finalize = state.finalizeAll();
			if (finalize) await finalize;
		} catch (err) {
			finalizeError = err;
			state.logger.error(null, err.stack || err.message || String(err));
		}
	}
	if (finalizeError) return renderErrorFromState(state, request, {
		...state.renderOptions,
		status: 500,
		error: finalizeError,
		pathname: state.pathname
	});
	if (REROUTABLE_STATUS_CODES.includes(response.status) && response.body === null && !state.skipErrorReroute) return renderErrorFromState(state, request, {
		...state.renderOptions,
		response,
		status: response.status,
		error: response.status === 500 ? null : void 0,
		pathname: state.pathname
	});
	prepareResponse(response, { addCookieHeader });
	state.logger.flush();
	return response;
}
//#endregion
//#region node_modules/astro/dist/core/fetch/default-handler.js
var DefaultFetchHandler = class {
	#manifest;
	/**
	* `BaseApp` passes itself so states resolve that app's manifest ahead of
	* the ambient one; generated builds construct the handler with no
	* arguments and use the ambient manifest.
	*/
	constructor(app) {
		this.#manifest = app?.manifest;
	}
	fetch = (request) => {
		const options = getRenderOptions(request);
		return handleRequest(new FetchState(this.#manifest ?? getAmbientManifest(), request, options));
	};
};
//#endregion
//#region \0virtual:astro:fetchable
var _virtual_astro_fetchable_default = new DefaultFetchHandler();
//#endregion
//#region node_modules/astro/dist/core/routing/match-request.js
function safeDecodePathname(manifest, pathname) {
	try {
		return validateAndDecodePathname(pathname);
	} catch (e) {
		new AstroIntegrationLogger(getLogger(manifest).options, manifest.adapterName).debug(e.toString());
		try {
			return decodeURI(pathname);
		} catch {
			return pathname;
		}
	}
}
function matchRequest(manifest, request, allowPrerenderedRoutes = false) {
	const url = new URL(request.url);
	if (manifest.assets.has(url.pathname)) return void 0;
	let pathname = computePathnameFromDomain(request, url, manifest.i18n, manifest.base, manifest.trailingSlash, manifest.allowedDomains, getLogger(manifest));
	if (!pathname) pathname = prependForwardSlash$1(stripRequestBase(url.pathname, manifest.base));
	pathname = safeDecodePathname(manifest, pathname);
	const routeData = matchRoute(manifest, pathname);
	if (!routeData) return void 0;
	if (allowPrerenderedRoutes) return routeData;
	if (routeData.prerender) {
		if (routeData.params.length > 0) return matchAllRoutes(manifest, pathname).find((r) => !r.prerender);
		return;
	}
	return routeData;
}
//#endregion
//#region node_modules/astro/dist/core/app/base.js
var BaseApp = class BaseApp {
	manifest;
	#adapterLogger;
	baseWithoutTrailingSlash;
	/**
	* The streaming flag passed to the constructor, surfaced through the
	* protected `resolveStreaming()` hook and fed into the internal
	* `FetchState` facade hooks on the fast path.
	*/
	#streaming;
	/**
	* The handler that turns incoming `Request` objects into `Response`s.
	* Defaults to a `DefaultFetchHandler` pinned to this app and can be
	* overridden via `setFetchHandler` — typically by the bundled
	* entrypoint after importing `virtual:astro:fetchable`.
	*/
	#fetchHandler;
	#errorHandler;
	/**
	* Whether a custom fetch handler (from `src/fetch.ts`) has been set
	* via `setFetchHandler`. When false, the `DefaultFetchHandler` is
	* in use and all features are implicitly active.
	*/
	#hasCustomFetchHandler = false;
	/**
	* Whether the missing-feature check has already run. We only want
	* to warn once — after the first request in dev, or at build end.
	*/
	#featureCheckDone = false;
	get logger() {
		return getLogger(this.manifest);
	}
	/**
	* Route data derived from the manifest, used for route matching. Reads and
	* writes go through the single per-manifest route table, so HMR updates are
	* visible to every consumer at once.
	*/
	get manifestData() {
		return getRouteTable(this.manifest);
	}
	set manifestData(routesList) {
		updateRouteTable(this.manifest, routesList.routes);
	}
	get adapterLogger() {
		const currentOptions = this.logger.options;
		if (!this.#adapterLogger || this.#adapterLogger.options !== currentOptions) this.#adapterLogger = new AstroIntegrationLogger(currentOptions, this.manifest.adapterName);
		return this.#adapterLogger;
	}
	constructor(manifest, streaming = true) {
		this.manifest = manifest;
		this.baseWithoutTrailingSlash = removeTrailingForwardSlash(manifest.base);
		this.#streaming = streaming;
		getRouteTable(manifest);
		getLogger(manifest);
		this.#fetchHandler = new DefaultFetchHandler(this);
		this.#errorHandler = this.createErrorHandler();
	}
	/**
	* Resolves the user-configured logger destination from the manifest and
	* returns the logger. Lazy and only resolves once; safe to call before
	* the first render (adapters use this to log startup messages through
	* the configured destination).
	*/
	getLogger() {
		return getResolvedLogger(this.manifest);
	}
	/**
	* The streaming flag fed into the internal `FetchState` facade hooks on
	* the fast path. Returns the constructor flag by
	* default; `BuildApp` overrides this to return `undefined` so streaming
	* falls through to the environment default (`manifest.serverLike`).
	*/
	resolveStreaming() {
		return this.#streaming;
	}
	/**
	* Override the fetch handler used to dispatch requests. Entrypoints
	* call this with the default export of `virtual:astro:fetchable` to
	* plug in a user-authored handler from `src/fetch.ts`.
	*/
	setFetchHandler(handler) {
		this.#fetchHandler = handler;
		this.#hasCustomFetchHandler = !(handler instanceof DefaultFetchHandler);
	}
	/**
	* Returns the error handler used by this app. The default is a thin
	* bridge over the functional error API — strategy selection (production
	* default / dev / build) is environment-driven inside `renderErrorPage`.
	* External subclasses can override this to customize error rendering.
	*/
	createErrorHandler() {
		return { renderError: (request, options) => renderErrorPage(this.manifest, request, options) };
	}
	/**
	* Resets the cached adapter logger so it picks up a new logger instance.
	* Used by BuildApp when the logger is replaced via setOptions().
	*/
	resetAdapterLogger() {
		this.#adapterLogger = void 0;
	}
	getAllowedDomains() {
		return this.manifest.allowedDomains;
	}
	matchesAllowedDomains(forwardedHost, protocol) {
		return BaseApp.validateForwardedHost(forwardedHost, this.manifest.allowedDomains, protocol);
	}
	static validateForwardedHost(forwardedHost, allowedDomains, protocol) {
		if (!allowedDomains || allowedDomains.length === 0) return false;
		try {
			const testUrl = new URL(`${protocol || "https"}://${forwardedHost}`);
			return allowedDomains.some((pattern) => {
				return matchPattern(testUrl, pattern);
			});
		} catch {
			return false;
		}
	}
	set setManifestData(newManifestData) {
		updateRouteTable(this.manifest, newManifestData.routes);
	}
	removeBase(pathname) {
		return stripRequestBase(pathname, this.manifest.base);
	}
	/**
	* Fully decodes a pathname, falling back to a single decode and then the raw pathname
	* when validation fails. Adapter matching runs before `render()`, so it must not throw
	* for request input that render-time validation handles.
	*/
	safeDecodePathname(pathname) {
		try {
			return validateAndDecodePathname(pathname);
		} catch (e) {
			this.adapterLogger.debug(e.toString());
			try {
				return decodeURI(pathname);
			} catch {
				return pathname;
			}
		}
	}
	/**
	* Extracts the base-stripped, decoded pathname from a request.
	* Used by adapters to compute the pathname for dev-mode route matching.
	*/
	getPathnameFromRequest(request) {
		const url = new URL(request.url);
		const pathname = prependForwardSlash$1(this.removeBase(url.pathname));
		return this.safeDecodePathname(pathname);
	}
	/**
	* Given a `Request`, it returns the `RouteData` that matches its `pathname`. By default, prerendered
	* routes aren't returned, even if they are matched.
	*
	* When `allowPrerenderedRoutes` is `true`, the function returns matched prerendered routes too.
	* @param request
	* @param allowPrerenderedRoutes
	*/
	match(request, allowPrerenderedRoutes = false) {
		return matchRequest(this.manifest, request, allowPrerenderedRoutes);
	}
	/**
	* A matching route function to use in the development server.
	* Contrary to the `.match` function, this function resolves props and params, returning the correct
	* route based on the priority, segments. It also returns the correct, resolved pathname.
	* @param pathname
	*/
	devMatch(pathname) {}
	computePathnameFromDomain(request) {
		return computePathnameFromDomain(request, new URL(request.url), this.manifest.i18n, this.manifest.base, this.manifest.trailingSlash, this.manifest.allowedDomains, this.logger);
	}
	async render(request, { addCookieHeader = false, clientAddress = Reflect.get(request, clientAddressSymbol), locals, prerenderedErrorPageFetch = fetch, routeData, waitUntil } = {}) {
		await getResolvedLogger(this.manifest);
		if (routeData) {
			this.logger.debug("router", "The adapter " + this.manifest.adapterName + " provided a custom RouteData for ", request.url);
			this.logger.debug("router", "RouteData");
			this.logger.debug("router", routeData);
		}
		if (locals) {
			if (typeof locals !== "object") {
				const error = new AstroError(LocalsNotAnObject);
				this.logger.error(null, error.stack);
				return this.renderError(request, {
					addCookieHeader,
					clientAddress,
					prerenderedErrorPageFetch,
					locals: void 0,
					routeData,
					waitUntil,
					status: 500,
					error
				});
			}
		}
		if (!routeData) {
			const domainPathname = this.computePathnameFromDomain(request);
			if (domainPathname) routeData = matchRoute(this.manifest, this.safeDecodePathname(domainPathname));
		}
		const resolvedOptions = {
			addCookieHeader,
			clientAddress,
			prerenderedErrorPageFetch,
			locals,
			routeData,
			waitUntil
		};
		let response;
		if (this.#fetchHandler instanceof DefaultFetchHandler) response = await handleRequest(new FetchState(this.manifest, request, resolvedOptions, {
			streaming: this.resolveStreaming(),
			renderError: (req, opts) => this.renderError(req, opts),
			logRequest: (payload) => this.logThisRequest(payload)
		}));
		else {
			setRenderOptions(request, resolvedOptions);
			response = await this.#fetchHandler.fetch(request);
		}
		this.#warnMissingFeatures();
		if (response.headers.get("X-Astro-Error")) {
			response.headers.delete(ASTRO_ERROR_HEADER);
			return this.renderError(request, {
				addCookieHeader,
				clientAddress,
				prerenderedErrorPageFetch,
				locals,
				routeData,
				waitUntil,
				response,
				status: response.status,
				error: response.status === 500 ? null : void 0
			});
		}
		return response;
	}
	setCookieHeaders(response) {
		return getSetCookiesFromResponse(response);
	}
	/**
	* Reads all the cookies written by `Astro.cookie.set()` onto the passed response.
	* For example,
	* ```ts
	* for (const cookie_ of App.getSetCookieFromResponse(response)) {
	*     const cookie: string = cookie_
	* }
	* ```
	* @param response The response to read cookies from.
	* @returns An iterator that yields key-value pairs as equal-sign-separated strings.
	*/
	static getSetCookieFromResponse = getSetCookiesFromResponse;
	/**
	* If it is a known error code, try sending the according page (e.g. 404.astro / 500.astro).
	* This also handles pre-rendered /404 or /500 routes.
	*
	* Delegates to the app's configured `ErrorHandler`. To customize behavior
	* for a specific environment, override `createErrorHandler()` rather than
	* this method.
	*/
	async renderError(request, options) {
		return this.#errorHandler.renderError(request, options);
	}
	/**
	* One-shot check: after the first request with a custom `src/fetch.ts`,
	* compare `usedFeatures` against the manifest and warn about any
	* configured features the user's pipeline doesn't call.
	*/
	#warnMissingFeatures() {
		if (this.#featureCheckDone || !this.#hasCustomFetchHandler) return;
		this.#featureCheckDone = true;
		const manifest = this.manifest;
		const missing = [];
		const used = getUsedFeatures(this.manifest);
		if (manifest.routes.some((r) => r.routeData.type === "redirect") && !(used & FetchFeatures.redirects)) missing.push("redirects");
		if (manifest.sessionConfig && !(used & FetchFeatures.sessions)) missing.push("sessions");
		if (manifest.actions && !(used & FetchFeatures.actions)) missing.push("actions");
		if (manifest.middleware && !(used & FetchFeatures.middleware)) missing.push("middleware");
		if (manifest.i18n && manifest.i18n.strategy !== "manual" && !(used & FetchFeatures.i18n)) missing.push("i18n");
		if (manifest.cacheConfig && !(used & FetchFeatures.cache)) missing.push("cache");
		for (const feature of missing) this.logger.warn("router", `Your project uses ${feature}, but your custom src/fetch.ts does not call the ${feature}() handler. This feature will not work unless your fetch handler calls it.`);
	}
	getDefaultStatusCode(routeData, pathname) {
		return getDefaultStatusCode(this.manifest, routeData, pathname);
	}
	getManifest() {
		return this.manifest;
	}
	logThisRequest({ pathname, method, statusCode, isRewrite, timeStart }) {
		const timeEnd = performance.now();
		this.logRequest({
			pathname,
			method,
			statusCode,
			isRewrite,
			reqTime: timeEnd - timeStart
		});
	}
};
//#endregion
//#region node_modules/astro/dist/core/app/app.js
var App = class extends BaseApp {
	isDev() {
		return false;
	}
	logRequest(_options) {}
};
//#endregion
//#region node_modules/astro/dist/core/app/entrypoints/virtual/prod.js
var createApp$1 = ({ streaming } = {}) => {
	const app = new App(manifest, streaming);
	app.setFetchHandler(_virtual_astro_fetchable_default);
	return app;
};
//#endregion
//#region node_modules/astro/dist/core/app/entrypoints/virtual/index.js
var createApp = createApp$1;
//#endregion
//#region \0virtual:astro-node:config
var _virtual_astro_node_config_exports = /* @__PURE__ */ __exportAll({
	bodySizeLimit: () => bodySizeLimit,
	client: () => client,
	experimentalDisableStreaming: () => false,
	host: () => true,
	mode: () => mode,
	port: () => port,
	server: () => server,
	staticHeaders: () => false
});
var mode = "standalone";
var client = "file:///C:/Programming%20section/virnobyte/dist/client/";
var server = "file:///C:/Programming%20section/virnobyte/dist/server/";
var port = 3e3;
var bodySizeLimit = 1073741824;
//#endregion
//#region node_modules/astro/dist/core/app/createOutgoingHttpHeaders.js
var createOutgoingHttpHeaders = (headers) => {
	if (!headers) return;
	const nodeHeaders = Object.fromEntries(headers.entries());
	if (Object.keys(nodeHeaders).length === 0) return;
	if (headers.has("set-cookie")) {
		const cookieHeaders = headers.getSetCookie();
		if (cookieHeaders.length > 1) nodeHeaders["set-cookie"] = cookieHeaders;
	}
	return nodeHeaders;
};
//#endregion
//#region node_modules/astro/dist/core/app/node.js
function createRequestFromNodeRequest(req, { skipBody = false, allowedDomains = [], bodySizeLimit, port: serverPort } = {}) {
	const controller = new AbortController();
	const protocol = "encrypted" in req.socket && req.socket.encrypted ? "https" : "http";
	const untrustedHostname = typeof req.headers.host === "string" ? req.headers.host : typeof req.headers[":authority"] === "string" ? req.headers[":authority"] : void 0;
	const validatedForwardedHeaders = validateForwardedHeaders(getFirstForwardedValue(req.headers["x-forwarded-proto"]), getFirstForwardedValue(req.headers["x-forwarded-host"]), getFirstForwardedValue(req.headers["x-forwarded-port"]), allowedDomains);
	const validatedHostname = validateHost(untrustedHostname, validatedForwardedHeaders.protocol ?? protocol, allowedDomains);
	const fallbackHostname = serverPort ? `localhost:${serverPort}` : "localhost";
	const url = buildRequestUrl(protocol, validatedHostname ?? fallbackHostname, req.url, serverPort);
	const options = {
		method: req.method || "GET",
		headers: makeRequestHeaders(req),
		signal: controller.signal
	};
	if (options.method !== "HEAD" && options.method !== "GET" && skipBody === false) Object.assign(options, makeRequestBody(req, bodySizeLimit));
	const request = new Request(url, options);
	wireAbortController(req, controller);
	const clientIp = (validatedHostname !== void 0 || validatedForwardedHeaders.host !== void 0 ? getFirstForwardedValue(req.headers["x-forwarded-for"]) : void 0) || req.socket?.remoteAddress;
	if (clientIp) Reflect.set(request, clientAddressSymbol, clientIp);
	return request;
}
function wireAbortController(req, controller) {
	const socket = getRequestSocket(req);
	if (socket && typeof socket.on === "function") {
		const existingCleanup = getAbortControllerCleanup(req);
		if (existingCleanup) existingCleanup();
		let cleanedUp = false;
		const removeSocketListener = () => {
			if (typeof socket.off === "function") socket.off("close", onSocketClose);
			else if (typeof socket.removeListener === "function") socket.removeListener("close", onSocketClose);
		};
		const cleanup = () => {
			if (cleanedUp) return;
			cleanedUp = true;
			removeSocketListener();
			controller.signal.removeEventListener("abort", cleanup);
			Reflect.deleteProperty(req, nodeRequestAbortControllerCleanupSymbol);
		};
		const onSocketClose = () => {
			cleanup();
			if (!controller.signal.aborted) controller.abort();
		};
		socket.on("close", onSocketClose);
		controller.signal.addEventListener("abort", cleanup, { once: true });
		Reflect.set(req, nodeRequestAbortControllerCleanupSymbol, cleanup);
		if (socket.destroyed) onSocketClose();
	}
}
async function writeResponse(source, destination) {
	const { status, headers, body, statusText } = source;
	if (!(destination instanceof Http2ServerResponse)) destination.statusMessage = statusText;
	destination.writeHead(status, createOutgoingHttpHeaders(headers));
	const cleanupAbortFromDestination = getAbortControllerCleanup(destination.req ?? void 0);
	if (cleanupAbortFromDestination) {
		const runCleanup = () => {
			cleanupAbortFromDestination();
			if (typeof destination.off === "function") {
				destination.off("finish", runCleanup);
				destination.off("close", runCleanup);
			} else {
				destination.removeListener?.("finish", runCleanup);
				destination.removeListener?.("close", runCleanup);
			}
		};
		destination.on("finish", runCleanup);
		destination.on("close", runCleanup);
	}
	if (!body) return destination.end();
	try {
		const reader = body.getReader();
		destination.on("close", () => {
			reader.cancel().catch((err) => {
				console.error("There was an uncaught error in the middle of the stream while rendering %s.", destination.req.url, err);
			});
		});
		let result = await reader.read();
		while (!result.done) {
			destination.write(result.value);
			result = await reader.read();
		}
		destination.end();
	} catch (err) {
		destination.write("Internal server error", () => {
			err instanceof Error ? destination.destroy(err) : destination.destroy();
		});
	}
}
function buildRequestUrl(protocol, hostnamePort, requestPath, serverPort) {
	const path = requestPath ?? "";
	if (URL.canParse(`${protocol}://${hostnamePort}${path}`)) return new URL(`${protocol}://${hostnamePort}${path}`);
	if (URL.canParse(`${protocol}://${hostnamePort}`)) return new URL(`${protocol}://${hostnamePort}`);
	const fallbackHost = serverPort ? `localhost:${serverPort}` : "localhost";
	return new URL(`${protocol}://${fallbackHost}`);
}
function makeRequestHeaders(req) {
	const headers = new Headers();
	for (const [name, value] of Object.entries(req.headers)) {
		if (value === void 0) continue;
		if (Array.isArray(value)) for (const item of value) headers.append(name, item);
		else headers.append(name, value);
	}
	return headers;
}
function makeRequestBody(req, bodySizeLimit) {
	if (req.body !== void 0) {
		if (typeof req.body === "string" && req.body.length > 0) return { body: Buffer.from(req.body) };
		if (req.body instanceof ArrayBuffer || ArrayBuffer.isView(req.body)) return { body: req.body };
		if (typeof req.body === "object" && req.body !== null && Object.keys(req.body).length > 0) return { body: Buffer.from(JSON.stringify(req.body)) };
		if (typeof req.body === "object" && req.body !== null && typeof req.body[Symbol.asyncIterator] !== "undefined") return asyncIterableToBodyProps(req.body, bodySizeLimit);
	}
	return asyncIterableToBodyProps(req, bodySizeLimit);
}
function asyncIterableToBodyProps(iterable, bodySizeLimit) {
	return {
		body: bodySizeLimit != null ? limitAsyncIterable(iterable, bodySizeLimit) : iterable,
		duplex: "half"
	};
}
async function* limitAsyncIterable(iterable, limit) {
	let received = 0;
	for await (const chunk of iterable) {
		const byteLength = chunk instanceof Uint8Array ? chunk.byteLength : typeof chunk === "string" ? Buffer.byteLength(chunk) : 0;
		received += byteLength;
		if (received > limit) throw new Error(`Body size limit exceeded: received more than ${limit} bytes`);
		yield chunk;
	}
}
function getAbortControllerCleanup(req) {
	if (!req) return void 0;
	const cleanup = Reflect.get(req, nodeRequestAbortControllerCleanupSymbol);
	return typeof cleanup === "function" ? cleanup : void 0;
}
function getRequestSocket(req) {
	if (req.socket && typeof req.socket.on === "function") return req.socket;
	const http2Socket = req.stream?.session?.socket;
	if (http2Socket && typeof http2Socket.on === "function") return http2Socket;
}
function resolveClientDir(options) {
	const clientURLRaw = new URL(options.client);
	const serverURLRaw = new URL(options.server);
	const rel = path.relative(url.fileURLToPath(serverURLRaw), url.fileURLToPath(clientURLRaw));
	const serverFolder = path.basename(options.server);
	let serverEntryFolderURL = path.dirname(import.meta.url);
	let previous = "";
	while (!serverEntryFolderURL.endsWith(serverFolder)) {
		if (serverEntryFolderURL === previous) throw new Error(`[@astrojs/node] Could not find the server directory "${serverFolder}" by walking up from "${import.meta.url}". This can happen when the server entry point is bundled into a single file (e.g. with esbuild) so that import.meta.url no longer contains the original "${serverFolder}" path segment. When bundling the server entry, make sure the output path contains a "${serverFolder}" directory segment, or avoid bundling the server entry entirely.`);
		previous = serverEntryFolderURL;
		serverEntryFolderURL = path.dirname(serverEntryFolderURL);
	}
	const serverEntryURL = serverEntryFolderURL + "/entry.mjs";
	const clientURL = new URL(appendForwardSlash(rel), serverEntryURL);
	return url.fileURLToPath(clientURL);
}
//#endregion
//#region node_modules/@astrojs/node/dist/serve-app.js
var PRERENDERED_ROUTE_TYPES = ["page", "endpoint"];
async function readErrorPageFromDisk(client, status) {
	const filePaths = [`${status}.html`, `${status}/index.html`];
	for (const filePath of filePaths) {
		const fullPath = path.join(client, filePath);
		let stream;
		try {
			stream = createReadStream(fullPath);
			await new Promise((resolve, reject) => {
				stream.once("open", () => resolve());
				stream.once("error", reject);
			});
			const webStream = Readable.toWeb(stream);
			return new Response(webStream, { headers: { "Content-Type": "text/html; charset=utf-8" } });
		} catch {
			stream?.destroy();
		}
	}
}
function createAppHandler(app, options) {
	const logger = app.adapterLogger;
	const requestContext = new AsyncLocalStorage();
	const abortedRequestErrors = /* @__PURE__ */ new WeakSet();
	process.on("unhandledRejection", (reason) => {
		const requestUrl = requestContext.getStore();
		if (!requestUrl || reason instanceof Error && abortedRequestErrors.has(reason)) return;
		const error = reason instanceof Error ? reason.stack || reason.message : String(reason);
		logger.error(`Unhandled rejection while rendering ${requestUrl}
${error}`);
	});
	const client = resolveClientDir(options);
	const prerenderedErrorPageFetch = async (url) => {
		const { pathname } = new URL(url);
		if (pathname.endsWith("/404.html") || pathname.endsWith("/404/index.html")) {
			const response = await readErrorPageFromDisk(client, 404);
			if (response) return response;
		}
		if (pathname.endsWith("/500.html") || pathname.endsWith("/500/index.html")) {
			const response = await readErrorPageFromDisk(client, 500);
			if (response) return response;
		}
		return new Response(null, { status: 404 });
	};
	const effectiveBodySizeLimit = options.bodySizeLimit === 0 || options.bodySizeLimit === Number.POSITIVE_INFINITY ? void 0 : options.bodySizeLimit;
	return async (req, res, next, locals) => {
		req.once("error", (error) => {
			if (error.code === "ECONNRESET") abortedRequestErrors.add(error);
		});
		let request;
		try {
			request = createRequestFromNodeRequest(req, {
				allowedDomains: app.getAllowedDomains?.() ?? [],
				bodySizeLimit: effectiveBodySizeLimit,
				port: options.port
			});
		} catch (err) {
			logger.error(`Could not render ${req.url}`);
			console.error(err);
			res.statusCode = 500;
			res.end("Internal Server Error");
			return;
		}
		try {
			let routeData = app.match(request, true);
			if (routeData?.prerender && PRERENDERED_ROUTE_TYPES.includes(routeData.type)) routeData = app.match(request);
			if (routeData) await requestContext.run(request.url, async () => {
				await writeResponse(await app.render(request, {
					addCookieHeader: true,
					locals,
					routeData,
					prerenderedErrorPageFetch
				}), res);
			});
			else if (next) {
				const cleanup = getAbortControllerCleanup(req);
				if (cleanup) cleanup();
				return next();
			} else await requestContext.run(request.url, async () => {
				await writeResponse(await app.render(request, {
					addCookieHeader: true,
					prerenderedErrorPageFetch
				}), res);
			});
		} catch (err) {
			if (err instanceof Error && abortedRequestErrors.has(err)) return;
			const error = err instanceof Error ? err.stack || err.message : String(err);
			logger.error(`Could not render ${request.url}
${error}`);
			if (!res.headersSent) {
				res.statusCode = 500;
				res.end("Internal Server Error");
			} else res.destroy();
		}
	};
}
//#endregion
//#region node_modules/@astrojs/node/dist/log-listening-on.js
var wildcardHosts = /* @__PURE__ */ new Set([
	"0.0.0.0",
	"::",
	"0000:0000:0000:0000:0000:0000:0000:0000"
]);
async function logListeningOn(logger, server, configuredHost) {
	await new Promise((resolve) => server.once("listening", resolve));
	const protocol = server instanceof https.Server ? "https" : "http";
	const host = getResolvedHostForHttpServer(configuredHost);
	const { port } = server.address();
	const address = getNetworkAddress(protocol, host, port);
	if (host === void 0 || wildcardHosts.has(host)) logger.info(`Server listening on 
  local: ${address.local[0]} 	
  network: ${address.network[0]}
`);
	else logger.info(`Server listening on ${address.local[0]}`);
}
function getResolvedHostForHttpServer(host) {
	if (host === false) return "localhost";
	else if (host === true) return;
	else return host;
}
function getNetworkAddress(protocol = "http", hostname, port, base) {
	const NetworkAddress = {
		local: [],
		network: []
	};
	Object.values(os.networkInterfaces()).flatMap((nInterface) => nInterface ?? []).filter((detail) => detail && detail.address && detail.family === "IPv4").forEach((detail) => {
		let host = detail.address.replace("127.0.0.1", hostname === void 0 || wildcardHosts.has(hostname) ? "localhost" : hostname);
		if (host.includes(":")) host = `[${host}]`;
		const url = `${protocol}://${host}:${port}${base ? base : ""}`;
		if (detail.address.includes("127.0.0.1")) NetworkAddress.local.push(url);
		else NetworkAddress.network.push(url);
	});
	return NetworkAddress;
}
//#endregion
//#region node_modules/@astrojs/node/dist/serve-static.js
function resolveStaticPath(client, urlPath) {
	const filePath = path.join(client, urlPath);
	const resolved = path.resolve(filePath);
	const resolvedClient = path.resolve(client);
	if (resolved !== resolvedClient && !resolved.startsWith(resolvedClient + path.sep)) return {
		filePath: resolved,
		isDirectory: false
	};
	let isDirectory = false;
	try {
		isDirectory = fs.lstatSync(filePath).isDirectory();
	} catch {}
	return {
		filePath: resolved,
		isDirectory
	};
}
function createStaticHandler(app, options, headersMap) {
	const client = resolveClientDir(options);
	return (req, res, ssr) => {
		if (req.url) {
			let fullUrl = req.url;
			if (req.url.includes("#")) fullUrl = fullUrl.slice(0, req.url.indexOf("#"));
			const qIndex = fullUrl.indexOf("?");
			const urlPath = qIndex >= 0 ? fullUrl.slice(0, qIndex) : fullUrl;
			const urlQuery = qIndex >= 0 ? fullUrl.slice(qIndex + 1) : "";
			let fsPath = app.removeBase(urlPath);
			try {
				fsPath = decodeURI(fsPath);
			} catch {}
			const { isDirectory } = resolveStaticPath(client, fsPath);
			const hasSlash = urlPath.endsWith("/");
			let pathname = urlPath;
			if (headersMap && headersMap.length > 0) {
				const request = createRequestFromNodeRequest(req, { port: options.port });
				const routeData = app.match(request, true);
				getAbortControllerCleanup(req)?.();
				if (routeData && routeData.prerender) {
					const baselessPathname = prependForwardSlash(app.removeBase(urlPath));
					const matchedRoute = headersMap.find((header) => header.pathname.includes(baselessPathname));
					if (matchedRoute) for (const header of matchedRoute.headers) res.setHeader(header.key, header.value);
				}
			}
			switch (app.manifest.trailingSlash) {
				case "never":
					if (isDirectory && urlPath !== "/" && hasSlash) {
						pathname = urlPath.slice(0, -1) + (urlQuery ? "?" + urlQuery : "");
						res.statusCode = 301;
						res.setHeader("Location", pathname);
						return res.end();
					}
					if (isDirectory && !hasSlash) pathname = `${urlPath}/index.html`;
					break;
				case "ignore":
					if (isDirectory && !hasSlash) pathname = `${urlPath}/index.html`;
					break;
				case "always": if (!hasSlash && !hasFileExtension(urlPath) && !isInternalPath(urlPath)) {
					pathname = urlPath + "/" + (urlQuery ? "?" + urlQuery : "");
					res.statusCode = 301;
					res.setHeader("Location", pathname);
					return res.end();
				}
			}
			pathname = prependForwardSlash(app.removeBase(pathname));
			const normalizedPathname = path.posix.normalize(pathname);
			const stream = send(req, normalizedPathname, {
				root: client,
				dotfiles: normalizedPathname.startsWith("/.well-known/") ? "allow" : "deny",
				extensions: app.manifest.buildFormat === "file" || app.manifest.buildFormat === "preserve" ? ["html"] : []
			});
			let forwardError = false;
			stream.on("error", (err) => {
				if (forwardError) {
					const status = "statusCode" in err ? err.statusCode : 500;
					if (status >= 500) console.error(err.toString());
					res.writeHead(status);
					res.end(status >= 500 ? "Internal server error" : "");
					return;
				}
				ssr();
			});
			stream.on("file", () => {
				forwardError = true;
			});
			stream.on("stream", () => {
				if (normalizedPathname.startsWith(`/${app.manifest.assetsDir}/`)) res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
			});
			stream.pipe(res);
		} else ssr();
	};
}
function prependForwardSlash(pth) {
	return pth.startsWith("/") ? pth : "/" + pth;
}
//#endregion
//#region node_modules/@astrojs/node/dist/standalone.js
var hostOptions = (host) => {
	if (typeof host === "boolean") return host ? "0.0.0.0" : "localhost";
	return host;
};
function standalone(app, options, headersMap) {
	const port = process.env.PORT ? Number(process.env.PORT) : options.port ?? 8080;
	const host = process.env.HOST ?? hostOptions(options.host);
	const server = createServer(createStandaloneHandler(app, {
		...options,
		port
	}, headersMap), host, port);
	server.server.listen(port, host);
	if (process.env.ASTRO_NODE_LOGGING !== "disabled") app.getLogger().then(() => logListeningOn(app.adapterLogger, server.server, host));
	server.server.on("close", () => {
		app.logger.close();
	});
	return {
		server,
		done: server.closed()
	};
}
function createStandaloneHandler(app, options, headersMap) {
	const appHandler = createAppHandler(app, options);
	const staticHandler = createStaticHandler(app, options, headersMap);
	return (req, res) => {
		try {
			decodeURI(req.url);
		} catch {
			res.writeHead(400);
			res.end("Bad request.");
			return;
		}
		staticHandler(req, res, () => appHandler(req, res));
	};
}
function createServer(listener, host, port) {
	let httpServer;
	if (process.env.SERVER_CERT_PATH && process.env.SERVER_KEY_PATH) httpServer = https.createServer({
		key: fs.readFileSync(process.env.SERVER_KEY_PATH),
		cert: fs.readFileSync(process.env.SERVER_CERT_PATH)
	}, listener);
	else httpServer = http.createServer(listener);
	enableDestroy(httpServer);
	const closed = new Promise((resolve, reject) => {
		httpServer.addListener("close", resolve);
		httpServer.addListener("error", reject);
	});
	return {
		server: httpServer,
		host,
		port,
		closed() {
			return closed;
		},
		async stop() {
			await new Promise((resolve, reject) => {
				httpServer.destroy((err) => err ? reject(err) : resolve(void 0));
			});
		}
	};
}
var app = createApp({ streaming: true });
var headersMap = void 0;
var handler = createStandaloneHandler(app, _virtual_astro_node_config_exports, headersMap);
var startServer = () => standalone(app, _virtual_astro_node_config_exports, headersMap);
if (process.env.ASTRO_NODE_AUTOSTART !== "disabled") startServer();
//#endregion
export { handler, _virtual_astro_node_config_exports as options, startServer };
