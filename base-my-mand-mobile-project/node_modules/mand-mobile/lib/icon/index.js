;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './load-spirte', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./load-spirte'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.loadSpirte, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _loadSpirte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _loadSpirte2 = _interopRequireDefault(_loadSpirte);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    name: 'md-icon',

    props: {
      name: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: 'md'
      },
      color: {
        type: String,
        default: ''
      }
    },

    mounted: function mounted() {
      (0, _loadSpirte2.default)();
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.name)?_c('svg',{staticClass:"md-icon",class:[("md-icon-" + _vm.name), _vm.size],style:({fill: _vm.color}),on:{"click":function($event){_vm.$emit('click', $event)}}},[_c('use',{attrs:{"xlink:href":("#" + _vm.name)}})]):_vm._e()}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-39823f94", __vue__options__)
  } else {
    hotAPI.reload("data-v-39823f94", __vue__options__)
  }
})()}