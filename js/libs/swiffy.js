// Copyright 2011 Google Inc. All Rights Reserved.
/* Swiffy runtime version 2.1 */
(function(window) {
var f = void 0,
    i = null,
    j = Object,
    k = document,
    l = Math,
    aa = Array,
    ba = Error,
    ca = parseInt,
    da = decodeURIComponent;

function ea(a, b) {
    return a.data = b
}
function fa(a, b) {
    return a.currentTarget = b
}
function ga(a, b) {
    return a.keyCode = b
}
function ha(a, b) {
    return a.type = b
}
function ia(a, b) {
    return a.toString = b
}
function ja(a, b) {
    return a.length = b
}
function ka(a, b) {
    return a.target = b
}
function la(a, b) {
    return a.call = b
}
function ma(a, b) {
    return a.returnValue = b
}
function na(a, b) {
    return a.apply = b
}
var m = "appendChild",
    n = "push",
    oa = "ymin",
    pa = "font",
    qa = "indent",
    sa = "getParent",
    ta = "shift",
    ua = "ymax",
    va = "POSITIVE_INFINITY",
    wa = "width",
    xa = "bitmap",
    ya = "expand",
    za = "slice",
    o = "replace",
    Aa = "matrix",
    Ba = "setCapture",
    p = "data",
    Ca = "load",
    Da = "floor",
    Ea = "getNamedItem",
    Fa = "preventDefault",
    Ga = "setAttributeNS",
    q = "indexOf",
    s = "color",
    Ha = "capture",
    Ja = "ratio",
    t = "setTransform",
    Ka = "getName",
    La = "charCode",
    Ma = "getObject",
    Na = "createElement",
    u = "defineProperty",
    v = "keyCode",
    Oa = "firstChild",
    Pa = "sqrt",
    x = "setAttribute",
    Qa = "play",
    Ra = "handleEvent",
    Sa = "path",
    y = "depth",
    A = "type",
    Ta = "childNodes",
    Ua = "bind",
    Va = "name",
    Wa = "releaseCapture",
    Xa = "fill",
    Ya = "stop",
    B = "toString",
    Za = "gradient",
    C = "length",
    $a = "propertyIsEnumerable",
    D = "prototype",
    ab = "result",
    bb = "inner",
    cb = "actions",
    F = "createElementNS",
    db = "ctrlKey",
    G = "split",
    eb = "stopPropagation",
    fb = "glyphs",
    gb = "hasOwnProperty",
    H = "style",
    hb = "body",
    ib = "removeChild",
    jb = "target",
    I = "call",
    kb = "frameSize",
    lb = "getAttribute",
    mb = "returnValue",
    nb = "charCodeAt",
    ob = "colortransform",
    pb = "xmin",
    qb = "trackAsMenu",
    K = "apply",
    rb = "filters",
    sb = "xmax",
    tb = "navigator",
    ub = "parentNode",
    vb = "update",
    L = "height",
    wb = "splice",
    xb = "unshift",
    yb = "isCaptured",
    zb = "transform",
    Ab = "nodeValue",
    Bb = "toLowerCase",
    M, N = this,
    Cb = function () {},
    Db = function (a) {
        var b = typeof a;
        if (b == "object") if (a) {
            if (a instanceof aa) return "array";
            else if (a instanceof j) return b;
            var c = j[D][B][I](a);
            if (c == "[object Window]") return "object";
            if (c == "[object Array]" || typeof a[C] == "number" && typeof a[wb] != "undefined" && typeof a[$a] != "undefined" && !a[$a]("splice")) return "array";
            if (c == "[object Function]" || typeof a[I] != "undefined" && typeof a[$a] != "undefined" && !a[$a]("call")) return "function"
        } else return "null";
        else if (b == "function" && typeof a[I] == "undefined") return "object";
        return b
    },
    O = function (a) {
        return a !== f
    },
    Eb = function (a) {
        return Db(a) == "array"
    },
    Fb = function (a) {
        var b = Db(a);
        return b == "array" || b == "object" && typeof a[C] == "number"
    },
    Gb = function (a) {
        return typeof a == "string"
    },
    Hb = function (a) {
        return Db(a) == "function"
    },
    Ib = function (a) {
        a = Db(a);
        return a == "object" || a == "array" || a == "function"
    },
    Lb = function (a) {
        return a[Jb] || (a[Jb] = ++Kb)
    },
    Jb = "closure_uid_" + l[Da](l.random() * 2147483648)[B](36),
    Kb = 0,
    Mb = function (a, b, c) {
        return a[I][K](a[Ua], arguments)
    },
    Nb = function (a, b, c) {
        if (!a) throw ba();
        if (arguments[C] > 2) {
            var d = aa[D][za][I](arguments, 2);
            return function () {
                var c = aa[D][za][I](arguments);
                aa[D][xb][K](c, d);
                return a[K](b, c)
            }
        } else return function () {
            return a[K](b, arguments)
        }
    },
    Ob = function (a, b, c) {
        Ob = Function[D][Ua] && Function[D][Ua][B]()[q]("native code") != -1 ? Mb : Nb;
        return Ob[K](i, arguments)
    },
    P = function (a, b) {
        var c = aa[D][za][I](arguments, 1);
        return function () {
            var b = aa[D][za][I](arguments);
            b[xb][K](b, c);
            return a[K](this, b)
        }
    },
    Q = function (a, b) {
        function c() {}
        c.prototype = b[D];
        a.I = b[D];
        a.prototype = new c
    };
Function[D].bind = Function[D][Ua] ||
function (a, b) {
    if (arguments[C] > 1) {
        var c = aa[D][za][I](arguments, 1);
        c[xb](this, a);
        return Ob[K](i, c)
    } else return Ob(this, a)
};
var Pb = function (a) {
        this.stack = ba().stack || "";
        if (a) this.message = String(a)
    };
Q(Pb, ba);
Pb[D].name = "CustomError";
var Qb = function (a, b) {
        for (var c = 1; c < arguments[C]; c++) var d = String(arguments[c])[o](/\$/g, "$$$$"),
            a = a[o](/\%s/, d);
        return a
    },
    Rb = /^[a-zA-Z0-9\-_.!~*'()]*$/,
    Sb = function (a) {
        a = String(a);
        return !Rb.test(a) ? encodeURIComponent(a) : a
    },
    Ub = function (a, b) {
        for (var c = 0, d = String(a)[o](/^[\s\xa0]+|[\s\xa0]+$/g, "")[G]("."), e = String(b)[o](/^[\s\xa0]+|[\s\xa0]+$/g, "")[G]("."), g = l.max(d[C], e[C]), h = 0; c == 0 && h < g; h++) {
            var r = d[h] || "",
                z = e[h] || "",
                w = RegExp("(\\d*)(\\D*)", "g"),
                Ia = RegExp("(\\d*)(\\D*)", "g");
            do {
                var J = w.exec(r) || ["", "", ""],
                    E = Ia.exec(z) || ["", "", ""];
                if (J[0][C] == 0 && E[0][C] == 0) break;
                c = Tb(J[1][C] == 0 ? 0 : ca(J[1], 10), E[1][C] == 0 ? 0 : ca(E[1], 10)) || Tb(J[2][C] == 0, E[2][C] == 0) || Tb(J[2], E[2])
            } while (c == 0)
        }
        return c
    },
    Tb = function (a, b) {
        if (a < b) return -1;
        else if (a > b) return 1;
        return 0
    };
var Vb = function (a, b) {
        b[xb](a);
        Pb[I](this, Qb[K](i, b));
        b[ta]();
        this.ng = a
    };
Q(Vb, Pb);
Vb[D].name = "AssertionError";
var Wb = function (a, b, c) {
        if (!a) {
            var d = aa[D][za][I](arguments, 2),
                e = "Assertion failed";
            if (b) {
                e += ": " + b;
                var g = d
            }
            throw new Vb("" + e, g || []);
        }
        return a
    };
var Xb = aa[D],
    Yb = Xb[q] ?
function (a, b, c) {
    Wb(a[C] != i);
    return Xb[q][I](a, b, c)
} : function (a, b, c) {
    c = c == i ? 0 : c < 0 ? l.max(0, a[C] + c) : c;
    if (Gb(a)) return !Gb(b) || b[C] != 1 ? -1 : a[q](b, c);
    for (; c < a[C]; c++) if (c in a && a[c] === b) return c;
    return -1
}, Zb = Xb.forEach ?
function (a, b, c) {
    Wb(a[C] != i);
    Xb.forEach[I](a, b, c)
} : function (a, b, c) {
    for (var d = a[C], e = Gb(a) ? a[G]("") : a, g = 0; g < d; g++) g in e && b[I](c, e[g], g, a)
}, $b = function (a, b) {
    var c = Yb(a, b),
        d;
    if (d = c >= 0) Wb(a[C] != i), Xb[wb][I](a, c, 1);
    return d
}, ac = function (a, b) {
    for (var c = 1; c < arguments[C]; c++) {
        var d = arguments[c],
            e;
        if (Eb(d) || (e = Fb(d)) && d[gb]("callee")) a[n][K](a, d);
        else if (e) for (var g = a[C], h = d[C], r = 0; r < h; r++) a[g + r] = d[r];
        else a[n](d)
    }
}, bc = function (a, b, c, d, e) {
    for (var g = 0, h = a[C], r; g < h;) {
        var z = g + h >> 1,
            w;
        w = c ? b[I](e, a[z], z, a) : b(d, a[z]);
        w > 0 ? g = z + 1 : (h = z, r = !w)
    }
    return r ? g : ~g
}, cc = function (a, b) {
    return a > b ? 1 : a < b ? -1 : 0
};
var dc = function (a, b, c) {
        for (var d in a) b[I](c, a[d], d, a)
    },
    ec = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),
    fc = function (a, b) {
        for (var c, d, e = 1; e < arguments[C]; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var g = 0; g < ec[C]; g++) c = ec[g], j[D][gb][I](d, c) && (a[c] = d[c])
        }
    };
var gc, hc, ic, jc, kc = function () {
        return N[tb] ? N[tb].userAgent : i
    };
jc = ic = hc = gc = !1;
var lc;
if (lc = kc()) {
    var mc = N[tb];
    gc = lc[q]("Opera") == 0;
    hc = !gc && lc[q]("MSIE") != -1;
    ic = !gc && lc[q]("WebKit") != -1;
    jc = !gc && !ic && mc.product == "Gecko"
}
var nc = gc,
    R = hc,
    oc = jc,
    pc = ic,
    qc = N[tb],
    rc = (qc && qc.platform || "")[q]("Mac") != -1,
    sc;
a: {
    var tc = "",
        uc;
    if (nc && N.opera) var vc = N.opera.version,
        tc = typeof vc == "function" ? vc() : vc;
    else if (oc ? uc = /rv\:([^\);]+)(\)|;)/ : R ? uc = /MSIE\s+([^\);]+)(\)|;)/ : pc && (uc = /WebKit\/(\S+)/), uc) var wc = uc.exec(kc()),
        tc = wc ? wc[1] : "";
    if (R) {
        var xc, yc = N.document;
        xc = yc ? yc.documentMode : f;
        if (xc > parseFloat(tc)) {
            sc = String(xc);
            break a
        }
    }
    sc = tc
}
var zc = sc,
    Ac = {},
    Bc = function (a) {
        return Ac[a] || (Ac[a] = Ub(zc, a) >= 0)
    },
    Cc = {},
    Dc = function (a) {
        return Cc[a] || (Cc[a] = R && k.documentMode && k.documentMode >= a)
    };
!R || Dc(9);
!oc && !R || R && Dc(9) || oc && Bc("1.9.1");
R && Bc("9");
var Ec = function (a) {
        for (var b; b = a[Oa];) a[ib](b)
    },
    Fc = function (a) {
        return a && a[ub] ? a[ub][ib](a) : i
    },
    Gc = function (a, b) {
        var c = b[ub];
        c && c.replaceChild(a, b)
    };
var Hc = new Function("a", "return a");
var Ic;
!R || Dc(9);
var Jc = R && !Bc("8");
var Kc = function () {};
Kc[D].ke = !1;
Kc[D].Ra = function () {
    if (!this.ke) this.ke = !0, this.ta()
};
Kc[D].ta = function () {
    this.Nf && Lc[K](i, this.Nf)
};
var Lc = function (a) {
        for (var b = 0, c = arguments[C]; b < c; ++b) {
            var d = arguments[b];
            Fb(d) ? Lc[K](i, d) : d && typeof d.Ra == "function" && d.Ra()
        }
    };
var Mc = function (a, b) {
        ha(this, a);
        ka(this, b);
        fa(this, this[jb])
    };
Q(Mc, Kc);
M = Mc[D];
M.ta = function () {
    delete this[A];
    delete this[jb];
    delete this.currentTarget
};
M.Sa = !1;
M.Ib = !0;
M.stopPropagation = function () {
    this.Sa = !0
};
M.preventDefault = function () {
    this.Ib = !1
};
var Nc = function (a, b) {
        a && this.Db(a, b)
    };
Q(Nc, Mc);
M = Nc[D];
ka(M, i);
M.relatedTarget = i;
M.offsetX = 0;
M.offsetY = 0;
M.clientX = 0;
M.clientY = 0;
M.screenX = 0;
M.screenY = 0;
M.button = 0;
ga(M, 0);
M.charCode = 0;
M.ctrlKey = !1;
M.altKey = !1;
M.shiftKey = !1;
M.metaKey = !1;
M.rf = !1;
M.Aa = i;
M.Db = function (a, b) {
    var c = ha(this, a[A]);
    Mc[I](this, c);
    ka(this, a[jb] || a.srcElement);
    fa(this, b);
    var d = a.relatedTarget;
    if (d) {
        if (oc) {
            var e;
            a: {
                try {
                    Hc(d.nodeName);
                    e = !0;
                    break a
                } catch (g) {}
                e = !1
            }
            e || (d = i)
        }
    } else if (c == "mouseover") d = a.fromElement;
    else if (c == "mouseout") d = a.toElement;
    this.relatedTarget = d;
    this.offsetX = a.offsetX !== f ? a.offsetX : a.layerX;
    this.offsetY = a.offsetY !== f ? a.offsetY : a.layerY;
    this.clientX = a.clientX !== f ? a.clientX : a.pageX;
    this.clientY = a.clientY !== f ? a.clientY : a.pageY;
    this.screenX = a.screenX || 0;
    this.screenY = a.screenY || 0;
    this.button = a.button;
    ga(this, a[v] || 0);
    this.charCode = a[La] || (c == "keypress" ? a[v] : 0);
    this.ctrlKey = a[db];
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.rf = rc ? a.metaKey : a[db];
    this.state = a.state;
    this.Aa = a;
    delete this.Ib;
    delete this.Sa
};
M.stopPropagation = function () {
    Nc.I[eb][I](this);
    this.Aa[eb] ? this.Aa[eb]() : this.Aa.cancelBubble = !0
};
M.preventDefault = function () {
    Nc.I[Fa][I](this);
    var a = this.Aa;
    if (a[Fa]) a[Fa]();
    else if (ma(a, !1), Jc) try {
        (a[db] || a[v] >= 112 && a[v] <= 123) && ga(a, -1)
    } catch (b) {}
};
M.ta = function () {
    Nc.I.ta[I](this);
    this.Aa = i;
    ka(this, i);
    fa(this, i);
    this.relatedTarget = i
};
var Oc = function (a, b) {
        this.be = b;
        this.Ta = [];
        this.Af(a)
    };
Q(Oc, Kc);
M = Oc[D];
M.sd = i;
M.le = i;
M.Pb = function (a) {
    this.sd = a
};
M.getObject = function () {
    return this.Ta[C] ? this.Ta.pop() : this.je()
};
M.Ob = function (a) {
    this.Ta[C] < this.be ? this.Ta[n](a) : this.Ud(a)
};
M.Af = function (a) {
    if (a > this.be) throw ba("[goog.structs.SimplePool] Initial cannot be greater than max");
    for (var b = 0; b < a; b++) this.Ta[n](this.je())
};
M.je = function () {
    return this.sd ? this.sd() : {}
};
M.Ud = function (a) {
    if (this.le) this.le(a);
    else if (Ib(a)) if (Hb(a.Ra)) a.Ra();
    else for (var b in a) delete a[b]
};
M.ta = function () {
    Oc.I.ta[I](this);
    for (var a = this.Ta; a[C];) this.Ud(a.pop());
    delete this.Ta
};
var Pc, Qc = (Pc = "ScriptEngine" in N && N.ScriptEngine() == "JScript") ? N.ScriptEngineMajorVersion() + "." + N.ScriptEngineMinorVersion() + "." + N.ScriptEngineBuildVersion() : "0";
var Rc = function () {},
    Sc = 0;
