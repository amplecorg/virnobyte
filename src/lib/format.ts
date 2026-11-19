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

/** Strips dangerous executable scripts and event handlers, while preserving all styling & markup. */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b([^>]*)>(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, (_match, attrs) => {
      if (/\bsrc=["']https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com|player\.vimeo\.com|google\.com\/maps)\//i.test(attrs)) {
        return `<iframe${attrs}></iframe>`;
      }
      return '';
    })
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/\s+on[a-zA-Z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*(["']?)\s*javascript:[^"'>]*\2/gi, '$1="#"');
}

/** Parses markdown table blocks (| header | ... |) into responsive HTML tables */
function parseMarkdownTable(lines: string[]): string | null {
  if (lines.length < 2) return null;
  const headerLine = lines[0].trim();
  const sepLine = lines[1].trim();

  if (!headerLine.includes('|') || !sepLine.includes('|')) return null;

  const sepCols = sepLine.replace(/^\||\|$/g, '').split('|').map((s) => s.trim());
  if (sepCols.length === 0 || !sepCols.every((s) => /^:?-+:?$/.test(s))) return null;

  const aligns = sepCols.map((s) => {
    const left = s.startsWith(':');
    const right = s.endsWith(':');
    if (left && right) return 'center';
    if (right) return 'right';
    return 'left';
  });

  const parseRow = (line: string) =>
    line.replace(/^\||\|$/g, '').split('|').map((s) => s.trim());

  const headers = parseRow(headerLine);
  const dataRows = lines.slice(2).map(parseRow);

  const ths = headers
    .map((h, i) => `<th style="text-align: ${aligns[i] || 'left'};">${inlineFormatting(h)}</th>`)
    .join('');

  const trs = dataRows
    .map(
      (row) =>
        `<tr>${row.map((cell, i) => `<td style="text-align: ${aligns[i] || 'left'};">${inlineFormatting(cell || '')}</td>`).join('')}</tr>`
    )
    .join('\n');

  return `<div class="table-responsive"><table class="prose-table"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
}

/**
 * Formats inline text with Markdown bold, italic, code, and links,
 * while preserving valid HTML tags (like <span style="...">, <mark>, <font>, <br>, etc.)
 */
function inlineFormatting(s: string): string {
  const tokens: string[] = [];
  const placeholder = (idx: number) => `\x02TOK${idx}\x03`;

  // Protect valid HTML tags
  let protectedStr = s.replace(/<\/?[a-zA-Z][a-zA-Z0-9-]*(\s+[^>]*)?\/?>/g, (tag) => {
    tokens.push(sanitizeHtml(tag));
    return placeholder(tokens.length - 1);
  });

  // Escape remaining standalone < and > (e.g. math/comparison signs) and unescaped &
  protectedStr = protectedStr
    .replace(/&(?!#?\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Markdown transforms
  protectedStr = protectedStr
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, href) => {
      const safe = /^(\/|https?:\/\/|mailto:|tel:|#)/.test(href) ? href : '#';
      const ext = /^https?:\/\//.test(safe);
      return `<a href="${safe}"${ext ? ' rel="noopener" target="_blank"' : ''}>${text}</a>`;
    });

  // Restore protected HTML tags
  return protectedStr.replace(/\x02TOK(\d+)\x03/g, (_m, idx) => tokens[Number(idx)] || '');
}

/**
 * Universal content renderer for blog articles and custom pages.
 * Seamlessly supports:
 * 1. Raw HTML code (tables with inline styles, background colors, text alignments, divs, custom cards)
 * 2. Markdown tables (| Col 1 | Col 2 |) with automatic responsive wrapper
 * 3. Standard Markdown (## headings, - lists, 1. lists, **bold**, *italic*, links)
 * 4. Mixed HTML + Markdown
 */
export function markdown(src: string, opts: { headingOffset?: number } = {}) {
  if (!src) return '';
  const off = opts.headingOffset ?? 0;
  const normalized = src.replace(/\r\n/g, '\n').trim();

  // Tokenize lines into contiguous blocks, keeping multi-line HTML tags (like <table>, <div>, etc.) intact
  const lines = normalized.split('\n');
  const blocks: string[] = [];
  let currentBlock: string[] = [];
  let inHtmlBlockTag: string | null = null;
  let htmlDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!inHtmlBlockTag) {
      const matchStart = /^<([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*>/i.exec(trimmed);
      if (matchStart) {
        const tagName = matchStart[1].toLowerCase();
        if (['table', 'div', 'section', 'article', 'style', 'pre', 'blockquote', 'ul', 'ol', 'figure', 'details', 'form'].includes(tagName)) {
          if (currentBlock.length > 0) {
            blocks.push(currentBlock.join('\n'));
            currentBlock = [];
          }
          inHtmlBlockTag = tagName;
          htmlDepth = 1;
          currentBlock.push(line);
          const closeRegex = new RegExp(`</${tagName}>`, 'gi');
          const openRegex = new RegExp(`<${tagName}\\b`, 'gi');
          const opens = (line.match(openRegex) || []).length;
          const closes = (line.match(closeRegex) || []).length;
          htmlDepth += opens - 1 - closes;
          if (htmlDepth <= 0) {
            blocks.push(currentBlock.join('\n'));
            currentBlock = [];
            inHtmlBlockTag = null;
          }
          continue;
        }
      }

      // Heading boundary (##, ###, etc.)
      if (/^#{1,6}\s+/.test(trimmed)) {
        if (currentBlock.length > 0) {
          blocks.push(currentBlock.join('\n'));
          currentBlock = [];
        }
        blocks.push(line);
        continue;
      }

      // Markdown table boundary (| ... |)
      if (/^\|.*\|$/.test(trimmed)) {
        if (currentBlock.length > 0 && !currentBlock[0].trim().startsWith('|')) {
          blocks.push(currentBlock.join('\n'));
          currentBlock = [];
        }
        currentBlock.push(line);
        continue;
      } else if (currentBlock.length > 0 && currentBlock[0].trim().startsWith('|')) {
        blocks.push(currentBlock.join('\n'));
        currentBlock = [];
      }
    } else {
      currentBlock.push(line);
      const closeRegex = new RegExp(`</${inHtmlBlockTag}>`, 'gi');
      const openRegex = new RegExp(`<${inHtmlBlockTag}\\b`, 'gi');
      const opens = (line.match(openRegex) || []).length;
      const closes = (line.match(closeRegex) || []).length;
      htmlDepth += opens - closes;
      if (htmlDepth <= 0) {
        blocks.push(currentBlock.join('\n'));
        currentBlock = [];
        inHtmlBlockTag = null;
      }
      continue;
    }

    if (trimmed === '') {
      if (currentBlock.length > 0) {
        blocks.push(currentBlock.join('\n'));
        currentBlock = [];
      }
    } else {
      currentBlock.push(line);
    }
  }

  if (currentBlock.length > 0) {
    blocks.push(currentBlock.join('\n'));
  }

  // Render each block
  const rendered = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return '';

    // If block starts with an HTML tag (table, div, p, center, etc.)
    if (/^<[a-zA-Z][a-zA-Z0-9-]*\b/i.test(trimmed)) {
      if (/^<table\b/i.test(trimmed)) {
        return `<div class="table-responsive">${sanitizeHtml(trimmed)}</div>`;
      }
      return sanitizeHtml(trimmed);
    }

    const blockLines = block.split('\n');

    // 1. Markdown Table
    const mdTable = parseMarkdownTable(blockLines);
    if (mdTable) return mdTable;

    // 2. Fenced Code Block
    if (trimmed.startsWith('```')) {
      const codeLines = blockLines.slice(1, trimmed.endsWith('```') && blockLines.length > 1 ? -1 : undefined);
      return `<pre><code>${codeLines.map(escapeHtml).join('\n')}</code></pre>`;
    }

    // 3. Headings (##, ###, ####)
    const h = /^(#{2,4})\s+(.*)$/.exec(blockLines[0].trim());
    if (h && blockLines.length === 1) {
      const level = Math.min(6, h[1].length + off);
      return `<h${level}>${inlineFormatting(h[2])}</h${level}>`;
    }

    // 4. Unordered list (- or *)
    if (blockLines.every((l) => /^\s*[-*]\s+/.test(l))) {
      return `<ul>${blockLines.map((l) => `<li>${inlineFormatting(l.replace(/^\s*[-*]\s+/, ''))}</li>`).join('')}</ul>`;
    }

    // 5. Ordered list (1. 2. etc)
    if (blockLines.every((l) => /^\s*\d+\.\s+/.test(l))) {
      return `<ol>${blockLines.map((l) => `<li>${inlineFormatting(l.replace(/^\s*\d+\.\s+/, ''))}</li>`).join('')}</ol>`;
    }

    // 6. Blockquote (> quote)
    if (blockLines.every((l) => /^\s*>\s*/.test(l))) {
      return `<blockquote>${blockLines.map((l) => inlineFormatting(l.replace(/^\s*>\s*/, ''))).join('<br>')}</blockquote>`;
    }

    // 7. Horizontal rule
    if (/^([-*_]){3,}$/.test(trimmed)) {
      return '<hr>';
    }

    // 8. Paragraph
    return `<p>${blockLines.map(inlineFormatting).join('<br>')}</p>`;
  });

  return rendered.filter(Boolean).join('\n\n');
}

/** Plain text (for meta, JSON-LD and word counts). Strips HTML tags and markdown symbols. */
export function plain(src: string) {
  return src
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_>`|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function readingMinutes(src: string) {
  return Math.max(1, Math.round(plain(src).split(' ').length / 200));
}
