;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../icon', '../_style/global.css', './style/spinner.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../icon'), require('../_style/global.css'), require('./style/spinner.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.icon, global.global, global.spinner);
    global.spinner = mod.exports;
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
    name: 'md-activity-indicator-spinning',

    components: _defineProperty({}, _icon2.default.name, _icon2.default),

    props: {
      size: {
        type: Number,
        default: 70
      },
      color: {
        type: String,
        default: 'dark',
        validator: function validator(val) {
          return val === 'dark' || val === 'light';
        }
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-activity-indicator-spinning",class:{dark: _vm.color === 'dark'}},[_c('md-icon',{staticClass:"md-activity-indicator-svg",style:({width: (_vm.size + "px"), height: (_vm.size + "px")}),attrs:{"name":"spinner"}})],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4913c733", __vue__options__)
  } else {
    hotAPI.reload("data-v-4913c733", __vue__options__)
  }
})()}