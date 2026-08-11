import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { useCart, formatGEL } from "@/lib/cart";
import { useT } from "@/lib/i18n";
import { flyToCart } from "@/lib/fly-to-cart";

export function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useT();
  const { add } = useCart();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Ripple
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
    // Fly image to cart
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
    <Link to="/products/$slug" params={{ slug: product.slug }} className="group flex flex-col tilt-card">
      <div className="tilt-card-inner relative overflow-hidden rounded-2xl ring-1 ring-black/5 bg-brand-paper">
        <div className="jar-float">
          <img
            ref={imgRef}
            src={product.image}
            alt={product.name[lang]}
            loading="lazy"
            className="tilt-image w-full aspect-[4/5] object-cover"
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
      <button
        ref={btnRef}
        onClick={handleAdd}
        className="btn-premium mt-4 w-full py-3 bg-brand-roast text-brand-cream text-xs font-semibold tracking-widest uppercase rounded-lg hover:bg-brand-toast"
      >
        {t("cta.addToCart")}
      </button>
    </Link>
  );
}
