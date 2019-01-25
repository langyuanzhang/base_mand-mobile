;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_util/scroller', '../_util/render', '../_util', '../_style/global.css', './style/picker-column.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_util/scroller'), require('../_util/render'), require('../_util'), require('../_style/global.css'), require('./style/picker-column.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.scroller, global.render, global._util, global.global, global.pickerColumn);
    global.pickerColumn = mod.exports;
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

  var dpr = (0, _util.getDpr)();
  var API_LIST = ['getColumnValue', 'getColumnValues', 'getColumnIndex', 'getColumnIndexs', 'getColumnIndexByDefault', 'setColumnValues', 'refresh', 'inheritPickerApi'];

  exports.default = {
    name: 'md-picker-column',

    props: {
      data: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      cols: {
        type: Number,
        default: 1
      },
      defaultValue: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      defaultIndex: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      invalidIndex: {
        type: Array,
        default: function _default() {
          return [];
        }
      }
    },

    data: function data() {
      return {
        style: {
          maskerHeight: 81 * dpr,
          indicatorHeight: 36 * dpr
        },
        columnValues: [],
        scrollers: [],
        scrollDirect: 1,
        scrollPosition: 0,
        activedIndexs: [],
        isInitialed: false,
        isScrollInitialed: false,
        isScrolling: false,
        isMouseDown: false
      };
    },


    watch: {
      data: {
        handler: function handler(val) {
          this.columnValues = [].concat(_toConsumableArray(val));
        },

        deep: true
      }
    },

    created: function created() {
      this.columnValues = [].concat(_toConsumableArray(this.data));
    },


    methods: {
      $_initColumnsScroller: function $_initColumnsScroller() {
        var _this = this;

        var startIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var hooks = this.$el.querySelectorAll('.md-picker-column-hook');

        if (!hooks) {
          return;
        }

        hooks = Array.isArray(hooks) ? hooks : Array.prototype.slice.call(hooks);

        for (var i = startIndex, len = hooks.length; i < len; i++) {
          var container = hooks[i];
          container && this.$_initSingleColumnScroller(container, i);
        }

        if (!startIndex) {
          this.$_initColumnIndex();
          if (!this.isInitialed) {
            this.isInitialed = true;
            setTimeout(function () {
              _this.$emit('initialed');
            }, 0);
          }
        }

        this.isScrollInitialed = true;
      },
      $_initSingleColumnScroller: function $_initSingleColumnScroller(container, index) {
        var _this2 = this;

        var columns = this.$el.querySelectorAll('.column-list');
        var content = columns[index];

        if (index === undefined || !columns || !container || !content) {
          return;
        }

        var rect = container.getBoundingClientRect();
        var scroller = new _scroller2.default(function (left, top) {
          (0, _render.render)(content, left, top);
        }, {
          scrollingX: false,
          snapping: true,
          scrollingComplete: function scrollingComplete() {
            _this2.$_onColumnScrollEnd(index);
          }
        });

        scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);
        scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight + this.style.maskerHeight);
        scroller.setSnapSize(0, this.style.indicatorHeight);

        this.$set(this.scrollers, index, scroller);
      },
      $_initColumnIndex: function $_initColumnIndex() {
        var _this3 = this;

        var data = this.columnValues;
        var scrollers = this.scrollers;
        var defaultValue = this.defaultValue;
        var defaultIndex = this.defaultIndex;

        this.$_getColumnIndexByDefault(data, defaultIndex, defaultValue, function (columnIndex, itemIndex) {
          var scroller = scrollers[columnIndex];

          if (!scroller) {
            (0, _util.warn)('initialColumnIndex: scroller of column ' + columnIndex + ' is undefined');
            return 1;
          }

          if (_this3.$_isColumnIndexInvalid(columnIndex, itemIndex)) {
            _this3.$_scrollToValidIndex(columnIndex, itemIndex);
          } else {
            var offsetTop = _this3.$_getColumnOffsetByIndex(itemIndex);
            scroller.scrollTo(0, offsetTop);
            _this3.$set(_this3.activedIndexs, columnIndex, itemIndex);
          }
        });
      },
      $_getColumnIndexByDefault: function $_getColumnIndexByDefault(data) {
        var defaultIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var fn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _util.noop;

        if (!data) {
          return;
        }

        (0, _util.traverse)(data, function (item, level, indexs) {
          var columnIndex = indexs[0];
          var itemIndex = indexs[1];
          var itemDefaultIndex = defaultIndex[columnIndex];
          var itemDefaultValue = defaultValue[columnIndex];

          if (itemDefaultIndex === undefined && itemDefaultValue === undefined) {
            itemDefaultIndex = 0;
          }

          if (itemDefaultIndex !== undefined && itemIndex === itemDefaultIndex || itemDefaultValue !== undefined && (item.text === itemDefaultValue || item.label === itemDefaultValue || item.value === itemDefaultValue)) {
            fn(columnIndex, itemIndex);
            return 2;
          }
        });
      },
      $_getColumnIndexByOffset: function $_getColumnIndexByOffset(top) {
        return Math.round(top / this.style.indicatorHeight);
      },
      $_getColumnOffsetByIndex: function $_getColumnOffsetByIndex(index) {
        return index * this.style.indicatorHeight;
      },
      $_isColumnIndexInvalid: function $_isColumnIndexInvalid(columnIndex, itemIndex) {
        var invalidIndex = this.invalidIndex[columnIndex];
        return (0, _util.inArray)(invalidIndex, itemIndex);
      },
      $_hasValidIndex: function $_hasValidIndex(columnIndex) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.data[columnIndex].keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (!this.$_isColumnIndexInvalid(columnIndex, key)) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        (0, _util.warn)('hasValidIndex: has no valid items in column index ' + columnIndex);
        return false;
      },
      $_findValidIndex: function $_findValidIndex(columnIndex, count) {
        if (!this.$_hasValidIndex(columnIndex)) {
          return count;
        }
        var tempCount = count;
        while (this.$_isColumnIndexInvalid(columnIndex, tempCount)) {
          tempCount += this.scrollDirect;
        }

        if (tempCount < 0 || tempCount > this.data[columnIndex].length - 1) {
          this.scrollDirect = -this.scrollDirect;
          return this.$_findValidIndex(columnIndex, count);
        }
        return tempCount;
      },
      $_scrollToValidIndex: function $_scrollToValidIndex(columnIndex, itemIndex) {
        var scroller = this.scrollers[columnIndex];
        var count = this.$_findValidIndex(columnIndex, itemIndex);
        var offsetTop = this.$_getColumnOffsetByIndex(count);
        scroller.scrollTo(0, this.$_scrollInZoon(scroller, offsetTop), true);
      },
      $_scrollInZoon: function $_scrollInZoon(scroller, top) {
        var MaxTop = scroller.getScrollMax().top;

        if (top < 0) {
          return 0;
        } else if (top > MaxTop) {
          return MaxTop;
        } else {
          return top;
        }
      },
      $_onColumnTouchStart: function $_onColumnTouchStart(event, index, isMouse) {
        event.preventDefault();

        var scroller = this.scrollers[index];
        var touches = isMouse ? [{ pageX: event.pageX, pageY: event.pageY }] : event.touches;

        if (!scroller) {
          (0, _util.warn)('touchstart: scroller of column ' + index + ' is undefined');
          return;
        }

        this.scrollPosition = isMouse ? event.pageY : event.touches[0].pageY;

        scroller.doTouchStart(touches, event.timeStamp);
        isMouse && (this.isMouseDown = true);
      },
      $_onColumnTouchMove: function $_onColumnTouchMove(event, index, isMouse) {
        var scroller = this.scrollers[index];
        var touches = isMouse ? [{ pageX: event.pageX, pageY: event.pageY }] : event.touches;

        if (!scroller || isMouse && !this.isMouseDown) {
          return;
        }

        var diff = this.scrollPosition - (isMouse ? event.pageY : event.touches[0].pageY);
        this.scrollDirect = diff ? diff / Math.abs(diff) : 1;

        scroller.doTouchMove(touches, event.timeStamp);
        isMouse && (this.isMouseDown = true);
      },
      $_onColumnTouchEnd: function $_onColumnTouchEnd(event, index, isMouse) {
        var scroller = this.scrollers[index];

        if (!scroller || isMouse && !this.isMouseDown) {
          return;
        }

        scroller.doTouchEnd(event.timeStamp);
        isMouse && (this.isMouseDown = false);
      },
      $_onColumnScrollEnd: function $_onColumnScrollEnd(index) {
        var scroller = this.scrollers[index];
        var top = scroller.getValues().top;
        var scrollTop = this.$_scrollInZoon(scroller, top);
        var activeItemIndex = this.$_getColumnIndexByOffset(scrollTop);
        var isInvalid = this.$_isColumnIndexInvalid(index, activeItemIndex);

        if (isInvalid || activeItemIndex === this.activedIndexs[index]) {
          isInvalid && this.$_scrollToValidIndex(index, activeItemIndex);
          return false;
        }

        this.$set(this.activedIndexs, index, activeItemIndex);

        this.$emit('change', index, activeItemIndex, this.getColumnValue(index));
      },
      inheritPickerApi: function inheritPickerApi(instance) {
        var _this4 = this;

        var blacklist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

        (0, _util.traverse)(API_LIST, function (api) {
          if (!instance) {
            return 2;
          } else if (~blacklist.indexOf(api)) {
            return 1;
          }

          var fn = _this4[api];

          if (fn) {
            instance[api] = fn;
          } else {
            (0, _util.warn)('inheritPickerApi: Api method [' + api + '] is undefined');
          }
        });
      },
      getColumnValue: function getColumnValue() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        var activeValues = this.getColumnValues();
        return activeValues[index];
      },
      getColumnValues: function getColumnValues() {
        var data = this.columnValues;
        var activeIndexs = this.activedIndexs;
        var activeValues = [];

        data.forEach(function (item, index) {
          activeValues[index] = item[activeIndexs[index]];
        });

        return activeValues;
      },
      getColumnIndex: function getColumnIndex() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        return this.activedIndexs[index];
      },
      getColumnIndexs: function getColumnIndexs() {
        return this.activedIndexs;
      },
      getColumnIndexByDefault: function getColumnIndexByDefault(data) {
        var defaultIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var fn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _util.noop;

        this.$_getColumnIndexByDefault(data, defaultIndex, defaultValue, fn);
      },
      setColumnValues: function setColumnValues(index, values) {
        var _this5 = this;

        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _util.noop;

        if (index === undefined || values === undefined) {
          return;
        }
        this.$set(this.activedIndexs, index, 0);
        this.$set(this.columnValues, index, values);
        this.$nextTick(function () {
          _this5.$_initSingleColumnScroller(index);
          callback();
        });
      },
      refresh: function refresh(callback) {
        var _this6 = this;

        var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        this.$nextTick(function () {
          _this6.$_initColumnsScroller(startIndex);
          callback && callback();
        });
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-picker-column",style:({ height: ((_vm.style.indicatorHeight + 2 * _vm.style.maskerHeight) + "px") })},[_c('div',{staticClass:"md-picker-column-container"},[_c('div',{staticClass:"md-picker-column-masker top",style:({ height: ((_vm.style.maskerHeight) + "px") })}),_vm._v(" "),_c('div',{staticClass:"md-picker-column-masker bottom",style:({ height: ((_vm.style.maskerHeight) + "px") })}),_vm._v(" "),_c('div',{staticClass:"md-picker-column-list"},[_vm._l((_vm.columnValues),function(colunm,i){return [_c('div',{key:i,staticClass:"md-picker-column-item"},[_c('ul',{staticClass:"column-list",style:({ 'padding-top': ((_vm.style.maskerHeight) + "px") })},[_vm._l((colunm),function(item,j){return [_c('li',{key:j,staticClass:"column-item",class:{'disabled': _vm.$_isColumnIndexInvalid(i, j)},style:({
                  'height': ((_vm.style.indicatorHeight) + "px"),
                  'line-height': ((_vm.style.indicatorHeight) + "px")
                  }),domProps:{"textContent":_vm._s(item.text || item.label)}})]})],2)])]}),_vm._v(" "),_vm._l(((_vm.cols - _vm.columnValues.length)),function(n){return [_c('div',{key:n + _vm.columnValues.length - 1,staticClass:"md-picker-column-item"},[_c('ul',{staticClass:"column-list",style:({ 'padding-top': ((_vm.style.maskerHeight) + "px") })})])]})],2),_vm._v(" "),_c('div',{staticClass:"md-picker-column-hooks"},[_vm._l((_vm.cols),function(n){return [_c('div',{key:n - 1,staticClass:"md-picker-column-hook",on:{"touchstart":function($event){_vm.$_onColumnTouchStart($event, n - 1)},"mousedown":function($event){_vm.$_onColumnTouchStart($event, n - 1, true)},"touchmove":function($event){_vm.$_onColumnTouchMove($event, n - 1)},"mousemove":function($event){_vm.$_onColumnTouchMove($event, n - 1, true)},"touchend":function($event){_vm.$_onColumnTouchEnd($event, n - 1)},"mouseup":function($event){_vm.$_onColumnTouchEnd($event, n - 1, true)}}})]})],2)])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-796544e8", __vue__options__)
  } else {
    hotAPI.reload("data-v-796544e8", __vue__options__)
  }
})()}