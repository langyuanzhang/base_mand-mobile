(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'vue', './dialog'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('vue'), require('./dialog'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.vue, global.dialog);
    global.index = mod.exports;
  }
})(this, function (exports, _vue, _dialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _vue2 = _interopRequireDefault(_vue);

  var _dialog2 = _interopRequireDefault(_dialog);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var DialogConstructor = _vue2.default.extend(_dialog2.default);

  /* istanbul ignore next */
  var noop = function noop() {};

  // all active instances
  var instances = [];

  /**
   * Dialog factory
   *
   * @param {Object} props
   * @return {Dialog}
   */
  var generate = function generate(_ref) {
    var _ref$title = _ref.title,
        title = _ref$title === undefined ? '' : _ref$title,
        _ref$icon = _ref.icon,
        icon = _ref$icon === undefined ? '' : _ref$icon,
        _ref$content = _ref.content,
        content = _ref$content === undefined ? '' : _ref$content,
        _ref$closable = _ref.closable,
        closable = _ref$closable === undefined ? false : _ref$closable,
        _ref$btns = _ref.btns,
        btns = _ref$btns === undefined ? [] : _ref$btns;

    var vm = new DialogConstructor({
      propsData: {
        value: true,
        title: title,
        icon: icon,
        content: content,
        closable: closable,
        btns: btns
      }
    }).$mount();

    instances.push(vm);

    vm.$on('input', function (val) {
      /* istanbul ignore else */
      if (!val) {
        vm.value = false;
      }
    });
    vm.$on('hide', function () {
      var index = instances.indexOf(vm);
      /* istanbul ignore else */
      if (index >= 0) {
        instances.splice(index, 1);
      }
      vm.$destroy();
    });

    return vm;
  };

  /**
   * Dynamically create a confirm dialog
   *
   * @param {Object} props
   * @return {Dialog}
   */
  _dialog2.default.confirm = function (_ref2) {
    var _ref2$title = _ref2.title,
        title = _ref2$title === undefined ? '' : _ref2$title,
        _ref2$icon = _ref2.icon,
        icon = _ref2$icon === undefined ? '' : _ref2$icon,
        _ref2$content = _ref2.content,
        content = _ref2$content === undefined ? '' : _ref2$content,
        _ref2$cancelText = _ref2.cancelText,
        cancelText = _ref2$cancelText === undefined ? '取消' : _ref2$cancelText,
        _ref2$confirmText = _ref2.confirmText,
        confirmText = _ref2$confirmText === undefined ? '确定' : _ref2$confirmText,
        _ref2$closable = _ref2.closable,
        closable = _ref2$closable === undefined ? false : _ref2$closable,
        _ref2$onConfirm = _ref2.onConfirm,
        onConfirm = _ref2$onConfirm === undefined ? noop : _ref2$onConfirm;

    var vm = generate({
      title: title,
      icon: icon,
      content: content,
      closable: closable,
      btns: [{
        text: cancelText,
        handler: /* istanbul ignore next */function handler() {
          return vm.close();
        }
      }, {
        text: confirmText,
        handler: /* istanbul ignore next */function handler() {
          if (onConfirm() !== false) {
            vm.close();
          }
        }
      }]
    });

    return vm;
  };

  /**
   * Dynamically create a alert dialog
   *
   * @param {Object} props
   * @return {Dialog}
   */
  _dialog2.default.alert = function (_ref3) {
    var _ref3$title = _ref3.title,
        title = _ref3$title === undefined ? '' : _ref3$title,
        _ref3$icon = _ref3.icon,
        icon = _ref3$icon === undefined ? '' : _ref3$icon,
        _ref3$content = _ref3.content,
        content = _ref3$content === undefined ? '' : _ref3$content,
        _ref3$confirmText = _ref3.confirmText,
        confirmText = _ref3$confirmText === undefined ? '确定' : _ref3$confirmText,
        _ref3$closable = _ref3.closable,
        closable = _ref3$closable === undefined ? false : _ref3$closable,
        _ref3$onConfirm = _ref3.onConfirm,
        onConfirm = _ref3$onConfirm === undefined ? noop : _ref3$onConfirm;

    var vm = generate({
      title: title,
      icon: icon,
      content: content,
      closable: closable,
      btns: [{
        text: confirmText,
        handler: /* istanbul ignore next */function handler() {
          if (onConfirm() !== false) {
            vm.close();
          }
        }
      }]
    });

    return vm;
  };

  /**
   * Dynamically create a succeed dialog
   *
   * @param {Object} props
   * @return {Dialog}
   */
  _dialog2.default.succeed = function (props) {
    props.icon = 'circle-right';
    return _dialog2.default.confirm(props);
  };

  /**
   * Dynamically create a failed dialog
   *
   * @param {Object} props
   * @return {Dialog}
   */
  _dialog2.default.failed = function (props) {
    props.icon = 'circle-cross';
    return _dialog2.default.confirm(props);
  };

  /**
   * Close all actived static dialogs
   *
   * @static
   * @return void
   */
  _dialog2.default.closeAll = function () {
    instances.forEach(function (instance) {
      instance.close();
    });
  };

  exports.default = _dialog2.default;
});