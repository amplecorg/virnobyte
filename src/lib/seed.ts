import type { DatabaseSync } from 'node:sqlite';
import { hashPassword } from './password';
import { SERVICES } from './content/services';
import { POSTS } from './content/posts';
import { PAGES } from './content/pages';
import { PC_PARTS, PC_PRESETS } from './content/pcparts';

const PLAN_BENEFITS = [
  '1 year of free service labour',
  'Save up to 50% on repairs',
  'Save up to 30% on consumables',
  'Save up to 20% on software',
  '1 year antivirus protection',
  'Genuine Windows 11 licence',
];

const PLANS = [
  { slug: 'basic', name: 'Basic', tagline: 'For a home computer or laptop', price: 999, mrp: 1299, coins: 500, visits: 2, from: '#0f2a4a', to: '#2a5d8f', pattern: 'circuit', badge: '', featured: 0 },
  { slug: 'pro', name: 'Pro', tagline: 'For families and home offices', price: 1799, mrp: 1999, coins: 1000, visits: 4, from: '#062c5c', to: '#0a66c2', pattern: 'circuit', badge: 'Most chosen', featured: 1 },
  { slug: 'pro-plus', name: 'Pro+', tagline: 'For shops and small offices', price: 2499, mrp: 2999, coins: 2000, visits: 8, from: '#111418', to: '#3a3f47', pattern: 'grid', badge: '', featured: 0 },
];

const FAQS = [
  { q: 'Where is Virnobyte located?', a: 'Our office is at Office No. 1, Sadichha Complex, near Bright Computer Education, Savtamali, Mahadev Temple Road, Jadhav Wadi, Chikhali, Pimpri-Chinchwad, Maharashtra 411062.', topic: 'General', home: 1 },
  { q: 'Which areas do you serve?', a: 'We serve Chikhali, Pimpri-Chinchwad and Pune. Walk-in repairs are handled at our Chikhali workshop, and doorstep visits are available for homes and offices in these areas.', topic: 'General', home: 1 },
  { q: 'Do you provide doorstep computer service?', a: 'Yes. Many repairs, installations and network jobs are done on-site. If a fault needs workshop equipment, we take the device with us and tell you when it will be ready.', topic: 'Repairs', home: 1 },
  { q: 'How much does computer repair cost in Pune?', a: 'It depends on the fault and any parts needed. We diagnose first and give you an itemised quote; you decide whether to go ahead.', topic: 'Repairs', home: 1 },
  { q: 'Do you install CCTV for businesses?', a: 'Yes — for shops, offices, clinics, warehouses and small factories, as well as homes. Business installations start with a site survey.', topic: 'CCTV & networking', home: 0 },
  { q: 'Do you provide annual IT maintenance contracts?', a: 'Yes. Our IT AMC covers computers, printers, networks and CCTV with scheduled maintenance visits and priority support.', topic: 'Business IT', home: 1 },
  { q: 'Do you provide network installation services?', a: 'Yes. We install office LANs, Wi-Fi access points, structured cabling and network racks, and troubleshoot existing networks.', topic: 'CCTV & networking', home: 0 },
  { q: 'What is the membership card and how do coins work?', a: 'A membership card gives you a year of free service labour, discounts and a set number of doorstep visits. Coins are credited to your card when it is activated and can be used against labour, consumables and products under the coin rules on the membership page.', topic: 'Membership', home: 0 },
  { q: 'How do I check my coin balance?', a: 'Sign in to your account to see your card, coin balance, visits remaining and every coin transaction.', topic: 'Membership', home: 0 },
  { q: 'Is data recovery guaranteed?', a: 'No honest service can guarantee it. Recovery depends on the condition of the storage device. We assess the drive first and explain what is realistically recoverable.', topic: 'Repairs', home: 0 },
];

