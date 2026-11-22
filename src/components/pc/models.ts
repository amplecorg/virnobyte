// Real 3D models for the PC builder (CC BY 4.0, via Sketchfab / Objaverse — see MODEL_CREDITS).
// Each entry says how to turn the downloaded model into the viewer's frame:
//   x = case depth (front +x), y = up, z = out of the motherboard towards the glass (+z).
// `steps` are rotations about the world axes, applied in order, in degrees.
import * as THREE from 'three';
import type { Part } from '@/lib/pc/engine';

export type Axis = 'x' | 'y' | 'z';
export interface ModelDef {
  url: string;
  steps?: [Axis, number][];
  credit: string; // key into MODEL_CREDITS
}

export const MODELS = {
  // Graphics cards: length along x (bracket at -x), fans facing down (-y), PCB edge into the slot (-z).
  gpuFounders: { url: '/models/gpu/nvidia-founders.glb', steps: [['z', 90]], credit: 'rtx3080' },
  gpuFoundersDual: { url: '/models/gpu/nvidia-founders-dual.glb', steps: [['x', -90]], credit: 'rtx3070' },
  gpuMsiTrio: { url: '/models/gpu/msi-gaming-x-trio.glb', steps: [['x', 180]], credit: 'msiTrio' },
  gpuRadeon: { url: '/models/gpu/radeon-reference.glb', steps: [['x', 180]], credit: 'rx6900' },
  // Processors: lying on the board, lid facing +z.
  cpuAmd: { url: '/models/cpu/amd-ryzen.glb', steps: [['x', 90], ['z', -90]], credit: 'ryzen' },
  cpuIntel: { url: '/models/cpu/intel-core.glb', steps: [['x', 90]], credit: 'intel' },
  // Coolers / fans
  coolerTower: { url: '/models/cooling/tower-air.glb', steps: [['x', 90]], credit: 'tower' },
  aioRadiator: { url: '/models/cooling/aio-radiator.glb', steps: [['z', 90], ['x', 180]], credit: 'aio' },
  fanRgb: { url: '/models/cooling/lian-li-uni-fan.glb', steps: [['x', 90]], credit: 'unifan' },
  // Memory: stick length along y, standing out of the board along z.
  ramCrucial: { url: '/models/ram/crucial-ddr4.glb', steps: [['z', 90], ['x', 180]], credit: 'crucial' },
  ramBallistix: { url: '/models/ram/crucial-ballistix.glb', steps: [['z', 90], ['x', 180]], credit: 'ballistix' },
  ramTrident: { url: '/models/ram/gskill-trident-z.glb', steps: [['x', 90], ['z', 90], ['x', 180]], credit: 'trident' },
  ramRgb: { url: '/models/ram/aorus-rgb.glb', steps: [['x', 90], ['z', 90]], credit: 'aorus' },
  // Motherboards: board in the XY plane, components facing +z, rear I/O at top-left (-x, +y).
  mbAsus: { url: '/models/motherboards/asus-rog-strix.glb', credit: 'rog' },
  mbAorus: { url: '/models/motherboards/gigabyte-aorus.glb', credit: 'trx40' },
  mbAtx: { url: '/models/motherboards/msi-style-atx.glb', steps: [['x', 90]], credit: 'am4board' },
  // Power + storage
  psu: { url: '/models/psu/atx-psu.glb', steps: [['y', -90]], credit: 'psu' },
  nvme: { url: '/models/storage/nvme-m2.glb', steps: [['x', 90]], credit: 'storage' },
  nvmeHeatsink: { url: '/models/storage/nvme-m2-heatsink.glb', steps: [['x', 90]], credit: 'storage' },
  ssdSata: { url: '/models/storage/samsung-sata-ssd.glb', credit: 'storage' },
  hdd: { url: '/models/storage/hdd-3_5.glb', steps: [['y', 90]], credit: 'storage' },
} satisfies Record<string, ModelDef>;

export type ModelKey = keyof typeof MODELS;

