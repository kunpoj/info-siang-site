/* Gallery: one scale for the question's journey, so the drawn sets keep their proportions on every screen.
   The screens inside switch their states by class (time based), so a scroll frame only moves the camera
   and the captions. */
(function () {
  'use strict';
  var el = document.querySelector('.gl-ask');
  if (!el) return;
  var MQ = matchMedia('(max-width:760px),(max-aspect-ratio:4/5)'), WW = 990, WH = 840;
  function fit() {
    var w = innerWidth, h = innerHeight, k, s = el.style, cap = el.querySelector('.gl-cap');
    if (!MQ.matches) {
      /* captions own a column on the left; one window to its right shows one room at a time,
         with the same margin on the right as the page margin on the left */
      var cl = cap.offsetLeft, cr = cl + cap.offsetWidth + 56;
      k = Math.min((w - cr - cl) / WW, (h - 96) / WH);
      var ox = (cr - cl) / 2, ww = WW * k, wh = WH * k, wx = w / 2 + ox - ww / 2, wy = (h - wh) / 2;
      s.setProperty('--ox', ox.toFixed(1) + 'px');
      s.setProperty('--wx', wx.toFixed(1) + 'px'); s.setProperty('--wy', wy.toFixed(1) + 'px');
      s.setProperty('--ww', ww.toFixed(1) + 'px'); s.setProperty('--wh', wh.toFixed(1) + 'px');
      /* the same box in the view's own (unscaled) units */
      var L = wx / k, T = wy / k, R = w / k - L - WW, Bm = h / k - T - WH;
      s.setProperty('--clip', 'inset(' + T.toFixed(1) + 'px ' + R.toFixed(1) + 'px ' + Bm.toFixed(1) + 'px ' + L.toFixed(1) + 'px round ' + (22 / k).toFixed(1) + 'px)');
      cap.style.top = wy.toFixed(1) + 'px';
    } else { k = Math.min(w / 350, Math.max(.74, (h * .69 - 16) / 660)); s.removeProperty('--clip'); cap.style.top = ''; }
    s.setProperty('--gk', k.toFixed(4));
  }
  fit(); addEventListener('resize', fit);

  /* screen states: [class, from progress]; the room changes (s-m2, s-m3) at the same point as the captions */
  if (window.Scenes) {
    var B = [['s-ty1', .04], ['s-tap', .14], ['s-sent', .19], ['s-m2', .365], ['s-land', .42], ['s-sel', .46], ['s-ty2', .49], ['s-rsend', .58], ['s-cp', .60], ['s-m3', .685], ['s-n1', .75], ['s-n2', .82]];
    var on = {};
    Scenes.on(el, function (p) {
      for (var i = 0; i < B.length; i++) {
        var v = p >= B[i][1];
        if (on[B[i][0]] !== v) { on[B[i][0]] = v; el.classList.toggle(B[i][0], v); }
      }
    });
  }
})();
