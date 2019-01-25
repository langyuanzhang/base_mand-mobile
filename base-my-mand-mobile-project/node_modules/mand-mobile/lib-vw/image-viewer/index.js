;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../swiper', '../swiper/swiper-item', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../swiper'), require('../swiper/swiper-item'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.swiper, global.swiperItem, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _swiper, _swiperItem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _swiper2 = _interopRequireDefault(_swiper);

  var _swiperItem2 = _interopRequireDefault(_swiperItem);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  exports.default = {
    name: 'md-image-viewer',

    components: {
      Swiper: _swiper2.default,
      SwiperItem: _swiperItem2.default
    },

    props: {
      value: {
        type: Boolean,
        default: false
      },

      show: {
        type: Boolean,
        default: false
      },
      list: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      initialIndex: {
        type: Number,
        default: 0
      },
      hasDots: {
        type: Boolean,
        default: true
      }
    },

    data: function data() {
      return {
        isViewerShow: false,
        innerList: [],
        imgs: [],
        currentImgIndex: 0
      };
    },


    computed: {},

    watch: {
      show: function show(val) {
        var _this = this;

        this.currentImgIndex = this.initialIndex;
        this.isViewerShow = val;
        this.$nextTick(function () {
          _this.$_imgsInit();
        });
      },
      value: function value(val) {
        var _this2 = this;

        this.currentImgIndex = this.initialIndex;
        this.isViewerShow = val;
        this.$nextTick(function () {
          _this2.$_imgsInit();
        });
      },
      isViewerShow: function isViewerShow(val) {
        this.$emit('input', val);

        !val && this.$emit('update:show', val);
      }
    },

    mounted: function mounted() {
      this.isViewerShow = this.value || this.show;
    },


    methods: {
      $_imgsInit: function $_imgsInit() {
        var _imgs = this.list;
        var _newImgs = [];
        _imgs.map(function (item) {
          var _item = (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object' ? item : { url: item };
          _newImgs.push(_item);
        });
        this.imgs = _newImgs;
      },
      $_afterChange: function $_afterChange(fromIndex, toIndex) {
        this.currentImgIndex = toIndex;
      },
      $_viewerClick: function $_viewerClick() {
        this.isViewerShow = false;
      },
      publicMethod: function publicMethod() {}
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isViewerShow),expression:"isViewerShow"}],staticClass:"md-image-viewer",on:{"click":_vm.$_viewerClick}},[_c('div',{staticClass:"viewer-container"},[(_vm.isViewerShow)?_c('swiper',{ref:"swiper",attrs:{"autoplay":0,"default-index":_vm.currentImgIndex,"has-dots":false,"is-prevent":false},on:{"after-change":_vm.$_afterChange}},_vm._l((_vm.imgs),function(item,$index){return _c('swiper-item',{key:$index,staticClass:"viewer-item-wrap",class:item.cls},[_c('div',{staticClass:"item"},[(!!item.url)?_c('img',{attrs:{"src":item.url,"alt":item.alt}}):_vm._e()])])})):_vm._e(),_vm._v(" "),(_vm.hasDots)?_c('div',{staticClass:"viewer-index"},[_vm._v(_vm._s(_vm.currentImgIndex + 1)+"/"+_vm._s(_vm.list.length))]):_vm._e()],1)])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bf152fc2", __vue__options__)
  } else {
    hotAPI.reload("data-v-bf152fc2", __vue__options__)
  }
})()}