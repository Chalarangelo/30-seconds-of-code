function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import GIF from 'omggif';
var MIME_TYPE = 'image/gif';
export default (function () {
  return {
    mime: _defineProperty({}, MIME_TYPE, ['gif']),
    constants: {
      MIME_GIF: MIME_TYPE
    },
    decoders: _defineProperty({}, MIME_TYPE, function (data) {
      var gifObj = new GIF.GifReader(data);
      var gifData = Buffer.alloc(gifObj.width * gifObj.height * 4);
      gifObj.decodeAndBlitFrameRGBA(0, gifData);
      return {
        data: gifData,
        width: gifObj.width,
        height: gifObj.height
      };
    })
  };
});
//# sourceMappingURL=index.js.map