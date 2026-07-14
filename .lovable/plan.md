## Scope

Most items (#4–#7) already exist from the previous turn. This plan focuses on the three real changes — cinematic loader, redesigned dripping header, cursor removal — plus a light polish pass to make sure #4–#7 feel as premium as described.

## 1. Cinematic jar loading intro (`src/components/LoadingScreen.tsx`)

Rewrite the loader as a ~3s branded intro, shown once per session.

- Session gating: use `sessionStorage.getItem("pecho.intro.seen")`. If set, skip intro entirely (instant render). Otherwise play, then set the flag. This satisfies "first visit or after long inactivity" without re-playing on every refresh within a session.
- Composition (single SVG scene, centered):
  1. Jar body (glass with Pecho label using `PechoLogo`) fades in — 0–300ms.
  2. Lid twist: `rotate` from 0° → -35°, then `translateY(-40px)` with slight arc — 300–1000ms.
  3. Jar tilt: parent `rotate(-22deg)` with `transform-origin` at jar base — 900–1400ms.
  4. Peanut butter pour: an SVG path with animated `d` (or `clip-path` stretching a gradient-filled shape) flows from jar mouth downward, widening as it falls — 1200–2400ms.
  5. Handoff: the pour column stretches to full viewport width and morphs into the header drip shape; the jar scene fades out — 2400–3000ms.
  6. Loader unmounts; homepage fades in — 3000–3300ms.
- Reduced-motion: skip to a 200ms fade as today.
- Perf: pure CSS keyframes + one SVG, no JS RAF loop; `will-change: transform, opacity` only during play.

## 2. Redesigned dripping header (`src/components/DrippingPeanutButter.tsx`)

Replace the current slab + droplet system with one organic, asymmetric peanut butter layer.

- Fixed to top of viewport, `position: fixed; top: 0; left: 0; right: 0`, height ~10vh (clamped 72–140px).
- Single SVG path spanning full width with 5–7 drips of varied length/width (hand-tuned control points, no symmetry). Filled with the existing radial-gradient tokens; add a lighter gloss path on the upper 30% and a soft inner shadow at the bottom edge of each drip.
- Entrance: on mount, if intro flag is not yet set, stay hidden until the loader dispatches `pecho:intro-complete`, then run a 500ms "settle" (drips extend from 60% → 100% length via `clip-path`). On subsequent loads (flag set), render already-settled.
- Scroll droplets: keep the current `pecho-droplet-fall` system but anchor emit points to the tips of the 5–7 drips (hard-coded x offsets). Throttle to at most one droplet per ~450ms of scroll delta; each droplet detaches, falls, and unmounts on animation end. No droplets when reduced-motion.
- Add `pointer-events: none` and `aria-hidden` so it never intercepts clicks.

## 3. Remove custom cursor

- Delete `src/components/CustomCursor.tsx`.
- Remove its import and `<CustomCursor />` render from `src/routes/__root.tsx`.
- Remove any `cursor: none` rule and cursor-hover utility classes from `src/styles.css` if present.

## 4. Polish pass on existing interactions

Small tweaks only — no redesign.

- Verify `Reveal` is applied to the About, News list, and FAQ sections (previous turn only guaranteed home). Wrap top-level section blocks where missing.
- Confirm `ProductCard` 3D tilt uses `perspective` on the outer wrapper and `transform-style: preserve-3d` on the inner; add a subtle `--tilt` cap of 6° so it never feels gimmicky.
- Confirm `btn-premium` class has: hover `translateY(-1px)` + soft `box-shadow` glow in `#F3820A`, active `translateY(0) scale(0.98)`, and ripple already implemented.
- Empty cart, fly-to-cart, cart bump, order success celebration already match spec — leave as is, just re-verify visually.

## Technical notes

- No new dependencies.
- All animations remain CSS/SVG-driven; no `requestAnimationFrame` loops added.
- All new motion gated behind `prefers-reduced-motion: reduce`.
- Session flag key: `pecho.intro.seen` (sessionStorage, so a new tab or long inactivity replays it; a refresh in the same tab does not).
- Loader → header handoff is coordinated via a single `window.dispatchEvent(new CustomEvent("pecho:intro-complete"))` fired at the end of the pour.

## Files touched

- `src/components/LoadingScreen.tsx` — rewrite
- `src/components/DrippingPeanutButter.tsx` — rewrite
- `src/components/CustomCursor.tsx` — delete
- `src/routes/__root.tsx` — remove cursor mount
- `src/styles.css` — new keyframes for jar/lid/pour/settle; drop cursor styles
- `src/routes/about.tsx`, `src/routes/news.tsx`, `src/routes/faq.tsx` — add `Reveal` wrappers where missing
