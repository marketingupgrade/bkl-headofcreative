"use client";

/**
 * @component TestingTools
 * @description Testing, learning and tools (§12, §13.4). The five-step
 *   funnel ladder rises as a staircase on a scrubbed ScrollTrigger (each
 *   step y 60 → 0, stagger, scrub 0.6), then verdicts, the Learning Log
 *   rule and a tools strip. Static under reduced motion.
 */

import * as React from "react";
import { gsap } from "./lib/gsap";

const ACCENT = "#FCF2D3";

const STEPS = [
  { name: "Hook rate", measure: "3s-views ÷ impressies", fix: "De opening werkt niet. Repareer het frame, niet het aanbod." },
  { name: "Hold rate", measure: "thruplay ÷ 3s-views", fix: "De hook beloofde iets dat de rest niet waarmaakt." },
  { name: "CTR", measure: "outbound clicks ÷ impressies", fix: "Ze snappen het en willen het niet, of de vraag komt te vroeg." },
  { name: "LP-conversie", measure: "aansluiting advertentie ↔ pagina", fix: "De advertentie verkocht iets anders dan de pagina." },
  { name: "AOV", measure: "het bundelargument", fix: "De 3-pack is een aanbieding en geen reden." },
];

const TOOLS = [
  "Meta Ad Library",
  "Reacties onder de eigen advertenties",
  "7.994 Trustpilot-reviews, helpdesk, retourredenen",
  "Shopify-data per niche",
  "Hooguit één betaalde tool, na week 3",
  "AI smal: clusteren en varianten, nooit concepten verzinnen",
];

export default function TestingTools() {
  const rootRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      gsap.fromTo(
        q(".tt-step"),
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          ease: "signature",
          stagger: 0.2,
          scrollTrigger: { trigger: q(".tt-ladder")[0], start: "top 85%", end: "bottom 55%", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        q(".tt-verdict"),
        { autoAlpha: 0, scale: 0.92 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.12, scrollTrigger: { trigger: q(".tt-verdicts")[0], start: "top 85%", toggleActions: "play none none none" } },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative font-sans bg-[#0E0E0E] text-white py-40 max-[767px]:py-24 overflow-x-clip">
      <style>{`
        @keyframes tt-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .tt-track { animation: tt-marquee 40s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .tt-track { animation: none; } }
      `}</style>
      <div className="w-full max-w-[1440px] mx-auto px-8 max-[991px]:px-6 max-[767px]:px-5">
        <div className="uppercase font-mono text-xs font-medium tracking-[0.75px] text-[#FFFFFF99]">Testen en leren</div>
        <h2 className="m-0 mt-4 text-[64px] max-[991px]:text-5xl max-[767px]:text-[36px] font-bold leading-none tracking-[-2px] max-w-[18em]">
          <span className="text-[#FFFFFF8c]">Niet ‘het werkte niet’,</span> maar ‘welke trede’.
        </h2>

        <ol className="tt-ladder m-0 p-0 list-none mt-16 grid grid-cols-5 max-[991px]:grid-cols-1 gap-3 items-end">
          {STEPS.map((s, i) => (
            <li
              key={s.name}
              className="tt-step rounded-xl p-6 border border-[#FFFFFF1a] bg-[#FFFFFF08] flex flex-col gap-2 max-[991px]:!min-h-0"
              style={{ minHeight: `${11 + i * 3}rem` }}
            >
              <span className="font-mono text-xs" style={{ color: ACCENT }}>
                Trede {i + 1}
              </span>
              <span className="text-2xl font-bold tracking-[-0.5px]">{s.name}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.5px] text-[#FFFFFF80]">{s.measure}</span>
              <span className="mt-auto text-[15px] leading-snug text-[#FFFFFFb3]">{s.fix}</span>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid grid-cols-2 max-[991px]:grid-cols-1 gap-12">
          <div>
            <div className="uppercase font-mono text-xs font-medium tracking-[0.75px] text-[#FFFFFF99] mb-4">Drie uitslagen per creative</div>
            <div className="tt-verdicts flex flex-wrap gap-3">
              {["Promote", "Iterate", "Kill"].map((v) => (
                <span key={v} className="tt-verdict rounded-full px-5 py-2.5 font-bold text-lg" style={{ background: ACCENT, color: "#0E0E0E" }}>
                  {v}
                </span>
              ))}
            </div>
            <p className="m-0 mt-5 text-[17px] leading-relaxed text-[#FFFFFFb3] max-w-[34rem]">
              Drempels leggen we in week 1 met Acquisition vast op jullie volumes, en daarna schuiven ze niet meer. Testbudget komt uit een
              eigen pot, in de orde van 15 tot 20% van de spend, behalve in de BFCM-week. Een niche promoveert pas na twee
              onafhankelijke creative-lijnen: één winnaar bewijst een advertentie, twee bewijzen een niche.
            </p>
          </div>
          <div>
            <div className="uppercase font-mono text-xs font-medium tracking-[0.75px] text-[#FFFFFF99] mb-4">Elke kill krijgt één regel in het Learning Log</div>
            <div className="rounded-xl p-6 border border-[#FFFFFF1a]">
              <div className="font-mono text-[11px] uppercase tracking-[0.75px] text-[#FFFFFF66]">Waarneming · veroudert</div>
              <p className="m-0 mt-2 text-lg text-[#FFFFFF80] line-through decoration-[#FFFFFF40]">Video 14 deed het goed.</p>
              <div className="mt-5 font-mono text-[11px] uppercase tracking-[0.75px]" style={{ color: ACCENT }}>Bewering · reist mee naar het volgende merk</div>
              <p className="m-0 mt-2 text-lg leading-snug">
                Bij koud verkeer verslaat een problem-first opening een product-first opening op hook rate. Vijf keer getoetst, vier
                keer bevestigd, één tegenvoorbeeld bij de outdoor-niche.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="w-full max-w-[1440px] mx-auto px-8 max-[991px]:px-6 max-[767px]:px-5 mb-5">
          <div className="uppercase font-mono text-xs font-medium tracking-[0.75px] text-[#FFFFFF99]">Gereedschap · bijna niets nieuws, want elke migratie kost twee weken</div>
        </div>
        <div className="relative overflow-hidden">
          <div className="tt-track flex w-max gap-3">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex gap-3" aria-hidden={copy > 0}>
                {TOOLS.map((t) => (
                  <span key={t} className="flex-none rounded-full border border-[#FCF2D366] px-5 py-3 text-[16px] whitespace-nowrap">
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[12vw]" style={{ background: "linear-gradient(90deg,#0E0E0E,#0E0E0E00)" }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[12vw]" style={{ background: "linear-gradient(270deg,#0E0E0E,#0E0E0E00)" }} />
        </div>
      </div>
    </section>
  );
}
