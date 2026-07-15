import type { CartItem } from "@/lib/cart";

export type StoredOrder = {
  id: string;
  createdAt: string;
  customer: {
    fullName: string;
    phone: string;
    address: string;
    apartment?: string;
    notes?: string;
  };
  items: Array<CartItem>;
  subtotal: number;
  delivery: number;
  total: number;
  status: "new" | "confirmed" | "delivered" | "cancelled";
};

const KEY = "pecho.orders";

export function loadOrders(): StoredOrder[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredOrder[];
  } catch {
    return [];
  }
}

export function saveOrder(order: StoredOrder) {
  const list = loadOrders();
  list.unshift(order);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function updateOrderStatus(id: string, status: StoredOrder["status"]) {
  const list = loadOrders().map((o) => (o.id === id ? { ...o, status } : o));
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function deleteOrder(id: string) {
  const list = loadOrders().filter((o) => o.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
}
