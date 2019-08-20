"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var _require = require('./grid-utils'),
    prefixTrackProp = _require.prefixTrackProp,
    prefixTrackValue = _require.prefixTrackValue,
    autoplaceGridItems = _require.autoplaceGridItems,
    getGridGap = _require.getGridGap,
    inheritGridGap = _require.inheritGridGap;

var Processor = require('../processor');

var GridRowsColumns =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(GridRowsColumns, _Declaration);

  function GridRowsColumns() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = GridRowsColumns.prototype;

  /**
   * Change property name for IE
   */
  _proto.prefixed = function prefixed(prop, prefix) {
    if (prefix === '-ms-') {
      return prefixTrackProp({
        prop: prop,
        prefix: prefix
      });
    }

    return _Declaration.prototype.prefixed.call(this, prop, prefix);
  }
  /**
   * Change IE property back
   */
  ;

  _proto.normalize = function normalize(prop) {
    return prop.replace(/^grid-(rows|columns)/, 'grid-template-$1');
  };

  _proto.insert = function insert(decl, prefix, prefixes, result) {
    if (prefix !== '-ms-') return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
    var parent = decl.parent,
        prop = decl.prop,
        value = decl.value;
    var isRowProp = prop.includes('rows');
    var isColumnProp = prop.includes('columns');
    var hasGridTemplate = parent.some(function (i) {
      return i.prop === 'grid-template' || i.prop === 'grid-template-areas';
    });
    /**
     * Not to prefix rows declaration if grid-template(-areas) is present
     */

    if (hasGridTemplate && isRowProp) {
      return false;
    }

    var processor = new Processor({});
    var status = processor.gridStatus(parent, result);
    var gap = getGridGap(decl);
    gap = inheritGridGap(decl, gap) || gap;
    var gapValue = isRowProp ? gap.row : gap.column;

    if ((status === 'no-autoplace' || status === true) && !hasGridTemplate) {
      gapValue = null;
    }

    var prefixValue = prefixTrackValue({
      value: value,
      gap: gapValue
    });
    /**
     * Insert prefixes
     */

    decl.cloneBefore({
      prop: prefixTrackProp({
        prop: prop,
        prefix: prefix
      }),
      value: prefixValue
    });
    var autoflow = parent.nodes.find(function (i) {
      return i.prop === 'grid-auto-flow';
    });
    var autoflowValue = 'row';

    if (autoflow && !processor.disabled(autoflow, result)) {
      autoflowValue = autoflow.value.trim();
    }

    if (status === 'autoplace') {
      /**
       * Show warning if grid-template-rows decl is not found
       */
      var rowDecl = parent.nodes.find(function (i) {
        return i.prop === 'grid-template-rows';
      });

      if (!rowDecl && hasGridTemplate) {
        return undefined;
      } else if (!rowDecl && !hasGridTemplate) {
        decl.warn(result, "Autoplacement does not work without grid-template-rows property");
        return undefined;
      }
      /**
       * Show warning if grid-template-columns decl is not found
       */


      var columnDecl = parent.nodes.find(function (i) {
        return i.prop === 'grid-template-columns';
      });

      if (!columnDecl && !hasGridTemplate) {
        decl.warn(result, "Autoplacement does not work without grid-template-columns property");
      }
      /**
       * Autoplace grid items
       */


      if (isColumnProp && !hasGridTemplate) {
        autoplaceGridItems(decl, result, gap, autoflowValue);
      }
    }

    return undefined;
  };

  return GridRowsColumns;
}(Declaration);

_defineProperty(GridRowsColumns, "names", ['grid-template-rows', 'grid-template-columns', 'grid-rows', 'grid-columns']);

module.exports = GridRowsColumns;