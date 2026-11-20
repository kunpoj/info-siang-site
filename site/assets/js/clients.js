/* Client page: the report tabs, and the catalogue (point at a work's QR and the phone opens that work). */
(function () {
  'use strict';
  var tabs = [].slice.call(document.querySelectorAll('.cl-tab')), panes = [].slice.call(document.querySelectorAll('.cl-pane'));
  var pick = function (i) {
    tabs.forEach(function (b, k) { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i ? 'true' : 'false'); b.tabIndex = k === i ? 0 : -1; });
    panes.forEach(function (p, k) { p.hidden = k !== i; p.classList.toggle('on', k === i); });
  };
  tabs.forEach(function (b, i) {
    b.addEventListener('click', function () { pick(i); });
    b.addEventListener('keydown', function (e) {
      var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : -1;
      if (n < 0 || n >= tabs.length) return; e.preventDefault(); pick(n); tabs[n].focus();
    });
  });
  if (tabs.length) pick(0);

  var cat = document.querySelector('[data-cat]');
  if (cat) {
    var root = cat.querySelector('[data-phone]'), qs = [].slice.call(cat.querySelectorAll('.ct-q'));
    var open = function (q) {
      var p = root && root.__phone, i = +q.getAttribute('data-i'); if (!p) return;
      qs.forEach(function (x) { x.classList.toggle('on', x === q); });
      p.stopAudio(); p.stack = []; p.screen.innerHTML = '';
      p.push({ v: 'show', s: 'quiet' }, true);
      if (i >= 0) { p.seen[['vase', 'bowl', 'chair', 'textile'][i]] = 1; p.push({ v: 'work', s: 'quiet', i: i }, true); p.stack[0].el.classList.add('out'); }
    };
    qs.forEach(function (q) {
      q.addEventListener('mouseenter', function () { open(q); });
      q.addEventListener('click', function () { open(q); });
    });
    var first = cat.querySelector('.ct-q[data-i="0"]'); if (first) first.classList.add('on');
  }
})();
