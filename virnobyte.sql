-- phpMyAdmin SQL Dump
-- Database: `virnobyte`
-- Generated on: 2026-11-02T15:50:29.294Z

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------
-- Table structure for table `settings`
--

CREATE TABLE IF NOT EXISTS `settings` (
  `key` varchar(100) NOT NULL,
  `value` longtext NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `settings`
--

INSERT INTO `settings` (`key`, `value`) VALUES
('careers', '{"heroImage":"virnobyte-hardware-solutions","promise":"Learn hardware, networking and CCTV by fixing real problems for homes and businesses across Pimpri-Chinchwad.","direction":"We are growing from repairs into complete IT care for small businesses: AMC contracts, office networks, CCTV and membership customers. That means more installation work, more responsibility and room to move up.","steps":[{"title":"Apply online","detail":"Three short steps with no CV upload needed.","duration":"About 5 minutes"},{"title":"Phone call","detail":"A short call about your experience and availability.","duration":"Within 3 working days"},{"title":"Practical round","detail":"Diagnose a real fault at our Chikhali workshop.","duration":"About 1 hour"},{"title":"Offer","detail":"A written offer with pay and start date.","duration":"Within 2 working days"}]}');

-- --------------------------------------------------------
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(191) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL DEFAULT '',
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'customer',
  `created_at` varchar(50) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `phone`, `password_hash`, `role`, `created_at`) VALUES
(1, 'admin@example.com', 'Administrator', '', 'scrypt$0Wmxs793fwO7XZO+gu8FTQ==$KdLVVMZfbYX0xbOG+jf7mCMr0GPWqthDgW88vNwEARLtdYVj8z8oFbDOYB+2O8obLgxAtqb/y814rcQyiQLB2g==', 'admin', '2026-10-07 18:52:20'),
(3, 'shindeswayam832@gmail.com', 'Swayam Shinde', '+91 87886 00004', 'scrypt$5GH/Nf3/TMdk7X01yPCfCQ==$4dbThGQXeuSjnPuxCX4paQR8gJ343JvODWxHbiKHFi1EhzXHTjvFnIqL1PTkgefmDw7I8q5n7UohBOd4jkXkQw==', 'customer', '2026-10-29 18:48:53'),
(5, 'amit.deshmukh@deshmukhlogistics.in', 'Amit Deshmukh (Deshmukh Logistics)', '+91 98220 14820', 'scrypt$+KiB1j1ACfRYdvBf3rtG2w==$LvToO2uxwyWSTfHHUJEid44JiPcvu+8nOHHcUr+i7fY6FXPiVVg3c/uV0x60QKJPa2GADYshkphVOq/BcYs+aw==', 'customer', '2026-01-15 11:30:00'),
(6, 'pooja.kulkarni@gmail.com', 'Pooja Kulkarni', '+91 98505 32190', 'scrypt$+KiB1j1ACfRYdvBf3rtG2w==$LvToO2uxwyWSTfHHUJEid44JiPcvu+8nOHHcUr+i7fY6FXPiVVg3c/uV0x60QKJPa2GADYshkphVOq/BcYs+aw==', 'customer', '2026-03-01 14:15:00'),
(7, 'sagar.jadhav.eng@gmail.com', 'Sagar Jadhav', '+91 97631 84920', 'scrypt$+KiB1j1ACfRYdvBf3rtG2w==$LvToO2uxwyWSTfHHUJEid44JiPcvu+8nOHHcUr+i7fY6FXPiVVg3c/uV0x60QKJPa2GADYshkphVOq/BcYs+aw==', 'customer', '2026-04-10 16:45:00'),
(8, 'dr.patil.clinic@gmail.com', 'Dr. Nilesh Patil (Patil Dental Clinic)', '+91 94220 55112', 'scrypt$+KiB1j1ACfRYdvBf3rtG2w==$LvToO2uxwyWSTfHHUJEid44JiPcvu+8nOHHcUr+i7fY6FXPiVVg3c/uV0x60QKJPa2GADYshkphVOq/BcYs+aw==', 'customer', '2026-05-02 09:20:00');

-- --------------------------------------------------------
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `token` varchar(191) NOT NULL,
  `user_id` int(11) NOT NULL,
  `expires_at` varchar(50) NOT NULL,
  PRIMARY KEY (`token`),
  KEY `idx_sessions_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`token`, `user_id`, `expires_at`) VALUES
('tdAyZEFoSNQ7rr1G2scPPRuHNuU-phciKx6dHFsaJiI', 1, '2026-11-12T18:50:08.807Z'),
('elWe7swJHtefl57BVgssf7NG35d3tpCTFvgxH5OCEm0', 1, '2026-11-15T04:18:18.183Z'),
('e487CIezRttB7w9BGefty4zt3jb9zBpPVjc2RsqCMiw', 1, '2026-11-15T07:50:12.844Z');

-- --------------------------------------------------------
-- Table structure for table `password_resets`
--

CREATE TABLE IF NOT EXISTS `password_resets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token_hash` varchar(191) NOT NULL,
  `expires_at` varchar(50) NOT NULL,
  `used_at` varchar(50) DEFAULT NULL,
  `created_at` varchar(50) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_resets_token` (`token_hash`),
  KEY `idx_resets_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`id`, `user_id`, `token_hash`, `expires_at`, `used_at`, `created_at`) VALUES
(1, 1, '83c23a7d31897fdf84577e86108819bb269b2dcdcc495d0ff6e931480156a31f', '2026-10-29T19:44:35.267Z', '2026-10-29 18:45:35', '2026-10-29 18:44:35'),
(2, 1, 'c4adda74881bdc032ff94842ff95e1c80c1ebeca0934550535cf9ca5a1e0c411', '2026-10-29T19:45:35.121Z', '2026-10-29 18:45:35', '2026-10-29 18:45:35'),
(3, 1, '17f26a91c9e82194c11da1fb8fef4104c87258156009997beaf0635c886fa8f0', '2026-10-29T19:45:35.706Z', '2026-10-29 18:45:35', '2026-10-29 18:45:35'),
(4, 3, '339f0a962aef6ccea14aede528f1ac7813d6b19f4eb2b6a77c642c836a985c1d', '2026-10-29T19:51:07.504Z', NULL, '2026-10-29 18:51:07');

-- --------------------------------------------------------
-- Table structure for table `plans`
--

CREATE TABLE IF NOT EXISTS `plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tagline` varchar(255) NOT NULL DEFAULT '',
  `price` int(11) NOT NULL DEFAULT 0,
  `mrp` int(11) NOT NULL DEFAULT 0,
  `coins` int(11) NOT NULL DEFAULT 0,
  `doorstep_visits` int(11) NOT NULL DEFAULT 0,
  `validity_days` int(11) NOT NULL DEFAULT 365,
  `benefits` longtext NOT NULL,
  `card_from` varchar(50) NOT NULL DEFAULT '#0b2545',
  `card_to` varchar(50) NOT NULL DEFAULT '#1d4e89',
  `card_text` varchar(50) NOT NULL DEFAULT '#ffffff',
  `card_pattern` varchar(50) NOT NULL DEFAULT 'circuit',
  `badge` varchar(100) NOT NULL DEFAULT '',
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `sort` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_plans_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `slug`, `name`, `tagline`, `price`, `mrp`, `coins`, `doorstep_visits`, `validity_days`, `benefits`, `card_from`, `card_to`, `card_text`, `card_pattern`, `badge`, `featured`, `active`, `sort`) VALUES
(1, 'basic', 'Basic', 'For single home desktop or student laptop in Chikhali & PCMC', 999, 1499, 500, 2, 365, '["2 Free Doorstep Visits across Chikhali & PCMC (Worth ₹700)","1 Year 100% Free Service Labour at Chikhali Workshop","₹500 Welcome Coins instantly credited to your card","30% Discount on Computer & Laptop consumable spares","Complimentary Annual Dust Cleaning & Thermal Paste Service","Priority Phone & WhatsApp Diagnostic Helpline"]', '#0f2a4a', '#2a5d8f', '#ffffff', 'circuit', '', 0, 1, 0),
(2, 'pro', 'Pro', 'For work-from-home pros, families & small offices in Pune', 1799, 2499, 1000, 4, 365, '["4 Free Doorstep Visits across PCMC & Pune (Worth ₹1,400)","1 Year 100% Free Service Labour for up to 3 household PCs","₹1,000 Welcome Coins usable against repairs & products","Free Windows 11 / Antivirus Health Tune-up every quarter","50% Discount on Data Backup & OS Reinstallation Labour","Same-Day Priority Technician Dispatch for urgent breakdowns","Free Pickup & Drop for complex motherboard repairs"]', '#062c5c', '#0a66c2', '#ffffff', 'circuit', 'Most Popular in PCMC', 1, 1, 1),
(3, 'pro-plus', 'Pro+', 'Complete IT AMC care for shops, clinics & factory units in Bhosari & Moshi', 2999, 4499, 2000, 8, 365, '["8 Free Scheduled & On-Demand Doorstep Visits (Worth ₹3,200)","Full Business IT Support for Shops, Clinics & Offices up to 10 systems","₹2,000 Welcome Coins usable against AMC, cables & upgrades","Complete CCTV & Network Health Check + Router Backup Config","Monthly Preventive Maintenance Visit to prevent sudden downtime","Emergency 2-Hour Response Time across Chikhali, Moshi & Bhosari","Dedicated Senior IT Account Engineer assigned to your premises"]', '#111418', '#3a3f47', '#ffffff', 'grid', 'Best for Business', 0, 1, 2);

-- --------------------------------------------------------
-- Table structure for table `memberships`
--

CREATE TABLE IF NOT EXISTS `memberships` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `card_number` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'pending',
  `start_date` varchar(50) DEFAULT NULL,
  `end_date` varchar(50) DEFAULT NULL,
  `visits_used` int(11) NOT NULL DEFAULT 0,
  `notes` text NOT NULL,
  `created_at` varchar(50) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_memberships_card` (`card_number`),
  KEY `idx_memberships_user` (`user_id`),
  KEY `idx_memberships_plan` (`plan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `memberships`
--

INSERT INTO `memberships` (`id`, `user_id`, `plan_id`, `card_number`, `status`, `start_date`, `end_date`, `visits_used`, `notes`, `created_at`) VALUES
(3, 3, 2, 'VB2699000001', 'active', '2026-02-01', '2027-01-31', 1, 'Registered member in Jadhav Wadi, Chikhali. 1 doorstep thermal maintenance visit completed.', '2026-02-01 10:15:00'),
(4, 5, 3, 'VB2610014820', 'active', '2026-01-15', '2027-01-14', 2, 'Pro+ Business Member at MIDC Bhosari. 2 networking maintenance visits logged.', '2026-01-15 11:30:00'),
(5, 6, 2, 'VB2620032190', 'active', '2026-03-01', '2027-02-28', 1, 'WFH Workstation & Laptop setup in Moshi. 1 SSD upgrade doorstep visit completed.', '2026-03-01 14:15:00'),
(6, 7, 1, 'VB2630084920', 'active', '2026-04-10', '2027-04-09', 0, 'Home desktop card at Jadhav Wadi, Chikhali. All 2 visits available.', '2026-04-10 16:45:00'),
(7, 8, 2, 'VB2640055112', 'pending', NULL, NULL, 0, 'Requested online for 3 clinic reception PCs and CCTV backup at Moshi Clinic.', '2026-05-02 09:20:00');

-- --------------------------------------------------------
-- Table structure for table `coin_ledger`
--

CREATE TABLE IF NOT EXISTS `coin_ledger` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `delta` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_at` varchar(50) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_coin_ledger_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `coin_ledger`
--

INSERT INTO `coin_ledger` (`id`, `user_id`, `delta`, `reason`, `created_by`, `created_at`) VALUES
(2, 3, 1000, 'Welcome coins credited on Pro Membership activation', 1, '2026-02-01 10:16:00'),
(3, 3, -250, 'Redeemed on doorstep thermal paste & fan tune-up (Bill #VB-4821)', 1, '2026-03-12 15:40:00'),
(4, 5, 2000, 'Welcome coins credited on Pro+ Business Card activation', 1, '2026-01-15 11:32:00'),
(5, 5, -400, 'Redeemed on Cat-6 networking cable & RJ45 crimping visit in MIDC Bhosari (Bill #VB-4410)', 1, '2026-02-18 17:10:00'),
(6, 5, 150, 'Loyalty cashback on Gigabit router purchase', 1, '2026-03-25 12:00:00'),
(7, 6, 1000, 'Welcome coins credited on Pro Membership activation', 1, '2026-03-01 14:16:00'),
(8, 6, -300, 'Redeemed on Kingston NVMe SSD upgrade labour at Chikhali workshop', 1, '2026-03-20 16:30:00'),
(9, 7, 500, 'Welcome coins credited on Basic Membership activation', 1, '2026-04-10 16:46:00');

-- --------------------------------------------------------
-- Table structure for table `services`
--

CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `short` text NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `h1` varchar(255) NOT NULL DEFAULT '',
  `intro` longtext NOT NULL,
  `problems` longtext NOT NULL,
  `includes` longtext NOT NULL,
  `benefits` longtext NOT NULL,
  `faqs` longtext NOT NULL,
  `note` text NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT '',
  `group_name` varchar(100) NOT NULL DEFAULT 'Repair',
  `footer` tinyint(1) NOT NULL DEFAULT 0,
  `published` tinyint(1) NOT NULL DEFAULT 1,
  `sort` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_services_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `slug`, `name`, `short`, `title`, `description`, `h1`, `intro`, `problems`, `includes`, `benefits`, `faqs`, `note`, `image`, `group_name`, `footer`, `published`, `sort`) VALUES
