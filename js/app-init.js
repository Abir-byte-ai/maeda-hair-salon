/**
 * app-init.js — small page-wide wiring that doesn't deserve its own file:
 * footer year + running the external-link hardening pass once the DOM is ready.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var yearEl = document.querySelector('[data-current-year]');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    if (window.MaedaSecurity) {
      window.MaedaSecurity.hardenExternalLinks(document);
    }
  });
})();
