"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var _require = require('./grid-utils'),
    parseTemplate = _require.parseTemplate,
    warnMissedAreas = _require.warnMissedAreas,
    getGridGap = _require.getGridGap,
    warnGridGap = _require.warnGridGap,
    inheritGridGap = _require.inheritGridGap;

var GridTemplate =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(GridTemplate, _Declaration);

  function GridTemplate() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = GridTemplate.prototype;

  /**
   * Translate grid-template to separate -ms- prefixed properties
   */
  _proto.insert = function insert(decl, prefix, prefixes, result) {
    if (prefix !== '-ms-') return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);

    if (decl.parent.some(function (i) {
      return i.prop === '-ms-grid-rows';
    })) {
      return undefined;
    }

    var gap = getGridGap(decl);
    /**
     * we must insert inherited gap values in some cases:
     * if we are inside media query && if we have no grid-gap value
    */

    var inheritedGap = inheritGridGap(decl, gap);

    var _parseTemplate = parseTemplate({
      decl: decl,
      gap: inheritedGap || gap
    }),
        rows = _parseTemplate.rows,
        columns = _parseTemplate.columns,
        areas = _parseTemplate.areas;

    var hasAreas = Object.keys(areas).length > 0;
    var hasRows = Boolean(rows);
    var hasColumns = Boolean(columns);
    warnGridGap({
      gap: gap,
      hasColumns: hasColumns,
      decl: decl,
      result: result
    });
    warnMissedAreas(areas, decl, result);

    if (hasRows && hasColumns || hasAreas) {
      decl.cloneBefore({
        prop: '-ms-grid-rows',
        value: rows,
        raws: {}
      });
    }

    if (hasColumns) {
      decl.cloneBefore({
        prop: '-ms-grid-columns',
        value: columns,
        raws: {}
      });
    }

    return decl;
  };

  return GridTemplate;
}(Declaration);

_defineProperty(GridTemplate, "names", ['grid-template']);

module.exports = GridTemplate;