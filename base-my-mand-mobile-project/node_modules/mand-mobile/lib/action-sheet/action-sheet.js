;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../popup', '../_util', '../_style/global.css', './style/action-sheet.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../popup'), require('../_util'), require('../_style/global.css'), require('./style/action-sheet.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.popup, global._util, global.global, global.actionSheet);
    global.actionSheet = mod.exports;
  }
})(this, function (exports, _popup, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _popup2 = _interopRequireDefault(_popup);

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
    name: 'md-action-sheet',

    components: _defineProperty({}, _popup2.default.name, _popup2.default),

    props: {
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
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
      invalidIndex: {
        type: Number,
        default: -1
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      maxHeight: {
        type: Number,
        default: 400
      }
    },

    data: function data() {
      return {
        isActionSheetShow: this.value,
        clickIndex: -1,
        scroller: ''
      };
    },


    watch: {
      value: function value(newVal) {
        this.isActionSheetShow = newVal;
      }
    },

    created: function created() {
      this.clickIndex = this.defaultIndex;
    },


    methods: {
      $_setScroller: function $_setScroller() {
        var boxer = this.$el ? this.$el.querySelector('.md-action-sheet-content') : null;
        if (boxer && boxer.clientHeight >= this.maxHeight) {
          this.scroller = '.md-action-sheet-content';
        } else {
          this.scroller = '';
        }
      },
      $_onShow: function $_onShow() {
        this.$_setScroller();
        this.$emit('show');
      },
      $_onHide: function $_onHide() {
        this.$emit('hide');
        this.$emit('input', false);
      },
      $_onSelect: function $_onSelect(item, index) {
        if (index === this.invalidIndex || (0, _util.inArray)(this.invalidIndex, index)) {
          return;
        }
        this.clickIndex = index;
        this.$emit('selected', item);
        this.$emit('input', false);
      },
      $_onCancel: function $_onCancel() {
        this.$emit('cancel');
        this.$emit('input', false);
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-action-sheet"},[_c('md-popup',{attrs:{"position":"bottom","prevent-scroll":"","prevent-scroll-exclude":_vm.scroller},on:{"show":_vm.$_onShow,"hide":_vm.$_onHide},model:{value:(_vm.isActionSheetShow),callback:function ($$v) {_vm.isActionSheetShow=$$v},expression:"isActionSheetShow"}},[_c('div',{staticClass:"md-action-sheet-content",style:({maxHeight: (_vm.maxHeight + "px")})},[(_vm.title)?_c('header',[_vm._v(_vm._s(_vm.title))]):_vm._e(),_vm._v(" "),_c('ul',[_vm._l((_vm.options),function(item,index){return [_c('li',{key:index,class:{
              'active': index === _vm.clickIndex,
              'disabled': index=== _vm.invalidIndex,
              'md-action-sheet-item': true
            },domProps:{"innerHTML":_vm._s(item.text || item.label)},on:{"click":function($event){_vm.$_onSelect(item, index)}}})]}),_vm._v(" "),_c('li',{staticClass:"cancel-btn",on:{"click":_vm.$_onCancel}},[_vm._v(_vm._s(_vm.cancelText))])],2)])])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-020d9a87", __vue__options__)
  } else {
    hotAPI.reload("data-v-020d9a87", __vue__options__)
  }
})()}