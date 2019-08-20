import { isNodePattern, throwError } from '@jimp/utils';
/**
 * Flip the image horizontally
 * @param {boolean} horizontal a Boolean, if true the image will be flipped horizontally
 * @param {boolean} vertical a Boolean, if true the image will be flipped vertically
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */

function flipFn(horizontal, vertical, cb) {
  if (typeof horizontal !== 'boolean' || typeof vertical !== 'boolean') return throwError.call(this, 'horizontal and vertical must be Booleans', cb);

  if (horizontal && vertical) {
    // shortcut
    return this.rotate(180, true, cb);
  }

  var bitmap = Buffer.alloc(this.bitmap.data.length);
  this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function (x, y, idx) {
    var _x = horizontal ? this.bitmap.width - 1 - x : x;

    var _y = vertical ? this.bitmap.height - 1 - y : y;

    var _idx = this.bitmap.width * _y + _x << 2;

    var data = this.bitmap.data.readUInt32BE(idx);
    bitmap.writeUInt32BE(data, _idx);
  });
  this.bitmap.data = Buffer.from(bitmap);

  if (isNodePattern(cb)) {
    cb.call(this, null, this);
  }

  return this;
}

export default (function () {
  return {
    flip: flipFn,
    mirror: flipFn
  };
});
//# sourceMappingURL=index.js.map