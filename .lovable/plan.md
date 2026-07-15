
## Scope

Only the changes listed. No redesign — existing colors, fonts, layout, and animations stay unless a section below replaces them.

## Prerequisites

- **Enable Lovable Cloud** — required only so Lovable Emails can send order notifications to `Pecho.official@gmail.com`. No database tables, no auth, no order storage in Cloud. Orders still live in the browser (localStorage) per your "no backend" choice.
- After Cloud is on, scaffold Lovable Emails and prompt you to set up a verified sender subdomain (e.g. `notify.pecho.ge`) via DNS. Emails start delivering once that's verified — the rest of the site works immediately.

## 1. Catalog + photos + prices (`src/data/products.ts`)

Replace all placeholder products with exactly 4 SKUs:

| SKU | Price | Photo |
|---|---|---|
| Classic Peanut Butter 450g | 9 ₾ | placeholder (you'll send later) |
| Classic Peanut Butter 1kg | 19 ₾ | uploaded yellow jar |
| Crunchy Peanut Butter 450g | 9 ₾ | placeholder (you'll send later) |
| Crunchy Peanut Butter 1kg | 19 ₾ | uploaded orange jar |

Bilingual (KA/EN) names, descriptions, ingredients, nutrition, weight. Delete every AI-generated product image asset. Upload the two real photos as CDN assets.

## 2. Quantity input (`QuantityStepper.tsx`)

Convert the number display into a typeable `<input type="number" inputMode="numeric">` between the `−` / `+` buttons. Clamp on blur (min 1, max stock/999). Used on PDP + cart.

## 3. Product card alignment (`ProductCard.tsx` + grid)

Equal-height cards: flex column with `h-full`, image in fixed-aspect square, description clamped, button pinned to the bottom. Fix current stagger in Featured + Products grid.

## 4. Hero copy + promo image (`src/routes/index.tsx` + i18n)

- Eyebrow → `"2+1 აქცია ლიმიტირებული დროით"`
- Paragraph → `"არ გამოგრჩეს 2+1 აქცია, შეიძინე 2 ქილა და მესამე მიიღე საჩუქრად სრულიად უფასოდ!"`
- Add uploaded 2+1 promo image (three jars, 38 ₾ badge) as the hero visual, as-is per your choice.

## 5. Dripping peanut butter (`DrippingPeanutButter.tsx` + `styles.css`)

- Extend the drip layer from top of page down to roughly the News section (`~80vh` fixed layer sized to that region).
- Render **behind** all content (`z-index: 0`, `pointer-events: none`; content sits on `z-10`).
- Delete droplet system, scroll-triggered drips, and all post-scroll animation. Keep only the glossy static slab with gradient + gloss highlight.

## 6. Loading screen (`LoadingScreen.tsx`)

Strip the jar, lid, pour, and handoff. New sequence: cream background → soft orange radial glow → logo pop-in (scale + fade, ~0.6s) → hold ~0.4s → fade out. Session-flag preserved.

## 7. Header logo (`Header.tsx` + `PechoLogo.tsx`)

Swap to the newly-uploaded "logo without background" (higher-fidelity), increase size (`h-12 sm:h-14 md:h-16`), keep responsive.

## 8. Footer (`Footer.tsx`)

- Centered full logo (same asset, larger).
- Slogan → `"ჯანსაღი ცხოვრება იწყება ერთი კოვზიდან"`.
- Contact block updated (see §10).
- Privacy / Terms links point to new legal routes.

## 9. Recipes page (`src/routes/recipes.tsx`)

New route + nav entry (KA/EN). Grid of recipe cards, each with cover thumbnail, title, short description, and an embedded-video slot (YouTube/Vimeo iframe or `<video>`). Ships with 3 empty placeholder cards labeled "მალე / Coming soon" until you send videos.

## 10. Contact info (single source in `src/lib/contact.ts`)

Wire everywhere (Footer, Contact page, Order emails, SEO):

- Address: `ქ. გორი, შინდისის გმირების 17ბ`
- Phone: `595 55 17 80` (tel:`+995595551780`)
- Email: `Pecho.official@gmail.com`
- Instagram: `https://www.instagram.com/pecho_geo/`
- Facebook: `https://www.facebook.com/profile.php?id=61576638057402`
- Update Google Maps embed on Contact page to the Gori address.

## 11. Legal pages

- `src/routes/privacy.tsx` — bilingual privacy policy tailored to a Georgian online food store (data collected on checkout, cookies, usage, retention, contact).
- `src/routes/terms.tsx` — bilingual T&Cs (orders, prices in GEL, cash/card on delivery, 2–3 day delivery in Georgia, returns for damaged goods, contact).
- Linked from footer.

## 12. Order success screen (`checkout.success.tsx`)

Replace copy with:

> მადლობას გიხდით შენაძენისთვის!
> თქვენი შეკვეთა მიღებულია.
> დავამზადებთ და გამოგიგზავნით.

Keep the falling-peanuts celebration + checkmark + fade-ins (already premium).

## 13. Order flow → email notification

- `src/routes/api/public/order.ts` already exists — replace its body with a call to `sendTemplateEmail("new-order", "Pecho.official@gmail.com", { templateData: {...} })`.
- New React Email template `src/lib/email-templates/new-order.tsx`: customer name, phone, address, apt/notes, itemized products (name + qty + line total), order total, order timestamp — brand-styled (orange accents, cream body).
- Checkout POSTs the order payload; on success, also stores it in `localStorage` under `pecho.orders` (see §14).

## 14. Admin panel — hardcoded gate, localStorage data

Per your choice, no backend for orders. Structure:

```
/admin/login          → email/password form
/admin (layout)       → gated; child pages below
/admin/dashboard      → KPIs (today's orders, revenue, pending)
/admin/analytics      → date-range analytics
/admin/orders         → order list + detail drawer + status update
```

### Auth (`src/lib/admin-auth.ts`)
- Hardcoded credentials compared client-side (SHA-256 hash of `Pecho5991@` stored as a constant; email compared case-insensitively).
- On success, set `sessionStorage.pecho.admin = "1"` and redirect to `/admin/dashboard`.
- `/admin/*` layout `beforeLoad` redirects to `/admin/login` when the flag is missing.
- **Explicit caveat:** this is a client-side gate — anyone who reads the JS bundle can bypass it. It matches your "hardcoded admin only" choice; if you later want a real lock, we switch to Lovable Cloud auth.

### Orders store (`src/lib/orders-store.ts`)
- Read/write `pecho.orders` array in localStorage. Each order: `{ id, createdAt, status, customer, items[], total }`.
- Checkout append-writes here in the same tick it POSTs the email.
- Admin actions: change status (`new` → `confirmed` → `shipped` → `delivered` → `cancelled`).
- **Caveat:** orders are only visible on the browser where the admin logs in and where the order was placed — localStorage is per-device. This is inherent to "no backend"; the email to `Pecho.official@gmail.com` is your durable copy.

### Analytics (`/admin/analytics`)
Ranges: Today / 7d / 30d / All time / Custom (shadcn `Calendar` in a `Popover`, range mode).
KPIs:
- Total orders, total revenue (GEL)
- Best-selling products (table sorted by qty)
- Qty sold per product (bar chart via `recharts`)
- Revenue per product (bar chart)
- Orders over time (line chart)

### Dashboard (`/admin/dashboard`)
Today's KPIs + latest 5 orders + shortcut cards to Analytics / Orders.

### Orders page (`/admin/orders`)
Sortable table: Date · Customer · Phone · Address · Items summary · Total · Status. Row click opens detail drawer with full item breakdown and status dropdown.

Admin routes are **not** linked from public navigation.

## 15. Nav updates

Add `Recipes` link. Order: Home · Products · Recipes · About · News · FAQ · Contact · Cart.

## Files added / edited

**New**: `src/routes/recipes.tsx`, `src/routes/privacy.tsx`, `src/routes/terms.tsx`, `src/routes/admin.login.tsx`, `src/routes/admin.tsx` (layout), `src/routes/admin.dashboard.tsx`, `src/routes/admin.analytics.tsx`, `src/routes/admin.orders.tsx`, `src/lib/admin-auth.ts`, `src/lib/orders-store.ts`, `src/lib/contact.ts`, `src/lib/email-templates/new-order.tsx`, two real product photo asset pointers.

**Edited**: `src/data/products.ts`, `src/components/QuantityStepper.tsx`, `src/components/ProductCard.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/DrippingPeanutButter.tsx`, `src/components/LoadingScreen.tsx`, `src/components/PechoLogo.tsx`, `src/lib/i18n.tsx`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/products.index.tsx`, `src/routes/products.$slug.tsx`, `src/routes/cart.tsx`, `src/routes/checkout.tsx`, `src/routes/checkout.success.tsx`, `src/routes/contact.tsx`, `src/routes/api/public/order.ts`, `src/styles.css`.

**Deleted**: all AI-generated `src/assets/product-*.jpg` asset pointers.

## What I need from you after implementation

1. Complete the Lovable Emails DNS setup dialog so order emails start delivering.
2. Send the 450g Classic and 450g Crunchy photos when ready — I'll swap them in.
3. Send recipe videos when ready — Recipes cards are prepped for them.
