(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'vue', './toast'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('vue'), require('./toast'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.vue, global.toast);
    global.index = mod.exports;
  }
})(this, function (exports, _vue, _toast) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _vue2 = _interopRequireDefault(_vue);

  var _toast2 = _interopRequireDefault(_toast);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ToastConstructor = _vue2.default.extend(_toast2.default);

  function Toast(_ref) {
    var _ref$content = _ref.content,
        content = _ref$content === undefined ? '' : _ref$content,
        _ref$icon = _ref.icon,
        icon = _ref$icon === undefined ? '' : _ref$icon,
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 3000 : _ref$duration,
        _ref$position = _ref.position,
        position = _ref$position === undefined ? 'center' : _ref$position,
        _ref$hasMask = _ref.hasMask,
        hasMask = _ref$hasMask === undefined ? false : _ref$hasMask,
        _ref$parentNode = _ref.parentNode,
        parentNode = _ref$parentNode === undefined ? document.body : _ref$parentNode;

    var vm = Toast._instance;

    if (!vm) {
      vm = Toast._instance = new ToastConstructor({
        propsData: {
          content: content,
          icon: icon,
          duration: duration,
          position: position,
          hasMask: hasMask
        }
      }).$mount();
      parentNode.appendChild(vm.$el);
    }

    vm.content = content;
    vm.icon = icon;
    vm.duration = duration;
    vm.hasMask = hasMask;
    vm.visible = true;

    return vm;
  }

  // There is only one toast singleton
  Toast._instance = null;

  /**
   * Hide toast
   */
  Toast.hide = function () {
    if (Toast._instance instanceof ToastConstructor && Toast._instance.visible) {
      Toast._instance.hide();
    }
  };

  /**
   * Show info toast
   * @param {string} content
   * @param {number=} [duration=3000]
   * @param {boolean=} [hasMask=false]
   * @param {node=} [parentNode=document.body]
   * @returns {Toast}
   */

  Toast.info = function () {
    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
    var hasMask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var parentNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document.body;

    return Toast({
      icon: '',
      content: content,
      duration: duration,
      hasMask: hasMask,
      parentNode: parentNode
    });
  };

  /**
   * Show succeed toast
   * @param {string} content
   * @param {number=} [duration=3000]
   * @param {boolean=} [hasMask=false]
   * @param {node=} [parentNode=document.body]
   * @returns {Toast}
   */

  Toast.succeed = function () {
    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
    var hasMask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var parentNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document.body;

    return Toast({
      icon: 'circle-right',
      content: content,
      duration: duration,
      hasMask: hasMask,
      parentNode: parentNode
    });
  };

  /**
   * Show failed toast
   * @param {string} content
   * @param {number=} [duration=3000]
   * @param {boolean=} [hasMask=true]
   * @param {node=} [parentNode=document.body]
   * @returns {Toast}
   */

  Toast.failed = function () {
    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
    var hasMask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var parentNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document.body;

    return Toast({
      icon: 'circle-cross',
      content: content,
      duration: duration,
      hasMask: hasMask,
      parentNode: parentNode
    });
  };

  /**
   * Show loading toast
   * @param {string} content
   * @param {number=} [duration=0]
   * @param {boolean=} [hasMask=false]
   * @param {node=} [parentNode=document.body]
   * @returns {Toast}
   */
  Toast.loading = function () {
    var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var hasMask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var parentNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document.body;

    return Toast({
      icon: 'spinner',
      content: content,
      duration: duration,
      hasMask: hasMask,
      parentNode: parentNode
    });
  };

  exports.default = Toast;
});