import { isNodePattern } from '@jimp/utils';

/**
 * Inverts the image
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */
export default () => ({
  invert(cb) {
    this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function(
      x,
      y,
      idx
    ) {
      this.bitmap.data[idx] = 255 - this.bitmap.data[idx];
      this.bitmap.data[idx + 1] = 255 - this.bitmap.data[idx + 1];
      this.bitmap.data[idx + 2] = 255 - this.bitmap.data[idx + 2];
    });

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  }
});
