import { isNodePattern, throwError } from '@jimp/utils';

/**
 * Masks a source image on to this image using average pixel colour. A completely black pixel on the mask will turn a pixel in the image completely transparent.
 * @param {Jimp} src the source Jimp instance
 * @param {number} x the horizontal position to blit the image
 * @param {number} y the vertical position to blit the image
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */
export default () => ({
  mask(src, x = 0, y = 0, cb) {
    if (!(src instanceof this.constructor)) {
      return throwError.call(this, 'The source must be a Jimp image', cb);
    }

    if (typeof x !== 'number' || typeof y !== 'number') {
      return throwError.call(this, 'x and y must be numbers', cb);
    }

    // round input
    x = Math.round(x);
    y = Math.round(y);

    const w = this.bitmap.width;
    const h = this.bitmap.height;
    const baseImage = this;

    src.scanQuiet(0, 0, src.bitmap.width, src.bitmap.height, function(
      sx,
      sy,
      idx
    ) {
      const destX = x + sx;
      const destY = y + sy;

      if (destX >= 0 && destY >= 0 && destX < w && destY < h) {
        const dstIdx = baseImage.getPixelIndex(destX, destY);
        const { data } = this.bitmap;
        const avg = (data[idx + 0] + data[idx + 1] + data[idx + 2]) / 3;

        baseImage.bitmap.data[dstIdx + 3] *= avg / 255;
      }
    });

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  }
});
