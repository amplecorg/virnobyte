// Seed catalogue for the PC builder. Prices are indicative INR street prices and
// specs are typical published values — verify both in /admin/r/pc_parts before launch.
type Seed = { slug: string; category: string; brand: string; name: string; price: number; specs: Record<string, any> };

const AM4 = 'AM4', AM5 = 'AM5', LGA = 'LGA1700';
const ALL_SOCKETS = [LGA, AM4, AM5];

export const PC_PARTS: Seed[] = [
  // Processors
  { slug: 'intel-core-i3-12100f', category: 'cpu', brand: 'Intel', name: 'Intel Core i3-12100F', price: 7500, specs: { socket: LGA, cores: 4, threads: 8, base_ghz: 3.3, boost_ghz: 4.3, tdp: 58, igpu: false, cooler_included: true } },
  { slug: 'intel-core-i5-12400', category: 'cpu', brand: 'Intel', name: 'Intel Core i5-12400', price: 13500, specs: { socket: LGA, cores: 6, threads: 12, base_ghz: 2.5, boost_ghz: 4.4, tdp: 65, igpu: 'UHD 730', cooler_included: true } },
  { slug: 'intel-core-i5-14400f', category: 'cpu', brand: 'Intel', name: 'Intel Core i5-14400F', price: 16500, specs: { socket: LGA, cores: 10, threads: 16, base_ghz: 2.5, boost_ghz: 4.7, tdp: 65, igpu: false, cooler_included: true } },
  { slug: 'intel-core-i7-14700k', category: 'cpu', brand: 'Intel', name: 'Intel Core i7-14700K', price: 36000, specs: { socket: LGA, cores: 20, threads: 28, base_ghz: 3.4, boost_ghz: 5.6, tdp: 125, igpu: 'UHD 770', cooler_included: false } },
  { slug: 'amd-ryzen-5-5600', category: 'cpu', brand: 'AMD', name: 'AMD Ryzen 5 5600', price: 10500, specs: { socket: AM4, cores: 6, threads: 12, base_ghz: 3.5, boost_ghz: 4.4, tdp: 65, igpu: false, cooler_included: true } },
  { slug: 'amd-ryzen-5-7600', category: 'cpu', brand: 'AMD', name: 'AMD Ryzen 5 7600', price: 19500, specs: { socket: AM5, cores: 6, threads: 12, base_ghz: 3.8, boost_ghz: 5.1, tdp: 65, igpu: 'Radeon Graphics', cooler_included: true } },
  { slug: 'amd-ryzen-7-7800x3d', category: 'cpu', brand: 'AMD', name: 'AMD Ryzen 7 7800X3D', price: 34000, specs: { socket: AM5, cores: 8, threads: 16, base_ghz: 4.2, boost_ghz: 5.0, tdp: 120, igpu: 'Radeon Graphics', cooler_included: false } },
  { slug: 'amd-ryzen-9-7900x', category: 'cpu', brand: 'AMD', name: 'AMD Ryzen 9 7900X', price: 36500, specs: { socket: AM5, cores: 12, threads: 24, base_ghz: 4.7, boost_ghz: 5.6, tdp: 170, igpu: 'Radeon Graphics', cooler_included: false } },

  // Motherboards
  { slug: 'msi-pro-h610m-e-ddr4', category: 'motherboard', brand: 'MSI', name: 'MSI PRO H610M-E DDR4', price: 7200, specs: { socket: LGA, chipset: 'H610', form_factor: 'mATX', ram_type: 'DDR4', ram_slots: 2, max_ram_gb: 64, m2_slots: 1, sata_ports: 4, pcie_x16: 1, wifi: false } },
  { slug: 'gigabyte-b760m-ds3h-ddr4', category: 'motherboard', brand: 'Gigabyte', name: 'Gigabyte B760M DS3H DDR4', price: 10800, specs: { socket: LGA, chipset: 'B760', form_factor: 'mATX', ram_type: 'DDR4', ram_slots: 4, max_ram_gb: 128, m2_slots: 2, sata_ports: 4, pcie_x16: 1, wifi: false } },
  { slug: 'asus-tuf-b760-plus-wifi-d5', category: 'motherboard', brand: 'ASUS', name: 'ASUS TUF Gaming B760-Plus WiFi D5', price: 18500, specs: { socket: LGA, chipset: 'B760', form_factor: 'ATX', ram_type: 'DDR5', ram_slots: 4, max_ram_gb: 192, m2_slots: 3, sata_ports: 4, pcie_x16: 2, wifi: true } },
  { slug: 'msi-mag-z790-tomahawk-wifi', category: 'motherboard', brand: 'MSI', name: 'MSI MAG Z790 Tomahawk WiFi', price: 27500, specs: { socket: LGA, chipset: 'Z790', form_factor: 'ATX', ram_type: 'DDR5', ram_slots: 4, max_ram_gb: 192, m2_slots: 4, sata_ports: 7, pcie_x16: 2, wifi: true } },
  { slug: 'gigabyte-b550m-ds3h', category: 'motherboard', brand: 'Gigabyte', name: 'Gigabyte B550M DS3H', price: 8900, specs: { socket: AM4, chipset: 'B550', form_factor: 'mATX', ram_type: 'DDR4', ram_slots: 4, max_ram_gb: 128, m2_slots: 2, sata_ports: 4, pcie_x16: 1, wifi: false } },
  { slug: 'msi-b650m-gaming-plus-wifi', category: 'motherboard', brand: 'MSI', name: 'MSI B650M Gaming Plus WiFi', price: 15500, specs: { socket: AM5, chipset: 'B650', form_factor: 'mATX', ram_type: 'DDR5', ram_slots: 4, max_ram_gb: 192, m2_slots: 2, sata_ports: 4, pcie_x16: 1, wifi: true } },
  { slug: 'gigabyte-b650-aorus-elite-ax', category: 'motherboard', brand: 'Gigabyte', name: 'Gigabyte B650 Aorus Elite AX', price: 21500, specs: { socket: AM5, chipset: 'B650', form_factor: 'ATX', ram_type: 'DDR5', ram_slots: 4, max_ram_gb: 192, m2_slots: 3, sata_ports: 4, pcie_x16: 1, wifi: true } },
  { slug: 'asus-rog-strix-b650e-i', category: 'motherboard', brand: 'ASUS', name: 'ASUS ROG Strix B650E-I Gaming WiFi', price: 29500, specs: { socket: AM5, chipset: 'B650E', form_factor: 'ITX', ram_type: 'DDR5', ram_slots: 2, max_ram_gb: 96, m2_slots: 2, sata_ports: 2, pcie_x16: 1, wifi: true } },

  // Memory
  { slug: 'ddr4-8gb-3200', category: 'ram', brand: 'Crucial', name: 'Crucial 8 GB DDR4-3200 (1×8)', price: 1700, specs: { type: 'DDR4', capacity_gb: 8, modules: 1, speed_mts: 3200, rgb: false, height_mm: 31 } },
  { slug: 'ddr4-16gb-3200', category: 'ram', brand: 'Kingston', name: 'Kingston Fury Beast 16 GB DDR4-3200 (2×8)', price: 3600, specs: { type: 'DDR4', capacity_gb: 16, modules: 2, speed_mts: 3200, rgb: false, height_mm: 34 } },
  { slug: 'ddr4-32gb-3600-rgb', category: 'ram', brand: 'Corsair', name: 'Corsair Vengeance RGB Pro 32 GB DDR4-3600 (2×16)', price: 7800, specs: { type: 'DDR4', capacity_gb: 32, modules: 2, speed_mts: 3600, rgb: true, height_mm: 51 } },
  { slug: 'ddr5-16gb-5600', category: 'ram', brand: 'Kingston', name: 'Kingston Fury Beast 16 GB DDR5-5600 (2×8)', price: 5200, specs: { type: 'DDR5', capacity_gb: 16, modules: 2, speed_mts: 5600, rgb: false, height_mm: 34 } },
  { slug: 'ddr5-32gb-6000-rgb', category: 'ram', brand: 'G.Skill', name: 'G.Skill Trident Z5 RGB 32 GB DDR5-6000 (2×16)', price: 11500, specs: { type: 'DDR5', capacity_gb: 32, modules: 2, speed_mts: 6000, rgb: true, height_mm: 44 } },
  { slug: 'ddr5-64gb-6000', category: 'ram', brand: 'Corsair', name: 'Corsair Vengeance 64 GB DDR5-6000 (2×32)', price: 19500, specs: { type: 'DDR5', capacity_gb: 64, modules: 2, speed_mts: 6000, rgb: false, height_mm: 35 } },
  { slug: 'ddr5-128gb-5600', category: 'ram', brand: 'Kingston', name: 'Kingston Fury Beast 128 GB DDR5-5600 (4×32)', price: 39000, specs: { type: 'DDR5', capacity_gb: 128, modules: 4, speed_mts: 5600, rgb: false, height_mm: 34 } },

  // Graphics
  { slug: 'rtx-3050-6gb', category: 'gpu', brand: 'NVIDIA', name: 'GeForce RTX 3050 6 GB', price: 16500, specs: { maker: 'NVIDIA', vram_gb: 6, length_mm: 205, power_w: 70, rec_psu_w: 300, slots: 2, fans: 2 } },
  { slug: 'rtx-4060-8gb', category: 'gpu', brand: 'NVIDIA', name: 'GeForce RTX 4060 8 GB', price: 28500, specs: { maker: 'NVIDIA', vram_gb: 8, length_mm: 240, power_w: 115, rec_psu_w: 550, slots: 2, fans: 2 } },
  { slug: 'rx-7600-8gb', category: 'gpu', brand: 'AMD', name: 'Radeon RX 7600 8 GB', price: 25500, specs: { maker: 'AMD', vram_gb: 8, length_mm: 250, power_w: 165, rec_psu_w: 550, slots: 2, fans: 2 } },
  { slug: 'rtx-4070-super-12gb', category: 'gpu', brand: 'NVIDIA', name: 'GeForce RTX 4070 Super 12 GB', price: 58000, specs: { maker: 'NVIDIA', vram_gb: 12, length_mm: 267, power_w: 220, rec_psu_w: 650, slots: 2.5, fans: 3 } },
  { slug: 'rx-7800-xt-16gb', category: 'gpu', brand: 'AMD', name: 'Radeon RX 7800 XT 16 GB', price: 49000, specs: { maker: 'AMD', vram_gb: 16, length_mm: 287, power_w: 263, rec_psu_w: 700, slots: 2.5, fans: 3 } },
  { slug: 'rtx-4080-super-16gb', category: 'gpu', brand: 'NVIDIA', name: 'GeForce RTX 4080 Super 16 GB', price: 99000, specs: { maker: 'NVIDIA', vram_gb: 16, length_mm: 310, power_w: 320, rec_psu_w: 750, slots: 3, fans: 3 } },
  { slug: 'rtx-4090-24gb', category: 'gpu', brand: 'NVIDIA', name: 'GeForce RTX 4090 24 GB', price: 185000, specs: { maker: 'NVIDIA', vram_gb: 24, length_mm: 336, power_w: 450, rec_psu_w: 850, slots: 3.5, fans: 3 } },

  // Storage
  { slug: 'crucial-p3-500gb', category: 'storage', brand: 'Crucial', name: 'Crucial P3 500 GB NVMe SSD', price: 3200, specs: { kind: 'NVMe', capacity_gb: 500, interface: 'PCIe 3.0 ×4', read_mbps: 3500, write_mbps: 1900, form_factor: 'M.2' } },
  { slug: 'samsung-980-1tb', category: 'storage', brand: 'Samsung', name: 'Samsung 980 1 TB NVMe SSD', price: 6200, specs: { kind: 'NVMe', capacity_gb: 1000, interface: 'PCIe 3.0 ×4', read_mbps: 3500, write_mbps: 3000, form_factor: 'M.2' } },
  { slug: 'wd-black-sn850x-2tb', category: 'storage', brand: 'WD', name: 'WD Black SN850X 2 TB NVMe SSD', price: 14500, specs: { kind: 'NVMe', capacity_gb: 2000, interface: 'PCIe 4.0 ×4', read_mbps: 7300, write_mbps: 6600, form_factor: 'M.2' } },
  { slug: 'crucial-mx500-1tb', category: 'storage', brand: 'Crucial', name: 'Crucial MX500 1 TB SATA SSD', price: 5800, specs: { kind: 'SATA SSD', capacity_gb: 1000, interface: 'SATA III', read_mbps: 560, write_mbps: 510, form_factor: '2.5"' } },
  { slug: 'seagate-barracuda-2tb', category: 'storage', brand: 'Seagate', name: 'Seagate Barracuda 2 TB HDD', price: 5200, specs: { kind: 'HDD', capacity_gb: 2000, interface: 'SATA III, 7200 rpm', read_mbps: 220, write_mbps: 220, form_factor: '3.5"' } },

  // Power supplies
  { slug: 'deepcool-pf450', category: 'psu', brand: 'Deepcool', name: 'Deepcool PF450 450 W', price: 2900, specs: { watts: 450, efficiency: '80+ White', modular: 'Non-modular', form_factor: 'ATX' } },
  { slug: 'corsair-cv550', category: 'psu', brand: 'Corsair', name: 'Corsair CV550 550 W', price: 4200, specs: { watts: 550, efficiency: '80+ Bronze', modular: 'Non-modular', form_factor: 'ATX' } },
  { slug: 'msi-mag-a650bn', category: 'psu', brand: 'MSI', name: 'MSI MAG A650BN 650 W', price: 4900, specs: { watts: 650, efficiency: '80+ Bronze', modular: 'Non-modular', form_factor: 'ATX' } },
  { slug: 'corsair-rm750e', category: 'psu', brand: 'Corsair', name: 'Corsair RM750e 750 W', price: 8900, specs: { watts: 750, efficiency: '80+ Gold', modular: 'Fully modular', form_factor: 'ATX' } },
  { slug: 'corsair-rm850x', category: 'psu', brand: 'Corsair', name: 'Corsair RM850x 850 W', price: 12500, specs: { watts: 850, efficiency: '80+ Gold', modular: 'Fully modular', form_factor: 'ATX' } },
  { slug: 'seasonic-focus-gx-1000', category: 'psu', brand: 'Seasonic', name: 'Seasonic Focus GX-1000 1000 W', price: 16500, specs: { watts: 1000, efficiency: '80+ Gold', modular: 'Fully modular', form_factor: 'ATX' } },
  { slug: 'corsair-sf750', category: 'psu', brand: 'Corsair', name: 'Corsair SF750 750 W SFX', price: 15500, specs: { watts: 750, efficiency: '80+ Platinum', modular: 'Fully modular', form_factor: 'SFX' } },

  // Coolers
  { slug: 'deepcool-ak400', category: 'cooler', brand: 'Deepcool', name: 'Deepcool AK400 air cooler', price: 2600, specs: { kind: 'Air', sockets: ALL_SOCKETS, height_mm: 155, tdp_w: 220 } },
  { slug: 'cooler-master-hyper-212', category: 'cooler', brand: 'Cooler Master', name: 'Cooler Master Hyper 212 Black', price: 3200, specs: { kind: 'Air', sockets: ALL_SOCKETS, height_mm: 154, tdp_w: 150 } },
  { slug: 'noctua-nh-d15', category: 'cooler', brand: 'Noctua', name: 'Noctua NH-D15 chromax.black', price: 11500, specs: { kind: 'Air', sockets: ALL_SOCKETS, height_mm: 165, tdp_w: 250 } },
  { slug: 'deepcool-le520-240', category: 'cooler', brand: 'Deepcool', name: 'Deepcool LE520 240 mm AIO', price: 5900, specs: { kind: 'AIO', sockets: ALL_SOCKETS, radiator_mm: 240, tdp_w: 220, rgb: true } },
  { slug: 'nzxt-kraken-280', category: 'cooler', brand: 'NZXT', name: 'NZXT Kraken 280 mm AIO', price: 13500, specs: { kind: 'AIO', sockets: ALL_SOCKETS, radiator_mm: 280, tdp_w: 250, rgb: true } },
  { slug: 'lian-li-galahad-360', category: 'cooler', brand: 'Lian Li', name: 'Lian Li Galahad II 360 mm AIO', price: 14500, specs: { kind: 'AIO', sockets: ALL_SOCKETS, radiator_mm: 360, tdp_w: 300, rgb: true } },

  // Cabinets
  { slug: 'ant-esports-ice-100', category: 'case', brand: 'Ant Esports', name: 'Ant Esports ICE-100 Air Mini', price: 2900, specs: { max_board: 'mATX', supports: ['mATX', 'ITX'], gpu_max_mm: 320, cooler_max_mm: 150, radiator_mm: [240], psu: 'ATX', fans_included: 3, drive_35: 1, color: 'black' } },
  { slug: 'cooler-master-q300l', category: 'case', brand: 'Cooler Master', name: 'Cooler Master MasterBox Q300L', price: 4300, specs: { max_board: 'mATX', supports: ['mATX', 'ITX'], gpu_max_mm: 360, cooler_max_mm: 159, radiator_mm: [240], psu: 'ATX', fans_included: 1, drive_35: 1, color: 'black' } },
  { slug: 'deepcool-cc560', category: 'case', brand: 'Deepcool', name: 'Deepcool CC560', price: 4800, specs: { max_board: 'ATX', supports: ['ATX', 'mATX', 'ITX'], gpu_max_mm: 370, cooler_max_mm: 163, radiator_mm: [240, 280, 360], psu: 'ATX', fans_included: 4, drive_35: 2, color: 'black' } },
  { slug: 'nzxt-h5-flow', category: 'case', brand: 'NZXT', name: 'NZXT H5 Flow', price: 8500, specs: { max_board: 'ATX', supports: ['ATX', 'mATX', 'ITX'], gpu_max_mm: 365, cooler_max_mm: 165, radiator_mm: [240, 280], psu: 'ATX', fans_included: 2, drive_35: 1, color: 'white' } },
  { slug: 'lian-li-lancool-216', category: 'case', brand: 'Lian Li', name: 'Lian Li Lancool 216', price: 9500, specs: { max_board: 'ATX', supports: ['ATX', 'mATX', 'ITX'], gpu_max_mm: 392, cooler_max_mm: 180, radiator_mm: [240, 280, 360], psu: 'ATX', fans_included: 3, drive_35: 2, color: 'black' } },
  { slug: 'cooler-master-nr200p', category: 'case', brand: 'Cooler Master', name: 'Cooler Master NR200P (Mini-ITX)', price: 8200, specs: { max_board: 'ITX', supports: ['ITX'], gpu_max_mm: 330, cooler_max_mm: 155, radiator_mm: [240, 280], psu: 'SFX', fans_included: 2, drive_35: 1, color: 'black' } },

  // Add-ons
  { slug: 'case-fans-3-pack-argb', category: 'extra', brand: 'Deepcool', name: 'ARGB case fans (3-pack)', price: 2400, specs: { kind: 'fans', fans_count: 3, power_w: 0 } },
  { slug: 'wifi-6-pcie-card', category: 'extra', brand: 'TP-Link', name: 'Wi-Fi 6 + Bluetooth PCIe card', price: 2700, specs: { kind: 'wifi', power_w: 5 } },
  { slug: 'bluetooth-usb-adapter', category: 'extra', brand: 'TP-Link', name: 'Bluetooth 5.3 USB adapter', price: 650, specs: { kind: 'bluetooth', power_w: 1 } },
  { slug: 'creative-sound-card', category: 'extra', brand: 'Creative', name: 'Creative Sound Blaster Audigy FX', price: 3900, specs: { kind: 'sound', power_w: 5 } },
  { slug: 'elgato-capture-card', category: 'extra', brand: 'Elgato', name: 'Elgato 4K60 Pro capture card', price: 19500, specs: { kind: 'capture', power_w: 10 } },
  { slug: 'argb-controller', category: 'extra', brand: 'Generic', name: 'ARGB hub & controller', price: 900, specs: { kind: 'rgb', power_w: 2 } },
  { slug: 'arctic-mx-6', category: 'extra', brand: 'Arctic', name: 'Arctic MX-6 thermal paste', price: 650, specs: { kind: 'paste', power_w: 0 } },
  { slug: 'windows-11-home', category: 'extra', brand: 'Microsoft', name: 'Windows 11 Home (genuine licence)', price: 9500, specs: { kind: 'os', power_w: 0 } },
  { slug: 'windows-11-pro', category: 'extra', brand: 'Microsoft', name: 'Windows 11 Pro (genuine licence)', price: 13500, specs: { kind: 'os', power_w: 0 } },
];

