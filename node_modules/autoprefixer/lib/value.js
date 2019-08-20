"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

var vendor = require('postcss').vendor;

var Prefixer = require('./prefixer');

var OldValue = require('./old-value');

var utils = require('./utils');

var Value =
/*#__PURE__*/
function (_Prefixer) {
  _inheritsLoose(Value, _Prefixer);

  function Value() {
    return _Prefixer.apply(this, arguments) || this;
  }

  /**
     * Clone decl for each prefixed values
     */
  Value.save = function save(prefixes, decl) {
    var _this = this;

    var prop = decl.prop;
    var result = [];

    var _loop = function _loop(prefix) {
      var value = decl._autoprefixerValues[prefix];

      if (value === decl.value) {
        return "continue";
      }

      var item = void 0;
      var propPrefix = vendor.prefix(prop);

      if (propPrefix === '-pie-') {
        return "continue";
      }

      if (propPrefix === prefix) {
        item = decl.value = value;
        result.push(item);
        return "continue";
      }

      var prefixed = prefixes.prefixed(prop, prefix);
      var rule = decl.parent;

      if (!rule.every(function (i) {
        return i.prop !== prefixed;
      })) {
        result.push(item);
        return "continue";
      }

      var trimmed = value.replace(/\s+/, ' ');
      var already = rule.some(function (i) {
        return i.prop === decl.prop && i.value.replace(/\s+/, ' ') === trimmed;
      });

      if (already) {
        result.push(item);
        return "continue";
      }

      var cloned = _this.clone(decl, {
        value: value
      });

      item = decl.parent.insertBefore(decl, cloned);
      result.push(item);
    };

    for (var prefix in decl._autoprefixerValues) {
      var _ret = _loop(prefix);

      if (_ret === "continue") continue;
    }

    return result;
  }
  /**
     * Is declaration need to be prefixed
     */
  ;

  var _proto = Value.prototype;

  _proto.check = function check(decl) {
    var value = decl.value;

    if (value.indexOf(this.name) === -1) {
      return false;
    }

    return !!value.match(this.regexp());
  }
  /**
     * Lazy regexp loading
     */
  ;

  _proto.regexp = function regexp() {
    return this.regexpCache || (this.regexpCache = utils.regexp(this.name));
  }
  /**
     * Add prefix to values in string
     */
  ;

  _proto.replace = function replace(string, prefix) {
    return string.replace(this.regexp(), "$1" + prefix + "$2");
  }
  /**
     * Get value with comments if it was not changed
     */
  ;

  _proto.value = function value(decl) {
    if (decl.raws.value && decl.raws.value.value === decl.value) {
      return decl.raws.value.raw;
    } else {
      return decl.value;
    }
  }
  /**
     * Save values with next prefixed token
     */
  ;

  _proto.add = function add(decl, prefix) {
    if (!decl._autoprefixerValues) {
      decl._autoprefixerValues = {};
    }

    var value = decl._autoprefixerValues[prefix] || this.value(decl);
    var before;

    do {
      before = value;
      value = this.replace(value, prefix);
      if (value === false) return;
    } while (value !== before);

    decl._autoprefixerValues[prefix] = value;
  }
  /**
     * Return function to fast find prefixed value
     */
  ;

  _proto.old = function old(prefix) {
    return new OldValue(this.name, prefix + this.name);
  };

  return Value;
}(Prefixer);

module.exports = Value;