import { useEffect, useRef, useState } from "react";

export function CountUp({ value }: { value: string }) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? Number(match[1]) : Number.NaN;
  const suffix = match?.[2] ?? "";
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(Number.isFinite(target) ? 0 : value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !Number.isFinite(target) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - started) / 900);
        const eased = 1 - Math.pow(1 - progress, 3);
        const next = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
        setShown(`${next}${suffix}`);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [suffix, target, value]);

  return <span ref={ref}>{shown}</span>;
}