import { defineComponent as At, ref as M, watch as ae, onMounted as wt, computed as V, resolveComponent as C, resolveDirective as St, openBlock as d, createElementBlock as T, Fragment as k, withDirectives as Ct, createBlock as z, mergeProps as Ot, withCtx as ne, renderList as It, createVNode as B, createElementVNode as xt, renderSlot as K, withModifiers as oe, toDisplayString as Pt, resolveDynamicComponent as Et, unref as Lt, createCommentVNode as ie, normalizeStyle as Dt } from "vue";
const Mt = (e) => e.replace(/(A-Z)g/, "-$1").toLocaleLowerCase();
var R = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function kt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Bt() {
  this.__data__ = [], this.size = 0;
}
var Ft = Bt;
function Gt(e, t) {
  return e === t || e !== e && t !== t;
}
var Ye = Gt, Ut = Ye;
function Nt(e, t) {
  for (var r = e.length; r--; )
    if (Ut(e[r][0], t))
      return r;
  return -1;
}
var Y = Nt, Vt = Y, zt = Array.prototype, Kt = zt.splice;
function Rt(e) {
  var t = this.__data__, r = Vt(t, e);
  if (r < 0)
    return !1;
  var a = t.length - 1;
  return r == a ? t.pop() : Kt.call(t, r, 1), --this.size, !0;
}
var Ht = Rt, qt = Y;
function Wt(e) {
  var t = this.__data__, r = qt(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var Jt = Wt, Yt = Y;
function Xt(e) {
  return Yt(this.__data__, e) > -1;
}
var Zt = Xt, Qt = Y;
function er(e, t) {
  var r = this.__data__, a = Qt(r, e);
  return a < 0 ? (++this.size, r.push([e, t])) : r[a][1] = t, this;
}
var tr = er, rr = Ft, ar = Ht, nr = Jt, or = Zt, ir = tr;
function O(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
O.prototype.clear = rr;
O.prototype.delete = ar;
O.prototype.get = nr;
O.prototype.has = or;
O.prototype.set = ir;
var X = O, sr = X;
function cr() {
  this.__data__ = new sr(), this.size = 0;
}
var lr = cr;
function ur(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var vr = ur;
function fr(e) {
  return this.__data__.get(e);
}
var pr = fr;
function gr(e) {
  return this.__data__.has(e);
}
var dr = gr, yr = typeof R == "object" && R && R.Object === Object && R, Xe = yr, br = Xe, $r = typeof self == "object" && self && self.Object === Object && self, hr = br || $r || Function("return this")(), h = hr, _r = h, Tr = _r.Symbol, pe = Tr, we = pe, Ze = Object.prototype, mr = Ze.hasOwnProperty, jr = Ze.toString, F = we ? we.toStringTag : void 0;
function Ar(e) {
  var t = mr.call(e, F), r = e[F];
  try {
    e[F] = void 0;
    var a = !0;
  } catch {
  }
  var i = jr.call(e);
  return a && (t ? e[F] = r : delete e[F]), i;
}
var wr = Ar, Sr = Object.prototype, Cr = Sr.toString;
function Or(e) {
  return Cr.call(e);
}
var Ir = Or, Se = pe, xr = wr, Pr = Ir, Er = "[object Null]", Lr = "[object Undefined]", Ce = Se ? Se.toStringTag : void 0;
function Dr(e) {
  return e == null ? e === void 0 ? Lr : Er : Ce && Ce in Object(e) ? xr(e) : Pr(e);
}
var Z = Dr;
function Mr(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var G = Mr, kr = Z, Br = G, Fr = "[object AsyncFunction]", Gr = "[object Function]", Ur = "[object GeneratorFunction]", Nr = "[object Proxy]";
function Vr(e) {
  if (!Br(e))
    return !1;
  var t = kr(e);
  return t == Gr || t == Ur || t == Fr || t == Nr;
}
var Qe = Vr, zr = h, Kr = zr["__core-js_shared__"], Rr = Kr, se = Rr, Oe = function() {
  var e = /[^.]+$/.exec(se && se.keys && se.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Hr(e) {
  return !!Oe && Oe in e;
}
var qr = Hr, Wr = Function.prototype, Jr = Wr.toString;
function Yr(e) {
  if (e != null) {
    try {
      return Jr.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var et = Yr, Xr = Qe, Zr = qr, Qr = G, ea = et, ta = /[\\^$.*+?()[\]{}|]/g, ra = /^\[object .+?Constructor\]$/, aa = Function.prototype, na = Object.prototype, oa = aa.toString, ia = na.hasOwnProperty, sa = RegExp(
  "^" + oa.call(ia).replace(ta, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function ca(e) {
  if (!Qr(e) || Zr(e))
    return !1;
  var t = Xr(e) ? sa : ra;
  return t.test(ea(e));
}
var la = ca;
function ua(e, t) {
  return e == null ? void 0 : e[t];
}
var va = ua, fa = la, pa = va;
function ga(e, t) {
  var r = pa(e, t);
  return fa(r) ? r : void 0;
}
var j = ga, da = j, ya = h, ba = da(ya, "Map"), ge = ba, $a = j, ha = $a(Object, "create"), Q = ha, Ie = Q;
function _a() {
  this.__data__ = Ie ? Ie(null) : {}, this.size = 0;
}
var Ta = _a;
function ma(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var ja = ma, Aa = Q, wa = "__lodash_hash_undefined__", Sa = Object.prototype, Ca = Sa.hasOwnProperty;
function Oa(e) {
  var t = this.__data__;
  if (Aa) {
    var r = t[e];
    return r === wa ? void 0 : r;
  }
  return Ca.call(t, e) ? t[e] : void 0;
}
var Ia = Oa, xa = Q, Pa = Object.prototype, Ea = Pa.hasOwnProperty;
function La(e) {
  var t = this.__data__;
  return xa ? t[e] !== void 0 : Ea.call(t, e);
}
var Da = La, Ma = Q, ka = "__lodash_hash_undefined__";
function Ba(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = Ma && t === void 0 ? ka : t, this;
}
var Fa = Ba, Ga = Ta, Ua = ja, Na = Ia, Va = Da, za = Fa;
function I(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
I.prototype.clear = Ga;
I.prototype.delete = Ua;
I.prototype.get = Na;
I.prototype.has = Va;
I.prototype.set = za;
var Ka = I, xe = Ka, Ra = X, Ha = ge;
function qa() {
  this.size = 0, this.__data__ = {
    hash: new xe(),
    map: new (Ha || Ra)(),
    string: new xe()
  };
}
var Wa = qa;
function Ja(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var Ya = Ja, Xa = Ya;
function Za(e, t) {
  var r = e.__data__;
  return Xa(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var ee = Za, Qa = ee;
function en(e) {
  var t = Qa(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var tn = en, rn = ee;
function an(e) {
  return rn(this, e).get(e);
}
var nn = an, on = ee;
function sn(e) {
  return on(this, e).has(e);
}
var cn = sn, ln = ee;
function un(e, t) {
  var r = ln(this, e), a = r.size;
  return r.set(e, t), this.size += r.size == a ? 0 : 1, this;
}
var vn = un, fn = Wa, pn = tn, gn = nn, dn = cn, yn = vn;
function x(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var a = e[t];
    this.set(a[0], a[1]);
  }
}
x.prototype.clear = fn;
x.prototype.delete = pn;
x.prototype.get = gn;
x.prototype.has = dn;
x.prototype.set = yn;
var bn = x, $n = X, hn = ge, _n = bn, Tn = 200;
function mn(e, t) {
  var r = this.__data__;
  if (r instanceof $n) {
    var a = r.__data__;
    if (!hn || a.length < Tn - 1)
      return a.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new _n(a);
  }
  return r.set(e, t), this.size = r.size, this;
}
var jn = mn, An = X, wn = lr, Sn = vr, Cn = pr, On = dr, In = jn;
function P(e) {
  var t = this.__data__ = new An(e);
  this.size = t.size;
}
P.prototype.clear = wn;
P.prototype.delete = Sn;
P.prototype.get = Cn;
P.prototype.has = On;
P.prototype.set = In;
var xn = P;
function Pn(e, t) {
  for (var r = -1, a = e == null ? 0 : e.length; ++r < a && t(e[r], r, e) !== !1; )
    ;
  return e;
}
var En = Pn, Ln = j, Dn = function() {
  try {
    var e = Ln(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Mn = Dn, Pe = Mn;
function kn(e, t, r) {
  t == "__proto__" && Pe ? Pe(e, t, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : e[t] = r;
}
var tt = kn, Bn = tt, Fn = Ye, Gn = Object.prototype, Un = Gn.hasOwnProperty;
function Nn(e, t, r) {
  var a = e[t];
  (!(Un.call(e, t) && Fn(a, r)) || r === void 0 && !(t in e)) && Bn(e, t, r);
}
var rt = Nn, Vn = rt, zn = tt;
function Kn(e, t, r, a) {
  var i = !r;
  r || (r = {});
  for (var s = -1, n = t.length; ++s < n; ) {
    var c = t[s], f = a ? a(r[c], e[c], c, r, e) : void 0;
    f === void 0 && (f = e[c]), i ? zn(r, c, f) : Vn(r, c, f);
  }
  return r;
}
var te = Kn;
function Rn(e, t) {
  for (var r = -1, a = Array(e); ++r < e; )
    a[r] = t(r);
  return a;
}
var Hn = Rn;
function qn(e) {
  return e != null && typeof e == "object";
}
var U = qn, Wn = Z, Jn = U, Yn = "[object Arguments]";
function Xn(e) {
  return Jn(e) && Wn(e) == Yn;
}
var Zn = Xn, Ee = Zn, Qn = U, at = Object.prototype, eo = at.hasOwnProperty, to = at.propertyIsEnumerable, ro = Ee(function() {
  return arguments;
}()) ? Ee : function(e) {
  return Qn(e) && eo.call(e, "callee") && !to.call(e, "callee");
}, ao = ro, no = Array.isArray, de = no, q = { exports: {} };
function oo() {
  return !1;
}
var io = oo;
q.exports;
(function(e, t) {
  var r = h, a = io, i = t && !t.nodeType && t, s = i && !0 && e && !e.nodeType && e, n = s && s.exports === i, c = n ? r.Buffer : void 0, f = c ? c.isBuffer : void 0, v = f || a;
  e.exports = v;
})(q, q.exports);
var nt = q.exports, so = 9007199254740991, co = /^(?:0|[1-9]\d*)$/;
function lo(e, t) {
  var r = typeof e;
  return t = t ?? so, !!t && (r == "number" || r != "symbol" && co.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var uo = lo, vo = 9007199254740991;
function fo(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= vo;
}
var ot = fo, po = Z, go = ot, yo = U, bo = "[object Arguments]", $o = "[object Array]", ho = "[object Boolean]", _o = "[object Date]", To = "[object Error]", mo = "[object Function]", jo = "[object Map]", Ao = "[object Number]", wo = "[object Object]", So = "[object RegExp]", Co = "[object Set]", Oo = "[object String]", Io = "[object WeakMap]", xo = "[object ArrayBuffer]", Po = "[object DataView]", Eo = "[object Float32Array]", Lo = "[object Float64Array]", Do = "[object Int8Array]", Mo = "[object Int16Array]", ko = "[object Int32Array]", Bo = "[object Uint8Array]", Fo = "[object Uint8ClampedArray]", Go = "[object Uint16Array]", Uo = "[object Uint32Array]", u = {};
u[Eo] = u[Lo] = u[Do] = u[Mo] = u[ko] = u[Bo] = u[Fo] = u[Go] = u[Uo] = !0;
u[bo] = u[$o] = u[xo] = u[ho] = u[Po] = u[_o] = u[To] = u[mo] = u[jo] = u[Ao] = u[wo] = u[So] = u[Co] = u[Oo] = u[Io] = !1;
function No(e) {
  return yo(e) && go(e.length) && !!u[po(e)];
}
var Vo = No;
function zo(e) {
  return function(t) {
    return e(t);
  };
}
var ye = zo, W = { exports: {} };
W.exports;
(function(e, t) {
  var r = Xe, a = t && !t.nodeType && t, i = a && !0 && e && !e.nodeType && e, s = i && i.exports === a, n = s && r.process, c = function() {
    try {
      var f = i && i.require && i.require("util").types;
      return f || n && n.binding && n.binding("util");
    } catch {
    }
  }();
  e.exports = c;
})(W, W.exports);
var be = W.exports, Ko = Vo, Ro = ye, Le = be, De = Le && Le.isTypedArray, Ho = De ? Ro(De) : Ko, qo = Ho, Wo = Hn, Jo = ao, Yo = de, Xo = nt, Zo = uo, Qo = qo, ei = Object.prototype, ti = ei.hasOwnProperty;
function ri(e, t) {
  var r = Yo(e), a = !r && Jo(e), i = !r && !a && Xo(e), s = !r && !a && !i && Qo(e), n = r || a || i || s, c = n ? Wo(e.length, String) : [], f = c.length;
  for (var v in e)
    (t || ti.call(e, v)) && !(n && // Safari 9 has enumerable `arguments.length` in strict mode.
    (v == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (v == "offset" || v == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    s && (v == "buffer" || v == "byteLength" || v == "byteOffset") || // Skip index properties.
    Zo(v, f))) && c.push(v);
  return c;
}
var it = ri, ai = Object.prototype;
function ni(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || ai;
  return e === r;
}
var $e = ni;
function oi(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var st = oi, ii = st, si = ii(Object.keys, Object), ci = si, li = $e, ui = ci, vi = Object.prototype, fi = vi.hasOwnProperty;
function pi(e) {
  if (!li(e))
    return ui(e);
  var t = [];
  for (var r in Object(e))
    fi.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var gi = pi, di = Qe, yi = ot;
function bi(e) {
  return e != null && yi(e.length) && !di(e);
}
var ct = bi, $i = it, hi = gi, _i = ct;
function Ti(e) {
  return _i(e) ? $i(e) : hi(e);
}
var he = Ti, mi = te, ji = he;
function Ai(e, t) {
  return e && mi(t, ji(t), e);
}
var wi = Ai;
function Si(e) {
  var t = [];
  if (e != null)
    for (var r in Object(e))
      t.push(r);
  return t;
}
var Ci = Si, Oi = G, Ii = $e, xi = Ci, Pi = Object.prototype, Ei = Pi.hasOwnProperty;
function Li(e) {
  if (!Oi(e))
    return xi(e);
  var t = Ii(e), r = [];
  for (var a in e)
    a == "constructor" && (t || !Ei.call(e, a)) || r.push(a);
  return r;
}
var Di = Li, Mi = it, ki = Di, Bi = ct;
function Fi(e) {
  return Bi(e) ? Mi(e, !0) : ki(e);
}
var _e = Fi, Gi = te, Ui = _e;
function Ni(e, t) {
  return e && Gi(t, Ui(t), e);
}
var Vi = Ni, J = { exports: {} };
J.exports;
(function(e, t) {
  var r = h, a = t && !t.nodeType && t, i = a && !0 && e && !e.nodeType && e, s = i && i.exports === a, n = s ? r.Buffer : void 0, c = n ? n.allocUnsafe : void 0;
  function f(v, A) {
    if (A)
      return v.slice();
    var y = v.length, b = c ? c(y) : new v.constructor(y);
    return v.copy(b), b;
  }
  e.exports = f;
})(J, J.exports);
var zi = J.exports;
function Ki(e, t) {
  var r = -1, a = e.length;
  for (t || (t = Array(a)); ++r < a; )
    t[r] = e[r];
  return t;
}
var Ri = Ki;
function Hi(e, t) {
  for (var r = -1, a = e == null ? 0 : e.length, i = 0, s = []; ++r < a; ) {
    var n = e[r];
    t(n, r, e) && (s[i++] = n);
  }
  return s;
}
var qi = Hi;
function Wi() {
  return [];
}
var lt = Wi, Ji = qi, Yi = lt, Xi = Object.prototype, Zi = Xi.propertyIsEnumerable, Me = Object.getOwnPropertySymbols, Qi = Me ? function(e) {
  return e == null ? [] : (e = Object(e), Ji(Me(e), function(t) {
    return Zi.call(e, t);
  }));
} : Yi, Te = Qi, es = te, ts = Te;
function rs(e, t) {
  return es(e, ts(e), t);
}
var as = rs;
function ns(e, t) {
  for (var r = -1, a = t.length, i = e.length; ++r < a; )
    e[i + r] = t[r];
  return e;
}
var ut = ns, os = st, is = os(Object.getPrototypeOf, Object), vt = is, ss = ut, cs = vt, ls = Te, us = lt, vs = Object.getOwnPropertySymbols, fs = vs ? function(e) {
  for (var t = []; e; )
    ss(t, ls(e)), e = cs(e);
  return t;
} : us, ft = fs, ps = te, gs = ft;
function ds(e, t) {
  return ps(e, gs(e), t);
}
var ys = ds, bs = ut, $s = de;
function hs(e, t, r) {
  var a = t(e);
  return $s(e) ? a : bs(a, r(e));
}
var pt = hs, _s = pt, Ts = Te, ms = he;
function js(e) {
  return _s(e, ms, Ts);
}
var As = js, ws = pt, Ss = ft, Cs = _e;
function Os(e) {
  return ws(e, Cs, Ss);
}
var Is = Os, xs = j, Ps = h, Es = xs(Ps, "DataView"), Ls = Es, Ds = j, Ms = h, ks = Ds(Ms, "Promise"), Bs = ks, Fs = j, Gs = h, Us = Fs(Gs, "Set"), Ns = Us, Vs = j, zs = h, Ks = Vs(zs, "WeakMap"), Rs = Ks, ce = Ls, le = ge, ue = Bs, ve = Ns, fe = Rs, gt = Z, E = et, ke = "[object Map]", Hs = "[object Object]", Be = "[object Promise]", Fe = "[object Set]", Ge = "[object WeakMap]", Ue = "[object DataView]", qs = E(ce), Ws = E(le), Js = E(ue), Ys = E(ve), Xs = E(fe), m = gt;
(ce && m(new ce(new ArrayBuffer(1))) != Ue || le && m(new le()) != ke || ue && m(ue.resolve()) != Be || ve && m(new ve()) != Fe || fe && m(new fe()) != Ge) && (m = function(e) {
  var t = gt(e), r = t == Hs ? e.constructor : void 0, a = r ? E(r) : "";
  if (a)
    switch (a) {
      case qs:
        return Ue;
      case Ws:
        return ke;
      case Js:
        return Be;
      case Ys:
        return Fe;
      case Xs:
        return Ge;
    }
  return t;
});
var me = m, Zs = Object.prototype, Qs = Zs.hasOwnProperty;
function ec(e) {
  var t = e.length, r = new e.constructor(t);
  return t && typeof e[0] == "string" && Qs.call(e, "index") && (r.index = e.index, r.input = e.input), r;
}
var tc = ec, rc = h, ac = rc.Uint8Array, nc = ac, Ne = nc;
function oc(e) {
  var t = new e.constructor(e.byteLength);
  return new Ne(t).set(new Ne(e)), t;
}
var je = oc, ic = je;
function sc(e, t) {
  var r = t ? ic(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.byteLength);
}
var cc = sc, lc = /\w*$/;
function uc(e) {
  var t = new e.constructor(e.source, lc.exec(e));
  return t.lastIndex = e.lastIndex, t;
}
var vc = uc, Ve = pe, ze = Ve ? Ve.prototype : void 0, Ke = ze ? ze.valueOf : void 0;
function fc(e) {
  return Ke ? Object(Ke.call(e)) : {};
}
var pc = fc, gc = je;
function dc(e, t) {
  var r = t ? gc(e.buffer) : e.buffer;
  return new e.constructor(r, e.byteOffset, e.length);
}
var yc = dc, bc = je, $c = cc, hc = vc, _c = pc, Tc = yc, mc = "[object Boolean]", jc = "[object Date]", Ac = "[object Map]", wc = "[object Number]", Sc = "[object RegExp]", Cc = "[object Set]", Oc = "[object String]", Ic = "[object Symbol]", xc = "[object ArrayBuffer]", Pc = "[object DataView]", Ec = "[object Float32Array]", Lc = "[object Float64Array]", Dc = "[object Int8Array]", Mc = "[object Int16Array]", kc = "[object Int32Array]", Bc = "[object Uint8Array]", Fc = "[object Uint8ClampedArray]", Gc = "[object Uint16Array]", Uc = "[object Uint32Array]";
function Nc(e, t, r) {
  var a = e.constructor;
  switch (t) {
    case xc:
      return bc(e);
    case mc:
    case jc:
      return new a(+e);
    case Pc:
      return $c(e, r);
    case Ec:
    case Lc:
    case Dc:
    case Mc:
    case kc:
    case Bc:
    case Fc:
    case Gc:
    case Uc:
      return Tc(e, r);
    case Ac:
      return new a();
    case wc:
    case Oc:
      return new a(e);
    case Sc:
      return hc(e);
    case Cc:
      return new a();
    case Ic:
      return _c(e);
  }
}
var Vc = Nc, zc = G, Re = Object.create, Kc = function() {
  function e() {
  }
  return function(t) {
    if (!zc(t))
      return {};
    if (Re)
      return Re(t);
    e.prototype = t;
    var r = new e();
    return e.prototype = void 0, r;
  };
}(), Rc = Kc, Hc = Rc, qc = vt, Wc = $e;
function Jc(e) {
  return typeof e.constructor == "function" && !Wc(e) ? Hc(qc(e)) : {};
}
var Yc = Jc, Xc = me, Zc = U, Qc = "[object Map]";
function el(e) {
  return Zc(e) && Xc(e) == Qc;
}
var tl = el, rl = tl, al = ye, He = be, qe = He && He.isMap, nl = qe ? al(qe) : rl, ol = nl, il = me, sl = U, cl = "[object Set]";
function ll(e) {
  return sl(e) && il(e) == cl;
}
var ul = ll, vl = ul, fl = ye, We = be, Je = We && We.isSet, pl = Je ? fl(Je) : vl, gl = pl, dl = xn, yl = En, bl = rt, $l = wi, hl = Vi, _l = zi, Tl = Ri, ml = as, jl = ys, Al = As, wl = Is, Sl = me, Cl = tc, Ol = Vc, Il = Yc, xl = de, Pl = nt, El = ol, Ll = G, Dl = gl, Ml = he, kl = _e, Bl = 1, Fl = 2, Gl = 4, dt = "[object Arguments]", Ul = "[object Array]", Nl = "[object Boolean]", Vl = "[object Date]", zl = "[object Error]", yt = "[object Function]", Kl = "[object GeneratorFunction]", Rl = "[object Map]", Hl = "[object Number]", bt = "[object Object]", ql = "[object RegExp]", Wl = "[object Set]", Jl = "[object String]", Yl = "[object Symbol]", Xl = "[object WeakMap]", Zl = "[object ArrayBuffer]", Ql = "[object DataView]", eu = "[object Float32Array]", tu = "[object Float64Array]", ru = "[object Int8Array]", au = "[object Int16Array]", nu = "[object Int32Array]", ou = "[object Uint8Array]", iu = "[object Uint8ClampedArray]", su = "[object Uint16Array]", cu = "[object Uint32Array]", l = {};
l[dt] = l[Ul] = l[Zl] = l[Ql] = l[Nl] = l[Vl] = l[eu] = l[tu] = l[ru] = l[au] = l[nu] = l[Rl] = l[Hl] = l[bt] = l[ql] = l[Wl] = l[Jl] = l[Yl] = l[ou] = l[iu] = l[su] = l[cu] = !0;
l[zl] = l[yt] = l[Xl] = !1;
function H(e, t, r, a, i, s) {
  var n, c = t & Bl, f = t & Fl, v = t & Gl;
  if (r && (n = i ? r(e, a, i, s) : r(e)), n !== void 0)
    return n;
  if (!Ll(e))
    return e;
  var A = xl(e);
  if (A) {
    if (n = Cl(e), !c)
      return Tl(e, n);
  } else {
    var y = Sl(e), b = y == yt || y == Kl;
    if (Pl(e))
      return _l(e, c);
    if (y == bt || y == dt || b && !i) {
      if (n = f || b ? {} : Il(e), !c)
        return f ? jl(e, hl(n, e)) : ml(e, $l(n, e));
    } else {
      if (!l[y])
        return i ? e : {};
      n = Ol(e, y, c);
    }
  }
  s || (s = new dl());
  var L = s.get(e);
  if (L)
    return L;
  s.set(e, n), Dl(e) ? e.forEach(function($) {
    n.add(H($, t, r, $, e, s));
  }) : El(e) && e.forEach(function($, _) {
    n.set(_, H($, t, r, _, e, s));
  });
  var re = v ? f ? wl : Al : f ? kl : Ml, N = A ? void 0 : re(e);
  return yl(N || e, function($, _) {
    N && (_ = $, $ = e[_]), bl(n, _, H($, t, r, _, e, s));
  }), n;
}
var lu = H, uu = lu, vu = 1, fu = 4;
function pu(e) {
  return uu(e, vu | fu);
}
var gu = pu;
const du = /* @__PURE__ */ kt(gu), yu = {
  key: 0,
  style: { display: "flex" }
}, bu = {
  key: 1,
  class: "action-icon"
}, $u = { key: 1 }, hu = /* @__PURE__ */ At({
  __name: "index",
  props: {
    options: {
      // 表格配置选项
      type: Array,
      required: !0
    },
    data: {
      // 表格数据
      type: Array,
      required: !0
    },
    elementLoadingText: {
      // 加载文案
      type: String
    },
    elementLoadingSpinner: {
      // 加载图标名
      type: String
    },
    elementLoadingBackground: {
      // 加载背景颜色
      type: String
    },
    elementLoadingSvg: {
      // 加载图标是svg
      type: String
    },
    elementLoadingSvgViewBox: {
      // 加载团是svg的配置
      type: String
    },
    editIcon: {
      // 编辑显示的图标
      type: String,
      default: "Edit"
    },
    isEditRow: {
      // 是否可以编辑行
      type: Boolean,
      default: !1
    },
    editRowIndex: {
      // 编辑行按钮的标识
      type: String,
      default: ""
    },
    pagination: {
      // 是否显示分页
      type: Boolean,
      default: !1
    },
    paginationAlign: {
      // 显示分页的对齐方式
      type: String,
      default: "left"
    },
    currentPage: {
      // 当前是第几页
      type: Number,
      default: 1
    },
    pageSize: {
      // 当前一页多少条数据
      type: Number,
      default: 10
    },
    pageSizes: {
      // 显示分页数据多少条的选项
      type: Array,
      default: () => [10, 20, 30, 40]
    },
    total: {
      // 数据总条数
      type: Number,
      default: 0
    }
  },
  emits: ["confirm", "cancel", "update:editRowIndex", "size-change", "current-change"],
  setup(e, { emit: t }) {
    const r = e, a = (o) => {
      t("size-change", o);
    }, i = (o) => {
      t("current-change", o);
    }, s = M(""), n = M(du(r.data)), c = M(r.editRowIndex), f = M(!1), v = M(r.currentPage);
    let A = ae(() => r.data, (o) => {
      f.value = !0, n.value = o, n.value.map((w) => {
        w.rowEdit = !1;
      }), f.value && A();
    }, { deep: !0 });
    ae(() => r.editRowIndex, (o) => {
      o && (c.value = o);
    }), ae(() => r.currentPage, (o) => {
      v.value = o;
    }), wt(() => {
      n.value.map((o) => {
        o.rowEdit = !1;
      });
    });
    const y = V(() => r.options.filter((o) => !o.action)), b = V(() => r.options.find((o) => o.action)), L = V(() => !r.data || !r.data.length), re = V(() => r.paginationAlign === "left" ? "flex-start" : r.paginationAlign === "right" ? "flex-end" : "center"), N = (o) => {
      s.value = o.$index + o.column.id;
    }, $ = (o) => {
      t("confirm", o), s.value = "";
    }, _ = (o) => {
      t("cancel", o), s.value = "";
    }, $t = (o, w) => {
      w.label === b.value.label && r.isEditRow && c.value === r.editRowIndex && (o.rowEdit = !o.rowEdit, n.value.map((D) => {
        D !== o && (D.rowEdit = !1);
      }), o.rowEdit || t("update:editRowIndex", ""));
    };
    return (o, w) => {
      const D = C("el-input"), ht = C("el-icon-check"), _t = C("el-icon-close"), Ae = C("el-table-column"), Tt = C("el-table"), mt = C("el-pagination"), jt = St("loading");
      return d(), T(k, null, [
        Ct((d(), z(Tt, Ot({
          data: n.value,
          "element-loading-text": e.elementLoadingText,
          "element-loading-spinner": e.elementLoadingSpinner,
          "element-loading-background": e.elementLoadingBackground,
          "element-loading-svg": e.elementLoadingSvg,
          "element-loading-svg-view-box": e.elementLoadingSvgViewBox,
          onRowClick: $t
        }, o.$attrs), {
          default: ne(() => [
            (d(!0), T(k, null, It(y.value, (p) => (d(), T(k, {
              key: p.prop
            }, [
              p.prop && !p.action ? (d(), z(Ae, {
                key: 0,
                label: p.label,
                prop: p.prop,
                width: p.width,
                align: p.align
              }, {
                default: ne((g) => [
                  g.row.rowEdit ? (d(), z(D, {
                    key: 0,
                    size: "small",
                    modelValue: g.row[p.prop],
                    "onUpdate:modelValue": (S) => g.row[p.prop] = S
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (d(), T(k, { key: 1 }, [
                    g.$index + g.column.id === s.value ? (d(), T("div", yu, [
                      B(D, {
                        size: "small",
                        modelValue: g.row[p.prop],
                        "onUpdate:modelValue": (S) => g.row[p.prop] = S
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      xt("div", null, [
                        o.$slots.cellEdit ? K(o.$slots, "cellEdit", {
                          key: 0,
                          scope: g
                        }, void 0, !0) : (d(), T("div", bu, [
                          B(ht, {
                            class: "check",
                            onClick: oe((S) => $(g), ["stop"])
                          }, null, 8, ["onClick"]),
                          B(_t, {
                            class: "close",
                            onClick: oe((S) => _(g), ["stop"])
                          }, null, 8, ["onClick"])
                        ]))
                      ])
                    ])) : (d(), T(k, { key: 1 }, [
                      p.slot ? K(o.$slots, p.slot, {
                        key: 0,
                        scope: g
                      }, void 0, !0) : (d(), T("span", $u, Pt(g.row[p.prop]), 1)),
                      p.editable ? (d(), z(Et(`el-icon-${Lt(Mt)(e.editIcon)}`), {
                        key: 2,
                        class: "edit",
                        onClick: oe((S) => N(g), ["stop"])
                      }, null, 8, ["onClick"])) : ie("", !0)
                    ], 64))
                  ], 64))
                ]),
                _: 2
              }, 1032, ["label", "prop", "width", "align"])) : ie("", !0)
            ], 64))), 128)),
            B(Ae, {
              label: b.value.label,
              width: b.value.width,
              align: b.value.align
            }, {
              default: ne((p) => [
                p.row.rowEdit ? K(o.$slots, "editRow", {
                  key: 0,
                  scope: p
                }, void 0, !0) : K(o.$slots, "action", {
                  key: 1,
                  scope: p
                }, void 0, !0)
              ]),
              _: 3
            }, 8, ["label", "width", "align"])
          ]),
          _: 3
        }, 16, ["data", "element-loading-text", "element-loading-spinner", "element-loading-background", "element-loading-svg", "element-loading-svg-view-box"])), [
          [jt, L.value]
        ]),
        e.pagination && !L.value ? (d(), T("div", {
          key: 0,
          class: "pagination",
          style: Dt({ justifyContent: re.value })
        }, [
          B(mt, {
            currentPage: v.value,
            "onUpdate:currentPage": w[0] || (w[0] = (p) => v.value = p),
            "page-sizes": e.pageSizes,
            "page-size": e.pageSize,
            layout: "total, sizes, prev, pager, next, jumper",
            total: e.total,
            onSizeChange: a,
            onCurrentChange: i
          }, null, 8, ["currentPage", "page-sizes", "page-size", "total"])
        ], 4)) : ie("", !0)
      ], 64);
    };
  }
});
const _u = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [a, i] of t)
    r[a] = i;
  return r;
}, Tu = /* @__PURE__ */ _u(hu, [["__scopeId", "data-v-beda2718"]]), ju = {
  install(e) {
    e.component("f-table", Tu);
  }
};
export {
  ju as default
};
