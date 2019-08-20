"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var list = require('postcss').list;

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

  _proto.prefixed = function prefixed(prop, prefix) {
    var spec;

    var _flexSpec = flexSpec(prefix);

    spec = _flexSpec[0];
    prefix = _flexSpec[1];

    if (spec === 2009) {
      return prefix + 'box-flex';
    }

    return _Declaration.prototype.prefixed.call(this, prop, prefix);
  }
  /**
   * Return property name by final spec
   */
  ;

  _proto.normalize = function normalize() {
    return 'flex';
  }
  /**
   * Spec 2009 supports only first argument
   * Spec 2012 disallows unitless basis
   */
  ;

  _proto.set = function set(decl, prefix) {
    var spec = flexSpec(prefix)[0];

    if (spec === 2009) {
      decl.value = list.space(decl.value)[0];
      decl.value = Flex.oldValues[decl.value] || decl.value;
      return _Declaration.prototype.set.call(this, decl, prefix);
    }

    if (spec === 2012) {
      var components = list.space(decl.value);

      if (components.length === 3 && components[2] === '0') {
        decl.value = components.slice(0, 2).concat('0px').join(' ');
      }
    }

    return _Declaration.prototype.set.call(this, decl, prefix);
  };

  return Flex;
}(Declaration);

_defineProperty(Flex, "names", ['flex', 'box-flex']);

_defineProperty(Flex, "oldValues", {
  auto: '1',
  none: '0'
  /**
   * Change property name for 2009 spec
   */

});

module.exports = Flex;