/**
 * tilt.js — a subtle cursor-follow tilt on the hero video frame. Disabled
 * entirely on touch devices (there's no hover/cursor position to track) and
 * under prefers-reduced-motion. Purely a visual flourish — nothing here
 * reads or sends any data, it only reads mouse coordinates already local
 * to the browser tab.
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasFinePointer = window.matchMedia &&
    window.matchMedia('(pointer: fine)').matches;

  if (prefersReducedMotion || !hasFinePointer) return;

  var MAX_TILT_DEG = 7;

  document.addEventListener('DOMContentLoaded', function () {
    var wrap = document.querySelector('.hero-visual');
    var frame = document.querySelector('.video-frame');
    if (!wrap || !frame) return;

    wrap.addEventListener('pointermove', function (e) {
      var rect = wrap.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width;   // 0..1
      var y = (e.clientY - rect.top) / rect.height;    // 0..1

      var rotateY = (x - 0.5) * 2 * MAX_TILT_DEG;
      var rotateX = (0.5 - y) * 2 * MAX_TILT_DEG;

      frame.classList.add('is-tilting');
      frame.style.transform = 'rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg)';
    });

    wrap.addEventListener('pointerleave', function () {
      frame.classList.remove('is-tilting');
      frame.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });
})();
