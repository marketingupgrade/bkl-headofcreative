"use client";

/**
 * @component ScrollTimelineGem
 * @description Q4 week by week · BYQ gem "Scroll Timeline" (scroll-timeline-01),
 *   motion verbatim: spine scaleY scrub, dot pop 0.6→1 back.out(2.5), card
 *   slide ±32px → 0 over 0.65s power3.out.
 */

import * as React from "react";
import { gsap } from "./lib/gsap";

// ── Design tokens (the gem's own) ────────────────────────────────────
const ACCENT_AMBER = "#FCF2D3";
const CARD_BG = "#161616";
const CARD_BORDER = "#2A2A2A";
const SPINE_TRACK_COLOR = "#2A2A2A";
const FG = "#FFFFFF";
const BG = "#0E0E0E"; // section ground matches the v4 page, not the demo's #0E0E0E

// Q4 week by week, from §11 and §15 of the strategy.
const events = [
  { year: "Week 1 · 1–7 okt", title: "Golf 0: kijken, niets veranderen", body: "Meekijken, één dag alleen advertentiereacties lezen, en een nulmeting van zes getallen met Acquisition. Zonder die zes weet in januari niemand of het gewerkt heeft.", side: "right" },
  { year: "Week 2–3 · 8–21 okt", title: "Golf 1: vijf artefacten", body: "Evidence Bank, Nichelijst, het Board (niche × Core Drive × format), een briefstandaard van zeven velden en een Learning Log. De cadeaulijn start parallel in week 3.", side: "left" },
  { year: "Week 4–6 · 22 okt–11 nov", title: "Golf 2: de lus draait, de mix gaat om", body: "Eén niche per week. Van 20 nieuwe concepten naar ongeveer 12 nieuw plus 10 tot 18 iteraties. Beslismoment uiterlijk 4 november. Singles Day als generale repetitie.", side: "right" },
  { year: "13 november", title: "De bibliotheek gaat dicht", body: "Geen nieuwe concepten meer, alleen varianten op bewezen werk. Leren in de duurste advertentieweek van het jaar is de kostbaarste manier van leren.", side: "left" },
  { year: "27–30 november", title: "Black Friday, Cyber Monday", body: "Testbudget naar nul, nichelus op pauze. Dagelijkse iteratie op wat leeft. De ene week die draait om verzilveren.", side: "right" },
  { year: "5 december", title: "Sinterklaas: de piek die iedereen vergeet", body: "Besteldeadline rond 2 december. De cadeaulijn op volle kracht in NL en BE, met een leverbelofte die ops hard maakt, of zonder datumbelofte.", side: "left" },
  { year: "Week 11–13 · december", title: "Kerst, dan de aftocht", body: "Nichelus weer aan. ‘Op tijd binnen’ als dragende angle. Daarna retro, het Learning Log opschonen, de dossierbibliotheek overdraagbaar maken.", side: "right" },
] as const;

