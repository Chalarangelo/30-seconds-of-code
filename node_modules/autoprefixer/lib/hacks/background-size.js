"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var BackgroundSize =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(BackgroundSize, _Declaration);

  function BackgroundSize() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = BackgroundSize.prototype;

  /**
   * Duplication parameter for -webkit- browsers
   */
  _proto.set = function set(decl, prefix) {
    var value = decl.value.toLowerCase();

    if (prefix === '-webkit-' && value.indexOf(' ') === -1 && value !== 'contain' && value !== 'cover') {
      decl.value = decl.value + ' ' + decl.value;
    }

    return _Declaration.prototype.set.call(this, decl, prefix);
  };

  return BackgroundSize;
}(Declaration);

_defineProperty(BackgroundSize, "names", ['background-size']);

module.exports = BackgroundSize;