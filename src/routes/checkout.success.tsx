import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
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

function Success() {
  const { t } = useT();
  return (
    <section className="px-4 sm:px-6 py-24 md:py-32 min-h-[60vh]">
      <div className="max-w-xl mx-auto text-center">
        <div className="size-16 mx-auto rounded-full bg-brand-toast/15 flex items-center justify-center">
          <Check className="size-8 text-brand-toast" strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-medium mt-8">{t("success.title")}</h1>
        <p className="text-brand-roast/70 mt-4 leading-relaxed">{t("success.body")}</p>
        <div className="mt-10">
          <Link
            to="/products"
            className="inline-block bg-brand-toast text-white px-7 py-4 rounded-full font-semibold hover:brightness-110 transition"
          >
            {t("cta.continue")}
          </Link>
        </div>
      </div>
    </section>
  );
}
