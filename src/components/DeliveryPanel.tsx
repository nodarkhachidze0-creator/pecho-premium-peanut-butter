import { Check, Truck } from "lucide-react";
import { useT } from "@/lib/i18n";

export function DeliveryPanel() {
  const { t } = useT();
  return (
    <section className="px-4 sm:px-6">
      <div className="max-w-7xl mx-auto bg-brand-paper rounded-3xl p-8 md:p-16 grid md:grid-cols-2 items-center gap-10 ring-1 ring-black/5">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-medium leading-tight text-balance">
            {t("home.delivery.title")}
          </h2>
          <ul className="space-y-3 text-brand-roast/80">
            {[
              t("home.delivery.item1"),
              t("home.delivery.item2"),
              t("home.delivery.item3"),
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="size-6 rounded-full bg-brand-toast/15 flex items-center justify-center shrink-0">
                  <Check className="size-3.5 text-brand-toast" strokeWidth={3} />
                </span>
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[16/11] bg-brand-cream rounded-2xl ring-1 ring-black/5 overflow-hidden flex items-center justify-center">
          <Truck className="size-16 text-brand-toast" strokeWidth={1.2} />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-brand-toast/5 via-transparent to-brand-cherry/5" />
          <span className="absolute bottom-4 left-4 right-4 text-[10px] font-mono uppercase tracking-widest text-brand-roast/40 text-center">
            Tbilisi → All of Georgia · 2–3 business days
          </span>
        </div>
      </div>
    </section>
  );
}
