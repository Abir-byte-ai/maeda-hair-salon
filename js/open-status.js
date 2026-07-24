/**
 * open-status.js — reads window.MAEDA_SITE.hours + timeZone (config.js) and
 * shows whether the salon is open right now, using the SALON'S actual local
 * time (America/New_York) rather than the visitor's device clock. Someone
 * browsing from Los Angeles, London, or Tokyo still sees an accurate status.
 *
 * How: Intl.DateTimeFormat can render "what time is it right now in a given
 * IANA timezone" regardless of where the visitor's device thinks it is —
 * we ask it for the current weekday/hour/minute in that zone and compare
 * against the salon's posted hours, all in the same timezone.
 */
(function () {
  'use strict';

  var WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  document.addEventListener('DOMContentLoaded', function () {
    render();
    // Re-render if the language toggle switches (AM/PM vs 上午/下午 wording).
    window.addEventListener('maeda:langchange', render);
    // Keep it accurate if a visitor leaves the tab open across the
    // open/close boundary — cheap to just recheck once a minute.
    window.setInterval(render, 60000);
  });

  function render() {
    var el = document.querySelector('[data-open-status]');
    if (!el || !window.MAEDA_SITE) return;

    var zoned = getNowInZone(window.MAEDA_SITE.timeZone);
    var today = window.MAEDA_SITE.hours[zoned.weekdayIndex];
    var minutesNow = zoned.hour * 60 + zoned.minute;
    var openMin = today.open[0] * 60 + today.open[1];
    var closeMin = today.close[0] * 60 + today.close[1];
    var isOpen = minutesNow >= openMin && minutesNow < closeMin;

    var label = el.querySelector('[data-status-label]');
    var t = window.maedaT || function (k, fallback) { return fallback; };

    if (isOpen) {
      el.setAttribute('data-status', 'open');
      if (label) {
        label.textContent = t('status_open_until', 'Open now · until ') + formatTime(today.close);
      }
    } else {
      el.setAttribute('data-status', 'closed');
      if (label) {
        label.textContent = t('status_closed_opens', 'Closed now · opens ') + formatTime(today.open);
      }
    }
  }

  /**
   * Returns { weekdayIndex, hour, minute } for "right now" as observed in
   * the given IANA timezone. Falls back to the visitor's local clock (with
   * a console note) only if Intl's timeZone support is unavailable —
   * exceedingly rare in any browser released in the last decade.
   */
  function getNowInZone(timeZone) {
    var now = new Date();
    try {
      var parts = new Intl.DateTimeFormat('en-US', {
        timeZone: timeZone,
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'short',
      }).formatToParts(now);

      var map = {};
      parts.forEach(function (p) { map[p.type] = p.value; });

      return {
        weekdayIndex: WEEKDAY_INDEX[map.weekday],
        hour: parseInt(map.hour, 10),
        minute: parseInt(map.minute, 10),
      };
    } catch (err) {
      // Unsupported timeZone/Intl edge case — fall back to the visitor's
      // own clock rather than showing nothing.
      return {
        weekdayIndex: now.getDay(),
        hour: now.getHours(),
        minute: now.getMinutes(),
      };
    }
  }

  function formatTime(pair) {
    var h = pair[0];
    var m = pair[1];
    var lang = (window.MAEDA_LANG || 'en');

    if (lang === 'zh') {
      var period = h >= 12 ? '下午' : '上午';
      var h12 = h % 12 === 0 ? 12 : h % 12;
      return period + h12 + (m ? ':' + String(m).padStart(2, '0') : '');
    }

    var periodEn = h >= 12 ? 'PM' : 'AM';
    var h12en = h % 12 === 0 ? 12 : h % 12;
    return h12en + (m ? ':' + String(m).padStart(2, '0') : '') + ' ' + periodEn + ' ET';
  }
})();
