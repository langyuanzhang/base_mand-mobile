;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../popup', '../icon', '../_style/global.css', './style/toast.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../popup'), require('../icon'), require('../_style/global.css'), require('./style/toast.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.popup, global.icon, global.global, global.toast);
    global.toast = mod.exports;
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
    name: 'md-toast',

    components: (_components = {}, _defineProperty(_components, _popup2.default.name, _popup2.default), _defineProperty(_components, _icon2.default.name, _icon2.default), _components),

    props: {
      icon: {
        type: String,
        default: ''
      },
      content: {
        type: [String, Number],
        default: ''
      },
      duration: {
        type: Number,
        default: 0
      },
      position: {
        type: String,
        default: 'center'
      },
      hasMask: {
        type: Boolean,
        default: false
      }
    },

    data: function data() {
      return {
        visible: true
      };
    },
    mounted: function mounted() {
      this.$_update();
    },
    updated: function updated() {
      this.$_update();
    },
    beforeDestroy: function beforeDestroy() {
      if (this.duration) {
        clearTimeout(this.$_timer);
      }
    },


    methods: {
      $_update: function $_update() {
        var _this = this;

        clearTimeout(this.$_timer);
        if (this.visible && this.duration) {
          this.$_timer = setTimeout(function () {
            _this.hide();
          }, this.duration);
        }
      },
      $_onHide: function $_onHide() {
        this.$emit('hide');
      },
      hide: function hide() {
        this.visible = false;
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-toast",class:[
    _vm.icon ? 'has-icon' : '',
    _vm.position ]},[_c('md-popup',{attrs:{"hasMask":_vm.hasMask,"maskClosable":false},on:{"hide":_vm.$_onHide},model:{value:(_vm.visible),callback:function ($$v) {_vm.visible=$$v},expression:"visible"}},[_c('div',{staticClass:"md-toast-content"},[(_vm.icon)?_c('md-icon',{attrs:{"name":_vm.icon,"size":"lg"}}):_vm._e(),_vm._v(" "),_c('span',{domProps:{"textContent":_vm._s(_vm.content)}})],1)])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-65c73c17", __vue__options__)
  } else {
    hotAPI.reload("data-v-65c73c17", __vue__options__)
  }
})()}