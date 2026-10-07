/* Anas Store demo v2: shared data store, helpers, icons and the live 3D ring */
(function (global) {
  'use strict';

  var KEY = 'anasStoreDemo:v2';
  var DAY = 86400000;

  function isoDay(offset) {
    var d = new Date(Date.now() + (offset || 0) * DAY);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  var ICON_KEYS = ['watch', 'ring', 'name', 'misbaha', 'gift', 'glasses', 'pair', 'crown'];

  function defaults() {
    var now = Date.now(), H = 3600000;
    return {
      v: 2,
      info: {
        wa: '970597801842',
        phone: '0597801842',
        telegram: 'Anasbstoree',
        instagram: 'anas.1store',
        addr1: 'غزة، الرمال',
        addr2: 'الشارع المقابل لكاظم شمال مباشرة',
        hours: 'يومياً من 10 الصبح لـ 11 بالليل',
        noBranches: true,
        ribbonOn: true,
        ribbon: 'خصم 15% على الدبل الرجالي هذا الأسبوع',
        site: ''
      },
      cats: [
        { id: 'watches', name: 'ساعات', icon: 'watch' },
        { id: 'rings', name: 'دبل رجالي', icon: 'ring' },
        { id: 'names', name: 'أسماء فضة', icon: 'name', custom: true },
        { id: 'misbaha', name: 'مسابح', icon: 'misbaha' },
        { id: 'gifts', name: 'هدايا فاخرة', icon: 'gift' },
        { id: 'glasses', name: 'نظارات', icon: 'glasses' },
        { id: 'weddings', name: 'العرسان', icon: 'pair' }
      ],
      banners: [
        { id: 'b1', on: true, media: '3d', img: 'img/r3d-ring-greek.jpg', eyebrow: 'SILVER RINGS', title: 'فضة تليق بحضورك', sub: 'دبل رجالي بنقشات يونانية وكلاسيك، بأسعار المعرض.', cta: 'شوف الدبل', cat: 'rings' },
        { id: 'b2', on: true, media: 'img', img: 'img/photo-watch.jpg', eyebrow: 'TIMEPIECES', title: 'ساعات فاخرة أصلية', sub: 'ساعات رجالي ونسائي، تعال جربها على إيدك بالمعرض.', cta: 'شوف الساعات', cat: 'watches' },
        { id: 'b3', on: true, media: 'img', img: 'img/photo-glasses-white.jpg', eyebrow: 'SUNGLASSES', title: 'نظارة مع علبة فاخرة بـ80 شيكل', sub: 'تشكيلة نظارات شمسية، كل وحدة بتوصلك بعلبة أنس ستور.', cta: 'شوف النظارات', cat: 'glasses' }
      ],
      products: [
        { id: 'p1', name: 'دبلة نقشة يونانية', cat: 'rings', price: 120, oldPrice: 140, imgs: ['img/r3d-ring-greek.jpg'], stock: true, isNew: true, sizes: true, desc: 'دبلة فضة رجالي بنقشة يونانية محفورة على كامل الدائرة، لمعة عالية وراحة بالإصبع.' },
        { id: 'p7', name: 'ساعة ستانلس بمينا سوداء', cat: 'watches', price: 350, imgs: ['img/r3d-watch-black.jpg'], stock: true, isNew: true, desc: 'ساعة رجالي بإطار مخدد وسوار ستانلس، مينا سوداء وعقارب مضيئة.' },
        { id: 'p11', name: 'نظارة شمسية بيضاء مع علبة', cat: 'glasses', price: 80, imgs: ['img/photo-glasses-white.jpg'], stock: true, isNew: true, desc: 'إطار أبيض وعدسات داكنة، بتوصلك بعلبة أنس ستور الفخمة.' },
        { id: 'p10', name: 'مسبحة يسر بفواصل فضة', cat: 'misbaha', price: 180, imgs: ['img/r3d-misbaha.jpg'], stock: true, isNew: true, desc: 'مسبحة يسر 33 حبة مع فواصل وشاهد من الفضة.' },
        { id: 'p2', name: 'دبلة بحشوة سوداء', cat: 'rings', price: 110, imgs: ['img/r3d-ring-onyx.jpg'], stock: true, sizes: true, desc: 'دبلة فضة بخط أسود لامع بالنص، ستايل رجالي هادي.' },
        { id: 'p5', name: 'دبل فضة بنقشات مشكّلة', cat: 'rings', price: 70, imgs: ['img/photo-rings-greek.jpg', 'img/photo-rings-hand.jpg'], stock: true, sizes: true, desc: 'تشكيلة دبل بنقشات مختلفة، بتختار النقشة اللي بتعجبك بالمعرض.' },
        { id: 'p8', name: 'ساعة بمينا بيضاء وعقارب زرقاء', cat: 'watches', price: 320, imgs: ['img/r3d-watch-silver.jpg'], stock: true, desc: 'مينا بيضاء ناعمة مع عقارب زرقاء وسوار ستانلس.' },
        { id: 'p9', name: 'ساعة كلاسيك بمينا فضية', cat: 'watches', price: 420, imgs: ['img/photo-watch.jpg'], stock: true, desc: 'ساعة بسوار فضي ومينا بأرقام رومانية، بتوصل بعلبتها.' },
        { id: 'p3', name: 'دبلة كلاسيك لامعة', cat: 'rings', price: 90, imgs: ['img/r3d-ring-classic.jpg'], stock: true, sizes: true, desc: 'تصميم كلاسيكي ناعم بسطح مقبب ولمعة مرآة.' },
        { id: 'p4', name: 'دبلة عريضة مطفية', cat: 'rings', price: 130, imgs: ['img/r3d-ring-wide.jpg'], stock: true, sizes: true, desc: 'دبلة عريضة بسطح مطفي وحفّتين لامعات.' },
        { id: 'p14', name: 'خواتم مفتوحة سادة', cat: 'rings', price: 85, imgs: ['img/photo-rings-sign.jpg'], stock: true, desc: 'خواتم فضة مفتوحة بتتعدل على أي مقاس.' },
        { id: 'p6', name: 'طقم دبل عرسان', cat: 'weddings', price: 260, imgs: ['img/r3d-ring-pair.jpg'], stock: true, sizes: true, desc: 'طقم دبلتين للعريس والعروس، وبنحفر الأسماء والتاريخ عند الطلب.' },
        { id: 'p13', name: 'ميدالية محفورة بالصورة', cat: 'gifts', price: 60, imgs: ['img/photo-keychain.jpg'], stock: true, desc: 'ميدالية فضية بنحفر عليها صورة أو اسم، بعلبة هدية.' },
        { id: 'p12', name: 'نظارة شمسية ملوّنة مع علبة', cat: 'glasses', price: 80, imgs: ['img/photo-glasses-color.jpg'], stock: false, desc: 'إطار بنقشة ملونة جريئة مع علبة فخمة.' }
      ],
      orders: [
        { id: 'o1', no: 1024, name: 'محمد أبو سالم', phone: '0599123456', type: 'custom', item: 'قلادة اسم فضة', details: 'الاسم: ليان، خط رقعة، سلسلة 45 سم', size: '', total: 150, deposit: 50, due: isoDay(0), status: 'progress', t: now - 26 * H },
        { id: 'o2', no: 1023, name: 'أحمد الشوا', phone: '0598456123', type: 'repair', item: 'دبلة نقشة يونانية', pid: 'p1', details: 'تصغير المقاس من 22 لـ 20', size: '20', total: 20, deposit: 0, due: isoDay(1), status: 'new', t: now - 5 * H },
        { id: 'o3', no: 1022, name: 'سامي حلس', phone: '0597321654', type: 'reserve', item: 'ساعة ستانلس بمينا سوداء', pid: 'p7', details: 'محجوزة لحد الخميس', size: '', total: 350, deposit: 100, due: isoDay(2), status: 'ready', t: now - 30 * H },
        { id: 'o4', no: 1021, name: 'يوسف عياد', phone: '0599888777', type: 'order', item: 'ساعة أوتوماتيك بمينا زرقاء', details: 'مش موجودة بالمعرض، بتوصل من المورد', size: '', total: 480, deposit: 150, due: isoDay(4), status: 'progress', t: now - 50 * H },
        { id: 'o5', no: 1020, name: 'خالد المصري', phone: '0592555111', type: 'custom', item: 'طقم دبل عرسان', pid: 'p6', details: 'حفر من جوا: خالد و سارة 12.10.2026', size: '21 و 16', total: 260, deposit: 100, due: isoDay(-1), status: 'progress', t: now - 72 * H },
        { id: 'o6', no: 1019, name: 'رامي جبر', phone: '0595777222', type: 'order', item: 'مسبحة يسر 99 حبة', details: '', size: '', total: 220, deposit: 220, due: isoDay(-3), status: 'done', t: now - 120 * H },
        { id: 'o7', no: 1018, name: 'محمود عاشور', phone: '0594222333', type: 'reserve', item: 'نظارة شمسية بيضاء مع علبة', pid: 'p11', details: '', size: '', total: 80, deposit: 0, due: isoDay(-5), status: 'done', t: now - 150 * H }
      ],
      feedback: []
    };
  }

  var mem = null;
  var Store = {
    key: KEY,
    load: function () {
      try {
        var raw = localStorage.getItem(KEY);
        if (raw) { var d = JSON.parse(raw); if (d && d.v === 2 && Array.isArray(d.products)) { mem = d; return d; } }
      } catch (e) {}
      if (!mem) mem = defaults();
      return mem;
    },
    save: function (d) { mem = d; try { localStorage.setItem(KEY, JSON.stringify(d)); return true; } catch (e) { return false; } },
    reset: function () { mem = defaults(); try { localStorage.removeItem(KEY); } catch (e) {} return mem; },
    onChange: function (cb) { global.addEventListener('storage', function (e) { if (e.key === KEY || e.key === null) cb(); }); }
  };

  var TYPES = {
    reserve: 'حجز قطعة',
    order: 'طلب قطعة',
    custom: 'تفصيل وحفر',
    repair: 'تصليح وتعديل',
    other: 'غير ذلك'
  };
  var STATUS = {
    new: 'جديد',
    progress: 'قيد التجهيز',
    ready: 'جاهز للاستلام',
    done: 'تم التسليم',
    cancel: 'ملغي'
  };
  var FLOW = ['new', 'progress', 'ready', 'done'];

  var MONTHS = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  var DAYS = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  var util = {
    isoDay: isoDay,
    fmt: function (n) { return Number(n || 0).toLocaleString('en-US'); },
    esc: function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); },
    digits: function (s) {
      return String(s || '').replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); }).replace(/[۰-۹]/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'.indexOf(d); }).replace(/\D/g, '');
    },
    localPhone: function (s) { var d = util.digits(s); if (d.indexOf('970') === 0 || d.indexOf('972') === 0) d = '0' + d.slice(3); return d; },
    intlPhone: function (s) { var d = util.digits(s); if (d.charAt(0) === '0') d = '970' + d.slice(1); return d; },
    wa: function (num, text) { return 'https://wa.me/' + util.digits(num) + (text ? '?text=' + encodeURIComponent(text) : ''); },
    dayDiff: function (iso) { if (!iso) return null; var p = iso.split('-'); var d = new Date(+p[0], +p[1] - 1, +p[2]); var t = new Date(); t.setHours(0, 0, 0, 0); return Math.round((d - t) / DAY); },
    dueLabel: function (iso) {
      var n = util.dayDiff(iso); if (n === null) return { txt: 'بدون موعد', cls: '' };
      if (n < 0) return { txt: n === -1 ? 'متأخر يوم' : 'متأخر ' + (-n) + ' أيام', cls: 'late' };
      if (n === 0) return { txt: 'اليوم', cls: 'today' };
      if (n === 1) return { txt: 'بكرا', cls: 'soon' };
      var p = iso.split('-'); return { txt: DAYS[new Date(+p[0], +p[1] - 1, +p[2]).getDay()] + ' ' + (+p[2]) + ' ' + MONTHS[+p[1] - 1], cls: '' };
    },
    longDate: function (d) { d = d || new Date(); return DAYS[d.getDay()] + ' ' + d.getDate() + ' ' + MONTHS[d.getMonth()]; },
    shortDate: function (iso) { if (!iso) return ''; var p = iso.split('-'); return (+p[2]) + ' ' + MONTHS[+p[1] - 1]; },
    remaining: function (o) { return Math.max(0, (+o.total || 0) - (+o.deposit || 0)); },
    cat: function (d, id) { for (var i = 0; i < d.cats.length; i++) if (d.cats[i].id === id) return d.cats[i]; return null; },
    catName: function (d, id) { var c = util.cat(d, id); return c ? c.name : ''; },
    siteUrl: function (d) {
      if (d && d.info && d.info.site) return d.info.site.replace(/#.*$/, '');
      try { return new URL('./', location.href).href.replace(/[?#].*$/, ''); } catch (e) { return ''; }
    },
    TYPES: TYPES, STATUS: STATUS, FLOW: FLOW
  };

  /* ---------- icons ---------- */
  var ICONS = {
    watch: '<rect x="7.5" y="2" width="9" height="4" rx="1"/><rect x="7.5" y="18" width="9" height="4" rx="1"/><circle cx="12" cy="12" r="6"/><path d="M12 9v3l2 1.4"/>',
    ring: '<ellipse cx="12" cy="14.5" rx="7" ry="6"/><ellipse cx="12" cy="14.5" rx="4.4" ry="3.6"/><path d="M10 5.6 12 3l2 2.6-2 2.2z"/>',
    name: '<path d="M4.5 3.5c1.6 3.8 4.4 5.5 7.5 5.5s5.9-1.7 7.5-5.5"/><path d="M5 16.5c1.4-3 2.8 2.6 4.2 0s2.6-3 4 0 2.4 2.4 3.6 0 1.4-1 2.2-.4"/>',
    misbaha: '<circle cx="12" cy="10" r="6.2" stroke-width="2.4" stroke-dasharray=".1 2.6" stroke-linecap="round"/><path d="M12 16.4v2.4m-2.2 3.2 2.2-3.2 2.2 3.2"/>',
    gift: '<rect x="4" y="9.5" width="16" height="10.5" rx="1"/><path d="M3 9.5h18M12 9.5V20M12 9.5c-1.8-4-6-4.2-6-1.6S10 9.5 12 9.5zm0 0c1.8-4 6-4.2 6-1.6S14 9.5 12 9.5z"/>',
    glasses: '<circle cx="6.8" cy="14" r="3.6"/><circle cx="17.2" cy="14" r="3.6"/><path d="M10.4 13.4c1-.9 2.2-.9 3.2 0M3.3 12.6 2 8.5M20.7 12.6 22 8.5"/>',
    pair: '<circle cx="9" cy="13" r="5.2"/><circle cx="15" cy="13" r="5.2"/><path d="M15 5.4 16 4l1 1.4-1 1.2z"/>',
    crown: '<path d="M4 17 3 8l5 4 4-6 4 6 5-4-1 9z"/><path d="M4 20h16"/>',
    wa: '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8z"/><path d="M9 9.2c0 3 2.6 5.8 5.8 5.8l1-1.3-1.8-1-1 .8a4.4 4.4 0 0 1-2.4-2.4l.8-1-1-1.8z"/>',
    track: '<path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
    home: '<path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M10 20v-5h4v5"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    tg: '<path d="M21 4 3 11l6 2 2 6 3-4 5 4z"/><path d="m9 13 8-6"/>',
    ig: '<rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r=".6"/>',
    clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/>',
    warn: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
    arrowL: '<path d="M15 6l-6 6 6 6"/>',
    arrowR: '<path d="M9 6l6 6-6 6"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/>',
    up: '<path d="M6 15l6-6 6 6"/>',
    down: '<path d="M6 9l6 6 6-6"/>',
    check: '<path d="M5 12.5 10 17 19 7"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 17-5-5-9 8"/>',
    star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
    store: '<path d="M4 9.5 5.5 4h13L20 9.5"/><path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0"/><path d="M5 12v8h14v-8"/>',
    orders: '<path d="M5 4h14v16l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 9h6M9 13h4"/>',
    sliders: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
    more: '<circle cx="5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="19" cy="12" r="1.4"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    banner: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M7 20h10"/><path d="m3 14 5-4 4 3 3-2 6 4"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    logout: '<path d="M15 4h4v16h-4"/><path d="M10 8l-4 4 4 4M6 12h10"/>'
  };
  function icon(name, cls, sw) {
    return '<svg class="' + (cls || 'ic') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 1.6) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
  }

  var SIL = '<stop offset="0" stop-color="#5a5d63"/><stop offset=".16" stop-color="#e8eaed"/><stop offset=".32" stop-color="#8c9097"/><stop offset=".48" stop-color="#fdfdfe"/><stop offset=".64" stop-color="#7b7f86"/><stop offset=".82" stop-color="#d9dce0"/><stop offset="1" stop-color="#686b71"/>';
  var CROWN_D = 'M40 104 L26 46 L52 78 L64 30 L82 70 L100 12 L118 70 L136 30 L148 78 L174 46 L160 104 Z';
  var CROWN_BAND = 'M36 110 H164 V126 H36 Z';
  var uidN = 0;
  function crown(cls) {
    var id = 'cg' + (++uidN);
    var balls = [[26, 40], [64, 24], [100, 6], [136, 24], [174, 40]].map(function (b) { return '<circle cx="' + b[0] + '" cy="' + b[1] + '" r="6.5" fill="url(#' + id + ')"/>'; }).join('');
    return '<svg class="' + (cls || '') + '" viewBox="0 -4 200 136" aria-hidden="true"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' + SIL + '</linearGradient></defs>' +
      '<path d="' + CROWN_D + '" fill="url(#' + id + ')" stroke="#2b2d31" stroke-width="1.2" stroke-linejoin="round"/><path d="' + CROWN_BAND + '" fill="url(#' + id + ')" stroke="#2b2d31" stroke-width="1.2"/>' +
      '<circle cx="100" cy="118" r="3.4" fill="#16171a"/><circle cx="72" cy="118" r="2.6" fill="#16171a"/><circle cx="128" cy="118" r="2.6" fill="#16171a"/>' + balls + '</svg>';
  }

  /* ---------- live 3D ring (three.js r128) ---------- */
  var J3D = (function () {
    function supported() {
      if (!global.THREE) return false;
      try { var c = document.createElement('canvas'); return !!(c.getContext('webgl') || c.getContext('experimental-webgl')); } catch (e) { return false; }
    }
    function setup(r) { r.outputEncoding = THREE.sRGBEncoding; r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.05; }
    function envMap(r) {
      var pm = new THREE.PMREMGenerator(r), s = new THREE.Scene();
      s.add(new THREE.Mesh(new THREE.BoxGeometry(24, 24, 24), new THREE.MeshBasicMaterial({ color: new THREE.Color(0.012, 0.012, 0.014), side: THREE.BackSide })));
      function panel(w, h, p, k) { var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(k, k, k), side: THREE.DoubleSide })); m.position.set(p[0], p[1], p[2]); m.lookAt(0, 0, 0); s.add(m); }
      panel(12, 3, [0, 8, 1], 3.2); panel(1.4, 10, [-8, 0, 2], 4.5); panel(1.4, 10, [8, 1, -1], 2.6);
      panel(10, 1.6, [0, -3.5, 7], 1.4); panel(2.4, 2.4, [3.5, 4.5, 7], 7); panel(8, 2, [0, 2, -8], 2.2);
      var tex = pm.fromScene(s, 0.035).texture; pm.dispose();
      s.traverse(function (o) { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
      return tex;
    }
    function bandGeo(rIn, rOut, h, n) {
      var cx = (rIn + rOut) / 2, a = (rOut - rIn) / 2, b = h / 2, p = 2 / n, pts = [];
      for (var i = 0; i <= 96; i++) { var t = Math.PI + i / 96 * Math.PI * 2, c = Math.cos(t), s = Math.sin(t); pts.push(new THREE.Vector2(cx + a * Math.sign(c) * Math.pow(Math.abs(c), p), b * Math.sign(s) * Math.pow(Math.abs(s), p))); }
      return new THREE.LatheGeometry(pts, 180);
    }
    function greekTexture() {
      var W = 1536, H = 64, c = document.createElement('canvas'); c.width = W; c.height = H;
      var g = c.getContext('2d'); g.fillStyle = '#d6d8dc'; g.fillRect(0, 0, W, H);
      g.strokeStyle = '#17181b'; g.lineWidth = 4; g.lineCap = 'square'; g.lineJoin = 'miter';
      g.beginPath(); g.moveTo(0, 5); g.lineTo(W, 5); g.moveTo(0, 59); g.lineTo(W, 59); g.stroke();
      var u = 8, top = 12, path = [[0, 5], [0, 0], [3, 0], [3, 3], [1, 3], [1, 1], [2, 1], [2, 2]];
      for (var x0 = 0; x0 < W; x0 += 4 * u) { g.beginPath(); for (var i = 0; i < path.length; i++) { var x = x0 + path[i][0] * u, y = top + path[i][1] * u; if (i) g.lineTo(x, y); else g.moveTo(x, y); } g.moveTo(x0, top + 5 * u); g.lineTo(x0 + 4 * u, top + 5 * u); g.stroke(); }
      var t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; t.encoding = THREE.sRGBEncoding; t.anisotropy = 8; return t;
    }
    function greekRing() {
      var g = new THREE.Group();
      g.add(new THREE.Mesh(bandGeo(1.0, 1.2, 0.56, 5), new THREE.MeshStandardMaterial({ color: 0xf0f1f4, metalness: 1, roughness: 0.14 })));
      var tex = greekTexture();
      g.add(new THREE.Mesh(new THREE.CylinderGeometry(1.206, 1.206, 0.36, 192, 1, true), new THREE.MeshStandardMaterial({ color: 0xffffff, map: tex, bumpMap: tex, bumpScale: 0.012, metalness: 1, roughness: 0.22 })));
      return g;
    }
    function lights(scene) { var d = new THREE.DirectionalLight(0xffffff, 1.1); d.position.set(2, 4, 5); scene.add(d); scene.add(new THREE.AmbientLight(0xffffff, 0.12)); }
    return { supported: supported, setup: setup, envMap: envMap, greekRing: greekRing, lights: lights };
  })();

  global.ANAS = { Store: Store, util: util, icon: icon, crown: crown, ICON_KEYS: ICON_KEYS, J3D: J3D, SIL: SIL, CROWN_D: CROWN_D, CROWN_BAND: CROWN_BAND };
})(window);
