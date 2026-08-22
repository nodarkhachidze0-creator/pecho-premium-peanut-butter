import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { useCart, formatGEL } from "@/lib/cart";
import { useT } from "@/lib/i18n";
import { flyToCart } from "@/lib/fly-to-cart";

function specs(product: Product, lang: "en" | "ka") {
  const kind =
    product.category === "crunchy"
      ? { en: "Crunchy", ka: "ხრაშუნა" }
      : product.category === "bundle"
        ? { en: "Bundle", ka: "შეთავაზება" }
        : { en: "Classic", ka: "კლასიკური" };
  const texture =
    product.category === "crunchy"
      ? { en: "Crunchy", ka: "ხრაშუნა" }
      : { en: "Smooth", ka: "გლუვი" };

  return [
    { label: { en: "Type", ka: "სახეობა" }, value: kind[lang] },
    { label: { en: "Weight", ka: "წონა" }, value: product.weight },
    { label: { en: "Texture", ka: "ტექსტურა" }, value: texture[lang] },
    {
      label: { en: "Ingredients", ka: "შემადგენლობა" },
      value:
        lang === "ka"
          ? "100% ნატურალური მიწისთხილი + მცირე რაოდენობით მარილი"
          : "100% natural peanuts + a pinch of salt",
    },
    {
      label: { en: "Protein", ka: "ცილა" },
      value: `${product.protein ?? "25"}${lang === "ka" ? "გ / 100გ" : "g / 100g"}`,
    },
  ];
}

export function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useT();
  const { add } = useCart();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const rows = specs(product, lang);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      const size = 20;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btnRef.current.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    }
    if (imgRef.current) {
      flyToCart(product.image, imgRef.current.getBoundingClientRect());
    }
    add({
      id: product.slug,
      name: product.name[lang],
      price: product.price,
      image: product.image,
      weight: product.weight,
    });
  };

  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="pc-card group flex h-full flex-col rounded-[28px] bg-brand-cream p-4 ring-1 ring-brand-roast/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(42,24,16,0.45)]"
    >
      <div className="relative overflow-hidden rounded-[22px] bg-[radial-gradient(120%_100%_at_50%_0%,var(--brand-paper),var(--brand-beige))]">
        <div className="flex aspect-[4/3] items-center justify-center p-8 sm:p-10">
          <img
            ref={imgRef}
            src={product.image}
            alt={product.name[lang]}
            loading="lazy"
            className="max-h-[78%] w-auto max-w-[52%] object-contain drop-shadow-[0_16px_20px_rgba(42,24,16,0.16)] transition-transform duration-500 md:group-hover:-translate-x-[26%] group-hover:scale-[1.03]"
          />
        </div>

        {product.originalPrice && (
          <span className="absolute left-4 top-4 rounded-full bg-brand-toast px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            2+1
          </span>
        )}

        {/* Desktop hover info panel — slides in beside the jar */}
        <div className="pc-panel absolute inset-y-3 right-3 hidden w-[54%] rounded-[18px] bg-brand-roast/95 p-4 text-brand-cream backdrop-blur-sm md:flex md:items-center">
          <dl className="w-full space-y-1.5">
            {rows.map((r) => (
              <div key={r.label.en} className="flex gap-3 text-[13px] leading-snug">
                <dt className="shrink-0 font-label text-[10px] uppercase tracking-widest text-brand-toast pt-[3px]">
                  {r.label[lang]}
                </dt>
                <dd className="min-w-0 flex-1 text-right text-brand-cream/90">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4 md:mb-auto">
        <h3 className="min-w-0 font-display text-lg font-extrabold leading-tight text-brand-roast">
          {product.name[lang]}
        </h3>
        <span className="shrink-0 whitespace-nowrap text-lg font-bold text-brand-toast">
          {formatGEL(product.price)}
        </span>
      </div>


      {/* Mobile / touch info */}
      <dl className="mt-3 space-y-1 md:hidden mb-auto">
        {rows.slice(0, 3).map((r) => (
          <div key={r.label.en} className="flex justify-between gap-3 text-[13px]">
            <dt className="font-label text-[10px] uppercase tracking-widest text-brand-roast/50 pt-[3px]">
              {r.label[lang]}
            </dt>
            <dd className="text-brand-roast/80">{r.value}</dd>
          </div>
        ))}
      </dl>

      <button
        ref={btnRef}
        onClick={handleAdd}
        className="btn-premium mt-5 w-full rounded-xl bg-brand-roast px-4 py-3 text-xs font-semibold uppercase tracking-widest text-brand-cream hover:bg-brand-toast"
      >
        {t("cta.addToCart")}
      </button>
    </Link>
  );
}
