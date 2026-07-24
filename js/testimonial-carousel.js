/**
 * testimonial-carousel.js
 * ---------------------------------------------------------------------------
 * Progressive enhancement: the HTML ships as a plain grid (all 3 reviews
 * visible at once, see css/layout.css .testimonial-track default rules) so
 * it works with no JS at all. If this script runs, it switches the track to
 * a sliding one-at-a-time carousel with dots, arrows, and autoplay.
 *
 * Autoplay is skipped entirely under prefers-reduced-motion — manual arrow
 * and dot navigation still work either way. Autoplay also pauses on
 * hover/focus and while the tab is hidden, and resumes after the visitor
 * moves away/blurs.
 * ---------------------------------------------------------------------------
 */
(function () {
  'use strict';

  var AUTOPLAY_MS = 6000;

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('testimonial-carousel');
    var track = document.getElementById('testimonial-track');
    if (!root || !track) return;

    var slides = Array.prototype.slice.call(track.querySelectorAll('.testimonial-slide'));
    if (slides.length <= 1) return; // nothing to carousel

    var dotsWrap = root.querySelector('.carousel-dots');
    var prevBtn = root.querySelector('.carousel-arrow.prev');
    var nextBtn = root.querySelector('.carousel-arrow.next');
    var current = 0;
    var timer = null;

    var prefersReducedMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    root.classList.add('is-enhanced');
    buildDots();
    goTo(0);
    if (!prefersReducedMotion) startAutoplay();

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); restartAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); restartAutoplay(); });

    root.addEventListener('pointerenter', stopAutoplay);
    root.addEventListener('pointerleave', function () { if (!prefersReducedMotion) startAutoplay(); });
    root.addEventListener('focusin', stopAutoplay);
    root.addEventListener('focusout', function () { if (!prefersReducedMotion) startAutoplay(); });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopAutoplay();
      else if (!prefersReducedMotion) startAutoplay();
    });

    // Re-render dot aria-labels if the language changes.
    window.addEventListener('maeda:langchange', buildDots);

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      var reviewWord = window.maedaT ? window.maedaT('carousel_review_word', 'Review') : 'Review';
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot' + (i === current ? ' is-active' : '');
        dot.setAttribute('aria-label', reviewWord + ' ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); restartAutoplay(); });
        dotsWrap.appendChild(dot);
      });
    }

    function goTo(index) {
      var count = slides.length;
      current = ((index % count) + count) % count;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';

      slides.forEach(function (slide, i) {
        slide.setAttribute('aria-hidden', i === current ? 'false' : 'true');
      });

      if (dotsWrap) {
        Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
          dot.classList.toggle('is-active', i === current);
        });
      }
    }

    function startAutoplay() {
      stopAutoplay();
      timer = window.setInterval(function () { goTo(current + 1); }, AUTOPLAY_MS);
    }

    function stopAutoplay() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    function restartAutoplay() {
      if (!prefersReducedMotion) startAutoplay();
    }
  });
})();
