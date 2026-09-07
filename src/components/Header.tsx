import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { useT } from "@/lib/i18n";
import { PechoLogo } from "@/components/PechoLogo";

export function Header() {
  const { t, lang, setLang } = useT();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);
  const [badgeKey, setBadgeKey] = useState(0);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onBump = () => {
      setBump(true);
      setBadgeKey((k) => k + 1);
      setTimeout(() => setBump(false), 550);
    };
    window.addEventListener("pecho:cart-bump", onBump as EventListener);
    return () => window.removeEventListener("pecho:cart-bump", onBump as EventListener);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/products", label: t("nav.products") },
    { to: "/recipes", label: t("nav.recipes") },
    { to: "/partners", label: t("nav.partners") },
    { to: "/about", label: t("nav.about") },
    { to: "/news", label: t("nav.news") },
    { to: "/faq", label: t("nav.faq") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <>
      <header
        className={`backdrop-blur-md border-b border-brand-roast/5 transition-all duration-300 ${
          scrolled ? "header-scrolled" : "bg-brand-cream/70"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            aria-label={t("nav.menu") ?? "Menu"}
            aria-expanded={open}
            className="menu-shake size-11 rounded-md border border-brand-roast/40 bg-brand-toast text-white flex items-center justify-center shadow-sm"
          >
            <Menu className="size-5" strokeWidth={1.8} />
          </button>

          <div className="flex items-center justify-center min-w-0">
            <Link to="/" aria-label="Pecho — home" className="shrink-0 flex items-center transition-transform hover:scale-105">
              <PechoLogo className="h-10 sm:h-11 w-auto" />
            </Link>
          </div>

          <Link
            to="/cart"
            aria-label={t("nav.cart")}
            data-cart-icon
            className="relative size-11 rounded-md border border-brand-roast/40 bg-brand-paper/70 text-brand-roast flex items-center justify-center transition-colors hover:bg-brand-paper"
          >
            <div className={`relative ${bump ? "cart-bump" : ""}`}>
              <ShoppingBag className="size-5 shrink-0" strokeWidth={1.6} />
              {count > 0 && (
                <span
                  key={badgeKey}
                  className="badge-pop absolute -top-2 -right-2 size-4 bg-brand-toast text-[10px] font-bold flex items-center justify-center text-white rounded-full shadow-md shadow-brand-toast/40"
                >
                  {count}
                </span>
              )}
            </div>
          </Link>
        </div>
      </header>

      {open && (
        <div className="nav-overlay fixed inset-0 z-[100] bg-brand-toast overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="h-16 flex items-center justify-end">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="size-11 rounded-md border border-brand-roast/40 bg-brand-cream/90 text-brand-roast flex items-center justify-center"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="pb-12">
              <ul>
                {links.map((l, i) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      activeOptions={{ exact: l.to === "/" }}
                      onClick={() => setOpen(false)}
                      className="nav-overlay-link group flex items-baseline justify-between gap-6 border-b border-white/20 px-3 sm:px-5 py-4 sm:py-5 text-white transition-colors"
                    >
                      <span className="font-display font-extrabold leading-none text-3xl sm:text-5xl lg:text-6xl">
                        {l.label}
                      </span>
                      <span className="font-ui text-xs sm:text-sm opacity-70 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3 px-3 sm:px-5 pt-8 text-sm font-semibold tracking-widest uppercase text-white">
                <button onClick={() => setLang("en")} className={lang === "en" ? "" : "opacity-60"}>EN</button>
                <span className="opacity-40">/</span>
                <button onClick={() => setLang("ka")} className={lang === "ka" ? "" : "opacity-60"}>KA</button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
