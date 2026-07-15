import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadOrders, type StoredOrder } from "@/lib/orders";
import { formatGEL } from "@/lib/cart";

export const Route = createFileRoute("/admin/analytics")({ component: AnalyticsPage });

function AnalyticsPage() {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  useEffect(() => setOrders(loadOrders()), []);

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const bestSelling = new Map<string, { name: string; qty: number }>();
  orders.forEach((o) =>
    o.items.forEach((i) => {
      const cur = bestSelling.get(i.id) ?? { name: i.name, qty: 0 };
      cur.qty += i.quantity;
      bestSelling.set(i.id, cur);
    }),
  );
  const top = [...bestSelling.values()].sort((a, b) => b.qty - a.qty);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-display font-medium">Analytics</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <Stat label="Total Orders" value={orders.length.toString()} />
        <Stat label="Revenue" value={formatGEL(revenue)} />
        <Stat label="Avg. Order" value={formatGEL(orders.length ? revenue / orders.length : 0)} />
      </div>
      <div className="bg-white rounded-2xl p-6 ring-1 ring-black/5">
        <h2 className="font-display text-xl mb-4">Best Selling</h2>
        {top.length === 0 ? (
          <p className="text-brand-roast/60 text-sm">No sales yet.</p>
        ) : (
          <ul className="space-y-2">
            {top.map((p) => (
              <li key={p.name} className="flex justify-between text-sm">
                <span>{p.name}</span>
                <span className="font-medium">{p.qty} sold</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 ring-1 ring-black/5">
      <div className="text-xs uppercase tracking-widest text-brand-roast/50">{label}</div>
      <div className="text-3xl font-display mt-2 text-brand-toast">{value}</div>
    </div>
  );
}