M = Rc[D];
M.key = 0;
M.kb = !1;
M.Zd = !1;
M.Db = function (a, b, c, d, e, g) {
    if (Hb(a)) this.Yd = !0;
    else if (a && a[Ra] && Hb(a[Ra])) this.Yd = !1;
    else throw ba("Invalid listener argument");
    this.Eb = a;
    this.Pd = b;
    this.src = c;
    ha(this, d);
    this.capture = !! e;
    this.cd = g;
    this.Zd = !1;
    this.key = ++Sc;
    this.kb = !1
};
M.handleEvent = function (a) {
    return this.Yd ? this.Eb[I](this.cd || this.src, a) : this.Eb[Ra][I](this.Eb, a)
};
var Tc, Uc, Vc, Wc, Xc, Yc, Zc, $c, ad, bd, cd;
(function () {
    function a() {
        return {
            q: 0,
            ha: 0
        }
    }
    function b() {
        return []
    }
    function c() {
        var a = function (b) {
                b = h[I](a.src, a.key, b);
                if (!b) return b
            };
        return a
    }
    function d() {
        return new Rc
    }
    function e() {
        return new Nc
    }
    var g = Pc && !(Ub(Qc, "5.7") >= 0),
        h;
    Yc = function (a) {
        h = a
    };
    if (g) {
        Tc = function () {
            return r[Ma]()
        };
        Uc = function (a) {
            r.Ob(a)
        };
        Vc = function () {
            return z[Ma]()
        };
        Wc = function (a) {
            z.Ob(a)
        };
        Xc = function () {
            return w[Ma]()
        };
        Zc = function () {
            w.Ob(c())
        };
        $c = function () {
            return Ia[Ma]()
        };
        ad = function (a) {
            Ia.Ob(a)
        };
        bd = function () {
            return J[Ma]()
        };
        cd = function (a) {
            J.Ob(a)
        };
        var r = new Oc(0, 600);
        r.Pb(a);
        var z = new Oc(0, 600);
        z.Pb(b);
        var w = new Oc(0, 600);
        w.Pb(c);
        var Ia = new Oc(0, 600);
        Ia.Pb(d);
        var J = new Oc(0, 600);
        J.Pb(e)
    } else Tc = a, Uc = Cb, Vc = b, Wc = Cb, Xc = c, Zc = Cb, $c = d, ad = Cb, bd = e, cd = Cb
})();
var dd = {},
    S = {},
    ed = {},
    fd = {},
    T = function (a, b, c, d, e) {
        if (b) if (Eb(b)) {
            for (var g = 0; g < b[C]; g++) T(a, b[g], c, d, e);
            return i
        } else {
            var d = !! d,
                h = S;
            b in h || (h[b] = Tc());
            h = h[b];
            d in h || (h[d] = Tc(), h.q++);
            var h = h[d],
                r = Lb(a),
                z;
            h.ha++;
            if (h[r]) {
                z = h[r];
                for (g = 0; g < z[C]; g++) if (h = z[g], h.Eb == c && h.cd == e) {
                    if (h.kb) break;
                    return z[g].key
                }
            } else z = h[r] = Vc(), h.q++;
            g = Xc();
            g.src = a;
            h = $c();
            h.Db(c, g, a, b, d, e);
            c = h.key;
            g.key = c;
            z[n](h);
            dd[c] = h;
            ed[r] || (ed[r] = Vc());
            ed[r][n](h);
            a.addEventListener ? (a == N || !a.Nd) && a.addEventListener(b, g, d) : a.attachEvent(b in fd ? fd[b] : fd[b] = "on" + b, g);
            return c
        } else throw ba("Invalid event type");
    },
    gd = function (a, b, c, d, e) {
        if (Eb(b)) {
            for (var g = 0; g < b[C]; g++) gd(a, b[g], c, d, e);
            return i
        }
        d = !! d;
        a: {
            g = S;
            if (b in g && (g = g[b], d in g && (g = g[d], a = Lb(a), g[a]))) {
                a = g[a];
                break a
            }
            a = i
        }
        if (!a) return !1;
        for (g = 0; g < a[C]; g++) if (a[g].Eb == c && a[g][Ha] == d && a[g].cd == e) return hd(a[g].key);
        return !1
    },
    hd = function (a) {
        if (!dd[a]) return !1;
        var b = dd[a];
        if (b.kb) return !1;
        var c = b.src,
            d = b[A],
            e = b.Pd,
            g = b[Ha];
        c.removeEventListener ? (c == N || !c.Nd) && c.removeEventListener(d, e, g) : c.detachEvent && c.detachEvent(d in fd ? fd[d] : fd[d] = "on" + d, e);
        c = Lb(c);
        e = S[d][g][c];
        if (ed[c]) {
            var h = ed[c];
            $b(h, b);
            h[C] == 0 && delete ed[c]
        }
        b.kb = !0;
        e.Sd = !0;
        id(d, g, c, e);
        delete dd[a];
        return !0
    },
    id = function (a, b, c, d) {
        if (!d.sc && d.Sd) {
            for (var e = 0, g = 0; e < d[C]; e++) if (d[e].kb) {
                var h = d[e].Pd;
                h.src = i;
                Zc(h);
                ad(d[e])
            } else e != g && (d[g] = d[e]), g++;
            ja(d, g);
            d.Sd = !1;
            g == 0 && (Wc(d), delete S[a][b][c], S[a][b].q--, S[a][b].q == 0 && (Uc(S[a][b]), delete S[a][b], S[a].q--), S[a].q == 0 && (Uc(S[a]), delete S[a]))
        }
    },
    jd = function (a, b, c) {
        var d = 0,
            e = b == i,
            g = c == i,
            c = !! c;
        if (a == i) dc(ed, function (a) {
            for (var h = a[C] - 1; h >= 0; h--) {
                var r = a[h];
                if ((e || b == r[A]) && (g || c == r[Ha])) hd(r.key), d++
            }
        });
        else if (a = Lb(a), ed[a]) for (var a = ed[a], h = a[C] - 1; h >= 0; h--) {
            var r = a[h];
            if ((e || b == r[A]) && (g || c == r[Ha])) hd(r.key), d++
        }
        return d
    },
    ld = function (a, b, c, d, e) {
        var g = 1,
            b = Lb(b);
        if (a[b]) {
            a.ha--;
            a = a[b];
            a.sc ? a.sc++ : a.sc = 1;
            try {
                for (var h = a[C], r = 0; r < h; r++) {
                    var z = a[r];
                    z && !z.kb && (g &= kd(z, e) !== !1)
                }
            } finally {
                a.sc--, id(c, d, b, a)
            }
        }
        return Boolean(g)
    },
    kd = function (a, b) {
        var c = a[Ra](b);
        a.Zd && hd(a.key);
        return c
    };
Yc(function (a, b) {
    if (!dd[a]) return !0;
    var c = dd[a],
        d = c[A],
        e = S;
    if (!(d in e)) return !0;
    var e = e[d],
        g, h;
    Ic === f && (Ic = R && !N.addEventListener);
    if (Ic) {
        var r;
        if (!(r = b)) a: {
            r = "window.event" [G](".");
            for (var z = N; g = r[ta]();) if (z[g] != i) z = z[g];
            else {
                r = i;
                break a
            }
            r = z
        }
        g = r;
        r = !0 in e;
        z = !1 in e;
        if (r) {
            if (g[v] < 0 || g[mb] != f) return !0;
            a: {
                var w = !1;
                if (g[v] == 0) try {
                    ga(g, -1);
                    break a
                } catch (Ia) {
                    w = !0
                }(w || g[mb] == f) && ma(g, !0)
            }
        }
        w = bd();
        w.Db(g, this);
        g = !0;
        try {
            if (r) {
                for (var J = Vc(), E = w.currentTarget; E; E = E[ub]) J[n](E);
                h = e[!0];
                h.ha = h.q;
                for (var ra = J[C] - 1; !w.Sa && ra >= 0 && h.ha; ra--) fa(w, J[ra]), g &= ld(h, J[ra], d, !0, w);
                if (z) {
                    h = e[!1];
                    h.ha = h.q;
                    for (ra = 0; !w.Sa && ra < J[C] && h.ha; ra++) fa(w, J[ra]), g &= ld(h, J[ra], d, !1, w)
                }
            } else g = kd(c, w)
        } finally {
            J && (ja(J, 0), Wc(J)), w.Ra(), cd(w)
        }
        return g
    }
    d = new Nc(b, this);
    try {
        g = kd(c, d)
    } finally {
        d.Ra()
    }
    return g
});
var md = function () {};
Q(md, Kc);
M = md[D];
M.Nd = !0;
M.bd = i;
M.addEventListener = function (a, b, c, d) {
    T(this, a, b, c, d)
};
M.removeEventListener = function (a, b, c, d) {
    gd(this, a, b, c, d)
};
M.dispatchEvent = function (a) {
    var b = a[A] || a,
        c = S;
    if (b in c) {
        if (Gb(a)) a = new Mc(a, this);
        else if (a instanceof Mc) ka(a, a[jb] || this);
        else {
            var d = a,
                a = new Mc(b, this);
            fc(a, d)
        }
        var d = 1,
            e, c = c[b],
            b = !0 in c,
            g;
        if (b) {
            e = [];
            for (g = this; g; g = g.bd) e[n](g);
            g = c[!0];
            g.ha = g.q;
            for (var h = e[C] - 1; !a.Sa && h >= 0 && g.ha; h--) fa(a, e[h]), d &= ld(g, e[h], a[A], !0, a) && a.Ib != !1
        }
        if (!1 in c) if (g = c[!1], g.ha = g.q, b) for (h = 0; !a.Sa && h < e[C] && g.ha; h++) fa(a, e[h]), d &= ld(g, e[h], a[A], !1, a) && a.Ib != !1;
        else for (e = this; !a.Sa && e && g.ha; e = e.bd) fa(a, e), d &= ld(g, e, a[A], !1, a) && a.Ib != !1;
        a = Boolean(d)
    } else a = !0;
    return a
};
M.ta = function () {
    md.I.ta[I](this);
    jd(this);
    this.bd = i
};
var od = function (a, b, c, d, e) {
        if (!R && (!pc || !Bc("525"))) return !0;
        if (rc && e) return nd(a);
        if (e && !d) return !1;
        if (!c && (b == 17 || b == 18)) return !1;
        if (R && d && b == a) return !1;
        switch (a) {
        case 13:
            return !(R && Dc(9));
        case 27:
            return !pc
        }
        return nd(a)
    },
    nd = function (a) {
        if (a >= 48 && a <= 57) return !0;
        if (a >= 96 && a <= 106) return !0;
        if (a >= 65 && a <= 90) return !0;
        if (pc && a == 0) return !0;
        switch (a) {
        case 32:
        case 63:
        case 107:
        case 109:
        case 110:
        case 111:
        case 186:
        case 189:
        case 187:
        case 188:
        case 190:
        case 191:
        case 192:
        case 222:
        case 219:
        case 220:
        case 221:
            return !0;
        default:
            return !1
        }
    };
var pd = function (a, b) {
        a && this.Mf(a, b)
    };
Q(pd, md);
M = pd[D];
M.Nb = i;
M.uc = i;
M.kd = i;
M.vc = i;
M.Ka = -1;
M.Ja = -1;
var qd = {
    3: 13,
    12: 144,
    63232: 38,
    63233: 40,
    63234: 37,
    63235: 39,
    63236: 112,
    63237: 113,
    63238: 114,
    63239: 115,
    63240: 116,
    63241: 117,
    63242: 118,
    63243: 119,
    63244: 120,
    63245: 121,
    63246: 122,
    63247: 123,
    63248: 44,
    63272: 46,
    63273: 36,
    63275: 35,
    63276: 33,
    63277: 34,
    63289: 144,
    63302: 45
},
    rd = {
        Up: 38,
        Down: 40,
        Left: 37,
        Right: 39,
        Enter: 13,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        "U+007F": 46,
        Home: 36,
        End: 35,
        PageUp: 33,
        PageDown: 34,
        Insert: 45
    },
    sd = {
        61: 187,
        59: 186
    },
    td = R || pc && Bc("525");
M = pd[D];
M.pf = function (a) {
    if (pc && (this.Ka == 17 && !a[db] || this.Ka == 18 && !a.altKey)) this.Ja = this.Ka = -1;
    td && !od(a[v], this.Ka, a.shiftKey, a[db], a.altKey) ? this[Ra](a) : this.Ja = oc && a[v] in sd ? sd[a[v]] : a[v]
};
M.qf = function () {
    this.Ja = this.Ka = -1
};
M.handleEvent = function (a) {
    var b = a.Aa,
        c, d;
    R && a[A] == "keypress" ? (c = this.Ja, d = c != 13 && c != 27 ? b[v] : 0) : pc && a[A] == "keypress" ? (c = this.Ja, d = b[La] >= 0 && b[La] < 63232 && nd(c) ? b[La] : 0) : nc ? (c = this.Ja, d = nd(c) ? b[v] : 0) : (c = b[v] || this.Ja, d = b[La] || 0, rc && d == 63 && !c && (c = 191));
    var e = c,
        g = b.keyIdentifier;
    c ? c >= 63232 && c in qd ? e = qd[c] : c == 25 && a.shiftKey && (e = 9) : g && g in rd && (e = rd[g]);
    a = e == this.Ka;
    this.Ka = e;
    b = new ud(e, d, a, b);
    try {
        this.dispatchEvent(b)
    } finally {
        b.Ra()
    }
};
M.Mf = function (a, b) {
    this.vc && this.detach();
    this.Nb = a;
    this.uc = T(this.Nb, "keypress", this, b);
    this.kd = T(this.Nb, "keydown", this.pf, b, this);
    this.vc = T(this.Nb, "keyup", this.qf, b, this)
};
M.detach = function () {
    if (this.uc) hd(this.uc), hd(this.kd), hd(this.vc), this.vc = this.kd = this.uc = i;
    this.Nb = i;
    this.Ja = this.Ka = -1
};
M.ta = function () {
    pd.I.ta[I](this);
    this.detach()
};
var ud = function (a, b, c, d) {
        d && this.Db(d, f);
        ha(this, "key");
        ga(this, a);
        this.charCode = b;
        this.repeat = c
    };
Q(ud, Nc);
var vd = function () {};
(function (a) {
    a.Fa = function () {
        return a.Df || (a.Df = new a)
    }
})(vd);
vd[D].Of = 0;
vd[D].Oa = function () {
    return ":" + (this.Of++)[B](36)
};
vd.Fa();
var wd = "StopIteration" in N ? N.StopIteration : ba("StopIteration"),
    xd = function () {};
xd[D].next = function () {
    throw wd;
};
xd[D].Kf = function () {
    return this
};
var yd = function (a, b) {
        this.Ia = {};
        this.P = [];
        var c = arguments[C];
        if (c > 1) {
            if (c % 2) throw ba("Uneven number of arguments");
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
        } else a && this.mf(a)
    };
M = yd[D];
M.q = 0;
M.jd = 0;
M.tc = function () {
    this.nd();
    for (var a = [], b = 0; b < this.P[C]; b++) a[n](this.Ia[this.P[b]]);
    return a
};
M.Lb = function () {
    this.nd();
    return this.P.concat()
};
M.lb = function (a) {
    return j[D][gb][I](this.Ia, a)
};
M.nd = function () {
    if (this.q != this.P[C]) {
        for (var a = 0, b = 0; a < this.P[C];) {
            var c = this.P[a];
            j[D][gb][I](this.Ia, c) && (this.P[b++] = c);
            a++
        }
        ja(this.P, b)
    }
    if (this.q != this.P[C]) {
        for (var d = {}, b = a = 0; a < this.P[C];) c = this.P[a], j[D][gb][I](d, c) || (this.P[b++] = c, d[c] = 1), a++;
        ja(this.P, b)
    }
};
M.get = function (a, b) {
    return j[D][gb][I](this.Ia, a) ? this.Ia[a] : b
};
M.set = function (a, b) {
    j[D][gb][I](this.Ia, a) || (this.q++, this.P[n](a), this.jd++);
    this.Ia[a] = b
};
M.mf = function (a) {
    var b;
    if (a instanceof yd) b = a.Lb(), a = a.tc();
    else {
        b = [];
        var c = 0,
            d;
        for (d in a) b[c++] = d;
        c = [];
        d = 0;
        for (var e in a) c[d++] = a[e];
        a = c
    }
    for (e = 0; e < b[C]; e++) this.set(b[e], a[e])
};
M.Kf = function (a) {
    this.nd();
    var b = 0,
        c = this.P,
        d = this.Ia,
        e = this.jd,
        g = this,
        h = new xd;
    h.next = function () {
        for (;;) {
            if (e != g.jd) throw ba("The map has changed since the iterator was created");
            if (b >= c[C]) throw wd;
            var h = c[b++];
            return a ? h : d[h]
        }
    };
    return h
};
var zd = function (a, b, c) {
        this.mb = a || i;
        this.ge = b || i;
        this.Bf = !! c
    };
M = zd[D];
M.jb = function () {
    if (!this.K && (this.K = new yd, this.q = 0, this.mb)) for (var a = this.mb[G]("&"), b = 0; b < a[C]; b++) {
        var c = a[b][q]("="),
            d = i,
            e = i;
        c >= 0 ? (d = a[b].substring(0, c), e = a[b].substring(c + 1)) : d = a[b];
        d = da(d[o](/\+/g, " "));
        d = this.ib(d);
        this.add(d, e ? da(e[o](/\+/g, " ")) : "")
    }
};
M.K = i;
M.q = i;
M.add = function (a, b) {
    this.jb();
    this.Od();
    a = this.ib(a);
    if (this.lb(a)) {
        var c = this.K.get(a);
        Eb(c) ? c[n](b) : this.K.set(a, [c, b])
    } else this.K.set(a, b);
    this.q++;
    return this
};
M.lb = function (a) {
    this.jb();
    a = this.ib(a);
    return this.K.lb(a)
};
M.Lb = function () {
    this.jb();
    for (var a = this.K.tc(), b = this.K.Lb(), c = [], d = 0; d < b[C]; d++) {
        var e = a[d];
        if (Eb(e)) for (var g = 0; g < e[C]; g++) c[n](b[d]);
        else c[n](b[d])
    }
    return c
};
M.tc = function (a) {
    this.jb();
    if (a) if (a = this.ib(a), this.lb(a)) {
        var b = this.K.get(a);
        if (Eb(b)) return b;
        else a = [], a[n](b)
    } else a = [];
    else for (var b = this.K.tc(), a = [], c = 0; c < b[C]; c++) {
        var d = b[c];
        Eb(d) ? ac(a, d) : a[n](d)
    }
    return a
};
M.set = function (a, b) {
    this.jb();
    this.Od();
    a = this.ib(a);
    if (this.lb(a)) {
        var c = this.K.get(a);
        Eb(c) ? this.q -= c[C] : this.q--
    }
    this.K.set(a, b);
    this.q++;
    return this
};
M.get = function (a, b) {
    this.jb();
    a = this.ib(a);
    if (this.lb(a)) {
        var c = this.K.get(a);
        return Eb(c) ? c[0] : c
    } else return b
};
ia(M, function () {
    if (this.mb) return this.mb;
    if (!this.K) return "";
    for (var a = [], b = 0, c = this.K.Lb(), d = 0; d < c[C]; d++) {
        var e = c[d],
            g = Sb(e),
            e = this.K.get(e);
        if (Eb(e)) for (var h = 0; h < e[C]; h++) b > 0 && a[n]("&"), a[n](g), e[h] !== "" && a[n]("=", Sb(e[h])), b++;
        else b > 0 && a[n]("&"), a[n](g), e !== "" && a[n]("=", Sb(e)), b++
    }
    return this.mb = a.join("")
});
M.Od = function () {
    delete this.ag;
    delete this.mb;
    this.ge && delete this.ge.$f
};
M.ib = function (a) {
    a = String(a);
    this.Bf && (a = a[Bb]());
    return a
};
var Ad = function () {};
var Bd = function (a, b, c, d, e, g, h) {
        this.re = O(a) && O(b) ? new Date(a, b, c, d, e, g, h) : O(a) ? new Date(a) : new Date;
        if (!Bd[D].getDate) {
            a = j.getOwnPropertyNames(this.re.__proto__);
            for (b = 0; b < a[C]; b++) a[b] != "constructor" && (Bd[D][a[b]] = P(function (a, b) {
                return this.re[a](b)
            }, a[b]))
        }
    };
