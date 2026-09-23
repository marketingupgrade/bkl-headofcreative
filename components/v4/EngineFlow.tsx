"use client";

/**
 * @component EngineFlow
 * @description FIG. 00 · the Creative Engine today and after the upgrade.
 *   Pinned stage (CSS sticky, same pattern as the kit's gems) with one
 *   scrubbed GSAP timeline: the "today" chain arrives, its last link
 *   ("what worked stays in heads") dims away, then the "after" loop builds
 *   link by link and closes on itself. Chip entrances reuse the kit's
 *   scroll-text-reveal values (yPercent 115 → 0, power3.out) and the
 *   shared "signature" ease. Under 992px or with reduced motion the
 *   figure renders static and readable.
 */

import * as React from "react";
import { gsap } from "./lib/gsap";

const FG = "#FFFFFF";
const ACCENT = "#FCF2D3";

const TODAY = ["Strategist bedenkt", "20 concepten", "Editors maken", "Acquisition draait"];
const TODAY_LOST = "Wat werkte, blijft in hoofden";
const AFTER = [
  "Listener oogst",
  "Dossier",
  "Strategist kiest",
  "Editors: 12 nieuw + een ladder op elke winnaar",
  "Acquisition: verdict elke maandag",
  "Learning Log",
];

function Arrow({ dim }: { dim?: boolean }) {
  return (
    <span aria-hidden="true" className="font-mono ef-arrow" style={{ color: dim ? "#FFFFFF40" : ACCENT, fontSize: "18px", padding: "0 0.35rem" }}>
      →
    </span>
  );
}

function Chip({ children, tone }: { children: React.ReactNode; tone: "today" | "after" | "lost" }) {
  const styles: Record<string, React.CSSProperties> = {
    today: { border: "1px solid #FFFFFF33", color: "#FFFFFFcc", background: "#FFFFFF08" },
    lost: { border: "1px dashed #FFFFFF33", color: "#FFFFFF99", background: "transparent" },
    after: { border: `1px solid ${ACCENT}`, color: "#0E0E0E", background: ACCENT, fontWeight: 700 },
  };
  return (
    <span
      className="inline-flex items-center rounded-full font-sans"
      style={{ padding: "0.55rem 1rem", fontSize: "clamp(0.9rem, 0.7rem + 0.5vw, 1.1rem)", lineHeight: 1.2, ...styles[tone] }}
    >
      {children}
    </span>
  );
}

