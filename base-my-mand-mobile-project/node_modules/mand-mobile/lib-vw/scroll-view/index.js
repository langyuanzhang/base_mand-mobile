;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_util/scroller', '../_util/render', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_util/scroller'), require('../_util/render'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.scroller, global.render, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _scroller, _render) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _scroller2 = _interopRequireDefault(_scroller);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    name: 'md-scroll-view',
    props: {
      scrollingX: {
        type: Boolean,
        default: true
      },
      scrollingY: {
        type: Boolean,
        default: true
      },
      bouncing: {
        type: Boolean,
        default: true
      },
      autoReflow: {
        type: Boolean,
        default: false
      },
      endReachedThreshold: {
        type: Number,
        default: 0
      }
    },
    data: function data() {
      return {
        container: null,
        content: null,
        refresher: null,
        more: null,
        scroller: null,
        refreshOffsetY: 0,
        isInitialed: false,
        isMouseDown: false,
        isRefreshing: false,
        isRefreshActive: false,
        isEndReaching: false,
        scrollX: null,
        scrollY: null,
        containerW: 0,
        containerH: 0,
        contentW: 0,
        contentH: 0,
        reflowTimer: null
      };
    },

    computed: {
      hasRefresher: function hasRefresher() {
        return !!(this.$slots.refresh || this.$scopedSlots.refresh);
      },
      hasMore: function hasMore() {
        return !!(this.$slots.more || this.$scopedSlots.more);
      }
    },
    mounted: function mounted() {
      this.$_initScroller();
      this.autoReflow && this.$_initAutoReflow();
    },
    destroyed: function destroyed() {
      this.reflowTimer && clearInterval(this.reflowTimer);
    },

    methods: {
      $_initScroller: function $_initScroller() {
        var _this = this;

        this.container = this.$el;
        this.refresher = this.$el.querySelector('.scroll-view-refresh');
        this.more = this.$el.querySelector('.scroll-view-more');
        this.content = this.$el.querySelector('.scroll-view-container');
        this.refreshOffsetY = this.refresher ? this.refresher.clientHeight : 0;
        this.moreOffsetY = this.more ? this.more.clientHeight : 0;
        var container = this.container;
        var content = this.content;
        var rect = container.getBoundingClientRect();
        var scroller = new _scroller2.default(function (left, top) {
          (0, _render.render)(content, left, top);
          if (_this.isInitialed) {
            _this.$_onScroll(left, top);
          }
        }, {
          scrollingX: this.scrollingX,
          scrollingY: this.scrollingY,
          bouncing: this.bouncing,
          zooming: false,
          animationDuration: 200,
          inRequestAnimationFrame: true
        });
        scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);
        if (this.hasRefresher) {
          scroller.activatePullToRefresh(this.refreshOffsetY, function () {
            _this.isRefreshActive = true;
            _this.isRefreshing = false;
          }, function () {
            _this.isRefreshActive = false;
            _this.isRefreshing = false;
            _this.$emit('refreshActive');
          }, function () {
            _this.isRefreshActive = false;
            _this.isRefreshing = true;
            _this.$emit('refreshing');
          });
        }
        this.scroller = scroller;
        this.reflowScroller(true);
        setTimeout(function () {
          _this.isInitialed = true;
        }, 50);
      },
      $_initAutoReflow: function $_initAutoReflow() {
        var _this2 = this;

        this.reflowTimer = setInterval(function () {
          _this2.reflowScroller();
        }, 100);
      },
      $_onScollerTouchStart: function $_onScollerTouchStart(event) {
        if (!this.scroller) {
          return;
        }
        this.scroller.doTouchStart(event.touches, event.timeStamp);
      },
      $_onScollerTouchMove: function $_onScollerTouchMove(event) {
        if (!this.scroller) {
          return;
        }
        event.preventDefault();
        this.scroller.doTouchMove(event.touches, event.timeStamp, event.scale);
      },
      $_onScollerTouchEnd: function $_onScollerTouchEnd(event) {
        if (!this.scroller) {
          return;
        }
        this.scroller.doTouchEnd(event.timeStamp);
      },
      $_onScollerMouseDown: function $_onScollerMouseDown(event) {
        if (!this.scroller) {
          return;
        }
        this.scroller.doTouchStart([{
          pageX: event.pageX,
          pageY: event.pageY
        }], event.timeStamp);
        this.isMouseDown = true;
      },
      $_onScollerMouseMove: function $_onScollerMouseMove(event) {
        if (!this.scroller || !this.isMouseDown) {
          return;
        }
        this.scroller.doTouchMove([{
          pageX: event.pageX,
          pageY: event.pageY
        }], event.timeStamp);
        this.isMouseDown = true;
      },
      $_onScollerMouseUp: function $_onScollerMouseUp(event) {
        if (!this.scroller || !this.isMouseDown) {
          return;
        }
        this.scroller.doTouchEnd(event.timeStamp);
        this.isMouseDown = false;
      },
      $_onScroll: function $_onScroll(left, top) {
        left = +left.toFixed(2);
        top = +top.toFixed(2);
        if (this.scrollX === left && this.scrollY === top) {
          return;
        }
        this.scrollX = left;
        this.scrollY = top;
        var containerHeight = this.scroller._clientHeight;
        var content = this.scroller._contentHeight;
        var moreOffsetY = this.moreOffsetY;
        var moreThreshold = this.endReachedThreshold;
        if (top > 0 && !this.isEndReaching && content > containerHeight && content - containerHeight <= top + moreOffsetY + moreThreshold) {
          this.isEndReaching = true;
          this.$emit('endReached');
        }
        this.$emit('scroll', { scrollLeft: left, scrollTop: top });
      },
      scrollTo: function scrollTo(left, top) {
        var animate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (!this.scroller) {
          return;
        }
        this.scroller.scrollTo(left, top, animate);
      },
      reflowScroller: function reflowScroller() {
        var _this3 = this;

        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var container = this.container;
        var content = this.content;
        if (!this.scroller || !container || !content) {
          return;
        }
        this.$nextTick(function () {
          var containerW = container.clientWidth;
          var containerH = container.clientHeight;
          var contentW = content.offsetWidth;
          var contentH = content.offsetHeight;

          if (force || _this3.containerW !== containerW || _this3.containerH !== containerH || _this3.contentW !== contentW || _this3.contentH !== contentH) {
            _this3.scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight);
            _this3.containerW = containerW;
            _this3.containerH = containerH;
            _this3.contentW = contentW;
            _this3.contentH = contentH;
          }
        });
      },
      triggerRefresh: function triggerRefresh() {
        if (!this.scroller) {
          return;
        }
        this.scroller.triggerPullToRefresh();
      },
      finishRefresh: function finishRefresh() {
        if (!this.scroller) {
          return;
        }
        this.scroller.finishPullToRefresh();
        this.reflowScroller();
      },
      finishLoadMore: function finishLoadMore() {
        if (!this.scroller) {
          return;
        }
        this.isEndReaching = false;
        this.reflowScroller();
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-scroll-view",on:{"touchstart":_vm.$_onScollerTouchStart,"touchmove":_vm.$_onScollerTouchMove,"touchend":_vm.$_onScollerTouchEnd,"touchcancel":_vm.$_onScollerTouchEnd,"mousedown":_vm.$_onScollerMouseDown,"mousemove":_vm.$_onScollerMouseMove,"mouseup":_vm.$_onScollerMouseUp,"mouseleave":_vm.$_onScollerMouseUp}},[(_vm.$slots.header)?_c('div',{staticClass:"scroll-view-header"},[_vm._t("header")],2):_vm._e(),_vm._v(" "),_c('div',{staticClass:"scroll-view-container"},[(_vm.hasRefresher)?_c('div',{staticClass:"scroll-view-refresh",class:{'refreshing': _vm.isRefreshing, 'refresh-active': _vm.isRefreshActive},style:({top: ("-" + _vm.refreshOffsetY + "px")})},[_vm._t("refresh",null,{scrollTop:_vm.scrollY,isRefreshing:_vm.isRefreshing,isRefreshActive:_vm.isRefreshActive})],2):_vm._e(),_vm._v(" "),_vm._t("default"),_vm._v(" "),(_vm.hasMore)?_c('div',{staticClass:"scroll-view-more",class:{active: _vm.isEndReaching},attrs:{"is-end-reaching":_vm.isEndReaching}},[_vm._t("more")],2):_vm._e()],2),_vm._v(" "),(_vm.$slots.footer)?_c('div',{staticClass:"scroll-view-footer"},[_vm._t("footer")],2):_vm._e()])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f784340", __vue__options__)
  } else {
    hotAPI.reload("data-v-6f784340", __vue__options__)
  }
})()}