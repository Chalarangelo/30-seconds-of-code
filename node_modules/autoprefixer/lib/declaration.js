"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

var Prefixer = require('./prefixer');

var Browsers = require('./browsers');

var utils = require('./utils');

var Declaration =
/*#__PURE__*/
function (_Prefixer) {
  _inheritsLoose(Declaration, _Prefixer);

  function Declaration() {
    return _Prefixer.apply(this, arguments) || this;
  }

  var _proto = Declaration.prototype;

  /**
     * Always true, because we already get prefixer by property name
     */
  _proto.check = function check()
  /* decl */
  {
    return true;
  }
  /**
     * Return prefixed version of property
     */
  ;

  _proto.prefixed = function prefixed(prop, prefix) {
    return prefix + prop;
  }
  /**
     * Return unprefixed version of property
     */
  ;

  _proto.normalize = function normalize(prop) {
    return prop;
  }
  /**
     * Check `value`, that it contain other prefixes, rather than `prefix`
     */
  ;

  _proto.otherPrefixes = function otherPrefixes(value, prefix) {
    for (var _iterator = Browsers.prefixes(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var other = _ref;

      if (other === prefix) {
        continue;
      }

      if (value.indexOf(other) !== -1) {
        return true;
      }
    }

    return false;
  }
  /**
     * Set prefix to declaration
     */
  ;

  _proto.set = function set(decl, prefix) {
    decl.prop = this.prefixed(decl.prop, prefix);
    return decl;
  }
  /**
     * Should we use visual cascade for prefixes
     */
  ;

  _proto.needCascade = function needCascade(decl) {
    if (!decl._autoprefixerCascade) {
      decl._autoprefixerCascade = this.all.options.cascade !== false && decl.raw('before').indexOf('\n') !== -1;
    }

    return decl._autoprefixerCascade;
  }
  /**
     * Return maximum length of possible prefixed property
     */
  ;

  _proto.maxPrefixed = function maxPrefixed(prefixes, decl) {
    if (decl._autoprefixerMax) {
      return decl._autoprefixerMax;
    }

    var max = 0;

    for (var _iterator2 = prefixes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var prefix = _ref2;
      prefix = utils.removeNote(prefix);

      if (prefix.length > max) {
        max = prefix.length;
      }
    }

    decl._autoprefixerMax = max;
    return decl._autoprefixerMax;
  }
  /**
     * Calculate indentation to create visual cascade
     */
  ;

  _proto.calcBefore = function calcBefore(prefixes, decl, prefix) {
    if (prefix === void 0) {
      prefix = '';
    }

    var max = this.maxPrefixed(prefixes, decl);
    var diff = max - utils.removeNote(prefix).length;
    var before = decl.raw('before');

    if (diff > 0) {
      before += Array(diff).fill(' ').join('');
    }

    return before;
  }
  /**
     * Remove visual cascade
     */
  ;

  _proto.restoreBefore = function restoreBefore(decl) {
    var lines = decl.raw('before').split('\n');
    var min = lines[lines.length - 1];
    this.all.group(decl).up(function (prefixed) {
      var array = prefixed.raw('before').split('\n');
      var last = array[array.length - 1];

      if (last.length < min.length) {
        min = last;
      }
    });
    lines[lines.length - 1] = min;
    decl.raws.before = lines.join('\n');
  }
  /**
     * Clone and insert new declaration
     */
  ;

  _proto.insert = function insert(decl, prefix, prefixes) {
    var cloned = this.set(this.clone(decl), prefix);
    if (!cloned) return undefined;
    var already = decl.parent.some(function (i) {
      return i.prop === cloned.prop && i.value === cloned.value;
    });

    if (already) {
      return undefined;
    }

    if (this.needCascade(decl)) {
      cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
    }

    return decl.parent.insertBefore(decl, cloned);
  }
  /**
     * Did this declaration has this prefix above
     */
  ;

  _proto.isAlready = function isAlready(decl, prefixed) {
    var already = this.all.group(decl).up(function (i) {
      return i.prop === prefixed;
    });

    if (!already) {
      already = this.all.group(decl).down(function (i) {
        return i.prop === prefixed;
      });
    }

    return already;
  }
  /**
     * Clone and add prefixes for declaration
     */
  ;

  _proto.add = function add(decl, prefix, prefixes, result) {
    var prefixed = this.prefixed(decl.prop, prefix);

    if (this.isAlready(decl, prefixed) || this.otherPrefixes(decl.value, prefix)) {
      return undefined;
    }

    return this.insert(decl, prefix, prefixes, result);
  }
  /**
     * Add spaces for visual cascade
     */
  ;

  _proto.process = function process(decl, result) {
    if (!this.needCascade(decl)) {
      _Prefixer.prototype.process.call(this, decl, result);

      return;
    }

    var prefixes = _Prefixer.prototype.process.call(this, decl, result);

    if (!prefixes || !prefixes.length) {
      return;
    }

    this.restoreBefore(decl);
    decl.raws.before = this.calcBefore(prefixes, decl);
  }
  /**
     * Return list of prefixed properties to clean old prefixes
     */
  ;

  _proto.old = function old(prop, prefix) {
    return [this.prefixed(prop, prefix)];
  };

  return Declaration;
}(Prefixer);

module.exports = Declaration;