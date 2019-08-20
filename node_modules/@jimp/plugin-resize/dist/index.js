"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("@jimp/utils");

var _resize = _interopRequireDefault(require("./modules/resize"));

var _resize2 = _interopRequireDefault(require("./modules/resize2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  return {
    constants: {
      RESIZE_NEAREST_NEIGHBOR: 'nearestNeighbor',
      RESIZE_BILINEAR: 'bilinearInterpolation',
      RESIZE_BICUBIC: 'bicubicInterpolation',
      RESIZE_HERMITE: 'hermiteInterpolation',
      RESIZE_BEZIER: 'bezierInterpolation'
    },
    class: {
      /**
       * Resizes the image to a set width and height using a 2-pass bilinear algorithm
       * @param {number} w the width to resize the image to (or Jimp.AUTO)
       * @param {number} h the height to resize the image to (or Jimp.AUTO)
       * @param {string} mode (optional) a scaling method (e.g. Jimp.RESIZE_BEZIER)
       * @param {function(Error, Jimp)} cb (optional) a callback for when complete
       * @returns {Jimp} this for chaining of methods
       */
      resize: function resize(w, h, mode, cb) {
        if (typeof w !== 'number' || typeof h !== 'number') {
          return _utils.throwError.call(this, 'w and h must be numbers', cb);
        }

        if (typeof mode === 'function' && typeof cb === 'undefined') {
          cb = mode;
          mode = null;
        }

        if (w === this.constructor.AUTO && h === this.constructor.AUTO) {
          return _utils.throwError.call(this, 'w and h cannot both be set to auto', cb);
        }

        if (w === this.constructor.AUTO) {
          w = this.bitmap.width * (h / this.bitmap.height);
        }

        if (h === this.constructor.AUTO) {
          h = this.bitmap.height * (w / this.bitmap.width);
        }

        if (w < 0 || h < 0) {
          return _utils.throwError.call(this, 'w and h must be positive numbers', cb);
        } // round inputs


        w = Math.round(w);
        h = Math.round(h);

        if (typeof _resize2.default[mode] === 'function') {
          var dst = {
            data: Buffer.alloc(w * h * 4),
            width: w,
            height: h
          };

          _resize2.default[mode](this.bitmap, dst);

          this.bitmap = dst;
        } else {
          var image = this;
          var resize = new _resize.default(this.bitmap.width, this.bitmap.height, w, h, true, true, function (buffer) {
            image.bitmap.data = Buffer.from(buffer);
            image.bitmap.width = w;
            image.bitmap.height = h;
          });
          resize.resize(this.bitmap.data);
        }

        if ((0, _utils.isNodePattern)(cb)) {
          cb.call(this, null, this);
        }

        return this;
      }
    }
  };
};

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=index.js.map