import { useEffect, useState } from "react";
import classicJar from "@/assets/pecho-classic-1kg.png.asset.json";

/**
 * Simple logo pop-in loader on cream background.
 * Fires `pecho:intro-complete` once so the drip layer can settle.
 */

const SESSION_KEY = "pecho.intro.seen";

export function LoadingScreen() {
  const [phase, setPhase] = useState<"idle" | "playing" | "fading" | "gone">("idle");

  useEffect(() => {
    let already = false;
    try {
      already = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}

    if (already) {
      window.dispatchEvent(new CustomEvent("pecho:intro-complete"));
      setPhase("gone");
      return;
    }
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}

    setPhase("playing");

    const tHandoff = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("pecho:intro-complete"));
    }, 900);
    const tFade = setTimeout(() => setPhase("fading"), 1100);
    const tGone = setTimeout(() => setPhase("gone"), 1600);
    return () => {
      clearTimeout(tHandoff);
      clearTimeout(tFade);
      clearTimeout(tGone);
    };
  }, []);

  if (phase === "gone" || phase === "idle") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-brand-cream transition-opacity duration-500 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="premium-loader-scene">
        <span className="premium-loader-lid" aria-hidden="true" />
        <img src={classicJar.url} alt="" className="premium-loader-jar" />
        <span className="premium-loader-peanut" aria-hidden="true">🥜</span>
      </div>
    </div>
  );
}
