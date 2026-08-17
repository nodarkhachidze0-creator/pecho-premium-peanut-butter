import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Presentation wrapper around a product visual.
 * All product imagery goes through here so a future 3D (.glb) viewer can be
 * dropped in without touching any page layout.
 */
type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** "contain" for transparent cutouts, "cover" for packshots/photography. */
  fit?: "contain" | "cover";
  priority?: boolean;
};

export const ProductImage = forwardRef<HTMLImageElement, Props>(function ProductImage(
  { src, alt, className, imgClassName, fit = "contain", priority = false },
  ref,
) {
  return (
    <div className={cn("relative", className)}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "w-full h-full",
          fit === "contain" ? "object-contain" : "object-cover",
          imgClassName,
        )}
      />
    </div>
  );
});
