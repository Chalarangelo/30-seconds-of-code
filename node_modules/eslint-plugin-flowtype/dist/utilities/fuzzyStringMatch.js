'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Creates an array of letter pairs from a given array
// origin: https://github.com/d3/d3-array/blob/master/src/pairs.js
var arrayPairs = function arrayPairs(array) {
  var ii = 0;
  var length = array.length - 1;
  var letter = array[0];
  var pairs = new Array(length < 0 ? 0 : length);

  while (ii < length) {
    pairs[ii] = [letter, letter = array[++ii]];
  }

  return pairs;
};
/* eslint-enable */

exports.default = function (needle, haystack) {
  var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;

  // Based on http://stackoverflow.com/a/23305385

  var stringSimilarity = function stringSimilarity(str1, str2) {
    if (str1.length > 0 && str2.length > 0) {
      var pairs1 = arrayPairs(str1);
      var pairs2 = arrayPairs(str2);
      var unionLen = pairs1.length + pairs2.length;
      var hitCount = void 0;

      hitCount = 0;

      _lodash2.default.forIn(pairs1, function (val1) {
        _lodash2.default.forIn(pairs2, function (val2) {
          if (_lodash2.default.isEqual(val1, val2)) {
            hitCount++;
          }
        });
      });

      if (hitCount > 0) {
        return 2.0 * hitCount / unionLen;
      }
    }

    return 0.0;
  };

  return stringSimilarity(needle, haystack) >= Number(weight);
};

module.exports = exports['default'];