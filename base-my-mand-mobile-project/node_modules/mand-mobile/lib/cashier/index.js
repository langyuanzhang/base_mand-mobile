;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../popup', '../popup/title-bar', '../captcha', '../button', '../icon', '../activity-indicator/roller-success', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../popup'), require('../popup/title-bar'), require('../captcha'), require('../button'), require('../icon'), require('../activity-indicator/roller-success'), require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.popup, global.titleBar, global.captcha, global.button, global.icon, global.rollerSuccess, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _popup, _titleBar, _captcha, _button, _icon, _rollerSuccess, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _popup2 = _interopRequireDefault(_popup);

  var _titleBar2 = _interopRequireDefault(_titleBar);

  var _captcha2 = _interopRequireDefault(_captcha);

  var _button2 = _interopRequireDefault(_button);

  var _icon2 = _interopRequireDefault(_icon);

  var _rollerSuccess2 = _interopRequireDefault(_rollerSuccess);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _components;

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

  exports.default = {
    name: 'md-cashier',

    components: (_components = {}, _defineProperty(_components, _popup2.default.name, _popup2.default), _defineProperty(_components, _titleBar2.default.name, _titleBar2.default), _defineProperty(_components, _captcha2.default.name, _captcha2.default), _defineProperty(_components, _button2.default.name, _button2.default), _defineProperty(_components, _icon2.default.name, _icon2.default), _defineProperty(_components, _rollerSuccess2.default.name, _rollerSuccess2.default), _components),

    props: {
      value: {
        type: Boolean,
        default: false
      },
      channels: {
        type: Array,
        default: function _default() {
          return [];
        },
        validator: function validator(val) {
          return !!val.length;
        }
      },
      defaultIndex: {
        type: Number,
        default: 0
      },
      title: {
        type: String,
        default: '\u652F\u4ED8' },
      paymentTitle: {
        type: String,
        default: '\u652F\u4ED8\u91D1\u989D' },
      paymentAmount: {
        type: String,
        default: '0.00'
      },
      paymentDescribe: {
        type: String,
        default: ''
      },
      payButtonText: {
        type: String,
        default: '\u786E\u5B9A\u652F\u4ED8' },
      moreButtonText: {
        type: String,
        default: '\u66F4\u591A\u652F\u4ED8\u65B9\u5F0F' }
    },

    data: function data() {
      return {
        isCashierShow: false,
        isChannelShow: false,
        isChannelActive: false,
        activeChannelIndex: -1,
        scene: 'choose',
        sceneKey: Date.now(),
        sceneOption: {
          loading: {
            text: '\u652F\u4ED8\u7ED3\u679C\u67E5\u8BE2\u4E2D...' },
          success: {
            text: '\u652F\u4ED8\u6210\u529F',
            buttonText: '\u6211\u77E5\u9053\u4E86',
            handler: null
          },
          fail: {
            text: '\u652F\u4ED8\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5',
            buttonText: '\u6211\u77E5\u9053\u4E86',
            handler: null
          },
          captcha: {
            text: '',
            maxlength: 4,
            count: 60,
            autoCountdown: true,
            onSend: _util.noop,
            onSubmit: _util.noop
          }
        }
      };
    },


    computed: {
      isSingle: function isSingle() {
        return !(this.channels.length > 1);
      }
    },

    watch: {
      value: function value(val) {
        this.isCashierShow = val;
      },
      defaultIndex: function defaultIndex(val) {
        this.activeChannelIndex = val;
      },
      isCashierShow: function isCashierShow(val) {
        this.$emit('input', val);
      }
    },

    created: function created() {
      this.$_initialCashier();

      if (this.channels.length < 3) {
        this.isChannelShow = true;
        this.isChannelActive = true;
      }
    },


    methods: {
      $_initialCashier: function $_initialCashier() {
        this.activeChannelIndex = this.defaultIndex;
        this.isCashierShow = this.value;
      },
      $_resetCashier: function $_resetCashier() {
        this.scene = 'choose';
        this.isChannelShow = false;
        this.isChannelActive = false;
      },
      $_onChannelItemClick: function $_onChannelItemClick(item, index) {
        this.activeChannelIndex = index;
        this.$emit('select', item);
      },
      $_onChannelBtnClick: function $_onChannelBtnClick() {
        var item = this.channels[this.activeChannelIndex];
        this.$emit('pay', item);
      },
      $_onChannelMore: function $_onChannelMore() {
        var _this = this;

        if (this.isChannelActive) {
          return;
        }
        this.isChannelShow = true;
        this.$nextTick(function () {
          _this.isChannelActive = true;
        });
      },
      $_onPopupShow: function $_onPopupShow() {
        this.$emit('show');
      },
      $_onPopupHide: function $_onPopupHide() {
        this.$_resetCashier();
        this.$emit('hide');
      },
      $_onPopupCancel: function $_onPopupCancel() {
        this.isCashierShow = false;
        this.$emit('cancel');
      },
      next: function next(scene) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (this.sceneOption[scene]) {
          (0, _util.extend)(this.sceneOption[scene], option);
        }
        this.scene = scene;
        this.sceneKey = Date.now();
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-cashier"},[_c('md-popup',{attrs:{"position":"bottom","mask-closable":false,"prevent-scroll-exclude":".choose-channel","prevent-scroll":""},on:{"show":_vm.$_onPopupShow,"hide":_vm.$_onPopupHide},model:{value:(_vm.isCashierShow),callback:function ($$v) {_vm.isCashierShow=$$v},expression:"isCashierShow"}},[_c('md-popup-title-bar',{attrs:{"title":_vm.title},on:{"cancel":_vm.$_onPopupCancel}},[_c('md-icon',{attrs:{"slot":"cancel","name":"cross","size":"lg"},slot:"cancel"})],1),_vm._v(" "),_c('div',{staticClass:"md-cashier-container"},[(_vm.scene === 'choose')?_c('div',{key:_vm.sceneKey,staticClass:"md-cashier-block md-cashier-choose"},[_c('div',{staticClass:"choose-text"},[(_vm.paymentTitle)?_c('p',{staticClass:"choose-title",domProps:{"innerHTML":_vm._s(_vm.paymentTitle)}}):_vm._e(),_vm._v(" "),(_vm.paymentAmount)?_c('p',{staticClass:"choose-number",domProps:{"innerHTML":_vm._s(_vm.paymentAmount)}}):_vm._e(),_vm._v(" "),(_vm.paymentDescribe)?_c('p',{staticClass:"choose-describe",domProps:{"innerHTML":_vm._s(_vm.paymentDescribe)}}):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"choose-channel",class:{active: _vm.isChannelActive}},[(_vm.isChannelShow)?_c('ul',{staticClass:"choose-channel-list"},_vm._l((_vm.channels),function(item,index){return _c('li',{key:index,staticClass:"choose-channel-item",class:{default: index === _vm.defaultIndex},on:{"click":function($event){_vm.$_onChannelItemClick(item, index)}}},[_c('i',{staticClass:"item-icon",class:item.icon},[_c('md-icon',{attrs:{"name":item.icon}})],1),_vm._v(" "),_c('span',{staticClass:"item-label",domProps:{"innerHTML":_vm._s(item.text || item.label)}}),_vm._v(" "),(!_vm.isSingle)?[(index === _vm.activeChannelIndex)?_c('md-icon',{staticClass:"item-check",attrs:{"name":"circle-right"}}):_c('md-icon',{staticClass:"item-check",attrs:{"name":"circle"}})]:_vm._e()],2)})):(_vm.channels[_vm.defaultIndex])?_c('ul',{staticClass:"choose-channel-list"},[_c('li',{staticClass:"choose-channel-item default",on:{"click":function($event){_vm.$_onChannelItemClick(_vm.channels[_vm.defaultIndex], _vm.defaultIndex)}}},[_c('i',{staticClass:"item-icon",class:_vm.channels[_vm.defaultIndex].icon},[_c('md-icon',{attrs:{"name":_vm.channels[_vm.defaultIndex].icon}})],1),_vm._v(" "),_c('span',{staticClass:"item-label",domProps:{"innerHTML":_vm._s(_vm.channels[_vm.defaultIndex].text || _vm.channels[_vm.defaultIndex].label)}}),_vm._v(" "),(!_vm.isSingle)?_c('md-icon',{staticClass:"item-check",attrs:{"name":"circle-right"}}):_vm._e()],1)]):_vm._e(),_vm._v(" "),(!_vm.isSingle)?_c('div',{staticClass:"choose-channel-more",class:{disabled: _vm.isChannelActive},domProps:{"innerHTML":_vm._s(_vm.moreButtonText)},on:{"click":_vm.$_onChannelMore}}):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"md-cashier-block-btn"},[_c('md-button',{staticClass:"md-cashier-pay-button",domProps:{"innerHTML":_vm._s(_vm.payButtonText)},on:{"click":_vm.$_onChannelBtnClick}})],1)]):(_vm.scene === 'captcha')?_c('div',{key:_vm.sceneKey,staticClass:"md-cashier-block md-cashier-captcha"},[_c('md-captcha',{ref:"captcha",attrs:{"maxlength":_vm.sceneOption.captcha.maxlength,"count":_vm.sceneOption.captcha.count,"countNormalText":_vm.sceneOption.captcha.countNormalText,"countActiveText":_vm.sceneOption.captcha.countActiveText,"auto-countdown":_vm.sceneOption.captcha.autoCountdown,"is-view":""},on:{"send":_vm.sceneOption.captcha.onSend,"submit":_vm.sceneOption.captcha.onSubmit}},[_c('div',{domProps:{"textContent":_vm._s(_vm.sceneOption.captcha.text)}})])],1):(_vm.scene === 'loading' || _vm.scene === 'success')?_c('div',{key:_vm.sceneKey,staticClass:"md-cashier-block",class:{
          'md-cashier-loading': _vm.scene === 'loading',
          'md-cashier-success': _vm.scene === 'success'
        }},[_c('div',{staticClass:"md-cashier-block-icon"},[_c('md-activity-indicator-rolling-success',{ref:"rolling",attrs:{"is-success":_vm.scene === 'success'}})],1),_vm._v(" "),_c('div',{staticClass:"md-cashier-block-text"},[_vm._v(_vm._s(_vm.scene === 'success' ? _vm.sceneOption.success.text : _vm.sceneOption.loading.text))]),_vm._v(" "),(_vm.scene === 'success')?_c('div',{staticClass:"md-cashier-block-btn"},[_c('md-button',{domProps:{"innerHTML":_vm._s(_vm.sceneOption.success.buttonText)},on:{"click":function () {
              _vm.isCashierShow = false
              _vm.sceneOption.success.handler && _vm.sceneOption.success.handler()
            }}})],1):_vm._e()]):(_vm.scene === 'fail')?_c('div',{key:_vm.sceneKey,staticClass:"md-cashier-block md-cashier-fail"},[_c('div',{staticClass:"md-cashier-block-icon"},[_c('md-icon',{attrs:{"name":"circle-alert"}})],1),_vm._v(" "),_c('div',{staticClass:"md-cashier-block-text",domProps:{"textContent":_vm._s(_vm.sceneOption.fail.text)}}),_vm._v(" "),_c('div',{staticClass:"md-cashier-block-btn"},[_c('md-button',{domProps:{"innerHTML":_vm._s(_vm.sceneOption.fail.buttonText)},on:{"click":function () {
              _vm.isCashierShow = false
              _vm.sceneOption.fail.handler && _vm.sceneOption.fail.handler()
            }}})],1)]):_vm._e()])],1)],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6b21da44", __vue__options__)
  } else {
    hotAPI.reload("data-v-6b21da44", __vue__options__)
  }
})()}