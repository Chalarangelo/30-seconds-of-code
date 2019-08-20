"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var utils = require('./grid-utils');

var GridArea =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(GridArea, _Declaration);

  function GridArea() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = GridArea.prototype;

  /**
   * Translate grid-area to separate -ms- prefixed properties
   */
  _proto.insert = function insert(decl, prefix, prefixes, result) {
    if (prefix !== '-ms-') return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
    var values = utils.parse(decl);

    var _utils$translate = utils.translate(values, 0, 2),
        rowStart = _utils$translate[0],
        rowSpan = _utils$translate[1];

    var _utils$translate2 = utils.translate(values, 1, 3),
        columnStart = _utils$translate2[0],
        columnSpan = _utils$translate2[1];

    [['grid-row', rowStart], ['grid-row-span', rowSpan], ['grid-column', columnStart], ['grid-column-span', columnSpan]].forEach(function (_ref) {
      var prop = _ref[0],
          value = _ref[1];
      utils.insertDecl(decl, prop, value);
    });
    utils.warnTemplateSelectorNotFound(decl, result);
    utils.warnIfGridRowColumnExists(decl, result);
    return undefined;
  };

  return GridArea;
}(Declaration);

_defineProperty(GridArea, "names", ['grid-area']);

module.exports = GridArea;