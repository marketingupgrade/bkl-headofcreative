"use client";

/**
 * @component ClaimsStage
 * @description Diagnosis · Kelvin stage with three BYQ "Scroll Stack" card stacks
 *   (arrival y→0 over 0.7 power2.out; cards beneath scale 1−depth·0.05,
 *   yPercent −depth·6). Every arrival reveals one headline word.
 */

import * as React from "react";
import { gsap } from "./lib/gsap";

const ACCENT_AMBER = "#FCF2D3";
const CARD_BG = "#161616";
const CARD_BORDER = "#2A2A2A";
const FG = "#FFFFFF";
const BG = "#0E0E0E";

interface Claim {
  index: string;
  channel: string;
  value: string;
  customer: string;
}

// The four unique texts in the 27 active Dutch ads read word for word
// (Meta Ad Library, 22–23 Sep 2026). Each stack repeats a text across
// ads, as the library shows ("4 ads use this creative and text"). The
// last card to arrive is the outdoor ad: the one niche ad, five days old.
const STACKS: { id: string; claims: Claim[] }[] = [
  {
    id: "tekst-1",
    claims: [
      { index: "01", channel: "“Tired of belts that feel like an afterthought?”", value: "3-pack · 63% korting", customer: "Tekst 1" },
      { index: "02", channel: "“Tired of belts that feel like an afterthought?”", value: "3-pack · 63% korting", customer: "Tekst 1" },
      { index: "03", channel: "“Tired of belts that feel like an afterthought?”", value: "loopt sinds 3 sep 2025", customer: "Tekst 1" },
    ],
  },
  {
    id: "tekst-2",
    claims: [
      { index: "01", channel: "“We designed the Buckley Belt to do more than just hold things up…”", value: "50% korting", customer: "Tekst 2" },
      { index: "02", channel: "“We designed the Buckley Belt to do more than just hold things up…”", value: "50% korting", customer: "Tekst 2" },
      { index: "03", channel: "“We designed the Buckley Belt to do more than just hold things up…”", value: "loopt sinds 5 sep 2025", customer: "Tekst 2" },
    ],
  },
  {
    id: "tekst-3-4",
    claims: [
      { index: "01", channel: "“Experience the perfect fit with Buckley Belt's micro-adjustable design…”", value: "loopt sinds 4 nov 2025", customer: "Tekst 3" },
      { index: "02", channel: "“Experience the perfect fit with Buckley Belt's micro-adjustable design…”", value: "loopt sinds 4 nov 2025", customer: "Tekst 3" },
      { index: "03", channel: "“The no-hole Buckley belt men already wear every day, now in a rugged outdoor build”", value: "18 sep 2026 · de enige niche-advertentie", customer: "Tekst 4 · vakman en buitenmens" },
    ],
  },
];

const LINE1 = ["27", "advertenties."];
const LINE2 = ["Vier", "teksten,", "één", "niche."];

/** Desktop placement of the three stacks around the centered headline. */
const STACK_POS = [
  "right-[4%] top-[8%]",
  "left-[3%] top-[38%]",
  "right-[6%] bottom-[6%]",
] as const;

function ClaimCard({ claim }: { claim: Claim }) {
  return (
    <article className={`cs-card${claim.customer.startsWith("Tekst 4") ? " cs-niche" : ""}`}>
      <span
        className="font-mono"
        style={{ fontSize: "0.7rem", letterSpacing: "0.06em", color: ACCENT_AMBER }}
      >
        {claim.index} · {claim.customer}
      </span>
      <h3
        className="m-0 font-sans"
        style={{
          margin: "0.3rem 0 0",
          fontWeight: 400,
          fontSize: "1.05rem",
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: FG,
        }}
      >
        {claim.channel}
      </h3>
      <p
        className="m-0 font-mono tabular-nums"
        style={{ fontSize: "0.8rem", color: "#FFFFFF99", marginTop: "auto" }}
      >
        {claim.value}
      </p>
    </article>
  );
}

