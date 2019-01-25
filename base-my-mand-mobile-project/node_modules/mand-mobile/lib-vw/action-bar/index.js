;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'md-action-bar',

    props: {
      actions: {
        type: Array,
        default: []
      },
      hasText: {
        type: Boolean,
        default: function _default() {
          return !(0, _util.isEmptyObject)(this.$slots);
        }
      }
    },

    methods: {
      $_onBtnClick: function $_onBtnClick(event, action) {
        if (action.disabled) {
          return;
        }
        action.onClick && action.onClick(event, action);
        this.$emit('click', event, action);
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-action-bar",class:{'with-text': _vm.hasText, 'multi-action': !!this.actions.length }},[(_vm.hasText)?_c('div',{staticClass:"md-action-bar-text"},[_vm._t("default")],2):_vm._e(),_vm._v(" "),_c('div',{staticClass:"md-action-bar-button"},[_vm._l((_vm.actions),function(item,index){return [_c('div',{key:index,staticClass:"button-item",class:{disabled: !!item.disabled},domProps:{"innerHTML":_vm._s(item.text)},on:{"click":function($event){_vm.$_onBtnClick($event, item)}}})]})],2)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3b3eaf57", __vue__options__)
  } else {
    hotAPI.reload("data-v-3b3eaf57", __vue__options__)
  }
})()}