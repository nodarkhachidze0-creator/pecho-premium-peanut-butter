# Pecho — Homepage improvements & layout updates

No redesign. Only the changes below.

## 1. About text (homepage)
In `src/lib/i18n.tsx`, replace the `home.about.body` Georgian string with:
"Pecho შეიქმნა ერთი იდეით — შეგვექმნა პროდუქტი, რომელიც ყოველდღიურ არჩევანს უფრო ჯანსაღს და სასიამოვნოს გახდიდა."
Nothing else in that section changes.

## 2. Recipe detail — portrait video layout
Rework only the layout of `src/routes/recipes.$slug.tsx`:
- Two columns on desktop (`lg:grid-cols-[minmax(0,420px)_1fr]`), single column on mobile with the video first.
- Video wrapper uses a 9:16 portrait ratio, `max-height: 760px`, `object-contain`, rounded corners and the existing shadow/ring styling. Native fullscreen keeps portrait because the element is no longer forced to 16:9.
- All existing title, description, ingredients, steps, plating and closing content moves into the right column unchanged (same typography, same Reveal animations).
- The listing thumbnail on `/recipes` stays as-is.

## 3. Sticky video (desktop only)
The left column becomes `lg:sticky lg:top-[120px] lg:self-start`; no sticky below `lg`. It naturally releases when the right column ends.

## 4 & 5. Store map section (homepage)
New section directly above the contact strip in `src/routes/index.tsx`:
- Title "სად შეგიძლიათ ჩვენი პროდუქტის შეძენა", subtitle "იპოვეთ თქვენთან ყველაზე ახლოს არსებული მაღაზია."
- New `src/data/stores.ts` holding the locations array (`name`, `address`, `lat`, `lng`). This is the only file to edit when adding stores — no markers hardcoded in the component.
- New `src/components/StoreMap.tsx` loads Google Maps JS, renders a marker per entry and an info window with name + address on click. Zoom and pan enabled, rounded container, brand-styled, responsive height (~360px mobile / ~520px desktop). Read-only for visitors — no editing UI anywhere.
- Seed locations (Batumi): გ. გამსახურდიას/ჭავჭავაძის 49/4, ხულოს ქუჩა 13, ალექსანდრე ყაზბეგის 17, შერიფ ხიმშიაშვილის 4, ნიჟარაძის 23, მაიაკოვსკის 95. I'll geocode each address to lat/lng and store the coordinates in the data file.
- Requires linking the Google Maps Platform connector — I'll prompt for that during the build; the existing simple iframe map on the contact page stays untouched.

## 6. Announcement bar
New `src/components/AnnouncementBar.tsx` rendered in `src/routes/__root.tsx` inside a shared sticky wrapper together with `<Header />`, so both stick as one unit on every page. 42px tall, brand orange background, centered white text "🎁 2+1 აქცია ლიმიტირებული დროით 🎁", responsive text size, no content overlap (the header's own `sticky top-0` moves to the wrapper).

## 7. Remove feature cards
Delete the "Why Choose" section (`home.why.*` — წმინდა ქართული / ნატურალური შემადგენლობა / ახლადგამომუშავებული) from `src/routes/index.tsx` along with its `whyItems` array and now-unused icon imports; the featured products section then flows straight into the About preview with no leftover gap.

## 8. Verification
Browser check at desktop, tablet and mobile: portrait video renders uncropped and sticks while scrolling, fullscreen stays portrait, map loads with all six markers and clickable info, announcement bar shows on every route, feature cards gone with clean spacing. Products, cart, checkout, FAQ, admin, partners and animations untouched.
