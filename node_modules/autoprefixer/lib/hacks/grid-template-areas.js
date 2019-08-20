"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var _require = require('./grid-utils'),
    parseGridAreas = _require.parseGridAreas,
    warnMissedAreas = _require.warnMissedAreas,
    prefixTrackProp = _require.prefixTrackProp,
    prefixTrackValue = _require.prefixTrackValue,
    getGridGap = _require.getGridGap,
    warnGridGap = _require.warnGridGap,
    inheritGridGap = _require.inheritGridGap;

function getGridRows(tpl) {
  return tpl.trim().slice(1, -1).split(/['"]\s*['"]?/g);
}

var GridTemplateAreas =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(GridTemplateAreas, _Declaration);

  function GridTemplateAreas() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = GridTemplateAreas.prototype;

  /**
   * Translate grid-template-areas to separate -ms- prefixed properties
   */
  _proto.insert = function insert(decl, prefix, prefixes, result) {
    if (prefix !== '-ms-') return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
    var hasColumns = false;
    var hasRows = false;
    var parent = decl.parent;
    var gap = getGridGap(decl);
    gap = inheritGridGap(decl, gap) || gap; // remove already prefixed rows
    // to prevent doubling prefixes

    parent.walkDecls(/-ms-grid-rows/, function (i) {
      return i.remove();
    }); // add empty tracks to rows

    parent.walkDecls(/grid-template-(rows|columns)/, function (trackDecl) {
      if (trackDecl.prop === 'grid-template-rows') {
        hasRows = true;
        var prop = trackDecl.prop,
            value = trackDecl.value;
        trackDecl.cloneBefore({
          prop: prefixTrackProp({
            prop: prop,
            prefix: prefix
          }),
          value: prefixTrackValue({
            value: value,
            gap: gap.row
          })
        });
      } else {
        hasColumns = true;
      }
    });
    var gridRows = getGridRows(decl.value);

    if (hasColumns && !hasRows && gap.row && gridRows.length > 1) {
      decl.cloneBefore({
        prop: '-ms-grid-rows',
        value: prefixTrackValue({
          value: "repeat(" + gridRows.length + ", auto)",
          gap: gap.row
        }),
        raws: {}
      });
    } // warnings


    warnGridGap({
      gap: gap,
      hasColumns: hasColumns,
      decl: decl,
      result: result
    });
    var areas = parseGridAreas({
      rows: gridRows,
      gap: gap
    });
    warnMissedAreas(areas, decl, result);
    return decl;
  };

  return GridTemplateAreas;
}(Declaration);

_defineProperty(GridTemplateAreas, "names", ['grid-template-areas']);

module.exports = GridTemplateAreas;