/* =========================================================
   Fixora — main.js
   Shared, dependency-free behaviors used across every page.
   ========================================================= */

document.documentElement.setAttribute("data-js", "true");

(function () {
  "use strict";

  function getBasePrefix() {
    return /\/(tools|blog)\//.test(window.location.pathname) ? "../" : "";
  }

  var SITE_INDEX = [
    { name: "Home", type: "Page", icon: "🏠", href: "index.html" },
    { name: "About", type: "Page", icon: "ℹ️", href: "about.html" },
    { name: "Contact", type: "Page", icon: "✉️", href: "contact.html" },
    { name: "PDF Compressor", type: "Tool", icon: "📄", cat: "pdf", href: "tools/pdf-compressor.html" },
    { name: "PDF to JPG", type: "Tool", icon: "🖼️", cat: "pdf", href: "tools/pdf-to-jpg.html" },
    { name: "JPG to PNG", type: "Tool", icon: "🔄", cat: "image", href: "tools/jpg-to-png.html" },
    { name: "PNG to JPG", type: "Tool", icon: "🔄", cat: "image", href: "tools/png-to-jpg.html" },
    { name: "JPG to WebP", type: "Tool", icon: "🔄", cat: "image", href: "tools/jpg-to-webp.html" },
    { name: "PNG to WebP", type: "Tool", icon: "🔄", cat: "image", href: "tools/png-to-webp.html" },
    { name: "WebP to JPG", type: "Tool", icon: "🔄", cat: "image", href: "tools/webp-to-jpg.html" },
    { name: "WebP to PNG", type: "Tool", icon: "🔄", cat: "image", href: "tools/webp-to-png.html" },
    { name: "Image Rotator", type: "Tool", icon: "🔃", cat: "image", href: "tools/image-rotator.html" },
    { name: "Image Flip", type: "Tool", icon: "🔁", cat: "image", href: "tools/image-flip.html" },
    { name: "Image Color Picker", type: "Tool", icon: "🎨", cat: "image", href: "tools/image-color-picker.html" },
    { name: "Image to Base64", type: "Tool", icon: "🔣", cat: "image", href: "tools/image-to-base64.html" },
    { name: "Photo Filters", type: "Tool", icon: "🎛️", cat: "image", href: "tools/photo-filters.html" },
    { name: "Image Metadata Viewer", type: "Tool", icon: "🔎", cat: "image", href: "tools/image-metadata-viewer.html" },
    { name: "Image Resizer", type: "Tool", icon: "📐", cat: "image", href: "tools/image-resizer.html" },
    { name: "Image Compressor", type: "Tool", icon: "🗜️", cat: "image", href: "tools/image-compressor.html" },
    { name: "Image to PDF", type: "Tool", icon: "🗂️", cat: "pdf", href: "tools/image-to-pdf.html" },
    { name: "Word Counter", type: "Tool", icon: "🔤", cat: "text", href: "tools/word-counter.html" },
    { name: "Password Generator", type: "Tool", icon: "🔐", cat: "dev", href: "tools/password-generator.html" },
    { name: "Text Case Converter", type: "Tool", icon: "🔡", cat: "text", href: "tools/text-case-converter.html" },
    { name: "Random Name Generator", type: "Tool", icon: "🎲", cat: "text", href: "tools/random-name-generator.html" },
    { name: "PDF Merger", type: "Tool", icon: "📎", cat: "pdf", href: "tools/pdf-merger.html" },
    { name: "PDF Splitter", type: "Tool", icon: "✂️", cat: "pdf", href: "tools/pdf-splitter.html" },
    { name: "PDF Rotator", type: "Tool", icon: "🔃", cat: "pdf", href: "tools/pdf-rotator.html" },
    { name: "PDF Watermark", type: "Tool", icon: "💧", cat: "pdf", href: "tools/pdf-watermark.html" },
    { name: "Extract Text from PDF", type: "Tool", icon: "📝", cat: "pdf", href: "tools/pdf-to-text.html" },
    { name: "Reorder PDF Pages", type: "Tool", icon: "🔀", cat: "pdf", href: "tools/pdf-reorder.html" },
    { name: "Compare PDFs", type: "Tool", icon: "🔍", cat: "pdf", href: "tools/pdf-compare.html" },
    { name: "PDF Metadata Editor", type: "Tool", icon: "🏷️", cat: "pdf", href: "tools/pdf-metadata.html" },
    { name: "Extract Images from PDF", type: "Tool", icon: "🖼️", cat: "pdf", href: "tools/pdf-extract-images.html" },
    { name: "PDF to PNG", type: "Tool", icon: "🖼️", cat: "pdf", href: "tools/pdf-to-png.html" },
    { name: "Crop PDF", type: "Tool", icon: "✂️", cat: "pdf", href: "tools/pdf-crop.html" },
    { name: "PDF to Grayscale", type: "Tool", icon: "⚫", cat: "pdf", href: "tools/pdf-grayscale.html" },
    { name: "Word to PDF", type: "Tool", icon: "📄", cat: "pdf", href: "tools/word-to-pdf.html" },
    { name: "Text to PDF", type: "Tool", icon: "📄", cat: "pdf", href: "tools/text-to-pdf.html" },
    { name: "Excel to PDF", type: "Tool", icon: "📄", cat: "pdf", href: "tools/excel-to-pdf.html" },
    { name: "PDF OCR", type: "Tool", icon: "🔎", cat: "pdf", href: "tools/pdf-ocr.html" },
    { name: "PDF Signer", type: "Tool", icon: "✍️", cat: "pdf", href: "tools/pdf-signer.html" },
    { name: "Favicon Generator", type: "Tool", icon: "⭐", cat: "image", href: "tools/favicon-generator.html" },
    { name: "Unit Converter", type: "Tool", icon: "📏", cat: "calc", href: "tools/unit-converter.html" },
    { name: "BMI Calculator", type: "Tool", icon: "⚖️", cat: "calc", href: "tools/bmi-calculator.html" },
    { name: "Percentage Calculator", type: "Tool", icon: "💯", cat: "calc", href: "tools/percentage-calculator.html" },
    { name: "Color Converter", type: "Tool", icon: "🎨", cat: "calc", href: "tools/color-converter.html" },
    { name: "JSON Formatter", type: "Tool", icon: "{ }", cat: "dev", href: "tools/json-formatter.html" },
    { name: "QR Code Generator", type: "Tool", icon: "▦", cat: "dev", href: "tools/qr-code-generator.html" },
    { name: "Base64 Converter", type: "Tool", icon: "🔣", cat: "dev", href: "tools/base64-converter.html" },
    { name: "URL Encoder/Decoder", type: "Tool", icon: "🔗", cat: "dev", href: "tools/url-encoder.html" },
    { name: "Text Diff Checker", type: "Tool", icon: "🔍", cat: "text", href: "tools/text-diff-checker.html" },
    { name: "Timestamp Converter", type: "Tool", icon: "🕒", cat: "calc", href: "tools/timestamp-converter.html" },
    { name: "Hash Generator", type: "Tool", icon: "#️⃣", cat: "dev", href: "tools/hash-generator.html" },
    { name: "Age Calculator", type: "Tool", icon: "🎂", cat: "calc", href: "tools/age-calculator.html" },
    { name: "PDF Page Numbers", type: "Tool", icon: "🔢", cat: "pdf", href: "tools/pdf-page-numbers.html" },
    { name: "Invoice Generator", type: "Tool", icon: "🧾", cat: "pdf", href: "tools/invoice-generator.html" },
    { name: "Image Cropper", type: "Tool", icon: "✂️", cat: "image", href: "tools/image-cropper.html" },
    { name: "Image Watermark", type: "Tool", icon: "💧", cat: "image", href: "tools/image-watermark.html" },
    { name: "Image to Text (OCR)", type: "Tool", icon: "📝", cat: "image", href: "tools/image-to-text.html" },
    { name: "Meme Generator", type: "Tool", icon: "😂", cat: "image", href: "tools/meme-generator.html" },
    { name: "Slug Generator", type: "Tool", icon: "🔗", cat: "text", href: "tools/slug-generator.html" },
    { name: "Lorem Ipsum Generator", type: "Tool", icon: "📄", cat: "text", href: "tools/lorem-ipsum-generator.html" },
    { name: "Text to Speech", type: "Tool", icon: "🔊", cat: "text", href: "tools/text-to-speech.html" },
    { name: "Loan Calculator", type: "Tool", icon: "🏦", cat: "calc", href: "tools/loan-calculator.html" },
    { name: "Tip Calculator", type: "Tool", icon: "🧾", cat: "calc", href: "tools/tip-calculator.html" },
    { name: "GPA Calculator", type: "Tool", icon: "🎓", cat: "calc", href: "tools/gpa-calculator.html" },
    { name: "Countdown Timer & Stopwatch", type: "Tool", icon: "⏱️", cat: "calc", href: "tools/countdown-timer.html" },
    { name: "CSV to JSON Converter", type: "Tool", icon: "🔀", cat: "dev", href: "tools/csv-json-converter.html" },
    { name: "Random Number Generator", type: "Tool", icon: "🔢", cat: "calc", href: "tools/random-number-generator.html" },
    { name: "Dice Roller", type: "Tool", icon: "🎲", cat: "calc", href: "tools/dice-roller.html" },
    { name: "Coin Flip", type: "Tool", icon: "🪙", cat: "calc", href: "tools/coin-flip.html" },
    { name: "Time Zone Converter", type: "Tool", icon: "🌍", cat: "calc", href: "tools/time-zone-converter.html" },
    { name: "Date Difference Calculator", type: "Tool", icon: "📅", cat: "calc", href: "tools/date-difference-calculator.html" },
    { name: "Discount Calculator", type: "Tool", icon: "🏷️", cat: "calc", href: "tools/discount-calculator.html" },
    { name: "Fuel Cost Calculator", type: "Tool", icon: "⛽", cat: "calc", href: "tools/fuel-cost-calculator.html" },
    { name: "Calorie Calculator", type: "Tool", icon: "🔥", cat: "calc", href: "tools/calorie-calculator.html" },
    { name: "Interest Calculator", type: "Tool", icon: "📈", cat: "calc", href: "tools/interest-calculator.html" },
    { name: "Grade Calculator", type: "Tool", icon: "📝", cat: "calc", href: "tools/grade-calculator.html" },
    { name: "UUID Generator", type: "Tool", icon: "🆔", cat: "dev", href: "tools/uuid-generator.html" },
    { name: "Regex Tester", type: "Tool", icon: ".*", cat: "dev", href: "tools/regex-tester.html" },
    { name: "Character Counter", type: "Tool", icon: "🔤", cat: "text", href: "tools/character-counter.html" },
    { name: "Markdown to HTML", type: "Tool", icon: "📝", cat: "dev", href: "tools/markdown-to-html.html" },
    { name: "CSS Gradient Generator", type: "Tool", icon: "🎨", cat: "dev", href: "tools/css-gradient-generator.html" },
    { name: "Number Base Converter", type: "Tool", icon: "🔢", cat: "dev", href: "tools/number-base-converter.html" },
    { name: "Duplicate Line Remover", type: "Tool", icon: "🧹", cat: "text", href: "tools/remove-duplicate-lines.html" },
    { name: "QR Code Scanner", type: "Tool", icon: "📷", cat: "dev", href: "tools/qr-code-scanner.html" },
    { name: "Password Strength Checker", type: "Tool", icon: "🛡️", cat: "dev", href: "tools/password-strength-checker.html" },
    { name: "Emoji Picker", type: "Tool", icon: "😀", cat: "text", href: "tools/emoji-picker.html" },
    { name: "Mortgage Calculator", type: "Tool", icon: "🏠", cat: "calc", href: "tools/mortgage-calculator.html" },
    { name: "Sales Tax Calculator", type: "Tool", icon: "🧾", cat: "calc", href: "tools/sales-tax-calculator.html" },
    { name: "Salary to Hourly Converter", type: "Tool", icon: "💵", cat: "calc", href: "tools/salary-hourly-converter.html" },
    { name: "Pregnancy Due Date Calculator", type: "Tool", icon: "🤰", cat: "calc", href: "tools/pregnancy-due-date-calculator.html" },
    { name: "Ovulation Calculator", type: "Tool", icon: "🌸", cat: "calc", href: "tools/ovulation-calculator.html" },
    { name: "Body Fat Calculator", type: "Tool", icon: "💪", cat: "calc", href: "tools/body-fat-calculator.html" },
    { name: "Passport Photo Maker", type: "Tool", icon: "🛂", cat: "image", href: "tools/passport-photo-maker.html" },
    { name: "Photo Collage Maker", type: "Tool", icon: "🖼️", cat: "image", href: "tools/photo-collage-maker.html" },
    { name: "Image Splitter", type: "Tool", icon: "✂️", cat: "image", href: "tools/image-splitter.html" },
    { name: "Image Blur Tool", type: "Tool", icon: "🌫️", cat: "image", href: "tools/image-blur-tool.html" },
    { name: "Signature Maker", type: "Tool", icon: "✍️", cat: "image", href: "tools/signature-maker.html" },
    { name: "PDF Redactor", type: "Tool", icon: "⬛", cat: "pdf", href: "tools/pdf-redactor.html" },
    { name: "Fancy Text Generator", type: "Tool", icon: "✨", cat: "text", href: "tools/fancy-text-generator.html" },
    { name: "Invisible Character Generator", type: "Tool", icon: "⬜", cat: "text", href: "tools/invisible-character-generator.html" },
    { name: "ASCII Text Art Generator", type: "Tool", icon: "🔠", cat: "text", href: "tools/ascii-text-art-generator.html" },
    { name: "Color Palette Generator", type: "Tool", icon: "🌈", cat: "dev", href: "tools/color-palette-generator.html" },
    { name: "HTML Entity Encoder/Decoder", type: "Tool", icon: "🔤", cat: "dev", href: "tools/html-entity-encoder.html" },
    { name: "ROT13 / Caesar Cipher", type: "Tool", icon: "🔐", cat: "dev", href: "tools/rot13-caesar-cipher.html" },
    { name: "Compress a PDF", type: "Guide", icon: "📄", href: "blog/compress-pdf-guide.html" },
    { name: "JPG vs PNG vs WebP", type: "Guide", icon: "🖼️", href: "blog/image-format-guide.html" },
    { name: "Strong Passwords", type: "Guide", icon: "🔐", href: "blog/strong-password-guide.html" },
    { name: "PDF to JPG", type: "Guide", icon: "🔄", href: "blog/pdf-to-jpg-guide.html" },
    { name: "Word Count Guide", type: "Guide", icon: "🔤", href: "blog/word-count-guide.html" },
    { name: "Organize PDF Pages", type: "Guide", icon: "📎", href: "blog/organize-pdf-pages-guide.html" },
    { name: "Photo Metadata & Privacy", type: "Guide", icon: "🔎", href: "blog/photo-metadata-privacy-guide.html" },
    { name: "WebP Conversion Guide", type: "Guide", icon: "🔄", href: "blog/webp-conversion-guide.html" },
    { name: "Simple vs Compound Interest", type: "Guide", icon: "📈", href: "blog/simple-vs-compound-interest-guide.html" },
    { name: "Compare Two Documents", type: "Guide", icon: "🔍", href: "blog/compare-text-documents-guide.html" },
    { name: "Understanding BMI", type: "Guide", icon: "⚖️", href: "blog/understanding-bmi-guide.html" },
    { name: "JSON Formatting Guide", type: "Guide", icon: "{ }", href: "blog/json-formatting-guide.html" },
    { name: "How Extra Loan Payments Save You Money", type: "Guide", icon: "🏦", href: "blog/extra-loan-payments-guide.html" },
    { name: "Base64 Encoding Explained", type: "Guide", icon: "🔣", href: "blog/base64-encoding-guide.html" },
    { name: "Hex, RGB, and HSL Color Codes", type: "Guide", icon: "🎨", href: "blog/color-codes-guide.html" },
    { name: "UUID vs GUID", type: "Guide", icon: "🆔", href: "blog/uuid-vs-guid-guide.html" },
    { name: "CSV to JSON Guide", type: "Guide", icon: "📊", href: "blog/csv-to-json-guide.html" },
    { name: "QR Codes Explained", type: "Guide", icon: "▦", href: "blog/qr-codes-explained-guide.html" },
    { name: "Passport Photo at Home", type: "Guide", icon: "🛂", href: "blog/passport-photo-at-home-guide.html" },
    { name: "Blur a Photo for Privacy", type: "Guide", icon: "🌫️", href: "blog/blur-photo-privacy-guide.html" },
    { name: "How to Redact a PDF", type: "Guide", icon: "⬛", href: "blog/redact-pdf-guide.html" },
    { name: "Fancy Text Fonts Guide", type: "Guide", icon: "✨", href: "blog/fancy-text-fonts-guide.html" },
    { name: "Regex Cheat Sheet", type: "Guide", icon: "🔍", href: "blog/regex-cheat-sheet-guide.html" },
    { name: "Password Strength Guide", type: "Guide", icon: "🛡️", href: "blog/password-strength-guide.html" },
    { name: "Mortgage Payment Guide", type: "Guide", icon: "🏠", href: "blog/mortgage-payment-guide.html" },
    { name: "Hourly vs Salary", type: "Guide", icon: "💵", href: "blog/hourly-vs-salary-guide.html" },
    { name: "How to Sign a PDF", type: "Guide", icon: "✍️", href: "blog/sign-pdf-guide.html" }
  ];

  var CATEGORIES = {
    pdf: { name: "PDF Tools", icon: "📄", anchor: "cat-pdf" },
    image: { name: "Image Tools", icon: "🖼️", anchor: "cat-image" },
    text: { name: "Text & Writing", icon: "🔤", anchor: "cat-text" },
    calc: { name: "Calculators & Converters", icon: "🧮", anchor: "cat-calc" },
    dev: { name: "Developer Tools", icon: "💻", anchor: "cat-dev" }
  };

  /* ---------- Category chip (quick jump to sibling tools) ---------- */
  function initCategoryChip() {
    if (!/\/tools\//.test(window.location.pathname)) return;

    var currentFile = "tools/" + window.location.pathname.split("/").pop();
    var entry = SITE_INDEX.filter(function (item) { return item.type === "Tool" && item.href === currentFile; })[0];
    if (!entry || !entry.cat) return;

    var cat = CATEGORIES[entry.cat];
    if (!cat) return;

    var breadcrumb = document.querySelector(".breadcrumb");
    if (!breadcrumb) return;

    var chip = document.createElement("a");
    chip.className = "category-chip";
    chip.href = "../index.html#" + cat.anchor;
    chip.innerHTML = '<span aria-hidden="true">' + cat.icon + '</span> More ' + cat.name;
    breadcrumb.parentElement.insertBefore(chip, breadcrumb.nextSibling);
  }

  /* ---------- Command palette (Cmd/Ctrl+K) ---------- */
  function initCommandPalette() {
    var basePrefix = getBasePrefix();

    var navLinks = document.querySelector(".nav-links");
    if (navLinks) {
      var li = document.createElement("li");
      var triggerBtn = document.createElement("button");
      triggerBtn.type = "button";
      triggerBtn.className = "cmdk-trigger";
      triggerBtn.id = "cmdkTrigger";
      triggerBtn.innerHTML = "🔍 Search";
      li.appendChild(triggerBtn);
      navLinks.insertBefore(li, navLinks.firstChild);
    }

    var overlay = document.createElement("div");
    overlay.className = "cmdk-overlay";
    overlay.innerHTML =
      '<div class="cmdk-box">' +
        '<div class="cmdk-input-row">' +
          '<span class="cmdk-icon">🔍</span>' +
          '<input type="text" id="cmdkInput" placeholder="Search tools and guides…" autocomplete="off" />' +
        '</div>' +
        '<div class="cmdk-results" id="cmdkResults"></div>' +
      '</div>';
    document.body.appendChild(overlay);

    var input = overlay.querySelector("#cmdkInput");
    var resultsEl = overlay.querySelector("#cmdkResults");
    var activeIndex = 0;
    var currentResults = [];

    function render(list) {
      currentResults = list;
      activeIndex = 0;
      resultsEl.innerHTML = "";

      if (!list.length) {
        var empty = document.createElement("div");
        empty.className = "cmdk-empty";
        empty.textContent = "No matches. Try a different search.";
        resultsEl.appendChild(empty);
        return;
      }

      list.forEach(function (item, i) {
        var row = document.createElement("div");
        row.className = "cmdk-item" + (i === 0 ? " active" : "");
        row.setAttribute("data-href", item.href);

        var iconEl = document.createElement("span");
        iconEl.className = "cmdk-item-icon";
        iconEl.textContent = item.icon;

        var textEl = document.createElement("span");
        textEl.className = "cmdk-item-text";
        var nameEl = document.createElement("span");
        nameEl.className = "cmdk-item-name";
        nameEl.textContent = item.name;
        var typeEl = document.createElement("span");
        typeEl.className = "cmdk-item-type";
        typeEl.textContent = item.type;
        textEl.appendChild(nameEl);
        textEl.appendChild(document.createElement("br"));
        textEl.appendChild(typeEl);

        row.appendChild(iconEl);
        row.appendChild(textEl);
        resultsEl.appendChild(row);
      });
    }

    function scoreMatch(name, q) {
      var lower = name.toLowerCase();
      if (lower === q) return 0;
      if (lower.indexOf(q) === 0) return 1;
      var words = lower.split(/\s+/);
      if (words.some(function (w) { return w.indexOf(q) === 0; })) return 2;
      if (lower.indexOf(q) !== -1) return 3;
      return -1;
    }

    function filterResults(q) {
      q = q.trim().toLowerCase();
      if (!q) return SITE_INDEX;
      return SITE_INDEX.map(function (item) {
        return { item: item, score: scoreMatch(item.name, q) };
      }).filter(function (s) {
        return s.score !== -1;
      }).sort(function (a, b) {
        return a.score - b.score;
      }).map(function (s) {
        return s.item;
      });
    }

    function updateActive() {
      var items = resultsEl.querySelectorAll(".cmdk-item");
      items.forEach(function (el, i) {
        el.classList.toggle("active", i === activeIndex);
      });
      if (items[activeIndex]) items[activeIndex].scrollIntoView({ block: "nearest" });
    }

    function navigateTo(href) {
      window.location.href = basePrefix + href;
    }

    function open() {
      render(SITE_INDEX);
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
      setTimeout(function () { input.focus(); }, 50);
    }

    function close() {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
      input.value = "";
    }

    if (triggerBtn) triggerBtn.addEventListener("click", open);

    document.querySelectorAll("[data-cmdk-open]").forEach(function (el) {
      el.addEventListener("click", open);
    });

    document.addEventListener("keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (overlay.classList.contains("open")) close(); else open();
      } else if (e.key === "Escape" && overlay.classList.contains("open")) {
        close();
      }
    });

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });

    input.addEventListener("input", function () {
      render(filterResults(input.value));
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, currentResults.length - 1);
        updateActive();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        updateActive();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (currentResults[activeIndex]) navigateTo(currentResults[activeIndex].href);
      }
    });

    resultsEl.addEventListener("click", function (e) {
      var item = e.target.closest(".cmdk-item");
      if (item) navigateTo(item.getAttribute("data-href"));
    });

    resultsEl.addEventListener("mousemove", function (e) {
      var item = e.target.closest(".cmdk-item");
      if (!item) return;
      var items = Array.prototype.slice.call(resultsEl.querySelectorAll(".cmdk-item"));
      var idx = items.indexOf(item);
      if (idx !== activeIndex) { activeIndex = idx; updateActive(); }
    });
  }

  /* ---------- Cookie / privacy banner ---------- */
  function initCookieBanner() {
    var STORAGE_KEY = "fixora_cookie_ack";
    if (localStorage.getItem(STORAGE_KEY)) return;

    var banner = document.createElement("div");
    banner.className = "cookie-banner";

    var p = document.createElement("p");
    p.textContent = "We use minimal cookies for basic analytics and to support the free ads that keep every tool free. ";
    var link = document.createElement("a");
    link.href = getBasePrefix() + "privacy-policy.html";
    link.textContent = "Privacy Policy";
    p.appendChild(link);

    var btn = document.createElement("button");
    btn.className = "btn btn-primary";
    btn.type = "button";
    btn.textContent = "Got it";

    banner.appendChild(p);
    banner.appendChild(btn);
    document.body.appendChild(banner);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () { banner.classList.add("show"); });
    });

    btn.addEventListener("click", function () {
      banner.classList.remove("show");
      localStorage.setItem(STORAGE_KEY, "1");
      setTimeout(function () { banner.remove(); }, 450);
    });
  }

  /* ---------- Back-to-top button ---------- */
  function initBackToTop() {
    var btn = document.createElement("button");
    btn.className = "back-to-top";
    btn.type = "button";
    btn.setAttribute("aria-label", "Back to top");
    btn.textContent = "↑";
    document.body.appendChild(btn);

    window.addEventListener("scroll", function () {
      btn.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Hero cursor-glow ---------- */
  function initHeroGlow() {
    var hero = document.querySelector(".hero");
    if (!hero) return;

    var glow = document.createElement("div");
    glow.className = "hero-glow";
    hero.insertBefore(glow, hero.firstChild);

    if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;

    hero.addEventListener("mousemove", function (e) {
      var rect = hero.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      glow.style.setProperty("--gx", x + "%");
      glow.style.setProperty("--gy", y + "%");
      glow.classList.add("active");
    });

    hero.addEventListener("mouseleave", function () {
      glow.classList.remove("active");
    });
  }

  /* ---------- Output-box completion flash ---------- */
  function initOutputFlash() {
    if (!("MutationObserver" in window)) return;
    var boxes = document.querySelectorAll(".output-box");
    if (!boxes.length) return;

    boxes.forEach(function (box) {
      var lastText = box.textContent;
      var debounceTimer = null;

      var observer = new MutationObserver(function () {
        var newText = box.textContent;
        if (newText === lastText) return;
        lastText = newText;
        if (!newText) return;

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
          box.classList.remove("flash");
          void box.offsetWidth;
          box.classList.add("flash");
        }, 180);
      });

      observer.observe(box, { childList: true, characterData: true, subtree: true });
    });
  }

  /* ---------- Scroll-reveal (IntersectionObserver) ---------- */
  function initScrollReveal() {
    var targets = document.querySelectorAll(".reveal, .reveal-group");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    targets.forEach(function (el) { observer.observe(el); });

    // Safety net: content must never stay invisible indefinitely — if a
    // target hasn't scrolled into view within a few seconds (slow devices,
    // print, non-scrolling crawlers/screenshot tools), reveal it anyway.
    setTimeout(function () {
      targets.forEach(function (el) {
        if (!el.classList.contains("in-view")) {
          el.classList.add("in-view");
          observer.unobserve(el);
        }
      });
    }, 2500);
  }

  /* ---------- Count-up numbers (hero stats, etc.) ---------- */
  function initCountUp() {
    var targets = document.querySelectorAll("[data-count-to]");
    if (!targets.length) return;

    function animate(el) {
      var end = parseFloat(el.getAttribute("data-count-to"));
      var suffix = el.getAttribute("data-count-suffix") || "";
      var duration = 900;
      var start = null;

      function step(timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.round(end * eased);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      targets.forEach(animate);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Theme toggle (light / dark) ---------- */
  var THEME_KEY = "fixora_theme";

  function storedTheme() {
    try {
      var t = localStorage.getItem(THEME_KEY);
      return (t === "light" || t === "dark") ? t : null;
    } catch (e) {
      return null;
    }
  }

  function effectiveTheme() {
    return storedTheme() || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  function initThemeToggle() {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;

    btn.setAttribute("aria-pressed", effectiveTheme() === "dark" ? "true" : "false");

    btn.addEventListener("click", function () {
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      btn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  /* ---------- Mobile nav toggle ---------- */
  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Footer year ---------- */
  function initFooterYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Recently used tools (localStorage) ---------- */
  var RECENT_KEY = "fixora_recent_tools";
  var RECENT_MAX = 8;

  function currentToolEntry() {
    var filename = window.location.pathname.split("/").pop();
    if (!filename) return null;
    return SITE_INDEX.filter(function (item) {
      return item.type === "Tool" && item.href.split("/").pop() === filename;
    })[0] || null;
  }

  function readRecentHrefs() {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function recordRecentVisit() {
    var entry = currentToolEntry();
    if (!entry) return;
    try {
      var stored = readRecentHrefs().filter(function (href) { return href !== entry.href; });
      stored.unshift(entry.href);
      localStorage.setItem(RECENT_KEY, JSON.stringify(stored.slice(0, RECENT_MAX)));
    } catch (e) {
      // localStorage unavailable (private browsing, etc.) — fail silently
    }
  }

  function renderRecentlyUsed() {
    var section = document.getElementById("recentlyUsedSection");
    if (!section) return;

    var hrefs = readRecentHrefs();
    if (!hrefs.length) return;

    var grid = section.querySelector(".grid");
    if (!grid) return;

    var basePrefix = getBasePrefix();
    var count = 0;
    hrefs.forEach(function (href) {
      var entry = SITE_INDEX.filter(function (item) { return item.href === href; })[0];
      if (!entry) return;
      var card = document.createElement("a");
      card.className = "card";
      card.href = basePrefix + entry.href;
      card.innerHTML =
        '<span class="icon" aria-hidden="true">' + entry.icon + '</span>' +
        '<h3>' + entry.name + '</h3>' +
        '<span class="card-cta">Open tool →</span>';
      grid.appendChild(card);
      count++;
    });

    if (count > 0) section.style.display = "block";
  }

  /* ---------- Category pill filters (optional, tool cards) ---------- */
  function initPillFilters() {
    var pills = document.querySelectorAll("[data-filter-pill]");
    if (!pills.length) return;

    var cards = Array.prototype.slice.call(document.querySelectorAll("[data-category]"));

    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        pills.forEach(function (p) { p.classList.remove("active"); });
        pill.classList.add("active");
        var value = pill.getAttribute("data-filter-pill");

        cards.forEach(function (card) {
          var cat = card.getAttribute("data-category");
          card.hidden = value !== "all" && cat !== value;
        });
      });
    });
  }

  /* ---------- Toast notifications ---------- */
  function ensureToastContainer() {
    var el = document.querySelector(".toast-container");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast-container";
      document.body.appendChild(el);
    }
    return el;
  }

  function showToast(message, duration) {
    var container = ensureToastContainer();
    var toast = document.createElement("div");
    toast.className = "toast";

    var icon = document.createElement("span");
    icon.className = "toast-icon";
    icon.textContent = "✓";

    var text = document.createElement("span");
    text.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(text);
    container.appendChild(toast);

    requestAnimationFrame(function () { toast.classList.add("show"); });

    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () { toast.remove(); }, 300);
    }, duration || 2400);
  }

  /* ---------- Shared helpers exposed for tool pages ---------- */
  window.Fixora = {
    toast: showToast,
    siteIndex: SITE_INDEX,
    categories: CATEGORIES,
    basePrefix: getBasePrefix(),

    copyText: function (text, noteEl) {
      if (!text) return;
      var done = function () {
        if (noteEl) {
          noteEl.textContent = "Copied to clipboard!";
          setTimeout(function () { noteEl.textContent = ""; }, 2000);
        }
        showToast("Copied to clipboard!");
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          Fixora.fallbackCopy(text);
          done();
        });
      } else {
        Fixora.fallbackCopy(text);
        done();
      }
    },

    /* Copies both plain text and monospace-styled HTML, so apps with rich
       paste (Google Docs, Word, Gmail) render fixed-width ASCII/character
       grids correctly instead of collapsing under a proportional font. */
    copyRichText: function (plainText, htmlText, noteEl) {
      if (!plainText) return;
      var done = function () {
        if (noteEl) {
          noteEl.textContent = "Copied to clipboard!";
          setTimeout(function () { noteEl.textContent = ""; }, 2000);
        }
        showToast("Copied to clipboard!");
      };
      if (navigator.clipboard && window.ClipboardItem) {
        try {
          var item = new ClipboardItem({
            "text/plain": new Blob([plainText], { type: "text/plain" }),
            "text/html": new Blob([htmlText], { type: "text/html" })
          });
          navigator.clipboard.write([item]).then(done).catch(function () {
            Fixora.copyText(plainText, noteEl);
          });
          return;
        } catch (e) {
          // Unsupported in this browser — fall through to plain copy.
        }
      }
      Fixora.copyText(plainText, noteEl);
    },

    fallbackCopy: function (text) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) { /* no-op */ }
      document.body.removeChild(ta);
    },

    downloadBlob: function (blob, filename) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    },

    formatBytes: function (bytes) {
      if (bytes === 0) return "0 B";
      var units = ["B", "KB", "MB", "GB"];
      var i = Math.floor(Math.log(bytes) / Math.log(1024));
      return (bytes / Math.pow(1024, i)).toFixed(2) + " " + units[i];
    },

    setupDropzone: function (dropzoneEl, inputEl, onFiles) {
      if (!dropzoneEl || !inputEl) return;

      dropzoneEl.addEventListener("click", function () { inputEl.click(); });

      dropzoneEl.addEventListener("dragover", function (e) {
        e.preventDefault();
        dropzoneEl.classList.add("dragover");
      });

      dropzoneEl.addEventListener("dragleave", function () {
        dropzoneEl.classList.remove("dragover");
      });

      dropzoneEl.addEventListener("drop", function (e) {
        e.preventDefault();
        dropzoneEl.classList.remove("dragover");
        if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
      });

      inputEl.addEventListener("change", function () {
        if (inputEl.files.length) onFiles(inputEl.files);
      });
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    initThemeToggle();
    initNavToggle();
    initFooterYear();
    initPillFilters();
    initScrollReveal();
    initCountUp();
    initCommandPalette();
    initCategoryChip();
    initCookieBanner();
    initBackToTop();
    initHeroGlow();
    initOutputFlash();
    recordRecentVisit();
    renderRecentlyUsed();
  });
})();
