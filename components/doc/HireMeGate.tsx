"use client";

import * as React from "react";

/**
 * A joke gate over /strategie/: the page blurs under a popup that asks to
 * be hired first. After 3 seconds it admits the joke and offers a close
 * button. Nothing is actually locked; the content is in the HTML.
 */
export default function HireMeGate() {
  const [open, setOpen] = React.useState(true);
  const [joke, setJoke] = React.useState(false);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const t = window.setTimeout(() => setJoke(true), 3000);
    return () => window.clearTimeout(t);
  }, []);

  React.useEffect(() => {
    if (joke) closeRef.current?.focus();
  }, [joke]);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && joke) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, joke]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-5"
      style={{ backgroundColor: "rgba(14,14,14,0.45)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-live="polite"
        className="relative w-full max-w-[34rem] rounded-2xl border border-[#FCF2D366] bg-[#0E0E0E] px-8 py-12 text-center shadow-2xl max-[479px]:px-6 max-[479px]:py-10"
      >
        {joke && (
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Sluiten"
            className="hmg-in absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#FFFFFFb3] transition-colors hover:bg-[#FFFFFF14] hover:text-white"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <p key={joke ? "joke" : "ask"} className="hmg-in m-0 font-sans text-[clamp(1.5rem,1rem+2vw,2.2rem)] font-bold leading-tight tracking-[-0.5px] text-white">
          {joke ? (
            <span className="accent" style={{ fontSize: "1.25em" }}>Grapje ;)</span>
          ) : (
            <>
              Neem me aan als <span className="accent">Head of Creative</span> om zichtbaar te maken
            </>
          )}
        </p>
      </div>
      <style>{`
        .hmg-in { animation: hmg-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes hmg-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}
