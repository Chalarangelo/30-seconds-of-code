'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mergeWith2 = require('lodash/mergeWith');

var _mergeWith3 = _interopRequireDefault(_mergeWith2);

var _isPlainObject2 = require('lodash/isPlainObject');

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _cloneDeep2 = require('lodash/cloneDeep');

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

exports.default = joinArrays;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isArray = Array.isArray;

function joinArrays() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      customizeArray = _ref.customizeArray,
      customizeObject = _ref.customizeObject,
      key = _ref.key;

  return function _joinArrays(a, b, k) {
    var newKey = key ? key + '.' + k : k;

    if ((0, _isFunction3.default)(a) && (0, _isFunction3.default)(b)) {
      return function () {
        return _joinArrays(a.apply(undefined, arguments), b.apply(undefined, arguments), k);
      };
    }
    if (isArray(a) && isArray(b)) {
      var customResult = customizeArray && customizeArray(a, b, newKey);

      return customResult || [].concat(_toConsumableArray(a), _toConsumableArray(b));
    }

    if ((0, _isPlainObject3.default)(a) && (0, _isPlainObject3.default)(b)) {
      var _customResult = customizeObject && customizeObject(a, b, newKey);

      return _customResult || (0, _mergeWith3.default)({}, a, b, joinArrays({
        customizeArray: customizeArray,
        customizeObject: customizeObject,
        key: newKey
      }));
    }

    if ((0, _isPlainObject3.default)(b)) {
      return (0, _cloneDeep3.default)(b);
    }

    if (isArray(b)) {
      return [].concat(_toConsumableArray(b));
    }

    return b;
  };
}