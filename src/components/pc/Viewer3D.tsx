// 3D viewer for the PC builder. Loaded lazily (React.lazy) so three.js only downloads
// once the configurator is on screen, and never on any other page.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { CameraControls, ContactShadows, Environment, Lightformer, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import type { Resolved } from '@/lib/pc/engine';
import { CPU, CaseShell, Cooler, Drive, GPU, Inspectable, M2, Motherboard, PSU, RAM, caseDims, layout } from './Parts3D';

type View = 'reset' | 'front' | 'side' | 'top' | 'inside';
type Light = 'studio' | 'night' | 'daylight';

const LIGHTS: Record<Light, { bg: string; ambient: number; key: number; env: number }> = {
  studio: { bg: '#0d1826', ambient: 1.0, key: 2.2, env: 1.3 },
  night: { bg: '#05080d', ambient: 0.18, key: 0.45, env: 0.35 },
  daylight: { bg: '#cfd8e3', ambient: 0.9, key: 2.0, env: 1.2 },
};

function Scene({
  r, side, front, rgb, light, color, view, lowPoly, onReady,
}: { r: Resolved; side: boolean; front: boolean; rgb: boolean; light: Light; color: string; view: { v: View; n: number }; lowPoly: boolean; onReady: () => void }) {
  const controls = useRef<CameraControls>(null);
  const dims = caseDims(r.case?.specs.max_board ?? r.motherboard?.specs.form_factor);
  const ff = r.motherboard?.specs.form_factor;
  const L = layout(dims, ff);
  // The case sits on the floor plane; OY converts part-local positions to world space.
  const OY = dims.H / 2 + 0.14 - 2.2;
  const rgbMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#111', emissive: '#3aa0ff', emissiveIntensity: 2.2, toneMapped: false }), []);

  useFrame(({ clock }) => {
    if (rgb) rgbMat.emissive.setHSL((clock.elapsedTime * 0.08) % 1, 0.95, 0.55);
    else rgbMat.emissive.set('#1d2733');
  });

  const focus = (p: THREE.Vector3) => controls.current?.setLookAt(p.x + 1.4, p.y + OY + 0.6, dims.W / 2 + 2.6, p.x, p.y + OY, p.z, true);

  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const { D, H, W } = dims;
    const presets: Record<View, [number, number, number, number, number, number]> = {
      reset: [D * 1.35, H * 0.55, W + 8.4, 0, -0.1, 0],
      front: [D / 2 + 7, 0.3, 0.01, 0, 0, 0],
      side: [0, 0.2, W / 2 + 7.5, 0, 0, 0],
      top: [0.01, H / 2 + 8, 0.01, 0, 0, 0],
      inside: [L.cpu.x + 2.2, L.cpu.y + OY + 0.5, W / 2 + 3.4, L.cpu.x + 0.3, L.cpu.y + OY - 0.9, L.boardZ],
    };
    c.setLookAt(...presets[view.v], view.n > 0);
  }, [view, dims.D, dims.H, dims.W]);

  useEffect(() => onReady(), []);
  const lt = LIGHTS[light];
  const ramPart = r.ram;
  const frontFans = Math.max(0, (+r.case?.specs.fans_included || 2) - 1) + r.extra.filter((e) => e.specs.kind === 'fans').reduce((a, e) => a + (+e.specs.fans_count || 0), 0);
  const nvme = r.storage.filter((s) => s.specs.form_factor === 'M.2');
  const bays = r.storage.filter((s) => s.specs.form_factor !== 'M.2');

  return (
    <>
      <color attach="background" args={[lt.bg]} />
      <ambientLight intensity={lt.ambient} />
      <directionalLight position={[4, 7, 6]} intensity={lt.key} castShadow={!lowPoly} />
      {/* Interior lights so parts read clearly through the glass */}
      <pointLight position={[0, 0.8, 0.4]} intensity={light === 'night' ? 6 : 4} distance={5} color={light === 'night' ? '#6db6ff' : '#ffffff'} />
      <pointLight position={[0.8, -1.2, 0.6]} intensity={light === 'night' ? 3 : 2} distance={4} color="#9ec9ff" />
      <Environment resolution={lowPoly ? 64 : 256} environmentIntensity={lt.env}>
        <Lightformer form="rect" intensity={3} position={[0, 5, 2]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[-5, 1, 3]} rotation-y={Math.PI / 3} scale={[4, 6, 1]} />
        <Lightformer form="ring" intensity={2} color="#4ea3ff" position={[5, 1, -2]} scale={2} />
      </Environment>
      <CameraControls ref={controls} minDistance={1.6} maxDistance={16} smoothTime={0.35} />

      <group position={[0, OY, 0]}>
        <CaseShell key={`case-${r.case?.id}`} dims={dims} color={color} showSide={side} showFront={front} frontFans={r.case ? frontFans : 0} rgbMat={rgbMat} lowPoly={lowPoly} part={r.case} />

        {r.motherboard && (
          <Inspectable key={`mb-${r.motherboard.id}`} label={r.motherboard.name} sub={`${r.motherboard.specs.form_factor} · ${r.motherboard.specs.chipset}`} onFocus={focus} focusPoint={L.cpu.clone().add(new THREE.Vector3(0, -0.6, 0.2))}>
            <Motherboard dims={dims} part={r.motherboard} ff={ff} />
          </Inspectable>
        )}
        {r.cpu && (
          <Inspectable key={`cpu-${r.cpu.id}`} label={r.cpu.name} sub={`${r.cpu.specs.cores} cores · ${r.cpu.specs.socket}`} onFocus={focus} focusPoint={L.cpu.clone().add(new THREE.Vector3(0, 0, 0.2))}>
            <CPU dims={dims} ff={ff} part={r.cpu} />
          </Inspectable>
        )}
        {ramPart && (
          <Inspectable key={`ram-${ramPart.id}`} label={ramPart.name} sub={`${ramPart.specs.capacity_gb} GB ${ramPart.specs.type}`} onFocus={focus} focusPoint={new THREE.Vector3(L.ramX + 0.15, L.cpu.y + 0.3, L.boardZ + 0.5)}>
            <RAM dims={dims} ff={ff} part={ramPart} rgbMat={rgbMat} />
          </Inspectable>
        )}
        {r.cooler && (
          <Inspectable key={`cool-${r.cooler.id}`} label={r.cooler.name} sub={r.cooler.specs.kind === 'AIO' ? `${r.cooler.specs.radiator_mm} mm radiator` : `${r.cooler.specs.height_mm} mm tall`} onFocus={focus} focusPoint={L.cpu.clone().add(new THREE.Vector3(0, 0.7, 0.9))}>
            <Cooler dims={dims} ff={ff} part={r.cooler} rgbMat={rgbMat} lowPoly={lowPoly} />
          </Inspectable>
        )}
        {r.gpu && (
          <Inspectable key={`gpu-${r.gpu.id}`} label={r.gpu.name} sub={`${r.gpu.specs.length_mm} mm · ${r.gpu.specs.power_w} W`} onFocus={focus} focusPoint={new THREE.Vector3(L.x0 + 1.2, L.pcieY - 0.2, 0.2)}>
            <GPU dims={dims} ff={ff} part={r.gpu} rgbMat={rgbMat} lowPoly={lowPoly} />
          </Inspectable>
        )}
        {r.psu && (
          <Inspectable key={`psu-${r.psu.id}`} label={r.psu.name} sub={`${r.psu.specs.watts} W · ${r.psu.specs.efficiency}`} onFocus={focus} focusPoint={new THREE.Vector3(-dims.D / 2 + 0.9, -dims.H / 2 + 0.9, 0.3)}>
            <PSU dims={dims} part={r.psu} />
          </Inspectable>
        )}
        {nvme.map((s, i) => (
          <Inspectable key={`m2-${s.id}-${i}`} label={s.name} sub={`${s.specs.kind} · ${s.specs.read_mbps} MB/s`} onFocus={focus} focusPoint={new THREE.Vector3(L.m2.x, L.m2.y - i * 0.42 + 0.2, L.boardZ + 0.3)}>
            <M2 dims={dims} ff={ff} index={i} />
          </Inspectable>
        ))}
        {bays.map((s, i) => (
          <Inspectable key={`bay-${s.id}-${i}`} label={s.name} sub={s.specs.kind} onFocus={focus} focusPoint={new THREE.Vector3(dims.D / 2 - 1.2, -dims.H / 2 + 0.6 + i * 0.32, 0.4)}>
            <Drive dims={dims} part={s} index={i} />
          </Inspectable>
        ))}
      </group>

      <ContactShadows position={[0, -2.21, 0]} opacity={light === 'daylight' ? 0.35 : 0.6} scale={14} blur={2.6} far={4} resolution={lowPoly ? 256 : 512} />
    </>
  );
}

