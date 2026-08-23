/*
  Fixoona custom date/time picker.
  Replaces the native browser date/datetime-local popup (which can't be
  restyled with CSS) with a component matching the site's design. The
  original <input> stays in the DOM under its original id, keeping its
  native "value" format (YYYY-MM-DD or YYYY-MM-DDTHH:MM) as the single
  source of truth, so every existing calculator's getElementById(...).value
  reads and addEventListener("input"/"change", ...) listeners keep working
  unchanged -- only how the value is entered changes.
*/
(function (global) {
  "use strict";

  var WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  var MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  var openPopup = null;

  function pad2(n) { return n < 10 ? "0" + n : "" + n; }

  function parseValue(input) {
    var v = input.value;
    if (!v) return null;
    if (input.type === "datetime-local") {
      var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(v);
      if (!m) return null;
      return { y: +m[1], mo: +m[2] - 1, d: +m[3], h: +m[4], min: +m[5] };
    }
    var m2 = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
    if (!m2) return null;
    return { y: +m2[1], mo: +m2[2] - 1, d: +m2[3], h: 0, min: 0 };
  }

  function formatValue(input, parsed) {
    var base = parsed.y + "-" + pad2(parsed.mo + 1) + "-" + pad2(parsed.d);
    if (input.type === "datetime-local") {
      return base + "T" + pad2(parsed.h) + ":" + pad2(parsed.min);
    }
    return base;
  }

  function formatDisplay(input, parsed) {
    var d = new Date(parsed.y, parsed.mo, parsed.d, parsed.h, parsed.min);
    if (input.type === "datetime-local") {
      return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) +
        ", " + d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    }
    return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  }

  function closeOpenPopup() {
    if (openPopup) {
      openPopup.popup.style.display = "none";
      openPopup.trigger.setAttribute("aria-expanded", "false");
      openPopup = null;
    }
  }

  document.addEventListener("mousedown", function (e) {
    if (openPopup && !openPopup.wrap.contains(e.target) && !openPopup.popup.contains(e.target)) closeOpenPopup();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && openPopup) { openPopup.trigger.focus(); closeOpenPopup(); }
  });
  window.addEventListener("scroll", function () {
    if (openPopup) closeOpenPopup();
  }, true);
  window.addEventListener("resize", function () {
    if (openPopup) closeOpenPopup();
  });

  function enhance(input) {
    if (input._fxDpEnhanced) return;
    input._fxDpEnhanced = true;
    var isDateTime = input.type === "datetime-local";

    var wrap = document.createElement("div");
    wrap.className = "fx-dp-wrap";
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);
    input.className = (input.className ? input.className + " " : "") + "fx-dp-native";
    input.setAttribute("tabindex", "-1");

    var trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "fx-dp-trigger";
    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-expanded", "false");
    var triggerText = document.createElement("span");
    triggerText.className = "fx-dp-trigger-text";
    trigger.appendChild(triggerText);
    trigger.insertAdjacentHTML("beforeend",
      '<svg class="fx-dp-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1Zm12 8H5v9h14v-9ZM5 6v2h14V6H5Z"/></svg>');
    wrap.appendChild(trigger);

    if (input.id) {
      var assocLabel = document.querySelector('label[for="' + input.id + '"]');
      if (assocLabel) {
        assocLabel.addEventListener("click", function (e) {
          e.preventDefault();
          trigger.focus();
          openThis();
        });
      }
    }

    var popup = document.createElement("div");
    popup.className = "fx-dp-popup";
    popup.style.display = "none";
    // Appended to <body> (not wrap) and positioned with getBoundingClientRect
    // math in openThis(), so it can't be clipped by an ancestor's
    // "overflow: hidden" (e.g. .tool-panel) regardless of where the field
    // sits on the page.
    document.body.appendChild(popup);

    var now = new Date();
    var state = { viewY: now.getFullYear(), viewM: now.getMonth(), y: null, mo: null, d: null, h: 0, min: 0 };

    function syncFromInput() {
      var parsed = parseValue(input);
      if (parsed) {
        state.y = parsed.y; state.mo = parsed.mo; state.d = parsed.d; state.h = parsed.h; state.min = parsed.min;
        state.viewY = parsed.y; state.viewM = parsed.mo;
        triggerText.textContent = formatDisplay(input, parsed);
        trigger.classList.remove("fx-dp-placeholder");
      } else {
        state.y = state.mo = state.d = null; state.h = 0; state.min = 0;
        triggerText.textContent = isDateTime ? "Select date & time" : "Select date";
        trigger.classList.add("fx-dp-placeholder");
      }
    }

    var nativeDesc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
    Object.defineProperty(input, "value", {
      get: function () { return nativeDesc.get.call(input); },
      set: function (v) { nativeDesc.set.call(input, v); syncFromInput(); },
      configurable: true
    });

    function commit(dispatch) {
      if (state.y === null) {
        nativeDesc.set.call(input, "");
      } else {
        nativeDesc.set.call(input, formatValue(input, state));
      }
      syncFromInput();
      if (dispatch) {
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }

    function renderCalendar() {
      var y = state.viewY, m = state.viewM;
      var firstDow = new Date(y, m, 1).getDay();
      var daysInMonth = new Date(y, m + 1, 0).getDate();
      var html = '<div class="fx-dp-cal-head">' +
        '<button type="button" class="fx-dp-nav" data-nav="-1" aria-label="Previous month">&#8249;</button>' +
        '<span class="fx-dp-cal-title">' + MONTHS[m] + " " + y + '</span>' +
        '<button type="button" class="fx-dp-nav" data-nav="1" aria-label="Next month">&#8250;</button></div>';
      html += '<div class="fx-dp-grid fx-dp-weekdays">';
      for (var w = 0; w < 7; w++) html += '<span>' + WEEKDAYS[w] + '</span>';
      html += '</div><div class="fx-dp-grid fx-dp-days">';
      for (var i = 0; i < firstDow; i++) html += '<span class="fx-dp-day fx-dp-day-empty"></span>';
      var today = new Date();
      for (var day = 1; day <= daysInMonth; day++) {
        var isSelected = state.y === y && state.mo === m && state.d === day;
        var isToday = today.getFullYear() === y && today.getMonth() === m && today.getDate() === day;
        var cls = "fx-dp-day";
        if (isSelected) cls += " fx-dp-day-selected";
        if (isToday) cls += " fx-dp-day-today";
        html += '<button type="button" class="' + cls + '" data-day="' + day + '">' + day + '</button>';
      }
      html += '</div>';

      if (isDateTime) {
        var h12 = state.h % 12 === 0 ? 12 : state.h % 12;
        var ampm = state.h < 12 ? "AM" : "PM";
        html += '<div class="fx-dp-time-row">' +
          '<label class="fx-dp-time-label">Time</label>' +
          '<input type="number" class="fx-dp-time-input" id="fx-dp-hour-' + input.id + '" min="1" max="12" value="' + h12 + '" aria-label="Hour" />' +
          '<span class="fx-dp-time-colon">:</span>' +
          '<input type="number" class="fx-dp-time-input" id="fx-dp-min-' + input.id + '" min="0" max="59" value="' + pad2(state.min) + '" aria-label="Minute" />' +
          '<div class="fx-dp-ampm">' +
          '<button type="button" class="fx-dp-ampm-btn' + (ampm === "AM" ? " fx-dp-ampm-active" : "") + '" data-ampm="AM">AM</button>' +
          '<button type="button" class="fx-dp-ampm-btn' + (ampm === "PM" ? " fx-dp-ampm-active" : "") + '" data-ampm="PM">PM</button>' +
          '</div></div>';
      }

      html += '<div class="fx-dp-footer">' +
        '<button type="button" class="fx-dp-footer-btn" data-action="today">Today</button>' +
        '<button type="button" class="fx-dp-footer-btn" data-action="clear">Clear</button>' +
        '<button type="button" class="fx-dp-footer-btn fx-dp-footer-btn-primary" data-action="apply">Apply</button>' +
        '</div>';

      popup.innerHTML = html;
    }

    popup.addEventListener("click", function (e) {
      var navBtn = e.target.closest("[data-nav]");
      if (navBtn) {
        state.viewM += parseInt(navBtn.getAttribute("data-nav"), 10);
        if (state.viewM < 0) { state.viewM = 11; state.viewY--; }
        if (state.viewM > 11) { state.viewM = 0; state.viewY++; }
        renderCalendar();
        return;
      }
      var dayBtn = e.target.closest(".fx-dp-day:not(.fx-dp-day-empty)");
      if (dayBtn) {
        state.y = state.viewY; state.mo = state.viewM; state.d = parseInt(dayBtn.getAttribute("data-day"), 10);
        if (!isDateTime) { commit(true); closeOpenPopup(); trigger.focus(); }
        else renderCalendar();
        return;
      }
      var ampmBtn = e.target.closest("[data-ampm]");
      if (ampmBtn) {
        var wantPM = ampmBtn.getAttribute("data-ampm") === "PM";
        var curH12 = state.h % 12 === 0 ? 12 : state.h % 12;
        state.h = wantPM ? (curH12 === 12 ? 12 : curH12 + 12) : (curH12 === 12 ? 0 : curH12);
        renderCalendar();
        return;
      }
      var action = e.target.closest("[data-action]");
      if (action) {
        var act = action.getAttribute("data-action");
        if (act === "today") {
          state.y = today_().getFullYear(); state.mo = today_().getMonth(); state.d = today_().getDate();
          state.viewY = state.y; state.viewM = state.mo;
          if (isDateTime) { state.h = today_().getHours(); state.min = today_().getMinutes(); }
          renderCalendar();
        } else if (act === "clear") {
          state.y = state.mo = state.d = null; state.h = 0; state.min = 0;
          commit(true); closeOpenPopup(); trigger.focus();
        } else if (act === "apply") {
          if (state.y === null) { state.y = state.viewY; state.mo = state.viewM; state.d = today_().getDate(); }
          commit(true); closeOpenPopup(); trigger.focus();
        }
      }
    });

    popup.addEventListener("change", function (e) {
      if (e.target.id === "fx-dp-hour-" + input.id) {
        var hv = Math.min(12, Math.max(1, parseInt(e.target.value, 10) || 12));
        var wasPM = state.h >= 12;
        state.h = wasPM ? (hv === 12 ? 12 : hv + 12) : (hv === 12 ? 0 : hv);
      } else if (e.target.id === "fx-dp-min-" + input.id) {
        state.min = Math.min(59, Math.max(0, parseInt(e.target.value, 10) || 0));
      }
      renderCalendar();
    });

    function today_() { return new Date(); }

    function openThis() {
      if (openPopup && openPopup.input === input) return;
      closeOpenPopup();
      if (state.y === null) { state.viewY = today_().getFullYear(); state.viewM = today_().getMonth(); }
      renderCalendar();
      popup.style.display = "block";
      trigger.setAttribute("aria-expanded", "true");

      var margin = 8;
      var triggerRect = trigger.getBoundingClientRect();
      var popupW = popup.offsetWidth;
      var popupH = popup.offsetHeight;

      var left = triggerRect.left;
      if (left + popupW > window.innerWidth - margin) {
        left = window.innerWidth - margin - popupW;
      }
      if (left < margin) left = margin;

      var openBelow = triggerRect.bottom + margin + popupH <= window.innerHeight;
      var top;
      if (openBelow || triggerRect.top - margin - popupH < margin) {
        top = triggerRect.bottom + margin;
      } else {
        top = triggerRect.top - margin - popupH;
      }

      popup.style.left = left + "px";
      popup.style.top = top + "px";

      openPopup = { wrap: wrap, popup: popup, trigger: trigger, input: input };
    }

    trigger.addEventListener("click", function () {
      if (openPopup && openPopup.input === input) closeOpenPopup();
      else openThis();
    });

    syncFromInput();
  }

  function init() {
    var inputs = document.querySelectorAll('input[type="date"], input[type="datetime-local"]');
    for (var i = 0; i < inputs.length; i++) enhance(inputs[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  global.FixoonaDatePicker = { enhance: enhance };
})(window);
