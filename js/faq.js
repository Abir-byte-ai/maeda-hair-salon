/**
 * faq.js — the FAQ list works perfectly with zero JavaScript (native
 * <details>/<summary> handles open/close and is fully keyboard/screen-reader
 * accessible on its own). This script only adds one small UX nicety: opening
 * one question closes the others, so the list doesn't grow long as visitors
 * click through it. If this script never runs, every item just stays
 * independently toggleable — nothing breaks.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  });
})();
