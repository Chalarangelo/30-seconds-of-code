"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var utils = require('../utils');

var BackdropFilter =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(BackdropFilter, _Declaration);

  function BackdropFilter(name, prefixes, all) {
    var _this;

    _this = _Declaration.call(this, name, prefixes, all) || this;

    if (_this.prefixes) {
      _this.prefixes = utils.uniq(_this.prefixes.map(function (i) {
        return i === '-ms-' ? '-webkit-' : i;
      }));
    }

    return _this;
  }

  return BackdropFilter;
}(Declaration);

_defineProperty(BackdropFilter, "names", ['backdrop-filter']);

module.exports = BackdropFilter;