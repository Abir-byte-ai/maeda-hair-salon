/**
 * config.js
 * ---------------------------------------------------------------------------
 * Single source of truth for business facts used by the other scripts
 * (open/closed badge, footer year, etc). Keeping this separate means
 * updating hours or the phone number never requires touching markup.
 *
 * This file only ever WRITES to window.MAEDA_SITE — it performs no network
 * requests and reads no user input, so it carries no security surface.
 * ---------------------------------------------------------------------------
 */
(function () {
  'use strict';

  window.MAEDA_SITE = Object.freeze({
    name: 'Maeda Hair Salon',
    nameLocal: '漂亮人生',
    phoneDisplay: '(718) 336-3088',
    phoneHref: 'tel:+17183363088',
    address: {
      line1: '1302 Avenue U',
      line2: 'Brooklyn, NY 11229',
      neighborhood: 'Homecrest, Brooklyn',
    },
    /**
     * IANA timezone the salon actually operates in. Used by open-status.js
     * so the "open now / closed" badge reflects the STORE's local time,
     * not the visitor's device clock — someone browsing from another
     * timezone (or another country) still sees an accurate status.
     */
    timeZone: 'America/New_York',
    instagram: 'https://www.instagram.com/maedahair/',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Maeda+Beauty+Salon+Inc,1302+Avenue+U,Brooklyn,NY+11229',
    mapEmbedUrl: 'https://www.google.com/maps?q=Maeda+Beauty+Salon+Inc,1302+Avenue+U,Brooklyn,NY+11229&output=embed',
    /**
     * Hours use 24h [openHour, openMinute, closeHour, closeMinute].
     * Index 0 = Sunday ... 6 = Saturday, matching Date#getDay().
     * Salon is open 9:30am–7:00pm every day.
     */
    hours: [
      { day: 'Sunday', open: [9, 30], close: [19, 0] },
      { day: 'Monday', open: [9, 30], close: [19, 0] },
      { day: 'Tuesday', open: [9, 30], close: [19, 0] },
      { day: 'Wednesday', open: [9, 30], close: [19, 0] },
      { day: 'Thursday', open: [9, 30], close: [19, 0] },
      { day: 'Friday', open: [9, 30], close: [19, 0] },
      { day: 'Saturday', open: [9, 30], close: [19, 0] },
    ],
  });
})();