Q(Bd, Ad);
Bd.UTC = Date.UTC;
var Cd = function () {
        switch (arguments[C]) {
        case 0:
            break;
        case 1:
            ja(this, arguments[0]);
            break;
        default:
            for (var a = 0; a < arguments[C]; ++a) this[n](arguments[a])
        }
    };
Q(Cd, aa);
var Dd = function () {},
    Ed = {},
    Fd = 0,
    Gd = 0,
    Hd = [];
Dd.addListener = function (a) {
    O(a) && "onKeyUp" in a && "onKeyDown" in a && (Yb(Hd, a) >= 0 || Hd[n](a))
};
Dd.getAscii = function () {
    return Gd
};
Dd.getCode = function () {
    return Fd
};
Dd.isDown = function (a) {
    return Ed[a] ? !0 : !1
};
Dd.isToggled = function () {
    return !1
};
Dd.removeListener = function (a) {
    $b(Hd, a)
};
j.defineProperties(Dd, {
    BACKSPACE: {
        value: 8,
        G: !0
    },
    CAPSLOCK: {
        value: 20,
        G: !0
    },
    CONTROL: {
        value: 17,
        G: !0
    },
    DELETEKEY: {
        value: 46,
        G: !0
    },
    DOWN: {
        value: 40,
        G: !0
    },
    END: {
        value: 35,
        G: !0
    },
    ENTER: {
        value: 13,
        G: !0
    },
    ESCAPE: {
        value: 27,
        G: !0
    },
    HOME: {
        value: 36,
        G: !0
    },
    INSERT: {
        value: 45,
        G: !0
    },
    LEFT: {
        value: 37,
        G: !0
    },
    PGDN: {
        value: 34,
        G: !0
    },
    PGUP: {
        value: 33,
        G: !0
    },
    RIGHT: {
        value: 39,
        G: !0
    },
    SHIFT: {
        value: 16,
        G: !0
    },
    SPACE: {
        value: 32,
        G: !0
    },
    TAB: {
        value: 9,
        G: !0
    },
    UP: {
        value: 38,
        G: !0
    }
});
T(k, "keyup", function (a) {
    Fd = a[v];
    Ed[a[v]] = !1;
    for (a = 0; a < Hd[C]; ++a) Hd[a].onKeyUp()
}, !1);
T(new pd(k), "key", function (a) {
    Fd = a[v];
    Gd = a[La];
    Ed[a[v]] = !0;
    for (a = 0; a < Hd[C]; ++a) Hd[a].onKeyDown()
}, !1);
var Id = function (a) {
        this.O = a;
        this.za = !0;
        this.gb = [];
        T(this.O.ea(), "mousedown", this.ob, !0, this);
        T(this.O.ea(), "mouseup", this.pb, !0, this);
        T(this.O.ea(), "mousemove", this.Lc, !0, this)
    };
Id[D].update = function () {
    this.O.ea()[H].cursor = this.za ? this.O.Ya() ? "pointer" : this.O.df() ? "pointer" : !this.O[yb]() && this.O.ef() ? "pointer" : "default" : "none"
};
Id[D].ob = function () {
    Zb(this.gb, function (a) {
        a.bg()
    })
};
Id[D].Lc = function () {
    Zb(this.gb, function (a) {
        a.cg()
    })
};
Id[D].pb = function () {
    Zb(this.gb, function (a) {
        a.dg()
    })
};
Id[D].addListener = function (a) {
    if (O(a)) {
        var b = this.O.t().h(a, "onMouseMove"),
            c = this.O.t().h(a, "onMouseUp");
        this.O.t().h(a, "onMouseDown") in a && b in a && c in a && (Yb(this.gb, a) >= 0 || this.gb[n](a))
    }
};
Id[D].hide = function () {
    var a = this.za;
    this.za = !1;
    this[vb]();
    return a
};
Id[D].show = function () {
    var a = this.za;
    this.za = !0;
    this[vb]();
    return a
};
Id[D].removeListener = function (a) {
    $b(this.gb, a)
};
var Nd = function (a, b, c, d) {
        b = i;
        switch (a[A]) {
        case 2:
            c = Jd("linearGradient", a, d);
            c[x]("x1", -16384);
            c[x]("x2", 16384);
            b = c;
            break;
        case 3:
        case 4:
            c = Jd("radialGradient", a, d);
            c[x]("r", 16384);
            c[x]("cx", 0);
            c[x]("cy", 0);
            a[Za].f && d.aa(c, "fx", a[Za].f, function (a) {
                return a * 16384
            });
            b = c;
            break;
        case 5:
        case 7:
            if (d = k.getElementById("defmain").querySelector("#def" + a[xa])) c = Kd(Ld(a[zb]), c[0]), b = Md(a, c, d[wa].baseVal.value, d[L].baseVal.value)
        }
        if (a[Za] && a[Za].spread) switch (a[Za].spread) {
        case 1:
            b[x]("spreadMethod", "reflect");
            break;
        case 2:
            b[x]("spreadMethod", "repeat")
        }
        if (a[Za] && a[Za].interpolation) switch (a[Za].interpolation) {
        case 1:
            b[x]("color-interpolation", "linearRGB")
        }
        if (b != i) b.id = vd.Fa().Oa();
        return b
    },
    Jd = function (a, b, c) {
        a = k[F]("http://www.w3.org/2000/svg", a);
        a[x]("gradientUnits", "userSpaceOnUse");
        b[zb] && c.aa(a, "gradientTransform", b[zb], Ld);
        for (var d = 0; d < b[Za].stops[C]; d++) a[m](Od(b[Za].stops[d], c));
        return a
    },
    Od = function (a, b) {
        var c = k[F]("http://www.w3.org/2000/svg", "stop");
        b.aa(c, "offset", a.offset, function (a) {
            return a / 255
        });
        b.aa(c, "stop-color", a[s], Pd);
        b.aa(c, "stop-opacity", a[s], Qd);
        return c
    },
    Rd = function (a, b, c, d) {
        switch (b[A]) {
        case 1:
            c.aa(a, "fill", b[s], Pd);
            c.aa(a, "fill-opacity", b[s], Qd);
            break;
        case 2:
        case 3:
        case 4:
            a[x]("fill", "url(#" + d.id + ")")
        }
    };

function Sd(a, b) {
    this.$d = a;
    this.ae = b
}
var Kd = function (a, b) {
        function c(a, b) {
            e.x = a;
            e.y = b;
            e.V(d);
            g[n](e.x);
            h[n](e.y)
        }
        var d = a.Sc(),
            e = new U(0, 0),
            g = [],
            h = [];
        c(b[pb], b[oa]);
        c(b[sb], b[oa]);
        c(b[pb], b[ua]);
        c(b[sb], b[ua]);
        return new Sd(g, h)
    },
    Md = function (a, b, c, d) {
        var e = k[F]("http://www.w3.org/2000/svg", "g");
        e.id = vd.Fa().Oa();
        var g = k[F]("http://www.w3.org/2000/svg", "g"),
            h = k[F]("http://www.w3.org/2000/svg", "g");
        h[m](e);
        h[m](g);
        for (var r = l[Da](l.min[K](l, b.$d) / c), z = l.ceil(l.max[K](l, b.$d) / c); r < z; r++) {
            var w = k[F]("http://www.w3.org/2000/svg", "use");
            w[Ga]("http://www.w3.org/1999/xlink", "href", "url(#def" + a[xa] + ")");
            w[x]("x", r * c);
            e[m](w)
        }
        a = l[Da](l.min[K](l, b.ae) / d);
        for (b = l.ceil(l.max[K](l, b.ae) / d); a < b; a++) c = k[F]("http://www.w3.org/2000/svg", "use"), c[Ga]("http://www.w3.org/1999/xlink", "href", "url(#" + e.id + ")"), c[x]("y", a * d), g[m](c);
        return h
    };
var Td = function (a, b, c, d) {
        if (b != i) {
            if (b[Xa] != i) a[x]("stroke", "url(#" + d.id + ")");
            else if (b[s] != i) c.aa(a, "stroke", b[s], Pd), c.aa(a, "stroke-opacity", b[s], function (a) {
                return a ? Qd(a) : 1
            });
            else a[x]("stroke", "rgb(0,0,0)");
            c.aa(a, "stroke-width", b[wa], function (a) {
                return l.max(14, a)
            });
            c = "round";
            if (b.cap != i) switch (b.cap) {
            case 1:
                c = "butt";
                break;
            case 2:
                c = "square"
            }
            a[x]("stroke-linecap", c);
            c = "round";
            if (b.joint != i) switch (b.joint) {
            case 1:
                c = "bevel";
                break;
            case 2:
                c = "miter"
            }
            a[x]("stroke-linejoin", c);
            b.miter != i && a[x]("stroke-miterlimit", b.miter)
        }
    };
var Ud = function () {
        this.L = {}
    };
Ud[D].Na = function (a, b) {
    this.L[a] = b
};
Ud[D].tf = function (a) {
    return this.L[a] || i
};
var Vd = function (a) {
        this.o = [];
        this.Vd = !1;
        this.He = a;
        this.oc = []
    };
M = Vd[D];
M.Q = function () {
    this.Kd = this.Vd ? k[F]("http://www.w3.org/2000/svg", "clipPath") : k[F]("http://www.w3.org/2000/svg", "g")
};
M.R = function () {
    return this.Kd
};
M.Xa = function (a, b) {
    a.depth = b;
    for (var c, d = 0; d < this.o[C]; ++d) {
        var e = this.o[d],
            g = e[y];
        if (b > g) b <= e.ia && a.Ld(e);
        else {
            Wb(b < g);
            O(c) || (c = e.R(), c[ub] && c[ub].insertBefore(a.R(), c), c = d);
            if (g > a.ia) break;
            e.Ld(a)
        }
    }
    if (O(c)) this.o[wb](c, 0, a);
    else this.Kd[m](a.R()), this.o[n](a);
    Wd(this.r, a)
};
M.od = function (a) {
    return bc(this.o, function (a, c) {
        return a - c[y]
    } || cc, !1, a)
};
M.Vc = function (a) {
    a = this.od(a);
    return a >= 0 ? this.wc(a) : i
};
M.We = function (a) {
    a.zf();
    Fc(a.R())
};
M.wc = function (a, b) {
    var c = this.o[a],
        d = c[y];
    this.We(c);
    b != !0 && (c.Jd() ? (c.Ga(), this.oc[n](c)) : (Xd(this.r, c), c.S()));
    this.o[wb](a, 1);
    if (c.ia > 0) for (var e = a; e < this.o[C]; ++e) {
        var g = this.o[e],
            h = g[y];
        if (h > c.ia) break;
        h > d && g.Ve(c)
    }
    c.depth = f;
    return c
};
M.me = function (a) {
    a = this.od(a);
    return a < 0 ? i : this.wc(a, !0)
};
M.jf = function (a) {
    for (var b = 0; b < this.o[C]; ++b) if (this.o[b] == a) return this.wc(b)
};
M.Pc = function (a) {
    a = this.od(a);
    return a >= 0 ? this.o[a] : i
};
M.S = function () {
    for (var a = 0; a < this.o[C]; a++) this.wc(a)
};
M.Ga = function () {
    for (var a = 0; a < this.o[C]; a++) this.o[a].Ga()
};
M.Se = function () {
    for (var a = 0; a < this.oc[C]; a++) {
        var b = this.oc[a];
        b.S();
        Xd(this.r, b)
    }
    this.oc = []
};
M.te = function (a) {
    this.Vd = a
};
M.sa = function (a) {
    for (var b = 0; b < this.o[C]; ++b) this.o[b].sa(a)
};
M.X = function (a) {
    for (var b = !1, c = 0; c < this.o[C]; ++c) b = this.o[c].X(a) || b;
    return b
};
M.nf = function (a) {
    this.r = a;
    for (var b = 0; b < this.o[C]; ++b) Wd(a, this.o[b])
};
M.ld = function (a, b) {
    this.r && (Xd(this.r, a), b && Wd(this.r, a, b))
};
M.pd = function (a, b) {
    var c = this.me(a),
        d = this.me(b);
    c && this.Xa(c, b);
    d && this.Xa(d, a)
};
var Wd = function (a, b, c) {
        a && (O(c) || (c = b[Ka]()), c && j[u](a, c, {
            get: function () {
                return b.N()
            },
            set: function () {},
            configurable: !0
        }))
    },
    Xd = function (a, b) {
        if (a) {
            var c = b[Ka]();
            c && delete a[c]
        }
    };
Vd[D].Xe = function (a) {
    for (var b = 0, c = 0; b < this.o[C] || c < a.o[C];) {
        var d = this.o[b],
            e = a.o[c],
            g = d ? d[y] : Number[va],
            h = e ? e[y] : Number[va];
        h < g ? (e instanceof Yd && e[Ca](), this.Xa(e, h), c++, b++) : h > g ? d.tb() ? b++ : this.Vc(g) : (Wb(g == h), Wb(d && e), d.tb() || (!d.Qa() || !e.Qa() || d.xb != e.xb ? (this.Vc(h), e instanceof Yd && e[Ca](), this.Xa(e, h)) : (d[t](e.D()), d.ja(e.Ca()), e.S())), b++, c++)
    }
};
var U = function (a, b) {
        this.x = a;
        this.y = b
    };
U[D].V = function (a) {
    var b = this.x * a.b + this.y * a.d + a.f;
    this.x = this.x * a.a + this.y * a.c + a.e;
    this.y = b
};
var V = function (a, b, c, d, e, g) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = g
    };
M = V[D];
M.Sc = function () {
    var a = this.a * this.d - this.b * this.c;
    return new V(this.d / a, -this.b / a, -this.c / a, this.a / a, (this.c * this.f - this.d * this.e) / a, (this.b * this.e - this.a * this.f) / a)
};
M.yf = function (a) {
    var b = l.cos(a),
        a = l.sin(a);
    return new V(this.a * b - this.c * a, this.b * b - this.d * a, this.a * a + this.c * b, this.b * a + this.d * b, this.e, this.f)
};
M.zc = function (a, b) {
    return new V(this.a * a, this.b * a, this.c * b, this.d * b, this.e, this.f)
};
M.translate = function (a, b) {
    return new V(this.a, this.b, this.c, this.d, this.e + a, this.f + b)
};
ia(M, function () {
    return "matrix(" + this.a + " " + this.b + " " + this.c + " " + this.d + " " + this.e + " " + this.f + ")"
});
M.multiply = function (a) {
    return new V(this.a * a.a + this.c * a.b, this.b * a.a + this.d * a.b, this.a * a.c + this.c * a.d, this.b * a.c + this.d * a.d, this.a * a.e + this.c * a.f + this.e, this.b * a.e + this.d * a.f + this.f)
};
var Zd = function (a, b, c, d, e, g, h) {
        this.kc = a;
        this.jc = b;
        this.ic = c;
        this.hc = d;
        this.gc = e;
        this.fc = g;
        this.eb = h
    };
Zd[D].Ze = function (a) {
    return a != i && this.kc == a.kc && this.jc == a.jc && this.ic == a.ic && this.hc == a.hc && this.gc == a.gc && this.fc == a.fc
};
var $d = function (a, b, c, d) {
        this.Id();
        if (O(a)) this.v = a;
        if (O(b)) this.w = b;
        if (O(c)) this.A = c;
        if (O(d)) this.B = d
    };
M = $d[D];
M.Id = function () {
    this.v = Number[va];
    this.A = Number.NEGATIVE_INFINITY;
    this.w = Number[va];
    this.B = Number.NEGATIVE_INFINITY
};
M.expand = function (a) {
    if (a.x < this.v) this.v = a.x;
    if (a.x > this.A) this.A = a.x;
    if (a.y < this.w) this.w = a.y;
    if (a.y > this.B) this.B = a.y
};
M.add = function (a) {
    this.w += a.w;
    this.B += a.B;
    this.v += a.v;
    this.A += a.A
};
M.V = function (a) {
    var b = new U(this.v, this.w),
        c = new U(this.v, this.B),
        d = new U(this.A, this.w),
        e = new U(this.A, this.B);
    this.Id();
    b.V(a);
    c.V(a);
    d.V(a);
    e.V(a);
    this[ya](b);
    this[ya](c);
    this[ya](d);
    this[ya](e)
};
M.Ue = function (a) {
    return (this.v >= a.v && this.v <= a.A || this.A >= a.v && this.A <= a.A || a.v >= this.v && a.v <= this.A) && (this.w >= a.w && this.w <= a.B || this.B >= a.w && this.B <= a.B || a.w >= this.w && a.w <= this.B)
};
M.contains = function (a, b) {
    return a >= this.v && a <= this.A && b >= this.w && b <= this.B
};
M.bf = function (a) {
    this[ya](new U(a.v, a.w));
    this[ya](new U(a.v, a.B));
    this[ya](new U(a.A, a.w));
    this[ya](new U(a.A, a.B))
};
var W = function () {
        this.ia = 0;
        this.fb = this.ra = i;
        this.zb = "";
        this.Ha = i;
        this.$ = !1;
        this.Gc = "";
        this.mc = new ae(this);
        this.$b = [];
        this.za = !0;
        this.xb = 0;
        this.Hd = this.Dd = !1
    };
