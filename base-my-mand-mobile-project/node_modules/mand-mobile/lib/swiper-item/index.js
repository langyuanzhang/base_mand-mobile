;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../swiper/swiper-item', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../swiper/swiper-item'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.swiperItem, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _swiperItem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _swiperItem2 = _interopRequireDefault(_swiperItem);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _swiperItem2.default;
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1ce6a523", __vue__options__)
  } else {
    hotAPI.reload("data-v-1ce6a523", __vue__options__)
  }
})()}