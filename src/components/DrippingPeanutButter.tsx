import { useEffect, useRef, useState } from "react";

/**
 * Realistic dripping peanut butter across the top of the page.
 *
 * 1. Intro (~1.8s): the slab and drips "pour" down using CSS clip-path.
 * 2. Idle: gentle gloss shine sweeps across.
 * 3. On scroll: occasional glossy droplets detach from random points along
 *    the slab, fall, stretch, and disappear once they leave the viewport.
 *
 * Fully respects prefers-reduced-motion.
 */

type Droplet = {
  id: number;
  x: number; // px from left
  size: number; // px
  duration: number; // ms
  delay: number; // ms
  startY: number; // px start below slab
};

const DROPLET_SPAWN_SCROLL_PX = 320; // spawn ~ every N px of scroll
const DROPLET_MAX = 6;

export function DrippingPeanutButter() {
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const reducedRef = useRef(false);
  const nextIdRef = useRef(1);
  const lastSpawnScrollRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    reducedRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedRef.current) return;

    const spawnDroplet = () => {
      setDroplets((prev) => {
        if (prev.length >= DROPLET_MAX) return prev;
        const width = containerRef.current?.clientWidth ?? window.innerWidth;
        const drop: Droplet = {
          id: nextIdRef.current++,
          x: 20 + Math.random() * (width - 40),
          size: 8 + Math.random() * 14,
          duration: 1400 + Math.random() * 900,
          delay: Math.random() * 120,
          startY: 40 + Math.random() * 30,
        };
        return [...prev, drop];
      });
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const y = window.scrollY;
        if (Math.abs(y - lastSpawnScrollRef.current) > DROPLET_SPAWN_SCROLL_PX) {
          lastSpawnScrollRef.current = y;
          // 60% chance to actually drop something for randomness
          if (Math.random() < 0.7) spawnDroplet();
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const removeDroplet = (id: number) =>
    setDroplets((prev) => prev.filter((d) => d.id !== id));

  return (
    <div
      ref={containerRef}
      className="pecho-drip pointer-events-none fixed inset-x-0 top-0 z-40 select-none"
      aria-hidden="true"
    >
      {/* Main slab — animates in via clip-path */}
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="pecho-slab block w-full h-[90px] sm:h-[110px] md:h-[130px]"
      >
        <defs>
          <linearGradient id="pb-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c96410" />
            <stop offset="45%" stopColor="#f3820a" />
            <stop offset="100%" stopColor="#8a3d06" />
          </linearGradient>
          <linearGradient id="pb-gloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe0b3" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffe0b3" stopOpacity="0" />
          </linearGradient>
          <filter id="pb-soft" x="-2%" y="-2%" width="104%" height="110%">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>

        {/* Body: top slab with irregular hanging drips */}
        <path
          filter="url(#pb-soft)"
          fill="url(#pb-body)"
          d="
            M 0 0 L 1440 0 L 1440 70
            C 1400 82, 1380 130, 1360 130 C 1340 130, 1320 82, 1300 70
            L 1220 70
            C 1200 82, 1185 160, 1165 160 C 1145 160, 1130 82, 1110 70
            L 980 70
            C 960 82, 945 118, 925 118 C 905 118, 890 82, 870 70
            L 780 70
            C 760 82, 740 175, 720 175 C 700 175, 680 82, 660 70
            L 540 70
            C 520 82, 505 122, 485 122 C 465 122, 450 82, 430 70
            L 320 70
            C 300 82, 285 155, 265 155 C 245 155, 230 82, 210 70
            L 110 70
            C 90 82, 75 108, 55 108 C 35 108, 20 82, 0 70
            Z
          "
        />

        {/* Rounded droplet tips for realism */}
        <g fill="url(#pb-body)" filter="url(#pb-soft)">
          <circle cx="1360" cy="128" r="12" />
          <circle cx="1165" cy="158" r="15" />
          <circle cx="925" cy="116" r="10" />
          <circle cx="720" cy="173" r="17" />
          <circle cx="485" cy="120" r="10" />
          <circle cx="265" cy="153" r="13" />
          <circle cx="55" cy="106" r="9" />
        </g>

        {/* Glossy specular highlight strip */}
        <rect x="0" y="8" width="1440" height="10" rx="5" fill="url(#pb-gloss)" opacity="0.7" />
        <rect x="0" y="4" width="1440" height="4" rx="2" fill="#fff2dc" opacity="0.35" />
      </svg>

      {/* Sweeping gloss highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[60px] overflow-hidden">
        <div className="animate-gloss absolute top-1 -left-40 h-6 w-40 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full blur-md" />
      </div>

      {/* Falling droplets on scroll */}
      {droplets.map((d) => (
        <span
          key={d.id}
          className="pecho-droplet"
          style={{
            left: `${d.x}px`,
            top: `${d.startY}px`,
            width: `${d.size}px`,
            height: `${d.size * 1.35}px`,
            animationDuration: `${d.duration}ms`,
            animationDelay: `${d.delay}ms`,
          }}
          onAnimationEnd={() => removeDroplet(d.id)}
        />
      ))}
    </div>
  );
}
