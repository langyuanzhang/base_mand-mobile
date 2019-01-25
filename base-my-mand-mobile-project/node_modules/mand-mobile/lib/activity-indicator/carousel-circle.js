;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_style/global.css', './style/carousel-circle.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_style/global.css'), require('./style/carousel-circle.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.global, global.carouselCircle);
    global.carouselCircle = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'md-activity-indicator-carousel-circle',

    props: {
      size: {
        type: Number,
        default: 30
      },
      index: {
        type: Number,
        default: 0
      },
      animateValues: {
        type: Array,
        default: function _default() {
          return [];
        }
      }
    },

    computed: {
      cx: function cx() {
        return this.index * this.size * 1.5 + this.size / 2;
      },
      opacityValues: function opacityValues() {
        return this.animateValues.join(';');
      },
      sizeValues: function sizeValues() {
        var _this = this;

        return this.animateValues.map(function (val) {
          return val * _this.size / 2;
        }).join(';');
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('circle',{attrs:{"cx":_vm.cx,"cy":_vm.size/2,"r":_vm.size/2}},[_c('animate',{attrs:{"attributeName":"fill-opacity","attributeType":"XML","begin":"0s","dur":"1s","values":_vm.opacityValues,"calcMode":"linear","repeatCount":"indefinite"}}),_vm._v(" "),_c('animate',{attrs:{"attributeName":"r","attributeType":"XML","begin":"0s","dur":"1s","values":_vm.sizeValues,"calcMode":"linear","repeatCount":"indefinite"}})])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4dc7eaf7", __vue__options__)
  } else {
    hotAPI.reload("data-v-4dc7eaf7", __vue__options__)
  }
})()}