;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../popup', '../popup/title-bar', '../tabs', '../icon', '../radio', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../popup'), require('../popup/title-bar'), require('../tabs'), require('../icon'), require('../radio'), require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.popup, global.titleBar, global.tabs, global.icon, global.radio, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _popup, _titleBar, _tabs, _icon, _radio, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _popup2 = _interopRequireDefault(_popup);

  var _titleBar2 = _interopRequireDefault(_titleBar);

  var _tabs2 = _interopRequireDefault(_tabs);

  var _icon2 = _interopRequireDefault(_icon);

  var _radio2 = _interopRequireDefault(_radio);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

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
    name: 'md-tab-picker',

    components: (_components = {}, _defineProperty(_components, _popup2.default.name, _popup2.default), _defineProperty(_components, _titleBar2.default.name, _titleBar2.default), _defineProperty(_components, _tabs2.default.name, _tabs2.default), _defineProperty(_components, _icon2.default.name, _icon2.default), _defineProperty(_components, _radio2.default.name, _radio2.default), _components),

    props: {
      value: {
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
      placeholder: {
        type: String,
        default: '请选择'
      },
      loadingLabel: {
        type: String,
        default: '载入中'
      },
      errorLabel: {
        type: String,
        default: '数据异常'
      },
      maskClosable: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      dataStruct: {
        type: String,
        default: 'normal'
      },
      defaultIndex: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      optionRender: {
        type: Array,
        default: function _default() {
          return [];
        },
        validator: function validator(value) {
          if (value.length > 0) {
            return value.every(function (item) {
              return typeof item === 'function';
            });
          } else {
            return true;
          }
        }
      },
      asyncFunc: {
        type: Function,
        default: function _default() {
          return _util.noop;
        }
      }
    },

    data: function data() {
      return {
        isTabPickerShow: false,
        subTitles: [],
        renderData: [],
        defaultTabIndex: 0,
        currentIndex: 0,
        isLoading: true,
        isDataError: false,
        currentColumnLock: false,
        lastSelectIndex: null,
        refreshTabPicker: 0,
        walkTimes: 0
      };
    },


    watch: {
      value: function value(val) {
        val && (this.isTabPickerShow = val);
      },
      isTabPickerShow: function isTabPickerShow(val) {
        !val && this.$emit('input', val);
      },

      data: {
        handler: function handler(val, oldVal) {
          if (!(0, _util.compareObjects)(val, oldVal)) {
            this.$_initTabPicker();
          }
        },

        deep: true
      },
      isDataError: function isDataError(val) {
        var _this = this;

        if (val) {
          setTimeout(function () {
            _this.isDataError = false;
          }, 2000);
        }
      }
    },

    computed: {
      hasTitleSlotScope: function hasTitleSlotScope() {
        return !!this.$scopedSlots.titles;
      },
      hasOptionSlotScope: function hasOptionSlotScope() {
        return !!this.$scopedSlots.option;
      }
    },

    created: function created() {
      this.$_initTabPicker();
    },


    methods: {
      $_initTabPicker: function $_initTabPicker() {
        switch (this.dataStruct) {
          case 'normal':
            this.$_initNoCascadeData();
            break;
          case 'cascade':
            this.$_initCascadeData();
            break;
          case 'async':
            this.$_initAsyncCascadeData();
            break;
          default:
            break;
        }
      },
      $_initNoCascadeData: function $_initNoCascadeData() {
        var _this2 = this;

        if (this.data.length === 0) {
          return;
        }
        this.isLoading = false;

        var initialIndex = this.lastSelectIndex || this.defaultIndex;
        this.$_initTabContent();

        this.data.forEach(function (item, index) {
          var temp = {
            index: index,
            clickedKey: initialIndex.length > 0 && ~initialIndex[index] ? initialIndex[index] : -1,
            data: item.children
          };
          _this2.renderData.push(temp);
          var currentColumn = _this2.renderData[index];
          if (initialIndex && initialIndex.length > 0) {
            _this2.subTitles.push(currentColumn.data[currentColumn.clickedKey].label);
          } else {
            _this2.subTitles.push(item.label);
          }
        });
      },
      $_initCascadeData: function $_initCascadeData() {
        if (this.data.length === 0) {
          return;
        }
        var initialIndex = this.lastSelectIndex || this.defaultIndex;
        this.$_walk(initialIndex, this.data);
      },
      $_initAsyncCascadeData: function $_initAsyncCascadeData() {
        this.asyncFunc(null, this.$_renderInitalAsync);
      },
      $_renderInitalAsync: function $_renderInitalAsync(err, data) {
        if (err) {
          this.isDataError = err;
          return;
        }
        var initialIndex = this.lastSelectIndex || this.defaultIndex;
        this.$_walk(initialIndex, data, true);
      },
      $_walk: function $_walk(initialIndex, data, isAsync) {
        var _this3 = this;

        var func = function func() {
          if (initialIndex && initialIndex.length > 0) {
            var walk = function walk(err, data) {
              if (err) {
                _this3.isLoading = false;
                _this3.isDataError = err;
                return;
              }
              if (_this3.walkTimes < initialIndex.length) {
                var temp = initialIndex[_this3.walkTimes];
                var rawData = isAsync ? data.options : data;
                rawData.forEach(function (item, eq, array) {
                  if (eq === temp) {
                    _this3.currentIndex = _this3.walkTimes;
                    _this3.subTitles.splice(_this3.currentIndex, _this3.subTitles.length - 1, item.label);
                    var renderContent = {
                      index: _this3.walkTimes,
                      clickedKey: temp,
                      data: array
                    };
                    if (isAsync) {
                      renderContent = _extends({}, renderContent, {
                        asyncFunc: data.asyncFunc
                      });
                    }
                    _this3.renderData.splice(_this3.currentIndex, _this3.renderData.length - 1, renderContent);
                    _this3.$refs.tabs && _this3.$refs.tabs.selectTab(_this3.currentIndex);
                    _this3.walkTimes++;
                    if (item && item.children && Array.isArray(item.children)) {
                      walk(null, item.children);
                    } else if (isAsync && data && data.asyncFunc && typeof data.asyncFunc === 'function') {
                      data.asyncFunc({
                        index: _this3.walkTimes,
                        item: item,
                        eq: eq
                      }, walk);
                    } else {
                      walk();
                    }
                  }
                });
              } else {
                _this3.isLoading = false;
                _this3.defaultTabIndex = _this3.walkTimes - 1;
                _this3.walkTimes = 0;
                return false;
              }
            };
            walk(null, data);
          } else {
            _this3.$_initTabContent();
            _this3.subTitles.push(_this3.placeholder);
            if (isAsync) {
              _this3.renderData.push({
                index: 0,
                clickedKey: -1,
                data: data.options,
                asyncFunc: data.asyncFunc
              });
            } else {
              _this3.renderData.push({
                index: 0,
                clickedKey: -1,
                data: data
              });
            }
            _this3.isLoading = false;
          }
        };
        func();
      },
      $_initTabContent: function $_initTabContent() {
        this.subTitles = [];
        this.renderData = [];
        this.currentIndex = 0;
      },
      $_renderNextTabContent: function $_renderNextTabContent(orignData) {
        var _this4 = this;

        return function (err, asyncData) {
          _this4.isLoading = false;
          if (err) {
            _this4.isDataError = err;
            return;
          }
          try {
            var data = void 0,
                asyncFunc = null;
            if (orignData) {
              data = orignData;
            } else if (asyncData && asyncData.options) {
              data = asyncData.options;
              if (asyncData.asyncFunc) {
                asyncFunc = asyncData.asyncFunc;
              }
            } else {
              data = [];
            }

            if (!data || data.length === 0) {
              _this4.subTitles.splice(_this4.currentIndex + 1, _this4.subTitles.length - 1);
              _this4.renderData.splice(_this4.currentIndex + 1, _this4.renderData.length - 1);
              _this4.currentColumnLock = false;
              return;
            }

            _this4.subTitles.splice(_this4.currentIndex + 1, _this4.subTitles.length - 1, _this4.placeholder);
            _this4.renderData.splice(_this4.currentIndex + 1, _this4.renderData.length - 1, {
              index: _this4.currentIndex,
              clickedKey: -1,
              data: data,
              asyncFunc: asyncFunc
            });

            if (_this4.renderData.length > 1) {
              _this4.$nextTick(function () {
                _this4.$refs.tabs.selectTab(++_this4.currentIndex);
                setTimeout(function () {
                  _this4.currentColumnLock = false;
                }, 500);
              });
            }
          } catch (error) {
            _this4.isDataError = true;
          }
        };
      },
      $_refreshTabPicker: function $_refreshTabPicker() {
        var _this5 = this;

        this.isTabPickerShow = false;
        this.isLoading = true;
        this.isDataError = false;
        this.currentColumnLock = false;
        this.refreshTabPicker = Math.random();
        this.$nextTick(function () {
          _this5.$_initTabPicker();
        });
      },
      $_onShow: function $_onShow() {
        this.$emit('show');
      },
      $_onHide: function $_onHide() {
        this.$emit('hide');
      },
      $_onConfirm: function $_onConfirm() {
        this.isTabPickerShow = false;
        var selectedItem = this.getSelectedItem();
        var isSelectPart = selectedItem.some(function (option) {
          return !option;
        });
        if (!isSelectPart) {
          this.lastSelectIndex = selectedItem.map(function (option) {
            return option.item.eq;
          });
        }
        this.$emit('confirm', selectedItem);
      },
      $_onCancel: function $_onCancel() {
        this.$emit('cancel');
        this.$_refreshTabPicker();
      },
      $_onMaskClose: function $_onMaskClose() {
        this.$_refreshTabPicker();
      },
      $_onRadioChange: function $_onRadioChange(value, index) {
        if (this.dataStruct === 'cascade' && this.currentColumnLock) {
          return;
        }
        this.currentColumnLock = true;
        this.subTitles[this.currentIndex] = value.label;
        var currentColumn = this.renderData[this.currentIndex];
        currentColumn.clickedKey = index;

        this.$emit('change', {
          selectTab: this.currentIndex,
          selectIndex: index,
          selectItem: value
        });

        if (this.dataStruct === 'cascade') {
          if (value && value.children && Array.isArray(value.children)) {
            this.$_renderNextTabContent(value.children)();
            return;
          }
          this.currentColumnLock = false;
        }
        if (this.dataStruct === 'async' && currentColumn.asyncFunc) {
          value = _extends({
            index: index
          }, value);

          this.isLoading = true;
          typeof currentColumn.asyncFunc === 'function' && currentColumn.asyncFunc(value, this.$_renderNextTabContent());
        }
      },
      $_onIndexChange: function $_onIndexChange(index) {
        this.currentIndex = index;
      },
      getSelectedItem: function getSelectedItem() {
        return this.renderData.map(function (item, index) {
          if (~item.clickedKey) {
            var selected = item.data[item.clickedKey];
            return {
              index: index,
              item: {
                label: selected.label,
                value: selected.value,
                eq: item.clickedKey
              }
            };
          } else {
            return null;
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
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-tab-picker"},[_c('md-popup',{attrs:{"position":"bottom","mask-closable":_vm.maskClosable},on:{"show":_vm.$_onShow,"hide":_vm.$_onHide,"maskClick":_vm.$_onMaskClose},model:{value:(_vm.isTabPickerShow),callback:function ($$v) {_vm.isTabPickerShow=$$v},expression:"isTabPickerShow"}},[_c('md-popup-title-bar',{attrs:{"title":_vm.title,"ok-text":_vm.okText,"cancel-text":_vm.cancelText},on:{"confirm":_vm.$_onConfirm,"cancel":_vm.$_onCancel}}),_vm._v(" "),_c('div',{staticClass:"md-tab-picker-content"},[_c('md-tabs',{key:_vm.refreshTabPicker,ref:"tabs",attrs:{"titles":_vm.subTitles,"default-index":_vm.defaultTabIndex,"force-use-array":_vm.hasTitleSlotScope},on:{"indexChanged":_vm.$_onIndexChange},scopedSlots:_vm._u([{key:"title",fn:function(props){return [_vm._t("titles",null,{label:props})]}}])},_vm._l((_vm.subTitles),function(title,index){return _c('div',{key:index},[_c('md-radio',{key:_vm.renderData[index].clickedKey,ref:"radio1",refInFor:true,attrs:{"options":_vm.renderData[index].data,"default-index":~_vm.renderData[index].clickedKey ? _vm.renderData[index].clickedKey : -1,"is-slot-scope":_vm.hasOptionSlotScope,"is-across-border":""},on:{"change":_vm.$_onRadioChange},scopedSlots:_vm._u([{key:"default",fn:function(props){return [_vm._t("option",null,{option:props.option,index:index})]}}])})],1)})),_vm._v(" "),(_vm.isLoading || _vm.isDataError)?_c('div',{staticClass:"slot-wrapper"},[_c('div',{staticClass:"slot-inner"},[(_vm.isDataError)?_vm._t("error",[_vm._v(_vm._s(_vm.errorLabel))]):_vm._e(),_vm._v(" "),(_vm.isLoading)?_vm._t("loading",[_vm._v(_vm._s(_vm.loadingLabel))]):_vm._e()],2)]):_vm._e()],1)],1)],1)}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-5d4e08a1"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5d4e08a1", __vue__options__)
  } else {
    hotAPI.reload("data-v-5d4e08a1", __vue__options__)
  }
})()}