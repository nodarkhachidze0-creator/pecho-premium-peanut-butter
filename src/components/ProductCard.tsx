import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { useCart, formatGEL } from "@/lib/cart";
import { useT } from "@/lib/i18n";
import { flyToCart } from "@/lib/fly-to-cart";
import { ProductImage } from "@/components/ProductImage";

export function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useT();
  const { add } = useCart();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

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
      flyToCart(product.cutout, imgRef.current.getBoundingClientRect());
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
    <div className="group flex flex-col h-full">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="tilt-card block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-toast rounded-2xl"
      >
        <div className="tilt-card-inner relative overflow-hidden rounded-2xl ring-1 ring-black/5 bg-gradient-to-b from-brand-paper to-brand-beige p-5">
          {product.originalPrice && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-brand-toast px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
              2+1
            </span>
          )}
          <span className="absolute right-4 top-4 z-10 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-roast">
            {product.weightLabel}
          </span>
          <div className="jar-float">
            <ProductImage
              ref={imgRef}
              src={product.cutout}
              alt={`${product.name[lang]} ${product.weight}`}
              fit="contain"
              className="aspect-[4/5]"
              imgClassName="tilt-image drop-shadow-xl"
            />
          </div>
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
      </Link>
      <button
        ref={btnRef}
        onClick={handleAdd}
        className="btn-premium mt-4 w-full py-3 bg-brand-roast text-brand-cream text-xs font-semibold tracking-widest uppercase rounded-lg hover:bg-brand-toast"
      >
        {t("cta.addToCart")}
      </button>
    </div>
  );
}
