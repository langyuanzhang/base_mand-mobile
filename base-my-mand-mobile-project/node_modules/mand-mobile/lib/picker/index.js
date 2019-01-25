;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../popup', '../popup/title-bar', './picker-column', './cascade', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../popup'), require('../popup/title-bar'), require('./picker-column'), require('./cascade'), require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.popup, global.titleBar, global.pickerColumn, global.cascade, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _popup, _titleBar, _pickerColumn, _cascade, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _popup2 = _interopRequireDefault(_popup);

  var _titleBar2 = _interopRequireDefault(_titleBar);

  var _pickerColumn2 = _interopRequireDefault(_pickerColumn);

  var _cascade2 = _interopRequireDefault(_cascade);

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

  var _components;

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
    name: 'md-picker',

    components: (_components = {}, _defineProperty(_components, _popup2.default.name, _popup2.default), _defineProperty(_components, _titleBar2.default.name, _titleBar2.default), _defineProperty(_components, _pickerColumn2.default.name, _pickerColumn2.default), _components),

    props: {
      value: {
        type: Boolean,
        default: false
      },
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
          var arr = new Array(this.cols);
          for (var i = 0, len = arr.length; i < len; i++) {
            arr[i] = 0;
          }
          return arr;
        }
      },
      invalidIndex: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      isCascade: {
        type: Boolean,
        default: false
      },
      isView: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      okText: {
        type: String,
        default: '确认'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      maskClosable: {
        type: Boolean,
        default: true
      }
    },

    data: function data() {
      return {
        isPickerShow: false,
        isPickerFirstPopup: true,
        oldActivedIndexs: null
      };
    },


    computed: {
      column: function column() {
        return this.$refs['pickerColumn'];
      },
      isScrollInitialed: function isScrollInitialed() {
        return this.column.isScrollInitialed;
      }
    },

    watch: {
      value: function value(val) {
        this.isPickerShow = val;
        val && this.$_initPicker();
      },
      isPickerShow: function isPickerShow(val) {
        if (!val) {
          this.$emit('input', val);
        }
      },

      data: {
        handler: function handler(val, oldVal) {
          if (!(0, _util.compareObjects)(val, oldVal)) {
            this.$_initPickerColumn();
          }
        },

        deep: true,
        immediate: true
      },
      defaultIndex: {
        handler: function handler(val, oldVal) {
          if (!(0, _util.compareObjects)(val, oldVal)) {
            this.$_initPickerColumn();
          }
        },

        deep: true
      }
    },

    mounted: function mounted() {
      var _this = this;

      this.$_initPicker();

      if (this.isView) {
        this.$nextTick(function () {
          _this.column.refresh();
        });
      }
    },


    methods: {
      $_initPicker: function $_initPicker() {
        var _this2 = this;

        if (!this.isView && this.value) {
          this.isPickerShow = this.value;
        }

        this.column.inheritPickerApi(this, ['refresh']);

        if (this.isPickerFirstPopup) {
          this.isPickerFirstPopup = false;
        } else {
          setTimeout(function () {
            _this2.oldActivedIndexs = [].concat(_toConsumableArray(_this2.column.activedIndexs));
          }, 100);
        }
      },
      $_initPickerColumn: function $_initPickerColumn() {
        var _this3 = this;

        if (!this.isCascade) {
          return;
        }

        var defaultIndex = this.$_getDefaultIndex();
        var defaultIndexOfFirstColumn = defaultIndex[0] || 0;
        this.$nextTick(function () {
          (0, _cascade2.default)(_this3.column, {
            currentLevel: 0,
            maxLevel: _this3.cols,
            values: _this3.data[0] ? _this3.data[0][defaultIndexOfFirstColumn] || [] : [],
            defaultIndex: defaultIndex
          });
        });
      },
      $_resetPickerColumn: function $_resetPickerColumn() {
        this.$_initPickerColumn();
      },
      $_getDefaultIndex: function $_getDefaultIndex() {
        return this.oldActivedIndexs || this.defaultIndex;
      },
      $_getDefaultValue: function $_getDefaultValue() {
        return this.oldActivedIndexs ? [] : this.defaultValue;
      },
      $_onPickerConfirm: function $_onPickerConfirm() {
        var column = this.column;
        var columnValues = column.getColumnValues();
        var isScrolling = false;
        column.scrollers.forEach(function (scroller) {
          if (scroller._isAnimating !== false || scroller._isDecelerating !== false || scroller._isDragging !== false || scroller._isGesturing !== false) {
            isScrolling = true;
            return false;
          }
        });

        if (!isScrolling) {
          this.isPickerShow = false;
          this.$emit('confirm', columnValues);
        }
      },
      $_onPickerInitialed: function $_onPickerInitialed() {
        this.$emit('initialed');
      },
      $_onPickerCancel: function $_onPickerCancel() {
        var _this4 = this;

        this.isPickerShow = false;
        this.$emit('cancel');

        this.$nextTick(function () {
          _this4.$_resetPickerColumn();
          _this4.refresh();
        });
      },
      $_onPickerChange: function $_onPickerChange(columnIndex, itemIndex, values) {
        var _this5 = this;

        if (this.isCascade) {
          (0, _cascade2.default)(this.column, {
            currentLevel: columnIndex,
            maxLevel: this.cols,
            values: values
          }, function () {
            _this5.column.refresh(null, columnIndex + 1);
          });
        }

        this.$emit('change', columnIndex, itemIndex, values);
      },
      $_onPickerBeforeShow: function $_onPickerBeforeShow() {
        var _this6 = this;

        if (!this.isScrollInitialed) {
          this.$nextTick(function () {
            _this6.column.refresh();
          });
        }
      },
      $_onPickerHide: function $_onPickerHide() {
        this.$emit('hide');
      },
      $_onPickerShow: function $_onPickerShow() {
        this.$emit('show');
      },
      refresh: function refresh() {
        this.column.isScrollInitialed = false;

        if (this.isView || this.isPickerShow) {
          this.column.refresh.apply(this.column, arguments);
        }
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-picker",class:{'with-popup': !_vm.isView}},[(_vm.isView)?[_c('md-picker-column',{ref:"pickerColumn",attrs:{"data":_vm.data,"default-value":_vm.defaultValue,"default-index":_vm.defaultIndex,"invalid-index":_vm.invalidIndex,"cols":_vm.cols},on:{"initialed":function($event){_vm.$emit('initialed')},"change":_vm.$_onPickerChange}})]:[_c('md-popup',{attrs:{"position":"bottom","mask-closable":_vm.maskClosable,"prevent-scroll":""},on:{"beforeShow":_vm.$_onPickerBeforeShow,"show":_vm.$_onPickerShow,"hide":_vm.$_onPickerHide,"maskClick":_vm.$_onPickerCancel},model:{value:(_vm.isPickerShow),callback:function ($$v) {_vm.isPickerShow=$$v},expression:"isPickerShow"}},[_c('md-popup-title-bar',{attrs:{"title":_vm.title,"ok-text":_vm.okText,"cancel-text":_vm.cancelText},on:{"confirm":_vm.$_onPickerConfirm,"cancel":_vm.$_onPickerCancel}}),_vm._v(" "),_c('md-picker-column',{ref:"pickerColumn",attrs:{"data":_vm.data,"default-value":_vm.$_getDefaultValue(),"default-index":_vm.$_getDefaultIndex(),"invalid-index":_vm.invalidIndex,"cols":_vm.cols},on:{"initialed":_vm.$_onPickerInitialed,"change":_vm.$_onPickerChange}})],1)]],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4baee569", __vue__options__)
  } else {
    hotAPI.reload("data-v-4baee569", __vue__options__)
  }
})()}