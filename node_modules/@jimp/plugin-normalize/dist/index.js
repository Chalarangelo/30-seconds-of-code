"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.fill");

var _utils = require("@jimp/utils");

/* eslint-disable no-labels */

/**
 * Get an image's histogram
 * @return {object} An object with an array of color occurrence counts for each channel (r,g,b)
 */
function histogram() {
  var histogram = {
    r: new Array(256).fill(0),
    g: new Array(256).fill(0),
    b: new Array(256).fill(0)
  };
  this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function (x, y, index) {
    histogram.r[this.bitmap.data[index + 0]]++;
    histogram.g[this.bitmap.data[index + 1]]++;
    histogram.b[this.bitmap.data[index + 2]]++;
  });
  return histogram;
}
/**
 * Normalize values
 * @param  {integer} value Pixel channel value.
 * @param  {integer} min   Minimum value for channel
 * @param  {integer} max   Maximum value for channel
 * @return {integer} normalized values
 */


var _normalize = function normalize(value, min, max) {
  return (value - min) * 255 / (max - min);
};

var getBounds = function getBounds(histogramChannel) {
  return [histogramChannel.findIndex(function (value) {
    return value > 0;
  }), 255 - histogramChannel.slice().reverse().findIndex(function (value) {
    return value > 0;
  })];
};
/**
 * Normalizes the image
 * @param {function(Error, Jimp)} cb (optional) a callback for when complete
 * @returns {Jimp} this for chaining of methods
 */


var _default = function _default() {
  return {
    normalize: function normalize(cb) {
      var h = histogram.call(this); // store bounds (minimum and maximum values)

      var bounds = {
        r: getBounds(h.r),
        g: getBounds(h.g),
        b: getBounds(h.b)
      }; // apply value transformations

      this.scanQuiet(0, 0, this.bitmap.width, this.bitmap.height, function (x, y, idx) {
        var r = this.bitmap.data[idx + 0];
        var g = this.bitmap.data[idx + 1];
        var b = this.bitmap.data[idx + 2];
        this.bitmap.data[idx + 0] = _normalize(r, bounds.r[0], bounds.r[1]);
        this.bitmap.data[idx + 1] = _normalize(g, bounds.g[0], bounds.g[1]);
        this.bitmap.data[idx + 2] = _normalize(b, bounds.b[0], bounds.b[1]);
      });

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