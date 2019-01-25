(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.cursor = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getCursorsPosition = getCursorsPosition;
  exports.setCursorsPosition = setCursorsPosition;
  /**
   * get position of input cursor
   */
  function getCursorsPosition(ctrl) {
    /* istanbul ignore if */
    if (!ctrl) {
      return 0;
    }
    var CaretPos = 0; // IE Support
    /* istanbul ignore next */
    if (document.selection) {
      ctrl.focus();
      var Sel = document.selection.createRange();
      Sel.moveStart('character', -ctrl.value.length);
      CaretPos = Sel.text.length;
    } else if (ctrl.selectionStart || ctrl.selectionStart === '0') {
      // Firefox support
      CaretPos = ctrl.selectionStart;
    }
    return CaretPos;
  }

  /**
   * set position of input cursor
   */
  function setCursorsPosition(ctrl, pos) {
    /* istanbul ignore if */
    if (!ctrl) {
      return;
    }
    setTimeout(function () {
      /* istanbul ignore next */
      if (ctrl.setSelectionRange) {
        ctrl.focus();
        ctrl.setSelectionRange(pos, pos);
      } else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    }, 0);
  }
});