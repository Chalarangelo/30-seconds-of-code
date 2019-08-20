"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Selector = require('../selector');

var Fullscreen =
/*#__PURE__*/
function (_Selector) {
  _inheritsLoose(Fullscreen, _Selector);

  function Fullscreen() {
    return _Selector.apply(this, arguments) || this;
  }

  var _proto = Fullscreen.prototype;

  /**
   * Return different selectors depend on prefix
   */
  _proto.prefixed = function prefixed(prefix) {
    if (prefix === '-webkit-') {
      return ':-webkit-full-screen';
    }

    if (prefix === '-moz-') {
      return ':-moz-full-screen';
    }

    return ":" + prefix + "fullscreen";
  };

  return Fullscreen;
}(Selector);

_defineProperty(Fullscreen, "names", [':fullscreen']);

module.exports = Fullscreen;