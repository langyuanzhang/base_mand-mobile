;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../field', '../field-item', '../input-item', '../icon', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../field'), require('../field-item'), require('../input-item'), require('../icon'), require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.field, global.fieldItem, global.inputItem, global.icon, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _field, _fieldItem, _inputItem, _icon, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _field2 = _interopRequireDefault(_field);

  var _fieldItem2 = _interopRequireDefault(_fieldItem);

  var _inputItem2 = _interopRequireDefault(_inputItem);

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
    name: 'md-radio',

    components: (_components = {}, _defineProperty(_components, _field2.default.name, _field2.default), _defineProperty(_components, _fieldItem2.default.name, _fieldItem2.default), _defineProperty(_components, _inputItem2.default.name, _inputItem2.default), _defineProperty(_components, _icon2.default.name, _icon2.default), _components),

    props: {
      options: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      defaultIndex: {
        type: Number,
        default: -1
      },
      defaultValue: {
        type: String,
        default: ''
      },
      invalidIndex: {
        type: [Number, Array],
        default: function _default() {
          return [];
        }
      },
      hasInputOption: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: ''
      },
      inputOptionLabel: {
        type: String,
        default: ''
      },
      inputOptionPlaceholder: {
        type: String,
        default: ''
      },
      icon: {
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
      },
      iconPosition: {
        type: String,
        default: 'right'
      },
      optionRender: {
        type: Function,
        default: _util.noop
      },
      isSlotScope: {
        type: Boolean,
        default: undefined
      },
      isAcrossBorder: {
        type: Boolean,
        default: false
      }
    },

    data: function data() {
      return {
        selectedIndex: this.defaultIndex,
        inputOptionValue: ''
      };
    },


    computed: {
      hasSlot: function hasSlot() {
        return this.isSlotScope !== undefined ? this.isSlotScope : !!this.$scopedSlots.default;
      }
    },

    watch: {
      options: {
        handler: function handler(val, oldVal) {
          if (!(0, _util.compareObjects)(val, oldVal)) {
            this.$_initSelected();
          }
        },

        deep: true
      },
      inputOptionValue: function inputOptionValue(val) {
        this.$emit('input', val);
      }
    },

    created: function created() {
      this.$_initSelected();
    },


    methods: {
      $_initSelected: function $_initSelected() {
        var defaultIndex = this.defaultIndex;
        var invalidIndex = this.invalidIndex;
        var item = this.options[defaultIndex];

        this.selectedIndex = defaultIndex;

        if (defaultIndex === -1) {
          return;
        } else if (this.value !== '') {
          return;
        }

        if (item && !item.disabled && !(0, _util.inArray)(invalidIndex, defaultIndex)) {
          this.selectedIndex = this.defaultIndex;
        } else {
          (0, _util.warn)('radio option represented by the default-index is invalid');
        }
      },
      $_isInvalidIndex: function $_isInvalidIndex(item, index) {
        return (0, _util.inArray)(this.invalidIndex, index) || item.disabled;
      },
      $_isSelectedIndex: function $_isSelectedIndex(index) {
        return index === this.selectedIndex;
      },
      $_isSelectedValue: function $_isSelectedValue(value, index) {
        var invalidIndex = this.invalidIndex;
        if (value === this.value) {
          if (!(0, _util.inArray)(invalidIndex, index)) {
            this.selectedIndex = index;
            return true;
          } else {
            this.$emit('input', '');
            (0, _util.warn)('radio option represented by the initial value is invalid');
            return false;
          }
        } else {
          return false;
        }
      },
      $_getItemText: function $_getItemText(item) {
        return this.optionRender(item) || item.text || item.label;
      },
      $_onItemClick: function $_onItemClick(item, index) {
        this.selectedIndex = index;
        this.$emit('input', item.value || item.text || item.label);
        this.$emit('change', item, index);
      },
      $_onItemFocus: function $_onItemFocus(index) {
        this.selectedIndex = index;
        this.$emit('input', this.inputOptionValue);
        this.$emit('change', {
          text: this.inputOptionValue
        }, index);
      },
      getSelectedValue: function getSelectedValue() {
        var item = void 0;
        if (this.hasInputOption && this.selectedIndex === this.options.length) {
          item = this.inputOptionValue;
        } else {
          item = this.options[this.selectedIndex];
        }
        return item;
      },
      getSelectedIndex: function getSelectedIndex() {
        return this.selectedIndex;
      },
      selectByIndex: function selectByIndex(index) {
        if (index > this.options.length || (0, _util.inArray)(this.invalidIndex, index)) {
          return;
        }

        if (index === this.options.length && this.hasInputOption) {
          this.selectedIndex = index;
          this.$refs['inputItem'].focus();
        } else {
          this.$_onItemClick(this.options[index], index);
        }
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-radio",class:{across: _vm.isAcrossBorder}},[_c('md-field',[_vm._l((_vm.options),function(item,index){return [_c('md-field-item',{key:index,staticClass:"md-radio-item",class:{
          'selected': _vm.$_isSelectedIndex(index) || _vm.$_isSelectedValue(item.value || item.text || item.label, index),
          'icon-left': _vm.iconPosition === 'left'
        },attrs:{"title":"","disabled":_vm.$_isInvalidIndex(item, index),"customized":""},on:{"click":function($event){_vm.$_onItemClick(item, index)}}},[(_vm.hasSlot)?[_c('div',{staticClass:"md-radio-content"},[_vm._t("default",null,{option:item})],2)]:[_c('div',{staticClass:"md-radio-content",domProps:{"innerHTML":_vm._s(_vm.$_getItemText(item))}})],_vm._v(" "),(_vm.$_isSelectedIndex(index) || _vm.$_isSelectedValue(item.value || item.text || item.label, index))?[(_vm.icon)?_c('md-icon',{attrs:{"name":_vm.icon,"size":_vm.iconSize}}):_vm._e()]:[(_vm.iconInverse)?_c('md-icon',{attrs:{"name":_vm.iconInverse,"size":_vm.iconSize}}):_vm._e()]],2)]}),_vm._v(" "),(_vm.hasInputOption)?_c('md-input-item',{ref:"inputItem",class:{
        'selected': _vm.$_isSelectedIndex(_vm.options.length),
      },attrs:{"title":_vm.inputOptionLabel,"placeholder":_vm.inputOptionPlaceholder},on:{"focus":function($event){_vm.$_onItemFocus(_vm.options.length)}},model:{value:(_vm.inputOptionValue),callback:function ($$v) {_vm.inputOptionValue=$$v},expression:"inputOptionValue"}}):_vm._e()],2)],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a37473d4", __vue__options__)
  } else {
    hotAPI.reload("data-v-a37473d4", __vue__options__)
  }
})()}