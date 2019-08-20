"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("@jimp/utils");

/**
 * Applies a true Gaussian blur to the image (warning: this is VERY slow)
 * @param {number} r the pixel radius of the blur
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */
var _default = function _default() {
  return {
    gaussian: function gaussian(r, cb) {
      // http://blog.ivank.net/fastest-gaussian-blur.html
      if (typeof r !== 'number') {
        return _utils.throwError.call(this, 'r must be a number', cb);
      }

      if (r < 1) {
        return _utils.throwError.call(this, 'r must be greater than 0', cb);
      }

      var rs = Math.ceil(r * 2.57); // significant radius

      var range = rs * 2 + 1;
      var rr2 = r * r * 2;
      var rr2pi = rr2 * Math.PI;
      var weights = [];

      for (var y = 0; y < range; y++) {
        weights[y] = [];

        for (var x = 0; x < range; x++) {
          var dsq = Math.pow(x - rs, 2) + Math.pow(y - rs, 2);
          weights[y][x] = Math.exp(-dsq / rr2) / rr2pi;
        }
      }

      for (var _y = 0; _y < this.bitmap.height; _y++) {
        for (var _x = 0; _x < this.bitmap.width; _x++) {
          var red = 0;
          var green = 0;
          var blue = 0;
          var alpha = 0;
          var wsum = 0;

          for (var iy = 0; iy < range; iy++) {
            for (var ix = 0; ix < range; ix++) {
              var x1 = Math.min(this.bitmap.width - 1, Math.max(0, ix + _x - rs));
              var y1 = Math.min(this.bitmap.height - 1, Math.max(0, iy + _y - rs));
              var weight = weights[iy][ix];

              var _idx = y1 * this.bitmap.width + x1 << 2;

              red += this.bitmap.data[_idx] * weight;
              green += this.bitmap.data[_idx + 1] * weight;
              blue += this.bitmap.data[_idx + 2] * weight;
              alpha += this.bitmap.data[_idx + 3] * weight;
              wsum += weight;
            }

            var idx = _y * this.bitmap.width + _x << 2;
            this.bitmap.data[idx] = Math.round(red / wsum);
            this.bitmap.data[idx + 1] = Math.round(green / wsum);
            this.bitmap.data[idx + 2] = Math.round(blue / wsum);
            this.bitmap.data[idx + 3] = Math.round(alpha / wsum);
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