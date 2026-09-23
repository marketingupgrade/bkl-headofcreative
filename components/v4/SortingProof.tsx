"use client";

/**
 * @component SortingProof
 * @description "Creative ís de targeting", measured on Buckley's ads and
 *   three competitor ads (EU/UK transparency data, Meta Ad Library, 23 Sep
 *   2026). One measure: women's share of estimated EU reach per ad, every
 *   ad targeted at gender "All". Buckley in cream, competitors in muted
 *   white, and every row names its brand so identity is never colour-only. Bars grow on a scrubbed ScrollTrigger; hover or focus a
 *   row for the full breakdown. Then the language pattern as two stat
 *   tiles, the caveats, and the experiment that would make it causal.
 */

import * as React from "react";
import { gsap } from "./lib/gsap";

const ACCENT = "#FCF2D3";
const MAX = 100; // axis max, % women

const ADS = [
  { id: "Beltisse", own: false, text: "“Warum tragen wir noch Gürtel mit Löchern?”", when: "damesriemen · DE, AT", women: 92.0 },
  { id: "Nordform", own: false, text: "Cadeau: “…manden der er umulig at finde en gave til”", when: "DK · mei 2026", women: 48.4 },
  { id: "Nordform", own: false, text: "Kantoor: “Det perfekte bælte til kontoret”", when: "DK · mei 2026", women: 32.2 },
  { id: "Buckley A1", own: true, text: "“Tired of belts…”", when: "12 EU-landen · sep 2025, door het cadeauseizoen", women: 15.9 },
  { id: "Buckley A2", own: true, text: "“Tired of belts…”", when: "12 EU-landen · mei 2026", women: 11.8 },
  { id: "Buckley A3", own: true, text: "“Still wearing the same beat-up belt… Most men keep old belts…”", when: "15 EU-landen · sep 2026", women: 7.1 },
];

