/* @ds-bundle: {"format":4,"namespace":"MandiocaDesignSystem_109ebd","components":[{"name":"Lockup","sourcePath":"components/brand/Lockup.jsx"},{"name":"MixedTitle","sourcePath":"components/brand/MixedTitle.jsx"},{"name":"SubscribeOverlay","sourcePath":"components/brand/SubscribeOverlay.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Switch","sourcePath":"components/core/Switch.jsx"}],"sourceHashes":{"components/brand/Lockup.jsx":"3dc6cb6e6cef","components/brand/MixedTitle.jsx":"2bcac8b0ae97","components/brand/SubscribeOverlay.jsx":"1c34af443b7c","components/core/Avatar.jsx":"bea84efc2ecd","components/core/Badge.jsx":"b3c8507ebd55","components/core/Button.jsx":"14c5d7a6fb33","components/core/Card.jsx":"7faf73544656","components/core/Eyebrow.jsx":"39bc54744c42","components/core/Input.jsx":"ea0766298435","components/core/Switch.jsx":"0acf64071a6a","deliverables/subscribe-overlay/SubscribeOverlay.standalone.jsx":"defc8488552d","ui_kits/social/posts.jsx":"e5ef013cf716","ui_kits/web/site.jsx":"584f985dd4a3","ui_kits/web/tweaks-panel.jsx":"6591467622ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MandiocaDesignSystem_109ebd = window.MandiocaDesignSystem_109ebd || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Lockup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Lockup — the OFFICIAL Mandioca imagotipo (turtle-vinyl isotype +
 * wordmark), rendered from the brand SVGs in /assets/logos.
 * Never re-draw or re-typeset the logo; this component is the only
 * sanctioned way to place it.
 *
 * brand: "records" (black art, light bg) | "yellow" (yellow art, dark bg)
 *      | "academy" (green art, light bg) | "paper" (cream art, dark bg)
 *      | "ink" | "design" (no own logo yet — falls back to records)
 */
