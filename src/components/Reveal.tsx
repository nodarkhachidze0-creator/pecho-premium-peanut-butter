import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  y?: number;
};

/**
 * Fades + slides children into view when they intersect the viewport.
 * Uses a single IntersectionObserver per instance; cheap and 60fps.
 * Respects prefers-reduced-motion by immediately marking as visible.
 */
export function Reveal({ children, delay = 0, as: Tag = "div", className = "", y = 24 }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: React.CSSProperties = {
    transform: visible ? "translate3d(0,0,0)" : `translate3d(0, ${y}px, 0)`,
    opacity: visible ? 1 : 0,
    transition: `opacity 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    willChange: visible ? "auto" : "opacity, transform",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
