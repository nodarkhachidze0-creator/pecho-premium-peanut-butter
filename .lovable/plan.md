# Recipe video view + tiered delivery pricing widget

## 1. Recipe detail page video (list page untouched)

- `src/routes/recipes.$slug.tsx`: remove the `poster={recipe.imageUrl}` attribute from the video so no static cover image sits above the player.
- Set `preload="auto"` and add `autoPlay muted loop playsInline` so the video starts playing immediately when the page opens (muted, as browsers require).
- The sticky two-column layout, 9:16 framing, and all right-column content stay exactly as they are.
- `src/routes/recipes.index.tsx` and the recipe cards (photo + play icon) are NOT touched.

## 2. Tiered delivery pricing

New shared logic in `src/lib/cart.tsx` (replacing the flat `DELIVERY_FEE = 5`):

```text
zone "city"  (თბილისი / რუსთავი / გორი):  1 jar → 7₾ · 2 → 5₾ · 3 → 3₾ · 4+ → free
zone "region" (რეგიონები):                1 jar → 9₾ · 2 → 8₾ · 3 → 7₾ · 4+ → 5₾
```

- `getDeliveryFee(jarCount, zone)` — counts every cart item quantity as one jar, regardless of 450g/1kg size.
- Georgian + English labels added to `src/lib/i18n.tsx`.

## 3. Delivery widget (`src/components/DeliveryWidget.tsx`)

A branded beige card (`bg-brand-paper`, `rounded-3xl`, ring border) containing:

- Zone selector: two pill buttons — „თბილისი / რუსთავი / გორი" and „რეგიონები".
- Current fee display: „მიწოდება: 7₾" or „უფასო მიწოდება 🎉" when free.
- Progress bar tracking jar count toward the tiers (marks at 1/2/3/4 jars), animated width, no layout shift (fixed-height track).
- Friendly prompt: e.g. „კიდევ 1 ქილა და მიწოდება დაგიჯდებათ 3₾" / „კიდევ N ქილა უფასო მიწოდებამდე".
- Quick-add button: „+ ქილის დამატება" linking to `/products`.

Widget is placed:

- Inside the **cart drawer** (above the totals) and on the **cart page** (above the order summary), sharing the selected zone through a small context value in `CartProvider` so both stay in sync.

## 4. Checkout + totals updated

- `src/routes/cart.tsx`, `src/components/CartDrawer.tsx`, `src/routes/checkout.tsx`: replace the hardcoded `DELIVERY_FEE` with `getDeliveryFee(count, zone)`.
- Checkout summary shows the zone name and the computed fee (or „უფასო"); the order payload sent to `/api/public/order` and saved locally includes the zone and computed fee.

## Technical notes

- Files: `src/lib/cart.tsx` (fee logic + zone state), `src/lib/i18n.tsx` (strings), new `src/components/DeliveryWidget.tsx`, `src/components/CartDrawer.tsx`, `src/routes/cart.tsx`, `src/routes/checkout.tsx`, `src/routes/recipes.$slug.tsx`.
- No changes to recipe listing, products, header, or admin.
- Verification: typecheck + Playwright pass on a recipe detail page (video playing, no poster), cart drawer/cart/checkout fee math for both zones at 1, 2, 3, and 4 jars, and a mobile-width check for the widget.
