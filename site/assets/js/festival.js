/* Festival page hooks (only what CSS cannot do). Geometry is measured once (load, resize), never inside the scroll loop.
   1. links fly from the send button to the organisers on the map
   2. the walker follows the route and fades into the last programme's pin
   3. the phone row's dots follow the row on phones
   On narrow screens each scene's content starts under its caption band (--capB); the approve card's height is kept in --gh. */
(function () {
  'use strict';
  if (!window.Scenes) return;
  var sm = function (t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
  var ctr = function (r) { return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
  var gen = 0; /* bumps on resize: cached geometry is measured again */

  function bands() {
    [].forEach.call(document.querySelectorAll('.fz-link .stage,.fz-eve .stage'), function (st) {
      var cap = st.querySelector('.cap'), b = 0;
      [].forEach.call(cap.children, function (d) { b = Math.max(b, d.offsetHeight); });
      st.style.setProperty('--capB', Math.round(cap.offsetTop + b + 8) + 'px');
      var g = st.querySelector('.fz-gate'); if (g) st.style.setProperty('--gh', g.offsetHeight + 'px');
    });
    gen++;
  }
  bands();
  addEventListener('resize', bands);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(bands);

  /* the hero map: drop the finished intro animations, and pause the pin rings while the hero is off screen
     (finished or running animations otherwise keep re-styling their nodes on every scroll frame) */
  var hm = document.querySelector('.fz-hmap');
  if (hm) {
    setTimeout(function () { hm.classList.add('fz-done'); }, 4200);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { hm.classList.toggle('fz-off', !es[0].isIntersecting); }).observe(hm);
  }

  var lk = document.querySelector('.fz-link');
  if (lk) {
    var btn = lk.querySelector('.fz-send'), dots = [].slice.call(lk.querySelectorAll('.fz-lk')), st0 = lk.querySelector('.stage'), lg = -1, geo = [];
    var tg = {}; [].forEach.call(lk.querySelectorAll('.fz-op.ns'), function (p) { tg[p.getAttribute('data-i')] = p; });
    var fly = function (p) {
      if (p < 0.185 || p > 0.27) { if (lg !== -2) { dots.forEach(function (d) { d.style.opacity = '0'; }); lg = -2; } return; }
      if (lg !== gen) { /* measure once per size */
        var base = st0.getBoundingClientRect(), A = ctr(btn.getBoundingClientRect());
        geo = dots.map(function (d) { var B = ctr(tg[d.getAttribute('data-i')].getBoundingClientRect()); return { ax: A.x - base.left, ay: A.y - base.top, bx: B.x - base.left, by: B.y - base.top, s: +d.style.getPropertyValue('--s') }; });
        lg = gen;
      }
      for (var q = 0; q < dots.length; q++) {
        var g = geo[q], k = (p - g.s) / 0.05, d = dots[q];
        if (k <= 0 || k >= 1) { d.style.opacity = '0'; continue; }
        var e = sm(k), x = g.ax + (g.bx - g.ax) * e, y = g.ay + (g.by - g.ay) * e - 110 * 4 * e * (1 - e);
        d.style.opacity = '1';
        d.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      }
    };
    Scenes.on(lk, fly);
  }

  var ev = document.querySelector('.fz-eve');
  if (ev) {
    var path = ev.querySelector('.fz-route .w'), wk = ev.querySelector('.fz-walker'), len = 0, pts = null, cw = 0, ch = 0, wg = -1, lk2 = -1;
    var walk = function (p) {
      if (!pts) { len = path.getTotalLength(); pts = []; for (var i = 0; i <= 200; i++) { var q = path.getPointAtLength(len * i / 200); pts.push([q.x / 1000, q.y / 640]); } }
      if (wg !== gen) { var ci = wk.parentNode; cw = ci.offsetWidth; ch = ci.offsetHeight; wg = gen; } /* measure once per size */
      var k = Math.round(Math.max(0, Math.min(1, (p - 0.05) / 0.28)) * 200);
      if (k !== lk2) { wk.style.transform = 'translate(' + (pts[k][0] * cw).toFixed(1) + 'px,' + (pts[k][1] * ch).toFixed(1) + 'px)'; lk2 = k; }
    };
    Scenes.on(ev, walk);
  }

  var row = document.querySelector('.fz-vrow'), vd = document.querySelectorAll('.fz-vdots i');
  if (row && vd.length) {
    var on = 0, tick = false;
    row.addEventListener('scroll', function () {
      if (tick) return; tick = true;
      requestAnimationFrame(function () {
        tick = false;
        var n = Math.round(row.scrollLeft / Math.max(1, (row.scrollWidth - row.clientWidth) / (vd.length - 1)));
        if (n !== on) { vd[on].classList.remove('on'); vd[n].classList.add('on'); on = n; }
      });
    }, { passive: true });
  }
})();