export default function ScrollTimelineGem() {
  const rootRef = React.useRef<HTMLElement>(null);
  const spineFillRef = React.useRef<HTMLDivElement>(null);
  const nodesRef = React.useRef<HTMLDivElement>(null);
  const dotRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      // Static fallback — show everything immediately.
      if (spineFillRef.current) {
        spineFillRef.current.style.transform = "scaleY(1)";
      }
      dotRefs.current.forEach((dot) => {
        if (!dot) return;
        dot.style.transform = "scale(1)";
        dot.style.background = ACCENT_AMBER;
        dot.style.borderColor = ACCENT_AMBER;
        dot.style.boxShadow = `0 0 0 4px ${ACCENT_AMBER}33, 0 0 16px ${ACCENT_AMBER}59`;
      });
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.style.opacity = "1";
        card.style.transform = "translateX(0)";
      });
      return;
    }

    const ctx = gsap.context(() => {
      // ── 1. Spine fill scrub ────────────────────────────────────────
      const spineFill = spineFillRef.current;
      const nodesEl = nodesRef.current;
      if (spineFill && nodesEl) {
        gsap.to(spineFill, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: nodesEl,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        });
      }

      // ── 2. Per-node dot pop + card slide-in ────────────────────────
      events.forEach((event, i) => {
        const dot = dotRefs.current[i];
        const card = cardRefs.current[i];
        if (!dot || !card) return;

        const fromX = event.side === "right" ? 32 : -32;

        gsap.set(card, { x: fromX, opacity: 0 });

        // Dot entrance
        gsap.fromTo(
          dot,
          { scale: 0.6 },
          {
            scale: 1,
            duration: 0.4,
            ease: "back.out(2.5)",
            scrollTrigger: {
              trigger: dot.closest("[data-node]") as Element,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            onComplete: () => {
              dot.style.background = ACCENT_AMBER;
              dot.style.borderColor = ACCENT_AMBER;
              dot.style.boxShadow = `0 0 0 4px ${ACCENT_AMBER}33, 0 0 16px ${ACCENT_AMBER}59`;
            },
          },
        );

        // Card entrance
        gsap.to(card, {
          x: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power3.out",
          delay: 0.05,
          scrollTrigger: {
            trigger: dot.closest("[data-node]") as Element,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .scroll-timeline-spine-fill {
          position: absolute;
          inset: 0;
          background: ${ACCENT_AMBER};
          transform: scaleY(0);
          transform-origin: top center;
          border-radius: 1px;
          box-shadow: 0 0 12px ${ACCENT_AMBER}66;
          will-change: transform;
        }

        .scroll-timeline-card {
          opacity: 0;
          will-change: transform, opacity;
        }

        .scroll-timeline-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: ${CARD_BORDER};
          border: 2px solid ${CARD_BG};
          transform: scale(0.6);
          z-index: 1;
          flex-shrink: 0;
        }

        /* Desktop: two-column alternating layout */
        .scroll-timeline-node {
          display: grid;
          grid-template-columns: 1fr 3rem 1fr;
          align-items: center;
          position: relative;
        }

        .scroll-timeline-node .scroll-timeline-dot {
          grid-column: 2;
          justify-self: center;
        }

        .scroll-timeline-node[data-side="right"] .scroll-timeline-card {
          grid-column: 3;
          justify-self: start;
        }

        .scroll-timeline-node[data-side="left"] .scroll-timeline-card {
          grid-column: 1;
          justify-self: end;
        }

        /* Narrow: single column, spine on left */
        @media (max-width: 560px) {
          .scroll-timeline-spine-track {
            left: 1.25rem !important;
            transform: none !important;
          }

          .scroll-timeline-node {
            grid-template-columns: 2.5rem 1fr !important;
            grid-template-rows: auto;
          }

          .scroll-timeline-node .scroll-timeline-dot {
            grid-column: 1 !important;
            grid-row: 1;
            justify-self: center;
          }

          .scroll-timeline-node[data-side="right"] .scroll-timeline-card,
          .scroll-timeline-node[data-side="left"] .scroll-timeline-card {
            grid-column: 2 !important;
            grid-row: 1;
            justify-self: start !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      <div className="font-sans text-center px-6" style={{ backgroundColor: BG, paddingTop: "10rem" }}>
        <div className="uppercase font-mono" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.75px", color: "#FFFFFF99" }}>
          Het upgradeproces
        </div>
        <h2
          className="m-0 mx-auto mt-4 font-sans max-[767px]:text-[38px]"
          style={{ fontSize: "64px", fontWeight: 700, lineHeight: 1, letterSpacing: "-2px", maxWidth: "14em", color: FG }}
        >
          <span style={{ color: "#FFFFFF8c" }}>De motor blijft draaien</span> terwijl we hem verbouwen.
        </h2>
      </div>
      <section
        ref={rootRef}
        // overflow-x-clip: un-revealed cards hold their ±32px entrance
        // offset; on narrow viewports the +32 side extends the page's
        // scroll width by exactly that overhang until revealed.
        className="relative font-sans overflow-x-clip"
        style={{
          position: "relative",
          color: FG,
          backgroundColor: BG,
          padding: "6rem 1.5rem 12rem",
          maxWidth: "64rem",
          margin: "0 auto",
        }}
        aria-label="Q4, week voor week"
      >
        {/* Spine track */}
        <div
          className="scroll-timeline-spine-track"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: "4rem",
            bottom: "10rem",
            width: "2px",
            background: SPINE_TRACK_COLOR,
            overflow: "hidden",
            borderRadius: "1px",
          }}
        >
          <div ref={spineFillRef} className="scroll-timeline-spine-fill" />
        </div>

        {/* Nodes */}
        <div
          ref={nodesRef}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "7rem",
            position: "relative",
          }}
        >
          {events.map((event, i) => (
            <div key={i} className="scroll-timeline-node" data-node data-side={event.side}>
              {/* Dot */}
              <div
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                className="scroll-timeline-dot"
              />

              {/* Card */}
              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="scroll-timeline-card"
                style={{
                  background: CARD_BG,
                  border: `1px solid ${CARD_BORDER}`,
                  borderRadius: "1rem",
                  padding: "1.75rem 2rem",
                  maxWidth: "24rem",
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    display: "block",
                    fontSize: "0.7rem",
                    color: ACCENT_AMBER,
                    marginBottom: "0.6rem",
                    opacity: 0.85,
                  }}
                >
                  {event.year}
                </span>
                <h3
                  className="font-sans"
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    color: FG,
                    margin: "0 0 0.65rem",
                  }}
                >
                  {event.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    color: `${FG}a6`,
                    margin: 0,
                  }}
                >
                  {event.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
