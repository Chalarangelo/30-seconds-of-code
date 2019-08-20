"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var utils = require('./grid-utils');

var PlaceSelf =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(PlaceSelf, _Declaration);

  function PlaceSelf() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = PlaceSelf.prototype;

  /**
   * Translate place-self to separate -ms- prefixed properties
   */
  _proto.insert = function insert(decl, prefix, prefixes) {
    if (prefix !== '-ms-') return _Declaration.prototype.insert.call(this, decl, prefix, prefixes); // prevent doubling of prefixes

    if (decl.parent.some(function (i) {
      return i.prop === '-ms-grid-row-align';
    })) {
      return undefined;
    }

    var _utils$parse = utils.parse(decl),
        _utils$parse$ = _utils$parse[0],
        first = _utils$parse$[0],
        second = _utils$parse$[1];

    if (second) {
      utils.insertDecl(decl, 'grid-row-align', first);
      utils.insertDecl(decl, 'grid-column-align', second);
    } else {
      utils.insertDecl(decl, 'grid-row-align', first);
      utils.insertDecl(decl, 'grid-column-align', first);
    }

    return undefined;
  };

  return PlaceSelf;
}(Declaration);

_defineProperty(PlaceSelf, "names", ['place-self']);

module.exports = PlaceSelf;