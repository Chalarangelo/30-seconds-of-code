"use strict";

/*
Copyright (c) 2011 Elliot Shepherd

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// https://code.google.com/p/ironchef-team21/source/browse/ironchef_team21/src/ImagePHash.java

/*
 * pHash-like image hash.
 * Author: Elliot Shepherd (elliot@jarofworms.com
 * Based On: http://www.hackerfactor.com/blog/index.php?/archives/432-Looks-Like-It.html
 */
function ImagePHash(size, smallerSize) {
  this.size = this.size || size;
  this.smallerSize = this.smallerSize || smallerSize;
  initCoefficients(this.size);
}

ImagePHash.prototype.size = 32;
ImagePHash.prototype.smallerSize = 8;

ImagePHash.prototype.distance = function (s1, s2) {
  var counter = 0;

  for (var k = 0; k < s1.length; k++) {
    if (s1[k] !== s2[k]) {
      counter++;
    }
  }

  return counter / s1.length;
}; // Returns a 'binary string' (like. 001010111011100010) which is easy to do a hamming distance on.


ImagePHash.prototype.getHash = function (img) {
  /* 1. Reduce size.
     * Like Average Hash, pHash starts with a small image.
     * However, the image is larger than 8x8; 32x32 is a good size.
     * This is really done to simplify the DCT computation and not
     * because it is needed to reduce the high frequencies.
     */
  img = img.clone().resize(this.size, this.size);
  /* 2. Reduce color.
     * The image is reduced to a grayscale just to further simplify
     * the number of computations.
     */

  img.grayscale();
  var vals = [];

  for (var x = 0; x < img.bitmap.width; x++) {
    vals[x] = [];

    for (var y = 0; y < img.bitmap.height; y++) {
      vals[x][y] = intToRGBA(img.getPixelColor(x, y)).b;
    }
  }
  /* 3. Compute the DCT.
     * The DCT separates the image into a collection of frequencies
     * and scalars. While JPEG uses an 8x8 DCT, this algorithm uses
     * a 32x32 DCT.
     */


  var dctVals = applyDCT(vals, this.size);
  /* 4. Reduce the DCT.
     * This is the magic step. While the DCT is 32x32, just keep the
     * top-left 8x8. Those represent the lowest frequencies in the
     * picture.
     */

  /* 5. Compute the average value.
     * Like the Average Hash, compute the mean DCT value (using only
     * the 8x8 DCT low-frequency values and excluding the first term
     * since the DC coefficient can be significantly different from
     * the other values and will throw off the average).
     */

  var total = 0;

  for (var _x = 0; _x < this.smallerSize; _x++) {
    for (var _y = 0; _y < this.smallerSize; _y++) {
      total += dctVals[_x][_y];
    }
  }

  var avg = total / (this.smallerSize * this.smallerSize);
  /* 6. Further reduce the DCT.
     * This is the magic step. Set the 64 hash bits to 0 or 1
     * depending on whether each of the 64 DCT values is above or
     * below the average value. The result doesn't tell us the
     * actual low frequencies; it just tells us the very-rough
     * relative scale of the frequencies to the mean. The result
     * will not vary as long as the overall structure of the image
     * remains the same; this can survive gamma and color histogram
     * adjustments without a problem.
     */

  var hash = '';

  for (var _x2 = 0; _x2 < this.smallerSize; _x2++) {
    for (var _y2 = 0; _y2 < this.smallerSize; _y2++) {
      hash += dctVals[_x2][_y2] > avg ? '1' : '0';
    }
  }

  return hash;
}; // DCT function stolen from http://stackoverflow.com/questions/4240490/problems-with-dct-and-idct-algorithm-in-java


function intToRGBA(i) {
  var rgba = {};
  rgba.r = Math.floor(i / Math.pow(256, 3));
  rgba.g = Math.floor((i - rgba.r * Math.pow(256, 3)) / Math.pow(256, 2));
  rgba.b = Math.floor((i - rgba.r * Math.pow(256, 3) - rgba.g * Math.pow(256, 2)) / Math.pow(256, 1));
  rgba.a = Math.floor((i - rgba.r * Math.pow(256, 3) - rgba.g * Math.pow(256, 2) - rgba.b * Math.pow(256, 1)) / Math.pow(256, 0));
  return rgba;
}

var c = [];

function initCoefficients(size) {
  for (var i = 1; i < size; i++) {
    c[i] = 1;
  }

  c[0] = 1 / Math.sqrt(2.0);
}

function applyDCT(f, size) {
  var N = size;
  var F = [];

  for (var u = 0; u < N; u++) {
    F[u] = [];

    for (var v = 0; v < N; v++) {
      var sum = 0;

      for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
          sum += Math.cos((2 * i + 1) / (2.0 * N) * u * Math.PI) * Math.cos((2 * j + 1) / (2.0 * N) * v * Math.PI) * f[i][j];
        }
      }

      sum *= c[u] * c[v] / 4;
      F[u][v] = sum;
    }
  }

  return F;
}

module.exports = ImagePHash;
//# sourceMappingURL=phash.js.map