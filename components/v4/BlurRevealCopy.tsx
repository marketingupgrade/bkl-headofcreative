"use client";

/**
 * @component BlurRevealCopy
 * @description The thesis · BYQ gem "Scroll Blur Reveal" (scroll-blur-reveal-01),
 *   motion verbatim: the block levels out from a 2.5° tilt while each word
 *   scrubs from blurred to sharp on a 0.16 stagger.
 */

import * as React from "react";
import { gsap } from "./lib/gsap";

const FG_COLOR = "#FFFFFF";

export default function BlurRevealCopy({
  children,
  eyebrow,
  note,
}: {
  children: React.ReactNode;
  eyebrow?: string;
  note?: string;
}) {
  const rootRef = React.useRef<HTMLElement>(null);
  const textRef = React.useRef<HTMLParagraphElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    const text = textRef.current;
    if (!root || !text) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Word-wrap helper: recurses into inline elements so <em> styling survives.
    const wrapWords = (el: Node): HTMLSpanElement[] => {
      const words: HTMLSpanElement[] = [];
      Array.from(el.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          words.push(...wrapWords(node));
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
          const span = document.createElement("span");
          span.className = "sbr-word";
          span.textContent = piece;
          frag.appendChild(span);
          words.push(span);
        });
        el.replaceChild(frag, textNode);
      });
      return words;
    };

    const words = wrapWords(text);
    if (!words.length) return;

    // Reduced motion: leave the paragraph fully legible and static.
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.12, filter: "blur(10px)", y: "0.3em" });
      gsap.set(text, { transformOrigin: "0% 50%", rotate: 2.5 });

      gsap.to(text, {
        rotate: 0,
        ease: "none",
        scrollTrigger: {
          trigger: text,
          start: "top bottom",
          end: "top 40%",
          scrub: 0.6,
        },
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: text,
            start: "top 75%",
            end: "center 42%",
            scrub: 0.6,
          },
        })
        .to(words, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          ease: "power1.out",
          stagger: 0.16,
        });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .sbr-word {
          display: inline-block;
          will-change: opacity, filter, transform;
        }
      `}</style>
      <section
        ref={rootRef}
        className="flex justify-center font-sans py-32 md:py-44"
        style={{
          paddingInline: "6vw",
          color: FG_COLOR,
          backgroundColor: "#0E0E0E",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <div className="flex flex-col">
          {eyebrow && (
            <div className="uppercase font-mono mb-6" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.75px", color: "#FFFFFF99" }}>
              {eyebrow}
            </div>
          )}
        <p
          ref={textRef}
          className="m-0 font-sans"
          style={{
            maxWidth: "30ch",
            fontWeight: 400,
            fontSize: "clamp(1.75rem, 1rem + 2.8vw, 3.4rem)",
            lineHeight: 1.22,
            letterSpacing: "-0.01em",
            willChange: "transform",
          }}
        >
          {children}
        </p>
          {note && (
            <p className="m-0 mt-6 font-mono uppercase" style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.75px", color: "#FFFFFF80" }}>
              {note}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
