/* MatchMyAgent — HTTP-safe ElevenLabs widget
   Voice (getUserMedia) needs HTTPS. On insecure contexts force text-only
   and surface a short hint. When HTTPS is available, leave voice enabled.
   Also forces navy/coral brand colours on every elevenlabs-convai embed. */
(function () {
  var ORB1 = "#182868";
  var ORB2 = "#f85850";
  var OVERRIDE_CONFIG = JSON.stringify({
    avatar: { type: "orb", color_1: ORB1, color_2: ORB2 },
    bg_color: "#f4f2eb",
    text_color: "#182868",
    btn_color: "#182868",
    btn_text_color: "#ffffff",
    border_color: "#f85850",
    focus_color: "#f85850",
    styles: {
      base: "#f4f2eb",
      base_hover: "#ebe7dc",
      base_active: "#e4dfd3",
      base_border: "#f85850",
      base_subtle: "#5a6570",
      base_primary: "#182868",
      accent: "#182868",
      accent_hover: "#2a3f88",
      accent_active: "#101860",
      accent_border: "#182868",
      accent_subtle: "#ff8a7a",
      accent_primary: "#ffffff",
      button_radius: 999,
      compact_sheet_radius: 999
    }
  });

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

  function applyBrandColors(el) {
    el.setAttribute("avatar-orb-color-1", ORB1);
    el.setAttribute("avatar-orb-color-2", ORB2);
    el.setAttribute("override-config", OVERRIDE_CONFIG);
  }

  function applyTextOnly(el) {
    el.setAttribute("override-text-only", "true");
    el.setAttribute("text-input", "true");
    el.setAttribute("transcript", "true");
  }

  function injectHint() {
    if (document.getElementById("mma-http-chat-hint")) return;
    var hint = document.createElement("div");
    hint.id = "mma-http-chat-hint";
    hint.setAttribute("role", "status");
    hint.className = "mma-http-chat-hint";
    hint.textContent =
      "Text chat works now. Voice needs a secure (HTTPS) connection — coming when SSL finishes.";
    document.body.appendChild(hint);
  }

  function patchWidgets() {
    var secure = isSecure();
    document.querySelectorAll("elevenlabs-convai").forEach(function (el) {
      applyBrandColors(el);
      if (!secure) applyTextOnly(el);
    });
    if (!secure) injectHint();
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
  /* Widget script is async — re-apply shortly after load */
  setTimeout(patchWidgets, 500);
  setTimeout(patchWidgets, 2000);
})();
