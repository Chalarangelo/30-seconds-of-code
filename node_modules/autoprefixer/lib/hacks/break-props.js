"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var BreakProps =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(BreakProps, _Declaration);

  function BreakProps() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = BreakProps.prototype;

  /**
   * Change name for -webkit- and -moz- prefix
   */
  _proto.prefixed = function prefixed(prop, prefix) {
    return prefix + "column-" + prop;
  }
  /**
   * Return property name by final spec
   */
  ;

  _proto.normalize = function normalize(prop) {
    if (prop.indexOf('inside') !== -1) {
      return 'break-inside';
    }

    if (prop.indexOf('before') !== -1) {
      return 'break-before';
    }

    return 'break-after';
  }
  /**
   * Change prefixed value for avoid-column and avoid-page
   */
  ;

  _proto.set = function set(decl, prefix) {
    if (decl.prop === 'break-inside' && decl.value === 'avoid-column' || decl.value === 'avoid-page') {
      decl.value = 'avoid';
    }

    return _Declaration.prototype.set.call(this, decl, prefix);
  }
  /**
   * Don’t prefix some values
   */
  ;

  _proto.insert = function insert(decl, prefix, prefixes) {
    if (decl.prop !== 'break-inside') {
      return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
    }

    if (/region/i.test(decl.value) || /page/i.test(decl.value)) {
      return undefined;
    }

    return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
  };

  return BreakProps;
}(Declaration);

_defineProperty(BreakProps, "names", ['break-inside', 'page-break-inside', 'column-break-inside', 'break-before', 'page-break-before', 'column-break-before', 'break-after', 'page-break-after', 'column-break-after']);

module.exports = BreakProps;