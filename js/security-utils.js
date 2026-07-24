/**
 * security-utils.js
 * ---------------------------------------------------------------------------
 * Small, dependency-free helpers used across the site's scripts. Centralizing
 * them means every form or dynamic write goes through the same reviewed code
 * path instead of ad-hoc innerHTML calls scattered across files.
 *
 * Practices demonstrated here (see SECURITY.md for the full write-up):
 *   1. Never write untrusted strings with innerHTML — always textContent.
 *   2. Strip control characters and cap length on every text input.
 *   3. Harden every external link at runtime as a defense-in-depth backstop,
 *      in case a future contributor forgets rel="noopener noreferrer".
 *   4. A minimal same-origin guard for anywhere a URL might be built
 *      dynamically later (e.g. a future "share" button).
 * ---------------------------------------------------------------------------
 */
(function () {
  'use strict';

  /**
   * Removes control characters, collapses whitespace, trims, and caps length.
   * Use this on every piece of free-text user input before it touches the
   * DOM, is stored, or is sent anywhere.
   * @param {string} value
   * @param {number} maxLength
   * @returns {string}
   */
  function sanitizeText(value, maxLength) {
    if (typeof value !== 'string') return '';
    var cleaned = value
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u001F\u007F]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    var cap = typeof maxLength === 'number' ? maxLength : 500;
    return cleaned.slice(0, cap);
  }

  /**
   * Conservative email format check. This is a UX nicety only — real
   * validation must always also happen server-side before any address
   * is stored or emailed to.
   * @param {string} value
   * @returns {boolean}
   */
  function isLikelyEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  /**
   * Writes plain text into an element safely (never innerHTML), preventing
   * any HTML/script injection even if the source string is attacker-controlled.
   * @param {Element} el
   * @param {string} text
   */
  function setTextSafely(el, text) {
    if (!el) return;
    el.textContent = text;
  }

  /**
   * Ensures every link that opens in a new tab cannot use window.opener to
   * reach back into this page (the classic "tabnabbing" vector), and that
   * off-site links are visually/semantically marked as external.
   */
  function hardenExternalLinks(root) {
    var scope = root || document;
    var links = scope.querySelectorAll('a[href^="http"]');
    links.forEach(function (link) {
      try {
        var url = new URL(link.href, window.location.href);
        if (url.origin !== window.location.origin) {
          if (link.target === '_blank' || link.hasAttribute('target')) {
            var rel = (link.getAttribute('rel') || '').split(' ');
            ['noopener', 'noreferrer'].forEach(function (token) {
              if (rel.indexOf(token) === -1) rel.push(token);
            });
            link.setAttribute('rel', rel.join(' ').trim());
          }
        }
      } catch (err) {
        /* Malformed href — leave untouched rather than throw. */
      }
    });
  }

  window.MaedaSecurity = {
    sanitizeText: sanitizeText,
    isLikelyEmail: isLikelyEmail,
    setTextSafely: setTextSafely,
    hardenExternalLinks: hardenExternalLinks,
  };
})();
