/**
 * lang-toggle.js
 * ---------------------------------------------------------------------------
 * Wires up the EN / 中文 toggle button in the header. On click:
 *   1. Flips window.MAEDA_LANG (defined in i18n.js)
 *   2. Re-renders every [data-i18n] / [data-i18n-aria-label] /
 *      [data-i18n-placeholder] element from the dictionary
 *   3. Updates <html lang>, the toggle button's own label, document.title,
 *      and the meta description
 *   4. Persists the choice to localStorage so it's remembered next visit
 *   5. Dispatches a 'maeda:langchange' event so other scripts that build
 *      their own text at runtime (open-status.js, newsletter-form.js,
 *      testimonial-carousel.js) can re-render in the new language too
 *
 * All text is set via textContent (never innerHTML) — every string in the
 * dictionary is plain text, so this carries no injection risk regardless
 * of where the strings originated.
 * ---------------------------------------------------------------------------
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'maeda_lang';

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('lang-toggle');
    var saved = readSavedLang();

    if (saved === 'zh') {
      applyLanguage('zh');
    } else {
      // Already rendered in English by default in the HTML source — just
      // sync the toggle button's label/aria-state to match.
      updateToggleUI();
    }

    if (toggle) {
      toggle.addEventListener('click', function () {
        var next = window.MAEDA_LANG === 'zh' ? 'en' : 'zh';
        applyLanguage(next);
        try {
          window.localStorage.setItem(STORAGE_KEY, next);
        } catch (err) {
          // Storage unavailable (private browsing, quota, etc.) — the
          // language choice just won't persist across visits, which is a
          // harmless degradation, not a broken feature.
        }
      });
    }
  });

  function readSavedLang() {
    try {
      var v = window.localStorage.getItem(STORAGE_KEY);
      return v === 'zh' ? 'zh' : 'en';
    } catch (err) {
      return 'en';
    }
  }

  function applyLanguage(lang) {
    window.MAEDA_LANG = lang;
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-Hans' : 'en');

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      el.textContent = window.maedaT(key, el.textContent);
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria-label');
      el.setAttribute('aria-label', window.maedaT(key, el.getAttribute('aria-label')));
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', window.maedaT(key, el.getAttribute('placeholder')));
    });

    document.title = window.maedaT('doc_title', document.title);
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', window.maedaT('meta_description', metaDesc.getAttribute('content')));

    updateToggleUI();

    // Let other scripts (open-status.js, newsletter-form.js,
    // testimonial-carousel.js) re-render their own dynamic text.
    window.dispatchEvent(new CustomEvent('maeda:langchange', { detail: { lang: lang } }));
  }

  function updateToggleUI() {
    var toggle = document.getElementById('lang-toggle');
    if (!toggle) return;
    var label = toggle.querySelector('[data-lang-toggle-label]');
    if (label) label.textContent = window.maedaT('lang_toggle_target');
    toggle.setAttribute('aria-label', window.maedaT('lang_toggle_aria'));
  }
})();
