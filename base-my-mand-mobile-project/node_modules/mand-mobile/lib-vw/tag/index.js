;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'md-tag',
    props: {
      size: {
        type: String,
        default: 'large'
      },
      shape: {
        type: String,
        default: 'square'
      },
      type: {
        type: String,
        default: 'ghost'
      },
      fillColor: {
        type: String,
        default: ''
      },
      fontWeight: {
        type: String,
        default: 'normal'
      },
      fontColor: {
        type: String,
        default: ''
      }
    },
    data: function data() {
      return {
        jsComputedStyle: {}
      };
    },

    computed: {
      computedClass: function computedClass() {
        return ['default', 'size-' + this.size, 'shape-' + this.shape, 'type-' + this.type, 'font-weight-' + this.fontWeight];
      },
      computedStyle: function computedStyle() {
        var style = {};
        if (this.type === 'fill') {
          this.fillColor && (style.backgroundColor = this.fillColor);
        }
        if (this.fontColor) {
          if (this.type === 'ghost') {
            style.borderColor = this.fontColor;
          }
          style.color = this.fontColor;
        }
        return style;
      }
    },
    mounted: function mounted() {
      var vm = this;
      vm.$set(vm.jsComputedStyle, 'padding', Math.max(vm.$el.offsetHeight * 0.15, 3) + 'px');
      vm.$nextTick(function () {
        if (vm.shape === 'circle') {
          var height = vm.$el.offsetHeight / 2;
          vm.$set(vm.jsComputedStyle, 'paddingLeft', height + 'px');
          vm.$set(vm.jsComputedStyle, 'paddingRight', height + 'px');
          vm.$set(vm.jsComputedStyle, 'borderRadius', height + 'px');
        }
      });
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-tag"},[_c('div',{class:_vm.computedClass,style:([_vm.computedStyle, _vm.jsComputedStyle])},[_vm._t("default")],2)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-583fe6f5", __vue__options__)
  } else {
    hotAPI.reload("data-v-583fe6f5", __vue__options__)
  }
})()}