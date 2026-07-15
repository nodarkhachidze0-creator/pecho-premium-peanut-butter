import { useEffect, useState } from "react";

/**
 * Full-height background peanut butter drip layer.
 * Renders behind content, extending ~80vh down (past hero into News section).
 * No detached droplets.
 */

const SESSION_KEY = "pecho.intro.seen";

const DRIP_TIPS: Array<{ x: number; y: number; size: number }> = [
  { x: 90, y: 108, size: 10 },
  { x: 265, y: 155, size: 13 },
  { x: 485, y: 122, size: 11 },
  { x: 720, y: 175, size: 16 },
  { x: 925, y: 118, size: 10 },
  { x: 1165, y: 160, size: 15 },
  { x: 1360, y: 130, size: 12 },
];

export function DrippingPeanutButter() {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    let already = false;
    try {
      already = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}
    if (already) {
      setSettled(true);
      return;
    }
    const onComplete = () => setSettled(true);
    window.addEventListener("pecho:intro-complete", onComplete);
    const safety = setTimeout(() => setSettled(true), 3000);
    return () => {
      window.removeEventListener("pecho:intro-complete", onComplete);
      clearTimeout(safety);
    };
  }, []);

  return (
    <div
      className={`pecho-drip pointer-events-none absolute inset-x-0 top-0 -z-10 select-none transition-opacity duration-700 ${
        settled ? "opacity-100" : "opacity-0"
      }`}
      style={{ height: "80vh" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="block w-full h-[clamp(72px,10vh,140px)]"
      >
        <defs>
          <linearGradient id="pb-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c96410" />
            <stop offset="45%" stopColor="#f3820a" />
            <stop offset="100%" stopColor="#7a3608" />
          </linearGradient>
          <linearGradient id="pb-gloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe0b3" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffe0b3" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#pb-body)"
          d="M 0 0 L 1440 0 L 1440 68
            C 1410 78, 1385 128, 1360 128 C 1338 128, 1320 82, 1300 68
            L 1225 68
            C 1205 82, 1188 158, 1165 158 C 1143 158, 1130 82, 1108 68
            L 985 68
            C 962 82, 946 116, 925 116 C 906 116, 890 82, 870 68
            L 782 68
            C 760 82, 742 173, 720 173 C 698 173, 682 82, 660 68
            L 545 68
            C 522 82, 507 120, 485 120 C 464 120, 450 82, 430 68
            L 322 68
            C 302 82, 286 153, 265 153 C 244 153, 230 82, 210 68
            L 112 68
            C 92 82, 78 106, 55 106 C 34 106, 20 82, 0 68 Z"
        />
        <g fill="url(#pb-body)">
          {DRIP_TIPS.map((t) => (
            <circle key={t.x} cx={t.x} cy={t.y - 4} r={t.size} />
          ))}
        </g>
        <path
          d="M 0 6 Q 720 22 1440 6 L 1440 16 Q 720 32 0 16 Z"
          fill="url(#pb-gloss)"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}
