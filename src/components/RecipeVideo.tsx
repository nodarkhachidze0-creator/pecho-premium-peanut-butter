import { useEffect, useRef } from "react";

export type RecipeVideoSource = { src: string; type: string };

/**
 * Vertical (9:16) recipe player. Keeps the native portrait ratio, lazy loads,
 * and pauses when scrolled out of view or when the tab is hidden.
 */
export function RecipeVideo({
  sources,
  poster,
  title,
  className = "",
}: {
  sources: RecipeVideoSource[];
  poster?: string;
  title: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting && !el.paused) el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    const onVisibility = () => {
      if (document.hidden && !el.paused) el.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      className={`rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-2xl bg-brand-roast mx-auto w-full max-w-[420px] ${className}`}
    >
      <video
        ref={ref}
        controls
        playsInline
        preload="none"
        poster={poster}
        title={title}
        className="w-full max-h-[760px] object-contain bg-brand-roast"
        style={{ aspectRatio: "9 / 16" }}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
    </div>
  );
}
