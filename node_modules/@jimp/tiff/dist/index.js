"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _utif = _interopRequireDefault(require("utif"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MIME_TYPE = 'image/tiff';

var _default = function _default() {
  return {
    mime: _defineProperty({}, MIME_TYPE, ['tiff', 'tif']),
    constants: {
      MIME_TIFF: MIME_TYPE
    },
    decoders: _defineProperty({}, MIME_TYPE, function (data) {
      var ifds = _utif.default.decode(data);

      var page = ifds[0];

      _utif.default.decodeImages(data, ifds);

      var rgba = _utif.default.toRGBA8(page);

      return {
        data: Buffer.from(rgba),
        width: page.t256[0],
        height: page.t257[0]
      };
    }),
    encoders: _defineProperty({}, MIME_TYPE, function (image) {
      var tiff = _utif.default.encodeImage(image.bitmap.data, image.bitmap.width, image.bitmap.height);

      return Buffer.from(tiff);
    })
  };
};

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=index.js.map