"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Declaration = require('../declaration');

var WritingMode =
/*#__PURE__*/
function (_Declaration) {
  _inheritsLoose(WritingMode, _Declaration);

  function WritingMode() {
    return _Declaration.apply(this, arguments) || this;
  }

  var _proto = WritingMode.prototype;

  _proto.insert = function insert(decl, prefix, prefixes) {
    if (prefix === '-ms-') {
      var cloned = this.set(this.clone(decl), prefix);

      if (this.needCascade(decl)) {
        cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
      }

      var direction = 'ltr';
      decl.parent.nodes.forEach(function (i) {
        if (i.prop === 'direction') {
          if (i.value === 'rtl' || i.value === 'ltr') direction = i.value;
        }
      });
      cloned.value = WritingMode.msValues[direction][decl.value] || decl.value;
      return decl.parent.insertBefore(decl, cloned);
    }

    return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
  };

  return WritingMode;
}(Declaration);

_defineProperty(WritingMode, "names", ['writing-mode']);

_defineProperty(WritingMode, "msValues", {
  ltr: {
    'horizontal-tb': 'lr-tb',
    'vertical-rl': 'tb-rl',
    'vertical-lr': 'tb-lr'
  },
  rtl: {
    'horizontal-tb': 'rl-tb',
    'vertical-rl': 'bt-rl',
    'vertical-lr': 'bt-lr'
  }
});

module.exports = WritingMode;