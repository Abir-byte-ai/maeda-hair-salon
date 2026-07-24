/**
 * count-up.js — animates any [data-count-to] number from 0 up to its real
 * value once it scrolls into view. Progressive enhancement: the element's
 * text already contains the correct final value in the HTML, so if this
 * script never runs (or IntersectionObserver is unavailable), visitors
 * simply see the right number the whole time — nothing is ever blank.
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', function () {
    var targets = document.querySelectorAll('[data-count-to]');
    if (!targets.length) return;

    // Reduced motion or no IntersectionObserver: leave the static value
    // that's already in the markup exactly as-is.
    if (prefersReducedMotion || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    targets.forEach(function (el) { observer.observe(el); });
  });

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count-to'));
    if (isNaN(target)) return;

    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1100;
    var start = null;

    el.classList.add('is-counting');

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      // easeOutCubic for a natural deceleration into the final number
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = target * eased;
      el.textContent = current.toFixed(decimals) + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
        el.classList.remove('is-counting');
      }
    }

    window.requestAnimationFrame(step);
  }
})();
