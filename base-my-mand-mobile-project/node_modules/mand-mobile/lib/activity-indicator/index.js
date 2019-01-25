;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './roller', './roller-success', './spinner', './carousel', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./roller'), require('./roller-success'), require('./spinner'), require('./carousel'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.roller, global.rollerSuccess, global.spinner, global.carousel, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _roller, _rollerSuccess, _spinner, _carousel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _roller2 = _interopRequireDefault(_roller);

  var _rollerSuccess2 = _interopRequireDefault(_rollerSuccess);

  var _spinner2 = _interopRequireDefault(_spinner);

  var _carousel2 = _interopRequireDefault(_carousel);

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
    name: 'md-activity-indicator',

    components: (_components = {}, _defineProperty(_components, _roller2.default.name, _roller2.default), _defineProperty(_components, _rollerSuccess2.default.name, _rollerSuccess2.default), _defineProperty(_components, _spinner2.default.name, _spinner2.default), _defineProperty(_components, _carousel2.default.name, _carousel2.default), _components),

    props: {
      type: {
        type: String,
        default: 'roller' },
      size: {
        type: Number,
        default: 70
      },
      color: {
        type: String,
        default: function _default() {
          if (this.type === 'spinner') {
            return 'dark';
          } else {
            return '#fc9153';
          }
        }
      },
      textColor: {
        type: String,
        default: '#999'
      },
      textSize: {
        type: Number
      },
      vertical: {
        type: Boolean,
        default: false
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-activity-indicator",class:_vm.type},[_c('div',{staticClass:"indicator-container",class:{vertical: _vm.vertical}},[_c('div',{staticClass:"indicator-loading"},[(_vm.type === 'roller')?[_c('md-activity-indicator-rolling',{attrs:{"size":_vm.size,"color":_vm.color}})]:(_vm.type === 'roller-success')?[_c('md-activity-indicator-rolling-success',{attrs:{"size":_vm.size,"color":_vm.color}})]:(_vm.type === 'spinner')?[_c('md-activity-indicator-spinning',{attrs:{"size":_vm.size,"color":_vm.color}})]:(_vm.type === 'carousel')?[_c('md-activity-indicator-carousel',{attrs:{"size":_vm.size,"color":_vm.color}})]:_vm._e()],2),_vm._v(" "),(_vm.$slots.default)?_c('div',{staticClass:"md-activity-indicator-text indicator-text",style:({fontSize: (_vm.textSize + "px"), color: _vm.textColor})},[_vm._t("default")],2):_vm._e()])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5debdc28", __vue__options__)
  } else {
    hotAPI.reload("data-v-5debdc28", __vue__options__)
  }
})()}