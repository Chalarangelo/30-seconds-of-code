"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

var Prefixer = require('./prefixer');

var AtRule =
/*#__PURE__*/
function (_Prefixer) {
  _inheritsLoose(AtRule, _Prefixer);

  function AtRule() {
    return _Prefixer.apply(this, arguments) || this;
  }

  var _proto = AtRule.prototype;

  /**
     * Clone and add prefixes for at-rule
     */
  _proto.add = function add(rule, prefix) {
    var prefixed = prefix + rule.name;
    var already = rule.parent.some(function (i) {
      return i.name === prefixed && i.params === rule.params;
    });

    if (already) {
      return undefined;
    }

    var cloned = this.clone(rule, {
      name: prefixed
    });
    return rule.parent.insertBefore(rule, cloned);
  }
  /**
     * Clone node with prefixes
     */
  ;

  _proto.process = function process(node) {
    var parent = this.parentPrefix(node);

    for (var _iterator = this.prefixes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var prefix = _ref;

      if (!parent || parent === prefix) {
        this.add(node, prefix);
      }
    }
  };

  return AtRule;
}(Prefixer);

module.exports = AtRule;