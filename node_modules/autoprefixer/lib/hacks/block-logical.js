"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var BlockLogical =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(BlockLogical, _Declaration);

  function BlockLogical() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = BlockLogical.prototype;

  /**
   * Use old syntax for -moz- and -webkit-
   */
  _proto.prefixed = function prefixed(prop, prefix) {
    if (prop.indexOf('-start') !== -1) {
      return prefix + prop.replace('-block-start', '-before');
    }

    return prefix + prop.replace('-block-end', '-after');
  }
  /**
   * Return property name by spec
   */
  ;

  _proto.normalize = function normalize(prop) {
    if (prop.indexOf('-before') !== -1) {
      return prop.replace('-before', '-block-start');
    }

    return prop.replace('-after', '-block-end');
  };

  return BlockLogical;
}(Declaration);

_defineProperty(BlockLogical, "names", ['border-block-start', 'border-block-end', 'margin-block-start', 'margin-block-end', 'padding-block-start', 'padding-block-end', 'border-before', 'border-after', 'margin-before', 'margin-after', 'padding-before', 'padding-after']);

module.exports = BlockLogical;