const __dsBase = (() => {
  try {
    const s = document.currentScript || document.querySelector('script[src*="_ds_bundle"]');
    if (s && s.src) return s.src.replace(/\/[^/]*$/, "");
  } catch (e) {}
  return "";
})();
function Lockup({
  brand = "records",
  size = 40,
  sublabel,
  stacked = true,
  className = "",
  style = {},
  ...props
}) {
  const isAcademy = brand === "academy" || brand === "paper" && sublabel === "academy";
  let mark;
  if (brand === "academy") mark = "mark-academy-green";else if (brand === "yellow") mark = "mark-records-yellow";else if (brand === "paper" || brand === "design") mark = isAcademy ? "mark-academy-cream" : "mark-records-cream";else mark = "mark-records-black"; // records, ink
  const h = Math.round(size * 1.6);
  return /*#__PURE__*/React.createElement("img", _extends({
    className: `md-lockup ${className}`,
    src: `${__dsBase}/assets/logos/${mark}.svg`,
    alt: `Mandioca ${isAcademy ? "Academy" : "Records"}`,
    style: {
      display: "inline-block",
      height: h,
      width: "auto",
      ...style
    }
  }, props));
}
Object.assign(__ds_scope, { Lockup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Lockup.jsx", error: String((e && e.message) || e) }); }

// components/brand/MixedTitle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MixedTitle — the signature Mandioca title treatment.
 * Titles (and ONLY titles) mix two type families, each with its
 * italic, alternating word-by-word to feel organic and hand-made:
 *   · Ubuntu Mono  (--font-display)
 *   · DM Sans      (--font-display-alt)
 * Pass plain text; the component splits on spaces and alternates.
 * Use `pattern` to control the rhythm, or hard-code per-word cuts
 * by passing an array of {text, font, italic} as `parts`.
 */
/* Recursively pull the plain text out of any React node — strings,
   numbers, arrays, or elements (incl. editor instrumentation wrappers
   that wrap text in a component, which would otherwise stringify to
   "[object Object]"). */
function extractText(node) {
  if (node == null || node === false || node === true) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && node.props) return extractText(node.props.children);
  return "";
}
function MixedTitle({
  children,
  parts,
  size = "var(--type-display-md)",
  color = "var(--ink)",
  align = "left",
  seed = 0,
  className = "",
  style = {},
  as = "h2",
  ...props
}) {
  const Tag = as;
  const fonts = ["var(--font-display)", "var(--font-display-alt)"];
  let computed = parts;
  if (!computed) {
    const words = extractText(children).split(/(\s+)/);
    let wi = 0;
    computed = words.map(w => {
      if (/^\s+$/.test(w)) return {
        text: w,
        space: true
      };
      const idx = wi + seed;
      wi += 1;
      return {
        text: w,
        font: fonts[idx % 2],
        italic: idx % 3 === 1 // every third-ish word leans
      };
    });
  }
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `md-mixedtitle ${className}`,
    style: {
      margin: 0,
      fontSize: size,
      lineHeight: "var(--lh-display)",
      letterSpacing: "var(--tracking-display)",
      color,
      textAlign: align,
      fontWeight: 700,
      textWrap: "balance",
      ...style
    }
  }, props), computed.map((p, i) => p.space ? " " : /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontFamily: p.font || fonts[0],
      fontStyle: p.italic ? "italic" : "normal",
      fontWeight: 700
    }
  }, p.text)));
}
Object.assign(__ds_scope, { MixedTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/MixedTitle.jsx", error: String((e && e.message) || e) }); }

// components/brand/SubscribeOverlay.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ============================================================
   Mandioca · SubscribeOverlay
   Animated YouTube subscribe lower-third for the Academy
   sub-brand. Self-contained: runs its own looping clock and
   auto-scales a 1920×1080 canvas to fit its parent container.
   Two looks: "solid" (bold green card) and "bubble" (speech
   bubble pointing at the button).
   ============================================================ */

const C = {
  verde: "#2d9f71",
  verde700: "#20694b",
  verde900: "#13432f",
  negro: "#2c292a",
  negro700: "#1f1d1e",
  crema: "#fefefd",
  paper: "#f5f1e6",
  rojo: "#d3403b"
};

/* phase timing (seconds within one loop) */
const PH = {
  inn: 0.30,
  btn: 0.66,
  arrive: 1.45,
  press: 1.82,
  release: 1.98,
  flip: 2.02,
  bell: 2.18,
  ringA: 2.38,
  ringB: 3.28,
  outA: 4.85,
  outB: 5.30
};
const LOOP = 5.7;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const easeOutBack = x => {
  const c1 = 1.70158,
    c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
const easeInOutCubic = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
function lerpStops(stops, vals, t, ease = x => x) {
  if (t <= stops[0]) return vals[0];
  if (t >= stops[stops.length - 1]) return vals[vals.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (t >= stops[i] && t <= stops[i + 1]) {
      const p = (t - stops[i]) / (stops[i + 1] - stops[i]);
      return vals[i] + (vals[i + 1] - vals[i]) * ease(p);
    }
  }
  return vals[vals.length - 1];
}
function popIn(lt, start, dur = 0.5) {
  const p = clamp((lt - start) / dur, 0, 1);
  const e = easeOutBack(p);
  return {
    opacity: clamp((lt - start) / (dur * 0.4), 0, 1),
    scale: 0.55 + 0.45 * e,
    ty: (1 - e) * 10
  };
}
const fadeOut = lt => lt >= PH.outA ? clamp(1 - (lt - PH.outA) / (PH.outB - PH.outA), 0, 1) : 1;
function btnState(lt) {
  const sub = lt >= PH.flip;
  let ty = 0,
    sh = 6,
    sc = 1;
  if (lt >= PH.arrive && lt < PH.press) {
    ty = -3;
    sh = 9;
  }
  if (lt >= PH.press && lt < PH.release) {
    ty = 2;
    sh = 0;
    sc = 0.95;
  }
  if (lt >= PH.flip && lt < PH.flip + 0.26) {
    const fp = clamp((lt - PH.flip) / 0.26, 0, 1);
    sc = 1 + Math.sin(fp * Math.PI) * 0.07;
  }
  return {
    sub,
    ty,
    sh,
    sc
  };
}
function bellAngle(lt) {
  if (lt < PH.ringA || lt > PH.ringB) return 0;
  const u = (lt - PH.ringA) / (PH.ringB - PH.ringA);
  return Math.sin(u * Math.PI * 8) * 17 * (1 - u);
}
function BellIcon({
  size,
  color,
  fill
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",
    fill: fill
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
  }));
}
function CheckIcon({
  size,
  color
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "3.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }));
}
function SubButton({
  lt,
  x,
  y,
  w,
  h,
  scheme,
  labels,
  fz
}) {
  const {
    opacity,
    scale
  } = popIn(lt, PH.btn);
  const {
    sub,
    ty,
    sh,
    sc
  } = btnState(lt);
  const bg = scheme === "cream" ? sub ? C.negro : C.crema : sub ? C.crema : C.verde;
  const fg = scheme === "cream" ? sub ? C.crema : C.negro : sub ? C.negro : C.crema;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      opacity,
      transform: `translateY(${ty}px) scale(${scale * sc})`,
      transformOrigin: "center",
      willChange: "transform"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      borderRadius: 16,
      background: bg,
      border: `3px solid ${C.negro}`,
      boxShadow: `${sh}px ${sh}px 0 ${C.negro}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
      transition: "box-shadow 60ms linear"
    }
  }, sub && /*#__PURE__*/React.createElement(CheckIcon, {
    size: 26,
    color: C.verde
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui, system-ui)",
      fontWeight: 700,
      fontSize: fz,
      color: fg,
      letterSpacing: "0.01em"
    }
  }, sub ? labels[1] : labels[0])));
}
function BellButton({
  lt,
  x,
  y,
  d,
  scheme
}) {
  if (lt < PH.bell) return null;
  const {
    opacity,
    scale
  } = popIn(lt, PH.bell, 0.44);
  const ang = bellAngle(lt);
  const circle = scheme === "cream" ? C.crema : C.verde;
  const bellCol = scheme === "cream" ? C.negro : C.crema;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: x,
      top: y,
      width: d,
      height: d,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: "center",
      willChange: "transform"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      background: circle,
      border: `3px solid ${C.negro}`,
      boxShadow: `4px 4px 0 ${C.negro}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transformOrigin: "50% 18%",
      transform: `rotate(${ang}deg)`
    }
  }, /*#__PURE__*/React.createElement(BellIcon, {
    size: Math.round(d * 0.5),
    color: bellCol,
    fill: bellCol
  }))), lt >= PH.ringA && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -6,
      right: -6,
      width: 25,
      height: 25,
      borderRadius: "50%",
      background: C.rojo,
      border: `2.5px solid ${C.crema}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-ui, system-ui)",
      fontWeight: 700,
      fontSize: 13,
      color: C.crema,
      transform: `scale(${popIn(lt, PH.ringA, 0.3).scale})`
    }
  }, "1"));
}
function Cursor({
  lt,
  tx,
  ty
}) {
  if (lt < 0.7) return null;
  const x = lerpStops([0.7, PH.arrive, PH.release + 0.5, PH.release + 1.1], [1560, tx + 6, tx + 6, 1500], lt, easeInOutCubic);
  const y = lerpStops([0.7, PH.arrive, PH.release + 0.5, PH.release + 1.1], [1040, ty + 8, ty + 8, 1030], lt, easeInOutCubic);
  const clicking = lt >= PH.press && lt < PH.press + 0.16;
  const out = clamp(1 - (lt - (PH.release + 0.6)) / 0.5, 0, 1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: x,
      top: y,
      transform: `scale(${clicking ? 0.82 : 1})`,
      transformOrigin: "6px 6px",
      opacity: lt > PH.release + 0.4 ? out : 1,
      willChange: "transform"
    }
  }, lt >= PH.press && lt < PH.press + 0.42 && (() => {
    const rp = clamp((lt - PH.press) / 0.42, 0, 1);
    const dd = 10 + 46 * rp;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 7 - dd / 2,
        top: 3 - dd / 2,
        width: dd,
        height: dd,
        borderRadius: "50%",
        border: `2.5px solid ${C.verde}`,
        opacity: (1 - rp) * 0.9
      }
    });
  })(), /*#__PURE__*/React.createElement("svg", {
    width: "44",
    height: "46",
    viewBox: "0 0 24 25",
    style: {
      filter: "drop-shadow(0 2px 3px rgba(0,0,0,.35))"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 2.5 L5 19 L9.2 15.2 L11.9 21.2 L14.7 20 L12 14 L17.5 14 Z",
    fill: C.crema,
    stroke: C.negro,
    strokeWidth: "1.4",
    strokeLinejoin: "round"
  })));
}

/* ---- the two looks, drawn on a 1920×1080 canvas ---- */
function SolidLook({
  lt,
  text,
  emoji,
  labels
}) {
  // Layout note: the 🐢 emoji glyph renders ~71px wide at 52px, so the text
  // block ends near x≈456. The button is placed at 490 to sit close to the
  // text with a comfortable ~34px gap and never overlap it.
  const CARD = {
    x: 120,
    y: 800,
    w: 744,
    h: 176,
    r: 22
  };
  const vc = CARD.y + CARD.h / 2,
    btnY = vc - 36,
    btnX = 490,
    bellX = 752;
  const card = popIn(lt, PH.inn, 0.52);
  const name = clamp((lt - 0.5) / 0.5, 0, 1);
  const lines = text.split("\n");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: fadeOut(lt)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: CARD.x,
      top: CARD.y,
      width: CARD.w,
      height: CARD.h,
      opacity: card.opacity,
      transform: `translateY(${card.ty}px) scale(${card.scale})`,
      transformOrigin: "30% 60%",
      background: C.verde,
      borderRadius: CARD.r,
      border: `3px solid ${C.negro}`,
      boxShadow: `10px 10px 0 ${C.negro}`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 160,
      top: CARD.y,
      height: CARD.h,
      opacity: name,
      transform: `translateX(${(1 - name) * -14}px)`,
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, emoji && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 52,
      lineHeight: 1
    }
  }, emoji), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-heading, system-ui)",
      fontWeight: 700,
      fontSize: 32,
      color: C.crema,
      lineHeight: 1.08,
      whiteSpace: "nowrap"
    }
  }, lines.map((l, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, l, i < lines.length - 1 && /*#__PURE__*/React.createElement("br", null))))), /*#__PURE__*/React.createElement(SubButton, {
    lt: lt,
    x: btnX,
    y: btnY,
    w: 248,
    h: 72,
    scheme: "cream",
    labels: labels,
    fz: 27
  }), /*#__PURE__*/React.createElement(BellButton, {
    lt: lt,
    x: bellX,
    y: btnY,
    d: 72,
    scheme: "cream"
  }), /*#__PURE__*/React.createElement(Cursor, {
    lt: lt,
    tx: btnX + 124,
    ty: btnY + 36
  }));
}
function BubbleLook({
  lt,
  text,
  emoji,
  labels
}) {
  const btnX = 780,
    btnY = 858,
    bellX = btnX + 300;
  const BUB = {
    x: 690,
    y: 690,
    w: 520,
    h: 120
  };
  const bub = popIn(lt, PH.inn, 0.5);
  const lines = text.split("\n");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: fadeOut(lt)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: BUB.x,
      top: BUB.y,
      width: BUB.w,
      height: BUB.h,
      opacity: bub.opacity,
      transform: `scale(${bub.scale})`,
      transformOrigin: "30% 100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      background: C.crema,
      borderRadius: 20,
      border: `3px solid ${C.negro}`,
      boxShadow: `7px 7px 0 ${C.negro}`,
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "0 28px",
      boxSizing: "border-box"
    }
  }, emoji && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 50
    }
  }, emoji), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-heading, system-ui)",
      fontWeight: 700,
      fontSize: 32,
      color: C.negro,
      lineHeight: 1.08
    }
  }, lines.map((l, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, l, i < lines.length - 1 && /*#__PURE__*/React.createElement("br", null))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 70,
      bottom: -19,
      width: 30,
      height: 30,
      background: C.crema,
      borderRight: `3px solid ${C.negro}`,
      borderBottom: `3px solid ${C.negro}`,
      transform: "rotate(45deg)"
    }
  })), /*#__PURE__*/React.createElement(SubButton, {
    lt: lt,
    x: btnX,
    y: btnY,
    w: 280,
    h: 74,
    scheme: "green",
    labels: labels,
    fz: 28
  }), /*#__PURE__*/React.createElement(BellButton, {
    lt: lt,
    x: bellX,
    y: btnY + 1,
    d: 72,
    scheme: "green"
  }), /*#__PURE__*/React.createElement(Cursor, {
    lt: lt,
    tx: btnX + 140,
    ty: btnY + 37
  }));
}
function SubscribeOverlay({
  variant = "solid",
  text = "No te pierdas\nningún video",
  emoji = "🐢",
  subscribeLabel = "Suscríbete",
  subscribedLabel = "Suscrito",
  playing = true,
  loop = true,
  time,
  showBackdrop = true,
  background = "#15110d",
  className = "",
  style = {},
  ...props
}) {
  const controlled = typeof time === "number";
  const [tState, setT] = React.useState(0);
  const t = controlled ? time : tState;
  const [scale, setScale] = React.useState(1);
  const wrapRef = React.useRef(null);
  const raf = React.useRef(null);
  const last = React.useRef(null);

  // auto-scale 1920×1080 to fit parent
  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const fit = () => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height) setScale(Math.min(r.width / 1920, r.height / 1080));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // internal clock — setInterval + perf-delta (robust across iframes
  // where requestAnimationFrame can be throttled to a halt)
  React.useEffect(() => {
    if (controlled || !playing) {
      last.current = null;
      return;
    }
    last.current = typeof performance !== "undefined" ? performance.now() : Date.now();
    const id = setInterval(() => {
      const now = typeof performance !== "undefined" ? performance.now() : Date.now();
      const dt = (now - last.current) / 1000;
      last.current = now;
      setT(prev => {
        const n = prev + dt;
        return loop ? n % LOOP : Math.min(n, LOOP);
      });
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [playing, loop, controlled]);
  const labels = [subscribeLabel, subscribedLabel];
  const Look = variant === "bubble" ? BubbleLook : SolidLook;
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: wrapRef,
    className: `md-suboverlay ${className}`,
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      background: showBackdrop ? background : "transparent",
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: 1920,
      height: 1080,
      transform: `translate(-50%,-50%) scale(${scale})`,
      transformOrigin: "center"
    }
  }, showBackdrop && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `radial-gradient(circle at 54% 18%, ${C.verde900} 0%, rgba(19,67,47,0.3) 38%, rgba(21,17,13,0) 66%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.5) 100%)"
    }
  })), /*#__PURE__*/React.createElement(Look, {
    lt: t,
    text: text,
    emoji: emoji,
    labels: labels
  })));
}
Object.assign(__ds_scope, { SubscribeOverlay });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/SubscribeOverlay.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar — circular, with a confident ink ring. Falls back to
 * initials on a brand-tinted ground when no image is given.
 */
