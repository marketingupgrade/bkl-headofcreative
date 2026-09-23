"use client";

/**
 * @component ScrollPathDraw
 * @description The niche loop · BYQ gem "Scroll Path Draw": a stroke-dashoffset line
 *   draws with scroll while a glowing node rides the tip and each of the
 *   five stops lights when the line reaches it. Motion verbatim (scrub 0.6,
 *   0.25s power2.out per update).
 */

import * as React from "react";
import { gsap, ScrollTrigger } from "./lib/gsap";

const ACCENT_AMBER = "#FCF2D3";
const ACCENT_SOLAR = "#FFEBAD";
const SPD_GLOW = "rgba(252,242,211, 0.55)";
const BG = "#0E0E0E";
const FG = "#FFFFFF";
const CARD = "#161616";
const DEPTH = "#2A2A2A";

// The niche loop from §10.1 of the strategy: one niche per week.
// Stop anchors sit on the curve (arc-length 2/27/50/73/99%).
const STOPS = [
  { label: "Luisteren", sub: "ma–do · oogsten, clusteren", x: "8.43%", y: "73.86%", up: false, end: false, align: "start" as const },
  { label: "Dossier", sub: "vrijdag · één pagina", x: "31.70%", y: "47.77%", up: true, end: false, align: "center" as const },
  { label: "Creative", sub: "ma angles · wo–do maken", x: "53.30%", y: "62.74%", up: false, end: false, align: "center" as const },
  { label: "Live", sub: "vrijdag · launchbatch", x: "74.70%", y: "59.01%", up: true, end: false, align: "center" as const },
  { label: "Uitslag", sub: "ma · presteerde én bereikte hij?", x: "92.71%", y: "17.02%", up: false, end: true, align: "end" as const },
];

const PATH_D = "M 60 350 C 140 300 240 210 350 210 S 470 330 560 330 S 780 160 840 70";
const VB_W = 900;
const VB_H = 460;
const SAMPLES = 400;

const monoCaption: React.CSSProperties = {
  fontFamily: "var(--font-mono-face), ui-monospace, monospace",
  textTransform: "uppercase",
  letterSpacing: "0.75px",
  fontSize: "11px",
  fontWeight: 500,
  color: "#FFFFFF6b",
  whiteSpace: "nowrap",
};

