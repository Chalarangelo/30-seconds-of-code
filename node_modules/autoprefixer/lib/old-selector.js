"use strict";

var OldSelector =
/*#__PURE__*/
function () {
  function OldSelector(selector, prefix) {
    this.prefix = prefix;
    this.prefixed = selector.prefixed(this.prefix);
    this.regexp = selector.regexp(this.prefix);
    this.prefixeds = selector.possible().map(function (x) {
      return [selector.prefixed(x), selector.regexp(x)];
    });
    this.unprefixed = selector.name;
    this.nameRegexp = selector.regexp();
  }
  /**
     * Is rule a hack without unprefixed version bottom
     */


  var _proto = OldSelector.prototype;

  _proto.isHack = function isHack(rule) {
    var index = rule.parent.index(rule) + 1;
    var rules = rule.parent.nodes;

    while (index < rules.length) {
      var before = rules[index].selector;

      if (!before) {
        return true;
      }

      if (before.indexOf(this.unprefixed) !== -1 && before.match(this.nameRegexp)) {
        return false;
      }

      var some = false;

      for (var _iterator = this.prefixeds, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var _ref2 = _ref,
            string = _ref2[0],
            regexp = _ref2[1];

        if (before.indexOf(string) !== -1 && before.match(regexp)) {
          some = true;
          break;
        }
      }

      if (!some) {
        return true;
      }

      index += 1;
    }

    return true;
  }
  /**
     * Does rule contain an unnecessary prefixed selector
     */
  ;

  _proto.check = function check(rule) {
    if (rule.selector.indexOf(this.prefixed) === -1) {
      return false;
    }

    if (!rule.selector.match(this.regexp)) {
      return false;
    }

    if (this.isHack(rule)) {
      return false;
    }

    return true;
  };

  return OldSelector;
}();

module.exports = OldSelector;