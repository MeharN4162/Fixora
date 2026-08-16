/*
 * Fixora — shared press-and-hold drag reordering helper.
 *
 * Pointer-Events based (mouse + touch + pen in one code path). Used by
 * pdf-reorder.html, pdf-merger.html and photo-collage-maker.html to let
 * people reorder a list of items by pressing, holding, and dragging them
 * to a new position — the underlying data array is reordered live, and
 * the tool's own render function is called to keep the DOM in sync.
 *
 * Usage:
 *   FixoraReorder.enable({
 *     container: listEl,            // parent element that holds the items
 *     itemSelector: ".my-item",     // selector matching each item (must carry data-index)
 *     handleSelector: ".drag-handle", // optional — restrict drag-start to this element
 *     ignoreSelector: "button",     // optional — pointerdown here never starts a drag
 *     onMove: function (from, to) { ... return true/false },
 *     render: function () { ... },  // re-renders items from the data array (must set data-index)
 *     onDrop: function () { ... }   // optional, called once when the drag ends
 *   });
 *
 * Items rendered by `render()` must each carry a `data-index` attribute
 * equal to their current position (0-based) within the data array.
 */
(function (global) {
  "use strict";

  var GRIP_SVG =
    '<svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" aria-hidden="true">' +
    '<circle cx="6" cy="4" r="1.6"></circle><circle cx="14" cy="4" r="1.6"></circle>' +
    '<circle cx="6" cy="10" r="1.6"></circle><circle cx="14" cy="10" r="1.6"></circle>' +
    '<circle cx="6" cy="16" r="1.6"></circle><circle cx="14" cy="16" r="1.6"></circle>' +
    "</svg>";

  function moveItem(arr, from, to) {
    if (from === to || from < 0 || to < 0 || from >= arr.length || to >= arr.length) return false;
    var item = arr.splice(from, 1)[0];
    arr.splice(to, 0, item);
    return true;
  }

  function enable(config) {
    var container = config.container;
    var itemSelector = config.itemSelector;
    var handleSelector = config.handleSelector || null;
    var ignoreSelector = config.ignoreSelector || null;
    var onMove = config.onMove;
    var render = config.render;
    var onDragStart = config.onDragStart || function () {};
    var onDrop = config.onDrop || function () {};

    var dragEl = null;
    var ghost = null;
    var dragIndex = -1;
    var offsetX = 0;
    var offsetY = 0;
    var activePointerId = null;
    var scrollDir = 0;
    var scrollRAF = null;

    function itemAt(index) {
      return container.querySelector('[data-index="' + index + '"]');
    }

    function startAutoScroll(dir) {
      scrollDir = dir;
      if (scrollRAF) return;
      function step() {
        if (!scrollDir) {
          scrollRAF = null;
          return;
        }
        window.scrollBy(0, scrollDir * 14);
        scrollRAF = requestAnimationFrame(step);
      }
      scrollRAF = requestAnimationFrame(step);
    }

    function stopAutoScroll() {
      scrollDir = 0;
    }

    function maybeAutoScroll(clientY) {
      var edge = 64;
      if (clientY < edge && window.scrollY > 0) {
        startAutoScroll(-1);
      } else if (clientY > window.innerHeight - edge) {
        startAutoScroll(1);
      } else {
        stopAutoScroll();
      }
    }

    function findHoverIndex(x, y) {
      var items = container.querySelectorAll(itemSelector);
      var bestIdx = null;
      var bestDist = Infinity;
      for (var i = 0; i < items.length; i++) {
        var el = items[i];
        var idxAttr = el.getAttribute("data-index");
        if (idxAttr === null) continue;
        var idx = parseInt(idxAttr, 10);
        var r = el.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
          return idx;
        }
        var cx = r.left + r.width / 2;
        var cy = r.top + r.height / 2;
        var d = (x - cx) * (x - cx) + (y - cy) * (y - cy);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = idx;
        }
      }
      return bestIdx;
    }

    function cleanupDrag() {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onPointerUp);
      stopAutoScroll();
      if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
      ghost = null;
      if (dragEl) {
        dragEl.style.opacity = "";
        dragEl.classList.remove("fx-drag-source");
      }
      dragEl = null;
      dragIndex = -1;
      activePointerId = null;
      document.body.classList.remove("fx-drag-active");
    }

    function onPointerMove(e) {
      if (e.pointerId !== activePointerId || !ghost) return;
      ghost.style.left = e.clientX - offsetX + "px";
      ghost.style.top = e.clientY - offsetY + "px";

      var hoverIndex = findHoverIndex(e.clientX, e.clientY);
      if (hoverIndex !== null && hoverIndex !== dragIndex) {
        if (onMove(dragIndex, hoverIndex) !== false) {
          dragIndex = hoverIndex;
          render();
          var newEl = itemAt(dragIndex);
          if (newEl) {
            dragEl = newEl;
            dragEl.style.opacity = "0.35";
            dragEl.classList.add("fx-drag-source");
          }
        }
      }
      maybeAutoScroll(e.clientY);
      e.preventDefault();
    }

    function onPointerUp(e) {
      if (e.pointerId !== activePointerId) return;
      cleanupDrag();
      onDrop();
    }

    function onPointerDown(e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      if (ignoreSelector && e.target.closest(ignoreSelector)) return;
      var item = e.target.closest(itemSelector);
      if (!item || !container.contains(item)) return;
      if (handleSelector && !e.target.closest(handleSelector)) return;

      var idxAttr = item.getAttribute("data-index");
      if (idxAttr === null) return;

      dragIndex = parseInt(idxAttr, 10);
      dragEl = item;
      activePointerId = e.pointerId;

      var rect = item.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      ghost = item.cloneNode(true);
      ghost.classList.add("fx-drag-ghost");
      ghost.style.position = "fixed";
      ghost.style.left = rect.left + "px";
      ghost.style.top = rect.top + "px";
      ghost.style.width = rect.width + "px";
      ghost.style.height = rect.height + "px";
      ghost.style.margin = "0";
      ghost.style.pointerEvents = "none";
      ghost.style.zIndex = "9999";
      ghost.style.boxShadow = "var(--shadow-md)";
      ghost.style.transform = "scale(1.03)";
      ghost.style.opacity = "0.97";
      ghost.style.transition = "none";
      ghost.style.cursor = "grabbing";
      document.body.appendChild(ghost);

      dragEl.style.opacity = "0.35";
      dragEl.classList.add("fx-drag-source");
      document.body.classList.add("fx-drag-active");

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);
      document.addEventListener("pointercancel", onPointerUp);

      onDragStart(dragIndex);
      e.preventDefault();
    }

    container.addEventListener("pointerdown", onPointerDown);

    return {
      destroy: function () {
        container.removeEventListener("pointerdown", onPointerDown);
        cleanupDrag();
      }
    };
  }

  global.FixoraReorder = { enable: enable, moveItem: moveItem, gripSVG: GRIP_SVG };
})(window);
