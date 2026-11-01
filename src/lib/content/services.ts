// Seed content for the 14 service pages. Everything here is editable in /admin/r/services.
// Copy is written for search intent first: what the problem is, what Virnobyte does, what it costs to find out.

export interface ServiceSeed {
  slug: string;
  name: string;
  short: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  problems: string[];
  includes: string[];
  benefits: string[];
  faqs: { q: string; a: string }[];
  note?: string;
  image: string;
  group: 'Repair & support' | 'Security & networks' | 'Business IT';
  footer?: boolean;
}

export const SERVICES: ServiceSeed[] = [
  {
    slug: 'computer-repair',
    name: 'Computer Repair',
    short: 'Desktop diagnosis, slow PCs, OS faults, component replacement and business computer support.',
    title: 'Computer Repair in Chikhali & Pimpri-Chinchwad | Virnobyte',
    description:
      'Desktop and computer repair in Chikhali and Pimpri-Chinchwad: hardware diagnosis, slow PCs, Windows faults, component replacement and doorstep support for offices.',
    h1: 'Computer Repair Services in Chikhali & Pimpri-Chinchwad',
    intro: `A desktop that won't start, restarts on its own or takes five minutes to open a spreadsheet usually has one clear cause — a failing drive, a weak power supply, overheating, or a corrupted Windows install. Our job is to find that cause before anything is replaced.

Bring your computer to our workshop in Chikhali or book a doorstep visit anywhere in Pimpri-Chinchwad. We test the hardware, check the operating system, and give you an itemised quote. Nothing is changed until you approve it.

For offices with several machines, we can work through them on-site so your team keeps working. If you need regular upkeep rather than one-off fixes, our [IT AMC plans](/services/amc-services) cover scheduled maintenance for every system you own.`,
    problems: [
      'Computer does not power on, or switches off after a few minutes',
      'Very slow start-up, freezing or the spinning wheel on every click',
      'Blue screen errors and automatic restarts',
      'Windows will not boot, update loops or missing system files',
      'Loud fans, burning smell or overheating',
      'No display, distorted display or one monitor not detected',
      'USB ports, audio or network adapter stopped working',
    ],
    includes: [
      'Full hardware diagnosis — power supply, RAM, storage, motherboard and cooling',
      'Operating system repair or clean reinstall with drivers',
      'Component replacement with tested parts (SSD, RAM, SMPS, fans, graphics cards)',
      'Dust cleaning and thermal paste replacement',
      'Speed-up work: SSD upgrade, startup clean-up and storage health check',
      'Desktop support for offices, on-site or carry-in',
    ],
    benefits: [
      'Diagnosis first, so you only pay for what actually fixes the problem',
      'Itemised quote before work begins — no surprise charges',
      'Tested, genuine components with the manufacturer or shop warranty passed on to you',
      'Your data is left untouched unless you ask us to back it up or move it',
    ],
    faqs: [
      {
        q: 'How much does computer repair cost in Pune?',
        a: 'It depends on the fault. A software clean-up costs far less than a motherboard repair, so we diagnose first and then quote the exact parts and labour. You decide whether to go ahead after you see the quote.',
      },
      {
        q: 'Do you provide doorstep computer service?',
        a: 'Yes. We visit homes and offices in Chikhali, Pimpri-Chinchwad and nearby parts of Pune. Some repairs (board-level work, for example) need workshop equipment, in which case we take the machine with us and tell you when it will be ready.',
      },
      {
        q: 'Will I lose my files during the repair?',
        a: 'Most repairs do not touch your data. If a reinstall or drive replacement is needed, we tell you first and can back up your files before we start.',
      },
    ],
    image: 'virnobyte-computer-repair-cpu',
    group: 'Repair & support',
    footer: true,
  },
  {
    slug: 'laptop-repair',
    name: 'Laptop Repair',
    short: 'Screen, keyboard, battery, hinge, charging and motherboard repairs for all major brands.',
    title: 'Laptop Repair in Chikhali & Pune | Virnobyte',
    description:
      'Laptop repair in Chikhali, Pimpri-Chinchwad and Pune: screen and keyboard replacement, battery, charging and motherboard repair, plus software fixes.',
    h1: 'Professional Laptop Repair Services in Chikhali',
    intro: `Laptops fail in predictable ways: a cracked screen after a fall, keys that stop responding, a battery that lasts twenty minutes, a charging port that only works at one angle. Each of these is fixable, and most are fixable the same week.

At our Chikhali workshop we repair laptops from Dell, HP, Lenovo, Asus, Acer, Apple and other brands. Every job starts with a diagnosis so we can tell you whether a part needs replacing or simply reseating, cleaning or re-soldering.

If your laptop is slow rather than broken, an SSD and RAM upgrade is often cheaper than a new machine — see our [hardware solutions](/services/hardware-solutions). If it has stopped booting and your files matter most, start with [data recovery](/services/data-recovery).`,
    problems: [
      'Cracked, flickering or lined screen',
      'Keyboard keys not working or typing the wrong characters',
      'Battery not charging, draining quickly or swelling',
      'Loose charging port or adapter not detected',
      'Broken hinges or cracked body panels',
      'Laptop overheating and shutting down',
      'Water or liquid spill damage',
      'Laptop on but no display, or stuck at the logo',
    ],
    includes: [
      'Laptop screen replacement and display cable repair',
      'Keyboard replacement and repair',
      'Battery replacement with compatible or original batteries',
      'Charging port, DC jack and adapter diagnosis',
      'Hinge and body repair',
      'Motherboard and chip-level repair',
      'Fan cleaning, thermal paste and overheating fixes',
      'Laptop software repair: Windows reinstall, drivers and virus clean-up',
    ],
    benefits: [
      'Brand-agnostic repairs — no need to wait weeks for a service centre',
      'Clear advice on whether a repair is worth it for an older laptop',
      'Parts sourced to match your exact model',
      'Pick-up and drop available for homes and offices nearby',
    ],
    faqs: [
      {
        q: 'Do you provide laptop repair in Chikhali?',
        a: 'Yes — our workshop is at Sadichha Complex on Mahadev Temple Road, Jadhav Wadi, Chikhali. You can walk in or call ahead so a technician is ready for your laptop.',
      },
      {
        q: 'How long does a laptop screen replacement take?',
        a: 'If the screen for your model is in stock, usually the same or next working day. Less common panels have to be ordered, and we tell you the expected date before you approve the repair.',
      },
      {
        q: 'Is it worth repairing an old laptop?',
        a: 'Often yes. A failing hard disk or tired battery is inexpensive to replace and an SSD upgrade can make an older laptop feel new. If the repair would cost close to a replacement, we will say so.',
      },
    ],
    image: 'virnobyte-laptop-repair',
    group: 'Repair & support',
    footer: true,
  },
  {
    slug: 'cctv-installation',
    name: 'CCTV Installation',
    short: 'Home, shop, office and industrial CCTV with DVR/NVR setup, mobile viewing and maintenance.',
    title: 'CCTV Installation in Pune & Pimpri-Chinchwad | Virnobyte',
    description:
      'CCTV camera installation in Pune and Pimpri-Chinchwad for homes, shops, offices and factories — site survey, HD/IP cameras, DVR/NVR setup, mobile viewing and maintenance.',
    h1: 'CCTV Installation & Security Camera Solutions',
    intro: `A CCTV system is only useful if the cameras cover the right spots, the footage is clear at night, and someone can actually find a recording when it matters. We plan installations around those three things.

Every job starts with a site visit. We look at entrances, cash counters, parking, blind corners and lighting, then recommend the number and type of cameras — analog HD or IP — along with recording capacity for the number of days you need to keep footage.

We install the cameras, run and dress the cabling, configure the DVR or NVR, and set up live viewing on your phone. After installation, we can look after the system under an [annual maintenance contract](/services/amc-services) so cameras stay clean, aligned and recording.`,
    problems: [
      'Blind spots at gates, counters or parking areas',
      'Grainy or dark footage at night',
      'Recorder full or not saving older footage',
      'Cannot view cameras on the phone',
      'Cameras going offline or showing "no video"',
      'Old analog system that needs upgrading',
    ],
    includes: [
      'Site survey and camera placement plan',
      'Home CCTV, shop CCTV, office CCTV and industrial CCTV',
      'HD analog and IP camera installation',
      'DVR / NVR setup with hard-disk sizing for your retention needs',
      'Remote monitoring on mobile and desktop',
      'Cabling, conduit and power backup for the recorder',
      'CCTV maintenance, repair and upgrades',
    ],
    benefits: [
      'Coverage planned around your actual premises, not a fixed package',
      'Clean, labelled cabling that is easy to maintain later',
      'You are shown how to find, play back and export footage',
      'One local team for installation, service and expansion',
    ],
    faqs: [
      {
        q: 'Do you install CCTV for businesses?',
        a: 'Yes. We install CCTV for shops, offices, clinics, warehouses and small factories, as well as homes and housing societies. Business installations start with a site survey so we can plan coverage and recording properly.',
      },
      {
        q: 'Can I watch my CCTV cameras on my phone?',
        a: 'Yes. We configure the recorder for remote viewing and set up the app on your phone during installation, so you can see live and recorded footage from anywhere with internet access.',
      },
      {
        q: 'How many days of recording can I keep?',
        a: 'It depends on the number of cameras, their resolution and the hard-disk size. We size the storage to the retention period you need and explain the trade-off before installation.',
      },
    ],
    image: 'virnobyte-cctv-installation-pune',
    group: 'Security & networks',
    footer: true,
  },
  {
    slug: 'networking',
    name: 'Networking',
    short: 'Office LAN, Wi-Fi setup, structured cabling, router and switch configuration, troubleshooting.',
    title: 'Networking Services in Pune | LAN & Wi-Fi Solutions | Virnobyte',
    description:
      'Networking services in Pune and Pimpri-Chinchwad: office LAN installation, Wi-Fi setup, structured cabling, router configuration and troubleshooting.',
    h1: 'Networking Services: LAN, Wi-Fi & Structured Cabling',
    intro: `Slow internet in one cabin, Wi-Fi that drops whenever the microwave runs, a printer that only some people can reach — most office network problems come down to placement, configuration or cabling.

We design and install networks for homes and businesses across Pune: structured cabling, switches, routers, access points and network racks. For existing networks we troubleshoot dead spots, IP conflicts, slow speeds and devices that won't connect.

Every installation is labelled and documented, so the next time something changes — a new cabin, more staff, a new internet line — the change is quick. Pair it with [CCTV](/services/cctv-installation) on the same cabling plan to save cost.`,
    problems: [
      'Weak Wi-Fi or dead zones in parts of the office or home',
      'Internet slows down when more people connect',
      'Printers or shared drives not reachable from some computers',
      'Tangled, unlabelled cables that nobody can trace',
      'Frequent disconnections or IP address conflicts',
      'New office or floor that needs a network from scratch',
    ],
    includes: [
      'Office LAN design and installation',
      'Wi-Fi setup with access points for full coverage',
      'Structured network cabling, patch panels and racks',
      'Router, switch and firewall configuration',
      'Network troubleshooting and performance tuning',
      'Guest Wi-Fi separation and basic network security',
      'Ongoing business network support',
    ],
    benefits: [
      'Coverage planned for the walls and floors you actually have',
      'Labelled cabling and a simple network map handed over',
      'Secure setup: changed default passwords and separated guest access',
      'Easy to extend when your team grows',
    ],
    faqs: [
      {
        q: 'Do you provide network installation services?',
        a: 'Yes — from a single home router setup to full office LAN installations with structured cabling, switches and multiple Wi-Fi access points across Pune and Pimpri-Chinchwad.',
      },
      {
        q: 'Why is my office Wi-Fi slow even with a fast internet plan?',
        a: 'Common causes are a single router covering too large an area, interference from neighbouring networks, outdated equipment or too many devices on one band. A short site check usually pinpoints which one applies.',
      },
      {
        q: 'Can you fix our existing messy cabling?',
        a: 'Yes. We can re-terminate, label and dress existing cables, move equipment into a rack and document the layout so future changes are simple.',
      },
    ],
    image: 'virnobyte-networking-services',
    group: 'Security & networks',
    footer: true,
  },
  {
    slug: 'hardware-solutions',
    name: 'Hardware Solutions',
    short: 'RAM and SSD upgrades, new and refurbished systems, UPS, peripherals and custom PC builds.',
    title: 'Computer Hardware Solutions & Upgrades in Pune | Virnobyte',
    description:
      'Computer hardware in Pune: SSD and RAM upgrades, new and refurbished laptops and desktops, UPS, printers and custom PC builds, installed for you.',
    h1: 'Hardware Solutions, Upgrades & Supply',
    intro: `The right upgrade can add years to a computer. Moving from a hard disk to an SSD alone changes boot time from minutes to seconds, and extra RAM stops the freezing that comes with many browser tabs or accounting software.

We advise on, supply and install hardware for homes and offices — new and refurbished laptops and desktops, SSDs, RAM, graphics cards, UPS units, printers, CCTV equipment and networking gear. If you need a new system, we spec it around what you actually run rather than the most expensive option.

Browse what we commonly stock on the [products page](/products), or tell us what you need and we'll quote it.`,
    problems: [
      'Computer is slow but otherwise works',
      'Not sure which upgrade will make the most difference',
      'Need several matching systems for a new office',
      'Power cuts damaging equipment or losing work',
      'Want a custom PC for design, gaming or CAD work',
    ],
    includes: [
      'SSD and RAM upgrades with data migration',
      'New and refurbished laptops and desktops',
      'Custom PC builds for office, design and gaming',
      'UPS sizing and installation',
      'Printers, monitors, keyboards and peripherals',
      'Networking and CCTV equipment supply',
    ],
    benefits: [
      'Advice based on your workload, not the highest margin',
      'Installation and data migration handled for you',
      'Warranty documentation kept with your service record',
      'One supplier for hardware and the service that follows',
    ],
    faqs: [
      {
        q: 'Will an SSD really speed up my old computer?',
        a: 'For most computers still running a hard disk, yes — it is usually the single biggest improvement. We check compatibility first and move your Windows installation and files across.',
      },
      {
        q: 'Do you sell refurbished laptops?',
        a: 'Yes. Refurbished systems are tested before sale and we explain the condition, specifications and warranty clearly so you know exactly what you are buying.',
      },
    ],
    image: 'virnobyte-hardware-solutions',
    group: 'Business IT',
    footer: true,
  },
  {
    slug: 'software-solutions',
    name: 'Software Solutions',
    short: 'Business software setup, licensing, email, Microsoft 365, accounting software support and automation.',
    title: 'Software Solutions & Support for Businesses in Pune | Virnobyte',
    description:
      'Software solutions for Pune businesses: Microsoft 365 and email setup, licensing, accounting software support, backups, user management and practical automation.',
    h1: 'Software Solutions for Homes & Businesses',
    intro: `Software problems cost time quietly: a shared mailbox nobody can access, an accounting package that won't open on the new PC, licences that expired without anyone noticing.

We set up and support the software your business depends on — operating systems, Microsoft 365 or Google Workspace, business email, accounting and billing software, antivirus, backups and user accounts. We also keep track of licences and renewals so nothing lapses unexpectedly.

For one-off installations on a single machine, see [software installation](/services/software-installation). For a fully bespoke setup across your office, see [custom IT solutions](/services/custom-it-solutions).`,
    problems: [
      'Business email not syncing across phone and laptop',
      'Accounting or billing software errors after an update',
      'Expired or unlicensed software on office machines',
      'New employees waiting days for accounts and access',
      'No central backup of important files',
    ],
    includes: [
      'Microsoft 365 / Google Workspace setup and migration',
      'Business email configuration on all devices',
      'Genuine Windows and Office licensing',
      'Accounting and billing software installation and support',
      'User accounts, shared folders and permissions',
      'Backup software and scheduled backups',
    ],
    benefits: [
      'Genuine licences, documented for audits',
      'Faster onboarding for new staff',
      'Fewer interruptions from updates and sync errors',
      'A single point of contact for software issues',
    ],
    faqs: [
      {
        q: 'Can you move our email to Microsoft 365 or Google Workspace?',
        a: 'Yes. We plan the migration, move mailboxes, update DNS records and configure every device, usually with minimal downtime for your team.',
      },
      {
        q: 'Do you provide genuine software licences?',
        a: 'Yes. We supply genuine Windows, Office and antivirus licences and install them for you, so you are not exposed to unlicensed software risks.',
      },
    ],
    image: 'virnobyte-software-solutions',
    group: 'Business IT',
    footer: true,
  },
  {
    slug: 'data-recovery',
    name: 'Data Recovery',
    short: 'Recover files from failed hard disks, SSDs, pen drives, memory cards and deleted partitions.',
    title: 'Data Recovery in Pune | HDD & SSD Recovery | Virnobyte',
    description:
      'Data recovery in Pune from hard disks, SSDs, pen drives and memory cards — deleted files, formatted and failed drives, with an honest assessment first.',
    h1: 'Data Recovery from Hard Disks, SSDs & USB Drives',
    intro: `When a drive fails, what you do in the next hour matters more than anything else. Keep the device switched off, don't run recovery apps that write to the same drive, and don't open it up.

We recover data from hard disks, SSDs, pen drives and memory cards — deleted files, accidentally formatted drives, corrupted partitions and drives that are no longer detected. We start with an assessment that tells you what is likely to be recoverable before any paid work begins.

**Recovery is never guaranteed.** The outcome depends on the condition of the storage device — physical damage, overwritten data and SSD TRIM all reduce what can be recovered. We will be clear about the realistic chances. Afterwards, set up [backups](/services/software-solutions) so it doesn't happen again.`,
    problems: [
      'Hard disk not detected or making clicking sounds',
      'Files deleted by mistake or Recycle Bin emptied',
      'Drive formatted accidentally',
      '"Drive needs to be formatted" or RAW partition errors',
      'Pen drive or memory card unreadable',
      'Laptop not booting but files are needed urgently',
    ],
    includes: [
      'Free initial assessment of the device',
      'Hard disk data recovery (logical faults)',
      'SSD data recovery where TRIM has not erased the data',
      'Deleted file and formatted partition recovery',
      'Pen drive and memory card recovery',
      'Recovered data copied to a new drive you can keep',
    ],
    benefits: [
      'An honest assessment before you commit to paid recovery',
      'Your data is handled privately and not shared',
      'Original drive returned to you along with recovered files',
      'Advice on preventing the same loss again',
    ],
    faqs: [
      {
        q: 'Can you recover data from any hard disk?',
        a: 'Not always. Success depends on how the drive failed and whether the data has been overwritten. We assess the drive first and explain what is realistically recoverable before you decide.',
      },
      {
        q: 'What should I do before sending a hard drive for data recovery?',
        a: 'Stop using it. Power it down, do not install recovery software onto it, and do not open the casing. Every write or power cycle can reduce what can be recovered.',
      },
      {
        q: 'Is SSD data recovery possible?',
        a: 'Sometimes. Many SSDs erase deleted data permanently through a feature called TRIM, which makes deleted-file recovery harder than on hard disks. Failed SSDs with intact data have better chances.',
      },
    ],
    note: 'Recovery success depends on the condition of the storage device. We do not promise results before assessing the drive.',
    image: 'virnobyte-data-recovery-hard-disk',
    group: 'Repair & support',
    footer: true,
  },
  {
    slug: 'printer-repair',
    name: 'Printer Repair',
    short: 'Inkjet, laser and thermal printer repair — paper jams, print quality, drums, boards and setup.',
    title: 'Printer Repair in Pimpri-Chinchwad & Pune | Virnobyte',
    description:
      'Printer repair in Pimpri-Chinchwad and Pune for inkjet, laser and thermal printers: paper jams, faded prints, drum and roller replacement, network setup.',
    h1: 'Printer Repair for Inkjet, Laser & Thermal Printers',
    intro: `Office printers tend to fail at the worst time — mid-invoice run, or just before a filing deadline. Most faults are mechanical (rollers, fusers, drums) or connectivity-related and can be fixed on-site.

We repair inkjet, laser and thermal printers from HP, Canon, Epson, Brother and other brands. We also set up network printing so everyone in the office can print without passing a USB cable around.`,
    problems: [
      'Frequent paper jams or paper not picking up',
      'Faded, streaky or smudged prints',
      'Error lights or codes on the display',
      'Printer offline or not found on the network',
      'Cartridge or toner not recognised',
    ],
    includes: [
      'Roller, fuser, drum and pickup assembly replacement',
      'Print-head cleaning and alignment',
      'Board-level repair for common faults',
      'Network and Wi-Fi printer setup',
      'Thermal and billing printer repair',
      'Cartridge and toner supply',
    ],
    benefits: [
      'On-site repair for most office printers',
      'Honest advice when replacement is the better option',
      'Genuine and compatible consumables available',
    ],
    faqs: [
      {
        q: 'Do you repair printers on-site?',
        a: 'For most jams, roller replacements and connectivity problems, yes. Board-level faults may need the printer to come to our workshop.',
      },
      {
        q: 'Why are my laser prints faded?',
        a: 'Usually low toner, a worn drum or a dirty transfer roller. We check each and replace only the part that is causing the problem.',
      },
    ],
    image: 'virnobyte-printer-repair',
    group: 'Repair & support',
  },
  {
    slug: 'virus-removal',
    name: 'Virus Removal',
    short: 'Malware and virus clean-up, pop-up removal, browser hijack fixes and security hardening.',
    title: 'Virus Removal & Malware Cleanup in Pune | Virnobyte',
    description:
      'Virus and malware removal in Pune: deep scans, pop-up and browser hijack fixes, ransomware advice, antivirus setup and security hardening.',
    h1: 'Virus Removal & Computer Security Clean-up',
    intro: `Pop-ups that won't go away, a browser homepage that keeps changing, or a computer that suddenly runs hot doing nothing — these are typical signs of malware.

We remove viruses, adware and unwanted programs, repair the damage they leave behind, install proper antivirus, and close the gaps that let the infection in. If files have been encrypted by ransomware, contact us before paying anyone; we'll explain the options and check whether backups or [data recovery](/services/data-recovery) can help.`,
    problems: [
      'Constant pop-ups and unwanted ads',
      'Browser redirects or changed search engine',
      'Unknown programs starting automatically',
      'Files renamed or encrypted',
      'Antivirus disabled and cannot be turned back on',
    ],
    includes: [
      'Deep malware scan and removal',
      'Browser clean-up and reset',
      'Antivirus installation and configuration',
      'Windows updates and security settings',
      'Ransomware assessment and backup check',
    ],
    benefits: [
      'Clean system without reinstalling where possible',
      'Your files preserved throughout',
      'Clear advice on avoiding re-infection',
    ],
    faqs: [
      {
        q: 'Do I need to reinstall Windows to remove a virus?',
        a: 'Not usually. Most infections can be cleaned in place. If the system is badly damaged, we back up your files first and then reinstall.',
      },
    ],
    image: 'virnobyte-virus-removal-security',
    group: 'Repair & support',
  },
  {
    slug: 'it-consulting',
    name: 'IT Consulting',
    short: 'IT planning for growing businesses — hardware, networks, security, backups and vendor choices.',
    title: 'IT Consulting for Small Businesses in Pune | Virnobyte',
    description:
      'IT consulting for small and growing businesses in Pune: technology planning, office IT setup, security and backup reviews, vendor selection and budgeting advice.',
    h1: 'IT Consulting for Small & Growing Businesses',
    intro: `Most small businesses don't need a full-time IT department — they need someone who understands their setup and can answer "what should we do next?" honestly.

We review your current systems, identify risks (no backups, ageing hardware, weak passwords, single points of failure), and give you a prioritised plan with realistic costs. When you're ready, we can carry out the plan ourselves or work alongside your existing vendors.

Moving into a new office? See our [office IT setup](/portfolio/office-it-setup) work and [networking services](/services/networking).`,
    problems: [
      'No clear picture of what IT the business owns',
      'Unsure whether backups are working',
      'Planning a new office or branch',
      'Rising IT costs without clear benefit',
    ],
    includes: [
      'IT health check and risk review',
      'Office IT setup planning',
      'Backup and security review',
      'Hardware and software budgeting',
      'Vendor and quotation review',
    ],
    benefits: [
      'Plain-language recommendations ranked by priority',
      'Budgets you can plan around',
      'Independent advice on vendor quotes',
    ],
    faqs: [
      {
        q: 'Do we need an AMC or one-off consulting?',
        a: 'If you want ongoing upkeep, an AMC is better value. If you need a plan for a specific change — a new office, a move to cloud email — a one-off consultation is usually enough.',
      },
    ],
    image: 'virnobyte-it-consulting',
    group: 'Business IT',
  },
  {
    slug: 'amc-services',
    name: 'IT AMC Services',
    short: 'Annual maintenance contracts for computers, printers, networks and CCTV with scheduled visits.',
    title: 'IT AMC Services in Pune | Computer AMC | Virnobyte',
    description:
      'IT AMC and computer AMC in Pune: preventive maintenance, hardware, software and network support, scheduled visits and priority troubleshooting.',
    h1: 'IT AMC: Annual Maintenance Contracts for Businesses',
    intro: `An annual maintenance contract turns IT from a series of emergencies into a schedule. Instead of calling someone when a computer dies, a technician visits regularly to clean, update and check every system — and you get priority support when something does go wrong.

Our IT AMC covers computers, laptops, printers, networks and CCTV. We agree the list of equipment, the visit frequency and the response time up front, so you know exactly what is covered.

AMC plans are built around your equipment count, so pricing is quoted after a short survey. Individuals and very small offices may find a [membership card](/membership) a better fit.`,
    problems: [
      'Repeated breakdowns disrupting work',
      'No record of what was serviced and when',
      'Waiting days for a technician during emergencies',
      'Unpredictable repair bills',
    ],
    includes: [
      'Preventive maintenance visits on an agreed schedule',
      'Hardware support for computers, laptops and printers',
      'Software support, updates and antivirus checks',
      'Network support and troubleshooting',
      'CCTV health checks',
      'Service log for every visit',
      'Priority response for breakdowns',
    ],
    benefits: [
      'Fewer breakdowns and less downtime',
      'Predictable annual IT costs',
      'Business continuity through regular backup checks',
      'One accountable team that knows your setup',
    ],
    faqs: [
      {
        q: 'Do you provide annual IT maintenance contracts?',
        a: 'Yes. We offer AMC for offices, shops, clinics and schools in Pune and Pimpri-Chinchwad, covering computers, printers, networks and CCTV.',
      },
      {
        q: 'What is not covered in an AMC?',
        a: 'Replacement parts and consumables are usually charged separately unless agreed otherwise. Your contract lists exactly what is and is not included.',
      },
    ],
    image: 'virnobyte-amc-services',
    group: 'Business IT',
    footer: true,
  },
  {
    slug: 'inverter-installation',
    name: 'Inverter Installation',
    short: 'Inverter and battery installation, UPS for computers, wiring and power-backup maintenance.',
    title: 'Inverter & UPS Installation in Pimpri-Chinchwad | Virnobyte',
    description:
      'Inverter, battery and UPS installation in Pimpri-Chinchwad and Pune for homes, shops and offices — load assessment, wiring, installation and maintenance.',
    h1: 'Inverter, Battery & UPS Installation',
    intro: `Power cuts and voltage fluctuations are among the most common causes of damaged computers, corrupted drives and lost work. The right backup depends on what you need to keep running and for how long.

We assess your load — computers, routers, CCTV recorders, lights and fans — and recommend an inverter, battery or online UPS that matches. Then we install it with proper wiring and earthing, and maintain it so the batteries last.`,
    problems: [
      'Computers shutting down during power cuts',
      'CCTV recorder losing footage when power drops',
      'Inverter backup time much shorter than before',
      'Battery needs frequent topping up',
    ],
    includes: [
      'Load assessment and sizing',
      'Inverter and battery installation',
      'UPS for computers, servers and networking equipment',
      'Wiring and changeover',
      'Battery health checks and maintenance',
    ],
    benefits: [
      'Equipment protected from cuts and fluctuations',
      'Backup sized to what you actually need',
      'Safe, tidy installation',
    ],
    faqs: [
      {
        q: 'What size inverter do I need?',
        a: 'It depends on the total load you want to run and the backup time you need. We list your appliances, calculate the load and recommend the inverter and battery capacity.',
      },
    ],
    image: 'virnobyte-circuit-board',
    group: 'Business IT',
  },
  {
    slug: 'software-installation',
    name: 'Software Installation',
    short: 'Windows installation, drivers, Office, antivirus and licensed software set up correctly.',
    title: 'Software & Windows Installation in Chikhali | Virnobyte',
    description:
      'Windows and software installation in Chikhali and Pimpri-Chinchwad: OS install, drivers, Microsoft Office, antivirus and licensed software.',
    h1: 'Windows & Software Installation',
    intro: `A clean, correctly configured installation saves hours of troubleshooting later. We install Windows with the right drivers for your hardware, set up Office and the software you use every day, activate genuine licences and move your files back in place.

For business-wide software setup — email, user accounts and backups — see [software solutions](/services/software-solutions).`,
    problems: [
      'New computer needs setting up',
      'Windows corrupted or too slow to use',
      'Missing drivers — no Wi-Fi, sound or display resolution',
      'Software asks for activation or shows licence warnings',
    ],
    includes: [
      'Windows installation and updates',
      'Driver installation for all hardware',
      'Microsoft Office and productivity software',
      'Antivirus installation',
      'Software licensing and activation',
      'File and settings transfer',
    ],
    benefits: [
      'A clean system that runs the way it should',
      'Genuine, activated software',
      'Files and settings carried over',
    ],
    faqs: [
      {
        q: 'Will reinstalling Windows delete my files?',
        a: 'A clean install does replace the system drive, so we back up your files first and restore them afterwards.',
      },
    ],
    image: 'virnobyte-software-installation',
    group: 'Repair & support',
  },
  {
    slug: 'custom-it-solutions',
    name: 'Custom IT Solutions',
    short: 'Servers, NAS, cloud backup, rack installation and complete IT setups designed for your business.',
    title: 'Custom IT Solutions for Businesses in Pune | Virnobyte',
    description:
      'Custom IT solutions in Pune: servers, NAS storage, cloud backup, rack installation, office IT infrastructure and complete setups designed around how your business works.',
    h1: 'Custom IT Solutions & Infrastructure',
    intro: `Some requirements don't fit a standard service — a shared file server for a design studio, off-site backup for a clinic, a small server rack for a growing office, or a complete IT setup for a new branch.

We design these solutions around how your team works, then supply, install and support them. The aim is always the simplest setup that does the job reliably.`,
    problems: [
      'Files scattered across individual computers',
      'No off-site copy of business data',
      'Outgrowing a single router and a few PCs',
      'Opening a new branch or office',
    ],
    includes: [
      'File servers and NAS storage',
      'Cloud and off-site backup',
      'Server rack and IT room setup',
      'Complete office IT infrastructure',
      'Remote access for staff',
    ],
    benefits: [
      'Designed around your workflow',
      'Supplied, installed and supported by one team',
      'Documented so it can grow with you',
    ],
    faqs: [
      {
        q: 'Can you set up a shared drive for our office?',
        a: 'Yes. Depending on your size, we recommend either a NAS device or a cloud-based shared drive, set up with the right permissions for each team member.',
      },
    ],
    image: 'virnobyte-custom-it-solutions-server',
    group: 'Business IT',
  },
  {
    slug: 'website-development',
    name: '3D Website Development',
    short: 'Interactive 3D futuristic websites, Three.js & WebGL animations, 4K high-resolution visuals and modern web engineering.',
    title: '3D Futuristic Website & Three.js Web Development | Virnobyte',
    description:
      'Futuristic 3D website development in Pune: WebGL & Three.js interactive experiences, ultra-sharp 4K visual assets, 3D product configurators, and blazing-fast performance.',
    h1: '3D Futuristic Website & WebGL Development',
    intro: `Standard static websites are no longer enough to leave a lasting impression in a high-tech digital economy. We engineer cutting-edge, 3D futuristic websites powered by **Three.js, WebGL, WebGPU, and modern reactive frameworks** that elevate your brand into an interactive, spatial experience.

From real-time 3D product configurators and particle effects to smooth physics simulations and ultra-high-resolution 4K asset rendering, our websites deliver cinematic visual fidelity without compromising loading speed or search engine rankings.

Every 3D web experience is optimized from the ground up: mesh compression (Draco/KTX2), adaptive Level-of-Detail (LOD), dynamic lighting shaders, and hardware-accelerated 60+ FPS performance across both smartphones and 4K desktop monitors.

Whether you are launching an innovative tech startup, an architectural studio, an e-commerce showcase, or a modern business ready for a next-generation web presence, our Pune development team designs, models, and ships the full production build.`,
    problems: [
      'Flat, outdated 2D websites that fail to differentiate your brand from competitors',
      'Heavy, unoptimized 3D models and bloated images that cause slow page loads and mobile lag',
      'Pixelated, blurry graphics on high-DPI Retina and 4K desktop screens',
      'Inability for online customers to inspect or configure complex physical products in 3D',
      'High bounce rates due to lack of interactive visual engagement',
      'Concerns that rich 3D graphics will harm SEO rankings and mobile responsiveness',
    ],
    includes: [
      'Custom Three.js, WebGL & WebGPU 3D canvas development with interactive camera controls',
      'Ultra-sharp 4K high-resolution texture mapping and Physically Based Rendering (PBR)',
      'Interactive 3D product showcases with 360-degree rotation, zoom, and exploded views',
      'Futuristic UI/UX design: glowing accents, cyber grids, micro-animations, and glassmorphism',
      'GPU & mobile optimization: Draco geometry compression, LOD scaling, and 60+ FPS stability',
      'Full-stack architecture: lightning-fast SSR, clean SEO metadata, and CDN asset delivery',
      'Integration with contact forms, CRM, booking engines, and payment gateways',
      'Responsive design across iOS, Android, tablets, laptops, and ultra-wide 4K monitors',
    ],
    benefits: [
      'Unrivalled visitor engagement that keeps prospects exploring your website significantly longer',
      'Photorealistic 4K clarity on high-resolution displays engineered for rapid loading',
      'SEO-friendly SSR structure: Googlebot indexes all copy while users enjoy full 3D interactivity',
      'Direct development by engineers experienced in 3D mathematics, shader pipelines, and web performance',
      'Turnkey delivery: 3D asset optimization, UI design, hosting setup, and long-term support',
    ],
    faqs: [
      {
        q: 'Will a 3D futuristic website run smoothly on budget smartphones?',
        a: 'Yes. We build adaptive WebGL experiences using dynamic resolution scaling, low-draw-call geometry, and Draco compression. If a device has an entry-level GPU or battery-saver mode enabled, the scene gracefully adjusts detail levels to maintain a smooth 60 FPS framerate.',
      },
      {
        q: 'How do you handle 4K high-resolution visual assets without slowing down the site?',
        a: 'We use modern next-gen image and texture pipelines including WebP/AVIF textures, mipmapping, and progressive asset streaming. Crucial visual textures load in crisp 4K fidelity while assets are fetched asynchronously in the background so initial load time stays under 2 seconds.',
      },
      {
        q: 'Do 3D Three.js websites affect SEO and Google search rankings?',
        a: 'No, they actually boost SEO. We separate the 3D WebGL canvas from the semantic HTML layer. All text, titles, headings, and schema markup are server-rendered and instantly crawled by search engines, while longer user dwell time positively signals engagement to Google.',
      },
      {
        q: 'Can you convert our existing product models or CAD files into web 3D?',
        a: 'Yes. We optimize CAD/STEP, OBJ, FBX, or Blender files into lightweight web-standard GLTF/GLB models, apply realistic PBR materials, and add lighting and interactions.',
      },
      {
        q: 'What is the typical timeline and process for a 3D website project?',
        a: 'A typical project spans 2 to 4 weeks: Phase 1 covers concept design and 3D scene architecture; Phase 2 builds the interactive Three.js components and UI; Phase 3 focuses on cross-device performance optimization, SEO, and launch.',
      },
    ],
    note: 'Built with Three.js, WebGL and 4K asset optimization for buttery smooth 60 FPS across desktop and mobile.',
    image: 'virnobyte-gaming-pc-build',
    group: 'Business IT',
    footer: true,
  },
];
