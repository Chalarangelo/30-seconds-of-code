/* eslint-disable no-labels */

import { isNodePattern } from '@jimp/utils';

/**
 * Get an image's histogram
 * @return {object} An object with an array of color occurrence counts for each channel (r,g,b)
 */
function histogram() {
  const histogram = {
    r: new Array(256).fill(0),
    g: new Array(256).fill(0),
    b: new Array(256).fill(0)
  };

  this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function(
    x,
    y,
    index
  ) {
    histogram.r[this.bitmap.data[index + 0]]++;
    histogram.g[this.bitmap.data[index + 1]]++;
    histogram.b[this.bitmap.data[index + 2]]++;
  });

  return histogram;
}

/**
 * Normalize values
 * @param  {integer} value Pixel channel value.
 * @param  {integer} min   Minimum value for channel
 * @param  {integer} max   Maximum value for channel
 * @return {integer} normalized values
 */
const normalize = function(value, min, max) {
  return ((value - min) * 255) / (max - min);
};

const getBounds = function(histogramChannel) {
  return [
    histogramChannel.findIndex(value => value > 0),
    255 -
      histogramChannel
        .slice()
        .reverse()
        .findIndex(value => value > 0)
  ];
};

/**
 * Normalizes the image
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */
export default () => ({
  normalize(cb) {
    const h = histogram.call(this);

    // store bounds (minimum and maximum values)
    const bounds = {
      r: getBounds(h.r),
      g: getBounds(h.g),
      b: getBounds(h.b)
    };

    // apply value transformations
    this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function(
      x,
      y,
      idx
    ) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];

      this.bitmap.data[idx + 0] = normalize(r, bounds.r[0], bounds.r[1]);
      this.bitmap.data[idx + 1] = normalize(g, bounds.g[0], bounds.g[1]);
      this.bitmap.data[idx + 2] = normalize(b, bounds.b[0], bounds.b[1]);
    });

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  }
});
