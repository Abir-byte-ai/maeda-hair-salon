/**
 * magnetic-buttons.js — primary buttons drift a few pixels toward the
 * cursor on hover, snapping back on leave. A common "premium" touch on
 * modern marketing sites. Skipped on touch devices (no hover/cursor) and
 * under prefers-reduced-motion.
 */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasFinePointer = window.matchMedia &&
    window.matchMedia('(pointer: fine)').matches;

  if (prefersReducedMotion || !hasFinePointer) return;

  var MAX_PULL_PX = 6;

  document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.btn-primary, .btn-on-dark');

    buttons.forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5..0.5
        var y = (e.clientY - rect.top) / rect.height - 0.5;

        btn.style.transform =
          'translate(' + (x * MAX_PULL_PX * 2).toFixed(1) + 'px, ' +
          (-2 + y * MAX_PULL_PX).toFixed(1) + 'px)';
      });

      btn.addEventListener('pointerleave', function () {
        btn.style.transform = '';
      });
    });
  });
})();
