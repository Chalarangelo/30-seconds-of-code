"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Value = require('../value');

var DisplayGrid =
/*#__PURE__*/
function (_Value) {
  _inheritsLoose(DisplayGrid, _Value);

  function DisplayGrid(name, prefixes) {
    var _this;

    _this = _Value.call(this, name, prefixes) || this;

    if (name === 'display-grid') {
      _this.name = 'grid';
    }

    return _this;
  }
  /**
   * Faster check for flex value
   */


  var _proto = DisplayGrid.prototype;

  _proto.check = function check(decl) {
    return decl.prop === 'display' && decl.value === this.name;
  };

  return DisplayGrid;
}(Value);

_defineProperty(DisplayGrid, "names", ['display-grid', 'inline-grid']);

module.exports = DisplayGrid;