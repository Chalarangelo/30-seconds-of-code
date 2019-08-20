"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _jpegJs = _interopRequireDefault(require("jpeg-js"));

var _utils = require("@jimp/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MIME_TYPE = 'image/jpeg';

var _default = function _default() {
  return {
    mime: _defineProperty({}, MIME_TYPE, ['jpeg', 'jpg', 'jpe']),
    constants: {
      MIME_JPEG: MIME_TYPE
    },
    decoders: _defineProperty({}, MIME_TYPE, _jpegJs.default.decode),
    encoders: _defineProperty({}, MIME_TYPE, function (image) {
      return _jpegJs.default.encode(image.bitmap, image._quality).data;
    }),
    class: {
      // The quality to be used when saving JPEG images
      _quality: 100,

      /**
       * Sets the quality of the image when saving as JPEG format (default is 100)
       * @param {number} n The quality to use 0-100
       * @param {function(Error, Jimp)} cb (optional) a callback for when complete
       * @returns {Jimp} this for chaining of methods
       */
      quality: function quality(n, cb) {
        if (typeof n !== 'number') {
          return _utils.throwError.call(this, 'n must be a number', cb);
        }

        if (n < 0 || n > 100) {
          return _utils.throwError.call(this, 'n must be a number 0 - 100', cb);
        }

        this._quality = Math.round(n);

        if ((0, _utils.isNodePattern)(cb)) {
          cb.call(this, null, this);
        }

        return this;
      }
    }
  };
};

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=index.js.map