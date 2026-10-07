export const inr = (n: number | null | undefined) =>
  n == null ? '' : '₹' + new Intl.NumberFormat('en-IN').format(n);

export const num = (n: number) => new Intl.NumberFormat('en-IN').format(n);

export function formatDate(iso: string | null | undefined, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }) {
  if (!iso) return '';
  const d = new Date(iso.length === 10 ? iso + 'T00:00:00' : iso.replace(' ', 'T') + (iso.includes('Z') ? '' : 'Z'));
  return isNaN(+d) ? iso : d.toLocaleDateString('en-IN', opts);
}

/** MM/YY used on the membership card. */
export function cardExpiry(iso: string | null | undefined) {
  if (!iso) return '--/--';
  const [y, m] = iso.split('-');
  return `${m}/${y.slice(2)}`;
}

export function groupCardNumber(n: string) {
  return n.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function inline(s: string) {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, href) => {
      const safe = /^(\/|https?:\/\/|mailto:|tel:)/.test(href) ? href : '#';
      const ext = /^https?:\/\//.test(safe);
      return `<a href="${safe}"${ext ? ' rel="noopener" target="_blank"' : ''}>${text}</a>`;
    });
}

/**
 * Minimal, safe Markdown renderer for admin-authored content:
 * ## / ### headings, paragraphs, - lists, 1. lists, **bold**, *italic*, [links](/path).
 * HTML is escaped, so admin content can never inject scripts.
 */
export function markdown(src: string, opts: { headingOffset?: number } = {}) {
  const off = opts.headingOffset ?? 0;
  const blocks = src.replace(/\r\n/g, '\n').trim().split(/\n{2,}/);
  return blocks
    .map((block) => {
      const lines = block.split('\n');
      const h = /^(#{2,4})\s+(.*)$/.exec(lines[0]);
      if (h && lines.length === 1) {
        const level = Math.min(6, h[1].length + off);
        return `<h${level}>${inline(h[2])}</h${level}>`;
      }
      if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
        return `<ul>${lines.map((l) => `<li>${inline(l.replace(/^\s*[-*]\s+/, ''))}</li>`).join('')}</ul>`;
      }
      if (lines.every((l) => /^\s*\d+\.\s+/.test(l))) {
        return `<ol>${lines.map((l) => `<li>${inline(l.replace(/^\s*\d+\.\s+/, ''))}</li>`).join('')}</ol>`;
      }
      return `<p>${lines.map(inline).join('<br>')}</p>`;
    })
    .join('\n');
}

/** Plain text (for meta, JSON-LD and word counts). */
export function plain(src: string) {
  return src
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_>`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function readingMinutes(src: string) {
  return Math.max(1, Math.round(plain(src).split(' ').length / 200));
}