function Avatar({
  src,
  alt = "",
  name = "",
  size = 44,
  tone = "yellow",
  ring = true,
  className = "",
  style = {},
  ...props
}) {
  const tones = {
    yellow: {
      bg: "var(--amarillo-300)",
      fg: "var(--negro-500)"
    },
    green: {
      bg: "var(--verde-300)",
      fg: "var(--verde-900)"
    },
    purple: {
      bg: "var(--morado-200)",
      fg: "var(--morado-900)"
    },
    red: {
      bg: "var(--rojo-200)",
      fg: "var(--rojo-900)"
    },
    blue: {
      bg: "var(--azul-200)",
      fg: "var(--azul-900)"
    },
    ink: {
      bg: "var(--negro-500)",
      fg: "var(--paper)"
    }
  };
  const t = tones[tone] || tones.yellow;
  const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `md-avatar ${className}`,
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      overflow: "hidden",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: t.bg,
      color: t.fg,
      border: ring ? "var(--border-bold) solid var(--ink)" : "none",
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: size * 0.4,
      lineHeight: 1,
      boxSizing: "border-box",
      ...style
    }
  }, props), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : /*#__PURE__*/React.createElement("span", null, initials || "M"));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small sticker-like status / category chip.
 * tone: brand | yellow | green | purple | red | blue | ink | paper
 */
