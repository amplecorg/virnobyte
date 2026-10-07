// Procedural 3D components for the PC viewer. 1 world unit = 100 mm.
// Every part is its own object so it can be swapped independently; when a part has a
// model_url, <PartModel> loads the .glb lazily and falls back to the procedural mesh.
import { Component, Suspense, useMemo, useRef, useState, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, RoundedBox, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { Part } from '@/lib/pc/engine';

export interface CaseDims {
  D: number; // depth (front–back, x)
  H: number; // height (y)
  W: number; // width (side to side, z)
  board: { w: number; h: number };
}

export function caseDims(board?: string): CaseDims {
  if (board === 'ITX') return { D: 3.7, H: 3.4, W: 2.0, board: { w: 1.7, h: 1.7 } };
  if (board === 'mATX') return { D: 4.0, H: 4.25, W: 2.1, board: { w: 2.44, h: 2.44 } };
  return { D: 4.6, H: 4.9, W: 2.3, board: { w: 2.44, h: 3.05 } };
}

/** Anchor points derived from the case and board size. */
export function layout(dims: CaseDims, mbFormFactor?: string) {
  const b = mbFormFactor ? caseDims(mbFormFactor).board : dims.board;
  const boardZ = -dims.W / 2 + 0.22;
  const x0 = -dims.D / 2 + 0.28;
  const top = dims.H / 2 - 0.32;
  const cpu = new THREE.Vector3(x0 + b.w * 0.42, top - 0.78, boardZ);
  return {
    board: b,
    boardZ,
    x0,
    top,
    cpu,
    ramX: cpu.x + 0.62,
    m2: new THREE.Vector3(cpu.x, cpu.y - 1.05, boardZ),
    pcieY: top - (b.h > 2.6 ? 1.6 : 1.45),
  };
}

const mat = (color: string, opts: THREE.MeshStandardMaterialParameters = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.35, ...opts });

/** Wraps a part: drop-in animation on swap, hover label, click to focus. */
export function Inspectable({
  label, sub, children, onFocus, focusPoint,
}: { label: string; sub?: string; children: ReactNode; onFocus?: (p: THREE.Vector3) => void; focusPoint: THREE.Vector3 }) {
  const ref = useRef<THREE.Group>(null);
  const [hover, setHover] = useState(false);
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    g.position.y = THREE.MathUtils.damp(g.position.y, hover ? 0.03 : 0, 8, dt);
  });
  return (
    <group
      ref={ref}
      position={[0, 0.9, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHover(false);
        document.body.style.cursor = '';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onFocus?.(focusPoint);
      }}
    >
      {children}
      {hover && (
        <Html position={focusPoint.toArray()} center distanceFactor={9} zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
          <div className="pc-tip">
            <strong>{label}</strong>
            {sub && <span>{sub}</span>}
          </div>
        </Html>
      )}
    </group>
  );
}

class Boundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function Gltf({ url, size, position }: { url: string; size: THREE.Vector3; position: THREE.Vector3 }) {
  const { scene } = useGLTF(url);
  const obj = useMemo(() => {
    const c = scene.clone(true);
    const box = new THREE.Box3().setFromObject(c);
    const s = box.getSize(new THREE.Vector3());
    const k = Math.min(size.x / (s.x || 1), size.y / (s.y || 1), size.z / (s.z || 1));
    c.scale.setScalar(k);
    const center = new THREE.Box3().setFromObject(c).getCenter(new THREE.Vector3());
    c.position.sub(center);
    return c;
  }, [scene, size]);
  return <primitive object={obj} position={position} />;
}

/** Loads part.model_url if present (cached by useGLTF), otherwise renders the procedural fallback. */
export function PartModel({ part, size, position, fallback }: { part?: Part; size: THREE.Vector3; position: THREE.Vector3; fallback: ReactNode }) {
  if (!part?.model_url) return <>{fallback}</>;
  return (
    <Boundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <Gltf url={part.model_url} size={size} position={position} />
      </Suspense>
    </Boundary>
  );
}

