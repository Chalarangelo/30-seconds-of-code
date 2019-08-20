function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import BMP from 'bmp-js';
import { scan } from '@jimp/utils';
var MIME_TYPE = 'image/bmp';
var MIME_TYPE_SECOND = 'image/x-ms-bmp';

function toAGBR(image) {
  return scan(image, 0, 0, image.bitmap.width, image.bitmap.height, function (x, y, index) {
    var red = this.bitmap.data[index + 0];
    var green = this.bitmap.data[index + 1];
    var blue = this.bitmap.data[index + 2];
    var alpha = this.bitmap.data[index + 3];
    this.bitmap.data[index + 0] = alpha;
    this.bitmap.data[index + 1] = blue;
    this.bitmap.data[index + 2] = green;
    this.bitmap.data[index + 3] = red;
  }).bitmap;
}

function fromAGBR(bitmap) {
  return scan({
    bitmap: bitmap
  }, 0, 0, bitmap.width, bitmap.height, function (x, y, index) {
    var alpha = this.bitmap.data[index + 0];
    var blue = this.bitmap.data[index + 1];
    var green = this.bitmap.data[index + 2];
    var red = this.bitmap.data[index + 3];
    this.bitmap.data[index + 0] = red;
    this.bitmap.data[index + 1] = green;
    this.bitmap.data[index + 2] = blue;
    this.bitmap.data[index + 3] = bitmap.is_with_alpha ? alpha : 0xff;
  }).bitmap;
}

var decode = function decode(data) {
  return fromAGBR(BMP.decode(data));
};

var encode = function encode(image) {
  return BMP.encode(toAGBR(image)).data;
};

export default (function () {
  var _decoders, _encoders;

  return {
    mime: _defineProperty({}, MIME_TYPE, ['bmp']),
    constants: {
      MIME_BMP: MIME_TYPE,
      MIME_X_MS_BMP: MIME_TYPE_SECOND
    },
    decoders: (_decoders = {}, _defineProperty(_decoders, MIME_TYPE, decode), _defineProperty(_decoders, MIME_TYPE_SECOND, decode), _decoders),
    encoders: (_encoders = {}, _defineProperty(_encoders, MIME_TYPE, encode), _defineProperty(_encoders, MIME_TYPE_SECOND, encode), _encoders)
  };
});
//# sourceMappingURL=index.js.map