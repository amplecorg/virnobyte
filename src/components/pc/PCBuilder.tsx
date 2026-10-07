import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import './builder.css';
import {
  CATEGORIES, checkBuild, decodeSelection, encodeSelection, estimatePower, missing, partErrors, price, resolve, status, summary,
  type Category, type Issue, type Part, type PriceSettings, type Selection,
} from '@/lib/pc/engine';

const Viewer3D = lazy(() => import('./Viewer3D'));

interface Preset { slug: string; name: string; summary: string; selection: Selection }
interface Props {
  parts: Part[];
  presets: Preset[];
  pricing: PriceSettings;
  note: string;
  initial?: Selection | null;
  whatsapp: string;
}

const inr = (n: number) => '₹' + new Intl.NumberFormat('en-IN').format(Math.round(n));
const STORE = 'vb-pc-build';

function specLine(p: Part): string {
  const s = p.specs;
  switch (p.category) {
    case 'cpu': return `${s.cores} cores / ${s.threads} threads · ${s.base_ghz}–${s.boost_ghz} GHz · ${s.tdp} W · ${s.socket}${s.igpu ? ' · integrated graphics' : ''}${s.cooler_included ? ' · cooler included' : ''}`;
    case 'motherboard': return `${s.socket} · ${s.chipset} · ${s.form_factor} · ${s.ram_type} ×${s.ram_slots} (max ${s.max_ram_gb} GB) · ${s.m2_slots}× M.2${s.wifi ? ' · Wi-Fi' : ''}`;
    case 'ram': return `${s.capacity_gb} GB (${s.modules}×${s.capacity_gb / s.modules} GB) · ${s.type}-${s.speed_mts}${s.rgb ? ' · RGB' : ''} · ${s.height_mm} mm tall`;
    case 'gpu': return `${s.vram_gb} GB VRAM · ${s.length_mm} mm long · ${s.power_w} W · needs ${s.rec_psu_w} W PSU`;
    case 'storage': return `${s.kind} · ${s.capacity_gb >= 1000 ? s.capacity_gb / 1000 + ' TB' : s.capacity_gb + ' GB'} · ${s.read_mbps}/${s.write_mbps} MB/s · ${s.form_factor}`;
    case 'psu': return `${s.watts} W · ${s.efficiency} · ${s.modular} · ${s.form_factor}`;
    case 'cooler': return s.kind === 'AIO' ? `AIO liquid · ${s.radiator_mm} mm radiator · rated ${s.tdp_w} W` : `Air tower · ${s.height_mm} mm tall · rated ${s.tdp_w} W`;
    case 'case': return `Up to ${s.max_board} · GPU ≤ ${s.gpu_max_mm} mm · cooler ≤ ${s.cooler_max_mm} mm · radiator ${[].concat(s.radiator_mm).join('/')} mm · ${s.psu} PSU`;
    default: return ({ fans: `${s.fans_count} fans`, wifi: 'Wireless networking', bluetooth: 'Bluetooth', sound: 'Audio', capture: 'Video capture', rgb: 'Lighting control', paste: 'Thermal compound', os: 'Operating system' } as Record<string, string>)[s.kind] ?? '';
  }
}

