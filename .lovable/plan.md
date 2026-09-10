# Product sizing and lifestyle gallery refinement

## 1. Normalize transparent jar sizing
- Use the current Classic 450g card presentation as the visual baseline.
- Add product-specific presentation sizing so Crunchy 450g matches Classic 450g in visible height and width across catalog and related-product cards.
- Increase both 1kg transparent jars in product-card and homepage cover-flow presentations, reducing excess image whitespace without changing the underlying files.
- Keep the 2+1 bundle image and behavior unchanged.

## 2. Remove the catalog hover panel
- Delete the dark desktop specifications panel and its slide-in hover/focus behavior from product cards.
- Remove the image shift that made room for that panel, keeping each jar centered and unobstructed.
- Preserve the existing product link, title, price, mobile inline details, add-to-cart action, and fly-to-cart feedback.

## 3. Add the four new lifestyle gallery photos
- Upload the attached WebP files through the project asset system and map them exactly:
  - `450გრ_ხრუხუნა3.webp` → Crunchy 450g
  - `1კგ_კლასიკი3.webp` → Classic 1kg
  - `1კგ_ხურხუნა3.webp` → Crunchy 1kg
  - `450გრ_კლასიკი3.webp` → Classic 450g
- Extend each product with an ordered detail gallery: retain its current lifestyle photo first and add the new “3” photo second.
- Add compact selectable thumbnails on product detail pages and update the main photo when a thumbnail is selected.
- Keep every main and thumbnail lifestyle image clipped with `20px` rounded corners and hidden overflow.
- Leave the bundle detail presentation unchanged because no matching gallery photo was supplied.

## 4. Responsive and interaction checks
- Compare Classic 450g and Crunchy 450g side-by-side at desktop and mobile catalog widths.
- Confirm both 1kg transparent jars use the available card and carousel space more confidently without clipping.
- Confirm no dark information overlay appears by mouse hover or keyboard focus.
- Open all four product detail pages and verify both correctly mapped lifestyle photos can be selected, remain properly cropped, and retain rounded corners.

## Technical notes
- Store sizing intent in product presentation metadata or stable SKU-specific classes rather than modifying the source images.
- Model detail photography as an image array so more gallery photos can be added later without changing the page structure.
- Use existing semantic brand styles and accessible buttons, including selected-thumbnail state and labels.