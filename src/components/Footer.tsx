import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail } from "lucide-react";
import { useT } from "@/lib/i18n";
import { PechoLogo } from "@/components/PechoLogo";

export function Footer() {
  const { t } = useT();

  return (
    <footer className="bg-brand-roast text-brand-cream mt-24 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2 space-y-6">
          <PechoLogo className="h-14 w-auto brightness-0 invert" />
          <p className="max-w-sm text-brand-cream/60 text-pretty leading-relaxed">
            {t("footer.tagline")}
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="#"
              aria-label="Instagram"
              className="p-2.5 rounded-full border border-brand-cream/10 hover:bg-brand-cream/5 transition-colors"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="p-2.5 rounded-full border border-brand-cream/10 hover:bg-brand-cream/5 transition-colors"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href="mailto:hello@pecho.ge"
              aria-label="Email"
              className="p-2.5 rounded-full border border-brand-cream/10 hover:bg-brand-cream/5 transition-colors"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        <div className="space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-widest">{t("footer.quickLinks")}</h4>
          <ul className="space-y-3 text-sm text-brand-cream/60">
            <li><Link to="/products" className="hover:text-brand-cream transition-colors">{t("nav.products")}</Link></li>
            <li><Link to="/about" className="hover:text-brand-cream transition-colors">{t("nav.about")}</Link></li>
            <li><Link to="/news" className="hover:text-brand-cream transition-colors">{t("nav.news")}</Link></li>
            <li><Link to="/faq" className="hover:text-brand-cream transition-colors">{t("nav.faq")}</Link></li>
            <li><Link to="/contact" className="hover:text-brand-cream transition-colors">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div className="space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-widest">{t("footer.contact")}</h4>
          <ul className="space-y-3 text-sm text-brand-cream/60">
            <li>hello@pecho.ge</li>
            <li>+995 555 123 456</li>
            <li>Tbilisi, Georgia</li>
          </ul>
          <div className="pt-4">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-3">{t("footer.delivery")}</h4>
            <p className="text-sm text-brand-cream/60 leading-relaxed">{t("footer.deliveryBody")}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 mt-16 border-t border-brand-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-cream/40">
        <span>{t("footer.rights")}</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-brand-cream/80">{t("footer.privacy")}</a>
          <a href="#" className="hover:text-brand-cream/80">{t("footer.terms")}</a>
        </div>
      </div>
    </footer>
  );
}
