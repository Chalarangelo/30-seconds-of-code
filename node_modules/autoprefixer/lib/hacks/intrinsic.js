"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OldValue = require('../old-value');

var Value = require('../value');

function _regexp(name) {
  return new RegExp("(^|[\\s,(])(" + name + "($|[\\s),]))", 'gi');
}

var Intrinsic =
/*#__PURE__*/
function (_Value) {
  _inheritsLoose(Intrinsic, _Value);

  function Intrinsic() {
    return _Value.apply(this, arguments) || this;
  }

  var _proto = Intrinsic.prototype;

  _proto.regexp = function regexp() {
    if (!this.regexpCache) this.regexpCache = _regexp(this.name);
    return this.regexpCache;
  };

  _proto.isStretch = function isStretch() {
    return this.name === 'stretch' || this.name === 'fill' || this.name === 'fill-available';
  };

  _proto.replace = function replace(string, prefix) {
    if (prefix === '-moz-' && this.isStretch()) {
      return string.replace(this.regexp(), '$1-moz-available$3');
    }

    if (prefix === '-webkit-' && this.isStretch()) {
      return string.replace(this.regexp(), '$1-webkit-fill-available$3');
    }

    return _Value.prototype.replace.call(this, string, prefix);
  };

  _proto.old = function old(prefix) {
    var prefixed = prefix + this.name;

    if (this.isStretch()) {
      if (prefix === '-moz-') {
        prefixed = '-moz-available';
      } else if (prefix === '-webkit-') {
        prefixed = '-webkit-fill-available';
      }
    }

    return new OldValue(this.name, prefixed, prefixed, _regexp(prefixed));
  };

  _proto.add = function add(decl, prefix) {
    if (decl.prop.indexOf('grid') !== -1 && prefix !== '-webkit-') {
      return undefined;
    }

    return _Value.prototype.add.call(this, decl, prefix);
  };

  return Intrinsic;
}(Value);

_defineProperty(Intrinsic, "names", ['max-content', 'min-content', 'fit-content', 'fill', 'fill-available', 'stretch']);

module.exports = Intrinsic;