/**
 * i18n.js
 * ---------------------------------------------------------------------------
 * The translation dictionary for the EN / 中文 language toggle, plus a small
 * `maedaT(key, fallback)` lookup helper other scripts can call for strings
 * they generate dynamically (open-status.js, newsletter-form.js,
 * testimonial-carousel.js).
 *
 * Scope note: customer testimonial QUOTES themselves are deliberately left
 * untranslated in both languages — they're real reviews, and translating
 * someone's words changes them. Only the surrounding UI (headings, labels,
 * buttons, FAQ, hours, etc.) is translated here.
 *
 * Translation note: this is Simplified Chinese aimed at a general audience.
 * It's a reasonable, natural translation for a neighborhood hair salon, but
 * it hasn't been reviewed by a native-speaking staff member — worth a once-
 * over before this goes live, and worth flagging if Traditional Chinese
 * would actually fit the salon's clientele better.
 * ---------------------------------------------------------------------------
 */
(function () {
  'use strict';

  var dict = {
    en: {
      doc_title: 'Maeda Hair Salon | Walk-In Hair, Curls & Extensions in Homecrest, Brooklyn',
      meta_description: 'Maeda Hair Salon (漂亮人生) on Avenue U in Homecrest, Brooklyn. Walk-in haircuts, blowouts, curly-hair styling, extensions, lashes & waxing. Open daily 9:30am–7pm.',

      nav_services: 'Services',
      nav_pricing: 'Pricing',
      nav_story: 'Our Salon',
      nav_reviews: 'Reviews',
      nav_faq: 'FAQ',
      nav_location: 'Location & Hours',

      header_call_now: 'Call Now',

      hero_eyebrow: 'Homecrest · Brooklyn',
      hero_line1: 'Walk In. Walk Out',
      hero_line2: 'Beautiful.',
      hero_lead: "No appointment necessary. Just Avenue U's neighborhood salon for haircuts, blowouts, curly-hair styling and extensions — done by people who've been doing it here for years.",

      stat_rating_1: 'Neighborhood',
      stat_rating_2: 'rating',
      stat_reviews_1: 'Client',
      stat_reviews_2: 'reviews',

      status_checking: 'Checking hours…',
      status_open_until: 'Open now · until ',
      status_closed_opens: 'Closed now · opens ',

      btn_call_number: 'Call (718) 336-3088',
      btn_get_directions: 'Get Directions',
      btn_instagram: 'See work on Instagram',

      trust1_title: 'Walk-ins welcome',
      trust1_sub: 'Appointments welcome too',
      trust2_title: 'Wheelchair accessible',
      trust2_sub: 'Parking & restroom on-site',
      trust3_title: 'Organic products',
      trust3_sub: 'Used across every service',
      trust4_title: 'Tap & card ready',
      trust4_sub: 'NFC, debit & credit accepted',
      trust5_title: 'Shampoo & blow dry',
      trust5_sub: 'From $25',

      services_eyebrow: 'What we do',
      services_heading: 'Every chair has a specialty',
      services_sub: "From a quick blowout before work to a full extension install, here's what Avenue U comes in for.",

      svc1_title: 'Haircuts & Styling',
      svc1_desc: 'Precision cuts and blowouts for every hair type, walk in and out on your lunch break.',
      svc2_title: 'Curly Hair Specialists',
      svc2_desc: 'Cut and styled to work with your curl pattern — diffused, scrunched, or defined, your call.',
      svc3_title: 'Hair Extensions',
      svc3_desc: 'Cuticle-aligned, human-hair extensions installed invisibly for natural movement and shine.',
      svc3_note: 'Ask about luxury invisible installs',
      svc4_title: 'Lash Extensions',
      svc4_desc: 'Full sets and fills to open up your eyes for weeks at a time.',
      svc5_title: 'Nail & Waxing Studio',
      svc5_desc: "Our nail & waxing side has its own separate entrance around the corner on E 13th St.",
      svc6_title: 'Scalp Massage',
      svc6_desc: "Every wash comes with a relaxing scalp massage — it's the neighborhood's favorite five minutes.",

      pricing_eyebrow: 'Pricing',
      pricing_heading: 'Simple, walk-in-friendly pricing',
      pricing_sub: 'A quick idea of what to expect — ask your stylist for an exact quote once they see your hair.',
      price1_title: 'Shampoo & Blow Dry',
      price1_value: 'From $25',
      price1_note: 'Wash, cut & style',
      price2_title: 'Curly Cut & Style',
      price2_note: 'Priced by length & curl type',
      price3_title: 'Hair Extensions',
      price3_note: 'Priced by method & length',
      price4_title: 'Lash Extensions',
      price4_note: 'Full set & fills available',
      price5_title: 'Scalp Massage',
      price5_value: 'Included',
      price5_note: 'Comes with every wash',
      price_ask: 'Ask in-salon',
      pricing_disclaimer: 'Prices vary by hair length, thickness, and technique — the number above is a starting point, not a quote.',
      pricing_disclaimer_suffix: 'for an exact price before you come in.',

      story_quote: '"They know how to style curls — you don\u2019t need to blow it straight."',
      story_attribution: '— a regular, reviewing her curly cut',
      story_eyebrow: 'Our Salon',
      story_heading: 'A Homecrest fixture, chair by chair',
      story_p1: 'Maeda Hair Salon — 漂亮人生, "beautiful life" — has been the corner of Avenue U and E 13th Street\u2019s go-to for haircuts, color and extensions for years, with clients who\u2019ve followed the same stylist for over a decade.',
      story_p2: "Everything is done with organic products, from the wash to the finish. There's no pressure to book weeks out — walk in, take a seat, and someone will take care of you.",
      story_cta: 'Call to ask about availability',

      reviews_eyebrow: 'In their words',
      reviews_heading: 'What Avenue U says',

      faq_eyebrow: 'Good to know',
      faq_heading: 'Frequently asked questions',
      faq_q1: 'Do I need an appointment?',
      faq_a1: "No — walk-ins are always welcome. If you'd rather have a seat ready when you arrive, you're welcome to call ahead too.",
      faq_q2: 'What payment methods do you accept?',
      faq_a2: 'Tap, debit, and credit cards are all accepted, alongside standard payment methods.',
      faq_q3: 'Is the salon wheelchair accessible?',
      faq_a3: 'Yes — the salon is wheelchair accessible, with parking and a restroom on-site.',
      faq_q4: 'Do you work with curly or textured hair?',
      faq_a4: "Yes — cutting and styling for curl patterns is one of the salon's specialties, whether you want it diffused, scrunched, or defined.",
      faq_q5: 'Where do I go for nails or waxing?',
      faq_a5: 'The nail & waxing studio has its own separate entrance around the corner on E 13th Street.',
      faq_q6: 'What are your hours?',
      faq_a6: 'Open daily, 9:30 AM – 7:00 PM Eastern Time. See the live open/closed status up top, or the full hours table below.',

      location_eyebrow: 'Find us',
      location_sub: 'Homecrest, Brooklyn, NY 11229 — on the corner of Avenue U and E 13th Street.',
      hours_heading: 'Hours',
      day_mon: 'Monday', day_tue: 'Tuesday', day_wed: 'Wednesday', day_thu: 'Thursday',
      day_fri: 'Friday', day_sat: 'Saturday', day_sun: 'Sunday',
      hours_range: '9:30 AM – 7:00 PM',

      cta_heading: 'No appointment? No problem.',
      cta_lead: "Walk in any day, 9:30am–7pm. Or call ahead if you'd rather have a seat waiting.",

      footer_tagline: "Homecrest's neighborhood hair salon — haircuts, curls, extensions & more since forever.",
      footer_explore_heading: 'Explore',
      footer_visit_heading: 'Visit',
      footer_hours_line: 'Daily, 9:30 AM – 7:00 PM',
      footer_newsletter_heading: 'Stay in the loop',
      footer_newsletter_sub: 'Promos and stylist availability, occasionally.',
      footer_email_label: 'Email address',
      footer_email_placeholder: 'you@example.com',
      footer_signup_btn: 'Sign up',
      footer_rights: 'All rights reserved.',
      footer_disclaimer: 'Business details sourced from public listings — please verify before publishing.',

      mobile_directions: 'Directions',

      carousel_prev_aria: 'Previous review',
      carousel_next_aria: 'Next review',
      carousel_dots_aria: 'Choose a review',
      carousel_review_word: 'Review',

      newsletter_err_invalid: 'Enter a valid email address.',
      newsletter_success: 'Thanks — you\u2019re on the list.',
      newsletter_err_retry: 'Please try again in a moment.',

      lang_toggle_target: '中文',
      lang_toggle_aria: 'Switch to Chinese',
    },

    zh: {
      doc_title: 'Maeda Hair Salon 漂亮人生 | 布鲁克林 Homecrest 随到随剪、卷发与接发沙龙',
      meta_description: 'Maeda Hair Salon（漂亮人生）位于布鲁克林 Homecrest 的 Avenue U。无需预约：剪发、吹风造型、卷发护理、接发、睫毛与脱毛。每天上午9:30至晚上7:00营业。',

      nav_services: '服务项目',
      nav_pricing: '价格',
      nav_story: '关于沙龙',
      nav_reviews: '顾客评价',
      nav_faq: '常见问题',
      nav_location: '地址与营业时间',

      header_call_now: '立即致电',

      hero_eyebrow: '布鲁克林 · Homecrest',
      hero_line1: '随时光临，',
      hero_line2: '美丽而归。',
      hero_lead: '无需预约。我们是 Avenue U 的社区理发店，提供剪发、吹风造型、卷发护理和接发服务——多年来一直由熟悉这里的老师傅为您服务。',

      stat_rating_1: '街坊',
      stat_rating_2: '评分',
      stat_reviews_1: '顾客',
      stat_reviews_2: '评价数',

      status_checking: '正在查询营业时间…',
      status_open_until: '营业中 · 至 ',
      status_closed_opens: '已打烊 · 开始营业 ',

      btn_call_number: '致电 (718) 336-3088',
      btn_get_directions: '获取路线',
      btn_instagram: '查看 Instagram 作品',

      trust1_title: '无需预约',
      trust1_sub: '也可提前预约',
      trust2_title: '无障碍通道',
      trust2_sub: '店内设有停车位和洗手间',
      trust3_title: '有机产品',
      trust3_sub: '全程使用有机产品',
      trust4_title: '支持刷卡/闪付',
      trust4_sub: '支持感应支付、借记卡与信用卡',
      trust5_title: '洗发吹风',
      trust5_sub: '$25 起',

      services_eyebrow: '服务项目',
      services_heading: '每位师傅都有拿手项目',
      services_sub: '从上班前快速吹造型，到全套接发安装，Avenue U 的顾客都来这里。',

      svc1_title: '剪发造型',
      svc1_desc: '适合各种发质的精剪与吹风造型，午休时间也能轻松搞定。',
      svc2_title: '卷发专家',
      svc2_desc: '根据您的卷度量身修剪与造型——蓬松、定型或自然卷都可以。',
      svc3_title: '接发',
      svc3_desc: '发丝角质层顺向对齐的真发接发，佩戴隐形自然，摆动更真实。',
      svc3_note: '可咨询高级隐形接发工艺',
      svc4_title: '睫毛嫁接',
      svc4_desc: '全套嫁接与补种服务，让双眼明亮动人数周之久。',
      svc5_title: '美甲与脱毛工作室',
      svc5_desc: '美甲与脱毛区域在 E 13th St. 拐角处，设有独立入口。',
      svc6_title: '头皮按摩',
      svc6_desc: '每次洗发都附赠放松头皮按摩——街坊们最喜欢的五分钟。',

      pricing_eyebrow: '价格',
      pricing_heading: '简单透明，随到随做',
      pricing_sub: '先了解大致价位——具体报价请让理发师看过发质后再确认。',
      price1_title: '洗发吹风',
      price1_value: '$25 起',
      price1_note: '洗发、剪发与造型',
      price2_title: '卷发修剪造型',
      price2_note: '根据长度与卷度计价',
      price3_title: '接发',
      price3_note: '根据接发方式与长度计价',
      price4_title: '睫毛嫁接',
      price4_note: '提供全套嫁接与补种',
      price5_title: '头皮按摩',
      price5_value: '已包含',
      price5_note: '洗发即附赠',
      price_ask: '店内咨询',
      pricing_disclaimer: '价格会因发长、发量与技术而有所不同——以上价格仅供参考，非最终报价。',
      pricing_disclaimer_suffix: '来店前致电确认准确价格。',

      story_quote: '“老师傅懂得如何打理卷发——不需要把它吹直。”',
      story_attribution: '——一位常客，谈及她的卷发造型',
      story_eyebrow: '关于沙龙',
      story_heading: 'Homecrest 街坊多年的老字号',
      story_p1: 'Maeda Hair Salon（漂亮人生）多年来一直是 Avenue U 与 E 13th Street 拐角处的老字号，专注剪发、染发与接发服务，许多顾客十年如一日只认准同一位理发师。',
      story_p2: '全程使用有机产品，从洗发到造型都不例外。这里不需要提前几周预约——直接走进来，坐下，自然有人照顾您。',
      story_cta: '致电咨询是否有空位',

      reviews_eyebrow: '顾客怎么说',
      reviews_heading: 'Avenue U 街坊的评价',

      faq_eyebrow: '常见问题',
      faq_heading: '常见问题解答',
      faq_q1: '需要预约吗？',
      faq_a1: '不需要——随时欢迎走进来。如果您希望到店时有位置等着，也可以提前致电。',
      faq_q2: '可以使用哪些支付方式？',
      faq_a2: '支持闪付、借记卡和信用卡，以及常见的支付方式。',
      faq_q3: '店内是否有无障碍设施？',
      faq_a3: '是的——店内设有无障碍通道，并配有停车位和洗手间。',
      faq_q4: '是否擅长打理卷发或多层次发质？',
      faq_a4: '是的——卷发修剪与造型是本店的专长之一，无论您想要蓬松、定型还是自然卷都可以。',
      faq_q5: '美甲或脱毛服务在哪里？',
      faq_a5: '美甲与脱毛工作室在 E 13th Street 拐角处，设有独立入口。',
      faq_q6: '营业时间是几点到几点？',
      faq_a6: '每天上午9:30至晚上7:00（美国东部时间）营业。可查看页面上方的实时营业状态，或下方完整的营业时间表。',

      location_eyebrow: '店铺位置',
      location_sub: '地址：Homecrest, Brooklyn, NY 11229——位于 Avenue U 与 E 13th Street 交界处。',
      hours_heading: '营业时间',
      day_mon: '星期一', day_tue: '星期二', day_wed: '星期三', day_thu: '星期四',
      day_fri: '星期五', day_sat: '星期六', day_sun: '星期日',
      hours_range: '上午9:30 – 晚上7:00',

      cta_heading: '没有预约？没关系。',
      cta_lead: '每天随时欢迎光临，营业时间上午9:30至晚上7:00。如果希望到店就有位置，也可以提前致电。',

      footer_tagline: 'Homecrest 街坊的理发店——剪发、卷发、接发等服务，多年来始终如一。',
      footer_explore_heading: '快速导航',
      footer_visit_heading: '店铺信息',
      footer_hours_line: '每天 上午9:30 – 晚上7:00',
      footer_newsletter_heading: '订阅最新消息',
      footer_newsletter_sub: '偶尔发送优惠信息与预约空位提醒。',
      footer_email_label: '电子邮箱',
      footer_email_placeholder: 'you@example.com',
      footer_signup_btn: '订阅',
      footer_rights: '保留所有权利。',
      footer_disclaimer: '商家信息来源于公开信息平台——发布前请与商家核实。',

      mobile_directions: '路线',

      carousel_prev_aria: '上一条评价',
      carousel_next_aria: '下一条评价',
      carousel_dots_aria: '选择评价',
      carousel_review_word: '评价',

      newsletter_err_invalid: '请输入有效的电子邮箱地址。',
      newsletter_success: '谢谢，您已成功订阅。',
      newsletter_err_retry: '请稍后再试。',

      lang_toggle_target: 'EN',
      lang_toggle_aria: 'Switch to English / 切换到英文',
    },
  };

  window.MAEDA_I18N = dict;
  window.MAEDA_LANG = 'en';

  /**
   * maedaT(key, fallback) — looks up `key` in the current language, falling
   * back to English, then to the caller-supplied fallback, then to the key
   * itself so a missing translation never renders as literally nothing.
   */
  window.maedaT = function (key, fallback) {
    var lang = window.MAEDA_LANG || 'en';
    var table = dict[lang] || dict.en;
    if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
    if (Object.prototype.hasOwnProperty.call(dict.en, key)) return dict.en[key];
    return fallback !== undefined ? fallback : key;
  };
})();