(1, 'computer-repair', 'Computer Repair', 'Desktop diagnosis, slow PCs, OS faults, component replacement and business computer support.', 'Computer Repair in Chikhali & Pimpri-Chinchwad | Virnobyte', 'Desktop and computer repair in Chikhali and Pimpri-Chinchwad: hardware diagnosis, slow PCs, Windows faults, component replacement and doorstep support for offices.', 'Computer Repair Services in Chikhali & Pimpri-Chinchwad', 'A desktop that won\'t start, restarts on its own or takes five minutes to open a spreadsheet usually has one clear cause — a failing drive, a weak power supply, overheating, or a corrupted Windows install. Our job is to find that cause before anything is replaced.\n\nBring your computer to our workshop in Chikhali or book a doorstep visit anywhere in Pimpri-Chinchwad. We test the hardware, check the operating system, and give you an itemised quote. Nothing is changed until you approve it.\n\nFor offices with several machines, we can work through them on-site so your team keeps working. If you need regular upkeep rather than one-off fixes, our [IT AMC plans](/services/amc-services) cover scheduled maintenance for every system you own.', '["Computer does not power on, or switches off after a few minutes","Very slow start-up, freezing or the spinning wheel on every click","Blue screen errors and automatic restarts","Windows will not boot, update loops or missing system files","Loud fans, burning smell or overheating","No display, distorted display or one monitor not detected","USB ports, audio or network adapter stopped working"]', '["Full hardware diagnosis — power supply, RAM, storage, motherboard and cooling","Operating system repair or clean reinstall with drivers","Component replacement with tested parts (SSD, RAM, SMPS, fans, graphics cards)","Dust cleaning and thermal paste replacement","Speed-up work: SSD upgrade, startup clean-up and storage health check","Desktop support for offices, on-site or carry-in"]', '["Diagnosis first, so you only pay for what actually fixes the problem","Itemised quote before work begins — no surprise charges","Tested, genuine components with the manufacturer or shop warranty passed on to you","Your data is left untouched unless you ask us to back it up or move it"]', '[{"q":"How much does computer repair cost in Pune?","a":"It depends on the fault. A software clean-up costs far less than a motherboard repair, so we diagnose first and then quote the exact parts and labour. You decide whether to go ahead after you see the quote."},{"q":"Do you provide doorstep computer service?","a":"Yes. We visit homes and offices in Chikhali, Pimpri-Chinchwad and nearby parts of Pune. Some repairs (board-level work, for example) need workshop equipment, in which case we take the machine with us and tell you when it will be ready."},{"q":"Will I lose my files during the repair?","a":"Most repairs do not touch your data. If a reinstall or drive replacement is needed, we tell you first and can back up your files before we start."}]', '', 'virnobyte-computer-repair-cpu', 'Repair & support', 1, 1, 0),
(2, 'laptop-repair', 'Laptop Repair', 'Screen, keyboard, battery, hinge, charging and motherboard repairs for all major brands.', 'Laptop Repair in Chikhali & Pune | Virnobyte', 'Laptop repair in Chikhali, Pimpri-Chinchwad and Pune: screen and keyboard replacement, battery, charging and motherboard repair, plus software fixes.', 'Professional Laptop Repair Services in Chikhali', 'Laptops fail in predictable ways: a cracked screen after a fall, keys that stop responding, a battery that lasts twenty minutes, a charging port that only works at one angle. Each of these is fixable, and most are fixable the same week.\n\nAt our Chikhali workshop we repair laptops from Dell, HP, Lenovo, Asus, Acer, Apple and other brands. Every job starts with a diagnosis so we can tell you whether a part needs replacing or simply reseating, cleaning or re-soldering.\n\nIf your laptop is slow rather than broken, an SSD and RAM upgrade is often cheaper than a new machine — see our [hardware solutions](/services/hardware-solutions). If it has stopped booting and your files matter most, start with [data recovery](/services/data-recovery).', '["Cracked, flickering or lined screen","Keyboard keys not working or typing the wrong characters","Battery not charging, draining quickly or swelling","Loose charging port or adapter not detected","Broken hinges or cracked body panels","Laptop overheating and shutting down","Water or liquid spill damage","Laptop on but no display, or stuck at the logo"]', '["Laptop screen replacement and display cable repair","Keyboard replacement and repair","Battery replacement with compatible or original batteries","Charging port, DC jack and adapter diagnosis","Hinge and body repair","Motherboard and chip-level repair","Fan cleaning, thermal paste and overheating fixes","Laptop software repair: Windows reinstall, drivers and virus clean-up"]', '["Brand-agnostic repairs — no need to wait weeks for a service centre","Clear advice on whether a repair is worth it for an older laptop","Parts sourced to match your exact model","Pick-up and drop available for homes and offices nearby"]', '[{"q":"Do you provide laptop repair in Chikhali?","a":"Yes — our workshop is at Sadichha Complex on Mahadev Temple Road, Jadhav Wadi, Chikhali. You can walk in or call ahead so a technician is ready for your laptop."},{"q":"How long does a laptop screen replacement take?","a":"If the screen for your model is in stock, usually the same or next working day. Less common panels have to be ordered, and we tell you the expected date before you approve the repair."},{"q":"Is it worth repairing an old laptop?","a":"Often yes. A failing hard disk or tired battery is inexpensive to replace and an SSD upgrade can make an older laptop feel new. If the repair would cost close to a replacement, we will say so."}]', '', 'virnobyte-laptop-repair', 'Repair & support', 1, 1, 1),
(3, 'cctv-installation', 'CCTV Installation', 'Home, shop, office and industrial CCTV with DVR/NVR setup, mobile viewing and maintenance.', 'CCTV Installation in Pune & Pimpri-Chinchwad | Virnobyte', 'CCTV camera installation in Pune and Pimpri-Chinchwad for homes, shops, offices and factories — site survey, HD/IP cameras, DVR/NVR setup, mobile viewing and maintenance.', 'CCTV Installation & Security Camera Solutions', 'A CCTV system is only useful if the cameras cover the right spots, the footage is clear at night, and someone can actually find a recording when it matters. We plan installations around those three things.\n\nEvery job starts with a site visit. We look at entrances, cash counters, parking, blind corners and lighting, then recommend the number and type of cameras — analog HD or IP — along with recording capacity for the number of days you need to keep footage.\n\nWe install the cameras, run and dress the cabling, configure the DVR or NVR, and set up live viewing on your phone. After installation, we can look after the system under an [annual maintenance contract](/services/amc-services) so cameras stay clean, aligned and recording.', '["Blind spots at gates, counters or parking areas","Grainy or dark footage at night","Recorder full or not saving older footage","Cannot view cameras on the phone","Cameras going offline or showing \\"no video\\"","Old analog system that needs upgrading"]', '["Site survey and camera placement plan","Home CCTV, shop CCTV, office CCTV and industrial CCTV","HD analog and IP camera installation","DVR / NVR setup with hard-disk sizing for your retention needs","Remote monitoring on mobile and desktop","Cabling, conduit and power backup for the recorder","CCTV maintenance, repair and upgrades"]', '["Coverage planned around your actual premises, not a fixed package","Clean, labelled cabling that is easy to maintain later","You are shown how to find, play back and export footage","One local team for installation, service and expansion"]', '[{"q":"Do you install CCTV for businesses?","a":"Yes. We install CCTV for shops, offices, clinics, warehouses and small factories, as well as homes and housing societies. Business installations start with a site survey so we can plan coverage and recording properly."},{"q":"Can I watch my CCTV cameras on my phone?","a":"Yes. We configure the recorder for remote viewing and set up the app on your phone during installation, so you can see live and recorded footage from anywhere with internet access."},{"q":"How many days of recording can I keep?","a":"It depends on the number of cameras, their resolution and the hard-disk size. We size the storage to the retention period you need and explain the trade-off before installation."}]', '', 'virnobyte-cctv-installation-pune', 'Security & networks', 1, 1, 2),
(4, 'networking', 'Networking', 'Office LAN, Wi-Fi setup, structured cabling, router and switch configuration, troubleshooting.', 'Networking Services in Pune | LAN & Wi-Fi Solutions | Virnobyte', 'Networking services in Pune and Pimpri-Chinchwad: office LAN installation, Wi-Fi setup, structured cabling, router configuration and troubleshooting.', 'Networking Services: LAN, Wi-Fi & Structured Cabling', 'Slow internet in one cabin, Wi-Fi that drops whenever the microwave runs, a printer that only some people can reach — most office network problems come down to placement, configuration or cabling.\n\nWe design and install networks for homes and businesses across Pune: structured cabling, switches, routers, access points and network racks. For existing networks we troubleshoot dead spots, IP conflicts, slow speeds and devices that won\'t connect.\n\nEvery installation is labelled and documented, so the next time something changes — a new cabin, more staff, a new internet line — the change is quick. Pair it with [CCTV](/services/cctv-installation) on the same cabling plan to save cost.', '["Weak Wi-Fi or dead zones in parts of the office or home","Internet slows down when more people connect","Printers or shared drives not reachable from some computers","Tangled, unlabelled cables that nobody can trace","Frequent disconnections or IP address conflicts","New office or floor that needs a network from scratch"]', '["Office LAN design and installation","Wi-Fi setup with access points for full coverage","Structured network cabling, patch panels and racks","Router, switch and firewall configuration","Network troubleshooting and performance tuning","Guest Wi-Fi separation and basic network security","Ongoing business network support"]', '["Coverage planned for the walls and floors you actually have","Labelled cabling and a simple network map handed over","Secure setup: changed default passwords and separated guest access","Easy to extend when your team grows"]', '[{"q":"Do you provide network installation services?","a":"Yes — from a single home router setup to full office LAN installations with structured cabling, switches and multiple Wi-Fi access points across Pune and Pimpri-Chinchwad."},{"q":"Why is my office Wi-Fi slow even with a fast internet plan?","a":"Common causes are a single router covering too large an area, interference from neighbouring networks, outdated equipment or too many devices on one band. A short site check usually pinpoints which one applies."},{"q":"Can you fix our existing messy cabling?","a":"Yes. We can re-terminate, label and dress existing cables, move equipment into a rack and document the layout so future changes are simple."}]', '', 'virnobyte-networking-services', 'Security & networks', 1, 1, 3),
(5, 'hardware-solutions', 'Hardware Solutions', 'RAM and SSD upgrades, new and refurbished systems, UPS, peripherals and custom PC builds.', 'Computer Hardware Solutions & Upgrades in Pune | Virnobyte', 'Computer hardware in Pune: SSD and RAM upgrades, new and refurbished laptops and desktops, UPS, printers and custom PC builds, installed for you.', 'Hardware Solutions, Upgrades & Supply', 'The right upgrade can add years to a computer. Moving from a hard disk to an SSD alone changes boot time from minutes to seconds, and extra RAM stops the freezing that comes with many browser tabs or accounting software.\n\nWe advise on, supply and install hardware for homes and offices — new and refurbished laptops and desktops, SSDs, RAM, graphics cards, UPS units, printers, CCTV equipment and networking gear. If you need a new system, we spec it around what you actually run rather than the most expensive option.\n\nBrowse what we commonly stock on the [products page](/products), or tell us what you need and we\'ll quote it.', '["Computer is slow but otherwise works","Not sure which upgrade will make the most difference","Need several matching systems for a new office","Power cuts damaging equipment or losing work","Want a custom PC for design, gaming or CAD work"]', '["SSD and RAM upgrades with data migration","New and refurbished laptops and desktops","Custom PC builds for office, design and gaming","UPS sizing and installation","Printers, monitors, keyboards and peripherals","Networking and CCTV equipment supply"]', '["Advice based on your workload, not the highest margin","Installation and data migration handled for you","Warranty documentation kept with your service record","One supplier for hardware and the service that follows"]', '[{"q":"Will an SSD really speed up my old computer?","a":"For most computers still running a hard disk, yes — it is usually the single biggest improvement. We check compatibility first and move your Windows installation and files across."},{"q":"Do you sell refurbished laptops?","a":"Yes. Refurbished systems are tested before sale and we explain the condition, specifications and warranty clearly so you know exactly what you are buying."}]', '', 'virnobyte-hardware-solutions', 'Business IT', 1, 1, 4),
(6, 'software-solutions', 'Software Solutions', 'Business software setup, licensing, email, Microsoft 365, accounting software support and automation.', 'Software Solutions & Support for Businesses in Pune | Virnobyte', 'Software solutions for Pune businesses: Microsoft 365 and email setup, licensing, accounting software support, backups, user management and practical automation.', 'Software Solutions for Homes & Businesses', 'Software problems cost time quietly: a shared mailbox nobody can access, an accounting package that won\'t open on the new PC, licences that expired without anyone noticing.\n\nWe set up and support the software your business depends on — operating systems, Microsoft 365 or Google Workspace, business email, accounting and billing software, antivirus, backups and user accounts. We also keep track of licences and renewals so nothing lapses unexpectedly.\n\nFor one-off installations on a single machine, see [software installation](/services/software-installation). For a fully bespoke setup across your office, see [custom IT solutions](/services/custom-it-solutions).', '["Business email not syncing across phone and laptop","Accounting or billing software errors after an update","Expired or unlicensed software on office machines","New employees waiting days for accounts and access","No central backup of important files"]', '["Microsoft 365 / Google Workspace setup and migration","Business email configuration on all devices","Genuine Windows and Office licensing","Accounting and billing software installation and support","User accounts, shared folders and permissions","Backup software and scheduled backups"]', '["Genuine licences, documented for audits","Faster onboarding for new staff","Fewer interruptions from updates and sync errors","A single point of contact for software issues"]', '[{"q":"Can you move our email to Microsoft 365 or Google Workspace?","a":"Yes. We plan the migration, move mailboxes, update DNS records and configure every device, usually with minimal downtime for your team."},{"q":"Do you provide genuine software licences?","a":"Yes. We supply genuine Windows, Office and antivirus licences and install them for you, so you are not exposed to unlicensed software risks."}]', '', 'virnobyte-software-solutions', 'Business IT', 1, 1, 5),
(7, 'data-recovery', 'Data Recovery', 'Recover files from failed hard disks, SSDs, pen drives, memory cards and deleted partitions.', 'Data Recovery in Pune | HDD & SSD Recovery | Virnobyte', 'Data recovery in Pune from hard disks, SSDs, pen drives and memory cards — deleted files, formatted and failed drives, with an honest assessment first.', 'Data Recovery from Hard Disks, SSDs & USB Drives', 'When a drive fails, what you do in the next hour matters more than anything else. Keep the device switched off, don\'t run recovery apps that write to the same drive, and don\'t open it up.\n\nWe recover data from hard disks, SSDs, pen drives and memory cards — deleted files, accidentally formatted drives, corrupted partitions and drives that are no longer detected. We start with an assessment that tells you what is likely to be recoverable before any paid work begins.\n\n**Recovery is never guaranteed.** The outcome depends on the condition of the storage device — physical damage, overwritten data and SSD TRIM all reduce what can be recovered. We will be clear about the realistic chances. Afterwards, set up [backups](/services/software-solutions) so it doesn\'t happen again.', '["Hard disk not detected or making clicking sounds","Files deleted by mistake or Recycle Bin emptied","Drive formatted accidentally","\\"Drive needs to be formatted\\" or RAW partition errors","Pen drive or memory card unreadable","Laptop not booting but files are needed urgently"]', '["Free initial assessment of the device","Hard disk data recovery (logical faults)","SSD data recovery where TRIM has not erased the data","Deleted file and formatted partition recovery","Pen drive and memory card recovery","Recovered data copied to a new drive you can keep"]', '["An honest assessment before you commit to paid recovery","Your data is handled privately and not shared","Original drive returned to you along with recovered files","Advice on preventing the same loss again"]', '[{"q":"Can you recover data from any hard disk?","a":"Not always. Success depends on how the drive failed and whether the data has been overwritten. We assess the drive first and explain what is realistically recoverable before you decide."},{"q":"What should I do before sending a hard drive for data recovery?","a":"Stop using it. Power it down, do not install recovery software onto it, and do not open the casing. Every write or power cycle can reduce what can be recovered."},{"q":"Is SSD data recovery possible?","a":"Sometimes. Many SSDs erase deleted data permanently through a feature called TRIM, which makes deleted-file recovery harder than on hard disks. Failed SSDs with intact data have better chances."}]', 'Recovery success depends on the condition of the storage device. We do not promise results before assessing the drive.', 'virnobyte-data-recovery-hard-disk', 'Repair & support', 1, 1, 6),
(8, 'printer-repair', 'Printer Repair', 'Inkjet, laser and thermal printer repair — paper jams, print quality, drums, boards and setup.', 'Printer Repair in Pimpri-Chinchwad & Pune | Virnobyte', 'Printer repair in Pimpri-Chinchwad and Pune for inkjet, laser and thermal printers: paper jams, faded prints, drum and roller replacement, network setup.', 'Printer Repair for Inkjet, Laser & Thermal Printers', 'Office printers tend to fail at the worst time — mid-invoice run, or just before a filing deadline. Most faults are mechanical (rollers, fusers, drums) or connectivity-related and can be fixed on-site.\n\nWe repair inkjet, laser and thermal printers from HP, Canon, Epson, Brother and other brands. We also set up network printing so everyone in the office can print without passing a USB cable around.', '["Frequent paper jams or paper not picking up","Faded, streaky or smudged prints","Error lights or codes on the display","Printer offline or not found on the network","Cartridge or toner not recognised"]', '["Roller, fuser, drum and pickup assembly replacement","Print-head cleaning and alignment","Board-level repair for common faults","Network and Wi-Fi printer setup","Thermal and billing printer repair","Cartridge and toner supply"]', '["On-site repair for most office printers","Honest advice when replacement is the better option","Genuine and compatible consumables available"]', '[{"q":"Do you repair printers on-site?","a":"For most jams, roller replacements and connectivity problems, yes. Board-level faults may need the printer to come to our workshop."},{"q":"Why are my laser prints faded?","a":"Usually low toner, a worn drum or a dirty transfer roller. We check each and replace only the part that is causing the problem."}]', '', 'virnobyte-printer-repair', 'Repair & support', 0, 1, 7),
(9, 'virus-removal', 'Virus Removal', 'Malware and virus clean-up, pop-up removal, browser hijack fixes and security hardening.', 'Virus Removal & Malware Cleanup in Pune | Virnobyte', 'Virus and malware removal in Pune: deep scans, pop-up and browser hijack fixes, ransomware advice, antivirus setup and security hardening.', 'Virus Removal & Computer Security Clean-up', 'Pop-ups that won\'t go away, a browser homepage that keeps changing, or a computer that suddenly runs hot doing nothing — these are typical signs of malware.\n\nWe remove viruses, adware and unwanted programs, repair the damage they leave behind, install proper antivirus, and close the gaps that let the infection in. If files have been encrypted by ransomware, contact us before paying anyone; we\'ll explain the options and check whether backups or [data recovery](/services/data-recovery) can help.', '["Constant pop-ups and unwanted ads","Browser redirects or changed search engine","Unknown programs starting automatically","Files renamed or encrypted","Antivirus disabled and cannot be turned back on"]', '["Deep malware scan and removal","Browser clean-up and reset","Antivirus installation and configuration","Windows updates and security settings","Ransomware assessment and backup check"]', '["Clean system without reinstalling where possible","Your files preserved throughout","Clear advice on avoiding re-infection"]', '[{"q":"Do I need to reinstall Windows to remove a virus?","a":"Not usually. Most infections can be cleaned in place. If the system is badly damaged, we back up your files first and then reinstall."}]', '', 'virnobyte-virus-removal-security', 'Repair & support', 0, 1, 8),
(10, 'it-consulting', 'IT Consulting', 'IT planning for growing businesses — hardware, networks, security, backups and vendor choices.', 'IT Consulting for Small Businesses in Pune | Virnobyte', 'IT consulting for small and growing businesses in Pune: technology planning, office IT setup, security and backup reviews, vendor selection and budgeting advice.', 'IT Consulting for Small & Growing Businesses', 'Most small businesses don\'t need a full-time IT department — they need someone who understands their setup and can answer "what should we do next?" honestly.\n\nWe review your current systems, identify risks (no backups, ageing hardware, weak passwords, single points of failure), and give you a prioritised plan with realistic costs. When you\'re ready, we can carry out the plan ourselves or work alongside your existing vendors.\n\nMoving into a new office? See our [office IT setup](/portfolio/office-it-setup) work and [networking services](/services/networking).', '["No clear picture of what IT the business owns","Unsure whether backups are working","Planning a new office or branch","Rising IT costs without clear benefit"]', '["IT health check and risk review","Office IT setup planning","Backup and security review","Hardware and software budgeting","Vendor and quotation review"]', '["Plain-language recommendations ranked by priority","Budgets you can plan around","Independent advice on vendor quotes"]', '[{"q":"Do we need an AMC or one-off consulting?","a":"If you want ongoing upkeep, an AMC is better value. If you need a plan for a specific change — a new office, a move to cloud email — a one-off consultation is usually enough."}]', '', 'virnobyte-it-consulting', 'Business IT', 0, 1, 9),
(11, 'amc-services', 'IT AMC Services', 'Annual maintenance contracts for computers, printers, networks and CCTV with scheduled visits.', 'IT AMC Services in Pune | Computer AMC | Virnobyte', 'IT AMC and computer AMC in Pune: preventive maintenance, hardware, software and network support, scheduled visits and priority troubleshooting.', 'IT AMC: Annual Maintenance Contracts for Businesses', 'An annual maintenance contract turns IT from a series of emergencies into a schedule. Instead of calling someone when a computer dies, a technician visits regularly to clean, update and check every system — and you get priority support when something does go wrong.\n\nOur IT AMC covers computers, laptops, printers, networks and CCTV. We agree the list of equipment, the visit frequency and the response time up front, so you know exactly what is covered.\n\nAMC plans are built around your equipment count, so pricing is quoted after a short survey. Individuals and very small offices may find a [membership card](/membership) a better fit.', '["Repeated breakdowns disrupting work","No record of what was serviced and when","Waiting days for a technician during emergencies","Unpredictable repair bills"]', '["Preventive maintenance visits on an agreed schedule","Hardware support for computers, laptops and printers","Software support, updates and antivirus checks","Network support and troubleshooting","CCTV health checks","Service log for every visit","Priority response for breakdowns"]', '["Fewer breakdowns and less downtime","Predictable annual IT costs","Business continuity through regular backup checks","One accountable team that knows your setup"]', '[{"q":"Do you provide annual IT maintenance contracts?","a":"Yes. We offer AMC for offices, shops, clinics and schools in Pune and Pimpri-Chinchwad, covering computers, printers, networks and CCTV."},{"q":"What is not covered in an AMC?","a":"Replacement parts and consumables are usually charged separately unless agreed otherwise. Your contract lists exactly what is and is not included."}]', '', 'virnobyte-amc-services', 'Business IT', 1, 1, 10),
(12, 'inverter-installation', 'Inverter Installation', 'Inverter and battery installation, UPS for computers, wiring and power-backup maintenance.', 'Inverter & UPS Installation in Pimpri-Chinchwad | Virnobyte', 'Inverter, battery and UPS installation in Pimpri-Chinchwad and Pune for homes, shops and offices — load assessment, wiring, installation and maintenance.', 'Inverter, Battery & UPS Installation', 'Power cuts and voltage fluctuations are among the most common causes of damaged computers, corrupted drives and lost work. The right backup depends on what you need to keep running and for how long.\n\nWe assess your load — computers, routers, CCTV recorders, lights and fans — and recommend an inverter, battery or online UPS that matches. Then we install it with proper wiring and earthing, and maintain it so the batteries last.', '["Computers shutting down during power cuts","CCTV recorder losing footage when power drops","Inverter backup time much shorter than before","Battery needs frequent topping up"]', '["Load assessment and sizing","Inverter and battery installation","UPS for computers, servers and networking equipment","Wiring and changeover","Battery health checks and maintenance"]', '["Equipment protected from cuts and fluctuations","Backup sized to what you actually need","Safe, tidy installation"]', '[{"q":"What size inverter do I need?","a":"It depends on the total load you want to run and the backup time you need. We list your appliances, calculate the load and recommend the inverter and battery capacity."}]', '', 'virnobyte-circuit-board', 'Business IT', 0, 1, 11),
(13, 'software-installation', 'Software Installation', 'Windows installation, drivers, Office, antivirus and licensed software set up correctly.', 'Software & Windows Installation in Chikhali | Virnobyte', 'Windows and software installation in Chikhali and Pimpri-Chinchwad: OS install, drivers, Microsoft Office, antivirus and licensed software.', 'Windows & Software Installation', 'A clean, correctly configured installation saves hours of troubleshooting later. We install Windows with the right drivers for your hardware, set up Office and the software you use every day, activate genuine licences and move your files back in place.\n\nFor business-wide software setup — email, user accounts and backups — see [software solutions](/services/software-solutions).', '["New computer needs setting up","Windows corrupted or too slow to use","Missing drivers — no Wi-Fi, sound or display resolution","Software asks for activation or shows licence warnings"]', '["Windows installation and updates","Driver installation for all hardware","Microsoft Office and productivity software","Antivirus installation","Software licensing and activation","File and settings transfer"]', '["A clean system that runs the way it should","Genuine, activated software","Files and settings carried over"]', '[{"q":"Will reinstalling Windows delete my files?","a":"A clean install does replace the system drive, so we back up your files first and restore them afterwards."}]', '', 'virnobyte-software-installation', 'Repair & support', 0, 1, 12),
(14, 'custom-it-solutions', 'Custom IT Solutions', 'Servers, NAS, cloud backup, rack installation and complete IT setups designed for your business.', 'Custom IT Solutions for Businesses in Pune | Virnobyte', 'Custom IT solutions in Pune: servers, NAS storage, cloud backup, rack installation, office IT infrastructure and complete setups designed around how your business works.', 'Custom IT Solutions & Infrastructure', 'Some requirements don\'t fit a standard service — a shared file server for a design studio, off-site backup for a clinic, a small server rack for a growing office, or a complete IT setup for a new branch.\n\nWe design these solutions around how your team works, then supply, install and support them. The aim is always the simplest setup that does the job reliably.', '["Files scattered across individual computers","No off-site copy of business data","Outgrowing a single router and a few PCs","Opening a new branch or office"]', '["File servers and NAS storage","Cloud and off-site backup","Server rack and IT room setup","Complete office IT infrastructure","Remote access for staff"]', '["Designed around your workflow","Supplied, installed and supported by one team","Documented so it can grow with you"]', '[{"q":"Can you set up a shared drive for our office?","a":"Yes. Depending on your size, we recommend either a NAS device or a cloud-based shared drive, set up with the right permissions for each team member."}]', '', 'virnobyte-custom-it-solutions-server', 'Business IT', 0, 1, 13),
(29, 'website-development', '3D Website Development', 'Interactive 3D futuristic websites, Three.js & WebGL animations, 4K high-resolution visuals and modern web engineering.', '3D Futuristic Website & Three.js Web Development | Virnobyte', 'Futuristic 3D website development in Pune: WebGL & Three.js interactive experiences, ultra-sharp 4K visual assets, 3D product configurators, and blazing-fast performance.', '3D Futuristic Website & WebGL Development', 'Standard static websites are no longer enough to leave a lasting impression in a high-tech digital economy. We engineer cutting-edge, 3D futuristic websites powered by **Three.js, WebGL, WebGPU, and modern reactive frameworks** that elevate your brand into an interactive, spatial experience.\n\nFrom real-time 3D product configurators and particle effects to smooth physics simulations and ultra-high-resolution 4K asset rendering, our websites deliver cinematic visual fidelity without compromising loading speed or search engine rankings.\n\nEvery 3D web experience is optimized from the ground up: mesh compression (Draco/KTX2), adaptive Level-of-Detail (LOD), dynamic lighting shaders, and hardware-accelerated 60+ FPS performance across both smartphones and 4K desktop monitors.\n\nWhether you are launching an innovative tech startup, an architectural studio, an e-commerce showcase, or a modern business ready for a next-generation web presence, our Pune development team designs, models, and ships the full production build.', '["Flat, outdated 2D websites that fail to differentiate your brand from competitors","Heavy, unoptimized 3D models and bloated images that cause slow page loads and mobile lag","Pixelated, blurry graphics on high-DPI Retina and 4K desktop screens","Inability for online customers to inspect or configure complex physical products in 3D","High bounce rates due to lack of interactive visual engagement","Concerns that rich 3D graphics will harm SEO rankings and mobile responsiveness"]', '["Custom Three.js, WebGL & WebGPU 3D canvas development with interactive camera controls","Ultra-sharp 4K high-resolution texture mapping and Physically Based Rendering (PBR)","Interactive 3D product showcases with 360-degree rotation, zoom, and exploded views","Futuristic UI/UX design: glowing accents, cyber grids, micro-animations, and glassmorphism","GPU & mobile optimization: Draco geometry compression, LOD scaling, and 60+ FPS stability","Full-stack architecture: lightning-fast SSR, clean SEO metadata, and CDN asset delivery","Integration with contact forms, CRM, booking engines, and payment gateways","Responsive design across iOS, Android, tablets, laptops, and ultra-wide 4K monitors"]', '["Unrivalled visitor engagement that keeps prospects exploring your website significantly longer","Photorealistic 4K clarity on high-resolution displays engineered for rapid loading","SEO-friendly SSR structure: Googlebot indexes all copy while users enjoy full 3D interactivity","Direct development by engineers experienced in 3D mathematics, shader pipelines, and web performance","Turnkey delivery: 3D asset optimization, UI design, hosting setup, and long-term support"]', '[{"q":"Will a 3D futuristic website run smoothly on budget smartphones?","a":"Yes. We build adaptive WebGL experiences using dynamic resolution scaling, low-draw-call geometry, and Draco compression. If a device has an entry-level GPU or battery-saver mode enabled, the scene gracefully adjusts detail levels to maintain a smooth 60 FPS framerate."},{"q":"How do you handle 4K high-resolution visual assets without slowing down the site?","a":"We use modern next-gen image and texture pipelines including WebP/AVIF textures, mipmapping, and progressive asset streaming. Crucial visual textures load in crisp 4K fidelity while assets are fetched asynchronously in the background so initial load time stays under 2 seconds."},{"q":"Do 3D Three.js websites affect SEO and Google search rankings?","a":"No, they actually boost SEO. We separate the 3D WebGL canvas from the semantic HTML layer. All text, titles, headings, and schema markup are server-rendered and instantly crawled by search engines, while longer user dwell time positively signals engagement to Google."},{"q":"Can you convert our existing product models or CAD files into web 3D?","a":"Yes. We optimize CAD/STEP, OBJ, FBX, or Blender files into lightweight web-standard GLTF/GLB models, apply realistic PBR materials, and add lighting and interactions."},{"q":"What is the typical timeline and process for a 3D website project?","a":"A typical project spans 2 to 4 weeks: Phase 1 covers concept design and 3D scene architecture; Phase 2 builds the interactive Three.js components and UI; Phase 3 focuses on cross-device performance optimization, SEO, and launch."}]', 'Built with Three.js, WebGL and 4K asset optimization for buttery smooth 60 FPS across desktop and mobile.', 'virnobyte-gaming-pc-build', 'Business IT', 1, 1, 14);

