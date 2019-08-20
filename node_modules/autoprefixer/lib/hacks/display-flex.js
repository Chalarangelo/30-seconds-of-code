"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var flexSpec = require('./flex-spec');

var OldValue = require('../old-value');

var Value = require('../value');

var DisplayFlex =
/*#__PURE__*/
function (_Value) {
  _inheritsLoose(DisplayFlex, _Value);

  function DisplayFlex(name, prefixes) {
    var _this;

    _this = _Value.call(this, name, prefixes) || this;

    if (name === 'display-flex') {
      _this.name = 'flex';
    }

    return _this;
  }
  /**
   * Faster check for flex value
   */


  var _proto = DisplayFlex.prototype;

  _proto.check = function check(decl) {
    return decl.prop === 'display' && decl.value === this.name;
  }
  /**
   * Return value by spec
   */
  ;

  _proto.prefixed = function prefixed(prefix) {
    var spec, value;

    var _flexSpec = flexSpec(prefix);

    spec = _flexSpec[0];
    prefix = _flexSpec[1];

    if (spec === 2009) {
      if (this.name === 'flex') {
        value = 'box';
      } else {
        value = 'inline-box';
      }
    } else if (spec === 2012) {
      if (this.name === 'flex') {
        value = 'flexbox';
      } else {
        value = 'inline-flexbox';
      }
    } else if (spec === 'final') {
      value = this.name;
    }

    return prefix + value;
  }
  /**
   * Add prefix to value depend on flebox spec version
   */
  ;

  _proto.replace = function replace(string, prefix) {
    return this.prefixed(prefix);
  }
  /**
   * Change value for old specs
   */
  ;

  _proto.old = function old(prefix) {
    var prefixed = this.prefixed(prefix);
    if (!prefixed) return undefined;
    return new OldValue(this.name, prefixed);
  };

  return DisplayFlex;
}(Value);

_defineProperty(DisplayFlex, "names", ['display-flex', 'inline-flex']);

module.exports = DisplayFlex;