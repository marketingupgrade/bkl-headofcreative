"use client";

/**
 * @component IntegrationsMarquee
 * @description The niche list · Nextwell "Integration Logos Dual Marquee"
 *   (nextwell-brands-logos-2): the one light panel on the page, two opposing
 *   30s tile rows with hover-pause and IntersectionObserver entrances.
 */

import * as React from "react";
import Link from "next/link";

type Tile = { label: string; note: string };

// Row 1: the twelve hypotheses from §7 of the strategy.
const HYPOTHESES: Tile[] = [
  { label: "De cadeaukoper", note: "CD5" },
  { label: "De man die afvalt", note: "CD2" },
  { label: "Vakman en buitenmens", note: "CD8" },
  { label: "EDC en gear", note: "CD3" },
  { label: "Nieuwe dresscode", note: "CD4" },
  { label: "Grote maten", note: "CD8" },
  { label: "De reiziger", note: "CD6" },
  { label: "Bruiloft en gelegenheid", note: "CD5" },
  { label: "Vader en zoon", note: "CD5" },
  { label: "Motorrijder en sporter", note: "CD3" },
  { label: "Wil niet winkelen", note: "CD6" },
  { label: "De herhaalkoper", note: "CD4" },
];

// Row 2: what the YouTube audit did to the list.
const AUDIT: Tile[] = [
  { label: "Vrouwen", note: "nieuw · tier 1?" },
  { label: "Veranderende maat", note: "herzien" },
  { label: "Vegan en bewust", note: "nieuw · tier 2" },
  { label: "EDC en gear", note: "bevestigd" },
  { label: "De tinkerer", note: "nieuw · tier 3" },
  { label: "De cadeaukoper", note: "zwak bewijs" },
  { label: "Nieuwe dresscode", note: "zwak bewijs" },
  { label: "Kinderriemen", note: "navragen" },
];

function LogoTile({ label, note }: Tile) {
  return (
    <div
      className="flex-none flex flex-col items-center justify-center gap-1.5 w-[8.5rem] h-[6.25rem] max-[767px]:w-28 max-[767px]:h-20 rounded-2xl px-2"
      style={{ backgroundColor: "#F3E4B8" }}
    >
      <span className="font-sans text-center" style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0E0E0E", lineHeight: 1.15 }}>
        {label}
      </span>
      <span className="font-mono text-center uppercase" style={{ fontSize: "0.62rem", letterSpacing: "0.06em", color: "#0E0E0E99" }}>
        {note}
      </span>
    </div>
  );
}

