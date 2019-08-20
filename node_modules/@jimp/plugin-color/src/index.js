import tinyColor from 'tinycolor2';
import { throwError, isNodePattern } from '@jimp/utils';

function applyKernel(im, kernel, x, y) {
  const value = [0, 0, 0];
  const size = (kernel.length - 1) / 2;

  for (let kx = 0; kx < kernel.length; kx += 1) {
    for (let ky = 0; ky < kernel[kx].length; ky += 1) {
      const idx = im.getPixelIndex(x + kx - size, y + ky - size);

      value[0] += im.bitmap.data[idx] * kernel[kx][ky];
      value[1] += im.bitmap.data[idx + 1] * kernel[kx][ky];
      value[2] += im.bitmap.data[idx + 2] * kernel[kx][ky];
    }
  }
  return value;
}

const isDef = v => typeof v !== 'undefined' && v !== null;

function greyscale(cb) {
  this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function(
    x,
    y,
    idx
  ) {
    const grey = parseInt(
      0.2126 * this.bitmap.data[idx] +
        0.7152 * this.bitmap.data[idx + 1] +
        0.0722 * this.bitmap.data[idx + 2],
      10
    );

    this.bitmap.data[idx] = grey;
    this.bitmap.data[idx + 1] = grey;
    this.bitmap.data[idx + 2] = grey;
  });

  if (isNodePattern(cb)) {
    cb.call(this, null, this);
  }

  return this;
}

function mix(clr, clr2, p = 50) {
  return {
    r: (clr2.r - clr.r) * (p / 100) + clr.r,
    g: (clr2.g - clr.g) * (p / 100) + clr.g,
    b: (clr2.b - clr.b) * (p / 100) + clr.b
  };
}

function colorFn(actions, cb) {
  if (!actions || !Array.isArray(actions)) {
    return throwError.call(this, 'actions must be an array', cb);
  }

  actions = actions.map(action => {
    if (action.apply === 'xor' || action.apply === 'mix') {
      action.params[0] = tinyColor(action.params[0]).toRgb();
    }

    return action;
  });

  this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, (x, y, idx) => {
    let clr = {
      r: this.bitmap.data[idx],
      g: this.bitmap.data[idx + 1],
      b: this.bitmap.data[idx + 2]
    };

    const colorModifier = (i, amount) =>
      this.constructor.limit255(clr[i] + amount);

    actions.forEach(action => {
      if (action.apply === 'mix') {
        clr = mix(clr, action.params[0], action.params[1]);
      } else if (action.apply === 'tint') {
        clr = mix(clr, { r: 255, g: 255, b: 255 }, action.params[0]);
      } else if (action.apply === 'shade') {
        clr = mix(clr, { r: 0, g: 0, b: 0 }, action.params[0]);
      } else if (action.apply === 'xor') {
        clr = {
          r: clr.r ^ action.params[0].r,
          g: clr.g ^ action.params[0].g,
          b: clr.b ^ action.params[0].b
        };
      } else if (action.apply === 'red') {
        clr.r = colorModifier('r', action.params[0]);
      } else if (action.apply === 'green') {
        clr.g = colorModifier('g', action.params[0]);
      } else if (action.apply === 'blue') {
        clr.b = colorModifier('b', action.params[0]);
      } else {
        if (action.apply === 'hue') {
          action.apply = 'spin';
        }

        clr = tinyColor(clr);

        if (!clr[action.apply]) {
          return throwError.call(
            this,
            'action ' + action.apply + ' not supported',
            cb
          );
        }

        clr = clr[action.apply](...action.params).toRgb();
      }
    });

    this.bitmap.data[idx] = clr.r;
    this.bitmap.data[idx + 1] = clr.g;
    this.bitmap.data[idx + 2] = clr.b;
  });

  if (isNodePattern(cb)) {
    cb.call(this, null, this);
  }

  return this;
}

