"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var BASIC = ['none', 'underline', 'overline', 'line-through', 'blink', 'inherit', 'initial', 'unset'];

var TextDecoration =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(TextDecoration, _Declaration);

  function TextDecoration() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = TextDecoration.prototype;

  /**
   * Do not add prefixes for basic values.
   */
  _proto.check = function check(decl) {
    return decl.value.split(/\s+/).some(function (i) {
      return BASIC.indexOf(i) === -1;
    });
  };

  return TextDecoration;
}(Declaration);

_defineProperty(TextDecoration, "names", ['text-decoration']);

module.exports = TextDecoration;