-- --------------------------------------------------------
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `body` longtext NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT '',
  `related` longtext NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT 1,
  `published_at` varchar(50) NOT NULL,
  `updated_at` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_posts_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `slug`, `title`, `description`, `body`, `image`, `related`, `published`, `published_at`, `updated_at`) VALUES
(1, 'how-to-choose-a-computer-repair-service-in-pune', 'How to Choose a Computer Repair Service in Pune', 'Six practical checks before you hand over your computer or laptop for repair in Pune — from diagnosis and quotes to data privacy and warranty.', 'Handing over a computer means handing over your work, your photos and often your business records. A good repair service makes that feel safe. Here is what to check before you choose one.\n\n## 1. They diagnose before they quote\n\nA reliable technician will not quote a price for "slow computer" over the phone. Slowness can be a full drive, a failing hard disk, malware or overheating — each with a very different cost. Look for a shop that inspects the machine first and then gives you an itemised quote.\n\n## 2. The quote is itemised and approved by you\n\nYou should see parts and labour listed separately, and nothing should be replaced until you say yes. If the shop finds something new during the repair, they should call you before going further.\n\n## 3. They respect your data\n\nAsk how your files are handled. Most repairs don\'t touch your data at all. If a reinstall or drive replacement is needed, the technician should tell you and offer to back up your files first. Your files should never be copied or browsed without reason.\n\n## 4. Parts are tested and the warranty is clear\n\nAsk whether parts are new, refurbished or compatible, and what warranty applies. A good shop tells you this without being asked.\n\n## 5. They will tell you when a repair isn\'t worth it\n\nIf fixing a seven-year-old laptop will cost close to a new one, an honest technician will say so — and may suggest an [SSD and RAM upgrade](/services/hardware-solutions) as a cheaper middle path.\n\n## 6. They are easy to reach after the repair\n\nProblems sometimes return. A local shop with a fixed address and a working phone number is much easier to go back to than a pick-up service you can\'t trace.\n\n## Where Virnobyte fits\n\nOur workshop is in Chikhali, Pimpri-Chinchwad, and we visit homes and offices across Pune. Every [computer repair](/services/computer-repair) and [laptop repair](/services/laptop-repair) job starts with a diagnosis and an itemised quote. Call or WhatsApp us to describe the problem and we will tell you whether it needs a visit or a workshop check.', 'virnobyte-technician-computer-repair', '["computer-repair","laptop-repair"]', 1, '2026-09-15', '2026-09-15'),
(2, 'common-laptop-problems-and-solutions', 'Common Laptop Problems and How They Are Fixed', 'The laptop faults we see most often — battery drain, overheating, broken screens, keyboard failures, charging problems — what causes them and what fixing them involves.', 'Most laptop faults fall into a handful of familiar patterns. Knowing which one you have helps you decide whether it\'s a quick fix or a bigger repair.\n\n## Battery drains quickly or won\'t charge\n\nLaptop batteries wear out after a few hundred charge cycles. If yours lasts a fraction of what it used to, the battery likely needs replacing. If it doesn\'t charge at all, the cause can also be the adapter, the charging port or the charging circuit on the board — which is why diagnosis matters.\n\n**Watch out for:** a battery that bulges or lifts the touchpad. Stop using the laptop and get it checked; swollen batteries are a safety risk.\n\n## Overheating and sudden shutdowns\n\nDust blocks the fan and heatsink over time, and the thermal paste between the processor and heatsink dries out. Cleaning and re-pasting usually brings temperatures back to normal and stops the shutdowns.\n\n## Cracked or flickering screen\n\nA crack needs a replacement panel matched to your model. Flickering or lines that change when you move the lid often point to a damaged display cable instead, which is a cheaper repair.\n\n## Keyboard keys not working\n\nSpills are the usual cause. On many models the keyboard is replaced as one unit; on some it is riveted to the top case, which affects cost and time.\n\n## Laptop is slow\n\nBefore buying a new laptop, check the storage. Many slow laptops still run on hard disks. Moving to an SSD — and adding RAM where the board allows it — is often the most cost-effective upgrade. See [hardware solutions](/services/hardware-solutions).\n\n## Laptop won\'t turn on at all\n\nThis can be anything from a dead adapter to a motherboard fault. If your files are the priority, say so up front: the drive can usually be removed and read separately, and [data recovery](/services/data-recovery) can begin while the laptop itself is being repaired.\n\n## Getting it fixed\n\nOur [laptop repair](/services/laptop-repair) service covers all of the above for Dell, HP, Lenovo, Asus, Acer, Apple and other brands, at our Chikhali workshop or with pick-up from nearby homes and offices.', 'virnobyte-laptop-workspace', '["laptop-repair","hardware-solutions","data-recovery"]', 1, '2026-09-22', '2026-09-22'),
(3, 'how-to-maintain-office-computers', 'How to Maintain Office Computers: A Practical Checklist', 'A simple weekly, monthly and yearly maintenance checklist for small office computers that reduces breakdowns and keeps data safe.', 'Most office computer breakdowns are preventable. A little routine maintenance — done consistently — keeps machines running longer and protects your data.\n\n## Every week\n\n- **Restart computers** at least once. Many updates only finish on restart.\n- **Check backups ran.** Open the backup tool or drive and confirm there is a recent copy.\n- **Keep desks clear** around the computer\'s vents.\n\n## Every month\n\n- **Install Windows and software updates** that are waiting.\n- **Check antivirus** is active and its definitions are current.\n- **Free up storage** — empty Downloads folders and remove unused programs.\n- **Review user accounts** and remove access for anyone who has left.\n\n## Every six months\n\n- **Clean dust** from vents, fans and keyboards.\n- **Check drive health.** Early warning signs of a failing drive are worth acting on before files are lost.\n- **Test a restore** from backup — a backup you can\'t restore isn\'t a backup.\n\n## Every year\n\n- **Review hardware age.** Plan replacements for machines approaching five years.\n- **Renew licences** for Windows, Office, antivirus and business software before they lapse.\n- **Check power protection.** UPS batteries weaken over time.\n\n## When to hand it over\n\nIf you have more than a handful of computers, this list takes real time every month. An [IT AMC](/services/amc-services) means a technician does it on a schedule and keeps a log of every visit. For one-off problems, our [computer repair](/services/computer-repair) team can help; for a broader plan, start with [IT consulting](/services/it-consulting).', 'virnobyte-office-it-setup', '["amc-services","computer-repair","it-consulting"]', 1, '2026-09-29', '2026-09-29'),
(4, 'how-often-should-cctv-systems-be-serviced', 'How Often Should a CCTV System Be Serviced?', 'What CCTV maintenance involves, how often cameras and recorders should be checked, and the warning signs that a system needs attention now.', 'A CCTV system can look fine on the monitor and still fail when you need it — a recorder that stopped saving footage weeks ago, or a camera that has slowly drifted away from the gate.\n\n## A sensible schedule\n\nFor most homes and small businesses, a **professional check every six months** is a good baseline. Busy commercial sites, dusty industrial areas and outdoor-heavy installations benefit from **quarterly** checks.\n\n## What a service visit covers\n\n- **Recording check:** confirm every camera is recording and that footage goes back as many days as expected.\n- **Hard-disk health:** recorders write continuously, and their drives wear out. A failing disk is the most common reason footage is missing.\n- **Lens cleaning and alignment:** dust, spider webs and bumps reduce image quality and shift the field of view.\n- **Night vision test:** infrared LEDs weaken over time.\n- **Cable and connector inspection:** outdoor connectors corrode, especially through the monsoon.\n- **Remote viewing:** confirm the mobile app still connects.\n- **Date and time:** a wrong timestamp can make footage useless as evidence.\n\n## Signs it needs attention now\n\n- A camera shows "no video" or a black screen\n- Playback has gaps or only goes back a day or two\n- Night footage is grey or blurry\n- The app on your phone can\'t connect\n\n## Getting it done\n\nWe service systems we installed and ones we didn\'t. For predictable upkeep, add CCTV to an [IT AMC](/services/amc-services). If you\'re planning a new system or an upgrade, see [CCTV installation](/services/cctv-installation).', 'virnobyte-cctv-installation-pune', '["cctv-installation","amc-services"]', 1, '2026-10-02', '2026-10-02'),
(5, 'benefits-of-it-amc-for-small-businesses', 'Benefits of an IT AMC for Small Businesses', 'What an IT annual maintenance contract covers, how it compares with paying per repair, and how to tell whether your business needs one.', 'For a small business, every hour a computer, printer or network is down is an hour of lost work. An IT AMC (annual maintenance contract) is designed to make those hours rarer and shorter.\n\n## What an IT AMC typically includes\n\n- Scheduled preventive maintenance visits\n- Hardware and software troubleshooting\n- Network and printer support\n- Antivirus, update and backup checks\n- A log of every visit and fix\n- Priority response when something breaks\n\nParts and consumables are usually billed separately — a good contract states this clearly.\n\n## AMC vs paying per repair\n\n**Paying per repair** works if you have one or two computers and rarely have problems. **An AMC** makes sense once you have several systems, depend on a network or shared printer, or simply can\'t afford unplanned downtime. The real value is preventive: dust cleaning, drive checks and timely updates stop many faults from happening at all.\n\n## Business continuity\n\nAn AMC technician who visits regularly gets to know your setup, which makes emergencies faster to resolve. Regular backup checks also mean that if a drive does fail, your data is already safe somewhere else.\n\n## Is it right for you?\n\nConsider an AMC if:\n\n- you have five or more computers or a shared network\n- the same problems keep coming back\n- nobody in-house "owns" IT\n- you\'ve lost work to a failure before\n\nOur [IT AMC services](/services/amc-services) cover computers, printers, [networks](/services/networking) and CCTV across Pune and Pimpri-Chinchwad. If you\'re not sure what you need, start with a short [IT consulting](/services/it-consulting) review.', 'virnobyte-amc-services', '["amc-services","it-consulting","networking"]', 1, '2026-10-04', '2026-10-04'),
(6, 'what-to-do-before-sending-a-hard-drive-for-data-recovery', 'What to Do Before Sending a Hard Drive for Data Recovery', 'The steps that protect your chances of getting data back from a failed or deleted drive — and the common mistakes that make recovery harder.', 'When a drive fails or files disappear, the instinct is to try everything at once. Unfortunately, many of those attempts reduce what can be recovered.\n\n## Do this\n\n1. **Stop using the drive immediately.** Every new file written can overwrite deleted data.\n2. **Power it down** if the drive is clicking, buzzing or not detected. Repeated power cycles can worsen physical damage.\n3. **Note what happened** — dropped, liquid spill, sudden power cut, accidental format. This helps the technician choose the right approach.\n4. **List the files that matter most** so recovery can focus on them first.\n5. **Keep the drive in a dry, padded container** while transporting it.\n\n## Avoid this\n\n- Installing recovery software onto the same drive\n- Running disk-repair utilities that "fix" the file system\n- Opening the drive casing\n- Putting the drive in the freezer (an old myth that causes condensation damage)\n- Formatting the drive because Windows suggests it\n\n## What to expect\n\nA proper data recovery service will assess the drive first and tell you what is realistically recoverable. Outcomes depend on the drive\'s condition: physical damage, overwritten data and TRIM on SSDs all reduce what can be retrieved. Be cautious of anyone who guarantees full recovery before seeing the device.\n\n## After recovery\n\nSet up automatic backups so one failure never costs you everything again — our [software solutions](/services/software-solutions) team can configure them. For recovery itself, see [data recovery](/services/data-recovery).', 'virnobyte-hard-disk-drive', '["data-recovery","software-solutions"]', 1, '2026-10-06', '2026-10-06'),
(7, 'computer-laptop-repair-cost-pune-pcmc', 'How Much Does Computer & Laptop Repair Cost in Pune & PCMC? (2026 Price Guide)', 'Real 2026 price breakdown for desktop and laptop repair in Pune, Chikhali & Pimpri-Chinchwad: diagnosis fees, SSD upgrades, screen replacements, virus removal, and OS fixes.', '## Understanding Repair Pricing in Pune & Pimpri-Chinchwad\n\nWhen your computer won\'t boot or your laptop screen cracks, the biggest frustration is getting vague quotes over the phone, only to be charged double once the technician opens the machine.\n\nAt Virnobyte\'s workshop on Mahadev Temple Road in Chikhali, we follow a strict **Diagnosis-First Policy**: we run component stress tests, inspect the power rails, and provide a transparent itemised estimate before turning a single screw.\n\n### 2026 Standard IT Service Benchmarks in PCMC\n\n| Service Type | Typical Cost (INR) | Turnaround Time | Warranty |\n| :--- | :--- | :--- | :--- |\n| **Comprehensive Hardware Diagnosis** | ₹200 – ₹350 | 1 – 2 Hours | Free if repair approved |\n| **Windows 11 Clean Reinstall + Drivers** | ₹500 – ₹800 | 2 – 4 Hours | 30 Days OS support |\n| **512GB NVMe SSD Upgrade (Installed)** | ₹2,800 – ₹3,800 | Same Day | 3 – 5 Years Mfr Warranty |\n| **Laptop Screen Replacement (15.6" FHD)**| ₹3,500 – ₹5,800 | 24 Hours | 6 – 12 Months Warranty |\n| **Laptop Hinge & Fabricated Body Repair** | ₹1,200 – ₹2,200 | 1 – 2 Days | Structural strength test |\n| **Motherboard Chip-Level Component Repair**| ₹1,500 – ₹3,500 | 2 – 3 Days | 3 Months Warranty |\n\n### Why SSD Upgrades Are the #1 Speed Fix for Old Laptops\n\nIf your laptop takes 5 minutes to boot, replacing an old spinning hard drive (HDD) with a solid-state drive (SSD) makes it **5x to 8x faster** without buying a new ₹50,000 laptop. We migrate your Windows install, files, and bookmarks intact.\n\n### How Virnobyte Membership Saves You Money\n\nWith a **Virnobyte Membership Card**, 100% of the service labour is waived for a full year, and you get free doorstep visits across Chikhali, Moshi, Bhosari, and Nigdi.', 'virnobyte-laptop-repair', '["computer-repair","laptop-repair","hardware-solutions"]', 1, '2026-10-15', '2026-10-25'),
(8, 'cctv-camera-installation-guide-factories-shops-pcmc', 'Complete CCTV Installation Guide for Shops & Small Factories in Chikhali & Bhosari', 'Everything shop owners and factory managers in Pimpri-Chinchwad need to know about IP vs HD cameras, NVR storage calculation, night color vision, and PCMC local regulations.', '## Securing Your Business in Pimpri-Chinchwad Industrial Belt\n\nIndustrial areas like **MIDC Bhosari, Chikhali, and Talawade** have specific security challenges: heavy dust from machine shops, vibration from presses, outdoor perimeter exposure, and nighttime movement.\n\nInstalling consumer plastic cameras in a factory environment results in blurred lenses, burned power supplies, and premature failure within six months.\n\n### Key Decisions for Factory & Shop Surveillance\n\n#### 1. IP Cameras vs. Analog HD Cameras\n- **Analog HD (TVI/CVI)**: Lower cost, ideal for small retail shops with cables under 60 meters.\n- **PoE IP Cameras**: Superior 4K resolution, single Cat-6 cable for power and video, immune to electrical noise from heavy industrial machinery.\n\n#### 2. Full Color Night Vision (ColorVu / Full-Color)\nStandard infrared cameras switch to grainy black-and-white in the dark. Modern ColorVu sensors retain full color at midnight, enabling clear identification of vehicle license plates and clothing colors.\n\n#### 3. Storage Sizing on WD Purple Hard Drives\nDo not use regular desktop hard drives in a CCTV recorder. Desktop drives fail when writing video 24/7. Always use surveillance-rated drives like **Western Digital Purple** or **Seagate SkyHawk**:\n- **8 Cameras @ 4K, 15 FPS, H.265**: 4TB gives ~18 days; 8TB gives ~35 days continuous retention.\n\n### On-Site Survey Across PCMC\nVirnobyte conducts on-site surveys with camera angle modeling for factories and warehouses across Chikhali, Moshi, and Bhosari.', 'virnobyte-cctv-installation-pune', '["cctv-installation","networking"]', 1, '2026-10-20', '2026-10-28'),
(9, 'it-amc-guide-small-business-pune', 'Why Small Businesses in PCMC Are Switching to IT AMC & Membership Support', 'How annual maintenance contracts and membership cards protect businesses in Chikhali, Bhosari and Pune from downtime, data loss, and unpredictable repair bills.', '## The True Cost of Unexpected IT Downtime\n\nWhen a billing counter desktop freezes in a busy shop or an accounting machine crashes on audit week, the cost is rarely just the ₹1,000 repair bill. It\'s lost customer trust, idle staff, and hours of stressful troubleshooting.\n\nMost small businesses in **Chikhali, Pimpri-Chinchwad, and Pune** operate with 3 to 15 computers without a dedicated in-house IT department.\n\n### Reactive "Break-Fix" vs. Proactive IT AMC\n\n| Factor | Calling a Random Mechanic | Virnobyte IT AMC / Pro+ Membership |\n| :--- | :--- | :--- |\n| **Response Time** | 6 to 24 Hours (whenever available) | **Guaranteed 2-Hour Priority Dispatch** |\n| **Preventive Maintenance** | None — only fixed after it breaks | **Monthly Dust Cleaning & Health Tune-Up** |\n| **Backup Verification** | Manual or forgotten | **Automated Local & Cloud Backup Audits** |\n| **Network & CCTV Security**| Ignored | **Quarterly Router & Camera Firmware Updates** |\n| **Cost Predictability** | Unpredictable spike expenses | **Fixed Annual Fee + Discounted Consumables** |\n\n### How Our IT AMC Works for PCMC Businesses\n\n1. **Initial Audit**: We catalog every machine, check drive health, and patch operating systems.\n2. **Preventive Schedule**: Technicians visit on scheduled dates to clean hardware and verify backups.\n3. **Emergency Support**: Direct hotline with remote desktop assistance in 15 minutes and doorstep dispatch if hardware fails.', 'virnobyte-office-it-setup', '["amc-services","it-consulting"]', 1, '2026-10-25', '2026-10-30');

