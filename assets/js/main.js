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
    { name: "Home", type: "Page", icon: "🏠", href: "index" },
    { name: "About", type: "Page", icon: "ℹ️", href: "about" },
    { name: "Contact", type: "Page", icon: "✉️", href: "contact" },
    { name: "PDF Compressor", type: "Tool", icon: "📄", cat: "pdf", href: "tools/pdf-compressor" },
    { name: "PDF to JPG", type: "Tool", icon: "🖼️", cat: "pdf", href: "tools/pdf-to-jpg" },
    { name: "JPG to PNG", type: "Tool", icon: "🔄", cat: "image", href: "tools/jpg-to-png" },
    { name: "PNG to JPG", type: "Tool", icon: "🔄", cat: "image", href: "tools/png-to-jpg" },
    { name: "JPG to WebP", type: "Tool", icon: "🔄", cat: "image", href: "tools/jpg-to-webp" },
    { name: "PNG to WebP", type: "Tool", icon: "🔄", cat: "image", href: "tools/png-to-webp" },
    { name: "WebP to JPG", type: "Tool", icon: "🔄", cat: "image", href: "tools/webp-to-jpg" },
    { name: "WebP to PNG", type: "Tool", icon: "🔄", cat: "image", href: "tools/webp-to-png" },
    { name: "Image Rotator", type: "Tool", icon: "🔃", cat: "image", href: "tools/image-rotator" },
    { name: "Image Flip", type: "Tool", icon: "🔁", cat: "image", href: "tools/image-flip" },
    { name: "Image Color Picker", type: "Tool", icon: "🎨", cat: "image", href: "tools/image-color-picker" },
    { name: "Color Blindness Simulator", type: "Tool", icon: "👁️", cat: "image", href: "tools/color-blindness-simulator" },
    { name: "Love Calculator", type: "Tool", icon: "💘", cat: "fun", href: "tools/love-calculator" },
    { name: "Zodiac Sign Calculator", type: "Tool", icon: "♈", cat: "fun", href: "tools/zodiac-sign-calculator" },
    { name: "Chinese Zodiac Calculator", type: "Tool", icon: "🐉", cat: "fun", href: "tools/chinese-zodiac-calculator" },
    { name: "Random Decision Wheel", type: "Tool", icon: "🎡", cat: "fun", href: "tools/random-decision-wheel" },
    { name: "Roman Numeral Converter", type: "Tool", icon: "Ⅻ", cat: "calc", href: "tools/roman-numeral-converter" },
    { name: "Number to Words Converter", type: "Tool", icon: "🔤", cat: "calc", href: "tools/number-to-words-converter" },
    { name: "Typing Speed Test", type: "Tool", icon: "⌨️", cat: "fun", href: "tools/typing-speed-test" },
    { name: "Reaction Time Test", type: "Tool", icon: "⚡", cat: "fun", href: "tools/reaction-time-test" },
    { name: "IP Subnet Calculator", type: "Tool", icon: "🌐", cat: "dev", href: "tools/ip-subnet-calculator" },
    { name: "User Agent Parser", type: "Tool", icon: "🕵️", cat: "dev", href: "tools/user-agent-parser" },
    { name: "YAML to JSON Converter", type: "Tool", icon: "📄", cat: "dev", href: "tools/yaml-json-converter" },
    { name: "XML Formatter & Validator", type: "Tool", icon: "📰", cat: "dev", href: "tools/xml-formatter" },
    { name: "CSS Minifier", type: "Tool", icon: "🎨", cat: "dev", href: "tools/css-minifier" },
    { name: "HTML Minifier", type: "Tool", icon: "📝", cat: "dev", href: "tools/html-minifier" },
    { name: "Online To-Do List", type: "Tool", icon: "✅", cat: "text", href: "tools/online-todo-list" },
    { name: "Sticky Notes", type: "Tool", icon: "🗒️", cat: "text", href: "tools/sticky-notes" },
    { name: "YouTube Thumbnail Downloader", type: "Tool", icon: "▶️", cat: "media", href: "tools/youtube-thumbnail-downloader" },
    { name: "Sudoku Solver", type: "Tool", icon: "🧩", cat: "fun", href: "tools/sudoku-solver" },
    { name: "Color Contrast Checker", type: "Tool", icon: "🔲", cat: "dev", href: "tools/contrast-ratio-checker" },
    { name: "Aspect Ratio Calculator", type: "Tool", icon: "📐", cat: "calc", href: "tools/aspect-ratio-calculator" },
    { name: "Business Days Calculator", type: "Tool", icon: "📅", cat: "calc", href: "tools/business-days-calculator" },
    { name: "Morse Code Translator", type: "Tool", icon: "📡", cat: "dev", href: "tools/morse-code-translator" },
    { name: "Mock JSON Data Generator", type: "Tool", icon: "🧬", cat: "dev", href: "tools/mock-json-data-generator" },
    { name: "What Is My IP Address", type: "Tool", icon: "🌍", cat: "dev", href: "tools/what-is-my-ip" },
    { name: "World Clock", type: "Tool", icon: "🕐", cat: "calc", href: "tools/world-clock" },
    { name: "Scientific Calculator", type: "Tool", icon: "🧮", cat: "calc", href: "tools/scientific-calculator" },
    { name: "Age Difference Calculator", type: "Tool", icon: "👥", cat: "calc", href: "tools/age-difference-calculator" },
    { name: "Screen Resolution Checker", type: "Tool", icon: "🖥️", cat: "dev", href: "tools/screen-resolution-checker" },
    { name: "Word Unscrambler & Anagram Solver", type: "Tool", icon: "🔤", cat: "text", href: "tools/word-unscrambler" },
    { name: "WiFi QR Code Generator", type: "Tool", icon: "📶", cat: "dev", href: "tools/wifi-qr-code-generator" },
    { name: "Palindrome Checker", type: "Tool", icon: "🔁", cat: "text", href: "tools/palindrome-checker" },
    { name: "Savings Goal Calculator", type: "Tool", icon: "🏦", cat: "calc", href: "tools/savings-goal-calculator" },
    { name: "Robots.txt Generator", type: "Tool", icon: "🤖", cat: "dev", href: "tools/robots-txt-generator" },
    { name: "Random Team Name Generator", type: "Tool", icon: "🏆", cat: "fun", href: "tools/random-team-name-generator" },
    { name: "NATO Phonetic Alphabet Converter", type: "Tool", icon: "📻", cat: "dev", href: "tools/nato-phonetic-alphabet-converter" },
    { name: "Cron Expression Parser", type: "Tool", icon: "⏲️", cat: "dev", href: "tools/cron-expression-parser" },
    { name: "Readability Score Checker", type: "Tool", icon: "📖", cat: "text", href: "tools/readability-score-checker" },
    { name: "Word Frequency Counter", type: "Tool", icon: "📊", cat: "text", href: "tools/word-frequency-counter" },
    { name: "Habit Tracker", type: "Tool", icon: "🔥", cat: "text", href: "tools/habit-tracker" },
    { name: "Loan Amortization Schedule", type: "Tool", icon: "📉", cat: "calc", href: "tools/loan-amortization-schedule" },
    { name: "Running Pace Calculator", type: "Tool", icon: "🏃", cat: "calc", href: "tools/running-pace-calculator" },
    { name: "Ideal Weight Calculator", type: "Tool", icon: "⚖️", cat: "calc", href: "tools/ideal-weight-calculator" },
    { name: "Cooking Measurement Converter", type: "Tool", icon: "🥄", cat: "calc", href: "tools/cooking-measurement-converter" },
    { name: "Text Repeater", type: "Tool", icon: "🔁", cat: "text", href: "tools/text-repeater" },
    { name: "vCard QR Code Generator", type: "Tool", icon: "📇", cat: "dev", href: "tools/vcard-qr-code-generator" },
    { name: "Braille Translator", type: "Tool", icon: "⠃", cat: "dev", href: "tools/braille-translator" },
    { name: "File Size Converter", type: "Tool", icon: "💾", cat: "calc", href: "tools/file-size-converter" },
    { name: "CSS Fluid Typography Calculator", type: "Tool", icon: "🔠", cat: "dev", href: "tools/css-fluid-typography-calculator" },
    { name: "Prime Number Checker & Generator", type: "Tool", icon: "🔢", cat: "calc", href: "tools/prime-number-checker" },
    { name: "Quadratic Equation Solver", type: "Tool", icon: "📐", cat: "calc", href: "tools/quadratic-equation-solver" },
    { name: "GCD & LCM Calculator", type: "Tool", icon: "➗", cat: "calc", href: "tools/gcd-lcm-calculator" },
    { name: "Color Name Finder", type: "Tool", icon: "🎨", cat: "dev", href: "tools/color-name-finder" },
    { name: "Image to Base64", type: "Tool", icon: "🔣", cat: "image", href: "tools/image-to-base64" },
    { name: "Photo Filters", type: "Tool", icon: "🎛️", cat: "image", href: "tools/photo-filters" },
    { name: "Image Metadata Viewer", type: "Tool", icon: "🔎", cat: "image", href: "tools/image-metadata-viewer" },
    { name: "Image Resizer", type: "Tool", icon: "📐", cat: "image", href: "tools/image-resizer" },
    { name: "Image Compressor", type: "Tool", icon: "🗜️", cat: "image", href: "tools/image-compressor" },
    { name: "Image to PDF", type: "Tool", icon: "🗂️", cat: "pdf", href: "tools/image-to-pdf" },
    { name: "Word Counter", type: "Tool", icon: "🔤", cat: "text", href: "tools/word-counter" },
    { name: "Password Generator", type: "Tool", icon: "🔐", cat: "dev", href: "tools/password-generator" },
    { name: "Passphrase Generator", type: "Tool", icon: "🎲", cat: "dev", href: "tools/passphrase-generator" },
    { name: "Text Case Converter", type: "Tool", icon: "🔡", cat: "text", href: "tools/text-case-converter" },
    { name: "Random Name Generator", type: "Tool", icon: "🎲", cat: "text", href: "tools/random-name-generator" },
    { name: "Team Randomizer", type: "Tool", icon: "👥", cat: "text", href: "tools/team-randomizer" },
    { name: "PDF Merger", type: "Tool", icon: "📎", cat: "pdf", href: "tools/pdf-merger" },
    { name: "PDF Splitter", type: "Tool", icon: "✂️", cat: "pdf", href: "tools/pdf-splitter" },
    { name: "PDF Rotator", type: "Tool", icon: "🔃", cat: "pdf", href: "tools/pdf-rotator" },
    { name: "PDF Watermark", type: "Tool", icon: "💧", cat: "pdf", href: "tools/pdf-watermark" },
    { name: "Extract Text from PDF", type: "Tool", icon: "📝", cat: "pdf", href: "tools/pdf-to-text" },
    { name: "Reorder PDF Pages", type: "Tool", icon: "🔀", cat: "pdf", href: "tools/pdf-reorder" },
    { name: "Compare PDFs", type: "Tool", icon: "🔍", cat: "pdf", href: "tools/pdf-compare" },
    { name: "PDF Metadata Editor", type: "Tool", icon: "🏷️", cat: "pdf", href: "tools/pdf-metadata" },
    { name: "Extract Images from PDF", type: "Tool", icon: "🖼️", cat: "pdf", href: "tools/pdf-extract-images" },
    { name: "PDF to PNG", type: "Tool", icon: "🖼️", cat: "pdf", href: "tools/pdf-to-png" },
    { name: "Crop PDF", type: "Tool", icon: "✂️", cat: "pdf", href: "tools/pdf-crop" },
    { name: "PDF to Grayscale", type: "Tool", icon: "⚫", cat: "pdf", href: "tools/pdf-grayscale" },
    { name: "Word to PDF", type: "Tool", icon: "📄", cat: "pdf", href: "tools/word-to-pdf" },
    { name: "PDF to Word", type: "Tool", icon: "📄", cat: "pdf", href: "tools/pdf-to-word" },
    { name: "Text to PDF", type: "Tool", icon: "📄", cat: "pdf", href: "tools/text-to-pdf" },
    { name: "Excel to PDF", type: "Tool", icon: "📄", cat: "pdf", href: "tools/excel-to-pdf" },
    { name: "PDF OCR", type: "Tool", icon: "🔎", cat: "pdf", href: "tools/pdf-ocr" },
    { name: "PDF Signer", type: "Tool", icon: "✍️", cat: "pdf", href: "tools/pdf-signer" },
    { name: "Favicon Generator", type: "Tool", icon: "⭐", cat: "image", href: "tools/favicon-generator" },
    { name: "Unit Converter", type: "Tool", icon: "📏", cat: "calc", href: "tools/unit-converter" },
    { name: "Currency Converter", type: "Tool", icon: "💱", cat: "calc", href: "tools/currency-converter" },
    { name: "BMI Calculator", type: "Tool", icon: "⚖️", cat: "calc", href: "tools/bmi-calculator" },
    { name: "Percentage Calculator", type: "Tool", icon: "💯", cat: "calc", href: "tools/percentage-calculator" },
    { name: "Color Converter", type: "Tool", icon: "🎨", cat: "calc", href: "tools/color-converter" },
    { name: "JSON Formatter", type: "Tool", icon: "{ }", cat: "dev", href: "tools/json-formatter" },
    { name: "QR Code Generator", type: "Tool", icon: "▦", cat: "dev", href: "tools/qr-code-generator" },
    { name: "Barcode Generator", type: "Tool", icon: "▊", cat: "dev", href: "tools/barcode-generator" },
    { name: "Voice Recorder", type: "Tool", icon: "🎙️", cat: "media", href: "tools/voice-recorder" },
    { name: "Screen Recorder", type: "Tool", icon: "🖥️", cat: "media", href: "tools/screen-recorder" },
    { name: "Speech to Text", type: "Tool", icon: "🎤", cat: "media", href: "tools/speech-to-text" },
    { name: "Base64 Converter", type: "Tool", icon: "🔣", cat: "dev", href: "tools/base64-converter" },
    { name: "URL Encoder/Decoder", type: "Tool", icon: "🔗", cat: "dev", href: "tools/url-encoder" },
    { name: "Text Diff Checker", type: "Tool", icon: "🔍", cat: "text", href: "tools/text-diff-checker" },
    { name: "Timestamp Converter", type: "Tool", icon: "🕒", cat: "calc", href: "tools/timestamp-converter" },
    { name: "Hash Generator", type: "Tool", icon: "#️⃣", cat: "dev", href: "tools/hash-generator" },
    { name: "Age Calculator", type: "Tool", icon: "🎂", cat: "calc", href: "tools/age-calculator" },
    { name: "PDF Page Numbers", type: "Tool", icon: "🔢", cat: "pdf", href: "tools/pdf-page-numbers" },
    { name: "Invoice Generator", type: "Tool", icon: "🧾", cat: "pdf", href: "tools/invoice-generator" },
    { name: "Image Cropper", type: "Tool", icon: "✂️", cat: "image", href: "tools/image-cropper" },
    { name: "Image Watermark", type: "Tool", icon: "💧", cat: "image", href: "tools/image-watermark" },
    { name: "Image to Text (OCR)", type: "Tool", icon: "📝", cat: "image", href: "tools/image-to-text" },
    { name: "Meme Generator", type: "Tool", icon: "😂", cat: "image", href: "tools/meme-generator" },
    { name: "Slug Generator", type: "Tool", icon: "🔗", cat: "text", href: "tools/slug-generator" },
    { name: "Lorem Ipsum Generator", type: "Tool", icon: "📄", cat: "text", href: "tools/lorem-ipsum-generator" },
    { name: "Text to Speech", type: "Tool", icon: "🔊", cat: "text", href: "tools/text-to-speech" },
    { name: "Loan Calculator", type: "Tool", icon: "🏦", cat: "calc", href: "tools/loan-calculator" },
    { name: "Tip Calculator", type: "Tool", icon: "🧾", cat: "calc", href: "tools/tip-calculator" },
    { name: "GPA Calculator", type: "Tool", icon: "🎓", cat: "calc", href: "tools/gpa-calculator" },
    { name: "Countdown Timer & Stopwatch", type: "Tool", icon: "⏱️", cat: "calc", href: "tools/countdown-timer" },
    { name: "Pomodoro Timer", type: "Tool", icon: "🍅", cat: "calc", href: "tools/pomodoro-timer" },
    { name: "Calendar Event Generator", type: "Tool", icon: "📆", cat: "calc", href: "tools/calendar-event-generator" },
    { name: "CSV to JSON Converter", type: "Tool", icon: "🔀", cat: "dev", href: "tools/csv-json-converter" },
    { name: "Random Number Generator", type: "Tool", icon: "🔢", cat: "calc", href: "tools/random-number-generator" },
    { name: "Dice Roller", type: "Tool", icon: "🎲", cat: "calc", href: "tools/dice-roller" },
    { name: "Coin Flip", type: "Tool", icon: "🪙", cat: "calc", href: "tools/coin-flip" },
    { name: "Time Zone Converter", type: "Tool", icon: "🌍", cat: "calc", href: "tools/time-zone-converter" },
    { name: "Date Difference Calculator", type: "Tool", icon: "📅", cat: "calc", href: "tools/date-difference-calculator" },
    { name: "Discount Calculator", type: "Tool", icon: "🏷️", cat: "calc", href: "tools/discount-calculator" },
    { name: "Fuel Cost Calculator", type: "Tool", icon: "⛽", cat: "calc", href: "tools/fuel-cost-calculator" },
    { name: "Calorie Calculator", type: "Tool", icon: "🔥", cat: "calc", href: "tools/calorie-calculator" },
    { name: "Interest Calculator", type: "Tool", icon: "📈", cat: "calc", href: "tools/interest-calculator" },
    { name: "Grade Calculator", type: "Tool", icon: "📝", cat: "calc", href: "tools/grade-calculator" },
    { name: "UUID Generator", type: "Tool", icon: "🆔", cat: "dev", href: "tools/uuid-generator" },
    { name: "Regex Tester", type: "Tool", icon: ".*", cat: "dev", href: "tools/regex-tester" },
    { name: "Character Counter", type: "Tool", icon: "🔤", cat: "text", href: "tools/character-counter" },
    { name: "Markdown to HTML", type: "Tool", icon: "📝", cat: "dev", href: "tools/markdown-to-html" },
    { name: "Markdown Table Generator", type: "Tool", icon: "📊", cat: "dev", href: "tools/markdown-table-generator" },
    { name: "CSS Gradient Generator", type: "Tool", icon: "🎨", cat: "dev", href: "tools/css-gradient-generator" },
    { name: "Number Base Converter", type: "Tool", icon: "🔢", cat: "dev", href: "tools/number-base-converter" },
    { name: "Duplicate Line Remover", type: "Tool", icon: "🧹", cat: "text", href: "tools/remove-duplicate-lines" },
    { name: "QR Code Scanner", type: "Tool", icon: "📷", cat: "dev", href: "tools/qr-code-scanner" },
    { name: "Password Strength Checker", type: "Tool", icon: "🛡️", cat: "dev", href: "tools/password-strength-checker" },
    { name: "Emoji Picker", type: "Tool", icon: "😀", cat: "text", href: "tools/emoji-picker" },
    { name: "Mortgage Calculator", type: "Tool", icon: "🏠", cat: "calc", href: "tools/mortgage-calculator" },
    { name: "Sales Tax Calculator", type: "Tool", icon: "🧾", cat: "calc", href: "tools/sales-tax-calculator" },
    { name: "Salary to Hourly Converter", type: "Tool", icon: "💵", cat: "calc", href: "tools/salary-hourly-converter" },
    { name: "Pregnancy Due Date Calculator", type: "Tool", icon: "🤰", cat: "calc", href: "tools/pregnancy-due-date-calculator" },
    { name: "Ovulation Calculator", type: "Tool", icon: "🌸", cat: "calc", href: "tools/ovulation-calculator" },
    { name: "Body Fat Calculator", type: "Tool", icon: "💪", cat: "calc", href: "tools/body-fat-calculator" },
    { name: "Passport Photo Maker", type: "Tool", icon: "🛂", cat: "image", href: "tools/passport-photo-maker" },
    { name: "Photo Collage Maker", type: "Tool", icon: "🖼️", cat: "image", href: "tools/photo-collage-maker" },
    { name: "GIF Maker", type: "Tool", icon: "🎞️", cat: "image", href: "tools/gif-maker" },
    { name: "Background Remover", type: "Tool", icon: "🪄", cat: "image", href: "tools/background-remover" },
    { name: "Image Splitter", type: "Tool", icon: "✂️", cat: "image", href: "tools/image-splitter" },
    { name: "Image Blur Tool", type: "Tool", icon: "🌫️", cat: "image", href: "tools/image-blur-tool" },
    { name: "Signature Maker", type: "Tool", icon: "✍️", cat: "image", href: "tools/signature-maker" },
    { name: "PDF Redactor", type: "Tool", icon: "⬛", cat: "pdf", href: "tools/pdf-redactor" },
    { name: "Fancy Text Generator", type: "Tool", icon: "✨", cat: "text", href: "tools/fancy-text-generator" },
    { name: "ASCII Text Art Generator", type: "Tool", icon: "🔠", cat: "text", href: "tools/ascii-text-art-generator" },
    { name: "Color Palette Generator", type: "Tool", icon: "🌈", cat: "dev", href: "tools/color-palette-generator" },
    { name: "HTML Entity Encoder/Decoder", type: "Tool", icon: "🔤", cat: "dev", href: "tools/html-entity-encoder" },
    { name: "ROT13 / Caesar Cipher", type: "Tool", icon: "🔐", cat: "dev", href: "tools/rot13-caesar-cipher" },
    { name: "JWT Decoder", type: "Tool", icon: "🔑", cat: "dev", href: "tools/jwt-decoder" },
    { name: "URL Parser", type: "Tool", icon: "🔗", cat: "dev", href: "tools/url-parser" },
    { name: "CSS Box Shadow Generator", type: "Tool", icon: "🌓", cat: "dev", href: "tools/css-box-shadow-generator" },
    { name: "Text Encryption", type: "Tool", icon: "🔒", cat: "dev", href: "tools/text-encryption" },
    { name: "Meta Tag Generator", type: "Tool", icon: "🏷️", cat: "dev", href: "tools/meta-tag-generator" },
    { name: "Cycle and Due Date Guide", type: "Guide", icon: "🌸", href: "blog/cycle-and-due-date-guide" },
    { name: "Discounts and Sales Tax Guide", type: "Guide", icon: "🏷️", href: "blog/discounts-and-sales-tax-guide" },
    { name: "Counting Days Guide", type: "Guide", icon: "📅", href: "blog/counting-days-guide" },
    { name: "Fuel Cost Guide", type: "Guide", icon: "⛽", href: "blog/fuel-cost-guide" },
    { name: "Time Zones Guide", type: "Guide", icon: "🌍", href: "blog/time-zones-guide" },
    { name: "True Randomness Guide", type: "Guide", icon: "🪙", href: "blog/true-randomness-guide" },
    { name: "Body Fat and Calorie Guide", type: "Guide", icon: "💪", href: "blog/body-fat-calorie-guide" },
    { name: "GPA and Grades Guide", type: "Guide", icon: "🎓", href: "blog/gpa-grades-guide" },
    { name: "Fun with Text Guide", type: "Guide", icon: "😀", href: "blog/fun-with-text-guide" },
    { name: "HTML Entities Guide", type: "Guide", icon: "🔤", href: "blog/html-entities-guide" },
    { name: "Number Bases Guide", type: "Guide", icon: "🔢", href: "blog/number-bases-guide" },
    { name: "Caesar Cipher Guide", type: "Guide", icon: "🔐", href: "blog/caesar-cipher-guide" },
    { name: "CSS Gradients Guide", type: "Guide", icon: "🎨", href: "blog/css-gradients-guide" },
    { name: "Naming Conventions Guide", type: "Guide", icon: "🔡", href: "blog/naming-conventions-guide" },
    { name: "URL Slug Guide", type: "Guide", icon: "🔗", href: "blog/url-slug-guide" },
    { name: "Lorem Ipsum Guide", type: "Guide", icon: "📄", href: "blog/lorem-ipsum-guide" },
    { name: "Clean Text Lists Guide", type: "Guide", icon: "🧹", href: "blog/clean-text-lists-guide" },
    { name: "Basic Image Editing", type: "Guide", icon: "✂️", href: "blog/basic-image-editing-guide" },
    { name: "Creative Photo Editing", type: "Guide", icon: "🎛️", href: "blog/creative-photo-editing-guide" },
    { name: "Favicon Guide", type: "Guide", icon: "⭐", href: "blog/favicon-guide" },
    { name: "Meme Making Guide", type: "Guide", icon: "😂", href: "blog/meme-making-guide" },
    { name: "Converting Anything to PDF", type: "Guide", icon: "📄", href: "blog/convert-to-pdf-guide" },
    { name: "Getting Content Out of a PDF", type: "Guide", icon: "📝", href: "blog/pdf-content-extraction-guide" },
    { name: "OCR Explained", type: "Guide", icon: "🔎", href: "blog/ocr-explained-guide" },
    { name: "PDF Editing Essentials", type: "Guide", icon: "✂️", href: "blog/pdf-editing-essentials-guide" },
    { name: "MD5 vs SHA-256", type: "Guide", icon: "#️⃣", href: "blog/hash-generator-guide" },
    { name: "URL Encoding Explained", type: "Guide", icon: "🔗", href: "blog/url-encoding-guide" },
    { name: "Metric vs Imperial Guide", type: "Guide", icon: "📏", href: "blog/unit-conversion-guide" },
    { name: "How Text-to-Speech Works", type: "Guide", icon: "🔊", href: "blog/text-to-speech-guide" },
    { name: "Image Resizing 101", type: "Guide", icon: "📐", href: "blog/image-resizing-guide" },
    { name: "PDF Metadata Guide", type: "Guide", icon: "🏷️", href: "blog/pdf-metadata-guide" },
    { name: "Age Calculator Guide", type: "Guide", icon: "🎂", href: "blog/age-calculator-guide" },
    { name: "Percentage Formulas Explained", type: "Guide", icon: "💯", href: "blog/percentage-calculator-guide" },
    { name: "Unix Timestamp Guide", type: "Guide", icon: "🕒", href: "blog/unix-timestamp-guide" },
    { name: "Tipping Guide", type: "Guide", icon: "🧾", href: "blog/tipping-guide" },
    { name: "Markdown Syntax Guide", type: "Guide", icon: "📝", href: "blog/markdown-guide" },
    { name: "Invoice Guide", type: "Guide", icon: "🧾", href: "blog/invoice-guide" },
    { name: "Compress a PDF", type: "Guide", icon: "📄", href: "blog/compress-pdf-guide" },
    { name: "JPG vs PNG vs WebP", type: "Guide", icon: "🖼️", href: "blog/image-format-guide" },
    { name: "Strong Passwords", type: "Guide", icon: "🔐", href: "blog/strong-password-guide" },
    { name: "PDF to JPG", type: "Guide", icon: "🔄", href: "blog/pdf-to-jpg-guide" },
    { name: "Word Count Guide", type: "Guide", icon: "🔤", href: "blog/word-count-guide" },
    { name: "Organize PDF Pages", type: "Guide", icon: "📎", href: "blog/organize-pdf-pages-guide" },
    { name: "Photo Metadata & Privacy", type: "Guide", icon: "🔎", href: "blog/photo-metadata-privacy-guide" },
    { name: "WebP Conversion Guide", type: "Guide", icon: "🔄", href: "blog/webp-conversion-guide" },
    { name: "Simple vs Compound Interest", type: "Guide", icon: "📈", href: "blog/simple-vs-compound-interest-guide" },
    { name: "Compare Two Documents", type: "Guide", icon: "🔍", href: "blog/compare-text-documents-guide" },
    { name: "Understanding BMI", type: "Guide", icon: "⚖️", href: "blog/understanding-bmi-guide" },
    { name: "JSON Formatting Guide", type: "Guide", icon: "{ }", href: "blog/json-formatting-guide" },
    { name: "How Extra Loan Payments Save You Money", type: "Guide", icon: "🏦", href: "blog/extra-loan-payments-guide" },
    { name: "Base64 Encoding Explained", type: "Guide", icon: "🔣", href: "blog/base64-encoding-guide" },
    { name: "Hex, RGB, and HSL Color Codes", type: "Guide", icon: "🎨", href: "blog/color-codes-guide" },
    { name: "UUID vs GUID", type: "Guide", icon: "🆔", href: "blog/uuid-vs-guid-guide" },
    { name: "CSV to JSON Guide", type: "Guide", icon: "📊", href: "blog/csv-to-json-guide" },
    { name: "QR Codes Explained", type: "Guide", icon: "▦", href: "blog/qr-codes-explained-guide" },
    { name: "Passport Photo at Home", type: "Guide", icon: "🛂", href: "blog/passport-photo-at-home-guide" },
    { name: "Blur a Photo for Privacy", type: "Guide", icon: "🌫️", href: "blog/blur-photo-privacy-guide" },
    { name: "How to Redact a PDF", type: "Guide", icon: "⬛", href: "blog/redact-pdf-guide" },
    { name: "Fancy Text Fonts Guide", type: "Guide", icon: "✨", href: "blog/fancy-text-fonts-guide" },
    { name: "Regex Cheat Sheet", type: "Guide", icon: "🔍", href: "blog/regex-cheat-sheet-guide" },
    { name: "Password Strength Guide", type: "Guide", icon: "🛡️", href: "blog/password-strength-guide" },
    { name: "Mortgage Payment Guide", type: "Guide", icon: "🏠", href: "blog/mortgage-payment-guide" },
    { name: "Hourly vs Salary", type: "Guide", icon: "💵", href: "blog/hourly-vs-salary-guide" },
    { name: "How to Sign a PDF", type: "Guide", icon: "✍️", href: "blog/sign-pdf-guide" }
  ];

  var CATEGORIES = {
    pdf: { name: "PDF Tools", icon: "📄", anchor: "cat-pdf" },
    image: { name: "Image Tools", icon: "🖼️", anchor: "cat-image" },
    text: { name: "Text & Writing", icon: "🔤", anchor: "cat-text" },
    calc: { name: "Calculators & Converters", icon: "🧮", anchor: "cat-calc" },
    dev: { name: "Developer Tools", icon: "💻", anchor: "cat-dev" },
    media: { name: "Audio & Video Tools", icon: "🎙️", anchor: "cat-media" },
    fun: { name: "Fun & Games", icon: "🎉", anchor: "cat-fun" }
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
    chip.href = "../index#" + cat.anchor;
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
    link.href = getBasePrefix() + "privacy-policy";
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

  /* ---------- Hero search button (forwards to the real ⌘K palette) ---------- */
  function initHeroSearchBtn() {
    var btn = document.getElementById("heroSearchBtn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var cmdkTrigger = document.getElementById("cmdkTrigger");
      if (cmdkTrigger) cmdkTrigger.click();
    });
  }

  /* ---------- Category pill row: active state follows scroll position ---------- */
  function initCategoryPills() {
    var row = document.getElementById("categoryPills");
    if (!row) return;
    var pills = Array.prototype.slice.call(row.querySelectorAll(".pill"));
    var sections = pills
      .map(function (pill) {
        var id = pill.getAttribute("data-jump");
        return id ? document.getElementById(id) : null;
      })
      .filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          pills.forEach(function (p) {
            p.classList.toggle("active", p.getAttribute("data-jump") === id);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Surprise Me: random tool picker (homepage only) ---------- */
  function initSurpriseMe() {
    var fab = document.getElementById("surpriseBtn");
    var overlay = document.getElementById("surpriseOverlay");
    if (!fab || !overlay) return;

    var toolList = SITE_INDEX.filter(function (item) { return item.type === "Tool"; });
    var iconEl = document.getElementById("surpriseIcon");
    var titleEl = document.getElementById("surpriseTitle");
    var descEl = document.getElementById("surpriseDesc");
    var linkEl = document.getElementById("surpriseLink");

    function pick() {
      var buf = new Uint32Array(1);
      crypto.getRandomValues(buf);
      return toolList[buf[0] % toolList.length];
    }

    function roll() {
      var t = pick();
      iconEl.textContent = t.icon;
      titleEl.textContent = t.name;
      descEl.textContent = "One of " + toolList.length + "+ free tools — give it a try.";
      linkEl.href = t.href;
      iconEl.classList.remove("spinning");
      void iconEl.offsetWidth;
      iconEl.classList.add("spinning");
    }

    fab.addEventListener("click", function () {
      roll();
      overlay.classList.add("open");
    });
    var againBtn = document.getElementById("surpriseAgain");
    if (againBtn) againBtn.addEventListener("click", roll);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.classList.remove("open");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("open")) overlay.classList.remove("open");
    });
  }

  /* ---------- Mascot: one friendly tip per browser session (homepage only) ---------- */
  function initMascot() {
    var wrap = document.getElementById("mascotWrap");
    if (!wrap) return;

    // Openers are generic enough to prefix any body line without a grammar
    // mismatch (including "" for a body standing on its own), so a small
    // set of openers x a larger set of bodies gives real combinatorial
    // variety without needing any server-generated text.
    var openers = ["Hey!", "Psst —", "Yo!", "So,", "Quick one —", "Just so you know —", "", "", ""];
    var bodies = [
      "How's your day going so far? Hope it's treating you well.",
      "Which tool are you here for today? There's 100+ to choose from.",
      "No pressure, but I believe in you. Whatever you're fixing, you've got this.",
      "Nothing you upload here ever leaves your browser. Not even to say hi to a server.",
      "This whole site works offline once it's loaded. No wifi, no problem.",
      "Reminder: you're doing great, and also this site is free forever.",
      "Stuck on something? There's probably a tool here for that. Almost always is.",
      "I get weirdly excited when someone finds the exact tool they needed. Go find yours.",
      "Zero sign-ups, zero accounts, zero of my business what you're working on. Carry on.",
      "Fun fact: every tool on this site runs entirely on your device, right now.",
      "Take a breath. Whatever brought you here, you're one click from done.",
      "If you're procrastinating right now, no judgment. I'm just a rectangle.",
      "You could try the Surprise Me button. It's more fun than it has any right to be.",
      "Somewhere out there, someone's using this site at 3am to fix a PDF. Respect.",
      "Dark mode or light mode? No wrong answer, I like both equally.",
      "No ads here follow you around the rest of the internet. Just the ones on this page.",
      "Password Generator, Word Counter, or something with 'PDF' in the name — the classics never miss.",
      "I'm not a real robot. I'm a very enthusiastic rectangle with a gradient.",
      "Whatever you're trying to fix today, you're already halfway there by showing up.",
      "Hot tip: bookmark this page. Future-you will thank present-you.",
      "I was going to say something profound, but honestly, go use a tool. That's the profound part.",
      "Every tool here was built to just work. No 14-step tutorial required.",
      "You have great taste in websites, by the way. Just saying.",
      "If this site ever asks you to sign up for something, that's a bug — tell someone.",
      "Somewhere between 'free' and 'actually good,' this site is trying to live.",
      "Take your time. I'll be right here being a small, friendly rectangle."
    ];

    var textEl = document.getElementById("mascotText");
    var closeBtn = document.getElementById("mascotClose");
    var hideTimer = null;

    function randomIndex(max) {
      var buf = new Uint32Array(1);
      crypto.getRandomValues(buf);
      return buf[0] % max;
    }

    function lastBodyIndex() {
      try { return parseInt(localStorage.getItem("fixora_mascot_last"), 10); } catch (e) { return -1; }
    }
    function rememberBodyIndex(i) {
      try { localStorage.setItem("fixora_mascot_last", String(i)); } catch (e) { /* ignore */ }
    }

    function compose() {
      var last = lastBodyIndex();
      var bodyIdx = randomIndex(bodies.length);
      if (bodies.length > 1 && bodyIdx === last) {
        bodyIdx = (bodyIdx + 1 + randomIndex(bodies.length - 1)) % bodies.length;
      }
      rememberBodyIndex(bodyIdx);
      var opener = openers[randomIndex(openers.length)];
      return opener ? opener + " " + bodies[bodyIdx] : bodies[bodyIdx];
    }

    function show() {
      textEl.textContent = compose();
      wrap.classList.add("show");
      clearTimeout(hideTimer);
      hideTimer = setTimeout(hide, 8000);
    }
    function hide() {
      wrap.classList.remove("show");
      clearTimeout(hideTimer);
    }

    if (closeBtn) closeBtn.addEventListener("click", hide);

    try {
      if (sessionStorage.getItem("fixora_mascot_seen")) return;
      sessionStorage.setItem("fixora_mascot_seen", "1");
    } catch (e) { /* private-browsing storage block: still fine to show once */ }

    setTimeout(show, 3000);
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

  /* ---------- Tool card description expand/collapse ---------- */
  function initCardDescExpand() {
    var cards = Array.prototype.slice.call(document.querySelectorAll(".card:not(.guide-card)"));
    cards.forEach(function (card) {
      if (card.querySelector(".card-expand-toggle")) return;
      var desc = card.querySelector("p");
      if (!desc) return;
      // Only add the toggle if the one-line clamp is actually cutting text off.
      if (desc.scrollHeight <= desc.clientHeight + 1) return;

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "card-expand-toggle";
      btn.setAttribute("aria-label", "Show full description");
      btn.innerHTML =
        '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>';

      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = card.classList.toggle("desc-expanded");
        btn.setAttribute("aria-label", isOpen ? "Hide full description" : "Show full description");
      });

      card.appendChild(btn);
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
    initCardDescExpand();
    initCookieBanner();
    initBackToTop();
    initHeroGlow();
    initOutputFlash();
    initHeroSearchBtn();
    initCategoryPills();
    initSurpriseMe();
    initMascot();
    recordRecentVisit();
    renderRecentlyUsed();
  });
})();
