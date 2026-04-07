(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const o of r)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && s(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const o = {};
    return (
      r.integrity && (o.integrity = r.integrity),
      r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : r.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const o = n(r);
    fetch(r.href, o);
  }
})();
/**
 * @vue/shared v3.5.6
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function Zn(e) {
  const t = Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const X = {},
  yt = [],
  Se = () => {},
  jo = () => !1,
  hn = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  es = (e) => e.startsWith("onUpdate:"),
  oe = Object.assign,
  ts = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  Bo = Object.prototype.hasOwnProperty,
  W = (e, t) => Bo.call(e, t),
  D = Array.isArray,
  Mt = (e) => pn(e) === "[object Map]",
  Uo = (e) => pn(e) === "[object Set]",
  j = (e) => typeof e == "function",
  se = (e) => typeof e == "string",
  Rt = (e) => typeof e == "symbol",
  te = (e) => e !== null && typeof e == "object",
  vr = (e) => (te(e) || j(e)) && j(e.then) && j(e.catch),
  Vo = Object.prototype.toString,
  pn = (e) => Vo.call(e),
  Ko = (e) => pn(e).slice(8, -1),
  Wo = (e) => pn(e) === "[object Object]",
  ns = (e) =>
    se(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Ft = Zn(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
  ),
  gn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  ko = /-(\w)/g,
  ft = gn((e) => e.replace(ko, (t, n) => (n ? n.toUpperCase() : ""))),
  qo = /\B([A-Z])/g,
  at = gn((e) => e.replace(qo, "-$1").toLowerCase()),
  br = gn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Sn = gn((e) => (e ? `on${br(e)}` : "")),
  tt = (e, t) => !Object.is(e, t),
  Rn = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t);
  },
  xr = (e, t, n, s = !1) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      writable: s,
      value: n,
    });
  },
  Go = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Ps;
const Er = () =>
  Ps ||
  (Ps =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : {});
function ss(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = se(s) ? Jo(s) : ss(s);
      if (r) for (const o in r) t[o] = r[o];
    }
    return t;
  } else if (se(e) || te(e)) return e;
}
const zo = /;(?![^(]*\))/g,
  Qo = /:([^]+)/,
  Yo = /\/\*[^]*?\*\//g;
function Jo(e) {
  const t = {};
  return (
    e
      .replace(Yo, "")
      .split(zo)
      .forEach((n) => {
        if (n) {
          const s = n.split(Qo);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function rs(e) {
  let t = "";
  if (se(e)) t = e;
  else if (D(e))
    for (let n = 0; n < e.length; n++) {
      const s = rs(e[n]);
      s && (t += s + " ");
    }
  else if (te(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const Xo =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Zo = Zn(Xo);
function wr(e) {
  return !!e || e === "";
}
/**
 * @vue/reactivity v3.5.6
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let ye;
class ei {
  constructor(t = !1) {
    ((this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this._isPaused = !1),
      (this.parent = ye),
      !t &&
        ye &&
        (this.index = (ye.scopes || (ye.scopes = [])).push(this) - 1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = ye;
      try {
        return ((ye = this), t());
      } finally {
        ye = n;
      }
    }
  }
  on() {
    ye = this;
  }
  off() {
    ye = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      ((this.parent = void 0), (this._active = !1));
    }
  }
}
function ti() {
  return ye;
}
let Y;
const Pn = new WeakSet();
class Sr {
  constructor(t) {
    ((this.fn = t),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      ye && ye.active && ye.effects.push(this));
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 &&
      ((this.flags &= -65), Pn.has(this) && (Pn.delete(this), this.trigger()));
  }
  notify() {
    (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || Pr(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    ((this.flags |= 2), Cs(this), Cr(this));
    const t = Y,
      n = Re;
    ((Y = this), (Re = !0));
    try {
      return this.fn();
    } finally {
      (Or(this), (Y = t), (Re = n), (this.flags &= -3));
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) ls(t);
      ((this.deps = this.depsTail = void 0),
        Cs(this),
        this.onStop && this.onStop(),
        (this.flags &= -2));
    }
  }
  trigger() {
    this.flags & 64
      ? Pn.add(this)
      : this.scheduler
        ? this.scheduler()
        : this.runIfDirty();
  }
  runIfDirty() {
    Dn(this) && this.run();
  }
  get dirty() {
    return Dn(this);
  }
}
let Rr = 0,
  $t;
function Pr(e) {
  ((e.flags |= 8), (e.next = $t), ($t = e));
}
function os() {
  Rr++;
}
function is() {
  if (--Rr > 0) return;
  let e;
  for (; $t; ) {
    let t = $t;
    for ($t = void 0; t; ) {
      const n = t.next;
      if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Cr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    ((t.version = -1),
      (t.prevActiveLink = t.dep.activeLink),
      (t.dep.activeLink = t));
}
function Or(e) {
  let t,
    n = e.depsTail,
    s = n;
  for (; s; ) {
    const r = s.prevDep;
    (s.version === -1 ? (s === n && (n = r), ls(s), ni(s)) : (t = s),
      (s.dep.activeLink = s.prevActiveLink),
      (s.prevActiveLink = void 0),
      (s = r));
  }
  ((e.deps = t), (e.depsTail = n));
}
function Dn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (
      t.dep.version !== t.version ||
      (t.dep.computed && (Ar(t.dep.computed) || t.dep.version !== t.version))
    )
      return !0;
  return !!e._dirty;
}
function Ar(e) {
  if (
    (e.flags & 4 && !(e.flags & 16)) ||
    ((e.flags &= -17), e.globalVersion === Ut)
  )
    return;
  e.globalVersion = Ut;
  const t = e.dep;
  if (((e.flags |= 2), t.version > 0 && !e.isSSR && e.deps && !Dn(e))) {
    e.flags &= -3;
    return;
  }
  const n = Y,
    s = Re;
  ((Y = e), (Re = !0));
  try {
    Cr(e);
    const r = e.fn(e._value);
    (t.version === 0 || tt(r, e._value)) && ((e._value = r), t.version++);
  } catch (r) {
    throw (t.version++, r);
  } finally {
    ((Y = n), (Re = s), Or(e), (e.flags &= -3));
  }
}
function ls(e) {
  const { dep: t, prevSub: n, nextSub: s } = e;
  if (
    (n && ((n.nextSub = s), (e.prevSub = void 0)),
    s && ((s.prevSub = n), (e.nextSub = void 0)),
    t.subs === e && (t.subs = n),
    !t.subs && t.computed)
  ) {
    t.computed.flags &= -5;
    for (let r = t.computed.deps; r; r = r.nextDep) ls(r);
  }
}
function ni(e) {
  const { prevDep: t, nextDep: n } = e;
  (t && ((t.nextDep = n), (e.prevDep = void 0)),
    n && ((n.prevDep = t), (e.nextDep = void 0)));
}
let Re = !0;
const Tr = [];
function nt() {
  (Tr.push(Re), (Re = !1));
}
function st() {
  const e = Tr.pop();
  Re = e === void 0 ? !0 : e;
}
function Cs(e) {
  const { cleanup: t } = e;
  if (((e.cleanup = void 0), t)) {
    const n = Y;
    Y = void 0;
    try {
      t();
    } finally {
      Y = n;
    }
  }
}
let Ut = 0;
class si {
  constructor(t, n) {
    ((this.sub = t),
      (this.dep = n),
      (this.version = n.version),
      (this.nextDep =
        this.prevDep =
        this.nextSub =
        this.prevSub =
        this.prevActiveLink =
          void 0));
  }
}
class cs {
  constructor(t) {
    ((this.computed = t),
      (this.version = 0),
      (this.activeLink = void 0),
      (this.subs = void 0));
  }
  track(t) {
    if (!Y || !Re || Y === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Y)
      ((n = this.activeLink = new si(Y, this)),
        Y.deps
          ? ((n.prevDep = Y.depsTail),
            (Y.depsTail.nextDep = n),
            (Y.depsTail = n))
          : (Y.deps = Y.depsTail = n),
        Y.flags & 4 && Ir(n));
    else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
      const s = n.nextDep;
      ((s.prevDep = n.prevDep),
        n.prevDep && (n.prevDep.nextDep = s),
        (n.prevDep = Y.depsTail),
        (n.nextDep = void 0),
        (Y.depsTail.nextDep = n),
        (Y.depsTail = n),
        Y.deps === n && (Y.deps = s));
    }
    return n;
  }
  trigger(t) {
    (this.version++, Ut++, this.notify(t));
  }
  notify(t) {
    os();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      is();
    }
  }
}
function Ir(e) {
  const t = e.dep.computed;
  if (t && !e.dep.subs) {
    t.flags |= 20;
    for (let s = t.deps; s; s = s.nextDep) Ir(s);
  }
  const n = e.dep.subs;
  (n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e));
}
const jn = new WeakMap(),
  ct = Symbol(""),
  Bn = Symbol(""),
  Vt = Symbol("");
function ce(e, t, n) {
  if (Re && Y) {
    let s = jn.get(e);
    s || jn.set(e, (s = new Map()));
    let r = s.get(n);
    (r || s.set(n, (r = new cs())), r.track());
  }
}
function Ke(e, t, n, s, r, o) {
  const i = jn.get(e);
  if (!i) {
    Ut++;
    return;
  }
  const f = (c) => {
    c && c.trigger();
  };
  if ((os(), t === "clear")) i.forEach(f);
  else {
    const c = D(e),
      h = c && ns(n);
    if (c && n === "length") {
      const a = Number(s);
      i.forEach((d, p) => {
        (p === "length" || p === Vt || (!Rt(p) && p >= a)) && f(d);
      });
    } else
      switch ((n !== void 0 && f(i.get(n)), h && f(i.get(Vt)), t)) {
        case "add":
          c ? h && f(i.get("length")) : (f(i.get(ct)), Mt(e) && f(i.get(Bn)));
          break;
        case "delete":
          c || (f(i.get(ct)), Mt(e) && f(i.get(Bn)));
          break;
        case "set":
          Mt(e) && f(i.get(ct));
          break;
      }
  }
  is();
}
function gt(e) {
  const t = k(e);
  return t === e ? t : (ce(t, "iterate", Vt), Pe(e) ? t : t.map(ue));
}
function fs(e) {
  return (ce((e = k(e)), "iterate", Vt), e);
}
const ri = {
  __proto__: null,
  [Symbol.iterator]() {
    return Cn(this, Symbol.iterator, ue);
  },
  concat(...e) {
    return gt(this).concat(...e.map((t) => (D(t) ? gt(t) : t)));
  },
  entries() {
    return Cn(this, "entries", (e) => ((e[1] = ue(e[1])), e));
  },
  every(e, t) {
    return je(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return je(this, "filter", e, t, (n) => n.map(ue), arguments);
  },
  find(e, t) {
    return je(this, "find", e, t, ue, arguments);
  },
  findIndex(e, t) {
    return je(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return je(this, "findLast", e, t, ue, arguments);
  },
  findLastIndex(e, t) {
    return je(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return je(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return On(this, "includes", e);
  },
  indexOf(...e) {
    return On(this, "indexOf", e);
  },
  join(e) {
    return gt(this).join(e);
  },
  lastIndexOf(...e) {
    return On(this, "lastIndexOf", e);
  },
  map(e, t) {
    return je(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ot(this, "pop");
  },
  push(...e) {
    return Ot(this, "push", e);
  },
  reduce(e, ...t) {
    return Os(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Os(this, "reduceRight", e, t);
  },
  shift() {
    return Ot(this, "shift");
  },
  some(e, t) {
    return je(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ot(this, "splice", e);
  },
  toReversed() {
    return gt(this).toReversed();
  },
  toSorted(e) {
    return gt(this).toSorted(e);
  },
  toSpliced(...e) {
    return gt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ot(this, "unshift", e);
  },
  values() {
    return Cn(this, "values", ue);
  },
};
function Cn(e, t, n) {
  const s = fs(e),
    r = s[t]();
  return (
    s !== e &&
      !Pe(e) &&
      ((r._next = r.next),
      (r.next = () => {
        const o = r._next();
        return (o.value && (o.value = n(o.value)), o);
      })),
    r
  );
}
const oi = Array.prototype;
function je(e, t, n, s, r, o) {
  const i = fs(e),
    f = i !== e && !Pe(e),
    c = i[t];
  if (c !== oi[t]) {
    const d = c.apply(e, o);
    return f ? ue(d) : d;
  }
  let h = n;
  i !== e &&
    (f
      ? (h = function (d, p) {
          return n.call(this, ue(d), p, e);
        })
      : n.length > 2 &&
        (h = function (d, p) {
          return n.call(this, d, p, e);
        }));
  const a = c.call(i, h, s);
  return f && r ? r(a) : a;
}
function Os(e, t, n, s) {
  const r = fs(e);
  let o = n;
  return (
    r !== e &&
      (Pe(e)
        ? n.length > 3 &&
          (o = function (i, f, c) {
            return n.call(this, i, f, c, e);
          })
        : (o = function (i, f, c) {
            return n.call(this, i, ue(f), c, e);
          })),
    r[t](o, ...s)
  );
}
function On(e, t, n) {
  const s = k(e);
  ce(s, "iterate", Vt);
  const r = s[t](...n);
  return (r === -1 || r === !1) && hs(n[0])
    ? ((n[0] = k(n[0])), s[t](...n))
    : r;
}
function Ot(e, t, n = []) {
  (nt(), os());
  const s = k(e)[t].apply(e, n);
  return (is(), st(), s);
}
const ii = Zn("__proto__,__v_isRef,__isVue"),
  Mr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Rt),
  );
function li(e) {
  Rt(e) || (e = String(e));
  const t = k(this);
  return (ce(t, "has", e), t.hasOwnProperty(e));
}
class Fr {
  constructor(t = !1, n = !1) {
    ((this._isReadonly = t), (this._isShallow = n));
  }
  get(t, n, s) {
    const r = this._isReadonly,
      o = this._isShallow;
    if (n === "__v_isReactive") return !r;
    if (n === "__v_isReadonly") return r;
    if (n === "__v_isShallow") return o;
    if (n === "__v_raw")
      return s === (r ? (o ? bi : Hr) : o ? Lr : Nr).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(s)
        ? t
        : void 0;
    const i = D(t);
    if (!r) {
      let c;
      if (i && (c = ri[n])) return c;
      if (n === "hasOwnProperty") return li;
    }
    const f = Reflect.get(t, n, le(t) ? t : s);
    return (Rt(n) ? Mr.has(n) : ii(n)) || (r || ce(t, "get", n), o)
      ? f
      : le(f)
        ? i && ns(n)
          ? f
          : f.value
        : te(f)
          ? r
            ? jr(f)
            : _n(f)
          : f;
  }
}
class $r extends Fr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const c = ut(o);
      if (
        (!Pe(s) && !ut(s) && ((o = k(o)), (s = k(s))), !D(t) && le(o) && !le(s))
      )
        return c ? !1 : ((o.value = s), !0);
    }
    const i = D(t) && ns(n) ? Number(n) < t.length : W(t, n),
      f = Reflect.set(t, n, s, le(t) ? t : r);
    return (
      t === k(r) && (i ? tt(s, o) && Ke(t, "set", n, s) : Ke(t, "add", n, s)),
      f
    );
  }
  deleteProperty(t, n) {
    const s = W(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return (r && s && Ke(t, "delete", n, void 0), r);
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return ((!Rt(n) || !Mr.has(n)) && ce(t, "has", n), s);
  }
  ownKeys(t) {
    return (ce(t, "iterate", D(t) ? "length" : ct), Reflect.ownKeys(t));
  }
}
class ci extends Fr {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const fi = new $r(),
  ui = new ci(),
  ai = new $r(!0);
const us = (e) => e,
  mn = (e) => Reflect.getPrototypeOf(e);
function Xt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = k(e),
    o = k(t);
  n || (tt(t, o) && ce(r, "get", t), ce(r, "get", o));
  const { has: i } = mn(r),
    f = s ? us : n ? ps : ue;
  if (i.call(r, t)) return f(e.get(t));
  if (i.call(r, o)) return f(e.get(o));
  e !== r && e.get(t);
}
function Zt(e, t = !1) {
  const n = this.__v_raw,
    s = k(n),
    r = k(e);
  return (
    t || (tt(e, r) && ce(s, "has", e), ce(s, "has", r)),
    e === r ? n.has(e) : n.has(e) || n.has(r)
  );
}
function en(e, t = !1) {
  return (
    (e = e.__v_raw),
    !t && ce(k(e), "iterate", ct),
    Reflect.get(e, "size", e)
  );
}
function As(e, t = !1) {
  !t && !Pe(e) && !ut(e) && (e = k(e));
  const n = k(this);
  return (mn(n).has.call(n, e) || (n.add(e), Ke(n, "add", e, e)), this);
}
function Ts(e, t, n = !1) {
  !n && !Pe(t) && !ut(t) && (t = k(t));
  const s = k(this),
    { has: r, get: o } = mn(s);
  let i = r.call(s, e);
  i || ((e = k(e)), (i = r.call(s, e)));
  const f = o.call(s, e);
  return (
    s.set(e, t),
    i ? tt(t, f) && Ke(s, "set", e, t) : Ke(s, "add", e, t),
    this
  );
}
function Is(e) {
  const t = k(this),
    { has: n, get: s } = mn(t);
  let r = n.call(t, e);
  (r || ((e = k(e)), (r = n.call(t, e))), s && s.call(t, e));
  const o = t.delete(e);
  return (r && Ke(t, "delete", e, void 0), o);
}
function Ms() {
  const e = k(this),
    t = e.size !== 0,
    n = e.clear();
  return (t && Ke(e, "clear", void 0, void 0), n);
}
function tn(e, t) {
  return function (s, r) {
    const o = this,
      i = o.__v_raw,
      f = k(i),
      c = t ? us : e ? ps : ue;
    return (
      !e && ce(f, "iterate", ct),
      i.forEach((h, a) => s.call(r, c(h), c(a), o))
    );
  };
}
function nn(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      o = k(r),
      i = Mt(o),
      f = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      h = r[e](...s),
      a = n ? us : t ? ps : ue;
    return (
      !t && ce(o, "iterate", c ? Bn : ct),
      {
        next() {
          const { value: d, done: p } = h.next();
          return p
            ? { value: d, done: p }
            : { value: f ? [a(d[0]), a(d[1])] : a(d), done: p };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Qe(e) {
  return function (...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function di() {
  const e = {
      get(o) {
        return Xt(this, o);
      },
      get size() {
        return en(this);
      },
      has: Zt,
      add: As,
      set: Ts,
      delete: Is,
      clear: Ms,
      forEach: tn(!1, !1),
    },
    t = {
      get(o) {
        return Xt(this, o, !1, !0);
      },
      get size() {
        return en(this);
      },
      has: Zt,
      add(o) {
        return As.call(this, o, !0);
      },
      set(o, i) {
        return Ts.call(this, o, i, !0);
      },
      delete: Is,
      clear: Ms,
      forEach: tn(!1, !0),
    },
    n = {
      get(o) {
        return Xt(this, o, !0);
      },
      get size() {
        return en(this, !0);
      },
      has(o) {
        return Zt.call(this, o, !0);
      },
      add: Qe("add"),
      set: Qe("set"),
      delete: Qe("delete"),
      clear: Qe("clear"),
      forEach: tn(!0, !1),
    },
    s = {
      get(o) {
        return Xt(this, o, !0, !0);
      },
      get size() {
        return en(this, !0);
      },
      has(o) {
        return Zt.call(this, o, !0);
      },
      add: Qe("add"),
      set: Qe("set"),
      delete: Qe("delete"),
      clear: Qe("clear"),
      forEach: tn(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      ((e[o] = nn(o, !1, !1)),
        (n[o] = nn(o, !0, !1)),
        (t[o] = nn(o, !1, !0)),
        (s[o] = nn(o, !0, !0)));
    }),
    [e, n, t, s]
  );
}
const [hi, pi, gi, mi] = di();
function as(e, t) {
  const n = t ? (e ? mi : gi) : e ? pi : hi;
  return (s, r, o) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
        ? e
        : r === "__v_raw"
          ? s
          : Reflect.get(W(n, r) && r in s ? n : s, r, o);
}
const _i = { get: as(!1, !1) },
  yi = { get: as(!1, !0) },
  vi = { get: as(!0, !1) };
const Nr = new WeakMap(),
  Lr = new WeakMap(),
  Hr = new WeakMap(),
  bi = new WeakMap();
function xi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ei(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : xi(Ko(e));
}
function _n(e) {
  return ut(e) ? e : ds(e, !1, fi, _i, Nr);
}
function Dr(e) {
  return ds(e, !1, ai, yi, Lr);
}
function jr(e) {
  return ds(e, !0, ui, vi, Hr);
}
function ds(e, t, n, s, r) {
  if (!te(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = r.get(e);
  if (o) return o;
  const i = Ei(e);
  if (i === 0) return e;
  const f = new Proxy(e, i === 2 ? s : n);
  return (r.set(e, f), f);
}
function Nt(e) {
  return ut(e) ? Nt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ut(e) {
  return !!(e && e.__v_isReadonly);
}
function Pe(e) {
  return !!(e && e.__v_isShallow);
}
function hs(e) {
  return e ? !!e.__v_raw : !1;
}
function k(e) {
  const t = e && e.__v_raw;
  return t ? k(t) : e;
}
function wi(e) {
  return (
    !W(e, "__v_skip") && Object.isExtensible(e) && xr(e, "__v_skip", !0),
    e
  );
}
const ue = (e) => (te(e) ? _n(e) : e),
  ps = (e) => (te(e) ? jr(e) : e);
function le(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Si(e) {
  return Br(e, !1);
}
function Ri(e) {
  return Br(e, !0);
}
function Br(e, t) {
  return le(e) ? e : new Pi(e, t);
}
class Pi {
  constructor(t, n) {
    ((this.dep = new cs()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = n ? t : k(t)),
      (this._value = n ? t : ue(t)),
      (this.__v_isShallow = n));
  }
  get value() {
    return (this.dep.track(), this._value);
  }
  set value(t) {
    const n = this._rawValue,
      s = this.__v_isShallow || Pe(t) || ut(t);
    ((t = s ? t : k(t)),
      tt(t, n) &&
        ((this._rawValue = t),
        (this._value = s ? t : ue(t)),
        this.dep.trigger()));
  }
}
function vt(e) {
  return le(e) ? e.value : e;
}
const Ci = {
  get: (e, t, n) => (t === "__v_raw" ? e : vt(Reflect.get(e, t, n))),
  set: (e, t, n, s) => {
    const r = e[t];
    return le(r) && !le(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function Ur(e) {
  return Nt(e) ? e : new Proxy(e, Ci);
}
class Oi {
  constructor(t, n, s) {
    ((this.fn = t),
      (this.setter = n),
      (this._value = void 0),
      (this.dep = new cs(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = Ut - 1),
      (this.effect = this),
      (this.__v_isReadonly = !n),
      (this.isSSR = s));
  }
  notify() {
    if (((this.flags |= 16), !(this.flags & 8) && Y !== this))
      return (Pr(this), !0);
  }
  get value() {
    const t = this.dep.track();
    return (Ar(this), t && (t.version = this.dep.version), this._value);
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Ai(e, t, n = !1) {
  let s, r;
  return (j(e) ? (s = e) : ((s = e.get), (r = e.set)), new Oi(s, r, n));
}
const sn = {},
  fn = new WeakMap();
let lt;
function Ti(e, t = !1, n = lt) {
  if (n) {
    let s = fn.get(n);
    (s || fn.set(n, (s = [])), s.push(e));
  }
}
function Ii(e, t, n = X) {
  const {
      immediate: s,
      deep: r,
      once: o,
      scheduler: i,
      augmentJob: f,
      call: c,
    } = n,
    h = (I) => (r ? I : Pe(I) || r === !1 || r === 0 ? et(I, 1) : et(I));
  let a,
    d,
    p,
    m,
    O = !1,
    A = !1;
  if (
    (le(e)
      ? ((d = () => e.value), (O = Pe(e)))
      : Nt(e)
        ? ((d = () => h(e)), (O = !0))
        : D(e)
          ? ((A = !0),
            (O = e.some((I) => Nt(I) || Pe(I))),
            (d = () =>
              e.map((I) => {
                if (le(I)) return I.value;
                if (Nt(I)) return h(I);
                if (j(I)) return c ? c(I, 2) : I();
              })))
          : j(e)
            ? t
              ? (d = c ? () => c(e, 2) : e)
              : (d = () => {
                  if (p) {
                    nt();
                    try {
                      p();
                    } finally {
                      st();
                    }
                  }
                  const I = lt;
                  lt = a;
                  try {
                    return c ? c(e, 3, [m]) : e(m);
                  } finally {
                    lt = I;
                  }
                })
            : (d = Se),
    t && r)
  ) {
    const I = d,
      Q = r === !0 ? 1 / 0 : r;
    d = () => et(I(), Q);
  }
  const B = ti(),
    $ = () => {
      (a.stop(), B && ts(B.effects, a));
    };
  if (o && t) {
    const I = t;
    t = (...Q) => {
      (I(...Q), $());
    };
  }
  let F = A ? new Array(e.length).fill(sn) : sn;
  const N = (I) => {
    if (!(!(a.flags & 1) || (!a.dirty && !I)))
      if (t) {
        const Q = a.run();
        if (r || O || (A ? Q.some((re, ee) => tt(re, F[ee])) : tt(Q, F))) {
          p && p();
          const re = lt;
          lt = a;
          try {
            const ee = [Q, F === sn ? void 0 : A && F[0] === sn ? [] : F, m];
            (c ? c(t, 3, ee) : t(...ee), (F = Q));
          } finally {
            lt = re;
          }
        }
      } else a.run();
  };
  return (
    f && f(N),
    (a = new Sr(d)),
    (a.scheduler = i ? () => i(N, !1) : N),
    (m = (I) => Ti(I, !1, a)),
    (p = a.onStop =
      () => {
        const I = fn.get(a);
        if (I) {
          if (c) c(I, 4);
          else for (const Q of I) Q();
          fn.delete(a);
        }
      }),
    t ? (s ? N(!0) : (F = a.run())) : i ? i(N.bind(null, !0), !0) : a.run(),
    ($.pause = a.pause.bind(a)),
    ($.resume = a.resume.bind(a)),
    ($.stop = $),
    $
  );
}
function et(e, t = 1 / 0, n) {
  if (t <= 0 || !te(e) || e.__v_skip || ((n = n || new Set()), n.has(e)))
    return e;
  if ((n.add(e), t--, le(e))) et(e.value, t, n);
  else if (D(e)) for (let s = 0; s < e.length; s++) et(e[s], t, n);
  else if (Uo(e) || Mt(e))
    e.forEach((s) => {
      et(s, t, n);
    });
  else if (Wo(e)) {
    for (const s in e) et(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && et(e[s], t, n);
  }
  return e;
}
/**
 * @vue/runtime-core v3.5.6
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Qt(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    yn(r, t, n);
  }
}
function He(e, t, n, s) {
  if (j(e)) {
    const r = Qt(e, t, n, s);
    return (
      r &&
        vr(r) &&
        r.catch((o) => {
          yn(o, t, n);
        }),
      r
    );
  }
  if (D(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++) r.push(He(e[o], t, n, s));
    return r;
  }
}
function yn(e, t, n, s = !0) {
  const r = t ? t.vnode : null,
    { errorHandler: o, throwUnhandledErrorInProduction: i } =
      (t && t.appContext.config) || X;
  if (t) {
    let f = t.parent;
    const c = t.proxy,
      h = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; f; ) {
      const a = f.ec;
      if (a) {
        for (let d = 0; d < a.length; d++) if (a[d](e, c, h) === !1) return;
      }
      f = f.parent;
    }
    if (o) {
      (nt(), Qt(o, null, 10, [e, c, h]), st());
      return;
    }
  }
  Mi(e, n, r, s, i);
}
function Mi(e, t, n, s = !0, r = !1) {
  if (r) throw e;
  console.error(e);
}
let Kt = !1,
  Un = !1;
const ae = [];
let $e = 0;
const bt = [];
let Je = null,
  mt = 0;
const Vr = Promise.resolve();
let gs = null;
function Kr(e) {
  const t = gs || Vr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Fi(e) {
  let t = Kt ? $e + 1 : 0,
    n = ae.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1,
      r = ae[s],
      o = Wt(r);
    o < e || (o === e && r.flags & 2) ? (t = s + 1) : (n = s);
  }
  return t;
}
function ms(e) {
  if (!(e.flags & 1)) {
    const t = Wt(e),
      n = ae[ae.length - 1];
    (!n || (!(e.flags & 2) && t >= Wt(n)) ? ae.push(e) : ae.splice(Fi(t), 0, e),
      (e.flags |= 1),
      Wr());
  }
}
function Wr() {
  !Kt && !Un && ((Un = !0), (gs = Vr.then(qr)));
}
function $i(e) {
  (D(e)
    ? bt.push(...e)
    : Je && e.id === -1
      ? Je.splice(mt + 1, 0, e)
      : e.flags & 1 || (bt.push(e), (e.flags |= 1)),
    Wr());
}
function Fs(e, t, n = Kt ? $e + 1 : 0) {
  for (; n < ae.length; n++) {
    const s = ae[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid) continue;
      (ae.splice(n, 1),
        n--,
        s.flags & 4 && (s.flags &= -2),
        s(),
        (s.flags &= -2));
    }
  }
}
function kr(e) {
  if (bt.length) {
    const t = [...new Set(bt)].sort((n, s) => Wt(n) - Wt(s));
    if (((bt.length = 0), Je)) {
      Je.push(...t);
      return;
    }
    for (Je = t, mt = 0; mt < Je.length; mt++) {
      const n = Je[mt];
      (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2));
    }
    ((Je = null), (mt = 0));
  }
}
const Wt = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
function qr(e) {
  ((Un = !1), (Kt = !0));
  const t = Se;
  try {
    for ($e = 0; $e < ae.length; $e++) {
      const n = ae[$e];
      n &&
        !(n.flags & 8) &&
        (n.flags & 4 && (n.flags &= -2),
        Qt(n, n.i, n.i ? 15 : 14),
        (n.flags &= -2));
    }
  } finally {
    for (; $e < ae.length; $e++) {
      const n = ae[$e];
      n && (n.flags &= -2);
    }
    (($e = 0),
      (ae.length = 0),
      kr(),
      (Kt = !1),
      (gs = null),
      (ae.length || bt.length) && qr());
  }
}
let Le = null,
  Gr = null;
function un(e) {
  const t = Le;
  return ((Le = e), (Gr = (e && e.type.__scopeId) || null), t);
}
function Ni(e, t = Le, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && Us(-1);
    const o = un(t);
    let i;
    try {
      i = e(...r);
    } finally {
      (un(o), s._d && Us(1));
    }
    return i;
  };
  return ((s._n = !0), (s._c = !0), (s._d = !0), s);
}
function ot(e, t, n, s) {
  const r = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const f = r[i];
    o && (f.oldValue = o[i].value);
    let c = f.dir[s];
    c && (nt(), He(c, n, 8, [e.el, f, e, t]), st());
  }
}
const Li = Symbol("_vte"),
  Hi = (e) => e.__isTeleport;
function _s(e, t) {
  e.shapeFlag & 6 && e.component
    ? ((e.transition = t), _s(e.component.subTree, t))
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
}
/*! #__NO_SIDE_EFFECTS__ */ function zr(e, t) {
  return j(e) ? (() => oe({ name: e.name }, t, { setup: e }))() : e;
}
function Qr(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Vn(e, t, n, s, r = !1) {
  if (D(e)) {
    e.forEach((O, A) => Vn(O, t && (D(t) ? t[A] : t), n, s, r));
    return;
  }
  if (Lt(s) && !r) return;
  const o = s.shapeFlag & 4 ? xs(s.component) : s.el,
    i = r ? null : o,
    { i: f, r: c } = e,
    h = t && t.r,
    a = f.refs === X ? (f.refs = {}) : f.refs,
    d = f.setupState,
    p = k(d),
    m = d === X ? () => !1 : (O) => W(p, O);
  if (
    (h != null &&
      h !== c &&
      (se(h)
        ? ((a[h] = null), m(h) && (d[h] = null))
        : le(h) && (h.value = null)),
    j(c))
  )
    Qt(c, f, 12, [i, a]);
  else {
    const O = se(c),
      A = le(c);
    if (O || A) {
      const B = () => {
        if (e.f) {
          const $ = O ? (m(c) ? d[c] : a[c]) : c.value;
          r
            ? D($) && ts($, o)
            : D($)
              ? $.includes(o) || $.push(o)
              : O
                ? ((a[c] = [o]), m(c) && (d[c] = a[c]))
                : ((c.value = [o]), e.k && (a[e.k] = c.value));
        } else
          O
            ? ((a[c] = i), m(c) && (d[c] = i))
            : A && ((c.value = i), e.k && (a[e.k] = i));
      };
      i ? ((B.id = -1), _e(B, n)) : B();
    }
  }
}
const Lt = (e) => !!e.type.__asyncLoader,
  Yr = (e) => e.type.__isKeepAlive;
function Di(e, t) {
  Jr(e, "a", t);
}
function ji(e, t) {
  Jr(e, "da", t);
}
function Jr(e, t, n = de) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((vn(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      (Yr(r.parent.vnode) && Bi(s, t, n, r), (r = r.parent));
  }
}
function Bi(e, t, n, s) {
  const r = vn(t, e, s, !0);
  Xr(() => {
    ts(s[t], r);
  }, n);
}
function vn(e, t, n = de, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          nt();
          const f = Yt(n),
            c = He(t, n, e, i);
          return (f(), st(), c);
        });
    return (s ? r.unshift(o) : r.push(o), o);
  }
}
const ke =
    (e) =>
    (t, n = de) => {
      (!En || e === "sp") && vn(e, (...s) => t(...s), n);
    },
  Ui = ke("bm"),
  Vi = ke("m"),
  Ki = ke("bu"),
  Wi = ke("u"),
  ki = ke("bum"),
  Xr = ke("um"),
  qi = ke("sp"),
  Gi = ke("rtg"),
  zi = ke("rtc");
