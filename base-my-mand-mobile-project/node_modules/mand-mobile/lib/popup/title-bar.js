;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_style/global.css', './style/title-bar.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_style/global.css'), require('./style/title-bar.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.global, global.titleBar);
    global.titleBar = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'md-popup-title-bar',

    props: {
      title: {
        type: String,
        default: ''
      },
      okText: {
        type: String,
        default: ''
      },
      cancelText: {
        type: String,
        default: ''
      }
    },

    methods: {
      $_preventScroll: function $_preventScroll(e) {
        e.preventDefault();
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-popup-title-bar",on:{"touchmove":_vm.$_preventScroll}},[(_vm.cancelText)?_c('div',{staticClass:"title-bar-left md-popup-cancel",domProps:{"innerHTML":_vm._s(_vm.cancelText)},on:{"click":function($event){_vm.$emit('cancel')}}}):(_vm.$slots.cancel)?_c('div',{staticClass:"title-bar-left md-popup-cancel",on:{"click":function($event){_vm.$emit('cancel')}}},[_vm._t("cancel")],2):_vm._e(),_vm._v(" "),(_vm.title)?_c('div',{staticClass:"title-bar-title",domProps:{"innerHTML":_vm._s(_vm.title)}}):_c('div',{staticClass:"title-bar-title"},[_vm._t("title")],2),_vm._v(" "),(_vm.okText)?_c('div',{staticClass:"title-bar-right md-popup-confirm",domProps:{"innerHTML":_vm._s(_vm.okText)},on:{"click":function($event){_vm.$emit('confirm')}}}):(_vm.$slots.confirm)?_c('div',{staticClass:"title-bar-right md-popup-confirm",on:{"click":function($event){_vm.$emit('confirm')}}},[_vm._t("confirm")],2):_vm._e()])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-2da7db53"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2da7db53", __vue__options__)
  } else {
    hotAPI.reload("data-v-2da7db53", __vue__options__)
  }
})()}