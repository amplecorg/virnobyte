import { t as __exportAll } from "./rolldown-runtime_8H4AJuhK.mjs";
import { t as UPLOAD_DIR } from "./db_VNCUNG5f.mjs";
import { n as getSettings, t as contactInfo } from "./settings_Cmp5eMnN.mjs";
import { S as service, g as post, t as PORTFOLIO_CATEGORIES, u as job } from "./data_CqeiRLyy.mjs";
import { t as PHOTOS } from "./images_4iK9SaiJ.mjs";
import { n as escapeHtml } from "./format_B1bSNQa_.mjs";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";
//#region src/pages/og/[...path].ts
var ____path__exports = /* @__PURE__ */ __exportAll({ GET: () => GET });
var CACHE = join(UPLOAD_DIR, "..", "og-cache");
var PAGES = {
	default: {
		title: "IT Services, Computer Repair & IT Solutions in Pune",
		image: "virnobyte-inverter-installation"
	},
	home: {
		title: "IT Services, Computer Repair & IT Solutions in Pune",
		image: "virnobyte-inverter-installation"
	},
	membership: {
		title: "Membership card with Virno Coins",
		image: "virnobyte-circuit-board"
	},
	about: {
		title: "About Virnobyte",
		image: "virnobyte-custom-it-solutions-server"
	},
	contact: {
		title: "Contact Virnobyte in Chikhali, Pimpri-Chinchwad",
		image: "virnobyte-wifi-router-setup"
	},
	products: {
		title: "Laptops, CCTV, networking & IT hardware",
		image: "virnobyte-gaming-pc-build"
	},
	blog: {
		title: "Practical IT guides from the workshop",
		image: "virnobyte-laptop-workspace"
	},
	careers: {
		title: "Careers at Virnobyte",
		image: "virnobyte-hardware-solutions"
	},
	"pc-builder": {
		title: "Build your custom PC in 3D",
		image: "virnobyte-gaming-pc-build"
	},
	portfolio: {
		title: "Our IT, CCTV & networking projects",
		image: "virnobyte-networking-services"
	}
};
function lookup(path) {
	const [kind, slug] = path.replace(/\.jpg$/, "").split("/");
	if (kind === "services" && slug) {
		const s = service(slug);
		return s ? {
			title: s.h1,
			image: s.image
		} : null;
	}
	if (kind === "posts" && slug) {
		const p = post(slug);
		return p ? {
			title: p.title,
			image: p.image
		} : null;
	}
	if (kind === "careers" && slug) {
		const j = job(slug);
		return j ? {
			title: `${j.title} — careers at Virnobyte`,
			image: j.image
		} : null;
	}
	if (kind === "portfolio" && slug && slug in PORTFOLIO_CATEGORIES) return {
		title: PORTFOLIO_CATEGORIES[slug].name,
		image: "virnobyte-office-it-setup"
	};
	if (kind === "pages" && slug) return PAGES[slug] ?? null;
	if (kind === "default") return PAGES.default;
	return null;
}
function sourceFile(image) {
	if (image.startsWith("/uploads/")) {
		const f = join(UPLOAD_DIR, image.slice(9));
		return existsSync(f) ? f : null;
	}
	const candidates = [join(process.cwd(), "src", "assets", "photos", `${image}.jpg`)];
	const meta = PHOTOS[image];
	if (meta) {
		const src = meta.src.split("?")[0];
		if (src.startsWith("/@fs/")) candidates.push(decodeURIComponent(src.slice(4)));
		candidates.push(join(process.cwd(), "dist", "client", src));
	}
	return candidates.find((f) => existsSync(f)) ?? null;
}
function wrap(text, max) {
	const words = text.split(/\s+/);
	const lines = [];
	let line = "";
	for (const w of words) if ((line + " " + w).trim().length > max && line) {
		lines.push(line);
		line = w;
	} else line = (line + " " + w).trim();
	if (line) lines.push(line);
	return lines.slice(0, 3);
}
var GET = async ({ params }) => {
	const item = lookup(params.path ?? "default");
	if (!item) return new Response("Not found", { status: 404 });
	const c = contactInfo(getSettings());
	const key = createHash("sha1").update(JSON.stringify([
		item,
		c.name,
		c.phone,
		"v1"
	])).digest("hex").slice(0, 16);
	mkdirSync(CACHE, { recursive: true });
	const cached = join(CACHE, `${key}.jpg`);
	const headers = {
		"Content-Type": "image/jpeg",
		"Cache-Control": "public, max-age=86400"
	};
	if (existsSync(cached)) return new Response(readFileSync(cached), { headers });
	const W = 1200;
	const H = 630;
	const file = sourceFile(item.image);
	const base = file ? sharp(file).resize(W, H, {
		fit: "cover",
		position: "attention"
	}) : sharp({ create: {
		width: W,
		height: H,
		channels: 3,
		background: "#0b1724"
	} });
	const lines = wrap(item.title, 26);
	const fontSize = lines.length > 2 ? 58 : 66;
	const startY = 480 - (lines.length - 1) * fontSize * 1.12;
	const font = "'Bricolage Grotesque', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0b1724" stop-opacity="0.25"/>
        <stop offset="0.5" stop-color="#0b1724" stop-opacity="0.6"/>
        <stop offset="1" stop-color="#0b1724" stop-opacity="0.96"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect x="64" y="64" width="12" height="12" rx="2" fill="#4ea3ff"/>
    <text x="88" y="76" font-family="${font}" font-size="26" font-weight="700" fill="#ffffff">${escapeHtml(c.name)}</text>
    ${lines.map((l, i) => `<text x="64" y="${startY + i * fontSize * 1.12}" font-family="${font}" font-size="${fontSize}" font-weight="800" letter-spacing="-1.5" fill="#ffffff">${escapeHtml(l)}</text>`).join("")}
    <text x="64" y="566" font-family="${font}" font-size="26" font-weight="600" fill="#c9d6e3">${escapeHtml(`${c.locality} · ${c.city} · Pune   ·   ${c.phone}`)}</text>
  </svg>`;
	const out = await base.composite([{ input: Buffer.from(svg) }]).jpeg({
		quality: 82,
		mozjpeg: true
	}).toBuffer();
	writeFileSync(cached, out);
	return new Response(out, { headers });
};
//#endregion
//#region \0virtual:astro:page:src/pages/og/[...path]@_@ts
var page = () => ____path__exports;
//#endregion
export { page };
