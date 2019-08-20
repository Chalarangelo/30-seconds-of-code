"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var InlineLogical =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(InlineLogical, _Declaration);

  function InlineLogical() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = InlineLogical.prototype;

  /**
   * Use old syntax for -moz- and -webkit-
   */
  _proto.prefixed = function prefixed(prop, prefix) {
    return prefix + prop.replace('-inline', '');
  }
  /**
   * Return property name by spec
   */
  ;

  _proto.normalize = function normalize(prop) {
    return prop.replace(/(margin|padding|border)-(start|end)/, '$1-inline-$2');
  };

  return InlineLogical;
}(Declaration);

_defineProperty(InlineLogical, "names", ['border-inline-start', 'border-inline-end', 'margin-inline-start', 'margin-inline-end', 'padding-inline-start', 'padding-inline-end', 'border-start', 'border-end', 'margin-start', 'margin-end', 'padding-start', 'padding-end']);

module.exports = InlineLogical;