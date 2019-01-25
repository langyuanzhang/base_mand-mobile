;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../tab-bar', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../tab-bar'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.tabBar, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _tabBar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _tabBar2 = _interopRequireDefault(_tabBar);

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
    name: 'md-tabs',

    components: _defineProperty({}, _tabBar2.default.name, _tabBar2.default),

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
      noslide: {
        type: Boolean,
        default: false
      },
      upsideDown: {
        type: Boolean,
        default: false
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
      activeIndex: function activeIndex(val, preVal) {
        this.$emit('change', val, preVal);
        this.$emit('indexChanged', val, preVal);
      }
    },

    mounted: function mounted() {
      this.selectTab(this.activeIndex);
    },


    methods: {
      selectTab: function selectTab(i) {
        var index = parseInt(i);
        if (index >= 0 && index < this.titleList().length) {
          this.activeIndex = index;
        }
      },
      titleList: function titleList() {
        if (this.titles && this.titles.length) {
          return this.titles;
        } else if (this.$slots.title && this.$slots.title.length) {
          return this.$slots.title.filter(function (el) {
            return el.tag;
          });
        } else {
          return [];
        }
      },
      contentList: function contentList() {
        if (this.$slots.default) {
          return this.$slots.default.filter(function (el) {
            return el.tag;
          });
        } else {
          return [];
        }
      }
    },

    render: function render(createElement) {
      var self = this;

      var titleBarRenderer = createElement('md-tab-bar', {
        props: {
          titles: self.titles,
          defaultIndex: self.activeIndex,
          showInkBar: self.showInkBar,
          inkBarLength: self.inkBarLength,
          inkBarAnimate: self.inkBarAnimate,
          forceUseArray: self.forceUseArray
        },
        class: {
          'on-bottom': self.upsideDown
        },
        on: {
          indexChanged: function indexChanged(i) {
            self.selectTab(i);
          }
        },
        scopedSlots: this.$scopedSlots
      }, this.$slots.title || []);

      var contentRenderer = this.contentList().map(function (content, index) {
        return createElement('div', {
          class: {
            'md-tab-content': true
          },
          key: index,
          attrs: {
            key: index
          }
        }, [content]);
      });

      var contentWrapperRenderer = createElement('div', {
        class: {
          'md-tab-content-wrapper': true
        },
        style: {
          transform: self.noslide ? '' : 'translateX(' + -this.activeIndex * 100 + '%)'
        }
      }, [self.noslide ? contentRenderer[this.activeIndex] : contentRenderer]);

      return createElement('div', {
        class: {
          'md-tabs': true
        }
      }, self.upsideDown ? [contentWrapperRenderer, titleBarRenderer] : [titleBarRenderer, contentWrapperRenderer]);
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
    hotAPI.createRecord("data-v-d514174e", __vue__options__)
  } else {
    hotAPI.reload("data-v-d514174e", __vue__options__)
  }
})()}