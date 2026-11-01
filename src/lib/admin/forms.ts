import sharp from 'sharp';
import { randomBytes } from 'node:crypto';
import { join } from 'node:path';
import { UPLOAD_DIR, all, get, run, json } from '../db';
import { slugify } from '../format';
import type { FieldDef, ResourceDef } from './resources';

/** Converts an uploaded image to WebP (max 3840px wide) and returns its public path. */
export async function saveUpload(file: File, hint = 'virnobyte'): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Upload an image file (JPG, PNG or WebP).');
  if (file.size > 25 * 1024 * 1024) throw new Error('Images must be smaller than 25 MB.');
  const buf = Buffer.from(await file.arrayBuffer());
  const img = sharp(buf, { failOn: 'error' }).rotate().resize({ width: 3840, withoutEnlargement: true });
  const out = await img.webp({ quality: 82 }).toBuffer({ resolveWithObject: true });
  const base = slugify(hint || file.name.replace(/\.\w+$/, '')).slice(0, 60) || 'image';
  const name = `${base}-${randomBytes(3).toString('hex')}-${out.info.width}x${out.info.height}.webp`;
  await sharp(out.data).toFile(join(UPLOAD_DIR, name));
  return `/uploads/${name}`;
}

export function faqsToText(v: string) {
  return json<{ q: string; a: string }[]>(v, [])
    .map((f) => `Q: ${f.q}\nA: ${f.a}`)
    .join('\n\n');
}

export function textToFaqs(t: string) {
  return t
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n(?=Q:)/)
    .map((block) => {
      const m = /^Q:\s*([\s\S]*?)\nA:\s*([\s\S]*)$/.exec(block.trim());
      return m ? { q: m[1].trim(), a: m[2].trim() } : null;
    })
    .filter((x): x is { q: string; a: string } => !!x && !!x.q && !!x.a);
}

/** Value to show in the form control for a stored DB value. */
export function toFormValue(f: FieldDef, v: any): string {
  if (v == null) return '';
  if (f.type === 'list') return json<string[]>(v, []).join('\n');
  if (f.type === 'faqs') return faqsToText(v);
  if (f.type === 'kv') return kvToText(v);
  return String(v);
}

/** Parses posted form data into a DB row for the resource. Returns errors keyed by field. */
export async function parseForm(def: ResourceDef, form: FormData, id: number | null) {
  const row: Record<string, any> = {};
  const errors: Record<string, string> = {};

  for (const f of def.fields) {
    if (f.type === 'readonly') continue;
    const raw = form.get(f.name);
    let val: any = typeof raw === 'string' ? raw.trim() : '';

    switch (f.type) {
      case 'bool':
        val = raw === 'on' || raw === '1' ? 1 : 0;
        break;
      case 'number':
        val = val === '' ? 0 : Math.trunc(Number(val));
        if (!Number.isFinite(val)) errors[f.name] = 'Enter a whole number.';
        break;
      case 'money':
        val = val === '' ? null : Math.round(Number(val.replace(/[₹,\s]/g, '')));
        if (val != null && !Number.isFinite(val)) errors[f.name] = 'Enter an amount in rupees, e.g. 1499.';
        if (val == null && ['price', 'salary_min', 'salary_max', 'mrp'].includes(f.name) && def.table !== 'products') val = 0;
        break;
      case 'slug':
        val = slugify(val || String(form.get('name') ?? form.get('title') ?? ''));
        if (!val) errors[f.name] = 'Enter a web address name using letters, numbers and hyphens (e.g. laptop-repair).';
        else if (get(`SELECT 1 FROM ${def.table} WHERE slug = ? AND id != ?`, val, id ?? -1)) errors[f.name] = 'Another item is already using this web address URL. Please choose a different one.';
        break;
      case 'list':
        val = JSON.stringify(val.split(/\r?\n/).map((s: string) => s.trim()).filter(Boolean));
        break;
      case 'faqs':
        val = JSON.stringify(textToFaqs(val));
        break;
      case 'kv':
        val = JSON.stringify(textToKv(val));
        break;
      case 'color':
        if (!/^#[0-9a-f]{6}$/i.test(val)) errors[f.name] = 'Pick a colour.';
        break;
      case 'date':
        if (val && !/^\d{4}-\d{2}-\d{2}$/.test(val)) errors[f.name] = 'Use the date picker.';
        break;
      case 'image': {
        const up = form.get(`${f.name}__upload`);
        if (up instanceof File && up.size > 0) {
          try {
            val = await saveUpload(up, String(form.get('slug') || form.get('title') || form.get('name') || form.get('caption') || ''));
          } catch (e: any) {
            errors[f.name] = e.message;
          }
        }
        break;
      }
    }
    if (f.required && (val === '' || val == null || val === '[]')) errors[f.name] = errors[f.name] ?? `${f.label} is required.`;
    if (f.max && typeof val === 'string' && val.length > f.max + 40) errors[f.name] = `Keep this under about ${f.max} characters.`;
    row[f.name] = val;
  }

  const blocked = def.validate?.(row);
  if (blocked) errors._form = blocked;
  return { row, errors };
}

export function saveRow(def: ResourceDef, row: Record<string, any>, id: number | null): number {
  const cols = Object.keys(row);
  if (def.table === 'pages' || def.table === 'posts') {
    if (def.table === 'pages' || id) {
      cols.push('updated_at');
      row.updated_at = new Date().toISOString().slice(0, 10);
    }
  }
  const vals = cols.map((c) => row[c]);
  if (id) {
    run(`UPDATE ${def.table} SET ${cols.map((c) => `${c} = ?`).join(', ')} WHERE id = ?`, ...vals, id);
    return id;
  }
  const res = run(`INSERT INTO ${def.table} (${cols.join(', ')}) VALUES (${cols.map(() => '?').join(', ')})`, ...vals);
  return Number(res.lastInsertRowid);
}

export function listRows(def: ResourceDef, q: string, filter?: { col: string; val: string }) {
  const where: string[] = [];
  const params: any[] = [];
  if (q && def.search?.length) {
    where.push(`(${def.search.map((c) => `${c} LIKE ?`).join(' OR ')})`);
    def.search.forEach(() => params.push(`%${q}%`));
  }
  if (filter) {
    where.push(`${filter.col} = ?`);
    params.push(filter.val);
  }
  return all(`SELECT * FROM ${def.table} ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY ${def.orderBy} LIMIT 500`, ...params);
}

/** Specs editor: one "key: value" per line. Numbers, true/false and [a, b] lists are typed. */
export function kvToText(v: string) {
  const o = json<Record<string, any>>(v, {});
  return Object.entries(o)
    .map(([k, x]) => `${k}: ${Array.isArray(x) ? `[${x.join(', ')}]` : x}`)
    .join('\n');
}

function typed(raw: string): any {
  const t = raw.trim();
  if (/^\[.*\]$/.test(t)) return t.slice(1, -1).split(',').map((x) => typed(x)).filter((x) => x !== '');
  if (t === 'true') return true;
  if (t === 'false') return false;
  if (t !== '' && !isNaN(Number(t))) return Number(t);
  return t;
}

export function textToKv(t: string) {
  const o: Record<string, any> = {};
  for (const line of t.split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i < 1) continue;
    o[line.slice(0, i).trim()] = typed(line.slice(i + 1));
  }
  return o;
}
