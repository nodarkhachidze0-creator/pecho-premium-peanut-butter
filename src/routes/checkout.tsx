import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useT } from "@/lib/i18n";
import { useCart, formatGEL, DELIVERY_FEE } from "@/lib/cart";
import { saveOrder } from "@/lib/orders";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Pecho" },
      { name: "description", content: "Complete your Pecho order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(30),
  address: z.string().trim().min(5).max(300),
  apartment: z.string().trim().max(100).optional(),
  notes: z.string().trim().max(500).optional(),
});

function Checkout() {
  const { t } = useT();
  const nav = useNavigate();
  const { items, subtotal, count, clear } = useCart();
  const total = subtotal + DELIVERY_FEE;

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    apartment: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  if (count === 0) {
    return (
      <section className="px-4 sm:px-6 py-24 text-center min-h-[50vh]">
        <p className="text-brand-roast/60 text-lg mb-6">{t("checkout.emptyCart")}</p>
        <Link
          to="/products"
          className="inline-block bg-brand-toast text-white px-7 py-4 rounded-full font-semibold hover:brightness-110 transition"
        >
          {t("cta.continue")}
        </Link>
      </section>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(t("form.error"));
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/public/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: parsed.data,
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            weight: i.weight,
          })),
          subtotal,
          delivery: DELIVERY_FEE,
          total,
          payment: "cod",
        }),
      });
      if (!res.ok) throw new Error("Order failed");
      const data = (await res.json()) as { orderId: string };
      saveOrder({
        id: data.orderId,
        createdAt: new Date().toISOString(),
        customer: parsed.data,
        items,
        subtotal,
        delivery: DELIVERY_FEE,
        total,
        status: "new",
      });
      clear();
      nav({ to: "/checkout/success" });
    } catch (err) {
      console.error(err);
      toast.error(t("form.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="px-4 sm:px-6 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 md:mb-14 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-display font-medium">{t("checkout.title")}</h1>
          <p className="text-brand-roast/70 mt-3 text-lg">{t("checkout.subtitle")}</p>
        </header>

        <form onSubmit={submit} className="grid lg:grid-cols-[1fr_360px] gap-10">
          <div className="space-y-5">
            <Field label={t("checkout.name") + " *"}>
              <input
                required
                type="text"
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="input"
              />
            </Field>
            <Field label={t("checkout.phone") + " *"}>
              <input
                required
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input"
              />
            </Field>
            <Field label={t("checkout.address") + " *"}>
              <input
                required
                type="text"
                autoComplete="street-address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="input"
              />
            </Field>
            <Field label={t("checkout.apt")}>
              <input
                type="text"
                value={form.apartment}
                onChange={(e) => setForm({ ...form, apartment: e.target.value })}
                className="input"
              />
            </Field>
            <Field label={t("checkout.notes")}>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="input resize-none"
              />
            </Field>

            <div className="pt-4">
              <span className="block text-xs font-semibold uppercase tracking-widest text-brand-roast/60 mb-3">
                {t("checkout.payment")}
              </span>
              <div className="border border-brand-toast/40 bg-brand-toast/5 rounded-2xl p-5 flex items-center gap-3">
                <span className="size-4 rounded-full border-4 border-brand-toast" />
                <div>
                  <div className="font-semibold">{t("checkout.paymentValue")}</div>
                  <div className="text-xs text-brand-roast/60 mt-0.5">
                    {t("home.delivery.item2")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="bg-brand-paper rounded-3xl p-8 h-fit lg:sticky lg:top-24 space-y-5">
            <h2 className="text-xl font-display">{t("checkout.summary")}</h2>
            <ul className="space-y-3 border-b border-brand-roast/10 pb-4">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between text-sm">
                  <span className="min-w-0 truncate pr-2">
                    {i.name} <span className="text-brand-roast/50">× {i.quantity}</span>
                  </span>
                  <span className="font-medium whitespace-nowrap">
                    {formatGEL(i.price * i.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm">
              <Row label={t("cart.subtotal")} value={formatGEL(subtotal)} />
              <Row label={t("cart.delivery")} value={formatGEL(DELIVERY_FEE)} />
            </div>
            <div className="flex justify-between items-baseline border-t border-brand-roast/10 pt-4">
              <span className="font-display text-lg">{t("cart.total")}</span>
              <span className="font-display text-2xl text-brand-toast">{formatGEL(total)}</span>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-roast text-brand-cream py-4 rounded-full font-semibold hover:bg-brand-toast transition-colors disabled:opacity-60"
            >
              {submitting ? "…" : t("cta.placeOrder")}
            </button>
          </aside>
        </form>
      </div>

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
        .input:focus { outline: none; border-color: var(--brand-toast); }
      `}</style>
    </section>
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-brand-roast/60">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
