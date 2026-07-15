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

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/products", label: t("nav.products") },
    { to: "/recipes", label: t("nav.recipes") },
    { to: "/about", label: t("nav.about") },
    { to: "/news", label: t("nav.news") },
    { to: "/faq", label: t("nav.faq") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md border-b border-brand-roast/5 transition-all duration-300 ${
        scrolled ? "header-scrolled" : "bg-brand-cream/70"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:flex md:justify-between">
        <div className="flex items-center gap-8 min-w-0">
          <Link to="/" aria-label="Pecho — home" className="shrink-0 flex items-center transition-transform hover:scale-105">
            <PechoLogo className="h-10 sm:h-11 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-brand-roast/70">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-brand-roast is-active" }}
                className="nav-underline hover:text-brand-roast transition-colors whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold tracking-widest uppercase">
            <button
              onClick={() => setLang("en")}
              className={lang === "en" ? "text-brand-roast" : "text-brand-roast/40 hover:text-brand-roast transition-colors"}
            >
              EN
            </button>
            <span className="text-brand-roast/20">/</span>
            <button
              onClick={() => setLang("ka")}
              className={lang === "ka" ? "text-brand-roast" : "text-brand-roast/40 hover:text-brand-roast transition-colors"}
            >
              KA
            </button>
          </div>
          <Link to="/cart" className="flex items-center gap-2 group relative" data-cart-icon>
            <div className={`relative ${bump ? "cart-bump" : ""}`}>
              <ShoppingBag className="size-5 shrink-0 text-brand-roast" strokeWidth={1.6} />
              {count > 0 && (
                <span
                  key={badgeKey}
                  className="badge-pop absolute -top-2 -right-2 size-4 bg-brand-toast text-[10px] font-bold flex items-center justify-center text-white rounded-full shadow-md shadow-brand-toast/40"
                >
                  {count}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-sm font-medium">{t("nav.cart")}</span>
          </Link>
          <button className="md:hidden text-brand-roast" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-brand-roast/5 bg-brand-cream animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "bg-brand-paper" }}
                className="px-3 py-3 rounded-md text-brand-roast text-sm font-medium hover:bg-brand-paper transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 px-3 pt-4 mt-2 border-t border-brand-roast/10 text-xs font-semibold tracking-widest uppercase">
              <button onClick={() => setLang("en")} className={lang === "en" ? "text-brand-roast" : "text-brand-roast/40"}>EN</button>
              <span className="text-brand-roast/20">/</span>
              <button onClick={() => setLang("ka")} className={lang === "ka" ? "text-brand-roast" : "text-brand-roast/40"}>KA</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
