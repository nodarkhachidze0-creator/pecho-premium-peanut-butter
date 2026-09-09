import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { useT } from "@/lib/i18n";
import { PechoLogo } from "@/components/PechoLogo";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";

export function Header() {
  const { t, lang, setLang } = useT();
  const { count } = useCart();
  const [drawer, setDrawer] = useState<"menu" | "cart" | null>(null);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [bump, setBump] = useState(false);
  const [badgeKey, setBadgeKey] = useState(0);
  const lastScrollY = useRef(0);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const cartTriggerRef = useRef<HTMLButtonElement>(null);
  const menuCloseRef = useRef<HTMLButtonElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setDrawer(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      if (currentY < 24) setHeaderVisible(true);
      else if (Math.abs(delta) > 8) setHeaderVisible(delta < 0);
      lastScrollY.current = currentY;
    };
    lastScrollY.current = window.scrollY;
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
    if (!drawer) return;
    setHeaderVisible(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawer(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    if (drawer === "menu") requestAnimationFrame(() => menuCloseRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      if (drawer === "menu") menuTriggerRef.current?.focus();
      if (drawer === "cart") cartTriggerRef.current?.focus();
    };
  }, [drawer]);

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
      <header className={`smart-header sticky top-0 z-50 bg-brand-cream/80 backdrop-blur-md ${headerVisible || drawer ? "smart-header-visible" : "smart-header-hidden"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 sm:h-24 grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-4">
          <Button
            ref={menuTriggerRef}
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setDrawer("menu")}
            aria-label="Menu"
            aria-expanded={drawer === "menu"}
            className="menu-shake size-11 rounded-full bg-transparent text-brand-toast hover:bg-transparent hover:text-brand-roast"
          >
            <Menu className="size-7" strokeWidth={1.8} />
          </Button>

          <div className="flex items-center justify-center min-w-0">
            <Link to="/" aria-label="Pecho — home" className="shrink-0 flex items-center transition-transform hover:scale-105">
              <PechoLogo className="h-16 sm:h-20 w-auto" />
            </Link>
          </div>

          <Button
            ref={cartTriggerRef}
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setDrawer("cart")}
            aria-label={t("nav.cart")}
            aria-expanded={drawer === "cart"}
            data-cart-icon
            className="relative size-11 rounded-full bg-transparent text-brand-roast hover:bg-transparent hover:text-brand-toast"
          >
            <div className={`relative ${bump ? "cart-bump" : ""}`}>
              <ShoppingBag className="size-6 shrink-0" strokeWidth={1.6} />
              {count > 0 && (
                <span
                  key={badgeKey}
                  className="badge-pop absolute -top-2.5 -right-2.5 size-4 bg-brand-toast text-[10px] font-bold flex items-center justify-center text-primary-foreground rounded-full"
                >
                  {count}
                </span>
              )}
            </div>
          </Button>
        </div>
      </header>

      {drawer === "menu" && (
        <div className="drawer-layer fixed inset-0 z-[110]" role="dialog" aria-modal="true" aria-label="Navigation">
          <button type="button" className="drawer-backdrop absolute inset-0 bg-brand-backdrop" onClick={() => setDrawer(null)} aria-label="Close menu" />
          <aside className="drawer-panel drawer-panel-left absolute inset-y-0 left-0 w-[85vw] overflow-y-auto bg-brand-toast md:w-1/2">
            <div className="flex min-h-full flex-col px-4 sm:px-6">
              <div className="h-20 sm:h-24 flex items-center justify-end">
                <Button
                  ref={menuCloseRef}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setDrawer(null)}
                aria-label="Close menu"
                  className="size-11 rounded-full text-primary-foreground hover:bg-brand-cream hover:text-brand-roast"
                >
                  <X className="size-6" />
                </Button>
              </div>

            <nav className="flex flex-1 flex-col pb-8">
              <ul>
                {links.map((l, i) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      activeOptions={{ exact: l.to === "/" }}
                      onClick={() => setDrawer(null)}
                      className="nav-overlay-link group flex items-baseline justify-between gap-6 border-b border-primary-foreground/20 px-3 py-3 text-primary-foreground transition-colors sm:px-5 sm:py-4"
                    >
                      <span className="min-w-0 font-display font-extrabold leading-none text-2xl sm:text-4xl lg:text-5xl">
                        {l.label}
                      </span>
                      <span className="font-ui text-xs sm:text-sm opacity-70 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex items-center gap-3 px-3 pt-8 text-sm font-semibold uppercase text-primary-foreground sm:px-5">
                <Button type="button" variant="ghost" size="sm" onClick={() => setLang("en")} className={`px-1 hover:bg-transparent hover:text-brand-roast ${lang === "en" ? "" : "opacity-60"}`}>EN</Button>
                <span className="opacity-40">/</span>
                <Button type="button" variant="ghost" size="sm" onClick={() => setLang("ka")} className={`px-1 hover:bg-transparent hover:text-brand-roast ${lang === "ka" ? "" : "opacity-60"}`}>KA</Button>
              </div>
            </nav>
            </div>
          </aside>
        </div>
      )}

      <CartDrawer open={drawer === "cart"} onClose={() => setDrawer(null)} />
    </>
  );
}
