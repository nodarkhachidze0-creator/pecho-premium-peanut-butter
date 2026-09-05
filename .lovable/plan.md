# Pecho — spec alignment pass

Most of the requested page already exists (header, marquee, about, news, FAQ, map, brown footer). This plan only changes the parts that differ from the new specification.

## 1. Top bar and hero wording
- Announcement bar text becomes "🎁 აქცია ლიმიტირებული დროით 🎁" (drops "2+1").
- Hero small orange line becomes "ლიმიტირებული დროით".
- Hero headline becomes "ნატურალური მიწისთხილის კარაქი" (Georgian) with a matching English version.
- Hero keeps the two buttons and the rounded promo image as they are today.

## 2. Product carousel restyle
- Section background switches from dark brown to the warm beige page background.
- Spotlight behind the centre jar becomes a soft golden glow that fades out.
- Title, weight and the four feature labels switch to dark brown text.
- Side jars: 75% scale, 60% opacity. Arrows, keyboard and swipe stay as built.
- No 2+1 wording anywhere in this section (already the case).

## 3. Locations section — 8 addresses
Replace the current six Batumi shops with exactly the eight listed places:
თბილისი გუხაიძის 44გ; გორი ქრისტოფერ ქასტელის N45; გორი სტალინი, ქუთაისის ჩიხი N25; გორი ქართლის N25; გორი შინდისის გმირების 17ბ; გორი გორგასლის 8; ახალციხე თამარაშვილის მიმდებარე; ქარელი, დ. აგარა, ხორავას 3ა.
- Right column title becomes "8 ლოკაცია", list stays scrollable with orange pin, bold name and a "იხილე რუკაზე" button that recentres the map.
- Map pin coordinates will be looked up per address; where an address is approximate (Akhaltsikhe "adjacent territory"), the pin lands on the named street.

## 4. Checks
Colours, fonts (Hakuna headings, Noto Sans Georgian body), navbar, marquee, news, FAQ accordion and the "დაგვიკავშირდი" footer already match the spec and stay untouched.

## Technical notes
- Files: `src/components/AnnouncementBar.tsx`, `src/lib/i18n.tsx` (hero strings), `src/components/ProductCoverFlow.tsx` + carousel rules in `src/styles.css`, `src/data/stores.ts`, `src/components/StoreMap.tsx` (heading count).
- Cart badge stays driven by real cart state rather than a hard-coded "6".
- No changes to products, pricing, cart, checkout or admin logic.