-- --------------------------------------------------------
-- Table structure for table `faqs`
--

CREATE TABLE IF NOT EXISTS `faqs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `answer` longtext NOT NULL,
  `topic` varchar(100) NOT NULL DEFAULT 'General',
  `home` tinyint(1) NOT NULL DEFAULT 0,
  `published` tinyint(1) NOT NULL DEFAULT 1,
  `sort` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `topic`, `home`, `published`, `sort`) VALUES
(11, 'Which areas in Pimpri-Chinchwad and Pune do you provide doorstep computer repair?', 'Virnobyte provides on-site doorstep computer, laptop, and CCTV repair across Chikhali, Jadhav Wadi, Moshi, Bhosari, Spine Road, Talawade IT Park, Nigdi, Akurdi, Pradhikaran, Pimple Saudagar, Wakad, and northern Pune. Technicians carry common testing equipment, cables, and SSDs for same-day on-site resolution.', 'General', 1, 1, 0),
(12, 'Where is the Virnobyte workshop located for carry-in repairs?', 'Our walk-in workshop is located at Office No. 1, Sadichha Complex, near Bright Computer Education, Savtamali, Mahadev Temple Road, Jadhav Wadi, Chikhali, Pimpri-Chinchwad, Maharashtra 411062. We are open Monday to Saturday from 9:30 AM to 8:30 PM with dedicated diagnostic stations.', 'General', 1, 1, 1),
(13, 'How does the Virnobyte Membership Card save money for homes and small businesses?', 'A Virnobyte Membership Card gives you 1 year of 100% free service labour, free doorstep visits (2 to 8 visits depending on plan), and welcome coins credited instantly to your card (₹500 to ₹2,000 value). Coins can be redeemed toward component upgrades, consumables, and cables. Members also get 2-hour priority emergency dispatch.', 'Membership', 1, 1, 2),
(14, 'What is your typical turnaround time for laptop repairs in Chikhali?', 'Software issues, Windows reinstallation, RAM upgrades, and SSD replacements are typically completed in 2 to 4 hours. Screen replacements, keyboard swaps, and battery changes take 24 hours. Complex chip-level motherboard or hinge fabrication repairs take 1 to 3 business days, with thorough stress testing before delivery.', 'Repairs', 1, 1, 3),
(15, 'Do you provide CCTV installation with mobile live view for factories and shops?', 'Yes. We design and install complete Hikvision, CP PLUS, and Dahua IP and HD CCTV surveillance systems for industrial plants in MIDC Bhosari and Chikhali, as well as retail shops across PCMC. Every installation includes Cat-6 conduit wiring, heavy-duty surge protection, NVR storage sizing, and secure live streaming setup on mobile phones and tablets.', 'CCTV & networking', 1, 1, 4),
(16, 'What does an IT AMC (Annual Maintenance Contract) cover for a small business?', 'Our Business IT AMC covers routine preventative maintenance, quarterly dust cleaning and thermal paste replacement, automated daily database backups, network security audits, printer troubleshooting, and rapid on-site emergency breakdown response. Plans are customizable for offices with 3 to 50 systems.', 'Business IT', 1, 1, 5),
(17, 'Can I lose my files or photos during computer repair?', 'No. We adhere to a strict data safety protocol. Unless a customer explicitly requests drive formatting or data wiping, all storage drives are isolated before hardware repairs begin. If a drive is failing, we notify you immediately and can create an encrypted clone before attempting component repair.', 'Repairs', 0, 1, 6),
(18, 'How do I redeem my Virnobyte coins when booking a service?', 'When you book a service online or pay at our Chikhali counter, provide your 12-digit membership card number (e.g. VB2699000001) or registered mobile number. Your available coin balance is displayed in your account portal and can offset up to 50% of labour and consumable charges on your invoice.', 'Membership', 0, 1, 7);

-- --------------------------------------------------------
-- Table structure for table `testimonials`
--

CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT '',
  `quote` text NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT 0,
  `sort` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `role`, `quote`, `published`, `sort`) VALUES
(4, 'Sanjay Shinde', 'Director, Shinde Tooling & Dies, MIDC Bhosari', 'Virnobyte has been managing our factory computers and CCTV in Bhosari for 3 years. When our accounting server crashed on GST filing day, their technician arrived within 40 minutes at our shop floor and had our data restored before lunch. Truly dependable local IT support in PCMC.', 1, 0),
(5, 'Dr. Radhika Nair', 'Chief Consultant, CarePoint Clinic, Chikhali', 'We took the Virnobyte Pro IT membership card for our clinic. Having free doorstep service visits and welcome coins that offset our printer consumables has saved us over ₹8,000 this year alone. Clean, courteous service right here on Mahadev Temple Road.', 1, 1),
(6, 'Kishore Gaikwad', 'Founder, Gaikwad E-Commerce Hub, Moshi Spine Road', 'Setting up our warehouse network and 12 IP cameras with Virnobyte was seamless. No hidden costs, clean cable conduit work, and the mobile app live stream works flawlessly. Best computer and security technicians in PCMC.', 1, 2),
(7, 'Nitin Deshpande', 'Senior Architect, Studio Apex, Wakad & Pimple Saudagar', 'Had them build two custom 3D rendering desktops for our design studio. Thermal performance under heavy Lumion rendering is rock solid, and their diagnosis of our old laptop was completely honest — didn\'t push unnecessary repairs. Highly recommended!', 1, 3);

-- --------------------------------------------------------
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL DEFAULT 'Hardware',
  `summary` text NOT NULL,
  `price` int(11) DEFAULT NULL,
  `mrp` int(11) DEFAULT NULL,
  `condition` varchar(50) NOT NULL DEFAULT 'New',
  `image` varchar(255) NOT NULL DEFAULT '',
  `images` longtext NOT NULL,
  `rating` varchar(20) NOT NULL DEFAULT '4.5',
  `rating_count` varchar(100) NOT NULL DEFAULT '128 Ratings & 42 Reviews',
  `badge` varchar(50) NOT NULL DEFAULT 'Assured',
  `offer_tag` varchar(255) NOT NULL DEFAULT 'Extra ₹1,000 off with Virnobyte Card',
  `warranty` varchar(255) NOT NULL DEFAULT '1 Year Virnobyte Warranty',
  `replacement_policy` varchar(255) NOT NULL DEFAULT '7-Day Replacement Guarantee',
  `diagnostic_setup` varchar(255) NOT NULL DEFAULT 'Free On-Site Diagnostic Setup',
  `delivery_text` varchar(255) NOT NULL DEFAULT 'Free Delivery by Tomorrow',
  `delivery_sub` varchar(255) NOT NULL DEFAULT 'Doorstep setup & testing in PCMC & Pune',
  `wow_deal` varchar(255) NOT NULL DEFAULT 'Exchange Old Laptop / PC & save up to ₹15,000',
  `in_stock` tinyint(1) NOT NULL DEFAULT 1,
  `published` tinyint(1) NOT NULL DEFAULT 1,
  `sort` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_products_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `slug`, `name`, `category`, `summary`, `price`, `mrp`, `condition`, `image`, `images`, `rating`, `rating_count`, `badge`, `offer_tag`, `warranty`, `replacement_policy`, `diagnostic_setup`, `delivery_text`, `delivery_sub`, `wow_deal`, `in_stock`, `published`, `sort`) VALUES
(2, 'refurbished-laptops', 'Lenovo ThinkPad T490 Business Laptop (Intel Core i5, 16 GB RAM, 512 GB SSD, FHD)', 'Laptops', '• Processor: Intel Core i5 Quad-Core vPro Enterprise Processor\n• Memory: 16 GB DDR4 Dual-Channel RAM (Smooth Multitasking)\n• Storage: 512 GB High-Speed NVMe M.2 SSD\n• Display: 14.0 Inch Full HD (1920 x 1080) IPS Anti-Glare Display\n• Keyboard: Legendary Spill-Resistant Backlit Keyboard with TrackPoint\n• Security: Fingerprint Reader & Hardware TPM 2.0 Security Chip\n• Operating System: Genuine Windows 11 Pro Lifetime License\n• Warranty: 1 Year Virnobyte Hardware Warranty | 7-Day Replacement Guarantee', 24990, 48990, 'Refurbished', 'virnobyte-laptop-repair', '["virnobyte-laptop-repair","virnobyte-hardware-solutions","virnobyte-circuit-board"]', '4.5', '128 Ratings & 42 Reviews', 'Assured', 'Extra ₹1,000 off with Virnobyte Card', '1 Year Virnobyte Warranty', '7-Day Replacement Guarantee', 'Free On-Site Diagnostic Setup', 'Free Delivery by Tomorrow', 'Doorstep setup & testing in PCMC & Pune', 'Exchange Old Laptop / PC & save up to ₹15,000', 1, 1, 1),
(3, 'custom-desktop-pcs', 'Virnobyte Apex Gaming & Editing Desktop PC (Ryzen 5 5600X, RTX 3060 12GB, 16GB, 1TB NVMe)', 'Desktops', '• Processor: AMD Ryzen 5 5600X (6 Cores, 12 Threads, Up to 4.6 GHz Max Boost)\n• Graphics: NVIDIA GeForce RTX 3060 12GB GDDR6 Ray-Tracing Dedicated GPU\n• Motherboard: Gigabyte B550M DS3H AC with Dual-Band Wi-Fi & Bluetooth\n• RAM: 16 GB (2x8GB) 3200MHz Corsair Vengeance RGB DDR4\n• Storage: 1 TB Crucial P3 Plus PCIe 4.0 NVMe SSD (5000 MB/s Read Speed)\n• Power Supply: Deepcool 650W 80-Plus Bronze Certified SMPS\n• Cabinet & Cooling: Glass-Panel Gaming Cabinet with 4x 120mm ARGB Fans\n• Warranty: 3 Years Manufacturer Warranty on Components + Lifetime Tech Support', 58990, 74990, 'New', 'virnobyte-gaming-pc-build', '["virnobyte-gaming-pc-build","virnobyte-hardware-solutions","virnobyte-circuit-board"]', '4.5', '128 Ratings & 42 Reviews', 'Assured', 'Extra ₹1,000 off with Virnobyte Card', '1 Year Virnobyte Warranty', '7-Day Replacement Guarantee', 'Free On-Site Diagnostic Setup', 'Free Delivery by Tomorrow', 'Doorstep setup & testing in PCMC & Pune', 'Exchange Old Laptop / PC & save up to ₹15,000', 1, 1, 2),
(4, 'ssd-and-ram-upgrades', 'Crucial & Kingston 500GB / 1TB NVMe M.2 High-Speed SSD Upgrade Kit with OS Clone', 'Components', '• Form Factor: M.2 2280 PCIe 4.0 NVMe High-Speed Solid State Drive\n• Speed: Up to 3,500 MB/s Read and 2,800 MB/s Write (7x Faster than SATA)\n• Installation Service: Complete 1-to-1 Windows OS & File Migration without data loss\n• Compatibility: 100% Compatible with Dell, HP, Lenovo, Asus, Acer Laptops & Desktops\n• Performance Gain: Boot time drops to 8 seconds; instant app loading\n• Warranty: 3 Years Official Manufacturer Warranty', 3490, 5990, 'New', 'virnobyte-hardware-solutions', '["virnobyte-hardware-solutions"]', '4.5', '128 Ratings & 42 Reviews', 'Assured', 'Extra ₹1,000 off with Virnobyte Card', '1 Year Virnobyte Warranty', '7-Day Replacement Guarantee', 'Free On-Site Diagnostic Setup', 'Free Delivery by Tomorrow', 'Doorstep setup & testing in PCMC & Pune', 'Exchange Old Laptop / PC & save up to ₹15,000', 1, 1, 3),
(5, 'cctv-camera-kits', 'CP Plus / Hikvision 4-Camera HD CCTV Complete Security Kit with 2TB Hard Disk', 'CCTV', '• Cameras: 2x 2.4MP HD Night-Vision Dome + 2x Outdoor Waterproof Bullet Cameras\n• Recording Unit: 4-Channel Full HD Smart DVR with H.265+ Video Compression\n• Storage: 2 TB Seagate SkyHawk 24/7 Surveillance Grade Hard Disk Included\n• Night Vision: Smart Infrared IR LEDs with up to 20-30 Meter Night Coverage\n• Mobile App: Live Remote Monitoring on Android & iOS with Instant Motion Alerts\n• Installation: Professional Cable Conduit Wiring & Mobile Setup Included across PCMC', 14990, 21990, 'New', 'virnobyte-cctv-installation-pune', '["virnobyte-cctv-installation-pune","virnobyte-wifi-router-setup","virnobyte-circuit-board"]', '4.5', '128 Ratings & 42 Reviews', 'Assured', 'Extra ₹1,000 off with Virnobyte Card', '1 Year Virnobyte Warranty', '7-Day Replacement Guarantee', 'Free On-Site Diagnostic Setup', 'Free Delivery by Tomorrow', 'Doorstep setup & testing in PCMC & Pune', 'Exchange Old Laptop / PC & save up to ₹15,000', 1, 1, 4),
(6, 'routers-and-switches', 'TP-Link Archer AX12 Wi-Fi 6 Gigabit Dual-Band Router (1500 Mbps, 4 High-Gain Antennas)', 'Networking', '• Wireless Speed: Next-Gen Wi-Fi 6 Speeds up to 1.5 Gbps (1201 Mbps on 5GHz + 300 Mbps on 2.4GHz)\n• Coverage: 4 External Beamforming Antennas for Whole-Home / Office Wall Penetration\n• Ports: 1x Gigabit WAN + 3x Gigabit LAN Ports for Ultra-Fast Wired Gaming & NAS\n• Capacity: Connect up to 40+ Devices simultaneously with OFDMA & MU-MIMO\n• Security: Latest WPA3 Wi-Fi Encryption + Easy Tether Smartphone App Control', 2990, 4499, 'New', 'virnobyte-wifi-router-setup', '["virnobyte-wifi-router-setup"]', '4.5', '128 Ratings & 42 Reviews', 'Assured', 'Extra ₹1,000 off with Virnobyte Card', '1 Year Virnobyte Warranty', '7-Day Replacement Guarantee', 'Free On-Site Diagnostic Setup', 'Free Delivery by Tomorrow', 'Doorstep setup & testing in PCMC & Pune', 'Exchange Old Laptop / PC & save up to ₹15,000', 1, 1, 5),
(7, 'ups-and-inverters', 'APC Back-UPS 600VA / 360W 230V Inverter UPS for Computers, Monitors & Wi-Fi', 'Power backup', '• Capacity: 600VA / 360 Watt Power Output\n• Battery Backup: 20-30 Minutes for Desktop PC + Wi-Fi Router during power cuts\n• Protection: Automatic Voltage Regulation (AVR) guards against heavy voltage surges & sags\n• Sockets: 3 Indian Standard 3-Pin Battery Backup & Surge Protected Outlets\n• Warranty: 2 Years APC Replacement Warranty including internal battery', 3890, 5250, 'New', 'virnobyte-circuit-board', '["virnobyte-circuit-board"]', '4.5', '128 Ratings & 42 Reviews', 'Assured', 'Extra ₹1,000 off with Virnobyte Card', '1 Year Virnobyte Warranty', '7-Day Replacement Guarantee', 'Free On-Site Diagnostic Setup', 'Free Delivery by Tomorrow', 'Doorstep setup & testing in PCMC & Pune', 'Exchange Old Laptop / PC & save up to ₹15,000', 1, 1, 6),
(8, 'hard-disks-and-storage', 'Seagate One Touch 2TB Portable External Hard Drive with Password Protection & Rescue', 'Components', '• Storage Capacity: 2 Terabytes (Store up to 500,000 photos, 200 films or full PC backup)\n• Interface: High-Speed USB 3.0 / USB 3.2 Gen 1 (Plug-and-play for Windows & Mac)\n• Build: Brushed Aluminum Metal Enclosure with Shock-Resistant Interior\n• Security: Hardware AES-256 Encryption with Custom Password Protection\n• Data Rescue: 3 Years Seagate Rescue Data Recovery Services Included', 5990, 8999, 'New', 'virnobyte-hard-disk-drive', '["virnobyte-hard-disk-drive"]', '4.5', '128 Ratings & 42 Reviews', 'Assured', 'Extra ₹1,000 off with Virnobyte Card', '1 Year Virnobyte Warranty', '7-Day Replacement Guarantee', 'Free On-Site Diagnostic Setup', 'Free Delivery by Tomorrow', 'Doorstep setup & testing in PCMC & Pune', 'Exchange Old Laptop / PC & save up to ₹15,000', 1, 1, 7),
(9, 'lap001', 'DELL 15 AMD Ryzen 5 Quad Core 7520U / Intel Core i5 11th Gen — (16 GB / 512 GB SSD / Windows 11 / 15.6" FHD)', 'Laptops', '• Processor: Intel Core i5 11th Gen / AMD Ryzen 5 Quad Core (Up to 4.2 GHz)\n• Memory: 16 GB DDR4 3200 MHz High-Speed RAM (Dual Channel)\n• Storage: 512 GB PCIe NVMe M.2 Solid State Drive\n• Display: 15.6 Inch (39.6 cm) Full HD (1920 x 1080) Anti-Glare Narrow Border Screen\n• Operating System: Windows 11 Pro 64-bit Genuine Pre-installed\n• Graphics: Intel Iris Xe / AMD Radeon 610M Graphics\n• Keyboard: Ergonomic Spill-Resistant Full-size Keyboard with Numeric Keypad\n• Battery & Power: Up to 6-8 Hours Battery Backup with Original Dell Fast Charger\n• Quality Check: Grade A++ Certified Refurbished | 35-Point Diagnostic Passed\n• Warranty: 1 Year Virnobyte Comprehensive Warranty + Free Doorstep Setup in PCMC & Pune', 34990, 68990, 'Refurbished', '/uploads/lap001-5dc673-1976x1272.webp', '["/uploads/lap001-5dc673-1976x1272.webp","/uploads/lap001-df9ca7-1976x1976.webp","/uploads/lap001-ec39e2-1976x1976.webp","/uploads/lap001-a113a7-1976x1976.webp","/uploads/lap001-438d88-1976x1976.webp","/uploads/lap001-a12959-1976x1976.webp","/uploads/lap001-9a5c76-1976x1976.webp","/uploads/lap001-84def9-1976x1976.webp","/uploads/lap001-c0f096-1976x1976.webp"]', '4.5', '128 Ratings & 42 Reviews', 'Assured', 'Extra ₹1,000 off with Virnobyte Card', '1 Year Virnobyte Warranty', '7-Day Replacement Guarantee', 'Free On-Site Diagnostic Setup', 'Free Delivery by Tomorrow', 'Doorstep setup & testing in PCMC & Pune', 'Exchange Old Laptop / PC & save up to ₹15,000', 1, 1, 0); instant app loading\n• Warranty: 3 Years Official Manufacturer Warranty', 3490, 5990, 'New', 'virnobyte-hardware-solutions', 1, 1, 3, '["virnobyte-hardware-solutions"]'),
(5, 'cctv-camera-kits', 'CP Plus / Hikvision 4-Camera HD CCTV Complete Security Kit with 2TB Hard Disk', 'CCTV', '• Cameras: 2x 2.4MP HD Night-Vision Dome + 2x Outdoor Waterproof Bullet Cameras\n• Recording Unit: 4-Channel Full HD Smart DVR with H.265+ Video Compression\n• Storage: 2 TB Seagate SkyHawk 24/7 Surveillance Grade Hard Disk Included\n• Night Vision: Smart Infrared IR LEDs with up to 20-30 Meter Night Coverage\n• Mobile App: Live Remote Monitoring on Android & iOS with Instant Motion Alerts\n• Installation: Professional Cable Conduit Wiring & Mobile Setup Included across PCMC', 14990, 21990, 'New', 'virnobyte-cctv-installation-pune', 1, 1, 4, '["virnobyte-cctv-installation-pune","virnobyte-wifi-router-setup","virnobyte-circuit-board"]'),
(6, 'routers-and-switches', 'TP-Link Archer AX12 Wi-Fi 6 Gigabit Dual-Band Router (1500 Mbps, 4 High-Gain Antennas)', 'Networking', '• Wireless Speed: Next-Gen Wi-Fi 6 Speeds up to 1.5 Gbps (1201 Mbps on 5GHz + 300 Mbps on 2.4GHz)\n• Coverage: 4 External Beamforming Antennas for Whole-Home / Office Wall Penetration\n• Ports: 1x Gigabit WAN + 3x Gigabit LAN Ports for Ultra-Fast Wired Gaming & NAS\n• Capacity: Connect up to 40+ Devices simultaneously with OFDMA & MU-MIMO\n• Security: Latest WPA3 Wi-Fi Encryption + Easy Tether Smartphone App Control', 2990, 4499, 'New', 'virnobyte-wifi-router-setup', 1, 1, 5, '["virnobyte-wifi-router-setup"]'),
(7, 'ups-and-inverters', 'APC Back-UPS 600VA / 360W 230V Inverter UPS for Computers, Monitors & Wi-Fi', 'Power backup', '• Capacity: 600VA / 360 Watt Power Output\n• Battery Backup: 20-30 Minutes for Desktop PC + Wi-Fi Router during power cuts\n• Protection: Automatic Voltage Regulation (AVR) guards against heavy voltage surges & sags\n• Sockets: 3 Indian Standard 3-Pin Battery Backup & Surge Protected Outlets\n• Warranty: 2 Years APC Replacement Warranty including internal battery', 3890, 5250, 'New', 'virnobyte-circuit-board', 1, 1, 6, '["virnobyte-circuit-board"]'),
(8, 'hard-disks-and-storage', 'Seagate One Touch 2TB Portable External Hard Drive with Password Protection & Rescue', 'Components', '• Storage Capacity: 2 Terabytes (Store up to 500,000 photos, 200 films or full PC backup)\n• Interface: High-Speed USB 3.0 / USB 3.2 Gen 1 (Plug-and-play for Windows & Mac)\n• Build: Brushed Aluminum Metal Enclosure with Shock-Resistant Interior\n• Security: Hardware AES-256 Encryption with Custom Password Protection\n• Data Rescue: 3 Years Seagate Rescue Data Recovery Services Included', 5990, 8999, 'New', 'virnobyte-hard-disk-drive', 1, 1, 7, '["virnobyte-hard-disk-drive"]'),
(9, 'lap001', 'DELL 15 AMD Ryzen 5 Quad Core 7520U / Intel Core i5 11th Gen — (16 GB / 512 GB SSD / Windows 11 / 15.6" FHD)', 'Laptops', '• Processor: Intel Core i5 11th Gen / AMD Ryzen 5 Quad Core (Up to 4.2 GHz)\n• Memory: 16 GB DDR4 3200 MHz High-Speed RAM (Dual Channel)\n• Storage: 512 GB PCIe NVMe M.2 Solid State Drive\n• Display: 15.6 Inch (39.6 cm) Full HD (1920 x 1080) Anti-Glare Narrow Border Screen\n• Operating System: Windows 11 Pro 64-bit Genuine Pre-installed\n• Graphics: Intel Iris Xe / AMD Radeon 610M Graphics\n• Keyboard: Ergonomic Spill-Resistant Full-size Keyboard with Numeric Keypad\n• Battery & Power: Up to 6-8 Hours Battery Backup with Original Dell Fast Charger\n• Quality Check: Grade A++ Certified Refurbished | 35-Point Diagnostic Passed\n• Warranty: 1 Year Virnobyte Comprehensive Warranty + Free Doorstep Setup in PCMC & Pune', 34990, 68990, 'Refurbished', '/uploads/lap001-5dc673-1976x1272.webp', 1, 1, 0, '["/uploads/lap001-5dc673-1976x1272.webp","/uploads/lap001-df9ca7-1976x1976.webp","/uploads/lap001-ec39e2-1976x1976.webp","/uploads/lap001-a113a7-1976x1976.webp","/uploads/lap001-438d88-1976x1976.webp","/uploads/lap001-a12959-1976x1976.webp","/uploads/lap001-9a5c76-1976x1976.webp","/uploads/lap001-84def9-1976x1976.webp","/uploads/lap001-c0f096-1976x1976.webp"]');

-- --------------------------------------------------------
-- --------------------------------------------------------
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` varchar(100) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_slug` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `unit_price` int(11) NOT NULL,
  `mrp` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT 0,
  `delivery_fee` int(11) DEFAULT 0,
  `total_amount` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_phone` varchar(50) NOT NULL,
  `customer_email` varchar(255) DEFAULT '',
  `address_line1` text NOT NULL,
  `address_line2` text DEFAULT '',
  `pincode` varchar(20) NOT NULL,
  `city` varchar(100) NOT NULL DEFAULT 'Pune',
  `state` varchar(100) NOT NULL DEFAULT 'Maharashtra',
  `address_type` varchar(50) DEFAULT 'Home',
  `payment_method` varchar(50) NOT NULL DEFAULT 'cashfree',
  `payment_status` varchar(50) NOT NULL DEFAULT 'PENDING',
  `order_status` varchar(50) NOT NULL DEFAULT 'CONFIRMED',
  `cashfree_order_id` varchar(100) DEFAULT '',
  `cashfree_session_id` varchar(255) DEFAULT '',
  `notes` text DEFAULT '',
  `created_at` varchar(50) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` varchar(50) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_orders_order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `client_type` varchar(100) NOT NULL DEFAULT '',
  `location` varchar(255) NOT NULL DEFAULT '',
  `summary` text NOT NULL,
  `scope` longtext NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT '',
  `completed_on` varchar(50) NOT NULL DEFAULT '',
  `published` tinyint(1) NOT NULL DEFAULT 1,
  `sort` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_projects_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `slug`, `category`, `title`, `client_type`, `location`, `summary`, `scope`, `image`, `completed_on`, `published`, `sort`) VALUES
(2, 'precision-auto-bhosari-cctv', 'cctv-projects', '16-Camera 4K ColorVu IP CCTV Setup for Precision Engineering, MIDC Bhosari', 'Automotive Machine Shop (6,500 sq.ft)', 'MIDC Bhosari, Pimpri-Chinchwad, Pune', 'Full IP surveillance covering CNC bay, raw material storage, loading dock and admin cabin. Zero-blind-spot coverage with 30-day continuous recording on WD Purple surveillance drives.', '["Site survey and blind-spot heatmapping across 6,500 sq.ft industrial floor","16 Hikvision 4K PoE IP bullet and dome cameras with night color vision","Cat-6 structured outdoor cabling in heavy-duty GI conduit","32-channel 4K NVR with dual 8TB WD Purple enterprise surveillance drives","Mobile remote live view configured on owner and plant manager phones","Uninterruptible power backup via 2KVA numeric online UPS"]', 'virnobyte-cctv-installation-pune', '2026-09-24', 1, 0),
(3, 'techhub-tathawade-office-network', 'networking-projects', '35-Node Structured Gigabit LAN & Dual-ISP Failover for TechHub IT Solutions, Tathawade', 'Software Development Firm (35 seats)', 'Tathawade, Pimpri-Chinchwad, Pune', 'Clean structured rack cabling, 24-port PoE Gigabit switch setup, multi-SSID secure Wi-Fi 6 access points, and dual-WAN load balancing for zero internet downtime.', '["D-Link Cat-6 patch panel termination and cable comb dressing in 9U rack","Cisco / TP-Link Omada Gigabit managed switch deployment with VLAN isolation","Dual WAN automatic failover router (Airtel Fiber + Tata Tele)","3 ceiling-mounted Wi-Fi 6 Access Points providing seamless office roaming","Speed test verification: full 300 Mbps throughput across all 35 workstations"]', 'virnobyte-office-it-setup', '2026-10-18', 1, 1),
(4, 'cad-render-workstation-chikhali', 'hardware-installations', 'Dual RTX 4080 Super Custom CAD & 3D Render Rig for Architectural Studio, Chikhali', 'Architecture & Interior Design Studio', 'Sadichha Complex, Jadhav Wadi, Chikhali, Pune', 'Custom built high-thermal-headroom workstation tailored for Revit, 3ds Max, Blender and Lumion 3D real-time rendering. 64GB DDR5, liquid cooling, 2TB Gen4 NVMe.', '["Intel Core i9-14900K on Z790 motherboard with 360mm AIO liquid cooling","64GB DDR5 6000MHz Kingston Fury dual-channel memory","NVIDIA GeForce RTX 4080 Super 16GB GDDR6X","2TB Samsung 990 Pro PCIe 4.0 NVMe SSD (7,450 MB/s read)","1000W 80+ Gold fully modular power supply in high airflow mesh cabinet","48-hour continuous render stress test and color-calibrated dual display setup"]', 'virnobyte-gaming-pc-build', '2026-10-28', 1, 2),
(5, 'sai-clinic-moshi-it-amc', 'office-it-setup', 'Complete Clinic IT Setup & Annual Maintenance (AMC) for Sai Multi-Specialty Clinic, Moshi', 'Multi-Specialty Healthcare Clinic (4 consulting cabins)', 'Moshi, Pune-Nashik Highway, Pune', 'Reception billing desktops, doctor consulting terminals, Wi-Fi thermal receipt printers, patient record backup automation, and monthly preventive AMC visits.', '["4 silent compact SSD desktops with pre-configured clinic ERP & EMR software","Thermal prescription printers and network billing printer setup","Automated local + encrypted cloud backup for daily patient database","Virnobyte Pro+ IT AMC contract with 2-hour priority emergency doorstep response"]', 'virnobyte-software-installation', '2026-10-05', 1, 3);

-- --------------------------------------------------------
-- Table structure for table `gallery`
--

CREATE TABLE IF NOT EXISTS `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `caption` varchar(255) NOT NULL DEFAULT '',
  `published` tinyint(1) NOT NULL DEFAULT 1,
  `sort` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `jobs`
