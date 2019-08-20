"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var flexSpec = require('./flex-spec');

var Declaration = require('../declaration');

var FlexBasis =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(FlexBasis, _Declaration);

  function FlexBasis() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = FlexBasis.prototype;

  /**
   * Return property name by final spec
   */
  _proto.normalize = function normalize() {
    return 'flex-basis';
  }
  /**
   * Return flex property for 2012 spec
   */
  ;

  _proto.prefixed = function prefixed(prop, prefix) {
    var spec;

    var _flexSpec = flexSpec(prefix);

    spec = _flexSpec[0];
    prefix = _flexSpec[1];

    if (spec === 2012) {
      return prefix + 'flex-preferred-size';
    }

    return _Declaration.prototype.prefixed.call(this, prop, prefix);
  }
  /**
   * Ignore 2009 spec and use flex property for 2012
   */
  ;

  _proto.set = function set(decl, prefix) {
    var spec;

    var _flexSpec2 = flexSpec(prefix);

    spec = _flexSpec2[0];
    prefix = _flexSpec2[1];

    if (spec === 2012 || spec === 'final') {
      return _Declaration.prototype.set.call(this, decl, prefix);
    }

    return undefined;
  };

  return FlexBasis;
}(Declaration);

_defineProperty(FlexBasis, "names", ['flex-basis', 'flex-preferred-size']);

module.exports = FlexBasis;