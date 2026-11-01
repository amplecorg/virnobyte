import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import os from "node:os";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import process from "node:process";
//#region src/lib/password.ts
var KEYLEN = 64;
function hashPassword(password) {
	const salt = randomBytes(16);
	const hash = scryptSync(password, salt, KEYLEN, {
		N: 16384,
		r: 8,
		p: 1
	});
	return `scrypt$${salt.toString("base64")}$${hash.toString("base64")}`;
}
function verifyPassword(password, stored) {
	const [scheme, saltB64, hashB64] = stored.split("$");
	if (scheme !== "scrypt" || !saltB64 || !hashB64) return false;
	const expected = Buffer.from(hashB64, "base64");
	const actual = scryptSync(password, Buffer.from(saltB64, "base64"), expected.length, {
		N: 16384,
		r: 8,
		p: 1
	});
	return actual.length === expected.length && timingSafeEqual(actual, expected);
}
//#endregion
//#region src/lib/content/services.ts
var SERVICES = [
	{
		slug: "computer-repair",
		name: "Computer Repair",
		short: "Desktop diagnosis, slow PCs, OS faults, component replacement and business computer support.",
		title: "Computer Repair in Chikhali & Pimpri-Chinchwad | Virnobyte",
		description: "Desktop and computer repair in Chikhali and Pimpri-Chinchwad: hardware diagnosis, slow PCs, Windows faults, component replacement and doorstep support for offices.",
		h1: "Computer Repair Services in Chikhali & Pimpri-Chinchwad",
		intro: `A desktop that won't start, restarts on its own or takes five minutes to open a spreadsheet usually has one clear cause — a failing drive, a weak power supply, overheating, or a corrupted Windows install. Our job is to find that cause before anything is replaced.

Bring your computer to our workshop in Chikhali or book a doorstep visit anywhere in Pimpri-Chinchwad. We test the hardware, check the operating system, and give you an itemised quote. Nothing is changed until you approve it.

For offices with several machines, we can work through them on-site so your team keeps working. If you need regular upkeep rather than one-off fixes, our [IT AMC plans](/services/amc-services) cover scheduled maintenance for every system you own.`,
		problems: [
			"Computer does not power on, or switches off after a few minutes",
			"Very slow start-up, freezing or the spinning wheel on every click",
			"Blue screen errors and automatic restarts",
			"Windows will not boot, update loops or missing system files",
			"Loud fans, burning smell or overheating",
			"No display, distorted display or one monitor not detected",
			"USB ports, audio or network adapter stopped working"
		],
		includes: [
			"Full hardware diagnosis — power supply, RAM, storage, motherboard and cooling",
			"Operating system repair or clean reinstall with drivers",
			"Component replacement with tested parts (SSD, RAM, SMPS, fans, graphics cards)",
			"Dust cleaning and thermal paste replacement",
			"Speed-up work: SSD upgrade, startup clean-up and storage health check",
			"Desktop support for offices, on-site or carry-in"
		],
		benefits: [
			"Diagnosis first, so you only pay for what actually fixes the problem",
			"Itemised quote before work begins — no surprise charges",
			"Tested, genuine components with the manufacturer or shop warranty passed on to you",
			"Your data is left untouched unless you ask us to back it up or move it"
		],
		faqs: [
			{
				q: "How much does computer repair cost in Pune?",
				a: "It depends on the fault. A software clean-up costs far less than a motherboard repair, so we diagnose first and then quote the exact parts and labour. You decide whether to go ahead after you see the quote."
			},
			{
				q: "Do you provide doorstep computer service?",
				a: "Yes. We visit homes and offices in Chikhali, Pimpri-Chinchwad and nearby parts of Pune. Some repairs (board-level work, for example) need workshop equipment, in which case we take the machine with us and tell you when it will be ready."
			},
			{
				q: "Will I lose my files during the repair?",
				a: "Most repairs do not touch your data. If a reinstall or drive replacement is needed, we tell you first and can back up your files before we start."
			}
		],
		image: "virnobyte-computer-repair-cpu",
		group: "Repair & support",
		footer: true
	},
	{
		slug: "laptop-repair",
		name: "Laptop Repair",
		short: "Screen, keyboard, battery, hinge, charging and motherboard repairs for all major brands.",
		title: "Laptop Repair in Chikhali & Pune | Virnobyte",
		description: "Laptop repair in Chikhali, Pimpri-Chinchwad and Pune: screen and keyboard replacement, battery, charging and motherboard repair, plus software fixes.",
		h1: "Professional Laptop Repair Services in Chikhali",
		intro: `Laptops fail in predictable ways: a cracked screen after a fall, keys that stop responding, a battery that lasts twenty minutes, a charging port that only works at one angle. Each of these is fixable, and most are fixable the same week.

At our Chikhali workshop we repair laptops from Dell, HP, Lenovo, Asus, Acer, Apple and other brands. Every job starts with a diagnosis so we can tell you whether a part needs replacing or simply reseating, cleaning or re-soldering.

If your laptop is slow rather than broken, an SSD and RAM upgrade is often cheaper than a new machine — see our [hardware solutions](/services/hardware-solutions). If it has stopped booting and your files matter most, start with [data recovery](/services/data-recovery).`,
		problems: [
			"Cracked, flickering or lined screen",
			"Keyboard keys not working or typing the wrong characters",
			"Battery not charging, draining quickly or swelling",
			"Loose charging port or adapter not detected",
			"Broken hinges or cracked body panels",
			"Laptop overheating and shutting down",
			"Water or liquid spill damage",
			"Laptop on but no display, or stuck at the logo"
		],
		includes: [
			"Laptop screen replacement and display cable repair",
			"Keyboard replacement and repair",
			"Battery replacement with compatible or original batteries",
			"Charging port, DC jack and adapter diagnosis",
			"Hinge and body repair",
			"Motherboard and chip-level repair",
			"Fan cleaning, thermal paste and overheating fixes",
			"Laptop software repair: Windows reinstall, drivers and virus clean-up"
		],
		benefits: [
			"Brand-agnostic repairs — no need to wait weeks for a service centre",
			"Clear advice on whether a repair is worth it for an older laptop",
			"Parts sourced to match your exact model",
			"Pick-up and drop available for homes and offices nearby"
		],
		faqs: [
			{
				q: "Do you provide laptop repair in Chikhali?",
				a: "Yes — our workshop is at Sadichha Complex on Mahadev Temple Road, Jadhav Wadi, Chikhali. You can walk in or call ahead so a technician is ready for your laptop."
			},
			{
				q: "How long does a laptop screen replacement take?",
				a: "If the screen for your model is in stock, usually the same or next working day. Less common panels have to be ordered, and we tell you the expected date before you approve the repair."
			},
			{
				q: "Is it worth repairing an old laptop?",
				a: "Often yes. A failing hard disk or tired battery is inexpensive to replace and an SSD upgrade can make an older laptop feel new. If the repair would cost close to a replacement, we will say so."
			}
		],
		image: "virnobyte-laptop-repair",
		group: "Repair & support",
		footer: true
	},
	{
		slug: "cctv-installation",
		name: "CCTV Installation",
		short: "Home, shop, office and industrial CCTV with DVR/NVR setup, mobile viewing and maintenance.",
		title: "CCTV Installation in Pune & Pimpri-Chinchwad | Virnobyte",
		description: "CCTV camera installation in Pune and Pimpri-Chinchwad for homes, shops, offices and factories — site survey, HD/IP cameras, DVR/NVR setup, mobile viewing and maintenance.",
		h1: "CCTV Installation & Security Camera Solutions",
		intro: `A CCTV system is only useful if the cameras cover the right spots, the footage is clear at night, and someone can actually find a recording when it matters. We plan installations around those three things.

Every job starts with a site visit. We look at entrances, cash counters, parking, blind corners and lighting, then recommend the number and type of cameras — analog HD or IP — along with recording capacity for the number of days you need to keep footage.

We install the cameras, run and dress the cabling, configure the DVR or NVR, and set up live viewing on your phone. After installation, we can look after the system under an [annual maintenance contract](/services/amc-services) so cameras stay clean, aligned and recording.`,
		problems: [
			"Blind spots at gates, counters or parking areas",
			"Grainy or dark footage at night",
			"Recorder full or not saving older footage",
			"Cannot view cameras on the phone",
			"Cameras going offline or showing \"no video\"",
			"Old analog system that needs upgrading"
		],
		includes: [
			"Site survey and camera placement plan",
			"Home CCTV, shop CCTV, office CCTV and industrial CCTV",
			"HD analog and IP camera installation",
			"DVR / NVR setup with hard-disk sizing for your retention needs",
			"Remote monitoring on mobile and desktop",
			"Cabling, conduit and power backup for the recorder",
			"CCTV maintenance, repair and upgrades"
		],
		benefits: [
			"Coverage planned around your actual premises, not a fixed package",
			"Clean, labelled cabling that is easy to maintain later",
			"You are shown how to find, play back and export footage",
			"One local team for installation, service and expansion"
		],
		faqs: [
			{
				q: "Do you install CCTV for businesses?",
				a: "Yes. We install CCTV for shops, offices, clinics, warehouses and small factories, as well as homes and housing societies. Business installations start with a site survey so we can plan coverage and recording properly."
			},
			{
				q: "Can I watch my CCTV cameras on my phone?",
				a: "Yes. We configure the recorder for remote viewing and set up the app on your phone during installation, so you can see live and recorded footage from anywhere with internet access."
			},
			{
				q: "How many days of recording can I keep?",
				a: "It depends on the number of cameras, their resolution and the hard-disk size. We size the storage to the retention period you need and explain the trade-off before installation."
			}
		],
		image: "virnobyte-cctv-installation-pune",
		group: "Security & networks",
		footer: true
	},
	{
		slug: "networking",
		name: "Networking",
		short: "Office LAN, Wi-Fi setup, structured cabling, router and switch configuration, troubleshooting.",
		title: "Networking Services in Pune | LAN & Wi-Fi Solutions | Virnobyte",
		description: "Networking services in Pune and Pimpri-Chinchwad: office LAN installation, Wi-Fi setup, structured cabling, router configuration and troubleshooting.",
		h1: "Networking Services: LAN, Wi-Fi & Structured Cabling",
		intro: `Slow internet in one cabin, Wi-Fi that drops whenever the microwave runs, a printer that only some people can reach — most office network problems come down to placement, configuration or cabling.

We design and install networks for homes and businesses across Pune: structured cabling, switches, routers, access points and network racks. For existing networks we troubleshoot dead spots, IP conflicts, slow speeds and devices that won't connect.

Every installation is labelled and documented, so the next time something changes — a new cabin, more staff, a new internet line — the change is quick. Pair it with [CCTV](/services/cctv-installation) on the same cabling plan to save cost.`,
		problems: [
			"Weak Wi-Fi or dead zones in parts of the office or home",
			"Internet slows down when more people connect",
			"Printers or shared drives not reachable from some computers",
			"Tangled, unlabelled cables that nobody can trace",
			"Frequent disconnections or IP address conflicts",
			"New office or floor that needs a network from scratch"
		],
		includes: [
			"Office LAN design and installation",
			"Wi-Fi setup with access points for full coverage",
			"Structured network cabling, patch panels and racks",
			"Router, switch and firewall configuration",
			"Network troubleshooting and performance tuning",
			"Guest Wi-Fi separation and basic network security",
			"Ongoing business network support"
		],
		benefits: [
			"Coverage planned for the walls and floors you actually have",
			"Labelled cabling and a simple network map handed over",
			"Secure setup: changed default passwords and separated guest access",
			"Easy to extend when your team grows"
		],
		faqs: [
			{
				q: "Do you provide network installation services?",
				a: "Yes — from a single home router setup to full office LAN installations with structured cabling, switches and multiple Wi-Fi access points across Pune and Pimpri-Chinchwad."
			},
			{
				q: "Why is my office Wi-Fi slow even with a fast internet plan?",
				a: "Common causes are a single router covering too large an area, interference from neighbouring networks, outdated equipment or too many devices on one band. A short site check usually pinpoints which one applies."
			},
			{
				q: "Can you fix our existing messy cabling?",
				a: "Yes. We can re-terminate, label and dress existing cables, move equipment into a rack and document the layout so future changes are simple."
			}
		],
		image: "virnobyte-networking-services",
		group: "Security & networks",
		footer: true
	},
	{
		slug: "hardware-solutions",
		name: "Hardware Solutions",
		short: "RAM and SSD upgrades, new and refurbished systems, UPS, peripherals and custom PC builds.",
		title: "Computer Hardware Solutions & Upgrades in Pune | Virnobyte",
		description: "Computer hardware in Pune: SSD and RAM upgrades, new and refurbished laptops and desktops, UPS, printers and custom PC builds, installed for you.",
		h1: "Hardware Solutions, Upgrades & Supply",
		intro: `The right upgrade can add years to a computer. Moving from a hard disk to an SSD alone changes boot time from minutes to seconds, and extra RAM stops the freezing that comes with many browser tabs or accounting software.

We advise on, supply and install hardware for homes and offices — new and refurbished laptops and desktops, SSDs, RAM, graphics cards, UPS units, printers, CCTV equipment and networking gear. If you need a new system, we spec it around what you actually run rather than the most expensive option.

Browse what we commonly stock on the [products page](/products), or tell us what you need and we'll quote it.`,
		problems: [
			"Computer is slow but otherwise works",
			"Not sure which upgrade will make the most difference",
			"Need several matching systems for a new office",
			"Power cuts damaging equipment or losing work",
			"Want a custom PC for design, gaming or CAD work"
		],
		includes: [
			"SSD and RAM upgrades with data migration",
			"New and refurbished laptops and desktops",
			"Custom PC builds for office, design and gaming",
			"UPS sizing and installation",
			"Printers, monitors, keyboards and peripherals",
			"Networking and CCTV equipment supply"
		],
		benefits: [
			"Advice based on your workload, not the highest margin",
			"Installation and data migration handled for you",
			"Warranty documentation kept with your service record",
			"One supplier for hardware and the service that follows"
		],
		faqs: [{
			q: "Will an SSD really speed up my old computer?",
			a: "For most computers still running a hard disk, yes — it is usually the single biggest improvement. We check compatibility first and move your Windows installation and files across."
		}, {
			q: "Do you sell refurbished laptops?",
			a: "Yes. Refurbished systems are tested before sale and we explain the condition, specifications and warranty clearly so you know exactly what you are buying."
		}],
		image: "virnobyte-hardware-solutions",
		group: "Business IT",
		footer: true
	},
	{
		slug: "software-solutions",
		name: "Software Solutions",
		short: "Business software setup, licensing, email, Microsoft 365, accounting software support and automation.",
		title: "Software Solutions & Support for Businesses in Pune | Virnobyte",
		description: "Software solutions for Pune businesses: Microsoft 365 and email setup, licensing, accounting software support, backups, user management and practical automation.",
		h1: "Software Solutions for Homes & Businesses",
		intro: `Software problems cost time quietly: a shared mailbox nobody can access, an accounting package that won't open on the new PC, licences that expired without anyone noticing.

We set up and support the software your business depends on — operating systems, Microsoft 365 or Google Workspace, business email, accounting and billing software, antivirus, backups and user accounts. We also keep track of licences and renewals so nothing lapses unexpectedly.

For one-off installations on a single machine, see [software installation](/services/software-installation). For a fully bespoke setup across your office, see [custom IT solutions](/services/custom-it-solutions).`,
		problems: [
			"Business email not syncing across phone and laptop",
			"Accounting or billing software errors after an update",
			"Expired or unlicensed software on office machines",
			"New employees waiting days for accounts and access",
			"No central backup of important files"
		],
		includes: [
			"Microsoft 365 / Google Workspace setup and migration",
			"Business email configuration on all devices",
			"Genuine Windows and Office licensing",
			"Accounting and billing software installation and support",
			"User accounts, shared folders and permissions",
			"Backup software and scheduled backups"
		],
		benefits: [
			"Genuine licences, documented for audits",
			"Faster onboarding for new staff",
			"Fewer interruptions from updates and sync errors",
			"A single point of contact for software issues"
		],
		faqs: [{
			q: "Can you move our email to Microsoft 365 or Google Workspace?",
			a: "Yes. We plan the migration, move mailboxes, update DNS records and configure every device, usually with minimal downtime for your team."
		}, {
			q: "Do you provide genuine software licences?",
			a: "Yes. We supply genuine Windows, Office and antivirus licences and install them for you, so you are not exposed to unlicensed software risks."
		}],
		image: "virnobyte-software-solutions",
		group: "Business IT",
		footer: true
	},
	{
		slug: "data-recovery",
		name: "Data Recovery",
		short: "Recover files from failed hard disks, SSDs, pen drives, memory cards and deleted partitions.",
		title: "Data Recovery in Pune | HDD & SSD Recovery | Virnobyte",
		description: "Data recovery in Pune from hard disks, SSDs, pen drives and memory cards — deleted files, formatted and failed drives, with an honest assessment first.",
		h1: "Data Recovery from Hard Disks, SSDs & USB Drives",
		intro: `When a drive fails, what you do in the next hour matters more than anything else. Keep the device switched off, don't run recovery apps that write to the same drive, and don't open it up.

We recover data from hard disks, SSDs, pen drives and memory cards — deleted files, accidentally formatted drives, corrupted partitions and drives that are no longer detected. We start with an assessment that tells you what is likely to be recoverable before any paid work begins.

**Recovery is never guaranteed.** The outcome depends on the condition of the storage device — physical damage, overwritten data and SSD TRIM all reduce what can be recovered. We will be clear about the realistic chances. Afterwards, set up [backups](/services/software-solutions) so it doesn't happen again.`,
		problems: [
			"Hard disk not detected or making clicking sounds",
			"Files deleted by mistake or Recycle Bin emptied",
			"Drive formatted accidentally",
			"\"Drive needs to be formatted\" or RAW partition errors",
			"Pen drive or memory card unreadable",
			"Laptop not booting but files are needed urgently"
		],
		includes: [
			"Free initial assessment of the device",
			"Hard disk data recovery (logical faults)",
			"SSD data recovery where TRIM has not erased the data",
			"Deleted file and formatted partition recovery",
			"Pen drive and memory card recovery",
			"Recovered data copied to a new drive you can keep"
		],
		benefits: [
			"An honest assessment before you commit to paid recovery",
			"Your data is handled privately and not shared",
			"Original drive returned to you along with recovered files",
			"Advice on preventing the same loss again"
		],
		faqs: [
			{
				q: "Can you recover data from any hard disk?",
				a: "Not always. Success depends on how the drive failed and whether the data has been overwritten. We assess the drive first and explain what is realistically recoverable before you decide."
			},
			{
				q: "What should I do before sending a hard drive for data recovery?",
				a: "Stop using it. Power it down, do not install recovery software onto it, and do not open the casing. Every write or power cycle can reduce what can be recovered."
			},
			{
				q: "Is SSD data recovery possible?",
				a: "Sometimes. Many SSDs erase deleted data permanently through a feature called TRIM, which makes deleted-file recovery harder than on hard disks. Failed SSDs with intact data have better chances."
			}
		],
		note: "Recovery success depends on the condition of the storage device. We do not promise results before assessing the drive.",
		image: "virnobyte-data-recovery-hard-disk",
		group: "Repair & support",
		footer: true
	},
	{
		slug: "printer-repair",
		name: "Printer Repair",
		short: "Inkjet, laser and thermal printer repair — paper jams, print quality, drums, boards and setup.",
		title: "Printer Repair in Pimpri-Chinchwad & Pune | Virnobyte",
		description: "Printer repair in Pimpri-Chinchwad and Pune for inkjet, laser and thermal printers: paper jams, faded prints, drum and roller replacement, network setup.",
		h1: "Printer Repair for Inkjet, Laser & Thermal Printers",
		intro: `Office printers tend to fail at the worst time — mid-invoice run, or just before a filing deadline. Most faults are mechanical (rollers, fusers, drums) or connectivity-related and can be fixed on-site.

We repair inkjet, laser and thermal printers from HP, Canon, Epson, Brother and other brands. We also set up network printing so everyone in the office can print without passing a USB cable around.`,
		problems: [
			"Frequent paper jams or paper not picking up",
			"Faded, streaky or smudged prints",
			"Error lights or codes on the display",
			"Printer offline or not found on the network",
			"Cartridge or toner not recognised"
		],
		includes: [
			"Roller, fuser, drum and pickup assembly replacement",
			"Print-head cleaning and alignment",
			"Board-level repair for common faults",
			"Network and Wi-Fi printer setup",
			"Thermal and billing printer repair",
			"Cartridge and toner supply"
		],
		benefits: [
			"On-site repair for most office printers",
			"Honest advice when replacement is the better option",
			"Genuine and compatible consumables available"
		],
		faqs: [{
			q: "Do you repair printers on-site?",
			a: "For most jams, roller replacements and connectivity problems, yes. Board-level faults may need the printer to come to our workshop."
		}, {
			q: "Why are my laser prints faded?",
			a: "Usually low toner, a worn drum or a dirty transfer roller. We check each and replace only the part that is causing the problem."
		}],
		image: "virnobyte-printer-repair",
		group: "Repair & support"
	},
	{
		slug: "virus-removal",
		name: "Virus Removal",
		short: "Malware and virus clean-up, pop-up removal, browser hijack fixes and security hardening.",
		title: "Virus Removal & Malware Cleanup in Pune | Virnobyte",
		description: "Virus and malware removal in Pune: deep scans, pop-up and browser hijack fixes, ransomware advice, antivirus setup and security hardening.",
		h1: "Virus Removal & Computer Security Clean-up",
		intro: `Pop-ups that won't go away, a browser homepage that keeps changing, or a computer that suddenly runs hot doing nothing — these are typical signs of malware.

We remove viruses, adware and unwanted programs, repair the damage they leave behind, install proper antivirus, and close the gaps that let the infection in. If files have been encrypted by ransomware, contact us before paying anyone; we'll explain the options and check whether backups or [data recovery](/services/data-recovery) can help.`,
		problems: [
			"Constant pop-ups and unwanted ads",
			"Browser redirects or changed search engine",
			"Unknown programs starting automatically",
			"Files renamed or encrypted",
			"Antivirus disabled and cannot be turned back on"
		],
		includes: [
			"Deep malware scan and removal",
			"Browser clean-up and reset",
			"Antivirus installation and configuration",
			"Windows updates and security settings",
			"Ransomware assessment and backup check"
		],
		benefits: [
			"Clean system without reinstalling where possible",
			"Your files preserved throughout",
			"Clear advice on avoiding re-infection"
		],
		faqs: [{
			q: "Do I need to reinstall Windows to remove a virus?",
			a: "Not usually. Most infections can be cleaned in place. If the system is badly damaged, we back up your files first and then reinstall."
		}],
		image: "virnobyte-virus-removal-security",
		group: "Repair & support"
	},
	{
		slug: "it-consulting",
		name: "IT Consulting",
		short: "IT planning for growing businesses — hardware, networks, security, backups and vendor choices.",
		title: "IT Consulting for Small Businesses in Pune | Virnobyte",
		description: "IT consulting for small and growing businesses in Pune: technology planning, office IT setup, security and backup reviews, vendor selection and budgeting advice.",
		h1: "IT Consulting for Small & Growing Businesses",
		intro: `Most small businesses don't need a full-time IT department — they need someone who understands their setup and can answer "what should we do next?" honestly.

We review your current systems, identify risks (no backups, ageing hardware, weak passwords, single points of failure), and give you a prioritised plan with realistic costs. When you're ready, we can carry out the plan ourselves or work alongside your existing vendors.

Moving into a new office? See our [office IT setup](/portfolio/office-it-setup) work and [networking services](/services/networking).`,
		problems: [
			"No clear picture of what IT the business owns",
			"Unsure whether backups are working",
			"Planning a new office or branch",
			"Rising IT costs without clear benefit"
		],
		includes: [
			"IT health check and risk review",
			"Office IT setup planning",
			"Backup and security review",
			"Hardware and software budgeting",
			"Vendor and quotation review"
		],
		benefits: [
			"Plain-language recommendations ranked by priority",
			"Budgets you can plan around",
			"Independent advice on vendor quotes"
		],
		faqs: [{
			q: "Do we need an AMC or one-off consulting?",
			a: "If you want ongoing upkeep, an AMC is better value. If you need a plan for a specific change — a new office, a move to cloud email — a one-off consultation is usually enough."
		}],
		image: "virnobyte-it-consulting",
		group: "Business IT"
	},
	{
		slug: "amc-services",
		name: "IT AMC Services",
		short: "Annual maintenance contracts for computers, printers, networks and CCTV with scheduled visits.",
		title: "IT AMC Services in Pune | Computer AMC | Virnobyte",
		description: "IT AMC and computer AMC in Pune: preventive maintenance, hardware, software and network support, scheduled visits and priority troubleshooting.",
		h1: "IT AMC: Annual Maintenance Contracts for Businesses",
		intro: `An annual maintenance contract turns IT from a series of emergencies into a schedule. Instead of calling someone when a computer dies, a technician visits regularly to clean, update and check every system — and you get priority support when something does go wrong.

Our IT AMC covers computers, laptops, printers, networks and CCTV. We agree the list of equipment, the visit frequency and the response time up front, so you know exactly what is covered.

AMC plans are built around your equipment count, so pricing is quoted after a short survey. Individuals and very small offices may find a [membership card](/membership) a better fit.`,
		problems: [
			"Repeated breakdowns disrupting work",
			"No record of what was serviced and when",
			"Waiting days for a technician during emergencies",
			"Unpredictable repair bills"
		],
		includes: [
			"Preventive maintenance visits on an agreed schedule",
			"Hardware support for computers, laptops and printers",
			"Software support, updates and antivirus checks",
			"Network support and troubleshooting",
			"CCTV health checks",
			"Service log for every visit",
			"Priority response for breakdowns"
		],
		benefits: [
			"Fewer breakdowns and less downtime",
			"Predictable annual IT costs",
			"Business continuity through regular backup checks",
			"One accountable team that knows your setup"
		],
		faqs: [{
			q: "Do you provide annual IT maintenance contracts?",
			a: "Yes. We offer AMC for offices, shops, clinics and schools in Pune and Pimpri-Chinchwad, covering computers, printers, networks and CCTV."
		}, {
			q: "What is not covered in an AMC?",
			a: "Replacement parts and consumables are usually charged separately unless agreed otherwise. Your contract lists exactly what is and is not included."
		}],
		image: "virnobyte-amc-services",
		group: "Business IT",
		footer: true
	},
	{
		slug: "inverter-installation",
		name: "Inverter Installation",
		short: "Inverter and battery installation, UPS for computers, wiring and power-backup maintenance.",
		title: "Inverter & UPS Installation in Pimpri-Chinchwad | Virnobyte",
		description: "Inverter, battery and UPS installation in Pimpri-Chinchwad and Pune for homes, shops and offices — load assessment, wiring, installation and maintenance.",
		h1: "Inverter, Battery & UPS Installation",
		intro: `Power cuts and voltage fluctuations are among the most common causes of damaged computers, corrupted drives and lost work. The right backup depends on what you need to keep running and for how long.

We assess your load — computers, routers, CCTV recorders, lights and fans — and recommend an inverter, battery or online UPS that matches. Then we install it with proper wiring and earthing, and maintain it so the batteries last.`,
		problems: [
			"Computers shutting down during power cuts",
			"CCTV recorder losing footage when power drops",
			"Inverter backup time much shorter than before",
			"Battery needs frequent topping up"
		],
		includes: [
			"Load assessment and sizing",
			"Inverter and battery installation",
			"UPS for computers, servers and networking equipment",
			"Wiring and changeover",
			"Battery health checks and maintenance"
		],
		benefits: [
			"Equipment protected from cuts and fluctuations",
			"Backup sized to what you actually need",
			"Safe, tidy installation"
		],
		faqs: [{
			q: "What size inverter do I need?",
			a: "It depends on the total load you want to run and the backup time you need. We list your appliances, calculate the load and recommend the inverter and battery capacity."
		}],
		image: "virnobyte-circuit-board",
		group: "Business IT"
	},
	{
		slug: "software-installation",
		name: "Software Installation",
		short: "Windows installation, drivers, Office, antivirus and licensed software set up correctly.",
		title: "Software & Windows Installation in Chikhali | Virnobyte",
		description: "Windows and software installation in Chikhali and Pimpri-Chinchwad: OS install, drivers, Microsoft Office, antivirus and licensed software.",
		h1: "Windows & Software Installation",
		intro: `A clean, correctly configured installation saves hours of troubleshooting later. We install Windows with the right drivers for your hardware, set up Office and the software you use every day, activate genuine licences and move your files back in place.

For business-wide software setup — email, user accounts and backups — see [software solutions](/services/software-solutions).`,
		problems: [
			"New computer needs setting up",
			"Windows corrupted or too slow to use",
			"Missing drivers — no Wi-Fi, sound or display resolution",
			"Software asks for activation or shows licence warnings"
		],
		includes: [
			"Windows installation and updates",
			"Driver installation for all hardware",
			"Microsoft Office and productivity software",
			"Antivirus installation",
			"Software licensing and activation",
			"File and settings transfer"
		],
		benefits: [
			"A clean system that runs the way it should",
			"Genuine, activated software",
			"Files and settings carried over"
		],
		faqs: [{
			q: "Will reinstalling Windows delete my files?",
			a: "A clean install does replace the system drive, so we back up your files first and restore them afterwards."
		}],
		image: "virnobyte-software-installation",
		group: "Repair & support"
	},
	{
		slug: "custom-it-solutions",
		name: "Custom IT Solutions",
		short: "Servers, NAS, cloud backup, rack installation and complete IT setups designed for your business.",
		title: "Custom IT Solutions for Businesses in Pune | Virnobyte",
		description: "Custom IT solutions in Pune: servers, NAS storage, cloud backup, rack installation, office IT infrastructure and complete setups designed around how your business works.",
		h1: "Custom IT Solutions & Infrastructure",
		intro: `Some requirements don't fit a standard service — a shared file server for a design studio, off-site backup for a clinic, a small server rack for a growing office, or a complete IT setup for a new branch.

We design these solutions around how your team works, then supply, install and support them. The aim is always the simplest setup that does the job reliably.`,
		problems: [
			"Files scattered across individual computers",
			"No off-site copy of business data",
			"Outgrowing a single router and a few PCs",
			"Opening a new branch or office"
		],
		includes: [
			"File servers and NAS storage",
			"Cloud and off-site backup",
			"Server rack and IT room setup",
			"Complete office IT infrastructure",
			"Remote access for staff"
		],
		benefits: [
			"Designed around your workflow",
			"Supplied, installed and supported by one team",
			"Documented so it can grow with you"
		],
		faqs: [{
			q: "Can you set up a shared drive for our office?",
			a: "Yes. Depending on your size, we recommend either a NAS device or a cloud-based shared drive, set up with the right permissions for each team member."
		}],
		image: "virnobyte-custom-it-solutions-server",
		group: "Business IT"
	},
	{
		slug: "website-development",
		name: "3D Website Development",
		short: "Interactive 3D futuristic websites, Three.js & WebGL animations, 4K high-resolution visuals and modern web engineering.",
		title: "3D Futuristic Website & Three.js Web Development | Virnobyte",
		description: "Futuristic 3D website development in Pune: WebGL & Three.js interactive experiences, ultra-sharp 4K visual assets, 3D product configurators, and blazing-fast performance.",
		h1: "3D Futuristic Website & WebGL Development",
		intro: `Standard static websites are no longer enough to leave a lasting impression in a high-tech digital economy. We engineer cutting-edge, 3D futuristic websites powered by **Three.js, WebGL, WebGPU, and modern reactive frameworks** that elevate your brand into an interactive, spatial experience.

From real-time 3D product configurators and particle effects to smooth physics simulations and ultra-high-resolution 4K asset rendering, our websites deliver cinematic visual fidelity without compromising loading speed or search engine rankings.

Every 3D web experience is optimized from the ground up: mesh compression (Draco/KTX2), adaptive Level-of-Detail (LOD), dynamic lighting shaders, and hardware-accelerated 60+ FPS performance across both smartphones and 4K desktop monitors.

Whether you are launching an innovative tech startup, an architectural studio, an e-commerce showcase, or a modern business ready for a next-generation web presence, our Pune development team designs, models, and ships the full production build.`,
		problems: [
			"Flat, outdated 2D websites that fail to differentiate your brand from competitors",
			"Heavy, unoptimized 3D models and bloated images that cause slow page loads and mobile lag",
			"Pixelated, blurry graphics on high-DPI Retina and 4K desktop screens",
			"Inability for online customers to inspect or configure complex physical products in 3D",
			"High bounce rates due to lack of interactive visual engagement",
			"Concerns that rich 3D graphics will harm SEO rankings and mobile responsiveness"
		],
		includes: [
			"Custom Three.js, WebGL & WebGPU 3D canvas development with interactive camera controls",
			"Ultra-sharp 4K high-resolution texture mapping and Physically Based Rendering (PBR)",
			"Interactive 3D product showcases with 360-degree rotation, zoom, and exploded views",
			"Futuristic UI/UX design: glowing accents, cyber grids, micro-animations, and glassmorphism",
			"GPU & mobile optimization: Draco geometry compression, LOD scaling, and 60+ FPS stability",
			"Full-stack architecture: lightning-fast SSR, clean SEO metadata, and CDN asset delivery",
			"Integration with contact forms, CRM, booking engines, and payment gateways",
			"Responsive design across iOS, Android, tablets, laptops, and ultra-wide 4K monitors"
		],
		benefits: [
			"Unrivalled visitor engagement that keeps prospects exploring your website significantly longer",
			"Photorealistic 4K clarity on high-resolution displays engineered for rapid loading",
			"SEO-friendly SSR structure: Googlebot indexes all copy while users enjoy full 3D interactivity",
			"Direct development by engineers experienced in 3D mathematics, shader pipelines, and web performance",
			"Turnkey delivery: 3D asset optimization, UI design, hosting setup, and long-term support"
		],
		faqs: [
			{
				q: "Will a 3D futuristic website run smoothly on budget smartphones?",
				a: "Yes. We build adaptive WebGL experiences using dynamic resolution scaling, low-draw-call geometry, and Draco compression. If a device has an entry-level GPU or battery-saver mode enabled, the scene gracefully adjusts detail levels to maintain a smooth 60 FPS framerate."
			},
			{
				q: "How do you handle 4K high-resolution visual assets without slowing down the site?",
				a: "We use modern next-gen image and texture pipelines including WebP/AVIF textures, mipmapping, and progressive asset streaming. Crucial visual textures load in crisp 4K fidelity while assets are fetched asynchronously in the background so initial load time stays under 2 seconds."
			},
			{
				q: "Do 3D Three.js websites affect SEO and Google search rankings?",
				a: "No, they actually boost SEO. We separate the 3D WebGL canvas from the semantic HTML layer. All text, titles, headings, and schema markup are server-rendered and instantly crawled by search engines, while longer user dwell time positively signals engagement to Google."
			},
			{
				q: "Can you convert our existing product models or CAD files into web 3D?",
				a: "Yes. We optimize CAD/STEP, OBJ, FBX, or Blender files into lightweight web-standard GLTF/GLB models, apply realistic PBR materials, and add lighting and interactions."
			},
			{
				q: "What is the typical timeline and process for a 3D website project?",
				a: "A typical project spans 2 to 4 weeks: Phase 1 covers concept design and 3D scene architecture; Phase 2 builds the interactive Three.js components and UI; Phase 3 focuses on cross-device performance optimization, SEO, and launch."
			}
		],
		note: "Built with Three.js, WebGL and 4K asset optimization for buttery smooth 60 FPS across desktop and mobile.",
		image: "virnobyte-gaming-pc-build",
		group: "Business IT",
		footer: true
	}
];
//#endregion
//#region src/lib/content/posts.ts
var POSTS = [
	{
		slug: "how-to-choose-a-computer-repair-service-in-pune",
		title: "How to Choose a Computer Repair Service in Pune",
		description: "Six practical checks before you hand over your computer or laptop for repair in Pune — from diagnosis and quotes to data privacy and warranty.",
		image: "virnobyte-technician-computer-repair",
		related: ["computer-repair", "laptop-repair"],
		published_at: "2026-09-15",
		body: `Handing over a computer means handing over your work, your photos and often your business records. A good repair service makes that feel safe. Here is what to check before you choose one.

## 1. They diagnose before they quote

A reliable technician will not quote a price for "slow computer" over the phone. Slowness can be a full drive, a failing hard disk, malware or overheating — each with a very different cost. Look for a shop that inspects the machine first and then gives you an itemised quote.

## 2. The quote is itemised and approved by you

You should see parts and labour listed separately, and nothing should be replaced until you say yes. If the shop finds something new during the repair, they should call you before going further.

## 3. They respect your data

Ask how your files are handled. Most repairs don't touch your data at all. If a reinstall or drive replacement is needed, the technician should tell you and offer to back up your files first. Your files should never be copied or browsed without reason.

## 4. Parts are tested and the warranty is clear

Ask whether parts are new, refurbished or compatible, and what warranty applies. A good shop tells you this without being asked.

## 5. They will tell you when a repair isn't worth it

If fixing a seven-year-old laptop will cost close to a new one, an honest technician will say so — and may suggest an [SSD and RAM upgrade](/services/hardware-solutions) as a cheaper middle path.

## 6. They are easy to reach after the repair

Problems sometimes return. A local shop with a fixed address and a working phone number is much easier to go back to than a pick-up service you can't trace.

## Where Virnobyte fits

Our workshop is in Chikhali, Pimpri-Chinchwad, and we visit homes and offices across Pune. Every [computer repair](/services/computer-repair) and [laptop repair](/services/laptop-repair) job starts with a diagnosis and an itemised quote. Call or WhatsApp us to describe the problem and we will tell you whether it needs a visit or a workshop check.`
	},
	{
		slug: "common-laptop-problems-and-solutions",
		title: "Common Laptop Problems and How They Are Fixed",
		description: "The laptop faults we see most often — battery drain, overheating, broken screens, keyboard failures, charging problems — what causes them and what fixing them involves.",
		image: "virnobyte-laptop-workspace",
		related: [
			"laptop-repair",
			"hardware-solutions",
			"data-recovery"
		],
		published_at: "2026-09-22",
		body: `Most laptop faults fall into a handful of familiar patterns. Knowing which one you have helps you decide whether it's a quick fix or a bigger repair.

## Battery drains quickly or won't charge

Laptop batteries wear out after a few hundred charge cycles. If yours lasts a fraction of what it used to, the battery likely needs replacing. If it doesn't charge at all, the cause can also be the adapter, the charging port or the charging circuit on the board — which is why diagnosis matters.

**Watch out for:** a battery that bulges or lifts the touchpad. Stop using the laptop and get it checked; swollen batteries are a safety risk.

## Overheating and sudden shutdowns

Dust blocks the fan and heatsink over time, and the thermal paste between the processor and heatsink dries out. Cleaning and re-pasting usually brings temperatures back to normal and stops the shutdowns.

## Cracked or flickering screen

A crack needs a replacement panel matched to your model. Flickering or lines that change when you move the lid often point to a damaged display cable instead, which is a cheaper repair.

## Keyboard keys not working

Spills are the usual cause. On many models the keyboard is replaced as one unit; on some it is riveted to the top case, which affects cost and time.

## Laptop is slow

Before buying a new laptop, check the storage. Many slow laptops still run on hard disks. Moving to an SSD — and adding RAM where the board allows it — is often the most cost-effective upgrade. See [hardware solutions](/services/hardware-solutions).

## Laptop won't turn on at all

This can be anything from a dead adapter to a motherboard fault. If your files are the priority, say so up front: the drive can usually be removed and read separately, and [data recovery](/services/data-recovery) can begin while the laptop itself is being repaired.

## Getting it fixed

Our [laptop repair](/services/laptop-repair) service covers all of the above for Dell, HP, Lenovo, Asus, Acer, Apple and other brands, at our Chikhali workshop or with pick-up from nearby homes and offices.`
	},
	{
		slug: "how-to-maintain-office-computers",
		title: "How to Maintain Office Computers: A Practical Checklist",
		description: "A simple weekly, monthly and yearly maintenance checklist for small office computers that reduces breakdowns and keeps data safe.",
		image: "virnobyte-office-it-setup",
		related: [
			"amc-services",
			"computer-repair",
			"it-consulting"
		],
		published_at: "2026-09-29",
		body: `Most office computer breakdowns are preventable. A little routine maintenance — done consistently — keeps machines running longer and protects your data.

## Every week

- **Restart computers** at least once. Many updates only finish on restart.
- **Check backups ran.** Open the backup tool or drive and confirm there is a recent copy.
- **Keep desks clear** around the computer's vents.

## Every month

- **Install Windows and software updates** that are waiting.
- **Check antivirus** is active and its definitions are current.
- **Free up storage** — empty Downloads folders and remove unused programs.
- **Review user accounts** and remove access for anyone who has left.

## Every six months

- **Clean dust** from vents, fans and keyboards.
- **Check drive health.** Early warning signs of a failing drive are worth acting on before files are lost.
- **Test a restore** from backup — a backup you can't restore isn't a backup.

## Every year

- **Review hardware age.** Plan replacements for machines approaching five years.
- **Renew licences** for Windows, Office, antivirus and business software before they lapse.
- **Check power protection.** UPS batteries weaken over time.

## When to hand it over

If you have more than a handful of computers, this list takes real time every month. An [IT AMC](/services/amc-services) means a technician does it on a schedule and keeps a log of every visit. For one-off problems, our [computer repair](/services/computer-repair) team can help; for a broader plan, start with [IT consulting](/services/it-consulting).`
	},
	{
		slug: "how-often-should-cctv-systems-be-serviced",
		title: "How Often Should a CCTV System Be Serviced?",
		description: "What CCTV maintenance involves, how often cameras and recorders should be checked, and the warning signs that a system needs attention now.",
		image: "virnobyte-cctv-installation-pune",
		related: ["cctv-installation", "amc-services"],
		published_at: "2026-10-02",
		body: `A CCTV system can look fine on the monitor and still fail when you need it — a recorder that stopped saving footage weeks ago, or a camera that has slowly drifted away from the gate.

## A sensible schedule

For most homes and small businesses, a **professional check every six months** is a good baseline. Busy commercial sites, dusty industrial areas and outdoor-heavy installations benefit from **quarterly** checks.

## What a service visit covers

- **Recording check:** confirm every camera is recording and that footage goes back as many days as expected.
- **Hard-disk health:** recorders write continuously, and their drives wear out. A failing disk is the most common reason footage is missing.
- **Lens cleaning and alignment:** dust, spider webs and bumps reduce image quality and shift the field of view.
- **Night vision test:** infrared LEDs weaken over time.
- **Cable and connector inspection:** outdoor connectors corrode, especially through the monsoon.
- **Remote viewing:** confirm the mobile app still connects.
- **Date and time:** a wrong timestamp can make footage useless as evidence.

## Signs it needs attention now

- A camera shows "no video" or a black screen
- Playback has gaps or only goes back a day or two
- Night footage is grey or blurry
- The app on your phone can't connect

## Getting it done

We service systems we installed and ones we didn't. For predictable upkeep, add CCTV to an [IT AMC](/services/amc-services). If you're planning a new system or an upgrade, see [CCTV installation](/services/cctv-installation).`
	},
	{
		slug: "benefits-of-it-amc-for-small-businesses",
		title: "Benefits of an IT AMC for Small Businesses",
		description: "What an IT annual maintenance contract covers, how it compares with paying per repair, and how to tell whether your business needs one.",
		image: "virnobyte-amc-services",
		related: [
			"amc-services",
			"it-consulting",
			"networking"
		],
		published_at: "2026-10-04",
		body: `For a small business, every hour a computer, printer or network is down is an hour of lost work. An IT AMC (annual maintenance contract) is designed to make those hours rarer and shorter.

## What an IT AMC typically includes

- Scheduled preventive maintenance visits
- Hardware and software troubleshooting
- Network and printer support
- Antivirus, update and backup checks
- A log of every visit and fix
- Priority response when something breaks

Parts and consumables are usually billed separately — a good contract states this clearly.

## AMC vs paying per repair

**Paying per repair** works if you have one or two computers and rarely have problems. **An AMC** makes sense once you have several systems, depend on a network or shared printer, or simply can't afford unplanned downtime. The real value is preventive: dust cleaning, drive checks and timely updates stop many faults from happening at all.

## Business continuity

An AMC technician who visits regularly gets to know your setup, which makes emergencies faster to resolve. Regular backup checks also mean that if a drive does fail, your data is already safe somewhere else.

## Is it right for you?

Consider an AMC if:

- you have five or more computers or a shared network
- the same problems keep coming back
- nobody in-house "owns" IT
- you've lost work to a failure before

Our [IT AMC services](/services/amc-services) cover computers, printers, [networks](/services/networking) and CCTV across Pune and Pimpri-Chinchwad. If you're not sure what you need, start with a short [IT consulting](/services/it-consulting) review.`
	},
	{
		slug: "what-to-do-before-sending-a-hard-drive-for-data-recovery",
		title: "What to Do Before Sending a Hard Drive for Data Recovery",
		description: "The steps that protect your chances of getting data back from a failed or deleted drive — and the common mistakes that make recovery harder.",
		image: "virnobyte-hard-disk-drive",
		related: ["data-recovery", "software-solutions"],
		published_at: "2026-10-06",
		body: `When a drive fails or files disappear, the instinct is to try everything at once. Unfortunately, many of those attempts reduce what can be recovered.

## Do this

1. **Stop using the drive immediately.** Every new file written can overwrite deleted data.
2. **Power it down** if the drive is clicking, buzzing or not detected. Repeated power cycles can worsen physical damage.
3. **Note what happened** — dropped, liquid spill, sudden power cut, accidental format. This helps the technician choose the right approach.
4. **List the files that matter most** so recovery can focus on them first.
5. **Keep the drive in a dry, padded container** while transporting it.

## Avoid this

- Installing recovery software onto the same drive
- Running disk-repair utilities that "fix" the file system
- Opening the drive casing
- Putting the drive in the freezer (an old myth that causes condensation damage)
- Formatting the drive because Windows suggests it

## What to expect

A proper data recovery service will assess the drive first and tell you what is realistically recoverable. Outcomes depend on the drive's condition: physical damage, overwritten data and TRIM on SSDs all reduce what can be retrieved. Be cautious of anyone who guarantees full recovery before seeing the device.

## After recovery

Set up automatic backups so one failure never costs you everything again — our [software solutions](/services/software-solutions) team can configure them. For recovery itself, see [data recovery](/services/data-recovery).`
	}
];
//#endregion
//#region src/lib/content/pages.ts
var PAGES = [
	{
		slug: "privacy-policy",
		title: "Privacy Policy",
		description: "How Virnobyte collects, uses and protects personal information shared through our website, enquiries, repairs and membership cards.",
		body: `This policy explains what personal information Virnobyte collects, why we collect it and how we look after it. It applies to this website, to enquiries you send us and to repair, AMC and membership services.

## Information we collect

- **Contact details** you give us — name, phone number, email address and service address — when you send an enquiry, book a service, apply for a job or create an account.
- **Membership details** — your plan, card number, validity dates, doorstep visits used and coin balance.
- **Service records** — the device, the fault reported and the work carried out.
- **Basic technical data** such as the pages you visit, collected to keep the website secure and working.

## How we use it

- To respond to enquiries and carry out the service you asked for
- To manage your membership card, coins and service history
- To contact you about your job, quote or membership renewal
- To meet legal, tax and accounting obligations

We do not sell your personal information.

## Data on your devices

When you hand over a device for repair, we access only what is needed to diagnose and fix it. We do not browse, copy or keep your files unless you ask us to back them up or recover them, and recovered data is handed only to you.

## Sharing

We share information only with service providers who help us run the business (for example, hosting or messaging providers), and only as needed. We may disclose information where required by law.

## Retention

We keep records for as long as needed to provide the service and to meet legal obligations, then delete or anonymise them.

## Your choices

You can ask us to see, correct or delete your personal information by contacting us using the details on our [contact page](/contact).

## Changes

We may update this policy. The date at the top of the page shows when it last changed.`
	},
	{
		slug: "terms-and-conditions",
		title: "Terms & Conditions",
		description: "Terms for Virnobyte repair services, AMC contracts, CCTV and inverter installation, product warranty and membership cards.",
		body: `These terms apply to services and products provided by Virnobyte. By booking a service, buying a product or activating a membership card, you agree to them.

## General

- Every repair begins with a diagnosis. We share an itemised quote and start work only after your approval.
- If we find an additional fault during the repair, we contact you before doing further work.
- Estimated completion times depend on part availability and are shared at the time of the quote.
- Please back up your data before handing over a device where possible. We take care with every device, but we are not responsible for data loss arising from a pre-existing fault.

## Repair — CPU, desktop and laptop

- Replaced parts carry the warranty provided by the part's manufacturer or supplier, which we explain when quoting.
- Warranty does not cover physical damage, liquid damage or faults caused by tampering after the repair.
- Devices not collected within 60 days of the completion notice may be subject to storage charges.

## Annual Maintenance Contract (AMC)

- The equipment covered, visit frequency and response times are listed in your AMC agreement.
- Spare parts and consumables are chargeable unless your agreement states otherwise.
- The AMC covers equipment in working condition at the start of the contract.

## CCTV installation

- The installation scope (cameras, recorder, cabling) is confirmed in the quote after the site survey.
- Equipment warranty is as provided by the manufacturer. Installation workmanship issues reported soon after installation are corrected free of charge.

## Inverter and battery installation

- Battery warranty is as provided by the battery manufacturer and depends on following the maintenance guidance shared at installation.

## Branded goods warranty

- Branded products are covered by the manufacturer's warranty. We help you raise warranty claims for products bought from us.

## Membership cards and coins

- Membership benefits apply for the validity period printed on your card.
- Doorstep visits are limited to the number included in your plan.
- Coins are credited when a membership is activated and may be redeemed under the coin rules shown on the membership page. Coins have no cash value and are not transferable.
- Virnobyte may update the membership benefits for new memberships; active cards keep the benefits they were issued with.

## Contact

Questions about these terms? Reach us through the [contact page](/contact).`
	},
	{
		slug: "company-profile",
		title: "Company Profile",
		description: "Virnobyte company profile: IT services, computer repair, CCTV and networking company based in Chikhali, Pimpri-Chinchwad, serving Pune since 2014.",
		body: `Virnobyte is a hardware, networking and IT services company based in Chikhali, Pimpri-Chinchwad. Since 2014 we have repaired, installed and supported technology for homes, shops, offices and growing businesses across Pune.

## What we do

- **Repair and support** — computers, laptops, printers, virus removal, software installation and data recovery
- **Security and networks** — CCTV installation, LAN and Wi-Fi networking, structured cabling
- **Business IT** — IT AMC, consulting, custom infrastructure, hardware supply and power backup

## How we work

Diagnosis first, an itemised quote before work starts, tested components, and plain-language explanations of what was done. For regular customers we offer membership cards with doorstep visits and coins, and AMC contracts for businesses.

## Products we supply

New and refurbished laptops and desktops, printers, CCTV systems, networking equipment, RAM, SSDs, UPS units and other hardware.`
	}
];
//#endregion
//#region src/lib/content/pcparts.ts
var AM4 = "AM4";
var AM5 = "AM5";
var LGA = "LGA1700";
var ALL_SOCKETS = [
	LGA,
	AM4,
	AM5
];
var PC_PARTS = [
	{
		slug: "intel-core-i3-12100f",
		category: "cpu",
		brand: "Intel",
		name: "Intel Core i3-12100F",
		price: 7500,
		specs: {
			socket: LGA,
			cores: 4,
			threads: 8,
			base_ghz: 3.3,
			boost_ghz: 4.3,
			tdp: 58,
			igpu: false,
			cooler_included: true
		}
	},
	{
		slug: "intel-core-i5-12400",
		category: "cpu",
		brand: "Intel",
		name: "Intel Core i5-12400",
		price: 13500,
		specs: {
			socket: LGA,
			cores: 6,
			threads: 12,
			base_ghz: 2.5,
			boost_ghz: 4.4,
			tdp: 65,
			igpu: "UHD 730",
			cooler_included: true
		}
	},
	{
		slug: "intel-core-i5-14400f",
		category: "cpu",
		brand: "Intel",
		name: "Intel Core i5-14400F",
		price: 16500,
		specs: {
			socket: LGA,
			cores: 10,
			threads: 16,
			base_ghz: 2.5,
			boost_ghz: 4.7,
			tdp: 65,
			igpu: false,
			cooler_included: true
		}
	},
	{
		slug: "intel-core-i7-14700k",
		category: "cpu",
		brand: "Intel",
		name: "Intel Core i7-14700K",
		price: 36e3,
		specs: {
			socket: LGA,
			cores: 20,
			threads: 28,
			base_ghz: 3.4,
			boost_ghz: 5.6,
			tdp: 125,
			igpu: "UHD 770",
			cooler_included: false
		}
	},
	{
		slug: "amd-ryzen-5-5600",
		category: "cpu",
		brand: "AMD",
		name: "AMD Ryzen 5 5600",
		price: 10500,
		specs: {
			socket: AM4,
			cores: 6,
			threads: 12,
			base_ghz: 3.5,
			boost_ghz: 4.4,
			tdp: 65,
			igpu: false,
			cooler_included: true
		}
	},
	{
		slug: "amd-ryzen-5-7600",
		category: "cpu",
		brand: "AMD",
		name: "AMD Ryzen 5 7600",
		price: 19500,
		specs: {
			socket: AM5,
			cores: 6,
			threads: 12,
			base_ghz: 3.8,
			boost_ghz: 5.1,
			tdp: 65,
			igpu: "Radeon Graphics",
			cooler_included: true
		}
	},
	{
		slug: "amd-ryzen-7-7800x3d",
		category: "cpu",
		brand: "AMD",
		name: "AMD Ryzen 7 7800X3D",
		price: 34e3,
		specs: {
			socket: AM5,
			cores: 8,
			threads: 16,
			base_ghz: 4.2,
			boost_ghz: 5,
			tdp: 120,
			igpu: "Radeon Graphics",
			cooler_included: false
		}
	},
	{
		slug: "amd-ryzen-9-7900x",
		category: "cpu",
		brand: "AMD",
		name: "AMD Ryzen 9 7900X",
		price: 36500,
		specs: {
			socket: AM5,
			cores: 12,
			threads: 24,
			base_ghz: 4.7,
			boost_ghz: 5.6,
			tdp: 170,
			igpu: "Radeon Graphics",
			cooler_included: false
		}
	},
	{
		slug: "msi-pro-h610m-e-ddr4",
		category: "motherboard",
		brand: "MSI",
		name: "MSI PRO H610M-E DDR4",
		price: 7200,
		specs: {
			socket: LGA,
			chipset: "H610",
			form_factor: "mATX",
			ram_type: "DDR4",
			ram_slots: 2,
			max_ram_gb: 64,
			m2_slots: 1,
			sata_ports: 4,
			pcie_x16: 1,
			wifi: false
		}
	},
	{
		slug: "gigabyte-b760m-ds3h-ddr4",
		category: "motherboard",
		brand: "Gigabyte",
		name: "Gigabyte B760M DS3H DDR4",
		price: 10800,
		specs: {
			socket: LGA,
			chipset: "B760",
			form_factor: "mATX",
			ram_type: "DDR4",
			ram_slots: 4,
			max_ram_gb: 128,
			m2_slots: 2,
			sata_ports: 4,
			pcie_x16: 1,
			wifi: false
		}
	},
	{
		slug: "asus-tuf-b760-plus-wifi-d5",
		category: "motherboard",
		brand: "ASUS",
		name: "ASUS TUF Gaming B760-Plus WiFi D5",
		price: 18500,
		specs: {
			socket: LGA,
			chipset: "B760",
			form_factor: "ATX",
			ram_type: "DDR5",
			ram_slots: 4,
			max_ram_gb: 192,
			m2_slots: 3,
			sata_ports: 4,
			pcie_x16: 2,
			wifi: true
		}
	},
	{
		slug: "msi-mag-z790-tomahawk-wifi",
		category: "motherboard",
		brand: "MSI",
		name: "MSI MAG Z790 Tomahawk WiFi",
		price: 27500,
		specs: {
			socket: LGA,
			chipset: "Z790",
			form_factor: "ATX",
			ram_type: "DDR5",
			ram_slots: 4,
			max_ram_gb: 192,
			m2_slots: 4,
			sata_ports: 7,
			pcie_x16: 2,
			wifi: true
		}
	},
	{
		slug: "gigabyte-b550m-ds3h",
		category: "motherboard",
		brand: "Gigabyte",
		name: "Gigabyte B550M DS3H",
		price: 8900,
		specs: {
			socket: AM4,
			chipset: "B550",
			form_factor: "mATX",
			ram_type: "DDR4",
			ram_slots: 4,
			max_ram_gb: 128,
			m2_slots: 2,
			sata_ports: 4,
			pcie_x16: 1,
			wifi: false
		}
	},
	{
		slug: "msi-b650m-gaming-plus-wifi",
		category: "motherboard",
		brand: "MSI",
		name: "MSI B650M Gaming Plus WiFi",
		price: 15500,
		specs: {
			socket: AM5,
			chipset: "B650",
			form_factor: "mATX",
			ram_type: "DDR5",
			ram_slots: 4,
			max_ram_gb: 192,
			m2_slots: 2,
			sata_ports: 4,
			pcie_x16: 1,
			wifi: true
		}
	},
	{
		slug: "gigabyte-b650-aorus-elite-ax",
		category: "motherboard",
		brand: "Gigabyte",
		name: "Gigabyte B650 Aorus Elite AX",
		price: 21500,
		specs: {
			socket: AM5,
			chipset: "B650",
			form_factor: "ATX",
			ram_type: "DDR5",
			ram_slots: 4,
			max_ram_gb: 192,
			m2_slots: 3,
			sata_ports: 4,
			pcie_x16: 1,
			wifi: true
		}
	},
	{
		slug: "asus-rog-strix-b650e-i",
		category: "motherboard",
		brand: "ASUS",
		name: "ASUS ROG Strix B650E-I Gaming WiFi",
		price: 29500,
		specs: {
			socket: AM5,
			chipset: "B650E",
			form_factor: "ITX",
			ram_type: "DDR5",
			ram_slots: 2,
			max_ram_gb: 96,
			m2_slots: 2,
			sata_ports: 2,
			pcie_x16: 1,
			wifi: true
		}
	},
	{
		slug: "ddr4-8gb-3200",
		category: "ram",
		brand: "Crucial",
		name: "Crucial 8 GB DDR4-3200 (1×8)",
		price: 1700,
		specs: {
			type: "DDR4",
			capacity_gb: 8,
			modules: 1,
			speed_mts: 3200,
			rgb: false,
			height_mm: 31
		}
	},
	{
		slug: "ddr4-16gb-3200",
		category: "ram",
		brand: "Kingston",
		name: "Kingston Fury Beast 16 GB DDR4-3200 (2×8)",
		price: 3600,
		specs: {
			type: "DDR4",
			capacity_gb: 16,
			modules: 2,
			speed_mts: 3200,
			rgb: false,
			height_mm: 34
		}
	},
	{
		slug: "ddr4-32gb-3600-rgb",
		category: "ram",
		brand: "Corsair",
		name: "Corsair Vengeance RGB Pro 32 GB DDR4-3600 (2×16)",
		price: 7800,
		specs: {
			type: "DDR4",
			capacity_gb: 32,
			modules: 2,
			speed_mts: 3600,
			rgb: true,
			height_mm: 51
		}
	},
	{
		slug: "ddr5-16gb-5600",
		category: "ram",
		brand: "Kingston",
		name: "Kingston Fury Beast 16 GB DDR5-5600 (2×8)",
		price: 5200,
		specs: {
			type: "DDR5",
			capacity_gb: 16,
			modules: 2,
			speed_mts: 5600,
			rgb: false,
			height_mm: 34
		}
	},
	{
		slug: "ddr5-32gb-6000-rgb",
		category: "ram",
		brand: "G.Skill",
		name: "G.Skill Trident Z5 RGB 32 GB DDR5-6000 (2×16)",
		price: 11500,
		specs: {
			type: "DDR5",
			capacity_gb: 32,
			modules: 2,
			speed_mts: 6e3,
			rgb: true,
			height_mm: 44
		}
	},
	{
		slug: "ddr5-64gb-6000",
		category: "ram",
		brand: "Corsair",
		name: "Corsair Vengeance 64 GB DDR5-6000 (2×32)",
		price: 19500,
		specs: {
			type: "DDR5",
			capacity_gb: 64,
			modules: 2,
			speed_mts: 6e3,
			rgb: false,
			height_mm: 35
		}
	},
	{
		slug: "ddr5-128gb-5600",
		category: "ram",
		brand: "Kingston",
		name: "Kingston Fury Beast 128 GB DDR5-5600 (4×32)",
		price: 39e3,
		specs: {
			type: "DDR5",
			capacity_gb: 128,
			modules: 4,
			speed_mts: 5600,
			rgb: false,
			height_mm: 34
		}
	},
	{
		slug: "rtx-3050-6gb",
		category: "gpu",
		brand: "NVIDIA",
		name: "GeForce RTX 3050 6 GB",
		price: 16500,
		specs: {
			maker: "NVIDIA",
			vram_gb: 6,
			length_mm: 205,
			power_w: 70,
			rec_psu_w: 300,
			slots: 2,
			fans: 2
		}
	},
	{
		slug: "rtx-4060-8gb",
		category: "gpu",
		brand: "NVIDIA",
		name: "GeForce RTX 4060 8 GB",
		price: 28500,
		specs: {
			maker: "NVIDIA",
			vram_gb: 8,
			length_mm: 240,
			power_w: 115,
			rec_psu_w: 550,
			slots: 2,
			fans: 2
		}
	},
	{
		slug: "rx-7600-8gb",
		category: "gpu",
		brand: "AMD",
		name: "Radeon RX 7600 8 GB",
		price: 25500,
		specs: {
			maker: "AMD",
			vram_gb: 8,
			length_mm: 250,
			power_w: 165,
			rec_psu_w: 550,
			slots: 2,
			fans: 2
		}
	},
	{
		slug: "rtx-4070-super-12gb",
		category: "gpu",
		brand: "NVIDIA",
		name: "GeForce RTX 4070 Super 12 GB",
		price: 58e3,
		specs: {
			maker: "NVIDIA",
			vram_gb: 12,
			length_mm: 267,
			power_w: 220,
			rec_psu_w: 650,
			slots: 2.5,
			fans: 3
		}
	},
	{
		slug: "rx-7800-xt-16gb",
		category: "gpu",
		brand: "AMD",
		name: "Radeon RX 7800 XT 16 GB",
		price: 49e3,
		specs: {
			maker: "AMD",
			vram_gb: 16,
			length_mm: 287,
			power_w: 263,
			rec_psu_w: 700,
			slots: 2.5,
			fans: 3
		}
	},
	{
		slug: "rtx-4080-super-16gb",
		category: "gpu",
		brand: "NVIDIA",
		name: "GeForce RTX 4080 Super 16 GB",
		price: 99e3,
		specs: {
			maker: "NVIDIA",
			vram_gb: 16,
			length_mm: 310,
			power_w: 320,
			rec_psu_w: 750,
			slots: 3,
			fans: 3
		}
	},
	{
		slug: "rtx-4090-24gb",
		category: "gpu",
		brand: "NVIDIA",
		name: "GeForce RTX 4090 24 GB",
		price: 185e3,
		specs: {
			maker: "NVIDIA",
			vram_gb: 24,
			length_mm: 336,
			power_w: 450,
			rec_psu_w: 850,
			slots: 3.5,
			fans: 3
		}
	},
	{
		slug: "crucial-p3-500gb",
		category: "storage",
		brand: "Crucial",
		name: "Crucial P3 500 GB NVMe SSD",
		price: 3200,
		specs: {
			kind: "NVMe",
			capacity_gb: 500,
			interface: "PCIe 3.0 ×4",
			read_mbps: 3500,
			write_mbps: 1900,
			form_factor: "M.2"
		}
	},
	{
		slug: "samsung-980-1tb",
		category: "storage",
		brand: "Samsung",
		name: "Samsung 980 1 TB NVMe SSD",
		price: 6200,
		specs: {
			kind: "NVMe",
			capacity_gb: 1e3,
			interface: "PCIe 3.0 ×4",
			read_mbps: 3500,
			write_mbps: 3e3,
			form_factor: "M.2"
		}
	},
	{
		slug: "wd-black-sn850x-2tb",
		category: "storage",
		brand: "WD",
		name: "WD Black SN850X 2 TB NVMe SSD",
		price: 14500,
		specs: {
			kind: "NVMe",
			capacity_gb: 2e3,
			interface: "PCIe 4.0 ×4",
			read_mbps: 7300,
			write_mbps: 6600,
			form_factor: "M.2"
		}
	},
	{
		slug: "crucial-mx500-1tb",
		category: "storage",
		brand: "Crucial",
		name: "Crucial MX500 1 TB SATA SSD",
		price: 5800,
		specs: {
			kind: "SATA SSD",
			capacity_gb: 1e3,
			interface: "SATA III",
			read_mbps: 560,
			write_mbps: 510,
			form_factor: "2.5\""
		}
	},
	{
		slug: "seagate-barracuda-2tb",
		category: "storage",
		brand: "Seagate",
		name: "Seagate Barracuda 2 TB HDD",
		price: 5200,
		specs: {
			kind: "HDD",
			capacity_gb: 2e3,
			interface: "SATA III, 7200 rpm",
			read_mbps: 220,
			write_mbps: 220,
			form_factor: "3.5\""
		}
	},
	{
		slug: "deepcool-pf450",
		category: "psu",
		brand: "Deepcool",
		name: "Deepcool PF450 450 W",
		price: 2900,
		specs: {
			watts: 450,
			efficiency: "80+ White",
			modular: "Non-modular",
			form_factor: "ATX"
		}
	},
	{
		slug: "corsair-cv550",
		category: "psu",
		brand: "Corsair",
		name: "Corsair CV550 550 W",
		price: 4200,
		specs: {
			watts: 550,
			efficiency: "80+ Bronze",
			modular: "Non-modular",
			form_factor: "ATX"
		}
	},
	{
		slug: "msi-mag-a650bn",
		category: "psu",
		brand: "MSI",
		name: "MSI MAG A650BN 650 W",
		price: 4900,
		specs: {
			watts: 650,
			efficiency: "80+ Bronze",
			modular: "Non-modular",
			form_factor: "ATX"
		}
	},
	{
		slug: "corsair-rm750e",
		category: "psu",
		brand: "Corsair",
		name: "Corsair RM750e 750 W",
		price: 8900,
		specs: {
			watts: 750,
			efficiency: "80+ Gold",
			modular: "Fully modular",
			form_factor: "ATX"
		}
	},
	{
		slug: "corsair-rm850x",
		category: "psu",
		brand: "Corsair",
		name: "Corsair RM850x 850 W",
		price: 12500,
		specs: {
			watts: 850,
			efficiency: "80+ Gold",
			modular: "Fully modular",
			form_factor: "ATX"
		}
	},
	{
		slug: "seasonic-focus-gx-1000",
		category: "psu",
		brand: "Seasonic",
		name: "Seasonic Focus GX-1000 1000 W",
		price: 16500,
		specs: {
			watts: 1e3,
			efficiency: "80+ Gold",
			modular: "Fully modular",
			form_factor: "ATX"
		}
	},
	{
		slug: "corsair-sf750",
		category: "psu",
		brand: "Corsair",
		name: "Corsair SF750 750 W SFX",
		price: 15500,
		specs: {
			watts: 750,
			efficiency: "80+ Platinum",
			modular: "Fully modular",
			form_factor: "SFX"
		}
	},
	{
		slug: "deepcool-ak400",
		category: "cooler",
		brand: "Deepcool",
		name: "Deepcool AK400 air cooler",
		price: 2600,
		specs: {
			kind: "Air",
			sockets: ALL_SOCKETS,
			height_mm: 155,
			tdp_w: 220
		}
	},
	{
		slug: "cooler-master-hyper-212",
		category: "cooler",
		brand: "Cooler Master",
		name: "Cooler Master Hyper 212 Black",
		price: 3200,
		specs: {
			kind: "Air",
			sockets: ALL_SOCKETS,
			height_mm: 154,
			tdp_w: 150
		}
	},
	{
		slug: "noctua-nh-d15",
		category: "cooler",
		brand: "Noctua",
		name: "Noctua NH-D15 chromax.black",
		price: 11500,
		specs: {
			kind: "Air",
			sockets: ALL_SOCKETS,
			height_mm: 165,
			tdp_w: 250
		}
	},
	{
		slug: "deepcool-le520-240",
		category: "cooler",
		brand: "Deepcool",
		name: "Deepcool LE520 240 mm AIO",
		price: 5900,
		specs: {
			kind: "AIO",
			sockets: ALL_SOCKETS,
			radiator_mm: 240,
			tdp_w: 220,
			rgb: true
		}
	},
	{
		slug: "nzxt-kraken-280",
		category: "cooler",
		brand: "NZXT",
		name: "NZXT Kraken 280 mm AIO",
		price: 13500,
		specs: {
			kind: "AIO",
			sockets: ALL_SOCKETS,
			radiator_mm: 280,
			tdp_w: 250,
			rgb: true
		}
	},
	{
		slug: "lian-li-galahad-360",
		category: "cooler",
		brand: "Lian Li",
		name: "Lian Li Galahad II 360 mm AIO",
		price: 14500,
		specs: {
			kind: "AIO",
			sockets: ALL_SOCKETS,
			radiator_mm: 360,
			tdp_w: 300,
			rgb: true
		}
	},
	{
		slug: "ant-esports-ice-100",
		category: "case",
		brand: "Ant Esports",
		name: "Ant Esports ICE-100 Air Mini",
		price: 2900,
		specs: {
			max_board: "mATX",
			supports: ["mATX", "ITX"],
			gpu_max_mm: 320,
			cooler_max_mm: 150,
			radiator_mm: [240],
			psu: "ATX",
			fans_included: 3,
			drive_35: 1,
			color: "black"
		}
	},
	{
		slug: "cooler-master-q300l",
		category: "case",
		brand: "Cooler Master",
		name: "Cooler Master MasterBox Q300L",
		price: 4300,
		specs: {
			max_board: "mATX",
			supports: ["mATX", "ITX"],
			gpu_max_mm: 360,
			cooler_max_mm: 159,
			radiator_mm: [240],
			psu: "ATX",
			fans_included: 1,
			drive_35: 1,
			color: "black"
		}
	},
	{
		slug: "deepcool-cc560",
		category: "case",
		brand: "Deepcool",
		name: "Deepcool CC560",
		price: 4800,
		specs: {
			max_board: "ATX",
			supports: [
				"ATX",
				"mATX",
				"ITX"
			],
			gpu_max_mm: 370,
			cooler_max_mm: 163,
			radiator_mm: [
				240,
				280,
				360
			],
			psu: "ATX",
			fans_included: 4,
			drive_35: 2,
			color: "black"
		}
	},
	{
		slug: "nzxt-h5-flow",
		category: "case",
		brand: "NZXT",
		name: "NZXT H5 Flow",
		price: 8500,
		specs: {
			max_board: "ATX",
			supports: [
				"ATX",
				"mATX",
				"ITX"
			],
			gpu_max_mm: 365,
			cooler_max_mm: 165,
			radiator_mm: [240, 280],
			psu: "ATX",
			fans_included: 2,
			drive_35: 1,
			color: "white"
		}
	},
	{
		slug: "lian-li-lancool-216",
		category: "case",
		brand: "Lian Li",
		name: "Lian Li Lancool 216",
		price: 9500,
		specs: {
			max_board: "ATX",
			supports: [
				"ATX",
				"mATX",
				"ITX"
			],
			gpu_max_mm: 392,
			cooler_max_mm: 180,
			radiator_mm: [
				240,
				280,
				360
			],
			psu: "ATX",
			fans_included: 3,
			drive_35: 2,
			color: "black"
		}
	},
	{
		slug: "cooler-master-nr200p",
		category: "case",
		brand: "Cooler Master",
		name: "Cooler Master NR200P (Mini-ITX)",
		price: 8200,
		specs: {
			max_board: "ITX",
			supports: ["ITX"],
			gpu_max_mm: 330,
			cooler_max_mm: 155,
			radiator_mm: [240, 280],
			psu: "SFX",
			fans_included: 2,
			drive_35: 1,
			color: "black"
		}
	},
	{
		slug: "case-fans-3-pack-argb",
		category: "extra",
		brand: "Deepcool",
		name: "ARGB case fans (3-pack)",
		price: 2400,
		specs: {
			kind: "fans",
			fans_count: 3,
			power_w: 0
		}
	},
	{
		slug: "wifi-6-pcie-card",
		category: "extra",
		brand: "TP-Link",
		name: "Wi-Fi 6 + Bluetooth PCIe card",
		price: 2700,
		specs: {
			kind: "wifi",
			power_w: 5
		}
	},
	{
		slug: "bluetooth-usb-adapter",
		category: "extra",
		brand: "TP-Link",
		name: "Bluetooth 5.3 USB adapter",
		price: 650,
		specs: {
			kind: "bluetooth",
			power_w: 1
		}
	},
	{
		slug: "creative-sound-card",
		category: "extra",
		brand: "Creative",
		name: "Creative Sound Blaster Audigy FX",
		price: 3900,
		specs: {
			kind: "sound",
			power_w: 5
		}
	},
	{
		slug: "elgato-capture-card",
		category: "extra",
		brand: "Elgato",
		name: "Elgato 4K60 Pro capture card",
		price: 19500,
		specs: {
			kind: "capture",
			power_w: 10
		}
	},
	{
		slug: "argb-controller",
		category: "extra",
		brand: "Generic",
		name: "ARGB hub & controller",
		price: 900,
		specs: {
			kind: "rgb",
			power_w: 2
		}
	},
	{
		slug: "arctic-mx-6",
		category: "extra",
		brand: "Arctic",
		name: "Arctic MX-6 thermal paste",
		price: 650,
		specs: {
			kind: "paste",
			power_w: 0
		}
	},
	{
		slug: "windows-11-home",
		category: "extra",
		brand: "Microsoft",
		name: "Windows 11 Home (genuine licence)",
		price: 9500,
		specs: {
			kind: "os",
			power_w: 0
		}
	},
	{
		slug: "windows-11-pro",
		category: "extra",
		brand: "Microsoft",
		name: "Windows 11 Pro (genuine licence)",
		price: 13500,
		specs: {
			kind: "os",
			power_w: 0
		}
	}
];
var PC_PRESETS = [
	{
		slug: "office-pc",
		name: "Office PC",
		summary: "Quiet, efficient everyday computer for billing, browsing and Office work.",
		parts: [
			"intel-core-i5-12400",
			"msi-pro-h610m-e-ddr4",
			"ddr4-16gb-3200",
			"samsung-980-1tb",
			"deepcool-pf450",
			"ant-esports-ice-100",
			"windows-11-pro"
		]
	},
	{
		slug: "gaming-pc",
		name: "Gaming PC",
		summary: "1080p/1440p gaming with a modern AM5 platform and room to upgrade.",
		parts: [
			"amd-ryzen-5-7600",
			"msi-b650m-gaming-plus-wifi",
			"ddr5-32gb-6000-rgb",
			"rtx-4060-8gb",
			"samsung-980-1tb",
			"deepcool-ak400",
			"msi-mag-a650bn",
			"deepcool-cc560"
		]
	},
	{
		slug: "creator-workstation",
		name: "Creator Workstation",
		summary: "Video editing, 3D and CAD with plenty of cores, memory and fast storage.",
		parts: [
			"amd-ryzen-9-7900x",
			"gigabyte-b650-aorus-elite-ax",
			"ddr5-64gb-6000",
			"rtx-4070-super-12gb",
			"wd-black-sn850x-2tb",
			"seagate-barracuda-2tb",
			"lian-li-galahad-360",
			"corsair-rm850x",
			"lian-li-lancool-216"
		]
	},
	{
		slug: "budget-pc",
		name: "Budget PC",
		summary: "Lowest-cost reliable build for study and home use.",
		parts: [
			"amd-ryzen-5-5600",
			"gigabyte-b550m-ds3h",
			"ddr4-16gb-3200",
			"rtx-3050-6gb",
			"crucial-p3-500gb",
			"deepcool-pf450",
			"ant-esports-ice-100"
		]
	}
];
//#endregion
//#region src/lib/seed.ts
var PLAN_BENEFITS = [
	"1 year of free service labour",
	"Save up to 50% on repairs",
	"Save up to 30% on consumables",
	"Save up to 20% on software",
	"1 year antivirus protection",
	"Genuine Windows 11 licence"
];
var PLANS = [
	{
		slug: "basic",
		name: "Basic",
		tagline: "For a home computer or laptop",
		price: 999,
		mrp: 1299,
		coins: 500,
		visits: 2,
		from: "#0f2a4a",
		to: "#2a5d8f",
		pattern: "circuit",
		badge: "",
		featured: 0
	},
	{
		slug: "pro",
		name: "Pro",
		tagline: "For families and home offices",
		price: 1799,
		mrp: 1999,
		coins: 1e3,
		visits: 4,
		from: "#062c5c",
		to: "#0a66c2",
		pattern: "circuit",
		badge: "Most chosen",
		featured: 1
	},
	{
		slug: "pro-plus",
		name: "Pro+",
		tagline: "For shops and small offices",
		price: 2499,
		mrp: 2999,
		coins: 2e3,
		visits: 8,
		from: "#111418",
		to: "#3a3f47",
		pattern: "grid",
		badge: "",
		featured: 0
	}
];
var FAQS = [
	{
		q: "Where is Virnobyte located?",
		a: "Our office is at Office No. 1, Sadichha Complex, near Bright Computer Education, Savtamali, Mahadev Temple Road, Jadhav Wadi, Chikhali, Pimpri-Chinchwad, Maharashtra 411062.",
		topic: "General",
		home: 1
	},
	{
		q: "Which areas do you serve?",
		a: "We serve Chikhali, Pimpri-Chinchwad and Pune. Walk-in repairs are handled at our Chikhali workshop, and doorstep visits are available for homes and offices in these areas.",
		topic: "General",
		home: 1
	},
	{
		q: "Do you provide doorstep computer service?",
		a: "Yes. Many repairs, installations and network jobs are done on-site. If a fault needs workshop equipment, we take the device with us and tell you when it will be ready.",
		topic: "Repairs",
		home: 1
	},
	{
		q: "How much does computer repair cost in Pune?",
		a: "It depends on the fault and any parts needed. We diagnose first and give you an itemised quote; you decide whether to go ahead.",
		topic: "Repairs",
		home: 1
	},
	{
		q: "Do you install CCTV for businesses?",
		a: "Yes — for shops, offices, clinics, warehouses and small factories, as well as homes. Business installations start with a site survey.",
		topic: "CCTV & networking",
		home: 0
	},
	{
		q: "Do you provide annual IT maintenance contracts?",
		a: "Yes. Our IT AMC covers computers, printers, networks and CCTV with scheduled maintenance visits and priority support.",
		topic: "Business IT",
		home: 1
	},
	{
		q: "Do you provide network installation services?",
		a: "Yes. We install office LANs, Wi-Fi access points, structured cabling and network racks, and troubleshoot existing networks.",
		topic: "CCTV & networking",
		home: 0
	},
	{
		q: "What is the membership card and how do coins work?",
		a: "A membership card gives you a year of free service labour, discounts and a set number of doorstep visits. Coins are credited to your card when it is activated and can be used against labour, consumables and products under the coin rules on the membership page.",
		topic: "Membership",
		home: 0
	},
	{
		q: "How do I check my coin balance?",
		a: "Sign in to your account to see your card, coin balance, visits remaining and every coin transaction.",
		topic: "Membership",
		home: 0
	},
	{
		q: "Is data recovery guaranteed?",
		a: "No honest service can guarantee it. Recovery depends on the condition of the storage device. We assess the drive first and explain what is realistically recoverable.",
		topic: "Repairs",
		home: 0
	}
];
var TESTIMONIALS = [
	{
		name: "Rajesh Sharma",
		role: "CTO, TechBridge Solutions",
		quote: "Set up our entire office network, CCTV, and workstations in one day. The pricing is fair and the quality is enterprise-grade."
	},
	{
		name: "Priya Mehta",
		role: "Operations Manager, Nexgen Retail",
		quote: "We had a critical server crash on a Monday morning. The team arrived quickly, diagnosed the issue, and had us back online before noon."
	},
	{
		name: "Deepa Singh",
		role: "MD, Singh Enterprises",
		quote: "Regular health checks caught a failing HDD before it caused data loss. They genuinely care about our business continuity."
	}
];
var PRODUCTS = [
	{
		slug: "canon-printer",
		name: "Canon Printer",
		category: "Printers",
		summary: "Canon printer for home and office use, installed and set up for you.",
		price: 2e4,
		mrp: 25e3,
		condition: "New",
		image: "virnobyte-printer-repair"
	},
	{
		slug: "refurbished-laptops",
		name: "Refurbished Laptops",
		category: "Laptops & desktops",
		summary: "Tested business laptops with clear specifications, condition grading and warranty.",
		condition: "Refurbished",
		image: "virnobyte-laptop-repair"
	},
	{
		slug: "custom-desktop-pcs",
		name: "Custom Desktop PCs",
		category: "Laptops & desktops",
		summary: "Office, design and gaming desktops built around the software you use.",
		condition: "New",
		image: "virnobyte-gaming-pc-build"
	},
	{
		slug: "ssd-and-ram-upgrades",
		name: "SSD & RAM Upgrades",
		category: "Components",
		summary: "SSDs and memory matched to your computer, installed with your data moved across.",
		condition: "New",
		image: "virnobyte-hardware-solutions"
	},
	{
		slug: "cctv-camera-kits",
		name: "CCTV Camera Kits",
		category: "CCTV",
		summary: "HD and IP camera kits with DVR/NVR and storage sized for your premises.",
		condition: "New",
		image: "virnobyte-cctv-installation-pune"
	},
	{
		slug: "routers-and-switches",
		name: "Routers, Switches & Access Points",
		category: "Networking",
		summary: "Networking equipment for homes and offices, configured and installed.",
		condition: "New",
		image: "virnobyte-wifi-router-setup"
	},
	{
		slug: "ups-and-inverters",
		name: "UPS & Inverters",
		category: "Power backup",
		summary: "UPS units for computers and inverters with batteries for homes and shops.",
		condition: "New",
		image: "virnobyte-circuit-board"
	},
	{
		slug: "hard-disks-and-storage",
		name: "Hard Disks & External Storage",
		category: "Components",
		summary: "Internal and external drives for storage, backup and CCTV recording.",
		condition: "New",
		image: "virnobyte-hard-disk-drive"
	}
];
var JOB_DRAFT = {
	slug: "field-service-technician",
	title: "Field Service Technician",
	promise: "Fix real problems for homes and offices across Pimpri-Chinchwad — and learn networking and CCTV on the job.",
	experience: "1–3 years of hardware repair experience",
	about_role: "You will diagnose and repair computers, laptops and printers at our Chikhali workshop and on doorstep visits, and assist with CCTV and network installations.",
	duties: [
		"Diagnose desktop and laptop faults and prepare itemised quotes",
		"Replace components and reinstall operating systems",
		"Visit homes and offices for on-site repairs",
		"Assist senior technicians on CCTV and network installations",
		"Keep a clear service record for every job"
	],
	growth: [
		"Field Service Technician",
		"Senior Technician",
		"Installation Lead",
		"Service Manager"
	],
	fits: [
		"You can identify common hardware faults without a manual",
		"You explain technical problems to customers in plain words",
		"You have a two-wheeler and a valid licence",
		"You are comfortable working in Chikhali and around Pimpri-Chinchwad"
	]
};
function seedDatabase(d) {
	ensureAdmin(d);
	seedPcBuilder(d);
	const syncSvc = d.prepare(`INSERT OR IGNORE INTO services
    (slug, name, short, title, description, h1, intro, problems, includes, benefits, faqs, note, image, group_name, footer, sort)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
	SERVICES.forEach((s, i) => syncSvc.run(s.slug, s.name, s.short, s.title, s.description, s.h1, s.intro, JSON.stringify(s.problems), JSON.stringify(s.includes), JSON.stringify(s.benefits), JSON.stringify(s.faqs), s.note ?? "", s.image, s.group, s.footer ? 1 : 0, i));
	const { n } = d.prepare("SELECT COUNT(*) AS n FROM services").get();
	if (n > 0) return;
	d.exec("BEGIN");
	try {
		const svc = d.prepare(`INSERT INTO services
      (slug, name, short, title, description, h1, intro, problems, includes, benefits, faqs, note, image, group_name, footer, sort)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
		SERVICES.forEach((s, i) => svc.run(s.slug, s.name, s.short, s.title, s.description, s.h1, s.intro, JSON.stringify(s.problems), JSON.stringify(s.includes), JSON.stringify(s.benefits), JSON.stringify(s.faqs), s.note ?? "", s.image, s.group, s.footer ? 1 : 0, i));
		const plan = d.prepare(`INSERT INTO plans
      (slug, name, tagline, price, mrp, coins, doorstep_visits, benefits, card_from, card_to, card_pattern, badge, featured, sort)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
		PLANS.forEach((p, i) => plan.run(p.slug, p.name, p.tagline, p.price, p.mrp, p.coins, p.visits, JSON.stringify(PLAN_BENEFITS), p.from, p.to, p.pattern, p.badge, p.featured, i));
		const post = d.prepare("INSERT INTO posts (slug, title, description, body, image, related, published_at, updated_at) VALUES (?,?,?,?,?,?,?,?)");
		for (const p of POSTS) post.run(p.slug, p.title, p.description, p.body, p.image, JSON.stringify(p.related), p.published_at, p.published_at);
		const faq = d.prepare("INSERT INTO faqs (question, answer, topic, home, sort) VALUES (?,?,?,?,?)");
		FAQS.forEach((f, i) => faq.run(f.q, f.a, f.topic, f.home, i));
		const t = d.prepare("INSERT INTO testimonials (name, role, quote, published, sort) VALUES (?,?,?,0,?)");
		TESTIMONIALS.forEach((x, i) => t.run(x.name, x.role, x.quote, i));
		const prod = d.prepare("INSERT INTO products (slug, name, category, summary, price, mrp, condition, image, sort) VALUES (?,?,?,?,?,?,?,?,?)");
		PRODUCTS.forEach((p, i) => prod.run(p.slug, p.name, p.category, p.summary, p.price ?? null, p.mrp ?? null, p.condition, p.image, i));
		const page = d.prepare("INSERT INTO pages (slug, title, description, body) VALUES (?,?,?,?)");
		for (const p of PAGES) page.run(p.slug, p.title, p.description, p.body);
		d.prepare(`INSERT INTO jobs (slug, title, promise, experience, about_role, duties, growth, fits, image, published)
      VALUES (?,?,?,?,?,?,?,?,?,0)`).run(JOB_DRAFT.slug, JOB_DRAFT.title, JOB_DRAFT.promise, JOB_DRAFT.experience, JOB_DRAFT.about_role, JSON.stringify(JOB_DRAFT.duties), JSON.stringify(JOB_DRAFT.growth), JSON.stringify(JOB_DRAFT.fits), "virnobyte-hardware-solutions");
		d.exec("COMMIT");
	} catch (e) {
		d.exec("ROLLBACK");
		throw e;
	}
}
function ensureAdmin(d) {
	if (d.prepare("SELECT id FROM users WHERE role = 'admin' LIMIT 1").get()) return;
	const email = process.env.ADMIN_EMAIL;
	const password = process.env.ADMIN_PASSWORD;
	if (!email || !password) {
		console.warn("[virnobyte] No admin account exists. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env and restart.");
		return;
	}
	d.prepare("INSERT INTO users (email, name, password_hash, role) VALUES (?, 'Administrator', ?, 'admin')").run(email, hashPassword(password));
	console.log(`[virnobyte] Created admin account ${email}`);
}
function seedPcBuilder(d) {
	const { n } = d.prepare("SELECT COUNT(*) AS n FROM pc_parts").get();
	if (n > 0) return;
	d.exec("BEGIN");
	try {
		const ins = d.prepare("INSERT INTO pc_parts (slug, category, brand, name, specs, price, sort) VALUES (?,?,?,?,?,?,?)");
		PC_PARTS.forEach((p, i) => ins.run(p.slug, p.category, p.brand, p.name, JSON.stringify(p.specs), p.price, i));
		const pre = d.prepare("INSERT INTO pc_presets (slug, name, summary, parts, sort) VALUES (?,?,?,?,?)");
		PC_PRESETS.forEach((p, i) => pre.run(p.slug, p.name, p.summary, JSON.stringify(p.parts), i));
		d.exec("COMMIT");
	} catch (e) {
		d.exec("ROLLBACK");
		throw e;
	}
}
//#endregion
//#region src/lib/db.ts
try {
	process.loadEnvFile();
} catch {}
var DatabaseSyncClass = null;
var sqliteLoadError = null;
try {
	DatabaseSyncClass = createRequire(import.meta.url)("node:sqlite").DatabaseSync;
} catch (err) {
	sqliteLoadError = err?.message || String(err);
	console.warn("[Virnobyte DB Warning] node:sqlite module could not be loaded:", sqliteLoadError);
}
function resolveDataDir() {
	if (process.env.DATA_DIR) try {
		mkdirSync(process.env.DATA_DIR, { recursive: true });
		return process.env.DATA_DIR;
	} catch {}
	try {
		const p = join(process.cwd(), "data");
		mkdirSync(p, { recursive: true });
		return p;
	} catch {}
	try {
		const tmp = join(os.tmpdir(), "virnobyte_data");
		mkdirSync(tmp, { recursive: true });
		return tmp;
	} catch {}
	return join(process.cwd(), "data");
}
var DATA_DIR = resolveDataDir();
var UPLOAD_DIR = join(DATA_DIR, "uploads");
try {
	mkdirSync(UPLOAD_DIR, { recursive: true });
} catch {}
var SCHEMA = `
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('admin','customer')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS password_resets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_password_resets_token ON password_resets(token_hash);
CREATE INDEX IF NOT EXISTS idx_password_resets_user ON password_resets(user_id);

CREATE TABLE IF NOT EXISTS plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL DEFAULT '',
  price INTEGER NOT NULL DEFAULT 0,
  mrp INTEGER NOT NULL DEFAULT 0,
  coins INTEGER NOT NULL DEFAULT 0,
  doorstep_visits INTEGER NOT NULL DEFAULT 0,
  validity_days INTEGER NOT NULL DEFAULT 365,
  benefits TEXT NOT NULL DEFAULT '[]',
  card_from TEXT NOT NULL DEFAULT '#0b2545',
  card_to TEXT NOT NULL DEFAULT '#1d4e89',
  card_text TEXT NOT NULL DEFAULT '#ffffff',
  card_pattern TEXT NOT NULL DEFAULT 'circuit',
  badge TEXT NOT NULL DEFAULT '',
  featured INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS memberships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id INTEGER NOT NULL REFERENCES plans(id),
  card_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','active','expired','cancelled')),
  start_date TEXT,
  end_date TEXT,
  visits_used INTEGER NOT NULL DEFAULT 0,
  notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS coin_ledger (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  delta INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_by INTEGER REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  h1 TEXT NOT NULL DEFAULT '',
  intro TEXT NOT NULL DEFAULT '',
  problems TEXT NOT NULL DEFAULT '[]',
  includes TEXT NOT NULL DEFAULT '[]',
  benefits TEXT NOT NULL DEFAULT '[]',
  faqs TEXT NOT NULL DEFAULT '[]',
  note TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  group_name TEXT NOT NULL DEFAULT 'Repair',
  footer INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  related TEXT NOT NULL DEFAULT '[]',
  published INTEGER NOT NULL DEFAULT 1,
  published_at TEXT NOT NULL DEFAULT (date('now')),
  updated_at TEXT NOT NULL DEFAULT (date('now'))
);

CREATE TABLE IF NOT EXISTS faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  topic TEXT NOT NULL DEFAULT 'General',
  home INTEGER NOT NULL DEFAULT 0,
  published INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  quote TEXT NOT NULL,
  published INTEGER NOT NULL DEFAULT 0,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Hardware',
  summary TEXT NOT NULL DEFAULT '',
  price INTEGER,
  mrp INTEGER,
  condition TEXT NOT NULL DEFAULT 'New',
  image TEXT NOT NULL DEFAULT '',
  in_stock INTEGER NOT NULL DEFAULT 1,
  published INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('cctv-projects','networking-projects','office-it-setup','hardware-installations')),
  title TEXT NOT NULL,
  client_type TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  scope TEXT NOT NULL DEFAULT '[]',
  image TEXT NOT NULL DEFAULT '',
  completed_on TEXT NOT NULL DEFAULT '',
  published INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS gallery (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image TEXT NOT NULL,
  caption TEXT NOT NULL DEFAULT '',
  published INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  promise TEXT NOT NULL DEFAULT '',
  employment_type TEXT NOT NULL DEFAULT 'FULL_TIME',
  location TEXT NOT NULL DEFAULT 'Chikhali, Pimpri-Chinchwad',
  salary_min INTEGER NOT NULL DEFAULT 0,
  salary_max INTEGER NOT NULL DEFAULT 0,
  pay_note TEXT NOT NULL DEFAULT '',
  experience TEXT NOT NULL DEFAULT '',
  about_role TEXT NOT NULL DEFAULT '',
  duties TEXT NOT NULL DEFAULT '[]',
  growth TEXT NOT NULL DEFAULT '[]',
  fits TEXT NOT NULL DEFAULT '[]',
  image TEXT NOT NULL DEFAULT '',
  valid_through TEXT NOT NULL DEFAULT '',
  published INTEGER NOT NULL DEFAULT 1,
  posted_at TEXT NOT NULL DEFAULT (date('now'))
);

CREATE TABLE IF NOT EXISTS pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT (date('now'))
);

CREATE TABLE IF NOT EXISTS pc_parts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('cpu','motherboard','ram','gpu','storage','psu','cooler','case','extra')),
  brand TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL,
  specs TEXT NOT NULL DEFAULT '{}',
  price INTEGER NOT NULL DEFAULT 0,
  model_url TEXT NOT NULL DEFAULT '',
  in_stock INTEGER NOT NULL DEFAULT 1,
  active INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS pc_presets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  parts TEXT NOT NULL DEFAULT '[]',
  active INTEGER NOT NULL DEFAULT 1,
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS pc_builds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  parts TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  subtotal INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'saved' CHECK (status IN ('saved','quote','quoted','ordered','closed')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL DEFAULT 'service',
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL DEFAULT '',
  topic TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  area TEXT NOT NULL DEFAULT '',
  preferred TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','closed')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`;
var instance = null;
var dbInitError = null;
function getDbStatus() {
	return {
		ok: !!instance,
		sqliteAvailable: !!DatabaseSyncClass,
		sqliteLoadError,
		dbInitError,
		dataDir: DATA_DIR,
		nodeVersion: process.version
	};
}
function db() {
	if (instance) return instance;
	if (!DatabaseSyncClass) return null;
	try {
		const dbPath = join(DATA_DIR, "virnobyte.db");
		let d;
		try {
			d = new DatabaseSyncClass(dbPath);
		} catch (diskErr) {
			console.warn(`[Virnobyte DB] Disk DB (${dbPath}) failed: ${diskErr?.message}. Falling back to in-memory database.`);
			d = new DatabaseSyncClass(":memory:");
		}
		try {
			d.exec("PRAGMA journal_mode = WAL;");
		} catch (walErr) {
			console.warn("[Virnobyte DB] WAL mode failed, falling back to DELETE mode:", walErr?.message);
			try {
				d.exec("PRAGMA journal_mode = DELETE;");
			} catch {}
		}
		try {
			d.exec("PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;");
		} catch {}
		d.exec(SCHEMA);
		seedDatabase(d);
		instance = d;
		return d;
	} catch (err) {
		dbInitError = err?.message || String(err);
		console.error("[Virnobyte DB Init Error]:", err);
		return null;
	}
}
function serviceToRow(s, idx = 0) {
	return {
		id: idx + 1,
		slug: s.slug,
		name: s.name,
		short: s.short,
		title: s.title,
		description: s.description,
		h1: s.h1,
		intro: s.intro,
		problems: JSON.stringify(s.problems || []),
		includes: JSON.stringify(s.includes || []),
		benefits: JSON.stringify(s.benefits || []),
		faqs: JSON.stringify(s.faqs || []),
		note: s.note ?? "",
		image: s.image,
		group_name: s.group,
		footer: s.footer ? 1 : 0,
		published: 1,
		sort: idx
	};
}
function fallbackAll(sql, params) {
	const s = sql.toLowerCase();
	if (s.includes("from services")) {
		if (params && params.length > 0 && typeof params[0] === "string") {
			const match = SERVICES.find((x) => x.slug === params[0]);
			return match ? [serviceToRow(match)] : [];
		}
		return SERVICES.map((svc, i) => serviceToRow(svc, i));
	}
	if (s.includes("from posts")) return POSTS.map((p, i) => ({
		id: i + 1,
		slug: p.slug,
		title: p.title,
		description: p.description,
		body: p.body,
		image: p.image,
		related: JSON.stringify(p.related || []),
		published: 1,
		published_at: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
		updated_at: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
	}));
	if (s.includes("from plans")) return [
		{
			id: 1,
			slug: "basic",
			name: "Basic",
			tagline: "For a home computer or laptop",
			price: 999,
			mrp: 1299,
			coins: 500,
			doorstep_visits: 2,
			validity_days: 365,
			benefits: "[]",
			card_from: "#0f2a4a",
			card_to: "#2a5d8f",
			card_text: "#ffffff",
			card_pattern: "circuit",
			badge: "",
			featured: 0,
			active: 1,
			sort: 0
		},
		{
			id: 2,
			slug: "pro",
			name: "Pro",
			tagline: "For families and home offices",
			price: 1799,
			mrp: 1999,
			coins: 1e3,
			doorstep_visits: 4,
			validity_days: 365,
			benefits: "[]",
			card_from: "#062c5c",
			card_to: "#0a66c2",
			card_text: "#ffffff",
			card_pattern: "circuit",
			badge: "Most chosen",
			featured: 1,
			active: 1,
			sort: 1
		},
		{
			id: 3,
			slug: "pro-plus",
			name: "Pro+",
			tagline: "For shops and small offices",
			price: 2499,
			mrp: 2999,
			coins: 2e3,
			doorstep_visits: 8,
			validity_days: 365,
			benefits: "[]",
			card_from: "#111418",
			card_to: "#3a3f47",
			card_text: "#ffffff",
			card_pattern: "grid",
			badge: "",
			featured: 0,
			active: 1,
			sort: 2
		}
	];
	if (s.includes("from faqs")) return [
		{
			id: 1,
			question: "Where is Virnobyte located?",
			answer: "Our office is at Office No. 1, Sadichha Complex, near Bright Computer Education, Savtamali, Mahadev Temple Road, Jadhav Wadi, Chikhali, Pimpri-Chinchwad, Maharashtra 411062.",
			topic: "General",
			home: 1,
			published: 1,
			sort: 0
		},
		{
			id: 2,
			question: "Which areas do you serve?",
			answer: "We serve Chikhali, Pimpri-Chinchwad and Pune. Walk-in repairs are handled at our Chikhali workshop, and doorstep visits are available for homes and offices in these areas.",
			topic: "General",
			home: 1,
			published: 1,
			sort: 1
		},
		{
			id: 3,
			question: "Do you provide doorstep computer service?",
			answer: "Yes. Many repairs, installations and network jobs are done on-site. If a fault needs workshop equipment, we take the device with us and tell you when it will be ready.",
			topic: "Repairs",
			home: 1,
			published: 1,
			sort: 2
		}
	];
	if (s.includes("from testimonials")) return [];
	if (s.includes("from settings")) return [];
	return [];
}
function all(sql, ...params) {
	try {
		const d = db();
		if (d && typeof d.prepare === "function") return d.prepare(sql).all(...params);
	} catch (err) {
		console.warn("[Virnobyte DB Warning] Query failed in all():", err);
	}
	return fallbackAll(sql, params);
}
function get(sql, ...params) {
	try {
		const d = db();
		if (d && typeof d.prepare === "function") return d.prepare(sql).get(...params);
	} catch (err) {
		console.warn("[Virnobyte DB Warning] Query failed in get():", err);
	}
	return fallbackAll(sql, params)[0] || void 0;
}
function run(sql, ...params) {
	try {
		const d = db();
		if (d && typeof d.prepare === "function") return d.prepare(sql).run(...params);
	} catch (err) {
		console.warn("[Virnobyte DB Warning] Query failed in run():", err);
	}
	return {
		changes: 0,
		lastInsertRowid: 0
	};
}
function tx(fn) {
	const d = db();
	if (d && typeof d.exec === "function") {
		d.exec("BEGIN");
		try {
			const out = fn();
			d.exec("COMMIT");
			return out;
		} catch (e) {
			d.exec("ROLLBACK");
			throw e;
		}
	}
	return fn();
}
function json(value, fallback) {
	if (!value) return fallback;
	try {
		return JSON.parse(value);
	} catch {
		return fallback;
	}
}
//#endregion
export { json as a, hashPassword as c, getDbStatus as i, verifyPassword as l, all as n, run as o, get as r, tx as s, UPLOAD_DIR as t };
