
## Overview

Build **Pecho**, a bilingual (English + Georgian) B2C storefront for a premium peanut butter brand in Georgia. No accounts. Orders submitted via email (Lovable managed email). Payment = Cash/Card on Delivery only. Prices in ₾ GEL. Design uses the selected "Roasted Editorial" direction with a maximalist Fly By Jing-style pop — vivid brand-toast orange as the primary punch against warm cream and deep roast brown.

## Design system (locked from selected prototype)

Ported verbatim into `src/styles.css` via `@theme inline` + `:root` tokens:
- Colors: `--brand-cream #fdfcf8`, `--brand-beige #f7f3ed`, `--brand-paper #f1ede4`, `--brand-toast #d97706` (primary accent, punch), `--brand-roast #2a1b14`, plus a maximalist support accent `--brand-cherry #c2410c` and `--brand-lime #84cc16` used sparingly for tags/badges.
- Fonts loaded via `<link>` in `__root.tsx`: Fraunces (display), Inter (body), Noto Sans Georgian (Georgian glyphs).
- Radius: soft `rounded-[min(2vw,24px)]` for hero panels, `rounded-full` for CTAs.
- Semantic shadcn tokens (`--primary`, `--background`, `--foreground`, etc.) remapped to the brand palette so shadcn components inherit the identity.

## Routes (TanStack Start, file-based)

```
src/routes/
  __root.tsx         # font links, i18n provider, cart provider, Header + Footer, <Outlet/>
  index.tsx          # Home
  products.tsx       # /products layout → <Outlet/>
  products.index.tsx # catalog grid + search/filters/sort
  products.$slug.tsx # PDP with gallery, ingredients, nutrition, related
  about.tsx
  news.tsx           # blog listing
  news.$slug.tsx     # blog post
  faq.tsx
  contact.tsx        # form + phone/email/social/Google Maps embed
  cart.tsx
  checkout.tsx       # no-account form + summary → confirmation
  checkout.success.tsx
  api/public/order.ts  # POST handler → sends order email via Lovable managed email
```

Each route sets its own `head()` with EN/KA title + description, `og:title/og:description`, and self-referencing `og:url` + canonical. Home stays image-less (hosting injects preview).

## Header & Footer (shared)

- Sticky header: Pecho logo, nav (Home/Products/About/News/FAQ/Contact), EN/KA switcher, Cart button with live count.
- Mobile: hamburger drawer.
- Footer (dark roast bg): Quick Links, Contact Info, Delivery Info block ("2–3 business days across Georgia • Cash/Card on Delivery"), Privacy Policy, Terms & Conditions, socials, copyright.

## Home sections (composition preserved from prototype)

1. Hero: headline + subheadline + "Shop Now" CTA + hero jar image (right).
2. Featured Products (3 jars, ₾ prices, Add to Cart).
3. Why Choose Pecho (3 icon columns above a top border).
4. About preview (image + copy + "Our Story" link).
5. Latest News (3 cards).
6. Delivery Information panel (cream card with checkmarks + Georgia map illustration).
7. FAQ preview (accordion, 4 items, "See all" link).
8. Contact strip (email/phone/socials, link to /contact).
9. Footer.

## Products catalog (/products)

- Search input, category chips (Classic / Crunchy / Flavored / Limited), sort dropdown (Featured / Price ↑ / Price ↓ / Newest).
- Responsive grid of `ProductCard` (image, name, short desc, ₾ price, Add to Cart).
- All filtering client-side over `src/data/products.ts` (placeholder data until user provides real).

## Product detail (/products/$slug)

- Two-column: image gallery (thumbnails + main), right column with name, price, short description, quantity stepper, Add to Cart.
- Tabbed content below: Description • Ingredients • Nutrition (per 100g table) • Weight/Storage.
- "You may also like" related-products row.

## Cart & Checkout (no account)

- Cart: item list with qty +/− and remove, subtotal, delivery note (flat fee or free — placeholder ₾5), total, "Continue Shopping" and "Proceed to Checkout".
- Checkout: single-page form
  - Full Name*, Phone*, Delivery Address*, Apartment/Floor (optional), Notes (optional)
  - Payment: single radio locked to "Cash or Card on Delivery"
  - Right column: order summary
  - Submit → POST `/api/public/order` → Lovable managed email to shop owner + confirmation view.
- Cart state: `CartContext` persisted to `localStorage` (client-only, read in `useEffect` to avoid SSR mismatch).
- Zod validation client + server side.

## Bilingual (EN + KA)

Lightweight custom i18n:
- `src/i18n/en.ts`, `src/i18n/ka.ts` string dictionaries organized by route.
- `LanguageProvider` in `__root.tsx` with `useT()` hook. Language stored in `localStorage` (`pecho.lang`), read via `useHydrated()` pattern to avoid SSR flash; defaults to EN.
- Header toggle switches instantly. `<html lang>` updates client-side after hydration.
- All UI strings (nav, buttons, sections, forms, product category labels) translated. Product names/descriptions come from the product data source with `{ en, ka }` shape (KA falls back to EN when missing).

## Orders via email (no database)

- Lovable Cloud NOT enabled (not needed for email-only orders per user choice).
- Requires an email domain — will trigger the email setup dialog if none is configured.
- Scaffold app email templates; add `order-received.tsx` template (customer-facing confirmation) and `order-notification.tsx` (shop-owner notification with full order details).
- Public API route `/api/public/order` validates the payload with Zod and calls `sendTemplateEmail` for both templates. Shop-owner recipient stored as env secret `SHOP_ORDER_EMAIL`.
- Idempotency key = generated order ID.

## SEO

- Distinct per-route `head()` metadata in both languages (bilingual titles like "Products — Pecho | პროდუქცია").
- Semantic HTML, single H1 per page, alt text on all images, lazy loading on non-hero images.
- Product JSON-LD (`Product` + `Offer` with priceCurrency `GEL`) on PDPs; `Organization` in root.
- `public/robots.txt` allowing all; `public/sitemap.xml` with relative paths.

## Image assets

Generated with imagegen (fast tier, jpg):
- 1 hero jar image
- 4–6 product jar photos (matching the placeholder Smooth / Crunchy / Sea Salt / Chocolate / Honey / Cocoa lineup)
- 1 texture/ribbon detail shot for About preview
- Georgia map illustration for the delivery panel (transparent PNG)

Easy to swap when real product photography arrives.

## Reusable components

`src/components/`:
- `Header.tsx`, `Footer.tsx`, `LanguageSwitcher.tsx`, `CartButton.tsx`
- `ProductCard.tsx`, `ProductGallery.tsx`, `QuantityStepper.tsx`
- `SectionHeader.tsx`, `AccordionItem.tsx`, `DeliveryPanel.tsx`
- `NewsCard.tsx`, `ContactForm.tsx`

## Technical notes (for the developer)

- Stack stays TanStack Start + React 19 + Vite + Tailwind v4 + shadcn (per template). No Next.js — the request mentioned Next but the project template is TanStack Start; I'll build to the actual stack while preserving all functional requirements.
- Extensibility hooks left in place for the future features listed (accounts, online payments, wishlist, reviews, coupons, loyalty): typed `Order` / `Product` interfaces and a clean `CartContext` boundary.
- Mobile-first: every section uses responsive grid + `min-w-0` / `shrink-0` where header widgets meet text (per responsive rules).

## Out of scope (explicit)

- No login/register/account routes.
- No Stripe/PayPal/online payment integration.
- No orders database or admin dashboard.
- No real product data yet — placeholders will be swapped when you send them.
