/**
 * newsletter-form.js
 * ---------------------------------------------------------------------------
 * "Stay in the loop" email capture in the footer. This form has no backend
 * yet — it's built to the point where wiring it to a real endpoint (Netlify
 * Forms, a serverless function, Mailchimp, etc.) is a one-line change, and
 * every anti-abuse control a client can reasonably provide is already here.
 *
 * IMPORTANT: none of this replaces server-side validation. A client can
 * always be bypassed by calling the endpoint directly, so whatever backend
 * this is eventually wired to MUST re-validate the email format, re-check
 * the honeypot field is empty, and apply its own rate limiting. See
 * SECURITY.md → "Forms" for the checklist.
 *
 * Client-side controls implemented here:
 *   1. Honeypot field ("website") — invisible to humans, bots often fill it.
 *   2. Time-trap — a submit faster than 1.5s after page load is almost
 *      certainly a bot script, not a person reading the form.
 *   3. Input sanitization via MaedaSecurity.sanitizeText before anything
 *      touches the DOM or would be sent anywhere.
 *   4. HTML5 + regex email validation with clear inline errors.
 *   5. Submit button is disabled during "submission" to prevent double-posts.
 * ---------------------------------------------------------------------------
 */
(function () {
  'use strict';

  var pageLoadTime = Date.now();

  function t(key, fallback) {
    return window.maedaT ? window.maedaT(key, fallback) : fallback;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('#newsletter-form');
    if (!form) return;

    var emailField = form.querySelector('#newsletter-email');
    var honeypot = form.querySelector('#newsletter-website');
    var status = form.querySelector('.form-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearError();

      // --- Bot check 1: honeypot -------------------------------------------
      if (honeypot && honeypot.value.trim() !== '') {
        // Silently "succeed" so the bot gets no signal anything was rejected.
        showStatus('success', t('newsletter_success', 'Thanks — you’re on the list.'));
        form.reset();
        return;
      }

      // --- Bot check 2: time-trap -------------------------------------------
      var elapsed = Date.now() - pageLoadTime;
      if (elapsed < 1500) {
        showStatus('error', t('newsletter_err_retry', 'Please try again in a moment.'));
        return;
      }

      // --- Sanitize + validate -----------------------------------------------
      var raw = emailField ? emailField.value : '';
      var clean = window.MaedaSecurity
        ? window.MaedaSecurity.sanitizeText(raw, 254)
        : raw.trim().slice(0, 254);

      if (!clean || !isValidEmail(clean)) {
        showError(t('newsletter_err_invalid', 'Enter a valid email address.'));
        if (emailField) emailField.focus();
        return;
      }

      // --- No backend is connected yet — see file header. Simulate a
      //     network round trip so the UI behaves exactly as it will once a
      //     real endpoint is wired up (button disables, status announces). --
      if (submitBtn) submitBtn.disabled = true;
      window.setTimeout(function () {
        if (submitBtn) submitBtn.disabled = false;
        showStatus('success', t('newsletter_success', 'Thanks — you’re on the list.'));
        form.reset();
      }, 500);
    });

    function isValidEmail(value) {
      return window.MaedaSecurity
        ? window.MaedaSecurity.isLikelyEmail(value)
        : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    }

    function showError(message) {
      var field = emailField ? emailField.closest('.field') : null;
      if (!field) return;
      field.classList.add('has-error');
      var msg = field.querySelector('.error-msg');
      if (msg) msg.textContent = message;
    }

    function clearError() {
      var field = emailField ? emailField.closest('.field') : null;
      if (!field) return;
      field.classList.remove('has-error');
    }

    function showStatus(type, message) {
      if (!status) return;
      status.textContent = message;
      status.className = 'form-status show ' + type;
    }
  });
})();