function Progress() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <div className="pc-loading" role="status">
      Loading 3D models… {Math.round(progress)}%
    </div>
  );
}

export default function Viewer3D({ r }: { r: Resolved }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [side, setSide] = useState(true);
  const [front, setFront] = useState(true);
  const [rgb, setRgb] = useState(true);
  const [light, setLight] = useState<Light>('studio');
  const [color, setColor] = useState<string>(r.case?.specs.color ?? 'black');
  const [view, setView] = useState<{ v: View; n: number }>({ v: 'reset', n: 0 });
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const lowPoly = typeof window !== 'undefined' && (window.innerWidth < 768 || (navigator as any).hardwareConcurrency <= 4);
  const reduced = typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => setColor(r.case?.specs.color ?? 'black'), [r.case?.id]);
  // Stop rendering when the viewer is scrolled out of sight.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);
  const go = (v: View) => setView((s) => ({ v, n: s.n + 1 }));

  return (
    <div className="pc-viewer" ref={wrap}>
      <Canvas
        shadows={!lowPoly}
        dpr={lowPoly ? [1, 1.5] : [1, 2]}
        frameloop={visible && !reduced ? 'always' : 'demand'}
        camera={{ position: [6.2, 2.7, 10.7], fov: 38 }}
        gl={{ antialias: !lowPoly, powerPreference: 'high-performance' }}
        aria-label="Interactive 3D preview of your PC build"
      >
        <Scene r={r} side={side} front={front} rgb={rgb && !reduced} light={light} color={color} view={view} lowPoly={lowPoly} onReady={() => setReady(true)} />
      </Canvas>
      {!ready && <div className="pc-loading">Preparing 3D view…</div>}
      <Progress />

      <div className="pc-views" role="toolbar" aria-label="Camera">
        {(['reset', 'front', 'side', 'top', 'inside'] as View[]).map((v) => (
          <button key={v} type="button" onClick={() => go(v)} className={view.v === v ? 'on' : ''}>
            {v === 'reset' ? 'Reset view' : v[0].toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      <div className="pc-toggles" role="toolbar" aria-label="Display">
        <label><input type="checkbox" checked={side} onChange={(e) => setSide(e.target.checked)} /> Side panel</label>
        <label><input type="checkbox" checked={front} onChange={(e) => setFront(e.target.checked)} /> Front panel</label>
        <label><input type="checkbox" checked={rgb} onChange={(e) => setRgb(e.target.checked)} /> RGB</label>
        <select value={light} onChange={(e) => setLight(e.target.value as Light)} aria-label="Lighting">
          <option value="studio">Studio light</option>
          <option value="night">Night (RGB)</option>
          <option value="daylight">Daylight</option>
        </select>
        <span className="swatches" aria-label="Cabinet colour">
          {[['black', '#16191e'], ['white', '#e8ecf1'], ['blue', '#0e2c52']].map(([k, c]) => (
            <button key={k} type="button" aria-label={`${k} cabinet`} aria-pressed={color === k} style={{ background: c }} onClick={() => setColor(k)} />
          ))}
        </span>
      </div>
      <p className="pc-hint">Drag to rotate · scroll or pinch to zoom · right-drag to pan · click a part to inspect</p>
    </div>
  );
}
