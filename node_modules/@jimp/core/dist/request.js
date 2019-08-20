"use strict";

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.assign");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global XMLHttpRequest */
if (process.browser || process.env.ENVIRONMENT === 'BROWSER' || typeof process.versions.electron !== 'undefined' && process.type === 'renderer' && typeof XMLHttpRequest === 'function') {
  // If we run into a browser or the electron renderer process,
  // use XHR method instead of Request node module.
  module.exports = function (options, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', options.url, true);
    xhr.responseType = 'arraybuffer';
    xhr.addEventListener('load', function () {
      if (xhr.status < 400) {
        try {
          var data = Buffer.from(this.response);
          cb(null, xhr, data);
        } catch (error) {
          return cb(new Error('Response is not a buffer for url ' + options.url + '. Error: ' + error.message));
        }
      } else {
        cb(new Error('HTTP Status ' + xhr.status + ' for url ' + options.url));
      }
    });
    xhr.addEventListener('error', function (e) {
      cb(e);
    });
    xhr.send();
  };
} else {
  module.exports = function (_ref, cb) {
    var options = Object.assign({}, _ref);

    var p = require('phin');

    p(_objectSpread({
      compression: true
    }, options), function (err, res) {
      if (err === null) {
        cb(null, res, res.body);
      } else {
        cb(err);
      }
    });
  };
}
//# sourceMappingURL=request.js.map