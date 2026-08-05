import { Link } from "@tanstack/react-router";

export function AnnouncementBar() {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: "bundle-2plus1" }}
      aria-label="2+1 შეთავაზების ნახვა"
      className="promo-bar block bg-brand-toast text-white cursor-pointer transition-[filter] duration-300 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-cream"
    >
      <span className="max-w-7xl mx-auto px-4 h-[42px] flex items-center justify-center text-center text-[11px] sm:text-xs font-semibold tracking-wide">
        🎁 2+1 აქცია ლიმიტირებული დროით 🎁
      </span>
    </Link>
  );
}
