import { forwardRef, useEffect, useImperativeHandle, useRef, type CSSProperties } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  priority?: boolean;
  variant?: "classic" | "crunchy" | "bundle";
  hero?: boolean;
};

const eyeSets = {
  classic: [{ x: 45.8, y: 51.2 }, { x: 54.2, y: 51.2 }],
  crunchy: [{ x: 45.8, y: 51.2 }, { x: 54.2, y: 51.2 }],
  bundle: [
    { x: 20.6, y: 54.2 }, { x: 25.1, y: 54.2 },
    { x: 47.8, y: 48.5 }, { x: 52.4, y: 48.5 },
    { x: 75.2, y: 54.2 }, { x: 79.7, y: 54.2 },
  ],
};

export const InteractiveProductImage = forwardRef<HTMLImageElement, Props>(function InteractiveProductImage(
  { src, alt, className = "", loading = "lazy", priority = false, variant = "classic", hero = false },
  forwardedRef,
) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useImperativeHandle(forwardedRef, () => imageRef.current as HTMLImageElement);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = true;
    const render = () => {
      if (!active) return;
      const current = currentRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * 0.11;
      current.y += (target.y - current.y) * 0.11;
      root.style.setProperty("--look-x", `${current.x.toFixed(2)}px`);
      root.style.setProperty("--look-y", `${current.y.toFixed(2)}px`);
      root.style.setProperty("--image-x", `${(current.x * 0.65).toFixed(2)}px`);
      root.style.setProperty("--image-y", `${(current.y * 0.5).toFixed(2)}px`);
      root.style.setProperty("--image-r", `${(current.x * 0.22).toFixed(2)}deg`);
      frameRef.current = requestAnimationFrame(render);
    };
    frameRef.current = requestAnimationFrame(render);

    const point = (clientX: number, clientY: number) => {
      const rect = root.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, (clientX - (rect.left + rect.width / 2)) / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, (clientY - (rect.top + rect.height / 2)) / (rect.height / 2)));
      targetRef.current = { x: nx * 4, y: ny * 3 };
    };
    const onPointerMove = (event: PointerEvent) => point(event.clientX, event.clientY);
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) point(touch.clientX, touch.clientY);
    };
    const center = () => { targetRef.current = { x: 0, y: 0 }; };

    root.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerleave", center, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: true });
    root.addEventListener("touchend", center, { passive: true });
    return () => {
      active = false;
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", center);
      root.removeEventListener("touchmove", onTouchMove);
      root.removeEventListener("touchend", center);
    };
  }, []);

  return (
    <div ref={rootRef} className={`living-product ${hero ? "living-product--hero" : ""}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : loading}
        fetchPriority={priority ? "high" : undefined}
        className={`living-product__image ${className}`}
      />
      <span className="living-product__light" aria-hidden="true" />
      <span className="living-product__eyes" aria-hidden="true">
        {eyeSets[variant].map((eye, index) => (
          <span
            key={`${eye.x}-${eye.y}-${index}`}
            className="living-eye"
            style={{ "--eye-x": `${eye.x}%`, "--eye-y": `${eye.y}%` } as CSSProperties}
          >
            <span className="living-eye__pupil" />
          </span>
        ))}
      </span>
    </div>
  );
});