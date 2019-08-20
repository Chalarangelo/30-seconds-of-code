"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var MaskBorder =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(MaskBorder, _Declaration);

  function MaskBorder() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = MaskBorder.prototype;

  /**
   * Return property name by final spec
   */
  _proto.normalize = function normalize() {
    return this.name.replace('box-image', 'border');
  }
  /**
   * Return flex property for 2012 spec
   */
  ;

  _proto.prefixed = function prefixed(prop, prefix) {
    var result = _Declaration.prototype.prefixed.call(this, prop, prefix);

    if (prefix === '-webkit-') {
      result = result.replace('border', 'box-image');
    }

    return result;
  };

  return MaskBorder;
}(Declaration);

_defineProperty(MaskBorder, "names", ['mask-border', 'mask-border-source', 'mask-border-slice', 'mask-border-width', 'mask-border-outset', 'mask-border-repeat', 'mask-box-image', 'mask-box-image-source', 'mask-box-image-slice', 'mask-box-image-width', 'mask-box-image-outset', 'mask-box-image-repeat']);

module.exports = MaskBorder;