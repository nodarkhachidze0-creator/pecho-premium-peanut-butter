import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({
    meta: [
      { title: "Order received — Pecho" },
      { name: "description", content: "Your Pecho order has been received." },
      { property: "og:title", content: "Order received — Pecho" },
      { property: "og:description", content: "Your Pecho order has been received." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Success,
});

const CONFETTI = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: (index * 37) % 100,
  delay: (index % 9) * 45,
  duration: 1400 + (index % 7) * 120,
  rotation: (index * 47) % 360,
  shape: index % 3,
}));

function Success() {
  const { lang } = useT();
  const message =
    lang === "ka"
      ? "მადლობას გიხდით შენაძენისთვის! თქვენს შეკვეთას მაქსიმუმ 2-3 სამუშაო დღეში მოგაწვდით."
      : "Thank you for your purchase! We’ll deliver your order within 2–3 business days.";

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden px-4 py-20 sm:px-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {CONFETTI.map((piece) => (
          <span
            key={piece.id}
            className={`success-confetti success-confetti-${piece.shape}`}
            style={{
              left: `${piece.left}%`,
              animationDelay: `${piece.delay}ms`,
              animationDuration: `${piece.duration}ms`,
              transform: `rotate(${piece.rotation}deg)`,
            }}
          />
        ))}
      </div>

      <div
        role="status"
        aria-live="polite"
        className="success-modal relative mx-auto w-full max-w-xl rounded-2xl bg-brand-cream p-8 text-center ring-1 ring-brand-roast/10 sm:p-12"
      >
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-brand-toast/15 ring-8 ring-brand-toast/10">
          <Check className="size-11 text-brand-toast" strokeWidth={2.5} />
        </div>
        <div className="mt-7 flex items-center justify-center gap-2 text-brand-toast">
          <Sparkles className="size-4" />
          <span className="text-xs font-bold uppercase tracking-[0.18em]">
            {lang === "ka" ? "შეკვეთა მიღებულია" : "Order received"}
          </span>
          <Sparkles className="size-4" />
        </div>
        <h1 className="mt-4 text-3xl font-display font-extrabold sm:text-4xl">
          {lang === "ka" ? "გმადლობთ!" : "Thank you!"}
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-brand-roast/70">{message}</p>
        <Link
          to="/products"
          className="btn-premium mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand-toast px-7 py-3 font-semibold text-white"
        >
          {lang === "ka" ? "შოპინგის გაგრძელება" : "Continue shopping"}
        </Link>
      </div>
    </section>
  );
}