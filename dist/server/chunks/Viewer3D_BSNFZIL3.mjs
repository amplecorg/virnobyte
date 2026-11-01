import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { Canvas, useFrame } from "@react-three/fiber";
import { CameraControls, ContactShadows, Environment, Html, Lightformer, RoundedBox, useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";
//#region src/components/pc/Parts3D.tsx
function caseDims(board) {
	if (board === "ITX") return {
		D: 3.7,
		H: 3.4,
		W: 2,
		board: {
			w: 1.7,
			h: 1.7
		}
	};
	if (board === "mATX") return {
		D: 4,
		H: 4.25,
		W: 2.1,
		board: {
			w: 2.44,
			h: 2.44
		}
	};
	return {
		D: 4.6,
		H: 4.9,
		W: 2.3,
		board: {
			w: 2.44,
			h: 3.05
		}
	};
}
/** Anchor points derived from the case and board size. */
function layout(dims, mbFormFactor) {
	const b = mbFormFactor ? caseDims(mbFormFactor).board : dims.board;
	const boardZ = -dims.W / 2 + .22;
	const x0 = -dims.D / 2 + .28;
	const top = dims.H / 2 - .32;
	const cpu = new THREE.Vector3(x0 + b.w * .42, top - .78, boardZ);
	return {
		board: b,
		boardZ,
		x0,
		top,
		cpu,
		ramX: cpu.x + .62,
		m2: new THREE.Vector3(cpu.x, cpu.y - 1.05, boardZ),
		pcieY: top - (b.h > 2.6 ? 1.6 : 1.45)
	};
}
var mat = (color, opts = {}) => new THREE.MeshStandardMaterial({
	color,
	roughness: .55,
	metalness: .35,
	...opts
});
/** Wraps a part: drop-in animation on swap, hover label, click to focus. */
function Inspectable({ label, sub, children, onFocus, focusPoint }) {
	const ref = useRef(null);
	const [hover, setHover] = useState(false);
	useFrame((_, dt) => {
		const g = ref.current;
		if (!g) return;
		g.position.y = THREE.MathUtils.damp(g.position.y, hover ? .03 : 0, 8, dt);
	});
	return /* @__PURE__ */ jsxs("group", {
		ref,
		position: [
			0,
			.9,
			0
		],
		onPointerOver: (e) => {
			e.stopPropagation();
			setHover(true);
			document.body.style.cursor = "pointer";
		},
		onPointerOut: () => {
			setHover(false);
			document.body.style.cursor = "";
		},
		onClick: (e) => {
			e.stopPropagation();
			onFocus?.(focusPoint);
		},
		children: [children, hover && /* @__PURE__ */ jsx(Html, {
			position: focusPoint.toArray(),
			center: true,
			distanceFactor: 9,
			zIndexRange: [20, 0],
			style: { pointerEvents: "none" },
			children: /* @__PURE__ */ jsxs("div", {
				className: "pc-tip",
				children: [/* @__PURE__ */ jsx("strong", { children: label }), sub && /* @__PURE__ */ jsx("span", { children: sub })]
			})
		})]
	});
}
var Boundary = class extends Component {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	render() {
		return this.state.failed ? this.props.fallback : this.props.children;
	}
};
function Gltf({ url, size, position }) {
	const { scene } = useGLTF(url);
	const obj = useMemo(() => {
		const c = scene.clone(true);
		const s = new THREE.Box3().setFromObject(c).getSize(new THREE.Vector3());
		const k = Math.min(size.x / (s.x || 1), size.y / (s.y || 1), size.z / (s.z || 1));
		c.scale.setScalar(k);
		const center = new THREE.Box3().setFromObject(c).getCenter(new THREE.Vector3());
		c.position.sub(center);
		return c;
	}, [scene, size]);
	return /* @__PURE__ */ jsx("primitive", {
		object: obj,
		position
	});
}
/** Loads part.model_url if present (cached by useGLTF), otherwise renders the procedural fallback. */
function PartModel({ part, size, position, fallback }) {
	if (!part?.model_url) return /* @__PURE__ */ jsx(Fragment$1, { children: fallback });
	return /* @__PURE__ */ jsx(Boundary, {
		fallback,
		children: /* @__PURE__ */ jsx(Suspense, {
			fallback,
			children: /* @__PURE__ */ jsx(Gltf, {
				url: part.model_url,
				size,
				position
			})
		})
	});
}
function Fan({ size = 1.2, rgb, seg = 32, spin = true }) {
	const blades = useRef(null);
	useFrame((_, dt) => {
		if (spin && blades.current) blades.current.rotation.z += dt * 9;
	});
	const frame = useMemo(() => mat("#14181f", { roughness: .8 }), []);
	const blade = useMemo(() => mat("#20262f", {
		roughness: .6,
		transparent: true,
		opacity: .92
	}), []);
	return /* @__PURE__ */ jsxs("group", { children: [
		/* @__PURE__ */ jsx("mesh", {
			material: frame,
			children: /* @__PURE__ */ jsx("boxGeometry", { args: [
				size,
				size,
				.25
			] })
		}),
		/* @__PURE__ */ jsx("mesh", {
			position: [
				0,
				0,
				.13
			],
			material: rgb,
			children: /* @__PURE__ */ jsx("torusGeometry", { args: [
				size * .43,
				.025,
				8,
				seg
			] })
		}),
		/* @__PURE__ */ jsxs("group", {
			ref: blades,
			position: [
				0,
				0,
				.14
			],
			children: [Array.from({ length: 7 }).map((_, i) => /* @__PURE__ */ jsx("mesh", {
				rotation: [
					.35,
					0,
					i / 7 * Math.PI * 2
				],
				position: [
					Math.cos(i / 7 * Math.PI * 2) * size * .2,
					Math.sin(i / 7 * Math.PI * 2) * size * .2,
					0
				],
				material: blade,
				children: /* @__PURE__ */ jsx("boxGeometry", { args: [
					size * .34,
					size * .12,
					.015
				] })
			}, i)), /* @__PURE__ */ jsx("mesh", {
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				material: frame,
				children: /* @__PURE__ */ jsx("cylinderGeometry", { args: [
					size * .12,
					size * .12,
					.05,
					seg
				] })
			})]
		})
	] });
}
function Motherboard({ dims, part, ff }) {
	const L = layout(dims, ff);
	const pcb = useMemo(() => mat("#1b222c", {
		roughness: .7,
		metalness: .2
	}), []);
	const heat = useMemo(() => mat("#4a5563", {
		metalness: .8,
		roughness: .35
	}), []);
	const slot = useMemo(() => mat("#0e1116", { roughness: .6 }), []);
	const pos = new THREE.Vector3(L.x0 + L.board.w / 2, L.top - L.board.h / 2, L.boardZ - .02);
	const fallback = /* @__PURE__ */ jsxs("group", {
		position: pos,
		children: [
			/* @__PURE__ */ jsx("mesh", {
				material: pcb,
				children: /* @__PURE__ */ jsx("boxGeometry", { args: [
					L.board.w,
					L.board.h,
					.04
				] })
			}),
			/* @__PURE__ */ jsx("mesh", {
				position: [
					-L.board.w / 2 + .35,
					L.board.h / 2 - .55,
					.1
				],
				material: heat,
				children: /* @__PURE__ */ jsx("boxGeometry", { args: [
					.28,
					.85,
					.2
				] })
			}),
			/* @__PURE__ */ jsx("mesh", {
				position: [
					-L.board.w / 2 + .95,
					L.board.h / 2 - .18,
					.1
				],
				material: heat,
				children: /* @__PURE__ */ jsx("boxGeometry", { args: [
					1,
					.24,
					.2
				] })
			}),
			/* @__PURE__ */ jsx("mesh", {
				position: [
					L.board.w / 2 - .55,
					-L.board.h / 2 + .6,
					.06
				],
				material: heat,
				children: /* @__PURE__ */ jsx("boxGeometry", { args: [
					.5,
					.5,
					.1
				] })
			}),
			Array.from({ length: L.board.h > 2 ? 4 : 2 }).map((_, i) => /* @__PURE__ */ jsx("mesh", {
				position: [
					L.ramX - pos.x + i * .11,
					L.cpu.y - pos.y - .05,
					.05
				],
				material: slot,
				children: /* @__PURE__ */ jsx("boxGeometry", { args: [
					.06,
					1.36,
					.07
				] })
			}, i)),
			/* @__PURE__ */ jsx("mesh", {
				position: [
					-L.board.w / 2 + 1,
					L.pcieY - pos.y,
					.05
				],
				material: slot,
				children: /* @__PURE__ */ jsx("boxGeometry", { args: [
					.9,
					.07,
					.08
				] })
			})
		]
	});
	return /* @__PURE__ */ jsx(PartModel, {
		part,
		size: new THREE.Vector3(L.board.w, L.board.h, .4),
		position: pos,
		fallback
	});
}
function CPU({ dims, ff, part }) {
	const L = layout(dims, ff);
	const ihs = useMemo(() => mat("#b9c0c9", {
		metalness: .95,
		roughness: .25
	}), []);
	const fallback = /* @__PURE__ */ jsx("mesh", {
		position: [
			L.cpu.x,
			L.cpu.y,
			L.boardZ + .05
		],
		material: ihs,
		children: /* @__PURE__ */ jsx("boxGeometry", { args: [
			.45,
			.4,
			.05
		] })
	});
	return /* @__PURE__ */ jsx(PartModel, {
		part,
		size: new THREE.Vector3(.45, .4, .08),
		position: new THREE.Vector3(L.cpu.x, L.cpu.y, L.boardZ + .05),
		fallback
	});
}
function RAM({ dims, ff, part, rgbMat }) {
	const L = layout(dims, ff);
	const n = Math.min(+part.specs.modules || 2, L.board.h > 2 ? 4 : 2);
	const h = (+part.specs.height_mm || 32) / 100;
	const body = useMemo(() => mat(part.specs.rgb ? "#c8ced6" : "#232a33", {
		metalness: .7,
		roughness: .35
	}), [part.specs.rgb]);
	const slotsUsed = n === 2 && L.board.h > 2 ? [1, 3] : Array.from({ length: n }, (_, i) => i);
	return /* @__PURE__ */ jsx("group", { children: slotsUsed.map((i) => /* @__PURE__ */ jsxs("group", {
		position: [
			L.ramX + i * .11,
			L.cpu.y - .05,
			L.boardZ + .06 + h / 2
		],
		children: [/* @__PURE__ */ jsx("mesh", {
			material: body,
			children: /* @__PURE__ */ jsx("boxGeometry", { args: [
				.04,
				1.33,
				h
			] })
		}), part.specs.rgb && /* @__PURE__ */ jsx("mesh", {
			position: [
				0,
				0,
				h / 2 + .02
			],
			material: rgbMat,
			children: /* @__PURE__ */ jsx("boxGeometry", { args: [
				.045,
				1.25,
				.05
			] })
		})]
	}, i)) });
}
function M2({ dims, ff, index }) {
	const L = layout(dims, ff);
	const m = useMemo(() => mat("#2b3540", { metalness: .6 }), []);
	return /* @__PURE__ */ jsx("mesh", {
		position: [
			L.m2.x + .1,
			L.m2.y - index * .42,
			L.boardZ + .05
		],
		material: m,
		children: /* @__PURE__ */ jsx("boxGeometry", { args: [
			.8,
			.22,
			.03
		] })
	});
}
function Drive({ dims, part, index }) {
	const is35 = part.specs.form_factor === "3.5\"";
	const m = useMemo(() => mat(is35 ? "#3b4450" : "#1f2630", {
		metalness: .7,
		roughness: .4
	}), [is35]);
	const size = is35 ? [
		1.47,
		.26,
		1.02
	] : [
		1,
		.07,
		.7
	];
	return /* @__PURE__ */ jsx("mesh", {
		position: [
			dims.D / 2 - .5 - size[0] / 2,
			-dims.H / 2 + .2 + size[1] / 2 + index * .32,
			0
		],
		material: m,
		children: /* @__PURE__ */ jsx("boxGeometry", { args: size })
	});
}
function GPU({ dims, ff, part, rgbMat, lowPoly }) {
	const L = layout(dims, ff);
	const len = (+part.specs.length_mm || 240) / 100;
	const thick = Math.max(.36, (+part.specs.slots || 2) * .2);
	const shroud = useMemo(() => mat(part.specs.maker === "AMD" ? "#2a2d33" : "#1c1f24", {
		metalness: .75,
		roughness: .3
	}), [part.specs.maker]);
	const back = useMemo(() => mat("#0f1215", {
		metalness: .9,
		roughness: .25
	}), []);
	const fans = +part.specs.fans || 2;
	const pos = new THREE.Vector3(L.x0 + .05 + len / 2, L.pcieY - .62, L.boardZ + .12 + thick / 2);
	const fallback = /* @__PURE__ */ jsxs("group", {
		position: pos,
		children: [
			/* @__PURE__ */ jsx(RoundedBox, {
				args: [
					len,
					1.2,
					thick
				],
				radius: .05,
				smoothness: lowPoly ? 2 : 4,
				material: shroud
			}),
			/* @__PURE__ */ jsx("mesh", {
				position: [
					0,
					0,
					-thick / 2 - .01
				],
				material: back,
				children: /* @__PURE__ */ jsx("boxGeometry", { args: [
					len,
					1.15,
					.02
				] })
			}),
			/* @__PURE__ */ jsx("mesh", {
				position: [
					.1,
					.6,
					thick / 2 - .06
				],
				material: rgbMat,
				children: /* @__PURE__ */ jsx("boxGeometry", { args: [
					len * .55,
					.03,
					.03
				] })
			}),
			Array.from({ length: fans }).map((_, i) => /* @__PURE__ */ jsx("group", {
				position: [
					-len / 2 + len / fans * (i + .5),
					-.61,
					0
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				scale: Math.min(.85, len / fans * .85),
				children: /* @__PURE__ */ jsx(Fan, {
					size: 1,
					rgb: rgbMat,
					seg: lowPoly ? 16 : 32
				})
			}, i))
		]
	});
	return /* @__PURE__ */ jsx(PartModel, {
		part,
		size: new THREE.Vector3(len, 1.2, thick),
		position: pos,
		fallback
	});
}
function PSU({ dims, part }) {
	const size = part.specs.form_factor === "SFX" ? [
		1,
		.64,
		1.25
	] : [
		1.5,
		.86,
		1.5
	];
	const body = useMemo(() => mat("#15191f", {
		metalness: .6,
		roughness: .45
	}), []);
	const label = useMemo(() => mat("#2c3440", { metalness: .3 }), []);
	const pos = new THREE.Vector3(-dims.D / 2 + .12 + size[0] / 2, -dims.H / 2 + .12 + size[1] / 2, -dims.W / 2 + .2 + size[2] / 2);
	const fallback = /* @__PURE__ */ jsxs("group", {
		position: pos,
		children: [/* @__PURE__ */ jsx("mesh", {
			material: body,
			children: /* @__PURE__ */ jsx("boxGeometry", { args: size })
		}), /* @__PURE__ */ jsx("mesh", {
			position: [
				0,
				0,
				size[2] / 2 + .005
			],
			material: label,
			children: /* @__PURE__ */ jsx("planeGeometry", { args: [size[0] * .7, size[1] * .5] })
		})]
	});
	return /* @__PURE__ */ jsx(PartModel, {
		part,
		size: new THREE.Vector3(...size),
		position: pos,
		fallback
	});
}
function Cooler({ dims, ff, part, rgbMat, lowPoly }) {
	const L = layout(dims, ff);
	const fin = useMemo(() => mat("#9aa3ad", {
		metalness: .9,
		roughness: .3
	}), []);
	const dark = useMemo(() => mat("#14181f", { metalness: .5 }), []);
	if (part.specs.kind === "AIO") {
		const rad = (+part.specs.radiator_mm || 240) / 100;
		const n = Math.max(1, Math.round(rad / 1.2));
		const fanSize = rad / n;
		const radPos = new THREE.Vector3(Math.min(dims.D / 2 - rad / 2 - .35, L.cpu.x + .4), dims.H / 2 - .2, 0);
		const pump = new THREE.Vector3(L.cpu.x, L.cpu.y, L.boardZ + .24);
		const tube = (dz) => {
			const curve = new THREE.CatmullRomCurve3([
				new THREE.Vector3(pump.x + .2, pump.y + .1, pump.z + dz),
				new THREE.Vector3(pump.x + .6, pump.y + .6, pump.z + .3 + dz),
				new THREE.Vector3(radPos.x - rad / 2 + .2, radPos.y - .3, .3 + dz),
				new THREE.Vector3(radPos.x - rad / 2 + .1, radPos.y, .3 + dz)
			]);
			return new THREE.TubeGeometry(curve, lowPoly ? 16 : 40, .05, 8, false);
		};
		return /* @__PURE__ */ jsxs("group", { children: [
			/* @__PURE__ */ jsx("mesh", {
				position: pump,
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				material: dark,
				children: /* @__PURE__ */ jsx("cylinderGeometry", { args: [
					.32,
					.32,
					.36,
					lowPoly ? 16 : 40
				] })
			}),
			/* @__PURE__ */ jsx("mesh", {
				position: [
					pump.x,
					pump.y,
					pump.z + .19
				],
				material: rgbMat,
				children: /* @__PURE__ */ jsx("torusGeometry", { args: [
					.27,
					.025,
					8,
					lowPoly ? 16 : 40
				] })
			}),
			/* @__PURE__ */ jsx("mesh", {
				geometry: tube(-.08),
				material: dark
			}),
			/* @__PURE__ */ jsx("mesh", {
				geometry: tube(.08),
				material: dark
			}),
			/* @__PURE__ */ jsxs("group", {
				position: radPos,
				children: [/* @__PURE__ */ jsx("mesh", {
					material: dark,
					children: /* @__PURE__ */ jsx("boxGeometry", { args: [
						rad + .3,
						.27,
						1.22
					] })
				}), Array.from({ length: n }).map((_, i) => /* @__PURE__ */ jsx("group", {
					position: [
						-rad / 2 + fanSize * (i + .5),
						-.27,
						0
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					children: /* @__PURE__ */ jsx(Fan, {
						size: fanSize * .98,
						rgb: rgbMat,
						seg: lowPoly ? 16 : 32
					})
				}, i))]
			})
		] });
	}
	const h = (+part.specs.height_mm || 155) / 100;
	const pos = new THREE.Vector3(L.cpu.x, L.cpu.y, L.boardZ + .08 + h / 2);
	const fallback = /* @__PURE__ */ jsxs("group", {
		position: pos,
		children: [Array.from({ length: lowPoly ? 8 : 18 }).map((_, i, a) => /* @__PURE__ */ jsx("mesh", {
			position: [
				-.25 + .5 / a.length * i,
				0,
				0
			],
			material: fin,
			children: /* @__PURE__ */ jsx("boxGeometry", { args: [
				.012,
				1.25,
				h - .05
			] })
		}, i)), /* @__PURE__ */ jsx("group", {
			position: [
				.38,
				0,
				.02
			],
			rotation: [
				0,
				Math.PI / 2,
				0
			],
			children: /* @__PURE__ */ jsx(Fan, {
				size: 1.2,
				rgb: rgbMat,
				seg: lowPoly ? 16 : 32
			})
		})]
	});
	return /* @__PURE__ */ jsx(PartModel, {
		part,
		size: new THREE.Vector3(.9, 1.25, h),
		position: pos,
		fallback
	});
}
function CaseShell({ dims, color, showSide, showFront, frontFans, rgbMat, lowPoly, part }) {
	const { D, H, W } = dims;
	const c = color === "white" ? "#e8ecf1" : color === "blue" ? "#0e2c52" : "#16191e";
	const panel = useMemo(() => mat(c, {
		metalness: .5,
		roughness: .45
	}), [c]);
	const inner = useMemo(() => mat(color === "white" ? "#dfe4ea" : color === "blue" ? "#16365e" : "#232a35", {
		roughness: .85,
		metalness: .15,
		side: THREE.DoubleSide
	}), [color]);
	const glass = useMemo(() => new THREE.MeshPhysicalMaterial({
		color: "#9fc4ff",
		transparent: true,
		opacity: .12,
		roughness: .05,
		metalness: 0,
		clearcoat: 1,
		depthWrite: false
	}), []);
	const mesh = useMemo(() => {
		const cv = document.createElement("canvas");
		cv.width = cv.height = 64;
		const g = cv.getContext("2d");
		g.fillStyle = "#fff";
		g.fillRect(0, 0, 64, 64);
		g.fillStyle = "#000";
		for (let y = 4; y < 64; y += 10) for (let x = y / 10 % 2 ? 9 : 4; x < 64; x += 10) {
			g.beginPath();
			g.arc(x, y, 3.2, 0, Math.PI * 2);
			g.fill();
		}
		const t = new THREE.CanvasTexture(cv);
		t.wrapS = t.wrapT = THREE.RepeatWrapping;
		t.repeat.set(W * 6, H * 6);
		return new THREE.MeshStandardMaterial({
			color: c,
			alphaMap: t,
			transparent: true,
			alphaTest: .4,
			side: THREE.DoubleSide,
			metalness: .4,
			roughness: .5
		});
	}, [
		c,
		W,
		H
	]);
	const t = .04;
	const fans = Math.max(0, frontFans);
	const fanSize = Math.min(1.2, (H - 1.2) / Math.max(fans, 1) - .08);
	const shell = /* @__PURE__ */ jsxs("group", { children: [
		/* @__PURE__ */ jsx("mesh", {
			position: [
				0,
				0,
				-W / 2
			],
			material: inner,
			children: /* @__PURE__ */ jsx("boxGeometry", { args: [
				D,
				H,
				t
			] })
		}),
		/* @__PURE__ */ jsx("mesh", {
			position: [
				0,
				H / 2,
				0
			],
			material: panel,
			children: /* @__PURE__ */ jsx("boxGeometry", { args: [
				D,
				t,
				W
			] })
		}),
		/* @__PURE__ */ jsx("mesh", {
			position: [
				0,
				-H / 2,
				0
			],
			material: panel,
			children: /* @__PURE__ */ jsx("boxGeometry", { args: [
				D,
				t,
				W
			] })
		}),
		/* @__PURE__ */ jsx("mesh", {
			position: [
				-D / 2,
				0,
				0
			],
			material: inner,
			children: /* @__PURE__ */ jsx("boxGeometry", { args: [
				t,
				H,
				W
			] })
		}),
		[H / 2 - .03, -H / 2 + .03].map((y) => /* @__PURE__ */ jsx("mesh", {
			position: [
				0,
				y,
				W / 2
			],
			material: panel,
			children: /* @__PURE__ */ jsx("boxGeometry", { args: [
				D,
				.06,
				.06
			] })
		}, y)),
		[D / 2 - .03, -D / 2 + .03].map((x) => /* @__PURE__ */ jsx("mesh", {
			position: [
				x,
				0,
				W / 2
			],
			material: panel,
			children: /* @__PURE__ */ jsx("boxGeometry", { args: [
				.06,
				H,
				.06
			] })
		}, x)),
		[-1, 1].flatMap((sx) => [-1, 1].map((sz) => /* @__PURE__ */ jsx("mesh", {
			position: [
				sx * (D / 2 - .4),
				-H / 2 - .08,
				sz * (W / 2 - .3)
			],
			material: inner,
			children: /* @__PURE__ */ jsx("cylinderGeometry", { args: [
				.12,
				.14,
				.12,
				lowPoly ? 8 : 20
			] })
		}, `${sx}${sz}`))),
		showSide && /* @__PURE__ */ jsx("mesh", {
			position: [
				0,
				0,
				W / 2 + .01
			],
			material: glass,
			renderOrder: 10,
			children: /* @__PURE__ */ jsx("planeGeometry", { args: [D - .08, H - .08] })
		}),
		showFront && /* @__PURE__ */ jsx("mesh", {
			position: [
				D / 2 + .01,
				0,
				0
			],
			rotation: [
				0,
				Math.PI / 2,
				0
			],
			material: mesh,
			children: /* @__PURE__ */ jsx("planeGeometry", { args: [W, H] })
		}),
		Array.from({ length: fans }).map((_, i) => /* @__PURE__ */ jsx("group", {
			position: [
				D / 2 - .2,
				H / 2 - .75 - i * (fanSize + .08),
				0
			],
			rotation: [
				0,
				-Math.PI / 2,
				0
			],
			children: /* @__PURE__ */ jsx(Fan, {
				size: fanSize,
				rgb: rgbMat,
				seg: lowPoly ? 16 : 32
			})
		}, i)),
		/* @__PURE__ */ jsx("group", {
			position: [
				-D / 2 + .17,
				H / 2 - .95,
				0
			],
			rotation: [
				0,
				Math.PI / 2,
				0
			],
			children: /* @__PURE__ */ jsx(Fan, {
				size: 1,
				rgb: rgbMat,
				seg: lowPoly ? 16 : 32
			})
		})
	] });
	if (part?.model_url) return /* @__PURE__ */ jsx(PartModel, {
		part,
		size: new THREE.Vector3(D, H, W),
		position: new THREE.Vector3(0, 0, 0),
		fallback: shell
	});
	return shell;
}
//#endregion
//#region src/components/pc/Viewer3D.tsx
var LIGHTS = {
	studio: {
		bg: "#0d1826",
		ambient: 1,
		key: 2.2,
		env: 1.3
	},
	night: {
		bg: "#05080d",
		ambient: .18,
		key: .45,
		env: .35
	},
	daylight: {
		bg: "#cfd8e3",
		ambient: .9,
		key: 2,
		env: 1.2
	}
};
function Scene({ r, side, front, rgb, light, color, view, lowPoly, onReady }) {
	const controls = useRef(null);
	const dims = caseDims(r.case?.specs.max_board ?? r.motherboard?.specs.form_factor);
	const ff = r.motherboard?.specs.form_factor;
	const L = layout(dims, ff);
	const OY = dims.H / 2 + .14 - 2.2;
	const rgbMat = useMemo(() => new THREE.MeshStandardMaterial({
		color: "#111",
		emissive: "#3aa0ff",
		emissiveIntensity: 2.2,
		toneMapped: false
	}), []);
	useFrame(({ clock }) => {
		if (rgb) rgbMat.emissive.setHSL(clock.elapsedTime * .08 % 1, .95, .55);
		else rgbMat.emissive.set("#1d2733");
	});
	const focus = (p) => controls.current?.setLookAt(p.x + 1.4, p.y + OY + .6, dims.W / 2 + 2.6, p.x, p.y + OY, p.z, true);
	useEffect(() => {
		const c = controls.current;
		if (!c) return;
		const { D, H, W } = dims;
		const presets = {
			reset: [
				D * 1.35,
				H * .55,
				W + 8.4,
				0,
				-.1,
				0
			],
			front: [
				D / 2 + 7,
				.3,
				.01,
				0,
				0,
				0
			],
			side: [
				0,
				.2,
				W / 2 + 7.5,
				0,
				0,
				0
			],
			top: [
				.01,
				H / 2 + 8,
				.01,
				0,
				0,
				0
			],
			inside: [
				L.cpu.x + 2.2,
				L.cpu.y + OY + .5,
				W / 2 + 3.4,
				L.cpu.x + .3,
				L.cpu.y + OY - .9,
				L.boardZ
			]
		};
		c.setLookAt(...presets[view.v], view.n > 0);
	}, [
		view,
		dims.D,
		dims.H,
		dims.W
	]);
	useEffect(() => onReady(), []);
	const lt = LIGHTS[light];
	const ramPart = r.ram;
	const frontFans = Math.max(0, (+r.case?.specs.fans_included || 2) - 1) + r.extra.filter((e) => e.specs.kind === "fans").reduce((a, e) => a + (+e.specs.fans_count || 0), 0);
	const nvme = r.storage.filter((s) => s.specs.form_factor === "M.2");
	const bays = r.storage.filter((s) => s.specs.form_factor !== "M.2");
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [
		/* @__PURE__ */ jsx("color", {
			attach: "background",
			args: [lt.bg]
		}),
		/* @__PURE__ */ jsx("ambientLight", { intensity: lt.ambient }),
		/* @__PURE__ */ jsx("directionalLight", {
			position: [
				4,
				7,
				6
			],
			intensity: lt.key,
			castShadow: !lowPoly
		}),
		/* @__PURE__ */ jsx("pointLight", {
			position: [
				0,
				.8,
				.4
			],
			intensity: light === "night" ? 6 : 4,
			distance: 5,
			color: light === "night" ? "#6db6ff" : "#ffffff"
		}),
		/* @__PURE__ */ jsx("pointLight", {
			position: [
				.8,
				-1.2,
				.6
			],
			intensity: light === "night" ? 3 : 2,
			distance: 4,
			color: "#9ec9ff"
		}),
		/* @__PURE__ */ jsxs(Environment, {
			resolution: lowPoly ? 64 : 256,
			environmentIntensity: lt.env,
			children: [
				/* @__PURE__ */ jsx(Lightformer, {
					form: "rect",
					intensity: 3,
					position: [
						0,
						5,
						2
					],
					scale: [
						8,
						2,
						1
					]
				}),
				/* @__PURE__ */ jsx(Lightformer, {
					form: "rect",
					intensity: 1.5,
					position: [
						-5,
						1,
						3
					],
					"rotation-y": Math.PI / 3,
					scale: [
						4,
						6,
						1
					]
				}),
				/* @__PURE__ */ jsx(Lightformer, {
					form: "ring",
					intensity: 2,
					color: "#4ea3ff",
					position: [
						5,
						1,
						-2
					],
					scale: 2
				})
			]
		}),
		/* @__PURE__ */ jsx(CameraControls, {
			ref: controls,
			minDistance: 1.6,
			maxDistance: 16,
			smoothTime: .35
		}),
		/* @__PURE__ */ jsxs("group", {
			position: [
				0,
				OY,
				0
			],
			children: [
				/* @__PURE__ */ jsx(CaseShell, {
					dims,
					color,
					showSide: side,
					showFront: front,
					frontFans: r.case ? frontFans : 0,
					rgbMat,
					lowPoly,
					part: r.case
				}, `case-${r.case?.id}`),
				r.motherboard && /* @__PURE__ */ jsx(Inspectable, {
					label: r.motherboard.name,
					sub: `${r.motherboard.specs.form_factor} · ${r.motherboard.specs.chipset}`,
					onFocus: focus,
					focusPoint: L.cpu.clone().add(new THREE.Vector3(0, -.6, .2)),
					children: /* @__PURE__ */ jsx(Motherboard, {
						dims,
						part: r.motherboard,
						ff
					})
				}, `mb-${r.motherboard.id}`),
				r.cpu && /* @__PURE__ */ jsx(Inspectable, {
					label: r.cpu.name,
					sub: `${r.cpu.specs.cores} cores · ${r.cpu.specs.socket}`,
					onFocus: focus,
					focusPoint: L.cpu.clone().add(new THREE.Vector3(0, 0, .2)),
					children: /* @__PURE__ */ jsx(CPU, {
						dims,
						ff,
						part: r.cpu
					})
				}, `cpu-${r.cpu.id}`),
				ramPart && /* @__PURE__ */ jsx(Inspectable, {
					label: ramPart.name,
					sub: `${ramPart.specs.capacity_gb} GB ${ramPart.specs.type}`,
					onFocus: focus,
					focusPoint: new THREE.Vector3(L.ramX + .15, L.cpu.y + .3, L.boardZ + .5),
					children: /* @__PURE__ */ jsx(RAM, {
						dims,
						ff,
						part: ramPart,
						rgbMat
					})
				}, `ram-${ramPart.id}`),
				r.cooler && /* @__PURE__ */ jsx(Inspectable, {
					label: r.cooler.name,
					sub: r.cooler.specs.kind === "AIO" ? `${r.cooler.specs.radiator_mm} mm radiator` : `${r.cooler.specs.height_mm} mm tall`,
					onFocus: focus,
					focusPoint: L.cpu.clone().add(new THREE.Vector3(0, .7, .9)),
					children: /* @__PURE__ */ jsx(Cooler, {
						dims,
						ff,
						part: r.cooler,
						rgbMat,
						lowPoly
					})
				}, `cool-${r.cooler.id}`),
				r.gpu && /* @__PURE__ */ jsx(Inspectable, {
					label: r.gpu.name,
					sub: `${r.gpu.specs.length_mm} mm · ${r.gpu.specs.power_w} W`,
					onFocus: focus,
					focusPoint: new THREE.Vector3(L.x0 + 1.2, L.pcieY - .2, .2),
					children: /* @__PURE__ */ jsx(GPU, {
						dims,
						ff,
						part: r.gpu,
						rgbMat,
						lowPoly
					})
				}, `gpu-${r.gpu.id}`),
				r.psu && /* @__PURE__ */ jsx(Inspectable, {
					label: r.psu.name,
					sub: `${r.psu.specs.watts} W · ${r.psu.specs.efficiency}`,
					onFocus: focus,
					focusPoint: new THREE.Vector3(-dims.D / 2 + .9, -dims.H / 2 + .9, .3),
					children: /* @__PURE__ */ jsx(PSU, {
						dims,
						part: r.psu
					})
				}, `psu-${r.psu.id}`),
				nvme.map((s, i) => /* @__PURE__ */ jsx(Inspectable, {
					label: s.name,
					sub: `${s.specs.kind} · ${s.specs.read_mbps} MB/s`,
					onFocus: focus,
					focusPoint: new THREE.Vector3(L.m2.x, L.m2.y - i * .42 + .2, L.boardZ + .3),
					children: /* @__PURE__ */ jsx(M2, {
						dims,
						ff,
						index: i
					})
				}, `m2-${s.id}-${i}`)),
				bays.map((s, i) => /* @__PURE__ */ jsx(Inspectable, {
					label: s.name,
					sub: s.specs.kind,
					onFocus: focus,
					focusPoint: new THREE.Vector3(dims.D / 2 - 1.2, -dims.H / 2 + .6 + i * .32, .4),
					children: /* @__PURE__ */ jsx(Drive, {
						dims,
						part: s,
						index: i
					})
				}, `bay-${s.id}-${i}`))
			]
		}),
		/* @__PURE__ */ jsx(ContactShadows, {
			position: [
				0,
				-2.21,
				0
			],
			opacity: light === "daylight" ? .35 : .6,
			scale: 14,
			blur: 2.6,
			far: 4,
			resolution: lowPoly ? 256 : 512
		})
	] });
}
function Progress() {
	const { active, progress } = useProgress();
	if (!active) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "pc-loading",
		role: "status",
		children: [
			"Loading 3D models… ",
			Math.round(progress),
			"%"
		]
	});
}
function Viewer3D({ r }) {
	const wrap = useRef(null);
	const [side, setSide] = useState(true);
	const [front, setFront] = useState(true);
	const [rgb, setRgb] = useState(true);
	const [light, setLight] = useState("studio");
	const [color, setColor] = useState(r.case?.specs.color ?? "black");
	const [view, setView] = useState({
		v: "reset",
		n: 0
	});
	const [visible, setVisible] = useState(true);
	const [ready, setReady] = useState(false);
	const lowPoly = typeof window !== "undefined" && (window.innerWidth < 768 || navigator.hardwareConcurrency <= 4);
	const reduced = typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
	useEffect(() => setColor(r.case?.specs.color ?? "black"), [r.case?.id]);
	useEffect(() => {
		const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
		if (wrap.current) io.observe(wrap.current);
		return () => io.disconnect();
	}, []);
	const go = (v) => setView((s) => ({
		v,
		n: s.n + 1
	}));
	return /* @__PURE__ */ jsxs("div", {
		className: "pc-viewer",
		ref: wrap,
		children: [
			/* @__PURE__ */ jsx(Canvas, {
				shadows: !lowPoly,
				dpr: lowPoly ? [1, 1.5] : [1, 2],
				frameloop: visible && !reduced ? "always" : "demand",
				camera: {
					position: [
						6.2,
						2.7,
						10.7
					],
					fov: 38
				},
				gl: {
					antialias: !lowPoly,
					powerPreference: "high-performance"
				},
				"aria-label": "Interactive 3D preview of your PC build",
				children: /* @__PURE__ */ jsx(Scene, {
					r,
					side,
					front,
					rgb: rgb && !reduced,
					light,
					color,
					view,
					lowPoly,
					onReady: () => setReady(true)
				})
			}),
			!ready && /* @__PURE__ */ jsx("div", {
				className: "pc-loading",
				children: "Preparing 3D view…"
			}),
			/* @__PURE__ */ jsx(Progress, {}),
			/* @__PURE__ */ jsx("div", {
				className: "pc-views",
				role: "toolbar",
				"aria-label": "Camera",
				children: [
					"reset",
					"front",
					"side",
					"top",
					"inside"
				].map((v) => /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => go(v),
					className: view.v === v ? "on" : "",
					children: v === "reset" ? "Reset view" : v[0].toUpperCase() + v.slice(1)
				}, v))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "pc-toggles",
				role: "toolbar",
				"aria-label": "Display",
				children: [
					/* @__PURE__ */ jsxs("label", { children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						checked: side,
						onChange: (e) => setSide(e.target.checked)
					}), " Side panel"] }),
					/* @__PURE__ */ jsxs("label", { children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						checked: front,
						onChange: (e) => setFront(e.target.checked)
					}), " Front panel"] }),
					/* @__PURE__ */ jsxs("label", { children: [/* @__PURE__ */ jsx("input", {
						type: "checkbox",
						checked: rgb,
						onChange: (e) => setRgb(e.target.checked)
					}), " RGB"] }),
					/* @__PURE__ */ jsxs("select", {
						value: light,
						onChange: (e) => setLight(e.target.value),
						"aria-label": "Lighting",
						children: [
							/* @__PURE__ */ jsx("option", {
								value: "studio",
								children: "Studio light"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "night",
								children: "Night (RGB)"
							}),
							/* @__PURE__ */ jsx("option", {
								value: "daylight",
								children: "Daylight"
							})
						]
					}),
					/* @__PURE__ */ jsx("span", {
						className: "swatches",
						"aria-label": "Cabinet colour",
						children: [
							["black", "#16191e"],
							["white", "#e8ecf1"],
							["blue", "#0e2c52"]
						].map(([k, c]) => /* @__PURE__ */ jsx("button", {
							type: "button",
							"aria-label": `${k} cabinet`,
							"aria-pressed": color === k,
							style: { background: c },
							onClick: () => setColor(k)
						}, k))
					})
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "pc-hint",
				children: "Drag to rotate · scroll or pinch to zoom · right-drag to pan · click a part to inspect"
			})
		]
	});
}
//#endregion
export { Viewer3D as default };