export default function SortingProof() {
  const rootRef = React.useRef<HTMLElement>(null);
  const [hover, setHover] = React.useState<string | null>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      gsap.fromTo(
        q(".sp-bar"),
        { scaleX: 0 },
        { scaleX: 1, ease: "signature", stagger: 0.25, scrollTrigger: { trigger: q(".sp-chart")[0], start: "top 85%", end: "bottom 75%", scrub: 0.6 } },
      );
      gsap.fromTo(
        q(".sp-tile"),
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "signature", stagger: 0.15, scrollTrigger: { trigger: q(".sp-tiles")[0], start: "top 85%", toggleActions: "play none none none" } },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative font-sans bg-[#0E0E0E] text-white py-40 max-[767px]:py-24">
      <div className="w-full max-w-[1200px] mx-auto px-8 max-[991px]:px-6 max-[767px]:px-5">
        <div className="uppercase font-mono text-xs font-medium tracking-[0.75px] text-[#FFFFFF99]">Gemeten · jullie ads en die van concurrenten</div>
        <h2 className="m-0 mt-4 text-[56px] max-[991px]:text-5xl max-[767px]:text-[34px] font-bold leading-[1.02] tracking-[-1.5px] max-w-[18em]">
          <span className="text-[#FFFFFF8c]">Iedereen target op ‘All’.</span> Van 7% tot 92% vrouwen.
        </h2>

        <figure className="sp-chart m-0 mt-14">
          <figcaption className="font-mono uppercase text-[11px] tracking-[0.75px] text-[#FFFFFF99] mb-6">
            Vrouwen als aandeel van het geschatte EU-bereik · elke ad getarget op gender All · crème = Buckley
          </figcaption>
          <div className="relative">
            {/* recessive grid */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[16rem] right-[4rem] max-[767px]:hidden">
              {[0, 25, 50, 75, 100].map((t) => (
                <div key={t} className="absolute inset-y-0 border-l border-[#FFFFFF14]" style={{ left: `${(t / MAX) * 100}%` }}>
                  <span className="absolute -bottom-6 -translate-x-1/2 font-mono text-[10px] text-[#FFFFFF66]">{t}%</span>
                </div>
              ))}
            </div>
            <ul className="relative m-0 p-0 list-none flex flex-col gap-5">
              {ADS.map((a) => (
                <li
                  key={a.text}
                  tabIndex={0}
                  onMouseEnter={() => setHover(a.text)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(a.text)}
                  onBlur={() => setHover(null)}
                  className="relative grid grid-cols-[16rem_1fr_4rem] max-[767px]:grid-cols-[1fr_3.5rem] items-center gap-y-2 outline-none"
                >
                  <div className="pr-6 max-[767px]:col-span-2">
                    <div className="text-[15px] leading-snug">{a.text}</div>
                    <div className="font-mono text-[10.5px] mt-1" style={{ color: a.own ? ACCENT : "#FFFFFF80" }}>{a.id} · {a.when}</div>
                  </div>
                  <div className="h-7 relative">
                    <div
                      className="sp-bar absolute left-0 top-0 h-full origin-left"
                      style={{ width: `${(a.women / MAX) * 100}%`, background: a.own ? ACCENT : "#FFFFFF59", borderRadius: "0 4px 4px 0", opacity: hover && hover !== a.text ? 0.45 : 1, transition: "opacity .2s" }}
                    />
                  </div>
                  <div className="text-right font-mono text-[15px] tabular-nums">{a.women.toLocaleString("nl-NL")}%</div>
                  {hover === a.text && (
                    <div role="tooltip" className="absolute right-0 -top-2 -translate-y-full z-10 rounded-lg border border-[#FFFFFF26] bg-[#161616] px-4 py-3 text-[13px] leading-relaxed shadow-xl">
                      <div className="font-mono text-[10.5px] uppercase tracking-[0.5px] text-[#FFFFFF99]">{a.id} · {a.when}</div>
                      <div>Vrouwen {a.women.toLocaleString("nl-NL")}% van het geschatte bereik</div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </figure>

        <p className="m-0 mt-14 text-[17px] leading-relaxed text-[#FFFFFFb3] max-w-[46rem]">
          De schoonste vergelijking is het Nordform-paar: zelfde merk, land, maand en targeting, en cadeaucopy haalt 16 procentpunt meer
          vrouwen dan kantoorcopy. Buckley blijft op 7–16%.{" "}
          <span className="text-white">Geen experiment:</span> beelden, periodes en landensets verschillen, en de Nordform-cadeau-ad liep
          waarschijnlijk richting Vaderdag. Wel de meetlat voor Q4:{" "}
          <span className="accent">haalt een Buckley-cadeaucreative de 30–50% van Nordform?</span>
        </p>

        <div className="sp-tiles mt-16 grid grid-cols-3 max-[991px]:grid-cols-1 gap-4">
          <div className="sp-tile rounded-xl border border-[#FFFFFF1a] p-6">
            <div className="font-mono uppercase text-[11px] tracking-[0.75px] text-[#FFFFFF99]">DE · FR · ES · IT · PL, deel van de getargete bevolking</div>
            <div className="mt-3 text-[48px] font-bold leading-none tracking-[-1px]">77–82%</div>
          </div>
          <div className="sp-tile rounded-xl border p-6" style={{ borderColor: `${ACCENT}66` }}>
            <div className="font-mono uppercase text-[11px] tracking-[0.75px]" style={{ color: ACCENT }}>…en hun deel van het bereik</div>
            <div className="mt-3 text-[48px] font-bold leading-none tracking-[-1px]">40–47%</div>
          </div>
          <div className="sp-tile rounded-xl border border-[#FFFFFF1a] p-6">
            <div className="font-mono uppercase text-[11px] tracking-[0.75px] text-[#FFFFFF99]">Actieve teksten in het Engels</div>
            <div className="mt-3 text-[48px] font-bold leading-none tracking-[-1px]">444 / 444</div>
          </div>
        </div>
        <p className="m-0 mt-5 text-[17px] leading-relaxed text-[#FFFFFFb3] max-w-[46rem]">
          Taal, thuismarkt of veilingprijs: met deze data niet te scheiden. Is het niet zo gestuurd, dan is{" "}
          <span className="accent">taal een nichedimensie</span>, en een Duitstalige lijn een tier 2-test.
        </p>

        <div className="mt-14 rounded-xl border border-[#FFFFFF1a] bg-[#FFFFFF08] p-6">
          <div className="font-mono uppercase text-[11px] tracking-[0.75px]" style={{ color: ACCENT }}>Het experiment dat dit causaal maakt</div>
          <p className="m-0 mt-3 text-[18px] leading-relaxed max-w-[52rem]">
            Dezelfde video met twee teksten, generiek (“Tired of belts…”) en cadeau (“Gift him…”), in dezelfde week en dezelfde landen. De
            drempel voor ‘gesorteerd’ leggen we vooraf vast. Na 7 dagen het vrouwenaandeel uit de Ad Library naast CVR en AOV uit Ads Manager.
          </p>
        </div>
      </div>
    </section>
  );
}
