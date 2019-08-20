"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var utils = require('./grid-utils');

var GridRowColumn =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(GridRowColumn, _Declaration);

  function GridRowColumn() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = GridRowColumn.prototype;

  /**
   * Translate grid-row / grid-column to separate -ms- prefixed properties
   */
  _proto.insert = function insert(decl, prefix, prefixes) {
    if (prefix !== '-ms-') return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
    var values = utils.parse(decl);

    var _utils$translate = utils.translate(values, 0, 1),
        start = _utils$translate[0],
        span = _utils$translate[1];

    var hasStartValueSpan = values[0] && values[0].includes('span');

    if (hasStartValueSpan) {
      span = values[0].join('').replace(/\D/g, '');
    }

    [[decl.prop, start], [decl.prop + "-span", span]].forEach(function (_ref) {
      var prop = _ref[0],
          value = _ref[1];
      utils.insertDecl(decl, prop, value);
    });
    return undefined;
  };

  return GridRowColumn;
}(Declaration);

_defineProperty(GridRowColumn, "names", ['grid-row', 'grid-column']);

module.exports = GridRowColumn;