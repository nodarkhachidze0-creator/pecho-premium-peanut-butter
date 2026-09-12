# Checkout safeguard, order celebration, About photo, and faster reveals

## Checkout delivery safeguard
- Detect city names while the customer types the delivery address, covering Georgian forms for თბილისი, რუსთავი, and გორი (including “გორის”) plus common Latin spellings.
- When a city-zone address is detected while “Regions” is selected, automatically switch to “თბილისი / რუსთავი / გორი” and show a short bilingual confirmation beside the address/zone controls.
- Keep the existing jar-count tiers, totals, saved zone preference, and all cart calculations unchanged.
- Avoid changing the zone for ambiguous addresses; customers can still select either zone manually.

## Successful order celebration
- Preserve the current submit, order-saving, and cart-clearing sequence; show success only after the order request is accepted.
- Refresh the existing success view into a clean, centered confirmation state with lightweight confetti/glitter paper animation and a reduced-motion fallback.
- Use the corrected Georgian message: “მადლობას გიხდით შენაძენისთვის! თქვენს შეკვეთას მაქსიმუმ 2-3 სამუშაო დღეში მოგაწვდით.” Add the corresponding English message for bilingual consistency.
- Make “შოპინგის გაგრძელება” return to the Products page; the cart will already be reset by the successful checkout flow.

## About page photo
- Upload the supplied `450გრ_კლასიკი2-3.png` through the project asset flow.
- Replace only the current `pecho-classic-1kg.png` image in the second About story section.
- Render the portrait photo proportionally with stable dimensions, object-fit behavior, and matching rounded corners on mobile and desktop.

## Faster scroll reveals
- Shorten the shared fade/upward reveal timing and travel distance so existing reveals feel quick and responsive.
- Apply the shared reveal treatment to the major homepage sections that currently appear without it, while keeping the first screen immediate and avoiding animation-driven layout shifts.
- Keep stagger delays brief, retain `prefers-reduced-motion` behavior, and preserve current typography and responsive layouts.

## Verification
- Test address detection and zone correction for Georgian and Latin city names, and confirm the delivery total updates without changing tier logic.
- Place a test order and verify the success celebration, exact copy, cleared cart, and Products-page action.
- Check the About image crop/proportions and reveal timing at mobile and desktop sizes.
- Confirm all content pages retain route-specific metadata and the project validation passes.
