function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable no-labels */
import { throwError, isNodePattern } from '@jimp/utils';
export default function pluginCrop(event) {
  /**
   * Crops the image at a given point to a give size
   * @param {number} x the x coordinate to crop form
   * @param {number} y the y coordinate to crop form
   * @param w the width of the crop region
   * @param h the height of the crop region
   * @param {function(Error, Jimp)} cb (optional) a callback for when complete
   * @returns {Jimp} this for chaining of methods
   */
  event('crop', function (x, y, w, h, cb) {
    if (typeof x !== 'number' || typeof y !== 'number') return throwError.call(this, 'x and y must be numbers', cb);
    if (typeof w !== 'number' || typeof h !== 'number') return throwError.call(this, 'w and h must be numbers', cb); // round input

    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);

    if (x === 0 && w === this.bitmap.width) {
      // shortcut
      var start = w * y + x << 2;
      var end = start + h * w << 2 + 1;
      this.bitmap.data = this.bitmap.data.slice(start, end);
    } else {
      var bitmap = Buffer.allocUnsafe(w * h * 4);
      var offset = 0;
      this.scanQuiet(x, y, w, h, function (x, y, idx) {
        var data = this.bitmap.data.readUInt32BE(idx, true);
        bitmap.writeUInt32BE(data, offset, true);
        offset += 4;
      });
      this.bitmap.data = bitmap;
    }

    this.bitmap.width = w;
    this.bitmap.height = h;

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  });
  return {
    class: {
      /**
       * Autocrop same color borders from this image
       * @param {number} tolerance (optional): a percent value of tolerance for pixels color difference (default: 0.0002%)
       * @param {boolean} cropOnlyFrames (optional): flag to crop only real frames: all 4 sides of the image must have some border (default: true)
       * @param {function(Error, Jimp)} cb (optional): a callback for when complete (default: no callback)
       * @returns {Jimp} this for chaining of methods
       */
      autocrop: function autocrop() {
        var w = this.bitmap.width;
        var h = this.bitmap.height;
        var minPixelsPerSide = 1; // to avoid cropping completely the image, resulting in an invalid 0 sized image

        var cb; // callback

        var leaveBorder = 0; // Amount of pixels in border to leave

        var tolerance = 0.0002; // percent of color difference tolerance (default value)

        var cropOnlyFrames = true; // flag to force cropping only if the image has a real "frame"
        // i.e. all 4 sides have some border (default value)

        var cropSymmetric = false; // flag to force cropping top be symmetric.
        // i.e. north and south / east and west are cropped by the same value
        // parse arguments

        for (var a = 0, len = arguments.length; a < len; a++) {
          if (typeof (a < 0 || arguments.length <= a ? undefined : arguments[a]) === 'number') {
            // tolerance value passed
            tolerance = a < 0 || arguments.length <= a ? undefined : arguments[a];
          }

          if (typeof (a < 0 || arguments.length <= a ? undefined : arguments[a]) === 'boolean') {
            // cropOnlyFrames value passed
            cropOnlyFrames = a < 0 || arguments.length <= a ? undefined : arguments[a];
          }

          if (typeof (a < 0 || arguments.length <= a ? undefined : arguments[a]) === 'function') {
            // callback value passed
            cb = a < 0 || arguments.length <= a ? undefined : arguments[a];
          }

          if (_typeof(a < 0 || arguments.length <= a ? undefined : arguments[a]) === 'object') {
            // config object passed
            var config = a < 0 || arguments.length <= a ? undefined : arguments[a];

            if (typeof config.tolerance !== 'undefined') {
              tolerance = config.tolerance;
            }

            if (typeof config.cropOnlyFrames !== 'undefined') {
              cropOnlyFrames = config.cropOnlyFrames;
            }

            if (typeof config.cropSymmetric !== 'undefined') {
              cropSymmetric = config.cropSymmetric;
            }

            if (typeof config.leaveBorder !== 'undefined') {
              leaveBorder = config.leaveBorder;
            }
          }
        }
        /**
         * All borders must be of the same color as the top left pixel, to be cropped.
         * It should be possible to crop borders each with a different color,
         * but since there are many ways for corners to intersect, it would
         * introduce unnecessary complexity to the algorithm.
         */
        // scan each side for same color borders


        var colorTarget = this.getPixelColor(0, 0); // top left pixel color is the target color

        var rgba1 = this.constructor.intToRGBA(colorTarget); // for north and east sides

        var northPixelsToCrop = 0;
        var eastPixelsToCrop = 0;
        var southPixelsToCrop = 0;
        var westPixelsToCrop = 0; // north side (scan rows from north to south)

        colorTarget = this.getPixelColor(0, 0);

        north: for (var y = 0; y < h - minPixelsPerSide; y++) {
          for (var x = 0; x < w; x++) {
            var colorXY = this.getPixelColor(x, y);
            var rgba2 = this.constructor.intToRGBA(colorXY);

            if (this.constructor.colorDiff(rgba1, rgba2) > tolerance) {
              // this pixel is too distant from the first one: abort this side scan
              break north;
            }
          } // this row contains all pixels with the same color: increment this side pixels to crop


          northPixelsToCrop++;
        } // east side (scan columns from east to west)


        colorTarget = this.getPixelColor(w, 0);

        east: for (var _x = 0; _x < w - minPixelsPerSide; _x++) {
          for (var _y = 0 + northPixelsToCrop; _y < h; _y++) {
            var _colorXY = this.getPixelColor(_x, _y);

            var _rgba = this.constructor.intToRGBA(_colorXY);

            if (this.constructor.colorDiff(rgba1, _rgba) > tolerance) {
              // this pixel is too distant from the first one: abort this side scan
              break east;
            }
          } // this column contains all pixels with the same color: increment this side pixels to crop


          eastPixelsToCrop++;
        } // south side (scan rows from south to north)


        colorTarget = this.getPixelColor(0, h);

        south: for (var _y2 = h - 1; _y2 >= northPixelsToCrop + minPixelsPerSide; _y2--) {
          for (var _x2 = w - eastPixelsToCrop - 1; _x2 >= 0; _x2--) {
            var _colorXY2 = this.getPixelColor(_x2, _y2);

            var _rgba2 = this.constructor.intToRGBA(_colorXY2);

            if (this.constructor.colorDiff(rgba1, _rgba2) > tolerance) {
              // this pixel is too distant from the first one: abort this side scan
              break south;
            }
          } // this row contains all pixels with the same color: increment this side pixels to crop


          southPixelsToCrop++;
        } // west side (scan columns from west to east)


        colorTarget = this.getPixelColor(w, h);

        west: for (var _x3 = w - 1; _x3 >= 0 + eastPixelsToCrop + minPixelsPerSide; _x3--) {
          for (var _y3 = h - 1; _y3 >= 0 + northPixelsToCrop; _y3--) {
            var _colorXY3 = this.getPixelColor(_x3, _y3);

            var _rgba3 = this.constructor.intToRGBA(_colorXY3);

            if (this.constructor.colorDiff(rgba1, _rgba3) > tolerance) {
              // this pixel is too distant from the first one: abort this side scan
              break west;
            }
          } // this column contains all pixels with the same color: increment this side pixels to crop


          westPixelsToCrop++;
        } // decide if a crop is needed


        var doCrop = false; // apply leaveBorder

        westPixelsToCrop = westPixelsToCrop - leaveBorder;
        eastPixelsToCrop = eastPixelsToCrop - leaveBorder;
        northPixelsToCrop = northPixelsToCrop - leaveBorder;
        southPixelsToCrop = southPixelsToCrop - leaveBorder;

        if (cropSymmetric) {
          var horizontal = Math.min(eastPixelsToCrop, westPixelsToCrop);
          var vertical = Math.min(northPixelsToCrop, southPixelsToCrop);
          westPixelsToCrop = horizontal;
          eastPixelsToCrop = horizontal;
          northPixelsToCrop = vertical;
          southPixelsToCrop = vertical;
        } // safety checks


        var widthOfRemainingPixels = w - (westPixelsToCrop + eastPixelsToCrop);
        var heightOfRemainingPixels = h - (southPixelsToCrop + northPixelsToCrop); // make sure that crops are > 0

        westPixelsToCrop = westPixelsToCrop >= 0 ? westPixelsToCrop : 0;
        eastPixelsToCrop = eastPixelsToCrop >= 0 ? eastPixelsToCrop : 0;
        northPixelsToCrop = northPixelsToCrop >= 0 ? northPixelsToCrop : 0;
        southPixelsToCrop = southPixelsToCrop >= 0 ? southPixelsToCrop : 0;

        if (cropOnlyFrames) {
          // crop image if all sides should be cropped
          doCrop = eastPixelsToCrop !== 0 && northPixelsToCrop !== 0 && westPixelsToCrop !== 0 && southPixelsToCrop !== 0;
        } else {
          // crop image if at least one side should be cropped
          doCrop = eastPixelsToCrop !== 0 || northPixelsToCrop !== 0 || westPixelsToCrop !== 0 || southPixelsToCrop !== 0;
        }

        if (doCrop) {
          // do the real crop
          this.crop(eastPixelsToCrop, northPixelsToCrop, widthOfRemainingPixels, heightOfRemainingPixels);
        }

        if (isNodePattern(cb)) {
          cb.call(this, null, this);
        }

        return this;
      }
    }
  };
}
//# sourceMappingURL=index.js.map