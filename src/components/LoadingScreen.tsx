import { useEffect, useState } from "react";

/**
 * Cinematic Pecho brand intro.
 * Shown once per session (sessionStorage flag), or after a fresh tab open.
 *
 * Timeline (~3.1s):
 *   0.0s  jar fades in
 *   0.3s  lid twists open and lifts
 *   1.0s  jar tilts to pour
 *   1.4s  thick peanut butter pours from the jar mouth
 *   2.4s  pour stretches across the top of the viewport (handoff)
 *   3.0s  loader fades out, reveals the app
 *
 * Fires `pecho:intro-complete` on `window` when the handoff ends so the
 * fixed dripping header can play its own "settle" animation and take over.
 */

const SESSION_KEY = "pecho.intro.seen";

export function LoadingScreen() {
  const [phase, setPhase] = useState<"idle" | "playing" | "fading" | "gone">("idle");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let already = false;
    try {
      already = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}

    if (already) {
      // Already played this session — no intro, header is already settled.
      window.dispatchEvent(new CustomEvent("pecho:intro-complete"));
      setPhase("gone");
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}

    setPhase("playing");

    if (reduce) {
      const t = setTimeout(() => {
        window.dispatchEvent(new CustomEvent("pecho:intro-complete"));
        setPhase("gone");
      }, 250);
      return () => clearTimeout(t);
    }

    const tHandoff = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("pecho:intro-complete"));
    }, 2700);
    const tFade = setTimeout(() => setPhase("fading"), 2900);
    const tGone = setTimeout(() => setPhase("gone"), 3400);
    return () => {
      clearTimeout(tHandoff);
      clearTimeout(tFade);
      clearTimeout(tGone);
    };
  }, []);

  if (phase === "gone" || phase === "idle") return null;

  return (
    <div
      className={`pecho-loader fixed inset-0 z-[100] flex items-center justify-center bg-brand-cream transition-opacity duration-500 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      {/* Handoff sheet — a full-width thick peanut butter band that appears
          near the end and morphs into the fixed header drip. */}
      <div className="pecho-intro-handoff pointer-events-none absolute inset-x-0 top-0 h-[14vh] origin-top" />

      {/* Jar scene */}
      <div className="pecho-intro-scene relative w-[260px] h-[360px] sm:w-[300px] sm:h-[420px]">
        {/* Pour column (behind the jar so it appears to come from the mouth) */}
        <div className="pecho-intro-pour absolute left-1/2 -translate-x-1/2 top-[38%] w-[54px] sm:w-[64px] h-[62%] origin-top rounded-b-[40%]" />

        {/* Jar + lid group (this whole group tilts) */}
        <div className="pecho-intro-jar absolute inset-0 origin-[50%_85%]">
          {/* Lid */}
          <div className="pecho-intro-lid absolute left-1/2 -translate-x-1/2 top-[8%] w-[62%] h-[9%] rounded-md bg-gradient-to-b from-[#3a231a] via-[#2a1810] to-[#180c07] shadow-[inset_0_-3px_0_rgba(0,0,0,0.35),inset_0_2px_0_rgba(255,255,255,0.08)]">
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-white/10" />
          </div>

          {/* Jar body (glass) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[17%] w-[70%] h-[76%] rounded-[18%_18%_22%_22%/8%_8%_18%_18%] bg-gradient-to-b from-white/40 via-white/10 to-white/25 backdrop-blur-[1px] ring-1 ring-brand-roast/15 overflow-hidden shadow-[inset_0_20px_40px_-20px_rgba(0,0,0,0.15)]">
            {/* Peanut butter fill inside jar */}
            <div className="absolute inset-x-2 bottom-2 top-[10%] rounded-b-[22%] bg-[radial-gradient(ellipse_at_30%_20%,#f6b26b_0%,#e8871e_40%,#a55a1b_100%)]">
              <div className="absolute inset-x-3 top-2 h-3 rounded-full bg-white/25 blur-[2px]" />
            </div>
            {/* Label */}
            <div className="pecho-intro-label absolute left-1/2 -translate-x-1/2 top-[38%] w-[78%] h-[28%] rounded-md bg-[var(--brand-toast)] flex items-center justify-center shadow-md">
              <span className="font-display text-white text-[28px] sm:text-[32px] tracking-tight leading-none select-none">
                Pecho
              </span>
            </div>
            {/* Glass highlight */}
            <div className="absolute left-3 top-6 bottom-8 w-2 rounded-full bg-white/40 blur-[1px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
