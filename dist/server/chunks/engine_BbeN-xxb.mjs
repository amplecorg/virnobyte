import { a as json, n as all } from "./db_DgpM4awz.mjs";
//#region src/lib/pc/catalog.ts
function catalog() {
	return all("SELECT id, slug, category, brand, name, specs, price, model_url, in_stock FROM pc_parts WHERE active = 1 ORDER BY category, sort, price").map((r) => ({
		...r,
		specs: json(r.specs, {})
	}));
}
function presets(parts) {
	const bySlug = new Map(parts.map((p) => [p.slug, p]));
	return all("SELECT slug, name, summary, parts FROM pc_presets WHERE active = 1 ORDER BY sort, id").map((p) => {
		const sel = {
			storage: [],
			extra: []
		};
		for (const slug of json(p.parts, [])) {
			const part = bySlug.get(slug);
			if (!part) continue;
			if (part.category === "storage" || part.category === "extra") sel[part.category].push(part.id);
			else sel[part.category] = part.id;
		}
		return {
			slug: p.slug,
			name: p.name,
			summary: p.summary,
			selection: sel
		};
	});
}
//#endregion
//#region src/lib/pc/engine.ts
var CATEGORIES = [
	{
		key: "cpu",
		label: "Processor",
		required: true,
		hint: "Sets the socket every other part must match."
	},
	{
		key: "motherboard",
		label: "Motherboard",
		required: true,
		hint: "Must match the CPU socket and fit the case."
	},
	{
		key: "ram",
		label: "Memory (RAM)",
		required: true,
		hint: "DDR4 or DDR5 — set by the motherboard."
	},
	{
		key: "gpu",
		label: "Graphics card",
		required: false,
		hint: "Optional if the CPU has integrated graphics."
	},
	{
		key: "storage",
		label: "Storage",
		required: true,
		multi: true,
		hint: "Add one or more drives."
	},
	{
		key: "cooler",
		label: "CPU cooler",
		required: false,
		hint: "Optional if the CPU ships with a cooler."
	},
	{
		key: "psu",
		label: "Power supply",
		required: true,
		hint: "Sized from the estimated power draw."
	},
	{
		key: "case",
		label: "Cabinet (case)",
		required: true,
		hint: "Must fit the board, GPU, cooler and radiator."
	},
	{
		key: "extra",
		label: "Add-ons",
		required: false,
		multi: true,
		hint: "Fans, Wi-Fi, software and more."
	}
];
function resolve(sel, byId) {
	const one = (id, cat) => {
		const p = id != null ? byId.get(id) : void 0;
		return p && p.category === cat ? p : void 0;
	};
	const many = (ids, cat) => (ids ?? []).map((id) => byId.get(id)).filter((p) => !!p && p.category === cat);
	return {
		cpu: one(sel.cpu, "cpu"),
		motherboard: one(sel.motherboard, "motherboard"),
		ram: one(sel.ram, "ram"),
		gpu: one(sel.gpu, "gpu"),
		cooler: one(sel.cooler, "cooler"),
		psu: one(sel.psu, "psu"),
		case: one(sel.case, "case"),
		storage: many(sel.storage, "storage"),
		extra: many(sel.extra, "extra")
	};
}
var FF_ORDER = [
	"ITX",
	"mATX",
	"ATX",
	"E-ATX"
];
var list = (v) => Array.isArray(v) ? v : v == null || v === "" ? [] : [v];
var yes = (v) => v === true || v === "true" || v === 1 || v === "yes";
/** Estimated full-load system power in watts. */
function estimatePower(r) {
	const rows = [];
	if (r.cpu) rows.push({
		label: "Processor",
		watts: Math.round((+r.cpu.specs.tdp || 65) * 1.25)
	});
	if (r.gpu) rows.push({
		label: "Graphics card",
		watts: +r.gpu.specs.power_w || 0
	});
	if (r.motherboard) rows.push({
		label: "Motherboard",
		watts: r.motherboard.specs.form_factor === "ITX" ? 35 : 50
	});
	if (r.ram) rows.push({
		label: "Memory",
		watts: (+r.ram.specs.modules || 1) * 5
	});
	const storageW = r.storage.reduce((a, s) => a + (s.specs.kind === "HDD" ? 9 : s.specs.kind === "NVMe" ? 7 : 5), 0);
	if (storageW) rows.push({
		label: "Storage",
		watts: storageW
	});
	const fans = (+r.case?.specs.fans_included || 0) + r.extra.reduce((a, e) => a + (e.specs.kind === "fans" ? +e.specs.fans_count || 0 : 0), 0) + (r.cooler?.specs.kind === "AIO" ? Math.round((+r.cooler.specs.radiator_mm || 240) / 120) : r.cooler ? 1 : 0);
	if (fans) rows.push({
		label: `Fans (${fans})`,
		watts: fans * 3
	});
	if (r.cooler?.specs.kind === "AIO") rows.push({
		label: "AIO pump",
		watts: 8
	});
	const extraW = r.extra.reduce((a, e) => a + (+e.specs.power_w || 0), 0);
	if (extraW) rows.push({
		label: "Add-ons",
		watts: extraW
	});
	const total = rows.reduce((a, x) => a + x.watts, 0);
	return {
		rows,
		total,
		recommended: total ? Math.max(450, Math.ceil(total * 1.3 / 50) * 50) : 0
	};
}
function checkBuild(r) {
	const out = [];
	const { cpu, motherboard: mb, ram, gpu, cooler, psu, case: cs } = r;
	if (cpu && mb && cpu.specs.socket !== mb.specs.socket) out.push({
		level: "error",
		parts: ["cpu", "motherboard"],
		title: "Processor does not fit the motherboard",
		detail: `${cpu.name} uses socket ${cpu.specs.socket}; ${mb.name} has socket ${mb.specs.socket}.`,
		fix: `Choose a ${cpu.specs.socket} motherboard, or a ${mb.specs.socket} processor.`
	});
	if (cooler && cpu && !list(cooler.specs.sockets).includes(cpu.specs.socket)) out.push({
		level: "error",
		parts: ["cooler", "cpu"],
		title: "Cooler does not support this processor socket",
		detail: `${cooler.name} supports ${list(cooler.specs.sockets).join(", ")}; the processor needs ${cpu.specs.socket}.`,
		fix: "Choose a cooler that lists this socket."
	});
	if (ram && mb) {
		if (ram.specs.type !== mb.specs.ram_type) out.push({
			level: "error",
			parts: ["ram", "motherboard"],
			title: `${ram.specs.type} memory does not fit this motherboard`,
			detail: `${mb.name} takes ${mb.specs.ram_type} memory.`,
			fix: `Choose a ${mb.specs.ram_type} memory kit.`
		});
		if ((+ram.specs.modules || 1) > (+mb.specs.ram_slots || 0)) out.push({
			level: "error",
			parts: ["ram", "motherboard"],
			title: "Not enough memory slots",
			detail: `This kit has ${ram.specs.modules} sticks; the motherboard has ${mb.specs.ram_slots} slots.`,
			fix: "Choose a kit with fewer, larger sticks."
		});
		if ((+ram.specs.capacity_gb || 0) > (+mb.specs.max_ram_gb || Infinity)) out.push({
			level: "error",
			parts: ["ram", "motherboard"],
			title: "Too much memory for this motherboard",
			detail: `Selected ${ram.specs.capacity_gb} GB; the motherboard supports up to ${mb.specs.max_ram_gb} GB.`,
			fix: "Choose a smaller kit or a board with a higher limit."
		});
	}
	if (mb && cs && !list(cs.specs.supports).includes(mb.specs.form_factor)) out.push({
		level: "error",
		parts: ["motherboard", "case"],
		title: "Motherboard does not fit the cabinet",
		detail: `${mb.name} is ${mb.specs.form_factor}; ${cs.name} supports ${list(cs.specs.supports).join(", ")}.`,
		fix: FF_ORDER.indexOf(mb.specs.form_factor) > FF_ORDER.indexOf(cs.specs.max_board ?? "ATX") ? "Choose a larger cabinet." : "Choose a cabinet that supports this board size."
	});
	if (gpu && cs && +gpu.specs.length_mm > +cs.specs.gpu_max_mm) out.push({
		level: "error",
		parts: ["gpu", "case"],
		title: "Graphics card cannot fit inside the cabinet",
		detail: `GPU length: ${gpu.specs.length_mm} mm. Cabinet clearance: ${cs.specs.gpu_max_mm} mm.`,
		fix: "Choose a larger cabinet or a shorter graphics card."
	});
	if (cooler && cs) {
		if (cooler.specs.kind === "Air" && +cooler.specs.height_mm > +cs.specs.cooler_max_mm) out.push({
			level: "error",
			parts: ["cooler", "case"],
			title: "CPU cooler is too tall for the cabinet",
			detail: `Cooler height: ${cooler.specs.height_mm} mm. Cabinet clearance: ${cs.specs.cooler_max_mm} mm.`,
			fix: "Choose a shorter air cooler, an AIO liquid cooler, or a wider cabinet."
		});
		if (cooler.specs.kind === "AIO" && !list(cs.specs.radiator_mm).map(Number).includes(+cooler.specs.radiator_mm)) out.push({
			level: "error",
			parts: ["cooler", "case"],
			title: "Radiator size is not supported by the cabinet",
			detail: `${cooler.specs.radiator_mm} mm radiator; the cabinet supports ${list(cs.specs.radiator_mm).join(", ") || "none"} mm.`,
			fix: "Choose a different radiator size or cabinet."
		});
	}
	if (psu && cs && psu.specs.form_factor !== cs.specs.psu) out.push({
		level: psu.specs.form_factor === "SFX" ? "warning" : "error",
		parts: ["psu", "case"],
		title: `${psu.specs.form_factor} power supply in a cabinet built for ${cs.specs.psu}`,
		detail: psu.specs.form_factor === "SFX" ? "SFX units fit ATX cabinets with an adapter bracket." : "This power supply is physically too large for the cabinet.",
		fix: `Choose an ${cs.specs.psu} power supply.`
	});
	if (mb) {
		const nvme = r.storage.filter((s) => s.specs.form_factor === "M.2").length;
		if (nvme > (+mb.specs.m2_slots || 0)) out.push({
			level: "error",
			parts: ["storage", "motherboard"],
			title: "Not enough M.2 slots",
			detail: `${nvme} M.2 drives selected; the motherboard has ${mb.specs.m2_slots}.`,
			fix: "Remove an M.2 drive or use a 2.5\" SATA SSD instead."
		});
		const sata = r.storage.filter((s) => s.specs.form_factor !== "M.2").length;
		if (sata > (+mb.specs.sata_ports || 0)) out.push({
			level: "error",
			parts: ["storage", "motherboard"],
			title: "Not enough SATA ports",
			detail: `${sata} SATA drives; the board has ${mb.specs.sata_ports} ports.`
		});
	}
	if (cs) {
		if (r.storage.filter((s) => s.specs.form_factor === "3.5\"").length > (+cs.specs.drive_35 || 0)) out.push({
			level: "error",
			parts: ["storage", "case"],
			title: "No room for the 3.5\" hard disk",
			detail: `The cabinet has ${cs.specs.drive_35 || 0} 3.5" bay(s).`,
			fix: "Choose an SSD or a cabinet with drive bays."
		});
	}
	if (cpu && !gpu && !yes(cpu.specs.igpu)) out.push({
		level: "error",
		parts: ["gpu", "cpu"],
		title: "No display output",
		detail: `${cpu.name} has no integrated graphics, so the PC needs a graphics card to show a picture.`,
		fix: "Add a graphics card, or choose a processor with integrated graphics."
	});
	if (cpu && !cooler) out.push(yes(cpu.specs.cooler_included) ? {
		level: "info",
		parts: ["cooler"],
		title: "Using the boxed cooler",
		detail: `${cpu.name} ships with a stock cooler. An aftermarket cooler runs quieter.`
	} : {
		level: "error",
		parts: ["cooler", "cpu"],
		title: "This processor needs a cooler",
		detail: `${cpu.name} is sold without a cooler.`,
		fix: "Add an air or AIO cooler."
	});
	if (cpu && cooler && +cooler.specs.tdp_w && +cooler.specs.tdp_w < +cpu.specs.tdp) out.push({
		level: "warning",
		parts: ["cooler", "cpu"],
		title: "Cooler is rated below the processor’s heat output",
		detail: `Cooler rated ${cooler.specs.tdp_w} W; processor TDP is ${cpu.specs.tdp} W. Expect higher temperatures under load.`,
		fix: "Choose a cooler rated at or above the processor TDP."
	});
	if (ram && cooler?.specs.kind === "Air" && +ram.specs.height_mm > 40 && +cooler.specs.height_mm >= 160) out.push({
		level: "warning",
		parts: ["ram", "cooler"],
		title: "Tall memory may touch the cooler",
		detail: `Memory height ${ram.specs.height_mm} mm with a large tower cooler. Clearance depends on the board layout.`,
		fix: "We check clearance during assembly; low-profile memory avoids it."
	});
	const power = estimatePower(r);
	if (psu && power.total) {
		const w = +psu.specs.watts;
		if (w < power.total) out.push({
			level: "error",
			parts: ["psu"],
			title: "Power supply is too small",
			detail: `Estimated draw is ${power.total} W but the power supply provides ${w} W.`,
			fix: `Choose at least ${power.recommended} W.`
		});
		else if (w < power.recommended) out.push({
			level: "warning",
			parts: ["psu"],
			title: "Little power headroom",
			detail: `Estimated draw ${power.total} W; we recommend ${power.recommended} W (30% headroom) for stability and future upgrades.`,
			fix: `Choose a ${power.recommended} W or larger power supply.`
		});
		if (gpu && +gpu.specs.rec_psu_w > w) out.push({
			level: "warning",
			parts: ["psu", "gpu"],
			title: "Below the graphics card maker’s PSU recommendation",
			detail: `${gpu.name} recommends a ${gpu.specs.rec_psu_w} W power supply.`,
			fix: `Choose ${gpu.specs.rec_psu_w} W or more.`
		});
	}
	return out;
}
function missing(r) {
	const m = [];
	for (const c of CATEGORIES) {
		if (!c.required) continue;
		if (c.multi ? !r[c.key].length : !r[c.key]) m.push(c.key);
	}
	return m;
}
function status(issues, miss) {
	if (issues.some((i) => i.level === "error")) return "error";
	if (miss.length) return "incomplete";
	if (issues.some((i) => i.level === "warning")) return "warning";
	return "ok";
}
/**
* Would `part` be compatible with the rest of the current selection?
* Used to recommend options: only errors that involve the candidate's category count.
*/
function partErrors(part, sel, byId) {
	const next = { ...sel };
	if (part.category === "storage") next.storage = [...sel.storage ?? [], part.id];
	else if (part.category === "extra") next.extra = [...sel.extra ?? [], part.id];
	else next[part.category] = part.id;
	return checkBuild(resolve(next, byId)).filter((i) => i.level === "error" && i.parts.includes(part.category) && !(i.title === "No display output" && part.category !== "gpu" && part.category !== "cpu"));
}
function price(r, ps) {
	const lines = [];
	for (const c of CATEGORIES) {
		const v = r[c.key];
		for (const p of Array.isArray(v) ? v : v ? [v] : []) lines.push({
			category: c.key,
			name: p.name,
			price: p.price
		});
	}
	const parts = lines.reduce((a, l) => a + l.price, 0);
	const fees = (ps.assemblyFee || 0) + (ps.deliveryFee || 0);
	const g = ps.gstPercent / 100;
	const subtotal = ps.pricesIncludeGst ? Math.round((parts + fees) / (1 + g)) : parts + fees;
	const gst = ps.pricesIncludeGst ? parts + fees - subtotal : Math.round(subtotal * g);
	const total = subtotal + gst;
	return {
		lines,
		parts,
		assembly: ps.assemblyFee || 0,
		delivery: ps.deliveryFee || 0,
		subtotal,
		gst,
		total
	};
}
/** Factual build summary — published specs only, no invented benchmark scores. */
function summary(r) {
	const storageGb = r.storage.reduce((a, s) => a + (+s.specs.capacity_gb || 0), 0);
	return {
		cores: r.cpu ? `${r.cpu.specs.cores} cores / ${r.cpu.specs.threads} threads` : "—",
		clock: r.cpu ? `${r.cpu.specs.base_ghz}–${r.cpu.specs.boost_ghz} GHz` : "—",
		graphics: r.gpu ? /GB/.test(r.gpu.name) ? r.gpu.name : `${r.gpu.name} (${r.gpu.specs.vram_gb} GB)` : r.cpu && yes(r.cpu.specs.igpu) ? `Integrated (${r.cpu.specs.igpu === true ? "CPU graphics" : r.cpu.specs.igpu})` : "—",
		memory: r.ram ? `${r.ram.specs.capacity_gb} GB ${r.ram.specs.type}-${r.ram.specs.speed_mts}` : "—",
		storage: storageGb ? storageGb >= 1e3 ? `${+(storageGb / 1e3).toFixed(1)} TB` : `${storageGb} GB` : "—",
		formFactor: r.case ? `${r.case.specs.max_board ?? ""} cabinet` : "—"
	};
}
function decodeSelection(s) {
	const sel = {};
	for (const chunk of s.split(",")) {
		const [k, v] = chunk.split(":");
		if (!k || !v) continue;
		if (k === "storage" || k === "extra") sel[k] = v.split(".").map(Number).filter(Number.isFinite);
		else if (CATEGORIES.some((c) => c.key === k)) sel[k] = Number(v);
	}
	return sel;
}
//#endregion
export { missing as a, resolve as c, catalog as d, presets as f, estimatePower as i, status as l, checkBuild as n, partErrors as o, decodeSelection as r, price as s, CATEGORIES as t, summary as u };
