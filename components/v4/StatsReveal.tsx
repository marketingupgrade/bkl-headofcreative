"use client";

/**
 * @component StatsReveal
 * @description The AOV lever · BYQ gem "Scroll Text Reveal" (scroll-text-reveal-01):
 *   each word rises from yPercent 115 inside an overflow mask (power3.out,
 *   stagger 0.35, scrub 0.8). The figures are arithmetic on an assumed AOV
 *   and are labelled as such under the sentence.
 */

import * as React from "react";
import { gsap } from "./lib/gsap";

// §2 of the strategy. Arithmetic on an assumed AOV, labelled as such
// under the headline; no Buckley data.
const STATS: Array<{ text: string; accent?: boolean }> = [
  { text: "Bij ruim 400.000 orders per kwartaal maakt €5 extra orderwaarde " },
  { text: "zo'n 35.000 orders", accent: true },
  { text: " minder nodig. Dat komt uit bundels en pre-landers, " },
  { text: "niet uit een nieuwe hook.", accent: true },
];


export default function StatsReveal() {
  const rootRef = React.useRef<HTMLElement>(null);
  const pinRef = React.useRef<HTMLDivElement>(null);
  const h2Ref = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const h2 = h2Ref.current;
    if (!root || !pin || !h2) return;

    // Split into word-mask pairs, recursing into inline elements so the
    // amber <em> stats keep their color through the split (same pattern
    // as BlurRevealCopy's wrapWords).
    const inners: HTMLSpanElement[] = [];
    const wrapWords = (el: Node) => {
      Array.from(el.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          wrapWords(node);
          return;
        }
        if (node.nodeType !== Node.TEXT_NODE) return;
        const textNode = node as Text;
        const frag = document.createDocumentFragment();
        textNode.textContent!.split(/(\s+)/).forEach((piece) => {
          if (!piece) return;
          if (/^\s+$/.test(piece)) {
            frag.appendChild(document.createTextNode(" "));
            return;
          }
          const wordSpan = document.createElement("span");
          wordSpan.style.cssText =
            "display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.14em";
          const innerSpan = document.createElement("span");
          innerSpan.style.cssText = "display:inline-block;will-change:transform";
          innerSpan.textContent = piece;
          wordSpan.appendChild(innerSpan);
          frag.appendChild(wordSpan);
          inners.push(innerSpan);
        });
        el.replaceChild(frag, textNode);
      });
    };
    wrapWords(h2);
    if (!inners.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(inners, { yPercent: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(inners, { yPercent: 115 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      tl.to(inners, {
        yPercent: 0,
        ease: "power3.out",
        duration: 1,
        stagger: 0.35,
      });
      tl.to({}, { duration: 1.5 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="font-sans"
      style={{
        background: "#0E0E0E",
        color: "#FFFFFF",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Scroll runway — 300vh per the gem; stage is sticky, not pinned. */}
      <div ref={pinRef} style={{ position: "relative", height: "220vh" }}>
        <div
          className="sticky top-0"
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2.5rem",
            padding: "0 6vw",
            textAlign: "center",
          }}
        >
          <h2
            ref={h2Ref}
            className="m-0 font-sans"
            style={{
              maxWidth: "26ch",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 4.4vw, 3.6rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.01em",
            }}
          >
            {/* Copy comes from site.config.ts → statsReveal. Each `em` is
                an accent-highlighted fragment; the word-reveal animation
                walks the text nodes, so any sentence shape works. */}
            {STATS.map((part, i) =>
              part.accent ? (
                <em key={i} className="accent">
                  {part.text}
                </em>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </h2>
          <p
            className="m-0 font-mono uppercase"
            style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.75px", color: "#FFFFFF80", maxWidth: "60ch" }}
          >
            Rekenwerk: $25M in Q4 bij een aangenomen AOV van €55 · geen data van Buckley · §2 van de strategie
          </p>
        </div>
      </div>
    </section>
  );
}
