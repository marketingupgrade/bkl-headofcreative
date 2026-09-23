"use client";

/**
 * @component HookLayer
 * @description "De niche stopt na drie seconden." The niche hooks Buckley
 *   already runs in the visual layer arrive one by one; then connectors
 *   draw down into a single generic bar (same copy, same headline, same
 *   landing page). Pinned stage with one scrubbed GSAP timeline, entrances
 *   on the kit's "signature" ease; connectors grow down from the hooks
 *   (scaleY). Static under 992px or reduced motion.
 *   Source: Meta Ad Library analysis, 23 Sep 2026.
 */

import * as React from "react";
import { gsap } from "./lib/gsap";

const ACCENT = "#FCF2D3";

const HOOKS = [
  { hook: "Is it actually plus-size friendly?", niche: "Plus-size", meta: "sinds 18 mei 2026 · 22 ads" },
  { hook: "THE ULTIMATE GIFT", niche: "Cadeau", meta: "sinds 5 aug 2026 · 41 ads" },
  { hook: "100% VEGAN", niche: "Vegan", meta: "visual" },
  { hook: "Your belt belongs in the bin", niche: "Vergelijking", meta: "visual" },
  { hook: "What's that hole-less belt everyone's talking about?", niche: "Native · zoekbalk", meta: "visual" },
  { hook: "…now in a rugged outdoor build", niche: "Vakman en buitenmens", meta: "rang #4 en #9" },
];

export default function HookLayer() {
  const rootRef = React.useRef<HTMLElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    setPinned(!(window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 992));
  }, []);

  React.useEffect(() => {
    if (!pinned) return;
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      gsap.set(q(".hl-funnel"), { scaleY: 0, autoAlpha: 0, transformOrigin: "50% 0%" });
      gsap.set(q(".hl-hook"), { autoAlpha: 0, y: 24 });
      gsap.set([q(".hl-bar"), q(".hl-after")], { autoAlpha: 0, y: 16 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: track, start: "top top", end: "bottom bottom", scrub: 0.8 } });
      tl.to(q(".hl-hook"), { autoAlpha: 1, y: 0, ease: "signature", duration: 0.5, stagger: 0.3 });
      tl.to(q(".hl-funnel"), { scaleY: 1, autoAlpha: 1, ease: "power2.inOut", duration: 1 }, "+=0.2");
      tl.to(q(".hl-bar"), { autoAlpha: 1, y: 0, ease: "signature", duration: 0.5 }, "-=0.2");
      tl.to(q(".hl-hook"), { opacity: 0.5, duration: 0.5 }, "<");
      tl.to(q(".hl-after"), { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.6 });
      tl.to({}, { duration: 0.8 });
    }, root);
    return () => ctx.revert();
  }, [pinned]);

  const figure = (
    <div className="w-full max-w-[1200px] mx-auto px-8 max-[991px]:px-6 max-[767px]:px-5">
      <div className="uppercase font-mono" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.75px", color: "#FFFFFF99" }}>
        De hooklaag · de eerste drie seconden
      </div>
      <h2
        className="m-0 mt-4 font-sans max-[767px]:text-[34px]"
        style={{ fontSize: "clamp(34px, 4vw, 56px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-1.5px", maxWidth: "20em" }}
      >
        <span style={{ color: "#FFFFFF8c" }}>Jullie doen al aan niches.</span> In de eerste drie seconden.
      </h2>

      <div className="mt-10 grid grid-cols-3 max-[991px]:grid-cols-2 max-[479px]:grid-cols-1 gap-3">
        {HOOKS.map((h) => (
          <div key={h.hook} className="hl-hook rounded-xl p-4 border" style={{ borderColor: `${ACCENT}66`, background: "#FCF2D30d" }}>
            <div className="font-mono uppercase" style={{ fontSize: "10.5px", letterSpacing: "0.75px", color: ACCENT }}>
              {h.niche}
            </div>
            <div className="mt-2 font-serif italic" style={{ fontSize: "20px", lineHeight: 1.2 }}>
              “{h.hook}”
            </div>
            <div className="mt-2 font-mono" style={{ fontSize: "10.5px", color: "#FFFFFF80" }}>
              {h.meta}
            </div>
          </div>
        ))}
      </div>

      {pinned && (
        <svg aria-hidden="true" viewBox="0 0 120 30" preserveAspectRatio="none" className="hl-funnel block w-full" style={{ height: "9vh" }}>
          {[20, 60, 100].map((x) => (
            <path key={x} className="hl-line" d={`M${x} 0 C ${x} 15, 60 15, 60 30`} fill="none" stroke={ACCENT} strokeOpacity="0.55" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
      )}

      <div className={`hl-bar rounded-xl px-6 py-5 border border-[#FFFFFF26] bg-[#FFFFFF0a] flex flex-wrap items-center justify-between gap-3 ${pinned ? "" : "mt-6"}`}>
        <span className="font-mono uppercase" style={{ fontSize: "11px", letterSpacing: "0.75px", color: "#FFFFFF99" }}>
          Daarna, voor iedereen
        </span>
        <span style={{ fontSize: "clamp(1rem, 0.8rem + 0.7vw, 1.35rem)" }}>
          “Tired of belts…” · dezelfde headline · dezelfde landingspagina
        </span>
      </div>

      <p className="hl-after m-0 mt-8" style={{ fontSize: "clamp(1.2rem, 1rem + 1vw, 1.8rem)", lineHeight: 1.3, maxWidth: "38ch" }}>
        Het team heeft de juiste reflexen. <span className="accent">De niche wordt alleen niet doorgetrokken, en niet apart gemeten.</span>
      </p>
      <p className="m-0 mt-3 font-mono uppercase" style={{ fontSize: "11px", letterSpacing: "0.75px", color: "#FFFFFF66" }}>
        Cadeau draaide al als seizoenscampagne, sep 2025 – jan 2026 · Meta Ad Library, 23 sep 2026
      </p>
    </div>
  );

  return (
    <section ref={rootRef} className="relative font-sans" style={{ backgroundColor: "#0E0E0E", color: "#FFFFFF" }} aria-label="De nichehooks die al draaien">
      {pinned ? (
        <div ref={trackRef} className="relative" style={{ height: "180vh" }}>
          <div className="sticky top-0 h-screen overflow-hidden flex items-center">{figure}</div>
        </div>
      ) : (
        <div className="py-28 max-[767px]:py-20">{figure}</div>
      )}
    </section>
  );
}
