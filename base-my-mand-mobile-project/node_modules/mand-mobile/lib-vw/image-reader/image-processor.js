(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './image-dataurl', '../_util'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./image-dataurl'), require('../_util'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.imageDataurl, global._util);
    global.imageProcessor = mod.exports;
  }
})(this, function (exports, _imageDataurl, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (options) {
    var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _util.noop;

    return new Promise(function (resolve, reject) {
      var dataUrl = options.dataUrl,
          width = options.width,
          height = options.height,
          quality = options.quality;

      var orientation = getOrientation(dataUrl);
      var blob = (0, _imageDataurl.dataURItoBlob)(dataUrl);
      /* istanbul ignore next */
      if (orientation > 1 || quality < 1 || width || height) {
        var img = new Image();
        img.src = dataUrl;
        img.onload = function () {
          var newDataUrl = makeCanvas(img, orientation, width, height, quality);
          var newBlob = (0, _imageDataurl.dataURItoBlob)(newDataUrl);
          fn(newDataUrl, newBlob);
          resolve({
            dataUrl: newDataUrl,
            blob: newBlob
          });
        };
        img.onerror = function () {
          fn(null);
          reject(new Error('image load error'));
        };
      } else {
        fn(dataUrl, blob);
        resolve({
          dataUrl: dataUrl,
          blob: blob
        });
      }
    });
  };

  var UA = function (userAgent) {
    var isOldIos = /OS (\d)_.* like Mac OS X/g.exec(userAgent);
    var isOldAndroid = /Android (\d.*?);/g.exec(userAgent) || /Android\/(\d.*?) /g.exec(userAgent);

    // IOS8.3-
    // ndroid4.5-
    // ios
    // android
    // QQ Browser
    return {
      oldIOS: isOldIos ? +isOldIos.pop() < 8.3 : false,
      oldAndroid: isOldAndroid ? +isOldAndroid.pop().substr(0, 3) < 4.5 : false,
      ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(userAgent),
      android: /Android/g.test(userAgent),
      mQQBrowser: /MQQBrowser/g.test(userAgent)
    };
  }(navigator.userAgent);

  /**
  * Get Orientation of EXIF
  * @param  {Object}   dataURL
  * @souce http://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side
  */
  /* istanbul ignore next */
  function getOrientation(dataURL) {
    var buffer = (0, _imageDataurl.dataURIToArrayBuffer)(dataURL);
    var view = new DataView(buffer);

    if (view.getUint16(0, false) !== 0xffd8) {
      return -2;
    }

    var length = view.byteLength;
    var offset = 2;

    while (offset < length) {
      var marker = view.getUint16(offset, false);
      offset += 2;

      if (marker === 0xffe1) {
        var tmp = view.getUint32(offset += 2, false);

        if (tmp !== 0x45786966) {
          return -1;
        }

        var little = view.getUint16(offset += 6, false) === 0x4949;
        offset += view.getUint32(offset + 4, little);

        var tags = view.getUint16(offset, little);
        offset += 2;

        for (var i = 0; i < tags; i++) {
          if (view.getUint16(offset + i * 12, little) === 0x0112) {
            return view.getUint16(offset + i * 12 + 8, little);
          }
        }
      } else if ((marker & 0xff00) !== 0xff00) {
        break;
      } else {
        offset += view.getUint16(offset, false);
      }
    }

    return -1;
  }
  /* istanbul ignore next */
  function getImageSize(img, orientation, maxWidth, maxHeight) {
    var ret = {
      width: img.width,
      height: img.height
    };

    if ('5678'.indexOf(orientation) > -1) {
      ret.width = img.height;
      ret.height = img.width;
    }

    // 如果原图小于设定，采用原图
    if (ret.width < maxWidth || ret.height < maxHeight) {
      return ret;
    }

    var scale = ret.width / ret.height;

    if (maxWidth && maxHeight) {
      if (scale >= maxWidth / maxHeight) {
        if (ret.width > maxWidth) {
          ret.width = maxWidth;
          ret.height = Math.ceil(maxWidth / scale);
        }
      } else {
        if (ret.height > maxHeight) {
          ret.height = maxHeight;
          ret.width = Math.ceil(maxHeight * scale);
        }
      }
    } else if (maxWidth) {
      if (maxWidth < ret.width) {
        ret.width = maxWidth;
        ret.height = Math.ceil(maxWidth / scale);
      }
    } else if (maxHeight < ret.height) {
      ret.width = Math.ceil(maxHeight * scale);
      ret.height = maxHeight;
    }

    // 超过这个值base64无法生成，在IOS上
    if (ret.width >= 3264 || ret.height >= 2448) {
      ret.width *= 0.8;
      ret.height *= 0.8;
    }

    return ret;
  }
  /* istanbul ignore next */
  function makeCanvas(img, orientation, maxWidth, maxHeight, quality) {
    var _getImageSize = getImageSize(img, orientation, maxWidth, maxHeight),
        width = _getImageSize.width,
        height = _getImageSize.height;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    var base64 = null;
    switch (orientation) {
      case 3:
        ctx.rotate(180 * Math.PI / 180);
        ctx.drawImage(img, -width, -height, width, height);
        break;
      case 6:
        ctx.rotate(90 * Math.PI / 180);
        ctx.drawImage(img, 0, -width, height, width);
        break;
      case 8:
        ctx.rotate(270 * Math.PI / 180);
        ctx.drawImage(img, -height, 0, height, width);
        break;
      case 2:
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, width, height);
        break;
      case 4:
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
        ctx.rotate(180 * Math.PI / 180);
        ctx.drawImage(img, -width, -height, width, height);
        break;
      case 5:
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
        ctx.rotate(90 * Math.PI / 180);
        ctx.drawImage(img, 0, -width, height, width);
        break;
      case 7:
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
        ctx.rotate(270 * Math.PI / 180);
        ctx.drawImage(img, -height, 0, height, width);
        break;
      default:
        ctx.drawImage(img, 0, 0, width, height);
    }

    if (UA.oldIOS || UA.oldAndroid || UA.mQQBrowser || !navigator.userAgent) {
      /* global JPEGEncoder */
      var encoder = new JPEGEncoder();
      var newImg = ctx.getImageData(0, 0, canvas.width, canvas.height);
      base64 = encoder.encode(newImg, quality * 100);
    } else {
      base64 = canvas.toDataURL('image/jpeg', quality);
    }

    return base64;
  }
  /**
   * Image Process
   * @param options Object: { dataUrl, width, height, quality}
   * @param fn dataUrl => void
   */


  // Import jpeg_encoder_basic for compatibility if necessary
  if (UA.oldIOS || UA.oldAndroid || UA.mQQBrowser || !navigator.userAgent) {
    /* istanbul ignore next */
    (0, _util.requireRemoteScript)('//manhattan.didistatic.com/static/manhattan/mfd/image-reader/jpeg_encoder_basic.js');
  }
});