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
    global.lang = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.noop = noop;
  exports.requireRemoteScript = requireRemoteScript;
  exports.getDpr = getDpr;
  exports.functionToUrl = functionToUrl;
  exports.randomId = randomId;
  /* istanbul ignore file */
  function noop() {}

  /**
   * Include external script dynamically
   */
  function requireRemoteScript(src, callback) {
    var doc = document;
    var head = doc.head || doc.getElementsByTagName('head')[0];

    var node = doc.createElement('script');
    var supportOnload = 'onload' in node;
    var onload = function onload() {
      node = null;
      typeof callback === 'function' && callback();
    };

    if (supportOnload) {
      node.onload = onload;
    } else {
      node.onreadystatechange = function () {
        if (/loaded|complete/.test(node.readyState)) {
          onload();
        }
      };
    }

    node.async = true;
    node.crossOrigin = true;
    node.charset = 'utf-8';
    node.src = src;
    head.appendChild(node);
  }

  function getDpr() {
    var getParam = function getParam(name, str) {
      var reg = new RegExp('(^|,)' + name + '=([^,]*)(,|$)', 'i');
      var r = str.match(reg);
      if (r != null) {
        return r[2];
      }
      return null;
    };

    var viewPort = document.querySelector('meta[name=viewport]');

    if (!viewPort) {
      return 1;
    }

    var viewPortContent = viewPort.getAttribute('content');
    var initialScale = +(getParam('initial-scale', viewPortContent) || 1);
    var maximumScale = +(getParam('maximum-scale', viewPortContent) || 1);
    var minimumScale = +(getParam('minimum-scale', viewPortContent) || 1);

    return 1 / Math.min(initialScale, maximumScale, minimumScale);
  }

  /**
   * transform a Function to Blob Url
   */
  function functionToUrl(fn) {
    var blob = new Blob(['(' + fn.toString() + ')(null)'], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
  }

  /**
   * generate random id
   */
  function randomId() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;

    return prefix + '-' + parseInt(Math.pow(Math.random() * 10, length));
  }
});