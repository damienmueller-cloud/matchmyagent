/* MatchMyAgent — HTTP-safe ElevenLabs widget
   Voice (getUserMedia) needs HTTPS. On insecure contexts force text-only
   silently (no public SSL banner). When HTTPS is available, leave voice enabled.
   Forces navy/coral brand via avatar image URL + shadowRoot CSS injection.
   cache-bust: 2026-09-20-githubio-paths */
(function () {
  var ORB1 = "#182868";
  var ORB2 = "#f85850";
  var AVATAR_URL = (function () {
    try {
      var base = location.pathname.indexOf("/matchmyagent/") === 0 ? "/matchmyagent" : "";
      return base + "/brand/logos/avatar-mark.png";
    } catch (e) {
      return "/brand/logos/avatar-mark.png";
    }
  })();
  var BRAND_CSS =
    ":host, :root {\n" +
    "  --el-base: #f4f2eb !important;\n" +
    "  --el-base-hover: #ebe7dc !important;\n" +
    "  --el-base-active: #e4dfd3 !important;\n" +
    "  --el-base-border: #182868 !important;\n" +
    "  --el-base-subtle: #5a6570 !important;\n" +
    "  --el-base-primary: #182868 !important;\n" +
    "  --el-accent: #f85850 !important;\n" +
    "  --el-accent-hover: #ff6f68 !important;\n" +
    "  --el-accent-active: #d6453f !important;\n" +
    "  --el-accent-border: #f85850 !important;\n" +
    "  --el-accent-subtle: #ff8a7a !important;\n" +
    "  --el-accent-primary: #ffffff !important;\n" +
    "}";
  var STYLE_ID = "mma-el-brand-force";

  function isSecure() {
    try {
      if (window.isSecureContext === true) return true;
      var h = location.hostname;
      if (h === "localhost" || h === "127.0.0.1") return true;
      return location.protocol === "https:";
    } catch (e) {
      return false;
    }
  }

  function injectShadowBrand(el) {
    try {
      var root = el.shadowRoot;
      if (!root) return false;
      if (root.getElementById(STYLE_ID)) return true;
      var style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = BRAND_CSS;
      root.appendChild(style);
      return true;
    } catch (e) {
      return false;
    }
  }

  function applyBrandColors(el) {
    el.setAttribute("avatar-image-url", AVATAR_URL);
    el.setAttribute("avatar-orb-color-1", ORB1);
    el.setAttribute("avatar-orb-color-2", ORB2);
    if (el.hasAttribute("override-config")) {
      el.removeAttribute("override-config");
    }
    injectShadowBrand(el);
  }

  function applyTextOnly(el) {
    el.setAttribute("override-text-only", "true");
    el.setAttribute("text-input", "true");
    el.setAttribute("transcript", "true");
  }

  function patchWidgets() {
    var secure = isSecure();
    document.querySelectorAll("elevenlabs-convai").forEach(function (el) {
      applyBrandColors(el);
      if (!secure) applyTextOnly(el);
    });
  }

  /* Soften uncaught getUserMedia / undefined errors from the widget on HTTP */
  window.addEventListener(
    "unhandledrejection",
    function (ev) {
      if (isSecure()) return;
      var r = ev && ev.reason;
      var msg = r && (r.message || String(r));
      if (
        msg &&
        (/getUserMedia|NotAllowedError|NotFoundError|secure context|mediaDevices|undefined is not/i.test(
          msg
        ) ||
          (r && r.name === "NotAllowedError"))
      ) {
        ev.preventDefault();
        patchWidgets();
      }
    },
    true
  );

  window.addEventListener(
    "error",
    function (ev) {
      if (isSecure()) return;
      var msg = (ev && (ev.message || "")) + "";
      if (/getUserMedia|mediaDevices|undefined is not an object/i.test(msg)) {
        ev.preventDefault();
        patchWidgets();
      }
    },
    true
  );

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", patchWidgets);
  } else {
    patchWidgets();
  }

  /* Widget script is async — shadowRoot appears after custom element upgrades */
  setTimeout(patchWidgets, 500);
  setTimeout(patchWidgets, 2000);

  try {
    var mo = new MutationObserver(function () {
      patchWidgets();
    });
    mo.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  } catch (e) {}
})();
