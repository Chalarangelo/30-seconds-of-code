"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var BorderRadius =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(BorderRadius, _Declaration);

  function BorderRadius() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = BorderRadius.prototype;

  /**
   * Change syntax, when add Mozilla prefix
   */
  _proto.prefixed = function prefixed(prop, prefix) {
    if (prefix === '-moz-') {
      return prefix + (BorderRadius.toMozilla[prop] || prop);
    }

    return _Declaration.prototype.prefixed.call(this, prop, prefix);
  }
  /**
   * Return unprefixed version of property
   */
  ;

  _proto.normalize = function normalize(prop) {
    return BorderRadius.toNormal[prop] || prop;
  };

  return BorderRadius;
}(Declaration);

_defineProperty(BorderRadius, "names", ['border-radius']);

_defineProperty(BorderRadius, "toMozilla", {});

_defineProperty(BorderRadius, "toNormal", {});

for (var _i = 0, _arr = ['top', 'bottom']; _i < _arr.length; _i++) {
  var ver = _arr[_i];

  for (var _i2 = 0, _arr2 = ['left', 'right']; _i2 < _arr2.length; _i2++) {
    var hor = _arr2[_i2];
    var normal = "border-" + ver + "-" + hor + "-radius";
    var mozilla = "border-radius-" + ver + hor;
    BorderRadius.names.push(normal);
    BorderRadius.names.push(mozilla);
    BorderRadius.toMozilla[normal] = mozilla;
    BorderRadius.toNormal[mozilla] = normal;
  }
}

module.exports = BorderRadius;