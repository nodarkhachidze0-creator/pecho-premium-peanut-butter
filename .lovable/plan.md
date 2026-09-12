# Recipe video + delivery price calculator

## 1. Recipe detail video

On a single recipe page the video currently shows a static cover photo until you press play.

- Remove the cover photo so the player shows the video's first frame right away.
- The player loads the beginning of the video and starts muted autoplay in a loop where the browser allows it; controls stay available so people can unmute, pause, or scrub.
- On phones it behaves the same, muted and inline, so it never takes over the screen.
- The recipes list page and its cards with play icons stay exactly as they are.

## 2. Delivery price widget

A new beige, rounded Pecho-styled panel that shows delivery cost based on how many jars are in the cart.

Where it appears: cart page (inside the summary column), cart drawer, and checkout summary — the same component everywhere, so the number the customer sees never changes between steps.

Zone selector: two pill buttons — "თბილისი / რუსთავი / გორი" and "რეგიონები". Choice is remembered on the device and pre-selects on the next visit; default is the city zone.

Pricing by total jar count (any size counts as one jar):

| Jars | City zone | Regions |
| --- | --- | --- |
| 1 | 7₾ | 9₾ |
| 2 | 5₾ | 8₾ |
| 3 | 3₾ | 7₾ |
| 4+ | უფასო მიწოდება | 5₾ |

Inside the panel:
- Progress bar filling toward 4 jars.
- A friendly prompt, e.g. "დაამატე კიდევ 1 ქილა და მიწოდება იქნება 3₾" / at 4+: "მიწოდება უფასოა 🎉" (regions: lowest 5₾ tier message).
- A quick-add button that adds one more jar of the best seller straight from the widget.
- Both Georgian and English copy.

Checkout: the order total and the saved order record use the calculated fee and the chosen zone instead of the current flat 5₾.

Layout: fixed-height prompt line and reserved progress-bar space so nothing jumps when the count changes; stacks cleanly on mobile.

## Technical notes

- `src/lib/delivery.ts`: `DeliveryZone` type, tier table, `deliveryFee(zone, jarCount)`, localStorage-backed `useDeliveryZone()` hook (hydration-safe).
- `src/components/DeliveryCalculator.tsx`: the shared widget; jar count from `useCart().count`, quick-add via `useCart().add` with the Classic 450g product.
- Replace `DELIVERY_FEE` usages in `src/routes/cart.tsx`, `src/routes/checkout.tsx`, and `src/components/CartDrawer.tsx` with the computed fee; keep the constant exported as a fallback only if still referenced.
- `src/routes/recipes.$slug.tsx`: drop `poster`, add `autoPlay muted loop playsInline preload="auto"`; keep `controls` and the 9/16 sticky frame.
- New i18n keys for zone labels, tier prompts, and the quick-add button.
