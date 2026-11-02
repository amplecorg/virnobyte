import { t as PORTFOLIO_CATEGORIES } from "./data_BsT_AAm4.mjs";
//#region src/lib/admin/resources.ts
var opt = (...v) => v.map((x) => ({
	value: x,
	label: x
}));
var RESOURCES = {
	plans: {
		key: "plans",
		table: "plans",
		label: "Membership plans",
		singular: "plan",
		intro: "Each plan is a membership card design. Edits update the public membership page and every member card using the plan.",
		orderBy: "sort, id",
		columns: [
			{
				name: "name",
				label: "Plan"
			},
			{
				name: "price",
				label: "Price",
				type: "money"
			},
			{
				name: "coins",
				label: "Coins"
			},
			{
				name: "doorstep_visits",
				label: "Visits"
			},
			{
				name: "active",
				label: "On sale",
				type: "bool"
			}
		],
		publicUrl: () => "/membership",
		fields: [
			{
				name: "name",
				label: "Plan name",
				type: "text",
				required: true,
				half: true,
				section: "Plan"
			},
			{
				name: "slug",
				label: "Plan code / URL ID",
				type: "slug",
				required: true,
				half: true,
				help: "Unique short ID, e.g. basic, pro, pro-plus."
			},
			{
				name: "tagline",
				label: "Who it is for",
				type: "text"
			},
			{
				name: "price",
				label: "Price (₹ / year)",
				type: "money",
				required: true,
				half: true
			},
			{
				name: "mrp",
				label: "Crossed-out price (₹)",
				type: "money",
				half: true,
				help: "Leave 0 to hide."
			},
			{
				name: "coins",
				label: "Welcome coins",
				type: "number",
				required: true,
				half: true,
				help: "Credited once when a card on this plan is activated."
			},
			{
				name: "doorstep_visits",
				label: "Doorstep visits included",
				type: "number",
				half: true
			},
			{
				name: "validity_days",
				label: "Validity (days)",
				type: "number",
				half: true
			},
			{
				name: "sort",
				label: "Display order",
				type: "number",
				half: true
			},
			{
				name: "benefits",
				label: "Benefits",
				type: "list",
				help: "One benefit per line."
			},
			{
				name: "card_from",
				label: "Card colour (start)",
				type: "color",
				half: true,
				section: "Card design"
			},
			{
				name: "card_to",
				label: "Card colour (end)",
				type: "color",
				half: true
			},
			{
				name: "card_text",
				label: "Card text colour",
				type: "color",
				half: true
			},
			{
				name: "card_pattern",
				label: "Card pattern",
				type: "select",
				half: true,
				options: [
					{
						value: "circuit",
						label: "Circuit traces"
					},
					{
						value: "grid",
						label: "Dot grid"
					},
					{
						value: "none",
						label: "Plain"
					}
				]
			},
			{
				name: "badge",
				label: "Badge",
				type: "text",
				half: true,
				help: "e.g. \"Most chosen\". Leave empty for none."
			},
			{
				name: "featured",
				label: "Highlight this plan",
				type: "bool",
				half: true
			},
			{
				name: "active",
				label: "On sale",
				type: "bool",
				half: true,
				help: "Turn off to stop new requests. Existing cards are unaffected."
			}
		]
	},
	services: {
		key: "services",
		table: "services",
		label: "Services",
		singular: "service",
		intro: "Each service has its own SEO page at /services/[web-address].",
		orderBy: "sort, id",
		search: ["name", "slug"],
		columns: [
			{
				name: "name",
				label: "Service"
			},
			{
				name: "group_name",
				label: "Group"
			},
			{
				name: "footer",
				label: "In footer",
				type: "bool"
			},
			{
				name: "published",
				label: "Published",
				type: "bool"
			}
		],
		publicUrl: (r) => `/services/${r.slug}`,
		fields: [
			{
				name: "name",
				label: "Service name",
				type: "text",
				required: true,
				half: true,
				section: "Basics"
			},
			{
				name: "slug",
				label: "Web address (URL)",
				type: "slug",
				required: true,
				half: true,
				help: "Short link name, e.g. laptop-repair becomes /services/laptop-repair. Changing this changes the page link."
			},
			{
				name: "group_name",
				label: "Group",
				type: "select",
				half: true,
				options: opt("Repair & support", "Security & networks", "Business IT")
			},
			{
				name: "image",
				label: "Image",
				type: "image",
				half: true
			},
			{
				name: "short",
				label: "Short summary",
				type: "textarea",
				rows: 2,
				max: 160,
				help: "Used on cards and under the heading."
			},
			{
				name: "title",
				label: "SEO title",
				type: "text",
				required: true,
				max: 65,
				section: "Search engines",
				help: "Format: Service + location | Virnobyte"
			},
			{
				name: "description",
				label: "Meta description",
				type: "textarea",
				rows: 3,
				required: true,
				max: 160
			},
			{
				name: "h1",
				label: "Page heading (H1)",
				type: "text",
				required: true
			},
			{
				name: "intro",
				label: "Main content",
				type: "markdown",
				rows: 12,
				section: "Content",
				help: "Paragraphs separated by a blank line. **bold**, [link text](/services/service-name), ## Heading, - list."
			},
			{
				name: "problems",
				label: "Common problems",
				type: "list"
			},
			{
				name: "includes",
				label: "What the service includes",
				type: "list"
			},
			{
				name: "benefits",
				label: "Benefits",
				type: "list"
			},
			{
				name: "note",
				label: "Important note",
				type: "textarea",
				rows: 2,
				help: "Shown highlighted. Use for limitations, e.g. data recovery is not guaranteed."
			},
			{
				name: "faqs",
				label: "FAQs",
				type: "faqs",
				help: "Shown on the page and added as FAQ schema."
			},
			{
				name: "footer",
				label: "Show in footer and home page",
				type: "bool",
				half: true,
				section: "Visibility"
			},
			{
				name: "published",
				label: "Published",
				type: "bool",
				half: true
			},
			{
				name: "sort",
				label: "Display order",
				type: "number",
				half: true
			}
		]
	},
	posts: {
		key: "posts",
		table: "posts",
		label: "Blog",
		singular: "article",
		orderBy: "published_at DESC, id DESC",
		search: ["title", "slug"],
		columns: [
			{
				name: "title",
				label: "Title"
			},
			{
				name: "published_at",
				label: "Date",
				type: "date"
			},
			{
				name: "published",
				label: "Published",
				type: "bool"
			}
		],
		publicUrl: (r) => `/blog/${r.slug}`,
		fields: [
			{
				name: "title",
				label: "Title",
				type: "text",
				required: true,
				max: 70
			},
			{
				name: "slug",
				label: "Article web address (URL)",
				type: "slug",
				required: true,
				half: true,
				help: "Short link name, e.g. ssd-vs-hdd becomes /blog/ssd-vs-hdd."
			},
			{
				name: "image",
				label: "Cover image",
				type: "image",
				half: true
			},
			{
				name: "description",
				label: "Meta description",
				type: "textarea",
				rows: 3,
				required: true,
				max: 160
			},
			{
				name: "body",
				label: "Article",
				type: "markdown",
				rows: 22,
				required: true,
				help: "Use ## for section headings. Link to services with [anchor text](/services/service-name)."
			},
			{
				name: "related",
				label: "Related service links",
				type: "list",
				help: "One service web address name per line (e.g. laptop-repair). Shown as links under the article."
			},
			{
				name: "published_at",
				label: "Publish date",
				type: "date",
				half: true
			},
			{
				name: "published",
				label: "Published",
				type: "bool",
				half: true
			}
		]
	},
	faqs: {
		key: "faqs",
		table: "faqs",
		label: "FAQs",
		singular: "FAQ",
		orderBy: "topic, sort, id",
		search: ["question"],
		columns: [
			{
				name: "question",
				label: "Question"
			},
			{
				name: "topic",
				label: "Topic"
			},
			{
				name: "home",
				label: "On home",
				type: "bool"
			},
			{
				name: "published",
				label: "Published",
				type: "bool"
			}
		],
		publicUrl: () => "/faq",
		fields: [
			{
				name: "question",
				label: "Question",
				type: "text",
				required: true
			},
			{
				name: "answer",
				label: "Answer",
				type: "textarea",
				rows: 5,
				required: true,
				help: "Give a genuinely useful answer. Do not promise prices or guarantees."
			},
			{
				name: "topic",
				label: "Topic",
				type: "select",
				half: true,
				options: opt("General", "Repairs", "CCTV & networking", "Business IT", "Membership")
			},
			{
				name: "sort",
				label: "Display order",
				type: "number",
				half: true
			},
			{
				name: "home",
				label: "Show on home page",
				type: "bool",
				half: true
			},
			{
				name: "published",
				label: "Published",
				type: "bool",
				half: true
			}
		]
	},
	products: {
		key: "products",
		table: "products",
		label: "Products",
		singular: "product",
		orderBy: "sort, id",
		search: ["name", "category"],
		columns: [
			{
				name: "name",
				label: "Product"
			},
			{
				name: "category",
				label: "Category"
			},
			{
				name: "price",
				label: "Price",
				type: "money"
			},
			{
				name: "in_stock",
				label: "In stock",
				type: "bool"
			},
			{
				name: "published",
				label: "Published",
				type: "bool"
			}
		],
		publicUrl: () => "/products",
		fields: [
			{
				name: "name",
				label: "Name",
				type: "text",
				required: true,
				half: true
			},
			{
				name: "slug",
				label: "Product code / ID",
				type: "slug",
				required: true,
				half: true
			},
			{
				name: "category",
				label: "Category",
				type: "text",
				half: true,
				required: true
			},
			{
				name: "condition",
				label: "Condition",
				type: "select",
				half: true,
				options: opt("New", "Refurbished", "Used")
			},
			{
				name: "summary",
				label: "Summary",
				type: "textarea",
				rows: 3
			},
			{
				name: "price",
				label: "Price (₹)",
				type: "money",
				half: true,
				help: "Leave empty to show \"Ask for price\"."
			},
			{
				name: "mrp",
				label: "Crossed-out price (₹)",
				type: "money",
				half: true
			},
			{
				name: "images",
				label: "Product photos",
				type: "images",
				help: "Upload or drag and drop multiple photos. The first photo is the main cover image."
			},
			{
				name: "in_stock",
				label: "In stock",
				type: "bool",
				half: true
			},
			{
				name: "published",
				label: "Published",
				type: "bool",
				half: true
			},
			{
				name: "sort",
				label: "Display order",
				type: "number",
				half: true
			}
		]
	},
	projects: {
		key: "projects",
		table: "projects",
		label: "Portfolio",
		singular: "project",
		intro: "Add only real projects you can verify. Category pages stay hidden from search until they have a published project.",
		orderBy: "sort, id DESC",
		search: ["title", "location"],
		columns: [
			{
				name: "title",
				label: "Project"
			},
			{
				name: "category",
				label: "Category"
			},
			{
				name: "location",
				label: "Location"
			},
			{
				name: "published",
				label: "Published",
				type: "bool"
			}
		],
		publicUrl: (r) => `/portfolio/${r.category}`,
		fields: [
			{
				name: "title",
				label: "Title",
				type: "text",
				required: true,
				half: true
			},
			{
				name: "slug",
				label: "Project identifier (ID)",
				type: "slug",
				required: true,
				half: true,
				help: "Unique short ID, e.g. office-it-setup."
			},
			{
				name: "category",
				label: "Category",
				type: "select",
				required: true,
				half: true,
				options: Object.entries(PORTFOLIO_CATEGORIES).map(([value, c]) => ({
					value,
					label: c.name
				}))
			},
			{
				name: "client_type",
				label: "Client type",
				type: "text",
				half: true,
				help: "e.g. Retail shop, Clinic, 20-seat office"
			},
			{
				name: "location",
				label: "Location",
				type: "text",
				half: true
			},
			{
				name: "completed_on",
				label: "Completed on",
				type: "date",
				half: true
			},
			{
				name: "summary",
				label: "Summary",
				type: "textarea",
				rows: 4
			},
			{
				name: "scope",
				label: "Scope of work",
				type: "list"
			},
			{
				name: "image",
				label: "Photo",
				type: "image",
				help: "Upload a real photo of the installation."
			},
			{
				name: "published",
				label: "Published",
				type: "bool",
				half: true
			},
			{
				name: "sort",
				label: "Display order",
				type: "number",
				half: true
			}
		]
	},
	gallery: {
		key: "gallery",
		table: "gallery",
		label: "Gallery",
		singular: "photo",
		orderBy: "sort, id DESC",
		columns: [{
			name: "caption",
			label: "Caption"
		}, {
			name: "published",
			label: "Published",
			type: "bool"
		}],
		publicUrl: () => "/gallery",
		fields: [
			{
				name: "image",
				label: "Photo",
				type: "image",
				required: true
			},
			{
				name: "caption",
				label: "Caption / alt text",
				type: "text",
				required: true,
				help: "Describe what is in the photo."
			},
			{
				name: "published",
				label: "Published",
				type: "bool",
				half: true
			},
			{
				name: "sort",
				label: "Display order",
				type: "number",
				half: true
			}
		]
	},
	jobs: {
		key: "jobs",
		table: "jobs",
		label: "Careers",
		singular: "role",
		intro: "A role is only shown publicly once it is published and has a real pay range.",
		orderBy: "posted_at DESC, id DESC",
		columns: [
			{
				name: "title",
				label: "Role"
			},
			{
				name: "salary_max",
				label: "Max pay",
				type: "money"
			},
			{
				name: "posted_at",
				label: "Posted",
				type: "date"
			},
			{
				name: "published",
				label: "Published",
				type: "bool"
			}
		],
		publicUrl: (r) => r.published && r.salary_max > 0 ? `/careers/${r.slug}` : null,
		validate: (r) => {
			if (Number(r.published) && !(Number(r.salary_max) > 0)) return "Add the monthly pay range before publishing. The careers page never hides pay.";
			if (Number(r.salary_min) > Number(r.salary_max)) return "Minimum pay cannot be higher than maximum pay.";
			return null;
		},
		fields: [
			{
				name: "title",
				label: "Role title",
				type: "text",
				required: true,
				half: true,
				section: "Hero"
			},
			{
				name: "slug",
				label: "Job web address (URL)",
				type: "slug",
				required: true,
				half: true,
				help: "Short link name, e.g. hardware-technician becomes /careers/hardware-technician."
			},
			{
				name: "promise",
				label: "One-line promise",
				type: "text",
				required: true,
				help: "Specific, not \"Join our team\"."
			},
			{
				name: "image",
				label: "Hero photo",
				type: "image",
				help: "Prefer a real photo of your workshop or team."
			},
			{
				name: "employment_type",
				label: "Type",
				type: "select",
				half: true,
				options: [
					{
						value: "FULL_TIME",
						label: "Full-time"
					},
					{
						value: "PART_TIME",
						label: "Part-time"
					},
					{
						value: "INTERN",
						label: "Internship"
					},
					{
						value: "CONTRACTOR",
						label: "Contract"
					}
				]
			},
			{
				name: "location",
				label: "Location",
				type: "text",
				half: true
			},
			{
				name: "about_role",
				label: "What the job is",
				type: "textarea",
				rows: 4,
				section: "The role"
			},
			{
				name: "experience",
				label: "Experience needed",
				type: "text"
			},
			{
				name: "duties",
				label: "Daily duties",
				type: "list",
				help: "Short, one per line."
			},
			{
				name: "salary_min",
				label: "Pay from (₹ / month)",
				type: "money",
				half: true,
				section: "Pay and growth"
			},
			{
				name: "salary_max",
				label: "Pay up to (₹ / month)",
				type: "money",
				half: true
			},
			{
				name: "pay_note",
				label: "Pay note",
				type: "text",
				help: "Incentives, travel allowance, review cycle."
			},
			{
				name: "growth",
				label: "Career ladder",
				type: "list",
				help: "First line is this role, then the next steps."
			},
			{
				name: "fits",
				label: "Who fits (checklist)",
				type: "list",
				section: "Who fits"
			},
			{
				name: "posted_at",
				label: "Posted on",
				type: "date",
				half: true,
				section: "Publishing"
			},
			{
				name: "valid_through",
				label: "Closes on",
				type: "date",
				half: true
			},
			{
				name: "published",
				label: "Published",
				type: "bool",
				half: true
			}
		]
	},
	testimonials: {
		key: "testimonials",
		table: "testimonials",
		label: "Testimonials",
		singular: "testimonial",
		intro: "Publish only genuine feedback from real customers, with their permission. Imported quotes from the old site are unpublished until verified.",
		orderBy: "sort, id",
		columns: [
			{
				name: "name",
				label: "Name"
			},
			{
				name: "role",
				label: "Role"
			},
			{
				name: "published",
				label: "Published",
				type: "bool"
			}
		],
		publicUrl: () => "/",
		fields: [
			{
				name: "name",
				label: "Customer name",
				type: "text",
				required: true,
				half: true
			},
			{
				name: "role",
				label: "Role / company",
				type: "text",
				half: true
			},
			{
				name: "quote",
				label: "Quote",
				type: "textarea",
				rows: 4,
				required: true
			},
			{
				name: "published",
				label: "Published (verified)",
				type: "bool",
				half: true
			},
			{
				name: "sort",
				label: "Display order",
				type: "number",
				half: true
			}
		]
	},
	pages: {
		key: "pages",
		table: "pages",
		label: "Pages",
		singular: "page",
		canCreate: false,
		canDelete: false,
		orderBy: "id",
		columns: [{
			name: "title",
			label: "Page"
		}, {
			name: "updated_at",
			label: "Updated",
			type: "date"
		}],
		publicUrl: (r) => `/${r.slug}`,
		fields: [
			{
				name: "title",
				label: "Title",
				type: "text",
				required: true
			},
			{
				name: "description",
				label: "Meta description",
				type: "textarea",
				rows: 3,
				max: 160
			},
			{
				name: "body",
				label: "Content",
				type: "markdown",
				rows: 26
			}
		]
	},
	pc_parts: {
		key: "pc_parts",
		table: "pc_parts",
		label: "PC parts & prices",
		singular: "part",
		intro: "The PC builder catalogue. These prices are what customers see and what the server uses for quotes. Seeded prices and specs are indicative — verify them before launch.",
		orderBy: "CASE category WHEN 'cpu' THEN 0 WHEN 'motherboard' THEN 1 WHEN 'ram' THEN 2 WHEN 'gpu' THEN 3 WHEN 'storage' THEN 4 WHEN 'cooler' THEN 5 WHEN 'psu' THEN 6 WHEN 'case' THEN 7 ELSE 8 END, sort, price",
		search: [
			"name",
			"brand",
			"category"
		],
		columns: [
			{
				name: "name",
				label: "Part"
			},
			{
				name: "category",
				label: "Category"
			},
			{
				name: "price",
				label: "Price",
				type: "money"
			},
			{
				name: "in_stock",
				label: "In stock",
				type: "bool"
			},
			{
				name: "active",
				label: "Shown",
				type: "bool"
			}
		],
		publicUrl: () => "/custom-pc-builder",
		fields: [
			{
				name: "name",
				label: "Name",
				type: "text",
				required: true
			},
			{
				name: "slug",
				label: "Part identifier (Part ID)",
				type: "slug",
				required: true,
				half: true,
				help: "Unique part ID used by preset builds (e.g. intel-core-i5-12400)."
			},
			{
				name: "category",
				label: "Category",
				type: "select",
				required: true,
				half: true,
				options: [
					{
						value: "cpu",
						label: "Processor"
					},
					{
						value: "motherboard",
						label: "Motherboard"
					},
					{
						value: "ram",
						label: "Memory"
					},
					{
						value: "gpu",
						label: "Graphics card"
					},
					{
						value: "storage",
						label: "Storage"
					},
					{
						value: "cooler",
						label: "CPU cooler"
					},
					{
						value: "psu",
						label: "Power supply"
					},
					{
						value: "case",
						label: "Cabinet"
					},
					{
						value: "extra",
						label: "Add-on"
					}
				]
			},
			{
				name: "brand",
				label: "Brand",
				type: "text",
				half: true
			},
			{
				name: "price",
				label: "Price (₹)",
				type: "money",
				required: true,
				half: true
			},
			{
				name: "specs",
				label: "Specifications",
				type: "kv",
				rows: 12,
				help: "One \"key: value\" per line, used by the compatibility check. CPU: socket, cores, threads, base_ghz, boost_ghz, tdp, igpu, cooler_included · Motherboard: socket, chipset, form_factor (ATX/mATX/ITX), ram_type, ram_slots, max_ram_gb, m2_slots, sata_ports · RAM: type, capacity_gb, modules, speed_mts, rgb, height_mm · GPU: maker, vram_gb, length_mm, power_w, rec_psu_w, slots, fans · Storage: kind, capacity_gb, read_mbps, write_mbps, form_factor (M.2 / 2.5\" / 3.5\") · PSU: watts, efficiency, modular, form_factor · Cooler: kind (Air/AIO), sockets [..], height_mm, radiator_mm, tdp_w · Cabinet: max_board, supports [..], gpu_max_mm, cooler_max_mm, radiator_mm [..], psu, fans_included, drive_35, color · Add-on: kind, power_w, fans_count"
			},
			{
				name: "model_url",
				label: "3D model URL (.glb)",
				type: "text",
				help: "Optional. Put the .glb in public/models/<category>/ and enter its path, e.g. /models/gpu/rtx-4060.glb. Empty = built-in 3D model."
			},
			{
				name: "in_stock",
				label: "In stock",
				type: "bool",
				half: true
			},
			{
				name: "active",
				label: "Shown in builder",
				type: "bool",
				half: true
			},
			{
				name: "sort",
				label: "Display order",
				type: "number",
				half: true
			}
		]
	},
	pc_presets: {
		key: "pc_presets",
		table: "pc_presets",
		label: "PC preset builds",
		singular: "preset",
		orderBy: "sort, id",
		columns: [{
			name: "name",
			label: "Preset"
		}, {
			name: "active",
			label: "Shown",
			type: "bool"
		}],
		publicUrl: () => "/custom-pc-builder",
		fields: [
			{
				name: "name",
				label: "Name",
				type: "text",
				required: true,
				half: true
			},
			{
				name: "slug",
				label: "Preset identifier (Preset ID)",
				type: "slug",
				required: true,
				half: true,
				help: "Unique short ID, e.g. gaming-pc."
			},
			{
				name: "summary",
				label: "Summary",
				type: "textarea",
				rows: 2
			},
			{
				name: "parts",
				label: "Included part IDs",
				type: "list",
				help: "One part ID per line (from Parts & prices, e.g. intel-core-i5-12400)."
			},
			{
				name: "active",
				label: "Shown",
				type: "bool",
				half: true
			},
			{
				name: "sort",
				label: "Display order",
				type: "number",
				half: true
			}
		]
	},
	pc_builds: {
		key: "pc_builds",
		table: "pc_builds",
		label: "PC build requests",
		singular: "build",
		canCreate: false,
		intro: "Saved builds, quote requests and orders from the PC builder. Totals were calculated on the server from catalogue prices.",
		orderBy: "CASE status WHEN 'ordered' THEN 0 WHEN 'quote' THEN 1 ELSE 2 END, id DESC",
		search: [
			"code",
			"name",
			"phone"
		],
		columns: [
			{
				name: "code",
				label: "Build"
			},
			{
				name: "created_at",
				label: "Created",
				type: "date"
			},
			{
				name: "name",
				label: "Customer"
			},
			{
				name: "phone",
				label: "Phone"
			},
			{
				name: "total",
				label: "Total",
				type: "money"
			},
			{
				name: "status",
				label: "Status",
				type: "status"
			}
		],
		publicUrl: (r) => `/custom-pc-builder?build=${r.code}`,
		fields: [
			{
				name: "status",
				label: "Status",
				type: "select",
				options: [
					{
						value: "saved",
						label: "Saved (no request)"
					},
					{
						value: "quote",
						label: "Quote requested"
					},
					{
						value: "quoted",
						label: "Quote sent"
					},
					{
						value: "ordered",
						label: "Order requested"
					},
					{
						value: "closed",
						label: "Closed"
					}
				]
			},
			{
				name: "code",
				label: "Build code",
				type: "readonly",
				half: true
			},
			{
				name: "total",
				label: "Total (₹)",
				type: "readonly",
				half: true
			},
			{
				name: "name",
				label: "Name",
				type: "readonly",
				half: true
			},
			{
				name: "phone",
				label: "Phone",
				type: "readonly",
				half: true
			},
			{
				name: "email",
				label: "Email",
				type: "readonly"
			},
			{
				name: "notes",
				label: "Customer notes",
				type: "readonly"
			},
			{
				name: "summary",
				label: "Build summary",
				type: "readonly"
			}
		]
	},
	enquiries: {
		key: "enquiries",
		table: "enquiries",
		label: "Enquiries",
		singular: "enquiry",
		canCreate: false,
		orderBy: "CASE status WHEN 'new' THEN 0 WHEN 'contacted' THEN 1 ELSE 2 END, id DESC",
		search: [
			"name",
			"phone",
			"topic"
		],
		columns: [
			{
				name: "created_at",
				label: "Received",
				type: "date"
			},
			{
				name: "kind",
				label: "Type"
			},
			{
				name: "name",
				label: "Name"
			},
			{
				name: "phone",
				label: "Phone"
			},
			{
				name: "topic",
				label: "About"
			},
			{
				name: "status",
				label: "Status",
				type: "status"
			}
		],
		fields: [
			{
				name: "status",
				label: "Status",
				type: "select",
				options: [
					{
						value: "new",
						label: "New"
					},
					{
						value: "contacted",
						label: "Contacted"
					},
					{
						value: "closed",
						label: "Closed"
					}
				]
			},
			{
				name: "kind",
				label: "Type",
				type: "readonly",
				half: true
			},
			{
				name: "created_at",
				label: "Received",
				type: "readonly",
				half: true
			},
			{
				name: "name",
				label: "Name",
				type: "readonly",
				half: true
			},
			{
				name: "phone",
				label: "Phone",
				type: "readonly",
				half: true
			},
			{
				name: "email",
				label: "Email",
				type: "readonly",
				half: true
			},
			{
				name: "topic",
				label: "About",
				type: "readonly",
				half: true
			},
			{
				name: "area",
				label: "Area",
				type: "readonly",
				half: true
			},
			{
				name: "preferred",
				label: "Preference",
				type: "readonly",
				half: true
			},
			{
				name: "message",
				label: "Message",
				type: "readonly"
			}
		]
	}
};
//#endregion
export { RESOURCES as t };
