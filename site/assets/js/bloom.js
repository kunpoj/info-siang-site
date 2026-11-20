/* Siang living bloom (lab). The logo's three circles, blurred, breathing, following the pointer, listening to the voice clip.
   API: SiangBloom.mount(canvas, {ink:[r,g,b], o:[x,y] (0..1 of canvas), w: fraction of canvas width, a: opacity})
        SiangBloom.listen(audioElement)  -> analyser drives the three circles (low, mid, high bands)
   Fallback: the CSS .bloom stays visible until the first WebGL frame. No WebGL, reduced motion or Save-Data: CSS bloom only. */
(function () {
  'use strict';
  var RM = matchMedia('(prefers-reduced-motion: reduce)');
  var VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var FS = [
    'precision mediump float;',
    'uniform vec2 R,O,M;uniform float W,T,A;uniform vec3 L,K;',
    'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
    'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);',
    ' return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+1.),f.x),f.y);}',
    'float disc(vec2 q,vec2 c,float r,float b){return 1.-smoothstep(r-b,r+b,length(q-c));}',
    'void main(){',
    ' vec2 q=(gl_FragCoord.xy-O)/W;',
    ' q+=.018*vec2(n(q*2.2+T*.07)-.5,n(q*2.2+7.3-T*.06)-.5);',             /* slow living warp */
    ' float b=.105;',
    ' vec2 d0=.010*vec2(sin(T*.31),cos(T*.27)), d1=.012*vec2(sin(T*.23+2.),cos(T*.29+1.)), d2=.016*vec2(sin(T*.37+4.),cos(T*.21+3.));',
    ' float a0=disc(q,vec2(.152,0.)+d0+M*.018,.152*(1.+.03*sin(T*.6)+.16*L.x),b);',
    ' float a1=disc(q,vec2(.503,0.)+d1+M*.030,.152*(1.+.03*sin(T*.6+2.1)+.20*L.y),b);',
    ' float a2=disc(q,vec2(.864,0.)+d2+M*.052,.137*(1.+.04*sin(T*.6+4.2)+.26*L.z),b*1.1);',
    ' float a=1.-(1.-a0)*(1.-a1)*(1.-a2);',
    ' a=clamp(a*(A+.06*(L.x+L.y)),0.,1.)+(h(gl_FragCoord.xy+fract(T))-.5)/255.;', /* dither kills banding */
    ' gl_FragColor=vec4(K*a,a);}'
  ].join('\n');

  var blooms = [], audio = null;

  function mount(cv, opt) {
    opt = opt || {};
    if (RM.matches || (navigator.connection && navigator.connection.saveData)) return null;
    var gl = cv.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false, powerPreference: 'low-power' });
    if (!gl) return null;
    function sh(t, s) { var o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; }
    var pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var lp = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(lp); gl.vertexAttribPointer(lp, 2, gl.FLOAT, false, 0, 0);
    var U = {}; ['R', 'O', 'M', 'W', 'T', 'A', 'L', 'K'].forEach(function (k) { U[k] = gl.getUniformLocation(pr, k); });
    var b = { cv: cv, gl: gl, U: U, o: opt.o || [.5, .5], w: opt.w || .9, a: opt.a == null ? .14 : opt.a, ink: opt.ink || [14 / 255, 14 / 255, 14 / 255],
      m: [0, 0], mt: [0, 0], vis: true, scale: opt.scale || .5, t0: performance.now() };
    function size() {
      var r = cv.getBoundingClientRect(), s = Math.min(b.scale * (devicePixelRatio || 1), 900 / Math.max(1, r.width));
      cv.width = Math.max(2, Math.round(r.width * s)); cv.height = Math.max(2, Math.round(r.height * s));
      gl.viewport(0, 0, cv.width, cv.height);
    }
    size(); addEventListener('resize', size);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { b.vis = e[0].isIntersecting; }).observe(cv);
    addEventListener('pointermove', function (e) {
      b.mt[0] = (e.clientX / innerWidth) * 2 - 1; b.mt[1] = -((e.clientY / innerHeight) * 2 - 1);
    }, { passive: true });
    blooms.push(b);
    if (blooms.length === 1) requestAnimationFrame(loop);
    return b;
  }

  var lv = [0, 0, 0], fd = null;
  function levels() {
    if (!audio || !audio.an) { lv[0] *= .9; lv[1] *= .9; lv[2] *= .9; return lv; }
    var an = audio.an; if (!fd) fd = new Uint8Array(an.frequencyBinCount);
    an.getByteFrequencyData(fd);
    var hz = audio.ctx.sampleRate / 2 / fd.length, bands = [[80, 300], [300, 1500], [1500, 5000]];
    for (var i = 0; i < 3; i++) {
      var s = 0, c = 0;
      for (var k = Math.floor(bands[i][0] / hz); k < Math.min(fd.length, bands[i][1] / hz); k++) { s += fd[k]; c++; }
      var g = [2.2, 2.2, 4][i], v = Math.min(1, Math.max(0, (s / Math.max(1, c) / 255 - [.18, .18, .08][i]) * g));
      lv[i] += (v - lv[i]) * (v > lv[i] ? .35 : .08); /* fast attack, slow release */
    }
    return lv;
  }

  function loop(now) {
    requestAnimationFrame(loop);
    if (document.hidden) return;
    var L = levels();
    for (var i = 0; i < blooms.length; i++) {
      var b = blooms[i]; if (!b.vis) continue;
      var gl = b.gl, U = b.U, cv = b.cv;
      b.m[0] += (b.mt[0] - b.m[0]) * .04; b.m[1] += (b.mt[1] - b.m[1]) * .04; /* soft spring */
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(U.R, cv.width, cv.height);
      var W = cv.width * b.w;
      gl.uniform1f(U.W, W);
      gl.uniform2f(U.O, cv.width * b.o[0] - W / 2, cv.height * (1 - b.o[1]));
      gl.uniform2f(U.M, b.m[0], b.m[1]);
      gl.uniform1f(U.T, (now - b.t0) / 1000);
      gl.uniform1f(U.A, b.a);
      gl.uniform3f(U.L, L[0], L[1], L[2]);
      gl.uniform3f(U.K, b.ink[0], b.ink[1], b.ink[2]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!cv.classList.contains('live')) cv.classList.add('live');
    }
  }

  /* one analyser for the page; each <audio> element can only be wired once */
  var wired = new WeakMap();
  function listen(el) {
    if (RM.matches) return;
    var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    if (!audio) { var ctx = new AC(), an = ctx.createAnalyser(); an.fftSize = 1024; an.smoothingTimeConstant = .7; an.connect(ctx.destination); audio = { ctx: ctx, an: an }; }
    var go = function () { if (audio.ctx.state === 'running' && !wired.has(el)) { try { var src = audio.ctx.createMediaElementSource(el); src.connect(audio.an); wired.set(el, src); } catch (e) {} } };
    if (audio.ctx.state === 'suspended') { var r = audio.ctx.resume(); if (r && r.then) r.then(go); } else go();
  }
  /* phone.js hook: it dispatches siang:audio with the element it just created */
  document.addEventListener('siang:audio', function (e) { listen(e.detail); });

  window.SiangBloom = { mount: mount, listen: listen, levels: function () { return lv.slice(); }, _b: blooms };
})();
