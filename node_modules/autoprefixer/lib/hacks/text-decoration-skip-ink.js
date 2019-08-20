"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var TextDecorationSkipInk =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(TextDecorationSkipInk, _Declaration);

  function TextDecorationSkipInk() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = TextDecorationSkipInk.prototype;

  /**
   * Change prefix for ink value
   */
  _proto.set = function set(decl, prefix) {
    if (decl.prop === 'text-decoration-skip-ink' && decl.value === 'auto') {
      decl.prop = prefix + 'text-decoration-skip';
      decl.value = 'ink';
      return decl;
    } else {
      return _Declaration.prototype.set.call(this, decl, prefix);
    }
  };

  return TextDecorationSkipInk;
}(Declaration);

_defineProperty(TextDecorationSkipInk, "names", ['text-decoration-skip-ink', 'text-decoration-skip']);

module.exports = TextDecorationSkipInk;