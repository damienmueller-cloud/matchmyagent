/* Chat widget: ElevenLabs TBD — HTML stub only; do not load agent SDK here until Damien approves. */
(function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function param(name) {
    try {
      return new URLSearchParams(window.location.search).get(name) || "";
    } catch (e) {
      return "";
    }
  }

  function ensureHidden(form, name, value) {
    let el = form.querySelector('[name="' + name + '"]');
    if (!el) {
      el = document.createElement("input");
      el.type = "hidden";
      el.name = name;
      form.appendChild(el);
    }
    if (value !== undefined && value !== null && value !== "") el.value = value;
    return el;
  }

  document.querySelectorAll("form.lead-form").forEach(function (form) {
    // MatchMyAgent attribution only
    ensureHidden(form, "lead_source", "MatchMyAgent — matchmyagent.com.au staging");
    ensureHidden(form, "attribution", "Lead originated from MatchMyAgent site (matchmyagent.com.au / local staging)");
    ensureHidden(form, "referred_by", "MatchMyAgent");
    ensureHidden(form, "_subject", "MatchMyAgent match enquire (Hunter NSW)");
    // Agent CC is TBD — do not invent recipients here (see STAGING_NOTES.md)

    const map = {
      utm_source: param("utm_source"),
      utm_medium: param("utm_medium"),
      utm_campaign: param("utm_campaign"),
      utm_content: param("utm_content"),
      utm_term: param("utm_term"),
      source: param("utm_source") || "matchmyagent-godaddy",
      page: window.location.href,
      user_agent: navigator.userAgent.slice(0, 240),
    };
    Object.keys(map).forEach(function (key) {
      ensureHidden(form, key, map[key] || (key === "source" ? "matchmyagent-godaddy" : ""));
    });

    form.addEventListener("submit", function () {
      try {
        const data = {};
        new FormData(form).forEach(function (v, k) {
          data[k] = v;
        });
        data.timestamp = new Date().toISOString();
        data.vault_note = "browser mirror — authoritative copy also FormSubmit email";
        const key = "mma_leads_mirror";
        const prev = JSON.parse(localStorage.getItem(key) || "[]");
        prev.push(data);
        localStorage.setItem(key, JSON.stringify(prev.slice(-50)));
      } catch (e) {}
    });
  });
})();
