import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useT } from "@/lib/i18n";
import { useCart, formatGEL, DELIVERY_FEE } from "@/lib/cart";
import { QuantityStepper } from "@/components/QuantityStepper";
import { PeanutMascot } from "@/components/PeanutMascot";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — Pecho" },
      { name: "description", content: "Your Pecho cart." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { t, lang } = useT();
  const { items, remove, setQty, subtotal, count } = useCart();
  const total = count > 0 ? subtotal + DELIVERY_FEE : 0;

  const emptyMsg =
    lang === "ka"
      ? "შენი კალათა გემრიელი რაღაცის მოლოდინშია."
      : "Your cart is waiting for something delicious.";

  return (
    <section className="px-4 sm:px-6 py-16 md:py-20 min-h-[60vh]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-medium mb-12">{t("cart.title")}</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center text-center py-10 space-y-6 animate-in fade-in duration-500">
            <PeanutMascot className="w-44 h-52 sm:w-56 sm:h-64" />
            <p className="text-brand-roast text-xl font-display max-w-md">{emptyMsg}</p>
            <Link
              to="/products"
              className="btn-premium inline-block bg-brand-toast text-white px-8 py-4 rounded-full font-semibold"
            >
              {t("cta.continue")}
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-10">
            <ul className="divide-y divide-brand-roast/10 border-y border-brand-roast/10">
              {items.map((item) => (
                <li key={item.id} className="py-6 grid grid-cols-[80px_1fr_auto] gap-4 items-center animate-in fade-in slide-in-from-left-2 duration-300">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-brand-paper" />
                  <div className="min-w-0">
                    <h3 className="font-display text-lg truncate">{item.name}</h3>
                    <div className="text-sm text-brand-roast/60 mt-1">{item.weight} · {formatGEL(item.price)}</div>
                    <div className="mt-3">
                      <QuantityStepper value={item.quantity} onChange={(n) => setQty(item.id, n)} />
                    </div>
                  </div>
                  <div className="text-right space-y-3">
                    <div className="font-semibold text-brand-toast">{formatGEL(item.price * item.quantity)}</div>
                    <button onClick={() => remove(item.id)} className="inline-flex items-center gap-1 text-xs text-brand-roast/50 hover:text-brand-roast transition-colors">
                      <X className="size-3" /> {t("cart.remove")}
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="bg-brand-paper rounded-3xl p-8 h-fit space-y-5 sticky top-24">
              <h2 className="text-xl font-display">{t("checkout.summary")}</h2>
              <div className="space-y-3 text-sm border-b border-brand-roast/10 pb-5">
                <Row label={t("cart.subtotal")} value={formatGEL(subtotal)} />
                <Row label={t("cart.delivery")} value={formatGEL(DELIVERY_FEE)} />
                <p className="text-xs text-brand-roast/50 pt-1">{t("cart.deliveryNote")}</p>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-display text-lg">{t("cart.total")}</span>
                <span className="font-display text-2xl text-brand-toast">{formatGEL(total)}</span>
              </div>
              <Link to="/checkout" className="btn-premium block text-center bg-brand-toast text-white py-4 rounded-full font-semibold">
                {t("cta.checkout")}
              </Link>
              <Link to="/products" className="block text-center py-3 text-sm font-semibold text-brand-roast hover:text-brand-toast transition-colors">
                {t("cta.continue")}
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-brand-roast/60">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
