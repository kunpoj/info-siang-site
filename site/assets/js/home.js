/* Home: the feed filters and hearts, the festival night map (pins and cards point at each other), and the listen player. */
(function () {
  'use strict';
  var th = document.documentElement.lang === 'th';
  var fd = document.querySelector('[data-feed]');
  if (fd) {
    var cards = [].slice.call(fd.querySelectorAll('.fd-c')), chips = [].slice.call(fd.querySelectorAll('.fd-chip'));
    var n = fd.querySelector('.fd-n'), note = fd.querySelector('.fd-empty');
    var count = function (k) { return th ? k + ' ผลงาน' : k + (k === 1 ? ' work' : ' works'); };
    var apply = function (f) {
      var shown = 0;
      cards.forEach(function (c) {
        /* every sample show is open this weekend, so This weekend keeps them all */
        var ok = f === 'all' || f === 'wk' || (f === 'fest' && c.getAttribute('data-fest') === '1') || (f === 'fol' && c.getAttribute('data-fol') === '1');
        c.hidden = !ok; if (ok) shown++;
      });
      if (n) n.textContent = count(shown);
      if (note) note.hidden = f !== 'fol';
      lay();
    };
    /* balanced masonry: each work goes to the shortest column, then pictures stretch a little (cropped, never squashed) so every column ends on one line */
    var g = fd.querySelector('.fd-g'), cols = [], lastN = 0;
    var lay = function () {
      var w = g.clientWidth, k = w >= 1100 ? 5 : w >= 700 ? 4 : 2;
      if (k !== lastN) { cols.forEach(function (c) { c.remove(); }); cols = []; for (var i = 0; i < k; i++) { var d = document.createElement('div'); d.className = 'fd-col'; g.appendChild(d); cols.push(d); } lastN = k; }
      var gap = k === 2 ? 12 : 20, cw = (w - gap * (k - 1)) / k, hs = cols.map(function () { return 0; });
      var vis = cards.filter(function (c) { return !c.hidden; });
      cards.forEach(function (c) { c.querySelector('img').style.height = ''; c.classList.toggle('xs-off', k === 2 && vis.indexOf(c) > 5); if (c.hidden) g.appendChild(c); });
      if (k === 2) vis = vis.slice(0, 6);  /* six works are enough to show the feed on a phone */
      vis.forEach(function (c) {
        var im = c.querySelector('img'), h = cw / (parseFloat(im.style.aspectRatio) || 1), j = hs.indexOf(Math.min.apply(null, hs));
        cols[j].appendChild(c); im.style.height = Math.round(h) + 'px'; hs[j] += c.offsetHeight + parseFloat(getComputedStyle(c).marginBottom);
      });
      g.classList.add('mas');
      /* second pass on real heights: stretch the pictures of short columns so all columns end together */
      var real = cols.map(function (c) { return c.offsetHeight; }), top = Math.max.apply(null, real);
      cols.forEach(function (c, j) {
        var ims = [].slice.call(c.querySelectorAll('img')); if (!ims.length) return;
        var extra = (top - real[j]) / ims.length;
        ims.forEach(function (im) { var h = parseFloat(im.style.height); im.style.height = Math.round(h + Math.min(extra, h * .45)) + 'px'; });
      });
    };
    addEventListener('resize', function () { lay(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { lay(); });
    chips.forEach(function (b) {
      b.addEventListener('click', function () {
        chips.forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        apply(b.getAttribute('data-f'));
      });
    });
    fd.addEventListener('click', function (e) {
      var h = e.target.closest('.fd-h'); if (!h) return;
      h.setAttribute('aria-pressed', h.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    });
    apply('all');
  }

  var mp = document.querySelector('[data-map]');
  if (mp) {
    var pins = [].slice.call(mp.querySelectorAll('.nm-pin')), mc = [].slice.call(mp.querySelectorAll('.nm-card'));
    var pick = function (i) {
      pins.forEach(function (p, k) { p.classList.toggle('on', k === i); p.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
      mc.forEach(function (c, k) { c.classList.toggle('on', k === i); });
    };
    pins.forEach(function (p, i) { p.addEventListener('click', function () { pick(i); }); });
    pick(0);
  }

  /* hero: who are you. The lens slides to the choice; only that panel shows. */
  var hc = document.querySelector('.hc');
  if (hc) {
    var tb = [].slice.call(hc.querySelectorAll('[data-hc]')), lens = hc.querySelector('.hc-lens');
    var place = function (b) { lens.style.width = b.offsetWidth + 'px'; lens.style.transform = 'translateX(' + b.offsetLeft + 'px)'; };
    var pickc = function (b, focus) {
      tb.forEach(function (x) {
        var on = x === b, p = document.getElementById('hp-' + x.getAttribute('data-hc'));
        x.setAttribute('aria-selected', on ? 'true' : 'false'); x.tabIndex = on ? 0 : -1;
        p.hidden = !on; p.classList.toggle('on', on);
      });
      place(b); if (focus) b.focus();
    };
    tb.forEach(function (b, i) {
      b.addEventListener('click', function () { pickc(b); });
      b.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : -1;
        if (n >= 0 && n < tb.length) { e.preventDefault(); pickc(tb[n], true); }
      });
    });
    var fit = function () { var on = hc.querySelector('[aria-selected=true]'); if (on) place(on); };
    fit(); addEventListener('resize', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  }
  /* claim a name: letters, numbers and dashes, shown live on the artist page preview; the real sign-up happens at siang.co/join, which gets the name as ?handle= */
  var cl = document.querySelector('[data-claim]');
  if (cl) {
    var inp = cl.querySelector('input'), shows = [].slice.call(document.querySelectorAll('[data-handle]')), base = shows.length ? shows[0].textContent : '';
    inp.addEventListener('input', function () {
      var v = inp.value.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 30);
      if (v !== inp.value) inp.value = v;
      shows.forEach(function (e) { e.textContent = v || base; });
    });
    cl.addEventListener('submit', function (e) { e.preventDefault(); location.href = 'https://www.siang.co/join' + (inp.value ? '?handle=' + encodeURIComponent(inp.value) : ''); });
  }

  /* listen: two layers of one work, one sound at a time, nothing plays before a tap */
  var ls = document.querySelector('[data-listen]');
  if (ls) {
    var rows = [].slice.call(ls.querySelectorAll('.ls-row')), q = ls.querySelector('.ls-q'), cur = null;
    var mmss = function (s) { s = Math.max(0, Math.round(s || 0)); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); };
    var play = '<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';
    var pause = '<svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>';
    var paint = function (r, on) {
      r.setAttribute('aria-pressed', on ? 'true' : 'false'); r.classList.toggle('playing', on);
      r.querySelector('.ls-pb').innerHTML = on ? pause : play;
    };
    rows.forEach(function (r) {
      var a = new Audio(); a.preload = 'metadata'; a.src = r.getAttribute('data-src'); r.__a = a;
      var tm = r.querySelector('.ls-time'), bars = [].slice.call(r.querySelectorAll('.ls-wave i'));
      a.addEventListener('loadedmetadata', function () { if (!r.classList.contains('playing')) tm.textContent = mmss(a.duration); });
      a.addEventListener('timeupdate', function () {
        var p = a.duration ? a.currentTime / a.duration : 0, k = Math.round(p * bars.length);
        bars.forEach(function (b, i) { b.classList.toggle('on', i < k); });
        tm.textContent = mmss(a.currentTime);
      });
      a.addEventListener('pause', function () { paint(r, false); });
      a.addEventListener('ended', function () { paint(r, false); a.currentTime = 0; tm.textContent = mmss(a.duration); bars.forEach(function (b) { b.classList.remove('on'); }); });
      r.addEventListener('click', function () {
        rows.forEach(function (x) { x.classList.toggle('on', x === r); if (x !== r) x.__a.pause(); });
        q.textContent = r.getAttribute('data-q');
        if (a.paused) {
          try { document.dispatchEvent(new CustomEvent('siang:audio', { detail: a })); } catch (e) {}
          var p = a.play(); if (p && p.catch) p.catch(function () { paint(r, false); });
          paint(r, true); cur = a;
        } else a.pause();
      });
    });
    document.addEventListener('siang:audio', function (e) { if (cur && e.detail !== cur) cur.pause(); });
  }
})();

/* the ask row under the player: one tap shows what happens, like the real two-tap send */
(function () {
  var b = document.querySelector('[data-ask]'); if (!b) return;
  b.addEventListener('click', function () {
    var sm = b.parentNode.querySelector('.ls-ak small');
    b.textContent = b.getAttribute('data-done'); b.disabled = true;
    if (sm) sm.textContent = sm.getAttribute('data-done');
  });
})();