M = W[D];
M.Q = function () {
    this.z = this.qa = this.La()
};
M.N = function () {
    var a = this.r;
    if (!a) this.r = a = new X(this);
    return a
};
M.tb = function () {
    return this.r != f && this.r.__swiffy_dm
};
M.R = function () {
    return this.z
};
M.setTransform = function (a) {
    this.md = a;
    var b = a[B]() + " " + this.Gc;
    this.ia > 0 ? Zb(this.qa[Ta], function (a) {
        a[x]("transform", b)
    }) : this.qa[x]("transform", b);
    this.$ = !0
};
M.D = function () {
    if (!this.md) this.md = new V(1, 0, 0, 1, 0, 0);
    return this.md
};
M.Me = function (a) {
    this.ia = a
};
M.dc = function (a) {
    this.xb = a
};
M.S = function () {
    this.Hd = !0;
    this.ra != i && Fc(this.ra)
};
M.Ga = function () {
    this.Dd = !0
};
M.ja = function (a) {
    this.$ |= this.mc.ja(a)
};
M.Ca = function () {
    return this.mc.Ca()
};
M.ua = function () {
    var a;
    a = i;
    for (var b = this.z; b instanceof SVGElement;) {
        if (b[zb]) {
            var c = b[zb].baseVal.consolidate();
            c != i && (a = a != i ? c[Aa].multiply(a) : c[Aa])
        }
        b = b[ub]
    }
    return a != i ? new V(a.a, a.b, a.c, a.d, a.e, a.f) : new V(1, 0, 0, 1, 0, 0)
};
M.Ld = function (a) {
    var b = k[F]("http://www.w3.org/2000/svg", "g"),
        a = a.R();
    if (a.id == "") a.id = vd.Fa().Oa();
    b[x]("clip-path", "url(#" + a.id + ")");
    Gc(b, this.z);
    b[m](this.z);
    this.z = b
};
M.Ve = function (a) {
    if (this.qa != this.z) {
        var b = this.qa;
        do
        if (b = b[ub], b[lb]("clip-path") == "url(#" + a.R().id + ")") {
            if (b == this.z) this.z = b[Oa];
            Gc(b[Oa], b);
            break
        }
        while (b != this.z)
    }
};
M.zf = function () {
    if (this.qa != this.z) for (; this.z[lb]("clip-path") != i;) {
        var a = this.z[Oa];
        Gc(a, this.z);
        this.z = a
    }
};
M.xa = function () {
    if (this.ra == i) {
        this.ra = k[F]("http://www.w3.org/2000/svg", "filter");
        this.ra.id = vd.Fa().Oa();
        k.getElementById("defmain")[m](this.ra);
        if (this.fb == i && (this.fb = k[F]("http://www.w3.org/2000/svg", "g"), Gc(this.fb, this.qa), this.fb[m](this.qa), this.z == this.qa)) this.z = this.fb;
        this.fb[x]("filter", "url(#" + this.ra.id + ")")
    }
    return this.ra
};
M.Ad = function (a) {
    var b = "SourceGraphic";
    if (this.$a()) this.$b = [], Ec(this.ra), this.mc[K](b);
    for (var c = 0; c < a[C]; ++c) {
        var d = new be[a[c][A]](this, a[c]);
        d && (this.$b[n](d), d[K](b), b = d[ab]())
    }
    this.mc.gf(b);
    this.Td()
};
M.Td = function () {
    if (this.$a()) {
        for (var a = i, b = 0; b < this.$b[C]; ++b) {
            var c = this.$b[b].region;
            a == i ? a = c : c != i && a.add(c)
        }
        if (a != i) {
            var b = this.z.getBBox(),
                c = this.xa(),
                d = a.A - a.v,
                e = a.B - a.w;
            c[x]("x", a.v / b[wa] - 0.1);
            c[x]("y", a.w / b[L] - 0.1);
            c[x]("width", 1.2 + d / b[wa]);
            c[x]("height", 1.2 + e / b[L])
        }
    }
};
M.$a = function () {
    return !!this.ra
};
M.Xc = function () {
    var a = i,
        b = this;
    do b.$a() && (a = b), b = b.Ha;
    while (b);
    if (a) {
        for (b = this; b.Ha;) b = b.Ha;
        b.dd(a.z)
    }
};
M.Ub = function (a) {
    a = String(a);
    a != this.zb && this.Ha && this.Ha.ld(this, a);
    this.zb = a
};
M.getName = function () {
    return this.zb
};
M.bc = function (a) {
    this.Ha = a
};
M.getParent = function () {
    return this.Ha
};
M.sa = function () {
    this.$a() && this.$ && this.Xc();
    this.$ = !1
};
M.X = function () {
    this.$ && this.Td();
    var a = this.$;
    this.$ = !1;
    return a
};
M.Qf = function (a) {
    this.za = a;
    this.z[x]("display", this.za ? "inline" : "none")
};
M.Qa = function () {
    return !1
};
M.Jd = function () {
    return !1
};
M.yb = function () {
    var a = this.z.getBBox(),
        b = [];
    b[0] = new U(a.x, a.y);
    b[1] = new U(a.x, a.y + a[L]);
    b[2] = new U(a.x + a[wa], a.y);
    b[3] = new U(a.x + a[wa], a.y + a[L]);
    for (var a = new $d, c = 0; c < b[C]; ++c) a[ya](b[c]);
    return a
};
var X = function (a) {
        this.__swiffy_d = a;
        this.__swiffy_dm = !1
    };
Q(X, Ad);
j[u](X[D], "_x", {
    get: function () {
        return this.__swiffy_d.D().e / 20
    },
    set: function (a) {
        var b = this.__swiffy_d.D();
        this.__swiffy_d[t](b.translate(a * 20 - b.e, 0));
        this.__swiffy_dm = !0
    }
});
j[u](X[D], "_y", {
    get: function () {
        return this.__swiffy_d.D().f / 20
    },
    set: function (a) {
        var b = this.__swiffy_d.D();
        this.__swiffy_d[t](b.translate(0, a * 20 - b.f));
        this.__swiffy_dm = !0
    }
});
j[u](X[D], "_xscale", {
    get: function () {
        var a = this.__swiffy_d.D();
        return 100 * l[Pa](a.a * a.a + a.b * a.b)
    },
    set: function (a) {
        var b = this.__swiffy_d,
            c = b.D();
        b[t](c.zc(a / (100 * l[Pa](c.a * c.a + c.b * c.b)), 1));
        this.__swiffy_dm = !0
    }
});
j[u](X[D], "_yscale", {
    get: function () {
        var a = this.__swiffy_d.D();
        return 100 * l[Pa](a.c * a.c + a.d * a.d)
    },
    set: function (a) {
        var b = this.__swiffy_d,
            c = b.D();
        b[t](c.zc(1, a / (100 * l[Pa](c.c * c.c + c.d * c.d))));
        this.__swiffy_dm = !0
    }
});
j[u](X[D], "_alpha", {
    get: function () {
        return this.__swiffy_d.Ca().eb / 2.56
    },
    set: function (a) {
        var b = this.__swiffy_d.Ca();
        b.eb = a * 2.56;
        this.__swiffy_d.ja(b);
        this.__swiffy_dm = !0
    }
});
j[u](X[D], "_visible", {
    get: function () {
        return this.__swiffy_d.za
    },
    set: function (a) {
        this.__swiffy_d.Qf(a);
        this.__swiffy_dm = !0
    }
});
j[u](X[D], "_rotation", {
    get: function () {
        var a = this.__swiffy_d.D();
        return -180 * l.atan2(a.c, a.a) / l.PI
    },
    set: function (a) {
        var b = this.__swiffy_d,
            c = b.D(),
            a = a * l.PI / -180;
        a -= l.atan2(c.c, c.a);
        b[t](c.yf(a));
        this.__swiffy_dm = !0
    }
});
j[u](X[D], "_name", {
    get: function () {
        return this.__swiffy_d[Ka]()
    },
    set: function (a) {
        this.__swiffy_d.Ub(a);
        this.__swiffy_dm = !0
    }
});
j[u](X[D], "__quality", {
    get: function () {
        return 0
    },
    set: function () {}
});
j[u](X[D], "__highquality", {
    get: function () {
        return 0
    },
    set: function () {}
});
j[u](X[D], "__soundbuftime", {
    get: function () {
        return 0
    },
    set: function () {}
});
j[u](X[D], "_parent", {
    get: function () {
        var a = this.__swiffy_d.Ha;
        return a ? a.N() : a
    },
    set: function () {}
});
j[u](X[D], "_xmouse", {
    get: function () {
        var a = this.__swiffy_d;
        return ce(a.ua(), a.j.Wb).x
    },
    set: function () {}
});
j[u](X[D], "_ymouse", {
    get: function () {
        var a = this.__swiffy_d;
        return ce(a.ua(), a.j.Wb).y
    },
    set: function () {}
});
j[u](X[D], "_url", {
    get: function () {
        return k.location.href
    },
    set: function () {}
});
j[u](X[D], "_width", {
    get: function () {
        var a = this.__swiffy_d,
            b = a.yb();
        b.V(a.D());
        return (b.A - b.v) / 20
    },
    set: function (a) {
        a /= this._width;
        this.__swiffy_d[t](this.__swiffy_d.D().zc(a, 1));
        this.__swiffy_dm = !0
    }
});
j[u](X[D], "_height", {
    get: function () {
        var a = this.__swiffy_d,
            b = a.yb();
        b.V(a.D());
        return (b.B - b.w) / 20
    },
    set: function (a) {
        a /= this._height;
        this.__swiffy_d[t](this.__swiffy_d.D().zc(1, a));
        this.__swiffy_dm = !0
    }
});
var de = function (a, b) {
        W[I](this);
        this.g = a;
        this.k = b;
        this.Pa = []
    };
Q(de, W);
M = de[D];
M.La = function () {
    var a = k[F]("http://www.w3.org/2000/svg", "g");
    this.Kc = this.cc("up");
    this.ye = this.Kc.R();
    this.Jc = this.cc("over");
    this.xe = this.Jc.R();
    this.Hc = this.cc("down");
    this.we = this.Hc.R();
    this.Ic = this.cc("hit");
    this.M = this.Ic.R();
    this.M[x]("style", "pointer-events:all;visibility:hidden;");
    var b;
    "createTouch" in k || (b = T(this.M, "mouseover", this.Je, !1, this), this.Pa[n](b));
    b = T(this.M, "mouseout", this.Cc, !1, this);
    this.Pa[n](b);
    b = T(this.M, "createTouch" in k ? "touchend" : "mouseup", this.pb, !1, this);
    this.Pa[n](b);
    b = T(this.M, "createTouch" in k ? "touchstart" : "mousedown", this.ob, !1, this);
    this.Pa[n](b);
    if (b = this.g[cb]) for (var c = Ob(this.Ie, this), d = 0; d < b[C]; d++) {
        var e = b[d];
        e.convertedActions = ee(e[cb]);
        var g = P(c, e);
        e[v] && g(k, "keydown", !0, function (a, b) {
            return a[v] == b[v]
        });
        e.keyAscii && g(k, "keypress", !0, function (a, b) {
            return a[La] == b.keyAscii
        })
    }
    a[m](this.M);
    this.wd(1);
    return a
};
M.zd = function (a) {
    this.k.t().fd(new fe(a.convertedActions, this.k))
};
M.Ne = function (a) {
    var b = this.g[cb];
    if (b) {
        for (var c = 0; c < b[C]; c++) {
            var d = b[c];
            d[gb](a[Ka]()) && this.zd(d)
        }
        this.k.t().Rc(!1)
    }
};
M.la = function (a) {
    var b = this.g.sounds;
    b && b[gb](a[Ka]()) && this.k.Wa().Bd(b[a[Ka]()]);
    this.Ne(a);
    this.wd(a.F)
};
M.wd = function (a) {
    this.F = a;
    this.Ye();
    this.$ = !0;
    this.k.lc()
};
M.Je = function () {
    this.k.j.ue(this.M);
    this.k[yb]() == !1 && this.F == 1 ? this.la(ge) : this.g[qb] && this.k.Ya() == !1 && this.F == 1 ? this.la(he) : this.k.ub(this.M) && this.F == 2 && this.la(ie)
};
M.Cc = function () {
    this.k.j.ve(this.M);
    this.k[yb]() == !1 && this.F == 2 ? this.la(je) : this.g[qb] && this.k.Ya() == !1 && this.F == 3 ? this.la(ke) : this.k.ub(this.M) && this.F == 3 && this.la(le)
};
M.ob = function (a) {
    this.g[qb] ? this.k[Ba](this.M) : this.k[Ba](this.M, !0, Ob(this.Oe, this));
    a[eb]();
    this.la(me)
};
M.pb = function (a) {
    var b = this.g[qb] && this.k.Ya() == !1 || this.k.ub(this.M);
    this.k[Wa](this.M);
    a[eb]();
    b ? this.la(ne) : this.la(ge)
};
M.Oe = function () {
    this.la(oe)
};
M.Ie = function (a, b, c, d, e) {
    this.Pa[n](T(b, c, function (b) {
        e(b, a) && (this.zd(a), this.k.t().Rc(), b[eb]())
    }, d, this))
};
M.Ye = function () {
    var a = this.M,
        b = function (b, d) {
            b ? a[ub] && a[ub].insertBefore(d, a) : Fc(d)
        };
    b(this.F == 1, this.ye);
    b(this.F == 3, this.we);
    b(this.F == 2, this.xe)
};
M.cc = function (a) {
    var b = new Vd(!1);
    b.Q();
    var c = this.g.records;
    if (c) for (var d = 0; d < c[C]; d++) {
        var e = c[d];
        if (e[a]) {
            var g = this.k.Bc(e.id);
            g.bc(this);
            g.Q();
            g instanceof Yd && g[Ca]();
            b.Xa(g, e[y]);
            e[zb] && g[t](Ld(e[zb]));
            e[ob] && g.ja(pe(e[ob]))
        }
    }
    return b
};
M.sa = function (a) {
    if (this.$a()) this.X(a) && this.Xc();
    else {
        var b = this.$;
        this.$ = !1;
        this.F == 1 && this.Kc.sa(b || a);
        this.F == 2 && this.Jc.sa(b || a);
        this.F == 3 && this.Hc.sa(b || a);
        this.Ic.sa(b || a)
    }
};
M.X = function (a) {
    function b(b, d) {
        if (b && d.X(c || a)) e = !0
    }
    var c = de.I.X[I](this, a),
        d = this.Ic.X(c || a),
        e = !1;
    b(this.F == 1, this.Kc);
    b(this.F == 2, this.Jc);
    b(this.F == 3, this.Hc);
    return c || d || e
};
M.S = function () {
    for (var a = 0; a < this.Pa[C]; a++) hd(this.Pa[a]);
    de.I.S[I](this)
};
M.Qa = function () {
    return !0
};
var qe = function (a, b) {
        this.zb = a;
        this.F = b
    };
qe[D].getName = function () {
    return this.zb
};
var he = new qe("IdleToOverDown", 3),
    ge = new qe("IdleToOverUp", 2),
    oe = new qe("OutDownToIdle", 1),
    ie = new qe("OutDownToOverDown", 3),
    ke = new qe("OverDownToIdle", 1),
    le = new qe("OverDownToOutDown", 2),
    ne = new qe("OverDownToOverUp", 2),
    je = new qe("OverUpToIdle", 1),
    me = new qe("OverUpToOverDown", 3);
var re = function (a, b) {
        W[I](this);
        this.g = a;
        this.k = b
    };
Q(re, W);
re[D].La = function () {
    var a = this.g.bounds,
        b = k[F]("http://www.w3.org/2000/svg", "g"),
        c = k[F]("http://www.w3.org/2000/svg", "foreignObject"),
        d = k[Na]("body");
    c[m](d);
    var e = k[Na]("div");
    this.Tc = e;
    e[H]["font-family"] = "font" + this.g[pa];
    e[H]["font-size"] = this.g[L] + "px";
    this.g.bold && (e[H]["font-weight"] = "bold");
    this.g.italic && (e[H]["font-style"] = "italic");
    if (this.g[s]) {
        var g = Pd(this.g[s]);
        e[H].color = g[B]();
        e[H].opacity = g.a
    }
    e[H]["text-align"] = se(this.g.align);
    this.g.wrap ? this.g.html || (e[H]["white-space"] = "pre-wrap") : e[H]["white-space"] = "nowrap";
    e[H]["word-wrap"] = "break-word";
    this.g.selectable && (e[H]["pointer-events"] = "all");
    e[H]["text-indent"] = this.g[qa] + "px";
    if (this.g[qa] + this.g.leftMargin < 0) {
        var h = -(this.g[qa] + this.g.leftMargin),
            r = -this.g[qa],
            g = a[pb] + 30 - h;
        c[x]("width", a[sb] - a[pb] - 60 + h);
        e[H]["margin-left"] = r + "px"
    } else g = a[pb] + 30, c[x]("width", a[sb] - a[pb] - 60), e[H]["margin-left"] = this.g.leftMargin + "px";
    e[H]["margin-right"] = this.g.rightMargin + "px";
    this.Gc = "translate(" + g + " 0)";
    c[x]("x", 0);
    this.g.border && (h = k[F]("http://www.w3.org/2000/svg", "rect"), h[x]("x", a[pb] - g), h[x]("y", a[oa]), h[x]("width", a[sb] - a[pb]), h[x]("height", a[ua] - a[oa]), h[x]("fill", "white"), h[x]("stroke", "black"), h[x]("stroke-width", "10"), b[m](h));
    g = this.g[L] * 1.15;
    this.g[pa] != f && (h = k.getElementById("def" + this.g[pa])) && (g = this.g[L] * h[lb]("line-height"));
    h = g;
    this.g.leading && (g += this.g.leading);
    e[H]["line-height"] = g + "px";
    e[H]["padding-top"] = this.g[L] + (h - g) * 0.5 + "px";
    c[x]("y", a[oa] + 40 - this.g[L]);
    c[x]("height", a[ua] - a[oa] - 80 + this.g[L]);
    d[m](e);
    b[m](c);
    this.g.variable && this.k.t().Ke(this.g.variable, this, this.k);
    this.g.text && !O(this.Xb) && this.Mc(this.g.text);
    return b
};
re[D].Mc = function (a) {
    this.Xb = a;
    this.If()
};
re[D].If = function () {
    Ec(this.Tc);
    if (O(this.Xb)) {
        var a = String(this.Xb);
        if (this.g.html) te(this.Tc, a, this.g.multiline);
        else for (var b = this.Tc, a = a[G](/\r\n|\r|\n/g), c = 0; c < a[C]; c++) if (a[c] == "") {
            var d = k[Na]("br");
            b[m](d)
        } else {
            var d = k.createTextNode(a[c]),
                e = k[Na]("p");
            e[H].margin = 0;
            e[m](d);
            b[m](e)
        }
    }
};
var te = function (a, b, c) {
        var d = a,
            e = [],
            g = function (a, b) {
                var c = k[Na](a);
                d[m](c);
                d = c;
                e[n](b)
            },
            a = b[o](/&nbsp;/g, " ");
        ue(a, {
            Hf: function (a, b) {
                switch (a) {
                case "p":
                    g("p", a);
                    d[H].margin = 0;
                    var e = b[Ea]("align");
                    e && (d[H]["text-align"] = e[Ab]);
                    c || (d[H].display = "inline");
                    break;
                case "b":
                case "i":
                case "u":
                    g(a, a);
                    break;
                case "a":
                    g(a, a);
                    (e = b[Ea]("href")) && d[x]("href", e[Ab]);
                    (e = b[Ea]("target")) && d[x]("target", e[Ab]);
                    d[H]["pointer-events"] = "all";
                    d[H].color = "inherit";
                    break;
                case "br":
                    e = k[Na]("br");
                    d[m](e);
                    break;
                case "font":
                    g("span", a);
                    if (e = b[Ea]("color")) d[H].color = e[Ab];
                    (e = b[Ea]("size")) && (d[H]["font-size"] = e[Ab] * 20 + "px");
                    (e = b[Ea]("face")) && (d[H]["font-family"] = e[Ab])
                }
            },
            Ff: function (a) {
                e[e[C] - 1] == a && (e.pop(), d = d[ub])
            },
            Ef: function (a) {
                d[m](k.createTextNode(a))
            }
        })
    },
    se = function (a) {
        switch (a) {
        case 0:
            return "left";
        case 2:
            return "center";
        case 1:
            return "right";
        case 3:
            return "justify";
        default:
            return "left"
        }
    },
    ue = function (a, b) {
        var c = k[Na]("div");
        c.innerHTML = a;
        for (var d = 0; d < c[Ta][C]; d++) ve(c[Ta][d], b)
    },
    ve = function (a, b) {
        switch (a.nodeType) {
        case Node.ELEMENT_NODE:
            var c = a.nodeName[Bb]();
            b.Hf(c, a.attributes);
            for (var d = 0; d < a[Ta][C]; d++) ve(a[Ta][d], b);
            b.Ff(c);
            break;
        case Node.TEXT_NODE:
            b.Ef(a.textContent)
        }
    };
