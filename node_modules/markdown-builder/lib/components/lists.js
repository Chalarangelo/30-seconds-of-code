'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ol = exports.ul = undefined;

var _util = require('../util');

var ul = function ul(items, callback) {
  var list = '';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var val = _step.value;

      if (callback) {
        list += (0, _util.withPrefix)(_util.UNORDERED_LIST_PREFIX, callback(val)) + '\n';
      } else {
        list += (0, _util.withPrefix)(_util.UNORDERED_LIST_PREFIX, val) + '\n';
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return list;
}; /**
    * Markdown Lists utilities
    * 
    */

var ol = function ol(items, callback) {
  var list = '';
  var counter = 1;

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var val = _step2.value;

      if (callback) {
        list += (0, _util.withPrefix)(counter + '.', callback(val)) + '\n';
      } else {
        list += (0, _util.withPrefix)(counter + '.', val) + '\n';
      }
      counter++;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return list;
};

exports.ul = ul;
exports.ol = ol;