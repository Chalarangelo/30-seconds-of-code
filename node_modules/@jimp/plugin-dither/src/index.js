import { isNodePattern } from '@jimp/utils';

/**
 * Apply a ordered dithering effect
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */
function dither(cb) {
  const rgb565Matrix = [1, 9, 3, 11, 13, 5, 15, 7, 4, 12, 2, 10, 16, 8, 14, 6];
  this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function(
    x,
    y,
    idx
  ) {
    const thresholdId = ((y & 3) << 2) + (x % 4);
    const dither = rgb565Matrix[thresholdId];
    this.bitmap.data[idx] = Math.min(this.bitmap.data[idx] + dither, 0xff);
    this.bitmap.data[idx + 1] = Math.min(
      this.bitmap.data[idx + 1] + dither,
      0xff
    );
    this.bitmap.data[idx + 2] = Math.min(
      this.bitmap.data[idx + 2] + dither,
      0xff
    );
  });

  if (isNodePattern(cb)) {
    cb.call(this, null, this);
  }

  return this;
}

export default () => ({
  dither565: dither,
  dither16: dither
});
