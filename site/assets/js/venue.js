/* Venue page: who pays switch and invite flight; drawn phone fit; time scene months; approval card fit and the scroll-scrubbed cursor. */
(function () {
  'use strict';
  /* invite: who pays (real buttons), send replays the flight to the organiser's screen */
  var inv = document.querySelector('.vn-inv');
  if (inv) {
    var toast = inv.querySelector('.toast'), tl = document.documentElement.lang === 'en' ? 'Invite sent. It lasts 30 days.' : 'ส่งคำเชิญแล้ว ใช้ได้ 30 วัน';
    inv.addEventListener('click', function (e) {
      var b = e.target.closest('[data-pay]');
      var sw = e.target.closest('.sw');
      if (sw) { var on = sw.getAttribute('aria-checked') !== 'true'; sw.setAttribute('aria-checked', on ? 'true' : 'false'); inv.setAttribute('data-sales', on ? 'on' : 'off'); inv.classList.add('used'); return; }
      if (b && b.tagName === 'BUTTON') {
        inv.classList.add('used');
        inv.setAttribute('data-pay', b.getAttribute('data-pay'));
        [].forEach.call(inv.querySelectorAll('.seg button'), function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        return;
      }
      if (e.target.closest('.inv-send')) {
        inv.classList.remove('fly', 'sent'); void inv.offsetWidth;
        inv.classList.add('fly', 'sent'); if (toast) toast.textContent = tl;
      }
    });
  }

  /* drawn phones (c.dphone) that live in a box: one scale from the box, so the frame never changes.
     The hero phone keeps the kit size (data-h 600) on desktop; on phones it scales to the panel. */
  var hph = document.querySelector('.vn-hph'), sky = document.querySelector('.vn-sky'), vph = document.querySelector('.vt-ph');
  function fitPh() {
    if (hph && sky) {
      var m = innerWidth <= 760 || (innerHeight > innerWidth && innerWidth <= 1100);
      if (m) hph.style.setProperty('--hs', Math.min((sky.clientHeight - 48) / 876, sky.clientWidth * 0.5 / 417).toFixed(3));
      var p = hph.querySelector('.phone');
      requestAnimationFrame(function () { if (p) sky.style.setProperty('--phw', p.offsetWidth + 'px'); });
    }
    if (vph && vph.offsetWidth) vph.style.setProperty('--vs', (vph.offsetWidth / 417).toFixed(3));
  }
  fitPh(); addEventListener('resize', fitPh); addEventListener('load', fitPh);

  /* time scene: month, close up and labels as classes on the stage (no per frame maths on room items) */
  var vt = document.querySelector('.vt');
  if (vt && window.Scenes) {
    var vs = vt.querySelector('.stage'), lastM = -1, lastC = null, lastL = null;
    var cl = function (x) { return Math.max(0, Math.min(1, x)); };
    Scenes.on(vt, function (p) {
      var mo = 2 * cl((p - .08) / .28) + .6 * cl((p - .36) / .24) + 2.4 * cl((p - .6) / .3), m = Math.max(0, Math.min(5, Math.round(mo)));
      var close = p < .47, lab = p > .4;
      if (m !== lastM) { if (lastM >= 0) vs.classList.remove('m' + lastM); vs.classList.add('m' + m); lastM = m; }
      if (close !== lastC) { vs.classList.toggle('cu', close); lastC = close; }
      if (lab !== lastL) { vs.classList.toggle('lb', lab); lastL = lab; }
    });
  }

  /* approval: fit the card to the screen, then type the reason with the scroll */
  var sc = document.querySelector('.ap'); if (!sc) return;
  var wrap = sc.querySelector('.ap-wrap');
  function fit() {
    var m = matchMedia('(max-width:760px), (max-width:1100px) and (orientation:portrait)').matches, h = wrap.offsetHeight || 640;
    var kc = m ? Math.min(1.5, (innerWidth - 40) / 350, innerHeight * (innerWidth < 600 ? 0.52 : 0.66) / h) : Math.min(innerWidth >= 1800 ? 1.3 : 1, innerHeight * 0.86 / h, sc.querySelector('.ap-pos').clientWidth / 480);
    if (m) {  /* stacked: the card never rises into the caption above it */
      var cap = sc.querySelector('.cap'), room = innerHeight * 0.97 - (cap ? cap.offsetTop + cap.offsetHeight + 18 : 0);
      if (room > 120) kc = Math.min(kc, room / h);
    }
    wrap.style.setProperty('--kc', kc.toFixed(3));
  }
  var ty = sc.querySelector('.ty'), full = ty ? ty.getAttribute('data-full') : '', parts = null, shown = -1;
  try { parts = Array.from(new Intl.Segmenter(document.documentElement.lang, { granularity: 'grapheme' }).segment(full), function (x) { return x.segment; }); } catch (e) { parts = Array.from(full); }
  function type(p) {
    if (!ty) return;
    var n = Scenes.reduced ? parts.length : Math.round(parts.length * Math.max(0, Math.min(1, (p - 0.24) / 0.14)));
    if (n !== shown) { shown = n; ty.textContent = parts.slice(0, n).join(''); }
  }
  fit();
  if (window.Scenes) Scenes.on(sc, type);
  addEventListener('resize', fit);
})();
