import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const orderSchema = z.object({
  customer: z.object({
    fullName: z.string().trim().min(2).max(100),
    phone: z.string().trim().min(6).max(30),
    address: z.string().trim().min(5).max(300),
    apartment: z.string().trim().max(100).optional(),
    notes: z.string().trim().max(500).optional(),
  }),
  items: z
    .array(
      z.object({
        id: z.string().max(100),
        name: z.string().max(200),
        price: z.number().nonnegative(),
        quantity: z.number().int().positive().max(100),
        weight: z.string().max(50),
      }),
    )
    .min(1)
    .max(50),
  subtotal: z.number().nonnegative(),
  delivery: z.number().nonnegative(),
  total: z.number().nonnegative(),
  payment: z.literal("cod"),
});

export const Route = createFileRoute("/api/public/order")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = orderSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Validation failed", issues: parsed.error.issues }, {
            status: 400,
          });
        }

        const orderId = `PECHO-${Date.now().toString(36).toUpperCase()}`;

        // Log the order server-side. When an email domain is configured,
        // we can wire sendTemplateEmail() here to notify the shop owner
        // and confirm to the customer.
        console.log("[PECHO ORDER]", orderId, JSON.stringify(parsed.data, null, 2));

        return Response.json({ ok: true, orderId });
      },
    },
  },
});
