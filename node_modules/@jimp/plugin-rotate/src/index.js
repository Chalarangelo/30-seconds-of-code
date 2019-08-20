import { throwError, isNodePattern } from '@jimp/utils';

function rotate90degrees(bitmap, dstBuffer, clockwise) {
  const dstOffsetStep = clockwise ? -4 : 4;
  let dstOffset = clockwise ? dstBuffer.length - 4 : 0;

  let tmp;
  let x;
  let y;
  let srcOffset;

  for (x = 0; x < bitmap.width; x++) {
    for (y = bitmap.height - 1; y >= 0; y--) {
      srcOffset = (bitmap.width * y + x) << 2;
      tmp = bitmap.data.readUInt32BE(srcOffset, true);
      dstBuffer.writeUInt32BE(tmp, dstOffset, true);
      dstOffset += dstOffsetStep;
    }
  }
}

/**
 * Rotates an image clockwise by an arbitrary number of degrees. NB: 'this' must be a Jimp object.
 * @param {number} deg the number of degrees to rotate the image by
 * @param {string|boolean} mode (optional) resize mode or a boolean, if false then the width and height of the image will not be changed
 */
function advancedRotate(deg, mode) {
  deg %= 360;
  const rad = (deg * Math.PI) / 180;
  const cosine = Math.cos(rad);
  const sine = Math.sin(rad);

  // the final width and height will change if resize == true
  let w = this.bitmap.width;
  let h = this.bitmap.height;

  if (mode === true || typeof mode === 'string') {
    // resize the image to it maximum dimension and blit the existing image
    // onto the center so that when it is rotated the image is kept in bounds

    // http://stackoverflow.com/questions/3231176/how-to-get-size-of-a-rotated-rectangle
    // Plus 1 border pixel to ensure to show all rotated result for some cases.
    w =
      Math.ceil(
        Math.abs(this.bitmap.width * cosine) +
          Math.abs(this.bitmap.height * sine)
      ) + 1;
    h =
      Math.ceil(
        Math.abs(this.bitmap.width * sine) +
          Math.abs(this.bitmap.height * cosine)
      ) + 1;
    // Ensure destination to have even size to a better result.
    if (w % 2 !== 0) {
      w++;
    }

    if (h % 2 !== 0) {
      h++;
    }

    const c = this.cloneQuiet();
    this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function(
      x,
      y,
      idx
    ) {
      this.bitmap.data.writeUInt32BE(this._background, idx);
    });

    const max = Math.max(w, h, this.bitmap.width, this.bitmap.height);
    this.resize(max, max, mode);

    this.blit(
      c,
      this.bitmap.width / 2 - c.bitmap.width / 2,
      this.bitmap.height / 2 - c.bitmap.height / 2
    );
  }

  const bW = this.bitmap.width;
  const bH = this.bitmap.height;
  const dstBuffer = Buffer.alloc(this.bitmap.data.length);

  function createTranslationFunction(deltaX, deltaY) {
    return function(x, y) {
      return {
        x: x + deltaX,
        y: y + deltaY
      };
    };
  }

  const translate2Cartesian = createTranslationFunction(-(bW / 2), -(bH / 2));
  const translate2Screen = createTranslationFunction(
    bW / 2 + 0.5,
    bH / 2 + 0.5
  );

  for (let y = 1; y <= bH; y++) {
    for (let x = 1; x <= bW; x++) {
      const cartesian = translate2Cartesian(x, y);
      const source = translate2Screen(
        cosine * cartesian.x - sine * cartesian.y,
        cosine * cartesian.y + sine * cartesian.x
      );
      const dstIdx = (bW * (y - 1) + x - 1) << 2;

      if (source.x >= 0 && source.x < bW && source.y >= 0 && source.y < bH) {
        const srcIdx = ((bW * (source.y | 0) + source.x) | 0) << 2;
        const pixelRGBA = this.bitmap.data.readUInt32BE(srcIdx);
        dstBuffer.writeUInt32BE(pixelRGBA, dstIdx);
      } else {
        // reset off-image pixels
        dstBuffer.writeUInt32BE(this._background, dstIdx);
      }
    }
  }
  this.bitmap.data = dstBuffer;

  if (mode === true || typeof mode === 'string') {
    // now crop the image to the final size
    const x = bW / 2 - w / 2;
    const y = bH / 2 - h / 2;
    this.crop(x, y, w, h);
  }
}

export default () => ({
  /**
   * Rotates the image clockwise by a number of degrees. By default the width and height of the image will be resized appropriately.
   * @param {number} deg the number of degrees to rotate the image by
   * @param {string|boolean} mode (optional) resize mode or a boolean, if false then the width and height of the image will not be changed
   * @param {function(Error, Jimp)} cb (optional) a callback for when complete
   * @returns {Jimp} this for chaining of methods
   */
  rotate(deg, mode, cb) {
    // enable overloading
    if (typeof mode === 'undefined' || mode === null) {
      // e.g. image.resize(120);
      // e.g. image.resize(120, null, cb);
      // e.g. image.resize(120, undefined, cb);
      mode = true;
    }

    if (typeof mode === 'function' && typeof cb === 'undefined') {
      // e.g. image.resize(120, cb);
      cb = mode;
      mode = true;
    }

    if (typeof deg !== 'number') {
      return throwError.call(this, 'deg must be a number', cb);
    }

    if (typeof mode !== 'boolean' && typeof mode !== 'string') {
      return throwError.call(this, 'mode must be a boolean or a string', cb);
    }

    advancedRotate.call(this, deg, mode, cb);

    if (isNodePattern(cb)) {
      cb.call(this, null, this);
    }

    return this;
  }
});
