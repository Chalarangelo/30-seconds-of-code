function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import JPEG from 'jpeg-js';
import { throwError, isNodePattern } from '@jimp/utils';
var MIME_TYPE = 'image/jpeg';
export default (function () {
  return {
    mime: _defineProperty({}, MIME_TYPE, ['jpeg', 'jpg', 'jpe']),
    constants: {
      MIME_JPEG: MIME_TYPE
    },
    decoders: _defineProperty({}, MIME_TYPE, JPEG.decode),
    encoders: _defineProperty({}, MIME_TYPE, function (image) {
      return JPEG.encode(image.bitmap, image._quality).data;
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
          return throwError.call(this, 'n must be a number', cb);
        }

        if (n < 0 || n > 100) {
          return throwError.call(this, 'n must be a number 0 - 100', cb);
        }

        this._quality = Math.round(n);

        if (isNodePattern(cb)) {
          cb.call(this, null, this);
        }

        return this;
      }
    }
  };
});
//# sourceMappingURL=index.js.map