"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("@jimp/utils");

var _default = function _default() {
  return {
    /**
     * Uniformly scales the image by a factor.
     * @param {number} f the factor to scale the image by
     * @param {string} mode (optional) a scaling method (e.g. Jimp.RESIZE_BEZIER)
     * @param {function(Error, Jimp)} cb (optional) a callback for when complete
     * @returns {Jimp} this for chaining of methods
     */
    scale: function scale(f, mode, cb) {
      if (typeof f !== 'number') {
        return _utils.throwError.call(this, 'f must be a number', cb);
      }

      if (f < 0) {
        return _utils.throwError.call(this, 'f must be a positive number', cb);
      }

      if (typeof mode === 'function' && typeof cb === 'undefined') {
        cb = mode;
        mode = null;
      }

      var w = this.bitmap.width * f;
      var h = this.bitmap.height * f;
      this.resize(w, h, mode);

      if ((0, _utils.isNodePattern)(cb)) {
        cb.call(this, null, this);
      }

      return this;
    },

    /**
     * Scale the image to the largest size that fits inside the rectangle that has the given width and height.
     * @param {number} w the width to resize the image to
     * @param {number} h the height to resize the image to
     * @param {string} mode (optional) a scaling method (e.g. Jimp.RESIZE_BEZIER)
     * @param {function(Error, Jimp)} cb (optional) a callback for when complete
     * @returns {Jimp} this for chaining of methods
     */
    scaleToFit: function scaleToFit(w, h, mode, cb) {
      if (typeof w !== 'number' || typeof h !== 'number') {
        return _utils.throwError.call(this, 'w and h must be numbers', cb);
      }

      if (typeof mode === 'function' && typeof cb === 'undefined') {
        cb = mode;
        mode = null;
      }

      var f = w / h > this.bitmap.width / this.bitmap.height ? h / this.bitmap.height : w / this.bitmap.width;
      this.scale(f, mode);

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