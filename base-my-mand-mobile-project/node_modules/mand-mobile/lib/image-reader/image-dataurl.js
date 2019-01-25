(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.imageDataurl = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.dataURIToArrayBuffer = dataURIToArrayBuffer;
  exports.dataURItoBlob = dataURItoBlob;
  /**
   * DataURI to ArrayBuffer
   * @param {*} dataURI 
   */
  function dataURIToArrayBuffer(dataURI) {
    // 'data:image/jpeg;dataURI,...' => 'image/jpeg'
    // contentType = contentType || dataURI.match(/^data:([^;]+);base64,/mi)[1] || ''
    dataURI = dataURI.replace(/^data:([^;]+);base64,/gim, '').replace(/\s/g, '');

    var binary = atob(dataURI);
    var len = binary.length;
    var buffer = new ArrayBuffer(len);
    var view = new Uint8Array(buffer);

    for (var i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i);
    }

    return buffer;
  }

  /**
   * Base64 to Blob
   * @param  {String} dataURI
   */
  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString = void 0;

    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia.buffer], { type: mimeString });
  }
});