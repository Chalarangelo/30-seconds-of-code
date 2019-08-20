function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import UTIF from 'utif';
var MIME_TYPE = 'image/tiff';
export default (function () {
  return {
    mime: _defineProperty({}, MIME_TYPE, ['tiff', 'tif']),
    constants: {
      MIME_TIFF: MIME_TYPE
    },
    decoders: _defineProperty({}, MIME_TYPE, function (data) {
      var ifds = UTIF.decode(data);
      var page = ifds[0];
      UTIF.decodeImages(data, ifds);
      var rgba = UTIF.toRGBA8(page);
      return {
        data: Buffer.from(rgba),
        width: page.t256[0],
        height: page.t257[0]
      };
    }),
    encoders: _defineProperty({}, MIME_TYPE, function (image) {
      var tiff = UTIF.encodeImage(image.bitmap.data, image.bitmap.width, image.bitmap.height);
      return Buffer.from(tiff);
    })
  };
});
//# sourceMappingURL=index.js.map