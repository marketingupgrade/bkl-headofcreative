"use client";

/**
 * @component RolesGrid
 * @description Who does what from Monday (§13.3) and the weekly cadence
 *   (§13.1). Numbered rows in the kelvin-process-1 grammar: a hairline
 *   track that fills left to right on scroll, then each row rises in with
 *   a stagger (GSAP ScrollTrigger, play-once). Static under reduced motion.
 */

import * as React from "react";
import { gsap } from "./lib/gsap";

const ACCENT = "#FCF2D3";

const ROLES = [
  {
    role: "Social listener",
    tag: "nieuw · ± 2 dagen per week",
    change: "Levert elke vrijdag één dossier van één pagina. Belegd bij iemand die er al zit, met mij als begeleider op de eerste drie.",
  },
  {
    role: "Strategist",
    tag: "van bron naar filter",
    change: "Bedenkt niet langer alle doelgroepen en concepten. Kiest angles uit het dossier, schrijft de briefs, velt de verdicts, bewaakt het Board.",
  },
  {
    role: "Editors",
    tag: "krijgen zelfstandigheid",
    change: "Werken op elke winnaar een vaste iteratieladder af: nieuwe eerste drie seconden, andere opening, ander format. Ze weten zonder te wachten wat morgen te doen staat.",
  },
  {
    role: "Acquisition",
    tag: "aan tafel, niet als gast",
    change: "Zit bij ideation en op de nichelijst. Geeft elke maandag een verdict per creative én per niche, op één gedeeld scorebord.",
  },
];

const CADENCE = [
  { when: "Ma 09:30", what: "Verdicts" },
  { when: "Di 16:00", what: "Ideation, hele team + Acquisition" },
  { when: "Do 15:00", what: "Review tegen de brief" },
  { when: "Vr 11:00", what: "Launchbatch" },
  { when: "Vr 16:00", what: "Nieuw dossier" },
];

export default function RolesGrid() {
  const rootRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      gsap.fromTo(
        q(".rg-fill"),
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: q(".rg-list")[0], start: "top 80%", end: "bottom 60%", scrub: 0.6 } },
      );
      q(".rg-row").forEach((row) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "signature", scrollTrigger: { trigger: row, start: "top 85%", toggleActions: "play none none none" } },
        );
      });
      gsap.fromTo(
        q(".rg-slot"),
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "signature", stagger: 0.08, scrollTrigger: { trigger: q(".rg-cadence")[0], start: "top 85%", toggleActions: "play none none none" } },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative font-sans bg-[#0E0E0E] text-white py-40 max-[767px]:py-24">
      <div className="w-full max-w-[1440px] mx-auto px-8 max-[991px]:px-6 max-[767px]:px-5">
        <div className="uppercase font-mono text-xs font-medium tracking-[0.75px] text-[#FFFFFF99]">Rollen</div>
        <h2 className="m-0 mt-4 text-[64px] max-[991px]:text-5xl max-[767px]:text-[38px] font-bold leading-none tracking-[-2px] max-w-[16em]">
          <span className="text-[#FFFFFF8c]">Wie doet wat,</span> vanaf maandag.
        </h2>
        <p className="m-0 mt-5 text-lg text-[#FFFFFF99] max-w-[40rem]">
          Er komt één rol bij en er verandert één rol van inhoud. Niemand wordt vervangen, en er wordt in Q4 niemand aangenomen.
        </p>

        <div className="rg-list relative mt-16">
          <div className="absolute left-0 right-0 top-0 h-px bg-[#FFFFFF1a]">
            <div className="rg-fill h-px origin-left" style={{ background: ACCENT }} />
          </div>
          {ROLES.map((r, i) => (
            <div key={r.role} className="rg-row grid grid-cols-[4rem_minmax(12rem,1fr)_2fr] max-[991px]:grid-cols-[3rem_1fr] gap-x-6 gap-y-3 py-8 border-b border-[#FFFFFF1a]">
              <span className="font-mono text-sm pt-2" style={{ color: ACCENT }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="text-[28px] max-[767px]:text-2xl font-bold leading-tight tracking-[-0.5px]">{r.role}</div>
                <div className="mt-2 font-mono uppercase text-[11px] tracking-[0.75px]" style={{ color: ACCENT }}>
                  {r.tag}
                </div>
              </div>
              <p className="m-0 text-[19px] max-[767px]:text-[17px] leading-relaxed text-[#FFFFFFb3] max-[991px]:col-start-2">{r.change}</p>
            </div>
          ))}
        </div>

        <div className="rg-cadence mt-16">
          <div className="uppercase font-mono text-xs font-medium tracking-[0.75px] text-[#FFFFFF99] mb-5">De week · vier gezamenlijke momenten (samen 2 uur 45), plus het dossier</div>
          <div className="grid grid-cols-5 max-[991px]:grid-cols-2 max-[479px]:grid-cols-1 gap-3">
            {CADENCE.map((c) => (
              <div key={c.when} className="rg-slot rounded-xl p-5 border border-[#FFFFFF1a] bg-[#FFFFFF08]">
                <div className="font-mono text-sm" style={{ color: ACCENT }}>{c.when}</div>
                <div className="mt-2 text-[17px] leading-snug">{c.what}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
