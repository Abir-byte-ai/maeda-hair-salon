/**
 * nav-scroll.js — two small pieces of scroll-driven behavior:
 *   1. Adds .is-scrolled to the header once the page scrolls past the top,
 *      deepening its background/shadow (see css/layout.css).
 *   2. Highlights whichever nav link corresponds to the section currently
 *      in view, using the same IntersectionObserver pattern as scroll-reveal.js.
 * Both are purely cosmetic — if this script fails to load, the header and
 * nav links simply stay in their default (still fully usable) state.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var header = document.querySelector('.site-header');
    if (header) {
      var lastState = false;
      var onScroll = function () {
        var shouldBeScrolled = window.scrollY > 12;
        if (shouldBeScrolled !== lastState) {
          header.classList.toggle('is-scrolled', shouldBeScrolled);
          lastState = shouldBeScrolled;
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    if (!('IntersectionObserver' in window)) return;

    var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    if (!navLinks.length) return;

    var sectionMap = {};
    navLinks.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) sectionMap[id] = link;
    });

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = sectionMap[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove('is-active'); });
            link.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    Object.keys(sectionMap).forEach(function (id) {
      sectionObserver.observe(document.getElementById(id));
    });
  });
})();
