;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../popup/title-bar', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../popup/title-bar'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.titleBar, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _titleBar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _titleBar2 = _interopRequireDefault(_titleBar);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _titleBar2.default;
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7445aad8", __vue__options__)
  } else {
    hotAPI.reload("data-v-7445aad8", __vue__options__)
  }
})()}