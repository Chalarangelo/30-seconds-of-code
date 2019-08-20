"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

module.exports = function (t) {
  function equiv(a, b) {
    if ((typeof a === "undefined" ? "undefined" : _typeof(a)) !== "object" || (typeof a === "undefined" ? "undefined" : _typeof(a)) !== "object" || a == null || b == null) {
      return a === b;
    }

    if (a.type !== b.type) {
      return false;
    }

    var fields = Object.keys(t.NODE_FIELDS[a.type]);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var field = _step.value;

        if (_typeof(a[field]) !== _typeof(b[field])) {
          return false;
        }

        if (Array.isArray(a[field])) {
          if (!Array.isArray(b[field])) {
            return false;
          }
          if (a[field].length !== b[field].length) {
            return false;
          }

          for (var i = 0; i < a[field].length; i++) {
            if (!equiv(a[field][i], b[field][i])) {
              return false;
            }
          }
          continue;
        }

        if (!equiv(a[field], b[field])) {
          return false;
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

    return true;
  }

  return equiv;
};