--

CREATE TABLE IF NOT EXISTS `jobs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `promise` varchar(255) NOT NULL DEFAULT '',
  `employment_type` varchar(50) NOT NULL DEFAULT 'FULL_TIME',
  `location` varchar(255) NOT NULL DEFAULT 'Chikhali, Pimpri-Chinchwad',
  `salary_min` int(11) NOT NULL DEFAULT 0,
  `salary_max` int(11) NOT NULL DEFAULT 0,
  `pay_note` varchar(255) NOT NULL DEFAULT '',
  `experience` varchar(255) NOT NULL DEFAULT '',
  `about_role` text NOT NULL,
  `duties` longtext NOT NULL,
  `growth` longtext NOT NULL,
  `fits` longtext NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT '',
  `valid_through` varchar(50) NOT NULL DEFAULT '',
  `published` tinyint(1) NOT NULL DEFAULT 1,
  `posted_at` varchar(50) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_jobs_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `slug`, `title`, `promise`, `employment_type`, `location`, `salary_min`, `salary_max`, `pay_note`, `experience`, `about_role`, `duties`, `growth`, `fits`, `image`, `valid_through`, `published`, `posted_at`) VALUES
(1, 'field-service-technician', 'Field Service Technician', 'Fix real problems for homes and offices across Pimpri-Chinchwad — and learn networking and CCTV on the job.', 'FULL_TIME', 'Chikhali, Pimpri-Chinchwad', 0, 0, '', '1–3 years of hardware repair experience', 'You will diagnose and repair computers, laptops and printers at our Chikhali workshop and on doorstep visits, and assist with CCTV and network installations.', '["Diagnose desktop and laptop faults and prepare itemised quotes","Replace components and reinstall operating systems","Visit homes and offices for on-site repairs","Assist senior technicians on CCTV and network installations","Keep a clear service record for every job"]', '["Field Service Technician","Senior Technician","Installation Lead","Service Manager"]', '["You can identify common hardware faults without a manual","You explain technical problems to customers in plain words","You have a two-wheeler and a valid licence","You are comfortable working in Chikhali and around Pimpri-Chinchwad"]', 'virnobyte-hardware-solutions', '', 0, '2026-10-07');

-- --------------------------------------------------------
-- Table structure for table `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `body` longtext NOT NULL,
  `updated_at` varchar(50) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_pages_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `slug`, `title`, `description`, `body`, `updated_at`) VALUES
