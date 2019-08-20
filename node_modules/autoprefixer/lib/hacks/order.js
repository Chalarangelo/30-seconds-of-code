"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var flexSpec = require('./flex-spec');

var Declaration = require('../declaration');

var Order =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(Order, _Declaration);

  function Order() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = Order.prototype;

  /**
   * Change property name for 2009 and 2012 specs
   */
  _proto.prefixed = function prefixed(prop, prefix) {
    var spec;

    var _flexSpec = flexSpec(prefix);

    spec = _flexSpec[0];
    prefix = _flexSpec[1];

    if (spec === 2009) {
      return prefix + 'box-ordinal-group';
    }

    if (spec === 2012) {
      return prefix + 'flex-order';
    }

    return _Declaration.prototype.prefixed.call(this, prop, prefix);
  }
  /**
   * Return property name by final spec
   */
  ;

  _proto.normalize = function normalize() {
    return 'order';
  }
  /**
   * Fix value for 2009 spec
   */
  ;

  _proto.set = function set(decl, prefix) {
    var spec = flexSpec(prefix)[0];

    if (spec === 2009 && /\d/.test(decl.value)) {
      decl.value = (parseInt(decl.value) + 1).toString();
      return _Declaration.prototype.set.call(this, decl, prefix);
    }

    return _Declaration.prototype.set.call(this, decl, prefix);
  };

  return Order;
}(Declaration);

_defineProperty(Order, "names", ['order', 'flex-order', 'box-ordinal-group']);

module.exports = Order;