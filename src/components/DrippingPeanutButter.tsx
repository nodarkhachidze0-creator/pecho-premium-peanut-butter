import { useEffect, useRef, useState } from "react";

/**
 * Realistic dripping peanut butter that sits at the very top of the page.
 * On scroll the drips stretch downward with a smooth parallax feel, and a
 * subtle glossy highlight animates across the surface. Respects
 * prefers-reduced-motion.
 */
export function DrippingPeanutButter() {
  const [scroll, setScroll] = useState(0);
  const rafRef = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion.current) return;

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        // clamp 0..1 over first 600px of scroll
        const y = Math.min(window.scrollY, 600) / 600;
        setScroll(y);
        rafRef.current = null;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // stretch multipliers per drip
  const s = scroll; // 0..1
  const drips = [
    { x: 80, base: 60, stretch: 90, r: 14 },
    { x: 240, base: 40, stretch: 55, r: 10 },
    { x: 420, base: 90, stretch: 130, r: 18 },
    { x: 620, base: 55, stretch: 70, r: 12 },
    { x: 820, base: 110, stretch: 160, r: 20 },
    { x: 1020, base: 45, stretch: 65, r: 11 },
    { x: 1220, base: 75, stretch: 105, r: 15 },
    { x: 1380, base: 50, stretch: 70, r: 12 },
  ];

  return (
    <div
      className="pecho-drip pointer-events-none fixed inset-x-0 top-0 z-40 select-none"
      aria-hidden="true"
      style={{ willChange: "transform" }}
    >
      <svg
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        className="block w-full h-[110px] sm:h-[130px] md:h-[150px]"
      >
        <defs>
          <linearGradient id="pb-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c96410" />
            <stop offset="45%" stopColor="#f3820a" />
            <stop offset="100%" stopColor="#a54a08" />
          </linearGradient>
          <linearGradient id="pb-gloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd9a8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffd9a8" stopOpacity="0" />
          </linearGradient>
          <filter id="pb-blur" x="-5%" y="-5%" width="110%" height="120%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>

        {/* top slab */}
        <path
          filter="url(#pb-blur)"
          fill="url(#pb-body)"
          d={`M 0 0 L 1440 0 L 1440 ${60 + s * 20} 
              ${drips
                .map((d) => {
                  const bottom = d.base + d.stretch * s;
                  const cp = bottom - d.r * 0.6;
                  return `C ${d.x + d.r * 0.4} ${60 + s * 20}, ${d.x + d.r * 0.2} ${cp}, ${d.x} ${bottom} C ${d.x - d.r * 0.2} ${cp}, ${d.x - d.r * 0.4} ${60 + s * 20}, ${d.x - d.r} ${60 + s * 20}`;
                })
                .join(" L ")}
              L 0 ${60 + s * 20} Z`}
        />

        {/* rounded droplet tips */}
        {drips.map((d, i) => {
          const bottom = d.base + d.stretch * s;
          return (
            <circle
              key={i}
              cx={d.x - d.r / 2}
              cy={bottom - d.r * 0.3}
              r={d.r * (0.9 + s * 0.15)}
              fill="url(#pb-body)"
              filter="url(#pb-blur)"
            />
          );
        })}

        {/* glossy highlight strip */}
        <rect x="0" y="8" width="1440" height="14" rx="7" fill="url(#pb-gloss)" opacity="0.75" />
        <rect
          x="0"
          y="4"
          width="1440"
          height="6"
          rx="3"
          fill="#fff2dc"
          opacity="0.35"
        />
      </svg>

      {/* moving specular highlight */}
      <div className="absolute inset-x-0 top-0 h-[60px] overflow-hidden">
        <div className="animate-gloss absolute top-1 left-0 h-6 w-40 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full blur-md" />
      </div>
    </div>
  );
}