function Fan({ size = 1.2, rgb, seg = 32, spin = true }: { size?: number; rgb: THREE.Material; seg?: number; spin?: boolean }) {
  const blades = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (spin && blades.current) blades.current.rotation.z += dt * 9;
  });
  const frame = useMemo(() => mat('#14181f', { roughness: 0.8 }), []);
  const blade = useMemo(() => mat('#20262f', { roughness: 0.6, transparent: true, opacity: 0.92 }), []);
  return (
    <group>
      <mesh material={frame}>
        <boxGeometry args={[size, size, 0.25]} />
      </mesh>
      <mesh position={[0, 0, 0.13]} material={rgb}>
        <torusGeometry args={[size * 0.43, 0.025, 8, seg]} />
      </mesh>
      <group ref={blades} position={[0, 0, 0.14]}>
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh key={i} rotation={[0.35, 0, (i / 7) * Math.PI * 2]} position={[Math.cos((i / 7) * Math.PI * 2) * size * 0.2, Math.sin((i / 7) * Math.PI * 2) * size * 0.2, 0]} material={blade}>
            <boxGeometry args={[size * 0.34, size * 0.12, 0.015]} />
          </mesh>
        ))}
        <mesh rotation={[Math.PI / 2, 0, 0]} material={frame}>
          <cylinderGeometry args={[size * 0.12, size * 0.12, 0.05, seg]} />
        </mesh>
      </group>
    </group>
  );
}

export function Motherboard({ dims, part, ff }: { dims: CaseDims; part?: Part; ff?: string }) {
  const L = layout(dims, ff);
  const pcb = useMemo(() => mat('#1b222c', { roughness: 0.7, metalness: 0.2 }), []);
  const heat = useMemo(() => mat('#4a5563', { metalness: 0.8, roughness: 0.35 }), []);
  const slot = useMemo(() => mat('#0e1116', { roughness: 0.6 }), []);
  const pos = new THREE.Vector3(L.x0 + L.board.w / 2, L.top - L.board.h / 2, L.boardZ - 0.02);
  const fallback = (
    <group position={pos}>
      <mesh material={pcb}>
        <boxGeometry args={[L.board.w, L.board.h, 0.04]} />
      </mesh>
      {/* VRM heatsinks */}
      <mesh position={[-L.board.w / 2 + 0.35, L.board.h / 2 - 0.55, 0.1]} material={heat}>
        <boxGeometry args={[0.28, 0.85, 0.2]} />
      </mesh>
      <mesh position={[-L.board.w / 2 + 0.95, L.board.h / 2 - 0.18, 0.1]} material={heat}>
        <boxGeometry args={[1.0, 0.24, 0.2]} />
      </mesh>
      {/* Chipset */}
      <mesh position={[L.board.w / 2 - 0.55, -L.board.h / 2 + 0.6, 0.06]} material={heat}>
        <boxGeometry args={[0.5, 0.5, 0.1]} />
      </mesh>
      {/* RAM slots */}
      {Array.from({ length: L.board.h > 2 ? 4 : 2 }).map((_, i) => (
        <mesh key={i} position={[L.ramX - pos.x + i * 0.11, L.cpu.y - pos.y - 0.05, 0.05]} material={slot}>
          <boxGeometry args={[0.06, 1.36, 0.07]} />
        </mesh>
      ))}
      {/* PCIe x16 */}
      <mesh position={[-L.board.w / 2 + 1.0, L.pcieY - pos.y, 0.05]} material={slot}>
        <boxGeometry args={[0.9, 0.07, 0.08]} />
      </mesh>
    </group>
  );
  return (
    <PartModel part={part} size={new THREE.Vector3(L.board.w, L.board.h, 0.4)} position={pos} fallback={fallback} />
  );
}

export function CPU({ dims, ff, part }: { dims: CaseDims; ff?: string; part?: Part }) {
  const L = layout(dims, ff);
  const ihs = useMemo(() => mat('#b9c0c9', { metalness: 0.95, roughness: 0.25 }), []);
  const fallback = (
    <mesh position={[L.cpu.x, L.cpu.y, L.boardZ + 0.05]} material={ihs}>
      <boxGeometry args={[0.45, 0.4, 0.05]} />
    </mesh>
  );
  return <PartModel part={part} size={new THREE.Vector3(0.45, 0.4, 0.08)} position={new THREE.Vector3(L.cpu.x, L.cpu.y, L.boardZ + 0.05)} fallback={fallback} />;
}

