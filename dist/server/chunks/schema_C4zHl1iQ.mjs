import { n as getSettings, t as contactInfo } from "./settings_DhHzJVWR.mjs";
//#region src/lib/schema.ts
function absolute(site, path) {
	return new URL(path, site).href;
}
function organizationId(site) {
	return absolute(site, "/#organization");
}
function localBusiness(site, s = getSettings()) {
	const c = contactInfo(s);
	const sameAs = Object.values(s.business.social).filter(Boolean);
	const node = {
		"@context": "https://schema.org",
		"@type": ["LocalBusiness", "ComputerStore"],
		"@id": organizationId(site),
		name: c.name,
		legalName: c.legalName,
		url: absolute(site, "/"),
		logo: absolute(site, "/virnobyte-logo.png"),
		image: absolute(site, "/og/default.jpg"),
		telephone: c.phone,
		email: c.email,
		foundingDate: String(s.business.foundedYear),
		address: {
			"@type": "PostalAddress",
			streetAddress: c.street,
			addressLocality: `${c.locality}, ${c.city}`,
			addressRegion: c.region,
			postalCode: c.postalCode,
			addressCountry: "IN"
		},
		hasMap: c.mapLink,
		areaServed: s.business.serviceAreas.map((name) => ({
			"@type": "City",
			name
		})),
		knowsAbout: [
			"Computer repair",
			"Laptop repair",
			"CCTV installation",
			"Networking",
			"IT support",
			"Data recovery",
			"Printer repair",
			"IT AMC",
			"Virus removal",
			"IT consulting"
		]
	};
	if (sameAs.length) node.sameAs = sameAs;
	return node;
}
function website(site, name) {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": absolute(site, "/#website"),
		url: absolute(site, "/"),
		name,
		publisher: { "@id": organizationId(site) },
		inLanguage: "en-IN"
	};
}
function breadcrumbs(site, items) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((it, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: it.name,
			item: absolute(site, it.href)
		}))
	};
}
function serviceNode(site, svc, areas) {
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		"@id": absolute(site, `/services/${svc.slug}#service`),
		name: svc.name,
		serviceType: svc.name,
		description: svc.description,
		url: absolute(site, `/services/${svc.slug}`),
		provider: { "@id": organizationId(site) },
		areaServed: areas.map((name) => ({
			"@type": "City",
			name
		}))
	};
}
/** Only call with FAQs that are visibly rendered on the same page. */
function faqPage(faqs) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqs.map((f) => ({
			"@type": "Question",
			name: f.q,
			acceptedAnswer: {
				"@type": "Answer",
				text: f.a
			}
		}))
	};
}
function article(site, p, image) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: p.title,
		description: p.description,
		datePublished: p.published_at,
		dateModified: p.updated_at || p.published_at,
		mainEntityOfPage: absolute(site, `/blog/${p.slug}`),
		image,
		author: { "@id": organizationId(site) },
		publisher: { "@id": organizationId(site) },
		inLanguage: "en-IN"
	};
}
function jobPostingNode(site, j, c) {
	const list = j.duties.map((d) => "<li>" + d + "</li>").join("");
	return {
		"@context": "https://schema.org",
		"@type": "JobPosting",
		title: j.title,
		description: "<p>" + j.about_role + "</p><ul>" + list + "</ul>",
		datePosted: j.posted_at,
		...j.valid_through ? { validThrough: j.valid_through } : {},
		employmentType: j.employment_type,
		hiringOrganization: {
			"@type": "Organization",
			"@id": organizationId(site),
			name: c.legalName,
			sameAs: absolute(site, "/")
		},
		jobLocation: {
			"@type": "Place",
			address: {
				"@type": "PostalAddress",
				streetAddress: c.street,
				addressLocality: `${c.locality}, ${c.city}`,
				addressRegion: c.region,
				postalCode: c.postalCode,
				addressCountry: "IN"
			}
		},
		baseSalary: {
			"@type": "MonetaryAmount",
			currency: "INR",
			value: {
				"@type": "QuantitativeValue",
				minValue: j.salary_min,
				maxValue: j.salary_max,
				unitText: "MONTH"
			}
		},
		directApply: true
	};
}
//#endregion
export { localBusiness as a, jobPostingNode as i, breadcrumbs as n, serviceNode as o, faqPage as r, website as s, article as t };
