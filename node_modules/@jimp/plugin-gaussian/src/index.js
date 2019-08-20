import { isNodePattern, throwError } from '@jimp/utils';

/**
 * Applies a true Gaussian blur to the image (warning: this is VERY slow)
 * @param {number} r the pixel radius of the blur
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */
export default () => ({
  gaussian(r, cb) {
    // http://blog.ivank.net/fastest-gaussian-blur.html
    if (typeof r !== 'number') {
      return throwError.call(this, 'r must be a number', cb);
    }

    if (r < 1) {
      return throwError.call(this, 'r must be greater than 0', cb);
    }

    const rs = Math.ceil(r * 2.57); // significant radius
    const range = rs * 2 + 1;
    const rr2 = r * r * 2;
    const rr2pi = rr2 * Math.PI;

    const weights = [];

    for (let y = 0; y < range; y++) {
      weights[y] = [];
      for (let x = 0; x < range; x++) {
        const dsq = (x - rs) ** 2 + (y - rs) ** 2 ;
        weights[y][x] = Math.exp(-dsq / rr2) / rr2pi;
      }
    }

    for (let y = 0; y < this.bitmap.height; y++) {
      for (let x = 0; x < this.bitmap.width; x++) {
        let red = 0;
        let green = 0;
        let blue = 0;
        let alpha = 0;
        let wsum = 0;

        for (let iy = 0; iy < range; iy++) {
          for (let ix = 0; ix < range; ix++) {
            const x1 = Math.min(this.bitmap.width - 1, Math.max(0, ix + x - rs ));
            const y1 = Math.min(this.bitmap.height - 1, Math.max(0, iy + y - rs));
            const weight = weights[iy][ix];
            const idx = (y1 * this.bitmap.width + x1) << 2;

            red += this.bitmap.data[idx] * weight;
            green += this.bitmap.data[idx + 1] * weight;
            blue += this.bitmap.data[idx + 2] * weight;
            alpha += this.bitmap.data[idx + 3] * weight;
            wsum += weight;
          }

          const idx = (y * this.bitmap.width + x) << 2;

          this.bitmap.data[idx] = Math.round(red / wsum);
          this.bitmap.data[idx + 1] = Math.round(green / wsum);
          this.bitmap.data[idx + 2] = Math.round(blue / wsum);
          this.bitmap.data[idx + 3] = Math.round(alpha / wsum);
        }
      }
    }

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  }
});
