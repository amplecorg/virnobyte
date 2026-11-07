import { all, run } from './db';

/**
 * Every value here is editable from /admin/settings. Defaults are the
 * business's official details; the admin overrides are merged on top.
 */
export const DEFAULT_SETTINGS = {
  business: {
    name: 'Virnobyte',
    legalName: 'Virnobyte Pvt. Ltd.',
    phone: '+91 86698 83332',
    whatsapp: '+91 86698 83332',
    email: 'info@virnobyte.com',
    street:
      'Office No. 1, Sadichha Complex, Near Bright Computer Education, Savtamali, Mahadev Temple Road, Jadhav Wadi',
    locality: 'Chikhali',
    city: 'Pimpri-Chinchwad',
    region: 'Maharashtra',
    postalCode: '411062',
    country: 'India',
    foundedYear: 2019,
    // Left empty on purpose: opening hours are shown (and added to schema) only once the business supplies them.
    hours: 'Mo-Sa 09:30-20:30',
    serviceAreas: ['Chikhali', 'Pimpri-Chinchwad', 'Pune'],
    social: {
      facebook: 'https://www.facebook.com/virnobyte',
      x: 'https://x.com/virnobyte',
      linkedin: 'https://www.linkedin.com/company/virnobyte',
      instagram: 'https://www.instagram.com/virnobyte',
      youtube: 'https://www.youtube.com/@virnobyte',
    },
  },
  home: {
    eyebrow: 'Workshop in Chikhali · Doorstep service across Pimpri-Chinchwad & Pune',
    h1: 'Professional IT Services & Computer Solutions in Pune',
    lede:
      'Computer and laptop repair, CCTV, networking and complete business IT support — diagnosed first, quoted clearly, and fixed by technicians who explain what they did.',
    facts: [
      { value: 'Since 2019', label: 'Repairing and supporting IT in Pune' },
      { value: 'Doorstep', label: 'Visits for homes and offices' },
      { value: 'Itemised', label: 'Quote before any work starts' },
    ],
    heroImage: 'virnobyte-inverter-installation',
    heroAlt: 'Technician repairing a circuit board with a screwdriver at the Virnobyte workbench',
  },
  coins: {
    name: 'Virno Coins',
    valueInr: 1,
    maxRedeemPercent: 20,
    expiryMonths: 12,
    rules: [
      'Coins are credited to your card when your membership is activated.',
      'Use coins against repair labour, consumables and products at the counter or during a doorstep visit.',
      'Coins have no cash value and cannot be transferred to another card.',
    ],
  },
  card: {
    prefix: 'VB',
    issuerLine: 'Virnobyte Membership',
    terms: 'Show this card at the counter or to the visiting technician.',
  },
  careers: {
    heroImage: 'virnobyte-hardware-solutions',
    promise:
      'Learn hardware, networking and CCTV by fixing real problems for homes and businesses across Pimpri-Chinchwad.',
    direction:
      'We are growing from repairs into complete IT care for small businesses: AMC contracts, office networks, CCTV and membership customers. That means more installation work, more responsibility and room to move up.',
    steps: [
      { title: 'Apply online', detail: 'Three short steps with no CV upload needed.', duration: 'About 5 minutes' },
      { title: 'Phone call', detail: 'A short call about your experience and availability.', duration: 'Within 3 working days' },
      { title: 'Practical round', detail: 'Diagnose a real fault at our Chikhali workshop.', duration: 'About 1 hour' },
      { title: 'Offer', detail: 'A written offer with pay and start date.', duration: 'Within 2 working days' },
    ],
  },
  pcbuilder: {
    gstPercent: 18,
    pricesIncludeGst: true,
    assemblyFee: 0,
    deliveryFee: 0,
    note: 'Prices are indicative and confirmed in your written quote. Stock and prices change often.',
  },
  seo: {
    googleVerification: '',
    bingVerification: '',
  },
  announcement: { text: '', href: '' },
  payments: {
    enabled: true,
    gateway: 'cashfree',
    cashfreeEnv: 'TEST',
    cashfreeAppId: '',
    cashfreeSecretKey: '',
    enableCod: true,
    enableOnline: true,
    deliveryFee: 0,
    minFreeDelivery: 500,
  },
  blog: {
    eyebrow: 'Guides',
    title: 'Practical IT advice from our workshop',
    lede: 'What we see every week in Pimpri-Chinchwad and Pune, written up so you can fix, prevent or plan.',
    leadImageSize: '16/9',
    gridImageSize: '16/10',
  },
};

export type Settings = typeof DEFAULT_SETTINGS;
export type SettingsKey = keyof Settings;

function merge<T>(base: T, over: any): T {
  if (Array.isArray(base) || typeof base !== 'object' || base === null) {
    return (over ?? base) as T;
  }
  const out: any = { ...base };
  if (over && typeof over === 'object') {
    for (const k of Object.keys(over)) {
      out[k] = k in (base as any) ? merge((base as any)[k], over[k]) : over[k];
    }
  }
  return out;
}

export function getSettings(): Settings {
  try {
    const rows = all<{ key: string; value: string }>('SELECT key, value FROM settings');
    const stored: Record<string, unknown> = {};
    for (const r of rows) {
      try {
        stored[r.key] = JSON.parse(r.value);
      } catch {
        /* ignore corrupt rows; defaults apply */
      }
    }
    return merge(DEFAULT_SETTINGS, stored);
  } catch (err) {
    console.warn('[Virnobyte Settings] Failed to load settings from DB, using defaults:', err);
    return DEFAULT_SETTINGS;
  }
}

export function saveSetting<K extends SettingsKey>(key: K, value: Settings[K]) {
  run(
    'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
    key,
    JSON.stringify(value),
  );
}

/** Derived values used across header, footer, contact page and JSON-LD so NAP never drifts. */
export function contactInfo(s: Settings = getSettings()) {
  const b = s.business;
  const digits = (v: string) => v.replace(/[^\d]/g, '');
  const fullAddress = `${b.street}, ${b.locality}, ${b.city}, ${b.region} – ${b.postalCode}, ${b.country}`;
  const mapQuery = encodeURIComponent(`${b.name}, ${fullAddress}`);
  return {
    ...b,
    tel: `tel:+${digits(b.phone)}`,
    whatsappUrl: (text = `Hi ${b.name}, I need help with`) =>
      `https://wa.me/${digits(b.whatsapp)}?text=${encodeURIComponent(text)}`,
    mailto: `mailto:${b.email}`,
    fullAddress,
    addressLines: [
      b.name,
      ...b.street.split(', '),
      b.locality,
      b.city,
      `${b.region} – ${b.postalCode}`,
      b.country,
    ],
    mapEmbed: `https://www.google.com/maps?q=${mapQuery}&output=embed`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`,
    mapLink: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
  };
}
