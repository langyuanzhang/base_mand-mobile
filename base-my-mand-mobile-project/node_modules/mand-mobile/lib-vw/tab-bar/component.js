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
    'name': 'tab-bar',
    'text': '标签栏',
    'category': 'basic',
    'description': '用一组标签按钮控制另一区域内容切换的组件。',
    'author': 'zhaozhe'
  };
});