export default function ScrollPathDraw() {
  const rootRef = React.useRef<HTMLElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const lineRef = React.useRef<SVGPathElement>(null);
  const nodeRef = React.useRef<SVGCircleElement>(null);
  const stopRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  const [reduce, setReduce] = React.useState(false);

  React.useEffect(() => {
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(prefersReduce);

    const line = lineRef.current;
    const node = nodeRef.current;
    const root = rootRef.current;
    const stops = stopRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!line || !node || !root || stops.length === 0) return;

    let disposed = false;
    let cleanupInner: (() => void) | null = null;

    // All setup deferred until the section approaches: the 401
    // getPointAtLength samples below force SVG geometry on the main
    // thread (~400ms under a 4× CPU throttle at hydration — measured as
    // a TBT spike). Same approach-gating as ScrollFrames.
    const begin = () => {
      if (disposed) return;

    const total = line.getTotalLength();

    // Sample path for threshold detection
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i <= SAMPLES; i++) {
      points.push(line.getPointAtLength((i / SAMPLES) * total));
    }

    const thresholds = STOPS.map((stop) => {
      const x = (parseFloat(stop.x) / 100) * VB_W;
      const y = (parseFloat(stop.y) / 100) * VB_H;
      let best = 0;
      let bestD = Infinity;
      points.forEach((pt, i) => {
        const d = (pt.x - x) ** 2 + (pt.y - y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = i / SAMPLES;
        }
      });
      return best;
    });

    function render(p: number) {
      const clamped = Math.max(0, Math.min(1, p));
      line!.style.strokeDashoffset = String(total * (1 - clamped));

      const pt = line!.getPointAtLength(total * clamped);
      node!.setAttribute("cx", String(pt.x));
      node!.setAttribute("cy", String(pt.y));
      node!.style.opacity = clamped > 0.005 && clamped < 0.99 ? "1" : "0";

      stops.forEach((stop, i) => {
        stop.classList.toggle("spd-lit", clamped >= thresholds[i] - 0.01);
      });
    }

    // Prime the line as fully undrawn
    line.style.strokeDasharray = `${total} ${total}`;
    line.style.strokeDashoffset = String(total);

    if (prefersReduce) {
      render(1);
      return;
    }

    render(0);

    const state = { p: 0 };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trackRef.current!,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          gsap.to(state, {
            p: self.progress,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
            onUpdate: () => render(state.p),
          });
        },
      });
    }, rootRef);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    cleanupInner = () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
    };
    };

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver === "undefined") {
      begin();
    } else {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io?.disconnect();
            begin();
          }
        },
        { rootMargin: "150% 0px" },
      );
      io.observe(root);
    }

    return () => {
      disposed = true;
      io?.disconnect();
      cleanupInner?.();
    };
  }, []);

  return (
    <>
      <style>{`
        .spd-stop {
          opacity: 0.34;
          filter: saturate(0.4);
          transition:
            opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            filter  0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .spd-stop.spd-lit {
          opacity: 1;
          filter: saturate(1);
        }
        .spd-dot {
          transition:
            background    0.5s cubic-bezier(0.16, 1, 0.3, 1),
            border-color  0.5s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow    0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .spd-stop.spd-lit .spd-dot {
          background:   ${ACCENT_AMBER};
          border-color: ${ACCENT_AMBER};
          box-shadow: 0 0 0 5px rgba(252,242,211,0.2), 0 0 16px ${SPD_GLOW};
        }
        .spd-stop.spd-lit.spd-end .spd-dot {
          background:   ${ACCENT_SOLAR};
          border-color: ${ACCENT_SOLAR};
          box-shadow: 0 0 0 5px rgba(255,235,173,0.22), 0 0 16px rgba(255,235,173,0.55);
        }
        .spd-node {
          transition: opacity 0.35s ease;
        }
      `}</style>

      <section
        ref={rootRef}
        aria-label="De nichelus in vijf stappen: luisteren, dossier, creative, live, uitslag"
        className="font-sans"
        style={{ color: FG, background: BG }}
      >
        {/* Scroll runway — sticky stage inside (see header: pin fights Lenis) */}
        <div ref={trackRef} style={{ height: reduce ? "auto" : "150vh" }}>
          <div
            className={reduce ? "relative" : "sticky top-0"}
            style={{
              height: reduce ? "auto" : "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "clamp(1.25rem, 5vw, 4rem)",
              overflow: "hidden",
              background: BG,
            }}
          >
            <div style={{ maxWidth: "68rem", width: "100%", marginInline: "auto", marginBottom: "clamp(1.5rem, 4vh, 3rem)" }}>
              <div className="uppercase font-mono" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.75px", color: "#FFFFFF99", marginBottom: "0.9rem" }}>
                Het ENE ding
              </div>
              <h2
                className="m-0 font-sans max-[767px]:text-[32px]"
                style={{ fontSize: "clamp(34px, 4.4vw, 60px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-1.5px", maxWidth: "18em" }}
              >
                <span style={{ color: "#FFFFFF8c" }}>Elke week één niche,</span> van luisteren tot uitslag.
              </h2>
            </div>
            {/* Figure frame — same grammar as the schematic (FIG. 01–04) */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "min(68rem, calc(50vh * 900 / 460))",
                marginInline: "auto",
                border: "1.25px solid #FFFFFF2e",
                padding: "clamp(2.4rem, 4vw, 3.4rem) clamp(1rem, 3vw, 2.6rem)",
              }}
            >
              <span style={{ ...monoCaption, position: "absolute", top: "0.9rem", left: "1.1rem" }}>
                FIG. 05 · DE NICHELUS
              </span>
              <span
                style={{ ...monoCaption, position: "absolute", bottom: "0.9rem", left: "1.1rem" }}
                className="max-[479px]:hidden"
              >
                ÉÉN NICHE PER WEEK
              </span>
              <span
                style={{ ...monoCaption, position: "absolute", bottom: "0.9rem", right: "1.1rem" }}
                className="max-[479px]:hidden"
              >
                7–8 NICHES VÓÓR 1 JANUARI
              </span>

              {/* Viz — the coordinate system the SVG and the stops share */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "900 / 460",
                  overflow: "visible",
                }}
              >
                <svg
                  viewBox={`0 0 ${VB_W} ${VB_H}`}
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
                >
                  <defs>
                    <linearGradient id="spdStroke" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={ACCENT_AMBER} />
                      <stop offset="100%" stopColor={ACCENT_SOLAR} />
                    </linearGradient>
                    <filter id="spdGlow" x="-60%" y="-60%" width="220%" height="220%">
                      <feGaussianBlur stdDeviation="7" result="b" />
                      <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Ghost dotted route */}
                  <path
                    d={PATH_D}
                    fill="none"
                    stroke={FG}
                    strokeOpacity={0.14}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeDasharray="1 12"
                  />

                  {/* Animated drawn line */}
                  <path
                    ref={lineRef}
                    d={PATH_D}
                    fill="none"
                    stroke="url(#spdStroke)"
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ filter: `drop-shadow(0 0 6px ${SPD_GLOW})` }}
                  />

                  {/* Glowing node riding the tip */}
                  <circle
                    ref={nodeRef}
                    r={9}
                    fill={ACCENT_AMBER}
                    stroke={CARD}
                    strokeWidth={3}
                    filter="url(#spdGlow)"
                    className="spd-node"
                    style={{ opacity: 0 }}
                  />
                </svg>

                {/* Milestone stops — the five steps of the loop */}
                <ol style={{ position: "absolute", inset: 0, listStyle: "none", margin: 0, padding: 0 }}>
                  {STOPS.map((stop, i) => (
                    <li
                      key={stop.label}
                      ref={(el) => {
                        stopRefs.current[i] = el;
                      }}
                      className={`spd-stop${stop.end ? " spd-end" : ""}`}
                      style={{ position: "absolute", left: stop.x, top: stop.y }}
                    >
                      <span
                        className="spd-dot"
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          width: "0.9rem",
                          height: "0.9rem",
                          transform: "translate(-50%, -50%)",
                          borderRadius: "50%",
                          background: CARD,
                          border: `2px solid ${DEPTH}`,
                          boxShadow: "0 0 0 4px rgba(255,255,255,0.05)",
                          display: "block",
                        }}
                      />
                      <span
                        className="max-[640px]:hidden"
                        style={{
                          position: "absolute",
                          whiteSpace: "nowrap",
                          ...(stop.up
                            ? { bottom: "1.1rem", top: "auto" }
                            : { top: "1rem" }),
                          ...(stop.align === "center"
                            ? { left: 0, transform: "translateX(-50%)" }
                            : stop.align === "end"
                              ? { right: "-0.45rem" }
                              : { left: "-0.45rem" }),
                        }}
                      >
                        <span
                          className="font-mono uppercase block"
                          style={{
                            fontSize: "11px",
                            fontWeight: 500,
                            letterSpacing: "1px",
                            color: ACCENT_AMBER,
                            marginBottom: "0.2rem",
                            textAlign:
                              stop.align === "center" ? "center" : stop.align === "end" ? "right" : "left",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="font-sans block"
                          style={{
                            fontSize: "clamp(0.85rem, 0.6rem + 1vw, 1.2rem)",
                            fontWeight: 700,
                            lineHeight: 1.05,
                            letterSpacing: "-0.01em",
                            color: FG,
                          }}
                        >
                          {stop.label}
                        </span>
                        <span
                          className="font-mono block max-[640px]:hidden"
                          style={{
                            marginTop: "0.3rem",
                            fontSize: "10.5px",
                            letterSpacing: "0.3px",
                            color: "#FFFFFF80",
                            textAlign:
                              stop.align === "center" ? "center" : stop.align === "end" ? "right" : "left",
                          }}
                        >
                          {stop.sub}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <ol className="hidden max-[640px]:grid grid-cols-1 gap-2 m-0 mt-5 p-0 list-none w-full">
              {STOPS.map((stop, i) => (
                <li key={stop.label} className="flex items-baseline gap-3 border-b border-[#FFFFFF14] pb-2">
                  <span className="font-mono text-[11px]" style={{ color: ACCENT_AMBER }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-bold text-[16px]">{stop.label}</span>
                  <span className="ml-auto font-mono text-[10.5px] text-right" style={{ color: "#FFFFFF80" }}>{stop.sub}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
