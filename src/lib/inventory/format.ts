/** "24 Nov, 3:05 pm" in India time, from SQLite's UTC "YYYY-MM-DD HH:MM:SS". */
export function when(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso.includes('T') ? iso : iso.replace(' ', 'T') + 'Z');
  if (isNaN(+d)) return iso;
  return d.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
}

/** "5 min ago", "3 h ago", "2 days ago". */
export function ago(iso: string | null | undefined): string {
  if (!iso) return 'never';
  const d = new Date(iso.includes('T') ? iso : iso.replace(' ', 'T') + 'Z');
  const m = Math.round((Date.now() - +d) / 60000);
  if (!Number.isFinite(m)) return iso;
  if (m < 1) return 'just now';
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 48) return `${h} h ago`;
  return `${Math.round(h / 24)} days ago`;
}
