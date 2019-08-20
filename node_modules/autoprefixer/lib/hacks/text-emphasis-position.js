"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var TextEmphasisPosition =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(TextEmphasisPosition, _Declaration);

  function TextEmphasisPosition() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = TextEmphasisPosition.prototype;

  _proto.set = function set(decl, prefix) {
    if (prefix === '-webkit-') {
      decl.value = decl.value.replace(/\s*(right|left)\s*/i, '');
    }

    return _Declaration.prototype.set.call(this, decl, prefix);
  };

  return TextEmphasisPosition;
}(Declaration);

_defineProperty(TextEmphasisPosition, "names", ['text-emphasis-position']);

module.exports = TextEmphasisPosition;