(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './lang'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./lang'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.lang);
    global.store = mod.exports;
  }
})(this, function (exports, _lang) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.extend = extend;
  exports.traverse = traverse;
  exports.toObject = toObject;
  exports.toArray = toArray;
  exports.inArray = inArray;
  exports.toNumber = toNumber;
  exports.toString = toString;
  exports.compareObjects = compareObjects;
  exports.isEmptyObject = isEmptyObject;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
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

  /**
   * Mix properties into target object.
   */
  function extend(to, _from) {
    for (var key in _from) {
      to[key] = _from[key];
    }
    return to;
  }

  /**
   * Multiple Array traversal
   * @return 1 continue
   * @return 2 break
   */
  function traverse(data) {
    var childrenKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _lang.noop;

    if (!data) {
      return;
    }
    if (typeof childrenKeys === 'function') {
      fn = childrenKeys;
      childrenKeys = [];
    }
    var level = 0; // current level
    var indexs = []; // index set of all levels
    var walk = function walk(curData) {
      for (var i = 0, len = curData.length; i < len; i++) {
        var isArray = Array.isArray(curData[i]);
        var key = Array.isArray(childrenKeys) ? childrenKeys[level] : childrenKeys;
        if (isArray || curData[i] && curData[i][key]) {
          level++;
          indexs.push(i);
          walk(isArray ? curData[i] : curData[i][key]);
        } else if (level >= childrenKeys.length) {
          var res = fn(curData[i], level, [].concat(_toConsumableArray(indexs), [i]));
          if (res === 1) {
            continue;
          } else if (res === 2) {
            break;
          }
        } else {
          continue;
        }
      }
      level = 0;
      indexs = [];
    };
    walk(data);
  }
  /**
   * Merge an Array of Objects into a single Object.
   */
  function toObject(arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i]);
      }
    }
    return res;
  }

  /**
   * Convert an Array-like object to a real Array.
   */
  function toArray(list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = [];
    while (i--) {
      ret.unshift(list[i + start]);
    }
    return ret;
  }

  /**
   * whether item is in list or list equal item
   */
  function inArray(list, item) {
    return Array.isArray(list) ? !!~list.indexOf(item) : item === list;
  }

  /**
   * Convert a input value to a number for persistence.
   * If the conversion fails, return original string.
   */
  function toNumber(val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n;
  }

  /**
   * Convert a value to a string
   */
  function toString(val) {
    return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
  }

  /**
   * Determine whether the two objects are equal or not shallowly
   */

  function compareObjects(object0, object1) {
    var ret = true;

    if (!object0 || !object1) {
      ret = false;
    } else if ((typeof object0 === 'undefined' ? 'undefined' : _typeof(object0)) !== 'object' || (typeof object1 === 'undefined' ? 'undefined' : _typeof(object1)) !== 'object') {
      ret = false;
    } else if (JSON.stringify(object0) !== JSON.stringify(object1)) {
      ret = false;
    }

    return ret;
  }

  /**
   * Check object is empty
   */
  function isEmptyObject(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
});