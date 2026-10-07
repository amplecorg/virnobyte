// JSON-LD builders. Only facts the business has supplied are emitted —
// no ratings, reviews, opening hours or prices unless they exist in the admin.
import { contactInfo, getSettings, type Settings } from './settings';

export function absolute(site: URL | string, path: string) {
  return new URL(path, site).href;
}

export function organizationId(site: URL | string) {
  return absolute(site, '/#organization');
}

export function localBusiness(site: URL | string, s: Settings = getSettings()) {
  const c = contactInfo(s);
  const sameAs = Object.values(s.business.social).filter(Boolean);
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ComputerStore'],
    '@id': organizationId(site),
    name: c.name,
    legalName: c.legalName,
    url: absolute(site, '/'),
    logo: absolute(site, '/virnobyte-logo.png'),
    image: absolute(site, '/og/default.jpg'),
    telephone: c.phone,
    email: c.email,
    foundingDate: String(s.business.foundedYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: c.street,
      addressLocality: `${c.locality}, ${c.city}`,
      addressRegion: c.region,
      postalCode: c.postalCode,
      addressCountry: 'IN',
    },
    hasMap: c.mapLink,
    areaServed: s.business.serviceAreas.map((name) => ({ '@type': 'City', name })),
    knowsAbout: [
      'Computer repair', 'Laptop repair', 'CCTV installation', 'Networking', 'IT support',
      'Data recovery', 'Printer repair', 'IT AMC', 'Virus removal', 'IT consulting',
    ],
  };
  if (sameAs.length) node.sameAs = sameAs;
  return node;
}

export function website(site: URL | string, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absolute(site, '/#website'),
    url: absolute(site, '/'),
    name,
    publisher: { '@id': organizationId(site) },
    inLanguage: 'en-IN',
  };
}

export function breadcrumbs(site: URL | string, items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absolute(site, it.href),
    })),
  };
}

export function serviceNode(site: URL | string, svc: { name: string; description: string; slug: string }, areas: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': absolute(site, `/services/${svc.slug}#service`),
    name: svc.name,
    serviceType: svc.name,
    description: svc.description,
    url: absolute(site, `/services/${svc.slug}`),
    provider: { '@id': organizationId(site) },
    areaServed: areas.map((name) => ({ '@type': 'City', name })),
  };
}

/** Only call with FAQs that are visibly rendered on the same page. */
export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function article(site: URL | string, p: { title: string; description: string; slug: string; published_at: string; updated_at: string }, image: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    datePublished: p.published_at,
    dateModified: p.updated_at || p.published_at,
    mainEntityOfPage: absolute(site, `/blog/${p.slug}`),
    image,
    author: { '@id': organizationId(site) },
    publisher: { '@id': organizationId(site) },
    inLanguage: 'en-IN',
  };
}

export function jobPostingNode(
  site: URL | string,
  j: { title: string; about_role: string; duties: string[]; posted_at: string; valid_through: string; employment_type: string; salary_min: number; salary_max: number },
  c: ReturnType<typeof contactInfo>,
) {
  const list = j.duties.map((d) => '<li>' + d + '</li>').join('');
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: j.title,
    description: '<p>' + j.about_role + '</p><ul>' + list + '</ul>',
    datePosted: j.posted_at,
    ...(j.valid_through ? { validThrough: j.valid_through } : {}),
    employmentType: j.employment_type,
    hiringOrganization: { '@type': 'Organization', '@id': organizationId(site), name: c.legalName, sameAs: absolute(site, '/') },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: c.street,
        addressLocality: `${c.locality}, ${c.city}`,
        addressRegion: c.region,
        postalCode: c.postalCode,
        addressCountry: 'IN',
      },
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: { '@type': 'QuantitativeValue', minValue: j.salary_min, maxValue: j.salary_max, unitText: 'MONTH' },
    },
    directApply: true,
  };
}
