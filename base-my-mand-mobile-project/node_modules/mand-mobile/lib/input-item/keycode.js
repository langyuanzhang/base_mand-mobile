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
    global.keycode = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isValidKey = isValidKey;
  // http://www.t086.com/article/4315
  var keyCodeList = exports.keyCodeList = {
    bankCard: ['8', '13', '48-57', '96-105', '108', '229'],
    phone: ['8', '13', '48-57', '96-105', '108', '229'],
    money: ['8', '13', '48-57', '96-105', '108', '110', '190', '229']
  };

  function isValidKey(type, code) {
    var list = keyCodeList[type] || '';

    if (!list) {
      return true;
    }

    var res = false;

    for (var i = 0, len = list.length; i < len; i++) {
      var itemParts = list[i].split('-');
      var min = +itemParts[0];
      var max = +itemParts[1] || null;

      if (max === null && code === min) {
        res = true;
        break;
      } else if (max !== null && code >= min && code <= max) {
        res = true;
        break;
      }
    }

    return res;
  }
});