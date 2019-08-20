"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var flexSpec = require('./flex-spec');

var Declaration = require('../declaration');

var Flex =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(Flex, _Declaration);

  function Flex() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = Flex.prototype;

  /**
   * Return property name by final spec
   */
  _proto.normalize = function normalize() {
    return 'flex';
  }
  /**
   * Return flex property for 2009 and 2012 specs
   */
  ;

  _proto.prefixed = function prefixed(prop, prefix) {
    var spec;

    var _flexSpec = flexSpec(prefix);

    spec = _flexSpec[0];
    prefix = _flexSpec[1];

    if (spec === 2009) {
      return prefix + 'box-flex';
    }

    if (spec === 2012) {
      return prefix + 'flex-positive';
    }

    return _Declaration.prototype.prefixed.call(this, prop, prefix);
  };

  return Flex;
}(Declaration);

_defineProperty(Flex, "names", ['flex-grow', 'flex-positive']);

module.exports = Flex;