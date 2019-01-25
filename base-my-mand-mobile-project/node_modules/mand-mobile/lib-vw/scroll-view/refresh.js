;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../activity-indicator/roller', '../_style/global.css', './style/refresh.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../activity-indicator/roller'), require('../_style/global.css'), require('./style/refresh.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.roller, global.global, global.refresh);
    global.refresh = mod.exports;
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
    name: 'md-scroll-view-refresh',

    components: _defineProperty({}, _roller2.default.name, _roller2.default),

    props: {
      scrollTop: {
        type: Number,
        default: 0
      },
      isRefreshing: {
        type: Boolean,
        default: false
      },
      isRefreshActive: {
        type: Boolean,
        default: false
      },
      refreshText: {
        type: String,
        default: '下拉刷新'
      },
      refreshActiveText: {
        type: String,
        default: '释放刷新'
      },
      refreshingText: {
        type: String,
        default: '刷新中...'
      }
    },

    computed: {
      process: function process() {
        if (!this.$el || !this.scrollTop) {
          return +this.scrollTop;
        }

        var refreshHeight = this.$el.clientHeight;

        if (Math.abs(this.scrollTop) < refreshHeight / 2) {
          return 0;
        }

        return (Math.abs(this.scrollTop) - refreshHeight / 2) / (refreshHeight / 2);
      },
      refreshTip: function refreshTip() {
        if (this.isRefreshing) {
          return this.refreshingText;
        } else if (this.isRefreshActive) {
          return this.refreshActiveText;
        } else {
          return this.refreshText;
        }
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-scroll-view-refresh"},[_c('md-activity-indicator-rolling',{attrs:{"process":!_vm.isRefreshing ? _vm.process : undefined}}),_vm._v(" "),_c('p',{staticClass:"refresh-tip"},[_vm._v(_vm._s(_vm.refreshTip))])],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0ea4a349", __vue__options__)
  } else {
    hotAPI.reload("data-v-0ea4a349", __vue__options__)
  }
})()}