(1, 'privacy-policy', 'Privacy Policy', 'How Virnobyte collects, uses and protects personal information shared through our website, enquiries, repairs and membership cards.', 'This policy explains what personal information Virnobyte collects, why we collect it and how we look after it. It applies to this website, to enquiries you send us and to repair, AMC and membership services.\n\n## Information we collect\n\n- **Contact details** you give us — name, phone number, email address and service address — when you send an enquiry, book a service, apply for a job or create an account.\n- **Membership details** — your plan, card number, validity dates, doorstep visits used and coin balance.\n- **Service records** — the device, the fault reported and the work carried out.\n- **Basic technical data** such as the pages you visit, collected to keep the website secure and working.\n\n## How we use it\n\n- To respond to enquiries and carry out the service you asked for\n- To manage your membership card, coins and service history\n- To contact you about your job, quote or membership renewal\n- To meet legal, tax and accounting obligations\n\nWe do not sell your personal information.\n\n## Data on your devices\n\nWhen you hand over a device for repair, we access only what is needed to diagnose and fix it. We do not browse, copy or keep your files unless you ask us to back them up or recover them, and recovered data is handed only to you.\n\n## Sharing\n\nWe share information only with service providers who help us run the business (for example, hosting or messaging providers), and only as needed. We may disclose information where required by law.\n\n## Retention\n\nWe keep records for as long as needed to provide the service and to meet legal obligations, then delete or anonymise them.\n\n## Your choices\n\nYou can ask us to see, correct or delete your personal information by contacting us using the details on our [contact page](/contact).\n\n## Changes\n\nWe may update this policy. The date at the top of the page shows when it last changed.', '2026-10-07'),
(2, 'terms-and-conditions', 'Terms & Conditions', 'Terms for Virnobyte repair services, AMC contracts, CCTV and inverter installation, product warranty and membership cards.', 'These terms apply to services and products provided by Virnobyte. By booking a service, buying a product or activating a membership card, you agree to them.\n\n## General\n\n- Every repair begins with a diagnosis. We share an itemised quote and start work only after your approval.\n- If we find an additional fault during the repair, we contact you before doing further work.\n- Estimated completion times depend on part availability and are shared at the time of the quote.\n- Please back up your data before handing over a device where possible. We take care with every device, but we are not responsible for data loss arising from a pre-existing fault.\n\n## Repair — CPU, desktop and laptop\n\n- Replaced parts carry the warranty provided by the part\'s manufacturer or supplier, which we explain when quoting.\n- Warranty does not cover physical damage, liquid damage or faults caused by tampering after the repair.\n- Devices not collected within 60 days of the completion notice may be subject to storage charges.\n\n## Annual Maintenance Contract (AMC)\n\n- The equipment covered, visit frequency and response times are listed in your AMC agreement.\n- Spare parts and consumables are chargeable unless your agreement states otherwise.\n- The AMC covers equipment in working condition at the start of the contract.\n\n## CCTV installation\n\n- The installation scope (cameras, recorder, cabling) is confirmed in the quote after the site survey.\n- Equipment warranty is as provided by the manufacturer. Installation workmanship issues reported soon after installation are corrected free of charge.\n\n## Inverter and battery installation\n\n- Battery warranty is as provided by the battery manufacturer and depends on following the maintenance guidance shared at installation.\n\n## Branded goods warranty\n\n- Branded products are covered by the manufacturer\'s warranty. We help you raise warranty claims for products bought from us.\n\n## Membership cards and coins\n\n- Membership benefits apply for the validity period printed on your card.\n- Doorstep visits are limited to the number included in your plan.\n- Coins are credited when a membership is activated and may be redeemed under the coin rules shown on the membership page. Coins have no cash value and are not transferable.\n- Virnobyte may update the membership benefits for new memberships; active cards keep the benefits they were issued with.\n\n## Contact\n\nQuestions about these terms? Reach us through the [contact page](/contact).', '2026-10-07'),
(3, 'company-profile', 'Company Profile', 'Virnobyte company profile: IT services, computer repair, CCTV and networking company based in Chikhali, Pimpri-Chinchwad, serving Pune since 2014.', 'Virnobyte is a hardware, networking and IT services company based in Chikhali, Pimpri-Chinchwad. Since 2014 we have repaired, installed and supported technology for homes, shops, offices and growing businesses across Pune.\n\n## What we do\n\n- **Repair and support** — computers, laptops, printers, virus removal, software installation and data recovery\n- **Security and networks** — CCTV installation, LAN and Wi-Fi networking, structured cabling\n- **Business IT** — IT AMC, consulting, custom infrastructure, hardware supply and power backup\n\n## How we work\n\nDiagnosis first, an itemised quote before work starts, tested components, and plain-language explanations of what was done. For regular customers we offer membership cards with doorstep visits and coins, and AMC contracts for businesses.\n\n## Products we supply\n\nNew and refurbished laptops and desktops, printers, CCTV systems, networking equipment, RAM, SSDs, UPS units and other hardware.', '2026-10-07');