export function RAM({ dims, ff, part, rgbMat }: { dims: CaseDims; ff?: string; part: Part; rgbMat: THREE.Material }) {
  const L = layout(dims, ff);
  const n = Math.min(+part.specs.modules || 2, L.board.h > 2 ? 4 : 2);
  const h = (+part.specs.height_mm || 32) / 100;
  const body = useMemo(() => mat(part.specs.rgb ? '#c8ced6' : '#232a33', { metalness: 0.7, roughness: 0.35 }), [part.specs.rgb]);
  const slotsUsed = n === 2 && L.board.h > 2 ? [1, 3] : Array.from({ length: n }, (_, i) => i);
  return (
    <group>
      {slotsUsed.map((i) => (
        <group key={i} position={[L.ramX + i * 0.11, L.cpu.y - 0.05, L.boardZ + 0.06 + h / 2]}>
          <mesh material={body}>
            <boxGeometry args={[0.04, 1.33, h]} />
          </mesh>
          {part.specs.rgb && (
            <mesh position={[0, 0, h / 2 + 0.02]} material={rgbMat}>
              <boxGeometry args={[0.045, 1.25, 0.05]} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

export function M2({ dims, ff, index }: { dims: CaseDims; ff?: string; index: number }) {
  const L = layout(dims, ff);
  const m = useMemo(() => mat('#2b3540', { metalness: 0.6 }), []);
  return (
    <mesh position={[L.m2.x + 0.1, L.m2.y - index * 0.42, L.boardZ + 0.05]} material={m}>
      <boxGeometry args={[0.8, 0.22, 0.03]} />
    </mesh>
  );
}

export function Drive({ dims, part, index }: { dims: CaseDims; part: Part; index: number }) {
  const is35 = part.specs.form_factor === '3.5"';
  const m = useMemo(() => mat(is35 ? '#3b4450' : '#1f2630', { metalness: 0.7, roughness: 0.4 }), [is35]);
  const size: [number, number, number] = is35 ? [1.47, 0.26, 1.02] : [1.0, 0.07, 0.7];
  return (
    <mesh position={[dims.D / 2 - 0.5 - size[0] / 2, -dims.H / 2 + 0.2 + size[1] / 2 + index * 0.32, 0]} material={m}>
      <boxGeometry args={size} />
    </mesh>
  );
}

export function GPU({ dims, ff, part, rgbMat, lowPoly }: { dims: CaseDims; ff?: string; part: Part; rgbMat: THREE.Material; lowPoly?: boolean }) {
  const L = layout(dims, ff);
  const len = (+part.specs.length_mm || 240) / 100;
  const thick = Math.max(0.36, (+part.specs.slots || 2) * 0.2);
  const shroud = useMemo(() => mat(part.specs.maker === 'AMD' ? '#2a2d33' : '#1c1f24', { metalness: 0.75, roughness: 0.3 }), [part.specs.maker]);
  const back = useMemo(() => mat('#0f1215', { metalness: 0.9, roughness: 0.25 }), []);
  const fans = +part.specs.fans || 2;
  const pos = new THREE.Vector3(L.x0 + 0.05 + len / 2, L.pcieY - 0.62, L.boardZ + 0.12 + thick / 2);
  const fallback = (
    <group position={pos}>
      <RoundedBox args={[len, 1.2, thick]} radius={0.05} smoothness={lowPoly ? 2 : 4} material={shroud} />
      <mesh position={[0, 0, -thick / 2 - 0.01]} material={back}>
        <boxGeometry args={[len, 1.15, 0.02]} />
      </mesh>
      {/* RGB edge strip, visible through the side glass */}
      <mesh position={[0.1, 0.6, thick / 2 - 0.06]} material={rgbMat}>
        <boxGeometry args={[len * 0.55, 0.03, 0.03]} />
      </mesh>
      {/* Fans on the underside */}
      {Array.from({ length: fans }).map((_, i) => (
        <group key={i} position={[-len / 2 + (len / fans) * (i + 0.5), -0.61, 0]} rotation={[Math.PI / 2, 0, 0]} scale={Math.min(0.85, (len / fans) * 0.85)}>
          <Fan size={1} rgb={rgbMat} seg={lowPoly ? 16 : 32} />
        </group>
      ))}
    </group>
  );
  return <PartModel part={part} size={new THREE.Vector3(len, 1.2, thick)} position={pos} fallback={fallback} />;
}

export function PSU({ dims, part }: { dims: CaseDims; part: Part }) {
  const sfx = part.specs.form_factor === 'SFX';
  const size: [number, number, number] = sfx ? [1.0, 0.64, 1.25] : [1.5, 0.86, 1.5];
  const body = useMemo(() => mat('#15191f', { metalness: 0.6, roughness: 0.45 }), []);
  const label = useMemo(() => mat('#2c3440', { metalness: 0.3 }), []);
  const pos = new THREE.Vector3(-dims.D / 2 + 0.12 + size[0] / 2, -dims.H / 2 + 0.12 + size[1] / 2, -dims.W / 2 + 0.2 + size[2] / 2);
  const fallback = (
    <group position={pos}>
      <mesh material={body}>
        <boxGeometry args={size} />
      </mesh>
      <mesh position={[0, 0, size[2] / 2 + 0.005]} material={label}>
        <planeGeometry args={[size[0] * 0.7, size[1] * 0.5]} />
      </mesh>
    </group>
  );
  return <PartModel part={part} size={new THREE.Vector3(...size)} position={pos} fallback={fallback} />;
}

export function Cooler({ dims, ff, part, rgbMat, lowPoly }: { dims: CaseDims; ff?: string; part: Part; rgbMat: THREE.Material; lowPoly?: boolean }) {
  const L = layout(dims, ff);
  const fin = useMemo(() => mat('#9aa3ad', { metalness: 0.9, roughness: 0.3 }), []);
  const dark = useMemo(() => mat('#14181f', { metalness: 0.5 }), []);
  if (part.specs.kind === 'AIO') {
    const rad = (+part.specs.radiator_mm || 240) / 100;
    const n = Math.max(1, Math.round(rad / 1.2));
    const fanSize = rad / n;
    const radPos = new THREE.Vector3(Math.min(dims.D / 2 - rad / 2 - 0.35, L.cpu.x + 0.4), dims.H / 2 - 0.2, 0);
    const pump = new THREE.Vector3(L.cpu.x, L.cpu.y, L.boardZ + 0.24);
    const tube = (dz: number) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(pump.x + 0.2, pump.y + 0.1, pump.z + dz),
        new THREE.Vector3(pump.x + 0.6, pump.y + 0.6, pump.z + 0.3 + dz),
        new THREE.Vector3(radPos.x - rad / 2 + 0.2, radPos.y - 0.3, 0.3 + dz),
        new THREE.Vector3(radPos.x - rad / 2 + 0.1, radPos.y, 0.3 + dz),
      ]);
      return new THREE.TubeGeometry(curve, lowPoly ? 16 : 40, 0.05, 8, false);
    };
    return (
      <group>
        <mesh position={pump} rotation={[Math.PI / 2, 0, 0]} material={dark}>
          <cylinderGeometry args={[0.32, 0.32, 0.36, lowPoly ? 16 : 40]} />
        </mesh>
        <mesh position={[pump.x, pump.y, pump.z + 0.19]} material={rgbMat}>
          <torusGeometry args={[0.27, 0.025, 8, lowPoly ? 16 : 40]} />
        </mesh>
        <mesh geometry={tube(-0.08)} material={dark} />
        <mesh geometry={tube(0.08)} material={dark} />
        <group position={radPos}>
          <mesh material={dark}>
            <boxGeometry args={[rad + 0.3, 0.27, 1.22]} />
          </mesh>
          {Array.from({ length: n }).map((_, i) => (
            <group key={i} position={[-rad / 2 + fanSize * (i + 0.5), -0.27, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <Fan size={fanSize * 0.98} rgb={rgbMat} seg={lowPoly ? 16 : 32} />
            </group>
          ))}
        </group>
      </group>
    );
  }
  const h = (+part.specs.height_mm || 155) / 100;
  const pos = new THREE.Vector3(L.cpu.x, L.cpu.y, L.boardZ + 0.08 + h / 2);
  const fallback = (
    <group position={pos}>
      {Array.from({ length: lowPoly ? 8 : 18 }).map((_, i, a) => (
        <mesh key={i} position={[-0.25 + (0.5 / a.length) * i, 0, 0]} material={fin}>
          <boxGeometry args={[0.012, 1.25, h - 0.05]} />
        </mesh>
      ))}
      <group position={[0.38, 0, 0.02]} rotation={[0, Math.PI / 2, 0]}>
        <Fan size={1.2} rgb={rgbMat} seg={lowPoly ? 16 : 32} />
      </group>
    </group>
  );
  return <PartModel part={part} size={new THREE.Vector3(0.9, 1.25, h)} position={pos} fallback={fallback} />;
}

export function CaseShell({
  dims, color, showSide, showFront, frontFans, rgbMat, lowPoly, part,
}: { dims: CaseDims; color: string; showSide: boolean; showFront: boolean; frontFans: number; rgbMat: THREE.Material; lowPoly?: boolean; part?: Part }) {
  const { D, H, W } = dims;
  const c = color === 'white' ? '#e8ecf1' : color === 'blue' ? '#0e2c52' : '#16191e';
  const panel = useMemo(() => mat(c, { metalness: 0.5, roughness: 0.45 }), [c]);
  const inner = useMemo(() => mat(color === 'white' ? '#dfe4ea' : color === 'blue' ? '#16365e' : '#232a35', { roughness: 0.85, metalness: 0.15, side: THREE.DoubleSide }), [color]);
  const glass = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: '#9fc4ff', transparent: true, opacity: 0.12, roughness: 0.05, metalness: 0, clearcoat: 1, depthWrite: false }),
    [],
  );
  const mesh = useMemo(() => {
    // Perforated front panel texture drawn once on a canvas.
    const cv = document.createElement('canvas');
    cv.width = cv.height = 64;
    const g = cv.getContext('2d')!;
    g.fillStyle = '#fff';
    g.fillRect(0, 0, 64, 64);
    g.fillStyle = '#000';
    for (let y = 4; y < 64; y += 10) for (let x = (y / 10) % 2 ? 9 : 4; x < 64; x += 10) {
      g.beginPath();
      g.arc(x, y, 3.2, 0, Math.PI * 2);
      g.fill();
    }
    const t = new THREE.CanvasTexture(cv);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(W * 6, H * 6);
    return new THREE.MeshStandardMaterial({ color: c, alphaMap: t, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide, metalness: 0.4, roughness: 0.5 });
  }, [c, W, H]);
  const t = 0.04;
  const fans = Math.max(0, frontFans);
  const fanSize = Math.min(1.2, (H - 1.2) / Math.max(fans, 1) - 0.08);
  const shell = (
    <group>
      {/* back (motherboard tray), top, bottom, rear */}
      <mesh position={[0, 0, -W / 2]} material={inner}>
        <boxGeometry args={[D, H, t]} />
      </mesh>
      <mesh position={[0, H / 2, 0]} material={panel}>
        <boxGeometry args={[D, t, W]} />
      </mesh>
      <mesh position={[0, -H / 2, 0]} material={panel}>
        <boxGeometry args={[D, t, W]} />
      </mesh>
      <mesh position={[-D / 2, 0, 0]} material={inner}>
        <boxGeometry args={[t, H, W]} />
      </mesh>
      {/* frame rails along the glass side */}
      {[H / 2 - 0.03, -H / 2 + 0.03].map((y) => (
        <mesh key={y} position={[0, y, W / 2]} material={panel}>
          <boxGeometry args={[D, 0.06, 0.06]} />
        </mesh>
      ))}
      {[D / 2 - 0.03, -D / 2 + 0.03].map((x) => (
        <mesh key={x} position={[x, 0, W / 2]} material={panel}>
          <boxGeometry args={[0.06, H, 0.06]} />
        </mesh>
      ))}
      {/* feet */}
      {[-1, 1].flatMap((sx) => [-1, 1].map((sz) => (
        <mesh key={`${sx}${sz}`} position={[sx * (D / 2 - 0.4), -H / 2 - 0.08, sz * (W / 2 - 0.3)]} material={inner}>
          <cylinderGeometry args={[0.12, 0.14, 0.12, lowPoly ? 8 : 20]} />
        </mesh>
      )))}
      {showSide && (
        <mesh position={[0, 0, W / 2 + 0.01]} material={glass} renderOrder={10}>
          <planeGeometry args={[D - 0.08, H - 0.08]} />
        </mesh>
      )}
      {showFront && (
        <mesh position={[D / 2 + 0.01, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={mesh}>
          <planeGeometry args={[W, H]} />
        </mesh>
      )}
      {/* Front intake fans */}
      {Array.from({ length: fans }).map((_, i) => (
        <group key={i} position={[D / 2 - 0.2, H / 2 - 0.75 - i * (fanSize + 0.08), 0]} rotation={[0, -Math.PI / 2, 0]}>
          <Fan size={fanSize} rgb={rgbMat} seg={lowPoly ? 16 : 32} />
        </group>
      ))}
      {/* Rear exhaust */}
      <group position={[-D / 2 + 0.17, H / 2 - 0.95, 0]} rotation={[0, Math.PI / 2, 0]}>
        <Fan size={1.0} rgb={rgbMat} seg={lowPoly ? 16 : 32} />
      </group>
    </group>
  );
  if (part?.model_url) {
    return <PartModel part={part} size={new THREE.Vector3(D, H, W)} position={new THREE.Vector3(0, 0, 0)} fallback={shell} />;
  }
  return shell;
}
