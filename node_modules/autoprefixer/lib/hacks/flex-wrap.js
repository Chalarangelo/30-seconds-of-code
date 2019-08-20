"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var flexSpec = require('./flex-spec');

var Declaration = require('../declaration');

var FlexWrap =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(FlexWrap, _Declaration);

  function FlexWrap() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = FlexWrap.prototype;

  /**
   * Don't add prefix for 2009 spec
   */
  _proto.set = function set(decl, prefix) {
    var spec = flexSpec(prefix)[0];

    if (spec !== 2009) {
      return _Declaration.prototype.set.call(this, decl, prefix);
    }

    return undefined;
  };

  return FlexWrap;
}(Declaration);

_defineProperty(FlexWrap, "names", ['flex-wrap']);

module.exports = FlexWrap;