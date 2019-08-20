import { throwError, isNodePattern } from '@jimp/utils';
import Resize from './modules/resize';
import Resize2 from './modules/resize2';
export default (function () {
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
          return throwError.call(this, 'w and h must be numbers', cb);
        }

        if (typeof mode === 'function' && typeof cb === 'undefined') {
          cb = mode;
          mode = null;
        }

        if (w === this.constructor.AUTO && h === this.constructor.AUTO) {
          return throwError.call(this, 'w and h cannot both be set to auto', cb);
        }

        if (w === this.constructor.AUTO) {
          w = this.bitmap.width * (h / this.bitmap.height);
        }

        if (h === this.constructor.AUTO) {
          h = this.bitmap.height * (w / this.bitmap.width);
        }

        if (w < 0 || h < 0) {
          return throwError.call(this, 'w and h must be positive numbers', cb);
        } // round inputs


        w = Math.round(w);
        h = Math.round(h);

        if (typeof Resize2[mode] === 'function') {
          var dst = {
            data: Buffer.alloc(w * h * 4),
            width: w,
            height: h
          };
          Resize2[mode](this.bitmap, dst);
          this.bitmap = dst;
        } else {
          var image = this;
          var resize = new Resize(this.bitmap.width, this.bitmap.height, w, h, true, true, function (buffer) {
            image.bitmap.data = Buffer.from(buffer);
            image.bitmap.width = w;
            image.bitmap.height = h;
          });
          resize.resize(this.bitmap.data);
        }

        if (isNodePattern(cb)) {
          cb.call(this, null, this);
        }

        return this;
      }
    }
  };
});
//# sourceMappingURL=index.js.map