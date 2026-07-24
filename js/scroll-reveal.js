/**
 * scroll-reveal.js — progressively reveals [data-reveal] elements as they
 * enter the viewport. If IntersectionObserver is unavailable, every element
 * is simply shown immediately (no broken/invisible content, ever).
 */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  document.addEventListener('DOMContentLoaded', function () {
    var targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) { observer.observe(el); });

    // The signature curl divider gets its own trigger for the draw-on animation.
    var curl = document.querySelector('.curl-divider');
    if (curl) {
      var curlObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              curlObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      curlObserver.observe(curl);
    }
  });
})();
