# Header, drawers, and product photography overhaul

## 1. Official logo and clean floating header
- Add the uploaded `logo_withut_background-3.png` through the project asset system and use it in the header.
- Increase the centered logo to roughly 1.75× its current visual size while keeping the left and right controls balanced, aligned, and responsive.
- Replace the boxed hamburger and cart treatments with borderless, transparent icon controls; retain accessible labels, focus states, cart count, and the existing cart bump feedback.
- Remove the header divider, scrolled shadow, and any visible container separation so the header blends into the page.
- Create a square favicon from the supplied logo without stretching it.

## 2. Smart scrolling header
- Track scroll direction with a small threshold so ordinary page movement does not cause flicker.
- Hide the sticky header with upward translation and opacity while scrolling down; restore it while scrolling up or when near the top.
- Use the requested 300ms ease-in-out transition and disable movement for reduced-motion users.
- Keep the header visible whenever either drawer is open.

## 3. Left navigation drawer
- Replace the current full-screen navigation with a left-side drawer: 50% viewport width on desktop and 85% on mobile.
- Preserve the solid brand-orange surface, eight numbered bilingual navigation links, language selector, hover treatment, and no account controls.
- Add a dark 60% backdrop over the remaining page; backdrop click, Escape, close control, or route navigation closes the drawer.
- Animate the panel from the left, lock page scrolling, move keyboard focus into the drawer, and restore focus when closed.

## 4. Right cart drawer
- Change the header cart icon from direct navigation into a right-side cart drawer: 50% viewport width on desktop and 85% on mobile.
- Use the warm beige surface, dark 60% backdrop, top-right close icon, and a right-edge slide transition.
- Show current cart products, thumbnails, quantities, remove controls, subtotal, delivery, total, and clear empty-cart feedback.
- Include clear actions to continue to checkout and open the existing full cart page; preserve `/cart` for direct links and full-page review.
- Keep cart state, pricing, delivery fee, checkout behavior, fly-to-cart destination, and count badge unchanged.

## 5. Product image asset mapping
- Upload and map the four transparent packshots to their exact SKUs:
  - `450გრ_კლასიკი.webp` → Classic 450g
  - `1კგ_კლასიკი.webp` → Classic 1kg
  - `450გრ_ხრუხუნა.webp` → Crunchy 450g
  - `1კგ_ხრუხუნა.webp` → Crunchy 1kg
- Use these transparent images for the homepage cover-flow, catalog cards, cart thumbnails, and other compact product surfaces.
- Upload and map the four lifestyle photos to product detail pages:
  - `450გრ_კლასიკი2.webp` → Classic 450g
  - `1კგ_კლასიკი2.webp` → Classic 1kg
  - `450გრ_ხრუხუნა2.webp` → Crunchy 450g
  - `1კგ_ხურხუნა2.webp` → Crunchy 1kg
- Extend product data with a dedicated detail-photo field instead of replacing the transparent product image everywhere.
- Present detail photography in a stable responsive frame with 20px rounded corners, hidden overflow, and suitable cropping; remove the repeated duplicate thumbnail strip unless distinct gallery images exist.
- Leave the separate 2+1 bundle asset and behavior unchanged.

## 6. Validation
- Verify desktop and mobile widths for centered logo alignment, drawer widths, backdrop closing, Escape behavior, scroll locking, and smart header transitions.
- Verify cart quantity/removal/totals and both cart/checkout actions from the drawer.
- Verify all four transparent jars appear in the carousel/catalog and each matching lifestyle image appears on its correct product detail page with rounded corners.
- Run the focused type check and browser checks, including reduced-motion behavior and console errors.

## Technical notes
- Keep drawer state coordinated in the header layer; extract focused navigation/cart drawer components if needed.
- Use existing semantic brand tokens and the shared button component; add a semantic backdrop token rather than raw component colors.
- Use pure React and CSS transitions with no new animation dependency.
