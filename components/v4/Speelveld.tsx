"use client";

/**
 * @component Speelveld
 * @description The competitive field (competitor analysis, 23 Sep 2026).
 *   Three beats: a price axis where brands slide into place on a scrubbed
 *   ScrollTrigger (Buckley between the clones and the brand players), the
 *   niches that are already taken, and the angle matrix with Buckley's
 *   column highlighted and the trust-block gaps flagged; rows reveal on
 *   scroll. Prices and claims are the brands' own, unverified.
 */

import * as React from "react";
import { gsap } from "./lib/gsap";

const ACCENT = "#FCF2D3";
const MIN = 25;
const MAX = 75;

const PRICES = [
  { brand: "Biscomi", price: 29.95, label: "€29,95", note: "40% korting", up: true },
  { brand: "SlideBelts", price: 31.5, label: "$29–39", note: "12 mnd garantie", up: false },
  { brand: "Buckle UP", price: 34.95, label: "€34,95", note: "2+1 gratis", up: true },
  { brand: "Buckley", price: 39.95, label: "€39,95", note: "“van €79,95” · 100 dagen retour · geen garantie", up: false, own: true },
  { brand: "Anson", price: 46, label: "vanaf $49,99", note: "levenslang (VS)", up: true },
  { brand: "Nordform", price: 69.52, label: "€69,52", note: "levenslange garantie", up: false },
];

const TAKEN = [
  { niche: "Afvallen", who: "Anson", where: "VS · copy + creator" },
  { niche: "Beroep en situatie, in het Nederlands", who: "Biscomi", where: "dienst, buitenwerk, auto" },
  { niche: "Kantoor en cadeau", who: "Nordform", where: "vier talen" },
  { niche: "Vrouwen", who: "Beltisse", where: "Duitsland, 92% vrouw" },
  { niche: "Plus-size", who: "Buckle UP", where: "XS t/m 3XL, NL" },
  { niche: "Western", who: "SlideBelts", where: "nieuw op 22 sep" },
];

const BRANDS = ["Buckley", "Nordform", "Anson", "SlideBelts", "Beltisse", "Biscomi", "Buckle UP"];
type Cell = "" | "●" | "◐" | "?";
const MATRIX: { angle: string; cells: Cell[]; gap?: boolean }[] = [
  { angle: "Pijn: gaatjes, versleten riem", cells: ["●", "●", "●", "●", "●", "●", "●"] },
  { angle: "Veranderende taille of gewicht", cells: ["●", "●", "●", "", "", "◐", ""] },
  { angle: "Cadeau", cells: ["●", "●", "◐", "", "◐", "", "◐"] },
  { angle: "Outdoor / EDC", cells: ["●", "", "", "◐", "", "●", ""] },
  { angle: "Vrouwen als koper of drager", cells: ["", "◐", "◐", "", "●", "", ""], gap: true },
  { angle: "Maker- of fabrieksverhaal", cells: ["", "●", "◐", "", "◐", "", ""], gap: true },
  { angle: "Community, pers", cells: ["", "●", "", "", "", "", ""], gap: true },
  { angle: "Lokale taal", cells: ["", "●", "", "", "●", "●", "●"], gap: true },
  { angle: "Garantie als argument", cells: ["", "●", "●", "●", "◐", "", ""], gap: true },
  { angle: "Korting als hoofdargument", cells: ["●", "◐", "", "●", "●", "●", "●"] },
];

const pos = (p: number) => `${((p - MIN) / (MAX - MIN)) * 100}%`;

