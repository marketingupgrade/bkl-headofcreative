"use client";

/**
 * @component SchematicExplainer
 * @description How "creative is de targeting" works, in four figures.
 *   Kelvin "Scroll-Driven SVG Schematic Explainer" (kelvin-value-features-14):
 *   a sticky two-column pin, a framed line drawing on the left whose FIG
 *   groups crossfade (opacity 0.6s) in step with the copy on the right,
 *   driven by plain scroll progress. Copy from §1, §6.3 and §13.2 of the
 *   Q4 strategy.
 */

import * as React from "react";

const ACCENT = "#FCF2D3";
const FG = "#FFFFFF";

const steps = [
  {
    label: "01 · Breed",
    heading: "Draai breed.",
    copy: "Geen interessetargeting, geen smalle lookalikes. Smalle sets betekenen minder data, hogere CPM's en frequentie die in twee weken doorschiet.",
  },
  {
    label: "02 · De eerste drie seconden",
    heading: "De opening doet de sortering.",
    copy: "De eerste drie seconden benoemen de niche. Wie zich herkent kijkt door, de rest scrollt verder. Dat is geen verspilling, dat is sortering die gratis gebeurt.",
  },
  {
    label: "03 · De veiling",
    heading: "Het systeem brengt hem naar wie reageert.",
    copy: "Relevante creative krijgt betere signalen, en die signalen beloont de veiling. Nichecreative is dus niet alleen aardiger, hij is waarschijnlijk goedkoper. Hoeveel: dat is meting één in week 1.",
  },
  {
    label: "04 · De uitslag",
    heading: "Meet per niche, niet per advertentie.",
    copy: "De niche staat in de naam van elke advertentie. Anders weet je in januari welke advertentie werkte, maar niet welke niche.",
  },
];

// A 9×9 field of people, and three niches inside it (deterministic).
const GRID = Array.from({ length: 81 }, (_, i) => ({ x: 50 + (i % 9) * 25, y: 48 + Math.floor(i / 9) * 25 }));
const HIT = new Set([2, 3, 11, 12, 21, 16, 25, 26, 34, 48, 57, 58, 66, 67, 75]);
const CLUSTERS = [
  { cx: 92, cy: 100, n: 6, label: "CADEAU" },
  { cx: 214, cy: 112, n: 5, label: "EDC" },
  { cx: 150, cy: 222, n: 7, label: "MAAT" },
];
const TOKENS = ["merk", "niche", "coredrive", "angle", "format", "hook-id", "versie"];

