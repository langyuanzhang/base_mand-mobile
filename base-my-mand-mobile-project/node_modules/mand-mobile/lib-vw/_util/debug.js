(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './env'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./env'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.env);
    global.debug = mod.exports;
  }
})(this, function (exports, _env) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.warn = undefined;
  var warn = exports.warn = function warn(msg) {
    var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'error';

    !_env.isProd && console[fn]('[Mand-Mobile]: ' + msg);
  };
});