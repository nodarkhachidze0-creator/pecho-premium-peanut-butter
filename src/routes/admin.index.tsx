import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadOrders, type StoredOrder } from "@/lib/orders";
import { formatGEL } from "@/lib/cart";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  useEffect(() => setOrders(loadOrders()), []);
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const newCount = orders.filter((o) => o.status === "new").length;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-display font-medium">Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <Stat label="Total Orders" value={orders.length.toString()} />
        <Stat label="Revenue" value={formatGEL(revenue)} />
        <Stat label="New Orders" value={newCount.toString()} />
      </div>
      <p className="text-sm text-brand-roast/60">
        Orders are stored locally on this device. Full order details are in the Orders tab.
      </p>
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
