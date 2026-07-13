import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({
    meta: [
      { title: "Order received — Pecho" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Success,
});

type Peanut = { id: number; left: number; delay: number; duration: number; size: number; rotate: number };

function Success() {
  const { t, lang } = useT();
  const [peanuts, setPeanuts] = useState<Peanut[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const items: Peanut[] = Array.from({ length: 34 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2500,
      duration: 3500 + Math.random() * 2500,
      size: 18 + Math.random() * 20,
      rotate: Math.random() * 360,
    }));
    setPeanuts(items);
    const t = setTimeout(() => setPeanuts([]), 8000);
    return () => clearTimeout(t);
  }, []);

  const thanks = lang === "ka"
    ? "გმადლობთ! თქვენი შეკვეთა მიღებულია."
    : t("success.title");
  const subline = lang === "ka"
    ? "მალე დაგიკავშირდებით შეკვეთის დასადასტურებლად."
    : "We'll contact you shortly to confirm your order.";

  return (
    <section className="relative px-4 sm:px-6 py-24 md:py-32 min-h-[70vh] overflow-hidden">
      {/* Falling peanuts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {peanuts.map((p) => (
          <span
            key={p.id}
            className="peanut-fall"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size * 1.4}px`,
              animationDelay: `${p.delay}ms`,
              animationDuration: `${p.duration}ms`,
              transform: `rotate(${p.rotate}deg)`,
            }}
          >
            <svg viewBox="0 0 40 56" className="w-full h-full">
              <defs>
                <linearGradient id={`pn-${p.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f4b872" />
                  <stop offset="100%" stopColor="#a55a1b" />
                </linearGradient>
              </defs>
              <path
                fill={`url(#pn-${p.id})`}
                d="M20 2 C 8 2 4 14 10 22 C 14 27 10 32 10 38 C 10 52 30 52 30 38 C 30 32 26 27 30 22 C 36 14 32 2 20 2 Z"
              />
              <path d="M11 24 Q20 30 29 24" stroke="#5c2e0a" strokeWidth="1.2" fill="none" opacity="0.5" />
            </svg>
          </span>
        ))}
      </div>

      <div className="relative max-w-xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="size-24 mx-auto rounded-full bg-brand-toast/15 flex items-center justify-center ring-8 ring-brand-toast/10">
          <Check className="size-14 text-brand-toast" strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-medium mt-8 text-balance">{thanks}</h1>
        <p className="text-brand-roast/70 mt-4 leading-relaxed">{subline}</p>
        <div className="mt-10">
          <Link
            to="/products"
            className="btn-premium inline-block bg-brand-toast text-white px-7 py-4 rounded-full font-semibold"
          >
            {t("cta.continue")}
          </Link>
        </div>
      </div>
    </section>
  );
}
