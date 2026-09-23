"use client";

/**
 * @component ConvergeIntro
 * @description The turn · Kelvin "Scroll-Driven Converging Text and Image"
 *   (kelvin-intro-text-2): "Creative" and "Targeting" slide in from ±62vw
 *   and meet around the buckle mark (scale 0.82 → 1.12); the copy fades up
 *   over the last 40% of the runway.
 */

import * as React from "react";
import Link from "next/link";

export default function ConvergeIntro() {
  const outerRef = React.useRef<HTMLDivElement>(null);
  const leftRef = React.useRef<HTMLHeadingElement>(null);
  const rightRef = React.useRef<HTMLHeadingElement>(null);
  const maskRef = React.useRef<HTMLDivElement>(null);
  const copyRef = React.useRef<HTMLDivElement>(null);
  const [ctaMainHovered, setCtaMainHovered] = React.useState(false);
  const [ctaSecHovered, setCtaSecHovered] = React.useState(false);

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Finished state, no scroll coupling.
      leftRef.current?.style.setProperty("transform", "translateX(0)");
      rightRef.current?.style.setProperty("transform", "translateX(0)");
      maskRef.current?.style.setProperty("transform", "scale(1.12)");
      if (copyRef.current) {
        copyRef.current.style.opacity = "1";
        copyRef.current.style.transform = "translateY(0)";
      }
      return;
    }

    const onScroll = () => {
      if (!outerRef.current) return;
      const rect = outerRef.current.getBoundingClientRect();
      const totalScrollable = outerRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      const vw = window.innerWidth;
      const travel = vw * 0.62;

      if (leftRef.current) {
        const x = -travel + progress * travel;
        leftRef.current.style.transform = `translateX(${x}px)`;
      }
      if (rightRef.current) {
        const x = travel - progress * travel;
        rightRef.current.style.transform = `translateX(${x}px)`;
      }
      if (maskRef.current) {
        const scale = 0.82 + progress * (1.12 - 0.82);
        maskRef.current.style.transform = `scale(${scale})`;
      }
      if (copyRef.current) {
        const copyProgress = Math.max(0, Math.min(1, (progress - 0.6) / 0.4));
        copyRef.current.style.opacity = String(copyProgress);
        copyRef.current.style.transform = `translateY(${24 - copyProgress * 24}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Initial offsets in vw (not window.innerWidth like the reference):
  // client components server-render here, and a window read in render
  // is a guaranteed hydration mismatch. -62vw is the same distance.
  const headingStyle: React.CSSProperties = {
    fontSize: "clamp(26px, 8.33vw, 120px)",
    fontWeight: 700,
    lineHeight: 0.9,
    letterSpacing: "-3px",
    willChange: "transform",
    transform: "translateX(-62vw)",
  };

  return (
    <section
      className="relative font-sans"
      style={{ backgroundColor: "#0E0E0E", color: "#FFFFFF", fontSize: 17, lineHeight: 1.5 }}
    >
      <div ref={outerRef} className="relative" style={{ height: "160vh" }}>
        <div
          className="sticky top-0 flex flex-col items-center justify-center overflow-hidden"
          style={{ height: "100vh", gap: 48 }}
        >
          <div className="relative flex flex-row items-center justify-center w-full gap-12 max-[767px]:gap-5 max-[479px]:gap-4">
            {/* Left word */}
            <h2 ref={leftRef} className="m-0 whitespace-nowrap" style={{ ...headingStyle, color: "#FFFFFF" }}>
              Creative
            </h2>

            {/* Image mask — the logo, per note 5:31. */}
            <div
              ref={maskRef}
              className="relative flex-none overflow-hidden rounded-xl flex items-center justify-center"
              style={{
                aspectRatio: "3 / 4",
                width: "20vw",
                willChange: "transform",
                transform: "scale(0.82)",
                // Same as the page ground:
                // the card disappears and only the mark floats.
                backgroundColor: "#0E0E0E",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/mark.svg"
                alt=""
                className="w-[72%] h-auto"
              />
            </div>

            {/* Right word */}
            <h2
              ref={rightRef}
              className="m-0 whitespace-nowrap"
              style={{
                ...headingStyle,
                color: "#FFFFFF",
                transform: "translateX(62vw)",
              }}
            >
              Targeting
            </h2>

            {/* Copy + CTAs, below the line. */}
            <div
              ref={copyRef}
              className="absolute text-center m-0 flex flex-col items-center gap-8"
              style={{
                top: "100%",
                left: 0,
                right: 0,
                paddingTop: "5vw",
                opacity: 0,
                transform: "translateY(24px)",
              }}
            >
              {/* Headline-scale copy, complementary to the converging words. */}
              <p
                className="m-0 mx-auto"
                style={{
                  fontSize: "clamp(1.5rem, 1rem + 2.2vw, 2.6rem)",
                  fontWeight: 500,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                  color: "#FFFFFF",
                  maxWidth: "26ch",
                  textWrap: "balance",
                }}
              >
                De belangrijkste vaardigheid is dan niet mooier maken, maar{" "}
                <em className="accent">preciezer weten tegen wie je praat.</em>
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/strategie/"
                  className="inline-flex items-center justify-center gap-2 uppercase no-underline font-mono"
                  style={{
                    color: "#000000",
                    backgroundColor: "#FCF2D3",
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "1px",
                    padding: "18px 30px",
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0 100%)",
                    borderRadius: 0,
                    opacity: ctaMainHovered ? 0.82 : 1,
                    transition: "opacity 0.4s cubic-bezier(.22,1,.36,1)",
                  }}
                  onMouseEnter={() => setCtaMainHovered(true)}
                  onMouseLeave={() => setCtaMainHovered(false)}
                >
                  Lees de strategie
                </Link>
                <Link
                  href="/audit/"
                  className="inline-flex items-center justify-center gap-2 uppercase no-underline font-mono"
                  style={{
                    color: "#FFFFFF",
                    backgroundColor: "transparent",
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "1px",
                    padding: "17px 29px",
                    clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0 100%)",
                    borderRadius: 0,
                    border: `1px solid ${ctaSecHovered ? "#FFFFFF" : "#FFFFFF29"}`,
                    transition: "border-color 0.4s cubic-bezier(.22,1,.36,1), color 0.4s cubic-bezier(.22,1,.36,1)",
                  }}
                  onMouseEnter={() => setCtaSecHovered(true)}
                  onMouseLeave={() => setCtaSecHovered(false)}
                >
                  De audience-audit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
