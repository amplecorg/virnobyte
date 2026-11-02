import type { DatabaseSync } from 'node:sqlite';
const proc = typeof globalThis.process !== 'undefined' ? globalThis.process : undefined;
const env = proc?.env || {};
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
  { slug: 'basic', name: 'Basic', tagline: 'For single home desktop or student laptop in Chikhali & PCMC', price: 999, mrp: 1499, coins: 500, visits: 2, from: '#0f2a4a', to: '#2a5d8f', pattern: 'circuit', badge: '', featured: 0 },
  { slug: 'pro', name: 'Pro', tagline: 'For work-from-home pros, families & small offices in Pune', price: 1799, mrp: 2499, coins: 1000, visits: 4, from: '#062c5c', to: '#0a66c2', pattern: 'circuit', badge: 'Most Popular in PCMC', featured: 1 },
  { slug: 'pro-plus', name: 'Pro+', tagline: 'Complete IT AMC care for shops, clinics & factory units in Bhosari & Moshi', price: 2999, mrp: 4499, coins: 2000, visits: 8, from: '#111418', to: '#3a3f47', pattern: 'grid', badge: 'Best for Business', featured: 0 },
];

const FAQS = [
  { q: 'Where is Virnobyte located in Pune / PCMC?', a: 'Our service centre is located at Office No. 1, Sadichha Complex, near Bright Computer Education, Savtamali, Mahadev Temple Road, Jadhav Wadi, Chikhali, Pimpri-Chinchwad, Pune 411062.', topic: 'General', home: 1 },
  { q: 'Which areas in PCMC and Pune do you provide doorstep service for?', a: 'We provide prompt doorstep IT repair and installation across Chikhali, Moshi, Bhosari MIDC, Spine Road, Talawade IT Park, Nigdi, Akurdi, Tathawade, Wakad, Pimple Saudagar, Ravet, and Pune city.', topic: 'General', home: 1 },
  { q: 'How fast is your doorstep computer and laptop repair turnaround?', a: 'For on-site issues (OS installation, software diagnostics, printer connectivity, Wi-Fi configuration), our technician visits within 2 to 4 hours in PCMC. For chip-level repairs, we collect the machine and provide status updates within 24 hours.', topic: 'Repairs', home: 1 },
  { q: 'How much does computer repair cost in Pune & PCMC?', a: 'Diagnostic inspection is completely free with any repair. Basic servicing starts from ₹349, SSD/RAM upgrades from ₹499 labour, and OS reinstallation with genuine license from ₹699. An itemised estimate is provided before work begins.', topic: 'Repairs', home: 1 },
  { q: 'What is the Virnobyte Membership Card and how do Coins work?', a: 'A Virnobyte Membership Card (Basic, Pro, or Pro+) provides 1 full year of zero-labour service visits for your devices. 100% of your plan fee is credited back as VirnoCoins (1 Coin = ₹1) which can be redeemed for repair labour, printer cartridges, SSD upgrades, and accessories.', topic: 'Membership', home: 1 },
  { q: 'Do you offer IT AMC and CCTV installation for industrial plants and shops?', a: 'Yes. We protect and maintain over 40+ factories, machine workshops, logistics firms, and retail stores in Bhosari MIDC and Chikhali with scheduled preventive maintenance, network rack management, and 24/7 CCTV surveillance.', topic: 'Business IT', home: 1 },
  { q: 'Can I track my coin balance, active membership card, and visits online?', a: 'Yes! Simply sign in to your Virnobyte account at virnobyte.com/account to view your live card number, QR identity, available coin balance, past service vouchers, and remaining doorstep visits.', topic: 'Membership', home: 0 },
  { q: 'Do you supply genuine computer components and CCTV hardware?', a: 'Every drive, RAM stick, motherboard, and Hikvision/CP PLUS camera kit supplied by Virnobyte comes with original manufacturer warranty (3 to 5 years) and a verified tax invoice.', topic: 'Components', home: 0 },
];

const TESTIMONIALS = [
  {
    name: 'Sanjay Shinde',
    role: 'Director, Shinde Tooling & Dies, MIDC Bhosari',
    quote: 'Virnobyte has been managing our factory computers and CCTV in Bhosari for 3 years. When our accounting server crashed on GST filing day, their technician arrived within 40 minutes at our shop floor and had our data restored before lunch. Truly dependable local IT support in PCMC.',
    published: 1,
  },
  {
    name: 'Dr. Radhika Nair',
    role: 'Chief Consultant, CarePoint Clinic, Chikhali',
    quote: 'We took the Virnobyte Pro IT membership card for our clinic. Having free doorstep service visits and welcome coins that offset our printer consumables has saved us over ₹8,000 this year alone. Clean, courteous service right here on Mahadev Temple Road.',
    published: 1,
  },
  {
    name: 'Kishore Gaikwad',
    role: 'Founder, Gaikwad E-Commerce Hub, Moshi Spine Road',
    quote: 'Setting up our warehouse network and 12 IP cameras with Virnobyte was seamless. No hidden costs, clean cable conduit work, and the mobile app live stream works flawlessly. Best computer and security technicians in PCMC.',
    published: 1,
  },
  {
    name: 'Nitin Deshpande',
    role: 'Senior Architect, Studio Apex, Wakad & Pimple Saudagar',
    quote: "Had them build two custom 3D rendering desktops for our design studio. Thermal performance under heavy Lumion rendering is rock solid, and their diagnosis of our old laptop was completely honest — didn't push unnecessary repairs. Highly recommended!",
    published: 1,
  },
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

  // Sync any newly added predefined services
  const syncSvc = d.prepare(`INSERT OR IGNORE INTO services
    (slug, name, short, title, description, h1, intro, problems, includes, benefits, faqs, note, image, group_name, footer, sort)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
  SERVICES.forEach((s, i) =>
    syncSvc.run(
      s.slug, s.name, s.short, s.title, s.description, s.h1, s.intro,
      JSON.stringify(s.problems), JSON.stringify(s.includes), JSON.stringify(s.benefits),
      JSON.stringify(s.faqs), s.note ?? '', s.image, s.group, s.footer ? 1 : 0, i
    )
  );

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

    const t = d.prepare('INSERT INTO testimonials (name, role, quote, published, sort) VALUES (?,?,?,1,?)');
    TESTIMONIALS.forEach((x, i) => t.run(x.name, x.role, x.quote, i));

    const prod = d.prepare('INSERT INTO products (slug, name, category, summary, price, mrp, condition, image, images, sort) VALUES (?,?,?,?,?,?,?,?,?,?)');
    PRODUCTS.forEach((p, i) => prod.run(p.slug, p.name, p.category, p.summary, p.price ?? null, p.mrp ?? null, p.condition, p.image, JSON.stringify([p.image]), i));

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
  const email = env.ADMIN_EMAIL;
  const password = env.ADMIN_PASSWORD;
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
