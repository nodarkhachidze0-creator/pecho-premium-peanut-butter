import { Plus, Truck } from "lucide-react";
import { formatGEL, useCart } from "@/lib/cart";
import { useT } from "@/lib/i18n";
import { products } from "@/data/products";
import {
  FREE_TIER_JARS,
  deliveryFee,
  nextTier,
  useDeliveryZone,
  type DeliveryZone,
} from "@/lib/delivery";

const ZONES: { id: DeliveryZone; ka: string; en: string }[] = [
  { id: "city", ka: "თბილისი / რუსთავი / გორი", en: "Tbilisi / Rustavi / Gori" },
  { id: "regions", ka: "რეგიონები", en: "Regions" },
];

export function DeliveryCalculator({ compact = false }: { compact?: boolean }) {
  const { lang } = useT();
  const { count, add } = useCart();
  const [zone, setZone] = useDeliveryZone();

  const fee = deliveryFee(zone, count);
  const next = nextTier(zone, count);
  const free = fee === 0 && count > 0;
  const progress = Math.min(count / FREE_TIER_JARS, 1) * 100;

  const quickAddProduct = products.find((p) => p.slug === "classic-450g") ?? products[0]!;

  const prompt = (() => {
    if (count === 0) {
      return lang === "ka"
        ? "დაამატე ქილები და ნახე მიწოდების ფასი."
        : "Add jars to see your delivery price.";
    }
    if (!next) {
      return free
        ? lang === "ka"
          ? "მიწოდება უფასოა 🎉"
          : "Delivery is free 🎉"
        : lang === "ka"
          ? `საუკეთესო ტარიფი — მიწოდება ${fee}₾ 🎉`
          : `Best rate unlocked — delivery ${fee}₾ 🎉`;
    }
    const feeText = next.fee === 0 ? (lang === "ka" ? "უფასო" : "free") : `${next.fee}₾`;
    return lang === "ka"
      ? `დაამატე კიდევ ${next.jarsNeeded} ქილა და მიწოდება იქნება ${feeText}`
      : `Add ${next.jarsNeeded} more jar${next.jarsNeeded > 1 ? "s" : ""} and delivery becomes ${feeText}`;
  })();

  const quickAdd = () => {
    add({
      id: quickAddProduct.slug,
      name: quickAddProduct.name[lang],
      price: quickAddProduct.price,
      image: quickAddProduct.image,
      weight: quickAddProduct.weight,
    });
  };

  return (
    <div
      className={`rounded-2xl bg-brand-paper ring-1 ring-brand-roast/10 ${
        compact ? "p-4" : "p-5 sm:p-6"
      }`}
    >
      <div className="flex items-center gap-2">
        <Truck className="size-4 text-brand-toast shrink-0" />
        <span className="font-ui text-xs font-bold uppercase tracking-[0.16em] text-brand-roast/70">
          {lang === "ka" ? "მიწოდების ღირებულება" : "Delivery cost"}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {ZONES.map((z) => {
          const active = z.id === zone;
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => setZone(z.id)}
              aria-pressed={active}
              className={`rounded-full px-3 py-2 text-center text-[11px] font-semibold leading-tight transition-colors ${
                active
                  ? "bg-brand-toast text-white"
                  : "bg-white text-brand-roast/70 ring-1 ring-brand-roast/10 hover:text-brand-roast"
              }`}
            >
              {lang === "ka" ? z.ka : z.en}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <span className="text-sm text-brand-roast/65">
          {count} {lang === "ka" ? "ქილა" : count === 1 ? "jar" : "jars"}
        </span>
        <span className="font-ui text-lg font-bold text-brand-toast">
          {free
            ? lang === "ka"
              ? "უფასო მიწოდება"
              : "Free delivery"
            : formatGEL(fee)}
        </span>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-brand-roast/10">
        <div
          className="h-full rounded-full bg-brand-toast transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-3 min-h-[2.5rem] text-xs leading-relaxed text-brand-roast/65">{prompt}</p>

      {next ? (
        <button
          type="button"
          onClick={quickAdd}
          className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-brand-roast px-4 py-2 text-xs font-semibold text-brand-cream transition-colors hover:bg-brand-toast"
        >
          <Plus className="size-3.5" />
          {lang === "ka" ? "დაამატე ქილა" : "Add a jar"}
        </button>
      ) : null}
    </div>
  );
}
