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
function inline(s) {
	return escapeHtml(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/(^|[^*])\*(?!\s)(.+?)\*/g, "$1<em>$2</em>").replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, href) => {
		const safe = /^(\/|https?:\/\/|mailto:|tel:)/.test(href) ? href : "#";
		return `<a href="${safe}"${/^https?:\/\//.test(safe) ? " rel=\"noopener\" target=\"_blank\"" : ""}>${text}</a>`;
	});
}
/**
* Minimal, safe Markdown renderer for admin-authored content:
* ## / ### headings, paragraphs, - lists, 1. lists, **bold**, *italic*, [links](/path).
* HTML is escaped, so admin content can never inject scripts.
*/
function markdown(src, opts = {}) {
	const off = opts.headingOffset ?? 0;
	return src.replace(/\r\n/g, "\n").trim().split(/\n{2,}/).map((block) => {
		const lines = block.split("\n");
		const h = /^(#{2,4})\s+(.*)$/.exec(lines[0]);
		if (h && lines.length === 1) {
			const level = Math.min(6, h[1].length + off);
			return `<h${level}>${inline(h[2])}</h${level}>`;
		}
		if (lines.every((l) => /^\s*[-*]\s+/.test(l))) return `<ul>${lines.map((l) => `<li>${inline(l.replace(/^\s*[-*]\s+/, ""))}</li>`).join("")}</ul>`;
		if (lines.every((l) => /^\s*\d+\.\s+/.test(l))) return `<ol>${lines.map((l) => `<li>${inline(l.replace(/^\s*\d+\.\s+/, ""))}</li>`).join("")}</ol>`;
		return `<p>${lines.map(inline).join("<br>")}</p>`;
	}).join("\n");
}
/** Plain text (for meta, JSON-LD and word counts). */
function plain(src) {
	return src.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[#*_>`]/g, "").replace(/\s+/g, " ").trim();
}
function readingMinutes(src) {
	return Math.max(1, Math.round(plain(src).split(" ").length / 200));
}
//#endregion
export { inr as a, readingMinutes as c, groupCardNumber as i, slugify as l, escapeHtml as n, markdown as o, formatDate as r, num as s, cardExpiry as t };
