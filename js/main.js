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
      bedrooms: param("bedrooms") || "",
      pool: param("pool") || "",
      reno_status: param("reno_status") || "",
      property_address: param("property_address") || "",
      price_expectation: param("price_expectation") || "",
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
      bedrooms: q.bedrooms || stored.bedrooms || "",
      pool: q.pool || stored.pool || "",
      reno_status: q.reno_status || stored.reno_status || "",
      property_address: q.property_address || stored.property_address || "",
      price_expectation: q.price_expectation || stored.price_expectation || "",
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

  function setInputValue(el, value) {
    if (!el || !value) return;
    el.value = value;
  }

  /* Enquire form: attribution + stepper/query prefill */
  document.querySelectorAll("form.lead-form").forEach(function (form) {
    ensureHidden(form, "lead_source", "MatchMyAgent — matchmyagent.com.au");
    ensureHidden(form, "attribution", "Lead from MatchMyAgent site (matchmyagent.com.au)");
    ensureHidden(form, "referred_by", "MatchMyAgent");
    ensureHidden(form, "_subject", "MatchMyAgent match enquire");

    var map = {
      utm_source: param("utm_source"),
      utm_medium: param("utm_medium"),
      utm_campaign: param("utm_campaign"),
      utm_content: param("utm_content"),
      utm_term: param("utm_term"),
      source: param("utm_source") || "matchmyagent-site",
      page: window.location.href,
      user_agent: navigator.userAgent.slice(0, 240),
    };
    Object.keys(map).forEach(function (k) {
      ensureHidden(form, k, map[k] || (k === "source" ? "matchmyagent-site" : ""));
    });

    var pre = readPrefill();
    var council = form.querySelector("#council, [name='council']");
    var suburb = form.querySelector("#suburb, [name='suburb']");
    var timing = form.querySelector("#timing, [name='timing']");
    var message = form.querySelector("#message, [name='message']");
    var bedrooms = form.querySelector("#bedrooms, [name='bedrooms']");
    var pool = form.querySelector("#pool, [name='pool']");
    var reno = form.querySelector("#reno_status, [name='reno_status']");
    var address = form.querySelector("#property_address, [name='property_address']");
    var price = form.querySelector("#price_expectation, [name='price_expectation']");
    var banner = document.getElementById("prefill-banner");

    if (pre.area) setSelectValue(council, pre.area);
    if (pre.suburb && suburb) suburb.value = pre.suburb;
    if (pre.timing) setSelectValue(timing, pre.timing);
    if (pre.bedrooms) setSelectValue(bedrooms, pre.bedrooms);
    if (pre.pool) setSelectValue(pool, pre.pool);
    if (pre.reno_status) setSelectValue(reno, pre.reno_status);
    setInputValue(address, pre.property_address);
    setInputValue(price, pre.price_expectation);
    if (pre.goal && message && !message.value) message.value = "Goal: " + pre.goal;
    if (pre.goal) ensureHidden(form, "goal", pre.goal);

    var hasPrefill =
      pre.area ||
      pre.suburb ||
      pre.timing ||
      pre.goal ||
      pre.bedrooms ||
      pre.pool ||
      pre.reno_status ||
      pre.property_address ||
      pre.price_expectation;
    if (hasPrefill) {
      ensureHidden(form, "stepper_prefill", "yes");
      if (banner) banner.hidden = false;
    }

    form.addEventListener("submit", function () {
      try {
        var data = {};
        new FormData(form).forEach(function (v, k) {
          data[k] = v;
        });
        data.timestamp = new Date().toISOString();
        data.vault_note = "browser mirror — authoritative copy also FormSubmit email";
        var key = "mma_leads_mirror";
        var prev = JSON.parse(localStorage.getItem(key) || "[]");
        prev.push(data);
        localStorage.setItem(key, JSON.stringify(prev.slice(-50)));
      } catch (e) {}
    });
  });

  /* Home tap stepper (4 steps; step 3 property optional/skippable) */
  var root = document.querySelector("[data-mma-stepper]");
  if (!root) return;

  var MAX_STEP = 4;
  var state = {
    area: "",
    suburb: "",
    timing: "",
    goal: "",
    bedrooms: "",
    pool: "",
    reno_status: "",
  };
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

  function step1Ready() {
    var suburbEl = document.getElementById("step-suburb");
    if (suburbEl) state.suburb = suburbEl.value.trim();
    return state.suburb.length >= 2;
  }

  function updateNextEnabled() {
    var panel = root.querySelector('.stepper-panel[data-step="' + step + '"]');
    if (!panel) return;
    var nextBtn = panel.querySelector("[data-next]");
    if (!nextBtn) return;
    var ok = true;
    if (step === 1) ok = step1Ready();
    else if (step === 2) ok = !!state.timing;
    /* step 3 optional — Next always on */
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
    if (state.bedrooms) q.set("bedrooms", state.bedrooms);
    if (state.pool) q.set("pool", state.pool);
    if (state.reno_status) q.set("reno_status", state.reno_status);
    return "enquire.html?" + q.toString();
  }

  root.addEventListener("click", function (e) {
    var chip = e.target.closest(".tap-chip");
    if (chip && root.contains(chip)) {
      var field = chip.getAttribute("data-field");
      var value = chip.getAttribute("data-value") || "";
      if (!field) return;
      state[field] = value;
      if (field === "area") {
        var suburbEl = document.getElementById("step-suburb");
        if (suburbEl && !suburbEl.value.trim()) {
          suburbEl.value = value;
          state.suburb = value;
        }
      }
      var panel = chip.closest(".stepper-panel");
      panel.querySelectorAll('.tap-chip[data-field="' + field + '"]').forEach(function (c) {
        c.classList.toggle("is-selected", c === chip);
        c.setAttribute("aria-selected", c === chip ? "true" : "false");
      });
      updateNextEnabled();
      if (step === MAX_STEP && state.goal) {
        var link = panel.querySelector("[data-enquire]");
        if (link) link.setAttribute("href", buildEnquireUrl());
      }
      return;
    }

    if (e.target.closest("[data-next]") || e.target.closest("[data-skip]")) {
      var suburbEl2 = document.getElementById("step-suburb");
      if (suburbEl2) state.suburb = suburbEl2.value.trim();
      if (step === 1 && !step1Ready()) return;
      if (step === 1 && state.suburb && !state.area) state.area = "Other Australia";
      if (step === 2 && !state.timing) return;
      showStep(Math.min(MAX_STEP, step + 1));
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
      updateNextEnabled();
    });
    suburbInput.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" && step1Ready()) {
        ev.preventDefault();
        var nextBtn = root.querySelector('.stepper-panel[data-step="1"] [data-next]');
        if (nextBtn && !nextBtn.disabled) nextBtn.click();
      }
    });
  }

  showStep(1);
  updateNextEnabled();
})();
