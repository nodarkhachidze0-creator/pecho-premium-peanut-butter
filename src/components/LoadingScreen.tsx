import { useEffect, useState } from "react";
import { PechoLogo } from "@/components/PechoLogo";

/**
 * Full-screen intro that shows on first paint and fades out.
 * Peanut butter slowly fills the logo (via CSS clip-path animation).
 */
export function LoadingScreen() {
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 200 : 1800;
    const fadeStart = total - 500;
    const t1 = setTimeout(() => setFading(true), fadeStart);
    const t2 = setTimeout(() => setGone(true), total);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;
  return (
    <div
      className={`pecho-loader fixed inset-0 z-[100] flex items-center justify-center bg-brand-cream transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
      aria-hidden="true"
    >
      <div className="relative">
        {/* Ghost logo */}
        <div className="opacity-15">
          <PechoLogo className="h-24 sm:h-32 w-auto" />
        </div>
        {/* Filled logo revealed by rising peanut butter */}
        <div className="pecho-loader-fill absolute inset-0 overflow-hidden">
          <PechoLogo className="h-24 sm:h-32 w-auto" />
        </div>
      </div>
    </div>
  );
}
