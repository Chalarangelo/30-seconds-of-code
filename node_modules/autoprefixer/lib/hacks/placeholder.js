"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Selector = require('../selector');

var Placeholder =
/*#__PURE__*/
function (_Selector) {
  _inheritsLoose(Placeholder, _Selector);

  function Placeholder() {
    return _Selector.apply(this, arguments) || this;
  }

  var _proto = Placeholder.prototype;

  /**
   * Add old mozilla to possible prefixes
   */
  _proto.possible = function possible() {
    return _Selector.prototype.possible.call(this).concat(['-moz- old', '-ms- old']);
  }
  /**
   * Return different selectors depend on prefix
   */
  ;

  _proto.prefixed = function prefixed(prefix) {
    if (prefix === '-webkit-') {
      return '::-webkit-input-placeholder';
    }

    if (prefix === '-ms-') {
      return '::-ms-input-placeholder';
    }

    if (prefix === '-ms- old') {
      return ':-ms-input-placeholder';
    }

    if (prefix === '-moz- old') {
      return ':-moz-placeholder';
    }

    return "::" + prefix + "placeholder";
  };

  return Placeholder;
}(Selector);

_defineProperty(Placeholder, "names", ['::placeholder']);

module.exports = Placeholder;