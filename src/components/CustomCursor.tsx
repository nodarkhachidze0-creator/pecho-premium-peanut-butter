import { useEffect, useRef, useState } from "react";

/**
 * Premium desktop-only cursor with a soft orange glow.
 * Two layers: a small dot that tracks 1:1, and a larger glow that eases behind.
 * Grows and warms up over interactive elements.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || reduce) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let gx = x;
    let gy = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      }
    };
    const loop = () => {
      gx += (x - gx) * 0.18;
      gy += (y - gy) * 0.18;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${gx - 20}px, ${gy - 20}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = !!t.closest("a, button, [role='button'], input, textarea, select, summary, label");
      setActive(interactive);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("mouseover", onOver);
    document.body.classList.add("pecho-cursor-on");
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("pecho-cursor-on");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div ref={glowRef} className={`pecho-cursor-glow ${active ? "is-active" : ""}`} aria-hidden />
      <div ref={dotRef} className="pecho-cursor-dot" aria-hidden />
    </>
  );
}
