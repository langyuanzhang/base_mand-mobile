(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_util'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._util);
    global.cascade = mod.exports;
  }
})(this, function (exports, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (picker) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var fn = arguments[2];

    // options = {...defaultOptions, ...options}
    options = Object.assign({}, defaultOptions, options);

    /* istanbul ignore if */
    if (!picker) {
      (0, _util.warn)('cascade: picker is undefined');
      return;
    }

    var values = options.values;

    /* istanbul ignore next */
    for (var i = options.currentLevel + 1; i < options.maxLevel; i++) {
      var activeIndex = options.defaultIndex[i] || 0;
      var columnValues = values.children || [];
      picker.setColumnValues(i, columnValues);
      values = columnValues[activeIndex] || [];
    }

    fn && fn();
  };

  var defaultOptions = {
    currentLevel: 0,
    maxLevel: 0,
    values: [],
    defaultIndex: []

    /**
     * cascade column by set value of following columns
     * @param {*} picker instance of picker-column
     * @param {*} options { currentLevel, maxLevel, values } 
     * @param {*} fn 
     */
  };
});