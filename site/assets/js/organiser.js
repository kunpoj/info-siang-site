/* Organiser: board scale for the two scenes, and the two-lane player (artist's voice and the organiser's narration,
   sample sounds made in code). Sound plays only on a tap, one lane at a time: starting one pauses the other. */
(function () {
  'use strict';
  /* the flow board: its right edge sits on the container edge, scaled to the room left beside (or under) the caption */
  var de = document.documentElement;
  function scale() {
    var w = innerWidth, h = innerHeight, mob = w <= 760 || w / h < .8;
    var m = w <= 760 ? 20 : (w <= 1100 ? 40 : 64), cl = Math.max(m, (w - 1312) / 2 + m), fk, rt = 0;
    if (mob) {
      var cap = document.querySelector('.og-flow .cap'); rt = (cap ? cap.offsetHeight : 260) + 20;
      fk = Math.min((w - 2 * m) / 560, (h - rt - 24) / 701, 1.2);
    } else {
      var capW = Math.min(390, w * .3);
      fk = Math.min((w - 2 * cl - capW - 56) / 918, (h - 130) / 701, 1.1);
    }
    de.style.setProperty('--cl', cl + 'px'); de.style.setProperty('--fk', fk.toFixed(4)); de.style.setProperty('--rt', rt + 'px');
  }
  scale(); addEventListener('resize', scale); addEventListener('load', scale);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(scale);
  var card = document.querySelector('.og-card'); if (!card) return;
  var lanes = [].slice.call(card.querySelectorAll('.og-lane')), cur = null, raf = 0;
  function mmss(t) { t = Math.max(0, Math.floor(t || 0)); return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2); }
  function paint() {
    raf = 0;
    lanes.forEach(function (ln) {
      var a = ln._a; if (!a) return;
      var k = a.duration ? a.currentTime / a.duration : 0;
      ln.style.setProperty('--pp', k.toFixed(4));
      ln.querySelector('.og-cur').textContent = mmss(a.currentTime);
    });
    if (cur && !cur._a.paused) raf = requestAnimationFrame(paint);
  }
  function state() {
    lanes.forEach(function (ln) {
      var on = ln === cur && ln._a && !ln._a.paused;
      ln.classList.toggle('on', on);
      ln.classList.toggle('dim', !!cur && ln !== cur && cur._a && !cur._a.paused);
      ln.querySelector('.og-play').setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  function stop(ln) { if (ln && ln._a) { ln._a.pause(); } }
  lanes.forEach(function (ln) {
    ln.querySelector('.og-play').addEventListener('click', function () {
      card.classList.add('used');
      if (!ln._a) {
        var a = new Audio(ln.getAttribute('data-src')); a.preload = 'auto'; ln._a = a;
        try { document.dispatchEvent(new CustomEvent('siang:audio', { detail: a })); } catch (e) {}
        a.addEventListener('ended', function () { a.currentTime = 0; if (cur === ln) cur = null; state(); paint(); });
        a.addEventListener('pause', state); a.addEventListener('play', state);
      }
      if (cur === ln && !ln._a.paused) { stop(ln); state(); return; }
      if (cur && cur !== ln) stop(cur);
      cur = ln;
      var pr = ln._a.play(); if (pr && pr.catch) pr.catch(function () { state(); });
      state(); if (!raf) raf = requestAnimationFrame(paint);
    });
  });
  /* leaving the section stops the sound */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { if (!es[0].isIntersecting && cur) { stop(cur); state(); } }).observe(card);
  }
})();
