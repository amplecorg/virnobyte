// Server-side access to the PC builder catalogue (database is the source of truth for prices).
import { all, json } from '../db';
import type { Part } from './engine';

export function catalog(): Part[] {
  return all<any>('SELECT id, slug, category, brand, name, specs, price, model_url, in_stock FROM pc_parts WHERE active = 1 ORDER BY category, sort, price').map((r) => ({
    ...r,
    specs: json(r.specs, {}),
  }));
}

export function presets(parts: Part[]) {
  const bySlug = new Map(parts.map((p) => [p.slug, p]));
  return all<any>('SELECT slug, name, summary, parts FROM pc_presets WHERE active = 1 ORDER BY sort, id').map((p) => {
    const sel: Record<string, any> = { storage: [], extra: [] };
    for (const slug of json<string[]>(p.parts, [])) {
      const part = bySlug.get(slug);
      if (!part) continue;
      if (part.category === 'storage' || part.category === 'extra') sel[part.category].push(part.id);
      else sel[part.category] = part.id;
    }
    return { slug: p.slug, name: p.name, summary: p.summary, selection: sel };
  });
}
