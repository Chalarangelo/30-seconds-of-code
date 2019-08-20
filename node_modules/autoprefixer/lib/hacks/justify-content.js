"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var flexSpec = require('./flex-spec');

var Declaration = require('../declaration');

var JustifyContent =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(JustifyContent, _Declaration);

  function JustifyContent() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = JustifyContent.prototype;

  _proto.prefixed = function prefixed(prop, prefix) {
    var spec;

    var _flexSpec = flexSpec(prefix);

    spec = _flexSpec[0];
    prefix = _flexSpec[1];

    if (spec === 2009) {
      return prefix + 'box-pack';
    }

    if (spec === 2012) {
      return prefix + 'flex-pack';
    }

    return _Declaration.prototype.prefixed.call(this, prop, prefix);
  }
  /**
   * Return property name by final spec
   */
  ;

  _proto.normalize = function normalize() {
    return 'justify-content';
  }
  /**
   * Change value for 2009 and 2012 specs
   */
  ;

  _proto.set = function set(decl, prefix) {
    var spec = flexSpec(prefix)[0];

    if (spec === 2009 || spec === 2012) {
      var value = JustifyContent.oldValues[decl.value] || decl.value;
      decl.value = value;

      if (spec !== 2009 || value !== 'distribute') {
        return _Declaration.prototype.set.call(this, decl, prefix);
      }
    } else if (spec === 'final') {
      return _Declaration.prototype.set.call(this, decl, prefix);
    }

    return undefined;
  };

  return JustifyContent;
}(Declaration);

_defineProperty(JustifyContent, "names", ['justify-content', 'flex-pack', 'box-pack']);

_defineProperty(JustifyContent, "oldValues", {
  'flex-end': 'end',
  'flex-start': 'start',
  'space-between': 'justify',
  'space-around': 'distribute'
  /**
   * Change property name for 2009 and 2012 specs
   */

});

module.exports = JustifyContent;