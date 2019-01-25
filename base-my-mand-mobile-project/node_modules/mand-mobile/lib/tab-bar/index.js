;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  exports.default = {
    name: 'md-tab-bar',

    props: {
      titles: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      showInkBar: {
        type: Boolean,
        default: true
      },
      inkBarLength: {
        type: Number,
        default: 70,
        validator: function validator(length) {
          return length > 0 && length <= 100;
        }
      },
      inkBarAnimate: {
        type: Boolean,
        default: true
      },
      defaultIndex: {
        type: Number,
        default: 0
      },
      forceUseArray: {
        type: Boolean,
        default: undefined
      }
    },

    data: function data() {
      return {
        activeIndex: this.defaultIndex
      };
    },


    watch: {
      defaultIndex: function defaultIndex(val) {
        this.selectTab(val);
      },
      activeIndex: function activeIndex(val, preVal) {
        this.$emit('indexChanged', val, preVal);
      }
    },

    mounted: function mounted() {
      this.selectTab(this.activeIndex);
    },


    methods: {
      $_titleList: function $_titleList() {
        if (this.titles && this.titles.length) {
          return this.titles;
        } else if (this.$slots.default && this.$slots.default.length) {
          return this.$slots.default.filter(function (el) {
            return el.tag;
          });
        } else {
          return [];
        }
      },
      selectTab: function selectTab(i) {
        var index = parseInt(i);
        if (index >= 0 && index < this.$_titleList().length) {
          this.activeIndex = index;
        }
      }
    },

    render: function render(h) {
      var _this = this;

      var self = this;
      var tabTitles = [];
      var mapper = function mapper(item, index) {
        return h('a', {
          class: {
            'md-tab-title': true,
            active: _this.activeIndex === index
          },
          on: {
            click: function click() {
              self.selectTab(index);
            }
          }
        }, [(_this.forceUseArray !== undefined ? _this.forceUseArray : !!_this.$scopedSlots.title) ? _this.$scopedSlots.title(item) : item]);
      };

      tabTitles = this.$_titleList().map(mapper);

      var innerElements = [].concat(_toConsumableArray(tabTitles));

      if (this.showInkBar) {
        var padPercent = (100 - this.inkBarLength) / 2;
        var width = this.inkBarLength / tabTitles.length;
        var pad = padPercent / tabTitles.length;
        var offset = this.activeIndex * 100 / tabTitles.length + pad;

        innerElements.push(h('div', {
          class: {
            'ink-bar': true,
            'animate': this.inkBarAnimate
          },
          style: {
            width: width + '%',
            left: offset + '%'
          }
        }));
      }

      return h('nav', { staticClass: 'md-tab-bar' }, [h('div', { staticClass: 'md-tab-bar-inner' }, [h('div', { staticClass: 'md-tab-titles-wrapper' }, innerElements)])]);
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7bab87f6", __vue__options__)
  } else {
    hotAPI.reload("data-v-7bab87f6", __vue__options__)
  }
})()}