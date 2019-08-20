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
  event('crop', function(x, y, w, h, cb) {
    if (typeof x !== 'number' || typeof y !== 'number')
      return throwError.call(this, 'x and y must be numbers', cb);
    if (typeof w !== 'number' || typeof h !== 'number')
      return throwError.call(this, 'w and h must be numbers', cb);

    // round input
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);

    if (x === 0 && w === this.bitmap.width) {
      // shortcut
      const start = (w * y + x) << 2;
      const end = (start + h * w) << (2 + 1);

      this.bitmap.data = this.bitmap.data.slice(start, end);
    } else {
      const bitmap = Buffer.allocUnsafe(w * h * 4);
      let offset = 0;

      this.scanQuiet(x, y, w, h, function(x, y, idx) {
        const data = this.bitmap.data.readUInt32BE(idx, true);
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
      autocrop(...args) {
        const w = this.bitmap.width;
        const h = this.bitmap.height;
        const minPixelsPerSide = 1; // to avoid cropping completely the image, resulting in an invalid 0 sized image

        let cb; // callback
        let leaveBorder = 0; // Amount of pixels in border to leave
        let tolerance = 0.0002; // percent of color difference tolerance (default value)
        let cropOnlyFrames = true; // flag to force cropping only if the image has a real "frame"
        // i.e. all 4 sides have some border (default value)
        let cropSymmetric = false; // flag to force cropping top be symmetric.
        // i.e. north and south / east and west are cropped by the same value

        // parse arguments
        for (let a = 0, len = args.length; a < len; a++) {
          if (typeof args[a] === 'number') {
            // tolerance value passed
            tolerance = args[a];
          }

          if (typeof args[a] === 'boolean') {
            // cropOnlyFrames value passed
            cropOnlyFrames = args[a];
          }

          if (typeof args[a] === 'function') {
            // callback value passed
            cb = args[a];
          }

          if (typeof args[a] === 'object') {
            // config object passed
            const config = args[a];

            if (typeof config.tolerance !== 'undefined') {
              ({ tolerance } = config);
            }

            if (typeof config.cropOnlyFrames !== 'undefined') {
              ({ cropOnlyFrames } = config);
            }

            if (typeof config.cropSymmetric !== 'undefined') {
              ({ cropSymmetric } = config);
            }

            if (typeof config.leaveBorder !== 'undefined') {
              ({ leaveBorder } = config);
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
        let colorTarget = this.getPixelColor(0, 0); // top left pixel color is the target color
        const rgba1 = this.constructor.intToRGBA(colorTarget);

        // for north and east sides
        let northPixelsToCrop = 0;
        let eastPixelsToCrop = 0;
        let southPixelsToCrop = 0;
        let westPixelsToCrop = 0;

        // north side (scan rows from north to south)
        colorTarget = this.getPixelColor(0, 0);
        north: for (let y = 0; y < h - minPixelsPerSide; y++) {
          for (let x = 0; x < w; x++) {
            const colorXY = this.getPixelColor(x, y);
            const rgba2 = this.constructor.intToRGBA(colorXY);

            if (this.constructor.colorDiff(rgba1, rgba2) > tolerance) {
              // this pixel is too distant from the first one: abort this side scan
              break north;
            }
          }
          // this row contains all pixels with the same color: increment this side pixels to crop
          northPixelsToCrop++;
        }

        // east side (scan columns from east to west)
        colorTarget = this.getPixelColor(w, 0);
        east: for (let x = 0; x < w - minPixelsPerSide; x++) {
          for (let y = 0 + northPixelsToCrop; y < h; y++) {
            const colorXY = this.getPixelColor(x, y);
            const rgba2 = this.constructor.intToRGBA(colorXY);

            if (this.constructor.colorDiff(rgba1, rgba2) > tolerance) {
              // this pixel is too distant from the first one: abort this side scan
              break east;
            }
          }
          // this column contains all pixels with the same color: increment this side pixels to crop
          eastPixelsToCrop++;
        }

        // south side (scan rows from south to north)
        colorTarget = this.getPixelColor(0, h);
        south: for (
          let y = h - 1;
          y >= northPixelsToCrop + minPixelsPerSide;
          y--
        ) {
          for (let x = w - eastPixelsToCrop - 1; x >= 0; x--) {
            const colorXY = this.getPixelColor(x, y);
            const rgba2 = this.constructor.intToRGBA(colorXY);

            if (this.constructor.colorDiff(rgba1, rgba2) > tolerance) {
              // this pixel is too distant from the first one: abort this side scan
              break south;
            }
          }
          // this row contains all pixels with the same color: increment this side pixels to crop
          southPixelsToCrop++;
        }

        // west side (scan columns from west to east)
        colorTarget = this.getPixelColor(w, h);
        west: for (
          let x = w - 1;
          x >= 0 + eastPixelsToCrop + minPixelsPerSide;
          x--
        ) {
          for (let y = h - 1; y >= 0 + northPixelsToCrop; y--) {
            const colorXY = this.getPixelColor(x, y);
            const rgba2 = this.constructor.intToRGBA(colorXY);

            if (this.constructor.colorDiff(rgba1, rgba2) > tolerance) {
              // this pixel is too distant from the first one: abort this side scan
              break west;
            }
          }
          // this column contains all pixels with the same color: increment this side pixels to crop
          westPixelsToCrop++;
        }

        // decide if a crop is needed
        let doCrop = false;

        // apply leaveBorder
        westPixelsToCrop = westPixelsToCrop - leaveBorder;
        eastPixelsToCrop = eastPixelsToCrop - leaveBorder;
        northPixelsToCrop = northPixelsToCrop - leaveBorder;
        southPixelsToCrop = southPixelsToCrop - leaveBorder;

        if (cropSymmetric) {
          const horizontal = Math.min(eastPixelsToCrop, westPixelsToCrop);
          const vertical = Math.min(northPixelsToCrop, southPixelsToCrop);
          westPixelsToCrop = horizontal;
          eastPixelsToCrop = horizontal;
          northPixelsToCrop = vertical;
          southPixelsToCrop = vertical;
        }

        // safety checks
        const widthOfRemainingPixels =
          w - (westPixelsToCrop + eastPixelsToCrop);
        const heightOfRemainingPixels =
          h - (southPixelsToCrop + northPixelsToCrop);

        // make sure that crops are > 0
        westPixelsToCrop = westPixelsToCrop >= 0 ? westPixelsToCrop : 0;
        eastPixelsToCrop = eastPixelsToCrop >= 0 ? eastPixelsToCrop : 0;
        northPixelsToCrop = northPixelsToCrop >= 0 ? northPixelsToCrop : 0;
        southPixelsToCrop = southPixelsToCrop >= 0 ? southPixelsToCrop : 0;

        if (cropOnlyFrames) {
          // crop image if all sides should be cropped
          doCrop =
            eastPixelsToCrop !== 0 &&
            northPixelsToCrop !== 0 &&
            westPixelsToCrop !== 0 &&
            southPixelsToCrop !== 0;
        } else {
          // crop image if at least one side should be cropped
          doCrop =
            eastPixelsToCrop !== 0 ||
            northPixelsToCrop !== 0 ||
            westPixelsToCrop !== 0 ||
            southPixelsToCrop !== 0;
        }

        if (doCrop) {
          // do the real crop
          this.crop(
            eastPixelsToCrop,
            northPixelsToCrop,
            widthOfRemainingPixels,
            heightOfRemainingPixels
          );
        }

        if (isNodePattern(cb)) {
          cb.call(this, null, this);
        }

        return this;
      }
    }
  };
}
