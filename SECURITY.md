# Security Notes — Maeda Hair Salon Site

This is a static site (no server-side code, no database), which removes
whole classes of vulnerability by default — but "static" doesn't mean
"nothing to think about." Here's exactly what's been done, why, and what
you still need to do at deploy time.

## 1. Content-Security-Policy (CSP)

`index.html` sets a strict CSP via `<meta http-equiv="Content-Security-Policy">`:

- `script-src 'self'` — **only** scripts hosted on this site can run. No
  inline `<script>` blocks, no `onclick="..."` attributes, no third-party
  script CDNs. This is why the Lottie animation library is copied into
  `assets/vendor/` instead of loaded from a CDN like unpkg or jsDelivr at
  runtime — one less external origin that could be compromised or go down.
- `style-src 'self' https://fonts.googleapis.com` — no inline `style=""`
  attributes anywhere in the markup (every one was moved into `css/utilities.css`
  or a component class). Google Fonts' stylesheet is the one explicit exception.
- `object-src 'none'` — blocks Flash/legacy plugin embeds entirely.
- `base-uri 'self'` — stops an injected `<base>` tag from silently
  redirecting all relative links elsewhere.
- `form-action 'self'` — the newsletter form can only submit to this origin.
- `upgrade-insecure-requests` — any accidental `http://` sub-resource is
  upgraded to `https://` automatically.

**Meta tags can't do everything.** `frame-ancestors` (which stops the page
from being embedded in someone else's `<iframe>` — i.e. clickjacking
protection) and the legacy `X-Frame-Options` header can only be set as real
HTTP response headers, not via `<meta>`. That's what `_headers` (Netlify),
`vercel.json` (Vercel), and `.htaccess` (Apache/cPanel) are for — pick the
one matching your host, and delete the other two. **The page is not fully
protected against clickjacking until one of those is live on your host.**

## 2. No third-party script origins

The Lottie player library (`assets/vendor/lottie-player.js`) is vendored
locally rather than pulled from a CDN. Benefits:

- Nothing can supply-chain-attack the site by compromising a CDN.
- The CSP's `script-src` can stay at `'self'` — no external hosts to trust.
- The animation still works if the CDN is down, blocked by the visitor's
  network, or rate-limits the request.

Google Fonts is the one remaining third-party call, and it's explicitly
allow-listed in the CSP (`style-src`/`font-src`) rather than left open.

## 3. Forms (the newsletter signup)

`js/newsletter-form.js` implements every client-side control that's
reasonable to build without a backend:

| Control | What it does |
|---|---|
| Honeypot field | An invisible `website` field. Real visitors never see or fill it (it's `aria-hidden`, off-screen, and `tabindex="-1"`); most unsophisticated bots fill every field they can find. |
| Time-trap | A submit faster than 1.5 seconds after page load is treated as automated. |
| Sanitization | `js/security-utils.js` strips control characters and caps length on every input **before** it touches the DOM. |
| Safe DOM writes | Status messages use `textContent`, never `innerHTML` — nothing typed into the form can ever be interpreted as HTML/script. |
| Double-submit guard | The submit button disables itself during "submission." |

**This form has no backend connected yet.** All of the above raises the
bar for automated abuse, but a client can always be bypassed by hitting an
endpoint directly with a script. Whichever backend you wire this up to
(Netlify Forms, a serverless function, Mailchimp's API, etc.) **must**
independently re-validate the email format, re-check the honeypot is
empty, and apply its own rate limiting — never trust the browser alone.

## 4. External links

Every link that opens in a new tab (`target="_blank"`) — Instagram, Google
Maps directions — carries `rel="noopener noreferrer"`. `noopener` stops the
new tab from getting a JavaScript handle back into this page (the
"tabnabbing" attack, where a malicious destination page rewrites the tab
you came from). As a defense-in-depth backstop, `js/security-utils.js`
also re-applies this at runtime to any off-site link, in case a future
edit to the HTML forgets the attribute.

## 5. The embedded map

The Google Map on the Location section uses Google's key-less `output=embed`
iframe, so there's no API key sitting in the source for anyone to scrape
and abuse against your quota. It's the only cross-origin `<iframe>` on the
page, and it's the only origin allow-listed under `frame-src` in the CSP.

## 6. What's deliberately *not* here

- **No inline JavaScript or CSS anywhere** — makes the strict CSP possible
  and rules out a large class of injection bugs by construction.
- **No `eval`, `innerHTML` with dynamic content, or `document.write`.**
- **No third-party analytics/tracking pixels** — nothing was added that
  wasn't asked for; add your own if you want analytics, and extend the CSP's
  `connect-src`/`script-src` deliberately when you do.
- **No hard-coded secrets, API keys, or credentials** anywhere in the repo.

## 7. Before you deploy — checklist

- [ ] Confirm your host serves the site over **HTTPS** (required for the
      `Strict-Transport-Security` header to mean anything, and for
      `upgrade-insecure-requests` to have nothing left to upgrade).
- [ ] Confirm `_headers` / `vercel.json` / `.htaccess` (whichever matches
      your host) is actually being picked up — test with your browser's
      Network tab or `curl -I https://yourdomain.com/`.
- [ ] If you connect the newsletter form to a real backend, re-read
      Section 3 and re-validate everything server-side.
- [ ] If you add any new third-party script, font, image host, or embed,
      update the CSP in **both** `index.html` and the headers file — an
      allow-list only protects what's actually listed.
- [ ] Replace the placeholder canonical/OG URLs (`maedahairsalon.example`)
      with the real domain before launch.
