# Header rebuild, full-screen menu, smoother carousel

## 1. Minimal header
- Remove the orange announcement strip from every page (delete the component and its use in the root layout).
- Rebuild the header as three elements only: a square orange menu button on the left, the Pecho logo perfectly centered, and a square cart button on the right (light background, thin dark border, minimal cart icon, keeps the item-count badge).
- No inline text links and no EN/KA switcher in the bar; no decorative background elements.
- The menu button vibrates with a short shake animation on hover.

## 2. Full-screen navigation overlay
- Tapping the menu button opens a full-screen panel in brand orange.
- The eight page links are stacked vertically in very large Hakuna display type: მთავარი, პროდუქცია, რეცეპტები, პარტნიორები, ჩვენს შესახებ, სიახლეები, კითხვები, კონტაქტი.
- Each row shows a small number (01–08) aligned right.
- Hovering a row fills it with light beige and turns the text dark brown.
- A close button sits top-right; the panel closes on Escape and after navigating, and page scroll is locked while open.
- The EN/KA switcher moves into the bottom of this panel (it is otherwise lost); no account or login items.

## 3. Carousel transition
- Give the centre jar a real entrance: fade in from 0 opacity with a slight scale-up and directional slide matching the click direction, over roughly 450ms with an ease-out curve.
- Side jars ease smoothly into place instead of snapping.
- Reduced-motion users get a plain fade.

## Technical notes
- Delete `src/components/AnnouncementBar.tsx` and its import in `src/routes/__root.tsx`; keep the header sticky.
- Rewrite `src/components/Header.tsx` with local `open` state plus a new `NavOverlay` component; use existing semantic brand tokens, no hardcoded colours.
- Add `shake`, overlay entrance, and updated `coverflow-enter` keyframes in `src/styles.css`, including `prefers-reduced-motion` handling; no new dependencies (pure CSS, no Framer Motion).
- Track slide direction in `ProductCoverFlow.tsx` state to drive the directional enter animation.
