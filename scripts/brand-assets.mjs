// Builds logo variants, favicons and the web manifest from src/assets/virnobyte-logo.png.
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const SRC = 'src/assets/virnobyte-logo.png';
const out = (f) => `public/${f}`;
const logo = sharp(SRC).trim();

await logo.clone().resize({ width: 256 }).png({ compressionLevel: 9 }).toFile(out('virnobyte-logo.png'));

// White variant for dark surfaces (membership card, footer).
const { data, info } = await sharp(SRC).trim().resize({ width: 128 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) { data[i] = data[i + 1] = data[i + 2] = 255; }
await sharp(data, { raw: info }).png().toFile(out('virnobyte-logo-white.png'));

// Square icons on a white tile so the blue mark reads on any tab colour.
async function icon(size, file, pad = 0.14) {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(SRC).trim().resize({ width: inner, height: inner, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const buf = await sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: mark, gravity: 'center' }]).png().toBuffer();
  if (file) await writeFile(out(file), buf);
  return buf;
}
await icon(180, 'apple-touch-icon.png');
await icon(192, 'icon-192.png');
await icon(512, 'icon-512.png');
const ico32 = await icon(32, 'favicon-32.png', 0.06);

// favicon.ico containing a single 32×32 PNG.
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(ico32.length, 14); header.writeUInt32LE(22, 18);
await writeFile(out('favicon.ico'), Buffer.concat([header, ico32]));

await writeFile(out('site.webmanifest'), JSON.stringify({
  name: 'Virnobyte', short_name: 'Virnobyte', start_url: '/', display: 'standalone',
  background_color: '#f4f6f9', theme_color: '#0b1724',
  icons: [{ src: '/icon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }],
}, null, 2));
console.log('brand assets written');
