(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './default-svg-list'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./default-svg-list'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.defaultSvgList);
    global.loadSpirte = mod.exports;
  }
})(this, function (exports, _defaultSvgList) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _defaultSvgList2 = _interopRequireDefault(_defaultSvgList);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var svgSprite = function svgSprite(contents) {
    return '\n<svg\n  xmlns="http://www.w3.org/2000/svg"\n  xmlns:xlink="http://www.w3.org/1999/xlink"\n  id="__MAND_MOBILE_SVG_SPRITE_NODE__"\n  style="position:absolute;width:0;height:0"\n>\n  <defs>\n    ' + contents + '\n  </defs>\n</svg>\n';
  }; // inspried by https://github.com/kisenka/svg-sprite-loader/blob/master/runtime/browser-sprite.js
  // Much simplified, do make sure run this after document ready


  var renderSvgSprite = function renderSvgSprite() {
    var symbols = Object.keys(_defaultSvgList2.default).map(function (iconName) {
      var svgContent = _defaultSvgList2.default[iconName].split('svg')[1];
      return '<symbol id=' + iconName + svgContent + 'symbol>';
    }).join('');
    return svgSprite(symbols);
  };

  var loadSprite = function loadSprite() {
    if (!document) {
      return;
    }
    var existing = document.getElementById('__MAND_MOBILE_SVG_SPRITE_NODE__');
    var mountNode = document.body;

    if (!existing) {
      mountNode.insertAdjacentHTML('afterbegin', renderSvgSprite());
    }
  };

  exports.default = loadSprite;
});