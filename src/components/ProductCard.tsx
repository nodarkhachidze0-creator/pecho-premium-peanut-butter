import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { useCart, formatGEL } from "@/lib/cart";
import { useT } from "@/lib/i18n";

export function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useT();
  const { add } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add({
      id: product.slug,
      name: product.name[lang],
      price: product.price,
      image: product.image,
      weight: product.weight,
    });
    toast.success(`${product.name[lang]} — ${t("cta.addToCart")}`);
  };

  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col"
    >
      <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 bg-brand-paper">
        <img
          src={product.image}
          alt={product.name[lang]}
          loading="lazy"
          className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex justify-between items-start gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-xl leading-tight">{product.name[lang]}</h3>
          <p className="text-sm text-brand-roast/60 mt-1">{product.short[lang]}</p>
        </div>
        <span className="font-medium text-lg text-brand-toast whitespace-nowrap shrink-0">
          {formatGEL(product.price)}
        </span>
      </div>
      <button
        onClick={handleAdd}
        className="mt-4 w-full py-3 bg-brand-roast text-brand-cream text-xs font-semibold tracking-widest uppercase rounded-lg hover:bg-brand-toast transition-colors"
      >
        {t("cta.addToCart")}
      </button>
    </Link>
  );
}
