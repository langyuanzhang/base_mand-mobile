;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../check-group', '../field', '../field-item', '../icon', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../check-group'), require('../field'), require('../field-item'), require('../icon'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.checkGroup, global.field, global.fieldItem, global.icon, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _checkGroup, _field, _fieldItem, _icon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _checkGroup2 = _interopRequireDefault(_checkGroup);

  var _field2 = _interopRequireDefault(_field);

  var _fieldItem2 = _interopRequireDefault(_fieldItem);

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
    name: 'md-check-list',

    components: (_components = {}, _defineProperty(_components, _checkGroup2.default.name, _checkGroup2.default), _defineProperty(_components, _field2.default.name, _field2.default), _defineProperty(_components, _fieldItem2.default.name, _fieldItem2.default), _defineProperty(_components, _icon2.default.name, _icon2.default), _components),

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
      title: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: 'right'
      },
      iconPosition: {
        type: String,
        default: 'right'
      },
      iconInverse: {
        type: String,
        default: ''
      },
      iconSize: {
        type: String,
        default: 'sm'
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
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('md-field',{staticClass:"md-check-list",attrs:{"title":_vm.title}},[_c('md-check-group',{ref:"checkGroup",attrs:{"options":_vm.options,"value":_vm.value,"disabled":_vm.disabled,"max":_vm.max},on:{"input":_vm.$_onInput},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var option = ref.option;
return _c('md-field-item',{key:option.value,staticClass:"md-check-list-item",class:{
        'is-selected': option.isSelected
      },attrs:{"disabled":option.disabled || _vm.disabled,"customized":""},on:{"click":function($event){_vm.select(option.value)}}},[_vm._t("content",[_vm._v("\n        "+_vm._s(option.label)+"\n      ")],{option:option,select:_vm.select}),_vm._v(" "),_c('md-icon',{directives:[{name:"show",rawName:"v-show",value:(option.isSelected || _vm.iconInverse),expression:"option.isSelected || iconInverse"}],attrs:{"slot":_vm.iconPosition,"name":!option.isSelected && _vm.iconInverse ? _vm.iconInverse : _vm.icon,"size":_vm.iconSize},slot:_vm.iconPosition})],2)}}])})],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1ec230de", __vue__options__)
  } else {
    hotAPI.reload("data-v-1ec230de", __vue__options__)
  }
})()}