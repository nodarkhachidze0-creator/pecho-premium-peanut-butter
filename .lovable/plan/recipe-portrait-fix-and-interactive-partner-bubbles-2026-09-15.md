# Recipe portrait fix and interactive partner bubbles

## 1. Lock recipe videos to 9:16

- Keep every product-page recipe card inside a strict `aspect-[9/16]` container and make the video fill it with `object-cover`, without changing the existing hover, tap, sound, controls, or carousel behavior.
- Update the recipe detail player to use a stable `aspect-[9/16]` wrapper rather than an inline ratio, with the video sized to the wrapper using `object-contain` so the full portrait frame remains undistorted.
- Add a scoped fullscreen rule for recipe videos so browser-native fullscreen uses `object-contain` against a dark background and never stretches horizontally.
- Preserve fixed responsive width/height constraints to avoid layout shifts while media loads.

## 2. Add the four partner stores

- Upload and use the supplied `ჯინი.webp`, `აბგა.webp`, `ბილიონი.webp`, and `პანდა.webp` files as app assets.
- Expand the shared partner data to include Georgian/English names, logo, accent role, bubble size, and responsive starting position for:
  - ჯინი / Jini — blue
  - აბგა / Abga — deep purple
  - ბილიონი / Billion — vibrant red
  - პანდა / Panda — monochrome
- Define their requested accent colors as semantic partner tokens rather than scattering raw colors through the component.

## 3. Build the partner bubbles playground

- Add `PartnerBubbles` as a bounded, softly contrasted section with bilingual headings: “სად იპოვით Pecho-ს” / “Where to find Pecho” and “ჩვენი პარტნიორები” / “Our partners”.
- Use `framer-motion` draggable circular logo bubbles constrained to the playground, with `dragElastic={0.2}`, touch-safe dragging, grab/grabbing cursors, subtle shadows/rings, and responsive bubble sizes.
- Give each bubble a lightweight, staggered idle drift using transform-only animation; pause its drift while dragged and keep movement GPU-friendly.
- Respect reduced-motion settings by disabling idle movement while preserving dragging.
- Keep logos contained, sharp, non-selectable, and accessible by partner name.

## 4. Place it on the homepage

- Replace the current single-logo “Where to find us” marquee content with the interactive four-store playground in the same homepage position.
- Remove the obsolete marquee import from the homepage while leaving the Partners, About, footer, store map, and purchasing sections unchanged.

## Technical details

- Add the requested `framer-motion` dependency.
- Use one measured playground boundary and Motion drag constraints; do not run a continuous physics engine or React state loop.
- Keep the existing recipe list thumbnails unchanged, as requested previously.

## Verification

- Run the TypeScript check.
- Verify portrait video geometry on product cards, recipe detail, and browser fullscreen behavior.
- Test bubble dragging and containment at 393×529 mobile and 1280×1800 desktop sizes, including touch behavior, no overflow, no overlap with surrounding sections, and reduced-motion behavior.
