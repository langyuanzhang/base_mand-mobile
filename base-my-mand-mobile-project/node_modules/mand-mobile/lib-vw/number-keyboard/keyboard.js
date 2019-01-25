;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_style/global.css', './style/keyboard.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_style/global.css'), require('./style/keyboard.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.global, global.keyboard);
    global.keyboard = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'md-number-keyboard-container',

    props: {
      type: {
        type: String,
        default: 'professional'
      },
      disorder: {
        type: Boolean,
        default: false
      },
      okText: {
        type: String,
        default: '确定'
      },
      isView: {
        type: Boolean
      }
    },

    data: function data() {
      return {
        keyNumberList: []
      };
    },
    created: function created() {
      this.$_generateKeyNumber();
    },


    methods: {
      $_generateKeyNumber: function $_generateKeyNumber() {
        var baseStack = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

        if (this.disorder) {
          var count = 0;
          while (baseStack.length) {
            this.$set(this.keyNumberList, count, baseStack.splice(parseInt(Math.random() * baseStack.length), 1)[0] || 0);
            count++;
          }
        } else {
          this.keyNumberList = baseStack;
        }
      },
      $_onNumberKeyClick: function $_onNumberKeyClick(event, val) {
        event.stopImmediatePropagation();
        this.$emit('enter', val);
      },
      $_onDeleteClick: function $_onDeleteClick(event) {
        event.stopImmediatePropagation();
        this.$emit('delete');
      },
      $_onConfirmeClick: function $_onConfirmeClick() {
        this.$emit('confirm');
      },
      $_onSlideDoneClick: function $_onSlideDoneClick() {
        this.$emit('hide');
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-number-keyboard-container",class:_vm.type},[_c('div',{staticClass:"keyboard-number"},[_c('ul',{staticClass:"keyboard-number-list"},[_vm._l((9),function(n){return _c('li',{key:n-1,staticClass:"keyboard-number-item",domProps:{"textContent":_vm._s(_vm.keyNumberList[n-1])},on:{"click":function($event){_vm.$_onNumberKeyClick($event, _vm.keyNumberList[n-1])}}})}),_vm._v(" "),(_vm.type === 'professional')?[_c('li',{staticClass:"keyboard-number-item",on:{"click":function($event){_vm.$_onNumberKeyClick($event, '.')}}},[_vm._v(".")]),_vm._v(" "),_c('li',{staticClass:"keyboard-number-item",on:{"click":function($event){_vm.$_onNumberKeyClick($event, _vm.keyNumberList[9])}}},[_vm._v(_vm._s(_vm.keyNumberList[9]))]),_vm._v(" "),(_vm.isView)?_c('li',{staticClass:"keyboard-number-item"}):_c('li',{staticClass:"keyboard-number-item slidedown",on:{"click":function($event){_vm.$_onSlideDoneClick()}}})]:[_c('li',{staticClass:"keyboard-number-item no-bg"}),_vm._v(" "),_c('li',{staticClass:"keyboard-number-item",on:{"click":function($event){_vm.$_onNumberKeyClick($event, _vm.keyNumberList[9])}}},[_vm._v(_vm._s(_vm.keyNumberList[9]))]),_vm._v(" "),_c('li',{staticClass:"keyboard-number-item no-bg delete",on:{"click":function($event){_vm.$_onDeleteClick($event)}}})]],2)]),_vm._v(" "),(_vm.type === 'professional')?_c('div',{staticClass:"keyboard-operate"},[_c('ul',{staticClass:"keyboard-operate-list"},[_c('li',{staticClass:"keyboard-operate-item delete",on:{"click":function($event){_vm.$_onDeleteClick($event)}}}),_vm._v(" "),_c('li',{staticClass:"keyboard-operate-item confirm",domProps:{"textContent":_vm._s(_vm.okText)},on:{"click":function($event){_vm.$_onConfirmeClick()}}})])]):_vm._e()])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-629a73e3", __vue__options__)
  } else {
    hotAPI.reload("data-v-629a73e3", __vue__options__)
  }
})()}