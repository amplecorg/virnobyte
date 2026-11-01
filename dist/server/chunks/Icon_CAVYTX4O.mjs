import { A as renderTemplate, F as createRenderInstruction, N as addAttribute, V as createAstro, j as maybeRenderHead, z as unescapeHTML } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
//#region node_modules/astro/dist/runtime/server/render/script.js
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
//#endregion
//#region src/components/Icon.astro
createAstro("https://virnobyte.com");
var $$Icon = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Icon;
	const PATHS = {
		phone: "<path d=\"M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2\"/>",
		whatsapp: "<path d=\"M3 21l1.65-3.8A9 9 0 1 1 7.6 20.2L3 21\"/><path d=\"M9.2 8.2l1.1 2.2-.8 1a4.6 4.6 0 0 0 2.6 2.6l1-.8 2.2 1.1-.6 1.4c-3.2 0-6.9-3.7-6.9-6.9z\"/>",
		pin: "<path d=\"M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z\"/><circle cx=\"12\" cy=\"9.5\" r=\"2.5\"/>",
		mail: "<rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"2\"/><path d=\"M3 7l9 6 9-6\"/>",
		arrow: "<path d=\"M5 12h14M13 6l6 6-6 6\"/>",
		"arrow-up-right": "<path d=\"M7 17L17 7M8 7h9v9\"/>",
		menu: "<path d=\"M4 7h16M4 12h16M4 17h16\"/>",
		close: "<path d=\"M6 6l12 12M18 6L6 18\"/>",
		calendar: "<rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"2\"/><path d=\"M16 3v4M8 3v4M3 10h18\"/>",
		directions: "<path d=\"M12 2l10 10-10 10L2 12z\"/><path d=\"M9 13v-2h5V9l3 3-3 3v-2\"/>",
		chevron: "<path d=\"M6 9l6 6 6-6\"/>",
		user: "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M4 21a8 8 0 0 1 16 0\"/>",
		coin: "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.6 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6.5V8M12 16v1.5\"/>",
		shield: "<path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"/><path d=\"M9 12l2 2 4-4\"/>",
		wrench: "<path d=\"M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 8-8-1.3-1.3a4 4 0 0 1-5-5L13 2z\" transform=\"rotate(0)\"/>",
		clock: "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/>",
		receipt: "<path d=\"M6 3h12v18l-3-2-3 2-3-2-3 2z\"/><path d=\"M9 8h6M9 12h6\"/>",
		home: "<path d=\"M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z\"/>",
		logout: "<path d=\"M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 17l-5-5 5-5M5 12h11\"/>",
		plus: "<path d=\"M12 5v14M5 12h14\"/>",
		minus: "<path d=\"M5 12h14\"/>",
		external: "<path d=\"M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5\"/>",
		search: "<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M20 20l-3.5-3.5\"/>",
		"panel-close": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/><path d=\"M9 3v18M16 15l-3-3 3-3\"/>",
		"panel-open": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/><path d=\"M9 3v18M14 9l3 3-3 3\"/>",
		dashboard: "<rect width=\"7\" height=\"9\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"5\" x=\"14\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"9\" x=\"14\" y=\"12\" rx=\"1\"/><rect width=\"7\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\"/>",
		users: "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"/><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"/>",
		"credit-card": "<rect width=\"20\" height=\"14\" x=\"2\" y=\"5\" rx=\"2\"/><line x1=\"2\" x2=\"22\" y1=\"10\" y2=\"10\"/>",
		cpu: "<rect width=\"16\" height=\"16\" x=\"4\" y=\"4\" rx=\"2\"/><rect width=\"6\" height=\"6\" x=\"9\" y=\"9\"/><path d=\"M15 2v2M9 2v2M20 15h2M20 9h2M15 20v2M9 20v2M2 15h2M2 9h2\"/>",
		"file-text": "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"/><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"/><path d=\"M10 9H8M16 13H8M16 17H8\"/>",
		settings: "<circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z\"/>",
		briefcase: "<rect width=\"20\" height=\"14\" x=\"2\" y=\"7\" rx=\"2\"/><path d=\"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16\"/>",
		image: "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/><circle cx=\"9\" cy=\"9\" r=\"2\"/><path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\"/>",
		message: "<path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/>"
	};
	const { name, size = 20, label, class: cls } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"${addAttribute(size, "width")}${addAttribute(size, "height")} fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"${addAttribute(cls, "class")}${addAttribute(label ? void 0 : "true", "aria-hidden")}${addAttribute(label ? "img" : void 0, "role")}${addAttribute(label, "aria-label")}>${unescapeHTML(PATHS[name])}</svg>`;
}, "C:/Programming section/virnobyte/src/components/Icon.astro", void 0);
//#endregion
export { renderScript as n, $$Icon as t };
