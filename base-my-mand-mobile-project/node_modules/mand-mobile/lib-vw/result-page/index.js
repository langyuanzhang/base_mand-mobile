;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../button', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../button'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.button, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _button2 = _interopRequireDefault(_button);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  exports.default = {
    name: 'md-result-page',

    components: _defineProperty({}, _button2.default.name, _button2.default),

    props: {
      type: {
        type: String,
        default: 'empty'
      },
      imgUrl: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      subtext: {
        type: String,
        default: ''
      },
      buttons: {
        type: Array,
        default: function _default() {
          return [];
        }
      }
    },

    data: function data() {
      var pre = '//manhattan.didistatic.com/static/manhattan/mfd/result-page/';
      var data = {
        actualImgUrl: this.imgUrl || '' + pre + this.type,
        actualText: this.text || {
          lost: '\u60A8\u8981\u8BBF\u95EE\u7684\u9875\u9762\u5DF2\u4E22\u5931',

          network: '\u7F51\u7EDC\u8FDE\u63A5\u5F02\u5E38',

          empty: '\u6682\u65E0\u4FE1\u606F'
        }[this.type]
      };
      return data;
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-result-page"},[_c('img',{class:!_vm.imgUrl && _vm.type,attrs:{"src":_vm.actualImgUrl}}),_vm._v(" "),_c('div',{staticClass:"text"},[_vm._v(_vm._s(_vm.actualText))]),_vm._v(" "),(_vm.subtext)?_c('div',{staticClass:"subtext"},[_vm._v(_vm._s(_vm.subtext))]):_vm._e(),_vm._v(" "),(_vm.buttons.length)?_c('div',{staticClass:"buttons"},_vm._l((_vm.buttons),function(button,index){return _c('md-button',{key:index,attrs:{"type":button.type || 'ghost'},on:{"click":button.handler}},[_vm._v("\n      "+_vm._s(button.text)+"\n    ")])})):_vm._e()])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7fcb635a", __vue__options__)
  } else {
    hotAPI.reload("data-v-7fcb635a", __vue__options__)
  }
})()}