(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'vue', './action-sheet'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('vue'), require('./action-sheet'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.vue, global.actionSheet);
    global.index = mod.exports;
  }
})(this, function (exports, _vue, _actionSheet) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _vue2 = _interopRequireDefault(_vue);

  var _actionSheet2 = _interopRequireDefault(_actionSheet);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ActionSheetCtor = _vue2.default.extend(_actionSheet2.default);

  var noop = function noop() {};

  // all active instances
  var instances = [];

  /**
   * Dynamically create a ActionSheet
   *
   * @param {Object} param
   * @return {ActionSheet}
   */
  _actionSheet2.default.create = function (_ref) {
    var _ref$value = _ref.value,
        value = _ref$value === undefined ? true : _ref$value,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? '' : _ref$title,
        _ref$options = _ref.options,
        options = _ref$options === undefined ? [] : _ref$options,
        _ref$defaultIndex = _ref.defaultIndex,
        defaultIndex = _ref$defaultIndex === undefined ? -1 : _ref$defaultIndex,
        _ref$invalidIndex = _ref.invalidIndex,
        invalidIndex = _ref$invalidIndex === undefined ? -1 : _ref$invalidIndex,
        _ref$cancelText = _ref.cancelText,
        cancelText = _ref$cancelText === undefined ? '取消' : _ref$cancelText,
        _ref$maxHeight = _ref.maxHeight,
        maxHeight = _ref$maxHeight === undefined ? 400 : _ref$maxHeight,
        _ref$onShow = _ref.onShow,
        onShow = _ref$onShow === undefined ? noop : _ref$onShow,
        _ref$onHide = _ref.onHide,
        onHide = _ref$onHide === undefined ? noop : _ref$onHide,
        _ref$onSelected = _ref.onSelected,
        onSelected = _ref$onSelected === undefined ? noop : _ref$onSelected;

    var vm = new ActionSheetCtor({
      propsData: {
        value: value,
        title: title,
        options: options,
        defaultIndex: defaultIndex,
        invalidIndex: invalidIndex,
        cancelText: cancelText,
        maxHeight: maxHeight
      }
    }).$mount();

    instances.push(vm);

    /* istanbul ignore else */
    if (value) {
      document.body.appendChild(vm.$el);
      vm.value = true;
    }
    vm.$watch('value',
    /* istanbul ignore next */function (val) {
      if (val) {
        document.body.appendChild(vm.$el);
      }
    });
    vm.$on('input',
    /* istanbul ignore next */function (val) {
      if (val) {
        vm.value = true;
      } else {
        vm.value = false;
      }
    });
    vm.$on('show',
    /* istanbul ignore next */function () {
      if (typeof onShow === 'function') {
        onShow.call(null);
      }
    });
    vm.$on('hide',
    /* istanbul ignore next */function () {
      var parent = vm.$el.parentNode;
      if (parent) {
        parent.removeChild(vm.$el);
      }
      if (typeof onHide === 'function') {
        onHide.call(null);
      }
    });
    vm.$on('selected',
    /* istanbul ignore next */function (item) {
      if (typeof onSelected === 'function') {
        onSelected.call(null, item);
      }
    });

    vm.$on('hook:beforeDestroy', function () {
      var parent = vm.$el.parentNode;
      var index = instances.indexOf(vm);
      if (index) {
        instances.splice(index, 1);
      }
      if (parent) {
        parent.removeChild(vm.$el);
      }
    });

    return vm;
  };

  /**
   * Close all actived global ActionSheets
   *
   * @static
   * @return void
   */
  _actionSheet2.default.closeAll = function () {
    instances.forEach(function (instance) {
      instance.value = false;
    });
  };

  /**
   * Close and destroy all actived global ActionSheets
   *
   * @static
   * @return void
   */
  _actionSheet2.default.destroyAll = function () {
    instances.forEach(function (instance) {
      instance.value = false;
      instance.$on('hide', function () {
        instance.$destroy();
      });
    });
  };

  exports.default = _actionSheet2.default;
});