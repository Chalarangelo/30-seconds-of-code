"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _omggif = _interopRequireDefault(require("omggif"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MIME_TYPE = 'image/gif';

var _default = function _default() {
  return {
    mime: _defineProperty({}, MIME_TYPE, ['gif']),
    constants: {
      MIME_GIF: MIME_TYPE
    },
    decoders: _defineProperty({}, MIME_TYPE, function (data) {
      var gifObj = new _omggif.default.GifReader(data);
      var gifData = Buffer.alloc(gifObj.width * gifObj.height * 4);
      gifObj.decodeAndBlitFrameRGBA(0, gifData);
      return {
        data: gifData,
        width: gifObj.width,
        height: gifObj.height
      };
    })
  };
};

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=index.js.map