"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var BorderImage =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(BorderImage, _Declaration);

  function BorderImage() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = BorderImage.prototype;

  /**
   * Remove fill parameter for prefixed declarations
   */
  _proto.set = function set(decl, prefix) {
    decl.value = decl.value.replace(/\s+fill(\s)/, '$1');
    return _Declaration.prototype.set.call(this, decl, prefix);
  };

  return BorderImage;
}(Declaration);

_defineProperty(BorderImage, "names", ['border-image']);

module.exports = BorderImage;