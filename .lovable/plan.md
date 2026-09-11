# Hero peanuts, News removal, and product-title cleanup

## Hero animation
- Upload all seven supplied transparent peanut images and use them only as decorative background particles in the homepage hero.
- Add a small reusable hero-particle layer behind the existing text and product photo, keeping links and controls fully clickable.
- Give each peanut a different responsive position, size, rotation, animation duration, and negative delay so the sequence feels organic from first render.
- Animate each loop through smooth scale-and-opacity phases: hidden at `scale(0.5)`, fade/scale in, hold fully visible, then fade/scale out.
- Keep the effect restrained on mobile, prevent overflow, mark the images decorative, and disable the looping motion for visitors who prefer reduced motion.

## Remove News completely
- Remove the homepage News section and its imports/data preparation.
- Remove News from the navigation drawer and footer links, allowing the remaining menu numbers to resequence automatically.
- Delete the News index route, News article route, and the now-unused News data source so `/news` and article URLs fall through to the site’s standard not-found page.
- Remove translation entries used only by the deleted News feature while leaving unrelated uses of the Georgian word for “new/fresh” unchanged.

## Product title weights
- Remove the weight subtitle directly beneath the active product title in the homepage cover-flow.
- Preserve weights where they are functionally necessary: product variant selectors, cart/checkout SKU details, product data, and sizing logic.
- Keep product names, prices, galleries, and shopping behavior unchanged.

## Verification
- Check the hero at desktop and mobile widths for layering, clipping, readability, and independent particle timing.
- Confirm reduced-motion behavior, menu/footer link removal, `/news` not-found behavior, and absence of title-adjacent weight subtitles.
- Run the focused type check and browser interaction checks with no new console errors.

## Technical details
- Store each uploaded WebP through the project asset system and import its generated pointer into the hero particle component.
- Implement the motion with CSS keyframes and per-particle CSS custom properties; no animation dependency will be added.
- Let TanStack regenerate its route tree after deleting the route files; the generated route file will not be edited manually.
