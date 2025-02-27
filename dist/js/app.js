(() => {
    "use strict";
    !function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e();
    }(void 0, (function() {
        "use strict";
        const t = new Map, e = {
            set(e, i, n) {
                t.has(e) || t.set(e, new Map);
                const s = t.get(e);
                s.has(i) || 0 === s.size ? s.set(i, n) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`);
            },
            get: (e, i) => t.has(e) && t.get(e).get(i) || null,
            remove(e, i) {
                if (!t.has(e)) return;
                const n = t.get(e);
                n.delete(i), 0 === n.size && t.delete(e);
            }
        }, i = "transitionend", n = t => (t && window.CSS && window.CSS.escape && (t = t.replace(/#([^\s"#']+)/g, ((t, e) => `#${CSS.escape(e)}`))), 
        t), s = t => {
            t.dispatchEvent(new Event(i));
        }, o = t => !(!t || "object" != typeof t) && (void 0 !== t.jquery && (t = t[0]), 
        void 0 !== t.nodeType), r = t => o(t) ? t.jquery ? t[0] : t : "string" == typeof t && t.length > 0 ? document.querySelector(n(t)) : null, a = t => {
            if (!o(t) || 0 === t.getClientRects().length) return !1;
            const e = "visible" === getComputedStyle(t).getPropertyValue("visibility"), i = t.closest("details:not([open])");
            if (!i) return e;
            if (i !== t) {
                const e = t.closest("summary");
                if (e && e.parentNode !== i) return !1;
                if (null === e) return !1;
            }
            return e;
        }, l = t => !t || t.nodeType !== Node.ELEMENT_NODE || !!t.classList.contains("disabled") || (void 0 !== t.disabled ? t.disabled : t.hasAttribute("disabled") && "false" !== t.getAttribute("disabled")), c = t => {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof t.getRootNode) {
                const e = t.getRootNode();
                return e instanceof ShadowRoot ? e : null;
            }
            return t instanceof ShadowRoot ? t : t.parentNode ? c(t.parentNode) : null;
        }, h = () => {}, d = t => {
            t.offsetHeight;
        }, u = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, f = [], p = () => "rtl" === document.documentElement.dir, m = t => {
            var e;
            e = () => {
                const e = u();
                if (e) {
                    const i = t.NAME, n = e.fn[i];
                    e.fn[i] = t.jQueryInterface, e.fn[i].Constructor = t, e.fn[i].noConflict = () => (e.fn[i] = n, 
                    t.jQueryInterface);
                }
            }, "loading" === document.readyState ? (f.length || document.addEventListener("DOMContentLoaded", (() => {
                for (const t of f) t();
            })), f.push(e)) : e();
        }, g = (t, e = [], i = t) => "function" == typeof t ? t(...e) : i, _ = (t, e, n = !0) => {
            if (!n) return void g(t);
            const o = (t => {
                if (!t) return 0;
                let {transitionDuration: e, transitionDelay: i} = window.getComputedStyle(t);
                const n = Number.parseFloat(e), s = Number.parseFloat(i);
                return n || s ? (e = e.split(",")[0], i = i.split(",")[0], 1e3 * (Number.parseFloat(e) + Number.parseFloat(i))) : 0;
            })(e) + 5;
            let r = !1;
            const a = ({target: n}) => {
                n === e && (r = !0, e.removeEventListener(i, a), g(t));
            };
            e.addEventListener(i, a), setTimeout((() => {
                r || s(e);
            }), o);
        }, b = (t, e, i, n) => {
            const s = t.length;
            let o = t.indexOf(e);
            return -1 === o ? !i && n ? t[s - 1] : t[0] : (o += i ? 1 : -1, n && (o = (o + s) % s), 
            t[Math.max(0, Math.min(o, s - 1))]);
        }, v = /[^.]*(?=\..*)\.|.*/, y = /\..*/, w = /::\d+$/, A = {};
        let E = 1;
        const T = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, C = new Set([ "click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll" ]);
        function O(t, e) {
            return e && `${e}::${E++}` || t.uidEvent || E++;
        }
        function x(t) {
            const e = O(t);
            return t.uidEvent = e, A[e] = A[e] || {}, A[e];
        }
        function k(t, e, i = null) {
            return Object.values(t).find((t => t.callable === e && t.delegationSelector === i));
        }
        function L(t, e, i) {
            const n = "string" == typeof e, s = n ? i : e || i;
            let o = I(t);
            return C.has(o) || (o = t), [ n, s, o ];
        }
        function S(t, e, i, n, s) {
            if ("string" != typeof e || !t) return;
            let [o, r, a] = L(e, i, n);
            if (e in T) {
                const t = t => function(e) {
                    if (!e.relatedTarget || e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget)) return t.call(this, e);
                };
                r = t(r);
            }
            const l = x(t), c = l[a] || (l[a] = {}), h = k(c, r, o ? i : null);
            if (h) return void (h.oneOff = h.oneOff && s);
            const d = O(r, e.replace(v, "")), u = o ? function(t, e, i) {
                return function n(s) {
                    const o = t.querySelectorAll(e);
                    for (let {target: r} = s; r && r !== this; r = r.parentNode) for (const a of o) if (a === r) return P(s, {
                        delegateTarget: r
                    }), n.oneOff && N.off(t, s.type, e, i), i.apply(r, [ s ]);
                };
            }(t, i, r) : function(t, e) {
                return function i(n) {
                    return P(n, {
                        delegateTarget: t
                    }), i.oneOff && N.off(t, n.type, e), e.apply(t, [ n ]);
                };
            }(t, r);
            u.delegationSelector = o ? i : null, u.callable = r, u.oneOff = s, u.uidEvent = d, 
            c[d] = u, t.addEventListener(a, u, o);
        }
        function D(t, e, i, n, s) {
            const o = k(e[i], n, s);
            o && (t.removeEventListener(i, o, Boolean(s)), delete e[i][o.uidEvent]);
        }
        function $(t, e, i, n) {
            const s = e[i] || {};
            for (const [o, r] of Object.entries(s)) o.includes(n) && D(t, e, i, r.callable, r.delegationSelector);
        }
        function I(t) {
            return t = t.replace(y, ""), T[t] || t;
        }
        const N = {
            on(t, e, i, n) {
                S(t, e, i, n, !1);
            },
            one(t, e, i, n) {
                S(t, e, i, n, !0);
            },
            off(t, e, i, n) {
                if ("string" != typeof e || !t) return;
                const [s, o, r] = L(e, i, n), a = r !== e, l = x(t), c = l[r] || {}, h = e.startsWith(".");
                if (void 0 === o) {
                    if (h) for (const i of Object.keys(l)) $(t, l, i, e.slice(1));
                    for (const [i, n] of Object.entries(c)) {
                        const s = i.replace(w, "");
                        a && !e.includes(s) || D(t, l, r, n.callable, n.delegationSelector);
                    }
                } else {
                    if (!Object.keys(c).length) return;
                    D(t, l, r, o, s ? i : null);
                }
            },
            trigger(t, e, i) {
                if ("string" != typeof e || !t) return null;
                const n = u();
                let s = null, o = !0, r = !0, a = !1;
                e !== I(e) && n && (s = n.Event(e, i), n(t).trigger(s), o = !s.isPropagationStopped(), 
                r = !s.isImmediatePropagationStopped(), a = s.isDefaultPrevented());
                const l = P(new Event(e, {
                    bubbles: o,
                    cancelable: !0
                }), i);
                return a && l.preventDefault(), r && t.dispatchEvent(l), l.defaultPrevented && s && s.preventDefault(), 
                l;
            }
        };
        function P(t, e = {}) {
            for (const [i, n] of Object.entries(e)) try {
                t[i] = n;
            } catch (e) {
                Object.defineProperty(t, i, {
                    configurable: !0,
                    get: () => n
                });
            }
            return t;
        }
        function j(t) {
            if ("true" === t) return !0;
            if ("false" === t) return !1;
            if (t === Number(t).toString()) return Number(t);
            if ("" === t || "null" === t) return null;
            if ("string" != typeof t) return t;
            try {
                return JSON.parse(decodeURIComponent(t));
            } catch (e) {
                return t;
            }
        }
        function M(t) {
            return t.replace(/[A-Z]/g, (t => `-${t.toLowerCase()}`));
        }
        const F = {
            setDataAttribute(t, e, i) {
                t.setAttribute(`data-bs-${M(e)}`, i);
            },
            removeDataAttribute(t, e) {
                t.removeAttribute(`data-bs-${M(e)}`);
            },
            getDataAttributes(t) {
                if (!t) return {};
                const e = {}, i = Object.keys(t.dataset).filter((t => t.startsWith("bs") && !t.startsWith("bsConfig")));
                for (const n of i) {
                    let i = n.replace(/^bs/, "");
                    i = i.charAt(0).toLowerCase() + i.slice(1, i.length), e[i] = j(t.dataset[n]);
                }
                return e;
            },
            getDataAttribute: (t, e) => j(t.getAttribute(`data-bs-${M(e)}`))
        };
        class H {
            static get Default() {
                return {};
            }
            static get DefaultType() {
                return {};
            }
            static get NAME() {
                throw new Error('You have to implement the static method "NAME", for each component!');
            }
            _getConfig(t) {
                return t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), 
                t;
            }
            _configAfterMerge(t) {
                return t;
            }
            _mergeConfigObj(t, e) {
                const i = o(e) ? F.getDataAttribute(e, "config") : {};
                return {
                    ...this.constructor.Default,
                    ..."object" == typeof i ? i : {},
                    ...o(e) ? F.getDataAttributes(e) : {},
                    ..."object" == typeof t ? t : {}
                };
            }
            _typeCheckConfig(t, e = this.constructor.DefaultType) {
                for (const [n, s] of Object.entries(e)) {
                    const e = t[n], r = o(e) ? "element" : null == (i = e) ? `${i}` : Object.prototype.toString.call(i).match(/\s([a-z]+)/i)[1].toLowerCase();
                    if (!new RegExp(s).test(r)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${r}" but expected type "${s}".`);
                }
                var i;
            }
        }
        class W extends H {
            constructor(t, i) {
                super(), (t = r(t)) && (this._element = t, this._config = this._getConfig(i), e.set(this._element, this.constructor.DATA_KEY, this));
            }
            dispose() {
                e.remove(this._element, this.constructor.DATA_KEY), N.off(this._element, this.constructor.EVENT_KEY);
                for (const t of Object.getOwnPropertyNames(this)) this[t] = null;
            }
            _queueCallback(t, e, i = !0) {
                _(t, e, i);
            }
            _getConfig(t) {
                return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), 
                this._typeCheckConfig(t), t;
            }
            static getInstance(t) {
                return e.get(r(t), this.DATA_KEY);
            }
            static getOrCreateInstance(t, e = {}) {
                return this.getInstance(t) || new this(t, "object" == typeof e ? e : null);
            }
            static get VERSION() {
                return "5.3.3";
            }
            static get DATA_KEY() {
                return `bs.${this.NAME}`;
            }
            static get EVENT_KEY() {
                return `.${this.DATA_KEY}`;
            }
            static eventName(t) {
                return `${t}${this.EVENT_KEY}`;
            }
        }
        const B = t => {
            let e = t.getAttribute("data-bs-target");
            if (!e || "#" === e) {
                let i = t.getAttribute("href");
                if (!i || !i.includes("#") && !i.startsWith(".")) return null;
                i.includes("#") && !i.startsWith("#") && (i = `#${i.split("#")[1]}`), e = i && "#" !== i ? i.trim() : null;
            }
            return e ? e.split(",").map((t => n(t))).join(",") : null;
        }, z = {
            find: (t, e = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e, t)),
            findOne: (t, e = document.documentElement) => Element.prototype.querySelector.call(e, t),
            children: (t, e) => [].concat(...t.children).filter((t => t.matches(e))),
            parents(t, e) {
                const i = [];
                let n = t.parentNode.closest(e);
                for (;n; ) i.push(n), n = n.parentNode.closest(e);
                return i;
            },
            prev(t, e) {
                let i = t.previousElementSibling;
                for (;i; ) {
                    if (i.matches(e)) return [ i ];
                    i = i.previousElementSibling;
                }
                return [];
            },
            next(t, e) {
                let i = t.nextElementSibling;
                for (;i; ) {
                    if (i.matches(e)) return [ i ];
                    i = i.nextElementSibling;
                }
                return [];
            },
            focusableChildren(t) {
                const e = [ "a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]' ].map((t => `${t}:not([tabindex^="-"])`)).join(",");
                return this.find(e, t).filter((t => !l(t) && a(t)));
            },
            getSelectorFromElement(t) {
                const e = B(t);
                return e && z.findOne(e) ? e : null;
            },
            getElementFromSelector(t) {
                const e = B(t);
                return e ? z.findOne(e) : null;
            },
            getMultipleElementsFromSelector(t) {
                const e = B(t);
                return e ? z.find(e) : [];
            }
        }, R = (t, e = "hide") => {
            const i = `click.dismiss${t.EVENT_KEY}`, n = t.NAME;
            N.on(document, i, `[data-bs-dismiss="${n}"]`, (function(i) {
                if ([ "A", "AREA" ].includes(this.tagName) && i.preventDefault(), l(this)) return;
                const s = z.getElementFromSelector(this) || this.closest(`.${n}`);
                t.getOrCreateInstance(s)[e]();
            }));
        }, q = ".bs.alert", V = `close${q}`, K = `closed${q}`;
        class Q extends W {
            static get NAME() {
                return "alert";
            }
            close() {
                if (N.trigger(this._element, V).defaultPrevented) return;
                this._element.classList.remove("show");
                const t = this._element.classList.contains("fade");
                this._queueCallback((() => this._destroyElement()), this._element, t);
            }
            _destroyElement() {
                this._element.remove(), N.trigger(this._element, K), this.dispose();
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = Q.getOrCreateInstance(this);
                    if ("string" == typeof t) {
                        if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                        e[t](this);
                    }
                }));
            }
        }
        R(Q, "close"), m(Q);
        const X = '[data-bs-toggle="button"]';
        class Y extends W {
            static get NAME() {
                return "button";
            }
            toggle() {
                this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"));
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = Y.getOrCreateInstance(this);
                    "toggle" === t && e[t]();
                }));
            }
        }
        N.on(document, "click.bs.button.data-api", X, (t => {
            t.preventDefault();
            const e = t.target.closest(X);
            Y.getOrCreateInstance(e).toggle();
        })), m(Y);
        const U = ".bs.swipe", G = `touchstart${U}`, J = `touchmove${U}`, Z = `touchend${U}`, tt = `pointerdown${U}`, et = `pointerup${U}`, it = {
            endCallback: null,
            leftCallback: null,
            rightCallback: null
        }, nt = {
            endCallback: "(function|null)",
            leftCallback: "(function|null)",
            rightCallback: "(function|null)"
        };
        class st extends H {
            constructor(t, e) {
                super(), this._element = t, t && st.isSupported() && (this._config = this._getConfig(e), 
                this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents());
            }
            static get Default() {
                return it;
            }
            static get DefaultType() {
                return nt;
            }
            static get NAME() {
                return "swipe";
            }
            dispose() {
                N.off(this._element, U);
            }
            _start(t) {
                this._supportPointerEvents ? this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX) : this._deltaX = t.touches[0].clientX;
            }
            _end(t) {
                this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), 
                g(this._config.endCallback);
            }
            _move(t) {
                this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX;
            }
            _handleSwipe() {
                const t = Math.abs(this._deltaX);
                if (t <= 40) return;
                const e = t / this._deltaX;
                this._deltaX = 0, e && g(e > 0 ? this._config.rightCallback : this._config.leftCallback);
            }
            _initEvents() {
                this._supportPointerEvents ? (N.on(this._element, tt, (t => this._start(t))), N.on(this._element, et, (t => this._end(t))), 
                this._element.classList.add("pointer-event")) : (N.on(this._element, G, (t => this._start(t))), 
                N.on(this._element, J, (t => this._move(t))), N.on(this._element, Z, (t => this._end(t))));
            }
            _eventIsPointerPenTouch(t) {
                return this._supportPointerEvents && ("pen" === t.pointerType || "touch" === t.pointerType);
            }
            static isSupported() {
                return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
            }
        }
        const ot = ".bs.carousel", rt = ".data-api", at = "next", lt = "prev", ct = "left", ht = "right", dt = `slide${ot}`, ut = `slid${ot}`, ft = `keydown${ot}`, pt = `mouseenter${ot}`, mt = `mouseleave${ot}`, gt = `dragstart${ot}`, _t = `load${ot}${rt}`, bt = `click${ot}${rt}`, vt = "carousel", yt = "active", wt = ".active", At = ".carousel-item", Et = wt + At, Tt = {
            ArrowLeft: ht,
            ArrowRight: ct
        }, Ct = {
            interval: 5e3,
            keyboard: !0,
            pause: "hover",
            ride: !1,
            touch: !0,
            wrap: !0
        }, Ot = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            pause: "(string|boolean)",
            ride: "(boolean|string)",
            touch: "boolean",
            wrap: "boolean"
        };
        class xt extends W {
            constructor(t, e) {
                super(t, e), this._interval = null, this._activeElement = null, this._isSliding = !1, 
                this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = z.findOne(".carousel-indicators", this._element), 
                this._addEventListeners(), this._config.ride === vt && this.cycle();
            }
            static get Default() {
                return Ct;
            }
            static get DefaultType() {
                return Ot;
            }
            static get NAME() {
                return "carousel";
            }
            next() {
                this._slide(at);
            }
            nextWhenVisible() {
                !document.hidden && a(this._element) && this.next();
            }
            prev() {
                this._slide(lt);
            }
            pause() {
                this._isSliding && s(this._element), this._clearInterval();
            }
            cycle() {
                this._clearInterval(), this._updateInterval(), this._interval = setInterval((() => this.nextWhenVisible()), this._config.interval);
            }
            _maybeEnableCycle() {
                this._config.ride && (this._isSliding ? N.one(this._element, ut, (() => this.cycle())) : this.cycle());
            }
            to(t) {
                const e = this._getItems();
                if (t > e.length - 1 || t < 0) return;
                if (this._isSliding) return void N.one(this._element, ut, (() => this.to(t)));
                const i = this._getItemIndex(this._getActive());
                if (i === t) return;
                const n = t > i ? at : lt;
                this._slide(n, e[t]);
            }
            dispose() {
                this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
            }
            _configAfterMerge(t) {
                return t.defaultInterval = t.interval, t;
            }
            _addEventListeners() {
                this._config.keyboard && N.on(this._element, ft, (t => this._keydown(t))), "hover" === this._config.pause && (N.on(this._element, pt, (() => this.pause())), 
                N.on(this._element, mt, (() => this._maybeEnableCycle()))), this._config.touch && st.isSupported() && this._addTouchEventListeners();
            }
            _addTouchEventListeners() {
                for (const t of z.find(".carousel-item img", this._element)) N.on(t, gt, (t => t.preventDefault()));
                const t = {
                    leftCallback: () => this._slide(this._directionToOrder(ct)),
                    rightCallback: () => this._slide(this._directionToOrder(ht)),
                    endCallback: () => {
                        "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), 
                        this.touchTimeout = setTimeout((() => this._maybeEnableCycle()), 500 + this._config.interval));
                    }
                };
                this._swipeHelper = new st(this._element, t);
            }
            _keydown(t) {
                if (/input|textarea/i.test(t.target.tagName)) return;
                const e = Tt[t.key];
                e && (t.preventDefault(), this._slide(this._directionToOrder(e)));
            }
            _getItemIndex(t) {
                return this._getItems().indexOf(t);
            }
            _setActiveIndicatorElement(t) {
                if (!this._indicatorsElement) return;
                const e = z.findOne(wt, this._indicatorsElement);
                e.classList.remove(yt), e.removeAttribute("aria-current");
                const i = z.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
                i && (i.classList.add(yt), i.setAttribute("aria-current", "true"));
            }
            _updateInterval() {
                const t = this._activeElement || this._getActive();
                if (!t) return;
                const e = Number.parseInt(t.getAttribute("data-bs-interval"), 10);
                this._config.interval = e || this._config.defaultInterval;
            }
            _slide(t, e = null) {
                if (this._isSliding) return;
                const i = this._getActive(), n = t === at, s = e || b(this._getItems(), i, n, this._config.wrap);
                if (s === i) return;
                const o = this._getItemIndex(s), r = e => N.trigger(this._element, e, {
                    relatedTarget: s,
                    direction: this._orderToDirection(t),
                    from: this._getItemIndex(i),
                    to: o
                });
                if (r(dt).defaultPrevented) return;
                if (!i || !s) return;
                const a = Boolean(this._interval);
                this.pause(), this._isSliding = !0, this._setActiveIndicatorElement(o), this._activeElement = s;
                const l = n ? "carousel-item-start" : "carousel-item-end", c = n ? "carousel-item-next" : "carousel-item-prev";
                s.classList.add(c), d(s), i.classList.add(l), s.classList.add(l), this._queueCallback((() => {
                    s.classList.remove(l, c), s.classList.add(yt), i.classList.remove(yt, c, l), this._isSliding = !1, 
                    r(ut);
                }), i, this._isAnimated()), a && this.cycle();
            }
            _isAnimated() {
                return this._element.classList.contains("slide");
            }
            _getActive() {
                return z.findOne(Et, this._element);
            }
            _getItems() {
                return z.find(At, this._element);
            }
            _clearInterval() {
                this._interval && (clearInterval(this._interval), this._interval = null);
            }
            _directionToOrder(t) {
                return p() ? t === ct ? lt : at : t === ct ? at : lt;
            }
            _orderToDirection(t) {
                return p() ? t === lt ? ct : ht : t === lt ? ht : ct;
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = xt.getOrCreateInstance(this, t);
                    if ("number" != typeof t) {
                        if ("string" == typeof t) {
                            if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                            e[t]();
                        }
                    } else e.to(t);
                }));
            }
        }
        N.on(document, bt, "[data-bs-slide], [data-bs-slide-to]", (function(t) {
            const e = z.getElementFromSelector(this);
            if (!e || !e.classList.contains(vt)) return;
            t.preventDefault();
            const i = xt.getOrCreateInstance(e), n = this.getAttribute("data-bs-slide-to");
            return n ? (i.to(n), void i._maybeEnableCycle()) : "next" === F.getDataAttribute(this, "slide") ? (i.next(), 
            void i._maybeEnableCycle()) : (i.prev(), void i._maybeEnableCycle());
        })), N.on(window, _t, (() => {
            const t = z.find('[data-bs-ride="carousel"]');
            for (const e of t) xt.getOrCreateInstance(e);
        })), m(xt);
        const kt = ".bs.collapse", Lt = `show${kt}`, St = `shown${kt}`, Dt = `hide${kt}`, $t = `hidden${kt}`, It = `click${kt}.data-api`, Nt = "show", Pt = "collapse", jt = "collapsing", Mt = `:scope .${Pt} .${Pt}`, Ft = '[data-bs-toggle="collapse"]', Ht = {
            parent: null,
            toggle: !0
        }, Wt = {
            parent: "(null|element)",
            toggle: "boolean"
        };
        class Bt extends W {
            constructor(t, e) {
                super(t, e), this._isTransitioning = !1, this._triggerArray = [];
                const i = z.find(Ft);
                for (const t of i) {
                    const e = z.getSelectorFromElement(t), i = z.find(e).filter((t => t === this._element));
                    null !== e && i.length && this._triggerArray.push(t);
                }
                this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), 
                this._config.toggle && this.toggle();
            }
            static get Default() {
                return Ht;
            }
            static get DefaultType() {
                return Wt;
            }
            static get NAME() {
                return "collapse";
            }
            toggle() {
                this._isShown() ? this.hide() : this.show();
            }
            show() {
                if (this._isTransitioning || this._isShown()) return;
                let t = [];
                if (this._config.parent && (t = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter((t => t !== this._element)).map((t => Bt.getOrCreateInstance(t, {
                    toggle: !1
                })))), t.length && t[0]._isTransitioning) return;
                if (N.trigger(this._element, Lt).defaultPrevented) return;
                for (const e of t) e.hide();
                const e = this._getDimension();
                this._element.classList.remove(Pt), this._element.classList.add(jt), this._element.style[e] = 0, 
                this._addAriaAndCollapsedClass(this._triggerArray, !0), this._isTransitioning = !0;
                const i = `scroll${e[0].toUpperCase() + e.slice(1)}`;
                this._queueCallback((() => {
                    this._isTransitioning = !1, this._element.classList.remove(jt), this._element.classList.add(Pt, Nt), 
                    this._element.style[e] = "", N.trigger(this._element, St);
                }), this._element, !0), this._element.style[e] = `${this._element[i]}px`;
            }
            hide() {
                if (this._isTransitioning || !this._isShown()) return;
                if (N.trigger(this._element, Dt).defaultPrevented) return;
                const t = this._getDimension();
                this._element.style[t] = `${this._element.getBoundingClientRect()[t]}px`, d(this._element), 
                this._element.classList.add(jt), this._element.classList.remove(Pt, Nt);
                for (const t of this._triggerArray) {
                    const e = z.getElementFromSelector(t);
                    e && !this._isShown(e) && this._addAriaAndCollapsedClass([ t ], !1);
                }
                this._isTransitioning = !0, this._element.style[t] = "", this._queueCallback((() => {
                    this._isTransitioning = !1, this._element.classList.remove(jt), this._element.classList.add(Pt), 
                    N.trigger(this._element, $t);
                }), this._element, !0);
            }
            _isShown(t = this._element) {
                return t.classList.contains(Nt);
            }
            _configAfterMerge(t) {
                return t.toggle = Boolean(t.toggle), t.parent = r(t.parent), t;
            }
            _getDimension() {
                return this._element.classList.contains("collapse-horizontal") ? "width" : "height";
            }
            _initializeChildren() {
                if (!this._config.parent) return;
                const t = this._getFirstLevelChildren(Ft);
                for (const e of t) {
                    const t = z.getElementFromSelector(e);
                    t && this._addAriaAndCollapsedClass([ e ], this._isShown(t));
                }
            }
            _getFirstLevelChildren(t) {
                const e = z.find(Mt, this._config.parent);
                return z.find(t, this._config.parent).filter((t => !e.includes(t)));
            }
            _addAriaAndCollapsedClass(t, e) {
                if (t.length) for (const i of t) i.classList.toggle("collapsed", !e), i.setAttribute("aria-expanded", e);
            }
            static jQueryInterface(t) {
                const e = {};
                return "string" == typeof t && /show|hide/.test(t) && (e.toggle = !1), this.each((function() {
                    const i = Bt.getOrCreateInstance(this, e);
                    if ("string" == typeof t) {
                        if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                        i[t]();
                    }
                }));
            }
        }
        N.on(document, It, Ft, (function(t) {
            ("A" === t.target.tagName || t.delegateTarget && "A" === t.delegateTarget.tagName) && t.preventDefault();
            for (const t of z.getMultipleElementsFromSelector(this)) Bt.getOrCreateInstance(t, {
                toggle: !1
            }).toggle();
        })), m(Bt);
        var zt = "top", Rt = "bottom", qt = "right", Vt = "left", Kt = "auto", Qt = [ zt, Rt, qt, Vt ], Xt = "start", Yt = "end", Ut = "clippingParents", Gt = "viewport", Jt = "popper", Zt = "reference", te = Qt.reduce((function(t, e) {
            return t.concat([ e + "-" + Xt, e + "-" + Yt ]);
        }), []), ee = [].concat(Qt, [ Kt ]).reduce((function(t, e) {
            return t.concat([ e, e + "-" + Xt, e + "-" + Yt ]);
        }), []), ie = "beforeRead", ne = "read", se = "afterRead", oe = "beforeMain", re = "main", ae = "afterMain", le = "beforeWrite", ce = "write", he = "afterWrite", de = [ ie, ne, se, oe, re, ae, le, ce, he ];
        function ue(t) {
            return t ? (t.nodeName || "").toLowerCase() : null;
        }
        function fe(t) {
            if (null == t) return window;
            if ("[object Window]" !== t.toString()) {
                var e = t.ownerDocument;
                return e && e.defaultView || window;
            }
            return t;
        }
        function pe(t) {
            return t instanceof fe(t).Element || t instanceof Element;
        }
        function me(t) {
            return t instanceof fe(t).HTMLElement || t instanceof HTMLElement;
        }
        function ge(t) {
            return "undefined" != typeof ShadowRoot && (t instanceof fe(t).ShadowRoot || t instanceof ShadowRoot);
        }
        const _e = {
            name: "applyStyles",
            enabled: !0,
            phase: "write",
            fn: function(t) {
                var e = t.state;
                Object.keys(e.elements).forEach((function(t) {
                    var i = e.styles[t] || {}, n = e.attributes[t] || {}, s = e.elements[t];
                    me(s) && ue(s) && (Object.assign(s.style, i), Object.keys(n).forEach((function(t) {
                        var e = n[t];
                        !1 === e ? s.removeAttribute(t) : s.setAttribute(t, !0 === e ? "" : e);
                    })));
                }));
            },
            effect: function(t) {
                var e = t.state, i = {
                    popper: {
                        position: e.options.strategy,
                        left: "0",
                        top: "0",
                        margin: "0"
                    },
                    arrow: {
                        position: "absolute"
                    },
                    reference: {}
                };
                return Object.assign(e.elements.popper.style, i.popper), e.styles = i, e.elements.arrow && Object.assign(e.elements.arrow.style, i.arrow), 
                function() {
                    Object.keys(e.elements).forEach((function(t) {
                        var n = e.elements[t], s = e.attributes[t] || {}, o = Object.keys(e.styles.hasOwnProperty(t) ? e.styles[t] : i[t]).reduce((function(t, e) {
                            return t[e] = "", t;
                        }), {});
                        me(n) && ue(n) && (Object.assign(n.style, o), Object.keys(s).forEach((function(t) {
                            n.removeAttribute(t);
                        })));
                    }));
                };
            },
            requires: [ "computeStyles" ]
        };
        function be(t) {
            return t.split("-")[0];
        }
        var ve = Math.max, ye = Math.min, we = Math.round;
        function Ae() {
            var t = navigator.userAgentData;
            return null != t && t.brands && Array.isArray(t.brands) ? t.brands.map((function(t) {
                return t.brand + "/" + t.version;
            })).join(" ") : navigator.userAgent;
        }
        function Ee() {
            return !/^((?!chrome|android).)*safari/i.test(Ae());
        }
        function Te(t, e, i) {
            void 0 === e && (e = !1), void 0 === i && (i = !1);
            var n = t.getBoundingClientRect(), s = 1, o = 1;
            e && me(t) && (s = t.offsetWidth > 0 && we(n.width) / t.offsetWidth || 1, o = t.offsetHeight > 0 && we(n.height) / t.offsetHeight || 1);
            var r = (pe(t) ? fe(t) : window).visualViewport, a = !Ee() && i, l = (n.left + (a && r ? r.offsetLeft : 0)) / s, c = (n.top + (a && r ? r.offsetTop : 0)) / o, h = n.width / s, d = n.height / o;
            return {
                width: h,
                height: d,
                top: c,
                right: l + h,
                bottom: c + d,
                left: l,
                x: l,
                y: c
            };
        }
        function Ce(t) {
            var e = Te(t), i = t.offsetWidth, n = t.offsetHeight;
            return Math.abs(e.width - i) <= 1 && (i = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), 
            {
                x: t.offsetLeft,
                y: t.offsetTop,
                width: i,
                height: n
            };
        }
        function Oe(t, e) {
            var i = e.getRootNode && e.getRootNode();
            if (t.contains(e)) return !0;
            if (i && ge(i)) {
                var n = e;
                do {
                    if (n && t.isSameNode(n)) return !0;
                    n = n.parentNode || n.host;
                } while (n);
            }
            return !1;
        }
        function xe(t) {
            return fe(t).getComputedStyle(t);
        }
        function ke(t) {
            return [ "table", "td", "th" ].indexOf(ue(t)) >= 0;
        }
        function Le(t) {
            return ((pe(t) ? t.ownerDocument : t.document) || window.document).documentElement;
        }
        function Se(t) {
            return "html" === ue(t) ? t : t.assignedSlot || t.parentNode || (ge(t) ? t.host : null) || Le(t);
        }
        function De(t) {
            return me(t) && "fixed" !== xe(t).position ? t.offsetParent : null;
        }
        function $e(t) {
            for (var e = fe(t), i = De(t); i && ke(i) && "static" === xe(i).position; ) i = De(i);
            return i && ("html" === ue(i) || "body" === ue(i) && "static" === xe(i).position) ? e : i || function(t) {
                var e = /firefox/i.test(Ae());
                if (/Trident/i.test(Ae()) && me(t) && "fixed" === xe(t).position) return null;
                var i = Se(t);
                for (ge(i) && (i = i.host); me(i) && [ "html", "body" ].indexOf(ue(i)) < 0; ) {
                    var n = xe(i);
                    if ("none" !== n.transform || "none" !== n.perspective || "paint" === n.contain || -1 !== [ "transform", "perspective" ].indexOf(n.willChange) || e && "filter" === n.willChange || e && n.filter && "none" !== n.filter) return i;
                    i = i.parentNode;
                }
                return null;
            }(t) || e;
        }
        function Ie(t) {
            return [ "top", "bottom" ].indexOf(t) >= 0 ? "x" : "y";
        }
        function Ne(t, e, i) {
            return ve(t, ye(e, i));
        }
        function Pe(t) {
            return Object.assign({}, {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }, t);
        }
        function je(t, e) {
            return e.reduce((function(e, i) {
                return e[i] = t, e;
            }), {});
        }
        const Me = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function(t) {
                var e, i = t.state, n = t.name, s = t.options, o = i.elements.arrow, r = i.modifiersData.popperOffsets, a = be(i.placement), l = Ie(a), c = [ Vt, qt ].indexOf(a) >= 0 ? "height" : "width";
                if (o && r) {
                    var h = function(t, e) {
                        return Pe("number" != typeof (t = "function" == typeof t ? t(Object.assign({}, e.rects, {
                            placement: e.placement
                        })) : t) ? t : je(t, Qt));
                    }(s.padding, i), d = Ce(o), u = "y" === l ? zt : Vt, f = "y" === l ? Rt : qt, p = i.rects.reference[c] + i.rects.reference[l] - r[l] - i.rects.popper[c], m = r[l] - i.rects.reference[l], g = $e(o), _ = g ? "y" === l ? g.clientHeight || 0 : g.clientWidth || 0 : 0, b = p / 2 - m / 2, v = h[u], y = _ - d[c] - h[f], w = _ / 2 - d[c] / 2 + b, A = Ne(v, w, y), E = l;
                    i.modifiersData[n] = ((e = {})[E] = A, e.centerOffset = A - w, e);
                }
            },
            effect: function(t) {
                var e = t.state, i = t.options.element, n = void 0 === i ? "[data-popper-arrow]" : i;
                null != n && ("string" != typeof n || (n = e.elements.popper.querySelector(n))) && Oe(e.elements.popper, n) && (e.elements.arrow = n);
            },
            requires: [ "popperOffsets" ],
            requiresIfExists: [ "preventOverflow" ]
        };
        function Fe(t) {
            return t.split("-")[1];
        }
        var He = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        };
        function We(t) {
            var e, i = t.popper, n = t.popperRect, s = t.placement, o = t.variation, r = t.offsets, a = t.position, l = t.gpuAcceleration, c = t.adaptive, h = t.roundOffsets, d = t.isFixed, u = r.x, f = void 0 === u ? 0 : u, p = r.y, m = void 0 === p ? 0 : p, g = "function" == typeof h ? h({
                x: f,
                y: m
            }) : {
                x: f,
                y: m
            };
            f = g.x, m = g.y;
            var _ = r.hasOwnProperty("x"), b = r.hasOwnProperty("y"), v = Vt, y = zt, w = window;
            if (c) {
                var A = $e(i), E = "clientHeight", T = "clientWidth";
                A === fe(i) && "static" !== xe(A = Le(i)).position && "absolute" === a && (E = "scrollHeight", 
                T = "scrollWidth"), (s === zt || (s === Vt || s === qt) && o === Yt) && (y = Rt, 
                m -= (d && A === w && w.visualViewport ? w.visualViewport.height : A[E]) - n.height, 
                m *= l ? 1 : -1), s !== Vt && (s !== zt && s !== Rt || o !== Yt) || (v = qt, f -= (d && A === w && w.visualViewport ? w.visualViewport.width : A[T]) - n.width, 
                f *= l ? 1 : -1);
            }
            var C, O = Object.assign({
                position: a
            }, c && He), x = !0 === h ? function(t, e) {
                var i = t.x, n = t.y, s = e.devicePixelRatio || 1;
                return {
                    x: we(i * s) / s || 0,
                    y: we(n * s) / s || 0
                };
            }({
                x: f,
                y: m
            }, fe(i)) : {
                x: f,
                y: m
            };
            return f = x.x, m = x.y, l ? Object.assign({}, O, ((C = {})[y] = b ? "0" : "", C[v] = _ ? "0" : "", 
            C.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + m + "px)" : "translate3d(" + f + "px, " + m + "px, 0)", 
            C)) : Object.assign({}, O, ((e = {})[y] = b ? m + "px" : "", e[v] = _ ? f + "px" : "", 
            e.transform = "", e));
        }
        const Be = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function(t) {
                var e = t.state, i = t.options, n = i.gpuAcceleration, s = void 0 === n || n, o = i.adaptive, r = void 0 === o || o, a = i.roundOffsets, l = void 0 === a || a, c = {
                    placement: be(e.placement),
                    variation: Fe(e.placement),
                    popper: e.elements.popper,
                    popperRect: e.rects.popper,
                    gpuAcceleration: s,
                    isFixed: "fixed" === e.options.strategy
                };
                null != e.modifiersData.popperOffsets && (e.styles.popper = Object.assign({}, e.styles.popper, We(Object.assign({}, c, {
                    offsets: e.modifiersData.popperOffsets,
                    position: e.options.strategy,
                    adaptive: r,
                    roundOffsets: l
                })))), null != e.modifiersData.arrow && (e.styles.arrow = Object.assign({}, e.styles.arrow, We(Object.assign({}, c, {
                    offsets: e.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: l
                })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
                    "data-popper-placement": e.placement
                });
            },
            data: {}
        };
        var ze = {
            passive: !0
        };
        const Re = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function() {},
            effect: function(t) {
                var e = t.state, i = t.instance, n = t.options, s = n.scroll, o = void 0 === s || s, r = n.resize, a = void 0 === r || r, l = fe(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
                return o && c.forEach((function(t) {
                    t.addEventListener("scroll", i.update, ze);
                })), a && l.addEventListener("resize", i.update, ze), function() {
                    o && c.forEach((function(t) {
                        t.removeEventListener("scroll", i.update, ze);
                    })), a && l.removeEventListener("resize", i.update, ze);
                };
            },
            data: {}
        };
        var qe = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        function Ve(t) {
            return t.replace(/left|right|bottom|top/g, (function(t) {
                return qe[t];
            }));
        }
        var Ke = {
            start: "end",
            end: "start"
        };
        function Qe(t) {
            return t.replace(/start|end/g, (function(t) {
                return Ke[t];
            }));
        }
        function Xe(t) {
            var e = fe(t);
            return {
                scrollLeft: e.pageXOffset,
                scrollTop: e.pageYOffset
            };
        }
        function Ye(t) {
            return Te(Le(t)).left + Xe(t).scrollLeft;
        }
        function Ue(t) {
            var e = xe(t), i = e.overflow, n = e.overflowX, s = e.overflowY;
            return /auto|scroll|overlay|hidden/.test(i + s + n);
        }
        function Ge(t) {
            return [ "html", "body", "#document" ].indexOf(ue(t)) >= 0 ? t.ownerDocument.body : me(t) && Ue(t) ? t : Ge(Se(t));
        }
        function Je(t, e) {
            var i;
            void 0 === e && (e = []);
            var n = Ge(t), s = n === (null == (i = t.ownerDocument) ? void 0 : i.body), o = fe(n), r = s ? [ o ].concat(o.visualViewport || [], Ue(n) ? n : []) : n, a = e.concat(r);
            return s ? a : a.concat(Je(Se(r)));
        }
        function Ze(t) {
            return Object.assign({}, t, {
                left: t.x,
                top: t.y,
                right: t.x + t.width,
                bottom: t.y + t.height
            });
        }
        function ti(t, e, i) {
            return e === Gt ? Ze(function(t, e) {
                var i = fe(t), n = Le(t), s = i.visualViewport, o = n.clientWidth, r = n.clientHeight, a = 0, l = 0;
                if (s) {
                    o = s.width, r = s.height;
                    var c = Ee();
                    (c || !c && "fixed" === e) && (a = s.offsetLeft, l = s.offsetTop);
                }
                return {
                    width: o,
                    height: r,
                    x: a + Ye(t),
                    y: l
                };
            }(t, i)) : pe(e) ? function(t, e) {
                var i = Te(t, !1, "fixed" === e);
                return i.top = i.top + t.clientTop, i.left = i.left + t.clientLeft, i.bottom = i.top + t.clientHeight, 
                i.right = i.left + t.clientWidth, i.width = t.clientWidth, i.height = t.clientHeight, 
                i.x = i.left, i.y = i.top, i;
            }(e, i) : Ze(function(t) {
                var e, i = Le(t), n = Xe(t), s = null == (e = t.ownerDocument) ? void 0 : e.body, o = ve(i.scrollWidth, i.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0), r = ve(i.scrollHeight, i.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0), a = -n.scrollLeft + Ye(t), l = -n.scrollTop;
                return "rtl" === xe(s || i).direction && (a += ve(i.clientWidth, s ? s.clientWidth : 0) - o), 
                {
                    width: o,
                    height: r,
                    x: a,
                    y: l
                };
            }(Le(t)));
        }
        function ei(t) {
            var e, i = t.reference, n = t.element, s = t.placement, o = s ? be(s) : null, r = s ? Fe(s) : null, a = i.x + i.width / 2 - n.width / 2, l = i.y + i.height / 2 - n.height / 2;
            switch (o) {
              case zt:
                e = {
                    x: a,
                    y: i.y - n.height
                };
                break;

              case Rt:
                e = {
                    x: a,
                    y: i.y + i.height
                };
                break;

              case qt:
                e = {
                    x: i.x + i.width,
                    y: l
                };
                break;

              case Vt:
                e = {
                    x: i.x - n.width,
                    y: l
                };
                break;

              default:
                e = {
                    x: i.x,
                    y: i.y
                };
            }
            var c = o ? Ie(o) : null;
            if (null != c) {
                var h = "y" === c ? "height" : "width";
                switch (r) {
                  case Xt:
                    e[c] = e[c] - (i[h] / 2 - n[h] / 2);
                    break;

                  case Yt:
                    e[c] = e[c] + (i[h] / 2 - n[h] / 2);
                }
            }
            return e;
        }
        function ii(t, e) {
            void 0 === e && (e = {});
            var i = e, n = i.placement, s = void 0 === n ? t.placement : n, o = i.strategy, r = void 0 === o ? t.strategy : o, a = i.boundary, l = void 0 === a ? Ut : a, c = i.rootBoundary, h = void 0 === c ? Gt : c, d = i.elementContext, u = void 0 === d ? Jt : d, f = i.altBoundary, p = void 0 !== f && f, m = i.padding, g = void 0 === m ? 0 : m, _ = Pe("number" != typeof g ? g : je(g, Qt)), b = u === Jt ? Zt : Jt, v = t.rects.popper, y = t.elements[p ? b : u], w = function(t, e, i, n) {
                var s = "clippingParents" === e ? function(t) {
                    var e = Je(Se(t)), i = [ "absolute", "fixed" ].indexOf(xe(t).position) >= 0 && me(t) ? $e(t) : t;
                    return pe(i) ? e.filter((function(t) {
                        return pe(t) && Oe(t, i) && "body" !== ue(t);
                    })) : [];
                }(t) : [].concat(e), o = [].concat(s, [ i ]), r = o[0], a = o.reduce((function(e, i) {
                    var s = ti(t, i, n);
                    return e.top = ve(s.top, e.top), e.right = ye(s.right, e.right), e.bottom = ye(s.bottom, e.bottom), 
                    e.left = ve(s.left, e.left), e;
                }), ti(t, r, n));
                return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, 
                a;
            }(pe(y) ? y : y.contextElement || Le(t.elements.popper), l, h, r), A = Te(t.elements.reference), E = ei({
                reference: A,
                element: v,
                strategy: "absolute",
                placement: s
            }), T = Ze(Object.assign({}, v, E)), C = u === Jt ? T : A, O = {
                top: w.top - C.top + _.top,
                bottom: C.bottom - w.bottom + _.bottom,
                left: w.left - C.left + _.left,
                right: C.right - w.right + _.right
            }, x = t.modifiersData.offset;
            if (u === Jt && x) {
                var k = x[s];
                Object.keys(O).forEach((function(t) {
                    var e = [ qt, Rt ].indexOf(t) >= 0 ? 1 : -1, i = [ zt, Rt ].indexOf(t) >= 0 ? "y" : "x";
                    O[t] += k[i] * e;
                }));
            }
            return O;
        }
        function ni(t, e) {
            void 0 === e && (e = {});
            var i = e, n = i.placement, s = i.boundary, o = i.rootBoundary, r = i.padding, a = i.flipVariations, l = i.allowedAutoPlacements, c = void 0 === l ? ee : l, h = Fe(n), d = h ? a ? te : te.filter((function(t) {
                return Fe(t) === h;
            })) : Qt, u = d.filter((function(t) {
                return c.indexOf(t) >= 0;
            }));
            0 === u.length && (u = d);
            var f = u.reduce((function(e, i) {
                return e[i] = ii(t, {
                    placement: i,
                    boundary: s,
                    rootBoundary: o,
                    padding: r
                })[be(i)], e;
            }), {});
            return Object.keys(f).sort((function(t, e) {
                return f[t] - f[e];
            }));
        }
        const si = {
            name: "flip",
            enabled: !0,
            phase: "main",
            fn: function(t) {
                var e = t.state, i = t.options, n = t.name;
                if (!e.modifiersData[n]._skip) {
                    for (var s = i.mainAxis, o = void 0 === s || s, r = i.altAxis, a = void 0 === r || r, l = i.fallbackPlacements, c = i.padding, h = i.boundary, d = i.rootBoundary, u = i.altBoundary, f = i.flipVariations, p = void 0 === f || f, m = i.allowedAutoPlacements, g = e.options.placement, _ = be(g), b = l || (_ !== g && p ? function(t) {
                        if (be(t) === Kt) return [];
                        var e = Ve(t);
                        return [ Qe(t), e, Qe(e) ];
                    }(g) : [ Ve(g) ]), v = [ g ].concat(b).reduce((function(t, i) {
                        return t.concat(be(i) === Kt ? ni(e, {
                            placement: i,
                            boundary: h,
                            rootBoundary: d,
                            padding: c,
                            flipVariations: p,
                            allowedAutoPlacements: m
                        }) : i);
                    }), []), y = e.rects.reference, w = e.rects.popper, A = new Map, E = !0, T = v[0], C = 0; C < v.length; C++) {
                        var O = v[C], x = be(O), k = Fe(O) === Xt, L = [ zt, Rt ].indexOf(x) >= 0, S = L ? "width" : "height", D = ii(e, {
                            placement: O,
                            boundary: h,
                            rootBoundary: d,
                            altBoundary: u,
                            padding: c
                        }), $ = L ? k ? qt : Vt : k ? Rt : zt;
                        y[S] > w[S] && ($ = Ve($));
                        var I = Ve($), N = [];
                        if (o && N.push(D[x] <= 0), a && N.push(D[$] <= 0, D[I] <= 0), N.every((function(t) {
                            return t;
                        }))) {
                            T = O, E = !1;
                            break;
                        }
                        A.set(O, N);
                    }
                    if (E) for (var P = function(t) {
                        var e = v.find((function(e) {
                            var i = A.get(e);
                            if (i) return i.slice(0, t).every((function(t) {
                                return t;
                            }));
                        }));
                        if (e) return T = e, "break";
                    }, j = p ? 3 : 1; j > 0 && "break" !== P(j); j--) ;
                    e.placement !== T && (e.modifiersData[n]._skip = !0, e.placement = T, e.reset = !0);
                }
            },
            requiresIfExists: [ "offset" ],
            data: {
                _skip: !1
            }
        };
        function oi(t, e, i) {
            return void 0 === i && (i = {
                x: 0,
                y: 0
            }), {
                top: t.top - e.height - i.y,
                right: t.right - e.width + i.x,
                bottom: t.bottom - e.height + i.y,
                left: t.left - e.width - i.x
            };
        }
        function ri(t) {
            return [ zt, qt, Rt, Vt ].some((function(e) {
                return t[e] >= 0;
            }));
        }
        const ai = {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: [ "preventOverflow" ],
            fn: function(t) {
                var e = t.state, i = t.name, n = e.rects.reference, s = e.rects.popper, o = e.modifiersData.preventOverflow, r = ii(e, {
                    elementContext: "reference"
                }), a = ii(e, {
                    altBoundary: !0
                }), l = oi(r, n), c = oi(a, s, o), h = ri(l), d = ri(c);
                e.modifiersData[i] = {
                    referenceClippingOffsets: l,
                    popperEscapeOffsets: c,
                    isReferenceHidden: h,
                    hasPopperEscaped: d
                }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
                    "data-popper-reference-hidden": h,
                    "data-popper-escaped": d
                });
            }
        }, li = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: [ "popperOffsets" ],
            fn: function(t) {
                var e = t.state, i = t.options, n = t.name, s = i.offset, o = void 0 === s ? [ 0, 0 ] : s, r = ee.reduce((function(t, i) {
                    return t[i] = function(t, e, i) {
                        var n = be(t), s = [ Vt, zt ].indexOf(n) >= 0 ? -1 : 1, o = "function" == typeof i ? i(Object.assign({}, e, {
                            placement: t
                        })) : i, r = o[0], a = o[1];
                        return r = r || 0, a = (a || 0) * s, [ Vt, qt ].indexOf(n) >= 0 ? {
                            x: a,
                            y: r
                        } : {
                            x: r,
                            y: a
                        };
                    }(i, e.rects, o), t;
                }), {}), a = r[e.placement], l = a.x, c = a.y;
                null != e.modifiersData.popperOffsets && (e.modifiersData.popperOffsets.x += l, 
                e.modifiersData.popperOffsets.y += c), e.modifiersData[n] = r;
            }
        }, ci = {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function(t) {
                var e = t.state, i = t.name;
                e.modifiersData[i] = ei({
                    reference: e.rects.reference,
                    element: e.rects.popper,
                    strategy: "absolute",
                    placement: e.placement
                });
            },
            data: {}
        }, hi = {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function(t) {
                var e = t.state, i = t.options, n = t.name, s = i.mainAxis, o = void 0 === s || s, r = i.altAxis, a = void 0 !== r && r, l = i.boundary, c = i.rootBoundary, h = i.altBoundary, d = i.padding, u = i.tether, f = void 0 === u || u, p = i.tetherOffset, m = void 0 === p ? 0 : p, g = ii(e, {
                    boundary: l,
                    rootBoundary: c,
                    padding: d,
                    altBoundary: h
                }), _ = be(e.placement), b = Fe(e.placement), v = !b, y = Ie(_), w = "x" === y ? "y" : "x", A = e.modifiersData.popperOffsets, E = e.rects.reference, T = e.rects.popper, C = "function" == typeof m ? m(Object.assign({}, e.rects, {
                    placement: e.placement
                })) : m, O = "number" == typeof C ? {
                    mainAxis: C,
                    altAxis: C
                } : Object.assign({
                    mainAxis: 0,
                    altAxis: 0
                }, C), x = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, k = {
                    x: 0,
                    y: 0
                };
                if (A) {
                    if (o) {
                        var L, S = "y" === y ? zt : Vt, D = "y" === y ? Rt : qt, $ = "y" === y ? "height" : "width", I = A[y], N = I + g[S], P = I - g[D], j = f ? -T[$] / 2 : 0, M = b === Xt ? E[$] : T[$], F = b === Xt ? -T[$] : -E[$], H = e.elements.arrow, W = f && H ? Ce(H) : {
                            width: 0,
                            height: 0
                        }, B = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }, z = B[S], R = B[D], q = Ne(0, E[$], W[$]), V = v ? E[$] / 2 - j - q - z - O.mainAxis : M - q - z - O.mainAxis, K = v ? -E[$] / 2 + j + q + R + O.mainAxis : F + q + R + O.mainAxis, Q = e.elements.arrow && $e(e.elements.arrow), X = Q ? "y" === y ? Q.clientTop || 0 : Q.clientLeft || 0 : 0, Y = null != (L = null == x ? void 0 : x[y]) ? L : 0, U = I + K - Y, G = Ne(f ? ye(N, I + V - Y - X) : N, I, f ? ve(P, U) : P);
                        A[y] = G, k[y] = G - I;
                    }
                    if (a) {
                        var J, Z = "x" === y ? zt : Vt, tt = "x" === y ? Rt : qt, et = A[w], it = "y" === w ? "height" : "width", nt = et + g[Z], st = et - g[tt], ot = -1 !== [ zt, Vt ].indexOf(_), rt = null != (J = null == x ? void 0 : x[w]) ? J : 0, at = ot ? nt : et - E[it] - T[it] - rt + O.altAxis, lt = ot ? et + E[it] + T[it] - rt - O.altAxis : st, ct = f && ot ? function(t, e, i) {
                            var n = Ne(t, e, i);
                            return n > i ? i : n;
                        }(at, et, lt) : Ne(f ? at : nt, et, f ? lt : st);
                        A[w] = ct, k[w] = ct - et;
                    }
                    e.modifiersData[n] = k;
                }
            },
            requiresIfExists: [ "offset" ]
        };
        function di(t, e, i) {
            void 0 === i && (i = !1);
            var n, s, o = me(e), r = me(e) && function(t) {
                var e = t.getBoundingClientRect(), i = we(e.width) / t.offsetWidth || 1, n = we(e.height) / t.offsetHeight || 1;
                return 1 !== i || 1 !== n;
            }(e), a = Le(e), l = Te(t, r, i), c = {
                scrollLeft: 0,
                scrollTop: 0
            }, h = {
                x: 0,
                y: 0
            };
            return (o || !o && !i) && (("body" !== ue(e) || Ue(a)) && (c = (n = e) !== fe(n) && me(n) ? {
                scrollLeft: (s = n).scrollLeft,
                scrollTop: s.scrollTop
            } : Xe(n)), me(e) ? ((h = Te(e, !0)).x += e.clientLeft, h.y += e.clientTop) : a && (h.x = Ye(a))), 
            {
                x: l.left + c.scrollLeft - h.x,
                y: l.top + c.scrollTop - h.y,
                width: l.width,
                height: l.height
            };
        }
        function ui(t) {
            var e = new Map, i = new Set, n = [];
            function s(t) {
                i.add(t.name), [].concat(t.requires || [], t.requiresIfExists || []).forEach((function(t) {
                    if (!i.has(t)) {
                        var n = e.get(t);
                        n && s(n);
                    }
                })), n.push(t);
            }
            return t.forEach((function(t) {
                e.set(t.name, t);
            })), t.forEach((function(t) {
                i.has(t.name) || s(t);
            })), n;
        }
        var fi = {
            placement: "bottom",
            modifiers: [],
            strategy: "absolute"
        };
        function pi() {
            for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++) e[i] = arguments[i];
            return !e.some((function(t) {
                return !(t && "function" == typeof t.getBoundingClientRect);
            }));
        }
        function mi(t) {
            void 0 === t && (t = {});
            var e = t, i = e.defaultModifiers, n = void 0 === i ? [] : i, s = e.defaultOptions, o = void 0 === s ? fi : s;
            return function(t, e, i) {
                void 0 === i && (i = o);
                var s, r, a = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, fi, o),
                    modifiersData: {},
                    elements: {
                        reference: t,
                        popper: e
                    },
                    attributes: {},
                    styles: {}
                }, l = [], c = !1, h = {
                    state: a,
                    setOptions: function(i) {
                        var s = "function" == typeof i ? i(a.options) : i;
                        d(), a.options = Object.assign({}, o, a.options, s), a.scrollParents = {
                            reference: pe(t) ? Je(t) : t.contextElement ? Je(t.contextElement) : [],
                            popper: Je(e)
                        };
                        var r, c, u = function(t) {
                            var e = ui(t);
                            return de.reduce((function(t, i) {
                                return t.concat(e.filter((function(t) {
                                    return t.phase === i;
                                })));
                            }), []);
                        }((r = [].concat(n, a.options.modifiers), c = r.reduce((function(t, e) {
                            var i = t[e.name];
                            return t[e.name] = i ? Object.assign({}, i, e, {
                                options: Object.assign({}, i.options, e.options),
                                data: Object.assign({}, i.data, e.data)
                            }) : e, t;
                        }), {}), Object.keys(c).map((function(t) {
                            return c[t];
                        }))));
                        return a.orderedModifiers = u.filter((function(t) {
                            return t.enabled;
                        })), a.orderedModifiers.forEach((function(t) {
                            var e = t.name, i = t.options, n = void 0 === i ? {} : i, s = t.effect;
                            if ("function" == typeof s) {
                                var o = s({
                                    state: a,
                                    name: e,
                                    instance: h,
                                    options: n
                                });
                                l.push(o || function() {});
                            }
                        })), h.update();
                    },
                    forceUpdate: function() {
                        if (!c) {
                            var t = a.elements, e = t.reference, i = t.popper;
                            if (pi(e, i)) {
                                a.rects = {
                                    reference: di(e, $e(i), "fixed" === a.options.strategy),
                                    popper: Ce(i)
                                }, a.reset = !1, a.placement = a.options.placement, a.orderedModifiers.forEach((function(t) {
                                    return a.modifiersData[t.name] = Object.assign({}, t.data);
                                }));
                                for (var n = 0; n < a.orderedModifiers.length; n++) if (!0 !== a.reset) {
                                    var s = a.orderedModifiers[n], o = s.fn, r = s.options, l = void 0 === r ? {} : r, d = s.name;
                                    "function" == typeof o && (a = o({
                                        state: a,
                                        options: l,
                                        name: d,
                                        instance: h
                                    }) || a);
                                } else a.reset = !1, n = -1;
                            }
                        }
                    },
                    update: (s = function() {
                        return new Promise((function(t) {
                            h.forceUpdate(), t(a);
                        }));
                    }, function() {
                        return r || (r = new Promise((function(t) {
                            Promise.resolve().then((function() {
                                r = void 0, t(s());
                            }));
                        }))), r;
                    }),
                    destroy: function() {
                        d(), c = !0;
                    }
                };
                if (!pi(t, e)) return h;
                function d() {
                    l.forEach((function(t) {
                        return t();
                    })), l = [];
                }
                return h.setOptions(i).then((function(t) {
                    !c && i.onFirstUpdate && i.onFirstUpdate(t);
                })), h;
            };
        }
        var gi = mi(), _i = mi({
            defaultModifiers: [ Re, ci, Be, _e ]
        }), bi = mi({
            defaultModifiers: [ Re, ci, Be, _e, li, si, hi, Me, ai ]
        });
        const vi = Object.freeze(Object.defineProperty({
            __proto__: null,
            afterMain: ae,
            afterRead: se,
            afterWrite: he,
            applyStyles: _e,
            arrow: Me,
            auto: Kt,
            basePlacements: Qt,
            beforeMain: oe,
            beforeRead: ie,
            beforeWrite: le,
            bottom: Rt,
            clippingParents: Ut,
            computeStyles: Be,
            createPopper: bi,
            createPopperBase: gi,
            createPopperLite: _i,
            detectOverflow: ii,
            end: Yt,
            eventListeners: Re,
            flip: si,
            hide: ai,
            left: Vt,
            main: re,
            modifierPhases: de,
            offset: li,
            placements: ee,
            popper: Jt,
            popperGenerator: mi,
            popperOffsets: ci,
            preventOverflow: hi,
            read: ne,
            reference: Zt,
            right: qt,
            start: Xt,
            top: zt,
            variationPlacements: te,
            viewport: Gt,
            write: ce
        }, Symbol.toStringTag, {
            value: "Module"
        })), yi = "dropdown", wi = ".bs.dropdown", Ai = ".data-api", Ei = "ArrowUp", Ti = "ArrowDown", Ci = `hide${wi}`, Oi = `hidden${wi}`, xi = `show${wi}`, ki = `shown${wi}`, Li = `click${wi}${Ai}`, Si = `keydown${wi}${Ai}`, Di = `keyup${wi}${Ai}`, $i = "show", Ii = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', Ni = `${Ii}.${$i}`, Pi = ".dropdown-menu", ji = p() ? "top-end" : "top-start", Mi = p() ? "top-start" : "top-end", Fi = p() ? "bottom-end" : "bottom-start", Hi = p() ? "bottom-start" : "bottom-end", Wi = p() ? "left-start" : "right-start", Bi = p() ? "right-start" : "left-start", zi = {
            autoClose: !0,
            boundary: "clippingParents",
            display: "dynamic",
            offset: [ 0, 2 ],
            popperConfig: null,
            reference: "toggle"
        }, Ri = {
            autoClose: "(boolean|string)",
            boundary: "(string|element)",
            display: "string",
            offset: "(array|string|function)",
            popperConfig: "(null|object|function)",
            reference: "(string|element|object)"
        };
        class qi extends W {
            constructor(t, e) {
                super(t, e), this._popper = null, this._parent = this._element.parentNode, this._menu = z.next(this._element, Pi)[0] || z.prev(this._element, Pi)[0] || z.findOne(Pi, this._parent), 
                this._inNavbar = this._detectNavbar();
            }
            static get Default() {
                return zi;
            }
            static get DefaultType() {
                return Ri;
            }
            static get NAME() {
                return yi;
            }
            toggle() {
                return this._isShown() ? this.hide() : this.show();
            }
            show() {
                if (l(this._element) || this._isShown()) return;
                const t = {
                    relatedTarget: this._element
                };
                if (!N.trigger(this._element, xi, t).defaultPrevented) {
                    if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav")) for (const t of [].concat(...document.body.children)) N.on(t, "mouseover", h);
                    this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add($i), 
                    this._element.classList.add($i), N.trigger(this._element, ki, t);
                }
            }
            hide() {
                if (l(this._element) || !this._isShown()) return;
                const t = {
                    relatedTarget: this._element
                };
                this._completeHide(t);
            }
            dispose() {
                this._popper && this._popper.destroy(), super.dispose();
            }
            update() {
                this._inNavbar = this._detectNavbar(), this._popper && this._popper.update();
            }
            _completeHide(t) {
                if (!N.trigger(this._element, Ci, t).defaultPrevented) {
                    if ("ontouchstart" in document.documentElement) for (const t of [].concat(...document.body.children)) N.off(t, "mouseover", h);
                    this._popper && this._popper.destroy(), this._menu.classList.remove($i), this._element.classList.remove($i), 
                    this._element.setAttribute("aria-expanded", "false"), F.removeDataAttribute(this._menu, "popper"), 
                    N.trigger(this._element, Oi, t);
                }
            }
            _getConfig(t) {
                if ("object" == typeof (t = super._getConfig(t)).reference && !o(t.reference) && "function" != typeof t.reference.getBoundingClientRect) throw new TypeError(`${yi.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
                return t;
            }
            _createPopper() {
                if (void 0 === vi) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
                let t = this._element;
                "parent" === this._config.reference ? t = this._parent : o(this._config.reference) ? t = r(this._config.reference) : "object" == typeof this._config.reference && (t = this._config.reference);
                const e = this._getPopperConfig();
                this._popper = bi(t, this._menu, e);
            }
            _isShown() {
                return this._menu.classList.contains($i);
            }
            _getPlacement() {
                const t = this._parent;
                if (t.classList.contains("dropend")) return Wi;
                if (t.classList.contains("dropstart")) return Bi;
                if (t.classList.contains("dropup-center")) return "top";
                if (t.classList.contains("dropdown-center")) return "bottom";
                const e = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
                return t.classList.contains("dropup") ? e ? Mi : ji : e ? Hi : Fi;
            }
            _detectNavbar() {
                return null !== this._element.closest(".navbar");
            }
            _getOffset() {
                const {offset: t} = this._config;
                return "string" == typeof t ? t.split(",").map((t => Number.parseInt(t, 10))) : "function" == typeof t ? e => t(e, this._element) : t;
            }
            _getPopperConfig() {
                const t = {
                    placement: this._getPlacement(),
                    modifiers: [ {
                        name: "preventOverflow",
                        options: {
                            boundary: this._config.boundary
                        }
                    }, {
                        name: "offset",
                        options: {
                            offset: this._getOffset()
                        }
                    } ]
                };
                return (this._inNavbar || "static" === this._config.display) && (F.setDataAttribute(this._menu, "popper", "static"), 
                t.modifiers = [ {
                    name: "applyStyles",
                    enabled: !1
                } ]), {
                    ...t,
                    ...g(this._config.popperConfig, [ t ])
                };
            }
            _selectMenuItem({key: t, target: e}) {
                const i = z.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter((t => a(t)));
                i.length && b(i, e, t === Ti, !i.includes(e)).focus();
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = qi.getOrCreateInstance(this, t);
                    if ("string" == typeof t) {
                        if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                        e[t]();
                    }
                }));
            }
            static clearMenus(t) {
                if (2 === t.button || "keyup" === t.type && "Tab" !== t.key) return;
                const e = z.find(Ni);
                for (const i of e) {
                    const e = qi.getInstance(i);
                    if (!e || !1 === e._config.autoClose) continue;
                    const n = t.composedPath(), s = n.includes(e._menu);
                    if (n.includes(e._element) || "inside" === e._config.autoClose && !s || "outside" === e._config.autoClose && s) continue;
                    if (e._menu.contains(t.target) && ("keyup" === t.type && "Tab" === t.key || /input|select|option|textarea|form/i.test(t.target.tagName))) continue;
                    const o = {
                        relatedTarget: e._element
                    };
                    "click" === t.type && (o.clickEvent = t), e._completeHide(o);
                }
            }
            static dataApiKeydownHandler(t) {
                const e = /input|textarea/i.test(t.target.tagName), i = "Escape" === t.key, n = [ Ei, Ti ].includes(t.key);
                if (!n && !i) return;
                if (e && !i) return;
                t.preventDefault();
                const s = this.matches(Ii) ? this : z.prev(this, Ii)[0] || z.next(this, Ii)[0] || z.findOne(Ii, t.delegateTarget.parentNode), o = qi.getOrCreateInstance(s);
                if (n) return t.stopPropagation(), o.show(), void o._selectMenuItem(t);
                o._isShown() && (t.stopPropagation(), o.hide(), s.focus());
            }
        }
        N.on(document, Si, Ii, qi.dataApiKeydownHandler), N.on(document, Si, Pi, qi.dataApiKeydownHandler), 
        N.on(document, Li, qi.clearMenus), N.on(document, Di, qi.clearMenus), N.on(document, Li, Ii, (function(t) {
            t.preventDefault(), qi.getOrCreateInstance(this).toggle();
        })), m(qi);
        const Vi = "backdrop", Ki = "show", Qi = `mousedown.bs.${Vi}`, Xi = {
            className: "modal-backdrop",
            clickCallback: null,
            isAnimated: !1,
            isVisible: !0,
            rootElement: "body"
        }, Yi = {
            className: "string",
            clickCallback: "(function|null)",
            isAnimated: "boolean",
            isVisible: "boolean",
            rootElement: "(element|string)"
        };
        class Ui extends H {
            constructor(t) {
                super(), this._config = this._getConfig(t), this._isAppended = !1, this._element = null;
            }
            static get Default() {
                return Xi;
            }
            static get DefaultType() {
                return Yi;
            }
            static get NAME() {
                return Vi;
            }
            show(t) {
                if (!this._config.isVisible) return void g(t);
                this._append();
                const e = this._getElement();
                this._config.isAnimated && d(e), e.classList.add(Ki), this._emulateAnimation((() => {
                    g(t);
                }));
            }
            hide(t) {
                this._config.isVisible ? (this._getElement().classList.remove(Ki), this._emulateAnimation((() => {
                    this.dispose(), g(t);
                }))) : g(t);
            }
            dispose() {
                this._isAppended && (N.off(this._element, Qi), this._element.remove(), this._isAppended = !1);
            }
            _getElement() {
                if (!this._element) {
                    const t = document.createElement("div");
                    t.className = this._config.className, this._config.isAnimated && t.classList.add("fade"), 
                    this._element = t;
                }
                return this._element;
            }
            _configAfterMerge(t) {
                return t.rootElement = r(t.rootElement), t;
            }
            _append() {
                if (this._isAppended) return;
                const t = this._getElement();
                this._config.rootElement.append(t), N.on(t, Qi, (() => {
                    g(this._config.clickCallback);
                })), this._isAppended = !0;
            }
            _emulateAnimation(t) {
                _(t, this._getElement(), this._config.isAnimated);
            }
        }
        const Gi = ".bs.focustrap", Ji = `focusin${Gi}`, Zi = `keydown.tab${Gi}`, tn = "backward", en = {
            autofocus: !0,
            trapElement: null
        }, nn = {
            autofocus: "boolean",
            trapElement: "element"
        };
        class sn extends H {
            constructor(t) {
                super(), this._config = this._getConfig(t), this._isActive = !1, this._lastTabNavDirection = null;
            }
            static get Default() {
                return en;
            }
            static get DefaultType() {
                return nn;
            }
            static get NAME() {
                return "focustrap";
            }
            activate() {
                this._isActive || (this._config.autofocus && this._config.trapElement.focus(), N.off(document, Gi), 
                N.on(document, Ji, (t => this._handleFocusin(t))), N.on(document, Zi, (t => this._handleKeydown(t))), 
                this._isActive = !0);
            }
            deactivate() {
                this._isActive && (this._isActive = !1, N.off(document, Gi));
            }
            _handleFocusin(t) {
                const {trapElement: e} = this._config;
                if (t.target === document || t.target === e || e.contains(t.target)) return;
                const i = z.focusableChildren(e);
                0 === i.length ? e.focus() : this._lastTabNavDirection === tn ? i[i.length - 1].focus() : i[0].focus();
            }
            _handleKeydown(t) {
                "Tab" === t.key && (this._lastTabNavDirection = t.shiftKey ? tn : "forward");
            }
        }
        const on = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", rn = ".sticky-top", an = "padding-right", ln = "margin-right";
        class cn {
            constructor() {
                this._element = document.body;
            }
            getWidth() {
                const t = document.documentElement.clientWidth;
                return Math.abs(window.innerWidth - t);
            }
            hide() {
                const t = this.getWidth();
                this._disableOverFlow(), this._setElementAttributes(this._element, an, (e => e + t)), 
                this._setElementAttributes(on, an, (e => e + t)), this._setElementAttributes(rn, ln, (e => e - t));
            }
            reset() {
                this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, an), 
                this._resetElementAttributes(on, an), this._resetElementAttributes(rn, ln);
            }
            isOverflowing() {
                return this.getWidth() > 0;
            }
            _disableOverFlow() {
                this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden";
            }
            _setElementAttributes(t, e, i) {
                const n = this.getWidth();
                this._applyManipulationCallback(t, (t => {
                    if (t !== this._element && window.innerWidth > t.clientWidth + n) return;
                    this._saveInitialAttribute(t, e);
                    const s = window.getComputedStyle(t).getPropertyValue(e);
                    t.style.setProperty(e, `${i(Number.parseFloat(s))}px`);
                }));
            }
            _saveInitialAttribute(t, e) {
                const i = t.style.getPropertyValue(e);
                i && F.setDataAttribute(t, e, i);
            }
            _resetElementAttributes(t, e) {
                this._applyManipulationCallback(t, (t => {
                    const i = F.getDataAttribute(t, e);
                    null !== i ? (F.removeDataAttribute(t, e), t.style.setProperty(e, i)) : t.style.removeProperty(e);
                }));
            }
            _applyManipulationCallback(t, e) {
                if (o(t)) e(t); else for (const i of z.find(t, this._element)) e(i);
            }
        }
        const hn = ".bs.modal", dn = `hide${hn}`, un = `hidePrevented${hn}`, fn = `hidden${hn}`, pn = `show${hn}`, mn = `shown${hn}`, gn = `resize${hn}`, _n = `click.dismiss${hn}`, bn = `mousedown.dismiss${hn}`, vn = `keydown.dismiss${hn}`, yn = `click${hn}.data-api`, wn = "modal-open", An = "show", En = "modal-static", Tn = {
            backdrop: !0,
            focus: !0,
            keyboard: !0
        }, Cn = {
            backdrop: "(boolean|string)",
            focus: "boolean",
            keyboard: "boolean"
        };
        class On extends W {
            constructor(t, e) {
                super(t, e), this._dialog = z.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), 
                this._focustrap = this._initializeFocusTrap(), this._isShown = !1, this._isTransitioning = !1, 
                this._scrollBar = new cn, this._addEventListeners();
            }
            static get Default() {
                return Tn;
            }
            static get DefaultType() {
                return Cn;
            }
            static get NAME() {
                return "modal";
            }
            toggle(t) {
                return this._isShown ? this.hide() : this.show(t);
            }
            show(t) {
                this._isShown || this._isTransitioning || N.trigger(this._element, pn, {
                    relatedTarget: t
                }).defaultPrevented || (this._isShown = !0, this._isTransitioning = !0, this._scrollBar.hide(), 
                document.body.classList.add(wn), this._adjustDialog(), this._backdrop.show((() => this._showElement(t))));
            }
            hide() {
                this._isShown && !this._isTransitioning && (N.trigger(this._element, dn).defaultPrevented || (this._isShown = !1, 
                this._isTransitioning = !0, this._focustrap.deactivate(), this._element.classList.remove(An), 
                this._queueCallback((() => this._hideModal()), this._element, this._isAnimated())));
            }
            dispose() {
                N.off(window, hn), N.off(this._dialog, hn), this._backdrop.dispose(), this._focustrap.deactivate(), 
                super.dispose();
            }
            handleUpdate() {
                this._adjustDialog();
            }
            _initializeBackDrop() {
                return new Ui({
                    isVisible: Boolean(this._config.backdrop),
                    isAnimated: this._isAnimated()
                });
            }
            _initializeFocusTrap() {
                return new sn({
                    trapElement: this._element
                });
            }
            _showElement(t) {
                document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", 
                this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), 
                this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
                const e = z.findOne(".modal-body", this._dialog);
                e && (e.scrollTop = 0), d(this._element), this._element.classList.add(An), this._queueCallback((() => {
                    this._config.focus && this._focustrap.activate(), this._isTransitioning = !1, N.trigger(this._element, mn, {
                        relatedTarget: t
                    });
                }), this._dialog, this._isAnimated());
            }
            _addEventListeners() {
                N.on(this._element, vn, (t => {
                    "Escape" === t.key && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition());
                })), N.on(window, gn, (() => {
                    this._isShown && !this._isTransitioning && this._adjustDialog();
                })), N.on(this._element, bn, (t => {
                    N.one(this._element, _n, (e => {
                        this._element === t.target && this._element === e.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition());
                    }));
                }));
            }
            _hideModal() {
                this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), 
                this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), 
                this._isTransitioning = !1, this._backdrop.hide((() => {
                    document.body.classList.remove(wn), this._resetAdjustments(), this._scrollBar.reset(), 
                    N.trigger(this._element, fn);
                }));
            }
            _isAnimated() {
                return this._element.classList.contains("fade");
            }
            _triggerBackdropTransition() {
                if (N.trigger(this._element, un).defaultPrevented) return;
                const t = this._element.scrollHeight > document.documentElement.clientHeight, e = this._element.style.overflowY;
                "hidden" === e || this._element.classList.contains(En) || (t || (this._element.style.overflowY = "hidden"), 
                this._element.classList.add(En), this._queueCallback((() => {
                    this._element.classList.remove(En), this._queueCallback((() => {
                        this._element.style.overflowY = e;
                    }), this._dialog);
                }), this._dialog), this._element.focus());
            }
            _adjustDialog() {
                const t = this._element.scrollHeight > document.documentElement.clientHeight, e = this._scrollBar.getWidth(), i = e > 0;
                if (i && !t) {
                    const t = p() ? "paddingLeft" : "paddingRight";
                    this._element.style[t] = `${e}px`;
                }
                if (!i && t) {
                    const t = p() ? "paddingRight" : "paddingLeft";
                    this._element.style[t] = `${e}px`;
                }
            }
            _resetAdjustments() {
                this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
            }
            static jQueryInterface(t, e) {
                return this.each((function() {
                    const i = On.getOrCreateInstance(this, t);
                    if ("string" == typeof t) {
                        if (void 0 === i[t]) throw new TypeError(`No method named "${t}"`);
                        i[t](e);
                    }
                }));
            }
        }
        N.on(document, yn, '[data-bs-toggle="modal"]', (function(t) {
            const e = z.getElementFromSelector(this);
            [ "A", "AREA" ].includes(this.tagName) && t.preventDefault(), N.one(e, pn, (t => {
                t.defaultPrevented || N.one(e, fn, (() => {
                    a(this) && this.focus();
                }));
            }));
            const i = z.findOne(".modal.show");
            i && On.getInstance(i).hide(), On.getOrCreateInstance(e).toggle(this);
        })), R(On), m(On);
        const xn = ".bs.offcanvas", kn = ".data-api", Ln = `load${xn}${kn}`, Sn = "show", Dn = "showing", $n = "hiding", In = ".offcanvas.show", Nn = `show${xn}`, Pn = `shown${xn}`, jn = `hide${xn}`, Mn = `hidePrevented${xn}`, Fn = `hidden${xn}`, Hn = `resize${xn}`, Wn = `click${xn}${kn}`, Bn = `keydown.dismiss${xn}`, zn = {
            backdrop: !0,
            keyboard: !0,
            scroll: !1
        }, Rn = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            scroll: "boolean"
        };
        class qn extends W {
            constructor(t, e) {
                super(t, e), this._isShown = !1, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), 
                this._addEventListeners();
            }
            static get Default() {
                return zn;
            }
            static get DefaultType() {
                return Rn;
            }
            static get NAME() {
                return "offcanvas";
            }
            toggle(t) {
                return this._isShown ? this.hide() : this.show(t);
            }
            show(t) {
                this._isShown || N.trigger(this._element, Nn, {
                    relatedTarget: t
                }).defaultPrevented || (this._isShown = !0, this._backdrop.show(), this._config.scroll || (new cn).hide(), 
                this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), 
                this._element.classList.add(Dn), this._queueCallback((() => {
                    this._config.scroll && !this._config.backdrop || this._focustrap.activate(), this._element.classList.add(Sn), 
                    this._element.classList.remove(Dn), N.trigger(this._element, Pn, {
                        relatedTarget: t
                    });
                }), this._element, !0));
            }
            hide() {
                this._isShown && (N.trigger(this._element, jn).defaultPrevented || (this._focustrap.deactivate(), 
                this._element.blur(), this._isShown = !1, this._element.classList.add($n), this._backdrop.hide(), 
                this._queueCallback((() => {
                    this._element.classList.remove(Sn, $n), this._element.removeAttribute("aria-modal"), 
                    this._element.removeAttribute("role"), this._config.scroll || (new cn).reset(), 
                    N.trigger(this._element, Fn);
                }), this._element, !0)));
            }
            dispose() {
                this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
            }
            _initializeBackDrop() {
                const t = Boolean(this._config.backdrop);
                return new Ui({
                    className: "offcanvas-backdrop",
                    isVisible: t,
                    isAnimated: !0,
                    rootElement: this._element.parentNode,
                    clickCallback: t ? () => {
                        "static" !== this._config.backdrop ? this.hide() : N.trigger(this._element, Mn);
                    } : null
                });
            }
            _initializeFocusTrap() {
                return new sn({
                    trapElement: this._element
                });
            }
            _addEventListeners() {
                N.on(this._element, Bn, (t => {
                    "Escape" === t.key && (this._config.keyboard ? this.hide() : N.trigger(this._element, Mn));
                }));
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = qn.getOrCreateInstance(this, t);
                    if ("string" == typeof t) {
                        if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                        e[t](this);
                    }
                }));
            }
        }
        N.on(document, Wn, '[data-bs-toggle="offcanvas"]', (function(t) {
            const e = z.getElementFromSelector(this);
            if ([ "A", "AREA" ].includes(this.tagName) && t.preventDefault(), l(this)) return;
            N.one(e, Fn, (() => {
                a(this) && this.focus();
            }));
            const i = z.findOne(In);
            i && i !== e && qn.getInstance(i).hide(), qn.getOrCreateInstance(e).toggle(this);
        })), N.on(window, Ln, (() => {
            for (const t of z.find(In)) qn.getOrCreateInstance(t).show();
        })), N.on(window, Hn, (() => {
            for (const t of z.find("[aria-modal][class*=show][class*=offcanvas-]")) "fixed" !== getComputedStyle(t).position && qn.getOrCreateInstance(t).hide();
        })), R(qn), m(qn);
        const Vn = {
            "*": [ "class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i ],
            a: [ "target", "href", "title", "rel" ],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            dd: [],
            div: [],
            dl: [],
            dt: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: [ "src", "srcset", "alt", "title", "width", "height" ],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        }, Kn = new Set([ "background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href" ]), Qn = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, Xn = (t, e) => {
            const i = t.nodeName.toLowerCase();
            return e.includes(i) ? !Kn.has(i) || Boolean(Qn.test(t.nodeValue)) : e.filter((t => t instanceof RegExp)).some((t => t.test(i)));
        }, Yn = {
            allowList: Vn,
            content: {},
            extraClass: "",
            html: !1,
            sanitize: !0,
            sanitizeFn: null,
            template: "<div></div>"
        }, Un = {
            allowList: "object",
            content: "object",
            extraClass: "(string|function)",
            html: "boolean",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            template: "string"
        }, Gn = {
            entry: "(string|element|function|null)",
            selector: "(string|element)"
        };
        class Jn extends H {
            constructor(t) {
                super(), this._config = this._getConfig(t);
            }
            static get Default() {
                return Yn;
            }
            static get DefaultType() {
                return Un;
            }
            static get NAME() {
                return "TemplateFactory";
            }
            getContent() {
                return Object.values(this._config.content).map((t => this._resolvePossibleFunction(t))).filter(Boolean);
            }
            hasContent() {
                return this.getContent().length > 0;
            }
            changeContent(t) {
                return this._checkContent(t), this._config.content = {
                    ...this._config.content,
                    ...t
                }, this;
            }
            toHtml() {
                const t = document.createElement("div");
                t.innerHTML = this._maybeSanitize(this._config.template);
                for (const [e, i] of Object.entries(this._config.content)) this._setContent(t, i, e);
                const e = t.children[0], i = this._resolvePossibleFunction(this._config.extraClass);
                return i && e.classList.add(...i.split(" ")), e;
            }
            _typeCheckConfig(t) {
                super._typeCheckConfig(t), this._checkContent(t.content);
            }
            _checkContent(t) {
                for (const [e, i] of Object.entries(t)) super._typeCheckConfig({
                    selector: e,
                    entry: i
                }, Gn);
            }
            _setContent(t, e, i) {
                const n = z.findOne(i, t);
                n && ((e = this._resolvePossibleFunction(e)) ? o(e) ? this._putElementInTemplate(r(e), n) : this._config.html ? n.innerHTML = this._maybeSanitize(e) : n.textContent = e : n.remove());
            }
            _maybeSanitize(t) {
                return this._config.sanitize ? function(t, e, i) {
                    if (!t.length) return t;
                    if (i && "function" == typeof i) return i(t);
                    const n = (new window.DOMParser).parseFromString(t, "text/html"), s = [].concat(...n.body.querySelectorAll("*"));
                    for (const t of s) {
                        const i = t.nodeName.toLowerCase();
                        if (!Object.keys(e).includes(i)) {
                            t.remove();
                            continue;
                        }
                        const n = [].concat(...t.attributes), s = [].concat(e["*"] || [], e[i] || []);
                        for (const e of n) Xn(e, s) || t.removeAttribute(e.nodeName);
                    }
                    return n.body.innerHTML;
                }(t, this._config.allowList, this._config.sanitizeFn) : t;
            }
            _resolvePossibleFunction(t) {
                return g(t, [ this ]);
            }
            _putElementInTemplate(t, e) {
                if (this._config.html) return e.innerHTML = "", void e.append(t);
                e.textContent = t.textContent;
            }
        }
        const Zn = new Set([ "sanitize", "allowList", "sanitizeFn" ]), ts = "fade", es = "show", is = ".modal", ns = "hide.bs.modal", ss = "hover", os = "focus", rs = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: p() ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: p() ? "right" : "left"
        }, as = {
            allowList: Vn,
            animation: !0,
            boundary: "clippingParents",
            container: !1,
            customClass: "",
            delay: 0,
            fallbackPlacements: [ "top", "right", "bottom", "left" ],
            html: !1,
            offset: [ 0, 6 ],
            placement: "top",
            popperConfig: null,
            sanitize: !0,
            sanitizeFn: null,
            selector: !1,
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            title: "",
            trigger: "hover focus"
        }, ls = {
            allowList: "object",
            animation: "boolean",
            boundary: "(string|element)",
            container: "(string|element|boolean)",
            customClass: "(string|function)",
            delay: "(number|object)",
            fallbackPlacements: "array",
            html: "boolean",
            offset: "(array|string|function)",
            placement: "(string|function)",
            popperConfig: "(null|object|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            selector: "(string|boolean)",
            template: "string",
            title: "(string|element|function)",
            trigger: "string"
        };
        class cs extends W {
            constructor(t, e) {
                if (void 0 === vi) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
                super(t, e), this._isEnabled = !0, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, 
                this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, 
                this._setListeners(), this._config.selector || this._fixTitle();
            }
            static get Default() {
                return as;
            }
            static get DefaultType() {
                return ls;
            }
            static get NAME() {
                return "tooltip";
            }
            enable() {
                this._isEnabled = !0;
            }
            disable() {
                this._isEnabled = !1;
            }
            toggleEnabled() {
                this._isEnabled = !this._isEnabled;
            }
            toggle() {
                this._isEnabled && (this._activeTrigger.click = !this._activeTrigger.click, this._isShown() ? this._leave() : this._enter());
            }
            dispose() {
                clearTimeout(this._timeout), N.off(this._element.closest(is), ns, this._hideModalHandler), 
                this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), 
                this._disposePopper(), super.dispose();
            }
            show() {
                if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
                if (!this._isWithContent() || !this._isEnabled) return;
                const t = N.trigger(this._element, this.constructor.eventName("show")), e = (c(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
                if (t.defaultPrevented || !e) return;
                this._disposePopper();
                const i = this._getTipElement();
                this._element.setAttribute("aria-describedby", i.getAttribute("id"));
                const {container: n} = this._config;
                if (this._element.ownerDocument.documentElement.contains(this.tip) || (n.append(i), 
                N.trigger(this._element, this.constructor.eventName("inserted"))), this._popper = this._createPopper(i), 
                i.classList.add(es), "ontouchstart" in document.documentElement) for (const t of [].concat(...document.body.children)) N.on(t, "mouseover", h);
                this._queueCallback((() => {
                    N.trigger(this._element, this.constructor.eventName("shown")), !1 === this._isHovered && this._leave(), 
                    this._isHovered = !1;
                }), this.tip, this._isAnimated());
            }
            hide() {
                if (this._isShown() && !N.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) {
                    if (this._getTipElement().classList.remove(es), "ontouchstart" in document.documentElement) for (const t of [].concat(...document.body.children)) N.off(t, "mouseover", h);
                    this._activeTrigger.click = !1, this._activeTrigger[os] = !1, this._activeTrigger[ss] = !1, 
                    this._isHovered = null, this._queueCallback((() => {
                        this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), 
                        N.trigger(this._element, this.constructor.eventName("hidden")));
                    }), this.tip, this._isAnimated());
                }
            }
            update() {
                this._popper && this._popper.update();
            }
            _isWithContent() {
                return Boolean(this._getTitle());
            }
            _getTipElement() {
                return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), 
                this.tip;
            }
            _createTipElement(t) {
                const e = this._getTemplateFactory(t).toHtml();
                if (!e) return null;
                e.classList.remove(ts, es), e.classList.add(`bs-${this.constructor.NAME}-auto`);
                const i = (t => {
                    do {
                        t += Math.floor(1e6 * Math.random());
                    } while (document.getElementById(t));
                    return t;
                })(this.constructor.NAME).toString();
                return e.setAttribute("id", i), this._isAnimated() && e.classList.add(ts), e;
            }
            setContent(t) {
                this._newContent = t, this._isShown() && (this._disposePopper(), this.show());
            }
            _getTemplateFactory(t) {
                return this._templateFactory ? this._templateFactory.changeContent(t) : this._templateFactory = new Jn({
                    ...this._config,
                    content: t,
                    extraClass: this._resolvePossibleFunction(this._config.customClass)
                }), this._templateFactory;
            }
            _getContentForTemplate() {
                return {
                    ".tooltip-inner": this._getTitle()
                };
            }
            _getTitle() {
                return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
            }
            _initializeOnDelegatedTarget(t) {
                return this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig());
            }
            _isAnimated() {
                return this._config.animation || this.tip && this.tip.classList.contains(ts);
            }
            _isShown() {
                return this.tip && this.tip.classList.contains(es);
            }
            _createPopper(t) {
                const e = g(this._config.placement, [ this, t, this._element ]), i = rs[e.toUpperCase()];
                return bi(this._element, t, this._getPopperConfig(i));
            }
            _getOffset() {
                const {offset: t} = this._config;
                return "string" == typeof t ? t.split(",").map((t => Number.parseInt(t, 10))) : "function" == typeof t ? e => t(e, this._element) : t;
            }
            _resolvePossibleFunction(t) {
                return g(t, [ this._element ]);
            }
            _getPopperConfig(t) {
                const e = {
                    placement: t,
                    modifiers: [ {
                        name: "flip",
                        options: {
                            fallbackPlacements: this._config.fallbackPlacements
                        }
                    }, {
                        name: "offset",
                        options: {
                            offset: this._getOffset()
                        }
                    }, {
                        name: "preventOverflow",
                        options: {
                            boundary: this._config.boundary
                        }
                    }, {
                        name: "arrow",
                        options: {
                            element: `.${this.constructor.NAME}-arrow`
                        }
                    }, {
                        name: "preSetPlacement",
                        enabled: !0,
                        phase: "beforeMain",
                        fn: t => {
                            this._getTipElement().setAttribute("data-popper-placement", t.state.placement);
                        }
                    } ]
                };
                return {
                    ...e,
                    ...g(this._config.popperConfig, [ e ])
                };
            }
            _setListeners() {
                const t = this._config.trigger.split(" ");
                for (const e of t) if ("click" === e) N.on(this._element, this.constructor.eventName("click"), this._config.selector, (t => {
                    this._initializeOnDelegatedTarget(t).toggle();
                })); else if ("manual" !== e) {
                    const t = e === ss ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"), i = e === ss ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
                    N.on(this._element, t, this._config.selector, (t => {
                        const e = this._initializeOnDelegatedTarget(t);
                        e._activeTrigger["focusin" === t.type ? os : ss] = !0, e._enter();
                    })), N.on(this._element, i, this._config.selector, (t => {
                        const e = this._initializeOnDelegatedTarget(t);
                        e._activeTrigger["focusout" === t.type ? os : ss] = e._element.contains(t.relatedTarget), 
                        e._leave();
                    }));
                }
                this._hideModalHandler = () => {
                    this._element && this.hide();
                }, N.on(this._element.closest(is), ns, this._hideModalHandler);
            }
            _fixTitle() {
                const t = this._element.getAttribute("title");
                t && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", t), 
                this._element.setAttribute("data-bs-original-title", t), this._element.removeAttribute("title"));
            }
            _enter() {
                this._isShown() || this._isHovered ? this._isHovered = !0 : (this._isHovered = !0, 
                this._setTimeout((() => {
                    this._isHovered && this.show();
                }), this._config.delay.show));
            }
            _leave() {
                this._isWithActiveTrigger() || (this._isHovered = !1, this._setTimeout((() => {
                    this._isHovered || this.hide();
                }), this._config.delay.hide));
            }
            _setTimeout(t, e) {
                clearTimeout(this._timeout), this._timeout = setTimeout(t, e);
            }
            _isWithActiveTrigger() {
                return Object.values(this._activeTrigger).includes(!0);
            }
            _getConfig(t) {
                const e = F.getDataAttributes(this._element);
                for (const t of Object.keys(e)) Zn.has(t) && delete e[t];
                return t = {
                    ...e,
                    ..."object" == typeof t && t ? t : {}
                }, t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), 
                t;
            }
            _configAfterMerge(t) {
                return t.container = !1 === t.container ? document.body : r(t.container), "number" == typeof t.delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }), "number" == typeof t.title && (t.title = t.title.toString()), "number" == typeof t.content && (t.content = t.content.toString()), 
                t;
            }
            _getDelegateConfig() {
                const t = {};
                for (const [e, i] of Object.entries(this._config)) this.constructor.Default[e] !== i && (t[e] = i);
                return t.selector = !1, t.trigger = "manual", t;
            }
            _disposePopper() {
                this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), 
                this.tip = null);
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = cs.getOrCreateInstance(this, t);
                    if ("string" == typeof t) {
                        if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                        e[t]();
                    }
                }));
            }
        }
        m(cs);
        const hs = {
            ...cs.Default,
            content: "",
            offset: [ 0, 8 ],
            placement: "right",
            template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            trigger: "click"
        }, ds = {
            ...cs.DefaultType,
            content: "(null|string|element|function)"
        };
        class us extends cs {
            static get Default() {
                return hs;
            }
            static get DefaultType() {
                return ds;
            }
            static get NAME() {
                return "popover";
            }
            _isWithContent() {
                return this._getTitle() || this._getContent();
            }
            _getContentForTemplate() {
                return {
                    ".popover-header": this._getTitle(),
                    ".popover-body": this._getContent()
                };
            }
            _getContent() {
                return this._resolvePossibleFunction(this._config.content);
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = us.getOrCreateInstance(this, t);
                    if ("string" == typeof t) {
                        if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                        e[t]();
                    }
                }));
            }
        }
        m(us);
        const fs = ".bs.scrollspy", ps = `activate${fs}`, ms = `click${fs}`, gs = `load${fs}.data-api`, _s = "active", bs = "[href]", vs = ".nav-link", ys = `${vs}, .nav-item > ${vs}, .list-group-item`, ws = {
            offset: null,
            rootMargin: "0px 0px -25%",
            smoothScroll: !1,
            target: null,
            threshold: [ .1, .5, 1 ]
        }, As = {
            offset: "(number|null)",
            rootMargin: "string",
            smoothScroll: "boolean",
            target: "element",
            threshold: "array"
        };
        class Es extends W {
            constructor(t, e) {
                super(t, e), this._targetLinks = new Map, this._observableSections = new Map, this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element, 
                this._activeTarget = null, this._observer = null, this._previousScrollData = {
                    visibleEntryTop: 0,
                    parentScrollTop: 0
                }, this.refresh();
            }
            static get Default() {
                return ws;
            }
            static get DefaultType() {
                return As;
            }
            static get NAME() {
                return "scrollspy";
            }
            refresh() {
                this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
                for (const t of this._observableSections.values()) this._observer.observe(t);
            }
            dispose() {
                this._observer.disconnect(), super.dispose();
            }
            _configAfterMerge(t) {
                return t.target = r(t.target) || document.body, t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin, 
                "string" == typeof t.threshold && (t.threshold = t.threshold.split(",").map((t => Number.parseFloat(t)))), 
                t;
            }
            _maybeEnableSmoothScroll() {
                this._config.smoothScroll && (N.off(this._config.target, ms), N.on(this._config.target, ms, bs, (t => {
                    const e = this._observableSections.get(t.target.hash);
                    if (e) {
                        t.preventDefault();
                        const i = this._rootElement || window, n = e.offsetTop - this._element.offsetTop;
                        if (i.scrollTo) return void i.scrollTo({
                            top: n,
                            behavior: "smooth"
                        });
                        i.scrollTop = n;
                    }
                })));
            }
            _getNewObserver() {
                const t = {
                    root: this._rootElement,
                    threshold: this._config.threshold,
                    rootMargin: this._config.rootMargin
                };
                return new IntersectionObserver((t => this._observerCallback(t)), t);
            }
            _observerCallback(t) {
                const e = t => this._targetLinks.get(`#${t.target.id}`), i = t => {
                    this._previousScrollData.visibleEntryTop = t.target.offsetTop, this._process(e(t));
                }, n = (this._rootElement || document.documentElement).scrollTop, s = n >= this._previousScrollData.parentScrollTop;
                this._previousScrollData.parentScrollTop = n;
                for (const o of t) {
                    if (!o.isIntersecting) {
                        this._activeTarget = null, this._clearActiveClass(e(o));
                        continue;
                    }
                    const t = o.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                    if (s && t) {
                        if (i(o), !n) return;
                    } else s || t || i(o);
                }
            }
            _initializeTargetsAndObservables() {
                this._targetLinks = new Map, this._observableSections = new Map;
                const t = z.find(bs, this._config.target);
                for (const e of t) {
                    if (!e.hash || l(e)) continue;
                    const t = z.findOne(decodeURI(e.hash), this._element);
                    a(t) && (this._targetLinks.set(decodeURI(e.hash), e), this._observableSections.set(e.hash, t));
                }
            }
            _process(t) {
                this._activeTarget !== t && (this._clearActiveClass(this._config.target), this._activeTarget = t, 
                t.classList.add(_s), this._activateParents(t), N.trigger(this._element, ps, {
                    relatedTarget: t
                }));
            }
            _activateParents(t) {
                if (t.classList.contains("dropdown-item")) z.findOne(".dropdown-toggle", t.closest(".dropdown")).classList.add(_s); else for (const e of z.parents(t, ".nav, .list-group")) for (const t of z.prev(e, ys)) t.classList.add(_s);
            }
            _clearActiveClass(t) {
                t.classList.remove(_s);
                const e = z.find(`${bs}.${_s}`, t);
                for (const t of e) t.classList.remove(_s);
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = Es.getOrCreateInstance(this, t);
                    if ("string" == typeof t) {
                        if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                        e[t]();
                    }
                }));
            }
        }
        N.on(window, gs, (() => {
            for (const t of z.find('[data-bs-spy="scroll"]')) Es.getOrCreateInstance(t);
        })), m(Es);
        const Ts = ".bs.tab", Cs = `hide${Ts}`, Os = `hidden${Ts}`, xs = `show${Ts}`, ks = `shown${Ts}`, Ls = `click${Ts}`, Ss = `keydown${Ts}`, Ds = `load${Ts}`, $s = "ArrowLeft", Is = "ArrowRight", Ns = "ArrowUp", Ps = "ArrowDown", js = "Home", Ms = "End", Fs = "active", Hs = "fade", Ws = "show", Bs = ".dropdown-toggle", zs = `:not(${Bs})`, Rs = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', qs = `.nav-link${zs}, .list-group-item${zs}, [role="tab"]${zs}, ${Rs}`, Vs = `.${Fs}[data-bs-toggle="tab"], .${Fs}[data-bs-toggle="pill"], .${Fs}[data-bs-toggle="list"]`;
        class Ks extends W {
            constructor(t) {
                super(t), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), 
                this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), 
                N.on(this._element, Ss, (t => this._keydown(t))));
            }
            static get NAME() {
                return "tab";
            }
            show() {
                const t = this._element;
                if (this._elemIsActive(t)) return;
                const e = this._getActiveElem(), i = e ? N.trigger(e, Cs, {
                    relatedTarget: t
                }) : null;
                N.trigger(t, xs, {
                    relatedTarget: e
                }).defaultPrevented || i && i.defaultPrevented || (this._deactivate(e, t), this._activate(t, e));
            }
            _activate(t, e) {
                t && (t.classList.add(Fs), this._activate(z.getElementFromSelector(t)), this._queueCallback((() => {
                    "tab" === t.getAttribute("role") ? (t.removeAttribute("tabindex"), t.setAttribute("aria-selected", !0), 
                    this._toggleDropDown(t, !0), N.trigger(t, ks, {
                        relatedTarget: e
                    })) : t.classList.add(Ws);
                }), t, t.classList.contains(Hs)));
            }
            _deactivate(t, e) {
                t && (t.classList.remove(Fs), t.blur(), this._deactivate(z.getElementFromSelector(t)), 
                this._queueCallback((() => {
                    "tab" === t.getAttribute("role") ? (t.setAttribute("aria-selected", !1), t.setAttribute("tabindex", "-1"), 
                    this._toggleDropDown(t, !1), N.trigger(t, Os, {
                        relatedTarget: e
                    })) : t.classList.remove(Ws);
                }), t, t.classList.contains(Hs)));
            }
            _keydown(t) {
                if (![ $s, Is, Ns, Ps, js, Ms ].includes(t.key)) return;
                t.stopPropagation(), t.preventDefault();
                const e = this._getChildren().filter((t => !l(t)));
                let i;
                if ([ js, Ms ].includes(t.key)) i = e[t.key === js ? 0 : e.length - 1]; else {
                    const n = [ Is, Ps ].includes(t.key);
                    i = b(e, t.target, n, !0);
                }
                i && (i.focus({
                    preventScroll: !0
                }), Ks.getOrCreateInstance(i).show());
            }
            _getChildren() {
                return z.find(qs, this._parent);
            }
            _getActiveElem() {
                return this._getChildren().find((t => this._elemIsActive(t))) || null;
            }
            _setInitialAttributes(t, e) {
                this._setAttributeIfNotExists(t, "role", "tablist");
                for (const t of e) this._setInitialAttributesOnChild(t);
            }
            _setInitialAttributesOnChild(t) {
                t = this._getInnerElement(t);
                const e = this._elemIsActive(t), i = this._getOuterElement(t);
                t.setAttribute("aria-selected", e), i !== t && this._setAttributeIfNotExists(i, "role", "presentation"), 
                e || t.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(t, "role", "tab"), 
                this._setInitialAttributesOnTargetPanel(t);
            }
            _setInitialAttributesOnTargetPanel(t) {
                const e = z.getElementFromSelector(t);
                e && (this._setAttributeIfNotExists(e, "role", "tabpanel"), t.id && this._setAttributeIfNotExists(e, "aria-labelledby", `${t.id}`));
            }
            _toggleDropDown(t, e) {
                const i = this._getOuterElement(t);
                if (!i.classList.contains("dropdown")) return;
                const n = (t, n) => {
                    const s = z.findOne(t, i);
                    s && s.classList.toggle(n, e);
                };
                n(Bs, Fs), n(".dropdown-menu", Ws), i.setAttribute("aria-expanded", e);
            }
            _setAttributeIfNotExists(t, e, i) {
                t.hasAttribute(e) || t.setAttribute(e, i);
            }
            _elemIsActive(t) {
                return t.classList.contains(Fs);
            }
            _getInnerElement(t) {
                return t.matches(qs) ? t : z.findOne(qs, t);
            }
            _getOuterElement(t) {
                return t.closest(".nav-item, .list-group-item") || t;
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = Ks.getOrCreateInstance(this);
                    if ("string" == typeof t) {
                        if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
                        e[t]();
                    }
                }));
            }
        }
        N.on(document, Ls, Rs, (function(t) {
            [ "A", "AREA" ].includes(this.tagName) && t.preventDefault(), l(this) || Ks.getOrCreateInstance(this).show();
        })), N.on(window, Ds, (() => {
            for (const t of z.find(Vs)) Ks.getOrCreateInstance(t);
        })), m(Ks);
        const Qs = ".bs.toast", Xs = `mouseover${Qs}`, Ys = `mouseout${Qs}`, Us = `focusin${Qs}`, Gs = `focusout${Qs}`, Js = `hide${Qs}`, Zs = `hidden${Qs}`, to = `show${Qs}`, eo = `shown${Qs}`, io = "hide", no = "show", so = "showing", oo = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        }, ro = {
            animation: !0,
            autohide: !0,
            delay: 5e3
        };
        class ao extends W {
            constructor(t, e) {
                super(t, e), this._timeout = null, this._hasMouseInteraction = !1, this._hasKeyboardInteraction = !1, 
                this._setListeners();
            }
            static get Default() {
                return ro;
            }
            static get DefaultType() {
                return oo;
            }
            static get NAME() {
                return "toast";
            }
            show() {
                N.trigger(this._element, to).defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), 
                this._element.classList.remove(io), d(this._element), this._element.classList.add(no, so), 
                this._queueCallback((() => {
                    this._element.classList.remove(so), N.trigger(this._element, eo), this._maybeScheduleHide();
                }), this._element, this._config.animation));
            }
            hide() {
                this.isShown() && (N.trigger(this._element, Js).defaultPrevented || (this._element.classList.add(so), 
                this._queueCallback((() => {
                    this._element.classList.add(io), this._element.classList.remove(so, no), N.trigger(this._element, Zs);
                }), this._element, this._config.animation)));
            }
            dispose() {
                this._clearTimeout(), this.isShown() && this._element.classList.remove(no), super.dispose();
            }
            isShown() {
                return this._element.classList.contains(no);
            }
            _maybeScheduleHide() {
                this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout((() => {
                    this.hide();
                }), this._config.delay)));
            }
            _onInteraction(t, e) {
                switch (t.type) {
                  case "mouseover":
                  case "mouseout":
                    this._hasMouseInteraction = e;
                    break;

                  case "focusin":
                  case "focusout":
                    this._hasKeyboardInteraction = e;
                }
                if (e) return void this._clearTimeout();
                const i = t.relatedTarget;
                this._element === i || this._element.contains(i) || this._maybeScheduleHide();
            }
            _setListeners() {
                N.on(this._element, Xs, (t => this._onInteraction(t, !0))), N.on(this._element, Ys, (t => this._onInteraction(t, !1))), 
                N.on(this._element, Us, (t => this._onInteraction(t, !0))), N.on(this._element, Gs, (t => this._onInteraction(t, !1)));
            }
            _clearTimeout() {
                clearTimeout(this._timeout), this._timeout = null;
            }
            static jQueryInterface(t) {
                return this.each((function() {
                    const e = ao.getOrCreateInstance(this, t);
                    if ("string" == typeof t) {
                        if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
                        e[t](this);
                    }
                }));
            }
        }
        return R(ao), m(ao), {
            Alert: Q,
            Button: Y,
            Carousel: xt,
            Collapse: Bt,
            Dropdown: qi,
            Modal: On,
            Offcanvas: qn,
            Popover: us,
            ScrollSpy: Es,
            Tab: Ks,
            Toast: ao,
            Tooltip: cs
        };
    }));
    function spoller() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            }));
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", (function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach((spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                }));
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                    spollerTitles.forEach((spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    }));
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", (function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerClose.classList.remove("_spoller-active");
                    _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                }));
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
    }
    function burger() {
        const burgerBtn = document.querySelector("#burger-btn");
        const burger = document.querySelector("#burger");
        const heightHeader = document.querySelector(".header").clientHeight;
        if (burger) {
            burger.addEventListener("click", (e => e.stopPropagation()));
            burgerBtn.addEventListener("click", (e => {
                e.stopPropagation();
                if (burger.classList.contains("_open")) burgerClose(); else burgerOpen();
            }));
            function burgerClose() {
                burger.classList.remove("_open");
                burgerBtn.classList.remove("_active");
                document.body.classList.remove("body-hidden");
                document.body.removeEventListener("click", burgerClose);
            }
            function burgerOpen() {
                burger.classList.add("_open");
                burgerBtn.classList.add("_active");
                document.body.classList.add("body-hidden");
                document.body.addEventListener("click", burgerClose);
            }
            function updateHeightBurger() {
                burger.style.maxHeight = `${window.visualViewport.height - heightHeader}px`;
                burger.style.top = `${heightHeader}px`;
            }
            window.visualViewport.addEventListener("resize", updateHeightBurger);
            window.visualViewport.addEventListener("scroll", updateHeightBurger);
            updateHeightBurger();
        }
    }
    function _assertThisInitialized(self) {
        if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return self;
    }
    function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
    }
    /*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/    var _suppressOverwrites, _reverting, _context, _globalTimeline, _win, _coreInitted, _doc, _coreReady, _lastRenderedFrame, _quickTween, _tickerActive, _config = {
        autoSleep: 120,
        force3D: "auto",
        nullTargetWarn: 1,
        units: {
            lineHeight: ""
        }
    }, _defaults = {
        duration: .5,
        overwrite: false,
        delay: 0
    }, _bigNum = 1e8, _tinyNum = 1 / _bigNum, _2PI = Math.PI * 2, _HALF_PI = _2PI / 4, _gsID = 0, _sqrt = Math.sqrt, _cos = Math.cos, _sin = Math.sin, _isString = function _isString(value) {
        return typeof value === "string";
    }, _isFunction = function _isFunction(value) {
        return typeof value === "function";
    }, _isNumber = function _isNumber(value) {
        return typeof value === "number";
    }, _isUndefined = function _isUndefined(value) {
        return typeof value === "undefined";
    }, _isObject = function _isObject(value) {
        return typeof value === "object";
    }, _isNotFalse = function _isNotFalse(value) {
        return value !== false;
    }, _windowExists = function _windowExists() {
        return typeof window !== "undefined";
    }, _isFuncOrString = function _isFuncOrString(value) {
        return _isFunction(value) || _isString(value);
    }, _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function() {}, _isArray = Array.isArray, _strictNumExp = /(?:-?\.?\d|\.)+/gi, _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, _relExp = /[+-]=-?[.\d]+/, _delimitedValueExp = /[^,'"\[\]\s]+/gi, _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, _globals = {}, _installScope = {}, _install = function _install(scope) {
        return (_installScope = _merge(scope, _globals)) && gsap;
    }, _missingPlugin = function _missingPlugin(property, value) {
        return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
    }, _warn = function _warn(message, suppress) {
        return !suppress && console.warn(message);
    }, _addGlobal = function _addGlobal(name, obj) {
        return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
    }, _emptyFunc = function _emptyFunc() {
        return 0;
    }, _startAtRevertConfig = {
        suppressEvents: true,
        isStart: true,
        kill: false
    }, _revertConfigNoKill = {
        suppressEvents: true,
        kill: false
    }, _revertConfig = {
        suppressEvents: true
    }, _reservedProps = {}, _lazyTweens = [], _lazyLookup = {}, _plugins = {}, _effects = {}, _nextGCFrame = 30, _harnessPlugins = [], _callbackNames = "", _harness = function _harness(targets) {
        var harnessPlugin, i, target = targets[0];
        _isObject(target) || _isFunction(target) || (targets = [ targets ]);
        if (!(harnessPlugin = (target._gsap || {}).harness)) {
            i = _harnessPlugins.length;
            while (i-- && !_harnessPlugins[i].targetTest(target)) ;
            harnessPlugin = _harnessPlugins[i];
        }
        i = targets.length;
        while (i--) targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
        return targets;
    }, _getCache = function _getCache(target) {
        return target._gsap || _harness(toArray(target))[0]._gsap;
    }, _getProperty = function _getProperty(target, property, v) {
        return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
    }, _forEachName = function _forEachName(names, func) {
        return (names = names.split(",")).forEach(func) || names;
    }, _round = function _round(value) {
        return Math.round(value * 1e5) / 1e5 || 0;
    }, _roundPrecise = function _roundPrecise(value) {
        return Math.round(value * 1e7) / 1e7 || 0;
    }, _parseRelative = function _parseRelative(start, value) {
        var operator = value.charAt(0), end = parseFloat(value.substr(2));
        start = parseFloat(start);
        return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
    }, _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
        var l = toFind.length, i = 0;
        for (;toSearch.indexOf(toFind[i]) < 0 && ++i < l; ) ;
        return i < l;
    }, _lazyRender = function _lazyRender() {
        var i, tween, l = _lazyTweens.length, a = _lazyTweens.slice(0);
        _lazyLookup = {};
        _lazyTweens.length = 0;
        for (i = 0; i < l; i++) {
            tween = a[i];
            tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
        }
    }, _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
        _lazyTweens.length && !_reverting && _lazyRender();
        animation.render(time, suppressEvents, force || _reverting && time < 0 && (animation._initted || animation._startAt));
        _lazyTweens.length && !_reverting && _lazyRender();
    }, _numericIfPossible = function _numericIfPossible(value) {
        var n = parseFloat(value);
        return (n || n === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
    }, _passThrough = function _passThrough(p) {
        return p;
    }, _setDefaults = function _setDefaults(obj, defaults) {
        for (var p in defaults) p in obj || (obj[p] = defaults[p]);
        return obj;
    }, _setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
        return function(obj, defaults) {
            for (var p in defaults) p in obj || p === "duration" && excludeDuration || p === "ease" || (obj[p] = defaults[p]);
        };
    }, _merge = function _merge(base, toMerge) {
        for (var p in toMerge) base[p] = toMerge[p];
        return base;
    }, _mergeDeep = function _mergeDeep(base, toMerge) {
        for (var p in toMerge) p !== "__proto__" && p !== "constructor" && p !== "prototype" && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
        return base;
    }, _copyExcluding = function _copyExcluding(obj, excluding) {
        var p, copy = {};
        for (p in obj) p in excluding || (copy[p] = obj[p]);
        return copy;
    }, _inheritDefaults = function _inheritDefaults(vars) {
        var parent = vars.parent || _globalTimeline, func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;
        if (_isNotFalse(vars.inherit)) while (parent) {
            func(vars, parent.vars.defaults);
            parent = parent.parent || parent._dp;
        }
        return vars;
    }, _arraysMatch = function _arraysMatch(a1, a2) {
        var i = a1.length, match = i === a2.length;
        while (match && i-- && a1[i] === a2[i]) ;
        return i < 0;
    }, _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
        if (firstProp === void 0) firstProp = "_first";
        if (lastProp === void 0) lastProp = "_last";
        var t, prev = parent[lastProp];
        if (sortBy) {
            t = child[sortBy];
            while (prev && prev[sortBy] > t) prev = prev._prev;
        }
        if (prev) {
            child._next = prev._next;
            prev._next = child;
        } else {
            child._next = parent[firstProp];
            parent[firstProp] = child;
        }
        if (child._next) child._next._prev = child; else parent[lastProp] = child;
        child._prev = prev;
        child.parent = child._dp = parent;
        return child;
    }, _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
        if (firstProp === void 0) firstProp = "_first";
        if (lastProp === void 0) lastProp = "_last";
        var prev = child._prev, next = child._next;
        if (prev) prev._next = next; else if (parent[firstProp] === child) parent[firstProp] = next;
        if (next) next._prev = prev; else if (parent[lastProp] === child) parent[lastProp] = prev;
        child._next = child._prev = child.parent = null;
    }, _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
        child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove && child.parent.remove(child);
        child._act = 0;
    }, _uncache = function _uncache(animation, child) {
        if (animation && (!child || child._end > animation._dur || child._start < 0)) {
            var a = animation;
            while (a) {
                a._dirty = 1;
                a = a.parent;
            }
        }
        return animation;
    }, _recacheAncestors = function _recacheAncestors(animation) {
        var parent = animation.parent;
        while (parent && parent.parent) {
            parent._dirty = 1;
            parent.totalDuration();
            parent = parent.parent;
        }
        return animation;
    }, _rewindStartAt = function _rewindStartAt(tween, totalTime, suppressEvents, force) {
        return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
    }, _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
        return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
    }, _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
        return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
    }, _animationCycle = function _animationCycle(tTime, cycleDuration) {
        var whole = Math.floor(tTime = _roundPrecise(tTime / cycleDuration));
        return tTime && whole === tTime ? whole - 1 : whole;
    }, _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
        return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
    }, _setEnd = function _setEnd(animation) {
        return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
    }, _alignPlayhead = function _alignPlayhead(animation, totalTime) {
        var parent = animation._dp;
        if (parent && parent.smoothChildTiming && animation._ts) {
            animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
            _setEnd(animation);
            parent._dirty || _uncache(parent, animation);
        }
        return animation;
    }, _postAddChecks = function _postAddChecks(timeline, child) {
        var t;
        if (child._time || !child._dur && child._initted || child._start < timeline._time && (child._dur || !child.add)) {
            t = _parentToChildTotalTime(timeline.rawTime(), child);
            if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) child.render(t, true);
        }
        if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
            if (timeline._dur < timeline.duration()) {
                t = timeline;
                while (t._dp) {
                    t.rawTime() >= 0 && t.totalTime(t._tTime);
                    t = t._dp;
                }
            }
            timeline._zTime = -_tinyNum;
        }
    }, _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
        child.parent && _removeFromParent(child);
        child._start = _roundPrecise((_isNumber(position) ? position : position || timeline !== _globalTimeline ? _parsePosition(timeline, position, child) : timeline._time) + child._delay);
        child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
        _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);
        _isFromOrFromStart(child) || (timeline._recent = child);
        skipChecks || _postAddChecks(timeline, child);
        timeline._ts < 0 && _alignPlayhead(timeline, timeline._tTime);
        return timeline;
    }, _scrollTrigger = function _scrollTrigger(animation, trigger) {
        return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
    }, _attemptInitTween = function _attemptInitTween(tween, time, force, suppressEvents, tTime) {
        _initTween(tween, time, tTime);
        if (!tween._initted) return 1;
        if (!force && tween._pt && !_reverting && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
            _lazyTweens.push(tween);
            tween._lazy = [ tTime, suppressEvents ];
            return 1;
        }
    }, _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
        var parent = _ref.parent;
        return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
    }, _isFromOrFromStart = function _isFromOrFromStart(_ref2) {
        var data = _ref2.data;
        return data === "isFromStart" || data === "isStart";
    }, _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
        var pt, iteration, prevIteration, prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1, repeatDelay = tween._rDelay, tTime = 0;
        if (repeatDelay && tween._repeat) {
            tTime = _clamp(0, tween._tDur, totalTime);
            iteration = _animationCycle(tTime, repeatDelay);
            tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
            if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
                prevRatio = 1 - ratio;
                tween.vars.repeatRefresh && tween._initted && tween.invalidate();
            }
        }
        if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
            if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) return;
            prevIteration = tween._zTime;
            tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
            suppressEvents || (suppressEvents = totalTime && !prevIteration);
            tween.ratio = ratio;
            tween._from && (ratio = 1 - ratio);
            tween._time = 0;
            tween._tTime = tTime;
            pt = tween._pt;
            while (pt) {
                pt.r(ratio, pt.d);
                pt = pt._next;
            }
            totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
            tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
            tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");
            if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
                ratio && _removeFromParent(tween, 1);
                if (!suppressEvents && !_reverting) {
                    _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
                    tween._prom && tween._prom();
                }
            }
        } else if (!tween._zTime) tween._zTime = totalTime;
    }, _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
        var child;
        if (time > prevTime) {
            child = animation._first;
            while (child && child._start <= time) {
                if (child.data === "isPause" && child._start > prevTime) return child;
                child = child._next;
            }
        } else {
            child = animation._last;
            while (child && child._start >= time) {
                if (child.data === "isPause" && child._start < prevTime) return child;
                child = child._prev;
            }
        }
    }, _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
        var repeat = animation._repeat, dur = _roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
        totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
        animation._dur = dur;
        animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
        totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
        animation.parent && _setEnd(animation);
        skipUncache || _uncache(animation.parent, animation);
        return animation;
    }, _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
        return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
    }, _zeroPosition = {
        _start: 0,
        endTime: _emptyFunc,
        totalDuration: _emptyFunc
    }, _parsePosition = function _parsePosition(animation, position, percentAnimation) {
        var i, offset, isPercent, labels = animation.labels, recent = animation._recent || _zeroPosition, clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur;
        if (_isString(position) && (isNaN(position) || position in labels)) {
            offset = position.charAt(0);
            isPercent = position.substr(-1) === "%";
            i = position.indexOf("=");
            if (offset === "<" || offset === ">") {
                i >= 0 && (position = position.replace(/=/, ""));
                return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
            }
            if (i < 0) {
                position in labels || (labels[position] = clippedDuration);
                return labels[position];
            }
            offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
            if (isPercent && percentAnimation) offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
            return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
        }
        return position == null ? clippedDuration : +position;
    }, _createTweenType = function _createTweenType(type, params, timeline) {
        var irVars, parent, isLegacy = _isNumber(params[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars = params[varsIndex];
        isLegacy && (vars.duration = params[1]);
        vars.parent = timeline;
        if (type) {
            irVars = vars;
            parent = timeline;
            while (parent && !("immediateRender" in irVars)) {
                irVars = parent.vars.defaults || {};
                parent = _isNotFalse(parent.vars.inherit) && parent.parent;
            }
            vars.immediateRender = _isNotFalse(irVars.immediateRender);
            type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1];
        }
        return new Tween(params[0], vars, params[varsIndex + 1]);
    }, _conditionalReturn = function _conditionalReturn(value, func) {
        return value || value === 0 ? func(value) : func;
    }, _clamp = function _clamp(min, max, value) {
        return value < min ? min : value > max ? max : value;
    }, getUnit = function getUnit(value, v) {
        return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
    }, clamp = function clamp(min, max, value) {
        return _conditionalReturn(value, (function(v) {
            return _clamp(min, max, v);
        }));
    }, _slice = [].slice, _isArrayLike = function _isArrayLike(value, nonEmpty) {
        return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
    }, _flatten = function _flatten(ar, leaveStrings, accumulator) {
        if (accumulator === void 0) accumulator = [];
        return ar.forEach((function(value) {
            var _accumulator;
            return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
        })) || accumulator;
    }, toArray = function toArray(value, scope, leaveStrings) {
        return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [ value ] : [];
    }, selector = function selector(value) {
        value = toArray(value)[0] || _warn("Invalid scope") || {};
        return function(v) {
            var el = value.current || value.nativeElement || value;
            return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
        };
    }, shuffle = function shuffle(a) {
        return a.sort((function() {
            return .5 - Math.random();
        }));
    }, distribute = function distribute(v) {
        if (_isFunction(v)) return v;
        var vars = _isObject(v) ? v : {
            each: v
        }, ease = _parseEase(vars.ease), from = vars.from || 0, base = parseFloat(vars.base) || 0, cache = {}, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars.axis, ratioX = from, ratioY = from;
        if (_isString(from)) ratioX = ratioY = {
            center: .5,
            edges: .5,
            end: 1
        }[from] || 0; else if (!isDecimal && ratios) {
            ratioX = from[0];
            ratioY = from[1];
        }
        return function(i, target, a) {
            var originX, originY, x, y, d, j, max, min, wrapAt, l = (a || vars).length, distances = cache[l];
            if (!distances) {
                wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [ 1, _bigNum ])[1];
                if (!wrapAt) {
                    max = -_bigNum;
                    while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) ;
                    wrapAt < l && wrapAt--;
                }
                distances = cache[l] = [];
                originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
                originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
                max = 0;
                min = _bigNum;
                for (j = 0; j < l; j++) {
                    x = j % wrapAt - originX;
                    y = originY - (j / wrapAt | 0);
                    distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs(axis === "y" ? y : x);
                    d > max && (max = d);
                    d < min && (min = d);
                }
                from === "random" && shuffle(distances);
                distances.max = max - min;
                distances.min = min;
                distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : axis === "y" ? l / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
                distances.b = l < 0 ? base - l : base;
                distances.u = getUnit(vars.amount || vars.each) || 0;
                ease = ease && l < 0 ? _invertEase(ease) : ease;
            }
            l = (distances[i] - distances.min) / distances.max || 0;
            return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u;
        };
    }, _roundModifier = function _roundModifier(v) {
        var p = Math.pow(10, ((v + "").split(".")[1] || "").length);
        return function(raw) {
            var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);
            return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw));
        };
    }, snap = function snap(snapTo, value) {
        var radius, is2D, isArray = _isArray(snapTo);
        if (!isArray && _isObject(snapTo)) {
            radius = isArray = snapTo.radius || _bigNum;
            if (snapTo.values) {
                snapTo = toArray(snapTo.values);
                if (is2D = !_isNumber(snapTo[0])) radius *= radius;
            } else snapTo = _roundModifier(snapTo.increment);
        }
        return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function(raw) {
            is2D = snapTo(raw);
            return Math.abs(is2D - raw) <= radius ? is2D : raw;
        } : function(raw) {
            var dx, dy, x = parseFloat(is2D ? raw.x : raw), y = parseFloat(is2D ? raw.y : 0), min = _bigNum, closest = 0, i = snapTo.length;
            while (i--) {
                if (is2D) {
                    dx = snapTo[i].x - x;
                    dy = snapTo[i].y - y;
                    dx = dx * dx + dy * dy;
                } else dx = Math.abs(snapTo[i] - x);
                if (dx < min) {
                    min = dx;
                    closest = i;
                }
            }
            closest = !radius || min <= radius ? snapTo[closest] : raw;
            return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
        });
    }, random = function random(min, max, roundingIncrement, returnFunction) {
        return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, (function() {
            return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * .99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
        }));
    }, pipe = function pipe() {
        for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) functions[_key] = arguments[_key];
        return function(value) {
            return functions.reduce((function(v, f) {
                return f(v);
            }), value);
        };
    }, unitize = function unitize(func, unit) {
        return function(value) {
            return func(parseFloat(value)) + (unit || getUnit(value));
        };
    }, normalize = function normalize(min, max, value) {
        return mapRange(min, max, 0, 1, value);
    }, _wrapArray = function _wrapArray(a, wrapper, value) {
        return _conditionalReturn(value, (function(index) {
            return a[~~wrapper(index)];
        }));
    }, wrap = function wrap(min, max, value) {
        var range = max - min;
        return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, (function(value) {
            return (range + (value - min) % range) % range + min;
        }));
    }, wrapYoyo = function wrapYoyo(min, max, value) {
        var range = max - min, total = range * 2;
        return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, (function(value) {
            value = (total + (value - min) % total) % total || 0;
            return min + (value > range ? total - value : value);
        }));
    }, _replaceRandom = function _replaceRandom(value) {
        var i, nums, end, isArray, prev = 0, s = "";
        while (~(i = value.indexOf("random(", prev))) {
            end = value.indexOf(")", i);
            isArray = value.charAt(i + 7) === "[";
            nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
            s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
            prev = end + 1;
        }
        return s + value.substr(prev, value.length - prev);
    }, mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
        var inRange = inMax - inMin, outRange = outMax - outMin;
        return _conditionalReturn(value, (function(value) {
            return outMin + ((value - inMin) / inRange * outRange || 0);
        }));
    }, interpolate = function interpolate(start, end, progress, mutate) {
        var func = isNaN(start + end) ? 0 : function(p) {
            return (1 - p) * start + p * end;
        };
        if (!func) {
            var p, i, interpolators, l, il, isString = _isString(start), master = {};
            progress === true && (mutate = 1) && (progress = null);
            if (isString) {
                start = {
                    p: start
                };
                end = {
                    p: end
                };
            } else if (_isArray(start) && !_isArray(end)) {
                interpolators = [];
                l = start.length;
                il = l - 2;
                for (i = 1; i < l; i++) interpolators.push(interpolate(start[i - 1], start[i]));
                l--;
                func = function func(p) {
                    p *= l;
                    var i = Math.min(il, ~~p);
                    return interpolators[i](p - i);
                };
                progress = end;
            } else if (!mutate) start = _merge(_isArray(start) ? [] : {}, start);
            if (!interpolators) {
                for (p in end) _addPropTween.call(master, start, p, "get", end[p]);
                func = function func(p) {
                    return _renderPropTweens(p, master) || (isString ? start.p : start);
                };
            }
        }
        return _conditionalReturn(progress, func);
    }, _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
        var p, distance, label, labels = timeline.labels, min = _bigNum;
        for (p in labels) {
            distance = labels[p] - fromTime;
            if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
                label = p;
                min = distance;
            }
        }
        return label;
    }, _callback = function _callback(animation, type, executeLazyFirst) {
        var params, scope, result, v = animation.vars, callback = v[type], prevContext = _context, context = animation._ctx;
        if (!callback) return;
        params = v[type + "Params"];
        scope = v.callbackScope || animation;
        executeLazyFirst && _lazyTweens.length && _lazyRender();
        context && (_context = context);
        result = params ? callback.apply(scope, params) : callback.call(scope);
        _context = prevContext;
        return result;
    }, _interrupt = function _interrupt(animation) {
        _removeFromParent(animation);
        animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
        animation.progress() < 1 && _callback(animation, "onInterrupt");
        return animation;
    }, _registerPluginQueue = [], _createPlugin = function _createPlugin(config) {
        if (!config) return;
        config = !config.name && config["default"] || config;
        if (_windowExists() || config.headless) {
            var name = config.name, isFunc = _isFunction(config), Plugin = name && !isFunc && config.init ? function() {
                this._props = [];
            } : config, instanceDefaults = {
                init: _emptyFunc,
                render: _renderPropTweens,
                add: _addPropTween,
                kill: _killPropTweensOf,
                modifier: _addPluginModifier,
                rawVars: 0
            }, statics = {
                targetTest: 0,
                get: 0,
                getSetter: _getSetter,
                aliases: {},
                register: 0
            };
            _wake();
            if (config !== Plugin) {
                if (_plugins[name]) return;
                _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics));
                _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics)));
                _plugins[Plugin.prop = name] = Plugin;
                if (config.targetTest) {
                    _harnessPlugins.push(Plugin);
                    _reservedProps[name] = 1;
                }
                name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
            }
            _addGlobal(name, Plugin);
            config.register && config.register(gsap, Plugin, PropTween);
        } else _registerPluginQueue.push(config);
    }, _255 = 255, _colorLookup = {
        aqua: [ 0, _255, _255 ],
        lime: [ 0, _255, 0 ],
        silver: [ 192, 192, 192 ],
        black: [ 0, 0, 0 ],
        maroon: [ 128, 0, 0 ],
        teal: [ 0, 128, 128 ],
        blue: [ 0, 0, _255 ],
        navy: [ 0, 0, 128 ],
        white: [ _255, _255, _255 ],
        olive: [ 128, 128, 0 ],
        yellow: [ _255, _255, 0 ],
        orange: [ _255, 165, 0 ],
        gray: [ 128, 128, 128 ],
        purple: [ 128, 0, 128 ],
        green: [ 0, 128, 0 ],
        red: [ _255, 0, 0 ],
        pink: [ _255, 192, 203 ],
        cyan: [ 0, _255, _255 ],
        transparent: [ _255, _255, _255, 0 ]
    }, _hue = function _hue(h, m1, m2) {
        h += h < 0 ? 1 : h > 1 ? -1 : 0;
        return (h * 6 < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : h * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
    }, splitColor = function splitColor(v, toHSL, forceAlpha) {
        var r, g, b, h, s, l, max, min, d, wasHSL, a = !v ? _colorLookup.black : _isNumber(v) ? [ v >> 16, v >> 8 & _255, v & _255 ] : 0;
        if (!a) {
            if (v.substr(-1) === ",") v = v.substr(0, v.length - 1);
            if (_colorLookup[v]) a = _colorLookup[v]; else if (v.charAt(0) === "#") {
                if (v.length < 6) {
                    r = v.charAt(1);
                    g = v.charAt(2);
                    b = v.charAt(3);
                    v = "#" + r + r + g + g + b + b + (v.length === 5 ? v.charAt(4) + v.charAt(4) : "");
                }
                if (v.length === 9) {
                    a = parseInt(v.substr(1, 6), 16);
                    return [ a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255 ];
                }
                v = parseInt(v.substr(1), 16);
                a = [ v >> 16, v >> 8 & _255, v & _255 ];
            } else if (v.substr(0, 3) === "hsl") {
                a = wasHSL = v.match(_strictNumExp);
                if (!toHSL) {
                    h = +a[0] % 360 / 360;
                    s = +a[1] / 100;
                    l = +a[2] / 100;
                    g = l <= .5 ? l * (s + 1) : l + s - l * s;
                    r = l * 2 - g;
                    a.length > 3 && (a[3] *= 1);
                    a[0] = _hue(h + 1 / 3, r, g);
                    a[1] = _hue(h, r, g);
                    a[2] = _hue(h - 1 / 3, r, g);
                } else if (~v.indexOf("=")) {
                    a = v.match(_numExp);
                    forceAlpha && a.length < 4 && (a[3] = 1);
                    return a;
                }
            } else a = v.match(_strictNumExp) || _colorLookup.transparent;
            a = a.map(Number);
        }
        if (toHSL && !wasHSL) {
            r = a[0] / _255;
            g = a[1] / _255;
            b = a[2] / _255;
            max = Math.max(r, g, b);
            min = Math.min(r, g, b);
            l = (max + min) / 2;
            if (max === min) h = s = 0; else {
                d = max - min;
                s = l > .5 ? d / (2 - max - min) : d / (max + min);
                h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
                h *= 60;
            }
            a[0] = ~~(h + .5);
            a[1] = ~~(s * 100 + .5);
            a[2] = ~~(l * 100 + .5);
        }
        forceAlpha && a.length < 4 && (a[3] = 1);
        return a;
    }, _colorOrderData = function _colorOrderData(v) {
        var values = [], c = [], i = -1;
        v.split(_colorExp).forEach((function(v) {
            var a = v.match(_numWithUnitExp) || [];
            values.push.apply(values, a);
            c.push(i += a.length + 1);
        }));
        values.c = c;
        return values;
    }, _formatColors = function _formatColors(s, toHSL, orderMatchData) {
        var c, shell, d, l, result = "", colors = (s + result).match(_colorExp), type = toHSL ? "hsla(" : "rgba(", i = 0;
        if (!colors) return s;
        colors = colors.map((function(color) {
            return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
        }));
        if (orderMatchData) {
            d = _colorOrderData(s);
            c = orderMatchData.c;
            if (c.join(result) !== d.c.join(result)) {
                shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
                l = shell.length - 1;
                for (;i < l; i++) result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
            }
        }
        if (!shell) {
            shell = s.split(_colorExp);
            l = shell.length - 1;
            for (;i < l; i++) result += shell[i] + colors[i];
        }
        return result + shell[l];
    }, _colorExp = function() {
        var p, s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
        for (p in _colorLookup) s += "|" + p + "\\b";
        return new RegExp(s + ")", "gi");
    }(), _hslExp = /hsl[a]?\(/, _colorStringFilter = function _colorStringFilter(a) {
        var toHSL, combined = a.join(" ");
        _colorExp.lastIndex = 0;
        if (_colorExp.test(combined)) {
            toHSL = _hslExp.test(combined);
            a[1] = _formatColors(a[1], toHSL);
            a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1]));
            return true;
        }
    }, _ticker = function() {
        var _id, _req, _raf, _self, _delta, _i, _getTime = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime(), _lastUpdate = _startTime, _gap = 1e3 / 240, _nextTime = _gap, _listeners = [], _tick = function _tick(v) {
            var overlap, dispatch, time, frame, elapsed = _getTime() - _lastUpdate, manual = v === true;
            (elapsed > _lagThreshold || elapsed < 0) && (_startTime += elapsed - _adjustedLag);
            _lastUpdate += elapsed;
            time = _lastUpdate - _startTime;
            overlap = time - _nextTime;
            if (overlap > 0 || manual) {
                frame = ++_self.frame;
                _delta = time - _self.time * 1e3;
                _self.time = time /= 1e3;
                _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
                dispatch = 1;
            }
            manual || (_id = _req(_tick));
            if (dispatch) for (_i = 0; _i < _listeners.length; _i++) _listeners[_i](time, _delta, frame, v);
        };
        _self = {
            time: 0,
            frame: 0,
            tick: function tick() {
                _tick(true);
            },
            deltaRatio: function deltaRatio(fps) {
                return _delta / (1e3 / (fps || 60));
            },
            wake: function wake() {
                if (_coreReady) {
                    if (!_coreInitted && _windowExists()) {
                        _win = _coreInitted = window;
                        _doc = _win.document || {};
                        _globals.gsap = gsap;
                        (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);
                        _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});
                        _registerPluginQueue.forEach(_createPlugin);
                    }
                    _raf = typeof requestAnimationFrame !== "undefined" && requestAnimationFrame;
                    _id && _self.sleep();
                    _req = _raf || function(f) {
                        return setTimeout(f, _nextTime - _self.time * 1e3 + 1 | 0);
                    };
                    _tickerActive = 1;
                    _tick(2);
                }
            },
            sleep: function sleep() {
                (_raf ? cancelAnimationFrame : clearTimeout)(_id);
                _tickerActive = 0;
                _req = _emptyFunc;
            },
            lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
                _lagThreshold = threshold || 1 / 0;
                _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
            },
            fps: function fps(_fps) {
                _gap = 1e3 / (_fps || 240);
                _nextTime = _self.time * 1e3 + _gap;
            },
            add: function add(callback, once, prioritize) {
                var func = once ? function(t, d, f, v) {
                    callback(t, d, f, v);
                    _self.remove(func);
                } : callback;
                _self.remove(callback);
                _listeners[prioritize ? "unshift" : "push"](func);
                _wake();
                return func;
            },
            remove: function remove(callback, i) {
                ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
            },
            _listeners
        };
        return _self;
    }(), _wake = function _wake() {
        return !_tickerActive && _ticker.wake();
    }, _easeMap = {}, _customEaseExp = /^[\d.\-M][\d.\-,\s]/, _quotesExp = /["']/g, _parseObjectInString = function _parseObjectInString(value) {
        var index, val, parsedVal, obj = {}, split = value.substr(1, value.length - 3).split(":"), key = split[0], i = 1, l = split.length;
        for (;i < l; i++) {
            val = split[i];
            index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
            parsedVal = val.substr(0, index);
            obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
            key = val.substr(index + 1).trim();
        }
        return obj;
    }, _valueInParentheses = function _valueInParentheses(value) {
        var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
        return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
    }, _configEaseFromString = function _configEaseFromString(name) {
        var split = (name + "").split("("), ease = _easeMap[split[0]];
        return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [ _parseObjectInString(split[1]) ] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
    }, _invertEase = function _invertEase(ease) {
        return function(p) {
            return 1 - ease(1 - p);
        };
    }, _propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
        var ease, child = timeline._first;
        while (child) {
            if (child instanceof Timeline) _propagateYoyoEase(child, isYoyo); else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) if (child.timeline) _propagateYoyoEase(child.timeline, isYoyo); else {
                ease = child._ease;
                child._ease = child._yEase;
                child._yEase = ease;
                child._yoyo = isYoyo;
            }
            child = child._next;
        }
    }, _parseEase = function _parseEase(ease, defaultEase) {
        return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
    }, _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
        if (easeOut === void 0) easeOut = function easeOut(p) {
            return 1 - easeIn(1 - p);
        };
        if (easeInOut === void 0) easeInOut = function easeInOut(p) {
            return p < .5 ? easeIn(p * 2) / 2 : 1 - easeIn((1 - p) * 2) / 2;
        };
        var lowercaseName, ease = {
            easeIn,
            easeOut,
            easeInOut
        };
        _forEachName(names, (function(name) {
            _easeMap[name] = _globals[name] = ease;
            _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
            for (var p in ease) _easeMap[lowercaseName + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
        }));
        return ease;
    }, _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
        return function(p) {
            return p < .5 ? (1 - easeOut(1 - p * 2)) / 2 : .5 + easeOut((p - .5) * 2) / 2;
        };
    }, _configElastic = function _configElastic(type, amplitude, period) {
        var p1 = amplitude >= 1 ? amplitude : 1, p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1), p3 = p2 / _2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut(p) {
            return p === 1 ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
        }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
            return 1 - easeOut(1 - p);
        } : _easeInOutFromOut(easeOut);
        p2 = _2PI / p2;
        ease.config = function(amplitude, period) {
            return _configElastic(type, amplitude, period);
        };
        return ease;
    }, _configBack = function _configBack(type, overshoot) {
        if (overshoot === void 0) overshoot = 1.70158;
        var easeOut = function easeOut(p) {
            return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
        }, ease = type === "out" ? easeOut : type === "in" ? function(p) {
            return 1 - easeOut(1 - p);
        } : _easeInOutFromOut(easeOut);
        ease.config = function(overshoot) {
            return _configBack(type, overshoot);
        };
        return ease;
    };
    _forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", (function(name, i) {
        var power = i < 5 ? i + 1 : i;
        _insertEase(name + ",Power" + (power - 1), i ? function(p) {
            return Math.pow(p, power);
        } : function(p) {
            return p;
        }, (function(p) {
            return 1 - Math.pow(1 - p, power);
        }), (function(p) {
            return p < .5 ? Math.pow(p * 2, power) / 2 : 1 - Math.pow((1 - p) * 2, power) / 2;
        }));
    }));
    _easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
    _insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
    (function(n, c) {
        var n1 = 1 / c, n2 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut(p) {
            return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
        };
        _insertEase("Bounce", (function(p) {
            return 1 - easeOut(1 - p);
        }), easeOut);
    })(7.5625, 2.75);
    _insertEase("Expo", (function(p) {
        return Math.pow(2, 10 * (p - 1)) * p + p * p * p * p * p * p * (1 - p);
    }));
    _insertEase("Circ", (function(p) {
        return -(_sqrt(1 - p * p) - 1);
    }));
    _insertEase("Sine", (function(p) {
        return p === 1 ? 1 : -_cos(p * _HALF_PI) + 1;
    }));
    _insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
    _easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
        config: function config(steps, immediateStart) {
            if (steps === void 0) steps = 1;
            var p1 = 1 / steps, p2 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max = 1 - _tinyNum;
            return function(p) {
                return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
            };
        }
    };
    _defaults.ease = _easeMap["quad.out"];
    _forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (function(name) {
        return _callbackNames += name + "," + name + "Params,";
    }));
    var GSCache = function GSCache(target, harness) {
        this.id = _gsID++;
        target._gsap = this;
        this.target = target;
        this.harness = harness;
        this.get = harness ? harness.get : _getProperty;
        this.set = harness ? harness.getSetter : _getSetter;
    };
    var Animation = function() {
        function Animation(vars) {
            this.vars = vars;
            this._delay = +vars.delay || 0;
            if (this._repeat = vars.repeat === 1 / 0 ? -2 : vars.repeat || 0) {
                this._rDelay = vars.repeatDelay || 0;
                this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
            }
            this._ts = 1;
            _setDuration(this, +vars.duration, 1, 1);
            this.data = vars.data;
            if (_context) {
                this._ctx = _context;
                _context.data.push(this);
            }
            _tickerActive || _ticker.wake();
        }
        var _proto = Animation.prototype;
        _proto.delay = function delay(value) {
            if (value || value === 0) {
                this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
                this._delay = value;
                return this;
            }
            return this._delay;
        };
        _proto.duration = function duration(value) {
            return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
        };
        _proto.totalDuration = function totalDuration(value) {
            if (!arguments.length) return this._tDur;
            this._dirty = 0;
            return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
        };
        _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
            _wake();
            if (!arguments.length) return this._tTime;
            var parent = this._dp;
            if (parent && parent.smoothChildTiming && this._ts) {
                _alignPlayhead(this, _totalTime);
                !parent._dp || parent.parent || _postAddChecks(parent, this);
                while (parent && parent.parent) {
                    if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) parent.totalTime(parent._tTime, true);
                    parent = parent.parent;
                }
                if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) _addToTimeline(this._dp, this, this._start - this._delay);
            }
            if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
                this._ts || (this._pTime = _totalTime);
                _lazySafeRender(this, _totalTime, suppressEvents);
            }
            return this;
        };
        _proto.time = function time(value, suppressEvents) {
            return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time;
        };
        _proto.totalProgress = function totalProgress(value, suppressEvents) {
            return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
        };
        _proto.progress = function progress(value, suppressEvents) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
        };
        _proto.iteration = function iteration(value, suppressEvents) {
            var cycleDuration = this.duration() + this._rDelay;
            return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
        };
        _proto.timeScale = function timeScale(value, suppressEvents) {
            if (!arguments.length) return this._rts === -_tinyNum ? 0 : this._rts;
            if (this._rts === value) return this;
            var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
            this._rts = +value || 0;
            this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
            this.totalTime(_clamp(-Math.abs(this._delay), this._tDur, tTime), suppressEvents !== false);
            _setEnd(this);
            return _recacheAncestors(this);
        };
        _proto.paused = function paused(value) {
            if (!arguments.length) return this._ps;
            if (this._ps !== value) {
                this._ps = value;
                if (value) {
                    this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
                    this._ts = this._act = 0;
                } else {
                    _wake();
                    this._ts = this._rts;
                    this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum));
                }
            }
            return this;
        };
        _proto.startTime = function startTime(value) {
            if (arguments.length) {
                this._start = value;
                var parent = this.parent || this._dp;
                parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
                return this;
            }
            return this._start;
        };
        _proto.endTime = function endTime(includeRepeats) {
            return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
        };
        _proto.rawTime = function rawTime(wrapRepeats) {
            var parent = this.parent || this._dp;
            return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
        };
        _proto.revert = function revert(config) {
            if (config === void 0) config = _revertConfig;
            var prevIsReverting = _reverting;
            _reverting = config;
            if (this._initted || this._startAt) {
                this.timeline && this.timeline.revert(config);
                this.totalTime(-.01, config.suppressEvents);
            }
            this.data !== "nested" && config.kill !== false && this.kill();
            _reverting = prevIsReverting;
            return this;
        };
        _proto.globalTime = function globalTime(rawTime) {
            var animation = this, time = arguments.length ? rawTime : animation.rawTime();
            while (animation) {
                time = animation._start + time / (Math.abs(animation._ts) || 1);
                animation = animation._dp;
            }
            return !this.parent && this._sat ? this._sat.globalTime(rawTime) : time;
        };
        _proto.repeat = function repeat(value) {
            if (arguments.length) {
                this._repeat = value === 1 / 0 ? -2 : value;
                return _onUpdateTotalDuration(this);
            }
            return this._repeat === -2 ? 1 / 0 : this._repeat;
        };
        _proto.repeatDelay = function repeatDelay(value) {
            if (arguments.length) {
                var time = this._time;
                this._rDelay = value;
                _onUpdateTotalDuration(this);
                return time ? this.time(time) : this;
            }
            return this._rDelay;
        };
        _proto.yoyo = function yoyo(value) {
            if (arguments.length) {
                this._yoyo = value;
                return this;
            }
            return this._yoyo;
        };
        _proto.seek = function seek(position, suppressEvents) {
            return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
        };
        _proto.restart = function restart(includeDelay, suppressEvents) {
            this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
            this._dur || (this._zTime = -_tinyNum);
            return this;
        };
        _proto.play = function play(from, suppressEvents) {
            from != null && this.seek(from, suppressEvents);
            return this.reversed(false).paused(false);
        };
        _proto.reverse = function reverse(from, suppressEvents) {
            from != null && this.seek(from || this.totalDuration(), suppressEvents);
            return this.reversed(true).paused(false);
        };
        _proto.pause = function pause(atTime, suppressEvents) {
            atTime != null && this.seek(atTime, suppressEvents);
            return this.paused(true);
        };
        _proto.resume = function resume() {
            return this.paused(false);
        };
        _proto.reversed = function reversed(value) {
            if (arguments.length) {
                !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
                return this;
            }
            return this._rts < 0;
        };
        _proto.invalidate = function invalidate() {
            this._initted = this._act = 0;
            this._zTime = -_tinyNum;
            return this;
        };
        _proto.isActive = function isActive() {
            var rawTime, parent = this.parent || this._dp, start = this._start;
            return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
        };
        _proto.eventCallback = function eventCallback(type, callback, params) {
            var vars = this.vars;
            if (arguments.length > 1) {
                if (!callback) delete vars[type]; else {
                    vars[type] = callback;
                    params && (vars[type + "Params"] = params);
                    type === "onUpdate" && (this._onUpdate = callback);
                }
                return this;
            }
            return vars[type];
        };
        _proto.then = function then(onFulfilled) {
            var self = this;
            return new Promise((function(resolve) {
                var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough, _resolve = function _resolve() {
                    var _then = self.then;
                    self.then = null;
                    _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
                    resolve(f);
                    self.then = _then;
                };
                if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) _resolve(); else self._prom = _resolve;
            }));
        };
        _proto.kill = function kill() {
            _interrupt(this);
        };
        return Animation;
    }();
    _setDefaults(Animation.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: false,
        parent: null,
        _initted: false,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -_tinyNum,
        _prom: 0,
        _ps: false,
        _rts: 1
    });
    var Timeline = function(_Animation) {
        _inheritsLoose(Timeline, _Animation);
        function Timeline(vars, position) {
            var _this;
            if (vars === void 0) vars = {};
            _this = _Animation.call(this, vars) || this;
            _this.labels = {};
            _this.smoothChildTiming = !!vars.smoothChildTiming;
            _this.autoRemoveChildren = !!vars.autoRemoveChildren;
            _this._sort = _isNotFalse(vars.sortChildren);
            _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
            vars.reversed && _this.reverse();
            vars.paused && _this.paused(true);
            vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
            return _this;
        }
        var _proto2 = Timeline.prototype;
        _proto2.to = function to(targets, vars, position) {
            _createTweenType(0, arguments, this);
            return this;
        };
        _proto2.from = function from(targets, vars, position) {
            _createTweenType(1, arguments, this);
            return this;
        };
        _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
            _createTweenType(2, arguments, this);
            return this;
        };
        _proto2.set = function set(targets, vars, position) {
            vars.duration = 0;
            vars.parent = this;
            _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
            vars.immediateRender = !!vars.immediateRender;
            new Tween(targets, vars, _parsePosition(this, position), 1);
            return this;
        };
        _proto2.call = function call(callback, params, position) {
            return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
        };
        _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
            vars.duration = duration;
            vars.stagger = vars.stagger || stagger;
            vars.onComplete = onCompleteAll;
            vars.onCompleteParams = onCompleteAllParams;
            vars.parent = this;
            new Tween(targets, vars, _parsePosition(this, position));
            return this;
        };
        _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
            vars.runBackwards = 1;
            _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
            return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
        };
        _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
            toVars.startAt = fromVars;
            _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
            return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
        };
        _proto2.render = function render(totalTime, suppressEvents, force) {
            var time, child, next, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo, prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime), crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur);
            this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
            if (tTime !== this._tTime || force || crossingStart) {
                if (prevTime !== this._time && dur) {
                    tTime += this._time - prevTime;
                    totalTime += this._time - prevTime;
                }
                time = tTime;
                prevStart = this._start;
                timeScale = this._ts;
                prevPaused = !timeScale;
                if (crossingStart) {
                    dur || (prevTime = this._zTime);
                    (totalTime || !suppressEvents) && (this._zTime = totalTime);
                }
                if (this._repeat) {
                    yoyo = this._yoyo;
                    cycleDuration = dur + this._rDelay;
                    if (this._repeat < -1 && totalTime < 0) return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
                    time = _roundPrecise(tTime % cycleDuration);
                    if (tTime === tDur) {
                        iteration = this._repeat;
                        time = dur;
                    } else {
                        prevIteration = _roundPrecise(tTime / cycleDuration);
                        iteration = ~~prevIteration;
                        if (iteration && iteration === prevIteration) {
                            time = dur;
                            iteration--;
                        }
                        time > dur && (time = dur);
                    }
                    prevIteration = _animationCycle(this._tTime, cycleDuration);
                    !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration);
                    if (yoyo && iteration & 1) {
                        time = dur - time;
                        isYoyo = 1;
                    }
                    if (iteration !== prevIteration && !this._lock) {
                        var rewinding = yoyo && prevIteration & 1, doesWrap = rewinding === (yoyo && iteration & 1);
                        iteration < prevIteration && (rewinding = !rewinding);
                        prevTime = rewinding ? 0 : tTime % dur ? dur : tTime;
                        this._lock = 1;
                        this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
                        this._tTime = tTime;
                        !suppressEvents && this.parent && _callback(this, "onRepeat");
                        this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
                        if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;
                        dur = this._dur;
                        tDur = this._tDur;
                        if (doesWrap) {
                            this._lock = 2;
                            prevTime = rewinding ? dur : -1e-4;
                            this.render(prevTime, true);
                            this.vars.repeatRefresh && !isYoyo && this.invalidate();
                        }
                        this._lock = 0;
                        if (!this._ts && !prevPaused) return this;
                        _propagateYoyoEase(this, isYoyo);
                    }
                }
                if (this._hasPause && !this._forcing && this._lock < 2) {
                    pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
                    if (pauseTween) tTime -= time - (time = pauseTween._start);
                }
                this._tTime = tTime;
                this._time = time;
                this._act = !timeScale;
                if (!this._initted) {
                    this._onUpdate = this.vars.onUpdate;
                    this._initted = 1;
                    this._zTime = totalTime;
                    prevTime = 0;
                }
                if (!prevTime && time && !suppressEvents && !iteration) {
                    _callback(this, "onStart");
                    if (this._tTime !== tTime) return this;
                }
                if (time >= prevTime && totalTime >= 0) {
                    child = this._first;
                    while (child) {
                        next = child._next;
                        if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
                            if (child.parent !== this) return this.render(totalTime, suppressEvents, force);
                            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
                            if (time !== this._time || !this._ts && !prevPaused) {
                                pauseTween = 0;
                                next && (tTime += this._zTime = -_tinyNum);
                                break;
                            }
                        }
                        child = next;
                    }
                } else {
                    child = this._last;
                    var adjustedTime = totalTime < 0 ? totalTime : time;
                    while (child) {
                        next = child._prev;
                        if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
                            if (child.parent !== this) return this.render(totalTime, suppressEvents, force);
                            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && (child._initted || child._startAt));
                            if (time !== this._time || !this._ts && !prevPaused) {
                                pauseTween = 0;
                                next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
                                break;
                            }
                        }
                        child = next;
                    }
                }
                if (pauseTween && !suppressEvents) {
                    this.pause();
                    pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
                    if (this._ts) {
                        this._start = prevStart;
                        _setEnd(this);
                        return this.render(totalTime, suppressEvents, force);
                    }
                }
                this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
                if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
                    (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
                    if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
                        _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
                        this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
                    }
                }
            }
            return this;
        };
        _proto2.add = function add(child, position) {
            var _this2 = this;
            _isNumber(position) || (position = _parsePosition(this, position, child));
            if (!(child instanceof Animation)) {
                if (_isArray(child)) {
                    child.forEach((function(obj) {
                        return _this2.add(obj, position);
                    }));
                    return this;
                }
                if (_isString(child)) return this.addLabel(child, position);
                if (_isFunction(child)) child = Tween.delayedCall(0, child); else return this;
            }
            return this !== child ? _addToTimeline(this, child, position) : this;
        };
        _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
            if (nested === void 0) nested = true;
            if (tweens === void 0) tweens = true;
            if (timelines === void 0) timelines = true;
            if (ignoreBeforeTime === void 0) ignoreBeforeTime = -_bigNum;
            var a = [], child = this._first;
            while (child) {
                if (child._start >= ignoreBeforeTime) if (child instanceof Tween) tweens && a.push(child); else {
                    timelines && a.push(child);
                    nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
                }
                child = child._next;
            }
            return a;
        };
        _proto2.getById = function getById(id) {
            var animations = this.getChildren(1, 1, 1), i = animations.length;
            while (i--) if (animations[i].vars.id === id) return animations[i];
        };
        _proto2.remove = function remove(child) {
            if (_isString(child)) return this.removeLabel(child);
            if (_isFunction(child)) return this.killTweensOf(child);
            child.parent === this && _removeLinkedListItem(this, child);
            if (child === this._recent) this._recent = this._last;
            return _uncache(this);
        };
        _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
            if (!arguments.length) return this._tTime;
            this._forcing = 1;
            if (!this._dp && this._ts) this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
            _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
            this._forcing = 0;
            return this;
        };
        _proto2.addLabel = function addLabel(label, position) {
            this.labels[label] = _parsePosition(this, position);
            return this;
        };
        _proto2.removeLabel = function removeLabel(label) {
            delete this.labels[label];
            return this;
        };
        _proto2.addPause = function addPause(position, callback, params) {
            var t = Tween.delayedCall(0, callback || _emptyFunc, params);
            t.data = "isPause";
            this._hasPause = 1;
            return _addToTimeline(this, t, _parsePosition(this, position));
        };
        _proto2.removePause = function removePause(position) {
            var child = this._first;
            position = _parsePosition(this, position);
            while (child) {
                if (child._start === position && child.data === "isPause") _removeFromParent(child);
                child = child._next;
            }
        };
        _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
            var tweens = this.getTweensOf(targets, onlyActive), i = tweens.length;
            while (i--) _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
            return this;
        };
        _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
            var children, a = [], parsedTargets = toArray(targets), child = this._first, isGlobalTime = _isNumber(onlyActive);
            while (child) {
                if (child instanceof Tween) {
                    if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) a.push(child);
                } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) a.push.apply(a, children);
                child = child._next;
            }
            return a;
        };
        _proto2.tweenTo = function tweenTo(position, vars) {
            vars = vars || {};
            var initted, tl = this, endTime = _parsePosition(tl, position), _vars = vars, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, tween = Tween.to(tl, _setDefaults({
                ease: vars.ease || "none",
                lazy: false,
                immediateRender: false,
                time: endTime,
                overwrite: "auto",
                duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
                onStart: function onStart() {
                    tl.pause();
                    if (!initted) {
                        var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
                        tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
                        initted = 1;
                    }
                    _onStart && _onStart.apply(tween, onStartParams || []);
                }
            }, vars));
            return immediateRender ? tween.render(0) : tween;
        };
        _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
            return this.tweenTo(toPosition, _setDefaults({
                startAt: {
                    time: _parsePosition(this, fromPosition)
                }
            }, vars));
        };
        _proto2.recent = function recent() {
            return this._recent;
        };
        _proto2.nextLabel = function nextLabel(afterTime) {
            if (afterTime === void 0) afterTime = this._time;
            return _getLabelInDirection(this, _parsePosition(this, afterTime));
        };
        _proto2.previousLabel = function previousLabel(beforeTime) {
            if (beforeTime === void 0) beforeTime = this._time;
            return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
        };
        _proto2.currentLabel = function currentLabel(value) {
            return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
        };
        _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
            if (ignoreBeforeTime === void 0) ignoreBeforeTime = 0;
            var p, child = this._first, labels = this.labels;
            while (child) {
                if (child._start >= ignoreBeforeTime) {
                    child._start += amount;
                    child._end += amount;
                }
                child = child._next;
            }
            if (adjustLabels) for (p in labels) if (labels[p] >= ignoreBeforeTime) labels[p] += amount;
            return _uncache(this);
        };
        _proto2.invalidate = function invalidate(soft) {
            var child = this._first;
            this._lock = 0;
            while (child) {
                child.invalidate(soft);
                child = child._next;
            }
            return _Animation.prototype.invalidate.call(this, soft);
        };
        _proto2.clear = function clear(includeLabels) {
            if (includeLabels === void 0) includeLabels = true;
            var next, child = this._first;
            while (child) {
                next = child._next;
                this.remove(child);
                child = next;
            }
            this._dp && (this._time = this._tTime = this._pTime = 0);
            includeLabels && (this.labels = {});
            return _uncache(this);
        };
        _proto2.totalDuration = function totalDuration(value) {
            var prev, start, parent, max = 0, self = this, child = self._last, prevStart = _bigNum;
            if (arguments.length) return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
            if (self._dirty) {
                parent = self.parent;
                while (child) {
                    prev = child._prev;
                    child._dirty && child.totalDuration();
                    start = child._start;
                    if (start > prevStart && self._sort && child._ts && !self._lock) {
                        self._lock = 1;
                        _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
                    } else prevStart = start;
                    if (start < 0 && child._ts) {
                        max -= start;
                        if (!parent && !self._dp || parent && parent.smoothChildTiming) {
                            self._start += start / self._ts;
                            self._time -= start;
                            self._tTime -= start;
                        }
                        self.shiftChildren(-start, false, -Infinity);
                        prevStart = 0;
                    }
                    child._end > max && child._ts && (max = child._end);
                    child = prev;
                }
                _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);
                self._dirty = 0;
            }
            return self._tDur;
        };
        Timeline.updateRoot = function updateRoot(time) {
            if (_globalTimeline._ts) {
                _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
                _lastRenderedFrame = _ticker.frame;
            }
            if (_ticker.frame >= _nextGCFrame) {
                _nextGCFrame += _config.autoSleep || 120;
                var child = _globalTimeline._first;
                if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
                    while (child && !child._ts) child = child._next;
                    child || _ticker.sleep();
                }
            }
        };
        return Timeline;
    }(Animation);
    _setDefaults(Timeline.prototype, {
        _lock: 0,
        _hasPause: 0,
        _forcing: 0
    });
    var _overwritingTween, _forceAllPropTweens, _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
        var result, startNums, color, endNum, chunk, startNum, hasRandom, a, pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter), index = 0, matchIndex = 0;
        pt.b = start;
        pt.e = end;
        start += "";
        end += "";
        if (hasRandom = ~end.indexOf("random(")) end = _replaceRandom(end);
        if (stringFilter) {
            a = [ start, end ];
            stringFilter(a, target, prop);
            start = a[0];
            end = a[1];
        }
        startNums = start.match(_complexStringNumExp) || [];
        while (result = _complexStringNumExp.exec(end)) {
            endNum = result[0];
            chunk = end.substring(index, result.index);
            if (color) color = (color + 1) % 5; else if (chunk.substr(-5) === "rgba(") color = 1;
            if (endNum !== startNums[matchIndex++]) {
                startNum = parseFloat(startNums[matchIndex - 1]) || 0;
                pt._pt = {
                    _next: pt._pt,
                    p: chunk || matchIndex === 1 ? chunk : ",",
                    s: startNum,
                    c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
                    m: color && color < 4 ? Math.round : 0
                };
                index = _complexStringNumExp.lastIndex;
            }
        }
        pt.c = index < end.length ? end.substring(index, end.length) : "";
        pt.fp = funcParam;
        if (_relExp.test(end) || hasRandom) pt.e = 0;
        this._pt = pt;
        return pt;
    }, _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
        _isFunction(end) && (end = end(index || 0, target, targets));
        var pt, currentValue = target[prop], parsedStart = start !== "get" ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc;
        if (_isString(end)) {
            if (~end.indexOf("random(")) end = _replaceRandom(end);
            if (end.charAt(1) === "=") {
                pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
                if (pt || pt === 0) end = pt;
            }
        }
        if (!optional || parsedStart !== end || _forceAllPropTweens) {
            if (!isNaN(parsedStart * end) && end !== "") {
                pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
                funcParam && (pt.fp = funcParam);
                modifier && pt.modifier(modifier, this, target);
                return this._pt = pt;
            }
            !currentValue && !(prop in target) && _missingPlugin(prop, end);
            return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
        }
    }, _processVars = function _processVars(vars, index, target, targets, tween) {
        _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
        if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
        var p, copy = {};
        for (p in vars) copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
        return copy;
    }, _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
        var plugin, pt, ptLookup, i;
        if (_plugins[property] && (plugin = new _plugins[property]).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
            tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
            if (tween !== _quickTween) {
                ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
                i = plugin._props.length;
                while (i--) ptLookup[plugin._props[i]] = pt;
            }
        }
        return plugin;
    }, _initTween = function _initTween(tween, time, tTime) {
        var cleanVars, i, p, pt, target, hasPriority, gsData, harness, plugin, ptLookup, index, harnessVars, overwritten, vars = tween.vars, ease = vars.ease, startAt = vars.startAt, immediateRender = vars.immediateRender, lazy = vars.lazy, onUpdate = vars.onUpdate, runBackwards = vars.runBackwards, yoyoEase = vars.yoyoEase, keyframes = vars.keyframes, autoRevert = vars.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets, autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites, tl = tween.timeline;
        tl && (!keyframes || !ease) && (ease = "none");
        tween._ease = _parseEase(ease, _defaults.ease);
        tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults.ease)) : 0;
        if (yoyoEase && tween._yoyo && !tween._repeat) {
            yoyoEase = tween._yEase;
            tween._yEase = tween._ease;
            tween._ease = yoyoEase;
        }
        tween._from = !tl && !!vars.runBackwards;
        if (!tl || keyframes && !vars.stagger) {
            harness = targets[0] ? _getCache(targets[0]).harness : 0;
            harnessVars = harness && vars[harness.prop];
            cleanVars = _copyExcluding(vars, _reservedProps);
            if (prevStartAt) {
                prevStartAt._zTime < 0 && prevStartAt.progress(1);
                time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig);
                prevStartAt._lazy = 0;
            }
            if (startAt) {
                _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
                    data: "isStart",
                    overwrite: false,
                    parent,
                    immediateRender: true,
                    lazy: !prevStartAt && _isNotFalse(lazy),
                    startAt: null,
                    delay: 0,
                    onUpdate: onUpdate && function() {
                        return _callback(tween, "onUpdate");
                    },
                    stagger: 0
                }, startAt)));
                tween._startAt._dp = 0;
                tween._startAt._sat = tween;
                time < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill);
                if (immediateRender) if (dur && time <= 0 && tTime <= 0) {
                    time && (tween._zTime = time);
                    return;
                }
            } else if (runBackwards && dur) if (!prevStartAt) {
                time && (immediateRender = false);
                p = _setDefaults({
                    overwrite: false,
                    data: "isFromStart",
                    lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
                    immediateRender,
                    stagger: 0,
                    parent
                }, cleanVars);
                harnessVars && (p[harness.prop] = harnessVars);
                _removeFromParent(tween._startAt = Tween.set(targets, p));
                tween._startAt._dp = 0;
                tween._startAt._sat = tween;
                time < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
                tween._zTime = time;
                if (!immediateRender) _initTween(tween._startAt, _tinyNum, _tinyNum); else if (!time) return;
            }
            tween._pt = tween._ptCache = 0;
            lazy = dur && _isNotFalse(lazy) || lazy && !dur;
            for (i = 0; i < targets.length; i++) {
                target = targets[i];
                gsData = target._gsap || _harness(targets)[i]._gsap;
                tween._ptLookup[i] = ptLookup = {};
                _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
                index = fullTargets === targets ? i : fullTargets.indexOf(target);
                if (harness && (plugin = new harness).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
                    tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
                    plugin._props.forEach((function(name) {
                        ptLookup[name] = pt;
                    }));
                    plugin.priority && (hasPriority = 1);
                }
                if (!harness || harnessVars) for (p in cleanVars) if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) plugin.priority && (hasPriority = 1); else ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
                tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
                if (autoOverwrite && tween._pt) {
                    _overwritingTween = tween;
                    _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time));
                    overwritten = !tween.parent;
                    _overwritingTween = 0;
                }
                tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
            }
            hasPriority && _sortPropTweensByPriority(tween);
            tween._onInit && tween._onInit(tween);
        }
        tween._onUpdate = onUpdate;
        tween._initted = (!tween._op || tween._pt) && !overwritten;
        keyframes && time <= 0 && tl.render(_bigNum, true, true);
    }, _updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time, skipRecursion) {
        var pt, rootPT, lookup, i, ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property];
        if (!ptCache) {
            ptCache = tween._ptCache[property] = [];
            lookup = tween._ptLookup;
            i = tween._targets.length;
            while (i--) {
                pt = lookup[i][property];
                if (pt && pt.d && pt.d._pt) {
                    pt = pt.d._pt;
                    while (pt && pt.p !== property && pt.fp !== property) pt = pt._next;
                }
                if (!pt) {
                    _forceAllPropTweens = 1;
                    tween.vars[property] = "+=0";
                    _initTween(tween, time);
                    _forceAllPropTweens = 0;
                    return skipRecursion ? _warn(property + " not eligible for reset") : 1;
                }
                ptCache.push(pt);
            }
        }
        i = ptCache.length;
        while (i--) {
            rootPT = ptCache[i];
            pt = rootPT._pt || rootPT;
            pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
            pt.c = value - pt.s;
            rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e));
            rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b));
        }
    }, _addAliasesToVars = function _addAliasesToVars(targets, vars) {
        var copy, p, i, aliases, harness = targets[0] ? _getCache(targets[0]).harness : 0, propertyAliases = harness && harness.aliases;
        if (!propertyAliases) return vars;
        copy = _merge({}, vars);
        for (p in propertyAliases) if (p in copy) {
            aliases = propertyAliases[p].split(",");
            i = aliases.length;
            while (i--) copy[aliases[i]] = copy[p];
        }
        return copy;
    }, _parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
        var p, a, ease = obj.ease || easeEach || "power1.inOut";
        if (_isArray(obj)) {
            a = allProps[prop] || (allProps[prop] = []);
            obj.forEach((function(value, i) {
                return a.push({
                    t: i / (obj.length - 1) * 100,
                    v: value,
                    e: ease
                });
            }));
        } else for (p in obj) {
            a = allProps[p] || (allProps[p] = []);
            p === "ease" || a.push({
                t: parseFloat(prop),
                v: obj[p],
                e: ease
            });
        }
    }, _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
        return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
    }, _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", _staggerPropsToSkip = {};
    _forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", (function(name) {
        return _staggerPropsToSkip[name] = 1;
    }));
    var Tween = function(_Animation2) {
        _inheritsLoose(Tween, _Animation2);
        function Tween(targets, vars, position, skipInherit) {
            var _this3;
            if (typeof vars === "number") {
                position.duration = vars;
                vars = position;
                position = null;
            }
            _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
            var tl, i, copy, l, p, curTarget, staggerFunc, staggerVarsToMerge, _this3$vars = _this3.vars, duration = _this3$vars.duration, delay = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars.parent || _globalTimeline, parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [ targets ] : toArray(targets);
            _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://gsap.com", !_config.nullTargetWarn) || [];
            _this3._ptLookup = [];
            _this3._overwrite = overwrite;
            if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
                vars = _this3.vars;
                tl = _this3.timeline = new Timeline({
                    data: "nested",
                    defaults: defaults || {},
                    targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
                });
                tl.kill();
                tl.parent = tl._dp = _assertThisInitialized(_this3);
                tl._start = 0;
                if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
                    l = parsedTargets.length;
                    staggerFunc = stagger && distribute(stagger);
                    if (_isObject(stagger)) for (p in stagger) if (~_staggerTweenProps.indexOf(p)) {
                        staggerVarsToMerge || (staggerVarsToMerge = {});
                        staggerVarsToMerge[p] = stagger[p];
                    }
                    for (i = 0; i < l; i++) {
                        copy = _copyExcluding(vars, _staggerPropsToSkip);
                        copy.stagger = 0;
                        yoyoEase && (copy.yoyoEase = yoyoEase);
                        staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
                        curTarget = parsedTargets[i];
                        copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
                        copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
                        if (!stagger && l === 1 && copy.delay) {
                            _this3._delay = delay = copy.delay;
                            _this3._start += delay;
                            copy.delay = 0;
                        }
                        tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
                        tl._ease = _easeMap.none;
                    }
                    tl.duration() ? duration = delay = 0 : _this3.timeline = 0;
                } else if (keyframes) {
                    _inheritDefaults(_setDefaults(tl.vars.defaults, {
                        ease: "none"
                    }));
                    tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
                    var a, kf, v, time = 0;
                    if (_isArray(keyframes)) {
                        keyframes.forEach((function(frame) {
                            return tl.to(parsedTargets, frame, ">");
                        }));
                        tl.duration();
                    } else {
                        copy = {};
                        for (p in keyframes) p === "ease" || p === "easeEach" || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
                        for (p in copy) {
                            a = copy[p].sort((function(a, b) {
                                return a.t - b.t;
                            }));
                            time = 0;
                            for (i = 0; i < a.length; i++) {
                                kf = a[i];
                                v = {
                                    ease: kf.e,
                                    duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
                                };
                                v[p] = kf.v;
                                tl.to(parsedTargets, v, time);
                                time += v.duration;
                            }
                        }
                        tl.duration() < duration && tl.to({}, {
                            duration: duration - tl.duration()
                        });
                    }
                }
                duration || _this3.duration(duration = tl.duration());
            } else _this3.timeline = 0;
            if (overwrite === true && !_suppressOverwrites) {
                _overwritingTween = _assertThisInitialized(_this3);
                _globalTimeline.killTweensOf(parsedTargets);
                _overwritingTween = 0;
            }
            _addToTimeline(parent, _assertThisInitialized(_this3), position);
            vars.reversed && _this3.reverse();
            vars.paused && _this3.paused(true);
            if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
                _this3._tTime = -_tinyNum;
                _this3.render(Math.max(0, -delay) || 0);
            }
            scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
            return _this3;
        }
        var _proto3 = Tween.prototype;
        _proto3.render = function render(totalTime, suppressEvents, force) {
            var time, pt, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline, yoyoEase, prevTime = this._time, tDur = this._tDur, dur = this._dur, isNegative = totalTime < 0, tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime;
            if (!dur) _renderZeroDurationTween(this, totalTime, suppressEvents, force); else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative || this._lazy) {
                time = tTime;
                timeline = this.timeline;
                if (this._repeat) {
                    cycleDuration = dur + this._rDelay;
                    if (this._repeat < -1 && isNegative) return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
                    time = _roundPrecise(tTime % cycleDuration);
                    if (tTime === tDur) {
                        iteration = this._repeat;
                        time = dur;
                    } else {
                        prevIteration = _roundPrecise(tTime / cycleDuration);
                        iteration = ~~prevIteration;
                        if (iteration && iteration === prevIteration) {
                            time = dur;
                            iteration--;
                        } else if (time > dur) time = dur;
                    }
                    isYoyo = this._yoyo && iteration & 1;
                    if (isYoyo) {
                        yoyoEase = this._yEase;
                        time = dur - time;
                    }
                    prevIteration = _animationCycle(this._tTime, cycleDuration);
                    if (time === prevTime && !force && this._initted && iteration === prevIteration) {
                        this._tTime = tTime;
                        return this;
                    }
                    if (iteration !== prevIteration) {
                        timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo);
                        if (this.vars.repeatRefresh && !isYoyo && !this._lock && time !== cycleDuration && this._initted) {
                            this._lock = force = 1;
                            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
                        }
                    }
                }
                if (!this._initted) {
                    if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
                        this._tTime = 0;
                        return this;
                    }
                    if (prevTime !== this._time && !(force && this.vars.repeatRefresh && iteration !== prevIteration)) return this;
                    if (dur !== this._dur) return this.render(totalTime, suppressEvents, force);
                }
                this._tTime = tTime;
                this._time = time;
                if (!this._act && this._ts) {
                    this._act = 1;
                    this._lazy = 0;
                }
                this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
                if (this._from) this.ratio = ratio = 1 - ratio;
                if (time && !prevTime && !suppressEvents && !iteration) {
                    _callback(this, "onStart");
                    if (this._tTime !== tTime) return this;
                }
                pt = this._pt;
                while (pt) {
                    pt.r(ratio, pt.d);
                    pt = pt._next;
                }
                timeline && timeline.render(totalTime < 0 ? totalTime : timeline._dur * timeline._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
                if (this._onUpdate && !suppressEvents) {
                    isNegative && _rewindStartAt(this, totalTime, suppressEvents, force);
                    _callback(this, "onUpdate");
                }
                this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");
                if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
                    isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
                    (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
                    if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
                        _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
                        this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
                    }
                }
            }
            return this;
        };
        _proto3.targets = function targets() {
            return this._targets;
        };
        _proto3.invalidate = function invalidate(soft) {
            (!soft || !this.vars.runBackwards) && (this._startAt = 0);
            this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
            this._ptLookup = [];
            this.timeline && this.timeline.invalidate(soft);
            return _Animation2.prototype.invalidate.call(this, soft);
        };
        _proto3.resetTo = function resetTo(property, value, start, startIsRelative, skipRecursion) {
            _tickerActive || _ticker.wake();
            this._ts || this.play();
            var ratio, time = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
            this._initted || _initTween(this, time);
            ratio = this._ease(time / this._dur);
            if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time, skipRecursion)) return this.resetTo(property, value, start, startIsRelative, 1);
            _alignPlayhead(this, 0);
            this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
            return this.render(0);
        };
        _proto3.kill = function kill(targets, vars) {
            if (vars === void 0) vars = "all";
            if (!targets && (!vars || vars === "all")) {
                this._lazy = this._pt = 0;
                this.parent ? _interrupt(this) : this.scrollTrigger && this.scrollTrigger.kill(!!_reverting);
                return this;
            }
            if (this.timeline) {
                var tDur = this.timeline.totalDuration();
                this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this);
                this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
                return this;
            }
            var overwrittenProps, curLookup, curOverwriteProps, props, p, pt, i, parsedTargets = this._targets, killingTargets = targets ? toArray(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt;
            if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
                vars === "all" && (this._pt = 0);
                return _interrupt(this);
            }
            overwrittenProps = this._op = this._op || [];
            if (vars !== "all") {
                if (_isString(vars)) {
                    p = {};
                    _forEachName(vars, (function(name) {
                        return p[name] = 1;
                    }));
                    vars = p;
                }
                vars = _addAliasesToVars(parsedTargets, vars);
            }
            i = parsedTargets.length;
            while (i--) if (~killingTargets.indexOf(parsedTargets[i])) {
                curLookup = propTweenLookup[i];
                if (vars === "all") {
                    overwrittenProps[i] = vars;
                    props = curLookup;
                    curOverwriteProps = {};
                } else {
                    curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
                    props = vars;
                }
                for (p in props) {
                    pt = curLookup && curLookup[p];
                    if (pt) {
                        if (!("kill" in pt.d) || pt.d.kill(p) === true) _removeLinkedListItem(this, pt, "_pt");
                        delete curLookup[p];
                    }
                    if (curOverwriteProps !== "all") curOverwriteProps[p] = 1;
                }
            }
            this._initted && !this._pt && firstPT && _interrupt(this);
            return this;
        };
        Tween.to = function to(targets, vars) {
            return new Tween(targets, vars, arguments[2]);
        };
        Tween.from = function from(targets, vars) {
            return _createTweenType(1, arguments);
        };
        Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
            return new Tween(callback, 0, {
                immediateRender: false,
                lazy: false,
                overwrite: false,
                delay,
                onComplete: callback,
                onReverseComplete: callback,
                onCompleteParams: params,
                onReverseCompleteParams: params,
                callbackScope: scope
            });
        };
        Tween.fromTo = function fromTo(targets, fromVars, toVars) {
            return _createTweenType(2, arguments);
        };
        Tween.set = function set(targets, vars) {
            vars.duration = 0;
            vars.repeatDelay || (vars.repeat = 0);
            return new Tween(targets, vars);
        };
        Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
            return _globalTimeline.killTweensOf(targets, props, onlyActive);
        };
        return Tween;
    }(Animation);
    _setDefaults(Tween.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0
    });
    _forEachName("staggerTo,staggerFrom,staggerFromTo", (function(name) {
        Tween[name] = function() {
            var tl = new Timeline, params = _slice.call(arguments, 0);
            params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
            return tl[name].apply(tl, params);
        };
    }));
    var _setterPlain = function _setterPlain(target, property, value) {
        return target[property] = value;
    }, _setterFunc = function _setterFunc(target, property, value) {
        return target[property](value);
    }, _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
        return target[property](data.fp, value);
    }, _setterAttribute = function _setterAttribute(target, property, value) {
        return target.setAttribute(property, value);
    }, _getSetter = function _getSetter(target, property) {
        return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
    }, _renderPlain = function _renderPlain(ratio, data) {
        return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e6) / 1e6, data);
    }, _renderBoolean = function _renderBoolean(ratio, data) {
        return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
    }, _renderComplexString = function _renderComplexString(ratio, data) {
        var pt = data._pt, s = "";
        if (!ratio && data.b) s = data.b; else if (ratio === 1 && data.e) s = data.e; else {
            while (pt) {
                s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 1e4) / 1e4) + s;
                pt = pt._next;
            }
            s += data.c;
        }
        data.set(data.t, data.p, s, data);
    }, _renderPropTweens = function _renderPropTweens(ratio, data) {
        var pt = data._pt;
        while (pt) {
            pt.r(ratio, pt.d);
            pt = pt._next;
        }
    }, _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
        var next, pt = this._pt;
        while (pt) {
            next = pt._next;
            pt.p === property && pt.modifier(modifier, tween, target);
            pt = next;
        }
    }, _killPropTweensOf = function _killPropTweensOf(property) {
        var hasNonDependentRemaining, next, pt = this._pt;
        while (pt) {
            next = pt._next;
            if (pt.p === property && !pt.op || pt.op === property) _removeLinkedListItem(this, pt, "_pt"); else if (!pt.dep) hasNonDependentRemaining = 1;
            pt = next;
        }
        return !hasNonDependentRemaining;
    }, _setterWithModifier = function _setterWithModifier(target, property, value, data) {
        data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
    }, _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
        var next, pt2, first, last, pt = parent._pt;
        while (pt) {
            next = pt._next;
            pt2 = first;
            while (pt2 && pt2.pr > pt.pr) pt2 = pt2._next;
            if (pt._prev = pt2 ? pt2._prev : last) pt._prev._next = pt; else first = pt;
            if (pt._next = pt2) pt2._prev = pt; else last = pt;
            pt = next;
        }
        parent._pt = first;
    };
    var PropTween = function() {
        function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
            this.t = target;
            this.s = start;
            this.c = change;
            this.p = prop;
            this.r = renderer || _renderPlain;
            this.d = data || this;
            this.set = setter || _setterPlain;
            this.pr = priority || 0;
            this._next = next;
            if (next) next._prev = this;
        }
        var _proto4 = PropTween.prototype;
        _proto4.modifier = function modifier(func, tween, target) {
            this.mSet = this.mSet || this.set;
            this.set = _setterWithModifier;
            this.m = func;
            this.mt = target;
            this.tween = tween;
        };
        return PropTween;
    }();
    _forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (function(name) {
        return _reservedProps[name] = 1;
    }));
    _globals.TweenMax = _globals.TweenLite = Tween;
    _globals.TimelineLite = _globals.TimelineMax = Timeline;
    _globalTimeline = new Timeline({
        sortChildren: false,
        defaults: _defaults,
        autoRemoveChildren: true,
        id: "root",
        smoothChildTiming: true
    });
    _config.stringFilter = _colorStringFilter;
    var _media = [], _listeners = {}, _emptyArray = [], _lastMediaTime = 0, _contextID = 0, _dispatch = function _dispatch(type) {
        return (_listeners[type] || _emptyArray).map((function(f) {
            return f();
        }));
    }, _onMediaChange = function _onMediaChange() {
        var time = Date.now(), matches = [];
        if (time - _lastMediaTime > 2) {
            _dispatch("matchMediaInit");
            _media.forEach((function(c) {
                var match, p, anyMatch, toggled, queries = c.queries, conditions = c.conditions;
                for (p in queries) {
                    match = _win.matchMedia(queries[p]).matches;
                    match && (anyMatch = 1);
                    if (match !== conditions[p]) {
                        conditions[p] = match;
                        toggled = 1;
                    }
                }
                if (toggled) {
                    c.revert();
                    anyMatch && matches.push(c);
                }
            }));
            _dispatch("matchMediaRevert");
            matches.forEach((function(c) {
                return c.onMatch(c, (function(func) {
                    return c.add(null, func);
                }));
            }));
            _lastMediaTime = time;
            _dispatch("matchMedia");
        }
    };
    var Context = function() {
        function Context(func, scope) {
            this.selector = scope && selector(scope);
            this.data = [];
            this._r = [];
            this.isReverted = false;
            this.id = _contextID++;
            func && this.add(func);
        }
        var _proto5 = Context.prototype;
        _proto5.add = function add(name, func, scope) {
            if (_isFunction(name)) {
                scope = func;
                func = name;
                name = _isFunction;
            }
            var self = this, f = function f() {
                var result, prev = _context, prevSelector = self.selector;
                prev && prev !== self && prev.data.push(self);
                scope && (self.selector = selector(scope));
                _context = self;
                result = func.apply(self, arguments);
                _isFunction(result) && self._r.push(result);
                _context = prev;
                self.selector = prevSelector;
                self.isReverted = false;
                return result;
            };
            self.last = f;
            return name === _isFunction ? f(self, (function(func) {
                return self.add(null, func);
            })) : name ? self[name] = f : f;
        };
        _proto5.ignore = function ignore(func) {
            var prev = _context;
            _context = null;
            func(this);
            _context = prev;
        };
        _proto5.getTweens = function getTweens() {
            var a = [];
            this.data.forEach((function(e) {
                return e instanceof Context ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && e.parent.data === "nested") && a.push(e);
            }));
            return a;
        };
        _proto5.clear = function clear() {
            this._r.length = this.data.length = 0;
        };
        _proto5.kill = function kill(revert, matchMedia) {
            var _this4 = this;
            if (revert) (function() {
                var t, tweens = _this4.getTweens(), i = _this4.data.length;
                while (i--) {
                    t = _this4.data[i];
                    if (t.data === "isFlip") {
                        t.revert();
                        t.getChildren(true, true, false).forEach((function(tween) {
                            return tweens.splice(tweens.indexOf(tween), 1);
                        }));
                    }
                }
                tweens.map((function(t) {
                    return {
                        g: t._dur || t._delay || t._sat && !t._sat.vars.immediateRender ? t.globalTime(0) : -1 / 0,
                        t
                    };
                })).sort((function(a, b) {
                    return b.g - a.g || -1 / 0;
                })).forEach((function(o) {
                    return o.t.revert(revert);
                }));
                i = _this4.data.length;
                while (i--) {
                    t = _this4.data[i];
                    if (t instanceof Timeline) {
                        if (t.data !== "nested") {
                            t.scrollTrigger && t.scrollTrigger.revert();
                            t.kill();
                        }
                    } else !(t instanceof Tween) && t.revert && t.revert(revert);
                }
                _this4._r.forEach((function(f) {
                    return f(revert, _this4);
                }));
                _this4.isReverted = true;
            })(); else this.data.forEach((function(e) {
                return e.kill && e.kill();
            }));
            this.clear();
            if (matchMedia) {
                var i = _media.length;
                while (i--) _media[i].id === this.id && _media.splice(i, 1);
            }
        };
        _proto5.revert = function revert(config) {
            this.kill(config || {});
        };
        return Context;
    }();
    var MatchMedia = function() {
        function MatchMedia(scope) {
            this.contexts = [];
            this.scope = scope;
            _context && _context.data.push(this);
        }
        var _proto6 = MatchMedia.prototype;
        _proto6.add = function add(conditions, func, scope) {
            _isObject(conditions) || (conditions = {
                matches: conditions
            });
            var mq, p, active, context = new Context(0, scope || this.scope), cond = context.conditions = {};
            _context && !context.selector && (context.selector = _context.selector);
            this.contexts.push(context);
            func = context.add("onMatch", func);
            context.queries = conditions;
            for (p in conditions) if (p === "all") active = 1; else {
                mq = _win.matchMedia(conditions[p]);
                if (mq) {
                    _media.indexOf(context) < 0 && _media.push(context);
                    (cond[p] = mq.matches) && (active = 1);
                    mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
                }
            }
            active && func(context, (function(f) {
                return context.add(null, f);
            }));
            return this;
        };
        _proto6.revert = function revert(config) {
            this.kill(config || {});
        };
        _proto6.kill = function kill(revert) {
            this.contexts.forEach((function(c) {
                return c.kill(revert, true);
            }));
        };
        return MatchMedia;
    }();
    var _gsap = {
        registerPlugin: function registerPlugin() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
            args.forEach((function(config) {
                return _createPlugin(config);
            }));
        },
        timeline: function timeline(vars) {
            return new Timeline(vars);
        },
        getTweensOf: function getTweensOf(targets, onlyActive) {
            return _globalTimeline.getTweensOf(targets, onlyActive);
        },
        getProperty: function getProperty(target, property, unit, uncache) {
            _isString(target) && (target = toArray(target)[0]);
            var getter = _getCache(target || {}).get, format = unit ? _passThrough : _numericIfPossible;
            unit === "native" && (unit = "");
            return !target ? target : !property ? function(property, unit, uncache) {
                return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
            } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
        },
        quickSetter: function quickSetter(target, property, unit) {
            target = toArray(target);
            if (target.length > 1) {
                var setters = target.map((function(t) {
                    return gsap.quickSetter(t, property, unit);
                })), l = setters.length;
                return function(value) {
                    var i = l;
                    while (i--) setters[i](value);
                };
            }
            target = target[0] || {};
            var Plugin = _plugins[property], cache = _getCache(target), p = cache.harness && (cache.harness.aliases || {})[property] || property, setter = Plugin ? function(value) {
                var p = new Plugin;
                _quickTween._pt = 0;
                p.init(target, unit ? value + unit : value, _quickTween, 0, [ target ]);
                p.render(1, p);
                _quickTween._pt && _renderPropTweens(1, _quickTween);
            } : cache.set(target, p);
            return Plugin ? setter : function(value) {
                return setter(target, p, unit ? value + unit : value, cache, 1);
            };
        },
        quickTo: function quickTo(target, property, vars) {
            var _setDefaults2;
            var tween = gsap.to(target, _setDefaults((_setDefaults2 = {}, _setDefaults2[property] = "+=0.1", 
            _setDefaults2.paused = true, _setDefaults2.stagger = 0, _setDefaults2), vars || {})), func = function func(value, start, startIsRelative) {
                return tween.resetTo(property, value, start, startIsRelative);
            };
            func.tween = tween;
            return func;
        },
        isTweening: function isTweening(targets) {
            return _globalTimeline.getTweensOf(targets, true).length > 0;
        },
        defaults: function defaults(value) {
            value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
            return _mergeDeep(_defaults, value || {});
        },
        config: function config(value) {
            return _mergeDeep(_config, value || {});
        },
        registerEffect: function registerEffect(_ref3) {
            var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
            (plugins || "").split(",").forEach((function(pluginName) {
                return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
            }));
            _effects[name] = function(targets, vars, tl) {
                return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
            };
            if (extendTimeline) Timeline.prototype[name] = function(targets, vars, position) {
                return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
            };
        },
        registerEase: function registerEase(name, ease) {
            _easeMap[name] = _parseEase(ease);
        },
        parseEase: function parseEase(ease, defaultEase) {
            return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
        },
        getById: function getById(id) {
            return _globalTimeline.getById(id);
        },
        exportRoot: function exportRoot(vars, includeDelayedCalls) {
            if (vars === void 0) vars = {};
            var child, next, tl = new Timeline(vars);
            tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
            _globalTimeline.remove(tl);
            tl._dp = 0;
            tl._time = tl._tTime = _globalTimeline._time;
            child = _globalTimeline._first;
            while (child) {
                next = child._next;
                if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) _addToTimeline(tl, child, child._start - child._delay);
                child = next;
            }
            _addToTimeline(_globalTimeline, tl, 0);
            return tl;
        },
        context: function context(func, scope) {
            return func ? new Context(func, scope) : _context;
        },
        matchMedia: function matchMedia(scope) {
            return new MatchMedia(scope);
        },
        matchMediaRefresh: function matchMediaRefresh() {
            return _media.forEach((function(c) {
                var found, p, cond = c.conditions;
                for (p in cond) if (cond[p]) {
                    cond[p] = false;
                    found = 1;
                }
                found && c.revert();
            })) || _onMediaChange();
        },
        addEventListener: function addEventListener(type, callback) {
            var a = _listeners[type] || (_listeners[type] = []);
            ~a.indexOf(callback) || a.push(callback);
        },
        removeEventListener: function removeEventListener(type, callback) {
            var a = _listeners[type], i = a && a.indexOf(callback);
            i >= 0 && a.splice(i, 1);
        },
        utils: {
            wrap,
            wrapYoyo,
            distribute,
            random,
            snap,
            normalize,
            getUnit,
            clamp,
            splitColor,
            toArray,
            selector,
            mapRange,
            pipe,
            unitize,
            interpolate,
            shuffle
        },
        install: _install,
        effects: _effects,
        ticker: _ticker,
        updateRoot: Timeline.updateRoot,
        plugins: _plugins,
        globalTimeline: _globalTimeline,
        core: {
            PropTween,
            globals: _addGlobal,
            Tween,
            Timeline,
            Animation,
            getCache: _getCache,
            _removeLinkedListItem,
            reverting: function reverting() {
                return _reverting;
            },
            context: function context(toAdd) {
                if (toAdd && _context) {
                    _context.data.push(toAdd);
                    toAdd._ctx = _context;
                }
                return _context;
            },
            suppressOverwrites: function suppressOverwrites(value) {
                return _suppressOverwrites = value;
            }
        }
    };
    _forEachName("to,from,fromTo,delayedCall,set,killTweensOf", (function(name) {
        return _gsap[name] = Tween[name];
    }));
    _ticker.add(Timeline.updateRoot);
    _quickTween = _gsap.to({}, {
        duration: 0
    });
    var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
        var pt = plugin._pt;
        while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) pt = pt._next;
        return pt;
    }, _addModifiers = function _addModifiers(tween, modifiers) {
        var p, i, pt, targets = tween._targets;
        for (p in modifiers) {
            i = targets.length;
            while (i--) {
                pt = tween._ptLookup[i][p];
                if (pt && (pt = pt.d)) {
                    if (pt._pt) pt = _getPluginPropTween(pt, p);
                    pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
                }
            }
        }
    }, _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
        return {
            name,
            rawVars: 1,
            init: function init(target, vars, tween) {
                tween._onInit = function(tween) {
                    var temp, p;
                    if (_isString(vars)) {
                        temp = {};
                        _forEachName(vars, (function(name) {
                            return temp[name] = 1;
                        }));
                        vars = temp;
                    }
                    if (modifier) {
                        temp = {};
                        for (p in vars) temp[p] = modifier(vars[p]);
                        vars = temp;
                    }
                    _addModifiers(tween, vars);
                };
            }
        };
    };
    var gsap = _gsap.registerPlugin({
        name: "attr",
        init: function init(target, vars, tween, index, targets) {
            var p, pt, v;
            this.tween = tween;
            for (p in vars) {
                v = target.getAttribute(p) || "";
                pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
                pt.op = p;
                pt.b = v;
                this._props.push(p);
            }
        },
        render: function render(ratio, data) {
            var pt = data._pt;
            while (pt) {
                _reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d);
                pt = pt._next;
            }
        }
    }, {
        name: "endArray",
        init: function init(target, value) {
            var i = value.length;
            while (i--) this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
        }
    }, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
    Tween.version = Timeline.version = gsap.version = "3.12.7";
    _coreReady = 1;
    _windowExists() && _wake();
    _easeMap.Power0, _easeMap.Power1, _easeMap.Power2, _easeMap.Power3, _easeMap.Power4, 
    _easeMap.Linear, _easeMap.Quad, _easeMap.Cubic, _easeMap.Quart, _easeMap.Quint, 
    _easeMap.Strong, _easeMap.Elastic, _easeMap.Back, _easeMap.SteppedEase, _easeMap.Bounce, 
    _easeMap.Sine, _easeMap.Expo, _easeMap.Circ;
    /*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
    var CSSPlugin_win, CSSPlugin_doc, _docElement, _pluginInitted, _tempDiv, _recentSetterPlugin, CSSPlugin_reverting, _supports3D, CSSPlugin_windowExists = function _windowExists() {
        return typeof window !== "undefined";
    }, _transformProps = {}, _RAD2DEG = 180 / Math.PI, _DEG2RAD = Math.PI / 180, _atan2 = Math.atan2, CSSPlugin_bigNum = 1e8, _capsExp = /([A-Z])/g, _horizontalExp = /(left|right|width|margin|padding|x)/i, _complexExp = /[\s,\(]\S/, _propertyAliases = {
        autoAlpha: "opacity,visibility",
        scale: "scaleX,scaleY",
        alpha: "opacity"
    }, _renderCSSProp = function _renderCSSProp(ratio, data) {
        return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
    }, _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
        return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
    }, _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
        return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u : data.b, data);
    }, _renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
        var value = data.s + data.c * ratio;
        data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
    }, _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
        return data.set(data.t, data.p, ratio ? data.e : data.b, data);
    }, _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
        return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
    }, _setterCSSStyle = function _setterCSSStyle(target, property, value) {
        return target.style[property] = value;
    }, _setterCSSProp = function _setterCSSProp(target, property, value) {
        return target.style.setProperty(property, value);
    }, _setterTransform = function _setterTransform(target, property, value) {
        return target._gsap[property] = value;
    }, _setterScale = function _setterScale(target, property, value) {
        return target._gsap.scaleX = target._gsap.scaleY = value;
    }, _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
        var cache = target._gsap;
        cache.scaleX = cache.scaleY = value;
        cache.renderTransform(ratio, cache);
    }, _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
        var cache = target._gsap;
        cache[property] = value;
        cache.renderTransform(ratio, cache);
    }, _transformProp = "transform", _transformOriginProp = _transformProp + "Origin", _saveStyle = function _saveStyle(property, isNotCSS) {
        var _this = this;
        var target = this.target, style = target.style, cache = target._gsap;
        if (property in _transformProps && style) {
            this.tfm = this.tfm || {};
            if (property !== "transform") {
                property = _propertyAliases[property] || property;
                ~property.indexOf(",") ? property.split(",").forEach((function(a) {
                    return _this.tfm[a] = _get(target, a);
                })) : this.tfm[property] = cache.x ? cache[property] : _get(target, property);
                property === _transformOriginProp && (this.tfm.zOrigin = cache.zOrigin);
            } else return _propertyAliases.transform.split(",").forEach((function(p) {
                return _saveStyle.call(_this, p, isNotCSS);
            }));
            if (this.props.indexOf(_transformProp) >= 0) return;
            if (cache.svg) {
                this.svgo = target.getAttribute("data-svg-origin");
                this.props.push(_transformOriginProp, isNotCSS, "");
            }
            property = _transformProp;
        }
        (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
    }, _removeIndependentTransforms = function _removeIndependentTransforms(style) {
        if (style.translate) {
            style.removeProperty("translate");
            style.removeProperty("scale");
            style.removeProperty("rotate");
        }
    }, _revertStyle = function _revertStyle() {
        var i, p, props = this.props, target = this.target, style = target.style, cache = target._gsap;
        for (i = 0; i < props.length; i += 3) if (!props[i + 1]) props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty(props[i].substr(0, 2) === "--" ? props[i] : props[i].replace(_capsExp, "-$1").toLowerCase()); else if (props[i + 1] === 2) target[props[i]](props[i + 2]); else target[props[i]] = props[i + 2];
        if (this.tfm) {
            for (p in this.tfm) cache[p] = this.tfm[p];
            if (cache.svg) {
                cache.renderTransform();
                target.setAttribute("data-svg-origin", this.svgo || "");
            }
            i = CSSPlugin_reverting();
            if ((!i || !i.isStart) && !style[_transformProp]) {
                _removeIndependentTransforms(style);
                if (cache.zOrigin && style[_transformOriginProp]) {
                    style[_transformOriginProp] += " " + cache.zOrigin + "px";
                    cache.zOrigin = 0;
                    cache.renderTransform();
                }
                cache.uncache = 1;
            }
        }
    }, _getStyleSaver = function _getStyleSaver(target, properties) {
        var saver = {
            target,
            props: [],
            revert: _revertStyle,
            save: _saveStyle
        };
        target._gsap || gsap.core.getCache(target);
        properties && target.style && target.nodeType && properties.split(",").forEach((function(p) {
            return saver.save(p);
        }));
        return saver;
    }, _createElement = function _createElement(type, ns) {
        var e = CSSPlugin_doc.createElementNS ? CSSPlugin_doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : CSSPlugin_doc.createElement(type);
        return e && e.style ? e : CSSPlugin_doc.createElement(type);
    }, _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
        var cs = getComputedStyle(target);
        return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || "";
    }, _prefixes = "O,Moz,ms,Ms,Webkit".split(","), _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
        var e = element || _tempDiv, s = e.style, i = 5;
        if (property in s && !preferPrefix) return property;
        property = property.charAt(0).toUpperCase() + property.substr(1);
        while (i-- && !(_prefixes[i] + property in s)) ;
        return i < 0 ? null : (i === 3 ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
    }, _initCore = function _initCore() {
        if (CSSPlugin_windowExists() && window.document) {
            CSSPlugin_win = window;
            CSSPlugin_doc = CSSPlugin_win.document;
            _docElement = CSSPlugin_doc.documentElement;
            _tempDiv = _createElement("div") || {
                style: {}
            };
            _createElement("div");
            _transformProp = _checkPropPrefix(_transformProp);
            _transformOriginProp = _transformProp + "Origin";
            _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
            _supports3D = !!_checkPropPrefix("perspective");
            CSSPlugin_reverting = gsap.core.reverting;
            _pluginInitted = 1;
        }
    }, _getReparentedCloneBBox = function _getReparentedCloneBBox(target) {
        var bbox, owner = target.ownerSVGElement, svg = _createElement("svg", owner && owner.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), clone = target.cloneNode(true);
        clone.style.display = "block";
        svg.appendChild(clone);
        _docElement.appendChild(svg);
        try {
            bbox = clone.getBBox();
        } catch (e) {}
        svg.removeChild(clone);
        _docElement.removeChild(svg);
        return bbox;
    }, _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
        var i = attributesArray.length;
        while (i--) if (target.hasAttribute(attributesArray[i])) return target.getAttribute(attributesArray[i]);
    }, _getBBox = function _getBBox(target) {
        var bounds, cloned;
        try {
            bounds = target.getBBox();
        } catch (error) {
            bounds = _getReparentedCloneBBox(target);
            cloned = 1;
        }
        bounds && (bounds.width || bounds.height) || cloned || (bounds = _getReparentedCloneBBox(target));
        return bounds && !bounds.width && !bounds.x && !bounds.y ? {
            x: +_getAttributeFallbacks(target, [ "x", "cx", "x1" ]) || 0,
            y: +_getAttributeFallbacks(target, [ "y", "cy", "y1" ]) || 0,
            width: 0,
            height: 0
        } : bounds;
    }, _isSVG = function _isSVG(e) {
        return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
    }, _removeProperty = function _removeProperty(target, property) {
        if (property) {
            var first2Chars, style = target.style;
            if (property in _transformProps && property !== _transformOriginProp) property = _transformProp;
            if (style.removeProperty) {
                first2Chars = property.substr(0, 2);
                if (first2Chars === "ms" || property.substr(0, 6) === "webkit") property = "-" + property;
                style.removeProperty(first2Chars === "--" ? property : property.replace(_capsExp, "-$1").toLowerCase());
            } else style.removeAttribute(property);
        }
    }, _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
        var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
        plugin._pt = pt;
        pt.b = beginning;
        pt.e = end;
        plugin._props.push(property);
        return pt;
    }, _nonConvertibleUnits = {
        deg: 1,
        rad: 1,
        turn: 1
    }, _nonStandardLayouts = {
        grid: 1,
        flex: 1
    }, _convertToUnit = function _convertToUnit(target, property, value, unit) {
        var px, parent, cache, isSVG, curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", style = _tempDiv.style, horizontal = _horizontalExp.test(property), isRootSVG = target.tagName.toLowerCase() === "svg", measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = unit === "px", toPercent = unit === "%";
        if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) return curValue;
        curUnit !== "px" && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
        isSVG = target.getCTM && _isSVG(target);
        if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
            px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
            return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
        }
        style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
        parent = unit !== "rem" && ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
        if (isSVG) parent = (target.ownerSVGElement || {}).parentNode;
        if (!parent || parent === CSSPlugin_doc || !parent.appendChild) parent = CSSPlugin_doc.body;
        cache = parent._gsap;
        if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time && !cache.uncache) return _round(curValue / cache.width * amount); else {
            if (toPercent && (property === "height" || property === "width")) {
                var v = target.style[property];
                target.style[property] = amount + unit;
                px = target[measureProperty];
                v ? target.style[property] = v : _removeProperty(target, property);
            } else {
                (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
                parent === target && (style.position = "static");
                parent.appendChild(_tempDiv);
                px = _tempDiv[measureProperty];
                parent.removeChild(_tempDiv);
                style.position = "absolute";
            }
            if (horizontal && toPercent) {
                cache = _getCache(parent);
                cache.time = _ticker.time;
                cache.width = parent[measureProperty];
            }
        }
        return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
    }, _get = function _get(target, property, unit, uncache) {
        var value;
        _pluginInitted || _initCore();
        if (property in _propertyAliases && property !== "transform") {
            property = _propertyAliases[property];
            if (~property.indexOf(",")) property = property.split(",")[0];
        }
        if (_transformProps[property] && property !== "transform") {
            value = _parseTransform(target, uncache);
            value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
        } else {
            value = target.style[property];
            if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0);
        }
        return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
    }, _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
        if (!start || start === "none") {
            var p = _checkPropPrefix(prop, target, 1), s = p && _getComputedProperty(target, p, 1);
            if (s && s !== start) {
                prop = p;
                start = s;
            } else if (prop === "borderColor") start = _getComputedProperty(target, "borderTopColor");
        }
        var a, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, endValues, pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString), index = 0, matchIndex = 0;
        pt.b = start;
        pt.e = end;
        start += "";
        end += "";
        if (end === "auto") {
            startValue = target.style[prop];
            target.style[prop] = end;
            end = _getComputedProperty(target, prop) || end;
            startValue ? target.style[prop] = startValue : _removeProperty(target, prop);
        }
        a = [ start, end ];
        _colorStringFilter(a);
        start = a[0];
        end = a[1];
        startValues = start.match(_numWithUnitExp) || [];
        endValues = end.match(_numWithUnitExp) || [];
        if (endValues.length) {
            while (result = _numWithUnitExp.exec(end)) {
                endValue = result[0];
                chunk = end.substring(index, result.index);
                if (color) color = (color + 1) % 5; else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") color = 1;
                if (endValue !== (startValue = startValues[matchIndex++] || "")) {
                    startNum = parseFloat(startValue) || 0;
                    startUnit = startValue.substr((startNum + "").length);
                    endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
                    endNum = parseFloat(endValue);
                    endUnit = endValue.substr((endNum + "").length);
                    index = _numWithUnitExp.lastIndex - endUnit.length;
                    if (!endUnit) {
                        endUnit = endUnit || _config.units[prop] || startUnit;
                        if (index === end.length) {
                            end += endUnit;
                            pt.e += endUnit;
                        }
                    }
                    if (startUnit !== endUnit) startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
                    pt._pt = {
                        _next: pt._pt,
                        p: chunk || matchIndex === 1 ? chunk : ",",
                        s: startNum,
                        c: endNum - startNum,
                        m: color && color < 4 || prop === "zIndex" ? Math.round : 0
                    };
                }
            }
            pt.c = index < end.length ? end.substring(index, end.length) : "";
        } else pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
        _relExp.test(end) && (pt.e = 0);
        this._pt = pt;
        return pt;
    }, _keywordToPercent = {
        top: "0%",
        bottom: "100%",
        left: "0%",
        right: "100%",
        center: "50%"
    }, _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
        var split = value.split(" "), x = split[0], y = split[1] || "50%";
        if (x === "top" || x === "bottom" || y === "left" || y === "right") {
            value = x;
            x = y;
            y = value;
        }
        split[0] = _keywordToPercent[x] || x;
        split[1] = _keywordToPercent[y] || y;
        return split.join(" ");
    }, _renderClearProps = function _renderClearProps(ratio, data) {
        if (data.tween && data.tween._time === data.tween._dur) {
            var prop, clearTransforms, i, target = data.t, style = target.style, props = data.u, cache = target._gsap;
            if (props === "all" || props === true) {
                style.cssText = "";
                clearTransforms = 1;
            } else {
                props = props.split(",");
                i = props.length;
                while (--i > -1) {
                    prop = props[i];
                    if (_transformProps[prop]) {
                        clearTransforms = 1;
                        prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp;
                    }
                    _removeProperty(target, prop);
                }
            }
            if (clearTransforms) {
                _removeProperty(target, _transformProp);
                if (cache) {
                    cache.svg && target.removeAttribute("transform");
                    style.scale = style.rotate = style.translate = "none";
                    _parseTransform(target, 1);
                    cache.uncache = 1;
                    _removeIndependentTransforms(style);
                }
            }
        }
    }, _specialProps = {
        clearProps: function clearProps(plugin, target, property, endValue, tween) {
            if (tween.data !== "isFromStart") {
                var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
                pt.u = endValue;
                pt.pr = -10;
                pt.tween = tween;
                plugin._props.push(property);
                return 1;
            }
        }
    }, _identity2DMatrix = [ 1, 0, 0, 1, 0, 0 ], _rotationalProperties = {}, _isNullTransform = function _isNullTransform(value) {
        return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
    }, _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
        var matrixString = _getComputedProperty(target, _transformProp);
        return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
    }, _getMatrix = function _getMatrix(target, force2D) {
        var parent, nextSibling, temp, addedToDOM, cache = target._gsap || _getCache(target), style = target.style, matrix = _getComputedTransformMatrixAsArray(target);
        if (cache.svg && target.getAttribute("transform")) {
            temp = target.transform.baseVal.consolidate().matrix;
            matrix = [ temp.a, temp.b, temp.c, temp.d, temp.e, temp.f ];
            return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
        } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
            temp = style.display;
            style.display = "block";
            parent = target.parentNode;
            if (!parent || !target.offsetParent && !target.getBoundingClientRect().width) {
                addedToDOM = 1;
                nextSibling = target.nextElementSibling;
                _docElement.appendChild(target);
            }
            matrix = _getComputedTransformMatrixAsArray(target);
            temp ? style.display = temp : _removeProperty(target, "display");
            if (addedToDOM) nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
        }
        return force2D && matrix.length > 6 ? [ matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13] ] : matrix;
    }, _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
        var bounds, determinant, x, y, cache = target._gsap, matrix = matrixArray || _getMatrix(target, true), xOriginOld = cache.xOrigin || 0, yOriginOld = cache.yOrigin || 0, xOffsetOld = cache.xOffset || 0, yOffsetOld = cache.yOffset || 0, a = matrix[0], b = matrix[1], c = matrix[2], d = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0;
        if (!originIsAbsolute) {
            bounds = _getBBox(target);
            xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
            yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
        } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
            x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
            y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
            xOrigin = x;
            yOrigin = y;
        }
        if (smooth || smooth !== false && cache.smooth) {
            tx = xOrigin - xOriginOld;
            ty = yOrigin - yOriginOld;
            cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
            cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
        } else cache.xOffset = cache.yOffset = 0;
        cache.xOrigin = xOrigin;
        cache.yOrigin = yOrigin;
        cache.smooth = !!smooth;
        cache.origin = origin;
        cache.originIsAbsolute = !!originIsAbsolute;
        target.style[_transformOriginProp] = "0px 0px";
        if (pluginToAddPropTweensTo) {
            _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
            _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
            _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
            _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
        }
        target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
    }, _parseTransform = function _parseTransform(target, uncache) {
        var cache = target._gsap || new GSCache(target);
        if ("x" in cache && !uncache && !cache.uncache) return cache;
        var x, y, z, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos, sin, a, b, c, d, a12, a22, t1, t2, t3, a13, a23, a33, a42, a43, a32, style = target.style, invertedScaleX = cache.scaleX < 0, px = "px", deg = "deg", cs = getComputedStyle(target), origin = _getComputedProperty(target, _transformOriginProp) || "0";
        x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
        scaleX = scaleY = 1;
        cache.svg = !!(target.getCTM && _isSVG(target));
        if (cs.translate) {
            if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") style[_transformProp] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp] !== "none" ? cs[_transformProp] : "");
            style.scale = style.rotate = style.translate = "none";
        }
        matrix = _getMatrix(target, cache.svg);
        if (cache.svg) {
            if (cache.uncache) {
                t2 = target.getBBox();
                origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
                t1 = "";
            } else t1 = !uncache && target.getAttribute("data-svg-origin");
            _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
        }
        xOrigin = cache.xOrigin || 0;
        yOrigin = cache.yOrigin || 0;
        if (matrix !== _identity2DMatrix) {
            a = matrix[0];
            b = matrix[1];
            c = matrix[2];
            d = matrix[3];
            x = a12 = matrix[4];
            y = a22 = matrix[5];
            if (matrix.length === 6) {
                scaleX = Math.sqrt(a * a + b * b);
                scaleY = Math.sqrt(d * d + c * c);
                rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0;
                skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
                skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
                if (cache.svg) {
                    x -= xOrigin - (xOrigin * a + yOrigin * c);
                    y -= yOrigin - (xOrigin * b + yOrigin * d);
                }
            } else {
                a32 = matrix[6];
                a42 = matrix[7];
                a13 = matrix[8];
                a23 = matrix[9];
                a33 = matrix[10];
                a43 = matrix[11];
                x = matrix[12];
                y = matrix[13];
                z = matrix[14];
                angle = _atan2(a32, a33);
                rotationX = angle * _RAD2DEG;
                if (angle) {
                    cos = Math.cos(-angle);
                    sin = Math.sin(-angle);
                    t1 = a12 * cos + a13 * sin;
                    t2 = a22 * cos + a23 * sin;
                    t3 = a32 * cos + a33 * sin;
                    a13 = a12 * -sin + a13 * cos;
                    a23 = a22 * -sin + a23 * cos;
                    a33 = a32 * -sin + a33 * cos;
                    a43 = a42 * -sin + a43 * cos;
                    a12 = t1;
                    a22 = t2;
                    a32 = t3;
                }
                angle = _atan2(-c, a33);
                rotationY = angle * _RAD2DEG;
                if (angle) {
                    cos = Math.cos(-angle);
                    sin = Math.sin(-angle);
                    t1 = a * cos - a13 * sin;
                    t2 = b * cos - a23 * sin;
                    t3 = c * cos - a33 * sin;
                    a43 = d * sin + a43 * cos;
                    a = t1;
                    b = t2;
                    c = t3;
                }
                angle = _atan2(b, a);
                rotation = angle * _RAD2DEG;
                if (angle) {
                    cos = Math.cos(angle);
                    sin = Math.sin(angle);
                    t1 = a * cos + b * sin;
                    t2 = a12 * cos + a22 * sin;
                    b = b * cos - a * sin;
                    a22 = a22 * cos - a12 * sin;
                    a = t1;
                    a12 = t2;
                }
                if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
                    rotationX = rotation = 0;
                    rotationY = 180 - rotationY;
                }
                scaleX = _round(Math.sqrt(a * a + b * b + c * c));
                scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
                angle = _atan2(a12, a22);
                skewX = Math.abs(angle) > 2e-4 ? angle * _RAD2DEG : 0;
                perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
            }
            if (cache.svg) {
                t1 = target.getAttribute("transform");
                cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
                t1 && target.setAttribute("transform", t1);
            }
        }
        if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) if (invertedScaleX) {
            scaleX *= -1;
            skewX += rotation <= 0 ? 180 : -180;
            rotation += rotation <= 0 ? 180 : -180;
        } else {
            scaleY *= -1;
            skewX += skewX <= 0 ? 180 : -180;
        }
        uncache = uncache || cache.uncache;
        cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
        cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
        cache.z = z + px;
        cache.scaleX = _round(scaleX);
        cache.scaleY = _round(scaleY);
        cache.rotation = _round(rotation) + deg;
        cache.rotationX = _round(rotationX) + deg;
        cache.rotationY = _round(rotationY) + deg;
        cache.skewX = skewX + deg;
        cache.skewY = skewY + deg;
        cache.transformPerspective = perspective + px;
        if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || !uncache && cache.zOrigin || 0) style[_transformOriginProp] = _firstTwoOnly(origin);
        cache.xOffset = cache.yOffset = 0;
        cache.force3D = _config.force3D;
        cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
        cache.uncache = 0;
        return cache;
    }, _firstTwoOnly = function _firstTwoOnly(value) {
        return (value = value.split(" "))[0] + " " + value[1];
    }, _addPxTranslate = function _addPxTranslate(target, start, value) {
        var unit = getUnit(start);
        return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
    }, _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
        cache.z = "0px";
        cache.rotationY = cache.rotationX = "0deg";
        cache.force3D = 0;
        _renderCSSTransforms(ratio, cache);
    }, _zeroDeg = "0deg", _zeroPx = "0px", _endParenthesis = ") ", _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
        var _ref = cache || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x = _ref.x, y = _ref.y, z = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true;
        if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
            var cos, angle = parseFloat(rotationY) * _DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle);
            angle = parseFloat(rotationX) * _DEG2RAD;
            cos = Math.cos(angle);
            x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
            y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
            z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
        }
        if (transformPerspective !== _zeroPx) transforms += "perspective(" + transformPerspective + _endParenthesis;
        if (xPercent || yPercent) transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
        if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
        if (rotation !== _zeroDeg) transforms += "rotate(" + rotation + _endParenthesis;
        if (rotationY !== _zeroDeg) transforms += "rotateY(" + rotationY + _endParenthesis;
        if (rotationX !== _zeroDeg) transforms += "rotateX(" + rotationX + _endParenthesis;
        if (skewX !== _zeroDeg || skewY !== _zeroDeg) transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
        if (scaleX !== 1 || scaleY !== 1) transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
        target.style[_transformProp] = transforms || "translate(0, 0)";
    }, _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
        var a11, a21, a12, a22, temp, _ref2 = cache || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x = _ref2.x, y = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x), ty = parseFloat(y);
        rotation = parseFloat(rotation);
        skewX = parseFloat(skewX);
        skewY = parseFloat(skewY);
        if (skewY) {
            skewY = parseFloat(skewY);
            skewX += skewY;
            rotation += skewY;
        }
        if (rotation || skewX) {
            rotation *= _DEG2RAD;
            skewX *= _DEG2RAD;
            a11 = Math.cos(rotation) * scaleX;
            a21 = Math.sin(rotation) * scaleX;
            a12 = Math.sin(rotation - skewX) * -scaleY;
            a22 = Math.cos(rotation - skewX) * scaleY;
            if (skewX) {
                skewY *= _DEG2RAD;
                temp = Math.tan(skewX - skewY);
                temp = Math.sqrt(1 + temp * temp);
                a12 *= temp;
                a22 *= temp;
                if (skewY) {
                    temp = Math.tan(skewY);
                    temp = Math.sqrt(1 + temp * temp);
                    a11 *= temp;
                    a21 *= temp;
                }
            }
            a11 = _round(a11);
            a21 = _round(a21);
            a12 = _round(a12);
            a22 = _round(a22);
        } else {
            a11 = scaleX;
            a22 = scaleY;
            a21 = a12 = 0;
        }
        if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
            tx = _convertToUnit(target, "x", x, "px");
            ty = _convertToUnit(target, "y", y, "px");
        }
        if (xOrigin || yOrigin || xOffset || yOffset) {
            tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
            ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
        }
        if (xPercent || yPercent) {
            temp = target.getBBox();
            tx = _round(tx + xPercent / 100 * temp.width);
            ty = _round(ty + yPercent / 100 * temp.height);
        }
        temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
        target.setAttribute("transform", temp);
        forceCSS && (target.style[_transformProp] = temp);
    }, _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
        var direction, pt, cap = 360, isString = _isString(endValue), endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1), change = endNum - startNum, finalValue = startNum + change + "deg";
        if (isString) {
            direction = endValue.split("_")[1];
            if (direction === "short") {
                change %= cap;
                if (change !== change % (cap / 2)) change += change < 0 ? cap : -cap;
            }
            if (direction === "cw" && change < 0) change = (change + cap * CSSPlugin_bigNum) % cap - ~~(change / cap) * cap; else if (direction === "ccw" && change > 0) change = (change - cap * CSSPlugin_bigNum) % cap - ~~(change / cap) * cap;
        }
        plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
        pt.e = finalValue;
        pt.u = "deg";
        plugin._props.push(property);
        return pt;
    }, _assign = function _assign(target, source) {
        for (var p in source) target[p] = source[p];
        return target;
    }, _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
        var endCache, p, startValue, endValue, startNum, endNum, startUnit, endUnit, startCache = _assign({}, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style;
        if (startCache.svg) {
            startValue = target.getAttribute("transform");
            target.setAttribute("transform", "");
            style[_transformProp] = transforms;
            endCache = _parseTransform(target, 1);
            _removeProperty(target, _transformProp);
            target.setAttribute("transform", startValue);
        } else {
            startValue = getComputedStyle(target)[_transformProp];
            style[_transformProp] = transforms;
            endCache = _parseTransform(target, 1);
            style[_transformProp] = startValue;
        }
        for (p in _transformProps) {
            startValue = startCache[p];
            endValue = endCache[p];
            if (startValue !== endValue && exclude.indexOf(p) < 0) {
                startUnit = getUnit(startValue);
                endUnit = getUnit(endValue);
                startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
                endNum = parseFloat(endValue);
                plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
                plugin._pt.u = endUnit || 0;
                plugin._props.push(p);
            }
        }
        _assign(endCache, startCache);
    };
    _forEachName("padding,margin,Width,Radius", (function(name, index) {
        var t = "Top", r = "Right", b = "Bottom", l = "Left", props = (index < 3 ? [ t, r, b, l ] : [ t + l, t + r, b + r, b + l ]).map((function(side) {
            return index < 2 ? name + side : "border" + side + name;
        }));
        _specialProps[index > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
            var a, vars;
            if (arguments.length < 4) {
                a = props.map((function(prop) {
                    return _get(plugin, prop, property);
                }));
                vars = a.join(" ");
                return vars.split(a[0]).length === 5 ? a[0] : vars;
            }
            a = (endValue + "").split(" ");
            vars = {};
            props.forEach((function(prop, i) {
                return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
            }));
            plugin.init(target, vars, tween);
        };
    }));
    var CSSPlugin = {
        name: "css",
        register: _initCore,
        targetTest: function targetTest(target) {
            return target.style && target.nodeType;
        },
        init: function init(target, vars, tween, index, targets) {
            var startValue, endValue, endNum, startNum, type, specialProp, p, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache, smooth, hasPriority, inlineProps, props = this._props, style = target.style, startAt = tween.vars.startAt;
            _pluginInitted || _initCore();
            this.styles = this.styles || _getStyleSaver(target);
            inlineProps = this.styles.props;
            this.tween = tween;
            for (p in vars) {
                if (p === "autoRound") continue;
                endValue = vars[p];
                if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) continue;
                type = typeof endValue;
                specialProp = _specialProps[p];
                if (type === "function") {
                    endValue = endValue.call(tween, index, target, targets);
                    type = typeof endValue;
                }
                if (type === "string" && ~endValue.indexOf("random(")) endValue = _replaceRandom(endValue);
                if (specialProp) specialProp(this, target, p, endValue, tween) && (hasPriority = 1); else if (p.substr(0, 2) === "--") {
                    startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
                    endValue += "";
                    _colorExp.lastIndex = 0;
                    if (!_colorExp.test(startValue)) {
                        startUnit = getUnit(startValue);
                        endUnit = getUnit(endValue);
                    }
                    endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
                    this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
                    props.push(p);
                    inlineProps.push(p, 0, style[p]);
                } else if (type !== "undefined") {
                    if (startAt && p in startAt) {
                        startValue = typeof startAt[p] === "function" ? startAt[p].call(tween, index, target, targets) : startAt[p];
                        _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
                        getUnit(startValue + "") || startValue === "auto" || (startValue += _config.units[p] || getUnit(_get(target, p)) || "");
                        (startValue + "").charAt(1) === "=" && (startValue = _get(target, p));
                    } else startValue = _get(target, p);
                    startNum = parseFloat(startValue);
                    relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
                    relative && (endValue = endValue.substr(2));
                    endNum = parseFloat(endValue);
                    if (p in _propertyAliases) {
                        if (p === "autoAlpha") {
                            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) startNum = 0;
                            inlineProps.push("visibility", 0, style.visibility);
                            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
                        }
                        if (p !== "scale" && p !== "transform") {
                            p = _propertyAliases[p];
                            ~p.indexOf(",") && (p = p.split(",")[0]);
                        }
                    }
                    isTransformRelated = p in _transformProps;
                    if (isTransformRelated) {
                        this.styles.save(p);
                        if (!transformPropTween) {
                            cache = target._gsap;
                            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform);
                            smooth = vars.smoothOrigin !== false && cache.smooth;
                            transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1);
                            transformPropTween.dep = 1;
                        }
                        if (p === "scale") {
                            this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0, _renderCSSProp);
                            this._pt.u = 0;
                            props.push("scaleY", p);
                            p += "X";
                        } else if (p === "transformOrigin") {
                            inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
                            endValue = _convertKeywordsToPercentages(endValue);
                            if (cache.svg) _applySVGOrigin(target, endValue, 0, smooth, 0, this); else {
                                endUnit = parseFloat(endValue.split(" ")[2]) || 0;
                                endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
                                _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
                            }
                            continue;
                        } else if (p === "svgOrigin") {
                            _applySVGOrigin(target, endValue, 1, smooth, 0, this);
                            continue;
                        } else if (p in _rotationalProperties) {
                            _addRotationalPropTween(this, cache, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);
                            continue;
                        } else if (p === "smoothOrigin") {
                            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
                            continue;
                        } else if (p === "force3D") {
                            cache[p] = endValue;
                            continue;
                        } else if (p === "transform") {
                            _addRawTransformPTs(this, endValue, target);
                            continue;
                        }
                    } else if (!(p in style)) p = _checkPropPrefix(p) || p;
                    if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p in style) {
                        startUnit = (startValue + "").substr((startNum + "").length);
                        endNum || (endNum = 0);
                        endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
                        startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
                        this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
                        this._pt.u = endUnit || 0;
                        if (startUnit !== endUnit && endUnit !== "%") {
                            this._pt.b = startValue;
                            this._pt.r = _renderCSSPropWithBeginning;
                        }
                    } else if (!(p in style)) {
                        if (p in target) this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets); else if (p !== "parseTransform") {
                            _missingPlugin(p, endValue);
                            continue;
                        }
                    } else _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
                    isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : typeof target[p] === "function" ? inlineProps.push(p, 2, target[p]()) : inlineProps.push(p, 1, startValue || target[p]));
                    props.push(p);
                }
            }
            hasPriority && _sortPropTweensByPriority(this);
        },
        render: function render(ratio, data) {
            if (data.tween._time || !CSSPlugin_reverting()) {
                var pt = data._pt;
                while (pt) {
                    pt.r(ratio, pt.d);
                    pt = pt._next;
                }
            } else data.styles.revert();
        },
        get: _get,
        aliases: _propertyAliases,
        getSetter: function getSetter(target, property, plugin) {
            var p = _propertyAliases[property];
            p && p.indexOf(",") < 0 && (property = p);
            return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
        },
        core: {
            _removeProperty,
            _getMatrix
        }
    };
    gsap.utils.checkPrefix = _checkPropPrefix;
    gsap.core.getStyleSaver = _getStyleSaver;
    (function(positionAndScale, rotation, others, aliases) {
        var all = _forEachName(positionAndScale + "," + rotation + "," + others, (function(name) {
            _transformProps[name] = 1;
        }));
        _forEachName(rotation, (function(name) {
            _config.units[name] = "deg";
            _rotationalProperties[name] = 1;
        }));
        _propertyAliases[all[13]] = positionAndScale + "," + rotation;
        _forEachName(aliases, (function(name) {
            var split = name.split(":");
            _propertyAliases[split[1]] = all[split[0]];
        }));
    })("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
    _forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function(name) {
        _config.units[name] = "px";
    }));
    gsap.registerPlugin(CSSPlugin);
    var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
    gsapWithCSS.core.Tween;
    function heroCursor() {
        const hero = document.querySelector(".hero");
        const music = document.querySelector(".hero__music");
        const record = document.querySelector(".hero__recorder");
        const recorcBig = document.querySelector(".hero__recorder-big");
        const stars = Array.from(document.querySelectorAll(".hero__star"));
        if (hero) {
            const items = [ music, record, recorcBig ];
            hero.addEventListener("mousemove", (e => {
                const {width, height} = hero.getBoundingClientRect();
                const x = (e.offsetX / width - .5) * 20;
                const y = (e.offsetY / height - .5) * 20;
                items.forEach(((item, index) => {
                    const depth = (index + 1) * 3;
                    gsapWithCSS.to(item, {
                        x: x * depth,
                        y: y * depth,
                        duration: 10 + index,
                        ease: "power2.out"
                    });
                }));
            }));
            hero.addEventListener("mouseleave", (() => {
                gsapWithCSS.to(items, {
                    x: 0,
                    y: 0,
                    duration: 7.5,
                    ease: "power2.out"
                });
            }));
            stars.forEach((star => stirring(star)));
            if (window.matchMedia("(max-width: 991px)").matches) stirring(recorcBig);
        }
        function stirring(el) {
            gsapWithCSS.to(el, {
                x: "random(-10, 15, 1)",
                y: "random(-10, 15, 1)",
                rotation: "random(-5, 5, 1)",
                duration: 1.5,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
        }
    }
    spoller();
    burger();
    heroCursor();
})();