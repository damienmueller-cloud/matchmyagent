/* MatchMyAgent — HTTP-safe ElevenLabs widget
   Voice (getUserMedia) needs HTTPS. On insecure contexts force text-only
   and surface a short hint. When HTTPS is available, leave voice enabled. */
(function () {
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
