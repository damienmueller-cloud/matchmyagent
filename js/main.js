/* MatchMyAgent — nav, home stepper, enquire prefill */
(function () {
  var STORAGE_KEY = "mma_match_prefill";

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
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

  function readPrefill() {
    var q = {
      area: param("area") || param("council") || "",
      suburb: param("suburb") || "",
      timing: param("timing") || "",
      goal: param("goal") || "",
    };
    var stored = {};
    try {
      stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}") || {};
    } catch (e) {}
    return {
      area: q.area || stored.area || "",
      suburb: q.suburb || stored.suburb || "",
      timing: q.timing || stored.timing || "",
      goal: q.goal || stored.goal || "",
    };
  }

  function savePrefill(data) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function ensureHidden(form, name, value) {
    var el = form.querySelector('[name="' + name + '"]');
    if (!el) {
      el = document.createElement("input");
      el.type = "hidden";
      el.name = name;
      form.appendChild(el);
    }
    if (value) el.value = value;
    return el;
  }

  function setSelectValue(select, value) {
    if (!select || !value) return;
    var opts = Array.prototype.slice.call(select.options);
    var hit = opts.find(function (o) {
      return o.value === value || o.textContent.trim() === value;
    });
    if (hit) {
      select.value = hit.value;
      return;
    }
    var opt = document.createElement("option");
    opt.value = value;
    opt.textContent = value;
    select.appendChild(opt);
    select.value = value;
  }

  /* Enquire form: attribution + stepper/query prefill */
  document.querySelectorAll("form.lead-form").forEach(function (form) {
    ensureHidden(form, "lead_source", "MatchMyAgent — matchmyagent.com.au staging");
    ensureHidden(form, "attribution", "Lead from MatchMyAgent site (matchmyagent.com.au / local staging)");
    ensureHidden(form, "referred_by", "MatchMyAgent");
    ensureHidden(form, "_subject", "MatchMyAgent match enquire");

    var map = {
      utm_source: param("utm_source"),
      utm_medium: param("utm_medium"),
      utm_campaign: param("utm_campaign"),
      utm_content: param("utm_content"),
      utm_term: param("utm_term"),
      source: param("utm_source") || "matchmyagent-godaddy",
      page: window.location.href,
      user_agent: navigator.userAgent.slice(0, 240),
    };
    Object.keys(map).forEach(function (k) {
      ensureHidden(form, k, map[k] || (k === "source" ? "matchmyagent-godaddy" : ""));
    });

    var pre = readPrefill();
    var council = form.querySelector("#council, [name='council']");
    var suburb = form.querySelector("#suburb, [name='suburb']");
    var timing = form.querySelector("#timing, [name='timing']");
    var message = form.querySelector("#message, [name='message']");
    var banner = document.getElementById("prefill-banner");

    if (pre.area) setSelectValue(council, pre.area);
    if (pre.suburb && suburb) suburb.value = pre.suburb;
    if (pre.timing) setSelectValue(timing, pre.timing);
    if (pre.goal && message && !message.value) message.value = "Goal: " + pre.goal;
    if (pre.goal) ensureHidden(form, "goal", pre.goal);

    if (pre.area || pre.suburb || pre.timing || pre.goal) {
      ensureHidden(form, "stepper_prefill", "yes");
      if (banner) banner.hidden = false;
    }

    form.addEventListener("submit", function () {
      try {
        var data = {};
        new FormData(form).forEach(function (v, k) { data[k] = v; });
        data.timestamp = new Date().toISOString();
        data.vault_note = "browser mirror — authoritative copy also FormSubmit email";
        var key = "mma_leads_mirror";
        var prev = JSON.parse(localStorage.getItem(key) || "[]");
        prev.push(data);
        localStorage.setItem(key, JSON.stringify(prev.slice(-50)));
      } catch (e) {}
    });
  });

  /* Home 3-step tap stepper */
  var root = document.querySelector("[data-mma-stepper]");
  if (!root) return;

  var state = { area: "", suburb: "", timing: "", goal: "" };
  var step = 1;

  function showStep(n) {
    step = n;
    root.querySelectorAll(".stepper-panel").forEach(function (panel) {
      var s = Number(panel.getAttribute("data-step"));
      var on = s === n;
      panel.classList.toggle("is-active", on);
      if (on) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
    });
    root.querySelectorAll(".stepper-dot").forEach(function (dot) {
      var d = Number(dot.getAttribute("data-dot"));
      dot.classList.toggle("is-active", d === n);
      dot.classList.toggle("is-done", d < n);
    });
  }

  function updateNextEnabled() {
    var panel = root.querySelector('.stepper-panel[data-step="' + step + '"]');
    if (!panel) return;
    var nextBtn = panel.querySelector("[data-next]");
    if (!nextBtn) return;
    var ok = step === 1 ? !!state.area : step === 2 ? !!state.timing : true;
    nextBtn.disabled = !ok;
  }

  function buildEnquireUrl() {
    var suburbEl = document.getElementById("step-suburb");
    if (suburbEl) state.suburb = suburbEl.value.trim();
    savePrefill(state);
    var q = new URLSearchParams();
    if (state.area) q.set("area", state.area);
    if (state.suburb) q.set("suburb", state.suburb);
    if (state.timing) q.set("timing", state.timing);
    if (state.goal) q.set("goal", state.goal);
    return "/enquire.html?" + q.toString();
  }

  root.addEventListener("click", function (e) {
    var chip = e.target.closest(".tap-chip");
    if (chip && root.contains(chip)) {
      var field = chip.getAttribute("data-field");
      var value = chip.getAttribute("data-value") || "";
      if (!field) return;
      state[field] = value;
      var panel = chip.closest(".stepper-panel");
      panel.querySelectorAll('.tap-chip[data-field="' + field + '"]').forEach(function (c) {
        c.classList.toggle("is-selected", c === chip);
        c.setAttribute("aria-selected", c === chip ? "true" : "false");
      });
      updateNextEnabled();
      if (step === 3 && state.goal) {
        var link = panel.querySelector("[data-enquire]");
        if (link) link.setAttribute("href", buildEnquireUrl());
      }
      return;
    }

    if (e.target.closest("[data-next]")) {
      var suburbEl = document.getElementById("step-suburb");
      if (suburbEl) state.suburb = suburbEl.value.trim();
      if (step === 1 && !state.area) return;
      if (step === 2 && !state.timing) return;
      showStep(Math.min(3, step + 1));
      updateNextEnabled();
      return;
    }

    if (e.target.closest("[data-back]")) {
      showStep(Math.max(1, step - 1));
      updateNextEnabled();
      return;
    }

    var enquire = e.target.closest("[data-enquire]");
    if (enquire) enquire.setAttribute("href", buildEnquireUrl());
  });

  var suburbInput = document.getElementById("step-suburb");
  if (suburbInput) {
    suburbInput.addEventListener("input", function () {
      state.suburb = suburbInput.value.trim();
    });
  }

  showStep(1);
  updateNextEnabled();
})();
