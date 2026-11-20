/* Demo: a day at the festival. The day starts at once. Each step sets the live phone to its screen and points at one thing to tap;
   doing that thing in the phone moves the story on. Back and Next (and the arrow keys) move it too. */
(function () {
  'use strict';
  var dm = document.querySelector('[data-demo]'); if (!dm) return;
  var root = dm.querySelector('[data-phone]');
  /* the steps come from hidden lists in the page, so the Thai text keeps its line breaks */
  var S = [].map.call(dm.querySelectorAll('.dm-src li'), function (li) { return { c: +li.getAttribute('data-c'), k: li.getAttribute('data-k'), tap: li.getAttribute('data-tap'), t: li.querySelector(':scope>b').innerHTML, x: li.querySelector(':scope>span').innerHTML }; });
  var WHEN = [].map.call(dm.querySelectorAll('.dm-when li'), function (e) { return e.innerHTML; });
  var cur = 0, timer = null, wait = null;
  var $ = function (s) { return dm.querySelector(s); }, $$ = function (s) { return [].slice.call(dm.querySelectorAll(s)); };
  var has = function (a, k) { return a && a.indexOf(k) > -1; };
  /* what the phone shows at each step: when the next one is reached by a tap, the story moves on */
  var IS = {
    feedfest: function (d) { return d.v === 'art'; },
    fest: function (d) { return d.v === 'fest' && !d.dl; },
    offline: function (d) { return d.v === 'fest' && d.dl && d.mode !== 'map'; },
    map: function (d) { return d.v === 'fest' && d.mode === 'map' && d.area !== 2; },
    places: function (d) { return d.v === 'places'; },
    place: function (d) { return d.v === 'place' && d.id === 'dac'; },
    scan: function (d) { return d.v === 'scan'; },
    today: function (d) { return d.v === 'today'; },
    show: function (d) { return d.v === 'show' && d.s === 'look'; },
    quiet: function (d) { return d.v === 'show' && d.s === 'quiet'; },
    vase: function (d) { return d.v === 'work' && d.s === 'quiet' && d.i === 0; },
    ask: function (d) { return d.v === 'ask'; },
    save: function (d) { return d.v === 'work' && d.s === 'quiet' && d.i === 0 && !has(d.saved, 'vase'); },
    ploy: function (d) { return d.v === 'artist' && d.id === 'ploy' && !has(d.fol, 'ploy'); },
    notice: function () { return false; }
  };
  /* steps finished by a tap whose result stays on screen a moment before the day moves on: [test, pause in ms] */
  var DONE = {
    map: [function (d) { return d.v === 'fest' && d.area === 2; }, 1400],
    show: [function (d) { return d.v === 'work' && d.s === 'look'; }, 2600],
    ask: [function (d) { return d.v === 'sent'; }, 1800],
    save: [function (d) { return has(d.saved, 'vase'); }, 700],
    ploy: [function (d) { return has(d.fol, 'ploy'); }, 700]
  };
  var ph = function () { return root.__phone; };

  function paint() {
    var st = S[cur], c = st ? st.c : WHEN.length - 1;
    dm.setAttribute('data-step', cur);
    $$('.dm-sc').forEach(function (e, i) { e.classList.toggle('on', i === c); });
    var dk = c === WHEN.length - 1; dm.classList.toggle('dark', dk);
    var nv = document.querySelector('.nav'); if (nv) nv.classList.toggle('dark', dk);
    if (st) {
      $('.dm-story .dm-t').innerHTML = st.t;
      $('.dm-story .dm-x').innerHTML = st.x;
      $('.dm-mx').innerHTML = '<b>' + st.t + '</b> ' + st.x;
      var sty = $('.dm-story'); sty.classList.remove('in'); void sty.offsetWidth; sty.classList.add('in');
    }
    $$('[data-rev]').forEach(function (b) { b.disabled = cur <= 0; });
    point();
  }
  function point() {
    clearTimeout(timer);
    var st = S[cur], p = ph(); if (!p) return;
    p.mark(null);
    if (st && st.tap) timer = setTimeout(function () { p.mark(st.tap); }, 700);
  }
  function go(i, keepPhone) {
    var p = ph(); if (!p) return;
    clearTimeout(wait);
    if (i >= S.length) { finish(); return; }
    i = Math.max(0, i);
    var wasEnd = dm.classList.contains('ended');
    dm.classList.remove('ended');
    cur = i;
    if (!keepPhone || wasEnd) p.scene(S[i].k);
    paint();
  }
  function finish() {
    var p = ph(); if (p) { p.stopAudio(); p.mark(null); }
    cur = S.length; dm.classList.add('ended'); dm.setAttribute('data-step', 'end');
    $('.dm-mx').innerHTML = '<b>' + $('.dm-end .dm-t').innerHTML + '</b> ' + $('.dm-end .dm-x').innerHTML;
  }

  root.addEventListener('siang:view', function (e) {
    if (cur >= S.length) return;
    var d = e.detail, st = S[cur], nx = S[cur + 1];
    if (nx && IS[nx.k](d)) { go(cur + 1, true); return; }
    var dn = DONE[st.k];
    if (dn && dn[0](d)) {
      var from = cur; clearTimeout(wait);
      wait = setTimeout(function () { if (cur === from) go(from + 1, !!(S[from + 1] && IS[S[from + 1].k](d))); }, dn[1]);
      return;
    }
    point();
  });

  dm.addEventListener('click', function (e) {
    if (e.target.closest('[data-again]')) { var p = ph(); if (p) { p.saved = {}; p.fol = {}; p.seen = {}; } go(0); return; }
    if (e.target.closest('[data-fwd]')) { go(cur + 1); return; }
    if (e.target.closest('[data-rev]')) { if (dm.classList.contains('ended')) go(S.length - 1); else if (cur > 0) go(cur - 1); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.target.closest && e.target.closest('input,textarea,[contenteditable]')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); }
    else if (e.key === 'ArrowLeft' && cur > 0) { e.preventDefault(); if (dm.classList.contains('ended')) go(S.length - 1); else go(cur - 1); }
  });

  /* on a phone the app is the page */
  function fill() {
    var pi = $('.dm-ph .phone-in'); if (!pi) return;
    if (innerWidth <= 760) {
      var top = $('.dm-mbar').offsetHeight || 0, s = innerWidth / 393, h = (innerHeight - top) / s;
      pi.style.setProperty('--fs', s.toFixed(4)); pi.style.setProperty('--ph', Math.round(h) + 'px'); dm.style.setProperty('--mt', top + 'px');
    } else { pi.style.removeProperty('--fs'); pi.style.removeProperty('--ph'); }
  }
  fill(); addEventListener('resize', fill);
  var boot = setInterval(function () { var p = ph(); if (!p) return; clearInterval(boot); p.guided = true; p.scene(S[0].k); paint(); fill(); }, 50);
})();