// Testimonials from the previous site could not be verified, so they are imported unpublished for review.
const TESTIMONIALS = [
  { name: 'Rajesh Sharma', role: 'CTO, TechBridge Solutions', quote: 'Set up our entire office network, CCTV, and workstations in one day. The pricing is fair and the quality is enterprise-grade.' },
  { name: 'Priya Mehta', role: 'Operations Manager, Nexgen Retail', quote: 'We had a critical server crash on a Monday morning. The team arrived quickly, diagnosed the issue, and had us back online before noon.' },
  { name: 'Deepa Singh', role: 'MD, Singh Enterprises', quote: 'Regular health checks caught a failing HDD before it caused data loss. They genuinely care about our business continuity.' },
];

const PRODUCTS = [
  { slug: 'canon-printer', name: 'Canon Printer', category: 'Printers', summary: 'Canon printer for home and office use, installed and set up for you.', price: 20000, mrp: 25000, condition: 'New', image: 'virnobyte-printer-repair' },
  { slug: 'refurbished-laptops', name: 'Refurbished Laptops', category: 'Laptops & desktops', summary: 'Tested business laptops with clear specifications, condition grading and warranty.', condition: 'Refurbished', image: 'virnobyte-laptop-repair' },
  { slug: 'custom-desktop-pcs', name: 'Custom Desktop PCs', category: 'Laptops & desktops', summary: 'Office, design and gaming desktops built around the software you use.', condition: 'New', image: 'virnobyte-gaming-pc-build' },
  { slug: 'ssd-and-ram-upgrades', name: 'SSD & RAM Upgrades', category: 'Components', summary: 'SSDs and memory matched to your computer, installed with your data moved across.', condition: 'New', image: 'virnobyte-hardware-solutions' },
  { slug: 'cctv-camera-kits', name: 'CCTV Camera Kits', category: 'CCTV', summary: 'HD and IP camera kits with DVR/NVR and storage sized for your premises.', condition: 'New', image: 'virnobyte-cctv-installation-pune' },
  { slug: 'routers-and-switches', name: 'Routers, Switches & Access Points', category: 'Networking', summary: 'Networking equipment for homes and offices, configured and installed.', condition: 'New', image: 'virnobyte-wifi-router-setup' },
  { slug: 'ups-and-inverters', name: 'UPS & Inverters', category: 'Power backup', summary: 'UPS units for computers and inverters with batteries for homes and shops.', condition: 'New', image: 'virnobyte-circuit-board' },
  { slug: 'hard-disks-and-storage', name: 'Hard Disks & External Storage', category: 'Components', summary: 'Internal and external drives for storage, backup and CCTV recording.', condition: 'New', image: 'virnobyte-hard-disk-drive' },
];

const JOB_DRAFT = {
  slug: 'field-service-technician',
  title: 'Field Service Technician',
  promise: 'Fix real problems for homes and offices across Pimpri-Chinchwad — and learn networking and CCTV on the job.',
  experience: '1–3 years of hardware repair experience',
  about_role:
    'You will diagnose and repair computers, laptops and printers at our Chikhali workshop and on doorstep visits, and assist with CCTV and network installations.',
  duties: [
    'Diagnose desktop and laptop faults and prepare itemised quotes',
    'Replace components and reinstall operating systems',
    'Visit homes and offices for on-site repairs',
    'Assist senior technicians on CCTV and network installations',
    'Keep a clear service record for every job',
  ],
  growth: ['Field Service Technician', 'Senior Technician', 'Installation Lead', 'Service Manager'],
  fits: [
    'You can identify common hardware faults without a manual',
    'You explain technical problems to customers in plain words',
    'You have a two-wheeler and a valid licence',
    'You are comfortable working in Chikhali and around Pimpri-Chinchwad',
  ],
};

