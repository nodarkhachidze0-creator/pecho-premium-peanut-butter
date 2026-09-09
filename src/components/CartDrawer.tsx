import { Link } from "@tanstack/react-router";
import { ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/QuantityStepper";
import { DELIVERY_FEE, formatGEL, useCart } from "@/lib/cart";
import { useT } from "@/lib/i18n";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, count, subtotal, remove, setQty } = useCart();
  const { lang, t } = useT();
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = count > 0 ? subtotal + DELIVERY_FEE : 0;

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div className="drawer-layer fixed inset-0 z-[110]" role="dialog" aria-modal="true" aria-label={t("nav.cart")}>
      <button
        type="button"
        className="drawer-backdrop absolute inset-0 bg-brand-backdrop"
        onClick={onClose}
        aria-label={lang === "ka" ? "კალათის დახურვა" : "Close cart"}
      />
      <aside className="drawer-panel drawer-panel-right absolute inset-y-0 right-0 flex w-[85vw] flex-col bg-brand-cream shadow-2xl md:w-1/2">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 sm:px-8">
          <div className="min-w-0">
            <p className="truncate font-display text-2xl font-extrabold text-brand-roast">{t("cart.title")}</p>
            <p className="mt-1 font-ui text-xs text-brand-roast/55">
              {count} {lang === "ka" ? "პროდუქტი" : count === 1 ? "item" : "items"}
            </p>
          </div>
          <Button ref={closeRef} type="button" variant="ghost" size="icon" onClick={onClose} aria-label={lang === "ka" ? "დახურვა" : "Close"} className="shrink-0 rounded-full text-brand-roast hover:bg-brand-paper">
            <X className="size-5" />
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="size-10 text-brand-toast" strokeWidth={1.4} />
            <p className="mt-5 max-w-sm text-brand-roast/70">
              {lang === "ka" ? "შენი კალათა გემრიელი რაღაცის მოლოდინშია." : "Your cart is waiting for something delicious."}
            </p>
            <Button asChild className="mt-7 rounded-full bg-brand-roast px-7 text-brand-cream hover:bg-brand-toast">
              <Link to="/products" onClick={onClose}>{t("cta.continue")}</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto border-y border-brand-roast/10 px-5 sm:px-8">
              {items.map((item) => (
                <li key={item.id} className="grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-4 border-b border-brand-roast/10 py-5 last:border-b-0">
                  <div className="grid size-[72px] place-items-center overflow-hidden rounded-lg bg-brand-paper p-2">
                    <img src={item.image} alt="" className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-heading text-sm font-bold text-brand-roast">{item.name}</p>
                    <p className="mt-1 text-xs text-brand-roast/55">{item.weight} · {formatGEL(item.price)}</p>
                    <div className="mt-3"><QuantityStepper value={item.quantity} onChange={(quantity) => setQty(item.id, quantity)} /></div>
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => remove(item.id)} aria-label={lang === "ka" ? `${item.name} — წაშლა` : `Remove ${item.name}`} className="shrink-0 rounded-full text-brand-roast/45 hover:bg-brand-paper hover:text-brand-roast">
                    <Trash2 className="size-4" />
                  </Button>
                </li>
              ))}
            </ul>

            <div className="space-y-4 px-5 py-6 sm:px-8">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-4 text-brand-roast/65"><span>{t("cart.subtotal")}</span><span>{formatGEL(subtotal)}</span></div>
                <div className="flex justify-between gap-4 text-brand-roast/65"><span>{t("cart.delivery")}</span><span>{formatGEL(DELIVERY_FEE)}</span></div>
                <div className="flex justify-between gap-4 border-t border-brand-roast/10 pt-3 text-lg font-bold text-brand-roast"><span>{t("cart.total")}</span><span>{formatGEL(total)}</span></div>
              </div>
              <Button asChild className="h-12 w-full rounded-full bg-brand-roast text-brand-cream hover:bg-brand-toast">
                <Link to="/checkout" onClick={onClose}>{t("cta.checkout")}</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full rounded-full text-brand-roast hover:bg-brand-paper">
                <Link to="/cart" onClick={onClose}>{lang === "ka" ? "სრული კალათის ნახვა" : "View full cart"}</Link>
              </Button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}