;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../icon', '../_style/global.css', './style/tip.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../icon'), require('../_style/global.css'), require('./style/tip.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.icon, global.global, global.tip);
    global.tip = mod.exports;
  }
})(this, function (exports, _icon) {
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
    name: 'md-tip-content',
    components: _defineProperty({}, _icon2.default.name, _icon2.default),

    props: {
      placement: {
        type: String
      },
      content: {
        type: [String, Number]
      }
    },

    computed: {
      wrapperCls: function wrapperCls() {
        var cls = {};

        if (['left', 'bottom', 'right'].indexOf(this.placement) !== -1) {
          cls['is-' + this.placement] = true;
        }

        return cls;
      }
    },

    methods: {
      $_onClose: function $_onClose() {
        this.$emit('close');
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-tip",class:_vm.wrapperCls},[[_vm._v(_vm._s(_vm.content))],_vm._v(" "),_c('md-icon',{attrs:{"name":"cross","size":"md"},nativeOn:{"click":function($event){return _vm.$_onClose($event)}}})],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-495488ff", __vue__options__)
  } else {
    hotAPI.reload("data-v-495488ff", __vue__options__)
  }
})()}