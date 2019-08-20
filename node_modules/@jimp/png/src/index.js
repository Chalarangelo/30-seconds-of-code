import { PNG } from 'pngjs';
import { throwError, isNodePattern } from '@jimp/utils';

const MIME_TYPE = 'image/png';

// PNG filter types
const PNG_FILTER_AUTO = -1;
const PNG_FILTER_NONE = 0;
const PNG_FILTER_SUB = 1;
const PNG_FILTER_UP = 2;
const PNG_FILTER_AVERAGE = 3;
const PNG_FILTER_PATH = 4;

export default () => ({
  mime: { [MIME_TYPE]: ['png'] },

  constants: {
    MIME_PNG: MIME_TYPE,
    PNG_FILTER_AUTO,
    PNG_FILTER_NONE,
    PNG_FILTER_SUB,
    PNG_FILTER_UP,
    PNG_FILTER_AVERAGE,
    PNG_FILTER_PATH
  },

  hasAlpha: { [MIME_TYPE]: true },
  decoders: { [MIME_TYPE]: PNG.sync.read },
  encoders: {
    [MIME_TYPE]: data => {
      const png = new PNG({
        width: data.bitmap.width,
        height: data.bitmap.height
      });

      png.data = data.bitmap.data;

      return PNG.sync.write(png, {
        width: data.bitmap.width,
        height: data.bitmap.height,
        deflateLevel: data._deflateLevel,
        deflateStrategy: data._deflateStrategy,
        filterType: data._filterType,
        colorType:
          typeof data._colorType === 'number'
            ? data._colorType
            : data._rgba
              ? 6
              : 2,
        inputHasAlpha: data._rgba
      });
    }
  },

  class: {
    _deflateLevel: 9,
    _deflateStrategy: 3,
    _filterType: PNG_FILTER_AUTO,
    _colorType: null,

    /**
     * Sets the deflate level used when saving as PNG format (default is 9)
     * @param {number} l Deflate level to use 0-9. 0 is no compression. 9 (default) is maximum compression.
     * @param {function(Error, Jimp)} cb (optional) a callback for when complete
     * @returns {Jimp} this for chaining of methods
     */
    deflateLevel(l, cb) {
      if (typeof l !== 'number') {
        return throwError.call(this, 'l must be a number', cb);
      }

      if (l < 0 || l > 9) {
        return throwError.call(this, 'l must be a number 0 - 9', cb);
      }

      this._deflateLevel = Math.round(l);

      if (isNodePattern(cb)) {
        cb.call(this, null, this);
      }

      return this;
    },

    /**
     * Sets the deflate strategy used when saving as PNG format (default is 3)
     * @param {number} s Deflate strategy to use 0-3.
     * @param {function(Error, Jimp)} cb (optional) a callback for when complete
     * @returns {Jimp} this for chaining of methods
     */
    deflateStrategy(s, cb) {
      if (typeof s !== 'number') {
        return throwError.call(this, 's must be a number', cb);
      }

      if (s < 0 || s > 3) {
        return throwError.call(this, 's must be a number 0 - 3', cb);
      }

      this._deflateStrategy = Math.round(s);

      if (isNodePattern(cb)) {
        cb.call(this, null, this);
      }

      return this;
    },

    /**
     * Sets the filter type used when saving as PNG format (default is automatic filters)
     * @param {number} f The quality to use -1-4.
     * @param {function(Error, Jimp)} cb (optional) a callback for when complete
     * @returns {Jimp} this for chaining of methods
     */
    filterType(f, cb) {
      if (typeof f !== 'number') {
        return throwError.call(this, 'n must be a number', cb);
      }

      if (f < -1 || f > 4) {
        return throwError.call(
          this,
          'n must be -1 (auto) or a number 0 - 4',
          cb
        );
      }

      this._filterType = Math.round(f);

      if (isNodePattern(cb)) {
        cb.call(this, null, this);
      }

      return this;
    },
    /**
     * Sets the color type used when saving as PNG format
     * @param {number} s color type to use 0, 2, 4, 6.
     * @param {function(Error, Jimp)} cb (optional) a callback for when complete
     * @returns {Jimp} this for chaining of methods
     */ colorType(s, cb) {
      if (typeof s !== 'number') {
        return throwError.call(this, 's must be a number', cb);
      }

      if (s !== 0 && s !== 2 && s !== 4 && s !== 6) {
        return throwError.call(this, 's must be a number 0, 2, 4, 6.', cb);
      }

      this._colorType = Math.round(s);

      if (isNodePattern(cb)) {
        cb.call(this, null, this);
      }

      return this;
    }
  }
});
