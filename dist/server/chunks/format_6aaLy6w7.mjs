//#region src/lib/format.ts
var inr = (n) => n == null ? "" : "₹" + new Intl.NumberFormat("en-IN").format(n);
var num = (n) => new Intl.NumberFormat("en-IN").format(n);
function formatDate(iso, opts = {
	day: "numeric",
	month: "short",
	year: "numeric"
}) {
	if (!iso) return "";
	const d = /* @__PURE__ */ new Date(iso.length === 10 ? iso + "T00:00:00" : iso.replace(" ", "T") + (iso.includes("Z") ? "" : "Z"));
	return isNaN(+d) ? iso : d.toLocaleDateString("en-IN", opts);
}
/** MM/YY used on the membership card. */
function cardExpiry(iso) {
	if (!iso) return "--/--";
	const [y, m] = iso.split("-");
	return `${m}/${y.slice(2)}`;
}
function groupCardNumber(n) {
	return n.replace(/\s+/g, "").replace(/(.{4})/g, "$1 ").trim();
}
function slugify(s) {
	return s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-");
}
function escapeHtml(s) {
	return s.replace(/[&<>"']/g, (c) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;"
	})[c]);
}
/** Strips dangerous executable scripts and event handlers, while preserving all styling & markup. */
function sanitizeHtml(html) {
	if (!html) return "";
	return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/<iframe\b([^>]*)>(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, (_match, attrs) => {
		if (/\bsrc=["']https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com|player\.vimeo\.com|google\.com\/maps)\//i.test(attrs)) return `<iframe${attrs}></iframe>`;
		return "";
	}).replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "").replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "").replace(/\s+on[a-zA-Z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "").replace(/(href|src)\s*=\s*(["']?)\s*javascript:[^"'>]*\2/gi, "$1=\"#\"");
}
/** Parses markdown table blocks (| header | ... |) into responsive HTML tables */
function parseMarkdownTable(lines) {
	if (lines.length < 2) return null;
	const headerLine = lines[0].trim();
	const sepLine = lines[1].trim();
	if (!headerLine.includes("|") || !sepLine.includes("|")) return null;
	const sepCols = sepLine.replace(/^\||\|$/g, "").split("|").map((s) => s.trim());
	if (sepCols.length === 0 || !sepCols.every((s) => /^:?-+:?$/.test(s))) return null;
	const aligns = sepCols.map((s) => {
		const left = s.startsWith(":");
		const right = s.endsWith(":");
		if (left && right) return "center";
		if (right) return "right";
		return "left";
	});
	const parseRow = (line) => line.replace(/^\||\|$/g, "").split("|").map((s) => s.trim());
	const headers = parseRow(headerLine);
	const dataRows = lines.slice(2).map(parseRow);
	return `<div class="table-responsive"><table class="prose-table"><thead><tr>${headers.map((h, i) => `<th style="text-align: ${aligns[i] || "left"};">${inlineFormatting(h)}</th>`).join("")}</tr></thead><tbody>${dataRows.map((row) => `<tr>${row.map((cell, i) => `<td style="text-align: ${aligns[i] || "left"};">${inlineFormatting(cell || "")}</td>`).join("")}</tr>`).join("\n")}</tbody></table></div>`;
}
/**
* Formats inline text with Markdown bold, italic, code, and links,
* while preserving valid HTML tags (like <span style="...">, <mark>, <font>, <br>, etc.)
*/
function inlineFormatting(s) {
	const tokens = [];
	const placeholder = (idx) => `\x02TOK${idx}\x03`;
	let protectedStr = s.replace(/<\/?[a-zA-Z][a-zA-Z0-9-]*(\s+[^>]*)?\/?>/g, (tag) => {
		tokens.push(sanitizeHtml(tag));
		return placeholder(tokens.length - 1);
	});
	protectedStr = protectedStr.replace(/&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	protectedStr = protectedStr.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/(^|[^*])\*(?!\s)(.+?)\*/g, "$1<em>$2</em>").replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, href) => {
		const safe = /^(\/|https?:\/\/|mailto:|tel:|#)/.test(href) ? href : "#";
		return `<a href="${safe}"${/^https?:\/\//.test(safe) ? " rel=\"noopener\" target=\"_blank\"" : ""}>${text}</a>`;
	});
	return protectedStr.replace(/\x02TOK(\d+)\x03/g, (_m, idx) => tokens[Number(idx)] || "");
}
/**
* Universal content renderer for blog articles and custom pages.
* Seamlessly supports:
* 1. Raw HTML code (tables with inline styles, background colors, text alignments, divs, custom cards)
* 2. Markdown tables (| Col 1 | Col 2 |) with automatic responsive wrapper
* 3. Standard Markdown (## headings, - lists, 1. lists, **bold**, *italic*, links)
* 4. Mixed HTML + Markdown
*/
function markdown(src, opts = {}) {
	if (!src) return "";
	const off = opts.headingOffset ?? 0;
	const lines = src.replace(/\r\n/g, "\n").trim().split("\n");
	const blocks = [];
	let currentBlock = [];
	let inHtmlBlockTag = null;
	let htmlDepth = 0;
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const trimmed = line.trim();
		if (!inHtmlBlockTag) {
			const matchStart = /^<([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*>/i.exec(trimmed);
			if (matchStart) {
				const tagName = matchStart[1].toLowerCase();
				if ([
					"table",
					"div",
					"section",
					"article",
					"style",
					"pre",
					"blockquote",
					"ul",
					"ol",
					"figure",
					"details",
					"form"
				].includes(tagName)) {
					if (currentBlock.length > 0) {
						blocks.push(currentBlock.join("\n"));
						currentBlock = [];
					}
					inHtmlBlockTag = tagName;
					htmlDepth = 1;
					currentBlock.push(line);
					const closeRegex = new RegExp(`</${tagName}>`, "gi");
					const openRegex = new RegExp(`<${tagName}\\b`, "gi");
					const opens = (line.match(openRegex) || []).length;
					const closes = (line.match(closeRegex) || []).length;
					htmlDepth += opens - 1 - closes;
					if (htmlDepth <= 0) {
						blocks.push(currentBlock.join("\n"));
						currentBlock = [];
						inHtmlBlockTag = null;
					}
					continue;
				}
			}
			if (/^#{1,6}\s+/.test(trimmed)) {
				if (currentBlock.length > 0) {
					blocks.push(currentBlock.join("\n"));
					currentBlock = [];
				}
				blocks.push(line);
				continue;
			}
			if (/^\|.*\|$/.test(trimmed)) {
				if (currentBlock.length > 0 && !currentBlock[0].trim().startsWith("|")) {
					blocks.push(currentBlock.join("\n"));
					currentBlock = [];
				}
				currentBlock.push(line);
				continue;
			} else if (currentBlock.length > 0 && currentBlock[0].trim().startsWith("|")) {
				blocks.push(currentBlock.join("\n"));
				currentBlock = [];
			}
		} else {
			currentBlock.push(line);
			const closeRegex = new RegExp(`</${inHtmlBlockTag}>`, "gi");
			const openRegex = new RegExp(`<${inHtmlBlockTag}\\b`, "gi");
			const opens = (line.match(openRegex) || []).length;
			const closes = (line.match(closeRegex) || []).length;
			htmlDepth += opens - closes;
			if (htmlDepth <= 0) {
				blocks.push(currentBlock.join("\n"));
				currentBlock = [];
				inHtmlBlockTag = null;
			}
			continue;
		}
		if (trimmed === "") {
			if (currentBlock.length > 0) {
				blocks.push(currentBlock.join("\n"));
				currentBlock = [];
			}
		} else currentBlock.push(line);
	}
	if (currentBlock.length > 0) blocks.push(currentBlock.join("\n"));
	return blocks.map((block) => {
		const trimmed = block.trim();
		if (!trimmed) return "";
		if (/^<[a-zA-Z][a-zA-Z0-9-]*\b/i.test(trimmed)) {
			if (/^<table\b/i.test(trimmed)) return `<div class="table-responsive">${sanitizeHtml(trimmed)}</div>`;
			return sanitizeHtml(trimmed);
		}
		const blockLines = block.split("\n");
		const mdTable = parseMarkdownTable(blockLines);
		if (mdTable) return mdTable;
		if (trimmed.startsWith("```")) return `<pre><code>${blockLines.slice(1, trimmed.endsWith("```") && blockLines.length > 1 ? -1 : void 0).map(escapeHtml).join("\n")}</code></pre>`;
		const h = /^(#{2,4})\s+(.*)$/.exec(blockLines[0].trim());
		if (h && blockLines.length === 1) {
			const level = Math.min(6, h[1].length + off);
			return `<h${level}>${inlineFormatting(h[2])}</h${level}>`;
		}
		if (blockLines.every((l) => /^\s*[-*]\s+/.test(l))) return `<ul>${blockLines.map((l) => `<li>${inlineFormatting(l.replace(/^\s*[-*]\s+/, ""))}</li>`).join("")}</ul>`;
		if (blockLines.every((l) => /^\s*\d+\.\s+/.test(l))) return `<ol>${blockLines.map((l) => `<li>${inlineFormatting(l.replace(/^\s*\d+\.\s+/, ""))}</li>`).join("")}</ol>`;
		if (blockLines.every((l) => /^\s*>\s*/.test(l))) return `<blockquote>${blockLines.map((l) => inlineFormatting(l.replace(/^\s*>\s*/, ""))).join("<br>")}</blockquote>`;
		if (/^([-*_]){3,}$/.test(trimmed)) return "<hr>";
		return `<p>${blockLines.map(inlineFormatting).join("<br>")}</p>`;
	}).filter(Boolean).join("\n\n");
}
/** Plain text (for meta, JSON-LD and word counts). Strips HTML tags and markdown symbols. */
function plain(src) {
	return src.replace(/<[^>]+>/g, " ").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[#*_>`|]/g, "").replace(/\s+/g, " ").trim();
}
function readingMinutes(src) {
	return Math.max(1, Math.round(plain(src).split(" ").length / 200));
}
//#endregion
export { inr as a, plain as c, groupCardNumber as i, readingMinutes as l, escapeHtml as n, markdown as o, formatDate as r, num as s, cardExpiry as t, slugify as u };