re[D].Qa = function () {
    return this.g.variable != f
};
var we = function (a, b) {
        W[I](this);
        this.g = a;
        this.k = b;
        this.bb = [];
        this.Zb = []
    };
Q(we, W);
we[D].La = function () {
    var a = this.g.fillstyles;
    if (a) for (var b = 0; b < a[C]; b++) {
        if (a[b] != f) var c = Nd(a[b], this.k, this.g.bounds, this);
        c != i && (this.bb[b] = c, this.k.Ba[m](c))
    }
    if (a = this.g.linestyles) for (b = 0; b < a[C]; b++) {
        if (a[b] != f && a[b][Xa] != f) var d = Nd(a[b][Xa], this.k, this.g.bounds, this);
        d != i && (this.Zb[b] = d, this.k.Ba[m](d))
    }
    return this.Pe()
};
we[D].S = function () {
    we.I.S[I](this);
    for (var a = 0; a < this.bb[C]; a++) Fc(this.bb[a]);
    for (a = 0; a < this.Zb[C]; a++) Fc(this.Zb[a])
};
we[D].Pe = function () {
    var a = this.g,
        b;
    b = this.ia == 0 ? k[F]("http://www.w3.org/2000/svg", "g") : k[F]("http://www.w3.org/2000/svg", "clipPath");
    for (var c = 0; c < a.paths[C]; c++) {
        var d = a.paths[c],
            e = k[F]("http://www.w3.org/2000/svg", "path");
        this.aa(e, "d", d[p], xe);
        e.onclick = function () {};
        b[m](e);
        if (d.line != i && a.linestyles != i) {
            var g = a.linestyles[d.line];
            Td(e, g, this, g[Xa] ? this.Zb[d.line] : i)
        }
        if (d[Xa] != i) if (g = a.fillstyles[d[Xa]], g[xa] == i) Rd(e, g, this, this.bb[d[Xa]]);
        else {
            var h = k[F]("http://www.w3.org/2000/svg", "clipPath");
            h.id = vd.Fa().Oa();
            h[m](e);
            this.k.Ba[m](h);
            e = k[F]("http://www.w3.org/2000/svg", "g");
            e[x]("clip-path", "url(#" + h.id + ")");
            b[m](e);
            h = k[F]("http://www.w3.org/2000/svg", "use");
			
				if (g[A] == 5 || g[A] == 7) Wb(this.bb[d[Xa]].id != i), h[Ga]("http://www.w3.org/1999/xlink", "href", "url(#" + this.bb[d[Xa]].id + ")");
	            else h[Ga]("http://www.w3.org/1999/xlink", "href", "url(#def" + g[xa] + ")");
			
            g[zb] && h[x]("transform", Ld(g[zb])[B]());
            e[m](h)
        } else e[x]("fill", "none")
    }
    return b[Ta][C] == 1 && this.ia == 0 ? b[Ta][0] : b
};
we[D].aa = function (a, b, c, d) {
    Wb(c[C] == 1);
    c = c[0];
    if (c instanceof ye || c instanceof V) c = c[B]();
    a[x](b, d ? d(c) : c)
};
var ze = function (a, b) {
        this.uf = a;
        this.sf = b
    };
ze[D].nb = function () {
    return 0
};
var Ae = function (a, b, c, d) {
        ze[I](this, a, b);
        this.s = c;
        this.Y = d
    };
Q(Ae, ze);
Ae[D].nb = function (a) {
    return this.s + (this.Y - this.s) * a
};
var Be = function (a, b, c, d) {
        ze[I](this, a, b);
        this.s = c;
        this.Y = d
    };
Q(Be, ze);
Be[D].nb = function (a) {
    return (new V(this.s.a + (this.Y.a - this.s.a) * a, this.s.b + (this.Y.b - this.s.b) * a, this.s.c + (this.Y.c - this.s.c) * a, this.s.d + (this.Y.d - this.s.d) * a, this.s.e + (this.Y.e - this.s.e) * a, this.s.f + (this.Y.f - this.s.f) * a))[B]()
};
var Ce = function (a, b, c, d) {
        ze[I](this, a, b);
        this.s = c;
        this.Y = d
    };
Q(Ce, ze);
Ce[D].nb = function (a) {
    return (new ye(l.round(this.s.Cb + (this.Y.Cb - this.s.Cb) * a), l.round(this.s.Bb + (this.Y.Bb - this.s.Bb) * a), l.round(this.s.b + (this.Y.b - this.s.b) * a), this.s.a + (this.Y.a - this.s.a) * a))[B]()
};
var De = function (a, b, c, d) {
        ze[I](this, a, b);
        this.pe = c[G](" ");
        this.qe = d[G](" ");
        Wb(this.pe[C] == this.qe[C])
    };
Q(De, ze);
De[D].nb = function (a) {
    for (var b = "", c = this.pe, d = this.qe, e = 0; e < c[C]; e++) {
        var g = ca(c[e], 10);
        isNaN(g) ? (Wb(c[e] == d[e]), b += c[e] + " ") : b += g + (ca(d[e], 10) - g) * a + " "
    }
    return b
};
var Ee = function (a, b) {
        we[I](this, a, b);
        this.Sb = []
    };
Q(Ee, we);
M = Ee[D];
M.La = function () {
    return Ee.I.La[I](this)
};
M.aa = function (a, b, c, d) {
    if (c[C] == 1) a[x](b, d ? d(c[0]) : c[0]);
    else Wb(c[C] == 2), this.Lf(a, b, d ? d(c[0]) : c[0], d ? d(c[1]) : c[1])
};
M.Lf = function (a, b, c, d) {
    var e;
    c instanceof V ? e = Be : typeof c == "number" ? e = Ae : c instanceof ye ? e = Ce : (Wb(b == "d"), e = De);
    c = new e(a, b, c, d);
    a[x](b, c.nb(this.xb / 65535));
    this.Sb[n](c)
};
M.wf = function () {
    for (var a = this.xb / 65535, b = 0; b < this.Sb[C]; b++) {
        var c = this.Sb[b].uf,
            d = this.Sb[b].sf,
            e = this.Sb[b].nb(a);
        c[x](d, e)
    }
};
M.dc = function (a) {
    Ee.I.dc[I](this, a);
    this.wf()
};
var Fe = function (a) {
        W[I](this);
        this.g = a
    };
Q(Fe, W);
Fe[D].La = function () {
    var a;
    a = this.ia == 0 ? k[F]("http://www.w3.org/2000/svg", "g") : k[F]("http://www.w3.org/2000/svg", "clipPath");
    this.Gc = Ld(this.g[Aa])[B]();
    for (var b = 0; b < this.g.records[C]; b++) {
        var c = this.g.records[b],
            d = k[F]("http://www.w3.org/2000/svg", "text");
        d[m](k.createTextNode(c.text));
        d[x]("font-family", "font" + c[pa]);
        d[x]("font-size", c[L]);
        c.bold && d[x]("font-weight", "bold");
        c.italic && d[x]("font-style", "italic");
        d[x]("x", Ge(c.x));
        d[x]("y", c.y);
        d[x]("fill-rule", "nonzero");
        d[x]("style", "white-space:pre");
        c[s] && (c = Pd(c[s]), d[x]("fill", c[B]()), d[x]("fill-opacity", c.a));
        a[m](d)
    }
    a.id = vd.Fa().Oa();
    return a
};
var He = function (a, b) {
        W[I](this);
        this.g = a;
        this.k = b
    };
Q(He, W);
He[D].La = function () {
    this.pa = k[F]("http://www.w3.org/1999/xhtml", "video");
    this.pa[x]("width", this.g[wa]);
    this.pa[x]("height", this.g[L]);
    this.pa[x]("src", this.g.videoUri);
    this.pa[x]("autoplay", !0);
    this.pa[x]("preload", !0);
    var a = 0,
        b = 0,
        c = this.k.Oc(),
        d = this.k.ea(),
        e = d.offsetWidth,
        d = d.offsetHeight;
    e / d > c ? a = (e - d * c) / 2 : b = (d - e / c) / 2;
    this.pa[x]("style", "-webkit-transform-origin:top left;position:absolute;left:" + a + "px;top:" + b + "px;");
    this.k.ea()[m](this.pa);
    return k[F]("http://www.w3.org/2000/svg", "g")
};
He[D].S = function () {
    Fc(this.pa);
    He.I.S[I](this)
};
He[D].lf = function () {
    var a = this.ua();
    a != i ? this.pa[H]["-webkit-transform"] = "matrix(" + a.a + "," + a.b + "," + a.c + "," + a.d + "," + a.e / 20 + "," + a.f / 20 + ")" : this.pa[H].removeProperty("-webkit-transform")
};
He[D].X = function (a) {
    var b = He.I.X[I](this, a);
    (b || a) && this.lf();
    return b
};
var Ie = function () {
        W[I](this);
        this.n = new Vd(!1)
    };
Q(Ie, W);
M = Ie[D];
M.Ec = function (a, b) {
    a[sa]() != i && a[sa]()[ib](a);
    a.bc(this);
    this.n.Xa(a, b)
};
M.removeChild = function (a) {
    this.n.jf(a);
    a.bc(i)
};
M.Qc = function (a) {
    (a = this.n.Vc(a)) && a.bc(i)
};
M.sa = function (a) {
    if (this.$a()) this.X(a) && this.Xc();
    else {
        var b = this.$;
        this.$ = !1;
        this.n.sa(b || a)
    }
};
M.X = function (a) {
    var b = Ie.I.X[I](this, a),
        a = this.n.X(b || a);
    return b || a
};
M.ld = function (a, b) {
    this.n.ld(a, b)
};
M.N = function () {
    var a = this.r;
    if (!a) this.r = a = new Je(this);
    return a
};
M.pd = function (a, b) {
    this.n.pd(a, b)
};
var Je = function (a) {
        X[I](this, a);
        a.n.nf(this)
    };
Q(Je, X);
var Ke = function (a) {
        a instanceof X || (a = f);
        this.r = a;
        this.Wd = 0
    };
Ke[D].getRGB = function () {
    return this.Wd
};
Ke[D].setRGB = function (a) {
    if (this.r) this.Wd = a, this.r.__swiffy_d.ja(new Zd(0, (a & 16711680) >> 16, 0, (a & 65280) >> 8, 0, a & 255, 256)), this.r.__swiffy_dm = !0
};
Ke[D].setTransform = function (a) {
    if (this.r && a) {
        var b = this.r.__swiffy_d;
        this.r.__swiffy_d.ja(new Zd(a[b.j.t().h(a, "ra")] * 256 / 100, a[b.j.t().h(a, "rb")], a[b.j.t().h(a, "ga")] * 256 / 100, a[b.j.t().h(a, "gb")], a[b.j.t().h(a, "ba")] * 256 / 100, a[b.j.t().h(a, "bb")], a[b.j.t().h(a, "aa")] * 256 / 100));
        this.r.__swiffy_dm = !0
    }
};
Ke[D].getTransform = function () {
    if (!this.r) return i;
    var a = this.r.__swiffy_d.Ca(a),
        b = {};
    b.Xf = a.kc * 100 / 256;
    b.Yf = a.jc;
    b.Vf = a.ic * 100 / 256;
    b.Wf = a.hc;
    b.Tf = a.gc * 100 / 256;
    b.Uf = a.fc;
    b.Rf = a.eb * 100 / 256;
    b.Sf = 0;
    return b
};
var Yd = function (a, b, c) {
        Ie[I](this);
        this.g = a;
        this.j = b;
        this.rb = {};
        this.U = -1;
        this.Za = a.frameCount;
        this.Vb = !1;
        this.Da = 0;
        this.L = c;
        this.Dc = {};
        this.Va = b.Va;
        this.ab = {};
        this.Ma = [];
        this.xd = !1
    };
Q(Yd, Ie);
var Le = {
    hg: 1,
    gg: 2,
    lg: 4,
    jg: 8,
    kg: 16,
    mg: 32,
    fg: 64,
    ig: 128
};
M = Yd[D];
M.La = function () {
    this.j.se(this);
    this.Ba = k[F]("http://www.w3.org/2000/svg", "defs");
    for (var a = 0; a < this.g.tags[C]; a++) {
        var b = this.g.tags[a];
        switch (b[A]) {
        case 10:
            var c = new Me(b);
            this.L.Na(b.id, c);
            break;
        case 13:
            c = new Ne(b);
            this.L.Na(b.id, c);
            break;
        case 5:
            c = new Oe(b);
            this.Ba[m](c.Q());
            break;
        case 8:
            c = new Pe(b);
            this.Ba[m](c.Q());
            break;
        case 1:
            c = new Qe(b);
            this.L.Na(b.id, c);
            break;
        case 17:
            c = new Re(b);
            this.L.Na(b.id, c);
            break;
        case 11:
            c = new Se(b);
            c.Fc(this.Wa());
            break;
        case 7:
            c = new Te(b, this.j, this.L);
            this.L.Na(b.id, c);
            break;
        case 6:
            c = new Ue(b);
            this.L.Na(b.id, c);
            break;
        case 14:
            c = new Ve(b);
            this.L.Na(b.id, c);
            break;
        case 9:
            c = new We(b);
            this.qb(this.Da, c);
            break;
        case 15:
            this.Dc[b.label] = this.Da;
            break;
        case 3:
            c = new Xe(b);
            this.qb(this.Da, c);
            break;
        case 4:
            c = new Ye(b);
            this.qb(this.Da, c);
            break;
        case 2:
            this.Da++;
            break;
        case 12:
            c = new Ze(b);
            this.qb(this.Da, c);
            break;
        case 16:
            c = new $e(b), this.qb(this.Da, c)
        }
    }
    this.ia == 0 ? (this.n.Q(), a = k[F]("http://www.w3.org/2000/svg", "g"), this.td = this.n.R(), a[m](this.Ba), a[m](this.td)) : (this.n.te(!0), this.n.Q(), a = this.n.R());
    b = P(this.Ea, 1);
    b = T(k, "keyup", b, !1, this);
    this.Ma[n](b);
    b = P(this.Ea, 2);
    b = T(k, "keydown", b, !1, this);
    this.Ma[n](b);
    b = P(this.Ea, 4);
    b = T(this.j.ea(), "createTouch" in k ? "touchend" : "mouseup", b, !1, this);
    this.Ma[n](b);
    b = P(this.Ea, 8);
    b = T(this.j.ea(), "createTouch" in k ? "touchstart" : "mousedown", b, !1, this);
    this.Ma[n](b);
    b = P(this.Ea, 16);
    b = T(this.j.ea(), "createTouch" in k ? "touchmove" : "mousemove", b, !1, this);
    this.Ma[n](b);
    this.Ea(128);
    return a
};
M.load = function () {
    if (!this.xd) this.xd = !0, this[Qa](), this.ce()
};
M.Le = function (a, b) {
    for (var c in Le) {
        var d = Le[c];
        a & d && (this.ab[d] || (this.ab[d] = []), this.ab[d][n](new fe(b, this)))
    }
};
M.Ea = function (a) {
    if (a = this.ab[a]) for (var b = 0; b < a[C]; ++b) this.t().fd(a[b])
};
M.Jd = function () {
    return this.ab != f && this.ab[32] != f
};
M.Bc = function (a) {
    return (a = this.L.tf(a)) ? a.Ua(this) : i
};
M.S = function () {
    this.j.Re(this);
    Fc(this.Ba);
    Fc(this.td);
    this.n.S();
    for (var a = 0; a < this.Ma[C]; a++) hd(this.Ma[a]);
    Yd.I.S[I](this)
};
M.Ga = function () {
    this.Dd || (this.n.Ga(), this.Ea(32));
    Yd.I.Ga[I](this)
};
M.qb = function (a, b) {
    this.rb[a] || (this.rb[a] = []);
    this.rb[a][n](b)
};
M.play = function () {
    this.Vb = !0
};
M.ce = function () {
    this.n.Se();
    if (this.Vb) {
        var a = this.U + 1;
        a >= this.Za && (a = 0);
        (this.Za != 0 || this.j.T != this) && this.nc(a)
    }
    this.Te()
};
M.Te = function () {
    this.N().onEnterFrame();
    this.Ea(64)
};
M.stop = function () {
    this.Vb = !1
};
M.Jb = function (a, b) {
    a >= 0 && a < this.Za ? this.nc(a) : this.U = this.Za + 1;
    this.Vb = b
};
M.Fb = function (a) {
    var b = f;
    typeof a == "string" && this.Dc[a] != f ? b = this.Dc[a] : (a = Number(a) - 1, a >= 0 && a == l[Da](a) && (b = a));
    return b
};
M.cf = function (a) {
    return this.rb[a]
};
M.nc = function (a) {
    var b = !1,
        c = this.n;
    if (a < this.U) b = !0, this.n = new Vd(!0), this.n.Q(), this.U = -1;
    for (; this.U < a;) {
        this.U++;
        var d = this.rb[this.U];
        if (d) for (var e = 0; e < d[C]; e++) d[e].Hb(this), this.U == a && d[e].Gb(this)
    }
    if (b) c.Xe(this.n), this.n = c
};
M.fe = function () {
    this.U > 0 && this.nc(this.U - 1);
    this[Ya]()
};
M.ee = function () {
    this.U + 1 < this.Za && this.nc(this.U + 1);
    this[Ya]()
};
M.t = function () {
    return this.j.t()
};
M.Wa = function () {
    return this.j.Wa()
};
M.ea = function () {
    return this.j.ea()
};
M.Oc = function () {
    return this.j.Oc()
};
M.xf = function (a, b) {
    this.N()[a] = b
};
M.isCaptured = function () {
    return this.j[yb]()
};
M.Ya = function () {
    return this.j.Ya()
};
M.ub = function (a) {
    return this.j.ub(a)
};
M.setCapture = function (a, b, c) {
    this.j[Ba](a, b, c)
};
M.releaseCapture = function (a) {
    this.j[Wa](a)
};
M.duplicate = function (a, b, c) {
    var d = new Yd(this.g, this.j, this.L);
    d.Q();
    d[Ca]();
    d.Ub(b);
    d[t](this.D());
    d.vd = !0;
    a.Ec(d, c);
    d.ja(this.Ca());
    return d
};
M.dd = function (a) {
    this.j.dd(a)
};
M.lc = function () {
    this.j.lc()
};
M.N = function () {
    var a = this.r;
    if (!a) this.r = a = new Y(this);
    return a
};
M.Qa = function () {
    return !0
};
var Y = function (a) {
        Je[I](this, a)
    };
