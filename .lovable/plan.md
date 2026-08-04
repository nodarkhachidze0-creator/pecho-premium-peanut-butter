# Pecho — Content & layout cleanup

No redesign. Only the listed removals, text swaps, and the recipe bug fix.

## 1. Products page cleanup
- Remove the page heading and subtitle block at the top of `src/routes/products.index.tsx`.
- Remove the 2+1 promo banner link, its image, and the surrounding container/margins.
- Keep the search, category filter, sort controls and grid, adjusting only the top spacing so the page starts cleanly.

## 2. Homepage delivery section
- Remove `<DeliveryPanel />` and its import from `src/routes/index.tsx`, and delete `src/components/DeliveryPanel.tsx`.
- Sections after it flow up naturally; no leftover gap.

## 3. FAQ
The current FAQ already contains exactly the seven questions and answers you listed (delivery, storage, additives, athletes, payment, returns, vegan). No change needed — verified in `src/routes/faq.tsx`. Design and accordion untouched.

## 4. Contact numbers
- Customer/orders number becomes **598 52 22 40** in: contact page info row, footer contact list, and the terms page contact line (`tel:+995598522240`).
- Business partnership number on the partners page stays **595 55 17 80**, unchanged.

## 5. Recipe video bug
Root cause: `src/routes/recipes.tsx` is both the `/recipes` page and the parent of `/recipes/$slug`, but it renders page content instead of `<Outlet />`, so the detail route can never mount — clicking a card does nothing.

Fix:
- Move the listing UI into a new `src/routes/recipes.index.tsx` (same markup and metadata).
- Replace `src/routes/recipes.tsx` with a layout that renders only `<Outlet />`.
- Keep the detail route at `src/routes/recipes.$slug.tsx` with its `<video controls>` player.
- Add a `poster` frame for the card thumbnail so it shows reliably on mobile Safari, keeping the existing overlay play icon.

## 6. Verification
Browser check on desktop and mobile viewports: products page starts at the grid, homepage has no delivery block or gap, recipe card navigates and the video plays, new phone number appears only in customer contexts.
