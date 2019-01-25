;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../popup', '../icon', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../popup'), require('../icon'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.popup, global.icon, global.global, global.index);
    global.index = mod.exports;
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
    name: 'md-landscape',

    components: (_components = {}, _defineProperty(_components, _popup2.default.name, _popup2.default), _defineProperty(_components, _icon2.default.name, _icon2.default), _components),

    props: {
      value: {
        type: Boolean,
        default: false
      },
      scroll: {
        type: Boolean,
        default: false
      },
      hasMask: {
        type: Boolean,
        default: true
      },
      maskClosable: {
        type: Boolean,
        default: false
      }
    },

    data: function data() {
      return {
        isLandscapeShow: this.value
      };
    },


    watch: {
      value: function value(val) {
        this.isLandscapeShow = val;
      }
    },

    methods: {
      $_close: function $_close() {
        this.isLandscapeShow = false;
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-landscape"},[_c('md-popup',{attrs:{"mask-closable":_vm.maskClosable,"prevent-scroll":"","prevent-scroll-exclude":_vm.scroll ? '.content' : null,"has-mask":_vm.hasMask},on:{"input":function($event){_vm.$emit('input', false)},"show":function($event){_vm.$emit('show')},"hide":function($event){_vm.$emit('hide')}},model:{value:(_vm.isLandscapeShow),callback:function ($$v) {_vm.isLandscapeShow=$$v},expression:"isLandscapeShow"}},[_c('div',{staticClass:"content",class:{scroll: _vm.scroll}},[_vm._t("default")],2)]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isLandscapeShow),expression:"isLandscapeShow"}],staticClass:"close",class:{dark: !_vm.hasMask},on:{"click":_vm.$_close}},[_c('md-icon',{attrs:{"name":"cross","size":"lg"}})],1)],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3f0dd4d6", __vue__options__)
  } else {
    hotAPI.reload("data-v-3f0dd4d6", __vue__options__)
  }
})()}