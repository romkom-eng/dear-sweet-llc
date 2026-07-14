# Dear Sweet LLC — Premium Redesign: What Changed

Applied to the real repo (romkom-eng/dear-sweet-llc), not a mockup. Build-tested locally
with `npm run build` after every step — compiles clean. Not tested against your live
Firebase/Stripe project (no credentials available here), so please review in a preview/
staging branch before deploying to production.

## Files changed

- **index.html** — swapped Google Fonts from Fredoka/Nunito to Fraunces/Inter.
- **tailwind.config.cjs** — new color tokens (ivory/gold/burgundy/charcoal instead of the
  old cream/rose/burgundy) and font families. Because Home, Menu, ProductDetail, Story,
  Order, and Layout already used theme tokens (`bg-primary`, `text-accent`, etc.) instead
  of hardcoded colors, this one file cascades the new look across nearly the whole
  customer-facing site automatically.
- **src/components/Layout.jsx** — added the scrolling marquee bar above the header (the
  one from the approved mockup). Login button and cart icon were already wired to your
  real AuthContext/CartContext — no logic changed, they just inherit the new look.
- **src/components/CartDrawer.jsx** — recolored from the old dark-chocolate/antique-gold
  inline styles to the new charcoal/gold/ivory palette, fonts updated to Fraunces/Inter.
  Softened one line of copy ("It's all mine!..." → "Baked fresh to order, just for you."),
  swapped the cookie emoji for a plain icon, fixed a typo ("Irivine" → "Irvine"). Cart
  logic, Stripe checkout call, and delivery-method logic are untouched.
- **src/components/auth/LoginModal.jsx** — same recolor/font treatment. Firebase auth
  calls (Google sign-in, email sign-in/sign-up) untouched.
- **src/components/Order.jsx** — one hardcoded hex swapped for the theme token so the
  wholesale-inquiry hero stays in sync with the rest of the site. Form/EmailJS logic
  untouched.
- **src/components/Menu.jsx** — added a "Coming Soon" card for Milk Bread at the end of
  the grid (only shown on the default, unfiltered view).
- **src/components/Home.jsx** — added a matching "Coming Soon" teaser section, swapped
  the cookie emoji in the promo strip for the gold "✦" mark used in the marquee.
  **Follow-up fix**: replaced the 8 multicolor cartoon category icons (cookie dots,
  strawberry, gift box, sparkle, star, truck, heart) with a single consistent set of
  thin gold line-icons, and flattened the icon container (removed the drop-shadow +
  bounce-on-hover) so the category row no longer clashes with the premium marquee/nav
  above it. Banner CTA button also squared off slightly (was a rounded pill).

## New file

- **src/data/upcoming.js** — Milk Bread lives here, deliberately kept *separate* from
  `src/data/products.js`. It has no price, no variant, no Stripe wiring — it's a
  display-only teaser (no photo yet either, so it shows a "Photo coming soon" placeholder
  instead of a fabricated image). When you're ready to actually sell it, move it into
  `products.js` with real variants/pricing and it'll pick up the full cart/checkout flow
  automatically.

## What was deliberately left alone

- The admin dashboard (Dashboard, SalesInput, InventoryBoard, ExpenseTracker,
  CostCalculator, AdminLogin, AdminProducts) — internal tooling, out of scope for a
  customer-facing site redesign.
- ProductDetail.jsx, Story.jsx, legal pages — no hardcoded colors/fonts found in these,
  so they inherit the new look from the tailwind config automatically. No manual edits
  needed.
- All business logic: Stripe checkout session creation, Firebase auth/Firestore writes,
  EmailJS wholesale form, cart math, pickup/shipping rules — none of it was touched.

## Known limitation — not fixable in code

The hero banner carousel photos (`banner1.png`–`banner4.png`) have marketing captions
baked directly into the image files (e.g. "M&M's melting!", "Dubai Chewy Cookie" with a
lock graphic). That text is part of the photo/graphic itself, not code, so it can't be
restyled from here — it'll keep the old playful voice until those specific images are
redesigned or replaced. Happy to help with new versions if wanted.

## Round 2 — bottom tab bar fix

Flagged from a screenshot: the mobile tab bar (Home/Shop/Saved/Profile) in both
`Home.jsx` and `Menu.jsx` had no responsive class, so it was showing at full desktop
width, and "Profile" linked to `/profile`, a route that doesn't exist in `App.jsx` (would
404). Neither of these was something the redesign introduced — pre-existing.

