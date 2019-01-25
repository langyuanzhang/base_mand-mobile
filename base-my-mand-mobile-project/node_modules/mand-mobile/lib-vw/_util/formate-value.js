(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.formateValue = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.formatValueByGapRule = formatValueByGapRule;
  exports.formatValueByGapStep = formatValueByGapStep;
  exports.trimValue = trimValue;
  function formatValueByGapRule(gapRule, value) {
    var gap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';
    var range = arguments[3];
    var isAdd = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

    var arr = value ? value.split('') : [];
    var showValue = '';
    var rule = [];
    gapRule.split('|').some(function (n, j) {
      rule[j] = +n + (rule[j - 1] ? +rule[j - 1] : 0);
    });
    var j = 0;
    arr.some(function (n, i) {
      // Remove the excess part
      if (i > rule[rule.length - 1] - 1) {
        return;
      }
      if (i > 0 && i === rule[j]) {
        showValue = showValue + gap + n;
        j++;
      } else {
        showValue = showValue + '' + n;
      }
    });
    var adapt = 0;
    rule.some(function (n, j) {
      if (range === +n + 1 + j) {
        adapt = 1 * isAdd;
      }
    });
    range = typeof range !== 'undefined' ? range === 0 ? 0 : range + adapt : showValue.length;
    return { value: showValue, range: range };
  }

  function formatValueByGapStep(step, value) {
    var gap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';
    var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'right';
    var range = arguments[4];
    var isAdd = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
    var oldValue = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';

    if (value.length === 0) {
      return { value: value, range: range };
    }

    var arr = value && value.split('');
    var _range = range;
    var showValue = '';

    if (direction === 'right') {
      for (var j = arr.length - 1, k = 0; j >= 0; j--, k++) {
        var m = arr[j];
        showValue = k > 0 && k % step === 0 ? m + gap + showValue : m + '' + showValue;
      }
      if (isAdd === 1) {
        // 在添加的情况下，如果添加前字符串的长度减去新的字符串的长度为2，说明多了一个间隔符，需要调整range
        if (oldValue.length - showValue.length === -2) {
          _range = range + 1;
        }
      } else {
        // 在删除情况下，如果删除前字符串的长度减去新的字符串的长度为2，说明少了一个间隔符，需要调整range
        if (oldValue.length - showValue.length === 2) {
          _range = range - 1;
        }
        // 删除到最开始，range 保持 0
        if (_range <= 0) {
          _range = 0;
        }
      }
    } else {
      arr.some(function (n, i) {
        showValue = i > 0 && i % step === 0 ? showValue + gap + n : showValue + '' + n;
      });
      var adapt = range % (step + 1) === 0 ? 1 * isAdd : 0;
      _range = typeof range !== 'undefined' ? range === 0 ? 0 : range + adapt : showValue.length;
    }

    return { value: showValue, range: _range };
  }

  function trimValue(value) {
    var gap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';

    value = typeof value === 'undefined' ? '' : value;
    var reg = new RegExp(gap, 'g');
    value = value.toString().replace(reg, '');
    return value;
  }
});