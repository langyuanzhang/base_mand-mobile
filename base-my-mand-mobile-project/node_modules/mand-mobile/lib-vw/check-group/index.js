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

  var normalizeValue = function normalizeValue(value) {
    if (typeof value === 'string' && value !== '' || typeof value === 'number') {
      return [value];
    } else if (Array.isArray(value)) {
      return [].concat(_toConsumableArray(value));
    } else {
      return [];
    }
  };

  exports.default = {
    name: 'md-check-group',

    props: {
      value: {
        type: [String, Number, Array],
        default: ''
      },
      options: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      max: {
        type: [String, Number],
        default: 1
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },

    data: function data() {
      return {
        selected: []
      };
    },


    computed: {
      _options: function _options() {
        var _this = this;

        return this.options.map(function (option) {
          return _extends({}, option, {
            isSelected: _this.selected.indexOf(option.value) !== -1
          });
        });
      }
    },

    watch: {
      value: {
        immediate: true,
        handler: function handler(val) {
          var items = normalizeValue(val);
          var changed = items.length !== this.selected.length || this.selected.some(function (val) {
            return items.indexOf(val) === -1;
          });

          if (changed) {
            this.selected = items;
          }
        }
      }
    },

    methods: {
      select: function select(value) {
        if (this.disabled) {
          return;
        }

        var items = normalizeValue(value);
        var values = this.options.map(function (option) {
          return option.value;
        });
        var maxSelects = parseInt(this.max);
        var selected = [].concat(_toConsumableArray(this.selected));

        for (var i = 0, len = items.length; i < len; i++) {
          var oIndex = values.indexOf(items[i]);
          var sIndex = selected.indexOf(items[i]);

          if (oIndex !== -1) {
            var option = this.options[oIndex];

            if (!option.disabled) {
              if (sIndex !== -1) {
                selected.splice(sIndex, 1);
              } else {
                if (maxSelects === 1) {
                  selected = [option.value];
                } else if (maxSelects <= 0 || selected.length < maxSelects) {
                  selected.push(option.value);
                }
              }
            }
          }
        }

        this.selected = [].concat(_toConsumableArray(selected));

        if (maxSelects === 1) {
          this.$emit('input', this.selected[0]);
        } else {
          this.$emit('input', this.selected);
        }
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{'is-disabled': _vm.disabled}},[_vm._l((_vm._options),function(option){return _vm._t("default",null,{option:option,selected:_vm.selected,select:_vm.select})})],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f7a0ce56", __vue__options__)
  } else {
    hotAPI.reload("data-v-f7a0ce56", __vue__options__)
  }
})()}