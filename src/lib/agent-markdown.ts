import { getSettings, contactInfo } from './settings';
import { services, service, products, product, posts, post, homeFaqs, allFaqs, plans, testimonials } from './data';
import { inr, plain } from './format';

/**
 * Generate a clean, token-efficient Markdown representation of any page on virnobyte.com.
 * Cuts token usage from ~60k tokens of HTML down to ~1k-2k tokens of pure high-value text for AI agents.
 */
export function generatePageMarkdown(pathname: string, origin = 'https://virnobyte.com'): string | null {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const s = getSettings();
  const c = contactInfo(s);

  // Header metadata block for agents
  const header = `# ${c.name} — ${c.legalName}
> ${s.business.street}, ${c.locality}, ${c.city}, Maharashtra ${c.postalCode}, India
> Phone: ${c.phone} | WhatsApp: ${c.whatsapp} | Email: ${c.email}
> Operating Hours: Monday to Saturday, 9:30 AM – 8:30 PM | Service Areas: ${s.business.serviceAreas.join(', ')}

`;

  // 1. Homepage
  if (cleanPath === '/') {
    const allServices = services();
    const allPlans = plans();
    const allFaqs = homeFaqs();
    const reviews = testimonials();

    return `${header}# ${s.home.h1}

${s.home.lede}

## Core IT Services Offered
${allServices.map((x) => `- [${x.name}](${origin}/services/${x.slug}): ${x.short}`).join('\n')}

## How a Job Works
1. Tell us the problem: Call, WhatsApp, book online, or walk in.
2. Diagnosis & itemised quote: We diagnose the cause and provide a clear quote before touching any components.
3. Repair or install: Performed at our Chikhali workshop or at your doorstep across PCMC/Pune.
4. Hand-over & warranty: Complete testing, warranty documentation, and support.

## Virnobyte Membership Program
${allPlans
  .map(
    (p) =>
      `### ${p.name} — ₹${p.price}/year
- Welcome Coins: ${p.coins} Virno Coins (1 coin = ₹1)
- Doorstep Visits: ${p.doorstep_visits} included
- Benefits: ${p.benefits.join('; ')}`
  )
  .join('\n\n')}

## Verified Customer Reviews
${reviews.slice(0, 4).map((r) => `- **${r.author}** (${r.role}): "${r.quote}"`).join('\n')}

## Frequently Asked Questions
${allFaqs.map((f) => `### ${f.question}\n${f.answer}`).join('\n\n')}

---
Website: ${origin} | Booking: ${origin}/contact#book | Products: ${origin}/products
`;
  }

  // 2. Services Index
  if (cleanPath === '/services') {
    const allServices = services();
    return `${header}# IT Services & Solutions in Pune & PCMC

Virnobyte provides professional hardware repair, network setup, CCTV, and corporate IT AMC from our Chikhali workshop and on-site at your doorstep.

${allServices
  .map(
    (x) => `## [${x.name}](${origin}/services/${x.slug})
- **Category**: ${x.group_name}
- **Overview**: ${x.short}
- **Details & Booking**: ${origin}/services/${x.slug}`
  )
  .join('\n\n')}
`;
  }

  // 3. Single Service Page
  if (cleanPath.startsWith('/services/')) {
    const slug = cleanPath.replace('/services/', '');
    const svc = service(slug);
    if (!svc) return null;

    return `${header}# ${svc.h1}
**Service**: ${svc.name} | **Category**: ${svc.group_name} | **Coverage**: ${s.business.serviceAreas.join(', ')}

${plain(svc.intro)}

## Common Issues We Resolve
${svc.problems.map((p) => `- ${p}`).join('\n')}

## What Is Included in This Service
${svc.includes.map((i) => `- ${i}`).join('\n')}

## Benefits of Choosing Virnobyte
${svc.benefits.map((b) => `- ${b}`).join('\n')}

${svc.faqs.length ? `## Frequently Asked Questions\n${svc.faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}` : ''}

---
Book Service: ${origin}/contact#book?service=${svc.slug} | Call Now: ${c.phone}
`;
  }

  // 4. Products Index
  if (cleanPath === '/products') {
    const prods = products();
    return `${header}# IT Hardware & Certified Computer Store

All hardware is certified, 35-point benchmarked, and backed by local Virnobyte warranty with doorstep delivery across Pune & PCMC.

${prods
  .map(
    (p) => `## [${p.name}](${origin}/products/${p.slug})
- **Category**: ${p.category}
- **Price**: ${p.price ? inr(p.price) : 'Contact for Quote'}${p.mrp && p.mrp > (p.price || 0) ? ` (M.R.P.: ${inr(p.mrp)})` : ''}
- **Key Specs**:
${p.summary ? p.summary.split('\n').filter(Boolean).map((l) => `  ${l}`).join('\n') : '  Standard certified specifications.'}
- **Warranty**: ${p.warranty || '1 Year Virnobyte Warranty'}
- **Delivery**: ${p.delivery_text || 'Free Doorstep Delivery'}
- **Order Page**: ${origin}/checkout/${p.slug}`
  )
  .join('\n\n')}
`;
  }

  // 5. Single Product Page
  if (cleanPath.startsWith('/products/')) {
    const slug = cleanPath.replace('/products/', '');
    const p = product(slug);
    if (!p) return null;

    return `${header}# ${p.name}
**Category**: ${p.category} | **SKU / Code**: ${p.slug} | **Badge**: ${p.badge || 'Virnobyte Assured'}

- **Price**: ${p.price ? inr(p.price) : 'Ask for Price'}
${p.mrp && p.price && p.mrp > p.price ? `- **M.R.P.**: ${inr(p.mrp)} (Save ${Math.round(((p.mrp - p.price) / p.mrp) * 100)}%)` : ''}
${p.offer_tag ? `- **Offer**: ${p.offer_tag}` : ''}
- **Warranty**: ${p.warranty || '1 Year Virnobyte Warranty'}
- **Replacement Policy**: ${p.replacement_policy || '7-Day Replacement Guarantee'}
- **Diagnostic / Setup**: ${p.diagnostic_setup || 'Free On-Site Diagnostic Setup Included'}
- **Delivery**: ${p.delivery_text || 'Free Doorstep Delivery Tomorrow in Pune & PCMC'}

## Specifications & Highlights
${p.summary || 'Certified genuine hardware benchmarked by Virnobyte.'}

## Inspection Standards
Every unit undergoes a comprehensive 35-point hardware check: battery health benchmark, display dead-pixel inspection, thermal paste renewal, and load testing.

---
Instant Buy: ${origin}/checkout/${p.slug} | Product URL: ${origin}/products/${p.slug}
`;
  }

  // 6. Blog Index
  if (cleanPath === '/blog') {
    const allPosts = posts();
    return `${header}# Virnobyte Blog — ${s.blog?.title || 'Practical IT Advice from our Workshop'}

${s.blog?.lede || 'Technical guides, troubleshooting steps, and hardware buyer advice from Virnobyte engineers.'}

${allPosts
  .map(
    (p) => `## [${p.title}](${origin}/blog/${p.slug})
- **Published**: ${p.published_at} | **Author**: ${p.author || 'Virnobyte Team'}
- **Summary**: ${p.description}
- **Read Article**: ${origin}/blog/${p.slug}`
  )
  .join('\n\n')}
`;
  }

  // 7. Single Blog Article
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '');
    const p = post(slug, true);
    if (!p) return null;

    return `${header}# ${p.title}
> Published: ${p.published_at} | Author: ${p.author || 'Virnobyte Team'}

${p.description}

---

${p.body}

---
Read more guides at ${origin}/blog
`;
  }

  // 8. About Page
  if (cleanPath === '/about') {
    return `${header}# About Virnobyte

Founded in ${s.business.foundedYear}, Virnobyte is an ISO-aligned computer hardware, networking, and security solutions enterprise based in Chikhali, Pimpri-Chinchwad, Pune.

## What We Do
- Hardware and chip-level motherboard diagnostics and component replacement
- Custom PC building for gaming, AI processing, and 4K video rendering
- Turnkey IP & HD CCTV security camera installations for factories and retail
- Commercial structured networking, Wi-Fi 6 mesh, and server rack installations
- Annual Maintenance Contracts (AMC) and doorstep IT support for SMEs

## Workshop Location
${c.street}, ${c.locality}, ${c.city}, Maharashtra ${c.postalCode}.
Phone: ${c.phone} | Email: ${c.email}
`;
  }

  // 9. Contact Page
  if (cleanPath === '/contact') {
    return `${header}# Contact Virnobyte

- **Workshop Address**: ${c.street}, ${c.locality}, ${c.city}, Maharashtra ${c.postalCode}, India
- **Phone**: ${c.phone}
- **WhatsApp**: ${c.whatsapp}
- **Email**: ${c.email}
- **Google Maps Link**: ${c.mapLink}
- **Hours**: Monday to Saturday, 9:30 AM – 8:30 PM
- **Online Booking**: ${origin}/contact#book
`;
  }

  // 10. Membership Page
  if (cleanPath === '/membership') {
    const allPlans = plans();
    return `${header}# Virnobyte Membership Card & Virno Coins

A year of comprehensive IT support in your wallet with Virno Coins rewards.

## Membership Plans
${allPlans
  .map(
    (p) => `### ${p.name} — ₹${p.price}/year
- Welcome Coins: ${p.coins} Virno Coins
- Doorstep Visits: ${p.doorstep_visits}
- Validity: ${p.validity_days || 365} days
- Benefits:
${p.benefits.map((b) => `  - ${b}`).join('\n')}`
  )
  .join('\n\n')}

## Coin Program Rules
${s.coins.rules.map((r) => `- ${r}`).join('\n')}
`;
  }

  // 11. FAQ Page
  if (cleanPath === '/faq') {
    const faqList = allFaqs();
    return `${header}# Virnobyte Frequently Asked Questions

${faqList.map((f) => `### ${f.question} (${f.topic})\n${f.answer}`).join('\n\n')}
`;
  }

  return null;
}
