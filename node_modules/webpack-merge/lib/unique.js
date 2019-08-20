'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _differenceWith2 = require('lodash/differenceWith');

var _differenceWith3 = _interopRequireDefault(_differenceWith2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function mergeUnique(key, uniques) {
  var getter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (a) {
    return a;
  };

  return function (a, b, k) {
    return k === key && [].concat(_toConsumableArray(a), _toConsumableArray((0, _differenceWith3.default)(b, a, function (item) {
      return uniques.indexOf(getter(item)) >= 0;
    })));
  };
}

exports.default = mergeUnique;