export function seedDatabase(d: DatabaseSync) {
  ensureAdmin(d);
  seedPcBuilder(d);

  const { n } = d.prepare('SELECT COUNT(*) AS n FROM services').get() as { n: number };
  if (n > 0) return;

  d.exec('BEGIN');
  try {
    const svc = d.prepare(`INSERT INTO services
      (slug, name, short, title, description, h1, intro, problems, includes, benefits, faqs, note, image, group_name, footer, sort)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
    SERVICES.forEach((s, i) =>
      svc.run(s.slug, s.name, s.short, s.title, s.description, s.h1, s.intro, JSON.stringify(s.problems),
        JSON.stringify(s.includes), JSON.stringify(s.benefits), JSON.stringify(s.faqs), s.note ?? '', s.image,
        s.group, s.footer ? 1 : 0, i),
    );

    const plan = d.prepare(`INSERT INTO plans
      (slug, name, tagline, price, mrp, coins, doorstep_visits, benefits, card_from, card_to, card_pattern, badge, featured, sort)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
    PLANS.forEach((p, i) =>
      plan.run(p.slug, p.name, p.tagline, p.price, p.mrp, p.coins, p.visits, JSON.stringify(PLAN_BENEFITS), p.from, p.to, p.pattern, p.badge, p.featured, i),
    );

    const post = d.prepare('INSERT INTO posts (slug, title, description, body, image, related, published_at, updated_at) VALUES (?,?,?,?,?,?,?,?)');
    for (const p of POSTS) post.run(p.slug, p.title, p.description, p.body, p.image, JSON.stringify(p.related), p.published_at, p.published_at);

    const faq = d.prepare('INSERT INTO faqs (question, answer, topic, home, sort) VALUES (?,?,?,?,?)');
    FAQS.forEach((f, i) => faq.run(f.q, f.a, f.topic, f.home, i));

    const t = d.prepare('INSERT INTO testimonials (name, role, quote, published, sort) VALUES (?,?,?,0,?)');
    TESTIMONIALS.forEach((x, i) => t.run(x.name, x.role, x.quote, i));

    const prod = d.prepare('INSERT INTO products (slug, name, category, summary, price, mrp, condition, image, sort) VALUES (?,?,?,?,?,?,?,?,?)');
    PRODUCTS.forEach((p, i) => prod.run(p.slug, p.name, p.category, p.summary, p.price ?? null, p.mrp ?? null, p.condition, p.image, i));

    const page = d.prepare('INSERT INTO pages (slug, title, description, body) VALUES (?,?,?,?)');
    for (const p of PAGES) page.run(p.slug, p.title, p.description, p.body);

    // Draft only: the admin must set the real salary range before it can be published.
    d.prepare(`INSERT INTO jobs (slug, title, promise, experience, about_role, duties, growth, fits, image, published)
      VALUES (?,?,?,?,?,?,?,?,?,0)`).run(JOB_DRAFT.slug, JOB_DRAFT.title, JOB_DRAFT.promise, JOB_DRAFT.experience,
      JOB_DRAFT.about_role, JSON.stringify(JOB_DRAFT.duties), JSON.stringify(JOB_DRAFT.growth), JSON.stringify(JOB_DRAFT.fits),
      'virnobyte-hardware-solutions');

    d.exec('COMMIT');
  } catch (e) {
    d.exec('ROLLBACK');
    throw e;
  }
}

function ensureAdmin(d: DatabaseSync) {
  const admin = d.prepare("SELECT id FROM users WHERE role = 'admin' LIMIT 1").get();
  if (admin) return;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn('[virnobyte] No admin account exists. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env and restart.');
    return;
  }
  d.prepare("INSERT INTO users (email, name, password_hash, role) VALUES (?, 'Administrator', ?, 'admin')").run(
    email,
    hashPassword(password),
  );
  console.log(`[virnobyte] Created admin account ${email}`);
}

function seedPcBuilder(d: DatabaseSync) {
  const { n } = d.prepare('SELECT COUNT(*) AS n FROM pc_parts').get() as { n: number };
  if (n > 0) return;
  d.exec('BEGIN');
  try {
    const ins = d.prepare('INSERT INTO pc_parts (slug, category, brand, name, specs, price, sort) VALUES (?,?,?,?,?,?,?)');
    PC_PARTS.forEach((p, i) => ins.run(p.slug, p.category, p.brand, p.name, JSON.stringify(p.specs), p.price, i));
    const pre = d.prepare('INSERT INTO pc_presets (slug, name, summary, parts, sort) VALUES (?,?,?,?,?)');
    PC_PRESETS.forEach((p, i) => pre.run(p.slug, p.name, p.summary, JSON.stringify(p.parts), i));
    d.exec('COMMIT');
  } catch (e) {
    d.exec('ROLLBACK');
    throw e;
  }
}
