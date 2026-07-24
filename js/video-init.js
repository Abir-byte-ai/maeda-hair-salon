/**
 * video-init.js — the hero video frame always ships with a placeholder
 * overlay so the empty state never looks broken. Once assets/video/reel.mp4
 * actually exists and starts loading successfully, this hides the
 * placeholder so the real footage shows through. If the file is still
 * missing, the placeholder simply stays put — no error is shown to visitors.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var video = document.querySelector('#hero-video');
    var placeholder = document.querySelector('#video-placeholder');
    if (!video || !placeholder) return;

    video.addEventListener('loadeddata', function () {
      placeholder.style.display = 'none';
    });

    video.addEventListener('error', function () {
      placeholder.style.display = '';
    });

    // If the browser already has data buffered by the time this runs
    // (e.g. fast cache hit), readyState will reflect that immediately.
    if (video.readyState >= 2) {
      placeholder.style.display = 'none';
    }
  });
})();