function Badge({
  children,
  tone = "ink",
  solid = true,
  sticker = false,
  className = "",
  style = {},
  ...props
}) {
  const tones = {
    brand: {
      bg: "var(--brand-primary)",
      fg: "var(--brand-on-primary)",
      bd: "var(--ink)"
    },
    yellow: {
      bg: "var(--amarillo-500)",
      fg: "var(--negro-500)",
      bd: "var(--negro-500)"
    },
    green: {
      bg: "var(--verde-500)",
      fg: "#fff",
      bd: "var(--verde-900)"
    },
    purple: {
      bg: "var(--morado-500)",
      fg: "#fff",
      bd: "var(--morado-900)"
    },
    red: {
      bg: "var(--rojo-500)",
      fg: "#fff",
      bd: "var(--rojo-900)"
    },
    blue: {
      bg: "var(--azul-500)",
      fg: "#fff",
      bd: "var(--azul-900)"
    },
    ink: {
      bg: "var(--negro-500)",
      fg: "var(--paper)",
      bd: "var(--negro-500)"
    },
    paper: {
      bg: "var(--paper)",
      fg: "var(--ink)",
      bd: "var(--ink)"
    }
  };
  const t = tones[tone] || tones.ink;
  const solidStyle = {
    background: t.bg,
    color: t.fg,
    border: `var(--border-bold) solid ${sticker ? "var(--ink)" : t.bd}`
  };
  const softStyle = {
    background: "transparent",
    color: t.bg,
    border: `var(--border-bold) solid ${t.bg}`
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `md-badge ${className}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "3px 10px",
      fontFamily: "var(--font-ui)",
      fontWeight: 600,
      fontSize: 12,
      lineHeight: 1.4,
      letterSpacing: "0.02em",
      textTransform: "uppercase",
      borderRadius: "var(--radius-pill)",
      boxShadow: sticker ? "var(--shadow-sticker-sm)" : "none",
      whiteSpace: "nowrap",
      ...(solid ? solidStyle : softStyle),
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Mandioca Button — chunky, confident, sub-brand aware.
 * Reads --brand-primary / --brand-on-primary from the nearest
 * [data-brand] scope, so the same button turns yellow under
 * Records and green under Academy.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  sticker = false,
  full = false,
  as = "button",
  className = "",
  style = {},
  ...props
}) {
  const Tag = as;
  const sizes = {
    sm: {
      padding: "8px 14px",
      fontSize: 13,
      gap: 6,
      radius: "var(--radius-sm)"
    },
    md: {
      padding: "11px 20px",
      fontSize: 15,
      gap: 8,
      radius: "var(--radius-md)"
    },
    lg: {
      padding: "15px 28px",
      fontSize: 17,
      gap: 10,
      radius: "var(--radius-md)"
    }
  };
  const s = sizes[size] || sizes.md;
  const base = {
    display: full ? "flex" : "inline-flex",
    width: full ? "100%" : "auto",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    padding: s.padding,
    fontFamily: "var(--font-ui)",
    fontWeight: 600,
    fontSize: s.fontSize,
    lineHeight: 1,
    letterSpacing: "0.01em",
    borderRadius: s.radius,
    border: "var(--border-bold) solid transparent",
    cursor: "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    transition: "transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)",
    ...style
  };
  const variants = {
    primary: {
      background: "var(--brand-primary)",
      color: "var(--brand-on-primary)",
      borderColor: "var(--ink)"
    },
    secondary: {
      background: "var(--ink)",
      color: "var(--paper)",
      borderColor: "var(--ink)"
    },
    outline: {
      background: "transparent",
      color: "var(--ink)",
      borderColor: "var(--ink)"
    },
    ghost: {
      background: "transparent",
      color: "var(--ink)",
      borderColor: "transparent"
    },
    danger: {
      background: "var(--rojo-500)",
      color: "#fff",
      borderColor: "var(--ink)"
    }
  };
  const v = variants[variant] || variants.primary;
  const stickerShadow = sticker ? {
    boxShadow: "var(--shadow-sticker-sm)"
  } : {};
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: `md-btn md-btn--${variant} ${className}`,
    style: {
      ...base,
      ...v,
      ...stickerShadow
    },
    onMouseEnter: e => {
      if (props.disabled) return;
      e.currentTarget.style.transform = sticker ? "translate(-1px,-1px)" : "translateY(-1px)";
      if (sticker) e.currentTarget.style.boxShadow = "var(--shadow-sticker)";
      if (variant === "ghost" || variant === "outline") e.currentTarget.style.background = "rgba(44,41,42,0.06)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "none";
      if (sticker) e.currentTarget.style.boxShadow = "var(--shadow-sticker-sm)";
      if (variant === "ghost" || variant === "outline") e.currentTarget.style.background = "transparent";
    },
    onMouseDown: e => {
      if (props.disabled) return;
      e.currentTarget.style.transform = sticker ? "translate(1px,1px)" : "translateY(1px) scale(0.99)";
      if (sticker) e.currentTarget.style.boxShadow = "none";
    },
    onMouseUp: e => {
      if (props.disabled) return;
      e.currentTarget.style.transform = sticker ? "translate(-1px,-1px)" : "translateY(-1px)";
      if (sticker) e.currentTarget.style.boxShadow = "var(--shadow-sticker)";
    }
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the white printed surface of the system (12px radius).
 * variant: plain | sticker (hard offset shadow) | outline | dark
 */
function Card({
  children,
  variant = "plain",
  pad = "md",
  className = "",
  style = {},
  ...props
}) {
  const pads = {
    none: 0,
    sm: "var(--space-4)",
    md: "var(--space-5)",
    lg: "var(--space-7)"
  };
  const variants = {
    plain: {
      background: "var(--surface-card)",
      border: "var(--border-hair) solid var(--hairline)",
      boxShadow: "var(--shadow-sm)"
    },
    sticker: {
      background: "var(--surface-card)",
      border: "var(--border-bold) solid var(--ink)",
      boxShadow: "var(--shadow-sticker)"
    },
    outline: {
      background: "transparent",
      border: "var(--border-bold) solid var(--ink)",
      boxShadow: "none"
    },
    dark: {
      background: "var(--negro-500)",
      border: "var(--border-bold) solid var(--negro-700)",
      boxShadow: "none",
      color: "var(--paper)"
    }
  };
  const v = variants[variant] || variants.plain;
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `md-card md-card--${variant} ${className}`,
    style: {
      borderRadius: "var(--radius-md)",
      padding: pads[pad] ?? pads.md,
      boxSizing: "border-box",
      ...v,
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow — the small uppercase Inter label used above titles
 * ("kicker"). Optional leading turtle dot in the brand color.
 */
function Eyebrow({
  children,
  dot = true,
  className = "",
  style = {},
  ...props
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `md-eyebrow ${className}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-ui)",
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--ink-soft)",
      ...style
    }
  }, props), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--brand-primary)",
      border: "1.5px solid var(--ink)",
      display: "inline-block",
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — text field with label & optional helper/error.
 * Flat, 2px outline that switches to the focus ring on focus.
 */
