;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../picker', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../picker'), require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.picker, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _picker, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _picker2 = _interopRequireDefault(_picker);

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

  var TYPE_FORMAT = {
    'yyyy': 'Year',
    'MM': 'Month',
    'dd': 'Date',
    'hh': 'Hour',
    'mm': 'Minute'
  };

  var TYPE_FORMAT_INVERSE = (0, _util.toObject)(Object.keys(TYPE_FORMAT).map(function (item) {
    return _defineProperty({}, TYPE_FORMAT[item], item);
  }));

  var TYPE_METHODS = {
    'Year': 'getFullYear',
    'Month': 'getMonth',
    'Date': 'getDate',
    'Hour': 'getHours',
    'Minute': 'getMinutes'
  };

  exports.default = {
    name: 'md-date-picker',

    components: _defineProperty({}, _picker2.default.name, _picker2.default),

    props: {
      value: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'date'
      },
      customTypes: {
        type: Array,
        default: function _default() {
          return [];
        },
        validator: function validator(val) {
          var res = true;
          val.forEach(function (type) {
            type = TYPE_FORMAT[type] || type;

            if (!(type in TYPE_METHODS)) {
              return res = false;
            }
          });
          return res;
        }
      },
      minDate: {
        type: Date
      },
      maxDate: {
        type: Date
      },
      defaultDate: {
        type: Date
      },
      minuteStep: {
        type: Number,
        default: 1
      },
      unitText: {
        type: Array,
        default: function _default() {
          return ['年', '月', '日', '时', '分'];
        }
      },
      todayText: {
        type: String,
        default: ''
      },
      halfDayText: {
        type: Array,
        default: function _default() {
          return ['上午', '下午'];
        }
      },
      textRender: {
        type: [Function, String],
        default: ''
      },
      isTwelveHours: {
        type: Boolean,
        default: false
      },
      title: {
        type: String
      },
      okText: {
        type: String
      },
      cancelText: {
        type: String
      },
      isView: {
        type: Boolean,
        default: false
      },
      maskClosable: {
        type: Boolean,
        default: true
      }
    },

    data: function data() {
      return {
        isPickerShow: false,
        currentDateIns: new Date(),
        columnData: [],
        oldColumnData: null,
        columnDataDefault: [],
        columnDataGenerator: [],
        disabledCascadeComlumnIndex: [] };
    },


    computed: {
      picker: function picker() {
        return this.$refs['picker'];
      },
      currentYear: function currentYear() {
        return this.currentDateIns.getFullYear();
      },
      currentMonth: function currentMonth() {
        return this.currentDateIns.getMonth() + 1;
      },
      currentDate: function currentDate() {
        return this.currentDateIns.getDate();
      }
    },

    watch: {
      value: function value(val) {
        this.isPickerShow = val;
      },
      isPickerShow: function isPickerShow(val) {
        if (!val) {
          this.$emit('input', val);
        }
      },
      defaultDate: function defaultDate() {
        this.$_initPickerColumn();
      },
      minDate: function minDate() {
        this.$_initPickerColumn();
      },
      maxDate: function maxDate() {
        this.$_initPickerColumn();
      }
    },

    mounted: function mounted() {
      this.$_initPicker();
    },


    methods: {
      $_initPicker: function $_initPicker() {
        if (!this.isView && this.value) {
          this.isPickerShow = this.value;
        }

        this.picker.inheritPickerApi(this);
        this.$_initPickerColumn();
      },
      $_initPickerColumn: function $_initPickerColumn() {
        this.$_resetPickerColumn();
        this.$_initColumnDataGenerator();
        this.$_initColumnData(0, this.columnDataDefault);
      },
      $_resetPickerColumn: function $_resetPickerColumn() {
        this.oldColumnData = null;
        this.columnData = [];
        this.columnDataDefault = [];
        this.columnDataGenerator = [];
      },
      $_initColumnData: function $_initColumnData(columnIndex) {
        var defaultDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var isSetColumn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var columnData = this.columnData;
        var columnDataGenerator = this.columnDataGenerator;
        for (var i = columnIndex, len = columnDataGenerator.length; i < len; i++) {
          var columnDataGeneratorParams = [];
          var generator = columnDataGenerator[i];

          for (var j = 0; j < i; j++) {
            if (defaultDate[j]) {
              columnDataGeneratorParams.push(defaultDate[j]);
              continue;
            }

            var itemIndex = this.picker.getColumnIndex(j) || 0;
            if (columnData[j]) {
              columnDataGeneratorParams.push(columnData[j][itemIndex]['value']);
            } else {
              columnDataGeneratorParams.push('');
              (0, _util.warn)('DatePicker columnData of index ' + j + ' is void');
            }
          }

          var curColumnData = generator ? generator.apply(this, columnDataGeneratorParams) : '';

          isSetColumn && this.picker.setColumnValues(i, curColumnData);

          this.$set(columnData, i, curColumnData);
        }

        isSetColumn && this.picker.refresh(null, columnIndex);
      },
      $_initColumnDataGenerator: function $_initColumnDataGenerator() {
        var defaultDate = this.$_getDefaultDate();
        switch (this.type) {
          case 'date':
            this.$_initColumnDataGeneratorForDate(defaultDate);
            break;
          case 'time':
            this.$_initColumnDataGeneratorForTime(defaultDate);
            this.disabledCascadeComlumnIndex = [0, 1, 2];
            break;
          case 'datetime':
            this.$_initColumnDataGeneratorForDate(defaultDate);
            this.$_initColumnDataGeneratorForTime(defaultDate);
            this.disabledCascadeComlumnIndex = [2, 3, 4, 5];
            break;
          default:
            this.$_initColumnDataGeneratorForCustom(defaultDate);
            break;
        }
      },
      $_initColumnDataGeneratorForDate: function $_initColumnDataGeneratorForDate(defaultDate) {
        this.columnDataGenerator = this.columnDataGenerator.concat([this.$_generateYearData, this.$_generateMonthData, this.$_generateDateData]);

        this.columnDataDefault = defaultDate ? this.columnDataDefault.concat([defaultDate.getFullYear(), defaultDate.getMonth() + 1, defaultDate.getDate()]) : [];
      },
      $_initColumnDataGeneratorForTime: function $_initColumnDataGeneratorForTime(defaultDate) {
        this.columnDataGenerator = this.columnDataGenerator.concat([this.$_generateHourData, this.$_generateMinuteData]);

        if (this.isTwelveHours) {
          this.columnDataGenerator.push(this.$_generateAPData);
          if (defaultDate) {
            var hourInfo = this.$_transHourTo12(defaultDate.getHours());
            this.columnDataDefault = this.columnDataDefault.concat([hourInfo.hour, defaultDate.getMinutes(), hourInfo.ap]);
          }
        } else {
          this.columnDataDefault = defaultDate ? this.columnDataDefault.concat([defaultDate.getHours(), defaultDate.getMinutes()]) : [];
        }
      },
      $_initColumnDataGeneratorForCustom: function $_initColumnDataGeneratorForCustom(defaultDate) {
        var _this = this;

        var hourInfo = void 0;
        this.customTypes.forEach(function (type, index) {
          type = TYPE_FORMAT[type] || type;
          if (type === 'Date' || type === 'Hour' || type === 'Minute') {
            _this.disabledCascadeComlumnIndex.push(index);
          }
          _this.columnDataGenerator.push(_this['$_generate' + type + 'Data']);

          if (defaultDate) {
            var value = defaultDate[TYPE_METHODS[type]]();

            if (type === 'Month') {
              value += 1;
            }

            if (_this.isTwelveHours && type === 'Hour') {
              hourInfo = _this.$_transHourTo12(value);
              value = hourInfo.hour;
            }
            _this.columnDataDefault.push(value);
          }
        });

        if (this.isTwelveHours && ~this.customTypes.indexOf('Hour')) {
          this.columnDataGenerator.push(this.$_generateAPData);
          this.columnDataDefault.push(hourInfo.ap);
        }
      },
      $_getDefaultDate: function $_getDefaultDate() {
        var defaultDate = this.defaultDate;
        var minDate = this.minDate;
        var maxDate = this.maxDate;

        if (!defaultDate) {
          return defaultDate;
        }

        if (minDate && defaultDate.getTime() < minDate.getTime()) {
          return minDate;
        }

        if (maxDate && defaultDate.getTime() > maxDate.getTime()) {
          return maxDate;
        }

        return defaultDate;
      },
      $_generateYearData: function $_generateYearData() {
        var start = this.minDate ? this.minDate.getFullYear() : this.currentYear - 20;
        var end = this.maxDate ? this.maxDate.getFullYear() : this.currentYear + 20;
        if (start > end) {
          (0, _util.warn)('MinDate Year should be earlier than MaxDate');
          return;
        }
        return this.$_generateData(start, end, 'Year', this.unitText[0], 1);
      },
      $_generateMonthData: function $_generateMonthData() {
        var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentYear;

        var start = void 0,
            end = void 0;

        if (this.minDate && this.minDate.getFullYear() === year) {
          start = this.minDate.getMonth() + 1;
        } else {
          start = 1;
        }

        if (this.maxDate && this.maxDate.getFullYear() === year) {
          end = this.maxDate.getMonth() + 1;
        } else {
          end = 12;
        }

        return this.$_generateData(start, end, 'Month', this.unitText[1] || '');
      },
      $_generateDateData: function $_generateDateData() {
        var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentYear;
        var month = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.currentMonth;

        var start = void 0,
            end = void 0;

        if (this.minDate && this.minDate.getFullYear() === year && this.minDate.getMonth() + 1 === month) {
          start = this.minDate.getDate();
        } else {
          start = 1;
        }

        if (this.maxDate && this.maxDate.getFullYear() === year && this.maxDate.getMonth() + 1 === month) {
          end = this.maxDate.getDate();
        } else {
          end = new Date(year, month, 0).getDate();
        }

        var dateData = this.$_generateData(start, end, 'Date', this.unitText[2] || '', 1, arguments);

        if (year === this.currentYear && month === this.currentMonth && this.currentDate >= start && this.currentDate <= end && this.todayText) {
          var currentDateIndex = this.currentDate - start;
          var currentDate = dateData[currentDateIndex].text;
          dateData[currentDateIndex].text = this.todayText.replace('&', currentDate);
        }

        return dateData;
      },
      $_generateHourData: function $_generateHourData() {
        var start = this.minDate ? this.minDate.getHours() : 0;
        var end = this.maxDate ? this.maxDate.getHours() : 23;

        if (end < start) {
          end = 23;
        }

        if (this.isTwelveHours) {
          start = this.$_transHourTo12(start).hour;
          end = this.$_transHourTo12(end).hour;
        }

        if (start > end) {
          (0, _util.warn)('MinDate Hour should be earlier than MaxDate');
          return;
        }

        var hoursData = this.$_generateData(start, end, 'Hour', this.unitText[3] || '', 1, arguments);

        if (this.isTwelveHours && hoursData[0].value === 0) {
          var text = void 0;
          if (this.textRender) {
            text = this.textRender.apply(this, [TYPE_FORMAT_INVERSE['Hour']].concat(Array.prototype.slice.call(arguments), [12]));
          }
          hoursData[0].text = text || '12' + (this.unitText[3] || '');
        }

        return hoursData;
      },
      $_generateMinuteData: function $_generateMinuteData() {
        var start = this.minDate ? this.minDate.getMinutes() : 0;
        var end = this.maxDate ? this.maxDate.getMinutes() : 59;
        return this.$_generateData(start, end, 'Minute', this.unitText[4] || '', this.minuteStep, arguments);
      },
      $_generateAPData: function $_generateAPData() {
        return [{
          text: this.halfDayText[0],
          type: 'HalfDay',
          typeFormat: 'HalfDay',
          value: 0
        }, {
          text: this.halfDayText[1],
          type: 'HalfDay',
          typeFormat: 'HalfDay',
          value: 1
        }];
      },
      $_generateData: function $_generateData(from, to, type, unit) {
        var step = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
        var args = arguments[5];

        var count = from;
        var text = void 0;
        var data = [];

        args = args || [];

        while (count <= to) {
          this.textRender && (text = this.textRender.apply(this, [TYPE_FORMAT_INVERSE[type]].concat(_toConsumableArray(args), [count])));
          data.push({
            text: text || '' + count + unit,
            value: count,
            typeFormat: TYPE_FORMAT_INVERSE[type] || type,
            type: type
          });
          count += step;
        }

        return data;
      },
      $_transHourTo12: function $_transHourTo12(hour) {
        if (hour < 12) {
          return {
            hour: hour,
            ap: 0 };
        } else {
          return {
            hour: hour - 12,
            ap: 1 };
        }
      },
      $_onPickerShow: function $_onPickerShow() {
        this.oldColumnData = [].concat(_toConsumableArray(this.columnData));
        this.$emit('show');
      },
      $_onPickerHide: function $_onPickerHide() {
        this.$emit('hide');
      },
      $_onPickerChange: function $_onPickerChange(columnIndex, itemIndex, value) {
        this.$emit('change', columnIndex, itemIndex, value);

        if (~this.disabledCascadeComlumnIndex.indexOf(columnIndex)) {
          return;
        }

        if (columnIndex < this.columnData.length - 1) {
          this.$_initColumnData(columnIndex + 1);
        }
      },
      $_onPickerConfirm: function $_onPickerConfirm(columnsValue) {
        this.$emit('confirm', columnsValue);
      },
      $_onPickerCancel: function $_onPickerCancel() {
        this.$emit('cancel');
        if (this.oldColumnData) {
          this.columnData = [].concat(_toConsumableArray(this.oldColumnData));
        }
      },
      getFormatDate: function getFormatDate() {
        var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'yyyy-MM-dd hh:mm';

        var columnValues = this.picker.getColumnValues();
        var hourTo24 = false;

        if (this.isTwelveHours) {
          var halfHour = [].concat(_toConsumableArray(columnValues)).splice(columnValues.length - 1, 1)[0];
          halfHour.value && (hourTo24 = true);
        }

        columnValues.forEach(function (item) {
          if (!item) {
            return;
          }

          var value = hourTo24 && item.type === 'Hour' ? item.value + 12 : item.value;

          if (value < 10) {
            value = '0' + value;
          }

          format = format.replace(item.type, value);
          format = format.replace(TYPE_FORMAT_INVERSE[item.type], value);
        });

        return format;
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-date-picker",class:[_vm.type]},[_c('md-picker',{ref:"picker",attrs:{"data":_vm.columnData,"cols":_vm.columnData.length,"default-value":_vm.columnDataDefault,"title":_vm.title,"ok-text":_vm.okText,"cancel-text":_vm.cancelText,"is-view":_vm.isView,"mask-closable":_vm.maskClosable},on:{"initialed":function($event){_vm.$emit('initialed')},"change":_vm.$_onPickerChange,"confirm":_vm.$_onPickerConfirm,"cancel":_vm.$_onPickerCancel,"show":_vm.$_onPickerShow,"hide":_vm.$_onPickerHide},model:{value:(_vm.isPickerShow),callback:function ($$v) {_vm.isPickerShow=$$v},expression:"isPickerShow"}})],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-844111b0", __vue__options__)
  } else {
    hotAPI.reload("data-v-844111b0", __vue__options__)
  }
})()}