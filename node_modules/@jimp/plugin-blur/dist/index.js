"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("@jimp/utils");

var _blurTables = require("./blur-tables");

/*
    Superfast Blur (0.5)
    http://www.quasimondo.com/BoxBlurForCanvas/FastBlur.js

    Copyright (c) 2011 Mario Klingemann

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
*/
var _default = function _default() {
  return {
    /**
     * A fast blur algorithm that produces similar effect to a Gaussian blur - but MUCH quicker
     * @param {number} r the pixel radius of the blur
     * @param {function(Error, Jimp)} cb (optional) a callback for when complete
     * @returns {Jimp} this for chaining of methods
     */
    blur: function blur(r, cb) {
      if (typeof r !== 'number') return _utils.throwError.call(this, 'r must be a number', cb);
      if (r < 1) return _utils.throwError.call(this, 'r must be greater than 0', cb);
      var rsum;
      var gsum;
      var bsum;
      var asum;
      var x;
      var y;
      var i;
      var p;
      var p1;
      var p2;
      var yp;
      var yi;
      var yw;
      var pa;
      var wm = this.bitmap.width - 1;
      var hm = this.bitmap.height - 1; // const wh = this.bitmap.width * this.bitmap.height;

      var rad1 = r + 1;
      var mulSum = _blurTables.mulTable[r];
      var shgSum = _blurTables.shgTable[r];
      var red = [];
      var green = [];
      var blue = [];
      var alpha = [];
      var vmin = [];
      var vmax = [];
      var iterations = 2;

      while (iterations-- > 0) {
        yi = 0;
        yw = 0;

        for (y = 0; y < this.bitmap.height; y++) {
          rsum = this.bitmap.data[yw] * rad1;
          gsum = this.bitmap.data[yw + 1] * rad1;
          bsum = this.bitmap.data[yw + 2] * rad1;
          asum = this.bitmap.data[yw + 3] * rad1;

          for (i = 1; i <= r; i++) {
            p = yw + ((i > wm ? wm : i) << 2);
            rsum += this.bitmap.data[p++];
            gsum += this.bitmap.data[p++];
            bsum += this.bitmap.data[p++];
            asum += this.bitmap.data[p];
          }

          for (x = 0; x < this.bitmap.width; x++) {
            red[yi] = rsum;
            green[yi] = gsum;
            blue[yi] = bsum;
            alpha[yi] = asum;

            if (y === 0) {
              vmin[x] = ((p = x + rad1) < wm ? p : wm) << 2;
              vmax[x] = (p = x - r) > 0 ? p << 2 : 0;
            }

            p1 = yw + vmin[x];
            p2 = yw + vmax[x];
            rsum += this.bitmap.data[p1++] - this.bitmap.data[p2++];
            gsum += this.bitmap.data[p1++] - this.bitmap.data[p2++];
            bsum += this.bitmap.data[p1++] - this.bitmap.data[p2++];
            asum += this.bitmap.data[p1] - this.bitmap.data[p2];
            yi++;
          }

          yw += this.bitmap.width << 2;
        }

        for (x = 0; x < this.bitmap.width; x++) {
          yp = x;
          rsum = red[yp] * rad1;
          gsum = green[yp] * rad1;
          bsum = blue[yp] * rad1;
          asum = alpha[yp] * rad1;

          for (i = 1; i <= r; i++) {
            yp += i > hm ? 0 : this.bitmap.width;
            rsum += red[yp];
            gsum += green[yp];
            bsum += blue[yp];
            asum += alpha[yp];
          }

          yi = x << 2;

          for (y = 0; y < this.bitmap.height; y++) {
            pa = asum * mulSum >>> shgSum;
            this.bitmap.data[yi + 3] = pa; // normalize alpha

            if (pa > 255) {
              this.bitmap.data[yi + 3] = 255;
            }

            if (pa > 0) {
              pa = 255 / pa;
              this.bitmap.data[yi] = (rsum * mulSum >>> shgSum) * pa;
              this.bitmap.data[yi + 1] = (gsum * mulSum >>> shgSum) * pa;
              this.bitmap.data[yi + 2] = (bsum * mulSum >>> shgSum) * pa;
            } else {
              this.bitmap.data[yi + 2] = 0;
              this.bitmap.data[yi + 1] = 0;
              this.bitmap.data[yi] = 0;
            }

            if (x === 0) {
              vmin[y] = ((p = y + rad1) < hm ? p : hm) * this.bitmap.width;
              vmax[y] = (p = y - r) > 0 ? p * this.bitmap.width : 0;
            }

            p1 = x + vmin[y];
            p2 = x + vmax[y];
            rsum += red[p1] - red[p2];
            gsum += green[p1] - green[p2];
            bsum += blue[p1] - blue[p2];
            asum += alpha[p1] - alpha[p2];
            yi += this.bitmap.width << 2;
          }
        }
      }

      if ((0, _utils.isNodePattern)(cb)) {
        cb.call(this, null, this);
      }

      return this;
    }
  };
};

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=index.js.map