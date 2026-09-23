"use client";

/**
 * @component DocToc
 * @description Floating table of contents for the document pages. From
 *   1440px a sticky rail on the right, drawn as a belt: a stitched strap
 *   runs past the numbered sections, the part already read shows the
 *   ratchet teeth of a Buckley belt, and the buckle slides to the active
 *   section.
 *   Below that a pill at the bottom shows the current section on a small
 *   horizontal belt and opens the full list as a sheet. Active section = the
 *   last h2 above the fold line.
 */

import * as React from "react";

export type TocItem = { id: string; num: string; label: string; title: string };

const ACCENT = "#FCF2D3";
const LINE = 140; // px from the top where a section counts as "reached"

export default function DocToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = React.useState(-1);
  const [open, setOpen] = React.useState(false);
  const railRef = React.useRef<HTMLOListElement>(null);
  const [geo, setGeo] = React.useState({ top: 0, bottom: 0, buckle: 0 });

  React.useEffect(() => {
    const heads = items.map((it) => document.getElementById(it.id));
    let raf = 0;
    const update = () => {
      raf = 0;
      let idx = -1;
      heads.forEach((h, i) => {
        if (h && h.getBoundingClientRect().top <= LINE) idx = i;
      });
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  // Strap runs from the first to the last marker; the buckle sits on the
  // active one. Also keeps the active entry visible when the rail scrolls.
  React.useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const measure = () => {
      const lis = rail.querySelectorAll<HTMLElement>("li[data-i]");
      if (!lis.length) return;
      const mid = (el: HTMLElement) => el.offsetTop + el.offsetHeight / 2;
      const top = mid(lis[0]);
      const bottom = mid(lis[lis.length - 1]);
      setGeo({ top, bottom, buckle: active >= 0 ? mid(lis[active]) : top - 18 });
    };
    measure();
    rail.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active, items]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e: React.MouseEvent, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setOpen(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  if (items.length < 2) return null;
  const progress = active < 0 ? 0 : (active + 0.5) / items.length;
  const current = active >= 0 ? items[active] : null;

  return (
    <>
      {/* Desktop rail */}
      <nav
        aria-label="Inhoud"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden min-[1440px]:block"
        style={{ maxHeight: "calc(100vh - 140px)" }}
      >
        <ol ref={railRef} className="relative m-0 p-0 list-none overflow-y-auto overscroll-contain pr-1 [scrollbar-width:none]" style={{ maxHeight: "calc(100vh - 140px)" }}>
          {/* The belt: strap, ratchet teeth on the read part, buckle on the active section. */}
          <span
            aria-hidden="true"
            className="toc-strap absolute right-[9px] w-[14px] rounded-[3px]"
            style={{ top: geo.top - 14, height: geo.bottom - geo.top + 28 }}
          />
          <span
            aria-hidden="true"
            className="toc-teeth absolute right-[12px] w-[8px] toc-ease"
            style={{ top: geo.top - 10, height: Math.max(0, geo.buckle - geo.top + 10) }}
          />
          <span aria-hidden="true" className="toc-buckle absolute right-[4px] toc-ease" style={{ top: geo.buckle - 10 }}>
            <span className="toc-buckle-bar" />
          </span>
          {items.map((it, i) => {
            const on = i === active;
            const past = i < active;
            return (
              <li key={it.id} data-i={i}>
                <a
                  href={`#${it.id}`}
                  onClick={(e) => go(e, it.id)}
                  title={it.title}
                  aria-current={on ? "location" : undefined}
                  className="group flex items-center justify-end gap-4 py-[7px] no-underline font-mono text-[12px] tracking-[0.06em] whitespace-nowrap"
                >
                  <span
                    className="transition-colors duration-300 group-hover:text-white"
                    style={{ color: on ? ACCENT : past ? "#FFFFFF99" : "#FFFFFF66", fontWeight: on ? 600 : 400 }}
                  >
                    <span className="opacity-70">{it.num}.</span> {it.label}
                  </span>
                  {/* Spacer for the belt. No holes: a ratchet belt has none. */}
                  <span aria-hidden="true" className="h-[17px] w-[24px] flex-none" />
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile and tablet: pill plus sheet */}
      <div className="min-[1440px]:hidden">
        {open && <button type="button" aria-label="Sluit inhoud" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-[#0E0E0E99] backdrop-blur-[2px] cursor-default" />}
        <div className="fixed inset-x-0 bottom-4 z-40 flex flex-col items-center px-4 pointer-events-none">
          {open && (
            <ol
              id="doc-toc-sheet"
              className="pointer-events-auto m-0 mb-2 w-full max-w-[420px] list-none overflow-y-auto overscroll-contain rounded-2xl border border-[#FFFFFF1f] bg-[#161616] p-2"
              style={{ maxHeight: "65vh" }}
            >
              {items.map((it, i) => {
                const on = i === active;
                return (
                  <li key={it.id}>
                    <a
                      href={`#${it.id}`}
                      onClick={(e) => go(e, it.id)}
                      aria-current={on ? "location" : undefined}
                      className="flex gap-3 rounded-xl px-3 py-2.5 no-underline text-[15px] leading-snug"
                      style={{ color: on ? "#0E0E0E" : "#FFFFFFcc", background: on ? ACCENT : undefined }}
                    >
                      <span className="w-6 flex-none font-mono text-[12px] leading-[1.6] opacity-70">{it.num}</span>
                      <span>{it.title}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="doc-toc-sheet"
            className="pointer-events-auto flex w-full max-w-[340px] items-center gap-3 rounded-full border border-[#FFFFFF1f] bg-[#0E0E0Ee6] backdrop-blur py-2.5 pl-4 pr-3 font-mono text-[12px] tracking-[0.06em] text-white cursor-pointer"
          >
            <span className="flex min-w-0 flex-1 flex-col gap-1.5 text-left">
              <span className="truncate">{current ? `${current.num}. ${current.label}` : "Inhoud"}</span>
              {/* Mini belt: teeth up to the buckle. */}
              <span aria-hidden="true" className="toc-strap-h relative block h-[6px] w-full rounded-[2px]">
                <span className="toc-teeth-h absolute inset-y-[1px] left-[2px] toc-ease" style={{ width: `calc((100% - 4px) * ${progress})` }} />
                <span className="toc-buckle-h absolute top-1/2 toc-ease" style={{ left: `calc((100% - 4px) * ${progress})` }} />
              </span>
            </span>
            <span className="flex-none text-[#FFFFFF66]">
              {active + 1 > 0 ? active + 1 : "–"}/{items.length}
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="flex-none transition-transform" style={{ transform: open ? "rotate(180deg)" : undefined }}>
              <path d="M2 4.5L6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
