"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

var OldSelector = require('./old-selector');

var Prefixer = require('./prefixer');

var Browsers = require('./browsers');

var utils = require('./utils');

var Selector =
/*#__PURE__*/
function (_Prefixer) {
  _inheritsLoose(Selector, _Prefixer);

  function Selector(name, prefixes, all) {
    var _this;

    _this = _Prefixer.call(this, name, prefixes, all) || this;
    _this.regexpCache = {};
    return _this;
  }
  /**
     * Is rule selectors need to be prefixed
     */


  var _proto = Selector.prototype;

  _proto.check = function check(rule) {
    if (rule.selector.indexOf(this.name) !== -1) {
      return !!rule.selector.match(this.regexp());
    }

    return false;
  }
  /**
     * Return prefixed version of selector
     */
  ;

  _proto.prefixed = function prefixed(prefix) {
    return this.name.replace(/^([^\w]*)/, "$1" + prefix);
  }
  /**
     * Lazy loadRegExp for name
     */
  ;

  _proto.regexp = function regexp(prefix) {
    if (this.regexpCache[prefix]) {
      return this.regexpCache[prefix];
    }

    var name = prefix ? this.prefixed(prefix) : this.name;
    this.regexpCache[prefix] = new RegExp("(^|[^:\"'=])" + utils.escapeRegexp(name), 'gi');
    return this.regexpCache[prefix];
  }
  /**
     * All possible prefixes
     */
  ;

  _proto.possible = function possible() {
    return Browsers.prefixes();
  }
  /**
     * Return all possible selector prefixes
     */
  ;

  _proto.prefixeds = function prefixeds(rule) {
    if (rule._autoprefixerPrefixeds) {
      return rule._autoprefixerPrefixeds;
    }

    var prefixeds = {};

    for (var _iterator = this.possible(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var prefix = _ref;
      prefixeds[prefix] = this.replace(rule.selector, prefix);
    }

    rule._autoprefixerPrefixeds = prefixeds;
    return rule._autoprefixerPrefixeds;
  }
  /**
     * Is rule already prefixed before
     */
  ;

  _proto.already = function already(rule, prefixeds, prefix) {
    var index = rule.parent.index(rule) - 1;

    while (index >= 0) {
      var before = rule.parent.nodes[index];

      if (before.type !== 'rule') {
        return false;
      }

      var some = false;

      for (var key in prefixeds) {
        var prefixed = prefixeds[key];

        if (before.selector === prefixed) {
          if (prefix === key) {
            return true;
          } else {
            some = true;
            break;
          }
        }
      }

      if (!some) {
        return false;
      }

      index -= 1;
    }

    return false;
  }
  /**
     * Replace selectors by prefixed one
     */
  ;

  _proto.replace = function replace(selector, prefix) {
    return selector.replace(this.regexp(), "$1" + this.prefixed(prefix));
  }
  /**
     * Clone and add prefixes for at-rule
     */
  ;

  _proto.add = function add(rule, prefix) {
    var prefixeds = this.prefixeds(rule);

    if (this.already(rule, prefixeds, prefix)) {
      return;
    }

    var cloned = this.clone(rule, {
      selector: prefixeds[prefix]
    });
    rule.parent.insertBefore(rule, cloned);
  }
  /**
     * Return function to fast find prefixed selector
     */
  ;

  _proto.old = function old(prefix) {
    return new OldSelector(this, prefix);
  };

  return Selector;
}(Prefixer);

module.exports = Selector;