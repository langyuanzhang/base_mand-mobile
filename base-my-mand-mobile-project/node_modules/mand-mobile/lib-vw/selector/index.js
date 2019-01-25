;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../popup', '../popup/title-bar', '../radio', '../scroll-view', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../popup'), require('../popup/title-bar'), require('../radio'), require('../scroll-view'), require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.popup, global.titleBar, global.radio, global.scrollView, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _popup, _titleBar, _radio, _scrollView, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _popup2 = _interopRequireDefault(_popup);

  var _titleBar2 = _interopRequireDefault(_titleBar);

  var _radio2 = _interopRequireDefault(_radio);

  var _scrollView2 = _interopRequireDefault(_scrollView);

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
    name: 'md-selector',

    components: (_components = {}, _defineProperty(_components, _radio2.default.name, _radio2.default), _defineProperty(_components, _popup2.default.name, _popup2.default), _defineProperty(_components, _titleBar2.default.name, _titleBar2.default), _defineProperty(_components, _scrollView2.default.name, _scrollView2.default), _components),

    props: {
      value: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      defaultIndex: {
        type: Number,
        default: -1
      },
      invalidIndex: {
        type: [Array, Number],
        default: function _default() {
          return -1;
        }
      },
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
        default: '取消'
      },
      maskClosable: {
        type: Boolean,
        default: true
      },
      isCheck: {
        type: Boolean,
        default: false
      },
      optionRender: {
        type: Function,
        default: _util.noop
      },
      maxHeight: {
        type: Number,
        default: 400
      }
    },

    data: function data() {
      return {
        isSelectorShow: false,
        radioKey: Date.now(),
        activeIndex: -1,
        tmpActiveIndex: -1
      };
    },


    computed: {
      isNeedConfirm: function isNeedConfirm() {
        return this.okText !== '';
      },
      hasSlot: function hasSlot() {
        return !!this.$scopedSlots.default;
      }
    },

    watch: {
      value: function value(val) {
        this.isSelectorShow = val;
      },
      isSelectorShow: function isSelectorShow(val) {
        this.$emit('input', val);
      }
    },

    created: function created() {
      this.value && (this.isSelectorShow = this.value);
      !this.isNeedConfirm && (this.activeIndex = this.defaultIndex);
      this.activeIndex = this.tmpActiveIndex = this.defaultIndex;
    },


    methods: {
      $_getItemText: function $_getItemText(item) {
        var renderText = this.itemRender(item);
        return renderText || item.text || item.label;
      },
      $_isActive: function $_isActive(index) {
        var activeIndex = this.tmpActiveIndex;
        if (activeIndex > -1) {
          return activeIndex === index;
        } else {
          return this.defaultIndex === index;
        }
      },
      $_isInvalid: function $_isInvalid(index) {
        var invalidIndex = this.invalidIndex;
        return Array.isArray(invalidIndex) ? !!~invalidIndex.indexOf(index) : index === invalidIndex;
      },
      $_setScroller: function $_setScroller() {
        this.$refs.scroll.reflowScroller();
      },
      $_onSelectorConfirm: function $_onSelectorConfirm() {
        if (this.tmpActiveIndex > -1) {
          this.activeIndex = this.tmpActiveIndex;
          this.isSelectorShow = false;
          this.$emit('confirm', this.data[this.activeIndex]);
        }
      },
      $_onSelectorCancel: function $_onSelectorCancel() {
        this.isSelectorShow = false;
        this.tmpActiveIndex = this.activeIndex;

        if (this.tmpActiveIndex !== -1) {
          this.$refs.radio.selectByIndex(this.tmpActiveIndex);
        } else {
          this.radioKey = Date.now();
        }

        this.$emit('cancel');
      },
      $_onSelectorChoose: function $_onSelectorChoose(item, index) {
        this.tmpActiveIndex = index;
        if (!this.isNeedConfirm) {
          this.activeIndex = index;
          this.isSelectorShow = false;
        }

        this.$emit('choose', item);
      },
      $_onSelectorShow: function $_onSelectorShow() {
        this.$_setScroller();
        this.$emit('show');
      },
      $_onSelectorHide: function $_onSelectorHide() {
        this.$emit('hide');
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-selector",class:{
    'is-normal': !_vm.isCheck,
    'is-check': _vm.isCheck && _vm.isNeedConfirm
  }},[_c('md-popup',{attrs:{"position":"bottom","mask-closable":_vm.maskClosable},on:{"show":_vm.$_onSelectorShow,"hide":_vm.$_onSelectorHide,"maskClick":_vm.$_onSelectorCancel},model:{value:(_vm.isSelectorShow),callback:function ($$v) {_vm.isSelectorShow=$$v},expression:"isSelectorShow"}},[_c('md-popup-title-bar',{attrs:{"title":_vm.title,"ok-text":_vm.okText,"cancel-text":_vm.cancelText},on:{"confirm":_vm.$_onSelectorConfirm,"cancel":_vm.$_onSelectorCancel}}),_vm._v(" "),_c('md-scroll-view',{ref:"scroll",staticClass:"md-selector-container",style:({maxHeight: (_vm.maxHeight + "px")}),attrs:{"scrolling-x":false}},[_c('div',{staticClass:"md-selector-list"},[_c('md-radio',{key:_vm.radioKey,ref:"radio",attrs:{"options":_vm.data,"default-index":_vm.defaultIndex,"invalid-index":_vm.invalidIndex,"icon":"circle-right","icon-inverse":"circle","icon-size":"md","is-across-border":"","optionRender":_vm.optionRender,"is-slot-scope":_vm.hasSlot},on:{"change":_vm.$_onSelectorChoose},scopedSlots:_vm._u([{key:"default",fn:function(ref){
  var option = ref.option;
return [_vm._t("default",null,{option:option})]}}])})],1)])],1)],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3548610c", __vue__options__)
  } else {
    hotAPI.reload("data-v-3548610c", __vue__options__)
  }
})()}