export const MODEL_CREDITS: Record<string, { name: string; author: string; url: string }> = {
  rtx3080: { name: 'GeForce RTX 3080 Graphics Card', author: 'samuelsurovic', url: 'https://sketchfab.com/3d-models/8b947ee1bf7a4e3d8ffa1c24893ac160' },
  rtx3070: { name: 'Nvidia GeForce RTX 3070', author: 'DatSketch', url: 'https://sketchfab.com/3d-models/29da4e10eb6c427cb72f3ebdf822f89e' },
  msiTrio: { name: 'MSI GeForce RTX 3080 Gaming X Trio', author: 'meu9MM98', url: 'https://sketchfab.com/3d-models/e5356746dcec48f9868164bb9674ab9a' },
  rx6900: { name: 'Rx6900XT', author: 'sanketrules911', url: 'https://sketchfab.com/3d-models/f21fc17d04404bf897a7b1727ee95f15' },
  ryzen: { name: 'CPU Ryzen 5 3600', author: 'bazyaev08', url: 'https://sketchfab.com/3d-models/249fb5e8c1e94686a2c2b1cd6df72bc5' },
  intel: { name: 'INTEL CPU', author: 'KuatEntralla3D', url: 'https://sketchfab.com/3d-models/ec11f729b05848488522ba6f8c6f254f' },
  tower: { name: 'CPU Cooler', author: 'bazyaev08', url: 'https://sketchfab.com/3d-models/672a0a74a98c452a862016bee99f3579' },
  aio: { name: 'liquid-cooler', author: 'snrnsrk5', url: 'https://sketchfab.com/3d-models/1c60872e45144239aadb4e188c43bce3' },
  unifan: { name: 'Lian Li UNI FAN SL120 RGB BLACK', author: 'DIEKO', url: 'https://sketchfab.com/3d-models/5abd0d8e89ea4241b7216f4b6d5a2ca4' },
  crucial: { name: 'Crucial 8 GB DDR4 2133 RAM', author: 'blackcube4', url: 'https://sketchfab.com/3d-models/6fa0d3b8c5684741be7d7e396e01bc9f' },
  ballistix: { name: 'Crucial BALLISTIX 8GB DDR4 3600 RAM', author: 'blackcube4', url: 'https://sketchfab.com/3d-models/1fce4935471e46cab6ee57ba140c87f9' },
  trident: { name: 'trident Z ram', author: 'miharbi', url: 'https://sketchfab.com/3d-models/c47b8593b54b492eb436fa673fa601bf' },
  aorus: { name: 'RAM Gigabyte DDR4 16GB AORUS RGB', author: 'poll1980v', url: 'https://sketchfab.com/3d-models/ac4d42f988ef4226a7a276e447a19bd3' },
  rog: { name: 'Rog Strix x370-f Motherboard', author: 'MUSHROOM_BUILDS', url: 'https://sketchfab.com/3d-models/56bd8923fdf341fd8d81b717055a61dd' },
  trx40: { name: 'Gigabyte TRX40 AORUS XTREME', author: 'blue-odym', url: 'https://sketchfab.com/3d-models/ce8276877171468c808ad93aaf1d5111' },
  am4board: { name: 'motherboard am4', author: 'Temooor', url: 'https://sketchfab.com/3d-models/783d063a29424571bfb4c9b7b490b75f' },
  psu: { name: 'Power Supply - Basic', author: 'alexlh2003', url: 'https://sketchfab.com/3d-models/02db33d66a784c82a6202a3ec6850498' },
  storage: { name: 'Storage (SSD, HDD, M.2)', author: 'blue-odym', url: 'https://sketchfab.com/3d-models/bdd5fd67a7674359ab8648204b5c0575' },
};

/** Applies a model's orientation steps (world-axis rotations, in order) to an object. */
export function orient(obj: THREE.Object3D, steps: [Axis, number][] = []) {
  const q = new THREE.Quaternion();
  const AX = { x: new THREE.Vector3(1, 0, 0), y: new THREE.Vector3(0, 1, 0), z: new THREE.Vector3(0, 0, 1) };
  for (const [a, deg] of steps) q.premultiply(new THREE.Quaternion().setFromAxisAngle(AX[a], THREE.MathUtils.degToRad(deg)));
  obj.quaternion.premultiply(q);
}

const has = (p: Part, re: RegExp) => re.test(`${p.brand} ${p.name}`);

/** Picks the closest-looking real model for a catalogue part (an explicit part.model_url still wins). */
export function modelFor(p: Part | undefined, slot?: 'fan'): ModelDef | undefined {
  if (!p) return undefined;
  if (slot === 'fan') return MODELS.fanRgb;
  switch (p.category) {
    case 'gpu':
      if (p.specs.maker === 'AMD') return MODELS.gpuRadeon;
      if (has(p, /4080|4090/)) return MODELS.gpuFounders;
      if (has(p, /4070/)) return MODELS.gpuMsiTrio;
      return MODELS.gpuFoundersDual;
    case 'cpu':
      return p.specs.socket?.startsWith('AM') ? MODELS.cpuAmd : MODELS.cpuIntel;
    case 'cooler':
      return p.specs.kind === 'AIO' ? MODELS.aioRadiator : MODELS.coolerTower;
    case 'ram':
      if (has(p, /Crucial/)) return MODELS.ramCrucial;
      if (has(p, /G\.?Skill|Trident/)) return MODELS.ramTrident;
      if (p.specs.rgb) return MODELS.ramRgb;
      return MODELS.ramBallistix;
    case 'motherboard':
      if (has(p, /ASUS/)) return MODELS.mbAsus;
      if (has(p, /Aorus/i)) return MODELS.mbAorus;
      return MODELS.mbAtx;
    case 'psu':
      return MODELS.psu;
    case 'storage':
      if (p.specs.form_factor === 'M.2' || p.specs.kind === 'NVMe') return +p.specs.read_mbps >= 7000 ? MODELS.nvmeHeatsink : MODELS.nvme;
      if (p.specs.kind === 'HDD') return MODELS.hdd;
      return MODELS.ssdSata;
  }
  return undefined;
}
