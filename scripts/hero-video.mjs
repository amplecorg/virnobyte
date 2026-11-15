// Encode a source clip into the three hero-video files the home page expects.
//   npm run hero-video -- "path/to/clip.mp4" [seconds=20] [start=0]
// Output: public/video/hero-2160.mp4 (only if the source is 4K), hero-1080.mp4, hero-720.mp4
// Silent H.264 with faststart so it begins playing before the download finishes.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const [input, seconds = '20', start = '0'] = process.argv.slice(2);
if (!input || !existsSync(input)) {
  console.error('Usage: npm run hero-video -- "path/to/clip.mp4" [seconds=20] [start=0]');
  process.exit(1);
}

const probe = spawnSync(
  'ffprobe',
  ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,r_frame_rate', '-of', 'csv=p=0', input],
  { encoding: 'utf8' },
);
if (probe.status !== 0) {
  console.error('ffprobe failed. Is ffmpeg installed and is this a video file?\n' + probe.stderr);
  process.exit(1);
}
const [probeW, probeH, probeRate = '30/1'] = probe.stdout.trim().split(',');
const srcW = Number(probeW);
const srcH = Number(probeH);
const [num, den = '1'] = probeRate.split('/');
const srcFps = Number(num) / Number(den) || 30;
// Keep the source frame rate (forcing 25 → 30 duplicates frames and judders); only cap high-fps sources.
const fpsFilter = srcFps > 30 ? ',fps=30' : '';
console.log(`Source: ${srcW}x${srcH} @ ${Math.round(srcFps * 100) / 100} fps`);

const outDir = join(process.cwd(), 'public', 'video');
mkdirSync(outDir, { recursive: true });

// [height, crf, maxrate] — never upscale: a soft "4K" file is worse than an honest 1080p one.
const RUNGS = [
  [2160, 24, '14M'],
  [1080, 25, '5M'],
  [720, 27, '2500k'],
];

const made = [];
for (const [h, crf, maxrate] of RUNGS) {
  if (h > srcH && h !== 720) {
    console.log(`Skipping ${h}p: source is only ${srcH}p.`);
    continue;
  }
  const out = join(outDir, `hero-${h}.mp4`);
  const res = spawnSync(
    'ffmpeg',
    [
      '-y', '-ss', start, '-t', seconds, '-i', input,
      '-an',
      '-vf', `scale=-2:${Math.min(h, srcH)}:flags=lanczos${fpsFilter}`,
      '-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
      '-crf', String(crf), '-maxrate', maxrate, '-bufsize', maxrate,
      '-movflags', '+faststart',
      out,
    ],
    { stdio: ['ignore', 'ignore', 'inherit'] },
  );
  if (res.status !== 0) {
    console.error(`ffmpeg failed for ${h}p.`);
    process.exit(1);
  }
  made.push([h, out]);
  console.log(`  hero-${h}.mp4  ${(statSync(out).size / 1e6).toFixed(1)} MB`);
}

console.log('\nNow set these in Admin → Settings → Home page hero:');
for (const [h] of made) {
  const field = h === 2160 ? '4K path     ' : h === 1080 ? '1080p path  ' : 'mobile path ';
  console.log(`  ${field} /video/hero-${h}.mp4`);
}
