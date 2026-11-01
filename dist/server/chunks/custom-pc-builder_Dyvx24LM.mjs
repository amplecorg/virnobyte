import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { A as renderTemplate, V as createAstro, j as maybeRenderHead, w as renderComponent } from "./sequence_BTIhAKFo.mjs";
import { t as createComponent } from "./compiler_B6nf2Usq.mjs";
import { i as json, r as get } from "./db_D8F-v3Jt.mjs";
import { t as $$Base } from "./Base_D6qAGwxc.mjs";
import { n as getSettings, t as contactInfo } from "./settings_DhHzJVWR.mjs";
import { t as $$Breadcrumbs } from "./Breadcrumbs_dgueMOWz.mjs";
import { t as $$CtaBand } from "./CtaBand_dmkdPCpE.mjs";
import { n as breadcrumbs, r as faqPage } from "./schema_C4zHl1iQ.mjs";
import { a as missing, c as resolve, d as catalog, f as presets, i as estimatePower, l as status, n as checkBuild, o as partErrors, r as decodeSelection, s as price, t as CATEGORIES, u as summary } from "./engine_D_OZEnqE.mjs";
import { t as $$FaqList } from "./FaqList_DYYYvqt2.mjs";
import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/pc/PCBuilder.tsx
var Viewer3D = lazy(() => import("./Viewer3D_BSNFZIL3.mjs"));
var inr = (n) => "₹" + new Intl.NumberFormat("en-IN").format(Math.round(n));
var STORE = "vb-pc-build";
function specLine(p) {
	const s = p.specs;
	switch (p.category) {
		case "cpu": return `${s.cores} cores / ${s.threads} threads · ${s.base_ghz}–${s.boost_ghz} GHz · ${s.tdp} W · ${s.socket}${s.igpu ? " · integrated graphics" : ""}${s.cooler_included ? " · cooler included" : ""}`;
		case "motherboard": return `${s.socket} · ${s.chipset} · ${s.form_factor} · ${s.ram_type} ×${s.ram_slots} (max ${s.max_ram_gb} GB) · ${s.m2_slots}× M.2${s.wifi ? " · Wi-Fi" : ""}`;
		case "ram": return `${s.capacity_gb} GB (${s.modules}×${s.capacity_gb / s.modules} GB) · ${s.type}-${s.speed_mts}${s.rgb ? " · RGB" : ""} · ${s.height_mm} mm tall`;
		case "gpu": return `${s.vram_gb} GB VRAM · ${s.length_mm} mm long · ${s.power_w} W · needs ${s.rec_psu_w} W PSU`;
		case "storage": return `${s.kind} · ${s.capacity_gb >= 1e3 ? s.capacity_gb / 1e3 + " TB" : s.capacity_gb + " GB"} · ${s.read_mbps}/${s.write_mbps} MB/s · ${s.form_factor}`;
		case "psu": return `${s.watts} W · ${s.efficiency} · ${s.modular} · ${s.form_factor}`;
		case "cooler": return s.kind === "AIO" ? `AIO liquid · ${s.radiator_mm} mm radiator · rated ${s.tdp_w} W` : `Air tower · ${s.height_mm} mm tall · rated ${s.tdp_w} W`;
		case "case": return `Up to ${s.max_board} · GPU ≤ ${s.gpu_max_mm} mm · cooler ≤ ${s.cooler_max_mm} mm · radiator ${[].concat(s.radiator_mm).join("/")} mm · ${s.psu} PSU`;
		default: return {
			fans: `${s.fans_count} fans`,
			wifi: "Wireless networking",
			bluetooth: "Bluetooth",
			sound: "Audio",
			capture: "Video capture",
			rgb: "Lighting control",
			paste: "Thermal compound",
			os: "Operating system"
		}[s.kind] ?? "";
	}
}
function PCBuilder({ parts, presets, pricing, note, initial, whatsapp }) {
	const byId = useMemo(() => new Map(parts.map((p) => [p.id, p])), [parts]);
	const [sel, setSel] = useState(initial ?? presets.find((p) => p.slug === "gaming-pc")?.selection ?? {});
	const [active, setActive] = useState("cpu");
	const [showAll, setShowAll] = useState(false);
	const [panel, setPanel] = useState(null);
	const [modal, setModal] = useState(null);
	const [toast, setToast] = useState("");
	const [busy, setBusy] = useState(false);
	const [mounted3d, setMounted3d] = useState(false);
	useEffect(() => {
		if (initial) return;
		try {
			const url = new URL(location.href).searchParams.get("b");
			const saved = url ? decodeSelection(url) : JSON.parse(localStorage.getItem(STORE) || "null");
			if (saved) setSel(saved);
		} catch {}
	}, []);
	useEffect(() => {
		try {
			localStorage.setItem(STORE, JSON.stringify(sel));
		} catch {}
	}, [sel]);
	useEffect(() => {
		const t = setTimeout(() => setMounted3d(true), 50);
		return () => clearTimeout(t);
	}, []);
	useEffect(() => {
		if (!toast) return;
		const t = setTimeout(() => setToast(""), 4e3);
		return () => clearTimeout(t);
	}, [toast]);
	const r = useMemo(() => resolve(sel, byId), [sel, byId]);
	const issues = useMemo(() => checkBuild(r), [r]);
	const miss = useMemo(() => missing(r), [r]);
	const st = status(issues, miss);
	const power = useMemo(() => estimatePower(r), [r]);
	const pr = useMemo(() => price(r, pricing), [r, pricing]);
	const sum = useMemo(() => summary(r), [r]);
	const errorsByCat = (c) => issues.filter((i) => i.level === "error" && i.parts.includes(c));
	const pick = (p) => {
		setSel((s) => {
			if (p.category === "storage" || p.category === "extra") {
				const cur = s[p.category] ?? [];
				return {
					...s,
					[p.category]: cur.includes(p.id) ? cur.filter((x) => x !== p.id) : [...cur, p.id]
				};
			}
			return {
				...s,
				[p.category]: s[p.category] === p.id ? void 0 : p.id
			};
		});
	};
	const clear = (c) => setSel((s) => ({
		...s,
		[c]: c === "storage" || c === "extra" ? [] : void 0
	}));
	const idx = CATEGORIES.findIndex((c) => c.key === active);
	const go = (d) => setActive(CATEGORIES[Math.min(CATEGORIES.length - 1, Math.max(0, idx + d))].key);
	const evaluated = parts.filter((p) => p.category === active).map((p) => ({
		p,
		errs: partErrors(p, sel, byId)
	}));
	const compatible = evaluated.filter((e) => !e.errs.length);
	const hidden = evaluated.length - compatible.length;
	const shown = showAll ? evaluated : compatible;
	const recommendedPsu = active === "psu" && power.recommended ? compatible.filter((e) => +e.p.specs.watts >= power.recommended).sort((a, b) => +a.p.specs.watts - +b.p.specs.watts)[0]?.p.id : void 0;
	const anchor = active === "motherboard" ? r.cpu : active === "ram" ? r.motherboard : active === "cooler" || active === "case" ? r.cpu ?? r.motherboard : void 0;
	async function submit(intent, form) {
		setBusy(true);
		try {
			const res = await fetch("/api/pc/build", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					intent,
					selection: sel,
					name: form?.get("name"),
					phone: form?.get("phone"),
					email: form?.get("email"),
					notes: form?.get("notes")
				})
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Something went wrong. Please call us.");
			const link = `${location.origin}${data.url}`;
			history.replaceState(null, "", data.url);
			if (intent === "save") try {
				await navigator.clipboard.writeText(link);
				setToast(`Build ${data.code} saved — link copied.`);
			} catch {
				setToast(`Build ${data.code} saved. Bookmark this page to return to it.`);
			}
			else {
				setModal(null);
				setToast(intent === "order" ? `Order request ${data.code} sent (${inr(data.total)}). We will call to confirm stock, price and payment.` : `Quote request ${data.code} sent. We will call you with a confirmed quote.`);
			}
		} catch (e) {
			setToast(e.message);
		} finally {
			setBusy(false);
		}
	}
	const statusLabel = {
		ok: "✓ Your configuration is compatible",
		warning: "⚠ Compatible, with recommendations",
		error: "✕ Compatibility issue detected",
		incomplete: `Choose ${miss.map((m) => CATEGORIES.find((c) => c.key === m).label.toLowerCase()).join(", ")}`
	}[st];
	const blocked = st === "error" || st === "incomplete";
	return /* @__PURE__ */ jsxs("div", {
		className: "pcb",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "pcb-presets",
				role: "group",
				"aria-label": "Start from a preset",
				children: [
					/* @__PURE__ */ jsx("span", { children: "Start from" }),
					presets.map((p) => /* @__PURE__ */ jsx("button", {
						type: "button",
						title: p.summary,
						onClick: () => {
							setSel(p.selection);
							setToast(`${p.name} loaded — adjust any part.`);
						},
						children: p.name
					}, p.slug)),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						className: "ghost",
						onClick: () => setSel({}),
						children: "Start empty"
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "pcb-main",
				children: [/* @__PURE__ */ jsxs("section", {
					className: "pcb-stage",
					"aria-label": "3D preview",
					children: [mounted3d ? /* @__PURE__ */ jsx(Suspense, {
						fallback: /* @__PURE__ */ jsx("div", {
							className: "pc-viewer pc-skeleton",
							children: "Loading 3D viewer…"
						}),
						children: /* @__PURE__ */ jsx(Viewer3D, { r })
					}) : /* @__PURE__ */ jsx("div", {
						className: "pc-viewer pc-skeleton",
						children: "Loading 3D viewer…"
					}), /* @__PURE__ */ jsxs("dl", {
						className: "pcb-summary",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: "Processor" }), /* @__PURE__ */ jsx("dd", { children: sum.cores })] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: "Graphics" }), /* @__PURE__ */ jsx("dd", { children: sum.graphics })] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: "Memory" }), /* @__PURE__ */ jsx("dd", { children: sum.memory })] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: "Storage" }), /* @__PURE__ */ jsx("dd", { children: sum.storage })] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: "Estimated power" }), /* @__PURE__ */ jsx("dd", { children: power.total ? `${power.total} W` : "—" })] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", { children: "Recommended PSU" }), /* @__PURE__ */ jsx("dd", { children: power.recommended ? `${power.recommended} W` : "—" })] })
						]
					})]
				}), /* @__PURE__ */ jsxs("aside", {
					className: "pcb-parts",
					"aria-label": "Components",
					children: [/* @__PURE__ */ jsx("nav", {
						className: "pcb-steps",
						"aria-label": "Component steps",
						children: CATEGORIES.map((c, i) => {
							const v = sel[c.key];
							const done = Array.isArray(v) ? v.length > 0 : v != null;
							return /* @__PURE__ */ jsxs("button", {
								type: "button",
								"aria-current": active === c.key ? "step" : void 0,
								className: errorsByCat(c.key).length ? "bad" : done ? "done" : "",
								onClick: () => setActive(c.key),
								children: [/* @__PURE__ */ jsx("span", {
									className: "n",
									children: done && !errorsByCat(c.key).length ? "✓" : i + 1
								}), c.label]
							}, c.key);
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "pcb-cat",
						children: [
							/* @__PURE__ */ jsxs("header", { children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", { children: CATEGORIES[idx].label }), /* @__PURE__ */ jsx("p", { children: CATEGORIES[idx].hint })] }), sel[active] != null && (!Array.isArray(sel[active]) || sel[active].length > 0) && /* @__PURE__ */ jsx("button", {
								type: "button",
								className: "link",
								onClick: () => clear(active),
								children: "Remove"
							})] }),
							anchor && compatible.length > 0 && /* @__PURE__ */ jsxs("p", {
								className: "pcb-rec",
								children: [
									"✓ ",
									compatible.length,
									" option",
									compatible.length > 1 ? "s" : "",
									" compatible with your ",
									anchor.name
								]
							}),
							errorsByCat(active).map((i, k) => /* @__PURE__ */ jsx(IssueCard, { issue: i }, k)),
							/* @__PURE__ */ jsx("ul", {
								className: "pcb-options",
								children: shown.map(({ p, errs }) => {
									const v = sel[active];
									const on = Array.isArray(v) ? v.includes(p.id) : v === p.id;
									return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
										type: "button",
										className: `opt ${on ? "on" : ""} ${errs.length ? "incompat" : ""}`,
										"aria-pressed": on,
										onClick: () => pick(p),
										children: [/* @__PURE__ */ jsxs("span", {
											className: "o-main",
											children: [
												/* @__PURE__ */ jsxs("span", {
													className: "o-name",
													children: [
														p.name,
														p.id === recommendedPsu && /* @__PURE__ */ jsx("em", {
															className: "tag",
															children: "Recommended"
														}),
														!p.in_stock && /* @__PURE__ */ jsx("em", {
															className: "tag muted",
															children: "On order"
														})
													]
												}),
												/* @__PURE__ */ jsx("span", {
													className: "o-spec",
													children: specLine(p)
												}),
												errs.length > 0 && /* @__PURE__ */ jsxs("span", {
													className: "o-err",
													children: ["✕ ", errs[0].title]
												})
											]
										}), /* @__PURE__ */ jsx("span", {
											className: "o-price",
											children: inr(p.price)
										})]
									}) }, p.id);
								})
							}),
							hidden > 0 && /* @__PURE__ */ jsxs("label", {
								className: "pcb-showall",
								children: [
									/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: showAll,
										onChange: (e) => setShowAll(e.target.checked)
									}),
									" Show ",
									hidden,
									" incompatible option",
									hidden > 1 ? "s" : ""
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "pcb-nav",
								children: [/* @__PURE__ */ jsx("button", {
									type: "button",
									className: "btn-s ghost",
									disabled: idx === 0,
									onClick: () => go(-1),
									children: "Back"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									className: "btn-s",
									disabled: idx === CATEGORIES.length - 1,
									onClick: () => go(1),
									children: idx < CATEGORIES.length - 1 ? `Next: ${CATEGORIES[idx + 1].label}` : "Done"
								})]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "pcb-bar",
				children: [
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						className: `status ${st}`,
						onClick: () => setPanel(panel === "issues" ? null : "issues"),
						"aria-expanded": panel === "issues",
						children: [statusLabel, issues.filter((i) => i.level !== "info").length > 0 && /* @__PURE__ */ jsxs("small", { children: [issues.filter((i) => i.level !== "info").length, " note(s) — view"] })]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "total",
						onClick: () => setPanel(panel === "price" ? null : "price"),
						"aria-expanded": panel === "price",
						children: [/* @__PURE__ */ jsxs("small", { children: ["Total", pricing.pricesIncludeGst ? " incl. GST" : ""] }), /* @__PURE__ */ jsx("strong", { children: inr(pr.total) })]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "actions",
						children: [
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "btn-s ghost",
								disabled: busy,
								onClick: () => submit("save"),
								children: "Save build"
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "btn-s ghost",
								disabled: busy || blocked,
								title: blocked ? "Fix the issues first" : void 0,
								onClick: () => setModal("quote"),
								children: "Get quote"
							}),
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								className: "btn-s",
								disabled: busy || blocked,
								title: blocked ? "Fix the issues first" : void 0,
								onClick: () => setModal("order"),
								children: ["Order", /* @__PURE__ */ jsx("span", {
									className: "wide",
									children: " this build"
								})]
							})
						]
					})
				]
			}),
			panel === "issues" && /* @__PURE__ */ jsxs("div", {
				className: "pcb-drawer",
				role: "region",
				"aria-label": "Compatibility details",
				children: [
					/* @__PURE__ */ jsxs("header", { children: [/* @__PURE__ */ jsx("h2", { children: "Compatibility check" }), /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "link",
						onClick: () => setPanel(null),
						children: "Close"
					})] }),
					issues.length === 0 && miss.length === 0 && /* @__PURE__ */ jsxs("p", { children: [
						"✓ All parts are compatible. Estimated draw ",
						power.total,
						" W, recommended PSU ",
						power.recommended,
						" W."
					] }),
					miss.length > 0 && /* @__PURE__ */ jsxs("p", {
						className: "muted",
						children: [
							"Still to choose: ",
							miss.map((m) => CATEGORIES.find((c) => c.key === m).label).join(", "),
							"."
						]
					}),
					issues.map((i, k) => /* @__PURE__ */ jsx(IssueCard, {
						issue: i,
						onGo: () => {
							setActive(i.parts[0]);
							setPanel(null);
						}
					}, k)),
					power.rows.length > 0 && /* @__PURE__ */ jsxs("table", {
						className: "pcb-table",
						children: [/* @__PURE__ */ jsx("caption", { children: "Estimated power draw" }), /* @__PURE__ */ jsxs("tbody", { children: [
							power.rows.map((x) => /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("td", { children: x.label }), /* @__PURE__ */ jsxs("td", { children: [x.watts, " W"] })] }, x.label)),
							/* @__PURE__ */ jsxs("tr", {
								className: "b",
								children: [/* @__PURE__ */ jsx("td", { children: "Total" }), /* @__PURE__ */ jsxs("td", { children: [power.total, " W"] })]
							}),
							/* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("td", { children: "Recommended PSU (×1.3 headroom)" }), /* @__PURE__ */ jsxs("td", { children: [power.recommended, " W"] })] })
						] })]
					})
				]
			}),
			panel === "price" && /* @__PURE__ */ jsxs("div", {
				className: "pcb-drawer",
				role: "region",
				"aria-label": "Price breakdown",
				children: [
					/* @__PURE__ */ jsxs("header", { children: [/* @__PURE__ */ jsx("h2", { children: "Price breakdown" }), /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "link",
						onClick: () => setPanel(null),
						children: "Close"
					})] }),
					/* @__PURE__ */ jsx("table", {
						className: "pcb-table",
						children: /* @__PURE__ */ jsxs("tbody", { children: [
							pr.lines.map((l, k) => /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsxs("td", { children: [
								/* @__PURE__ */ jsx("span", {
									className: "muted",
									children: CATEGORIES.find((c) => c.key === l.category).label
								}),
								/* @__PURE__ */ jsx("br", {}),
								l.name
							] }), /* @__PURE__ */ jsx("td", { children: inr(l.price) })] }, k)),
							pr.assembly > 0 && /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("td", { children: "Assembly & testing" }), /* @__PURE__ */ jsx("td", { children: inr(pr.assembly) })] }),
							pr.delivery > 0 && /* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsx("td", { children: "Delivery" }), /* @__PURE__ */ jsx("td", { children: inr(pr.delivery) })] }),
							/* @__PURE__ */ jsxs("tr", {
								className: "b",
								children: [/* @__PURE__ */ jsx("td", { children: "Subtotal (before GST)" }), /* @__PURE__ */ jsx("td", { children: inr(pr.subtotal) })]
							}),
							/* @__PURE__ */ jsxs("tr", { children: [/* @__PURE__ */ jsxs("td", { children: [
								"GST ",
								pricing.gstPercent,
								"%"
							] }), /* @__PURE__ */ jsx("td", { children: inr(pr.gst) })] }),
							/* @__PURE__ */ jsxs("tr", {
								className: "b big",
								children: [/* @__PURE__ */ jsx("td", { children: "Total" }), /* @__PURE__ */ jsx("td", { children: inr(pr.total) })]
							})
						] })
					}),
					/* @__PURE__ */ jsx("p", {
						className: "muted small",
						children: note
					})
				]
			}),
			modal && /* @__PURE__ */ jsx("div", {
				className: "pcb-modal",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "pcb-modal-h",
				onKeyDown: (e) => e.key === "Escape" && setModal(null),
				children: /* @__PURE__ */ jsxs("form", {
					className: "pcb-modal-card",
					onSubmit: (e) => {
						e.preventDefault();
						submit(modal, new FormData(e.currentTarget));
					},
					children: [
						/* @__PURE__ */ jsx("h2", {
							id: "pcb-modal-h",
							children: modal === "order" ? "Order this build" : "Get a quote"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "muted",
							children: modal === "order" ? `Total ${inr(pr.total)}. No online payment — we call to confirm stock and the final price, then collect payment when your PC is ready.` : "We confirm current prices and availability and send you a written quote."
						}),
						/* @__PURE__ */ jsxs("label", { children: ["Your name", /* @__PURE__ */ jsx("input", {
							name: "name",
							required: true,
							autoComplete: "name",
							autoFocus: true
						})] }),
						/* @__PURE__ */ jsxs("label", { children: ["Mobile number", /* @__PURE__ */ jsx("input", {
							name: "phone",
							required: true,
							type: "tel",
							inputMode: "tel",
							autoComplete: "tel",
							pattern: String.raw`\+?[0-9 \(\)\-]{10,16}`,
							title: "10-digit mobile number"
						})] }),
						/* @__PURE__ */ jsxs("label", { children: ["Email (optional)", /* @__PURE__ */ jsx("input", {
							name: "email",
							type: "email",
							autoComplete: "email"
						})] }),
						/* @__PURE__ */ jsxs("label", { children: ["Notes (optional)", /* @__PURE__ */ jsx("textarea", {
							name: "notes",
							rows: 3,
							placeholder: "Budget, games or software you use, delivery area…"
						})] }),
						/* @__PURE__ */ jsxs("div", {
							className: "row",
							children: [/* @__PURE__ */ jsx("button", {
								type: "button",
								className: "btn-s ghost",
								onClick: () => setModal(null),
								children: "Cancel"
							}), /* @__PURE__ */ jsx("button", {
								type: "submit",
								className: "btn-s",
								disabled: busy,
								children: busy ? "Sending…" : modal === "order" ? "Send order request" : "Request quote"
							})]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "muted small",
							children: [
								"Prefer to talk? ",
								/* @__PURE__ */ jsx("a", {
									href: whatsapp,
									target: "_blank",
									rel: "noopener",
									children: "WhatsApp us"
								}),
								"."
							]
						})
					]
				})
			}),
			toast && /* @__PURE__ */ jsx("div", {
				className: "pcb-toast",
				role: "status",
				children: toast
			})
		]
	});
}
function IssueCard({ issue, onGo }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `pcb-issue ${issue.level}`,
		children: [
			/* @__PURE__ */ jsxs("strong", { children: [
				issue.level === "error" ? "✕" : issue.level === "warning" ? "⚠" : "ℹ",
				" ",
				issue.title
			] }),
			/* @__PURE__ */ jsx("p", { children: issue.detail }),
			issue.fix && /* @__PURE__ */ jsx("p", {
				className: "fix",
				children: issue.fix
			}),
			onGo && /* @__PURE__ */ jsxs("button", {
				type: "button",
				className: "link",
				onClick: onGo,
				children: ["Change ", CATEGORIES.find((c) => c.key === issue.parts[0])?.label.toLowerCase()]
			})
		]
	});
}
//#endregion
//#region src/pages/custom-pc-builder.astro
var custom_pc_builder_exports = /* @__PURE__ */ __exportAll({
	default: () => $$CustomPcBuilder,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://virnobyte.com");
var $$CustomPcBuilder = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$CustomPcBuilder;
	const s = getSettings();
	const c = contactInfo(s);
	const parts = catalog();
	const presetList = presets(parts);
	const code = Astro.url.searchParams.get("build")?.toUpperCase();
	const saved = code ? get("SELECT parts FROM pc_builds WHERE code = ?", code) : void 0;
	const initial = saved ? json(saved.parts, null) : null;
	const crumbs = [{
		name: "Home",
		href: "/"
	}, {
		name: "Custom PC Builder",
		href: "/custom-pc-builder"
	}];
	const faqs = [
		{
			q: "How does the compatibility check work?",
			a: "Every time you change a part, the builder checks the CPU socket against the motherboard, memory type and capacity, motherboard size against the cabinet, graphics card length and cooler height against the cabinet clearances, radiator support, M.2 and SATA slots, and power. Incompatible builds cannot be sent for a quote or order."
		},
		{
			q: "How is the recommended power supply calculated?",
			a: "We add the estimated draw of the processor, graphics card, motherboard, memory, storage, fans and pump, multiply by 1.3 for headroom, and round up to the next 50 W."
		},
		{
			q: "Are the prices final?",
			a: "Prices are taken from our current catalogue and recalculated on our server, but component prices and stock change often. We confirm the final price and availability before you pay."
		},
		{
			q: "Do you assemble and test the PC?",
			a: `Yes. We assemble the PC at our ${c.locality} workshop, install drivers and Windows if selected, and test it before handover. Delivery can be arranged in Pimpri-Chinchwad and Pune.`
		},
		{
			q: "Can I bring my own parts?",
			a: "Yes. Mention the parts you already have in the notes when you request a quote and we will plan the build around them."
		}
	];
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Custom PC Builder – Build Your Own PC Online | Virnobyte",
		"description": "Build your custom PC online with Virnobyte. Choose your CPU, GPU, motherboard, RAM, storage, power supply and case, check compatibility and visualize your PC in interactive 3D.",
		"canonical": "/custom-pc-builder",
		"image": "/og/pages/pc-builder.jpg",
		"noindex": !!code,
		"jsonLd": [breadcrumbs(Astro.site, crumbs), faqPage(faqs)],
		"data-astro-cid-63hkttrx": true
	}, { "default": ($$result) => renderTemplate` ${maybeRenderHead($$result)}<section class="builder-wrap" data-astro-cid-63hkttrx> <div class="wrap head" data-astro-cid-63hkttrx> ${renderComponent($$result, "Breadcrumbs", $$Breadcrumbs, {
		"items": crumbs,
		"tone": "dark",
		"data-astro-cid-63hkttrx": true
	})} <h1 data-astro-cid-63hkttrx>Build Your Custom PC</h1> <p class="lede" data-astro-cid-63hkttrx>Choose your components, check compatibility and visualize your custom PC in 3D before you buy.</p> </div> <div class="wrap" data-astro-cid-63hkttrx> ${renderComponent($$result, "PCBuilder", PCBuilder, {
		"client:load": true,
		"parts": parts,
		"presets": presetList,
		"pricing": s.pcbuilder,
		"note": s.pcbuilder.note,
		"initial": initial,
		"whatsapp": c.whatsappUrl("Hi Virnobyte, I would like help with a custom PC build."),
		"data-astro-cid-63hkttrx": true,
		"client:component-hydration": "load",
		"client:component-path": "@/components/pc/PCBuilder.tsx",
		"client:component-export": "default"
	})} <noscript><p class="lede" data-astro-cid-63hkttrx>The configurator needs JavaScript. Call ${c.phone} or WhatsApp us and we will build your quote by phone.</p></noscript> </div> </section> <section class="section" data-astro-cid-63hkttrx> <div class="wrap how" data-astro-cid-63hkttrx> <div class="stack" data-astro-cid-63hkttrx> <span class="eyebrow" data-astro-cid-63hkttrx>How it works</span> <h2 data-astro-cid-63hkttrx>From parts list to a tested PC</h2> <ol class="ticks-n" data-astro-cid-63hkttrx> <li data-astro-cid-63hkttrx><strong data-astro-cid-63hkttrx>Pick a starting point</strong> — a gaming, office, creator or budget preset, or start empty.</li> <li data-astro-cid-63hkttrx><strong data-astro-cid-63hkttrx>Swap any component</strong> — only compatible parts are shown, with the reason for anything hidden.</li> <li data-astro-cid-63hkttrx><strong data-astro-cid-63hkttrx>Check it in 3D</strong> — rotate, open the side panel and inspect each part in the cabinet.</li> <li data-astro-cid-63hkttrx><strong data-astro-cid-63hkttrx>Request a quote or order</strong> — we confirm prices and stock, assemble and test the PC in ${c.locality}.</li> </ol> </div> <div data-astro-cid-63hkttrx> <h2 class="h-sm" data-astro-cid-63hkttrx>Custom PC questions</h2> ${renderComponent($$result, "FaqList", $$FaqList, {
		"faqs": faqs,
		"data-astro-cid-63hkttrx": true
	})} </div> </div> </section> ${renderComponent($$result, "CtaBand", $$CtaBand, {
		"heading": "Rather talk it through?",
		"text": "Tell us your budget and what you'll use the PC for. We'll suggest a build.",
		"whatsappText": "Hi Virnobyte, I would like help with a custom PC build.",
		"data-astro-cid-63hkttrx": true
	})} ` })}`;
}, "C:/Programming section/virnobyte/src/pages/custom-pc-builder.astro", void 0);
var $$file = "C:/Programming section/virnobyte/src/pages/custom-pc-builder.astro";
var $$url = "/custom-pc-builder.html";
//#endregion
//#region \0virtual:astro:page:src/pages/custom-pc-builder@_@astro
var page = () => custom_pc_builder_exports;
//#endregion
export { page };
