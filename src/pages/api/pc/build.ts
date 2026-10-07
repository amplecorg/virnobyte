import type { APIRoute } from 'astro';
import { randomBytes } from 'node:crypto';
import { get, run } from '@/lib/db';
import { catalog } from '@/lib/pc/catalog';
import { checkBuild, missing, price, resolve, status, summary, type Selection } from '@/lib/pc/engine';
import { getSettings } from '@/lib/settings';
import { saveEnquiry } from '@/lib/data';
import { rateLimit } from '@/lib/auth';
import { inr } from '@/lib/format';

const PHONE = /^[+]?[0-9 ()-]{10,16}$/;
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

function clean(sel: any): Selection {
  const n = (v: any) => (Number.isInteger(Number(v)) && Number(v) > 0 ? Number(v) : undefined);
  const arr = (v: any) => (Array.isArray(v) ? v.map(n).filter((x): x is number => !!x).slice(0, 6) : []);
  return {
    cpu: n(sel?.cpu), motherboard: n(sel?.motherboard), ram: n(sel?.ram), gpu: n(sel?.gpu),
    cooler: n(sel?.cooler), psu: n(sel?.psu), case: n(sel?.case), storage: arr(sel?.storage), extra: arr(sel?.extra),
  };
}

/** Load a saved build by its share code. */
export const GET: APIRoute = ({ url }) => {
  const code = url.searchParams.get('code') ?? '';
  const row = get<{ parts: string }>('SELECT parts FROM pc_builds WHERE code = ?', code.toUpperCase());
  if (!row) return json({ error: 'Build not found.' }, 404);
  return json({ selection: JSON.parse(row.parts) });
};

export const POST: APIRoute = async ({ request, clientAddress, locals }) => {
  if (!rateLimit(`pc:${clientAddress}`, 20, 10 * 60_000)) return json({ error: 'Too many requests. Please call or WhatsApp us.' }, 429);
  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }
  const intent: 'save' | 'quote' | 'order' = ['quote', 'order'].includes(body?.intent) ? body.intent : 'save';
  const selection = clean(body?.selection);

  // Re-derive everything from the database: client prices are never trusted.
  const parts = catalog();
  const r = resolve(selection, new Map(parts.map((p) => [p.id, p])));
  const issues = checkBuild(r);
  const miss = missing(r);
  const st = status(issues, miss);
  const s = getSettings();
  const pr = price(r, s.pcbuilder);

  if (intent !== 'save') {
    if (st === 'error') return json({ error: 'This build has a compatibility issue. Fix it before requesting a quote.', issues }, 422);
    if (st === 'incomplete') return json({ error: 'Choose all required parts before requesting a quote.', missing: miss }, 422);
    const name = String(body?.name ?? '').trim().slice(0, 120);
    const phone = String(body?.phone ?? '').trim().slice(0, 30);
    if (!name || !PHONE.test(phone)) return json({ error: 'Add your name and a valid mobile number.', field: !name ? 'name' : 'phone' }, 422);
  }

  let code = '';
  do code = randomBytes(5).toString('base64url').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
  while (code.length < 6 || get('SELECT 1 FROM pc_builds WHERE code = ?', code));

  const sum = summary(r);
  const lines = pr.lines.map((l) => `${l.name} — ${inr(l.price)}`).join('\n');
  const statusCol = intent === 'save' ? 'saved' : intent === 'order' ? 'ordered' : 'quote';
  run(
    'INSERT INTO pc_builds (code, user_id, name, phone, email, notes, parts, summary, subtotal, total, status) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
    code, locals.user?.id ?? null,
    String(body?.name ?? '').slice(0, 120), String(body?.phone ?? '').slice(0, 30), String(body?.email ?? '').slice(0, 160),
    String(body?.notes ?? '').slice(0, 2000), JSON.stringify(selection), JSON.stringify(sum), pr.subtotal, pr.total, statusCol,
  );

  if (intent !== 'save') {
    saveEnquiry({
      kind: 'pc-build',
      name: String(body.name).trim(),
      phone: String(body.phone).trim(),
      email: String(body?.email ?? '').trim(),
      topic: `Custom PC ${intent === 'order' ? 'order' : 'quote'} · build ${code} · ${inr(pr.total)}`,
      message: `${lines}\n\nTotal (server-priced): ${inr(pr.total)}\nWarnings: ${issues.filter((i) => i.level === 'warning').map((i) => i.title).join('; ') || 'none'}\n\n${String(body?.notes ?? '')}`,
      preferred: intent === 'order' ? 'Order — confirm and collect payment' : 'Quote',
    });
  }

  return json({ code, status: st, total: pr.total, url: `/custom-pc-builder?build=${code}` });
};
