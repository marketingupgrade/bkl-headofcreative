"use client";

/**
 * @component RolodexTextScroll
 * @description Viewer questions · BYQ gem "Rolodex Text Scroll", motion verbatim
 *   (FLIP 1, DWELL 0.4, LEAD 0.25, SETTLE 0.65, TILT ±12°, power4.inOut,
 *   scrub 1). Each face is a verbatim YouTube question with a Dutch
 *   translation underneath.
 */

import * as React from "react";
import { Instrument_Serif } from "next/font/google";
import { gsap, ScrollTrigger } from "./lib/gsap";

const instrumentSerifItalic = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  display: "swap",
});

const BG_COLOR = "#0E0E0E";
const FG_COLOR = "#FFFFFF";
const ACCENT_COLOR = "#FCF2D3";

const FLIP = 1;
const DWELL = 0.4;
const LEAD = 0.25;
const SETTLE = 0.65;
const TILT = 12;
const EASE = "power4.inOut";

// Verbatim viewer questions from the YouTube audit (names omitted);
// [brackets] mark the cream spans.
const LINES = [
  { en: "“Do they have [females belts]?”", nl: "Hebben ze ook damesriemen?" },
  { en: "“[How do you take it off]!?”", nl: "Hoe krijg je hem áf?" },
  { en: "“Have you liked it so far? [Is it good quality?]”", nl: "Bevalt hij? Is de kwaliteit goed?" },
  { en: "“Buy from the USA or Canada, [not China?]”", nl: "Kopen uit de VS of Canada, niet uit China?" },
  { en: "“[Song ?]”", nl: "Welk liedje? De enige reactie onder 111.359 views." },
];

/** Render a line, turning [bracketed] phrases into amber spans. */
function renderLine(line: string) {
  return line.split(/(\[[^\]]+\])/).map((seg, i) =>
    seg.startsWith("[") && seg.endsWith("]") ? (
      <span key={i} style={{ color: ACCENT_COLOR }}>
        {seg.slice(1, -1)}
      </span>
    ) : (
      <React.Fragment key={i}>{seg}</React.Fragment>
    ),
  );
}

export default function RolodexTextScroll() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const reelRef = React.useRef<HTMLOListElement>(null);
  const faceRefs = React.useRef<(HTMLSpanElement | null)[]>([]);

  React.useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    const faces = faceRefs.current.filter(Boolean) as HTMLSpanElement[];

    if (!root || !track || !stage || faces.length < 2) return;

    // Reduced motion: bail out entirely — CSS handles the static fallback
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Every line but the first waits below the drum's edge, face-down
      gsap.set(faces.slice(1), { rotationX: -90 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      let cursor = LEAD;
      for (let i = 0; i < faces.length - 1; i++) {
        const tilt = i % 2 ? TILT : -TILT;

        // Outgoing rolls up over the top edge with a slight tilt
        tl.to(faces[i], { rotationX: 90, rotationZ: tilt, duration: FLIP, ease: EASE }, cursor);
        tl.to(faces[i], { autoAlpha: 0, duration: 0.3 * FLIP, ease: "power1.out" }, cursor + 0.5 * FLIP);

        // Incoming rides in from below, shedding opposite tilt
        tl.fromTo(
          faces[i + 1],
          { rotationX: -90, rotationZ: -tilt },
          { rotationX: 0, rotationZ: 0, duration: FLIP, ease: EASE },
          cursor,
        );
        tl.fromTo(
          faces[i + 1],
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.35 * FLIP, ease: "power1.out" },
          cursor + 0.3 * FLIP,
        );

        cursor += FLIP + (i < faces.length - 2 ? DWELL : 0);
      }

      // Settle on the last line before the stage releases
      tl.to({}, { duration: SETTLE }, cursor);
    }, root);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="font-sans"
      style={{ backgroundColor: BG_COLOR, color: FG_COLOR }}
    >
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .rolodex-track { height: auto !important; }
          .rolodex-stage {
            height: auto !important;
            min-height: 100vh !important;
            position: static !important;
            overflow: visible !important;
            perspective: none !important;
            display: grid !important;
            place-items: center !important;
            padding: 16vh 4vw !important;
          }
          .rolodex-reel {
            position: static !important;
            display: grid !important;
            justify-items: center !important;
            row-gap: 0.8em !important;
          }
          .rolodex-line { position: static !important; display: block !important; }
          .rolodex-face {
            font-size: clamp(1.3rem, 3vw, 2.2rem) !important;
            transform: none !important;
            will-change: auto !important;
          }
          .rolodex-face-hidden { visibility: visible !important; }
          .rolodex-eyebrow { position: static !important; margin: 0 0 2rem !important; }
        }
      `}</style>

      {/* Scroll runway — 220vh: five lines at the compressed pacing */}
      <div ref={trackRef} className="rolodex-track" style={{ height: "220vh" }}>
        {/* Sticky stage — holds the 3D perspective (pin fights Lenis) */}
        <div
          ref={stageRef}
          className="rolodex-stage sticky top-0"
          style={{
            position: "sticky",
            height: "100vh",
            overflow: "hidden",
            perspective: "1100px",
          }}
        >
          <p
            className="rolodex-eyebrow absolute left-0 right-0 top-[12vh] m-0 text-center font-mono uppercase px-6"
            style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.75px", color: "#FFFFFF99" }}
          >
            Wat kijkers vragen onder Buckley-video&apos;s · letterlijk
          </p>
          <p
            className="rolodex-eyebrow absolute left-0 right-0 bottom-[12vh] m-0 text-center font-mono uppercase px-6"
            style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.75px", color: "#FFFFFF66" }}
          >
            Vijf vragen · nul antwoorden van het merk
          </p>
          {/* The drum reel */}
          <ol
            ref={reelRef}
            className="rolodex-reel"
            aria-label="Vijf vragen van kijkers onder Buckley-video's, letterlijk"
            style={{
              position: "absolute",
              inset: 0,
              margin: 0,
              padding: 0,
              listStyle: "none",
              transformStyle: "preserve-3d",
            }}
          >
            {LINES.map((text, i) => (
              <li
                key={i}
                className="rolodex-line"
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  transformStyle: "preserve-3d",
                  pointerEvents: "none",
                }}
              >
                <span
                  ref={(el) => {
                    faceRefs.current[i] = el;
                  }}
                  className={`${instrumentSerifItalic.className} rolodex-face${i !== 0 ? " rolodex-face-hidden" : ""}`}
                  style={{
                    display: "block",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(1.7rem, 1rem + 3.2vw, 3.9rem)",
                    lineHeight: 1.18,
                    letterSpacing: "-0.01em",
                    textAlign: "center",
                    textWrap: "balance",
                    maxWidth: "24ch",
                    paddingInline: "1.25rem",
                    transformOrigin: "50% 50% -1.35em",
                    backfaceVisibility: "hidden",
                    willChange: "transform, opacity",
                    visibility: i !== 0 ? "hidden" : "visible",
                  }}
                >
                  {renderLine(text.en)}
                  <span
                    className="block font-sans"
                    style={{ fontStyle: "normal", fontSize: "max(0.95rem, 0.32em)", letterSpacing: 0, lineHeight: 1.4, marginTop: "0.9rem", color: "#FFFFFF8c" }}
                  >
                    {text.nl}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
