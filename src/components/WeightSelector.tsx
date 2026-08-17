import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { getFamilyVariants } from "@/data/products";

/**
 * Weight switcher. Only ever lists siblings inside the same flavour family,
 * so Classic can never switch to Crunchy.
 */
export function WeightSelector({ product, label }: { product: Product; label: string }) {
  const variants = getFamilyVariants(product);
  if (variants.length < 2) return null;

  return (
    <div>
      <span className="block text-xs font-semibold uppercase tracking-widest text-brand-roast/60 mb-2">
        {label}
      </span>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {variants.map((v) => {
          const active = v.slug === product.slug;
          return (
            <Link
              key={v.slug}
              to="/products/$slug"
              params={{ slug: v.slug }}
              aria-current={active ? "true" : undefined}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                active
                  ? "bg-brand-roast text-brand-cream"
                  : "bg-brand-paper text-brand-roast/70 hover:bg-brand-beige"
              }`}
            >
              {v.weightLabel}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
