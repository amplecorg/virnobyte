// Downloads the site's photography (Unsplash, free licence) at 3840px wide.
// Astro's <Picture> then derives AVIF/WebP responsive variants at build time.
import { writeFile, mkdir, access } from 'node:fs/promises';

const PHOTOS = {
  'virnobyte-technician-computer-repair': '1604754742629-3e5728249d73',
  'virnobyte-computer-repair-cpu': '1591799264318-7e6ef8ddb7ea',
  'virnobyte-laptop-repair': '1588872657578-7efd1f1555ed',
  'virnobyte-cctv-installation-pune': '1557597774-9d273605dfa9',
  'virnobyte-networking-services': '1544197150-b99a580bb7a8',
  'virnobyte-hardware-solutions': '1555617981-dac3880eac6e',
  'virnobyte-software-solutions': '1610563166150-b34df4f3bcd6',
  'virnobyte-data-recovery-hard-disk': '1597852074816-d933c7d2b988',
  'virnobyte-printer-repair': '1612815154858-60aa4c59eaa6',
  'virnobyte-virus-removal-security': '1550751827-4bd374c3f58b',
  'virnobyte-it-consulting': '1600880292203-757bb62b4baf',
  'virnobyte-amc-services': '1580894894513-541e068a3e2b',
  'virnobyte-inverter-installation': '1563770660941-20978e870e26',
  'virnobyte-software-installation': '1629654297299-c8506221ca97',
  'virnobyte-custom-it-solutions-server': '1558494949-ef010cbdcc31',
  'virnobyte-cloud-backup': '1573164713988-8665fc963095',
  'virnobyte-office-it-team': '1551434678-e076c223a692',
  'virnobyte-office-it-setup': '1606857521015-7f9fcf423740',
  'virnobyte-careers-team': '1522071820081-009f0129c71c',
  'virnobyte-circuit-board': '1518770660439-4636190af475',
  'virnobyte-wifi-router-setup': '1606904825846-647eb07f5be2',
  'virnobyte-hard-disk-drive': '1601737487795-dab272f52420',
  'virnobyte-business-meeting': '1542744173-8e7e53415bb0',
  'virnobyte-gaming-pc-build': '1587202372634-32705e3bf49c',
  'virnobyte-laptop-workspace': '1484788984921-03950022c9ef',
};

const dir = new URL('../src/assets/photos/', import.meta.url);
await mkdir(dir, { recursive: true });
for (const [name, id] of Object.entries(PHOTOS)) {
  const file = new URL(`${name}.jpg`, dir);
  try { await access(file); continue; } catch {}
  const res = await fetch(`https://images.unsplash.com/photo-${id}?w=3840&q=82&fm=jpg&fit=max`);
  if (!res.ok) { console.error('failed', name, res.status); continue; }
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
  console.log('saved', name);
}
