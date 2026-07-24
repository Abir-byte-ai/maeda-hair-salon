/**
 * mobile-call-bar.js — shows the fixed bottom call bar (mobile only, see
 * css/responsive.css) once the hero section scrolls out of view, so it
 * doesn't duplicate the call button that's already on screen at the top.
 * If IntersectionObserver is unavailable, the bar just stays visible the
 * whole time via the .no-js-safe CSS fallback — never broken, just less
 * clever.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var bar = document.getElementById('mobile-call-bar');
    var hero = document.getElementById('top');
    if (!bar || !hero || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          bar.classList.toggle('is-visible', !entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    observer.observe(hero);
  });
})();