Q(Y, Je);
Y[D].gotoAndStop = function (a) {
    var b = this.__swiffy_d;
    b.Jb(b.Fb(a), !1)
};
Y[D].gotoAndPlay = function (a) {
    var b = this.__swiffy_d;
    b.Jb(b.Fb(a), !0)
};
Y[D].play = function () {
    this.__swiffy_d[Qa]()
};
Y[D].stop = function () {
    this.__swiffy_d[Ya]()
};
Y[D].nextFrame = function () {
    this.__swiffy_d.ee()
};
Y[D].prevFrame = function () {
    this.__swiffy_d.fe()
};
Y[D].onEnterFrame = function () {};
Y[D].globalToLocal = function (a) {
    var b = this.__swiffy_d,
        c = b.j.t(),
        d = c.Gd(a);
    if (d != i) {
        var e = c.h(a, "x"),
            c = c.h(a, "y"),
            b = b.ua(),
            d = ce(b, d);
        a[e] = d.x;
        a[c] = d.y
    }
};
Y[D].localToGlobal = function (a) {
    var b = this.__swiffy_d,
        c = b.j.t(),
        d = c.Gd(a);
    if (d != i) {
        var e = c.h(a, "x"),
            c = c.h(a, "y"),
            b = b.ua(),
            d = new U(d.x * 20, d.y * 20);
        d.V(b);
        d.x /= 20;
        d.y /= 20;
        a[e] = d.x;
        a[c] = d.y
    }
};
Y[D].attachMovie = function (a, b, c, d) {
    var e = this.__swiffy_d,
        a = e.j.ud[a];
    if (O(a) && (a = e.Bc(a), a.Q(), a[Ca](), a.Ub(b), a.vd = !0, e.Ec(a, c), O(d))) {
        var b = a.N(),
            g;
        for (g in d) b[g] = d[g]
    }
};
Y[D].duplicateMovieClip = function (a, b, c) {
    var d = this.__swiffy_d,
        e = d[sa]();
    if (e && (a = d.duplicate(e, a, b), O(c))) {
        var a = a.N(),
            g;
        for (g in c) a[g] = c[g]
    }
};
Y[D].removeMovieClip = function () {
    var a = this.__swiffy_d,
        b = a[sa]();
    a.vd && b && (a.S(), b[ib](a))
};
Y[D].swapDepths = function (a) {
    var b = this.__swiffy_d,
        c = b[sa]();
    if (!c) {
        if (a instanceof X) {
            a = a.__swiffy_d;
            if (a[sa]() != c) return;
            a = a[y]
        } else a = Number(a);
        c.pd(b[y], a)
    }
};
Y[D].getBytesLoaded = function () {
    return this.getBytesTotal()
};
Y[D].getBytesTotal = function () {
    return 1E3
};
Y[D].getBounds = function (a) {
    var b = this.__swiffy_d,
        c = b.yb();
    if (O(a)) {
        var d = i;
        a instanceof Y ? d = a.__swiffy_d : Gb(a) && (d = b.j.t().sb(b, a));
        if (d != i) a = d.ua().Sc(), c.V(a.multiply(b.ua()));
        else return
    }
    b = {};
    b.v = c.v / 20;
    b.A = c.A / 20;
    b.w = c.w / 20;
    b.B = c.B / 20;
    return b
};
Y[D].hitTest = function (a, b, c) {
    if (O(a)) {
        var d = this.__swiffy_d,
            e = d.yb();
        e.V(d.ua());
        if (!O(b) && !O(c)) {
            if (b = i, a instanceof Y ? b = a.__swiffy_d : Gb(a) && (b = d.j.t().sb(d, a)), b != i) return a = b.yb(), a.V(b.ua()), e.Ue(a)
        } else if (O(b)) return e.contains(a * 20, b * 20)
    }
    return !1
};
j[u](Y[D], "_currentframe", {
    get: function () {
        return this.__swiffy_d.U + 1
    },
    set: function () {}
});
j[u](Y[D], "_totalframes", {
    get: function () {
        return this.__swiffy_d.Za
    },
    set: function () {}
});
j[u](Y[D], "_framesloaded", {
    get: function () {
        return this.__swiffy_d.Da
    },
    set: function () {}
});
j[u](Y[D], "_root", {
    get: function () {
        return this.__swiffy_d.j.T.N()
    },
    set: function () {}
});
j[u](Y[D], "_target", {
    get: function () {
        var a = this._root;
        if (this == a) return "/";
        else {
            for (var b = "", c = this; c && c != a;) b = "/" + c._name + b, c = c._parent;
            return b
        }
    },
    set: function () {}
});
j[u](Y[D], "_level0", {
    get: function () {
        return this.__swiffy_d.j.T.N()
    },
    set: function () {}
});
var af = function () {
        this.oe = [];
        this.Ac = []
    };
af[D].Fc = function (a, b) {
    this.oe[a] = b
};
af[D].Bd = function (a) {
    this.Ac[a] = new Audio(this.oe[a]);
    this.Ac[a][Qa]()
};
af[D].vf = function () {
    for (var a in this.Ac) this.Ac[a].pause()
};
var df = function (a, b) {
        this.Wb = new U(0, 0);
        this.fa = k[F]("http://www.w3.org/1999/xhtml", "div");
        this.fa[x]("style", "position:relative;");
        a[m](this.fa);
        this.Ee = new af;
        this.oa = k[F]("http://www.w3.org/2000/svg", "svg");
        var c = "fill-rule:evenodd;";
        c += "pointer-events:none;";
        c += "width:" + b[kb][sb] / 20 + ";";
        c += "height:" + b[kb][ua] / 20 + ";";
        b.backgroundColor != f && (c += "background:" + Pd(b.backgroundColor)[B]());
        this.oa[x]("style", c);
        this.oa[x]("viewBox", b[kb][pb] + " " + b[kb][oa] + " " + b[kb][sb] + " " + b[kb][ua]);
        this.fa[m](this.oa);
        this.ze = b[kb][sb] / b[kb][ua];
        c = new Ud;
        this.Va = b.version;
        this.T = new Yd(b, this, c);
        this.wb = new bf(this.T);
        this.cb = new cf;
        this.cb.De(this.wb);
        this.cb.Ce(b.frameRate);
        this.T.Q();
        this.oa[m](this.T.R());
        this.T.Ba.id = "defmain";
        this.wa = i;
        this.Nc = !1;
        this.ac = i;
        this.ud = {};
        this.vb = new Id(this);
        this.ya = {};
        this.ya.q = 0;
        T(this.fa, "mousedown", this.ob, !1, this);
        T(this.fa, "mouseup", this.pb, !1, this);
        T(this.fa, "mouseout", this.Cc, !1, this);
        "createTouch" in k || T(this.fa, "mousemove", this.Lc, !1, this);
        T(k, "mousedown", this.Ae, !1, this);
        T(k, "mouseup", this.Be, !1, this);
        T(this.fa, "touchstart", this.Ge, !1, this);
        T(this.fa, "touchmove", this.Fe, !1, this)
    },
    ef = "swiffy.Stage" [G]("."),
    ff = N;
!(ef[0] in ff) && ff.execScript && ff.execScript("var " + ef[0]);
for (var gf; ef[C] && (gf = ef[ta]());)!ef[C] && O(df) ? ff[gf] = df : ff = ff[gf] ? ff[gf] : ff[gf] = {};
M = df[D];
M.ob = function (a) {
    a[eb]();
    this[Ba](this.oa)
};
M.pb = function (a) {
    a[eb]();
    this[Wa](this.oa)
};
M.Ae = function () {
    this[Ba](this.oa, !0)
};
M.Be = function () {
    this[Wa](this.oa)
};
M.Cc = function (a) {
    this[yb]() && a[jb] == this.fa && this[Ba](this.oa)
};
M.Lc = function (a) {
    this.qd(a)
};
M.Ge = function (a) {
    var b = a.Aa.touches;
    b[C] == 1 && (this.qd(b[0]), a[Fa]())
};
M.Fe = function (a) {
    var b = a.Aa.touches;
    b[C] == 1 && (this.qd(b[0]), a[Fa]())
};
M.qd = function (a) {
    var b;
    b = this.oa;
    var c = 0,
        d = 0;
    if (b.offsetParent) {
        do c += b.offsetLeft, d += b.offsetTop;
        while (b = b.offsetParent)
    }
    b = [c, d];
    this.Wb.x = a.clientX - b[0];
    this.Wb.y = a.clientY - b[1]
};
M.ef = function () {
    return this.ya.q > 0
};
M.ue = function (a) {
    a = Lb(a);
    a in this.ya || (this.ya[a] = !0, this.ya.q++);
    this.vb[vb]()
};
M.ve = function (a) {
    a = Lb(a);
    a in this.ya && (delete this.ya[a], this.ya.q--);
    this.vb[vb]()
};
M.isCaptured = function () {
    return this.wa != i
};
M.Ya = function () {
    return this.wa != i && this.Nc
};
M.ub = function (a) {
    return this.wa == a
};
M.df = function () {
    return this.wa ? Lb(this.wa) in this.ya : !1
};
M.setCapture = function (a, b, c) {
    this[Wa](a);
    this.wa = a;
    k.hf = function () {
        return !1
    };
    if (b) this.Nc = !0;
    if (c) this.ac = c, this.vb[vb]()
};
M.releaseCapture = function (a) {
    if (this.wa) this.vb[vb](), k.hf = i, this.wa != a && this.ac && this.ac(), this.wa = this.ac = i, this.Nc = !1
};
M.start = function () {
    this.T[Qa]();
    this.cb.start()
};
M.stop = function(){
	window.clearInterval(window.varianceInterval);
}
df[D].start = df[D].start;
df[D].stop = df[D].stop;
M = df[D];
M.se = function (a) {
    this.cb.rd(a)
};
M.Re = function (a) {
    this.cb.Gf(a)
};
M.t = function () {
    return this.wb
};
M.Wa = function () {
    return this.Ee
};
M.rd = function (a) {
    this.cb.rd(a)
};
M.lc = function () {
    this.Qb = [];
    this.T.sa(!1);
    for (var a = 0; a < this.Qb[C]; a++) this.Qb[a][x]("transform", this.Qb[a][lb]("transform"))
};
M.dd = function (a) {
    this.Qb[q](a) == -1 && this.Qb[n](a)
};
M.ea = function () {
    return this.fa
};
M.Oc = function () {
    return this.ze
};
M.Pf = function (a) {
    for (var a = new zd(a), b = a.Lb(), c = 0; c < b[C]; c++) {
        var d = b[c];
        this.T.xf(d, a.get(d))
    }
};
df[D].setFlashVars = df[D].Pf;
var ye = function (a, b, c, d) {
        this.Cb = a;
        this.Bb = b;
        this.b = c;
        this.a = d
    };
ia(ye[D], function () {
    return "rgb(" + this.Cb + "," + this.Bb + "," + this.b + ")"
});
var Pd = function (a) {
        var b = a & 255;
        a >>= 8;
        var c = a & 255;
        a >>= 8;
        var d = a & 255;
        a >>= 8;
        return new ye(b, c, d, 1 - (a & 255) / 255)
    },
    Qd = function (a) {
        return Pd(a).a
    },
    Ld = function (a) {
        var b = 0,
            c = hf(function () {
                return a[nb](b++)
            });
        return new V(c() / 1E3 + 1, c() / 1E3, c() / 1E3, c() / 1E3 + 1, c(), c())
    },
    Ge = function (a) {
        for (var b = 0, c = jf(function () {
            return a[nb](b++)
        }), d = [], e = 0; b < a[C];) e += ca(c(), 10), d[n](e);
        return d.join(" ")
    },
    jf = function (a) {
        return function () {
            var b = a();
            if (b == 58) return 0;
            for (var c = ""; b >= 48 && b <= 57;) c += String.fromCharCode(b), b = a();
            return (b >= 97 ? b - 96 : -(b - 64)) + c
        }
    },
    hf = function (a) {
        var b = jf(a);
        return function () {
            return ca(b(), 10)
        }
    },
    xe = function (a) {
        for (var b = 0, c = a[q](":"), d = c + 1, e = jf(function () {
            return a[nb](d++)
        }), g = "", h; b < c;) switch (h = a.charAt(b++), g[C] > 0 && (g += " "), g += h + " ", h) {
        case "q":
            g += e() + " " + e() + " ";
        case "l":
        case "m":
            g += e() + " ";
        case "h":
        case "v":
            g += e();
            break;
        default:
            return ""
        }
        return g
    },
    pe = function (a) {
        var b = 0,
            c = hf(function () {
                return a[nb](b++)
            });
        return new Zd(c() + 256, c(), c() + 256, c(), c() + 256, c(), c() + 256)
    },
    kf = function (a) {
        return a <= 0.04045 ? a / 12.92 : l.pow((a + 0.055) / 1.055, 2.4)
    },
    ce = function (a, b) {
        var c = new U(b.x * 20, b.y * 20);
        c.V(a.Sc());
        c.x /= 20;
        c.y /= 20;
        return c
    };
var lf = function (a) {
        this.ca = a;
        this.kf = vd.Fa().Oa();
        this.region = new $d(0, 0, 0, 0)
    },
    be = [];
M = lf[D];
na(M, function () {});
M.result = function () {
    return this.kf
};
M.Qd = function (a, b, c, d, e) {
    var g = 1;
    switch (a) {
    case 1:
        g = 5;
        break;
    case 2:
        g = 3;
        break;
    case 3:
        g = 2
    }
    a = b * 20 / g;
    c = c * 20 / g;
    g = k[F]("http://www.w3.org/2000/svg", "feGaussianBlur");
    O(d) && g[x]("in", d);
    O(e) && g[x]("result", e);
    g[x]("stdDeviation", a + " " + c);
    this.ca.xa()[m](g);
    d = new $d;
    d[ya](new U(-a * 3, -c * 3));
    d[ya](new U(+a * 3, +c * 3));
    return d
};
M.hd = function (a, b, c, d, e, g) {
    var h = k[F]("http://www.w3.org/2000/svg", "feComponentTransfer");
    O(e) && h[x]("in", e);
    O(g) && h[x]("result", g);
    e = ["feFuncR", "feFuncG", "feFuncB", "feFuncA"];
    a = [a, b, c, d];
    for (b = 0; b < 4; ++b) {
        var c = i,
            r;
        for (r in a[b]) c == i && (c = k[F]("http://www.w3.org/2000/svg", e[b]), c[x]("type", "linear")), c[x](r, a[b][r]);
        c && h[m](c)
    }
    this.ca.xa()[m](h)
};
M.Kb = function (a, b, c, d, e) {
    var g = k[F]("http://www.w3.org/2000/svg", "feComposite");
    O(e) && g[x]("result", e);
    O(b) && g[x]("in", b);
    O(c) && g[x]("in2", c);
    g[x]("operator", a);
    if (O(d)) for (var h in d) g[x](h, d[h]);
    this.ca.xa()[m](g)
};
M.$e = function (a) {
    var b = k[F]("http://www.w3.org/2000/svg", "feFlood");
    O(a) && b[x]("result", a);
    this.ca.xa()[m](b)
};
M.af = function (a, b, c, d) {
    var e = l.cos(a) * b * 20,
        a = l.sin(a) * b * 20,
        b = k[F]("http://www.w3.org/2000/svg", "feOffset");
    O(c) && b[x]("in", c);
    O(d) && b[x]("result", d);
    b[x]("dx", e);
    b[x]("dy", a);
    this.ca.xa()[m](b);
    return new $d(e, a, e, a)
};
var ae = function (a) {
        lf[I](this, a);
        this.ga = new Zd(256, 0, 256, 0, 256, 0, 256);
        this.pc = "SourceGraphic"
    };
