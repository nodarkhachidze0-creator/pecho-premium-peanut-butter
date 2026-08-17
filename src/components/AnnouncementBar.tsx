import { Link } from "@tanstack/react-router";

export function AnnouncementBar() {
  return (
    <div className="bg-brand-toast text-white">
      <Link
        to="/products/$slug"
        params={{ slug: "bundle-2plus1" }}
        className="max-w-7xl mx-auto px-4 h-[42px] flex items-center justify-center text-center text-[11px] sm:text-xs font-semibold tracking-wide cursor-pointer transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-0"
      >
        🎁 2+1 აქცია ლიმიტირებული დროით 🎁
      </Link>
    </div>
  );
}
