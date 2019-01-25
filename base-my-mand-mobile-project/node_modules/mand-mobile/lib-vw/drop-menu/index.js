;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../popup', '../radio', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../popup'), require('../radio'), require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.popup, global.radio, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _popup, _radio, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _popup2 = _interopRequireDefault(_popup);

  var _radio2 = _interopRequireDefault(_radio);

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
    name: 'md-drop-menu',

    components: (_components = {}, _defineProperty(_components, _popup2.default.name, _popup2.default), _defineProperty(_components, _radio2.default.name, _radio2.default), _components),

    props: {
      data: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      defaultValue: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      optionRender: {
        type: Function,
        default: _util.noop
      }
    },

    data: function data() {
      return {
        isPopupShow: false,
        selectedMenuListItem: [],
        selectedMenuListValue: [],
        selectedMenuListIndex: [],
        activeMenuBarIndex: -1,
        activeMenuListData: [],
        scroller: ''
      };
    },


    computed: {
      hasSlot: function hasSlot() {
        return !!this.$scopedSlots.default;
      }
    },

    watch: {
      data: function data(val, oldVal) {
        if (!(0, _util.compareObjects)(val, oldVal)) {
          this.$_initSelectedBar();
        }
      },
      defaultValue: function defaultValue(val, oldVal) {
        if (!(0, _util.compareObjects)(val, oldVal)) {
          this.$_initSelectedBar();
        }
      }
    },

    mounted: function mounted() {
      this.$_initSelectedBar();
    },


    methods: {
      $_initSelectedBar: function $_initSelectedBar() {
        var _this = this;

        this.selectedMenuListValue = this.defaultValue;
        (0, _util.traverse)(this.data, ['options'], function (item, level, indexs) {
          var barItemIndex = indexs[0];
          var defaultValue = _this.defaultValue[barItemIndex];
          if (defaultValue !== undefined && (item.value === defaultValue || item.text === defaultValue || item.label === defaultValue)) {
            _this.$set(_this.selectedMenuListItem, barItemIndex, item);
            return 2;
          }
        });
      },
      $_checkBarItemSelect: function $_checkBarItemSelect(index) {
        return !!(this.selectedMenuListItem[index] !== undefined || this.defaultValue[index]);
      },
      $_getBarItemText: function $_getBarItemText(item, index) {
        return this.selectedMenuListItem[index] !== undefined ? this.selectedMenuListItem[index].text : item.text;
      },
      $_setScroller: function $_setScroller() {
        var boxer = this.$el ? this.$el.querySelector('.md-popup-box') : null;
        if (boxer && boxer.clientHeight >= this.$el.clientHeight) {
          this.scroller = '.md-field-content';
        } else {
          return '';
        }
      },
      $_onBarItemClick: function $_onBarItemClick(barItem, index) {
        if (!barItem || barItem.disabled) {
          return;
        }

        if (!this.isPopupShow) {
          this.isPopupShow = true;
          this.activeMenuBarIndex = index;
          this.activeMenuListData = barItem.options;
        } else {
          this.isPopupShow = false;
        }
      },
      $_onListItemClick: function $_onListItemClick(listItem) {
        var activeMenuBarIndex = this.activeMenuBarIndex;
        var barItem = this.data[activeMenuBarIndex];
        this.isPopupShow = false;
        this.$set(this.selectedMenuListItem, activeMenuBarIndex, listItem);
        this.$emit('change', barItem, listItem);
      },
      $_onListShow: function $_onListShow() {
        this.$_setScroller();
        this.$emit('show');
      },
      $_onListHide: function $_onListHide() {
        this.activeMenuBarIndex = -1;

        this.$emit('hide');
      },
      getSelectedValues: function getSelectedValues() {
        return this.selectedMenuListItem;
      },
      getSelectedValue: function getSelectedValue(index) {
        return this.selectedMenuListItem[index];
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-drop-menu"},[_c('div',{staticClass:"md-drop-menu-bar"},[_vm._l((_vm.data),function(item,index){return [_c('div',{key:index,staticClass:"bar-item",class:{
          active: index === _vm.activeMenuBarIndex,
          selected: _vm.$_checkBarItemSelect(index),
          disabled: item.disabled
        },on:{"click":function($event){_vm.$_onBarItemClick(item, index)}}},[_c('span',{domProps:{"textContent":_vm._s(_vm.$_getBarItemText(item, index))}})])]})],2),_vm._v(" "),_c('md-popup',{attrs:{"position":"top","prevent-scroll":"","prevent-scroll-exclude":_vm.scroller},on:{"show":_vm.$_onListShow,"hide":_vm.$_onListHide},model:{value:(_vm.isPopupShow),callback:function ($$v) {_vm.isPopupShow=$$v},expression:"isPopupShow"}},[_c('div',{staticClass:"md-drop-menu-list"},[_c('md-radio',{attrs:{"options":_vm.activeMenuListData,"optionRender":_vm.optionRender,"is-slot-scope":_vm.hasSlot,"is-across-border":""},on:{"change":_vm.$_onListItemClick},scopedSlots:_vm._u([{key:"default",fn:function(ref){
        var option = ref.option;
return [_vm._t("default",null,{option:option})]}}]),model:{value:(_vm.selectedMenuListValue[_vm.activeMenuBarIndex]),callback:function ($$v) {_vm.$set(_vm.selectedMenuListValue, _vm.activeMenuBarIndex, $$v)},expression:"selectedMenuListValue[activeMenuBarIndex]"}})],1)])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-06ec45d0", __vue__options__)
  } else {
    hotAPI.reload("data-v-06ec45d0", __vue__options__)
  }
})()}