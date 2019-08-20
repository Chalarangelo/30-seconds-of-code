"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var Animation =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(Animation, _Declaration);

  function Animation() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = Animation.prototype;

  /**
   * Don’t add prefixes for modern values.
   */
  _proto.check = function check(decl) {
    return !decl.value.split(/\s+/).some(function (i) {
      var lower = i.toLowerCase();
      return lower === 'reverse' || lower === 'alternate-reverse';
    });
  };

  return Animation;
}(Declaration);

_defineProperty(Animation, "names", ['animation', 'animation-direction']);

module.exports = Animation;