function Input({
  label,
  helper,
  error,
  id,
  className = "",
  style = {},
  ...props
}) {
  const inputId = id || `md-input-${Math.random().toString(36).slice(2, 8)}`;
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: `md-field ${className}`,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-ui)",
      fontWeight: 600,
      fontSize: 13,
      color: "var(--ink)",
      letterSpacing: "0.01em"
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: e => {
      setFocused(true);
      props.onFocus?.(e);
    },
    onBlur: e => {
      setFocused(false);
      props.onBlur?.(e);
    },
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: 15,
      color: "var(--ink)",
      background: "var(--surface-card)",
      padding: "10px 14px",
      borderRadius: "var(--radius-sm)",
      border: `var(--border-bold) solid ${error ? "var(--rojo-500)" : focused ? "var(--focus-ring)" : "var(--negro-300)"}`,
      outline: "none",
      boxShadow: focused ? "0 0 0 3px rgba(73,72,152,0.18)" : "none",
      transition: "border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
      boxSizing: "border-box",
      width: "100%"
    }
  }, props)), (helper || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: 12,
      color: error ? "var(--rojo-500)" : "var(--ink-muted)"
    }
  }, error || helper));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Switch — toggle. On-state fills with the active sub-brand color.
 */
function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  className = "",
  style = {},
  ...props
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange?.(!on);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    className: `md-switch ${className}`,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      fontFamily: "var(--font-ui)",
      fontSize: 14,
      color: "var(--ink)",
      ...style
    }
  }, props), /*#__PURE__*/React.createElement("span", {
    onClick: toggle,
    role: "switch",
    "aria-checked": on,
    style: {
      width: 44,
      height: 26,
      borderRadius: "var(--radius-pill)",
      background: on ? "var(--brand-primary)" : "var(--negro-200)",
      border: "var(--border-bold) solid var(--ink)",
      position: "relative",
      transition: "background var(--dur-base) var(--ease-out)",
      flexShrink: 0,
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      left: on ? 20 : 2,
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: "var(--surface-card)",
      border: "1.5px solid var(--ink)",
      transition: "left var(--dur-base) var(--ease-spring)",
      boxSizing: "border-box"
    }
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Switch.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Lockup = __ds_scope.Lockup;

__ds_ns.MixedTitle = __ds_scope.MixedTitle;

__ds_ns.SubscribeOverlay = __ds_scope.SubscribeOverlay;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

})();
