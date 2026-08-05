# Pecho Premium Experience Upgrade

## Goal
Polish the existing Pecho experience without changing its colors, typography, layout, spacing system, or content hierarchy. Reuse and refine the animation foundations already present so interactions stay cohesive, fast, and accessible.

## Implementation plan

### 1. Product imagery that feels alive
- Introduce one reusable interactive product-image component for product cards, the homepage promo, product detail gallery, About imagery, cart imagery, and fly-to-cart clones.
- Add subtle eye/pupil overlays aligned per product artwork; pointer and touch movement will be interpolated with `requestAnimationFrame`, clamped to a small natural range, and eased back to center on leave.
- Support the multi-jar 2+1 artwork with separate eye-position presets for each visible jar.
- Add gentle image parallax, lighting, zoom, and a desktop-only orange cursor glow when hovering product imagery.
- Disable nonessential movement for reduced-motion users and avoid device-orientation permission prompts; mobile uses direct touch movement for predictable performance.

### 2. Hero and product-card motion
- Upgrade the homepage promo product from the existing basic float to a restrained spring-like float, pointer/touch parallax, 2–4° maximum rotation, and coordinated shadow movement.
- Extend the existing Intersection Observer reveal so product cards enter with fade, upward motion, blur-to-sharp, and scale `0.96 → 1`, staggered by about 80ms.
- Apply the same reveal system consistently to page sections and grouped children without changing their layout.
- Refine product-card hover lift, shadow, scale, image response, and button press/ripple using the current design tokens and buttery easing.

### 3. Promotional navigation and section transitions
- Make the full announcement bar an accessible link to the 2+1 bundle product, with keyboard focus, pointer cursor, subtle brightness feedback, and smooth transition on all screen sizes.
- Add a small reusable peanut-butter drip divider for selected promo/section boundaries only; animate it slowly with CSS/SVG and keep it decorative, sparse, and reduced-motion safe.
- Preserve native smooth scrolling and add reliable sticky-header offsets for in-page anchors.

### 4. Cart and purchase feedback
- Consolidate add-to-cart into one sequence: button ripple and a few tiny peanut particles, product image shrink/flight, cart arrival, cart bump, then counter pop/update.
- Reuse that sequence on both product cards and the product-detail CTA, including multi-quantity adds.
- Replace the current heavy success-page peanut rain with a lighter, short peanut burst so it reads as branded product feedback rather than confetti.

### 5. Navigation, statistics, gallery, and loading polish
- Add a root-level route transition wrapper keyed to the TanStack Router location: short opacity + upward slide around 250ms, with no navigation delay or layout shift.
- Add a reusable count-up utility for visible numeric statistics such as protein values, triggered once by Intersection Observer while preserving their suffixes/units.
- Upgrade the product-detail gallery with subtle zoom/parallax/lighting, interactive eyes, and accessible selectable thumbnails while keeping its existing dimensions and structure.
- Replace the simple logo pop loader with a lightweight Pecho jar scene: lid opens slightly, one peanut rotates, then the overlay fades away; retain the current once-per-session behavior.
- Add a compact mobile sticky add-to-cart action on product-detail pages, synchronized with the existing quantity and cart animation, without changing desktop layout.

## Performance and accessibility
- Use transform/opacity/filter animations, compositor-friendly layers, passive pointer/touch listeners, and one `requestAnimationFrame` loop per active interaction rather than per image.
- Pause continuous effects when elements are offscreen or the tab is hidden; lazy-load existing noncritical images and avoid adding heavy animation dependencies.
- Respect `prefers-reduced-motion`, keyboard navigation, focus visibility, semantic links/buttons, and touch targets.
- Keep all decorative particles and eye overlays noninteractive and hidden from assistive technology.

## Validation
- Verify promo navigation, add-to-cart sequencing, gallery controls, route transitions, and loading behavior in the live app.
- Check desktop and mobile widths for overlap, sticky CTA clearance, touch-eye tracking, and stable image/card dimensions.
- Confirm reduced-motion behavior and monitor browser console/runtime errors during the main shopping flow.