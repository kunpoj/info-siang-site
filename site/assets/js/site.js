/* info.siang.co v3: page glue. Phone fit, demo sheet on phones, nav, reveals, counters, bloom mounts, copy email. */
(function () {
  'use strict';
  var d = document.documentElement, RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mob = function () { return innerWidth <= 760; };

  /* phones: scale each to its box */
  function fit() {
    var ps = document.querySelectorAll('.phone');
    var strip = document.querySelector('.strip'), sn = strip ? strip.querySelectorAll('.st').length : 0;
    for (var i = 0; i < ps.length; i++) {
      var p = ps[i], s;
      if (p.hasAttribute('data-strip')) {
        if (innerWidth <= 900) s = Math.min(260, innerWidth * .68) / 417;
        else { var w = strip.clientWidth - 2 * (parseFloat(getComputedStyle(strip).paddingLeft) || 0), gap = 28;
          s = Math.min((w - gap * (sn - 1)) / sn / 417, (innerHeight * .62) / 876, .86); }
      } else {
        var want = +(p.getAttribute('data-h') || 0) || Math.min(innerHeight * 0.78, 760);
        if (innerWidth > 760) want = Math.min(want, innerHeight * (p.closest('.hub,.hero') ? 0.74 : 0.8));
        var vf = +(p.getAttribute('data-vfit') || 0); if (vf && innerWidth > 900) want = Math.min(want, innerHeight - vf);  /* short laptop screens: the whole phone stays in view */
        s = Math.max(0.5, Math.min(0.92, want / 876));
      }
      p.style.setProperty('--s', s.toFixed(3));
    }
    var sh = document.querySelector('.demo-sheet.open .phone-in');
    if (sh) { var k = Math.min(innerWidth / 393, (innerHeight - 64) / 852); sh.style.transform = 'scale(' + k.toFixed(4) + ')'; sh.style.transformOrigin = '50% 50%'; }
  }
  /* drawn rooms keep their proportions: one scale for the whole view */
  function roomK() {
    var m = innerWidth <= 760 || (innerHeight > innerWidth && innerWidth <= 1100), k = m ? innerHeight / 1250 : Math.min(innerWidth / 1600, innerHeight / 950);
    d.style.setProperty('--k', k.toFixed(4));
  }

  fit(); roomK(); addEventListener('resize', function () { fit(); roomK(); });
  /* pause phone hint pulses when a phone is off screen */
  if ('IntersectionObserver' in window) {
    var pio = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('off', !e.isIntersecting); }); });
    [].forEach.call(document.querySelectorAll('.phone-in'), function (el) { pio.observe(el); });
  }

  /* demo sheet: on a phone the visitor's own screen becomes the Siang phone */
  var sheet = document.querySelector('.demo-sheet'), home = null, moved = null;
  function openDemo(from) {
    var st = from && from.closest('.st'), src = st ? st.querySelector('[data-phone]') : (document.querySelector('.hub [data-phone]') || document.querySelector('.hero [data-phone]'));
    if (!src || !sheet) return;
    moved = src; home = src.parentNode;
    var box = sheet.querySelector('.slot'); box.appendChild(src);
    src.style.width = '393px'; src.style.height = '852px'; src.style.pointerEvents = 'auto';
    sheet.classList.add('open'); sheet.setAttribute('aria-hidden', 'false'); d.style.overflow = 'hidden'; fit();
    var x = sheet.querySelector('.x'); if (x) x.focus();
  }
  function closeDemo() {
    if (!moved) return;
    moved.style.transform = ''; moved.style.width = ''; moved.style.height = ''; moved.style.pointerEvents = '';
    home.appendChild(moved); moved = null;
    sheet.classList.remove('open'); sheet.setAttribute('aria-hidden', 'true'); d.style.overflow = ''; fit();
  }
  document.addEventListener('click', function (e) {
    var od = e.target.closest('[data-open-demo]'); if (od) { e.preventDefault(); if (mob() || od.classList.contains('st-open')) openDemo(od); else { var h = document.querySelector('.hero, .hub'); if (h) h.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); } }
    if (e.target.closest('[data-close-demo]')) closeDemo();
  });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDemo(); });
  if (location.hash === '#demo' && mob()) setTimeout(openDemo, 400);

  /* menu */
  var menu = document.getElementById('sheet');
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-menu]'); if (!b || !menu) return;
    setMenu(!menu.classList.contains('open'));
  });
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('open', open); menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    [].forEach.call(document.querySelectorAll('[data-menu]'), function (b) { b.setAttribute('aria-expanded', open ? 'true' : 'false'); });
    if (nav) nav.classList.remove('hide');
  }
  if (menu) menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('click', function (e) { if (menu && menu.classList.contains('open') && !e.target.closest('#sheet,[data-menu]')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* nav: hide going down, show going up, black glass over dark grounds */
  var nav = document.querySelector('.nav'), last = scrollY, under = new Set();
  /* which dark sections sit under the nav: observed, never measured in the scroll loop */
  if (nav && 'IntersectionObserver' in window) {
    var dio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) under.add(e.target); else under.delete(e.target); });
      nav.classList.toggle('dark', under.size > 0);
    }, { rootMargin: '-44px 0px -' + Math.max(0, innerHeight - 46) + 'px 0px' });
    [].forEach.call(document.querySelectorAll('.ink,.close,.foot,[data-dark]'), function (el) { dio.observe(el); });
  }
  /* a new page always starts at the top (no hash) */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (!location.hash) scrollTo(0, 0);
  function navTick() {
    var y = scrollY;
    if (nav) nav.classList.toggle('small', y > 120);
    var open = menu && menu.classList.contains('open');
    if (nav && !open) { if (y > last + 8 && y > 600) nav.classList.add('hide'); else if (y < last - 4) nav.classList.remove('hide'); }
    last = y;
  }
  addEventListener('scroll', function () { requestAnimationFrame(navTick); }, { passive: true }); navTick();

  /* reveals and counters */
  var fmt = function (n) { try { return new Intl.NumberFormat('en-US').format(n); } catch (e) { return String(n); } };
  /* counters keep their final width while counting (Prompt has no even-width digits): a hidden copy of the final number holds the space */
  function prep(el) {
    if (el.querySelector('.cv')) return el.querySelector('.cv');
    var to = +el.getAttribute('data-count');
    el.classList.add('cnt'); el.setAttribute('aria-label', fmt(to));
    el.innerHTML = '<span class="cg" aria-hidden="true">' + fmt(to) + '</span><span class="cv" aria-hidden="true">0</span>';
    return el.querySelector('.cv');
  }
  function count(el) {
    var to = +el.getAttribute('data-count'), t0 = 0, v = prep(el);
    v.textContent = fmt(to); return;
    function f(t) { if (!t0) t0 = t; var k = Math.min(1, (t - t0) / 1100); k = 1 - Math.pow(1 - k, 3); v.textContent = fmt(Math.round(to * k)); if (k < 1) requestAnimationFrame(f); }
    requestAnimationFrame(f);
  }
  [].forEach.call(document.querySelectorAll('[data-count]'), function (el) { if (!RM) prep(el); });
  var obs = document.querySelectorAll('.rw,.fade,[data-count]');
  if ('IntersectionObserver' in window && !RM) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (!e.isIntersecting) return; var t = e.target; if (t.hasAttribute('data-count')) count(t); else t.classList.add('on'); io.unobserve(t); });
    }, { rootMargin: '0px 0px -10% 0px' });
    for (var j = 0; j < obs.length; j++) io.observe(obs[j]);
  } else for (var k = 0; k < obs.length; k++) { var o = obs[k]; if (o.hasAttribute('data-count')) count(o); else o.classList.add('on'); }

  /* living bloom: mount every canvas.gl */
  if (window.SiangBloom) {
    var cvs = document.querySelectorAll('canvas.gl');
    for (var c = 0; c < cvs.length; c++) {
      var cv = cvs[c], ink = cv.getAttribute('data-ink') === 'white' ? [1, 1, 1] : [14 / 255, 14 / 255, 14 / 255];
      var o = (cv.getAttribute('data-o') || '.5,.5').split(',').map(Number);
      SiangBloom.mount(cv, { ink: ink, o: o, w: +(cv.getAttribute('data-w') || .9), a: +(cv.getAttribute('data-a') || .9) });
    }
  }

  /* copy the email address */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]'); if (!b) return;
    var v = b.getAttribute('data-copy'), done = b.getAttribute('data-done') || 'Copied';
    var ok = function () { var t = b.textContent; b.textContent = done; setTimeout(function () { b.textContent = t; }, 1600); };
    if (navigator.clipboard) navigator.clipboard.writeText(v).then(ok, ok); else ok();
  });
})();
