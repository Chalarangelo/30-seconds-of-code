function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import { isNodePattern, throwError } from '@jimp/utils';
/**
 * Displaces the image based on the provided displacement map
 * @param {object} map the source Jimp instance
 * @param {number} offset the maximum displacement value
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */

export default (function () {
  return {
    displace: function displace(map, offset, cb) {
      if (_typeof(map) !== 'object' || map.constructor !== this.constructor) {
        return throwError.call(this, 'The source must be a Jimp image', cb);
      }

      if (typeof offset !== 'number') {
        return throwError.call(this, 'factor must be a number', cb);
      }

      var source = this.cloneQuiet();
      this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function (x, y, idx) {
        var displacement = map.bitmap.data[idx] / 256 * offset;
        displacement = Math.round(displacement);
        var ids = this.getPixelIndex(x + displacement, y);
        this.bitmap.data[ids] = source.bitmap.data[idx];
        this.bitmap.data[ids + 1] = source.bitmap.data[idx + 1];
        this.bitmap.data[ids + 2] = source.bitmap.data[idx + 2];
      });

      if (isNodePattern(cb)) {
        cb.call(this, null, this);
      }

      return this;
    }
  };
});
//# sourceMappingURL=index.js.map