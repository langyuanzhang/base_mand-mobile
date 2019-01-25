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
  exports.default = {
    name: 'md-chart',

    props: {
      labels: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      datasets: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      size: {
        type: Array,
        default: function _default() {
          return [480, 320];
        }
      },
      max: {
        type: Number,
        default: function _default() {
          var max = Math.max.apply(Math, this.datasets.map(function (data) {
            return Math.max.apply(Math, data.values);
          }));
          var multiple = 1;
          while (max > 10) {
            multiple *= 10;
            max /= 10;
          }
          max = Math.ceil(max) * multiple;

          return max;
        }
      },
      min: {
        type: Number,
        default: function _default() {
          var min = Math.min.apply(Math, this.datasets.map(function (data) {
            return Math.min.apply(Math, data.values);
          }));
          var multiple = 1;
          while (min > 10) {
            multiple *= 10;
            min = min / 10;
          }
          min = Math.floor(min) * multiple;

          return min;
        }
      },
      lines: {
        type: Number,
        default: 5
      },
      step: {
        type: Number,
        default: function _default() {
          return (this.max - this.min) / this.lines;
        }
      },
      shift: {
        type: Number,
        default: 0.6
      },
      format: {
        type: Function,
        default: function _default(val) {
          return val;
        }
      }
    },

    data: function data() {
      return {
        unit: 16
      };
    },


    computed: {
      offset: function offset() {
        return {
          top: 0.2 * this.unit,
          bottom: 0.5 * this.unit,
          left: this.shift * this.unit,
          right: 0.2 * this.unit
        };
      },
      width: function width() {
        if (typeof this.size[0] === 'string' && this.size[0].indexOf('rem') !== -1) {
          return parseFloat(this.size[0]) * this.unit;
        } else {
          return parseFloat(this.size[0]);
        }
      },
      height: function height() {
        if (typeof this.size[1] === 'string' && this.size[1].indexOf('rem') !== -1) {
          return parseFloat(this.size[1]) * this.unit;
        } else {
          return parseFloat(this.size[1]);
        }
      },
      innerWidth: function innerWidth() {
        return this.width - this.offset.left - this.offset.right;
      },
      innerHeight: function innerHeight() {
        return this.height - this.offset.top - this.offset.bottom;
      },
      xaxis: function xaxis() {
        var deltaX = this.innerWidth / (this.labels.length - 1);
        var items = this.labels.map(function (label, index) {
          return {
            offset: index * deltaX,
            label: label
          };
        });

        return items;
      },
      yaxis: function yaxis() {
        var items = [];
        var deltaY = this.innerHeight / this.lines;

        for (var i = 0; i < this.lines; i++) {
          items.push({
            offset: i * deltaY,
            label: this.format(this.max - i * this.step)
          });
        }

        items.push({
          offset: this.innerHeight,
          label: this.format(this.min)
        });

        return items;
      },
      lower: function lower() {
        return this.max - (this.lines - 1) * this.step;
      },
      paths: function paths() {
        var _this = this;

        return this.datasets.map(function (data) {
          var deltaX = _this.innerWidth / (data.values.length - 1);
          var deltaY = _this.innerHeight / _this.lines;
          var points = data.values.map(function (value, index) {
            if (value < _this.lower) {
              return {
                x: index * deltaX,
                y: _this.innerHeight - (1 - (_this.lower - value) / (_this.lower - _this.min)) * deltaY
              };
            } else {
              return {
                x: index * deltaX,
                y: (1 - (value - _this.lower) / (_this.max - _this.lower)) * (_this.innerHeight - deltaY)
              };
            }
          });

          var ret = {
            style: {
              fill: 'none',
              stroke: data.color || '#fa8919',
              strokeWidth: data.width || 1
            }
          };

          if (data.theme === 'heat') {
            ret.style.stroke = 'url(#path-fill-gradient-' + data.color + ')';
          } else if (data.theme === 'region') {
            ret.area = {
              value: 'M0,' + _this.innerHeight + ' ' + points.map(function (point) {
                return 'L' + point.x + ',' + point.y;
              }).join(' ') + (' L' + points[points.length - 1].x + ',' + _this.innerHeight),
              style: {
                fill: 'url(#path-fill-gradient-' + data.color + ')',
                stroke: 'none'
              }
            };
          }

          ret.value = 'M0,' + points.shift().y + ' ' + points.map(function (point) {
            return 'L' + point.x + ',' + point.y;
          }).join(' ');

          return ret;
        });
      },
      colors: function colors() {
        var uniqueColors = [];
        this.datasets.map(function (data) {
          if (data.color && uniqueColors.indexOf(data.color) === -1) {
            uniqueColors.push(data.color);
          }
        });
        return uniqueColors;
      }
    },

    mounted: function mounted() {
      if (document.readyState !== 'loading') {
        this.$_resize();
      }
      document.addEventListener('DOMContentLoaded', this.$_resize);
      window.addEventListener('resize', this.$_resize);
    },
    beforeDestroy: function beforeDestroy() {
      document.removeEventListener('DOMContentLoaded', this.$_resize);
      window.removeEventListener('resize', this.$_resize);
    },


    methods: {
      $_resize: function $_resize() {
        this.unit = parseFloat(window.getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue('font-size'));
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"md-chart",attrs:{"viewBox":("0 0 " + _vm.width + " " + _vm.height)}},[_c('defs',_vm._l((_vm.colors),function(color){return _c('linearGradient',{key:color,attrs:{"id":("path-fill-gradient-" + color),"x1":"0","x2":"0","y1":"0","y2":"1"}},[_c('stop',{style:(("stop-color: " + color)),attrs:{"offset":"0%","stop-opacity":"0.4"}}),_vm._v(" "),_c('stop',{style:(("stop-color: " + color)),attrs:{"offset":"50%","stop-opacity":"0.3"}}),_vm._v(" "),_c('stop',{style:(("stop-color: " + color)),attrs:{"offset":"100%","stop-opacity":"0.1"}})],1)})),_vm._v(" "),_c('g',{staticClass:"md-chart-graph",attrs:{"transform":("translate(" + (_vm.offset.left) + ", " + (_vm.offset.top) + ")")}},[_c('g',{staticClass:"md-chart-axis-y"},_vm._l((_vm.yaxis),function(item,index){return _c('g',{key:index,attrs:{"transform":("translate(0, " + (item.offset) + ")")}},[_c('line',{attrs:{"x1":"0","x2":_vm.innerWidth,"y1":"0","y2":"0"}}),_vm._v(" "),_c('text',{attrs:{"x":"0","y":"0","dx":"-0.5em","dy":"0.32em"},domProps:{"textContent":_vm._s(item.label)}})])})),_vm._v(" "),_c('g',{staticClass:"md-chart-axis-x",attrs:{"transform":("translate(0, " + _vm.innerHeight + ")")}},_vm._l((_vm.xaxis),function(item,index){return _c('g',{key:index,attrs:{"transform":("translate(" + (item.offset) + ", 0)")}},[_c('line',{attrs:{"x1":"0","x2":"0","y1":"0","y2":"6"}}),_vm._v(" "),_c('text',{attrs:{"x":"0","y":"0","dy":"2em"},domProps:{"textContent":_vm._s(item.label)}})])})),_vm._v(" "),_c('g',{staticClass:"md-chart-paths"},[_vm._l((_vm.paths),function(path,index){return [_c('path',{key:("line-" + index),staticClass:"md-chart-path",style:(path.style),attrs:{"d":path.value}}),_vm._v(" "),(path.area)?_c('path',{key:("area-" + index),staticClass:"md-chart-path-area",style:(path.area.style),attrs:{"d":path.area.value}}):_vm._e()]})],2)])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0caf6b8e", __vue__options__)
  } else {
    hotAPI.reload("data-v-0caf6b8e", __vue__options__)
  }
})()}