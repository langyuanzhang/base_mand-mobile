;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../icon', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../icon'), require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.icon, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _icon, _util) {
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
    name: 'md-field-item',

    components: _defineProperty({}, _icon2.default.name, _icon2.default),

    props: {
      name: {
        type: Number | String,
        default: function _default() {
          return (0, _util.randomId)('field-item');
        }
      },
      title: {
        type: String,
        default: ''
      },
      brief: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      arrow: {
        type: String,
        default: ''
      },
      customized: {
        type: Boolean,
        default: function _default() {
          return !(0, _util.isEmptyObject)(this.$slots);
        }
      },
      align: {
        type: String,
        default: 'left',
        validator: function validator(value) {
          return ['left', 'right', 'center'].indexOf(value) > -1;
        }
      },
      solid: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      $_onItemClick: function $_onItemClick(event, name) {
        if (this.disabled) {
          return;
        }
        this.$emit('click', name);
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-field-item",class:[
    _vm.arrow ? 'has-arrow' : '' ,
    _vm.disabled ? 'disabled' : '' ],attrs:{"name":_vm.name},on:{"click":function($event){_vm.$_onItemClick($event, _vm.name)}}},[_c('div',{staticClass:"md-field-item-inner"},[(_vm.$slots.left)?_c('div',{staticClass:"md-field-item-extra"},[_vm._t("left")],2):_vm._e(),_vm._v(" "),_c('div',{staticClass:"md-field-item-label",class:[
        _vm.solid ? 'solid' : ''
      ]},[_c('div',{staticClass:"md-field-item-title",domProps:{"innerHTML":_vm._s(_vm.title)}}),_vm._v(" "),(_vm.brief)?_c('div',{staticClass:"md-field-item-brief",domProps:{"innerHTML":_vm._s(_vm.brief)}}):_vm._e()]),_vm._v(" "),(_vm.customized)?_c('div',{staticClass:"md-field-item-content",class:[_vm.align]},[_vm._t("default")],2):_c('div',{staticClass:"md-field-item-content",class:[_vm.align]},[_vm._v("\n      "+_vm._s(_vm.value)+"\n    ")]),_vm._v(" "),(_vm.$slots.right)?_c('div',{staticClass:"md-field-right"},[_vm._t("right")],2):(_vm.arrow)?_c('md-icon',{staticClass:"md-field-arrow",attrs:{"name":_vm.arrow,"size":"lg"}}):_vm._e()],1)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6a5dcee1", __vue__options__)
  } else {
    hotAPI.reload("data-v-6a5dcee1", __vue__options__)
  }
})()}