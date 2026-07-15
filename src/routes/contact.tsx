import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Pecho | კონტაქტი" },
      {
        name: "description",
        content: "Get in touch with Pecho — hello@pecho.ge or +995 555 123 456.",
      },
      { property: "og:title", content: "Contact — Pecho" },
      { property: "og:description", content: "Contact Pecho — we reply within one business day." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(1000),
});

function ContactPage() {
  const { t } = useT();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(t("form.error"));
      return;
    }
    setSubmitting(true);
    // Simulate send (would hit an email endpoint once configured)
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setForm({ name: "", email: "", message: "" });
    toast.success(t("form.sent"));
  };

  return (
    <>
      <section className="px-4 sm:px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-medium">{t("contact.title")}</h1>
            <p className="text-brand-roast/70 mt-4 text-lg">{t("contact.subtitle")}</p>

            <div className="mt-10 space-y-5">
              <InfoRow icon={Phone} label={t("contact.info.phone")} value="+995 599 599 599" href="tel:+995599599599" />
              <InfoRow icon={Mail} label={t("contact.info.email")} value="Pecho.official@gmail.com" href="mailto:Pecho.official@gmail.com" />
              <InfoRow icon={MapPin} label={t("contact.info.address")} value="Gori, Georgia" />
              <InfoRow icon={Clock} label={t("contact.info.hours")} value={t("contact.info.hoursValue")} />
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href="https://www.instagram.com/pecho.official"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-3 rounded-full border border-brand-roast/15 hover:bg-brand-paper transition-colors"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://www.facebook.com/pecho.official"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-3 rounded-full border border-brand-roast/15 hover:bg-brand-paper transition-colors"
              >
                <Facebook className="size-4" />
              </a>
            </div>
          </div>


          <form onSubmit={submit} className="bg-brand-paper rounded-3xl p-8 md:p-10 space-y-5">
            <Field label={t("contact.form.name")}>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
              />
            </Field>
            <Field label={t("contact.form.email")}>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input"
              />
            </Field>
            <Field label={t("contact.form.message")}>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="input resize-none"
              />
            </Field>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-toast text-white px-7 py-4 rounded-full font-semibold hover:brightness-110 transition disabled:opacity-60"
            >
              {t("cta.send")}
            </button>
          </form>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden ring-1 ring-black/5">
          <iframe
            title="Pecho location"
            src="https://www.google.com/maps?q=Gori,+Georgia&output=embed"
            className="w-full h-[400px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          background: white;
          border: 1px solid rgba(42,27,20,0.1);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          font-family: inherit;
          color: var(--brand-roast);
        }
        .input:focus {
          outline: none;
          border-color: var(--brand-toast);
        }
      `}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-widest text-brand-roast/60 mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex gap-4 items-start">
      <span className="size-10 rounded-full bg-brand-paper flex items-center justify-center shrink-0">
        <Icon className="size-4 text-brand-toast" />
      </span>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-widest text-brand-roast/50">
          {label}
        </div>
        <div className="text-brand-roast font-medium mt-0.5">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:opacity-80 transition-opacity">
      {inner}
    </a>
  ) : (
    inner
  );
}
