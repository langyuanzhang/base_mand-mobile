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
    global.component = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    'name': 'field',
    'text': '组合列表',
    'category': 'form',
    'description': '单个连续模块垂直排列，显示当前的内容、状态和可进行的操作',
    'author': 'chengyanjing'
  };
});