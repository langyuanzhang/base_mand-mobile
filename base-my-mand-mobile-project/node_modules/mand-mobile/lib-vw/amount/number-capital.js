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
    global.numberCapital = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (number) {
    // Integral part
    var integerNum = void 0;
    // Decimal part
    var decimalNum = void 0;
    // Capital number
    var capitalStr = '';

    var parts = void 0;

    /* istanbul ignore if  */
    if (number === '') {
      return '';
    }

    number = parseFloat(number);

    /* istanbul ignore if  */
    if (number >= maxNum) {
      return '';
    }

    /* istanbul ignore if  */
    if (number === 0) {
      capitalStr = cnNums[0] + cnIntLast + cnInteger;
      return capitalStr;
    }

    // Convert to String
    number += '';

    if (number.indexOf('.') === -1) {
      integerNum = number;
      decimalNum = '';
    } else {
      parts = number.split('.');
      integerNum = parts[0];
      decimalNum = parts[1].substr(0, 4);
    }

    // Convert integer part
    if (parseInt(integerNum, 10) > 0) {
      var zeroCount = 0;
      for (var i = 0, IntLen = integerNum.length; i < IntLen; i++) {
        var n = integerNum.substr(i, 1);
        var p = IntLen - i - 1;
        var q = p / 4;
        var m = p % 4;
        if (n === '0') {
          zeroCount++;
        } else {
          if (zeroCount > 0) {
            capitalStr += cnNums[0];
          }
          zeroCount = 0;
          capitalStr += cnNums[parseInt(n)] + cnIntRadice[m];
        }
        if (m === 0 && zeroCount < 4) {
          capitalStr += cnIntUnits[q];
        }
      }
      capitalStr += cnIntLast;
    }

    // Convert decimal part
    if (decimalNum !== '') {
      for (var _i = 0, decLen = decimalNum.length; _i < decLen; _i++) {
        var _n = decimalNum.substr(_i, 1);
        if (_n !== '0') {
          capitalStr += cnNums[Number(_n)] + cnDecUnits[_i];
        }
      }
    }

    /* istanbul ignore if  */
    if (capitalStr === '') {
      capitalStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum === '') {
      capitalStr += cnInteger;
    }
    return capitalStr;
  };

  var cnNums = ['\u96F6', '\u58F9', '\u8D30', '\u53C1', '\u8086', '\u4F0D', '\u9646', '\u67D2', '\u634C', '\u7396'];

  // 拾 \u62fe 佰 \u4f70 仟 \u4edf
  var cnIntRadice = ['', '\u62FE', '\u4F70', '\u4EDF'];

  // 万 \u4e07 亿 \u4ebf 兆 \u5146
  var cnIntUnits = ['', '\u4E07', '\u4EBF', '兆'];

  // 角 \u89d2 分 \u5206 毫 \u6beb 厘 \u5398
  var cnDecUnits = ['\u89D2', '\u5206', '\u6BEB', '\u5398'];
  var cnInteger = '\u6574'; // 整 \u6574
  var cnIntLast = '\u5143'; // 元 \u5143

  // Maximum number
  var maxNum = 999999999999999.9999;
});