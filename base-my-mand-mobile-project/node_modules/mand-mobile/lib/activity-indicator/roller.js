;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_style/global.css', './style/roller.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_style/global.css'), require('./style/roller.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.global, global.roller);
    global.roller = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'md-activity-indicator-rolling',

    props: {
      size: {
        type: Number,
        default: 70
      },
      color: {
        type: String,
        default: '#fc9153'
      },
      fill: {
        type: String,
        default: 'transparent'
      },
      process: {
        type: Number
      }
    },

    computed: {
      id: function id() {
        return this.$options.name + '-keyframes-' + this.size;
      },
      strokeWidth: function strokeWidth() {
        return this.size / 16;
      },
      radius: function radius() {
        return this.size / 2;
      },
      viewBoxSize: function viewBoxSize() {
        return this.size + 2 * this.strokeWidth;
      },
      circlePerimeter: function circlePerimeter() {
        return this.size * 3.1415;
      },
      circleStyle: function circleStyle() {
        if (this.process === undefined) {
          return {
            animation: this.id + ' 2s cubic-bezier(1.0, 0.5, 0.8, 1.0) infinite'
          };
        } else {
          return {
            strokeDasharray: this.process * this.circlePerimeter + ' ' + (1 - this.process) * this.circlePerimeter
          };
        }
      },
      duration: function duration() {
        return 2;
      }
    },

    watch: {
      size: {
        handler: function handler() {
          this.$_insertKeyframes();
        },

        immediate: true
      }
    },

    methods: {
      $_insertKeyframes: function $_insertKeyframes() {
        var id = this.id;
        var keyframes = 'from{stroke-dasharray:0 ' + this.circlePerimeter + ';}to{stroke-dasharray:' + this.circlePerimeter + ' 0;}';
        var css = '@-webkit-keyframes ' + id + '{' + keyframes + '}@keyframes ' + id + '{' + keyframes + '}}';

        var isCssExisting = true;
        var elem = document.getElementById(id);

        if (!elem) {
          elem = document.createElement('style');
          elem.setAttribute('type', 'text/css');
          elem.setAttribute('id', id);
          isCssExisting = false;
        }

        if ('textContent' in elem) {
          elem.textContent = css;
        } else {
          elem.styleSheet.cssText = css;
        }

        if (!isCssExisting) {
          document.getElementsByTagName('head')[0].appendChild(elem);
        }
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-activity-indicator-rolling"},[_c('svg',{staticClass:"md-activity-indicator-svg rolling",style:({width: (_vm.size + "px"), height: (_vm.size + "px")}),attrs:{"viewBox":("0 0 " + _vm.viewBoxSize + " " + _vm.viewBoxSize),"preserveAspectRatio":"xMidYMid"}},[(!_vm.$slots.default)?_c('g',{staticClass:"circle",attrs:{"transform":"matrix(0, 1, 1, 0, 0, 0)"}},[_c('circle',{staticClass:"stroke",style:(_vm.circleStyle),attrs:{"cx":_vm.viewBoxSize/2,"cy":_vm.viewBoxSize/2,"fill":_vm.fill,"stroke":_vm.color,"stroke-width":_vm.strokeWidth,"stroke-dashoffset":this.circlePerimeter / 2,"r":_vm.radius}},[(_vm.process === undefined)?_c('animateTransform',{attrs:{"dur":(_vm.duration + "s"),"values":("0 " + (_vm.viewBoxSize/2) + " " + (_vm.viewBoxSize/2) + ";360 " + (_vm.viewBoxSize/2) + " " + (_vm.viewBoxSize/2)),"attributeName":"transform","type":"rotate","calcMode":"linear","keyTimes":"0;1","begin":"0s","repeatCount":"indefinite"}}):_vm._e()],1)]):_vm._t("default")],2)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0f981040", __vue__options__)
  } else {
    hotAPI.reload("data-v-0f981040", __vue__options__)
  }
})()}