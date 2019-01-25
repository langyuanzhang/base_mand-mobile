;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './carousel-circle', '../_style/global.css', './style/carousel.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./carousel-circle'), require('../_style/global.css'), require('./style/carousel.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.carouselCircle, global.global, global.carousel);
    global.carousel = mod.exports;
  }
})(this, function (exports, _carouselCircle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _carouselCircle2 = _interopRequireDefault(_carouselCircle);

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
    name: 'md-activity-indicator-carousel',

    components: _defineProperty({}, _carouselCircle2.default.name, _carouselCircle2.default),

    props: {
      size: {
        type: Number,
        default: 30
      },
      color: {
        type: String,
        default: '#fc9153'
      }
    },

    data: function data() {
      return {
        circleAnimateValues: [[1, 0.8, 0.6, 0.6, 0.6, 0.8, 1], [0.6, 0.8, 1, 0.8, 0.6, 0.6, 0.6], [0.6, 0.6, 0.6, 0.8, 1, 0.8, 0.6]]
      };
    },


    computed: {
      viewWidth: function viewWidth() {
        var size = this.size;
        var len = this.circleAnimateValues.length;
        return len * size + (len - 1) * size / 2;
      },
      viewBox: function viewBox() {
        return '0 0 ' + this.viewWidth + ' ' + this.size;
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-activity-indicator-carousel"},[_c('svg',{staticClass:"md-activity-indicator-svg carouseling",style:({width: (_vm.viewWidth + "px"), height: (_vm.size + "px")}),attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":_vm.viewBox,"fill":_vm.color}},_vm._l((_vm.circleAnimateValues),function(value,index){return _c('md-activity-indicator-carousel-circle',{key:("carousel-circle-" + index),attrs:{"size":_vm.size,"index":index,"animate-values":value}})}))])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-78972d36", __vue__options__)
  } else {
    hotAPI.reload("data-v-78972d36", __vue__options__)
  }
})()}