- **src/components/Home.jsx / Menu.jsx** — added `sm:hidden` so the tab bar is
  mobile-only again. Replaced the dead `/profile` link with a working button: tapping it
  calls `openLogin()` (signed out) or `signOut()` (signed in) using your existing
  Firebase auth — no new page needed, no broken route.
- **src/context/AuthContext.jsx** — added `showLoginModal` / `openLogin` / `closeLogin`
  to the context so any page can trigger the sign-in modal, not just `Layout.jsx`.
- **src/components/Layout.jsx** — switched the header's "Sign In" button and the
  `<LoginModal>` render from local component state to this shared context state
  (same modal, same behavior — just reachable from more places now).

Also worth double-checking on your end: the marquee bar (dark strip above the header)
wasn't showing in the screenshot you sent. The code for it is present in `Layout.jsx` in
this bundle — if it's still missing after applying this patch, it likely means the
`Layout.jsx` hunk didn't get applied cleanly last time; worth re-applying or diffing
against your live file directly.

**Not touched (flagging, not fixing, since it wasn't part of what you asked to fix):**
the "Saved" heart-icon button in the tab bar (and the heart icons on individual product
cards) don't do anything — no wishlist feature exists in the codebase. Say the word if
you'd like that wired up or removed.

## Round 3 — border-radius + Milk Bread grid integration

Two things flagged: (1) Milk Bread felt bolted-on as a separate dashed box instead of
actually being "in" the shop, and (2) the site had way more rounded corners than the
approved premium mockup, which used small, sharp-ish radii almost everywhere.

- **tailwind.config.cjs** — shrank the border-radius scale: `DEFAULT` 1rem→0.25rem, `xl`
  1.5rem→0.5rem, `2xl` 2rem→0.625rem, and added `3xl`→0.75rem (previously un-overridden,
  defaulting to Tailwind's 1.5rem). This cascades to every card/button/input using
  `rounded`, `rounded-xl`, `rounded-2xl`, `rounded-3xl` across Home, Menu, ProductDetail,
  Story, Order, and Layout — same "one config file, wide effect" approach as the color
  change. Note: this also affects the admin dashboard's `rounded-xl`/`rounded-2xl` usage
  (same tradeoff as the earlier color-token cascade) — purely cosmetic, nothing breaks.
- **Arbitrary bracket radii** (`rounded-[1.75rem]`, `rounded-[2rem]`, `rounded-[2.5rem]`,
  `rounded-[3rem]`) don't come from the theme scale, so they had to be swapped by hand,
  file by file, in Home.jsx, Menu.jsx, ProductDetail.jsx, Order.jsx, and Story.jsx.
- **Pill-shaped badges/buttons** (`rounded-full` on tag badges, "Coming Soon" labels,
  filter chips, eyebrow labels — not actual circles) converted to small rectangular
  radius to match the approved mockup's flatter button language. Genuinely circular UI
  (avatars, icon buttons, carousel dots, category-icon circles) was left as `rounded-full`
  — those aren't part of the "too rounded" complaint, they're supposed to be circles.
- **src/components/Home.jsx** — Milk Bread is now a real 4th card inside the same
  `grid-cols-2 lg:grid-cols-4` product grid (dashed border + "Photo coming soon" +
  "Coming Soon" label instead of a price/Add button), only shown under the "All" tab.
  It's still intentionally excluded from `PRODUCTS`/cart logic — same reasoning as
  before, just placed so it doesn't look disconnected from the shop.

## Round 4 — new banner photography via Higgsfield

Replaced the hero carousel's 4 banner images. The old ones (`banner1-4.png`) had
marketing captions baked into the photo itself ("M&M's melting!", hand-drawn "Dubai
Chewy Cookie" box art) — impossible to restyle from code. Generated 4 new ones with
Higgsfield (`marketing_studio_image`), using the real product photos
(`cookie_original_final.png`, `cookie_strawberry_final.png`, `bagel_chocolate_mm.png`)
as references so the food itself stays accurate — clean premium editorial food
photography, no baked-in text, so the code's own CTA overlay (gradient + button) reads
cleanly on top.

- **src/components/Home.jsx** — `BANNERS` array now points at the 4 new Higgsfield
  result URLs (hosted on Higgsfield's CDN) instead of `/banner1.png` etc.

**Important — action needed on your end:** these image URLs are hosted on Higgsfield's
CDN, not your own domain. That's fine for now (they're stable result URLs), but for a
production site you don't want to depend on a third party's CDN indefinitely. Recommend
downloading these 4 images and saving them as `banner1.png`–`banner4.png` in your `public/`
folder (replacing the old ones), then switching `Home.jsx`'s `BANNERS[].image` back to the
local `/bannerN.png` paths:

1. Original cookie: https://d8j0ntlcm91z4.cloudfront.net/user_3Ev0ChyVa59YmorlMzoYmbJLlzL/hf_20260713_221042_3b57c250-39db-48c8-b7c8-5f4c41c760c4.png
2. Strawberry cookie: https://d8j0ntlcm91z4.cloudfront.net/user_3Ev0ChyVa59YmorlMzoYmbJLlzL/hf_20260713_221048_4404410d-823d-4349-9c1a-74784259504d.png
3. Gift assortment: https://d8j0ntlcm91z4.cloudfront.net/user_3Ev0ChyVa59YmorlMzoYmbJLlzL/hf_20260713_221054_3e1d10aa-5293-4e12-8f6f-7191b48120bb.png
4. M&M chocolate bagel: https://d8j0ntlcm91z4.cloudfront.net/user_3Ev0ChyVa59YmorlMzoYmbJLlzL/hf_20260713_221058_9f186d5c-30bc-4905-9ab0-26b777712539.png

## Round 5 — real Milk Bread photos

You sent 5 real product photos of the milk bread. Saved all 5 into `public/` (see the
`public/` folder in this bundle: `milkbread_whole.jpg`, `milkbread_pull.jpg`,
`milkbread_pull_inpan.jpg`, `milkbread_loaf_angle.jpg`, `milkbread_slice_bag.jpg`).

- **src/data/upcoming.js** — Milk Bread's `image` field now points to
  `/milkbread_whole.jpg` (the clean straight-on loaf shot) instead of `null`.
- **src/components/Home.jsx / Menu.jsx** — the "Photo coming soon" text placeholder is
  now a real `<img>` when `u.image` is set (falls back to the text placeholder
  automatically if `image` is ever null again — didn't remove that fallback).
- Still intentionally kept in `upcoming.js`, not `products.js` — same reasoning as
  before: no price/variant yet, so it stays out of cart/checkout until it's ready to
  sell.

**Note on the patch file**: git diffs don't carry binary image content usefully — the
patch will show these 5 files as binary adds but won't contain the actual image bytes.
Copy them from this zip's `public/` folder directly into your repo's `public/` folder;
don't rely on the patch for the images themselves.

**Other 4 unused photos**: only `milkbread_whole.jpg` is wired in right now. The other
4 (including the nice pull-apart "heart" shot) are saved in `public/` too, ready if you
want a second image somewhere later (e.g. a future product detail page, or the Story
section) — just say which one and where.

## Round 6 — Milk Bread is live, not "coming soon"

You confirmed real pricing ($4.50/slice, 5-pack for $20), so Milk Bread moved from
teaser to an actual sellable product.

- **src/data/products.js** — added a real Milk Bread entry: `price: 4.50`, variants
  `1 Slice` ($4.50) and `5-Pack` ($20.00), tag `New`, using the real photo
  (`/milkbread_whole.jpg`). This is now wired through the exact same cart → Stripe
  checkout flow as the cookies and bagel — Add to Cart, quantity, pickup/shipping, all
  of it, no special-casing needed.
- **src/data/upcoming.js** — emptied out (Milk Bread was the only entry). The
  "Coming Soon" card logic in Home.jsx/Menu.jsx still exists but simply renders nothing
  while `UPCOMING` is empty — nothing to remove, it'll just quietly pick back up next
  time you have a real "coming soon" item to list.
- Also now appears in: the Order.jsx wholesale-inquiry product dropdown, the Home.jsx
  "New" tab filter, and the Gift Sets strip won't show it (its variant is "5-Pack", not
  a "...Box" label, which is what that section filters on) — flagging in case you want
  the 5-pack treated as a gift set too.

## How to apply

Two options, pick whichever's easier:
1. **Patch file**: `git apply dear-sweet-premium-redesign.patch` from your repo root.
2. **Files folder**: copy each file over the matching path in your repo (folder structure
   mirrors `src/...`).

Then `npm install && npm run dev` to preview before pushing.
