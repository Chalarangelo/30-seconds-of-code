import JPEG from 'jpeg-js';
import { throwError, isNodePattern } from '@jimp/utils';

const MIME_TYPE = 'image/jpeg';

export default () => ({
  mime: { [MIME_TYPE]: ['jpeg', 'jpg', 'jpe'] },

  constants: {
    MIME_JPEG: MIME_TYPE
  },

  decoders: {
    [MIME_TYPE]: JPEG.decode
  },

  encoders: {
    [MIME_TYPE]: image => JPEG.encode(image.bitmap, image._quality).data
  },

  class: {
    // The quality to be used when saving JPEG images
    _quality: 100,
    /**
     * Sets the quality of the image when saving as JPEG format (default is 100)
     * @param {number} n The quality to use 0-100
     * @param {function(Error, Jimp)} cb (optional) a callback for when complete
     * @returns {Jimp} this for chaining of methods
     */
    quality(n, cb) {
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
});
