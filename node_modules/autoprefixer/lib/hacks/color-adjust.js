"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var ColorAdjust =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(ColorAdjust, _Declaration);

  function ColorAdjust() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = ColorAdjust.prototype;

  /**
   * Change property name for WebKit-based browsers
   */
  _proto.prefixed = function prefixed(prop, prefix) {
    return prefix + 'print-color-adjust';
  }
  /**
   * Return property name by spec
   */
  ;

  _proto.normalize = function normalize() {
    return 'color-adjust';
  };

  return ColorAdjust;
}(Declaration);

_defineProperty(ColorAdjust, "names", ['color-adjust', 'print-color-adjust']);

module.exports = ColorAdjust;