export default () => ({
  /**
   * Adjusts the brightness of the image
   * @param {number} val the amount to adjust the brightness, a number between -1 and +1
   * @param {function(Error, Jimp)} cb (optional) a callback for when complete
   * @returns {Jimp }this for chaining of methods
   */
  brightness(val, cb) {
    if (typeof val !== 'number') {
      return throwError.call(this, 'val must be numbers', cb);
    }

    if (val < -1 || val > +1) {
      return throwError.call(
        this,
        'val must be a number between -1 and +1',
        cb
      );
    }

    this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function(
      x,
      y,
      idx
    ) {
      if (val < 0.0) {
        this.bitmap.data[idx] = this.bitmap.data[idx] * (1 + val);
        this.bitmap.data[idx + 1] = this.bitmap.data[idx + 1] * (1 + val);
        this.bitmap.data[idx + 2] = this.bitmap.data[idx + 2] * (1 + val);
      } else {
        this.bitmap.data[idx] =
          this.bitmap.data[idx] + (255 - this.bitmap.data[idx]) * val;
        this.bitmap.data[idx + 1] =
          this.bitmap.data[idx + 1] + (255 - this.bitmap.data[idx + 1]) * val;
        this.bitmap.data[idx + 2] =
          this.bitmap.data[idx + 2] + (255 - this.bitmap.data[idx + 2]) * val;
      }
    });

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  },

  /**
   * Adjusts the contrast of the image
   * @param {number} val the amount to adjust the contrast, a number between -1 and +1
   * @param {function(Error, Jimp)} cb (optional) a callback for when complete
   * @returns {Jimp }this for chaining of methods
   */
  contrast(val, cb) {
    if (typeof val !== 'number') {
      return throwError.call(this, 'val must be numbers', cb);
    }

    if (val < -1 || val > +1) {
      return throwError.call(
        this,
        'val must be a number between -1 and +1',
        cb
      );
    }

    const factor = (val + 1) / (1 - val);

    function adjust(value) {
      value = Math.floor(factor * (value - 127) + 127);

      return value < 0 ? 0 : value > 255 ? 255 : value;
    }

    this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function(
      x,
      y,
      idx
    ) {
      this.bitmap.data[idx] = adjust(this.bitmap.data[idx]);
      this.bitmap.data[idx + 1] = adjust(this.bitmap.data[idx + 1]);
      this.bitmap.data[idx + 2] = adjust(this.bitmap.data[idx + 2]);
    });

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  },

  /**
   * Apply a posterize effect
   * @param {number} n the amount to adjust the contrast, minimum threshold is two
   * @param {function(Error, Jimp)} cb (optional) a callback for when complete
   * @returns {Jimp }this for chaining of methods
   */
  posterize(n, cb) {
    if (typeof n !== 'number') {
      return throwError.call(this, 'n must be numbers', cb);
    }

    if (n < 2) {
      n = 2;
    } // minimum of 2 levels

    this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function(
      x,
      y,
      idx
    ) {
      this.bitmap.data[idx] =
        (Math.floor((this.bitmap.data[idx] / 255) * (n - 1)) / (n - 1)) * 255;
      this.bitmap.data[idx + 1] =
        (Math.floor((this.bitmap.data[idx + 1] / 255) * (n - 1)) / (n - 1)) *
        255;
      this.bitmap.data[idx + 2] =
        (Math.floor((this.bitmap.data[idx + 2] / 255) * (n - 1)) / (n - 1)) *
        255;
    });

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  },

  /**
   * Removes colour from the image using ITU Rec 709 luminance values
   * @param {function(Error, Jimp)} cb (optional) a callback for when complete
   * @returns {Jimp }this for chaining of methods
   */
  greyscale,

  // Alias of greyscale for our American friends
  grayscale: greyscale,

  /**
   * Multiplies the opacity of each pixel by a factor between 0 and 1
   * @param {number} f A number, the factor by which to multiply the opacity of each pixel
   * @param {function(Error, Jimp)} cb (optional) a callback for when complete
   * @returns {Jimp }this for chaining of methods
   */
  opacity(f, cb) {
    if (typeof f !== 'number')
      return throwError.call(this, 'f must be a number', cb);
    if (f < 0 || f > 1)
      return throwError.call(this, 'f must be a number from 0 to 1', cb);

    this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function(
      x,
      y,
      idx
    ) {
      const v = this.bitmap.data[idx + 3] * f;
      this.bitmap.data[idx + 3] = v;
    });

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  },

  /**
   * Applies a sepia tone to the image
   * @param {function(Error, Jimp)} cb (optional) a callback for when complete
   * @returns {Jimp }this for chaining of methods
   */
  sepia(cb) {
    this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function(
      x,
      y,
      idx
    ) {
      let red = this.bitmap.data[idx];
      let green = this.bitmap.data[idx + 1];
      let blue = this.bitmap.data[idx + 2];

      red = red * 0.393 + green * 0.769 + blue * 0.189;
      green = red * 0.349 + green * 0.686 + blue * 0.168;
      blue = red * 0.272 + green * 0.534 + blue * 0.131;

      this.bitmap.data[idx] = red < 255 ? red : 255;
      this.bitmap.data[idx + 1] = green < 255 ? green : 255;
      this.bitmap.data[idx + 2] = blue < 255 ? blue : 255;
    });

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  },

  /**
   * Fades each pixel by a factor between 0 and 1
   * @param {number} f A number from 0 to 1. 0 will haven no effect. 1 will turn the image completely transparent.
   * @param {function(Error, Jimp)} cb (optional) a callback for when complete
   * @returns {Jimp }this for chaining of methods
   */
  fade(f, cb) {
    if (typeof f !== 'number') {
      return throwError.call(this, 'f must be a number', cb);
    }

    if (f < 0 || f > 1) {
      return throwError.call(this, 'f must be a number from 0 to 1', cb);
    }

    // this method is an alternative to opacity (which may be deprecated)
    this.opacity(1 - f);

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  },

  /**
   * Adds each element of the image to its local neighbors, weighted by the kernel
   * @param {array} kernel a matrix to weight the neighbors sum
   * @param {string} edgeHandling (optional) define how to sum pixels from outside the border
   * @param {function(Error, Jimp)} cb (optional) a callback for when complete
   * @returns {Jimp }this for chaining of methods
   */
  convolution(kernel, edgeHandling, cb) {
    if (typeof edgeHandling === 'function' && typeof cb === 'undefined') {
      cb = edgeHandling;
      edgeHandling = null;
    }

    if (!edgeHandling) {
      edgeHandling = this.constructor.EDGE_EXTEND;
    }

    const newData = Buffer.from(this.bitmap.data);
    const kRows = kernel.length;
    const kCols = kernel[0].length;
    const rowEnd = Math.floor(kRows / 2);
    const colEnd = Math.floor(kCols / 2);
    const rowIni = -rowEnd;
    const colIni = -colEnd;

    let weight;
    let rSum;
    let gSum;
    let bSum;
    let ri;
    let gi;
    let bi;
    let xi;
    let yi;
    let idxi;

    this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function(
      x,
      y,
      idx
    ) {
      bSum = 0;
      gSum = 0;
      rSum = 0;

      for (let row = rowIni; row <= rowEnd; row++) {
        for (let col = colIni; col <= colEnd; col++) {
          xi = x + col;
          yi = y + row;
          weight = kernel[row + rowEnd][col + colEnd];
          idxi = this.getPixelIndex(xi, yi, edgeHandling);

          if (idxi === -1) {
            bi = 0;
            gi = 0;
            ri = 0;
          } else {
            ri = this.bitmap.data[idxi + 0];
            gi = this.bitmap.data[idxi + 1];
            bi = this.bitmap.data[idxi + 2];
          }

          rSum += weight * ri;
          gSum += weight * gi;
          bSum += weight * bi;
        }
      }

      if (rSum < 0) {
        rSum = 0;
      }

      if (gSum < 0) {
        gSum = 0;
      }

      if (bSum < 0) {
        bSum = 0;
      }

      if (rSum > 255) {
        rSum = 255;
      }

      if (gSum > 255) {
        gSum = 255;
      }

      if (bSum > 255) {
        bSum = 255;
      }

      newData[idx + 0] = rSum;
      newData[idx + 1] = gSum;
      newData[idx + 2] = bSum;
    });

    this.bitmap.data = newData;

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  },

  /**
   * Set the alpha channel on every pixel to fully opaque
   * @param {function(Error, Jimp)} cb (optional) a callback for when complete
   * @returns {Jimp }this for chaining of methods
   */
  opaque(cb) {
    this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function(
      x,
      y,
      idx
    ) {
      this.bitmap.data[idx + 3] = 255;
    });

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  },

  /**
   * Pixelates the image or a region
   * @param {number} size the size of the pixels
   * @param {number} x (optional) the x position of the region to pixelate
   * @param {number} y (optional) the y position of the region to pixelate
   * @param {number} w (optional) the width of the region to pixelate
   * @param {number} h (optional) the height of the region to pixelate
   * @param {function(Error, Jimp)} cb (optional) a callback for when complete
   * @returns {Jimp }this for chaining of methods
   */
  pixelate(size, x, y, w, h, cb) {
    if (typeof x === 'function') {
      cb = x;
      h = null;
      w = null;
      y = null;
      x = null;
    } else {
      if (typeof size !== 'number') {
        return throwError.call(this, 'size must be a number', cb);
      }

      if (isDef(x) && typeof x !== 'number') {
        return throwError.call(this, 'x must be a number', cb);
      }

      if (isDef(y) && typeof y !== 'number') {
        return throwError.call(this, 'y must be a number', cb);
      }

      if (isDef(w) && typeof w !== 'number') {
        return throwError.call(this, 'w must be a number', cb);
      }

      if (isDef(h) && typeof h !== 'number') {
        return throwError.call(this, 'h must be a number', cb);
      }
    }

    const kernel = [
      [1 / 16, 2 / 16, 1 / 16],
      [2 / 16, 4 / 16, 2 / 16],
      [1 / 16, 2 / 16, 1 / 16]
    ];

    x = x || 0;
    y = y || 0;
    w = isDef(w) ? w : this.bitmap.width - x;
    h = isDef(h) ? h : this.bitmap.height - y;

    const source = this.cloneQuiet();

    this.scanQuiet(x, y, w, h, function(xx, yx, idx) {
      xx = size * Math.floor(xx / size);
      yx = size * Math.floor(yx / size);

      const value = applyKernel(source, kernel, xx, yx);

      this.bitmap.data[idx] = value[0];
      this.bitmap.data[idx + 1] = value[1];
      this.bitmap.data[idx + 2] = value[2];
    });

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  },

  /**
   * Applies a convolution kernel to the image or a region
   * @param {array} kernel the convolution kernel
   * @param {number} x (optional) the x position of the region to apply convolution to
   * @param {number} y (optional) the y position of the region to apply convolution to
   * @param {number} w (optional) the width of the region to apply convolution to
   * @param {number} h (optional) the height of the region to apply convolution to
   * @param {function(Error, Jimp)} cb (optional) a callback for when complete
   * @returns {Jimp }this for chaining of methods
   */
  convolute(kernel, x, y, w, h, cb) {
    if (!Array.isArray(kernel))
      return throwError.call(this, 'the kernel must be an array', cb);

    if (typeof x === 'function') {
      cb = x;
      x = null;
      y = null;
      w = null;
      h = null;
    } else {
      if (isDef(x) && typeof x !== 'number') {
        return throwError.call(this, 'x must be a number', cb);
      }

      if (isDef(y) && typeof y !== 'number') {
        return throwError.call(this, 'y must be a number', cb);
      }

      if (isDef(w) && typeof w !== 'number') {
        return throwError.call(this, 'w must be a number', cb);
      }

      if (isDef(h) && typeof h !== 'number') {
        return throwError.call(this, 'h must be a number', cb);
      }
    }

    const ksize = (kernel.length - 1) / 2;

    x = isDef(x) ? x : ksize;
    y = isDef(y) ? y : ksize;
    w = isDef(w) ? w : this.bitmap.width - x;
    h = isDef(h) ? h : this.bitmap.height - y;

    const source = this.cloneQuiet();

    this.scanQuiet(x, y, w, h, function(xx, yx, idx) {
      const value = applyKernel(source, kernel, xx, yx);

      this.bitmap.data[idx] = this.constructor.limit255(value[0]);
      this.bitmap.data[idx + 1] = this.constructor.limit255(value[1]);
      this.bitmap.data[idx + 2] = this.constructor.limit255(value[2]);
    });

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  },

  /**
   * Apply multiple color modification rules
   * @param {array} actions list of color modification rules, in following format: { apply: '<rule-name>', params: [ <rule-parameters> ]  }
   * @param {function(Error, Jimp)} cb (optional) a callback for when complete
   * @returns {Jimp }this for chaining of methods
   */
  color: colorFn,
  colour: colorFn
});
