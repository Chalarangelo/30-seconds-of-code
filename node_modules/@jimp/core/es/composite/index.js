import { isNodePattern, throwError } from '@jimp/utils';
import * as constants from '../constants';
import * as compositeModes from './composite-modes';
/**
 * Composites a source image over to this image respecting alpha channels
 * @param {Jimp} src the source Jimp instance
 * @param {number} x the x position to blit the image
 * @param {number} y the y position to blit the image
 * @param {object} options determine what mode to use
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */

export default function composite(src, x, y) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var cb = arguments.length > 4 ? arguments[4] : undefined;

  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  if (!(src instanceof this.constructor)) {
    return throwError.call(this, 'The source must be a Jimp image', cb);
  }

  if (typeof x !== 'number' || typeof y !== 'number') {
    return throwError.call(this, 'x and y must be numbers', cb);
  }

  var _options = options,
      mode = _options.mode,
      opacitySource = _options.opacitySource,
      opacityDest = _options.opacityDest;

  if (!mode) {
    mode = constants.BLEND_SOURCE_OVER;
  }

  if (typeof opacitySource !== 'number' || opacitySource < 0 || opacitySource > 1) {
    opacitySource = 1.0;
  }

  if (typeof opacityDest !== 'number' || opacityDest < 0 || opacityDest > 1) {
    opacityDest = 1.0;
  }

  var blendmode = compositeModes[mode]; // round input

  x = Math.round(x);
  y = Math.round(y);
  var baseImage = this;

  if (opacityDest !== 1.0) {
    baseImage.opacity(opacityDest);
  }

  src.scanQuiet(0, 0, src.bitmap.width, src.bitmap.height, function (sx, sy, idx) {
    var dstIdx = baseImage.getPixelIndex(x + sx, y + sy, constants.EDGE_CROP);
    var blended = blendmode({
      r: this.bitmap.data[idx + 0] / 255,
      g: this.bitmap.data[idx + 1] / 255,
      b: this.bitmap.data[idx + 2] / 255,
      a: this.bitmap.data[idx + 3] / 255
    }, {
      r: baseImage.bitmap.data[dstIdx + 0] / 255,
      g: baseImage.bitmap.data[dstIdx + 1] / 255,
      b: baseImage.bitmap.data[dstIdx + 2] / 255,
      a: baseImage.bitmap.data[dstIdx + 3] / 255
    }, opacitySource);
    baseImage.bitmap.data[dstIdx + 0] = this.constructor.limit255(blended.r * 255);
    baseImage.bitmap.data[dstIdx + 1] = this.constructor.limit255(blended.g * 255);
    baseImage.bitmap.data[dstIdx + 2] = this.constructor.limit255(blended.b * 255);
    baseImage.bitmap.data[dstIdx + 3] = this.constructor.limit255(blended.a * 255);
  });

  if (isNodePattern(cb)) {
    cb.call(this, null, this);
  }

  return this;
}
//# sourceMappingURL=index.js.map