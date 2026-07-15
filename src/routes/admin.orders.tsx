import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadOrders, updateOrderStatus, deleteOrder, type StoredOrder } from "@/lib/orders";
import { formatGEL } from "@/lib/cart";

export const Route = createFileRoute("/admin/orders")({ component: OrdersPage });

function OrdersPage() {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const refresh = () => setOrders(loadOrders());
  useEffect(refresh, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-medium">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-brand-roast/60">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <details key={o.id} className="bg-white rounded-2xl ring-1 ring-black/5 p-5">
              <summary className="flex justify-between items-center cursor-pointer gap-4">
                <div>
                  <div className="font-medium">{o.id}</div>
                  <div className="text-xs text-brand-roast/60">
                    {new Date(o.createdAt).toLocaleString()} · {o.customer.fullName} · {o.customer.phone}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-brand-toast font-medium">{formatGEL(o.total)}</span>
                  <select
                    value={o.status}
                    onChange={(e) => { updateOrderStatus(o.id, e.target.value as StoredOrder["status"]); refresh(); }}
                    className="text-xs border border-brand-roast/15 rounded-full px-3 py-1"
                  >
                    <option value="new">new</option>
                    <option value="confirmed">confirmed</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </div>
              </summary>
              <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs uppercase text-brand-roast/50 mb-1">Delivery</div>
                  <div>{o.customer.address}</div>
                  {o.customer.apartment && <div>{o.customer.apartment}</div>}
                  {o.customer.notes && <div className="mt-2 italic">{o.customer.notes}</div>}
                </div>
                <div>
                  <div className="text-xs uppercase text-brand-roast/50 mb-1">Items</div>
                  <ul className="space-y-1">
                    {o.items.map((i) => (
                      <li key={i.id}>{i.name} × {i.quantity} — {formatGEL(i.price * i.quantity)}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={() => { deleteOrder(o.id); refresh(); }}
                className="mt-4 text-xs text-red-600 hover:underline"
              >
                Delete order
              </button>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
