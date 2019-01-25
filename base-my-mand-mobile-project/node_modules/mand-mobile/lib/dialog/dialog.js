;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../popup', '../icon', '../_style/global.css', './style/dialog.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../popup'), require('../icon'), require('../_style/global.css'), require('./style/dialog.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.popup, global.icon, global.global, global.dialog);
    global.dialog = mod.exports;
  }
})(this, function (exports, _popup, _icon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _popup2 = _interopRequireDefault(_popup);

  var _icon2 = _interopRequireDefault(_icon);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _components;

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
    name: 'md-dialog',

    components: (_components = {}, _defineProperty(_components, _popup2.default.name, _popup2.default), _defineProperty(_components, _icon2.default.name, _icon2.default), _components),

    props: {
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      closable: {
        type: Boolean,
        default: true
      },
      content: {
        type: String,
        default: ''
      },
      btns: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      appendTo: {
        default: function _default() {
          return document.body;
        }
      },
      hasMask: {
        type: Boolean,
        default: true
      },
      maskClosable: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        default: 'center'
      },
      transition: {
        type: String,
        default: 'fade'
      },
      preventScroll: {
        type: Boolean,
        default: false
      },
      preventScrollExclude: {
        type: String,
        default: ''
      }
    },

    mounted: function mounted() {
      if (this.appendTo) {
        this.appendTo.appendChild(this.$el);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (this.appendTo) {
        this.appendTo.removeChild(this.$el);
      }
    },


    methods: {
      $_onInput: function $_onInput(val) {
        this.$emit('input', val);
      },
      $_onShow: function $_onShow() {
        this.$emit('show');
      },
      $_onHide: function $_onHide() {
        this.$emit('hide');
      },
      $_onClick: function $_onClick(btn) {
        if (typeof btn.handler === 'function') {
          btn.handler.call(null);
        } else {
          this.close();
        }
      },
      close: function close() {
        this.$emit('input', false);
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-dialog"},[_c('md-popup',{attrs:{"value":_vm.value,"hasMask":_vm.hasMask,"maskClosable":_vm.maskClosable,"position":_vm.position,"transition":_vm.transition,"preventScroll":_vm.preventScroll,"preventScrollExclude":_vm.preventScrollExclude},on:{"input":_vm.$_onInput,"show":_vm.$_onShow,"hide":_vm.$_onHide}},[_c('div',{staticClass:"md-dialog-content"},[_c('div',{staticClass:"md-dialog-body"},[(_vm.closable)?_c('a',{staticClass:"md-dialog-close",attrs:{"role":"button"},on:{"click":_vm.close}},[_c('md-icon',{attrs:{"name":"cross"}})],1):_vm._e(),_vm._v(" "),(_vm.icon)?_c('div',{staticClass:"md-dialog-icon"},[_c('md-icon',{attrs:{"name":_vm.icon}})],1):_vm._e(),_vm._v(" "),(_vm.title)?_c('h2',{staticClass:"md-dialog-title",domProps:{"textContent":_vm._s(_vm.title)}}):_vm._e(),_vm._v(" "),(_vm.content)?_c('div',{staticClass:"md-dialog-text",domProps:{"innerHTML":_vm._s(_vm.content)}}):(_vm.$slots.default)?_c('div',{staticClass:"md-dialog-text"},[_vm._t("default")],2):_vm._e()]),_vm._v(" "),_c('footer',{staticClass:"md-dialog-actions"},_vm._l((_vm.btns),function(btn,index){return _c('a',{key:index,attrs:{"role":"button"},domProps:{"textContent":_vm._s(btn.text)},on:{"click":function($event){_vm.$_onClick(btn)}}})}))])])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-10641bc7", __vue__options__)
  } else {
    hotAPI.reload("data-v-10641bc7", __vue__options__)
  }
})()}