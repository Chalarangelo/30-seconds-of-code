"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OldValue = require('../old-value');

var Value = require('../value');

var Pixelated =
/*#__PURE__*/
function (_Value) {
  _inheritsLoose(Pixelated, _Value);

  function Pixelated() {
    return _Value.apply(this, arguments) || this;
  }

  var _proto = Pixelated.prototype;

  /**
   * Use non-standard name for WebKit and Firefox
   */
  _proto.replace = function replace(string, prefix) {
    if (prefix === '-webkit-') {
      return string.replace(this.regexp(), '$1-webkit-optimize-contrast');
    }

    if (prefix === '-moz-') {
      return string.replace(this.regexp(), '$1-moz-crisp-edges');
    }

    return _Value.prototype.replace.call(this, string, prefix);
  }
  /**
   * Different name for WebKit and Firefox
   */
  ;

  _proto.old = function old(prefix) {
    if (prefix === '-webkit-') {
      return new OldValue(this.name, '-webkit-optimize-contrast');
    }

    if (prefix === '-moz-') {
      return new OldValue(this.name, '-moz-crisp-edges');
    }

    return _Value.prototype.old.call(this, prefix);
  };

  return Pixelated;
}(Value);

_defineProperty(Pixelated, "names", ['pixelated']);

module.exports = Pixelated;