"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LEAF_NODE = Symbol("LEAF_NODE");

module.exports = function () {
  function PatternMatch(patterns) {
    _classCallCheck(this, PatternMatch);

    this.decisionTree = this.makeDecisionTree(patterns);
  }

  _createClass(PatternMatch, [{
    key: "handle",
    value: function handle(input, isMatch) {
      var result = this.match(input, isMatch);

      if (!result.match) {
        throw new Error("No Match Found for " + input.toString());
      }

      if (typeof result.value !== "function") {
        throw new Error("Expecting a function. Instead got - " + result.value.toString());
      }

      result.value.call(null, input, result.keys);
    }
  }, {
    key: "match",
    value: function match(input) {
      var isMatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (a, b) {
        return a === b;
      };

      var current = this.decisionTree;
      var result = {
        match: false,
        value: void 0,
        keys: []
      };

      // to handle falsy keys
      var NO_MATCH = Symbol("NO_MATCH");

      for (var i = 0; i < input.length; i++) {
        var matchedKey = NO_MATCH;

        // because map doesn't support custom key equal function
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = current.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (isMatch(key, input[i])) {
              matchedKey = key;
              result.keys.push(matchedKey);
              break;
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

        if (matchedKey !== NO_MATCH) {
          current = current.get(matchedKey);

          if (i === input.length - 1) {
            if (current.has(LEAF_NODE)) {
              result.match = true;
              result.value = current.get(LEAF_NODE);
            }
            break;
          }
        } else {
          break;
        }
      }
      return result;
    }
  }, {
    key: "makeDecisionTree",
    value: function makeDecisionTree(patterns) {
      // order of keys in a Map is the order of insertion
      var root = new Map();

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = patterns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var pattern = _step2.value;

          make(root, pattern);
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

      return root;

      function make(parent, pattern) {
        if (pattern.length < 2) {
          throw new Error("at least 2 elements required in a pattern");
        }

        if (pattern.length === 2) {
          if (parent.has(pattern[0])) {
            var pattern0 = parent.get(pattern[0]);
            if (!pattern0.has(LEAF_NODE)) {
              pattern0.set(LEAF_NODE, pattern[1]);
            }
            // here we don't handle duplicates
            // this pattern would have already been matched
          } else {
            parent.set(pattern[0], new Map([[LEAF_NODE, pattern[1]]]));
          }

          return parent;
        }

        var _pattern = _toArray(pattern),
            current = _pattern[0],
            rest = _pattern.slice(1);

        if (parent.has(current)) {
          make(parent.get(current), rest);
        } else {
          parent.set(current, make(new Map(), rest));
        }
        return parent;
      }
    }
  }]);

  return PatternMatch;
}();