export default function Speelveld() {
  const rootRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      gsap.fromTo(
        q(".sv-mark"),
        { x: (i: number, el: HTMLElement) => -(el.offsetLeft + 40), autoAlpha: 0 },
        { x: 0, autoAlpha: 1, ease: "signature", stagger: 0.2, scrollTrigger: { trigger: q(".sv-axis")[0], start: "top 85%", end: "bottom 45%", scrub: 0.6 } },
      );
      gsap.fromTo(
        q(".sv-taken"),
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "signature", stagger: 0.08, scrollTrigger: { trigger: q(".sv-takens")[0], start: "top 85%", toggleActions: "play none none none" } },
      );
      q(".sv-row").forEach((row) => {
        gsap.fromTo(row, { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, duration: 0.5, ease: "signature", scrollTrigger: { trigger: row, start: "top 90%", toggleActions: "play none none none" } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative font-sans bg-[#0E0E0E] text-white py-40 max-[767px]:py-24">
      <div className="w-full max-w-[1200px] mx-auto px-8 max-[991px]:px-6 max-[767px]:px-5">
        <div className="uppercase font-mono text-xs font-medium tracking-[0.75px] text-[#FFFFFF99]">Het speelveld · zes rivalen</div>
        <h2 className="m-0 mt-4 text-[56px] max-[991px]:text-5xl max-[767px]:text-[34px] font-bold leading-[1.02] tracking-[-1.5px] max-w-[18em]">
          <span className="text-[#FFFFFF8c]">Buckley zit tussen twee vuren.</span> Het mechanisme onderscheidt niet meer.
        </h2>

        {/* Price axis */}
        <div className="sv-axis relative mt-24 mb-24 max-[767px]:mt-20" aria-label="Instapprijzen op een as van €25 tot €75">
          <div className="flex justify-between font-mono uppercase text-[10.5px] tracking-[0.75px] text-[#FFFFFF80] mb-16 max-[767px]:mb-20">
            <span>← aanbieding, 2+1, geen merk</span>
            <span className="text-right">merk, vakmanschap, garantie →</span>
          </div>
          <div className="relative h-px bg-[#FFFFFF33]">
            {PRICES.map((p) => (
              <div key={p.brand} className="sv-mark absolute top-0" style={{ left: pos(p.price) }}>
                <span className="absolute -translate-x-1/2 -translate-y-1/2 block rounded-full" style={{ width: p.own ? 16 : 10, height: p.own ? 16 : 10, background: p.own ? ACCENT : "#FFFFFF80", boxShadow: p.own ? "0 0 0 5px #FCF2D333" : undefined }} />
                <div
                  className={`absolute -translate-x-1/2 text-center whitespace-nowrap max-[767px]:hidden ${p.up ? "bottom-4" : "top-4"}`}
                >
                  <div className="font-bold text-[15px]" style={{ color: p.own ? ACCENT : "#FFFFFF" }}>{p.brand}</div>
                  <div className="font-mono text-[11px] text-[#FFFFFFb3]">{p.label}</div>
                  {p.own && <div className="font-mono text-[10.5px]" style={{ color: ACCENT }}>{p.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <ul className="hidden max-[767px]:block m-0 p-0 list-none -mt-12 mb-10">
          {PRICES.map((p) => (
            <li key={p.brand} className="flex justify-between border-b border-[#FFFFFF14] py-2 text-[15px]">
              <span className="font-bold" style={{ color: p.own ? ACCENT : "#FFFFFF" }}>{p.brand}</span>
              <span className="font-mono text-[12px] text-[#FFFFFFb3]">{p.label}</span>
            </li>
          ))}
        </ul>
        <p className="m-0 text-[18px] leading-relaxed text-[#FFFFFFb3] max-w-[46rem]">
          Onder: klonen met dezelfde belofte voor €29,95 en 2+1. Boven: merk, vakmanschap en levenslange garantie. Buckley zegt “van
          €79,95” maar geeft geen garantie, en lijkt voor de koper daardoor{" "}
          <span className="text-white">meer op de onderkant dan op de bovenkant.</span>
        </p>

        {/* Niches already taken */}
        <div className="mt-20">
          <div className="uppercase font-mono text-xs font-medium tracking-[0.75px] text-[#FFFFFF99] mb-5">Bijna elke niche uit v3 wordt al bespeeld</div>
          <div className="sv-takens grid grid-cols-3 max-[991px]:grid-cols-2 max-[479px]:grid-cols-1 gap-3">
            {TAKEN.map((t) => (
              <div key={t.niche} className="sv-taken rounded-xl border border-[#FFFFFF1a] p-5">
                <div className="text-[19px] font-bold leading-tight">{t.niche}</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.5px]" style={{ color: ACCENT }}>{t.who}</div>
                <div className="font-mono text-[11px] text-[#FFFFFF80]">{t.where}</div>
              </div>
            ))}
          </div>
          <p className="m-0 mt-6 text-[clamp(1.2rem,1rem+0.9vw,1.7rem)] leading-snug max-w-[36ch]">
            Het onderscheid zit niet meer in het idee.{" "}
            <span className="accent">Het zit in snelheid, diepte en meten,</span> en daar heeft Buckley met ~470 actieve ads, tegen ~200
            voor Nordform, een voorsprong.
          </p>
        </div>

        {/* Angle matrix */}
        <div className="mt-20">
          <div className="uppercase font-mono text-xs font-medium tracking-[0.75px] text-[#FFFFFF99] mb-5">
            Wie gebruikt welke invalshoek · ● in actieve ads · ◐ zijdelings · leeg = niet gezien
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-[14px]">
              <thead>
                <tr>
                  <th className="text-left font-mono font-medium uppercase text-[10.5px] tracking-[0.5px] text-[#FFFFFF80] py-3 pr-4">Invalshoek</th>
                  {BRANDS.map((b, i) => (
                    <th key={b} className="font-mono font-medium uppercase text-[10.5px] tracking-[0.5px] py-3 px-2 text-center" style={{ color: i === 0 ? ACCENT : "#FFFFFF80", background: i === 0 ? "#FCF2D30f" : undefined }}>
                      {b}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((r) => (
                  <tr key={r.angle} className="sv-row border-t border-[#FFFFFF14]">
                    <td className="py-3 pr-4">
                      {r.angle}
                      {r.gap && (
                        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.5px] rounded px-1.5 py-0.5" style={{ color: "#0E0E0E", background: ACCENT }}>
                          gat
                        </span>
                      )}
                    </td>
                    {r.cells.map((c, i) => (
                      <td key={i} className="text-center py-3 px-2 text-[16px]" style={{ background: i === 0 ? "#FCF2D30f" : undefined, color: i === 0 ? ACCENT : "#FFFFFFcc" }}>
                        {c || <span className="text-[#FFFFFF26]">·</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="m-0 mt-6 text-[17px] leading-relaxed text-[#FFFFFFb3] max-w-[46rem]">
            Pijn en duurzaamheid zegt iedereen. Buckley’s gaten zitten in het vertrouwensblok: maker, community, pers, garantie en lokale taal,
            precies waar Nordform het sterkst is. <span className="text-white">Dat is geen creativewerk, maar het maakt elke creative sterker.</span>
          </p>
          <p className="m-0 mt-3 font-mono uppercase text-[10.5px] tracking-[0.75px] text-[#FFFFFF66]">
            Meta Ad Library en sites, 23 sep 2026 · prijzen en claims zijn die van de merken zelf, niet geverifieerd
          </p>
        </div>
      </div>
    </section>
  );
}
