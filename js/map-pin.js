/**
 * map-pin.js — the decorative pin overlaying the map frame corner drops in
 * with a bounce once the Location section scrolls into view. Purely
 * decorative (the real, interactive map is Google's own embed) — if this
 * script or IntersectionObserver is unavailable, the pin just shows in its
 * resting position immediately rather than staying invisible.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var pin = document.getElementById('map-pin');
    if (!pin) return;

    if (!('IntersectionObserver' in window)) {
      pin.classList.add('is-visible');
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            pin.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(pin);
  });
})();
