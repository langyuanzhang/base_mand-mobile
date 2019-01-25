;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../number-keyboard', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../number-keyboard'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.numberKeyboard, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _numberKeyboard) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _numberKeyboard2 = _interopRequireDefault(_numberKeyboard);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
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

  exports.default = {
    name: 'md-codebox',
    components: _defineProperty({}, _numberKeyboard2.default.name, _numberKeyboard2.default),
    props: {
      value: {
        type: String,
        default: ''
      },
      maxlength: {
        type: [Number, String],
        default: 4
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      mask: {
        type: Boolean,
        default: false
      },
      closable: {
        type: Boolean,
        default: true
      },
      system: {
        type: Boolean,
        default: false
      },
      okText: {
        type: String
      },
      disorder: {
        type: Boolean,
        default: false
      },
      isView: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        code: '',
        focused: this.autofocus
      };
    },

    watch: {
      value: {
        imediate: true,
        handler: function handler(val) {
          if (val !== this.code) {
            this.code = val;
          }
        }
      }
    },
    computed: {
      num: function num() {
        return Math.abs(parseInt(this.maxlength, 10)) || 1;
      }
    },
    mounted: function mounted() {
      if (this.closable) {
        document.addEventListener('click', this.$_handleOutClick);
      }
      if (!this.system && !this.isView) {
        document.body.appendChild(this.$refs.keyboard.$el);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (this.closable) {
        document.removeEventListener('click', this.$_handleOutClick);
      }
      if (this.focused) {
        this.blur();
      }
      if (!this.system && !this.isView) {
        document.body.removeChild(this.$refs.keyboard.$el);
      }
    },

    methods: {
      $_handleOutClick: function $_handleOutClick(e) {
        if (!this.$el.contains(e.target)) {
          this.focused = false;
        }
      },
      $_onInputChange: function $_onInputChange(e) {
        if (this.maxlength < 0 || e.target.value.length <= this.maxlength) {
          this.code = e.target.value;
        }

        if (this.code.length === this.maxlength) {
          this.$emit('submit', this.code);
        }

        this.$emit('input', this.code);
      },
      $_onSubmit: function $_onSubmit(e) {
        e.preventDefault();
        this.$emit('submit', this.code);
      },
      $_onEnter: function $_onEnter(val) {
        if ((this.maxlength < 0 || this.code.length < this.maxlength) && val !== '.') {
          this.code += val;
        }

        if (this.code.length === this.maxlength) {
          this.$nextTick(function () {
            this.$emit('submit', this.code);
          });
        }

        this.$emit('input', this.code);
      },
      $_onDelete: function $_onDelete() {
        this.code = this.code.slice(0, this.code.length - 1);
        this.$emit('input', this.code);
      },
      $_onConfirm: function $_onConfirm() {
        this.$emit('submit', this.code);
      },
      blur: function blur() {
        this.focused = false;
        if (this.system) {
          this.$refs.input.blur();
        }
      },
      focus: function focus() {
        this.focused = true;
        if (this.system) {
          this.$refs.input.focus();
        }
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-codebox-wrapper"},[_c('div',{staticClass:"md-codebox",on:{"click":_vm.focus}},[(_vm.maxlength > 0)?_vm._l((_vm.num),function(i){return _c('span',{key:i,class:['md-codebox-box', (i === _vm.code.length + 1) && _vm.focused && 'is-active']},[(_vm.code.charAt(i-1))?[(_vm.mask)?[_c('i',{staticClass:"md-codebox-dot"})]:[_vm._v("\n            "+_vm._s(_vm.code.charAt(i-1))+"\n          ")]]:_vm._e(),_vm._v(" "),(i === _vm.code.length + 1 && _vm.focused)?[_c('i',{staticClass:"md-codebox-blink"})]:_vm._e()],2)}):[(_vm.mask)?_c('input',{class:['md-codebox-holder', _vm.focused && 'is-active'],attrs:{"type":"password","maxlength":_vm.maxlength,"readonly":"","disabled":""},domProps:{"value":_vm.code}}):_c('input',{class:['md-codebox-holder', _vm.focused && 'is-active'],attrs:{"type":"text","maxlength":_vm.maxlength,"readonly":"","disabled":""},domProps:{"value":_vm.code}})]],2),_vm._v(" "),_c('form',{directives:[{name:"show",rawName:"v-show",value:(_vm.system),expression:"system"}],attrs:{"action":""},on:{"submit":_vm.$_onSubmit}},[_c('input',{ref:"input",staticClass:"md-codebox-input",attrs:{"type":_vm.mask ? 'password' : 'text',"maxlength":_vm.maxlength},domProps:{"value":_vm.code},on:{"input":_vm.$_onInputChange}})]),_vm._v(" "),_c('md-number-keyboard',{directives:[{name:"show",rawName:"v-show",value:(!_vm.system),expression:"!system"}],ref:"keyboard",staticClass:"md-codebox-number-keyboard",attrs:{"type":_vm.maxlength > 0 ? 'simple' : 'professional',"okText":_vm.okText,"disorder":_vm.disorder,"is-view":_vm.isView},on:{"delete":_vm.$_onDelete,"enter":_vm.$_onEnter,"confirm":_vm.$_onConfirm},model:{value:(_vm.focused),callback:function ($$v) {_vm.focused=$$v},expression:"focused"}})],1)}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7bac1719", __vue__options__)
  } else {
    hotAPI.reload("data-v-7bac1719", __vue__options__)
  }
})()}