/**
 * nav.js — mobile menu toggle, closes on link click / outside click / Escape.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    function closeMenu() {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    function openMenu() {
      links.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', function () {
      var isOpen = links.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', function (e) {
      if (!links.classList.contains('is-open')) return;
      if (!links.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
  });
})();