function MarqueeRow({ tiles, reverse = false, visible = false, delay = 0 }: { tiles: Tile[]; reverse?: boolean; visible?: boolean; delay?: number }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className={`relative overflow-hidden w-full transition-[opacity,transform] duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[50px]"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-[20%] z-10 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(90deg, #FCF2D3, #FCF2D300)" }}
      />
      <div
        className="flex gap-4 max-[767px]:gap-3 w-max im-track"
        style={{
          animation: `${reverse ? "im-marquee-reverse" : "im-marquee"} 30s linear infinite`,
          animationPlayState: hovered ? "paused" : "running",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {[0, 1, 2].map((copy) => (
          <div key={copy} className="flex-none flex gap-4 max-[767px]:gap-3" aria-hidden={copy > 0}>
            {tiles.map((t, i) => (
              <LogoTile key={`${copy}-${i}`} {...t} />
            ))}
          </div>
        ))}
      </div>
      <div
        className="absolute right-0 top-0 bottom-0 w-[20%] z-10 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(90deg, #FCF2D300, #FCF2D3)" }}
      />
    </div>
  );
}

export default function IntegrationsMarquee() {
  const headlineRef = React.useRef<HTMLDivElement>(null);
  const [headlineVisible, setHeadlineVisible] = React.useState(false);
  const marqueeRef1 = React.useRef<HTMLDivElement>(null);
  const [marquee1Visible, setMarquee1Visible] = React.useState(false);
  const marqueeRef2 = React.useRef<HTMLDivElement>(null);
  const [marquee2Visible, setMarquee2Visible] = React.useState(false);
  const [btnHovered, setBtnHovered] = React.useState(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHeadlineVisible(true);
      setMarquee1Visible(true);
      setMarquee2Visible(true);
      return;
    }
    const observers: IntersectionObserver[] = [];
    const observe = (el: HTMLElement | null, setter: (v: boolean) => void) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true);
            obs.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      obs.observe(el);
      observers.push(obs);
    };
    observe(headlineRef.current, setHeadlineVisible);
    observe(marqueeRef1.current, setMarquee1Visible);
    observe(marqueeRef2.current, setMarquee2Visible);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <style>{`
        @keyframes im-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes im-marquee-reverse {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .im-track { animation: none !important; }
        }
      `}</style>
      <section className="py-[7.5rem] max-[767px]:py-20 font-sans" style={{ backgroundColor: "#FCF2D3" }}>
        <div className="w-full px-8 max-[767px]:px-4">
          <div className="z-[2] w-full max-w-[1800px] mx-auto">
            {/* Headline block */}
            <div
              ref={headlineRef}
              className={`max-w-[45.63rem] max-[991px]:max-w-[28rem] mx-auto mb-16 max-[767px]:mb-10 flex flex-col items-center text-center gap-6 max-[767px]:gap-5 transition-[opacity,transform] duration-700 ease-out ${
                headlineVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="uppercase font-mono" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.75px", color: "#0E0E0E99" }}>
                Rij 1 · de hypotheses &nbsp;·&nbsp; rij 2 · wat de audit ermee deed
              </div>
              <h2
                className="m-0 font-sans text-[2.75rem] leading-[3.1rem] font-bold tracking-[-0.1rem] text-black max-[767px]:text-[2rem] max-[767px]:leading-[2.5rem] max-[767px]:tracking-[-0.062rem]"
              >
                Behandel sub-niches als accounts.
              </h2>
              <p className="m-0 font-sans text-xl leading-7 font-normal max-[767px]:text-[1.125rem] max-[767px]:leading-[1.625rem]" style={{ color: "#000000a3" }}>
                Zoek ze met social listening. Geef elke niche een eigen dossier,
                boodschap, pre-lander en P&amp;L. En laat het algoritme het targeten doen.
              </p>
              {/* CTA pill */}
              <Link
                href="/strategie/#7-twaalf-niche-hypotheses-voor-buckley"
                className={`relative flex items-center justify-center rounded-[2rem] font-sans text-base leading-5 font-medium no-underline cursor-pointer flex-none transition-colors duration-300 ${
                  btnHovered ? "text-[#FCF2D3]" : "text-black"
                }`}
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
              >
                <span className="relative z-[1] flex items-center justify-center pointer-events-none px-4 py-3 max-[767px]:px-3 max-[767px]:py-2 overflow-hidden">
                  <span className="relative z-[2] w-4 h-4 flex items-center justify-center flex-none mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1L11 6L6 11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="h-5 flex-none overflow-hidden pointer-events-none">Lees de nichelijst</span>
                  <span className="relative z-[2] w-4 h-4 flex items-center justify-center flex-none ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 12 12" fill="none">
                      <path d="M1 6H11M6 1L11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-[2rem] border border-transparent backdrop-blur-[5px] transition-colors duration-300 ${
                    btnHovered ? "bg-black" : "bg-[#00000014]"
                  }`}
                />
              </Link>
            </div>

            {/* Marquee rows */}
            <div className="flex flex-col gap-4 max-[767px]:gap-3">
              <div ref={marqueeRef1}>
                <MarqueeRow tiles={HYPOTHESES} reverse={false} visible={marquee1Visible} delay={0} />
              </div>
              <div ref={marqueeRef2}>
                <MarqueeRow tiles={AUDIT} reverse={true} visible={marquee2Visible} delay={150} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
