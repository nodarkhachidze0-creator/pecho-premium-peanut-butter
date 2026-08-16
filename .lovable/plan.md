# Pecho — Premium Storefront Rebuild

A two-phase rebuild: first the structure, content and shopping flow; then the motion and personality layer. Nothing in the current cart, checkout, order or admin flow gets broken.

## Content still needed from you

Every `.txt` in the uploads is empty, so I will not invent any of it. Before the affected parts are final I need, pasted in chat:

- Prices for Classic 450g / 1kg and Crunchy 450g / 1kg (current site uses 9₾ / 19₾ and 38₾ for the 2+1 bundle — say if those stay)
- Delivery information and prices
- Store locations (name, address, coordinates) — current site has 6 Batumi shops coded in
- Social links
- Titles, ingredients and steps for the 3 new recipes
- Product benefit claims and nutrition figures (nutrition image is supplied and will be used as-is)

Still to upload: Crunchy 1kg images, and the creator/barter videos. Until those arrive, Crunchy 1kg reuses the existing jar photo and the creator section is not built.

Everything else proceeds now with existing verified site content.

---

## Phase 1 — Structure, products, content

### Assets
All uploaded images and videos go to CDN asset pointers at original quality and aspect ratio: product front + transparent cutout + dessert photo per SKU, design photos (bread shots, heart-with-peanut, floating peanuts, spoon shot), the nutrition facts image, and the 3 recipe videos with their result photos. No generated or stock replacements anywhere.

### Product system
- Four SKUs stay: Classic 450g/1kg, Crunchy 450g/1kg, plus the 2+1 bundle. Each SKU carries its own correct front image, transparent cutout and dessert photo.
- Product data gains a `family` field (classic / crunchy) so the weight selector can resolve siblings within the same family only. Classic can never jump to Crunchy and vice versa. Selecting a weight navigates to that SKU's own page and swaps in its real image.
- No combined flavour selector on the product page.

### Product detail page
Rebuilt as an editorial page: large cutout hero, product name, price, weight selector, quantity, add to cart — then benefits, the nutrition image integrated into a designed section, ingredients / natural-product story, food imagery, recipe suggestions, related products and FAQ.

### Homepage
Reordered into a continuous story: hero with large transparent jar → brand statement → product showcase → why Pecho → food/ingredient storytelling → recipes → (creator videos, once uploaded) → lifestyle imagery → store map → FAQ → contact → footer. The old delivery panel stays removed; delivery lives in a new dedicated section. The About paragraph is the new single sentence you supplied — the old Tbilisi sentence is gone site-wide.

### Announcement bar
Becomes a real accessible link to the 2+1 bundle page: keyboard focusable, visible focus ring, pointer cursor, hover brightness. Single instance, sticky with the header.

### Recipes
Vertical videos keep their native 9:16 ratio. Desktop: sticky video column on the left, recipe information scrolling on the right, with no dead space below. Mobile: video stacked above the text, still vertical. `.webm` with an `.mp4`/poster fallback, lazy loaded, paused when offscreen.

### Products listing
The "მცირე პარტიით…" heading and the large 2+1 banner stay deleted, with no leftover margin. Search, filters, sorting and the grid remain.

### Map & admin locations
Customer view is read-only: pan, zoom, branded markers, mobile friendly. The existing password-protected admin gains a locations screen to add, edit and remove entries (name, address, coordinates, optional note), stored in browser storage on top of the coded default list — as you chose. Not exposed to customers.

### FAQ, contact, language
FAQ replaced with your exact 7 Q&As as an accessible accordion. Customer number 598 52 22 40; partnership number 595 55 17 80 stays separate. Georgian remains default with no stray English UI text.

### Preserved
Cart, quantity controls, removal, checkout fields, cash/card on delivery, order submission and confirmation, admin orders, contact forms, routing. No accounts, no online payments.

---

## Phase 2 — Motion and personality

Layered on only after Phase 1 is usable without it:

- `EyeTrackingImage`: jar eyes follow the cursor with eased interpolation, clamped inside the eye area, recentering on pointer leave. Used selectively, hidden from assistive tech, non-blocking for clicks.
- Product motion: float, parallax, shadow shift, hover zoom, rotation capped at ~3°, no distortion.
- One reusable add-to-cart sequence: ripple → peanut particles → shrink → fly to cart → cart bump → counter pop. Shared by cards, detail pages and the bundle.
- Scroll storytelling: wavy section separators, reveals and parallax on selected sections only.
- Route transitions: 200–300ms fade + slight rise, no delay, no layout shift.
- Refined short loading animation, once per session.
- Floating peanut decorations used sparingly.

All motion respects `prefers-reduced-motion`, uses transform/opacity only, pauses offscreen and when the tab is hidden. No new animation or 3D libraries.

## Technical notes

- New components: `ProductHero`, `ProductImage`, `EyeTrackingImage`, `WeightSelector`, `ProductCard` (reworked), `RecipeCard`, `RecipeVideo`, `CreatorVideoCard` (Phase 2 / on upload), `BenefitsSection`, `StorySection`, `NutritionSection`, `DeliverySection`, `AddToCart` animation hook, `ScrollReveal`, `RouteTransition`. `StoreMap` and `AnnouncementBar` are extended, not duplicated.
- Content stays data-driven in `src/data/*` and `src/lib/i18n.tsx`; no page holds a wall of inline copy.
- Product cutouts are wrapped in a presentation component so a future `.glb` viewer can drop in without touching page layout.
- Final check across 1440 / 1280 / 1024 / 390 / 375 for overflow, stretched media, Georgian text, variant switching, cart flow and console errors.