export const PC_PRESETS = [
  {
    slug: 'office-pc', name: 'Office PC', summary: 'Quiet, efficient everyday computer for billing, browsing and Office work.',
    parts: ['intel-core-i5-12400', 'msi-pro-h610m-e-ddr4', 'ddr4-16gb-3200', 'samsung-980-1tb', 'deepcool-pf450', 'ant-esports-ice-100', 'windows-11-pro'],
  },
  {
    slug: 'gaming-pc', name: 'Gaming PC', summary: '1080p/1440p gaming with a modern AM5 platform and room to upgrade.',
    parts: ['amd-ryzen-5-7600', 'msi-b650m-gaming-plus-wifi', 'ddr5-32gb-6000-rgb', 'rtx-4060-8gb', 'samsung-980-1tb', 'deepcool-ak400', 'msi-mag-a650bn', 'deepcool-cc560'],
  },
  {
    slug: 'creator-workstation', name: 'Creator Workstation', summary: 'Video editing, 3D and CAD with plenty of cores, memory and fast storage.',
    parts: ['amd-ryzen-9-7900x', 'gigabyte-b650-aorus-elite-ax', 'ddr5-64gb-6000', 'rtx-4070-super-12gb', 'wd-black-sn850x-2tb', 'seagate-barracuda-2tb', 'lian-li-galahad-360', 'corsair-rm850x', 'lian-li-lancool-216'],
  },
  {
    slug: 'budget-pc', name: 'Budget PC', summary: 'Lowest-cost reliable build for study and home use.',
    parts: ['amd-ryzen-5-5600', 'gigabyte-b550m-ds3h', 'ddr4-16gb-3200', 'rtx-3050-6gb', 'crucial-p3-500gb', 'deepcool-pf450', 'ant-esports-ice-100'],
  },
];
