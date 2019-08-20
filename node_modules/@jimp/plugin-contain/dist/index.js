"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("@jimp/utils");

/**
 * Scale the image to the given width and height keeping the aspect ratio. Some parts of the image may be letter boxed.
 * @param {number} w the width to resize the image to
 * @param {number} h the height to resize the image to
 * @param {number} alignBits (optional) A bitmask for horizontal and vertical alignment
 * @param {string} mode (optional) a scaling method (e.g. Jimp.RESIZE_BEZIER)
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */
var _default = function _default() {
  return {
    contain: function contain(w, h, alignBits, mode, cb) {
      if (typeof w !== 'number' || typeof h !== 'number') {
        return _utils.throwError.call(this, 'w and h must be numbers', cb);
      } // permit any sort of optional parameters combination


      if (typeof alignBits === 'string') {
        if (typeof mode === 'function' && typeof cb === 'undefined') cb = mode;
        mode = alignBits;
        alignBits = null;
      }

      if (typeof alignBits === 'function') {
        if (typeof cb === 'undefined') cb = alignBits;
        mode = null;
        alignBits = null;
      }

      if (typeof mode === 'function' && typeof cb === 'undefined') {
        cb = mode;
        mode = null;
      }

      alignBits = alignBits || this.constructor.HORIZONTAL_ALIGN_CENTER | this.constructor.VERTICAL_ALIGN_MIDDLE;
      var hbits = alignBits & (1 << 3) - 1;
      var vbits = alignBits >> 3; // check if more flags than one is in the bit sets

      if (!(hbits !== 0 && !(hbits & hbits - 1) || vbits !== 0 && !(vbits & vbits - 1))) {
        return _utils.throwError.call(this, 'only use one flag per alignment direction', cb);
      }

      var alignH = hbits >> 1; // 0, 1, 2

      var alignV = vbits >> 1; // 0, 1, 2

      var f = w / h > this.bitmap.width / this.bitmap.height ? h / this.bitmap.height : w / this.bitmap.width;
      var c = this.cloneQuiet().scale(f, mode);
      this.resize(w, h, mode);
      this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function (x, y, idx) {
        this.bitmap.data.writeUInt32BE(this._background, idx);
      });
      this.blit(c, (this.bitmap.width - c.bitmap.width) / 2 * alignH, (this.bitmap.height - c.bitmap.height) / 2 * alignV);

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