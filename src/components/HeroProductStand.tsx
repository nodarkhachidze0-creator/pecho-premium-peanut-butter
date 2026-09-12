import { useState } from "react";

import classic450 from "@/assets/hero-classic-450g.webp.asset.json";
import classic1kg from "@/assets/hero-classic-1kg.webp.asset.json";
import crunchy450 from "@/assets/hero-crunchy-450g.webp.asset.json";
import crunchy1kg from "@/assets/hero-crunchy-1kg.webp.asset.json";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProductType = "classic" | "crunchy";
type ProductSize = "450g" | "1kg";

const productImages = {
  classic: {
    "450g": classic450.url,
    "1kg": classic1kg.url,
  },
  crunchy: {
    "450g": crunchy450.url,
    "1kg": crunchy1kg.url,
  },
} satisfies Record<ProductType, Record<ProductSize, string>>;

const typeOptions: { value: ProductType; label: string }[] = [
  { value: "classic", label: "კლასიკი" },
  { value: "crunchy", label: "ხრუხუნა" },
];

const sizeOptions: { value: ProductSize; label: string }[] = [
  { value: "450g", label: "450გ" },
  { value: "1kg", label: "1კგ" },
];

type ToggleGroupProps<T extends string> = {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

function ToggleGroup<T extends string>({ label, options, value, onChange }: ToggleGroupProps<T>) {
  const selectedIndex = options.findIndex((option) => option.value === value);

  return (
    <div
      className="relative grid min-w-0 flex-1 grid-cols-2 rounded-full bg-brand-paper/85 p-1 ring-1 ring-brand-roast/10"
      role="group"
      aria-label={label}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-brand-toast shadow-sm transition-transform duration-300 ease-in-out",
          selectedIndex === 1 && "translate-x-full",
        )}
      />
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <Button
            key={option.value}
            type="button"
            variant="ghost"
            aria-pressed={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative z-10 h-9 rounded-full bg-transparent px-3 text-xs shadow-none transition-colors duration-300 hover:bg-transparent sm:h-10 sm:text-sm",
              isSelected ? "text-primary-foreground" : "text-brand-roast/65 hover:text-brand-roast",
            )}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
}

export function HeroProductStand() {
  const [type, setType] = useState<ProductType>("classic");
  const [size, setSize] = useState<ProductSize>("450g");
  const activeImage = productImages[type][size];
  const activeKey = `${type}-${size}`;
  const alt = `${type === "classic" ? "კლასიკური" : "ხრუხუნა"} Pecho, ${size === "450g" ? "450 გრამი" : "1 კილოგრამი"}`;

  return (
    <div className="mx-auto flex min-h-[480px] w-full max-w-xl flex-col items-center justify-center sm:min-h-[550px]">
      <div className="relative flex h-[350px] w-full items-end justify-center sm:h-[410px] lg:h-[430px]">
        <div key={activeKey} className="hero-product-enter absolute inset-0 flex items-end justify-center pb-7 sm:pb-8">
          <img
            src={activeImage}
            alt={alt}
            width={760}
            height={980}
            className={cn(
              "hero-product-float h-auto w-auto max-w-[78%] object-contain sm:max-w-[76%]",
              size === "1kg" ? "max-h-[330px] sm:max-h-[390px] lg:max-h-[410px]" : "max-h-[285px] sm:max-h-[340px] lg:max-h-[360px]",
            )}
          />
        </div>
        <div className="hero-product-floor mb-2 h-8 w-3/4 max-w-sm" aria-hidden="true" />
      </div>

      <div className="relative z-10 mt-4 flex w-full max-w-md flex-col gap-3 px-3 sm:mt-5 sm:flex-row sm:px-0">
        <ToggleGroup label="პროდუქტის ტიპი" options={typeOptions} value={type} onChange={setType} />
        <ToggleGroup label="პროდუქტის ზომა" options={sizeOptions} value={size} onChange={setSize} />
      </div>
    </div>
  );
}