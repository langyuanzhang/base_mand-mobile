;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './roller', '../_style/global.css', './style/roller-success.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./roller'), require('../_style/global.css'), require('./style/roller-success.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.roller, global.global, global.rollerSuccess);
    global.rollerSuccess = mod.exports;
  }
})(this, function (exports, _roller) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _roller2 = _interopRequireDefault(_roller);

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
    name: 'md-activity-indicator-rolling-success',

    components: _defineProperty({}, _roller2.default.name, _roller2.default),

    props: {
      size: {
        type: Number,
        default: 70
      },
      color: {
        type: String,
        default: '#fc9153'
      },
      isSuccess: {
        type: Boolean,
        default: false
      }
    },

    data: function data() {
      return {
        animating: false,
        startTmp: Date.now(),
        successFlag: false
      };
    },


    computed: {
      strokeWidth: function strokeWidth() {
        return this.size / 16;
      },
      radius: function radius() {
        return this.size / 2;
      },
      viewBoxSize: function viewBoxSize() {
        return this.size + 2 * this.strokeWidth;
      }
    },

    watch: {
      isSuccess: function isSuccess(val) {
        if (val) {
          this.doSuccess();
        } else {
          this.startTmp = Date.now();
          this.successFlag = false;
        }
      }
    },

    mounted: function mounted() {
      this.isSuccess && this.doSuccess();
    },


    methods: {
      doSuccess: function doSuccess() {
        var _this = this;

        var st = this.startTmp;
        var et = Date.now();
        var delay = Math.ceil((et - st) / 1500) * 1500 - (et - st);
        setTimeout(function () {
          _this.successFlag = true;
        }, delay);
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-activity-indicator-rolling-success"},[_c('md-activity-indicator-rolling',{attrs:{"stroke-width":_vm.strokeWidth,"radius":_vm.radius,"fill":"#FFF6F1"}},[(_vm.isSuccess)?_c('g',[_c('circle',{staticClass:"success",attrs:{"cx":_vm.viewBoxSize/2,"cy":_vm.viewBoxSize/2,"fill":"#FFF6F1","stroke":"none","r":_vm.radius}})]):_vm._e()]),_vm._v(" "),(_vm.isSuccess)?_c('svg',{staticClass:"right",style:({transform: ("translate(-48%, -50%) scale(" + (_vm.size/70) + ")")}),attrs:{"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid"}},[_c('g',[_c('line',{style:({'strokeWidth':_vm.strokeWidth, 'stroke': _vm.color}),attrs:{"x1":"32","y1":"47","x2":"45","y2":"62","stroke-dasharray":"20"}}),_vm._v(" "),_c('line',{style:({'strokeWidth':_vm.strokeWidth, 'stroke': _vm.color}),attrs:{"x1":"42","y1":"62","x2":"68.4","y2":"40","stroke-dasharray":"35"}})])]):_vm._e()],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-364d8076", __vue__options__)
  } else {
    hotAPI.reload("data-v-364d8076", __vue__options__)
  }
})()}