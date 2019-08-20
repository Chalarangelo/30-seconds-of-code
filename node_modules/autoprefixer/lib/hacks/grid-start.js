"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var GridStart =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(GridStart, _Declaration);

  function GridStart() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = GridStart.prototype;

  /**
   * Do not add prefix for unsupported value in IE
   */
  _proto.check = function check(decl) {
    var value = decl.value;
    return value.indexOf('/') === -1 || value.indexOf('span') !== -1;
  }
  /**
   * Return a final spec property
   */
  ;

  _proto.normalize = function normalize(prop) {
    return prop.replace('-start', '');
  }
  /**
   * Change property name for IE
   */
  ;

  _proto.prefixed = function prefixed(prop, prefix) {
    var result = _Declaration.prototype.prefixed.call(this, prop, prefix);

    if (prefix === '-ms-') {
      result = result.replace('-start', '');
    }

    return result;
  };

  return GridStart;
}(Declaration);

_defineProperty(GridStart, "names", ['grid-row-start', 'grid-column-start']);

module.exports = GridStart;