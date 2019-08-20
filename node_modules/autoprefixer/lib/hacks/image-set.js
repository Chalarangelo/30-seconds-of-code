"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Value = require('../value');

var ImageSet =
/*#__PURE__*/
function (_Value) {
  _inheritsLoose(ImageSet, _Value);

  function ImageSet() {
    return _Value.apply(this, arguments) || this;
  }

  var _proto = ImageSet.prototype;

  /**
   * Use non-standard name for WebKit and Firefox
   */
  _proto.replace = function replace(string, prefix) {
    var fixed = _Value.prototype.replace.call(this, string, prefix);

    if (prefix === '-webkit-') {
      fixed = fixed.replace(/("[^"]+"|'[^']+')(\s+\d+\w)/gi, 'url($1)$2');
    }

    return fixed;
  };

  return ImageSet;
}(Value);

_defineProperty(ImageSet, "names", ['image-set']);

module.exports = ImageSet;