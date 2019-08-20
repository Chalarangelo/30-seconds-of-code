"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var flexSpec = require('./flex-spec');

var Declaration = require('../declaration');

var AlignItems =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(AlignItems, _Declaration);

  function AlignItems() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = AlignItems.prototype;

  _proto.prefixed = function prefixed(prop, prefix) {
    var spec;

    var _flexSpec = flexSpec(prefix);

    spec = _flexSpec[0];
    prefix = _flexSpec[1];

    if (spec === 2009) {
      return prefix + 'box-align';
    }

    if (spec === 2012) {
      return prefix + 'flex-align';
    }

    return _Declaration.prototype.prefixed.call(this, prop, prefix);
  }
  /**
   * Return property name by final spec
   */
  ;

  _proto.normalize = function normalize() {
    return 'align-items';
  }
  /**
   * Change value for 2009 and 2012 specs
   */
  ;

  _proto.set = function set(decl, prefix) {
    var spec = flexSpec(prefix)[0];

    if (spec === 2009 || spec === 2012) {
      decl.value = AlignItems.oldValues[decl.value] || decl.value;
    }

    return _Declaration.prototype.set.call(this, decl, prefix);
  };

  return AlignItems;
}(Declaration);

_defineProperty(AlignItems, "names", ['align-items', 'flex-align', 'box-align']);

_defineProperty(AlignItems, "oldValues", {
  'flex-end': 'end',
  'flex-start': 'start'
  /**
   * Change property name for 2009 and 2012 specs
   */

});

module.exports = AlignItems;