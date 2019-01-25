;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../icon', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../icon'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.icon, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _icon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _icon2 = _interopRequireDefault(_icon);

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
    name: 'md-steps',

    components: _defineProperty({}, _icon2.default.name, _icon2.default),

    props: {
      steps: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      current: {
        type: Number,
        default: 0,
        validator: function validator(currentStep) {
          return currentStep >= 0;
        }
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-steps"},[_vm._l((_vm.steps),function(step,index){return [(index)?_c('div',{key:("bar-" + index),staticClass:"bar",class:{reached: index<=_vm.current}}):_vm._e(),_vm._v(" "),_c('div',{key:("icon-" + index),staticClass:"icon-wrapper"},[_c('div',{staticClass:"icon",class:{
          reached: index<=_vm.current,
          current: index === _vm.current,
        }},[(index < _vm.current && (_vm.$scopedSlots.reached || _vm.$slots.reached))?_vm._t("reached",null,{index:index}):(index === _vm.current && (_vm.$scopedSlots.current || _vm.$slots.current))?_vm._t("current",null,{index:index}):(index < _vm.current)?_c('md-icon',{attrs:{"name":"circle-right"}}):(index === _vm.current)?_c('md-icon',{attrs:{"name":"circle-alert"}}):_c('div',{staticClass:"md-stain"})],2),_vm._v(" "),_c('div',{staticClass:"text-wrapper"},[_c('div',{staticClass:"text"},[_vm._v("\n          "+_vm._s(step.name)+"\n        ")])])])]})],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-43887e42", __vue__options__)
  } else {
    hotAPI.reload("data-v-43887e42", __vue__options__)
  }
})()}