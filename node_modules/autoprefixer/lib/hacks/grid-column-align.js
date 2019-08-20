"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var GridColumnAlign =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(GridColumnAlign, _Declaration);

  function GridColumnAlign() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = GridColumnAlign.prototype;

  /**
   * Do not prefix flexbox values
   */
  _proto.check = function check(decl) {
    return decl.value.indexOf('flex-') === -1 && decl.value !== 'baseline';
  }
  /**
   * Change property name for IE
   */
  ;

  _proto.prefixed = function prefixed(prop, prefix) {
    return prefix + 'grid-column-align';
  }
  /**
   * Change IE property back
   */
  ;

  _proto.normalize = function normalize() {
    return 'justify-self';
  };

  return GridColumnAlign;
}(Declaration);

_defineProperty(GridColumnAlign, "names", ['grid-column-align']);

module.exports = GridColumnAlign;