export default function PCBuilder({ parts, presets, pricing, note, initial, whatsapp }: Props) {
  const byId = useMemo(() => new Map(parts.map((p) => [p.id, p])), [parts]);
  const [sel, setSel] = useState<Selection>(initial ?? presets.find((p) => p.slug === 'gaming-pc')?.selection ?? {});
  const [active, setActive] = useState<Category>('cpu');
  const [showAll, setShowAll] = useState(false);
  const [panel, setPanel] = useState<null | 'issues' | 'price'>(null);
  const [modal, setModal] = useState<null | 'quote' | 'order'>(null);
  const [toast, setToast] = useState('');
  const [busy, setBusy] = useState(false);
  const [mounted3d, setMounted3d] = useState(false);

  // Restore an in-progress build (unless a shared build was opened).
  useEffect(() => {
    if (initial) return;
    try {
      const url = new URL(location.href).searchParams.get('b');
      const saved = url ? decodeSelection(url) : JSON.parse(localStorage.getItem(STORE) || 'null');
      if (saved) setSel(saved);
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(sel));
    } catch {}
  }, [sel]);
  useEffect(() => {
    const t = setTimeout(() => setMounted3d(true), 50);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const r = useMemo(() => resolve(sel, byId), [sel, byId]);
  const issues = useMemo(() => checkBuild(r), [r]);
  const miss = useMemo(() => missing(r), [r]);
  const st = status(issues, miss);
  const power = useMemo(() => estimatePower(r), [r]);
  const pr = useMemo(() => price(r, pricing), [r, pricing]);
  const sum = useMemo(() => summary(r), [r]);
  const errorsByCat = (c: Category) => issues.filter((i) => i.level === 'error' && i.parts.includes(c));

  const pick = (p: Part) => {
    setSel((s) => {
      if (p.category === 'storage' || p.category === 'extra') {
        const cur = s[p.category] ?? [];
        return { ...s, [p.category]: cur.includes(p.id) ? cur.filter((x) => x !== p.id) : [...cur, p.id] };
      }
      return { ...s, [p.category]: (s as any)[p.category] === p.id ? undefined : p.id };
    });
  };
  const clear = (c: Category) => setSel((s) => ({ ...s, [c]: c === 'storage' || c === 'extra' ? [] : undefined }));
  const idx = CATEGORIES.findIndex((c) => c.key === active);
  const go = (d: number) => setActive(CATEGORIES[Math.min(CATEGORIES.length - 1, Math.max(0, idx + d))].key);

  const options = parts.filter((p) => p.category === active);
  const evaluated = options.map((p) => ({ p, errs: partErrors(p, sel, byId) }));
  const compatible = evaluated.filter((e) => !e.errs.length);
  const hidden = evaluated.length - compatible.length;
  const shown = showAll ? evaluated : compatible;
  const recommendedPsu = active === 'psu' && power.recommended
    ? compatible.filter((e) => +e.p.specs.watts >= power.recommended).sort((a, b) => +a.p.specs.watts - +b.p.specs.watts)[0]?.p.id
    : undefined;
  const anchor = active === 'motherboard' ? r.cpu : active === 'ram' ? r.motherboard : active === 'cooler' || active === 'case' ? r.cpu ?? r.motherboard : undefined;

  async function submit(intent: 'save' | 'quote' | 'order', form?: FormData) {
    setBusy(true);
    try {
      const res = await fetch('/api/pc/build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent, selection: sel,
          name: form?.get('name'), phone: form?.get('phone'), email: form?.get('email'), notes: form?.get('notes'),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please call us.');
      const link = `${location.origin}${data.url}`;
      history.replaceState(null, '', data.url);
      if (intent === 'save') {
        try {
          await navigator.clipboard.writeText(link);
          setToast(`Build ${data.code} saved — link copied.`);
        } catch {
          setToast(`Build ${data.code} saved. Bookmark this page to return to it.`);
        }
      } else {
        setModal(null);
        setToast(intent === 'order'
          ? `Order request ${data.code} sent (${inr(data.total)}). We will call to confirm stock, price and payment.`
          : `Quote request ${data.code} sent. We will call you with a confirmed quote.`);
      }
    } catch (e: any) {
      setToast(e.message);
    } finally {
      setBusy(false);
    }
  }

  const statusLabel = {
    ok: '✓ Your configuration is compatible',
    warning: '⚠ Compatible, with recommendations',
    error: '✕ Compatibility issue detected',
    incomplete: `Choose ${miss.map((m) => CATEGORIES.find((c) => c.key === m)!.label.toLowerCase()).join(', ')}`,
  }[st];
  const blocked = st === 'error' || st === 'incomplete';

  return (
    <div className="pcb">
      <div className="pcb-presets" role="group" aria-label="Start from a preset">
        <span>Start from</span>
        {presets.map((p) => (
          <button key={p.slug} type="button" title={p.summary} onClick={() => { setSel(p.selection); setToast(`${p.name} loaded — adjust any part.`); }}>
            {p.name}
          </button>
        ))}
        <button type="button" className="ghost" onClick={() => setSel({})}>Start empty</button>
      </div>

      <div className="pcb-main">
        <section className="pcb-stage" aria-label="3D preview">
          {mounted3d ? (
            <Suspense fallback={<div className="pc-viewer pc-skeleton">Loading 3D viewer…</div>}>
              <Viewer3D r={r} />
            </Suspense>
          ) : (
            <div className="pc-viewer pc-skeleton">Loading 3D viewer…</div>
          )}
          <dl className="pcb-summary">
            <div><dt>Processor</dt><dd>{sum.cores}</dd></div>
            <div><dt>Graphics</dt><dd>{sum.graphics}</dd></div>
            <div><dt>Memory</dt><dd>{sum.memory}</dd></div>
            <div><dt>Storage</dt><dd>{sum.storage}</dd></div>
            <div><dt>Estimated power</dt><dd>{power.total ? `${power.total} W` : '—'}</dd></div>
            <div><dt>Recommended PSU</dt><dd>{power.recommended ? `${power.recommended} W` : '—'}</dd></div>
          </dl>
        </section>

        <aside className="pcb-parts" aria-label="Components">
          <nav className="pcb-steps" aria-label="Component steps">
            {CATEGORIES.map((c, i) => {
              const v = (sel as any)[c.key];
              const done = Array.isArray(v) ? v.length > 0 : v != null;
              return (
                <button key={c.key} type="button" aria-current={active === c.key ? 'step' : undefined} className={errorsByCat(c.key).length ? 'bad' : done ? 'done' : ''} onClick={() => setActive(c.key)}>
                  <span className="n">{done && !errorsByCat(c.key).length ? '✓' : i + 1}</span>
                  {c.label}
                </button>
              );
            })}
          </nav>

          <div className="pcb-cat">
            <header>
              <div>
                <h2>{CATEGORIES[idx].label}</h2>
                <p>{CATEGORIES[idx].hint}</p>
              </div>
              {((sel as any)[active] != null && (!Array.isArray((sel as any)[active]) || (sel as any)[active].length > 0)) && (
                <button type="button" className="link" onClick={() => clear(active)}>Remove</button>
              )}
            </header>

            {anchor && compatible.length > 0 && (
              <p className="pcb-rec">✓ {compatible.length} option{compatible.length > 1 ? 's' : ''} compatible with your {anchor.name}</p>
            )}
            {errorsByCat(active).map((i, k) => <IssueCard key={k} issue={i} />)}

            <ul className="pcb-options">
              {shown.map(({ p, errs }) => {
                const v = (sel as any)[active];
                const on = Array.isArray(v) ? v.includes(p.id) : v === p.id;
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      className={`opt ${on ? 'on' : ''} ${errs.length ? 'incompat' : ''}`}
                      aria-pressed={on}
                      onClick={() => pick(p)}
                    >
                      <span className="o-main">
                        <span className="o-name">
                          {p.name}
                          {p.id === recommendedPsu && <em className="tag">Recommended</em>}
                          {!p.in_stock && <em className="tag muted">On order</em>}
                        </span>
                        <span className="o-spec">{specLine(p)}</span>
                        {errs.length > 0 && <span className="o-err">✕ {errs[0].title}</span>}
                      </span>
                      <span className="o-price">{inr(p.price)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {hidden > 0 && (
              <label className="pcb-showall">
                <input type="checkbox" checked={showAll} onChange={(e) => setShowAll(e.target.checked)} /> Show {hidden} incompatible option{hidden > 1 ? 's' : ''}
              </label>
            )}
            <div className="pcb-nav">
              <button type="button" className="btn-s ghost" disabled={idx === 0} onClick={() => go(-1)}>Back</button>
              <button type="button" className="btn-s" disabled={idx === CATEGORIES.length - 1} onClick={() => go(1)}>
                {idx < CATEGORIES.length - 1 ? `Next: ${CATEGORIES[idx + 1].label}` : 'Done'}
              </button>
            </div>
          </div>
        </aside>
      </div>

      <div className="pcb-bar">
        <button type="button" className={`status ${st}`} onClick={() => setPanel(panel === 'issues' ? null : 'issues')} aria-expanded={panel === 'issues'}>
          {statusLabel}
          {issues.filter((i) => i.level !== 'info').length > 0 && <small>{issues.filter((i) => i.level !== 'info').length} note(s) — view</small>}
        </button>
        <button type="button" className="total" onClick={() => setPanel(panel === 'price' ? null : 'price')} aria-expanded={panel === 'price'}>
          <small>Total{pricing.pricesIncludeGst ? ' incl. GST' : ''}</small>
          <strong>{inr(pr.total)}</strong>
        </button>
        <div className="actions">
          <button type="button" className="btn-s ghost" disabled={busy} onClick={() => submit('save')}>Save build</button>
          <button type="button" className="btn-s ghost" disabled={busy || blocked} title={blocked ? 'Fix the issues first' : undefined} onClick={() => setModal('quote')}>Get quote</button>
          <button type="button" className="btn-s" disabled={busy || blocked} title={blocked ? 'Fix the issues first' : undefined} onClick={() => setModal('order')}>Order<span className="wide"> this build</span></button>
        </div>
      </div>

      {panel === 'issues' && (
        <div className="pcb-drawer" role="region" aria-label="Compatibility details">
          <header><h2>Compatibility check</h2><button type="button" className="link" onClick={() => setPanel(null)}>Close</button></header>
          {issues.length === 0 && miss.length === 0 && <p>✓ All parts are compatible. Estimated draw {power.total} W, recommended PSU {power.recommended} W.</p>}
          {miss.length > 0 && <p className="muted">Still to choose: {miss.map((m) => CATEGORIES.find((c) => c.key === m)!.label).join(', ')}.</p>}
          {issues.map((i, k) => <IssueCard key={k} issue={i} onGo={() => { setActive(i.parts[0]); setPanel(null); }} />)}
          {power.rows.length > 0 && (
            <table className="pcb-table">
              <caption>Estimated power draw</caption>
              <tbody>
                {power.rows.map((x) => <tr key={x.label}><td>{x.label}</td><td>{x.watts} W</td></tr>)}
                <tr className="b"><td>Total</td><td>{power.total} W</td></tr>
                <tr><td>Recommended PSU (×1.3 headroom)</td><td>{power.recommended} W</td></tr>
              </tbody>
            </table>
          )}
        </div>
      )}

      {panel === 'price' && (
        <div className="pcb-drawer" role="region" aria-label="Price breakdown">
          <header><h2>Price breakdown</h2><button type="button" className="link" onClick={() => setPanel(null)}>Close</button></header>
          <table className="pcb-table">
            <tbody>
              {pr.lines.map((l, k) => (
                <tr key={k}><td><span className="muted">{CATEGORIES.find((c) => c.key === l.category)!.label}</span><br />{l.name}</td><td>{inr(l.price)}</td></tr>
              ))}
              {pr.assembly > 0 && <tr><td>Assembly & testing</td><td>{inr(pr.assembly)}</td></tr>}
              {pr.delivery > 0 && <tr><td>Delivery</td><td>{inr(pr.delivery)}</td></tr>}
              <tr className="b"><td>Subtotal (before GST)</td><td>{inr(pr.subtotal)}</td></tr>
              <tr><td>GST {pricing.gstPercent}%</td><td>{inr(pr.gst)}</td></tr>
              <tr className="b big"><td>Total</td><td>{inr(pr.total)}</td></tr>
            </tbody>
          </table>
          <p className="muted small">{note}</p>
        </div>
      )}

      {modal && (
        <div className="pcb-modal" role="dialog" aria-modal="true" aria-labelledby="pcb-modal-h" onKeyDown={(e) => e.key === 'Escape' && setModal(null)}>
          <form
            className="pcb-modal-card"
            onSubmit={(e) => {
              e.preventDefault();
              submit(modal, new FormData(e.currentTarget));
            }}
          >
            <h2 id="pcb-modal-h">{modal === 'order' ? 'Order this build' : 'Get a quote'}</h2>
            <p className="muted">
              {modal === 'order'
                ? `Total ${inr(pr.total)}. No online payment — we call to confirm stock and the final price, then collect payment when your PC is ready.`
                : 'We confirm current prices and availability and send you a written quote.'}
            </p>
            <label>Your name<input name="name" required autoComplete="name" autoFocus /></label>
            <label>Mobile number<input name="phone" required type="tel" inputMode="tel" autoComplete="tel" pattern={String.raw`\+?[0-9 \(\)\-]{10,16}`} title="10-digit mobile number" /></label>
            <label>Email (optional)<input name="email" type="email" autoComplete="email" /></label>
            <label>Notes (optional)<textarea name="notes" rows={3} placeholder="Budget, games or software you use, delivery area…" /></label>
            <div className="row">
              <button type="button" className="btn-s ghost" onClick={() => setModal(null)}>Cancel</button>
              <button type="submit" className="btn-s" disabled={busy}>{busy ? 'Sending…' : modal === 'order' ? 'Send order request' : 'Request quote'}</button>
            </div>
            <p className="muted small">Prefer to talk? <a href={whatsapp} target="_blank" rel="noopener">WhatsApp us</a>.</p>
          </form>
        </div>
      )}

      {toast && <div className="pcb-toast" role="status">{toast}</div>}
    </div>
  );
}

function IssueCard({ issue, onGo }: { issue: Issue; onGo?: () => void }) {
  return (
    <div className={`pcb-issue ${issue.level}`}>
      <strong>{issue.level === 'error' ? '✕' : issue.level === 'warning' ? '⚠' : 'ℹ'} {issue.title}</strong>
      <p>{issue.detail}</p>
      {issue.fix && <p className="fix">{issue.fix}</p>}
      {onGo && <button type="button" className="link" onClick={onGo}>Change {CATEGORIES.find((c) => c.key === issue.parts[0])?.label.toLowerCase()}</button>}
    </div>
  );
}

