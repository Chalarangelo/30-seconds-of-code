import { isNodePattern, throwError } from '@jimp/utils';
/**
 * Masks a source image on to this image using average pixel colour. A completely black pixel on the mask will turn a pixel in the image completely transparent.
 * @param {Jimp} src the source Jimp instance
 * @param {number} x the horizontal position to blit the image
 * @param {number} y the vertical position to blit the image
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */

export default (function () {
  return {
    mask: function mask(src) {
      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var cb = arguments.length > 3 ? arguments[3] : undefined;

      if (!(src instanceof this.constructor)) {
        return throwError.call(this, 'The source must be a Jimp image', cb);
      }

      if (typeof x !== 'number' || typeof y !== 'number') {
        return throwError.call(this, 'x and y must be numbers', cb);
      } // round input


      x = Math.round(x);
      y = Math.round(y);
      var w = this.bitmap.width;
      var h = this.bitmap.height;
      var baseImage = this;
      src.scanQuiet(0, 0, src.bitmap.width, src.bitmap.height, function (sx, sy, idx) {
        var destX = x + sx;
        var destY = y + sy;

        if (destX >= 0 && destY >= 0 && destX < w && destY < h) {
          var dstIdx = baseImage.getPixelIndex(destX, destY);
          var data = this.bitmap.data;
          var avg = (data[idx + 0] + data[idx + 1] + data[idx + 2]) / 3;
          baseImage.bitmap.data[dstIdx + 3] *= avg / 255;
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