"use client";

/**
 * @component AudioToggle
 * @description Site-wide soundtrack, fixed top right. Starts playing muted
 *   (browsers only allow muted autoplay) and loops endlessly; the button
 *   unmutes, the slider sets the volume. Lives in the root layout, so the
 *   track keeps playing across client-side route changes. The mp3 plays
 *   through a hidden video element, since Chromium refuses muted autoplay
 *   on <audio>.
 */

import * as React from "react";

const SRC = "/audio/pitch-glitch.mp3";

export default function AudioToggle() {
  const audioRef = React.useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = React.useState(true);
  const [volume, setVolume] = React.useState(0.5);

  React.useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    // React does not render the muted attribute into the static HTML, so set
    // it on the element before asking for playback.
    a.muted = true;
    a.volume = volume;
    a.play().catch(() => {});
    // Autoplay can still be refused; start on the first interaction instead.
    const kick = () => {
      if (a.paused) a.play().catch(() => {});
    };
    window.addEventListener("pointerdown", kick, { once: true });
    window.addEventListener("keydown", kick, { once: true });
    return () => {
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("keydown", kick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apply = (nextMuted: boolean) => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted && a.paused) a.play().catch(() => {});
  };

  const onVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    apply(v === 0);
  };

  const off = muted || volume === 0;

  return (
    <div className="fixed top-3 right-3 z-[60] flex items-center gap-2 rounded-full border border-[#FFFFFF1f] bg-[#0E0E0Ecc] backdrop-blur pl-1 pr-3 py-1 font-sans">
      <video ref={audioRef} src={SRC} muted autoPlay loop playsInline preload="auto" aria-hidden="true" className="hidden" />
      <button
        type="button"
        onClick={() => apply(!muted)}
        aria-label={off ? "Geluid aan" : "Geluid uit"}
        aria-pressed={!off}
        className="flex h-8 w-8 items-center justify-center rounded-full text-white hover:bg-[#FFFFFF14] cursor-pointer"
        style={{ color: off ? "#FFFFFFb3" : "#FCF2D3" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
          {off ? (
            <path d="M17 9l5 6M22 9l-5 6" />
          ) : (
            <>
              <path d="M16.5 8.5a5 5 0 0 1 0 7" />
              <path d="M19 6a8.5 8.5 0 0 1 0 12" />
            </>
          )}
        </svg>
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={off ? 0 : volume}
        onChange={onVolume}
        aria-label="Volume"
        className="audio-volume w-20 max-[767px]:w-14"
        style={{ ["--vol" as string]: `${(off ? 0 : volume) * 100}%` }}
      />
    </div>
  );
}