-- --------------------------------------------------------
-- Table structure for table `pc_parts`
--

CREATE TABLE IF NOT EXISTS `pc_parts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `brand` varchar(100) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL,
  `specs` longtext NOT NULL,
  `price` int(11) NOT NULL DEFAULT 0,
  `model_url` varchar(255) NOT NULL DEFAULT '',
  `in_stock` tinyint(1) NOT NULL DEFAULT 1,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `sort` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_pc_parts_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `pc_parts`
--

INSERT INTO `pc_parts` (`id`, `slug`, `category`, `brand`, `name`, `specs`, `price`, `model_url`, `in_stock`, `active`, `sort`) VALUES
(1, 'intel-core-i3-12100f', 'cpu', 'Intel', 'Intel Core i3-12100F', '{"socket":"LGA1700","cores":4,"threads":8,"base_ghz":3.3,"boost_ghz":4.3,"tdp":58,"igpu":false,"cooler_included":true}', 7500, '', 1, 1, 0),
(2, 'intel-core-i5-12400', 'cpu', 'Intel', 'Intel Core i5-12400', '{"socket":"LGA1700","cores":6,"threads":12,"base_ghz":2.5,"boost_ghz":4.4,"tdp":65,"igpu":"UHD 730","cooler_included":true}', 13500, '', 1, 1, 1),
(3, 'intel-core-i5-14400f', 'cpu', 'Intel', 'Intel Core i5-14400F', '{"socket":"LGA1700","cores":10,"threads":16,"base_ghz":2.5,"boost_ghz":4.7,"tdp":65,"igpu":false,"cooler_included":true}', 16500, '', 1, 1, 2),
(4, 'intel-core-i7-14700k', 'cpu', 'Intel', 'Intel Core i7-14700K', '{"socket":"LGA1700","cores":20,"threads":28,"base_ghz":3.4,"boost_ghz":5.6,"tdp":125,"igpu":"UHD 770","cooler_included":false}', 36000, '', 1, 1, 3),
(5, 'amd-ryzen-5-5600', 'cpu', 'AMD', 'AMD Ryzen 5 5600', '{"socket":"AM4","cores":6,"threads":12,"base_ghz":3.5,"boost_ghz":4.4,"tdp":65,"igpu":false,"cooler_included":true}', 10500, '', 1, 1, 4),
(6, 'amd-ryzen-5-7600', 'cpu', 'AMD', 'AMD Ryzen 5 7600', '{"socket":"AM5","cores":6,"threads":12,"base_ghz":3.8,"boost_ghz":5.1,"tdp":65,"igpu":"Radeon Graphics","cooler_included":true}', 19500, '', 1, 1, 5),
(7, 'amd-ryzen-7-7800x3d', 'cpu', 'AMD', 'AMD Ryzen 7 7800X3D', '{"socket":"AM5","cores":8,"threads":16,"base_ghz":4.2,"boost_ghz":5,"tdp":120,"igpu":"Radeon Graphics","cooler_included":false}', 34000, '', 1, 1, 6),
(8, 'amd-ryzen-9-7900x', 'cpu', 'AMD', 'AMD Ryzen 9 7900X', '{"socket":"AM5","cores":12,"threads":24,"base_ghz":4.7,"boost_ghz":5.6,"tdp":170,"igpu":"Radeon Graphics","cooler_included":false}', 36500, '', 1, 1, 7),
(9, 'msi-pro-h610m-e-ddr4', 'motherboard', 'MSI', 'MSI PRO H610M-E DDR4', '{"socket":"LGA1700","chipset":"H610","form_factor":"mATX","ram_type":"DDR4","ram_slots":2,"max_ram_gb":64,"m2_slots":1,"sata_ports":4,"pcie_x16":1,"wifi":false}', 7200, '', 1, 1, 8),
(10, 'gigabyte-b760m-ds3h-ddr4', 'motherboard', 'Gigabyte', 'Gigabyte B760M DS3H DDR4', '{"socket":"LGA1700","chipset":"B760","form_factor":"mATX","ram_type":"DDR4","ram_slots":4,"max_ram_gb":128,"m2_slots":2,"sata_ports":4,"pcie_x16":1,"wifi":false}', 10800, '', 1, 1, 9),
(11, 'asus-tuf-b760-plus-wifi-d5', 'motherboard', 'ASUS', 'ASUS TUF Gaming B760-Plus WiFi D5', '{"socket":"LGA1700","chipset":"B760","form_factor":"ATX","ram_type":"DDR5","ram_slots":4,"max_ram_gb":192,"m2_slots":3,"sata_ports":4,"pcie_x16":2,"wifi":true}', 18500, '', 1, 1, 10),
(12, 'msi-mag-z790-tomahawk-wifi', 'motherboard', 'MSI', 'MSI MAG Z790 Tomahawk WiFi', '{"socket":"LGA1700","chipset":"Z790","form_factor":"ATX","ram_type":"DDR5","ram_slots":4,"max_ram_gb":192,"m2_slots":4,"sata_ports":7,"pcie_x16":2,"wifi":true}', 27500, '', 1, 1, 11),
(13, 'gigabyte-b550m-ds3h', 'motherboard', 'Gigabyte', 'Gigabyte B550M DS3H', '{"socket":"AM4","chipset":"B550","form_factor":"mATX","ram_type":"DDR4","ram_slots":4,"max_ram_gb":128,"m2_slots":2,"sata_ports":4,"pcie_x16":1,"wifi":false}', 8900, '', 1, 1, 12),
(14, 'msi-b650m-gaming-plus-wifi', 'motherboard', 'MSI', 'MSI B650M Gaming Plus WiFi', '{"socket":"AM5","chipset":"B650","form_factor":"mATX","ram_type":"DDR5","ram_slots":4,"max_ram_gb":192,"m2_slots":2,"sata_ports":4,"pcie_x16":1,"wifi":true}', 15500, '', 1, 1, 13),
(15, 'gigabyte-b650-aorus-elite-ax', 'motherboard', 'Gigabyte', 'Gigabyte B650 Aorus Elite AX', '{"socket":"AM5","chipset":"B650","form_factor":"ATX","ram_type":"DDR5","ram_slots":4,"max_ram_gb":192,"m2_slots":3,"sata_ports":4,"pcie_x16":1,"wifi":true}', 21500, '', 1, 1, 14),
(16, 'asus-rog-strix-b650e-i', 'motherboard', 'ASUS', 'ASUS ROG Strix B650E-I Gaming WiFi', '{"socket":"AM5","chipset":"B650E","form_factor":"ITX","ram_type":"DDR5","ram_slots":2,"max_ram_gb":96,"m2_slots":2,"sata_ports":2,"pcie_x16":1,"wifi":true}', 29500, '', 1, 1, 15),
(17, 'ddr4-8gb-3200', 'ram', 'Crucial', 'Crucial 8 GB DDR4-3200 (1×8)', '{"type":"DDR4","capacity_gb":8,"modules":1,"speed_mts":3200,"rgb":false,"height_mm":31}', 1700, '', 1, 1, 16),
(18, 'ddr4-16gb-3200', 'ram', 'Kingston', 'Kingston Fury Beast 16 GB DDR4-3200 (2×8)', '{"type":"DDR4","capacity_gb":16,"modules":2,"speed_mts":3200,"rgb":false,"height_mm":34}', 3600, '', 1, 1, 17),
(19, 'ddr4-32gb-3600-rgb', 'ram', 'Corsair', 'Corsair Vengeance RGB Pro 32 GB DDR4-3600 (2×16)', '{"type":"DDR4","capacity_gb":32,"modules":2,"speed_mts":3600,"rgb":true,"height_mm":51}', 7800, '', 1, 1, 18),
(20, 'ddr5-16gb-5600', 'ram', 'Kingston', 'Kingston Fury Beast 16 GB DDR5-5600 (2×8)', '{"type":"DDR5","capacity_gb":16,"modules":2,"speed_mts":5600,"rgb":false,"height_mm":34}', 5200, '', 1, 1, 19),
(21, 'ddr5-32gb-6000-rgb', 'ram', 'G.Skill', 'G.Skill Trident Z5 RGB 32 GB DDR5-6000 (2×16)', '{"type":"DDR5","capacity_gb":32,"modules":2,"speed_mts":6000,"rgb":true,"height_mm":44}', 11500, '', 1, 1, 20),
(22, 'ddr5-64gb-6000', 'ram', 'Corsair', 'Corsair Vengeance 64 GB DDR5-6000 (2×32)', '{"type":"DDR5","capacity_gb":64,"modules":2,"speed_mts":6000,"rgb":false,"height_mm":35}', 19500, '', 1, 1, 21),
(23, 'ddr5-128gb-5600', 'ram', 'Kingston', 'Kingston Fury Beast 128 GB DDR5-5600 (4×32)', '{"type":"DDR5","capacity_gb":128,"modules":4,"speed_mts":5600,"rgb":false,"height_mm":34}', 39000, '', 1, 1, 22),
(24, 'rtx-3050-6gb', 'gpu', 'NVIDIA', 'GeForce RTX 3050 6 GB', '{"maker":"NVIDIA","vram_gb":6,"length_mm":205,"power_w":70,"rec_psu_w":300,"slots":2,"fans":2}', 16500, '', 1, 1, 23),
(25, 'rtx-4060-8gb', 'gpu', 'NVIDIA', 'GeForce RTX 4060 8 GB', '{"maker":"NVIDIA","vram_gb":8,"length_mm":240,"power_w":115,"rec_psu_w":550,"slots":2,"fans":2}', 28500, '', 1, 1, 24),
(26, 'rx-7600-8gb', 'gpu', 'AMD', 'Radeon RX 7600 8 GB', '{"maker":"AMD","vram_gb":8,"length_mm":250,"power_w":165,"rec_psu_w":550,"slots":2,"fans":2}', 25500, '', 1, 1, 25),
(27, 'rtx-4070-super-12gb', 'gpu', 'NVIDIA', 'GeForce RTX 4070 Super 12 GB', '{"maker":"NVIDIA","vram_gb":12,"length_mm":267,"power_w":220,"rec_psu_w":650,"slots":2.5,"fans":3}', 58000, '', 1, 1, 26),
(28, 'rx-7800-xt-16gb', 'gpu', 'AMD', 'Radeon RX 7800 XT 16 GB', '{"maker":"AMD","vram_gb":16,"length_mm":287,"power_w":263,"rec_psu_w":700,"slots":2.5,"fans":3}', 49000, '', 1, 1, 27),
(29, 'rtx-4080-super-16gb', 'gpu', 'NVIDIA', 'GeForce RTX 4080 Super 16 GB', '{"maker":"NVIDIA","vram_gb":16,"length_mm":310,"power_w":320,"rec_psu_w":750,"slots":3,"fans":3}', 99000, '', 1, 1, 28),
(30, 'rtx-4090-24gb', 'gpu', 'NVIDIA', 'GeForce RTX 4090 24 GB', '{"maker":"NVIDIA","vram_gb":24,"length_mm":336,"power_w":450,"rec_psu_w":850,"slots":3.5,"fans":3}', 185000, '', 1, 1, 29),
(31, 'crucial-p3-500gb', 'storage', 'Crucial', 'Crucial P3 500 GB NVMe SSD', '{"kind":"NVMe","capacity_gb":500,"interface":"PCIe 3.0 ×4","read_mbps":3500,"write_mbps":1900,"form_factor":"M.2"}', 3200, '', 1, 1, 30),
(32, 'samsung-980-1tb', 'storage', 'Samsung', 'Samsung 980 1 TB NVMe SSD', '{"kind":"NVMe","capacity_gb":1000,"interface":"PCIe 3.0 ×4","read_mbps":3500,"write_mbps":3000,"form_factor":"M.2"}', 6200, '', 1, 1, 31),
(33, 'wd-black-sn850x-2tb', 'storage', 'WD', 'WD Black SN850X 2 TB NVMe SSD', '{"kind":"NVMe","capacity_gb":2000,"interface":"PCIe 4.0 ×4","read_mbps":7300,"write_mbps":6600,"form_factor":"M.2"}', 14500, '', 1, 1, 32),
(34, 'crucial-mx500-1tb', 'storage', 'Crucial', 'Crucial MX500 1 TB SATA SSD', '{"kind":"SATA SSD","capacity_gb":1000,"interface":"SATA III","read_mbps":560,"write_mbps":510,"form_factor":"2.5\\""}', 5800, '', 1, 1, 33),
(35, 'seagate-barracuda-2tb', 'storage', 'Seagate', 'Seagate Barracuda 2 TB HDD', '{"kind":"HDD","capacity_gb":2000,"interface":"SATA III, 7200 rpm","read_mbps":220,"write_mbps":220,"form_factor":"3.5\\""}', 5200, '', 1, 1, 34),
(36, 'deepcool-pf450', 'psu', 'Deepcool', 'Deepcool PF450 450 W', '{"watts":450,"efficiency":"80+ White","modular":"Non-modular","form_factor":"ATX"}', 2900, '', 1, 1, 35),
(37, 'corsair-cv550', 'psu', 'Corsair', 'Corsair CV550 550 W', '{"watts":550,"efficiency":"80+ Bronze","modular":"Non-modular","form_factor":"ATX"}', 4200, '', 1, 1, 36),
(38, 'msi-mag-a650bn', 'psu', 'MSI', 'MSI MAG A650BN 650 W', '{"watts":650,"efficiency":"80+ Bronze","modular":"Non-modular","form_factor":"ATX"}', 4900, '', 1, 1, 37),
(39, 'corsair-rm750e', 'psu', 'Corsair', 'Corsair RM750e 750 W', '{"watts":750,"efficiency":"80+ Gold","modular":"Fully modular","form_factor":"ATX"}', 8900, '', 1, 1, 38),
(40, 'corsair-rm850x', 'psu', 'Corsair', 'Corsair RM850x 850 W', '{"watts":850,"efficiency":"80+ Gold","modular":"Fully modular","form_factor":"ATX"}', 12500, '', 1, 1, 39),
(41, 'seasonic-focus-gx-1000', 'psu', 'Seasonic', 'Seasonic Focus GX-1000 1000 W', '{"watts":1000,"efficiency":"80+ Gold","modular":"Fully modular","form_factor":"ATX"}', 16500, '', 1, 1, 40),
(42, 'corsair-sf750', 'psu', 'Corsair', 'Corsair SF750 750 W SFX', '{"watts":750,"efficiency":"80+ Platinum","modular":"Fully modular","form_factor":"SFX"}', 15500, '', 1, 1, 41),
(43, 'deepcool-ak400', 'cooler', 'Deepcool', 'Deepcool AK400 air cooler', '{"kind":"Air","sockets":["LGA1700","AM4","AM5"],"height_mm":155,"tdp_w":220}', 2600, '', 1, 1, 42),
(44, 'cooler-master-hyper-212', 'cooler', 'Cooler Master', 'Cooler Master Hyper 212 Black', '{"kind":"Air","sockets":["LGA1700","AM4","AM5"],"height_mm":154,"tdp_w":150}', 3200, '', 1, 1, 43),
(45, 'noctua-nh-d15', 'cooler', 'Noctua', 'Noctua NH-D15 chromax.black', '{"kind":"Air","sockets":["LGA1700","AM4","AM5"],"height_mm":165,"tdp_w":250}', 11500, '', 1, 1, 44),
(46, 'deepcool-le520-240', 'cooler', 'Deepcool', 'Deepcool LE520 240 mm AIO', '{"kind":"AIO","sockets":["LGA1700","AM4","AM5"],"radiator_mm":240,"tdp_w":220,"rgb":true}', 5900, '', 1, 1, 45),
(47, 'nzxt-kraken-280', 'cooler', 'NZXT', 'NZXT Kraken 280 mm AIO', '{"kind":"AIO","sockets":["LGA1700","AM4","AM5"],"radiator_mm":280,"tdp_w":250,"rgb":true}', 13500, '', 1, 1, 46),
(48, 'lian-li-galahad-360', 'cooler', 'Lian Li', 'Lian Li Galahad II 360 mm AIO', '{"kind":"AIO","sockets":["LGA1700","AM4","AM5"],"radiator_mm":360,"tdp_w":300,"rgb":true}', 14500, '', 1, 1, 47),
(49, 'ant-esports-ice-100', 'case', 'Ant Esports', 'Ant Esports ICE-100 Air Mini', '{"max_board":"mATX","supports":["mATX","ITX"],"gpu_max_mm":320,"cooler_max_mm":150,"radiator_mm":[240],"psu":"ATX","fans_included":3,"drive_35":1,"color":"black"}', 2900, '', 1, 1, 48),
(50, 'cooler-master-q300l', 'case', 'Cooler Master', 'Cooler Master MasterBox Q300L', '{"max_board":"mATX","supports":["mATX","ITX"],"gpu_max_mm":360,"cooler_max_mm":159,"radiator_mm":[240],"psu":"ATX","fans_included":1,"drive_35":1,"color":"black"}', 4300, '', 1, 1, 49),
(51, 'deepcool-cc560', 'case', 'Deepcool', 'Deepcool CC560', '{"max_board":"ATX","supports":["ATX","mATX","ITX"],"gpu_max_mm":370,"cooler_max_mm":163,"radiator_mm":[240,280,360],"psu":"ATX","fans_included":4,"drive_35":2,"color":"black"}', 4800, '', 1, 1, 50),
(52, 'nzxt-h5-flow', 'case', 'NZXT', 'NZXT H5 Flow', '{"max_board":"ATX","supports":["ATX","mATX","ITX"],"gpu_max_mm":365,"cooler_max_mm":165,"radiator_mm":[240,280],"psu":"ATX","fans_included":2,"drive_35":1,"color":"white"}', 8500, '', 1, 1, 51),
(53, 'lian-li-lancool-216', 'case', 'Lian Li', 'Lian Li Lancool 216', '{"max_board":"ATX","supports":["ATX","mATX","ITX"],"gpu_max_mm":392,"cooler_max_mm":180,"radiator_mm":[240,280,360],"psu":"ATX","fans_included":3,"drive_35":2,"color":"black"}', 9500, '', 1, 1, 52),
(54, 'cooler-master-nr200p', 'case', 'Cooler Master', 'Cooler Master NR200P (Mini-ITX)', '{"max_board":"ITX","supports":["ITX"],"gpu_max_mm":330,"cooler_max_mm":155,"radiator_mm":[240,280],"psu":"SFX","fans_included":2,"drive_35":1,"color":"black"}', 8200, '', 1, 1, 53),
(55, 'case-fans-3-pack-argb', 'extra', 'Deepcool', 'ARGB case fans (3-pack)', '{"kind":"fans","fans_count":3,"power_w":0}', 2400, '', 1, 1, 54),
(56, 'wifi-6-pcie-card', 'extra', 'TP-Link', 'Wi-Fi 6 + Bluetooth PCIe card', '{"kind":"wifi","power_w":5}', 2700, '', 1, 1, 55),
(57, 'bluetooth-usb-adapter', 'extra', 'TP-Link', 'Bluetooth 5.3 USB adapter', '{"kind":"bluetooth","power_w":1}', 650, '', 1, 1, 56),
(58, 'creative-sound-card', 'extra', 'Creative', 'Creative Sound Blaster Audigy FX', '{"kind":"sound","power_w":5}', 3900, '', 1, 1, 57),
(59, 'elgato-capture-card', 'extra', 'Elgato', 'Elgato 4K60 Pro capture card', '{"kind":"capture","power_w":10}', 19500, '', 1, 1, 58),
(60, 'argb-controller', 'extra', 'Generic', 'ARGB hub & controller', '{"kind":"rgb","power_w":2}', 900, '', 1, 1, 59),
(61, 'arctic-mx-6', 'extra', 'Arctic', 'Arctic MX-6 thermal paste', '{"kind":"paste","power_w":0}', 650, '', 1, 1, 60),
(62, 'windows-11-home', 'extra', 'Microsoft', 'Windows 11 Home (genuine licence)', '{"kind":"os","power_w":0}', 9500, '', 1, 1, 61),
(63, 'windows-11-pro', 'extra', 'Microsoft', 'Windows 11 Pro (genuine licence)', '{"kind":"os","power_w":0}', 13500, '', 1, 1, 62);

-- --------------------------------------------------------
-- Table structure for table `pc_presets`
--

CREATE TABLE IF NOT EXISTS `pc_presets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `summary` text NOT NULL,
  `parts` longtext NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `sort` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_pc_presets_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table `pc_presets`
