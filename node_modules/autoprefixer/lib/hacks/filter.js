"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var Filter =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(Filter, _Declaration);

  function Filter() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = Filter.prototype;

  /**
   * Check is it Internet Explorer filter
   */
  _proto.check = function check(decl) {
    var v = decl.value;
    return v.toLowerCase().indexOf('alpha(') === -1 && v.indexOf('DXImageTransform.Microsoft') === -1 && v.indexOf('data:image/svg+xml') === -1;
  };

  return Filter;
}(Declaration);

_defineProperty(Filter, "names", ['filter']);

module.exports = Filter;