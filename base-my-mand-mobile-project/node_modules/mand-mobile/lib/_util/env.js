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
    global.env = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  // Development environment
  var isProd = exports.isProd = process.env.NODE_ENV === 'production';

  // Browser environment sniffing
  var inBrowser = exports.inBrowser = typeof window !== 'undefined';
  var UA = exports.UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isAndroid = exports.isAndroid = UA && UA.indexOf('android') > 0;
  var isIOS = exports.isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
});