/**
 * lottie-init.js
 * ---------------------------------------------------------------------------
 * Points the <lottie-player> element at the bundled sparkle animation.
 * The player library itself is self-hosted (assets/vendor/lottie-player.js)
 * rather than pulled from a third-party CDN at runtime — this keeps the
 * page's Content-Security-Policy free of any external script-src origin
 * and removes a supply-chain dependency entirely (see SECURITY.md).
 *
 * Robustness: the badge always shows a static sparkle icon FIRST (see the
 * markup in index.html + css/components.css). This script only reveals the
 * live animation once the player fires its "ready" event — so if the
 * animation can't load for any reason (blocked by a strict CSP, opened via
 * file:// where fetch() of local JSON is restricted by the browser, a typo
 * in the filename, etc.), visitors simply see the static icon instead of a
 * blank circle. Serving the page via a local server (e.g.
 * `python3 -m http.server`) rather than double-clicking index.html avoids
 * the file:// fetch restriction and lets the real animation load.
 *
 * Want a different animation from LottieFiles instead of the bundled one?
 *   1. Pick any free animation at https://lottiefiles.com
 *   2. Use its "Download" option to save the raw Lottie JSON file
 *   3. Drop it into assets/lottie/ (e.g. assets/lottie/my-animation.json)
 *   4. Change LOTTIE_SRC below to point at it
 * ---------------------------------------------------------------------------
 */
(function () {
  'use strict';

  var LOTTIE_SRC = 'assets/lottie/sparkle.json';

  document.addEventListener('DOMContentLoaded', function () {
    var player = document.querySelector('#hero-lottie');
    var badge = player ? player.closest('.lottie-badge') : null;
    if (!player || !badge) return;

    player.addEventListener('ready', function () {
      badge.classList.add('is-ready');
    });

    // Any load failure: stay on the static icon, nothing else to do —
    // it's already the default visible state.
    player.addEventListener('error', function () {
      badge.classList.remove('is-ready');
    });

    if (window.customElements && customElements.whenDefined) {
      customElements.whenDefined('lottie-player').then(function () {
        player.load(LOTTIE_SRC);
      });
      // If the custom element script itself never registers, the icon
      // stays put — no .catch() needed since that's already the fallback.
    } else {
      player.setAttribute('src', LOTTIE_SRC);
    }
  });
})();
