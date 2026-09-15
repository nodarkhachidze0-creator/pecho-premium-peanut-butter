import { faqItems } from "@/data/faq";
import { useT } from "@/lib/i18n";

type FAQSectionProps = {
  page?: boolean;
};

export function FAQSection({ page = false }: FAQSectionProps) {
  const { t, lang } = useT();
  const Heading = page ? "h1" : "h2";

  return (
    <section className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12 text-center md:mb-16">
          <Heading className={page ? "font-display text-4xl font-extrabold md:text-5xl" : "font-display text-3xl font-extrabold md:text-4xl"}>
            {t("faq.title")}
          </Heading>
          <p className="mt-4 text-lg text-brand-roast/70">{t("faq.subtitle")}</p>
        </header>

        <div className="divide-y divide-brand-roast/10 border-y border-brand-roast/10">
          {faqItems[lang].map((item) => (
            <details key={item.q} className="group py-6">
              <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <span className="min-w-0 text-base font-medium md:text-lg">{item.q}</span>
                <span className="shrink-0 text-2xl text-brand-toast transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-brand-roast/70">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}