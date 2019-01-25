;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../check-group', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../check-group'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.checkGroup, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _checkGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _checkGroup2 = _interopRequireDefault(_checkGroup);

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
    name: 'md-check-box',

    components: _defineProperty({}, _checkGroup2.default.name, _checkGroup2.default),

    props: {
      value: {
        type: [String, Number, Array],
        default: ''
      },
      options: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      max: {
        type: [String, Number],
        default: 1
      },
      disabled: {
        type: Boolean,
        default: false
      },
      cols: {
        type: Number,
        default: 0
      }
    },

    methods: {
      $_onInput: function $_onInput(values) {
        this.$emit('input', values);
      },
      select: function select(value) {
        this.$refs.checkGroup.select(value);
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('md-check-group',{ref:"checkGroup",staticClass:"md-check-box",class:( _obj = {}, _obj[("is-" + _vm.cols + "col")] = _vm.cols >= 1, _obj ),attrs:{"options":_vm.options,"value":_vm.value,"disabled":_vm.disabled,"max":_vm.max},on:{"input":_vm.$_onInput},scopedSlots:_vm._u([{key:"default",fn:function(ref){
  var option = ref.option;
return _c('div',{key:option.value,staticClass:"md-check-box-col"},[_c('div',{staticClass:"md-check-box-item",class:{
        'is-selected': option.isSelected,
        'is-disabled': option.disabled || _vm.disabled
      },on:{"click":function($event){_vm.select(option.value)}}},[_vm._t("content",[_vm._v("\n        "+_vm._s(option.label)+"\n      ")],{option:option,select:_vm.select})],2)])}}])})
var _obj;}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2ca9b3e1", __vue__options__)
  } else {
    hotAPI.reload("data-v-2ca9b3e1", __vue__options__)
  }
})()}