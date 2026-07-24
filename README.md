# Maeda Hair Salon — Landing Page

A landing page for **Maeda Hair Salon (漂亮人生)**, 1302 Avenue U, Homecrest,
Brooklyn — built from their public listings (Google Maps, MapQuest, Atly,
Instagram) since the business doesn't currently have its own dedicated
marketing site.

## Folder structure

```
maeda-hair-salon/
├── index.html                 Single page — all markup lives here
├── README.md                  You are here
├── SECURITY.md                 Full write-up of every security measure
├── robots.txt                  Search-engine crawling rules
├── sitemap.xml                 Search-engine sitemap
├── _headers                    Netlify security headers
├── vercel.json                 Vercel security headers (same policy)
├── .htaccess                   Apache/cPanel security headers (same policy)
├── .gitignore
│
├── css/
│   ├── tokens.css               Colors, type scale, spacing, shadows — change the site's whole look from here
│   ├── base.css                 Resets, base element styles, accessibility defaults
│   ├── layout.css               Header, hero, section grids, footer scaffolding
│   ├── components.css           Buttons, cards, badges, the video frame, forms
│   ├── utilities.css            Small reusable helper classes (keeps the CSP inline-style-free)
│   ├── animations.css           Scroll reveals + the signature curl-line draw
│   └── responsive.css           Breakpoints: 375 / 768 / 1024 / 1440px
│
├── js/
│   ├── config.js                 Business facts (hours, phone, address, timezone) in one place
│   ├── security-utils.js         Shared sanitization + external-link hardening helpers
│   ├── i18n.js                    EN / 中文 translation dictionary + maedaT() lookup helper
│   ├── lang-toggle.js             Language toggle button wiring + localStorage persistence
│   ├── nav.js                    Mobile menu toggle
│   ├── nav-scroll.js              Header scroll-shadow state + active-section nav highlighting
│   ├── mobile-call-bar.js         Reveals the sticky mobile call bar past the hero
│   ├── video-init.js              Reveals the real video once reel.mp4 exists, hides placeholder
│   ├── map-pin.js                 Triggers the map pin drop-in animation on scroll
│   ├── scroll-reveal.js          IntersectionObserver reveal-on-scroll
│   ├── count-up.js                Animates the hero stat numbers counting up into view
│   ├── testimonial-carousel.js    Auto-rotating, accessible testimonial carousel
│   ├── faq.js                     FAQ accordion (single-open behavior on top of native <details>)
│   ├── tilt.js                    Cursor-follow 3D tilt on the hero video frame
│   ├── magnetic-buttons.js        Subtle cursor-pull hover effect on primary buttons
│   ├── lottie-init.js            Wires up the animation badge, with a safe fallback icon
│   ├── open-status.js            Live "Open now / Closed" badge — uses the SALON'S timezone
│   ├── newsletter-form.js        Honeypot + validation + sanitization for the footer signup
│   └── app-init.js               Footer year, final wiring
│
└── assets/
    ├── images/
    │   ├── logo-card-texture.jpg   Your uploaded business-card photo
    │   └── favicon.svg              Simple brand favicon
    ├── lottie/
    │   └── sparkle.json             A small original animation (see "Animations" below)
    ├── vendor/
    │   ├── lottie-player.js         Self-hosted animation library (no third-party CDN)
    │   └── LOTTIE-PLAYER-LICENSE.txt
    └── video/
        ├── README.md                 Step-by-step: drop your clip in here
        └── (put reel.mp4 + reel-poster.jpg here)
```

## Motion & animation layer

Added on top of the original scroll-reveal fades:

- **Hero entrance** — the headline lines and stat row animate in on page
  load (pure CSS, no JS dependency — see `.hero-line`/`.hero-fade-in` in
  `css/animations.css`).
- **Drifting background blobs** — soft gradient shapes behind the hero
  (`.hero-blob-a/-b`), purely decorative, `z-index: -1` so they never
  interfere with content or clicks.
- **Cursor-follow tilt** — the video frame tilts slightly toward the
  cursor (`js/tilt.js`). Automatically disabled on touch devices and under
  reduced-motion.
- **Magnetic buttons** — primary buttons drift a few px toward the cursor
  on hover (`js/magnetic-buttons.js`), same disable conditions as tilt.
- **Count-up stats** — the 8.8 rating and 250+ reviews animate up from 0
  once scrolled into view (`js/count-up.js`); the real number is already in
  the HTML, so it's correct even if this script never runs.
- **Service icon hover** — icons flip color and rotate slightly on card
  hover (pure CSS, `css/components.css`).
- **Wave section divider** — a hand-drawn-style SVG wave separates the
  Services and Story sections (`.section-wave` in `css/layout.css`).
- **Testimonial stars** — pop in one-by-one once a review card scrolls
  into view.
