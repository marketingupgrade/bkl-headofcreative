"use client";

/**
 * @component TextMaskZoomHero
 * @description Hero · BYQ gem "Text Mask Zoom" (text-mask-zoom-01), motion verbatim.
 *   "De niche stopt na drie seconden." is knocked out of a dark plate over the
 *   ratchet-field image; scrolling dives through the counter of the "o" in
 *   "stopt" until the field fills the viewport. Under 768px a static
 *   background-clip hero renders instead (LCP).
 */

import * as React from "react";
import { gsap } from "./lib/gsap";

const PHOTO_URL = "/images/hero-field.svg";
// Same art pre-rastered at 800×500 for the static mobile hero: the h1's
// background-clip paint had to rasterize the SVG on a 4×-throttled main
// thread mid-boot, which pushed the mobile LCP to ~4s. A 28KB JPEG
// decodes off-thread.
const PHOTO_MOBILE_URL = "/images/hero-field-mobile.jpg";
const BG_COLOR = "#0E0E0E";
const FG_COLOR = "#FFFFFF";
const ACCENT = "#FCF2D3";
const WORD = "De niche stopt na drie seconden.";
const APERTURE = 11; // index of the "o" in "stopt"
const MASK_ID = "text-mask-zoom-cut";

export default function TextMaskZoomHero() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const pinRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const plateRef = React.useRef<SVGSVGElement>(null);
  const photoRef = React.useRef<HTMLImageElement>(null);
  const portholeRef = React.useRef<HTMLImageElement>(null);
  const captionRef = React.useRef<HTMLParagraphElement>(null);
  const meterRef = React.useRef<SVGTextElement>(null);
  const cutRef = React.useRef<SVGTextElement>(null);
  const disposedRef = React.useRef(false);
  // <768: the dive is skipped — the landscape field cover-crops to
  // garbage in a portrait viewport, and a multi-screen runway for one line is
  // hostile on a phone. BOTH variants are server-rendered and CSS-gated
  // (md:hidden / hidden md:block) so the mobile h1 — the page's LCP —
  // paints with the first HTML instead of waiting for hydration
  // (measured: JS-gated render put mobile LCP at 5.4s). The effect only
  // picks which variant stays and skips the GSAP build when narrow.
  const [narrow, setNarrow] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    disposedRef.current = false;
    const isNarrow = window.innerWidth < 768;
    setNarrow(isNarrow);
    if (isNarrow) return;
    const root = rootRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    const plate = plateRef.current;
    const photo = photoRef.current;
    const porthole = portholeRef.current;
    const caption = captionRef.current;
    const meter = meterRef.current;
    const cut = cutRef.current;

    if (!root || !pin || !stage || !plate || !photo || !porthole || !caption || !meter || !cut) return;

    let K = 20;
    let ox = 0;
    let oy = 0;
    let stageW = 1;
    let stageH = 1;
    let cxU = 0;
    let cyU = 0;
    let aU = 1;
    let bU = 1;
    let dKx = 1;
    let dKy = 1;
    let u1 = 0.25;
    let apertureFound = false;
    let lastS = 1;
    let resizeRaf = 0;

    function widestGap(inkAtIdx: (i: number) => boolean, len: number) {
      const runs: [number, number][] = [];
      let s = -1;
      for (let i = 0; i <= len; i++) {
        const ink = i < len && inkAtIdx(i);
        if (ink && s < 0) s = i;
        if (!ink && s >= 0) {
          runs.push([s, i]);
          s = -1;
        }
      }
      if (runs.length < 2) return null;
      let best: { start: number; end: number } | null = null;
      for (let i = 1; i < runs.length; i++) {
        const gap = { start: runs[i - 1][1], end: runs[i][0] };
        if (!best || gap.end - gap.start > best.end - best.start) best = gap;
      }
      return best && best.end - best.start >= 10 ? best : null;
    }

    function scanCounter(
      extent: DOMRect,
      fontSizePx: number,
      baselineY: number,
    ): { cx: number; cy: number; a: number; b: number } | null {
      const PAD = 12;
      const cw = Math.ceil(extent.width) + PAD * 2;
      const ch = Math.ceil(extent.height) + PAD * 2;
      if (cw < 24 || ch < 24) return null;
      const cv = document.createElement("canvas");
      cv.width = cw;
      cv.height = ch;
      const c = cv.getContext("2d", { willReadFrequently: true });
      if (!c) return null;
      c.font = `700 ${fontSizePx}px ${getComputedStyle(meter!).fontFamily}`;
      c.textBaseline = "alphabetic";
      c.fillText(WORD[APERTURE], PAD, PAD + (baselineY - extent.y));
      const data = c.getImageData(0, 0, cw, ch).data;
      const inkAt = (x: number, y: number) => data[(y * cw + x) * 4 + 3] > 128;
      let top = -1;
      let bottom = -1;
      for (let y = 0; y < ch; y++) {
        for (let x = 0; x < cw; x++) {
          if (inkAt(x, y)) {
            if (top < 0) top = y;
            bottom = y;
            break;
          }
        }
      }
      if (top < 0 || bottom - top < 24) return null;
      const midY = Math.round((top + bottom) / 2);
      const gapX = widestGap((x) => inkAt(x, midY), cw);
      if (!gapX) return null;
      const midX = Math.round((gapX.start + gapX.end) / 2);
      const gapY = widestGap((y) => inkAt(midX, y), ch);
      if (!gapY) return null;
      return {
        cx: extent.x + (midX - PAD),
        cy: extent.y + ((gapY.start + gapY.end) / 2 - PAD),
        a: (gapX.end - gapX.start) / 2,
        b: (gapY.end - gapY.start) / 2,
      };
    }

    function layout() {
      const w = stage!.clientWidth;
      const h = stage!.clientHeight;
      const PROBE = 100;
      meter!.setAttribute("font-size", String(PROBE));
      meter!.setAttribute("x", "0");
      meter!.setAttribute("y", "0");
      const probeWidth = Math.max(meter!.getComputedTextLength(), 1);
      const fs = (PROBE * w * 0.9) / probeWidth;
      meter!.setAttribute("font-size", String(fs));
      meter!.setAttribute("x", String(w / 2));
      meter!.setAttribute("y", String(h / 2));
      const box = meter!.getBBox();
      const newY = h / 2 + (h / 2 - (box.y + box.height / 2));
      meter!.setAttribute("y", String(newY));
      for (const attr of ["font-size", "x", "y"]) {
        cut!.setAttribute(attr, meter!.getAttribute(attr) ?? "");
      }

      const clampS = 9000 / fs;
      const o = meter!.getExtentOfChar(APERTURE);
      let counter: { cx: number; cy: number; a: number; b: number } | null = null;
      try {
        counter = scanCounter(o as unknown as DOMRect, fs, parseFloat(meter!.getAttribute("y") ?? "0"));
      } catch {
        counter = null;
      }

      if (counter) {
        apertureFound = true;
        stageW = w;
        stageH = h;
        cxU = counter.cx;
        cyU = counter.cy;
        aU = counter.a * 0.78;
        bU = counter.b * 0.78;
        dKx = (w / 2) * 1.45;
        dKy = (h / 2) * 1.45;
        u1 = Math.min(0.5, Math.max((2 * bU * 1.2) / h, (2 * aU * 1.2) / w, 1 / 20));
        const ringExit =
          Math.sqrt(Math.pow(w / 2 / counter.a, 2) + Math.pow(h / 2 / counter.b, 2)) * 1.12;
        K = Math.max(6, Math.min(ringExit, clampS));
        ox = (K * cxU - w / 2) / (K - 1);
        oy = (K * cyU - h / 2) / (K - 1);
        gsap.set(porthole, { transformOrigin: "0 0", opacity: 1 });
      } else {
        apertureFound = false;
        K = Math.max(4, Math.min(20, clampS));
        ox = o.x + o.width / 2;
        oy = o.y + o.height / 2;
        gsap.set(porthole, { opacity: 0 });
      }
      gsap.set(plate, { transformOrigin: `${ox}px ${oy}px` });
      applyDive(lastS);
    }

    function plateAlpha(s: number) {
      const f0 = (apertureFound ? 0.8 : 0.3) * K;
      const f1 = (apertureFound ? 0.95 : 0.75) * K;
      if (s <= f0) return 1;
      if (s >= f1) return 0;
      return 1 - (s - f0) / (f1 - f0);
    }

    function applyDive(s: number) {
      lastS = s;
      gsap.set(plate, { scale: s, opacity: plateAlpha(s) });
      if (!apertureFound) return;
      const t = Math.log(s) / Math.log(K);
      const u = Math.exp((1 - t) * Math.log(u1));
      const cx = ox + s * (cxU - ox);
      const cy = oy + s * (cyU - oy);
      const ex = Math.min(Math.exp((1 - t) * Math.log(aU) + t * Math.log(dKx)) / u, stageW / 2);
      const ey = Math.min(Math.exp((1 - t) * Math.log(bU) + t * Math.log(dKy)) / u, stageH / 2);
      gsap.set(porthole, {
        x: cx - (u * stageW) / 2,
        y: cy - (u * stageH) / 2,
        scaleX: u,
        scaleY: u,
        clipPath: `ellipse(${ex}px ${ey}px at 50% 50%)`,
      });
    }

    const handleResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(layout);
    };
    window.addEventListener("resize", handleResize);

    const ctx = gsap.context(() => {
      function build() {
        layout();

        const reduce =
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduce) {
          applyDive(1.4);
          gsap.set(caption, { autoAlpha: 1, y: 0 });
          return;
        }

        gsap.set(caption, { autoAlpha: 0, y: 14 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.9,
          },
        });

        tl.to({}, { duration: 0.8 }, 0);

        const dive = { p: 0 };
        tl.to(
          dive,
          {
            p: 1,
            duration: 6.2,
            ease: "sine.in",
            onUpdate: () => applyDive(Math.pow(K, dive.p)),
          },
          0.8,
        );

        tl.to(porthole, { autoAlpha: 0, duration: 0.15 }, 7.05);
        tl.to(photo, { scale: 1.06, ease: "none", duration: 2.4 }, 7.35);
        tl.to(caption, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 1.1 }, 7.6);
        tl.to({}, { duration: 0.4 }, 9.8);
      }

      if (document.fonts && document.fonts.ready) {
        // ctx.add, not a bare call: tweens created after the context
        // function returns are otherwise never collected, and
        // ctx.revert() would leak the ScrollTrigger on unmount.
        document.fonts.ready.then(() => {
          if (!disposedRef.current) ctx.add(build);
        });
      } else {
        build();
      }
    }, root);

    return () => {
      disposedRef.current = true;
      ctx.revert();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(resizeRaf);
    };
  }, []);

  // Pre-hydration (narrow === null) the CSS media classes decide which
  // variant shows; after the effect runs, the state pins the choice so a
  // rotation across 767px keeps today's behavior (no live swap).
  const staticCls = narrow === null ? "md:hidden" : narrow ? "" : "hidden";
  const animCls = narrow === null ? "hidden md:block" : narrow ? "hidden" : "";

  return (
    <>
      {/* Discovered late as CSS backgrounds otherwise — these are the
          paint of the mobile LCP h1 and the desktop dive field. */}
      <link rel="preload" as="image" href={PHOTO_MOBILE_URL} media="(max-width: 767px)" />
      <link rel="preload" as="image" href={PHOTO_URL} media="(min-width: 768px)" />

    {/* Static mobile hero: the same "field through the glyphs" read,
        as wrapping HTML text (background-clip: text), one viewport tall. */}
      <section className={`relative font-sans ${staticCls}`} style={{ background: BG_COLOR, color: FG_COLOR }}>
        <div className="relative flex h-[100svh] items-center justify-center overflow-hidden px-6">
          <h1
            className="m-0 text-center font-sans"
            style={{
              fontWeight: 700,
              fontSize: "clamp(2.6rem, 13vw, 3.8rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              // Solid fallback UNDER the field image: bg-clip text with
              // only an image paints nothing until the image decodes, so
              // the h1 (the mobile LCP) stayed invisible seconds into a
              // throttled load. With a color the glyphs paint at first
              // paint in the field's mid-amber; the art layers in on the
              // same element at the same size, so no later LCP candidate.
              backgroundColor: ACCENT,
              backgroundImage: `url('${PHOTO_MOBILE_URL}')`,
              backgroundSize: "cover",
              // Sample the clean glow above the wordmark — centered, the
              // mark's dark strokes bleed through the lower glyph line.
              backgroundPosition: "center 40%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {WORD}
          </h1>
          <p
            className="absolute m-0 font-mono"
            style={{
              left: "1.25rem",
              bottom: "1.25rem",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.88)",
            }}
          >
            Joris van Huët · Upgrade van de Creative Engine · Buckley Belts
          </p>

              {/* Scroll cue: thin pulsing cream line with a label. */}
              <div
                aria-hidden="true"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 motion-safe:animate-pulse"
                style={{ zIndex: 5 }}
              >
                <span
                  className="font-mono uppercase whitespace-nowrap"
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    color: "#FCF2D3",
                  }}
                >
                  Scroll om te beginnen
                </span>
                <span
                  className="block"
                  style={{
                    width: "1px",
                    height: "44px",
                    backgroundImage: "linear-gradient(#FCF2D3cc, #FCF2D300)",
                  }}
                />
              </div>
        </div>
      </section>

      <style>{`
        .tmz-glyphs {
          font-family: var(--font-sans-face), Arial, ui-sans-serif, sans-serif;
          font-weight: 700;
          letter-spacing: -0.01em;
          text-anchor: middle;
        }
        .tmz-meter {
          visibility: hidden;
          pointer-events: none;
        }
      `}</style>
      <section
        style={{ background: BG_COLOR, color: FG_COLOR }}
        className={`relative font-sans ${animCls}`}
      >
        <div ref={rootRef} className="relative">
          {/* Scroll runway — 380vh per the gem. */}
          <div ref={pinRef} className="relative" style={{ height: "190vh" }}>
            {/* Stage: CSS sticky replaces ScrollTrigger pin (see header). */}
            <div
              ref={stageRef}
              className="sticky top-0 overflow-hidden"
              style={{ height: "100vh", background: BG_COLOR }}
            >
              {/* Full-bleed reveal image — the CE mark on a dark field. */}
              <img
                ref={photoRef}
                src={PHOTO_URL}
                alt="Een veld van ratelstanden: een riem zonder gaatjes"
                width={1600}
                height={1000}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 1, transformOrigin: "50% 50%", willChange: "transform" }}
              />


              {/* SVG plate with the headline knocked out. */}
              <svg
                ref={plateRef}
                aria-hidden="true"
                focusable={false}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 2, willChange: "transform, opacity" }}
              >
                <defs>
                  <mask id={MASK_ID} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
                    <rect width="100%" height="100%" fill="white" />
                    <text ref={cutRef} className="tmz-glyphs" fill="black">
                      {WORD}
                    </text>
                  </mask>
                </defs>
                <rect width="100%" height="100%" fill={BG_COLOR} mask={`url(#${MASK_ID})`} />
                {/* Invisible meter twin, measurement only. */}
                <text ref={meterRef} className="tmz-glyphs tmz-meter" fill="none">
                  {WORD}
                </text>
              </svg>

              {/* Porthole — the photo inside the counter during the dive. */}
              <img
                ref={portholeRef}
                src={PHOTO_URL}
                alt=""
                aria-hidden="true"
                width={1600}
                height={1000}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ zIndex: 3, opacity: 0, willChange: "transform, opacity" }}
              />

              {/* Caption */}
              <p
                ref={captionRef}
                className="absolute m-0 font-mono"
                style={{
                  left: "clamp(1.25rem, 4vw, 3rem)",
                  bottom: "clamp(1.25rem, 4vw, 2.5rem)",
                  zIndex: 4,
                  fontSize: "0.8rem",
                  // Dark like the reference's caption: it fades in over
                  // the (bright) revealed field, not over the dark plate.
                  color: "rgba(4,4,4,0.88)",
                  opacity: 0,
                  willChange: "transform, opacity",
                }}
              >
                Joris van Huët · Upgrade van de Creative Engine · Buckley Belts
              </p>

              {/* Scroll cue: thin pulsing cream line with a label. */}
              <div
                aria-hidden="true"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 motion-safe:animate-pulse"
                style={{ zIndex: 5 }}
              >
                <span
                  className="font-mono uppercase whitespace-nowrap"
                  style={{
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    color: "#FCF2D3",
                  }}
                >
                  Scroll om te beginnen
                </span>
                <span
                  className="block"
                  style={{
                    width: "1px",
                    height: "44px",
                    backgroundImage: "linear-gradient(#FCF2D3cc, #FCF2D300)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
