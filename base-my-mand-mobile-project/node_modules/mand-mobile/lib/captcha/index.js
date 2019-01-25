;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../dialog', '../codebox', '../button', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../dialog'), require('../codebox'), require('../button'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.dialog, global.codebox, global.button, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _dialog, _codebox, _button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _dialog2 = _interopRequireDefault(_dialog);

  var _codebox2 = _interopRequireDefault(_codebox);

  var _button2 = _interopRequireDefault(_button);

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
    name: 'md-captcha',

    components: (_components = {}, _defineProperty(_components, _dialog2.default.name, _dialog2.default), _defineProperty(_components, _codebox2.default.name, _codebox2.default), _defineProperty(_components, _button2.default.name, _button2.default), _components),

    props: {
      title: {
        type: String
      },
      value: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 4
      },
      mask: {
        type: Boolean,
        default: false
      },
      system: {
        type: Boolean,
        default: false
      },
      autoCountdown: {
        type: Boolean,
        default: true
      },
      appendTo: {
        default: function _default() {
          return document.body;
        }
      },
      count: {
        type: Number,
        default: 60
      },
      countNormalText: {
        type: String,
        default: '发送验证码'
      },
      countActiveText: {
        type: String,
        default: '{$1}秒后重发'
      },
      isView: {
        type: Boolean,
        default: false
      }
    },

    data: function data() {
      return {
        code: '',
        visible: false,
        errorMsg: '',
        isCounting: false,
        firstShown: false,
        countBtnText: this.countNormalText
      };
    },


    watch: {
      value: function value(val) {
        if (val) {
          this.code = '';
          if (!this.firstShown) {
            this.firstShown = true;
            this.$_onResend();
          }
        }
      },
      code: function code(val) {
        if (val && this.errorMsg) {
          this.errorMsg = '';
        }
      }
    },

    mounted: function mounted() {
      if (this.appendTo && !this.isView) {
        this.appendTo.appendChild(this.$el);
      }
      if (this.value || this.isView) {
        this.firstShown = true;
        this.$_onResend();
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (this.appendTo && !this.isView) {
        this.appendTo.removeChild(this.$el);
      }
    },


    methods: {
      $_onInput: function $_onInput(val) {
        this.$emit('input', val);
      },
      $_onShow: function $_onShow() {
        this.visible = true;
        this.$refs.codebox.focus();
        this.$emit('show');
      },
      $_onHide: function $_onHide() {
        this.visible = false;
        this.$refs.codebox.blur();
        this.$emit('hide');
      },
      $_onSubmit: function $_onSubmit(code) {
        this.$emit('submit', code);
      },
      $_onResend: function $_onResend() {
        if (this.autoCountdown) {
          this.countdown();
        }
        this.$emit('send', this.countdown);
      },
      countdown: function countdown() {
        var _this = this;

        if (!this.count) {
          return;
        }
        clearInterval(this.__counter__);
        var i = this.count - 1;
        this.isCounting = true;
        this.countBtnText = this.countActiveText.replace('{$1}', i);

        this.__counter__ = setInterval(function () {
          if (i === 1) {
            _this.resetcount();
          } else {
            i--;
            _this.countBtnText = _this.countActiveText.replace('{$1}', i);
          }
        }, 1000);
      },
      resetcount: function resetcount() {
        this.isCounting = false;
        this.countBtnText = this.countNormalText;
        clearInterval(this.__counter__);
      },
      setError: function setError(msg) {
        var _this2 = this;

        this.$nextTick(function () {
          _this2.errorMsg = msg;
          _this2.code = '';
        });
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isView || _vm.value || _vm.visible),expression:"isView || value || visible"}],staticClass:"md-captcha"},[(_vm.isView)?[_c('div',{staticClass:"md-captcha-content"},[(_vm.title)?_c('h2',{staticClass:"md-captcha-title",domProps:{"textContent":_vm._s(_vm.title)}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"md-captcha-error",domProps:{"textContent":_vm._s(_vm.errorMsg)}}),_vm._v(" "),_c('div',{staticClass:"md-captcha-message"},[_vm._t("default")],2),_vm._v(" "),(_vm.count)?_c('md-button',{staticClass:"md-captcha-countbtn",attrs:{"type":"ghost","size":"small","disabled":this.isCounting},domProps:{"textContent":_vm._s(_vm.countBtnText)},on:{"click":_vm.$_onResend}}):_vm._e()],1),_vm._v(" "),_c('md-codebox',{ref:"codebox",attrs:{"maxlength":_vm.maxlength,"system":_vm.system,"closable":false,"isView":_vm.isView,"mask":_vm.mask,"autofocus":false},on:{"submit":_vm.$_onSubmit},model:{value:(_vm.code),callback:function ($$v) {_vm.code=$$v},expression:"code"}})]:[_c('md-dialog',{attrs:{"value":_vm.value,"closable":true,"appendTo":false,"position":"center"},on:{"input":_vm.$_onInput,"show":_vm.$_onShow,"hide":_vm.$_onHide}},[_c('div',{staticClass:"md-captcha-content"},[(_vm.title)?_c('h2',{staticClass:"md-captcha-title",domProps:{"textContent":_vm._s(_vm.title)}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"md-captcha-error",domProps:{"textContent":_vm._s(_vm.errorMsg)}}),_vm._v(" "),_c('div',{staticClass:"md-captcha-message"},[_vm._t("default")],2),_vm._v(" "),(_vm.count)?_c('md-button',{staticClass:"md-captcha-countbtn",attrs:{"type":"ghost","size":"small","disabled":this.isCounting},domProps:{"textContent":_vm._s(_vm.countBtnText)},on:{"click":_vm.$_onResend}}):_vm._e()],1),_vm._v(" "),_c('md-codebox',{ref:"codebox",attrs:{"maxlength":_vm.maxlength,"system":_vm.system,"closable":false,"mask":_vm.mask,"autofocus":false},on:{"submit":_vm.$_onSubmit},model:{value:(_vm.code),callback:function ($$v) {_vm.code=$$v},expression:"code"}})],1)]],2)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1fd59c56", __vue__options__)
  } else {
    hotAPI.reload("data-v-1fd59c56", __vue__options__)
  }
})()}