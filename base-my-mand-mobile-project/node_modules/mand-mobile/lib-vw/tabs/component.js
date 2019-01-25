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
    'name': 'tabs',
    'text': '标签页',
    'category': 'basic',
    'description': '用于在内部固定区域切换展示内容的组件。',
    'author': 'zhaozhe'
  };
});