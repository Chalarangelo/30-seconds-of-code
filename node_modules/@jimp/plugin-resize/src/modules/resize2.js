/**
 * Copyright (c) 2015 Guyon Roche
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

module.exports = {
  nearestNeighbor(src, dst) {
    const wSrc = src.width;
    const hSrc = src.height;

    const wDst = dst.width;
    const hDst = dst.height;

    const bufSrc = src.data;
    const bufDst = dst.data;

    for (let i = 0; i < hDst; i++) {
      for (let j = 0; j < wDst; j++) {
        let posDst = (i * wDst + j) * 4;

        const iSrc = Math.floor((i * hSrc) / hDst);
        const jSrc = Math.floor((j * wSrc) / wDst);
        let posSrc = (iSrc * wSrc + jSrc) * 4;

        bufDst[posDst++] = bufSrc[posSrc++];
        bufDst[posDst++] = bufSrc[posSrc++];
        bufDst[posDst++] = bufSrc[posSrc++];
        bufDst[posDst++] = bufSrc[posSrc++];
      }
    }
  },

  bilinearInterpolation(src, dst) {
    const wSrc = src.width;
    const hSrc = src.height;

    const wDst = dst.width;
    const hDst = dst.height;

    const bufSrc = src.data;
    const bufDst = dst.data;

    const interpolate = function(k, kMin, vMin, kMax, vMax) {
      // special case - k is integer
      if (kMin === kMax) {
        return vMin;
      }
      return Math.round((k - kMin) * vMax + (kMax - k) * vMin);
    };

    const assign = function(pos, offset, x, xMin, xMax, y, yMin, yMax) {
      let posMin = (yMin * wSrc + xMin) * 4 + offset;
      let posMax = (yMin * wSrc + xMax) * 4 + offset;
      const vMin = interpolate(x, xMin, bufSrc[posMin], xMax, bufSrc[posMax]);

      // special case, y is integer
      if (yMax === yMin) {
        bufDst[pos + offset] = vMin;
      } else {
        posMin = (yMax * wSrc + xMin) * 4 + offset;
        posMax = (yMax * wSrc + xMax) * 4 + offset;
        const vMax = interpolate(x, xMin, bufSrc[posMin], xMax, bufSrc[posMax]);

        bufDst[pos + offset] = interpolate(y, yMin, vMin, yMax, vMax);
      }
    };

    for (let i = 0; i < hDst; i++) {
      for (let j = 0; j < wDst; j++) {
        const posDst = (i * wDst + j) * 4;
        // x & y in src coordinates
        const x = (j * wSrc) / wDst;
        const xMin = Math.floor(x);
        const xMax = Math.min(Math.ceil(x), wSrc - 1);

        const y = (i * hSrc) / hDst;
        const yMin = Math.floor(y);
        const yMax = Math.min(Math.ceil(y), hSrc - 1);

        assign(posDst, 0, x, xMin, xMax, y, yMin, yMax);
        assign(posDst, 1, x, xMin, xMax, y, yMin, yMax);
        assign(posDst, 2, x, xMin, xMax, y, yMin, yMax);
        assign(posDst, 3, x, xMin, xMax, y, yMin, yMax);
      }
    }
  },

  _interpolate2D(src, dst, options, interpolate) {
    const bufSrc = src.data;
    const bufDst = dst.data;

    const wSrc = src.width;
    const hSrc = src.height;

    const wDst = dst.width;
    const hDst = dst.height;

    // when dst smaller than src/2, interpolate first to a multiple between 0.5 and 1.0 src, then sum squares
    const wM = Math.max(1, Math.floor(wSrc / wDst));
    const wDst2 = wDst * wM;
    const hM = Math.max(1, Math.floor(hSrc / hDst));
    const hDst2 = hDst * hM;

    // ===========================================================
    // Pass 1 - interpolate rows
    // buf1 has width of dst2 and height of src
    const buf1 = Buffer.alloc(wDst2 * hSrc * 4);
    for (let i = 0; i < hSrc; i++) {
      for (let j = 0; j < wDst2; j++) {
        // i in src coords, j in dst coords

        // calculate x in src coords
        // this interpolation requires 4 sample points and the two inner ones must be real
        // the outer points can be fudged for the edges.
        // therefore (wSrc-1)/wDst2
        const x = (j * (wSrc - 1)) / wDst2;
        const xPos = Math.floor(x);
        const t = x - xPos;
        const srcPos = (i * wSrc + xPos) * 4;
        const buf1Pos = (i * wDst2 + j) * 4;

        for (let k = 0; k < 4; k++) {
          const kPos = srcPos + k;
          const x0 =
            xPos > 0 ? bufSrc[kPos - 4] : 2 * bufSrc[kPos] - bufSrc[kPos + 4];
          const x1 = bufSrc[kPos];
          const x2 = bufSrc[kPos + 4];
          const x3 =
            xPos < wSrc - 2
              ? bufSrc[kPos + 8]
              : 2 * bufSrc[kPos + 4] - bufSrc[kPos];
          buf1[buf1Pos + k] = interpolate(x0, x1, x2, x3, t);
        }
      }
    }
    // this._writeFile(wDst2, hSrc, buf1, "out/buf1.jpg");

    // ===========================================================
    // Pass 2 - interpolate columns
    // buf2 has width and height of dst2
    const buf2 = Buffer.alloc(wDst2 * hDst2 * 4);
    for (let i = 0; i < hDst2; i++) {
      for (let j = 0; j < wDst2; j++) {
        // i&j in dst2 coords

        // calculate y in buf1 coords
        // this interpolation requires 4 sample points and the two inner ones must be real
        // the outer points can be fudged for the edges.
        // therefore (hSrc-1)/hDst2
        const y = (i * (hSrc - 1)) / hDst2;
        const yPos = Math.floor(y);
        const t = y - yPos;
        const buf1Pos = (yPos * wDst2 + j) * 4;
        const buf2Pos = (i * wDst2 + j) * 4;
        for (let k = 0; k < 4; k++) {
          const kPos = buf1Pos + k;
          const y0 =
            yPos > 0
              ? buf1[kPos - wDst2 * 4]
              : 2 * buf1[kPos] - buf1[kPos + wDst2 * 4];
          const y1 = buf1[kPos];
          const y2 = buf1[kPos + wDst2 * 4];
          const y3 =
            yPos < hSrc - 2
              ? buf1[kPos + wDst2 * 8]
              : 2 * buf1[kPos + wDst2 * 4] - buf1[kPos];

          buf2[buf2Pos + k] = interpolate(y0, y1, y2, y3, t);
        }
      }
    }
    // this._writeFile(wDst2, hDst2, buf2, "out/buf2.jpg");

    // ===========================================================
    // Pass 3 - scale to dst
    const m = wM * hM;
    if (m > 1) {
      for (let i = 0; i < hDst; i++) {
        for (let j = 0; j < wDst; j++) {
          // i&j in dst bounded coords
          let r = 0;
          let g = 0;
          let b = 0;
          let a = 0;
          let realColors = 0;

          for (let y = 0; y < hM; y++) {
            const yPos = i * hM + y;

            for (let x = 0; x < wM; x++) {
              const xPos = j * wM + x;
              const xyPos = (yPos * wDst2 + xPos) * 4;
              const pixelAlpha = buf2[xyPos + 3];

              if (pixelAlpha) {
                r += buf2[xyPos];
                g += buf2[xyPos + 1];
                b += buf2[xyPos + 2];
                realColors++;
              }

              a += pixelAlpha;
            }
          }

          const pos = (i * wDst + j) * 4;
          bufDst[pos] = realColors ? Math.round(r / realColors) : 0;
          bufDst[pos + 1] = realColors ? Math.round(g / realColors) : 0;
          bufDst[pos + 2] = realColors ? Math.round(b / realColors) : 0;
          bufDst[pos + 3] = Math.round(a / m);
        }
      }
    } else {
      // replace dst buffer with buf2
      dst.data = buf2;
    }
  },

  bicubicInterpolation(src, dst, options) {
    const interpolateCubic = function(x0, x1, x2, x3, t) {
      const a0 = x3 - x2 - x0 + x1;
      const a1 = x0 - x1 - a0;
      const a2 = x2 - x0;
      const a3 = x1;
      return Math.max(
        0,
        Math.min(255, a0 * (t * t * t) + a1 * (t * t) + a2 * t + a3)
      );
    };
    return this._interpolate2D(src, dst, options, interpolateCubic);
  },

  hermiteInterpolation(src, dst, options) {
    const interpolateHermite = function(x0, x1, x2, x3, t) {
      const c0 = x1;
      const c1 = 0.5 * (x2 - x0);
      const c2 = x0 - 2.5 * x1 + 2 * x2 - 0.5 * x3;
      const c3 = 0.5 * (x3 - x0) + 1.5 * (x1 - x2);
      return Math.max(
        0,
        Math.min(255, Math.round(((c3 * t + c2) * t + c1) * t + c0))
      );
    };
    return this._interpolate2D(src, dst, options, interpolateHermite);
  },

  bezierInterpolation(src, dst, options) {
    // between 2 points y(n), y(n+1), use next points out, y(n-1), y(n+2)
    // to predict control points (a & b) to be placed at n+0.5
    //  ya(n) = y(n) + (y(n+1)-y(n-1))/4
    //  yb(n) = y(n+1) - (y(n+2)-y(n))/4
    // then use std bezier to interpolate [n,n+1)
    //  y(n+t) = y(n)*(1-t)^3 + 3 * ya(n)*(1-t)^2*t + 3 * yb(n)*(1-t)*t^2 + y(n+1)*t^3
    //  note the 3* factor for the two control points
    // for edge cases, can choose:
    //  y(-1) = y(0) - 2*(y(1)-y(0))
    //  y(w) = y(w-1) + 2*(y(w-1)-y(w-2))
    // but can go with y(-1) = y(0) and y(w) = y(w-1)
    const interpolateBezier = function(x0, x1, x2, x3, t) {
      // x1, x2 are the knots, use x0 and x3 to calculate control points
      const cp1 = x1 + (x2 - x0) / 4;
      const cp2 = x2 - (x3 - x1) / 4;
      const nt = 1 - t;
      const c0 = x1 * nt * nt * nt;
      const c1 = 3 * cp1 * nt * nt * t;
      const c2 = 3 * cp2 * nt * t * t;
      const c3 = x2 * t * t * t;
      return Math.max(0, Math.min(255, Math.round(c0 + c1 + c2 + c3)));
    };
    return this._interpolate2D(src, dst, options, interpolateBezier);
  }
};