Q(ae, lf);
M = ae[D];
M.ja = function (a) {
    this.ca.qa[x]("opacity", a.eb / 256);
    if (!(this.Zf instanceof re) && !this.ga.Ze(a)) return this.ga = a, this.da == i && this[K](this.pc), this[vb](), !0;
    else if (this.ga.eb != a.eb) return this.ga = a, !0;
    return !1
};
M.update = function () {
    this.da != i && (this.$c[x]("tableValues", this.ed(this.ga.kc, this.ga.jc)), this.Zc[x]("tableValues", this.ed(this.ga.ic, this.ga.hc)), this.Yc[x]("tableValues", this.ed(this.ga.gc, this.ga.fc)))
};
M.gf = function (a) {
    this.pc = a;
    this.da != i && (this.da[x]("in", this.pc), a = this.ca.xa(), a[ib](this.da), a[m](this.da))
};
na(M, function (a) {
    this.pc = a;
    var b = this.ca.xa();
    this.da = k[F]("http://www.w3.org/2000/svg", "feComponentTransfer");
    this.da[x]("in", a);
    this.da[x]("result", this[ab]());
    this.$c = k[F]("http://www.w3.org/2000/svg", "feFuncR");
    this.$c[x]("type", "discrete");
    this.da[m](this.$c);
    this.Zc = k[F]("http://www.w3.org/2000/svg", "feFuncG");
    this.Zc[x]("type", "discrete");
    this.da[m](this.Zc);
    this.Yc = k[F]("http://www.w3.org/2000/svg", "feFuncB");
    this.Yc[x]("type", "discrete");
    this.da[m](this.Yc);
    b[m](this.da);
    this[vb]()
});
M.ed = function (a, b) {
    a /= 256;
    b /= 256;
    for (var c = [], d = 0; d < 256; d++) c[d] = kf((d / 255 <= 0.0031308 ? d / 255 * 12.92 : l.pow(d / 255, 1 / 2.4) * 1.055 - 0.055) * a + b);
    return c.join(" ")
};
M.Ca = function () {
    return this.ga
};
var mf = function (a, b) {
        lf[I](this, a);
        this.gd = b
    };
Q(mf, lf);
be[2] = mf;
na(mf[D], function (a) {
    var b = this.gd;
    this.region = this.Qd(b.quality, b.x, b.y, a, this[ab]())
});
var nf = function (a, b) {
        lf[I](this, a);
        this.gd = b
    };
Q(nf, lf);
be[1] = nf;
na(nf[D], function (a) {
    var b = this.gd,
        c = this.ca.xa();
    b[bb] && this.$e("black");
    this.hd({
        slope: 0
    }, {
        slope: 0
    }, {
        slope: 0
    }, {}, a);
    var d = this.Qd(b.quality, b.x, b.y);
    b.distance && this.region.bf(this.af(b.angle, b.distance));
    this.region.add(d);
    b[bb] && this.Kb("arithmetic", f, "black", {
        k2: -1,
        k3: 1
    });
    d = Pd(b[s]);
    this.hd({
        intercept: kf(d.Cb / 255)
    }, {
        intercept: kf(d.Bb / 255)
    }, {
        intercept: kf(d.b / 255)
    }, {
        slope: b.strength
    });
    d.a < 1 && this.hd({}, {}, {}, {
        slope: d.a
    });
    c.lastChild[x]("result", "shadow");
    !b[bb] && !b.knockout && !b.hideObject ? this.Kb("over", a, "shadow") : b[bb] && !b.knockout && !b.hideObject ? this.Kb("atop", "shadow", a) : !b[bb] && b.knockout ? this.Kb("out", "shadow", a) : b[bb] && this.Kb("in", "shadow", a);
    c.lastChild[x]("result", this[ab]())
});
var Me = function (a) {
        this.g = a
    };
Me[D].Ua = function (a) {
    return new de(this.g, a)
};
var Ne = function (a) {
        this.g = a
    };
Ne[D].Ua = function (a) {
    return new re(this.g, a)
};
var Oe = function (a) {
        this.g = a
    };
Oe[D].Q = function () {
    var a;
    a = this.g.emSquareSize ? this.g.emSquareSize : 1024;
    var b, c, d;
    if (this.g.ascent && this.g.descent) b = this.g.ascent, c = this.g.descent, d = (b + c) / a;
    else {
        if (this.g[Va] && !this.g[fb]) {
            var e = k[F]("http://www.w3.org/1999/xhtml", "div");
            e[H].fontFamily = this.g[Va];
            e[H].fontSize = "1024px";
            e.innerHTML = "A";
            k[hb][m](e);
            d = e.clientHeight / 1024;
            Fc(e)
        } else d = 1.15;
        b = a * 0.9;
        c = a * (d - 0.9)
    }
    e = k[F]("http://www.w3.org/2000/svg", "font-face");
    e[x]("id", "def" + this.g.id);
    e[x]("line-height", d);
    e[x]("units-per-em", a);
    e[x]("ascent", b);
    e[x]("descent", c);
    d = "font" + this.g.id;
    this.g[Va] && (d += ',"' + this.g[Va] + '"');
    e[x]("font-family", d);
    e[x]("font-weight", this.g.bold ? "bold" : "normal");
    e[x]("font-style", this.g.italic ? "italic" : "normal");
    if (this.g[Va] && !this.g[fb]) return a = k[F]("http://www.w3.org/2000/svg", "font-face-src"), d = k[F]("http://www.w3.org/2000/svg", "font-face-name"), d[x]("name", this.g[Va]), a[m](d), e[m](a), e;
    else {
        d = k[F]("http://www.w3.org/2000/svg", "font");
        d[x]("horiz-adv-x", a);
        d[m](e);
        if (this.g[fb]) for (e = 0; e < this.g[fb][C]; e++) a = this.g[fb][e], b = k[F]("http://www.w3.org/2000/svg", "glyph"), b[x]("d", xe(a[p])), b[x]("unicode", a.unicode), a.advance && b[x]("horiz-adv-x", a.advance), d[m](b);
        return d
    }
};
var Pe = function (a) {
        this.g = a
    };
Pe[D].Q = function () {
    var a = k[F]("http://www.w3.org/2000/svg", "image");
    a.id = "def" + this.g.id;
    a[x]("width", this.g[wa]);
    a[x]("height", this.g[L]);
    a[Ga]("http://www.w3.org/1999/xlink", "href", this.g[p]);
    return a
};
var Re = function (a) {
        this.g = a
    };
Re[D].Ua = function (a) {
    return new Ee(this.g, a)
};
var Qe = function (a) {
        this.g = a
    };
Qe[D].Ua = function (a) {
    return new we(this.g, a)
};
var Se = function (a) {
        this.g = a
    };
Se[D].Fc = function (a) {
    a.Fc(this.g.id, this.g[p])
};
var Te = function (a, b, c) {
        this.g = a;
        this.O = b;
        this.L = c
    };
Te[D].Ua = function () {
    return new Yd(this.g, this.O, this.L)
};
var Ue = function (a) {
        this.g = a
    };
Ue[D].Ua = function () {
    return new Fe(this.g)
};
var Ve = function (a) {
        this.g = a
    };
Ve[D].Ua = function (a) {
    return new He(this.g, a)
};
var We = function (a) {
        this.eg = a;
        this.Xd = ee(a[cb])
    };
We[D].Hb = function () {};
We[D].Gb = function (a) {
    a.t().fd(new fe(this.Xd, a))
};
We[D].Mb = function (a) {
    a.t().Rd(new fe(this.Xd, a))
};
var Ze = function (a) {
        this.Cf = a
    };
Ze[D].Hb = function (a) {
    a.Wa().Bd(this.Cf.id)
};
Ze[D].Gb = function () {};
Ze[D].Mb = function () {};
var Xe = function (a) {
        this.l = a
    };
Xe[D].Hb = function (a) {
    var b = a.n.Pc(this.l[y]);
    if (!b || !b.tb()) if (b || !this.l[o]) if (!b || this.l[o] || !this.l.id) if (b && (b.Qa() || !this.l.id)) this.Cd(b);
    else {
        var c = b,
            b = a.Bc(this.l.id);
        if (b != i) if (b.Qa() && c) this.Cd(c);
        else {
            this.l[Va] && b.Ub(this.l[Va]);
            var d = i;
            this.l[Aa] && (d = Ld(this.l[Aa]));
            var e = i;
            this.l[ob] && (e = pe(this.l[ob]));
            this.l[o] && (d || (d = c.D()), e || (e = c.Ca()));
            this.l.clip && b.Me(this.l.clip);
            if (this.l[cb]) for (var g = 0; g < this.l[cb][C]; ++g) {
                var h = ee(this.l[cb][g].action);
                b.Le(this.l[cb][g].events, h)
            }
            c && a.Qc(this.l[y]);
            b.Q();
            a.Ec(b, this.l[y]);
            this.l[Ja] != f && b.dc(this.l[Ja]);
            d && b[t](d);
            this.l[rb] && b.Ad(this.l[rb]);
            e && b.ja(e);
            b instanceof Yd && !c && !a.n.He && b[Ca]()
        }
    }
};
Xe[D].Cd = function (a) {
    this.l[Aa] && a[t](Ld(this.l[Aa]));
    this.l[ob] && a.ja(pe(this.l[ob]));
    this.l[Ja] != f && a.dc(this.l[Ja]);
    var b = [];
    this.l[rb] && (b = this.l[rb]);
    a.Ad(b)
};
Xe[D].Gb = function () {};
Xe[D].Mb = function () {};
var Ye = function (a) {
        this.rc = a
    };
Ye[D].Hb = function (a) {
    var b = a.n.Pc(this.rc[y]);
    if (!b || !b.tb()) b && b.Ga(), a.Qc(this.rc[y])
};
Ye[D].Gb = function (a) {
    var b = a.n.Pc(this.rc[y]);
    b && b.tb() && (b.Ga(), a.Qc(this.rc[y]))
};
Ye[D].Mb = function () {};
var $e = function (a) {
        this.ff = a
    };
$e[D].Hb = function (a) {
    var b = this.ff,
        c;
    for (c in b[p]) a.j.ud[c] = b[p][c]
};
$e[D].Gb = function () {};
$e[D].Mb = function () {};
var cf = function () {
        this.yc = [];
        this.he = 1;
        this.ie = !1
    };
M = cf[D];
M.Ce = function (a) {
    this.he = a
};
M.rd = function (a) {
    this.yc[n](a)
};
M.Gf = function (a) {
    $b(this.yc, a)
};
M.De = function (a) {
    this.wb = a
};
M.ne = function () {
    for (var a = this.yc[C] - 1; a >= 0; --a) this.yc[a].ce();
    this.wb && this.wb.Rc()
};
M.start = function () {
	window.varianceInterval = window.setInterval(Ob(this.ne, this), 1E3 / this.he);
    if (!this.ie) this.ie = !0, this.ne(), df[D].varianceInterval
};
var fe = function (a, b) {
        this.de = a;
        this.ca = b
    };
var Z = function (a) {
        this.O = a
    };
Z[D].escape = function (a) {
    return escape(a)[o](/[-@*+./_]/g, function (a) {
        return "%" + a[nb](0)[B](16).toUpperCase()
    })
};
Z[D].parseFloat = function (a) {
    return parseFloat(a)
};
Z[D].parseInt = function (a, b) {
    return ca(a, b)
};
Z[D].isFinite = function (a) {
    return isFinite(a)
};
Z[D].isNaN = function (a) {
    return isNaN(a)
};
Z[D].unescape = function (a) {
    return unescape(a)
};
Z[D].Math = l;
Z[D].String = String;
Z[D].Number = Number;
Z[D].Date = Bd;
Z[D].Array = Cd;
Z[D].Object = Ad;
Z[D].Color = Ke;
Z[D].Key = Dd;
j[u](Z[D], "Mouse", {
    get: function () {
        return this.O.vb
    },
    set: function () {}
});
var of = function (a, b) {
        this.u = a;
        ea(this, {});
        this.J = b
    };
M = of[D];
M.get = function (a) {
    var b = this.u.h(this[p], a);
    return b in this[p] ? this[p][b] : this.J.get(a)
};
la(M, function (a, b) {
    var c = this.u.h(this[p], a);
    return c in this[p] ? this[p][c][K](this.ma(), b) : this.J[I](a, b)
});
M.set = function (a, b) {
    var c = this.u.h(this[p], a);
    return c in this[p] ? (this[p][c] = b, !0) : this.J.set(a, b)
};
M.va = function (a, b) {
    this[p][this.u.h(this[p], a)] = b
};
M.Ab = function (a) {
    a = this.u.h(this[p], a);
    a in this[p] || (this[p][a] = f)
};
M.hb = function () {};
ia(M, function () {
    return "function->" + this.J[B]()
});
M.ba = function (a) {
    return this.J.ba(a)
};
M.ma = function () {
    return this.J.ma()
};
var pf = function (a, b, c) {
        this.u = a;
        ea(this, c);
        this.J = b
    };
M = pf[D];
M.get = function (a) {
    var b = this.u.h(this[p], a);
    return b in this[p] ? this[p][b] : this.J.get(a)
};
la(M, function (a, b) {
    var c = this.u.h(this[p], a);
    if (c in this[p]) {
        if (c = this[p][c], Hb(c)) return c[K](this[p], b)
    } else return this.J[I](a, b)
});
M.set = function (a, b) {
    var c = this.u.h(this[p], a);
    return c in this[p] ? (this[p][c] = b, this[p] instanceof X && (this[p].__swiffy_dm = !0), !0) : this.J.set(a, b)
};
M.va = function (a, b) {
    var c = this.u.h(this[p], a);
    c in this[p] ? (this[p][c] = b, this[p] instanceof X && (this[p].__swiffy_dm = !0)) : this.J.va(a, b)
};
M.Ab = function (a) {
    this.u.h(this[p], a) in this[p] || this.J.Ab(a)
};
M.hb = function (a) {
    var b = this.u.h(this[p], a);
    b in this[p] ? delete this[p][b] : this.J.hb(a)
};
ia(M, function () {
    var a = this[p]._name;
    a += "->" + this.J[B]();
    return a
});
M.ba = function (a) {
    return this.J.ba(a)
};
M.ma = function () {
    return this.J.ma()
};
var qf = function (a, b, c) {
        this.u = a;
        ea(this, c);
        this.ad = b;
        this.Md = c
    };
M = qf[D];
M.get = function (a) {
    var b = this[p][this.u.h(this[p], a)];
    if (b == f) if (a[Bb]() == "this") b = this.Md;
    else return this.ad.get(a);
    return b
};
la(M, function (a, b) {
    var c = this.u.h(this[p], a),
        d = this[p][c];
    if (c in this[p]) {
        if (Hb(d)) return d[K](this[p], b)
    } else return this.ad[I](a, b)
});
M.set = function (a, b) {
    this[p][this.u.h(this[p], a)] = b;
    return this[p].__swiffy_dm = !0
};
M.va = function (a, b) {
    this[p][this.u.h(this[p], a)] = b;
    this[p].__swiffy_dm = !0
};
M.Ab = function (a) {
    a = this.u.h(this[p], a);
    if (!(a in this[p])) this[p][a] = f, this[p].__swiffy_dm = !0
};
M.hb = function (a) {
    var b = this.u.h(this[p], a);
    b in this[p] ? delete this[p][b] : this.ad.hb(a)
};
ia(M, function () {
    var a = this[p]._name;
    !a && this[p] instanceof Y && !this[p]._parent && (a = "_root");
    return a
});
M.ba = function (a) {
    return ea(this, a ? a : this.Md)
};
M.ma = function () {
    return this[p]
};
var rf = function (a, b) {
        this.u = a;
        ea(this, new Z(b));
        this[p]._global = this[p]
    };
M = rf[D];
M.get = function (a) {
    return this[p][this.u.h(this[p], a)]
};
la(M, function (a, b) {
    var c = this[p][this.u.h(this[p], a)];
    if (Hb(c)) return c[K](this[p], b)
});
M.set = function () {
    return !1
};
M.va = function () {};
M.Ab = function () {};
M.hb = function (a) {
    delete this[p][this.u.h(this[p], a)]
};
ia(M, function () {
    return "_global"
});
M.ba = function () {};
M.ma = function () {
    return i
};
var bf = function (a) {
        this.C = [];
        this.ka = this.H = i;
        this.Fd = [];
        this.na = [];
        this.T = a;
        this.Qe = this.Ed();
        this.Uc = [];
        this.Yb = !1;
        this.W = 0;
        this.yd = new rf(this, a.j)
    };
M = bf[D];
M.fd = function (a) {
    this.Uc[n](a)
};
M.Rc = function (a) {
    if (!this.Yb) {
        for (this.Yb = !0; this.Uc[C] > 0;) this.Rd(this.Uc[ta]());
        this.Yb = !1
    }
    a !== !1 && this.T.lc()
};
M.Ed = function () {
    return (new Date).getTime()
};
M.reset = function (a) {
    this.H = this.ka = a;
    this.C = [];
    this.W = 0;
    this.C.length += 4;
    this.m = new qf(this, this.yd, a.N())
};
M.Rd = function (a) {
    if (!a.ca.Hd) {
        this.reset(a.ca);
        for (var b = 0; b < a.de[C];) b = a.de[b](this, b + 1)
    }
};
var sf = function (a) {
        a = a[o](/\.\.|\/:?|:/g, function (a) {
            return a == ".." ? "_parent" : "."
        });
        a[0] == "." && (a = "_root" + a);
        a[a[C] - 1] == "." && (a = a.substring(0, a[C] - 1));
        return a
    };
bf[D].Wc = function (a, b) {
    if (!O(b)) b = this.H;
    var c = a[G](":");
    return c[C] > 1 ? {
        path: this.sb(b, c[0]),
        ec: c[1]
    } : {
        path: b,
        ec: a
    }
};
bf[D].Jf = function (a) {
    for (var b = 0; b < this.Fd[C]; b++) this.Fd[b](a)
};
var tf = new Boolean(!1),
    uf = new Number(0),
    vf = new String("");
