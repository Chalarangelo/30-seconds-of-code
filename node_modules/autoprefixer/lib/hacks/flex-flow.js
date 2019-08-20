"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var flexSpec = require('./flex-spec');

var Declaration = require('../declaration');

var FlexFlow =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(FlexFlow, _Declaration);

  function FlexFlow() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = FlexFlow.prototype;

  /**
   * Use two properties for 2009 spec
   */
  _proto.insert = function insert(decl, prefix, prefixes) {
    var spec;

    var _flexSpec = flexSpec(prefix);

    spec = _flexSpec[0];
    prefix = _flexSpec[1];

    if (spec !== 2009) {
      return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
    }

    var values = decl.value.split(/\s+/).filter(function (i) {
      return i !== 'wrap' && i !== 'nowrap' && 'wrap-reverse';
    });

    if (values.length === 0) {
      return undefined;
    }

    var already = decl.parent.some(function (i) {
      return i.prop === prefix + 'box-orient' || i.prop === prefix + 'box-direction';
    });

    if (already) {
      return undefined;
    }

    var value = values[0];
    var orient = value.indexOf('row') !== -1 ? 'horizontal' : 'vertical';
    var dir = value.indexOf('reverse') !== -1 ? 'reverse' : 'normal';
    var cloned = this.clone(decl);
    cloned.prop = prefix + 'box-orient';
    cloned.value = orient;

    if (this.needCascade(decl)) {
      cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
    }

    decl.parent.insertBefore(decl, cloned);
    cloned = this.clone(decl);
    cloned.prop = prefix + 'box-direction';
    cloned.value = dir;

    if (this.needCascade(decl)) {
      cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
    }

    return decl.parent.insertBefore(decl, cloned);
  };

  return FlexFlow;
}(Declaration);

_defineProperty(FlexFlow, "names", ['flex-flow', 'box-direction', 'box-orient']);

module.exports = FlexFlow;