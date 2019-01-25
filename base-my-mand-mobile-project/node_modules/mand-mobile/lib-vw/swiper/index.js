;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_util/scroller', '../_util/render', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_util/scroller'), require('../_util/render'), require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.scroller, global.render, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _scroller, _render, _util) {
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
    name: 'md-swiper',

    props: {
      autoplay: {
        type: Number,
        default: 3000,
        validator: function validator(value) {
          if (value === 0) {
            return true;
          }
          return value >= 500;
        }
      },
      transition: {
        type: String,
        default: 'slide',
        validator: function validator(value) {
          return ['slide', 'slideY', 'fade'].indexOf(value) > -1;
        }
      },
      defaultIndex: {
        type: Number,
        default: 0,
        validator: function validator(value) {
          return value > -1;
        }
      },
      hasDots: {
        type: Boolean,
        default: true
      },
      isPrevent: {
        type: Boolean,
        default: true
      },
      isLoop: {
        type: Boolean,
        default: true
      },
      dragable: {
        type: Boolean,
        default: true
      }
    },

    data: function data() {
      return {
        ready: false,
        dragging: false,
        userScrolling: false,
        isInitial: false,
        hasTouch: 'ontouchstart' in window,
        index: 0,
        fromIndex: 0,
        toIndex: 0,
        firstIndex: 0,
        lastIndex: 0,
        oItemCount: 0,
        rItemCount: 0,
        dimension: 0,
        dragState: {},
        timer: null,
        noDrag: false,
        scroller: null,
        isStoped: false,
        $swiper: null,
        transitionEndHandler: null
      };
    },


    computed: {
      isLastItem: function isLastItem() {
        return this.index === this.rItemCount - 1;
      },
      isFirstItem: function isFirstItem() {
        return this.index === 0;
      },
      originalIndex: function originalIndex() {
        if (this.isLoop && this.isSlide) {
          return this.index - 1;
        } else {
          return this.index;
        }
      },
      isSlide: function isSlide() {
        return this.transition.toLowerCase().indexOf('slide') > -1;
      },
      isVertical: function isVertical() {
        return this.transition === 'slideY';
      }
    },

    mounted: function mounted() {
      var _this = this;

      this.ready = true;
      this.hasTouch = 'ontouchstart' in window;
      this.$swiper = this.$el.querySelector('.md-swiper-container');
      this.$nextTick(function () {
        _this.$_reInitItems();
        _this.$_startPlay();
        _this.$_bindEvents();
      });
    },
    destroyed: function destroyed() {
      this.$_clearTimer();
    },


    methods: {
      $_getDimension: function $_getDimension() {
        this.dimension = this.isVertical ? this.$el.clientHeight : this.$el.clientWidth;
      },
      $_initScroller: function $_initScroller() {
        var _this2 = this;

        var scroller = new _scroller2.default(function (left, top) {
          (0, _render.render)(_this2.$swiper, left, top);
        }, {
          scrollingY: this.isVertical,
          scrollingX: !this.isVertical,
          snapping: false,
          bouncing: false,

          scrollingComplete: function scrollingComplete() {
            _this2.transitionEndHandler && _this2.transitionEndHandler();
            _this2.transitionEndHandler = null;
          }
        });

        var container = this.$swiper;
        var contentWidth = this.isVertical ? container.clientWidth : container.clientWidth * this.rItemCount;
        var contentHeight = this.isVertical ? container.clientHeight * this.rItemCount : container.clientHeight;
        scroller.setPosition(container.clientLeft, container.clientTop);
        scroller.setDimensions(container.clientWidth, container.clientHeight, contentWidth, contentHeight);

        this.scroller = scroller;
      },
      $_backupItem: function $_backupItem(children) {
        var firstNode = children[0].$el.cloneNode(true);
        var lastNode = children[children.length - 1].$el.cloneNode(true);

        if (children.length > 1 && this.isLoop) {
          var firstNodeCopy = this.$swiper.querySelector('.md-swiper-item-first-copy');
          var lastNodeCopy = this.$swiper.querySelector('.md-swiper-item-last-copy');
          firstNodeCopy && this.$swiper.removeChild(firstNodeCopy);
          lastNodeCopy && this.$swiper.removeChild(lastNodeCopy);

          firstNode.className += ' md-swiper-item-first-copy';
          lastNode.className += ' md-swiper-item-last-copy';
          if (this.isVertical) {
            firstNode.style.height = this.dimension + 'px';
            lastNode.style.height = this.dimension + 'px';
          } else {
            firstNode.style.width = this.dimension + 'px';
            lastNode.style.width = this.dimension + 'px';
          }
          this.$swiper.appendChild(firstNode);
          this.$swiper.insertBefore(lastNode, this.$swiper.childNodes[0]);

          this.firstIndex++;
          this.lastIndex++;
          this.index++;

          this.rItemCount += 2;
        }
      },
      $_translate: function $_translate(element, offset) {
        var animate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (!element) {
          (0, _util.warn)('[md-swiper] no element for translate');
          return;
        }
        var x = this.isVertical ? 0 : -offset;
        var y = this.isVertical ? -offset : 0;
        this.scroller.scrollTo(x, y, animate);
      },
      $_opacity: function $_opacity() {
        var _this3 = this;

        var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var opacity = arguments[1];

        if (typeof opacity !== 'undefined') {
          var toIndex = 0;
          var fromIndex = this.toIndex;
          var itemCount = this.rItemCount;

          if (opacity > 0) {
            if (fromIndex > 0) {
              toIndex = fromIndex - 1;
            } else if (fromIndex === 0) {
              toIndex = itemCount - 1;
            }
          } else {
            if (fromIndex < itemCount - 1) {
              toIndex = fromIndex + 1;
            } else if (fromIndex === itemCount - 1) {
              toIndex = 0;
            }
          }
          var _from = this.$children[fromIndex].$el;
          var _to = this.$children[toIndex].$el;
          _from.style.opacity = 1 - Math.abs(opacity);
          _from.style.transition = animate ? 'opacity 300ms ease' : '';
          _to.style.opacity = Math.abs(opacity);
          return;
        }

        var from = this.$children[this.fromIndex].$el;
        var to = this.$children[this.toIndex].$el;
        from.style.opacity = 0;
        from.style.transition = animate ? 'opacity 500ms ease' : '';
        to.style.opacity = 1;
        if (animate) {
          setTimeout(function () {
            _this3.$emit('after-change', _this3.fromIndex, _this3.toIndex);
          }, 500);
        }
      },
      $_initState: function $_initState(children) {
        this.oItemCount = children.length;
        this.rItemCount = children.length;
        this.noDrag = children.length === 1 || !this.dragable;
        this.index = this.defaultIndex >= 0 && this.defaultIndex < children.length ? parseInt(this.defaultIndex) : 0;
        this.firstIndex = 0;
        this.lastIndex = children.length - 1;
        this.fromIndex = this.index === this.firstIndex ? this.lastIndex : this.index + 1;
        this.toIndex = this.index;
      },
      $_reInitItems: function $_reInitItems() {
        var children = this.$children;

        if (!children || !children.length) {
          return;
        }

        this.$_getDimension();

        this.$_initState(children);

        if (this.isSlide) {
          this.$_backupItem(children);
          this.$_initScroller();
          this.$_translate(this.$swiper, -this.dimension * this.index, false);
        } else {
          this.$_opacity(false);
        }
        this.isInitial = true;
      },
      $_startPlay: function $_startPlay() {
        var _this4 = this;

        if (this.autoplay > 0 && this.oItemCount > 1 && this.isLoop) {
          this.timer = setInterval(function () {
            if (!_this4.isLoop && _this4.index >= _this4.rItemCount - 1) {
              return _this4.$_clearTimer();
            }
            if (!_this4.dragging) {
              _this4.next();
            }
          }, this.autoplay);
        }
      },
      $_bindEvents: function $_bindEvents() {
        var _this5 = this;

        window.addEventListener('resize', function () {
          setTimeout(function () {
            _this5.$_reInitItems();
          }, 300);
        });

        var element = this.$el;

        var isTouchEvent = void 0;
        var _onTouchStart = function _onTouchStart(event) {
          if (event.originalEvent) {
            event = event.originalEvent;
          }
          isTouchEvent = event.type === 'touchstart';
          if (_this5.isPrevent) {
            event.preventDefault();
          }
          _this5.dragging = true;
          _this5.userScrolling = false;
          _this5.$_doOnTouchStart(event);
        };

        var _onTouchMove = function _onTouchMove(event) {
          if (event.originalEvent) {
            event = event.originalEvent;
          }
          if (isTouchEvent && event.type === 'mousemove') {
            return;
          }
          if (_this5.isPrevent) {
            event.preventDefault();
          }
          if (!_this5.dragging) {
            return;
          }
          _this5.$_doOnTouchMove(event);
        };

        var _onTouchEnd = function _onTouchEnd(event) {
          if (_this5.isPrevent) {
            event.preventDefault();
          }
          if (_this5.userScrolling) {
            _this5.dragging = false;
            _this5.dragState = {};
            return;
          }
          if (!_this5.dragging) {
            return;
          }
          _this5.$_doOnTouchEnd(event);
          _this5.dragging = false;
        };

        if (!this.hasTouch) {
          element.addEventListener('mousedown', _onTouchStart);
          element.addEventListener('mousemove', _onTouchMove);
          element.addEventListener('mouseup', _onTouchEnd);
        } else {
          element.addEventListener('touchstart', _onTouchStart);
          element.addEventListener('touchmove', _onTouchMove);
          element.addEventListener('touchend', _onTouchEnd);
        }
      },
      $_clearTimer: function $_clearTimer() {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      },
      $_isScroll: function $_isScroll(distanceX, distanceY) {
        var vertical = this.isVertical;
        if (!vertical && (distanceX < 5 || distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
          return true;
        } else if (vertical && (distanceY < 5 || distanceY >= 5 && distanceX >= 1.73 * distanceY)) {
          return true;
        } else {
          return false;
        }
      },
      $_calcuRealIndex: function $_calcuRealIndex(index) {
        if (this.isLoop && this.isSlide && this.oItemCount > 0) {
          return index - 1 < 0 ? this.oItemCount - 1 : index - 1 > this.oItemCount - 1 ? 0 : index - 1;
        }
        return index;
      },
      $_doTransition: function $_doTransition(towards, options) {
        var _this6 = this;

        if (this.oItemCount === 0) {
          return;
        }
        if (!options && this.oItemCount < 2) {
          return;
        }

        var index = this.index;
        var itemCount = this.rItemCount;

        var oldIndex = this.index;

        if (!towards) {
          return;
        }

        if (options && options.index) {
          this.index = options.index + (this.isLoop && this.isSlide ? 1 : 0);
        } else if (towards === 'prev') {
          if (index > 0) {
            this.index = index - 1;
          } else if (!this.isSlide && index === 0) {
            this.index = itemCount - 1;
          } else if (this.isLoop && index === 0) {
            this.index = itemCount - 1;
          }
        } else if (towards === 'next') {
          if (index < itemCount - 1) {
            this.index = index + 1;
          } else if (!this.isSlide && index === itemCount - 1) {
            this.index = 0;
          } else if (this.isLoop && index === itemCount - 1) {
            this.index = 1;
          }
        }

        if (this.isLoop && this.isSlide) {
          this.fromIndex = this.$_calcuRealIndex(oldIndex);
          this.toIndex = this.$_calcuRealIndex(this.index);
        } else {
          this.fromIndex = this.toIndex;
          this.toIndex = this.index;
        }
        this.$emit('before-change', this.fromIndex, this.toIndex);
        if (!this.isSlide) {
          this.$_opacity();
          return;
        }

        setTimeout(function () {
          _this6.transitionEndHandler = function () {
            if (_this6.isLastItem && _this6.isLoop) {
              var x = _this6.isVertical ? 0 : _this6.firstIndex * _this6.dimension;
              var y = _this6.isVertical ? _this6.firstIndex * _this6.dimension : 0;
              _this6.scroller.scrollTo(x, y, false);
              _this6.index = _this6.firstIndex;
            }

            if (_this6.isFirstItem && _this6.isLoop) {
              var _x3 = _this6.isVertical ? 0 : _this6.lastIndex * _this6.dimension;
              var _y = _this6.isVertical ? _this6.lastIndex * _this6.dimension : 0;
              _this6.scroller.scrollTo(_x3, _y, false);
              _this6.index = _this6.lastIndex;
            }

            _this6.$emit('after-change', _this6.fromIndex, _this6.toIndex);
          };
          _this6.$_translate(_this6.$swiper, -_this6.dimension * _this6.index);
        }, 10);
      },
      $_doOnTouchStart: function $_doOnTouchStart(event) {
        if (this.noDrag) {
          return;
        }
        this.stop();

        var element = this.$el;
        var point = this.hasTouch ? event.touches[0] : event;

        var dragState = this.dragState;

        dragState.startTime = new Date();
        dragState.startLeft = point.pageX;
        dragState.startTop = point.pageY;
        dragState.itemWidth = element.offsetWidth;
        dragState.itemHeight = element.offsetHeight;
      },
      $_doOnTouchMove: function $_doOnTouchMove(event) {
        if (this.noDrag) {
          return;
        }
        var point = this.hasTouch ? event.touches[0] : event;
        var dragState = this.dragState;

        dragState.currentLeft = point.pageX;
        dragState.currentTop = point.pageY;

        var offsetLeft = dragState.currentLeft - dragState.startLeft;
        var offsetTop = dragState.currentTop - dragState.startTop;
        var distanceX = Math.abs(offsetLeft);
        var distanceY = Math.abs(offsetTop);

        this.userScrolling = this.$_isScroll(distanceX, distanceY);
        if (this.userScrolling) {
          return;
        } else {
          event.preventDefault();
        }

        var _offsetLeft = Math.min(Math.max(-dragState.itemWidth + 1, offsetLeft), dragState.itemWidth - 1);
        var _offsetTop = Math.min(Math.max(-dragState.itemHeight + 1, offsetTop), dragState.itemHeight - 1);

        var offset = this.isVertical ? _offsetTop - dragState.itemHeight * this.index : _offsetLeft - dragState.itemWidth * this.index;

        if (this.isSlide) {
          this.$_translate(this.$swiper, offset);
        } else {
          this.$_opacity(false, offsetLeft / dragState.itemWidth);
        }
      },
      $_doOnTouchEnd: function $_doOnTouchEnd() {
        if (this.noDrag) {
          return;
        }
        var dragState = this.dragState;
        var towards = null;


        var dragDuration = new Date() - dragState.startTime;
        var offsetLeft = dragState.currentLeft - dragState.startLeft;
        var offsetTop = dragState.currentTop - dragState.startTop;
        var itemWidth = dragState.itemWidth;
        var itemHeight = dragState.itemHeight;
        var index = this.index;
        var itemCount = this.rItemCount;

        if (dragDuration < 300 && dragState.currentLeft === undefined) {
          this.play(this.autoplay);
          return;
        }

        if (this.isVertical) {
          if (Math.abs(offsetTop) > itemHeight / 6) {
            towards = offsetTop < 0 ? 'next' : 'prev';
          } else {
            this.$_translate(this.$swiper, -this.dimension * index, true);
          }
        } else {
          if (Math.abs(offsetLeft) > itemWidth / 6) {
            towards = offsetLeft < 0 ? 'next' : 'prev';
          } else {
            if (this.isSlide) {
              this.$_translate(this.$swiper, -this.dimension * index, true);
            } else {
              this.$_opacity(true, 0);
            }
          }
        }

        if (!this.isLoop) {
          if (index === 0 && towards === 'prev' || index === itemCount - 1 && towards === 'next') {
            towards = null;
          }
        }

        this.$_doTransition(towards);

        this.dragState = {};

        this.play(this.autoplay);
      },
      next: function next() {
        this.$_doTransition('next');
      },
      prev: function prev() {
        this.$_doTransition('prev');
      },
      goto: function goto(index) {
        if (isNaN(index)) {
          return;
        }
        index = parseInt(index);
        if (index === this.index || index < 0 || index >= this.oItemCount) {
          return;
        }
        var towards = index > this.index ? 'next' : 'pre';
        this.index = index;
        this.$_doTransition(towards, {
          index: index
        });
      },
      getIndex: function getIndex() {
        return this.$_calcuRealIndex(this.index);
      },
      play: function play() {
        var autoplay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;

        this.$_clearTimer();
        if (autoplay < 500) {
          return;
        }
        this.autoplay = autoplay || this.autoplay;
        this.$_startPlay();
        this.isStoped = false;
      },
      stop: function stop() {
        this.$_clearTimer();
        this.isStoped = true;
      },
      swiperItemCreated: function swiperItemCreated() {
        var _this7 = this;

        if (!this.ready) {
          return;
        }
        this.$nextTick(function () {
          _this7.$_clearTimer();
          _this7.$_reInitItems();
          if (_this7.autoplay > 0 && !_this7.isStoped) {
            _this7.$_startPlay();
          }
        });
      },
      swiperItemDestroyed: function swiperItemDestroyed() {
        var _this8 = this;

        if (!this.ready) {
          return;
        }
        this.$nextTick(function () {
          _this8.$_clearTimer();
          _this8.$_reInitItems();
          if (_this8.autoplay > 0 && !_this8.isStoped) {
            _this8.$_startPlay();
          }
        });
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-swiper",class:{'md-swiper-vertical': _vm.isVertical, 'md-swiper-fade': !_vm.isSlide, 'disabled': !_vm.isInitial}},[_c('div',{staticClass:"md-swiper-box"},[_c('div',{staticClass:"md-swiper-container"},[_vm._t("default")],2)]),_vm._v(" "),(_vm.oItemCount > 1 && _vm.hasDots)?_c('div',{staticClass:"md-swiper-indicators",class:{'disabled': !_vm.hasDots}},[_vm._l((_vm.oItemCount),function(index){return [_c('div',{key:index,staticClass:"md-swiper-indicator",class:{ 'md-swiper-indicator-active': index - 1 === _vm.originalIndex }})]})],2):_vm._e()])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-63b3ae5a", __vue__options__)
  } else {
    hotAPI.reload("data-v-63b3ae5a", __vue__options__)
  }
})()}