function Qi(e, t = de) {
  vn("ec", e, t);
}
const Yi = Symbol.for("v-ndc"),
  Kn = (e) => (e ? (xo(e) ? xs(e) : Kn(e.parent)) : null),
  Ht = oe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Kn(e.parent),
    $root: (e) => Kn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ys(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        ms(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = Kr.bind(e.proxy)),
    $watch: (e) => _l.bind(e),
  }),
  An = (e, t) => e !== X && !e.__isScriptSetup && W(e, t),
  Ji = {
    get({ _: e }, t) {
      if (t === "__v_skip") return !0;
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: o,
        accessCache: i,
        type: f,
        appContext: c,
      } = e;
      let h;
      if (t[0] !== "$") {
        const m = i[t];
        if (m !== void 0)
          switch (m) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (An(s, t)) return ((i[t] = 1), s[t]);
          if (r !== X && W(r, t)) return ((i[t] = 2), r[t]);
          if ((h = e.propsOptions[0]) && W(h, t)) return ((i[t] = 3), o[t]);
          if (n !== X && W(n, t)) return ((i[t] = 4), n[t]);
          Wn && (i[t] = 0);
        }
      }
      const a = Ht[t];
      let d, p;
      if (a) return (t === "$attrs" && ce(e.attrs, "get", ""), a(e));
      if ((d = f.__cssModules) && (d = d[t])) return d;
      if (n !== X && W(n, t)) return ((i[t] = 4), n[t]);
      if (((p = c.config.globalProperties), W(p, t))) return p[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: o } = e;
      return An(r, t)
        ? ((r[t] = n), !0)
        : s !== X && W(s, t)
          ? ((s[t] = n), !0)
          : W(e.props, t) || (t[0] === "$" && t.slice(1) in e)
            ? !1
            : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          propsOptions: o,
        },
      },
      i,
    ) {
      let f;
      return (
        !!n[i] ||
        (e !== X && W(e, i)) ||
        An(t, i) ||
        ((f = o[0]) && W(f, i)) ||
        W(s, i) ||
        W(Ht, i) ||
        W(r.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : W(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function $s(e) {
  return D(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Wn = !0;
function Xi(e) {
  const t = ys(e),
    n = e.proxy,
    s = e.ctx;
  ((Wn = !1), t.beforeCreate && Ns(t.beforeCreate, e, "bc"));
  const {
    data: r,
    computed: o,
    methods: i,
    watch: f,
    provide: c,
    inject: h,
    created: a,
    beforeMount: d,
    mounted: p,
    beforeUpdate: m,
    updated: O,
    activated: A,
    deactivated: B,
    beforeDestroy: $,
    beforeUnmount: F,
    destroyed: N,
    unmounted: I,
    render: Q,
    renderTracked: re,
    renderTriggered: ee,
    errorCaptured: Oe,
    serverPrefetch: qe,
    expose: Ae,
    inheritAttrs: Ge,
    components: rt,
    directives: Te,
    filters: Pt,
  } = t;
  if ((h && Zi(h, s, null), i))
    for (const z in i) {
      const V = i[z];
      j(V) && (s[z] = V.bind(n));
    }
  if (r) {
    const z = r.call(n, n);
    te(z) && (e.data = _n(z));
  }
  if (((Wn = !0), o))
    for (const z in o) {
      const V = o[z],
        De = j(V) ? V.bind(n, n) : j(V.get) ? V.get.bind(n, n) : Se,
        ze = !j(V) && j(V.set) ? V.set.bind(n) : Se,
        Ie = Ee({ get: De, set: ze });
      Object.defineProperty(s, z, {
        enumerable: !0,
        configurable: !0,
        get: () => Ie.value,
        set: (he) => (Ie.value = he),
      });
    }
  if (f) for (const z in f) Zr(f[z], s, n, z);
  if (c) {
    const z = j(c) ? c.call(n) : c;
    Reflect.ownKeys(z).forEach((V) => {
      rn(V, z[V]);
    });
  }
  a && Ns(a, e, "c");
  function ne(z, V) {
    D(V) ? V.forEach((De) => z(De.bind(n))) : V && z(V.bind(n));
  }
  if (
    (ne(Ui, d),
    ne(Vi, p),
    ne(Ki, m),
    ne(Wi, O),
    ne(Di, A),
    ne(ji, B),
    ne(Qi, Oe),
    ne(zi, re),
    ne(Gi, ee),
    ne(ki, F),
    ne(Xr, I),
    ne(qi, qe),
    D(Ae))
  )
    if (Ae.length) {
      const z = e.exposed || (e.exposed = {});
      Ae.forEach((V) => {
        Object.defineProperty(z, V, {
          get: () => n[V],
          set: (De) => (n[V] = De),
        });
      });
    } else e.exposed || (e.exposed = {});
  (Q && e.render === Se && (e.render = Q),
    Ge != null && (e.inheritAttrs = Ge),
    rt && (e.components = rt),
    Te && (e.directives = Te),
    qe && Qr(e));
}
function Zi(e, t, n = Se) {
  D(e) && (e = kn(e));
  for (const s in e) {
    const r = e[s];
    let o;
    (te(r)
      ? "default" in r
        ? (o = We(r.from || s, r.default, !0))
        : (o = We(r.from || s))
      : (o = We(r)),
      le(o)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[s] = o));
  }
}
function Ns(e, t, n) {
  He(D(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Zr(e, t, n, s) {
  let r = s.includes(".") ? po(n, s) : () => n[s];
  if (se(e)) {
    const o = t[e];
    j(o) && on(r, o);
  } else if (j(e)) on(r, e.bind(n));
  else if (te(e))
    if (D(e)) e.forEach((o) => Zr(o, t, n, s));
    else {
      const o = j(e.handler) ? e.handler.bind(n) : t[e.handler];
      j(o) && on(r, o, e);
    }
}
function ys(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    f = o.get(t);
  let c;
  return (
    f
      ? (c = f)
      : !r.length && !n && !s
        ? (c = t)
        : ((c = {}),
          r.length && r.forEach((h) => an(c, h, i, !0)),
          an(c, t, i)),
    te(t) && o.set(t, c),
    c
  );
}
function an(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  (o && an(e, o, n, !0), r && r.forEach((i) => an(e, i, n, !0)));
  for (const i in t)
    if (!(s && i === "expose")) {
      const f = el[i] || (n && n[i]);
      e[i] = f ? f(e[i], t[i]) : t[i];
    }
  return e;
}
const el = {
  data: Ls,
  props: Hs,
  emits: Hs,
  methods: It,
  computed: It,
  beforeCreate: fe,
  created: fe,
  beforeMount: fe,
  mounted: fe,
  beforeUpdate: fe,
  updated: fe,
  beforeDestroy: fe,
  beforeUnmount: fe,
  destroyed: fe,
  unmounted: fe,
  activated: fe,
  deactivated: fe,
  errorCaptured: fe,
  serverPrefetch: fe,
  components: It,
  directives: It,
  watch: nl,
  provide: Ls,
  inject: tl,
};
function Ls(e, t) {
  return t
    ? e
      ? function () {
          return oe(
            j(e) ? e.call(this, this) : e,
            j(t) ? t.call(this, this) : t,
          );
        }
      : t
    : e;
}
function tl(e, t) {
  return It(kn(e), kn(t));
}
function kn(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function fe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function It(e, t) {
  return e ? oe(Object.create(null), e, t) : t;
}
function Hs(e, t) {
  return e
    ? D(e) && D(t)
      ? [...new Set([...e, ...t])]
      : oe(Object.create(null), $s(e), $s(t ?? {}))
    : t;
}
function nl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = oe(Object.create(null), e);
  for (const s in t) n[s] = fe(e[s], t[s]);
  return n;
}
function eo() {
  return {
    app: null,
    config: {
      isNativeTag: jo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let sl = 0;
function rl(e, t) {
  return function (s, r = null) {
    (j(s) || (s = oe({}, s)), r != null && !te(r) && (r = null));
    const o = eo(),
      i = new WeakSet(),
      f = [];
    let c = !1;
    const h = (o.app = {
      _uid: sl++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: jl,
      get config() {
        return o.config;
      },
      set config(a) {},
      use(a, ...d) {
        return (
          i.has(a) ||
            (a && j(a.install)
              ? (i.add(a), a.install(h, ...d))
              : j(a) && (i.add(a), a(h, ...d))),
          h
        );
      },
      mixin(a) {
        return (o.mixins.includes(a) || o.mixins.push(a), h);
      },
      component(a, d) {
        return d ? ((o.components[a] = d), h) : o.components[a];
      },
      directive(a, d) {
        return d ? ((o.directives[a] = d), h) : o.directives[a];
      },
      mount(a, d, p) {
        if (!c) {
          const m = h._ceVNode || we(s, r);
          return (
            (m.appContext = o),
            p === !0 ? (p = "svg") : p === !1 && (p = void 0),
            d && t ? t(m, a) : e(m, a, p),
            (c = !0),
            (h._container = a),
            (a.__vue_app__ = h),
            xs(m.component)
          );
        }
      },
      onUnmount(a) {
        f.push(a);
      },
      unmount() {
        c &&
          (He(f, h._instance, 16),
          e(null, h._container),
          delete h._container.__vue_app__);
      },
      provide(a, d) {
        return ((o.provides[a] = d), h);
      },
      runWithContext(a) {
        const d = xt;
        xt = h;
        try {
          return a();
        } finally {
          xt = d;
        }
      },
    });
    return h;
  };
}
let xt = null;
function rn(e, t) {
  if (de) {
    let n = de.provides;
    const s = de.parent && de.parent.provides;
    (s === n && (n = de.provides = Object.create(s)), (n[e] = t));
  }
}
function We(e, t, n = !1) {
  const s = de || Le;
  if (s || xt) {
    const r = xt
      ? xt._context.provides
      : s
        ? s.parent == null
          ? s.vnode.appContext && s.vnode.appContext.provides
          : s.parent.provides
        : void 0;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && j(t) ? t.call(s && s.proxy) : t;
  }
}
const to = {},
  no = () => Object.create(to),
  so = (e) => Object.getPrototypeOf(e) === to;
function ol(e, t, n, s = !1) {
  const r = {},
    o = no();
  ((e.propsDefaults = Object.create(null)), ro(e, t, r, o));
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  (n ? (e.props = s ? r : Dr(r)) : e.type.props ? (e.props = r) : (e.props = o),
    (e.attrs = o));
}
function il(e, t, n, s) {
  const {
      props: r,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    f = k(r),
    [c] = e.propsOptions;
  let h = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const a = e.vnode.dynamicProps;
      for (let d = 0; d < a.length; d++) {
        let p = a[d];
        if (bn(e.emitsOptions, p)) continue;
        const m = t[p];
        if (c)
          if (W(o, p)) m !== o[p] && ((o[p] = m), (h = !0));
          else {
            const O = ft(p);
            r[O] = qn(c, f, O, m, e, !1);
          }
        else m !== o[p] && ((o[p] = m), (h = !0));
      }
    }
  } else {
    ro(e, t, r, o) && (h = !0);
    let a;
    for (const d in f)
      (!t || (!W(t, d) && ((a = at(d)) === d || !W(t, a)))) &&
        (c
          ? n &&
            (n[d] !== void 0 || n[a] !== void 0) &&
            (r[d] = qn(c, f, d, void 0, e, !0))
          : delete r[d]);
    if (o !== f) for (const d in o) (!t || !W(t, d)) && (delete o[d], (h = !0));
  }
  h && Ke(e.attrs, "set", "");
}
function ro(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1,
    f;
  if (t)
    for (let c in t) {
      if (Ft(c)) continue;
      const h = t[c];
      let a;
      r && W(r, (a = ft(c)))
        ? !o || !o.includes(a)
          ? (n[a] = h)
          : ((f || (f = {}))[a] = h)
        : bn(e.emitsOptions, c) ||
          ((!(c in s) || h !== s[c]) && ((s[c] = h), (i = !0)));
    }
  if (o) {
    const c = k(n),
      h = f || X;
    for (let a = 0; a < o.length; a++) {
      const d = o[a];
      n[d] = qn(r, c, d, h[d], e, !W(h, d));
    }
  }
  return i;
}
function qn(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const f = W(i, "default");
    if (f && s === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && j(c)) {
        const { propsDefaults: h } = r;
        if (n in h) s = h[n];
        else {
          const a = Yt(r);
          ((s = h[n] = c.call(null, t)), a());
        }
      } else s = c;
      r.ce && r.ce._setProp(n, s);
    }
    i[0] &&
      (o && !f ? (s = !1) : i[1] && (s === "" || s === at(n)) && (s = !0));
  }
  return s;
}
const ll = new WeakMap();
function oo(e, t, n = !1) {
  const s = n ? ll : t.propsCache,
    r = s.get(e);
  if (r) return r;
  const o = e.props,
    i = {},
    f = [];
  let c = !1;
  if (!j(e)) {
    const a = (d) => {
      c = !0;
      const [p, m] = oo(d, t, !0);
      (oe(i, p), m && f.push(...m));
    };
    (!n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a));
  }
  if (!o && !c) return (te(e) && s.set(e, yt), yt);
  if (D(o))
    for (let a = 0; a < o.length; a++) {
      const d = ft(o[a]);
      Ds(d) && (i[d] = X);
    }
  else if (o)
    for (const a in o) {
      const d = ft(a);
      if (Ds(d)) {
        const p = o[a],
          m = (i[d] = D(p) || j(p) ? { type: p } : oe({}, p)),
          O = m.type;
        let A = !1,
          B = !0;
        if (D(O))
          for (let $ = 0; $ < O.length; ++$) {
            const F = O[$],
              N = j(F) && F.name;
            if (N === "Boolean") {
              A = !0;
              break;
            } else N === "String" && (B = !1);
          }
        else A = j(O) && O.name === "Boolean";
        ((m[0] = A), (m[1] = B), (A || W(m, "default")) && f.push(d));
      }
    }
  const h = [i, f];
  return (te(e) && s.set(e, h), h);
}
function Ds(e) {
  return e[0] !== "$" && !Ft(e);
}
const io = (e) => e[0] === "_" || e === "$stable",
  vs = (e) => (D(e) ? e.map(Ne) : [Ne(e)]),
  cl = (e, t, n) => {
    if (t._n) return t;
    const s = Ni((...r) => vs(t(...r)), n);
    return ((s._c = !1), s);
  },
  lo = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (io(r)) continue;
      const o = e[r];
      if (j(o)) t[r] = cl(r, o, s);
      else if (o != null) {
        const i = vs(o);
        t[r] = () => i;
      }
    }
  },
  co = (e, t) => {
    const n = vs(t);
    e.slots.default = () => n;
  },
  fo = (e, t, n) => {
    for (const s in t) (n || s !== "_") && (e[s] = t[s]);
  },
  fl = (e, t, n) => {
    const s = (e.slots = no());
    if (e.vnode.shapeFlag & 32) {
      const r = t._;
      r ? (fo(s, t, n), n && xr(s, "_", r, !0)) : lo(t, s);
    } else t && co(e, t);
  },
  ul = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let o = !0,
      i = X;
    if (s.shapeFlag & 32) {
      const f = t._;
      (f
        ? n && f === 1
          ? (o = !1)
          : fo(r, t, n)
        : ((o = !t.$stable), lo(t, r)),
        (i = t));
    } else t && (co(e, t), (i = { default: 1 }));
    if (o) for (const f in r) !io(f) && i[f] == null && delete r[f];
  },
  _e = Sl;
function al(e) {
  return dl(e);
}
function dl(e, t) {
  const n = Er();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: o,
      createElement: i,
      createText: f,
      createComment: c,
      setText: h,
      setElementText: a,
      parentNode: d,
      nextSibling: p,
      setScopeId: m = Se,
      insertStaticContent: O,
    } = e,
    A = (
      l,
      u,
      g,
      v = null,
      _ = null,
      b = null,
      S = void 0,
      w = null,
      E = !!u.dynamicChildren,
    ) => {
      if (l === u) return;
      (l && !At(l, u) && ((v = y(l)), he(l, _, b, !0), (l = null)),
        u.patchFlag === -2 && ((E = !1), (u.dynamicChildren = null)));
      const { type: x, ref: L, shapeFlag: P } = u;
      switch (x) {
        case xn:
          B(l, u, g, v);
          break;
        case kt:
          $(l, u, g, v);
          break;
        case Mn:
          l == null && F(u, g, v, S);
          break;
        case Ve:
          rt(l, u, g, v, _, b, S, w, E);
          break;
        default:
          P & 1
            ? Q(l, u, g, v, _, b, S, w, E)
            : P & 6
              ? Te(l, u, g, v, _, b, S, w, E)
              : (P & 64 || P & 128) && x.process(l, u, g, v, _, b, S, w, E, T);
      }
      L != null && _ && Vn(L, l && l.ref, b, u || l, !u);
    },
    B = (l, u, g, v) => {
      if (l == null) s((u.el = f(u.children)), g, v);
      else {
        const _ = (u.el = l.el);
        u.children !== l.children && h(_, u.children);
      }
    },
    $ = (l, u, g, v) => {
      l == null ? s((u.el = c(u.children || "")), g, v) : (u.el = l.el);
    },
    F = (l, u, g, v) => {
      [l.el, l.anchor] = O(l.children, u, g, v, l.el, l.anchor);
    },
    N = ({ el: l, anchor: u }, g, v) => {
      let _;
      for (; l && l !== u; ) ((_ = p(l)), s(l, g, v), (l = _));
      s(u, g, v);
    },
    I = ({ el: l, anchor: u }) => {
      let g;
      for (; l && l !== u; ) ((g = p(l)), r(l), (l = g));
      r(u);
    },
    Q = (l, u, g, v, _, b, S, w, E) => {
      (u.type === "svg" ? (S = "svg") : u.type === "math" && (S = "mathml"),
        l == null ? re(u, g, v, _, b, S, w, E) : qe(l, u, _, b, S, w, E));
    },
    re = (l, u, g, v, _, b, S, w) => {
      let E, x;
      const { props: L, shapeFlag: P, transition: M, dirs: H } = l;
      if (
        ((E = l.el = i(l.type, b, L && L.is, L)),
        P & 8
          ? a(E, l.children)
          : P & 16 && Oe(l.children, E, null, v, _, Tn(l, b), S, w),
        H && ot(l, null, v, "created"),
        ee(E, l, l.scopeId, S, v),
        L)
      ) {
        for (const J in L) J !== "value" && !Ft(J) && o(E, J, null, L[J], b, v);
        ("value" in L && o(E, "value", null, L.value, b),
          (x = L.onVnodeBeforeMount) && Fe(x, v, l));
      }
      H && ot(l, null, v, "beforeMount");
      const U = hl(_, M);
      (U && M.beforeEnter(E),
        s(E, u, g),
        ((x = L && L.onVnodeMounted) || U || H) &&
          _e(() => {
            (x && Fe(x, v, l), U && M.enter(E), H && ot(l, null, v, "mounted"));
          }, _));
    },
    ee = (l, u, g, v, _) => {
      if ((g && m(l, g), v)) for (let b = 0; b < v.length; b++) m(l, v[b]);
      if (_) {
        let b = _.subTree;
        if (
          u === b ||
          (mo(b.type) && (b.ssContent === u || b.ssFallback === u))
        ) {
          const S = _.vnode;
          ee(l, S, S.scopeId, S.slotScopeIds, _.parent);
        }
      }
    },
    Oe = (l, u, g, v, _, b, S, w, E = 0) => {
      for (let x = E; x < l.length; x++) {
        const L = (l[x] = w ? Xe(l[x]) : Ne(l[x]));
        A(null, L, u, g, v, _, b, S, w);
      }
    },
    qe = (l, u, g, v, _, b, S) => {
      const w = (u.el = l.el);
      let { patchFlag: E, dynamicChildren: x, dirs: L } = u;
      E |= l.patchFlag & 16;
      const P = l.props || X,
        M = u.props || X;
      let H;
      if (
        (g && it(g, !1),
        (H = M.onVnodeBeforeUpdate) && Fe(H, g, u, l),
        L && ot(u, l, g, "beforeUpdate"),
        g && it(g, !0),
        ((P.innerHTML && M.innerHTML == null) ||
          (P.textContent && M.textContent == null)) &&
          a(w, ""),
        x
          ? Ae(l.dynamicChildren, x, w, g, v, Tn(u, _), b)
          : S || V(l, u, w, null, g, v, Tn(u, _), b, !1),
        E > 0)
      ) {
        if (E & 16) Ge(w, P, M, g, _);
        else if (
          (E & 2 && P.class !== M.class && o(w, "class", null, M.class, _),
          E & 4 && o(w, "style", P.style, M.style, _),
          E & 8)
        ) {
          const U = u.dynamicProps;
          for (let J = 0; J < U.length; J++) {
            const q = U[J],
              pe = P[q],
              ie = M[q];
            (ie !== pe || q === "value") && o(w, q, pe, ie, _, g);
          }
        }
        E & 1 && l.children !== u.children && a(w, u.children);
      } else !S && x == null && Ge(w, P, M, g, _);
      ((H = M.onVnodeUpdated) || L) &&
        _e(() => {
          (H && Fe(H, g, u, l), L && ot(u, l, g, "updated"));
        }, v);
    },
    Ae = (l, u, g, v, _, b, S) => {
      for (let w = 0; w < u.length; w++) {
        const E = l[w],
          x = u[w],
          L =
            E.el && (E.type === Ve || !At(E, x) || E.shapeFlag & 70)
              ? d(E.el)
              : g;
        A(E, x, L, null, v, _, b, S, !0);
      }
    },
    Ge = (l, u, g, v, _) => {
      if (u !== g) {
        if (u !== X)
          for (const b in u) !Ft(b) && !(b in g) && o(l, b, u[b], null, _, v);
        for (const b in g) {
          if (Ft(b)) continue;
          const S = g[b],
            w = u[b];
          S !== w && b !== "value" && o(l, b, w, S, _, v);
        }
        "value" in g && o(l, "value", u.value, g.value, _);
      }
    },
    rt = (l, u, g, v, _, b, S, w, E) => {
      const x = (u.el = l ? l.el : f("")),
        L = (u.anchor = l ? l.anchor : f(""));
      let { patchFlag: P, dynamicChildren: M, slotScopeIds: H } = u;
      (H && (w = w ? w.concat(H) : H),
        l == null
          ? (s(x, g, v), s(L, g, v), Oe(u.children || [], g, L, _, b, S, w, E))
          : P > 0 && P & 64 && M && l.dynamicChildren
            ? (Ae(l.dynamicChildren, M, g, _, b, S, w),
              (u.key != null || (_ && u === _.subTree)) && uo(l, u, !0))
            : V(l, u, g, L, _, b, S, w, E));
    },
    Te = (l, u, g, v, _, b, S, w, E) => {
      ((u.slotScopeIds = w),
        l == null
          ? u.shapeFlag & 512
            ? _.ctx.activate(u, g, v, S, E)
            : Pt(u, g, v, _, b, S, E)
          : dt(l, u, E));
    },
    Pt = (l, u, g, v, _, b, S) => {
      const w = (l.component = Fl(l, v, _));
      if ((Yr(l) && (w.ctx.renderer = T), $l(w, !1, S), w.asyncDep)) {
        if ((_ && _.registerDep(w, ne, S), !l.el)) {
          const E = (w.subTree = we(kt));
          $(null, E, u, g);
        }
      } else ne(w, l, u, g, _, b, S);
    },
    dt = (l, u, g) => {
      const v = (u.component = l.component);
      if (El(l, u, g))
        if (v.asyncDep && !v.asyncResolved) {
          z(v, u, g);
          return;
        } else ((v.next = u), v.update());
      else ((u.el = l.el), (v.vnode = u));
    },
    ne = (l, u, g, v, _, b, S) => {
      const w = () => {
        if (l.isMounted) {
          let { next: P, bu: M, u: H, parent: U, vnode: J } = l;
          {
            const ge = ao(l);
            if (ge) {
              (P && ((P.el = J.el), z(l, P, S)),
                ge.asyncDep.then(() => {
                  l.isUnmounted || w();
                }));
              return;
            }
          }
          let q = P,
            pe;
          (it(l, !1),
            P ? ((P.el = J.el), z(l, P, S)) : (P = J),
            M && Rn(M),
            (pe = P.props && P.props.onVnodeBeforeUpdate) && Fe(pe, U, P, J),
            it(l, !0));
          const ie = In(l),
            xe = l.subTree;
          ((l.subTree = ie),
            A(xe, ie, d(xe.el), y(xe), l, _, b),
            (P.el = ie.el),
            q === null && wl(l, ie.el),
            H && _e(H, _),
            (pe = P.props && P.props.onVnodeUpdated) &&
              _e(() => Fe(pe, U, P, J), _));
        } else {
          let P;
          const { el: M, props: H } = u,
            { bm: U, m: J, parent: q, root: pe, type: ie } = l,
            xe = Lt(u);
          if (
            (it(l, !1),
            U && Rn(U),
            !xe && (P = H && H.onVnodeBeforeMount) && Fe(P, q, u),
            it(l, !0),
            M && Z)
          ) {
            const ge = () => {
              ((l.subTree = In(l)), Z(M, l.subTree, l, _, null));
            };
            xe && ie.__asyncHydrate ? ie.__asyncHydrate(M, l, ge) : ge();
          } else {
            pe.ce && pe.ce._injectChildStyle(ie);
            const ge = (l.subTree = In(l));
            (A(null, ge, g, v, l, _, b), (u.el = ge.el));
          }
          if ((J && _e(J, _), !xe && (P = H && H.onVnodeMounted))) {
            const ge = u;
            _e(() => Fe(P, q, ge), _);
          }
          ((u.shapeFlag & 256 ||
            (q && Lt(q.vnode) && q.vnode.shapeFlag & 256)) &&
            l.a &&
            _e(l.a, _),
            (l.isMounted = !0),
            (u = g = v = null));
        }
      };
      l.scope.on();
      const E = (l.effect = new Sr(w));
      l.scope.off();
      const x = (l.update = E.run.bind(E)),
        L = (l.job = E.runIfDirty.bind(E));
      ((L.i = l), (L.id = l.uid), (E.scheduler = () => ms(L)), it(l, !0), x());
    },
    z = (l, u, g) => {
      u.component = l;
      const v = l.vnode.props;
      ((l.vnode = u),
        (l.next = null),
        il(l, u.props, v, g),
        ul(l, u.children, g),
        nt(),
        Fs(l),
        st());
    },
    V = (l, u, g, v, _, b, S, w, E = !1) => {
      const x = l && l.children,
        L = l ? l.shapeFlag : 0,
        P = u.children,
        { patchFlag: M, shapeFlag: H } = u;
      if (M > 0) {
        if (M & 128) {
          ze(x, P, g, v, _, b, S, w, E);
          return;
        } else if (M & 256) {
          De(x, P, g, v, _, b, S, w, E);
          return;
        }
      }
      H & 8
        ? (L & 16 && be(x, _, b), P !== x && a(g, P))
        : L & 16
          ? H & 16
            ? ze(x, P, g, v, _, b, S, w, E)
            : be(x, _, b, !0)
          : (L & 8 && a(g, ""), H & 16 && Oe(P, g, v, _, b, S, w, E));
    },
    De = (l, u, g, v, _, b, S, w, E) => {
      ((l = l || yt), (u = u || yt));
      const x = l.length,
        L = u.length,
        P = Math.min(x, L);
      let M;
      for (M = 0; M < P; M++) {
        const H = (u[M] = E ? Xe(u[M]) : Ne(u[M]));
        A(l[M], H, g, null, _, b, S, w, E);
      }
      x > L ? be(l, _, b, !0, !1, P) : Oe(u, g, v, _, b, S, w, E, P);
    },
    ze = (l, u, g, v, _, b, S, w, E) => {
      let x = 0;
      const L = u.length;
      let P = l.length - 1,
        M = L - 1;
      for (; x <= P && x <= M; ) {
        const H = l[x],
          U = (u[x] = E ? Xe(u[x]) : Ne(u[x]));
        if (At(H, U)) A(H, U, g, null, _, b, S, w, E);
        else break;
        x++;
      }
      for (; x <= P && x <= M; ) {
        const H = l[P],
          U = (u[M] = E ? Xe(u[M]) : Ne(u[M]));
        if (At(H, U)) A(H, U, g, null, _, b, S, w, E);
        else break;
        (P--, M--);
      }
      if (x > P) {
        if (x <= M) {
          const H = M + 1,
            U = H < L ? u[H].el : v;
          for (; x <= M; )
            (A(null, (u[x] = E ? Xe(u[x]) : Ne(u[x])), g, U, _, b, S, w, E),
              x++);
        }
      } else if (x > M) for (; x <= P; ) (he(l[x], _, b, !0), x++);
      else {
        const H = x,
          U = x,
          J = new Map();
        for (x = U; x <= M; x++) {
          const me = (u[x] = E ? Xe(u[x]) : Ne(u[x]));
          me.key != null && J.set(me.key, x);
        }
        let q,
          pe = 0;
        const ie = M - U + 1;
        let xe = !1,
          ge = 0;
        const Ct = new Array(ie);
        for (x = 0; x < ie; x++) Ct[x] = 0;
        for (x = H; x <= P; x++) {
          const me = l[x];
          if (pe >= ie) {
            he(me, _, b, !0);
            continue;
          }
          let Me;
          if (me.key != null) Me = J.get(me.key);
          else
            for (q = U; q <= M; q++)
              if (Ct[q - U] === 0 && At(me, u[q])) {
                Me = q;
                break;
              }
          Me === void 0
            ? he(me, _, b, !0)
            : ((Ct[Me - U] = x + 1),
              Me >= ge ? (ge = Me) : (xe = !0),
              A(me, u[Me], g, null, _, b, S, w, E),
              pe++);
        }
        const Ss = xe ? pl(Ct) : yt;
        for (q = Ss.length - 1, x = ie - 1; x >= 0; x--) {
          const me = U + x,
            Me = u[me],
            Rs = me + 1 < L ? u[me + 1].el : v;
          Ct[x] === 0
            ? A(null, Me, g, Rs, _, b, S, w, E)
            : xe && (q < 0 || x !== Ss[q] ? Ie(Me, g, Rs, 2) : q--);
        }
      }
    },
    Ie = (l, u, g, v, _ = null) => {
      const { el: b, type: S, transition: w, children: E, shapeFlag: x } = l;
      if (x & 6) {
        Ie(l.component.subTree, u, g, v);
        return;
      }
      if (x & 128) {
        l.suspense.move(u, g, v);
        return;
      }
      if (x & 64) {
        S.move(l, u, g, T);
        return;
      }
      if (S === Ve) {
        s(b, u, g);
        for (let P = 0; P < E.length; P++) Ie(E[P], u, g, v);
        s(l.anchor, u, g);
        return;
      }
      if (S === Mn) {
        N(l, u, g);
        return;
      }
      if (v !== 2 && x & 1 && w)
        if (v === 0) (w.beforeEnter(b), s(b, u, g), _e(() => w.enter(b), _));
        else {
          const { leave: P, delayLeave: M, afterLeave: H } = w,
            U = () => s(b, u, g),
            J = () => {
              P(b, () => {
                (U(), H && H());
              });
            };
          M ? M(b, U, J) : J();
        }
      else s(b, u, g);
    },
    he = (l, u, g, v = !1, _ = !1) => {
      const {
        type: b,
        props: S,
        ref: w,
        children: E,
        dynamicChildren: x,
        shapeFlag: L,
        patchFlag: P,
        dirs: M,
        cacheIndex: H,
      } = l;
      if (
        (P === -2 && (_ = !1),
        w != null && Vn(w, null, g, l, !0),
        H != null && (u.renderCache[H] = void 0),
        L & 256)
      ) {
        u.ctx.deactivate(l);
        return;
      }
      const U = L & 1 && M,
        J = !Lt(l);
      let q;
      if ((J && (q = S && S.onVnodeBeforeUnmount) && Fe(q, u, l), L & 6))
        Jt(l.component, g, v);
      else {
        if (L & 128) {
          l.suspense.unmount(g, v);
          return;
        }
        (U && ot(l, null, u, "beforeUnmount"),
          L & 64
            ? l.type.remove(l, u, g, T, v)
            : x && !x.hasOnce && (b !== Ve || (P > 0 && P & 64))
              ? be(x, u, g, !1, !0)
              : ((b === Ve && P & 384) || (!_ && L & 16)) && be(E, u, g),
          v && ht(l));
      }
      ((J && (q = S && S.onVnodeUnmounted)) || U) &&
        _e(() => {
          (q && Fe(q, u, l), U && ot(l, null, u, "unmounted"));
        }, g);
    },
    ht = (l) => {
      const { type: u, el: g, anchor: v, transition: _ } = l;
      if (u === Ve) {
        pt(g, v);
        return;
      }
      if (u === Mn) {
        I(l);
        return;
      }
      const b = () => {
        (r(g), _ && !_.persisted && _.afterLeave && _.afterLeave());
      };
      if (l.shapeFlag & 1 && _ && !_.persisted) {
        const { leave: S, delayLeave: w } = _,
          E = () => S(g, b);
        w ? w(l.el, b, E) : E();
      } else b();
    },
    pt = (l, u) => {
      let g;
      for (; l !== u; ) ((g = p(l)), r(l), (l = g));
      r(u);
    },
    Jt = (l, u, g) => {
      const { bum: v, scope: _, job: b, subTree: S, um: w, m: E, a: x } = l;
      (js(E),
        js(x),
        v && Rn(v),
        _.stop(),
        b && ((b.flags |= 8), he(S, l, u, g)),
        w && _e(w, u),
        _e(() => {
          l.isUnmounted = !0;
        }, u),
        u &&
          u.pendingBranch &&
          !u.isUnmounted &&
          l.asyncDep &&
          !l.asyncResolved &&
          l.suspenseId === u.pendingId &&
          (u.deps--, u.deps === 0 && u.resolve()));
    },
    be = (l, u, g, v = !1, _ = !1, b = 0) => {
      for (let S = b; S < l.length; S++) he(l[S], u, g, v, _);
    },
    y = (l) => {
      if (l.shapeFlag & 6) return y(l.component.subTree);
      if (l.shapeFlag & 128) return l.suspense.next();
      const u = p(l.anchor || l.el),
        g = u && u[Li];
      return g ? p(g) : u;
    };
  let C = !1;
  const R = (l, u, g) => {
      (l == null
        ? u._vnode && he(u._vnode, null, null, !0)
        : A(u._vnode || null, l, u, null, null, null, g),
        (u._vnode = l),
        C || ((C = !0), Fs(), kr(), (C = !1)));
    },
    T = {
      p: A,
      um: he,
      m: Ie,
      r: ht,
      mt: Pt,
      mc: Oe,
      pc: V,
      pbc: Ae,
      n: y,
      o: e,
    };
  let K, Z;
  return (t && ([K, Z] = t(T)), { render: R, hydrate: K, createApp: rl(R, K) });
}
function Tn({ type: e, props: t }, n) {
  return (n === "svg" && e === "foreignObject") ||
    (n === "mathml" &&
      e === "annotation-xml" &&
      t &&
      t.encoding &&
      t.encoding.includes("html"))
    ? void 0
    : n;
}
function it({ effect: e, job: t }, n) {
  n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
}
function hl(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function uo(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (D(s) && D(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let f = r[o];
      (f.shapeFlag & 1 &&
        !f.dynamicChildren &&
        ((f.patchFlag <= 0 || f.patchFlag === 32) &&
          ((f = r[o] = Xe(r[o])), (f.el = i.el)),
        !n && f.patchFlag !== -2 && uo(i, f)),
        f.type === xn && (f.el = i.el));
    }
}
function pl(e) {
  const t = e.slice(),
    n = [0];
  let s, r, o, i, f;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const h = e[s];
    if (h !== 0) {
      if (((r = n[n.length - 1]), e[r] < h)) {
        ((t[s] = r), n.push(s));
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        ((f = (o + i) >> 1), e[n[f]] < h ? (o = f + 1) : (i = f));
      h < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) ((n[o] = i), (i = t[i]));
  return n;
}
function ao(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : ao(t);
}
function js(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
const gl = Symbol.for("v-scx"),
  ml = () => We(gl);
function on(e, t, n) {
  return ho(e, t, n);
}
function ho(e, t, n = X) {
  const { immediate: s, deep: r, flush: o, once: i } = n,
    f = oe({}, n);
  let c;
  if (En)
    if (o === "sync") {
      const p = ml();
      c = p.__watcherHandles || (p.__watcherHandles = []);
    } else if (!t || s) f.once = !0;
    else {
      const p = () => {};
      return ((p.stop = Se), (p.resume = Se), (p.pause = Se), p);
    }
  const h = de;
  f.call = (p, m, O) => He(p, h, m, O);
  let a = !1;
  (o === "post"
    ? (f.scheduler = (p) => {
        _e(p, h && h.suspense);
      })
    : o !== "sync" &&
      ((a = !0),
      (f.scheduler = (p, m) => {
        m ? p() : ms(p);
      })),
    (f.augmentJob = (p) => {
      (t && (p.flags |= 4),
        a && ((p.flags |= 2), h && ((p.id = h.uid), (p.i = h))));
    }));
  const d = Ii(e, t, f);
  return (c && c.push(d), d);
}
function _l(e, t, n) {
  const s = this.proxy,
    r = se(e) ? (e.includes(".") ? po(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  j(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = Yt(this),
    f = ho(r, o.bind(s), n);
  return (i(), f);
}
function po(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
const yl = (e, t) =>
  t === "modelValue" || t === "model-value"
    ? e.modelModifiers
    : e[`${t}Modifiers`] || e[`${ft(t)}Modifiers`] || e[`${at(t)}Modifiers`];
function vl(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || X;
  let r = n;
  const o = t.startsWith("update:"),
    i = o && yl(s, t.slice(7));
  i &&
    (i.trim && (r = n.map((a) => (se(a) ? a.trim() : a))),
    i.number && (r = n.map(Go)));
  let f,
    c = s[(f = Sn(t))] || s[(f = Sn(ft(t)))];
  (!c && o && (c = s[(f = Sn(at(t)))]), c && He(c, e, 6, r));
  const h = s[f + "Once"];
  if (h) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[f]) return;
    ((e.emitted[f] = !0), He(h, e, 6, r));
  }
}
function go(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {},
    f = !1;
  if (!j(e)) {
    const c = (h) => {
      const a = go(h, t, !0);
      a && ((f = !0), oe(i, a));
    };
    (!n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c));
  }
  return !o && !f
    ? (te(e) && s.set(e, null), null)
    : (D(o) ? o.forEach((c) => (i[c] = null)) : oe(i, o),
      te(e) && s.set(e, i),
      i);
}
function bn(e, t) {
  return !e || !hn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      W(e, t[0].toLowerCase() + t.slice(1)) || W(e, at(t)) || W(e, t));
}
function In(e) {
  const {
      type: t,
      vnode: n,
      proxy: s,
      withProxy: r,
      propsOptions: [o],
      slots: i,
      attrs: f,
      emit: c,
      render: h,
      renderCache: a,
      props: d,
      data: p,
      setupState: m,
      ctx: O,
      inheritAttrs: A,
    } = e,
    B = un(e);
  let $, F;
  try {
    if (n.shapeFlag & 4) {
      const I = r || s,
        Q = I;
      (($ = Ne(h.call(Q, I, a, d, m, p, O))), (F = f));
    } else {
      const I = t;
      (($ = Ne(
        I.length > 1 ? I(d, { attrs: f, slots: i, emit: c }) : I(d, null),
      )),
        (F = t.props ? f : bl(f)));
    }
  } catch (I) {
    ((Dt.length = 0), yn(I, e, 1), ($ = we(kt)));
  }
  let N = $;
  if (F && A !== !1) {
    const I = Object.keys(F),
      { shapeFlag: Q } = N;
    I.length &&
      Q & 7 &&
      (o && I.some(es) && (F = xl(F, o)), (N = Et(N, F, !1, !0)));
  }
  return (
    n.dirs &&
      ((N = Et(N, null, !1, !0)),
      (N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs)),
    n.transition && _s(N, n.transition),
    ($ = N),
    un(B),
    $
  );
}
const bl = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || hn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  xl = (e, t) => {
    const n = {};
    for (const s in e) (!es(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function El(e, t, n) {
  const { props: s, children: r, component: o } = e,
    { props: i, children: f, patchFlag: c } = t,
    h = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return s ? Bs(s, i, h) : !!i;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let d = 0; d < a.length; d++) {
        const p = a[d];
        if (i[p] !== s[p] && !bn(h, p)) return !0;
      }
    }
  } else
    return (r || f) && (!f || !f.$stable)
      ? !0
      : s === i
        ? !1
        : s
          ? i
            ? Bs(s, i, h)
            : !0
          : !!i;
  return !1;
}
function Bs(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !bn(n, o)) return !0;
  }
  return !1;
}
function wl({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if ((s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e))
      (((e = t.vnode).el = n), (t = t.parent));
    else break;
  }
}
const mo = (e) => e.__isSuspense;
function Sl(e, t) {
  t && t.pendingBranch
    ? D(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : $i(e);
}
const Ve = Symbol.for("v-fgt"),
  xn = Symbol.for("v-txt"),
  kt = Symbol.for("v-cmt"),
  Mn = Symbol.for("v-stc"),
  Dt = [];
let ve = null;
function _o(e = !1) {
  Dt.push((ve = e ? null : []));
}
function Rl() {
  (Dt.pop(), (ve = Dt[Dt.length - 1] || null));
}
let qt = 1;
function Us(e) {
  ((qt += e), e < 0 && ve && (ve.hasOnce = !0));
}
function Pl(e) {
  return (
    (e.dynamicChildren = qt > 0 ? ve || yt : null),
    Rl(),
    qt > 0 && ve && ve.push(e),
    e
  );
}
function yo(e, t, n, s, r, o) {
  return Pl(bo(e, t, n, s, r, o, !0));
}
function Gn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function At(e, t) {
  return e.type === t.type && e.key === t.key;
}
const vo = ({ key: e }) => e ?? null,
  ln = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? se(e) || le(e) || j(e)
        ? { i: Le, r: e, k: t, f: !!n }
        : e
      : null
  );
function bo(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  o = e === Ve ? 0 : 1,
  i = !1,
  f = !1,
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && vo(t),
    ref: t && ln(t),
    scopeId: Gr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Le,
  };
  return (
    f
      ? (bs(c, n), o & 128 && e.normalize(c))
      : n && (c.shapeFlag |= se(n) ? 8 : 16),
    qt > 0 &&
      !i &&
      ve &&
      (c.patchFlag > 0 || o & 6) &&
      c.patchFlag !== 32 &&
      ve.push(c),
    c
  );
}
const we = Cl;
function Cl(e, t = null, n = null, s = 0, r = null, o = !1) {
  if (((!e || e === Yi) && (e = kt), Gn(e))) {
    const f = Et(e, t, !0);
    return (
      n && bs(f, n),
      qt > 0 &&
        !o &&
        ve &&
        (f.shapeFlag & 6 ? (ve[ve.indexOf(e)] = f) : ve.push(f)),
      (f.patchFlag = -2),
      f
    );
  }
  if ((Dl(e) && (e = e.__vccOpts), t)) {
    t = Ol(t);
    let { class: f, style: c } = t;
    (f && !se(f) && (t.class = rs(f)),
      te(c) && (hs(c) && !D(c) && (c = oe({}, c)), (t.style = ss(c))));
  }
  const i = se(e) ? 1 : mo(e) ? 128 : Hi(e) ? 64 : te(e) ? 4 : j(e) ? 2 : 0;
  return bo(e, t, n, s, r, i, o, !0);
}
function Ol(e) {
  return e ? (hs(e) || so(e) ? oe({}, e) : e) : null;
}
function Et(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: f, transition: c } = e,
    h = t ? Tl(r || {}, t) : r,
    a = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: h,
      key: h && vo(h),
      ref:
        t && t.ref
          ? n && o
            ? D(o)
              ? o.concat(ln(t))
              : [o, ln(t)]
            : ln(t)
          : o,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: f,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Ve ? (i === -1 ? 16 : i | 16) : i,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: c,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && Et(e.ssContent),
      ssFallback: e.ssFallback && Et(e.ssFallback),
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
    };
  return (c && s && _s(a, c.clone(a)), a);
}
function Al(e = " ", t = 0) {
  return we(xn, null, e, t);
}
function Ne(e) {
  return e == null || typeof e == "boolean"
    ? we(kt)
    : D(e)
      ? we(Ve, null, e.slice())
      : typeof e == "object"
        ? Xe(e)
        : we(xn, null, String(e));
}
function Xe(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Et(e);
}
function bs(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (D(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), bs(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !so(t)
        ? (t._ctx = Le)
        : r === 3 &&
          Le &&
          (Le.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    j(t)
      ? ((t = { default: t, _ctx: Le }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [Al(t)])) : (n = 8));
  ((e.children = t), (e.shapeFlag |= n));
}
function Tl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = rs([t.class, s.class]));
      else if (r === "style") t.style = ss([t.style, s.style]);
      else if (hn(r)) {
        const o = t[r],
          i = s[r];
        i &&
          o !== i &&
          !(D(o) && o.includes(i)) &&
          (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Fe(e, t, n, s = null) {
  He(e, t, 7, [n, s]);
}
const Il = eo();
let Ml = 0;
function Fl(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || Il,
    o = {
      uid: Ml++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new ei(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      ids: t ? t.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: oo(s, r),
      emitsOptions: go(s, r),
      emit: null,
      emitted: null,
      propsDefaults: X,
      inheritAttrs: s.inheritAttrs,
      ctx: X,
      data: X,
      props: X,
      attrs: X,
      slots: X,
      refs: X,
      setupState: X,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = vl.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let de = null,
  dn,
  zn;
{
  const e = Er(),
    t = (n, s) => {
      let r;
      return (
        (r = e[n]) || (r = e[n] = []),
        r.push(s),
        (o) => {
          r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
        }
      );
    };
  ((dn = t("__VUE_INSTANCE_SETTERS__", (n) => (de = n))),
    (zn = t("__VUE_SSR_SETTERS__", (n) => (En = n))));
}
const Yt = (e) => {
    const t = de;
    return (
      dn(e),
      e.scope.on(),
      () => {
        (e.scope.off(), dn(t));
      }
    );
  },
  Vs = () => {
    (de && de.scope.off(), dn(null));
  };
function xo(e) {
  return e.vnode.shapeFlag & 4;
}
let En = !1;
function $l(e, t = !1, n = !1) {
  t && zn(t);
  const { props: s, children: r } = e.vnode,
    o = xo(e);
  (ol(e, s, o, t), fl(e, r, n));
  const i = o ? Nl(e, t) : void 0;
  return (t && zn(!1), i);
}
function Nl(e, t) {
  const n = e.type;
  ((e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Ji)));
  const { setup: s } = n;
  if (s) {
    const r = (e.setupContext = s.length > 1 ? Hl(e) : null),
      o = Yt(e);
    nt();
    const i = Qt(s, e, 0, [e.props, r]);
    if ((st(), o(), vr(i))) {
      if ((Lt(e) || Qr(e), i.then(Vs, Vs), t))
        return i
          .then((f) => {
            Ks(e, f, t);
          })
          .catch((f) => {
            yn(f, e, 0);
          });
      e.asyncDep = i;
    } else Ks(e, i, t);
  } else Eo(e, t);
}
function Ks(e, t, n) {
  (j(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : te(t) && (e.setupState = Ur(t)),
    Eo(e, n));
}
let Ws;
function Eo(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Ws && !s.render) {
      const r = s.template || ys(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: f, compilerOptions: c } = s,
          h = oe(oe({ isCustomElement: o, delimiters: f }, i), c);
        s.render = Ws(r, h);
      }
    }
    e.render = s.render || Se;
  }
  {
    const r = Yt(e);
    nt();
    try {
      Xi(e);
    } finally {
      (st(), r());
    }
  }
}
const Ll = {
  get(e, t) {
    return (ce(e, "get", ""), e[t]);
  },
};
function Hl(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Ll),
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function xs(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(Ur(wi(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n];
            if (n in Ht) return Ht[n](e);
          },
          has(t, n) {
            return n in t || n in Ht;
          },
        }))
    : e.proxy;
}
function Dl(e) {
  return j(e) && "__vccOpts" in e;
}
const Ee = (e, t) => Ai(e, t, En);
function wo(e, t, n) {
  const s = arguments.length;
  return s === 2
    ? te(t) && !D(t)
      ? Gn(t)
        ? we(e, null, [t])
        : we(e, t)
      : we(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && Gn(n) && (n = [n]),
      we(e, t, n));
}
const jl = "3.5.6";
/**
 * @vue/runtime-dom v3.5.6
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Qn;
const ks = typeof window < "u" && window.trustedTypes;
if (ks)
  try {
    Qn = ks.createPolicy("vue", { createHTML: (e) => e });
  } catch {}
const So = Qn ? (e) => Qn.createHTML(e) : (e) => e,
  Bl = "http://www.w3.org/2000/svg",
  Ul = "http://www.w3.org/1998/Math/MathML",
  Ue = typeof document < "u" ? document : null,
  qs = Ue && Ue.createElement("template"),
  Vl = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r =
        t === "svg"
          ? Ue.createElementNS(Bl, e)
          : t === "mathml"
            ? Ue.createElementNS(Ul, e)
            : n
              ? Ue.createElement(e, { is: n })
              : Ue.createElement(e);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      );
    },
    createText: (e) => Ue.createTextNode(e),
    createComment: (e) => Ue.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Ue.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, r, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (r && (r === o || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === o || !(r = r.nextSibling));
        );
      else {
        qs.innerHTML = So(
          s === "svg"
            ? `<svg>${e}</svg>`
            : s === "mathml"
              ? `<math>${e}</math>`
              : e,
        );
        const f = qs.content;
        if (s === "svg" || s === "mathml") {
          const c = f.firstChild;
          for (; c.firstChild; ) f.appendChild(c.firstChild);
          f.removeChild(c);
        }
        t.insertBefore(f, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  Kl = Symbol("_vtc");
function Wl(e, t, n) {
  const s = e[Kl];
  (s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
        ? e.setAttribute("class", t)
        : (e.className = t));
}
const Gs = Symbol("_vod"),
  kl = Symbol("_vsh"),
  ql = Symbol(""),
  Gl = /(^|;)\s*display\s*:/;
function zl(e, t, n) {
  const s = e.style,
    r = se(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (se(t))
        for (const i of t.split(";")) {
          const f = i.slice(0, i.indexOf(":")).trim();
          n[f] == null && cn(s, f, "");
        }
      else for (const i in t) n[i] == null && cn(s, i, "");
    for (const i in n) (i === "display" && (o = !0), cn(s, i, n[i]));
  } else if (r) {
    if (t !== n) {
      const i = s[ql];
      (i && (n += ";" + i), (s.cssText = n), (o = Gl.test(n)));
    }
  } else t && e.removeAttribute("style");
  Gs in e && ((e[Gs] = o ? s.display : ""), e[kl] && (s.display = "none"));
}
const zs = /\s*!important$/;
function cn(e, t, n) {
  if (D(n)) n.forEach((s) => cn(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = Ql(e, t);
    zs.test(n)
      ? e.setProperty(at(s), n.replace(zs, ""), "important")
      : (e[s] = n);
  }
}
const Qs = ["Webkit", "Moz", "ms"],
  Fn = {};
function Ql(e, t) {
  const n = Fn[t];
  if (n) return n;
  let s = ft(t);
  if (s !== "filter" && s in e) return (Fn[t] = s);
  s = br(s);
  for (let r = 0; r < Qs.length; r++) {
    const o = Qs[r] + s;
    if (o in e) return (Fn[t] = o);
  }
  return t;
}
const Ys = "http://www.w3.org/1999/xlink";
function Js(e, t, n, s, r, o = Zo(t)) {
  s && t.startsWith("xlink:")
    ? n == null
      ? e.removeAttributeNS(Ys, t.slice(6, t.length))
      : e.setAttributeNS(Ys, t, n)
    : n == null || (o && !wr(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : Rt(n) ? String(n) : n);
}
function Yl(e, t, n, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? So(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && !r.includes("-")) {
    const i = r === "OPTION" ? e.getAttribute("value") || "" : e.value,
      f = n == null ? (e.type === "checkbox" ? "on" : "") : String(n);
    ((i !== f || !("_value" in e)) && (e.value = f),
      n == null && e.removeAttribute(t),
      (e._value = n));
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const i = typeof e[t];
    i === "boolean"
      ? (n = wr(n))
      : n == null && i === "string"
        ? ((n = ""), (o = !0))
        : i === "number" && ((n = 0), (o = !0));
  }
  try {
    e[t] = n;
  } catch {}
  o && e.removeAttribute(t);
}
function Jl(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Xl(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Xs = Symbol("_vei");
function Zl(e, t, n, s, r = null) {
  const o = e[Xs] || (e[Xs] = {}),
    i = o[t];
  if (s && i) i.value = s;
  else {
    const [f, c] = ec(t);
    if (s) {
      const h = (o[t] = sc(s, r));
      Jl(e, f, h, c);
    } else i && (Xl(e, f, i, c), (o[t] = void 0));
  }
}
const Zs = /(?:Once|Passive|Capture)$/;
function ec(e) {
  let t;
  if (Zs.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(Zs)); )
      ((e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0));
  }
  return [e[2] === ":" ? e.slice(3) : at(e.slice(2)), t];
}
let $n = 0;
const tc = Promise.resolve(),
  nc = () => $n || (tc.then(() => ($n = 0)), ($n = Date.now()));
function sc(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    He(rc(s, n.value), t, 5, [s]);
  };
  return ((n.value = e), (n.attached = nc()), n);
}
function rc(e, t) {
  if (D(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        (n.call(e), (e._stopped = !0));
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    );
  } else return t;
}
const er = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  oc = (e, t, n, s, r, o) => {
    const i = r === "svg";
    t === "class"
      ? Wl(e, s, i)
      : t === "style"
        ? zl(e, n, s)
        : hn(t)
          ? es(t) || Zl(e, t, n, s, o)
          : (
                t[0] === "."
                  ? ((t = t.slice(1)), !0)
                  : t[0] === "^"
                    ? ((t = t.slice(1)), !1)
                    : ic(e, t, s, i)
              )
            ? (Yl(e, t, s),
              !e.tagName.includes("-") &&
                (t === "value" || t === "checked" || t === "selected") &&
                Js(e, t, s, i, o, t !== "value"))
            : (t === "true-value"
                ? (e._trueValue = s)
                : t === "false-value" && (e._falseValue = s),
              Js(e, t, s, i));
  };
function ic(e, t, n, s) {
  if (s)
    return !!(
      t === "innerHTML" ||
      t === "textContent" ||
      (t in e && er(t) && j(n))
    );
  if (
    t === "spellcheck" ||
    t === "draggable" ||
    t === "translate" ||
    t === "form" ||
    (t === "list" && e.tagName === "INPUT") ||
    (t === "type" && e.tagName === "TEXTAREA")
  )
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return er(t) && se(n)
    ? !1
    : !!(t in e || (e._isVueCE && (/[A-Z]/.test(t) || !se(n))));
}
const lc = oe({ patchProp: oc }, Vl);
let tr;
function cc() {
  return tr || (tr = al(lc));
}
const fc = (...e) => {
  const t = cc().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = ac(s);
      if (!r) return;
      const o = t._component;
      (!j(o) && !o.render && !o.template && (o.template = r.innerHTML),
        r.nodeType === 1 && (r.textContent = ""));
      const i = n(r, !1, uc(r));
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function uc(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function ac(e) {
  return se(e) ? document.querySelector(e) : e;
}
const Ro = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n;
  },
  dc = {
    mounted() {
      this.openPdf();
    },
    methods: {
      openPdf() {
        const e = "curso-de-alquimia.pdf";
        window.open(
          `/pdf/curso-de-alquimia/${e}#title=Curso de Alquimia`,
          "_self",
        );
      },
    },
  };
function hc(e, t, n, s, r, o) {
  return ((document.title = "Curso de Alquimia"), _o(), yo("div"));
}
const pc = Ro(dc, [["render", hc]]);
/*!
 * vue-router v4.4.5
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */ const _t = typeof document < "u";
function Po(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function gc(e) {
  return (
    e.__esModule ||
    e[Symbol.toStringTag] === "Module" ||
    (e.default && Po(e.default))
  );
}
const G = Object.assign;
function Nn(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = Ce(r) ? r.map(e) : e(r);
  }
  return n;
}
const jt = () => {},
  Ce = Array.isArray,
  Co = /#/g,
  mc = /&/g,
  _c = /\//g,
  yc = /=/g,
  vc = /\?/g,
  Oo = /\+/g,
  bc = /%5B/g,
  xc = /%5D/g,
  Ao = /%5E/g,
  Ec = /%60/g,
  To = /%7B/g,
  wc = /%7C/g,
  Io = /%7D/g,
  Sc = /%20/g;
function Es(e) {
  return encodeURI("" + e)
    .replace(wc, "|")
    .replace(bc, "[")
    .replace(xc, "]");
}
function Rc(e) {
  return Es(e).replace(To, "{").replace(Io, "}").replace(Ao, "^");
}
function Yn(e) {
  return Es(e)
    .replace(Oo, "%2B")
    .replace(Sc, "+")
    .replace(Co, "%23")
    .replace(mc, "%26")
    .replace(Ec, "`")
    .replace(To, "{")
    .replace(Io, "}")
    .replace(Ao, "^");
}
function Pc(e) {
  return Yn(e).replace(yc, "%3D");
}
function Cc(e) {
  return Es(e).replace(Co, "%23").replace(vc, "%3F");
}
function Oc(e) {
  return e == null ? "" : Cc(e).replace(_c, "%2F");
}
function Gt(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
const Ac = /\/$/,
  Tc = (e) => e.replace(Ac, "");
function Ln(e, t, n = "/") {
  let s,
    r = {},
    o = "",
    i = "";
  const f = t.indexOf("#");
  let c = t.indexOf("?");
  return (
    f < c && f >= 0 && (c = -1),
    c > -1 &&
      ((s = t.slice(0, c)),
      (o = t.slice(c + 1, f > -1 ? f : t.length)),
      (r = e(o))),
    f > -1 && ((s = s || t.slice(0, f)), (i = t.slice(f, t.length))),
    (s = $c(s ?? t, n)),
    { fullPath: s + (o && "?") + o + i, path: s, query: r, hash: Gt(i) }
  );
}
function Ic(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function nr(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function Mc(e, t, n) {
  const s = t.matched.length - 1,
    r = n.matched.length - 1;
  return (
    s > -1 &&
    s === r &&
    wt(t.matched[s], n.matched[r]) &&
    Mo(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function wt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Mo(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!Fc(e[n], t[n])) return !1;
  return !0;
}
function Fc(e, t) {
  return Ce(e) ? sr(e, t) : Ce(t) ? sr(t, e) : e === t;
}
function sr(e, t) {
  return Ce(t)
    ? e.length === t.length && e.every((n, s) => n === t[s])
    : e.length === 1 && e[0] === t;
}
function $c(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    s = e.split("/"),
    r = s[s.length - 1];
  (r === ".." || r === ".") && s.push("");
  let o = n.length - 1,
    i,
    f;
  for (i = 0; i < s.length; i++)
    if (((f = s[i]), f !== "."))
      if (f === "..") o > 1 && o--;
      else break;
  return n.slice(0, o).join("/") + "/" + s.slice(i).join("/");
}
const Ye = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0,
};
var zt;
(function (e) {
  ((e.pop = "pop"), (e.push = "push"));
})(zt || (zt = {}));
var Bt;
(function (e) {
  ((e.back = "back"), (e.forward = "forward"), (e.unknown = ""));
})(Bt || (Bt = {}));
function Nc(e) {
  if (!e)
    if (_t) {
      const t = document.querySelector("base");
      ((e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, "")));
    } else e = "/";
  return (e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Tc(e));
}
const Lc = /^[^#]+#/;
function Hc(e, t) {
  return e.replace(Lc, "#") + t;
}
function Dc(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0),
  };
}
const wn = () => ({ left: window.scrollX, top: window.scrollY });
function jc(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      s = typeof n == "string" && n.startsWith("#"),
      r =
        typeof n == "string"
          ? s
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!r) return;
    t = Dc(r, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.scrollX,
        t.top != null ? t.top : window.scrollY,
      );
}
function rr(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Jn = new Map();
function Bc(e, t) {
  Jn.set(e, t);
}
function Uc(e) {
  const t = Jn.get(e);
  return (Jn.delete(e), t);
}
let Vc = () => location.protocol + "//" + location.host;
function Fo(e, t) {
  const { pathname: n, search: s, hash: r } = t,
    o = e.indexOf("#");
  if (o > -1) {
    let f = r.includes(e.slice(o)) ? e.slice(o).length : 1,
      c = r.slice(f);
    return (c[0] !== "/" && (c = "/" + c), nr(c, ""));
  }
  return nr(n, e) + s + r;
}
function Kc(e, t, n, s) {
  let r = [],
    o = [],
    i = null;
  const f = ({ state: p }) => {
    const m = Fo(e, location),
      O = n.value,
      A = t.value;
    let B = 0;
    if (p) {
      if (((n.value = m), (t.value = p), i && i === O)) {
        i = null;
        return;
      }
      B = A ? p.position - A.position : 0;
    } else s(m);
    r.forEach(($) => {
      $(n.value, O, {
        delta: B,
        type: zt.pop,
        direction: B ? (B > 0 ? Bt.forward : Bt.back) : Bt.unknown,
      });
    });
  };
  function c() {
    i = n.value;
  }
  function h(p) {
    r.push(p);
    const m = () => {
      const O = r.indexOf(p);
      O > -1 && r.splice(O, 1);
    };
    return (o.push(m), m);
  }
  function a() {
    const { history: p } = window;
    p.state && p.replaceState(G({}, p.state, { scroll: wn() }), "");
  }
  function d() {
    for (const p of o) p();
    ((o = []),
      window.removeEventListener("popstate", f),
      window.removeEventListener("beforeunload", a));
  }
  return (
    window.addEventListener("popstate", f),
    window.addEventListener("beforeunload", a, { passive: !0 }),
    { pauseListeners: c, listen: h, destroy: d }
  );
}
function or(e, t, n, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: r ? wn() : null,
  };
}
function Wc(e) {
  const { history: t, location: n } = window,
    s = { value: Fo(e, n) },
    r = { value: t.state };
  r.value ||
    o(
      s.value,
      {
        back: null,
        current: s.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0,
    );
  function o(c, h, a) {
    const d = e.indexOf("#"),
      p =
        d > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(d)) + c
          : Vc() + e + c;
    try {
      (t[a ? "replaceState" : "pushState"](h, "", p), (r.value = h));
    } catch (m) {
      (console.error(m), n[a ? "replace" : "assign"](p));
    }
  }
  function i(c, h) {
    const a = G({}, t.state, or(r.value.back, c, r.value.forward, !0), h, {
      position: r.value.position,
    });
    (o(c, a, !0), (s.value = c));
  }
  function f(c, h) {
    const a = G({}, r.value, t.state, { forward: c, scroll: wn() });
    o(a.current, a, !0);
    const d = G({}, or(s.value, c, null), { position: a.position + 1 }, h);
    (o(c, d, !1), (s.value = c));
  }
  return { location: s, state: r, push: f, replace: i };
}
function kc(e) {
  e = Nc(e);
  const t = Wc(e),
    n = Kc(e, t.state, t.location, t.replace);
  function s(o, i = !0) {
    (i || n.pauseListeners(), history.go(o));
  }
  const r = G(
    { location: "", base: e, go: s, createHref: Hc.bind(null, e) },
    t,
    n,
  );
  return (
    Object.defineProperty(r, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(r, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    r
  );
}
function qc(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function $o(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const No = Symbol("");
var ir;
(function (e) {
  ((e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated"));
})(ir || (ir = {}));
function St(e, t) {
  return G(new Error(), { type: e, [No]: !0 }, t);
}
function Be(e, t) {
  return e instanceof Error && No in e && (t == null || !!(e.type & t));
}
const lr = "[^/]+?",
  Gc = { sensitive: !1, strict: !1, start: !0, end: !0 },
  zc = /[.+*?^${}()[\]/\\]/g;
function Qc(e, t) {
  const n = G({}, Gc, t),
    s = [];
  let r = n.start ? "^" : "";
  const o = [];
  for (const h of e) {
    const a = h.length ? [] : [90];
    n.strict && !h.length && (r += "/");
    for (let d = 0; d < h.length; d++) {
      const p = h[d];
      let m = 40 + (n.sensitive ? 0.25 : 0);
      if (p.type === 0)
        (d || (r += "/"), (r += p.value.replace(zc, "\\$&")), (m += 40));
      else if (p.type === 1) {
        const { value: O, repeatable: A, optional: B, regexp: $ } = p;
        o.push({ name: O, repeatable: A, optional: B });
        const F = $ || lr;
        if (F !== lr) {
          m += 10;
          try {
            new RegExp(`(${F})`);
          } catch (I) {
            throw new Error(
              `Invalid custom RegExp for param "${O}" (${F}): ` + I.message,
            );
          }
        }
        let N = A ? `((?:${F})(?:/(?:${F}))*)` : `(${F})`;
        (d || (N = B && h.length < 2 ? `(?:/${N})` : "/" + N),
          B && (N += "?"),
          (r += N),
          (m += 20),
          B && (m += -8),
          A && (m += -20),
          F === ".*" && (m += -50));
      }
      a.push(m);
    }
    s.push(a);
  }
  if (n.strict && n.end) {
    const h = s.length - 1;
    s[h][s[h].length - 1] += 0.7000000000000001;
  }
  (n.strict || (r += "/?"), n.end ? (r += "$") : n.strict && (r += "(?:/|$)"));
  const i = new RegExp(r, n.sensitive ? "" : "i");
  function f(h) {
    const a = h.match(i),
      d = {};
    if (!a) return null;
    for (let p = 1; p < a.length; p++) {
      const m = a[p] || "",
        O = o[p - 1];
      d[O.name] = m && O.repeatable ? m.split("/") : m;
    }
    return d;
  }
  function c(h) {
    let a = "",
      d = !1;
    for (const p of e) {
      ((!d || !a.endsWith("/")) && (a += "/"), (d = !1));
      for (const m of p)
        if (m.type === 0) a += m.value;
        else if (m.type === 1) {
          const { value: O, repeatable: A, optional: B } = m,
            $ = O in h ? h[O] : "";
          if (Ce($) && !A)
            throw new Error(
              `Provided param "${O}" is an array but it is not repeatable (* or + modifiers)`,
            );
          const F = Ce($) ? $.join("/") : $;
          if (!F)
            if (B)
              p.length < 2 &&
                (a.endsWith("/") ? (a = a.slice(0, -1)) : (d = !0));
            else throw new Error(`Missing required param "${O}"`);
          a += F;
        }
    }
    return a || "/";
  }
  return { re: i, score: s, keys: o, parse: f, stringify: c };
}
function Yc(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s) return s;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
      ? t.length === 1 && t[0] === 40 + 40
        ? 1
        : -1
      : 0;
}
function Lo(e, t) {
  let n = 0;
  const s = e.score,
    r = t.score;
  for (; n < s.length && n < r.length; ) {
    const o = Yc(s[n], r[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (cr(s)) return 1;
    if (cr(r)) return -1;
  }
  return r.length - s.length;
}
function cr(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Jc = { type: 0, value: "" },
  Xc = /[a-zA-Z0-9_]/;
function Zc(e) {
  if (!e) return [[]];
  if (e === "/") return [[Jc]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(m) {
    throw new Error(`ERR (${n})/"${h}": ${m}`);
  }
  let n = 0,
    s = n;
  const r = [];
  let o;
  function i() {
    (o && r.push(o), (o = []));
  }
  let f = 0,
    c,
    h = "",
    a = "";
  function d() {
    h &&
      (n === 0
        ? o.push({ type: 0, value: h })
        : n === 1 || n === 2 || n === 3
          ? (o.length > 1 &&
              (c === "*" || c === "+") &&
              t(
                `A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`,
              ),
            o.push({
              type: 1,
              value: h,
              regexp: a,
              repeatable: c === "*" || c === "+",
              optional: c === "*" || c === "?",
            }))
          : t("Invalid state to consume buffer"),
      (h = ""));
  }
  function p() {
    h += c;
  }
  for (; f < e.length; ) {
    if (((c = e[f++]), c === "\\" && n !== 2)) {
      ((s = n), (n = 4));
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (h && d(), i()) : c === ":" ? (d(), (n = 1)) : p();
        break;
      case 4:
        (p(), (n = s));
        break;
      case 1:
        c === "("
          ? (n = 2)
          : Xc.test(c)
            ? p()
            : (d(), (n = 0), c !== "*" && c !== "?" && c !== "+" && f--);
        break;
      case 2:
        c === ")"
          ? a[a.length - 1] == "\\"
            ? (a = a.slice(0, -1) + c)
            : (n = 3)
          : (a += c);
        break;
      case 3:
        (d(), (n = 0), c !== "*" && c !== "?" && c !== "+" && f--, (a = ""));
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return (
    n === 2 && t(`Unfinished custom RegExp for param "${h}"`),
    d(),
    i(),
    r
  );
}
function ef(e, t, n) {
  const s = Qc(Zc(e.path), n),
    r = G(s, { record: e, parent: t, children: [], alias: [] });
  return (t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r);
}
function tf(e, t) {
  const n = [],
    s = new Map();
  t = dr({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(d) {
    return s.get(d);
  }
  function o(d, p, m) {
    const O = !m,
      A = ur(d);
    A.aliasOf = m && m.record;
    const B = dr(t, d),
      $ = [A];
    if ("alias" in d) {
      const I = typeof d.alias == "string" ? [d.alias] : d.alias;
      for (const Q of I)
        $.push(
          ur(
            G({}, A, {
              components: m ? m.record.components : A.components,
              path: Q,
              aliasOf: m ? m.record : A,
            }),
          ),
        );
    }
    let F, N;
    for (const I of $) {
      const { path: Q } = I;
      if (p && Q[0] !== "/") {
        const re = p.record.path,
          ee = re[re.length - 1] === "/" ? "" : "/";
        I.path = p.record.path + (Q && ee + Q);
      }
      if (
        ((F = ef(I, p, B)),
        m
          ? m.alias.push(F)
          : ((N = N || F),
            N !== F && N.alias.push(F),
            O && d.name && !ar(F) && i(d.name)),
        Ho(F) && c(F),
        A.children)
      ) {
        const re = A.children;
        for (let ee = 0; ee < re.length; ee++)
          o(re[ee], F, m && m.children[ee]);
      }
      m = m || F;
    }
    return N
      ? () => {
          i(N);
        }
      : jt;
  }
  function i(d) {
    if ($o(d)) {
      const p = s.get(d);
      p &&
        (s.delete(d),
        n.splice(n.indexOf(p), 1),
        p.children.forEach(i),
        p.alias.forEach(i));
    } else {
      const p = n.indexOf(d);
      p > -1 &&
        (n.splice(p, 1),
        d.record.name && s.delete(d.record.name),
        d.children.forEach(i),
        d.alias.forEach(i));
    }
  }
  function f() {
    return n;
  }
  function c(d) {
    const p = rf(d, n);
    (n.splice(p, 0, d), d.record.name && !ar(d) && s.set(d.record.name, d));
  }
  function h(d, p) {
    let m,
      O = {},
      A,
      B;
    if ("name" in d && d.name) {
      if (((m = s.get(d.name)), !m)) throw St(1, { location: d });
      ((B = m.record.name),
        (O = G(
          fr(
            p.params,
            m.keys
              .filter((N) => !N.optional)
              .concat(m.parent ? m.parent.keys.filter((N) => N.optional) : [])
              .map((N) => N.name),
          ),
          d.params &&
            fr(
              d.params,
              m.keys.map((N) => N.name),
            ),
        )),
        (A = m.stringify(O)));
    } else if (d.path != null)
      ((A = d.path),
        (m = n.find((N) => N.re.test(A))),
        m && ((O = m.parse(A)), (B = m.record.name)));
    else {
      if (((m = p.name ? s.get(p.name) : n.find((N) => N.re.test(p.path))), !m))
        throw St(1, { location: d, currentLocation: p });
      ((B = m.record.name),
        (O = G({}, p.params, d.params)),
        (A = m.stringify(O)));
    }
    const $ = [];
    let F = m;
    for (; F; ) ($.unshift(F.record), (F = F.parent));
    return { name: B, path: A, params: O, matched: $, meta: sf($) };
  }
  e.forEach((d) => o(d));
  function a() {
    ((n.length = 0), s.clear());
  }
  return {
    addRoute: o,
    resolve: h,
    removeRoute: i,
    clearRoutes: a,
    getRoutes: f,
    getRecordMatcher: r,
  };
}
function fr(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function ur(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: nf(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
  return (Object.defineProperty(t, "mods", { value: {} }), t);
}
function nf(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const s in e.components) t[s] = typeof n == "object" ? n[s] : n;
  return t;
}
function ar(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function sf(e) {
  return e.reduce((t, n) => G(t, n.meta), {});
}
function dr(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
function rf(e, t) {
  let n = 0,
    s = t.length;
  for (; n !== s; ) {
    const o = (n + s) >> 1;
    Lo(e, t[o]) < 0 ? (s = o) : (n = o + 1);
  }
  const r = of(e);
  return (r && (s = t.lastIndexOf(r, s - 1)), s);
}
function of(e) {
  let t = e;
  for (; (t = t.parent); ) if (Ho(t) && Lo(e, t) === 0) return t;
}
function Ho({ record: e }) {
  return !!(
    e.name ||
    (e.components && Object.keys(e.components).length) ||
    e.redirect
  );
}
function lf(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const s = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < s.length; ++r) {
    const o = s[r].replace(Oo, " "),
      i = o.indexOf("="),
      f = Gt(i < 0 ? o : o.slice(0, i)),
      c = i < 0 ? null : Gt(o.slice(i + 1));
    if (f in t) {
      let h = t[f];
      (Ce(h) || (h = t[f] = [h]), h.push(c));
    } else t[f] = c;
  }
  return t;
}
function hr(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (((n = Pc(n)), s == null)) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Ce(s) ? s.map((o) => o && Yn(o)) : [s && Yn(s)]).forEach((o) => {
      o !== void 0 &&
        ((t += (t.length ? "&" : "") + n), o != null && (t += "=" + o));
    });
  }
  return t;
}
function cf(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 &&
      (t[n] = Ce(s)
        ? s.map((r) => (r == null ? null : "" + r))
        : s == null
          ? s
          : "" + s);
  }
  return t;
}
const ff = Symbol(""),
  pr = Symbol(""),
  ws = Symbol(""),
  Do = Symbol(""),
  Xn = Symbol("");
function Tt() {
  let e = [];
  function t(s) {
    return (
      e.push(s),
      () => {
        const r = e.indexOf(s);
        r > -1 && e.splice(r, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function Ze(e, t, n, s, r, o = (i) => i()) {
  const i = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () =>
    new Promise((f, c) => {
      const h = (p) => {
          p === !1
            ? c(St(4, { from: n, to: t }))
            : p instanceof Error
              ? c(p)
              : qc(p)
                ? c(St(2, { from: t, to: p }))
                : (i &&
                    s.enterCallbacks[r] === i &&
                    typeof p == "function" &&
                    i.push(p),
                  f());
        },
        a = o(() => e.call(s && s.instances[r], t, n, h));
      let d = Promise.resolve(a);
      (e.length < 3 && (d = d.then(h)), d.catch((p) => c(p)));
    });
}
function Hn(e, t, n, s, r = (o) => o()) {
  const o = [];
  for (const i of e)
    for (const f in i.components) {
      let c = i.components[f];
      if (!(t !== "beforeRouteEnter" && !i.instances[f]))
        if (Po(c)) {
          const a = (c.__vccOpts || c)[t];
          a && o.push(Ze(a, n, s, i, f, r));
        } else {
          let h = c();
          o.push(() =>
            h.then((a) => {
              if (!a)
                throw new Error(
                  `Couldn't resolve component "${f}" at "${i.path}"`,
                );
              const d = gc(a) ? a.default : a;
              ((i.mods[f] = a), (i.components[f] = d));
              const m = (d.__vccOpts || d)[t];
              return m && Ze(m, n, s, i, f, r)();
            }),
          );
        }
    }
  return o;
}
function gr(e) {
  const t = We(ws),
    n = We(Do),
    s = Ee(() => {
      const c = vt(e.to);
      return t.resolve(c);
    }),
    r = Ee(() => {
      const { matched: c } = s.value,
        { length: h } = c,
        a = c[h - 1],
        d = n.matched;
      if (!a || !d.length) return -1;
      const p = d.findIndex(wt.bind(null, a));
      if (p > -1) return p;
      const m = mr(c[h - 2]);
      return h > 1 && mr(a) === m && d[d.length - 1].path !== m
        ? d.findIndex(wt.bind(null, c[h - 2]))
        : p;
    }),
    o = Ee(() => r.value > -1 && hf(n.params, s.value.params)),
    i = Ee(
      () =>
        r.value > -1 &&
        r.value === n.matched.length - 1 &&
        Mo(n.params, s.value.params),
    );
  function f(c = {}) {
    return df(c)
      ? t[vt(e.replace) ? "replace" : "push"](vt(e.to)).catch(jt)
      : Promise.resolve();
  }
  return {
    route: s,
    href: Ee(() => s.value.href),
    isActive: o,
    isExactActive: i,
    navigate: f,
  };
}
const uf = zr({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: gr,
    setup(e, { slots: t }) {
      const n = _n(gr(e)),
        { options: s } = We(ws),
        r = Ee(() => ({
          [_r(e.activeClass, s.linkActiveClass, "router-link-active")]:
            n.isActive,
          [_r(
            e.exactActiveClass,
            s.linkExactActiveClass,
            "router-link-exact-active",
          )]: n.isExactActive,
        }));
      return () => {
        const o = t.default && t.default(n);
        return e.custom
          ? o
          : wo(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: r.value,
              },
              o,
            );
      };
    },
  }),
  af = uf;
function df(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return (e.preventDefault && e.preventDefault(), !0);
  }
}
function hf(e, t) {
  for (const n in t) {
    const s = t[n],
      r = e[n];
    if (typeof s == "string") {
      if (s !== r) return !1;
    } else if (!Ce(r) || r.length !== s.length || s.some((o, i) => o !== r[i]))
      return !1;
  }
  return !0;
}
function mr(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const _r = (e, t, n) => e ?? t ?? n,
  pf = zr({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const s = We(Xn),
        r = Ee(() => e.route || s.value),
        o = We(pr, 0),
        i = Ee(() => {
          let h = vt(o);
          const { matched: a } = r.value;
          let d;
          for (; (d = a[h]) && !d.components; ) h++;
          return h;
        }),
        f = Ee(() => r.value.matched[i.value]);
      (rn(
        pr,
        Ee(() => i.value + 1),
      ),
        rn(ff, f),
        rn(Xn, r));
      const c = Si();
      return (
        on(
          () => [c.value, f.value, e.name],
          ([h, a, d], [p, m, O]) => {
            (a &&
              ((a.instances[d] = h),
              m &&
                m !== a &&
                h &&
                h === p &&
                (a.leaveGuards.size || (a.leaveGuards = m.leaveGuards),
                a.updateGuards.size || (a.updateGuards = m.updateGuards))),
              h &&
                a &&
                (!m || !wt(a, m) || !p) &&
                (a.enterCallbacks[d] || []).forEach((A) => A(h)));
          },
          { flush: "post" },
        ),
        () => {
          const h = r.value,
            a = e.name,
            d = f.value,
            p = d && d.components[a];
          if (!p) return yr(n.default, { Component: p, route: h });
          const m = d.props[a],
            O = m
              ? m === !0
                ? h.params
                : typeof m == "function"
                  ? m(h)
                  : m
              : null,
            B = wo(
              p,
              G({}, O, t, {
                onVnodeUnmounted: ($) => {
                  $.component.isUnmounted && (d.instances[a] = null);
                },
                ref: c,
              }),
            );
          return yr(n.default, { Component: B, route: h }) || B;
        }
      );
    },
  });
function yr(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const gf = pf;
function mf(e) {
  const t = tf(e.routes, e),
    n = e.parseQuery || lf,
    s = e.stringifyQuery || hr,
    r = e.history,
    o = Tt(),
    i = Tt(),
    f = Tt(),
    c = Ri(Ye);
  let h = Ye;
  _t &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const a = Nn.bind(null, (y) => "" + y),
    d = Nn.bind(null, Oc),
    p = Nn.bind(null, Gt);
  function m(y, C) {
    let R, T;
    return (
      $o(y) ? ((R = t.getRecordMatcher(y)), (T = C)) : (T = y),
      t.addRoute(T, R)
    );
  }
  function O(y) {
    const C = t.getRecordMatcher(y);
    C && t.removeRoute(C);
  }
  function A() {
    return t.getRoutes().map((y) => y.record);
  }
  function B(y) {
    return !!t.getRecordMatcher(y);
  }
  function $(y, C) {
    if (((C = G({}, C || c.value)), typeof y == "string")) {
      const u = Ln(n, y, C.path),
        g = t.resolve({ path: u.path }, C),
        v = r.createHref(u.fullPath);
      return G(u, g, {
        params: p(g.params),
        hash: Gt(u.hash),
        redirectedFrom: void 0,
        href: v,
      });
    }
    let R;
    if (y.path != null) R = G({}, y, { path: Ln(n, y.path, C.path).path });
    else {
      const u = G({}, y.params);
      for (const g in u) u[g] == null && delete u[g];
      ((R = G({}, y, { params: d(u) })), (C.params = d(C.params)));
    }
    const T = t.resolve(R, C),
      K = y.hash || "";
    T.params = a(p(T.params));
    const Z = Ic(s, G({}, y, { hash: Rc(K), path: T.path })),
      l = r.createHref(Z);
    return G(
      { fullPath: Z, hash: K, query: s === hr ? cf(y.query) : y.query || {} },
      T,
      { redirectedFrom: void 0, href: l },
    );
  }
  function F(y) {
    return typeof y == "string" ? Ln(n, y, c.value.path) : G({}, y);
  }
  function N(y, C) {
    if (h !== y) return St(8, { from: C, to: y });
  }
  function I(y) {
    return ee(y);
  }
  function Q(y) {
    return I(G(F(y), { replace: !0 }));
  }
  function re(y) {
    const C = y.matched[y.matched.length - 1];
    if (C && C.redirect) {
      const { redirect: R } = C;
      let T = typeof R == "function" ? R(y) : R;
      return (
        typeof T == "string" &&
          ((T = T.includes("?") || T.includes("#") ? (T = F(T)) : { path: T }),
          (T.params = {})),
        G(
          {
            query: y.query,
            hash: y.hash,
            params: T.path != null ? {} : y.params,
          },
          T,
        )
      );
    }
  }
  function ee(y, C) {
    const R = (h = $(y)),
      T = c.value,
      K = y.state,
      Z = y.force,
      l = y.replace === !0,
      u = re(R);
    if (u)
      return ee(
        G(F(u), {
          state: typeof u == "object" ? G({}, K, u.state) : K,
          force: Z,
          replace: l,
        }),
        C || R,
      );
    const g = R;
    g.redirectedFrom = C;
    let v;
    return (
      !Z && Mc(s, T, R) && ((v = St(16, { to: g, from: T })), Ie(T, T, !0, !1)),
      (v ? Promise.resolve(v) : Ae(g, T))
        .catch((_) => (Be(_) ? (Be(_, 2) ? _ : ze(_)) : V(_, g, T)))
        .then((_) => {
          if (_) {
            if (Be(_, 2))
              return ee(
                G({ replace: l }, F(_.to), {
                  state: typeof _.to == "object" ? G({}, K, _.to.state) : K,
                  force: Z,
                }),
                C || g,
              );
          } else _ = rt(g, T, !0, l, K);
          return (Ge(g, T, _), _);
        })
    );
  }
  function Oe(y, C) {
    const R = N(y, C);
    return R ? Promise.reject(R) : Promise.resolve();
  }
  function qe(y) {
    const C = pt.values().next().value;
    return C && typeof C.runWithContext == "function"
      ? C.runWithContext(y)
      : y();
  }
  function Ae(y, C) {
    let R;
    const [T, K, Z] = _f(y, C);
    R = Hn(T.reverse(), "beforeRouteLeave", y, C);
    for (const u of T)
      u.leaveGuards.forEach((g) => {
        R.push(Ze(g, y, C));
      });
    const l = Oe.bind(null, y, C);
    return (
      R.push(l),
      be(R)
        .then(() => {
          R = [];
          for (const u of o.list()) R.push(Ze(u, y, C));
          return (R.push(l), be(R));
        })
        .then(() => {
          R = Hn(K, "beforeRouteUpdate", y, C);
          for (const u of K)
            u.updateGuards.forEach((g) => {
              R.push(Ze(g, y, C));
            });
          return (R.push(l), be(R));
        })
        .then(() => {
          R = [];
          for (const u of Z)
            if (u.beforeEnter)
              if (Ce(u.beforeEnter))
                for (const g of u.beforeEnter) R.push(Ze(g, y, C));
              else R.push(Ze(u.beforeEnter, y, C));
          return (R.push(l), be(R));
        })
        .then(
          () => (
            y.matched.forEach((u) => (u.enterCallbacks = {})),
            (R = Hn(Z, "beforeRouteEnter", y, C, qe)),
            R.push(l),
            be(R)
          ),
        )
        .then(() => {
          R = [];
          for (const u of i.list()) R.push(Ze(u, y, C));
          return (R.push(l), be(R));
        })
        .catch((u) => (Be(u, 8) ? u : Promise.reject(u)))
    );
  }
  function Ge(y, C, R) {
    f.list().forEach((T) => qe(() => T(y, C, R)));
  }
  function rt(y, C, R, T, K) {
    const Z = N(y, C);
    if (Z) return Z;
    const l = C === Ye,
      u = _t ? history.state : {};
    (R &&
      (T || l
        ? r.replace(y.fullPath, G({ scroll: l && u && u.scroll }, K))
        : r.push(y.fullPath, K)),
      (c.value = y),
      Ie(y, C, R, l),
      ze());
  }
  let Te;
  function Pt() {
    Te ||
      (Te = r.listen((y, C, R) => {
        if (!Jt.listening) return;
        const T = $(y),
          K = re(T);
        if (K) {
          ee(G(K, { replace: !0 }), T).catch(jt);
          return;
        }
        h = T;
        const Z = c.value;
        (_t && Bc(rr(Z.fullPath, R.delta), wn()),
          Ae(T, Z)
            .catch((l) =>
              Be(l, 12)
                ? l
                : Be(l, 2)
                  ? (ee(l.to, T)
                      .then((u) => {
                        Be(u, 20) &&
                          !R.delta &&
                          R.type === zt.pop &&
                          r.go(-1, !1);
                      })
                      .catch(jt),
                    Promise.reject())
                  : (R.delta && r.go(-R.delta, !1), V(l, T, Z)),
            )
            .then((l) => {
              ((l = l || rt(T, Z, !1)),
                l &&
                  (R.delta && !Be(l, 8)
                    ? r.go(-R.delta, !1)
                    : R.type === zt.pop && Be(l, 20) && r.go(-1, !1)),
                Ge(T, Z, l));
            })
            .catch(jt));
      }));
  }
  let dt = Tt(),
    ne = Tt(),
    z;
  function V(y, C, R) {
    ze(y);
    const T = ne.list();
    return (
      T.length ? T.forEach((K) => K(y, C, R)) : console.error(y),
      Promise.reject(y)
    );
  }
  function De() {
    return z && c.value !== Ye
      ? Promise.resolve()
      : new Promise((y, C) => {
          dt.add([y, C]);
        });
  }
  function ze(y) {
    return (
      z ||
        ((z = !y),
        Pt(),
        dt.list().forEach(([C, R]) => (y ? R(y) : C())),
        dt.reset()),
      y
    );
  }
  function Ie(y, C, R, T) {
    const { scrollBehavior: K } = e;
    if (!_t || !K) return Promise.resolve();
    const Z =
      (!R && Uc(rr(y.fullPath, 0))) ||
      ((T || !R) && history.state && history.state.scroll) ||
      null;
    return Kr()
      .then(() => K(y, C, Z))
      .then((l) => l && jc(l))
      .catch((l) => V(l, y, C));
  }
  const he = (y) => r.go(y);
  let ht;
  const pt = new Set(),
    Jt = {
      currentRoute: c,
      listening: !0,
      addRoute: m,
      removeRoute: O,
      clearRoutes: t.clearRoutes,
      hasRoute: B,
      getRoutes: A,
      resolve: $,
      options: e,
      push: I,
      replace: Q,
      go: he,
      back: () => he(-1),
      forward: () => he(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: f.add,
      onError: ne.add,
      isReady: De,
      install(y) {
        const C = this;
        (y.component("RouterLink", af),
          y.component("RouterView", gf),
          (y.config.globalProperties.$router = C),
          Object.defineProperty(y.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => vt(c),
          }),
          _t &&
            !ht &&
            c.value === Ye &&
            ((ht = !0), I(r.location).catch((K) => {})));
        const R = {};
        for (const K in Ye)
          Object.defineProperty(R, K, {
            get: () => c.value[K],
            enumerable: !0,
          });
        (y.provide(ws, C), y.provide(Do, Dr(R)), y.provide(Xn, c));
        const T = y.unmount;
        (pt.add(y),
          (y.unmount = function () {
            (pt.delete(y),
              pt.size < 1 &&
                ((h = Ye),
                Te && Te(),
                (Te = null),
                (c.value = Ye),
                (ht = !1),
                (z = !1)),
              T());
          }));
      },
    };
  function be(y) {
    return y.reduce((C, R) => C.then(() => qe(R)), Promise.resolve());
  }
  return Jt;
}
function _f(e, t) {
  const n = [],
    s = [],
    r = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const f = t.matched[i];
    f && (e.matched.find((h) => wt(h, f)) ? s.push(f) : n.push(f));
    const c = e.matched[i];
    c && (t.matched.find((h) => wt(h, c)) || r.push(c));
  }
  return [n, s, r];
}
const yf = {
  mounted() {
    this.openPdf();
  },
  methods: {
    openPdf() {
      this.$route.params.file;
    },
  },
};
function vf(e, t, n, s, r, o) {
  return (_o(), yo("div"));
}
const bf = Ro(yf, [["render", vf]]),
  xf = mf({
    history: kc(),
    routes: [
      { path: "/pdf/oirracionalsuperior/o_irracional_superior", component: bf },
    ],
  });
fc(pc).use(xf).mount("#app");
