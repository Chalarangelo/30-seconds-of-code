"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var list = require('postcss').list;

var Value = require('../value');

var CrossFade =
/*#__PURE__*/
function (_Value) {
  _inheritsLoose(CrossFade, _Value);

  function CrossFade() {
    return _Value.apply(this, arguments) || this;
  }

  var _proto = CrossFade.prototype;

  _proto.replace = function replace(string, prefix) {
    var _this = this;

    return list.space(string).map(function (value) {
      if (value.slice(0, +_this.name.length + 1) !== _this.name + '(') {
        return value;
      }

      var close = value.lastIndexOf(')');
      var after = value.slice(close + 1);
      var args = value.slice(_this.name.length + 1, close);

      if (prefix === '-webkit-') {
        var match = args.match(/\d*.?\d+%?/);

        if (match) {
          args = args.slice(match[0].length).trim();
          args += ", " + match[0];
        } else {
          args += ', 0.5';
        }
      }

      return prefix + _this.name + '(' + args + ')' + after;
    }).join(' ');
  };

  return CrossFade;
}(Value);

_defineProperty(CrossFade, "names", ['cross-fade']);

module.exports = CrossFade;