export default function SchematicExplainer() {
  const outerRef = React.useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [reduce, setReduce] = React.useState(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduce(true);
      return;
    }
    const handleScroll = () => {
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / totalScroll));
      setActiveStep(Math.min(3, Math.floor(progress * 4)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mono = { fontFamily: "var(--font-mono-face), ui-monospace, monospace" } as const;
  const small = { ...mono, letterSpacing: "0.6px", fill: "#FFFFFF6b", fontSize: "7.5px", fontWeight: 500 };
  const tag = { ...mono, letterSpacing: "0.8px", fill: ACCENT, fontSize: "11px", fontWeight: 500 };

  const fig = (i: number): React.CSSProperties => ({
    opacity: activeStep === i ? 1 : 0,
    transition: "opacity 0.6s ease",
  });

  // Reduced motion: no scroll-driven crossfade, so every step stays readable.
  if (reduce) {
    return (
      <section className="font-sans px-6 py-32" style={{ backgroundColor: "#0E0E0E", color: FG }}>
        <div className="mx-auto max-w-[1100px] grid gap-12 md:grid-cols-2">
          {steps.map((step) => (
            <div key={step.label} className="flex flex-col gap-3">
              <div className="uppercase font-mono" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.75px", color: "#FFFFFF99" }}>
                {step.label}
              </div>
              <h2 className="m-0" style={{ fontSize: "34px", fontWeight: 700, lineHeight: 1.05 }}>{step.heading}</h2>
              <p className="m-0" style={{ fontSize: "18px", lineHeight: 1.5, color: "#FFFFFF99" }}>{step.copy}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative font-sans" style={{ backgroundColor: "#0E0E0E", color: FG, fontSize: "17px", lineHeight: 1.5 }}>
      <div ref={outerRef} className="relative h-[260vh] max-[767px]:h-[220vh]">
        <div className="sticky top-0 overflow-hidden grid gap-16 max-[991px]:gap-8 max-[991px]:content-center items-center max-w-[1440px] mx-auto px-8 max-[991px]:px-6 max-[767px]:px-5 h-screen [grid-template-columns:0.9fr_1.1fr] max-[991px]:[grid-template-columns:1fr]">
          <div className="absolute top-24 max-[767px]:top-16 left-8 max-[991px]:left-6 max-[767px]:left-5 inline-flex flex-row items-center gap-2">
            <div style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: FG }} />
            <div className="uppercase font-mono" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.75px", lineHeight: 1.2, color: "#FFFFFF99" }}>
              Het mechanisme
            </div>
          </div>

          <div className="flex justify-center items-center h-[72vh] max-[991px]:h-[40vh] max-[767px]:h-[32vh] relative">
            <svg aria-hidden="true" fill="none" viewBox="0 0 300 340" className="w-auto h-full overflow-visible">
              <path d="M10 10 L290 10 L290 330 L10 330 Z" style={{ fill: "none", stroke: "#FFFFFF2e", strokeWidth: "1.25px" }} />
              <text y="318" x="20" style={small}>Q4 · 2026</text>
              <text textAnchor="end" y="318" x="280" style={small}>BUCKLEY · NICHELUS</text>

              {/* FIG. 01 — one broad audience */}
              <g style={fig(0)}>
                {GRID.map((d, i) => (
                  <circle key={i} cx={d.x} cy={d.y} r="3.4" style={{ fill: "none", stroke: "#FFFFFFb3", strokeWidth: "1px" }} />
                ))}
                <text y="27" x="20" style={small}>FIG. 01 · BREED PUBLIEK</text>
              </g>

              {/* FIG. 02 — the opening sorts */}
              <g style={fig(1)}>
                {GRID.map((d, i) =>
                  HIT.has(i) ? (
                    <circle key={i} cx={d.x} cy={d.y} r="4" style={{ fill: ACCENT }} />
                  ) : (
                    <circle key={i} cx={d.x} cy={d.y} r="3" style={{ fill: "none", stroke: "#FFFFFF33", strokeWidth: "1px" }} />
                  ),
                )}
                <path d="M40 292 L40 298 L260 298 L260 292" style={{ stroke: ACCENT, strokeWidth: "1.25px" }} />
                <text textAnchor="middle" x="150" y="290" style={tag}>0–3 S · DE HOOK</text>
                <text y="27" x="20" style={small}>FIG. 02 · SORTERING</text>
              </g>

              {/* FIG. 03 — the auction finds the clusters */}
              <g style={fig(2)}>
                {GRID.map((d, i) => (
                  <circle key={i} cx={d.x} cy={d.y} r="2.2" style={{ fill: "#FFFFFF1f" }} />
                ))}
                {CLUSTERS.map((c) => (
                  <g key={c.label}>
                    <circle cx={c.cx} cy={c.cy} r="30" style={{ stroke: ACCENT, strokeWidth: "1.1px", strokeDasharray: "4 4" }} />
                    {Array.from({ length: c.n }, (_, k) => {
                      const a = (k / c.n) * Math.PI * 2;
                      const r = k % 2 ? 15 : 9;
                      return <circle key={k} cx={c.cx + Math.cos(a) * r} cy={c.cy + Math.sin(a) * r} r="4" style={{ fill: ACCENT }} />;
                    })}
                    <text textAnchor="middle" x={c.cx} y={c.cy + 46} style={tag}>{c.label}</text>
                  </g>
                ))}
                <text y="27" x="20" style={small}>FIG. 03 · DE VEILING SORTEERT</text>
              </g>

              {/* FIG. 04 — the naming convention carries the niche */}
              <g style={fig(3)}>
                {TOKENS.map((t, i) => (
                  <g key={t}>
                    <rect x="46" y={52 + i * 30} width="120" height="22" rx="3" style={{ stroke: t === "niche" ? ACCENT : "#FFFFFF4d", strokeWidth: "1.1px", fill: t === "niche" ? "#FCF2D31a" : "none" }} />
                    <text x="56" y={67 + i * 30} style={{ ...mono, fontSize: "10px", letterSpacing: "0.6px", fill: t === "niche" ? ACCENT : "#FFFFFFb3" }}>
                      [{t}]{i < TOKENS.length - 1 ? "_" : ""}
                    </text>
                  </g>
                ))}
                <path d="M166 93 L196 93" style={{ stroke: ACCENT, strokeWidth: "1.25px" }} />
                <rect x="196" y="72" width="64" height="112" rx="3" style={{ stroke: ACCENT, strokeWidth: "1.1px" }} />
                {["SPEND", "ORDERS", "AOV", "CONTRIB."].map((r, i) => (
                  <text key={r} x="204" y={94 + i * 24} style={{ ...mono, fontSize: "8.5px", letterSpacing: "0.6px", fill: ACCENT }}>
                    {r}
                  </text>
                ))}
                <text textAnchor="middle" x="228" y="200" style={{ ...small, fill: ACCENT }}>NICHE-P&amp;L</text>
                <text y="27" x="20" style={small}>FIG. 04 · NAAMGEVING</text>
              </g>
            </svg>
          </div>

          <div className="relative grid">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex flex-col gap-4"
                style={{
                  gridArea: "1 / 1",
                  opacity: activeStep === i ? 1 : 0,
                  transition: "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                  pointerEvents: activeStep === i ? "auto" : "none",
                }}
              >
                <div className="uppercase font-mono" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.75px", lineHeight: 1.2, color: "#FFFFFF99" }}>
                  {step.label}
                </div>
                <h2
                  className="m-0 font-sans max-[991px]:text-[44px] max-[991px]:tracking-[-1.2px] max-[767px]:text-[34px] max-[767px]:tracking-[-0.8px] max-[479px]:text-[28px]"
                  style={{ fontSize: "60px", fontWeight: 700, letterSpacing: "-1.6px", lineHeight: 1.02, maxWidth: "12em", color: FG }}
                >
                  {step.heading}
                </h2>
                <p className="m-0 max-[767px]:text-[17px]" style={{ fontSize: "20px", fontWeight: 400, lineHeight: 1.5, color: "#FFFFFF99", maxWidth: "26em" }}>
                  {step.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