- **Scroll-aware header** — deepens its blur/shadow after scrolling past
  the top, and highlights whichever nav link matches the section in view
  (`js/nav-scroll.js`).

Every motion effect above respects `prefers-reduced-motion` (checked either
via CSS media query or `window.matchMedia` in the relevant script) and
degrades to a fully visible, fully functional static page if JavaScript is
disabled entirely.

## New sections & features (this round)

- **Pricing** (`#pricing`) — the one sourced number ($25 blow dry) is shown
  as-is; everything else says "Ask in-salon" rather than a made-up dollar
  figure, since I don't have verified pricing for cuts, extensions, or
  lashes. Swap in real numbers in `index.html` (search `price2_title` etc.
  in `js/i18n.js` for the matching translations) whenever you have them.
- **FAQ** (`#faq`) — native `<details>/<summary>`, so it's fully accessible
  and functional with zero JS. `js/faq.js` only adds the "closes other
  items when one opens" nicety.
- **Sticky mobile call bar** — appears once you scroll past the hero on
  phones, so a "Call Now" tap target is always one thumb-reach away.
- **Testimonial carousel** — auto-rotates every 6s, pauses on
  hover/focus/tab-hidden, full manual arrow + dot control. Ships as a plain
  3-across grid if JS doesn't run.
- **Animated map pin** — a decorative pin drops in with a bounce when the
  Location section scrolls into view. The actual map is still Google's own
  embed; this is a purely cosmetic layer on top.
- **EN / 中文 toggle** — click the pill button in the header. Translates
  ~110 strings (nav, hero, services, pricing, FAQ, hours, footer, etc.) and
  remembers the choice via `localStorage`. Customer testimonial quotes are
  deliberately left untranslated — they're real reviews, not copy. The
  translations are a solid first pass but haven't been reviewed by a native
  speaker familiar with the salon's own clientele — worth a check before
  publishing, and worth asking whether Traditional Chinese would actually
  serve the audience better than Simplified.
- **Timezone fix** — the open/closed badge now reads the salon's actual
  local time (`America/New_York`, set in `js/config.js`) via
  `Intl.DateTimeFormat`, instead of the visitor's own device clock. Someone
  browsing from another timezone now sees an accurate status.

## Running it





No build step, no dependencies, no server required for basic viewing:

1. Open `index.html` directly in a browser, **or**
2. For the most accurate preview (some browsers restrict video autoplay
   differently over `file://` vs a real server), run a tiny local server
   from this folder:
   ```
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000`.

## Adding your 5-second video

See `assets/video/README.md` for the full walkthrough. Short version: name
your square (1:1) clip `reel.mp4` and drop it into `assets/video/`. The
hero section's rounded-corner frame (`.video-frame` in `css/components.css`,
`border-radius: var(--radius-video)` in `css/tokens.css`) already expects
it — the placeholder graphic disappears automatically once the file exists.

## About the design system

The visual direction — the **Soft UI Evolution** style, the rose/violet
"beauty & wellness" palette, and the Playfair Display + Inter type pairing —
was generated using the **ui-ux-pro-max** design-intelligence CLI you
linked (`nextlevelbuilder/ui-ux-pro-max-skill`), run against a "hair salon /
beauty" brief. All hex values live in `css/tokens.css` if you want to try a
different direction later.

## About the animation (Lottie / LottieFiles)

You linked lottiefiles.com, and the site is wired up for it — but rather
than guess at a specific animation URL from their catalog (which requires
their JS-driven app to resolve), `assets/lottie/sparkle.json` is a small,
original animation authored directly in the Lottie JSON format, so the site
works immediately with **zero external network calls**. To swap in a real
pick from LottieFiles instead:

1. Browse **https://lottiefiles.com/free-animations** for anything free
   (a scissors snip, a spinning styling chair, confetti, etc.).
2. On the animation's page, use its download option to save the **Lottie
   JSON** file (not just a GIF/MP4 preview).
3. Drop the downloaded file into `assets/lottie/`.
4. Open `js/lottie-init.js` and change the `LOTTIE_SRC` constant at the top
   to point at your new filename.

Downloading and self-hosting the file (instead of linking LottieFiles' CDN
directly in `<script src>`) is what lets the Content-Security-Policy stay
locked to `script-src 'self'` — see `SECURITY.md` for why that matters.

## Content sources

Business facts (address, phone, hours, services, rating, and the
paraphrased/short-quoted reviews in the Reviews section) were pulled from
the salon's public listings on Google Maps, MapQuest, Atly, and Instagram.
**Please verify every detail — hours, phone number, service list, review
quotes — against the actual business before publishing**, and confirm you
have the right to publish any customer review text you keep or expand on.

The uploaded logo file is a photo of a scattered stack of business cards
rather than a clean vector mark, so it's used sparingly, as a soft
background texture rather than a crisp logo. A proper vector wordmark or
icon logo would be a worthwhile next step if the salon doesn't have one.