export default function EngineFlow() {
  const rootRef = React.useRef<HTMLElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.innerWidth < 992;
    setPinned(!(reduce || narrow));
  }, []);

  React.useEffect(() => {
    if (!pinned) return;
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);
      const today = q(".ef-today .ef-item");
      const lost = q(".ef-lost");
      const after = q(".ef-after .ef-item");
      const loop = q(".ef-loop");
      const tagline = q(".ef-tagline");

      gsap.set([...today, ...after, ...lost], { autoAlpha: 0, y: 18 });
      gsap.set(loop, { autoAlpha: 0, scaleX: 0, transformOrigin: "100% 50%" });
      gsap.set(tagline, { autoAlpha: 0, y: 14 });
      gsap.set(q(".ef-after-label"), { autoAlpha: 0.25 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: track, start: "top top", end: "bottom bottom", scrub: 0.8 },
      });

      tl.to(today, { autoAlpha: 1, y: 0, ease: "signature", duration: 0.5, stagger: 0.25 });
      tl.to(lost, { autoAlpha: 1, y: 0, ease: "signature", duration: 0.5 });
      tl.to(lost, { autoAlpha: 0.45, filter: "blur(1.5px)", duration: 0.8, ease: "power1.in" }, "+=0.3");
      tl.to(q(".ef-today"), { opacity: 0.45, duration: 0.6 }, "<");
      tl.to(q(".ef-after-label"), { autoAlpha: 1, duration: 0.3 });
      tl.to(after, { autoAlpha: 1, y: 0, ease: "signature", duration: 0.5, stagger: 0.35 });
      tl.to(loop, { autoAlpha: 1, scaleX: 1, ease: "signature", duration: 0.8 });
      tl.to(tagline, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.6 });
      tl.to({}, { duration: 0.8 });
    }, root);

    return () => ctx.revert();
  }, [pinned]);

  const figure = (
    <div className="w-full max-w-[1200px] mx-auto px-8 max-[991px]:px-6 max-[767px]:px-5">
      <div className="uppercase font-mono" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.75px", color: "#FFFFFF99" }}>
        FIG. 00 · De Creative Engine
      </div>
      <h2
        className="m-0 mt-4 font-sans max-[767px]:text-[34px]"
        style={{ fontSize: "clamp(34px, 4.2vw, 60px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-1.5px", maxWidth: "20em" }}
      >
        <span style={{ color: "#FFFFFF8c" }}>De basis staat.</span> Wat ontbreekt is een engine die onthoudt.
      </h2>
      <p className="m-0 mt-4" style={{ fontSize: "18px", lineHeight: 1.5, color: "#FFFFFF99", maxWidth: "46rem" }}>
        Twintig concepten per week is veel, en de outdoor-lijn die eind augustus live ging stond binnen weken op #4 en #9. Het
        probleem zit niet in de mensen, maar in de vorm: alles loopt door één hoofd, de niche stopt na drie seconden, en wat werkte
        wordt nergens vastgelegd.
      </p>

      <div className="mt-12 max-[767px]:mt-10 grid gap-10 max-[767px]:gap-8">
        <div className="grid grid-cols-[7rem_1fr] max-[767px]:grid-cols-1 gap-4 items-start">
          <div className="uppercase font-mono pt-3" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.75px", color: "#FFFFFF99" }}>
            Vandaag
          </div>
          <div className="ef-today flex flex-wrap items-center gap-y-3">
            {TODAY.map((t) => (
              <span key={t} className="ef-item inline-flex items-center">
                <Chip tone="today">{t}</Chip>
                <Arrow dim />
              </span>
            ))}
            <span className="ef-lost inline-flex items-center">
              <Chip tone="lost">{TODAY_LOST}</Chip>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[7rem_1fr] max-[767px]:grid-cols-1 gap-4 items-start">
          <div className="ef-after-label uppercase font-mono pt-3" style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.75px", color: ACCENT }}>
            Straks
          </div>
          <div>
            <div className="ef-after flex flex-wrap items-center gap-y-3">
              {AFTER.map((t, i) => (
                <span key={t} className="ef-item inline-flex items-center">
                  <Chip tone="after">{t}</Chip>
                  {i < AFTER.length - 1 && <Arrow />}
                </span>
              ))}
            </div>
            <div className="ef-loop mt-4 flex items-center gap-3" aria-label="en weer terug naar het volgende dossier">
              <span className="font-mono" style={{ color: ACCENT, fontSize: "18px" }}>↺</span>
              <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT}33)` }} />
              <span className="font-mono uppercase" style={{ fontSize: "11px", letterSpacing: "0.75px", color: ACCENT }}>
                terug naar het volgende dossier
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="ef-tagline m-0 mt-12" style={{ fontSize: "clamp(1.3rem, 1rem + 1.2vw, 2rem)", lineHeight: 1.3, maxWidth: "34ch" }}>
        Niet meer mensen. <span className="accent">Een andere grondstof: ideeën oogsten in plaats van verzinnen.</span>
      </p>
      <p className="m-0 mt-4 font-mono uppercase" style={{ fontSize: "11px", letterSpacing: "0.75px", color: "#FFFFFF66" }}>
        De vandaag-kant is afgeleid uit de briefing · corrigeer hem gerust in meeting 2
      </p>
    </div>
  );

  return (
    <section ref={rootRef} className="relative font-sans" style={{ backgroundColor: "#0E0E0E", color: FG }} aria-label="De Creative Engine, vandaag en straks">
      {pinned ? (
        <div ref={trackRef} className="relative" style={{ height: "220vh" }}>
          <div className="sticky top-0 h-screen overflow-hidden flex items-center">{figure}</div>
        </div>
      ) : (
        <div className="py-28 max-[767px]:py-20">{figure}</div>
      )}
    </section>
  );
}
