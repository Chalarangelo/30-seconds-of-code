"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var GridEnd =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(GridEnd, _Declaration);

  function GridEnd() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = GridEnd.prototype;

  /**
   * Change repeating syntax for IE
   */
  _proto.insert = function insert(decl, prefix, prefixes, result) {
    if (prefix !== '-ms-') return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
    var clonedDecl = this.clone(decl);
    var startProp = decl.prop.replace(/end$/, 'start');
    var spanProp = prefix + decl.prop.replace(/end$/, 'span');

    if (decl.parent.some(function (i) {
      return i.prop === spanProp;
    })) {
      return undefined;
    }

    clonedDecl.prop = spanProp;

    if (decl.value.includes('span')) {
      clonedDecl.value = decl.value.replace(/span\s/i, '');
    } else {
      var startDecl;
      decl.parent.walkDecls(startProp, function (d) {
        startDecl = d;
      });

      if (startDecl) {
        var value = Number(decl.value) - Number(startDecl.value) + '';
        clonedDecl.value = value;
      } else {
        decl.warn(result, "Can not prefix " + decl.prop + " (" + startProp + " is not found)");
      }
    }

    decl.cloneBefore(clonedDecl);
    return undefined;
  };

  return GridEnd;
}(Declaration);

_defineProperty(GridEnd, "names", ['grid-row-end', 'grid-column-end']);

module.exports = GridEnd;