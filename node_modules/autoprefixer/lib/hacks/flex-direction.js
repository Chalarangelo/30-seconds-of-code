"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var flexSpec = require('./flex-spec');

var Declaration = require('../declaration');

var FlexDirection =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(FlexDirection, _Declaration);

  function FlexDirection() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = FlexDirection.prototype;

  /**
   * Return property name by final spec
   */
  _proto.normalize = function normalize() {
    return 'flex-direction';
  }
  /**
   * Use two properties for 2009 spec
   */
  ;

  _proto.insert = function insert(decl, prefix, prefixes) {
    var spec;

    var _flexSpec = flexSpec(prefix);

    spec = _flexSpec[0];
    prefix = _flexSpec[1];

    if (spec !== 2009) {
      return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
    }

    var already = decl.parent.some(function (i) {
      return i.prop === prefix + 'box-orient' || i.prop === prefix + 'box-direction';
    });

    if (already) {
      return undefined;
    }

    var v = decl.value;
    var orient, dir;

    if (v === 'inherit' || v === 'initial' || v === 'unset') {
      orient = v;
      dir = v;
    } else {
      orient = v.indexOf('row') !== -1 ? 'horizontal' : 'vertical';
      dir = v.indexOf('reverse') !== -1 ? 'reverse' : 'normal';
    }

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
  }
  /**
   * Clean two properties for 2009 spec
   */
  ;

  _proto.old = function old(prop, prefix) {
    var spec;

    var _flexSpec2 = flexSpec(prefix);

    spec = _flexSpec2[0];
    prefix = _flexSpec2[1];

    if (spec === 2009) {
      return [prefix + 'box-orient', prefix + 'box-direction'];
    } else {
      return _Declaration.prototype.old.call(this, prop, prefix);
    }
  };

  return FlexDirection;
}(Declaration);

_defineProperty(FlexDirection, "names", ['flex-direction', 'box-direction', 'box-orient']);

module.exports = FlexDirection;