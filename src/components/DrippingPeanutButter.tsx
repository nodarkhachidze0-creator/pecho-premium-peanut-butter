import { useEffect, useRef, useState } from "react";

/**
 * Fixed, organic peanut butter drip layer attached to the top of the page.
 *
 * - One continuous SVG slab with 7 asymmetric drips.
 * - Waits for the `pecho:intro-complete` event (or renders already-settled
 *   if the loader was skipped this session) then plays a short "settle".
 * - On scroll, occasional glossy droplets detach from the drip tips and fall.
 * - Fully respects prefers-reduced-motion.
 */

type Droplet = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
};

// Hand-tuned drip tip positions in the 1440x220 SVG viewBox.
// x is horizontal position, y is drip tip Y (used for droplet spawn).
const DRIP_TIPS: Array<{ x: number; y: number; size: number }> = [
  { x: 90, y: 108, size: 10 },
  { x: 265, y: 155, size: 13 },
  { x: 485, y: 122, size: 11 },
  { x: 720, y: 175, size: 16 },
  { x: 925, y: 118, size: 10 },
  { x: 1165, y: 160, size: 15 },
  { x: 1360, y: 130, size: 12 },
];

const SESSION_KEY = "pecho.intro.seen";
const DROPLET_SPAWN_SCROLL_PX = 380;
const DROPLET_MAX = 5;

export function DrippingPeanutButter() {
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const [settled, setSettled] = useState(false);
  const nextIdRef = useRef(1);
  const lastSpawnScrollRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedRef = useRef(false);

  // Handoff from the loader (or immediate if already seen this session).
  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    // Safety net in case the event was missed.
    const safety = setTimeout(() => setSettled(true), 4000);
    return () => {
      window.removeEventListener("pecho:intro-complete", onComplete);
      clearTimeout(safety);
    };
  }, []);

  // Scroll-driven droplet spawning.
  useEffect(() => {
    if (!settled || reducedRef.current) return;

    const spawn = () => {
      setDroplets((prev) => {
        if (prev.length >= DROPLET_MAX) return prev;
        const container = containerRef.current;
        const w = container?.clientWidth ?? window.innerWidth;
        const h = container?.clientHeight ?? 120;
        // Pick a random drip tip and translate to real pixel coordinates.
        const tip = DRIP_TIPS[Math.floor(Math.random() * DRIP_TIPS.length)];
        const x = (tip.x / 1440) * w;
        const y = (tip.y / 220) * h - 4;
        return [
          ...prev,
          {
            id: nextIdRef.current++,
            x,
            y,
            size: tip.size + Math.random() * 4 - 2,
            duration: 1500 + Math.random() * 900,
          },
        ];
      });
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const y = window.scrollY;
        if (Math.abs(y - lastSpawnScrollRef.current) > DROPLET_SPAWN_SCROLL_PX) {
          lastSpawnScrollRef.current = y;
          if (Math.random() < 0.75) spawn();
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [settled]);

  const removeDroplet = (id: number) =>
    setDroplets((prev) => prev.filter((d) => d.id !== id));

  return (
    <div
      ref={containerRef}
      className={`pecho-drip pointer-events-none fixed inset-x-0 top-0 z-40 select-none ${
        settled ? "pecho-drip-settled" : "pecho-drip-hidden"
      }`}
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
          <filter id="pb-soft" x="-2%" y="-2%" width="104%" height="115%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>

        {/* Main organic slab. Asymmetric drips of varied length and width. */}
        <path
          filter="url(#pb-soft)"
          fill="url(#pb-body)"
          d="
            M 0 0 L 1440 0 L 1440 68
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
            C 92 82, 78 106, 55 106 C 34 106, 20 82, 0 68
            Z
          "
        />

        {/* Rounded tip caps for realism */}
        <g fill="url(#pb-body)" filter="url(#pb-soft)">
          {DRIP_TIPS.map((t) => (
            <circle key={t.x} cx={t.x} cy={t.y - 4} r={t.size} />
          ))}
        </g>

        {/* Soft inner shadow on tip lower edges */}
        <g fill="rgba(60, 25, 5, 0.35)" filter="url(#pb-soft)">
          {DRIP_TIPS.map((t) => (
            <ellipse key={`s-${t.x}`} cx={t.x} cy={t.y + 2} rx={t.size - 2} ry={2.5} />
          ))}
        </g>

        {/* Glossy specular highlight */}
        <path
          d="M 0 6 Q 720 22 1440 6 L 1440 16 Q 720 32 0 16 Z"
          fill="url(#pb-gloss)"
          opacity="0.7"
        />
        <rect x="0" y="3" width="1440" height="3" rx="1.5" fill="#fff2dc" opacity="0.35" />
      </svg>

      {/* Falling droplets on scroll */}
      {droplets.map((d) => (
        <span
          key={d.id}
          className="pecho-droplet"
          style={{
            left: `${d.x}px`,
            top: `${d.y}px`,
            width: `${d.size}px`,
            height: `${d.size * 1.4}px`,
            animationDuration: `${d.duration}ms`,
          }}
          onAnimationEnd={() => removeDroplet(d.id)}
        />
      ))}
    </div>
  );
}