M = bf[D];
M.h = function (a, b) {
    if (this.ka.Va >= 7) {
        if (a instanceof X) {
            if (b in a) return b;
            var c = b[Bb]();
            if (c in a && wf[q](c) > -1) return c
        }
    } else {
        switch (typeof a) {
        case "object":
        case "function":
            break;
        case "boolean":
            a = tf;
            break;
        case "number":
            a = uf;
            break;
        case "string":
            a = vf;
            break;
        default:
            return b
        }
        if (b in a) return b;
        c = b[Bb]();
        if (c in a) return c;
        do
        for (var d = j.getOwnPropertyNames(a), e = 0; e < d[C]; e++) if (d[e][Bb]() == c) return d[e];
        while (a = a.__proto__)
    }
    return b
};
M.Gd = function (a) {
    if (Ib(a)) {
        var b = a[this.h(a, "x")],
            a = a[this.h(a, "y")];
        if (typeof b == "number" && typeof a == "number") return new U(b, a)
    }
    return i
};
M.ba = function (a) {
    (this.H = a) ? this.m.ba(a.N()) : this.m.ba(i)
};
M.ma = function () {
    return this.H
};
M.push = function (a) {
    this.C[n](a)
};
M.pop = function () {
    return this.C.pop()
};
M.xc = function (a) {
    var b = this.ka.Va;
    typeof a == "boolean" && b < 5 && (a = a ? "1" : "0");
    return !O(a) && b < 7 ? "" : String(a)
};
M.Rb = function (a) {
    var b = this.ka.Va;
    return !O(a) || a === i ? b < 7 ? 0 : Number.NaN : Gb(a) ? (a = Number(a), b < 5 && isNaN(a) ? 0 : a) : Number(a)
};
M.i = function () {
    return this.Rb(this.C.pop())
};
M.p = function () {
    return this.xc(this.C.pop())
};
M.Tb = function () {
    var a = this.C.pop();
    typeof a == "string" && (a = Number(a));
    return Boolean(a)
};
M.qc = function () {
    var a = this.pop();
    if (a instanceof X) return a;
    (a = this.sb(this.H, String(a))) && (a = a.N());
    return a
};
M.sb = function (a, b) {
    if (!a || !b) return a;
    for (var b = sf(b), c = a.N(), d = b[G]("."), e = 0; e < d[C] && c; e++) c = c[this.h(c, d[e])];
    return c ? c.__swiffy_d : i
};
M.Ke = function (a, b, c) {
    this.Yb || this.reset(c);
    c = this.Wc(a, c);
    if (c[Sa]) {
        a = c[Sa].N();
        c = this.h(a, c.ec);
        if (c in a && (b.Mc(a[c]), j.getOwnPropertyDescriptor(a, c).get)) return;
        j[u](a, c, {
            get: function () {
                return b.Xb
            },
            set: function (a) {
                b.Mc(a)
            },
            configurable: !0
        })
    }
};
M.of = function (a, b) {
    b[q]("_level") != 0 && a[Bb]()[q]("fscommand:") != 0 && a != "undefined" && (b == "" && (b = "_self"), window.open(a, b))
};
var ee = function (a) {
        for (var b = [], c = 0; c < a[C]; ++c) {
            var d = b,
                e = c,
                g;
            g = a[c];
            var h = $[g[A]];
            g = !h ? P(xf, g[A]) : h.Z ? h(g) : h;
            d[e] = g
        }
        return b
    },
    wf = "_x,_y,_xscale,_yscale,_currentframe,_totalframes,_alpha,_visible,_width,_height,_rotation,_target,_framesloaded,_name,_droptarget,_url,_highquality,_focusrect,_soundbuftime,_quality,_xmouse,_ymouse".split(","),
    $ = {
        4: function (a, b) {
            var c = a.H;
            c != i && c.ee();
            return b
        },
        5: function (a, b) {
            var c = a.H;
            c != i && c.fe();
            return b
        },
        6: function (a, b) {
            var c = a.H;
            c != i && c[Qa]();
            return b
        },
        7: function (a, b) {
            var c = a.H;
            c != i && c[Ya]();
            return b
        },
        9: function (a, b) {
            var c = a.H;
            c != i && c.Wa().vf();
            return b
        },
        10: function (a, b) {
            var c = a.i(),
                d = a.i();
            a[n](d + c);
            return b
        },
        11: function (a, b) {
            var c = a.i(),
                d = a.i();
            a[n](d - c);
            return b
        },
        12: function (a, b) {
            var c = a.i(),
                d = a.i();
            a[n](d * c);
            return b
        },
        13: function (a, b) {
            var c = a.i(),
                d = a.i();
            a[n](d / c);
            return b
        },
        14: function (a, b) {
            var c = a.i(),
                c = a.i() == c;
            a.ka.Va < 5 && (c = c ? 1 : 0);
            a[n](c);
            return b
        },
        15: function (a, b) {
            var c = a.i(),
                d = a.i();
            a[n](d < c);
            return b
        },
        16: function (a, b) {
            var c = a.Tb(),
                d = a.Tb();
            a[n](d && c);
            return b
        },
        17: function (a, b) {
            var c = a.Tb(),
                d = a.Tb();
            a[n](d || c);
            return b
        },
        18: function (a, b) {
            var c = a.Tb();
            a[n](!c);
            return b
        },
        19: function (a, b) {
            var c = a.p(),
                d = a.p();
            a[n](d == c);
            return b
        },
        20: function (a, b) {
            var c = a.p();
            a[n](c[C]);
            return b
        },
        21: function (a, b) {
            var c = Number(a.pop()),
                d = l.max(0, Number(a.pop()) - 1),
                e = a.p();
            a[n](e.substr(d, c));
            return b
        },
        23: function (a, b) {
            a.pop();
            return b
        },
        24: function (a, b) {
            var c = a.i(),
                c = c < 0 ? l.ceil(c) : l[Da](c);
            a[n](c);
            return b
        },
        28: function (a, b) {
            var c = a.p(),
                c = sf(c),
                c = c[G]("."),
                d = a.m.get(c[0]);
            if (c[C] > 1) {
                var e;
                for (e = 1; O(d) && e < c[C] - 1; ++e) d = d[a.h(d, c[e])];
                O(d) && (d = d[a.h(d, c[e])])
            }
            a[n](d);
            return b
        },
        29: function (a, b) {
            var c = a.pop(),
                d = a.p(),
                d = sf(d),
                e = d[G](".");
            if (e[C] == 1) a.m.set(d, c);
            else {
                var d = a.m.get(e[0]),
                    g;
                for (g = 1; O(d) && g < e[C] - 1; ++g) d = d[a.h(d, e[g])];
                O(d) && (d[a.h(d, e[g])] = c)
            }
            return b
        },
        33: function (a, b) {
            var c = a.p(),
                d = a.p();
            a[n](d + c);
            return b
        },
        34: function (a, b) {
            var c = wf[a.i()],
                d = a.qc();
            d ? a[n](d[c]) : a[n](f);
            return b
        },
        35: function (a, b) {
            var c = a.pop(),
                d = wf[a.i()],
                e = a.qc();
            e && d && (e[d] = c);
            return b
        },
        36: function (a, b) {
            var c = a.i(),
                d = a.p(),
                e = a.qc();
            e && e.__swiffy_d.duplicate(a.H, d, c);
            return b
        },
        37: function (a, b) {
            var c = a.qc();
            c instanceof Y && c.removeMovieClip();
            return b
        },
        38: function (a, b) {
            var c = a.pop();
            a.Jf(O(c) ? a.xc(c) : "undefined");
            return b
        }
    },
    xf = function (a, b, c) {
        return c
    };
$[51] = function (a, b) {
    var c = a.i();
    a[n](String.fromCharCode(c));
    return b
};
$[50] = function (a, b) {
    var c = a.p();
    a[n](c[nb](0));
    return b
};
$[52] = function (a, b) {
    a[n](a.Ed() - a.Qe);
    return b
};
$[48] = function (a, b) {
    var c = a.i(),
        d;
    do d = l[Da](l.random() * c);
    while (d == c && c > 0);
    a[n](d);
    return b
};
$[60] = function (a, b) {
    var c = a.pop(),
        d = a.pop();
    a.m.va(d, c);
    return b
};
$[65] = function (a, b) {
    var c = a.pop();
    a.m.Ab(c);
    return b
};
$[59] = function (a, b) {
    var c = a.pop();
    a.m.hb(c);
    return b
};
$[62] = function (a) {
    ma(a, a.pop());
    return Number.MAX_VALUE
};
$[63] = function (a, b) {
    var c = a.i(),
        d = a.i();
    a[n](d % c);
    return b
};
$[71] = function (a, b) {
    var c = a.pop(),
        d = a.pop();
    Gb(c) || Gb(d) ? a[n](a.xc(d) + a.xc(c)) : a[n](a.Rb(d) + a.Rb(c));
    return b
};
$[72] = function (a, b) {
    var c = a.pop(),
        d = a.pop();
    if (!Gb(c) || !Gb(d)) c = a.Rb(c), d = a.Rb(d);
    c !== c || d !== d ? a[n](f) : a[n](d < c);
    return b
};
$[103] = function (a, b) {
    var c = a.pop(),
        d = a.pop();
    a[n](d > c);
    return b
};
$[73] = function (a, b) {
    var c = a.pop(),
        d = a.pop();
    a[n](d == c);
    return b
};
$[102] = function (a, b) {
    var c = a.pop(),
        d = a.pop();
    a[n](d === c);
    return b
};
$[41] = function (a, b) {
    var c = a.p(),
        d = a.p();
    a[n](d < c);
    return b
};
$[104] = function (a, b) {
    var c = a.p(),
        d = a.p();
    a[n](d > c);
    return b
};
$[74] = function (a, b) {
    var c = a.i();
    a[n](c);
    return b
};
$[75] = function (a, b) {
    var c = a.p();
    a[n](c);
    return b
};
$[76] = function (a, b) {
    var c = a.pop();
    a[n](c);
    a[n](c);
    return b
};
$[77] = function (a, b) {
    var c = a.pop(),
        d = a.pop();
    a[n](c);
    a[n](d);
    return b
};
$[78] = function (a, b) {
    var c = a.p(),
        d = a.pop(),
        e;
    d && (e = d[a.h(d, c)]);
    a[n](e);
    return b
};
$[79] = function (a, b) {
    var c = a.pop(),
        d = a.p(),
        e = a.pop();
    e && (e[a.h(e, d)] = c);
    return b
};
$[80] = function (a, b) {
    var c = a.i();
    a[n](++c);
    return b
};
$[81] = function (a, b) {
    var c = a.i();
    a[n](--c);
    return b
};
$[96] = function (a, b) {
    var c = a.i(),
        d = a.i();
    a[n](c & d);
    return b
};
$[97] = function (a, b) {
    var c = a.i(),
        d = a.i();
    a[n](c | d);
    return b
};
$[98] = function (a, b) {
    var c = a.i(),
        d = a.i();
    a[n](d ^ c);
    return b
};
$[99] = function (a, b) {
    var c = a.i(),
        d = a.i();
    a[n](d << c);
    return b
};
$[100] = function (a, b) {
    var c = a.i(),
        d = a.i();
    a[n](d >> c);
    return b
};
$[101] = function (a, b) {
    var c = a.i(),
        d = a.i();
    a[n](d >>> c);
    return b
};
$[58] = function (a, b) {
    var c = a.p(),
        d = a.pop();
    d && delete d[a.h(d, c)];
    return b
};
$[129] = function (a) {
    return P(yf, a.frame)
};
$[129].Z = !0;
var yf = function (a, b, c) {
        b = b.H;
        b != i && b.Jb(a, !1);
        return c
    };
$[140] = function (a) {
    return P(zf, a.label)
};
$[140].Z = !0;
var zf = function (a, b, c) {
        b = b.H;
        b != i && (a = b.Fb(a), a != f && b.Jb(a, !1));
        return c
    };
$[136] = function (a) {
    return P(Af, a.constants)
};
$[136].Z = !0;
var Af = function (a, b, c) {
        b.na = a;
        return c
    };
$[32] = function (a, b) {
    var c = a.pop();
    c = c instanceof X ? c.__swiffy_d : (c = String(c)) ? a.sb(a.ka, c) : a.m.ba(i).__swiffy_d;
    a.ba(c);
    return b
};
$[69] = function (a, b) {
    var c = a.pop(),
        d;
    if (c instanceof Y) {
        d = "";
        for (c = c.__swiffy_d; c && c != a.T;) d = "." + c[Ka]() + d, c = c[sa]();
        c && (d = "_root" + d)
    }
    a[n](d);
    return b
};
$[305] = function (a) {
    return P(Bf, a.value)
};
$[305].Z = !0;
var Bf = function (a, b, c) {
        b[n](a);
        return c
    };
$[306] = function (a, b) {
    a[n](f);
    return b
};
$[307] = function (a, b) {
    a[n](Number[va]);
    return b
};
$[308] = function (a, b) {
    a[n](Number.NEGATIVE_INFINITY);
    return b
};
$[309] = function (a, b) {
    a[n](Number.NaN);
    return b
};
$[304] = function (a) {
    return P(Cf, a.index)
};
$[304].Z = !0;
var Cf = function (a, b, c) {
        b[n](b.na[a]);
        return c
    };
$[303] = function (a) {
    return P(Df, a.index)
};
$[303].Z = !0;
var Df = function (a, b, c) {
        b[n](b.C[b.W + a]);
        return c
    };
$[135] = function (a) {
    return P(Ef, a.index)
};
$[135].Z = !0;
var Ef = function (a, b, c) {
        b.C[b.W + a] = b.C[b.C[C] - 1];
        return c
    };
$[154] = function (a, b) {
    var c = a.p(),
        d = a.p();
    a.of(d, c);
    return b
};
$[148] = function (a) {
    return P(Ff, ee(a[hb]))
};
$[148].Z = !0;
var Ff = function (a, b, c) {
        var d = b.pop();
        if (!(d instanceof Ad)) return c;
        var e = b.m;
        b.m = new pf(b, e, d);
        for (d = 0; d < a[C];) d = a[d](b, d + 1);
        b.m = e;
        return c
    },
    Gf = function (a, b, c, d) {
        var e = d.m,
            g = d.W,
            h = d.na,
            r = d.H,
            z = d.ka;
        d.m = new of(d, new qf(d, d.yd, this));
        d.na = c;
        if (this instanceof X) d.H = this.__swiffy_d;
        d.W = d.C[C];
        d.C.length += 4;
        var w;
        for (w = 0; w < a[C]; ++w) d.m.va(a[w], arguments[4 + w]);
        d.m.va("this", this);
        ma(d, f);
        for (w = 0; w < b[C];) w = b[w](d, w + 1);
        ja(d.C, d.W);
        d.m = e;
        d.W = g;
        d.na = h;
        d.ka = z;
        d.H = r;
        return d[mb]
    };
$[155] = function (a) {
    return P(Hf, a.args, ee(a[hb]))
};
$[155].Z = !0;
var Hf = function (a, b, c, d) {
        a = P(Gf, a, b, c.na, c);
        Q(a, Ad);
        c[n](a);
        return d
    },
    If = function (a, b, c, d, e, g, h) {
        var r = h.m,
            z = h.W,
            w = h.na,
            Ia = h.ma(),
            J = h.ka;
        h.m = new of(h, g);
        h.na = e;
        h.ba(g.ma().__swiffy_d);
        h.W = h.C[C];
        h.C.length += d;
        h.m.va("this", this);
        for (var E = 0; E < c[C]; ++E) h.C[h.W + E + 1] = h.m.get(c[E]);
        for (E = 0; E < a[C]; ++E) Gb(a[E]) ? h.m.va(a[E], arguments[7 + E]) : h.C[h.W + a[E]] = arguments[7 + E];
        ma(h, f);
        for (E = 0; E < b[C];) E = b[E](h, E + 1);
        ja(h.C, h.W);
        h.m = r;
        h.W = z;
        h.na = w;
        h.ka = J;
        h.ba(Ia);
        return h[mb]
    };
$[142] = function (a) {
    return P(Jf, a.args, ee(a[hb]), a.preloads, a.registerCount)
};
$[142].Z = !0;
var Jf = function (a, b, c, d, e, g) {
        a = P(If, a, b, c, d, e.na, e.m, e);
        Q(a, Ad);
        e[n](a);
        return g
    };
$[61] = function (a, b) {
    for (var c = a.p(), d = a.i(), e = [], g = 0; g < d; ++g) e[g] = a.pop();
    a[n](a.m[I](c, e));
    return b
};
$[82] = function (a, b) {
    for (var c = a.pop(), d = a.pop(), e = a.i(), g = [], h = 0; h < e; h++) g[h] = a.pop();
    if (d != i) if (c)(c = d[a.h(d, String(c))]) ? a[n](c[K](d, g)) : a[n](f);
    else a[n](d[K](a.m.ma(), g));
    else a[n](f);
    return b
};
$[64] = function (a, b) {
    for (var c = a.p(), c = a.m.get(c), d = a.i(), e = [], g = 0; g < d; ++g) e[g] = a.pop();
    Hb(c) || (c = Ad);
    d = j.create(c[D]);
    c[K](d, e);
    a[n](d);
    return b
};
$[83] = function (a, b) {
    for (var c = a.pop(), d = a.pop(), e = a.i(), g = [], h = 0; h < e; h++) g[h] = a.pop();
    var r;
    d != i && (r = c ? d[a.h(d, String(c))] : d);
    Hb(r) || (r = Ad);
    c = j.create(r[D]);
    r[K](c, g);
    a[n](c);
    return b
};
$[67] = function (a, b) {
    for (var c = new Ad, d = a.i(), e = 0; e < d; e++) {
        var g = a.pop(),
            h = a.p();
        c[h] = g
    }
    a[n](c);
    return b
};
$[66] = function (a, b) {
    for (var c = [], d = a.i(), e = 0; e < d; e++) {
        var g = a.pop();
        c[e] = g
    }
    a[n](c);
    return b
};
$[68] = function (a, b) {
    var c = a.pop();
    a[n](c instanceof Y ? "movieclip" : c == i || c == f ? String(c) : typeof c);
    return b
};
$[85] = function (a, b) {
    var c = a.pop();
    a[n](i);
    for (var d in c) a[n](d);
    return b
};
$[153] = function (a) {
    return P(Kf, a[jb])
};
$[153].Z = !0;
var Kf = function (a) {
        return a
    };
$[157] = function (a) {
    return P(Lf, a[jb])
};
$[157].Z = !0;
var Lf = function (a, b, c) {
        return Boolean(b.pop()) ? a : c
    };
$[158] = function (a, b) {
    var c = a.p(),
        c = a.Wc(c);
    if (c[Sa]) {
        var d = c[Sa].Fb(c.ec);
        if (d != f && (d = c[Sa].cf(d))) for (var e = 0; e < d[C]; e++) d[e].Mb(c[Sa])
    }
    return b
};
$[159] = function (a) {
    return P(Mf, a.frameBias, a[Qa])
};
$[159].Z = !0;
var Mf = function (a, b, c, d) {
        var e = c.p(),
            c = c.Wc(e);
        c[Sa] && (e = c[Sa].Fb(c.ec), e != f && c[Sa].Jb(e + a, b));
        return d
    };
})(window);