--

INSERT INTO `pc_presets` (`id`, `slug`, `name`, `summary`, `parts`, `active`, `sort`) VALUES
(1, 'office-pc', 'Office PC', 'Quiet, efficient everyday computer for billing, browsing and Office work.', '["intel-core-i5-12400","msi-pro-h610m-e-ddr4","ddr4-16gb-3200","samsung-980-1tb","deepcool-pf450","ant-esports-ice-100","windows-11-pro"]', 1, 0),
(2, 'gaming-pc', 'Gaming PC', '1080p/1440p gaming with a modern AM5 platform and room to upgrade.', '["amd-ryzen-5-7600","msi-b650m-gaming-plus-wifi","ddr5-32gb-6000-rgb","rtx-4060-8gb","samsung-980-1tb","deepcool-ak400","msi-mag-a650bn","deepcool-cc560"]', 1, 1),
(3, 'creator-workstation', 'Creator Workstation', 'Video editing, 3D and CAD with plenty of cores, memory and fast storage.', '["amd-ryzen-9-7900x","gigabyte-b650-aorus-elite-ax","ddr5-64gb-6000","rtx-4070-super-12gb","wd-black-sn850x-2tb","seagate-barracuda-2tb","lian-li-galahad-360","corsair-rm850x","lian-li-lancool-216"]', 1, 2),
(4, 'budget-pc', 'Budget PC', 'Lowest-cost reliable build for study and home use.', '["amd-ryzen-5-5600","gigabyte-b550m-ds3h","ddr4-16gb-3200","rtx-3050-6gb","crucial-p3-500gb","deepcool-pf450","ant-esports-ice-100"]', 1, 3);

-- --------------------------------------------------------
-- Table structure for table `pc_builds`
--

CREATE TABLE IF NOT EXISTS `pc_builds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `phone` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(191) NOT NULL DEFAULT '',
  `notes` text NOT NULL,
  `parts` longtext NOT NULL,
  `summary` text NOT NULL,
  `subtotal` int(11) NOT NULL DEFAULT 0,
  `total` int(11) NOT NULL DEFAULT 0,
  `status` varchar(20) NOT NULL DEFAULT 'saved',
  `created_at` varchar(50) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_pc_builds_code` (`code`),
  KEY `idx_pc_builds_user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for table `enquiries`
--

CREATE TABLE IF NOT EXISTS `enquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kind` varchar(50) NOT NULL DEFAULT 'service',
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(191) NOT NULL DEFAULT '',
  `topic` varchar(100) NOT NULL DEFAULT '',
  `message` text NOT NULL,
  `area` varchar(100) NOT NULL DEFAULT '',
  `preferred` varchar(100) NOT NULL DEFAULT '',
  `status` varchar(20) NOT NULL DEFAULT 'new',
  `created_at` varchar(50) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
