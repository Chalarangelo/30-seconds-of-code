function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import { throwError, isNodePattern } from '@jimp/utils';
export default (function () {
  return {
    /**
     * Blits a source image on to this image
     * @param {Jimp} src the source Jimp instance
     * @param {number} x the x position to blit the image
     * @param {number} y the y position to blit the image
     * @param {number} srcx (optional) the x position from which to crop the source image
     * @param {number} srcy (optional) the y position from which to crop the source image
     * @param {number} srcw (optional) the width to which to crop the source image
     * @param {number} srch (optional) the height to which to crop the source image
     * @param {function(Error, Jimp)} cb (optional) a callback for when complete
     * @returns {Jimp} this for chaining of methods
     */
    blit: function blit(src, x, y, srcx, srcy, srcw, srch, cb) {
      if (!(src instanceof this.constructor)) {
        return throwError.call(this, 'The source must be a Jimp image', cb);
      }

      if (typeof x !== 'number' || typeof y !== 'number') {
        return throwError.call(this, 'x and y must be numbers', cb);
      }

      if (typeof srcx === 'function') {
        cb = srcx;
        srcx = 0;
        srcy = 0;
        srcw = src.bitmap.width;
        srch = src.bitmap.height;
      } else if (_typeof(srcx) === _typeof(srcy) && _typeof(srcy) === _typeof(srcw) && _typeof(srcw) === _typeof(srch)) {
        srcx = srcx || 0;
        srcy = srcy || 0;
        srcw = srcw || src.bitmap.width;
        srch = srch || src.bitmap.height;
      } else {
        return throwError.call(this, 'srcx, srcy, srcw, srch must be numbers', cb);
      } // round input


      x = Math.round(x);
      y = Math.round(y); // round input

      srcx = Math.round(srcx);
      srcy = Math.round(srcy);
      srcw = Math.round(srcw);
      srch = Math.round(srch);
      var maxWidth = this.bitmap.width;
      var maxHeight = this.bitmap.height;
      var baseImage = this;
      src.scanQuiet(srcx, srcy, srcw, srch, function (sx, sy, idx) {
        var xOffset = x + sx - srcx;
        var yOffset = y + sy - srcy;

        if (xOffset >= 0 && yOffset >= 0 && maxWidth - xOffset > 0 && maxHeight - yOffset > 0) {
          var dstIdx = baseImage.getPixelIndex(xOffset, yOffset);
          var _src = {
            r: this.bitmap.data[idx],
            g: this.bitmap.data[idx + 1],
            b: this.bitmap.data[idx + 2],
            a: this.bitmap.data[idx + 3]
          };
          var dst = {
            r: baseImage.bitmap.data[dstIdx],
            g: baseImage.bitmap.data[dstIdx + 1],
            b: baseImage.bitmap.data[dstIdx + 2],
            a: baseImage.bitmap.data[dstIdx + 3]
          };
          baseImage.bitmap.data[dstIdx] = (_src.a * (_src.r - dst.r) - dst.r + 255 >> 8) + dst.r;
          baseImage.bitmap.data[dstIdx + 1] = (_src.a * (_src.g - dst.g) - dst.g + 255 >> 8) + dst.g;
          baseImage.bitmap.data[dstIdx + 2] = (_src.a * (_src.b - dst.b) - dst.b + 255 >> 8) + dst.b;
          baseImage.bitmap.data[dstIdx + 3] = this.constructor.limit255(dst.a + _src.a);
        }
      });

      if (isNodePattern(cb)) {
        cb.call(this, null, this);
      }

      return this;
    }
  };
});
//# sourceMappingURL=index.js.map