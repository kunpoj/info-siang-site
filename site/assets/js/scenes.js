/* Siang scroll engine (lab). Each [data-scene] is a tall section with a sticky stage.
   It exposes one number, --p (0 to 1), on the section. All motion is CSS math on --p.
   Path A (Chrome, Edge, Safari 26+): CSS scroll-driven animation writes --p, no JS per frame.
   Path B (others, or ?nosda): one passive scroll listener, one rAF, only for scenes on screen.
   Reduced motion: --p is pinned to each scene's data-rest (default 1) and the scene is not sticky.
   JS hooks: Scenes.on(el, fn(p)) for things CSS cannot do (counters, cursor scripts, sound). */
(function () {
  'use strict';
  var d = document.documentElement;
  var force = /[?&]nosda\b/.test(location.search);
  var SDA = !force && window.CSS && CSS.supports('animation-timeline: view()');
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches || /[?&]rm\b/.test(location.search);
  var list = [], live = new Set(), hooks = new Map(), ticking = false;

  d.classList.add(RM ? 'scenes-static' : SDA ? 'scenes-sda' : 'scenes-js');

  function prog(el) {
    var r = el.getBoundingClientRect(), span = r.height - innerHeight;
    return span <= 0 ? 1 : Math.min(1, Math.max(0, -r.top / span));
  }
  function frame() {
    ticking = false;
    live.forEach(function (el) {
      var p = prog(el);
      if (!SDA) el.style.setProperty('--p', p.toFixed(4));
      var h = hooks.get(el); if (h) for (var i = 0; i < h.length; i++) h[i](p);
      el.classList.toggle('in-scene', p > 0 && p < 1);
    });
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }

  function init() {
    list = [].slice.call(document.querySelectorAll('[data-scene]'));
    if (RM) { list.forEach(function (el) { el.style.setProperty('--p', el.getAttribute('data-rest') || 1); }); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) live.add(e.target); else live.delete(e.target); });
      req();
    });
    list.forEach(function (el) { io.observe(el); });
    addEventListener('scroll', req, { passive: true });
    addEventListener('resize', req);
  }
  window.Scenes = {
    sda: SDA, reduced: RM,
    on: function (el, fn) { if (!hooks.has(el)) hooks.set(el, []); hooks.get(el).push(fn); if (RM) fn(+(el.getAttribute('data-rest') || 1)); },
    progress: prog
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
