;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './image-reader', './image-dataurl', '../_util', '../_style/global.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./image-reader'), require('./image-dataurl'), require('../_util'), require('../_style/global.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.imageReader, global.imageDataurl, global._util, global.global, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _imageReader, _imageDataurl, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _imageReader2 = _interopRequireDefault(_imageReader);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ERROR = {
    '100': 'browser does not support',
    '101': 'picture size is beyond the preset',
    '102': 'picture read failure',
    '103': 'the number of pictures exceeds the limit'
  };

  exports.default = {
    name: 'md-image-reader',

    props: {
      name: {
        type: String,
        default: function _default() {
          return (0, _util.randomId)('image-reader');
        }
      },
      size: {
        type: [String, Number],
        default: 0
      },
      mime: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      isCameraOnly: {
        type: Boolean,
        default: false
      },
      isMultiple: {
        type: Boolean,
        default: false
      },
      amount: {
        type: Number,
        default: 0
      }
    },

    data: function data() {
      return {
        inputTmpKey: Date.now() };
    },


    computed: {
      mimeType: function mimeType() {
        if (this.mime.length) {
          var mimeStr = '';
          this.mime.forEach(function (type) {
            mimeStr += 'image/' + type + ',';
          });
          return mimeStr.substring(0, mimeStr.length - 1);
        } else {
          return 'image/*';
        }
      }
    },

    methods: {
      $_emitter: function $_emitter(event, data) {
        this.$emit(event, this.name, data);
      },
      $_openWebWorker: function $_openWebWorker(fn) {
        return new Worker((0, _util.functionToUrl)(fn));
      },
      $_closeWebWorker: function $_closeWebWorker(worker) {
        worker.terminate();
      },
      $_readFile: function $_readFile(fileElement) {
        var _this = this;

        var size = +this.size * 1000;
        var files = fileElement.files;
        var worker = void 0;
        var count = 0;

        if (window.Worker) {
          worker = this.$_openWebWorker(_imageReader2.default);

          worker.postMessage({
            files: files,
            size: size,
            isWebWorker: true
          });

          worker.onmessage = function (evt) {
            _this.$_onReaderComplete(evt.data);

            count++;

            if (count === files.length) {
              _this.$_closeWebWorker(worker);
            }
          };
        } else {
          var imageReader = (0, _imageReader2.default)(window);
          imageReader({
            files: files,
            size: size,
            isWebWorker: false,
            complete: this.$_onReaderComplete
          });
        }
      },
      $_cleaeFile: function $_cleaeFile() {
        this.inputTmpKey = Date.now();
      },
      $_onFileChange: function $_onFileChange(event) {
        var fileElement = event.target;

        if (fileElement.files && fileElement.files.length) {
          this.$_emitter('select', {
            files: Array.prototype.slice.call(fileElement.files)
          });

          if (this.amount && fileElement.files.length > this.amount) {
            this.$_emitter('error', {
              code: '103',
              msg: ERROR['103']
            });
            this.$_cleaeFile();
            return;
          }

          this.$_readFile(fileElement);
        }
      },
      $_onReaderComplete: function $_onReaderComplete(_ref) {
        var errorCode = _ref.errorCode,
            dataUrl = _ref.dataUrl,
            file = _ref.file;

        if (errorCode) {
          this.$_emitter('error', {
            code: errorCode,
            msg: ERROR[errorCode]
          });
          return;
        }

        this.$_emitter('complete', {
          blob: (0, _imageDataurl.dataURItoBlob)(dataUrl),
          dataUrl: dataUrl,
          file: file
        });
        this.$_cleaeFile();
      }
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"md-image-reader"},[_c('input',{key:_vm.inputTmpKey,staticClass:"md-image-reader-file",attrs:{"type":"file","name":_vm.name,"accept":_vm.mimeType,"capture":_vm.isCameraOnly,"multiple":_vm.isMultiple},on:{"change":_vm.$_onFileChange}})])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-778fa590", __vue__options__)
  } else {
    hotAPI.reload("data-v-778fa590", __vue__options__)
  }
})()}