export default function ClaimsStage() {
  const rootRef = React.useRef<HTMLElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const stackRefs = React.useRef<Array<HTMLElement[]>>([[], [], []]);
  const wordRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const [isStatic, setIsStatic] = React.useState(false);

  React.useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const reduce =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < 992;

    if (reduce) {
      setIsStatic(true);
      return;
    }

    const ctx = gsap.context(() => {
      const D = 0.7;
      // Every card arrival reveals one
      // headline word, in scroll motion — six arrivals, six words. The
      // words ride the same scrubbed timeline as the cards, through the
      // scroll-text-reveal mask treatment (yPercent 115 -> 0 inside an
      // overflow-hidden span).
      const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
      gsap.set(words, { yPercent: 115 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      let at = 0;
      let arrival = 0;
      stackRefs.current.forEach((cardEls) => {
        const cards = cardEls.filter(Boolean);
        if (!cards.length) return;
        // Full viewport height, like the gem: a card must start below the
        // (overflow-hidden) sticky stage no matter where its slot sits.
        const offBelow = () => window.innerHeight;

        cards.forEach((card, i) => {
          card.style.zIndex = String(i);
          if (i === 0) {
            gsap.set(card, { yPercent: 0, scale: 1 });
          } else {
            gsap.set(card, { y: offBelow(), scale: 1 });
          }
        });

        for (let k = 1; k < cards.length; k++) {
          tl.to(cards[k], { y: 0, scale: 1, ease: "power2.out", duration: D }, at);
          if (words[arrival]) {
            tl.to(words[arrival], { yPercent: 0, ease: "power3.out", duration: D }, at);
          }
          arrival += 1;
          for (let j = 0; j < k; j++) {
            const depth = k - j;
            tl.to(
              cards[j],
              {
                scale: 1 - depth * 0.05,
                yPercent: -depth * 6,
                ease: "power2.out",
                duration: D,
              },
              at,
            );
          }
          at += D;
        }
      });

      tl.to({}, { duration: 1.1 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .cs-card {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding: 1.1rem 1.25rem;
          border-radius: 1rem;
          border: 1px solid ${CARD_BORDER};
          background: linear-gradient(160deg, color-mix(in srgb, ${FG} 6%, ${CARD_BG}), ${CARD_BG});
          box-shadow: 0 1.4rem 3rem color-mix(in srgb, ${BG} 55%, transparent);
          transform-origin: top center;
          will-change: transform;
        }
        .cs-niche {
          border-color: #FCF2D3;
          background: linear-gradient(160deg, #2a261c, #161616);
        }
        .cs-static .cs-card {
          position: static;
          will-change: auto;
        }
      `}</style>
      <section
        ref={rootRef}
        className={`relative font-sans ${isStatic ? "cs-static" : ""}`}
        style={{ backgroundColor: BG, color: FG }}
        aria-label="27 advertenties, vier teksten, één niche"
      >
        {isStatic ? (
          /* Reduced-motion / narrow: plain stacked lists, per the gem. */
          <div className="px-5 py-24 max-w-[1440px] mx-auto">
            <h2
              className="m-0 font-sans text-center mx-auto"
              style={{
                fontSize: "clamp(34px, 6vw, 64px)",
                fontWeight: 500,
                letterSpacing: "-2px",
                lineHeight: 1,
                maxWidth: "14em",
              }}
            >
              <span className="block">{LINE1.join(" ")}</span>
              <span className="block" style={{ color: "#FFFFFF8c" }}>{LINE2.join(" ")}</span>
            </h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              {STACKS.map((s) => (
                <div key={s.id} className="flex flex-col gap-3">
                  {s.claims.slice(-1).map((c) => (
                    <ClaimCard key={c.index} claim={c} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div ref={trackRef} className="relative" style={{ height: "150vh" }}>
            <div className="sticky top-0 h-screen overflow-hidden">
              {/* Centered claim, per the Kelvin stage reference. */}
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <h2
                  className="m-0 font-sans text-center"
                  style={{
                    fontSize: "clamp(40px, 4.44vw, 64px)",
                    fontWeight: 500,
                    letterSpacing: "-2px",
                    lineHeight: 1.08,
                    maxWidth: "13em",
                    color: "#FFFFFF",
                  }}
                >
                  {/* Line 1, white; line 2 on its own line, dim — each
                      word inside an overflow mask, revealed per arrival. */}
                  <span className="block">
                    {LINE1.map((w, i) => (
                      <span
                        key={w}
                        className="inline-block overflow-hidden align-top"
                        style={{ paddingBottom: "0.12em", marginRight: i < LINE1.length - 1 ? "0.26em" : 0 }}
                      >
                        <span
                          ref={(el) => {
                            wordRefs.current[i] = el;
                          }}
                          className="inline-block will-change-transform"
                        >
                          {w}
                        </span>
                      </span>
                    ))}
                  </span>
                  <span className="block" style={{ color: "#FFFFFF8c" }}>
                    {LINE2.map((w, i) => (
                      <span
                        key={w}
                        className="inline-block overflow-hidden align-top"
                        style={{ paddingBottom: "0.12em", marginRight: i < LINE2.length - 1 ? "0.26em" : 0 }}
                      >
                        <span
                          ref={(el) => {
                            wordRefs.current[LINE1.length + i] = el;
                          }}
                          className="inline-block will-change-transform"
                        >
                          {w}
                        </span>
                      </span>
                    ))}
                  </span>
                </h2>
              </div>

              {/* Three claim stacks, placed like the reference's floating stat cards. */}
              {STACKS.map((s, si) => (
                <div key={s.id} className={`absolute ${STACK_POS[si]}`}>
                  <div className="relative" style={{ width: "19rem", height: "9rem" }}>
                    {s.claims.map((c, ci) => (
                      <article
                        key={c.index}
                        ref={(el) => {
                          if (el) stackRefs.current[si][ci] = el;
                        }}
                        className={`cs-card${c.customer.startsWith("Tekst 4") ? " cs-niche" : ""}`}
                      >
                        <span
                          className="font-mono"
                          style={{ fontSize: "0.7rem", letterSpacing: "0.06em", color: ACCENT_AMBER }}
                        >
                          {c.index} · {c.customer}
                        </span>
                        <h3
                          className="m-0 font-sans"
                          style={{
                            margin: "0.3rem 0 0",
                            fontWeight: 400,
                            fontSize: "1.05rem",
                            letterSpacing: "-0.02em",
                            lineHeight: 1.25,
                            color: FG,
                          }}
                        >
                          {c.channel}
                        </h3>
                        <p className="m-0 font-mono tabular-nums" style={{ fontSize: "0.8rem", color: "#FFFFFF99", marginTop: "auto" }}>
                          {c.value}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
