"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

var n2f = require('num2fraction');

var Prefixer = require('./prefixer');

var utils = require('./utils');

var REGEXP = /(min|max)-resolution\s*:\s*\d*\.?\d+(dppx|dpi|x)/gi;
var SPLIT = /(min|max)-resolution(\s*:\s*)(\d*\.?\d+)(dppx|dpi|x)/i;

var Resolution =
/*#__PURE__*/
function (_Prefixer) {
  _inheritsLoose(Resolution, _Prefixer);

  function Resolution() {
    return _Prefixer.apply(this, arguments) || this;
  }

  var _proto = Resolution.prototype;

  /**
     * Return prefixed query name
     */
  _proto.prefixName = function prefixName(prefix, name) {
    if (prefix === '-moz-') {
      return name + '--moz-device-pixel-ratio';
    } else {
      return prefix + name + '-device-pixel-ratio';
    }
  }
  /**
     * Return prefixed query
     */
  ;

  _proto.prefixQuery = function prefixQuery(prefix, name, colon, value, units) {
    if (units === 'dpi') {
      value = Number(value / 96);
    }

    if (prefix === '-o-') {
      value = n2f(value);
    }

    return this.prefixName(prefix, name) + colon + value;
  }
  /**
     * Remove prefixed queries
     */
  ;

  _proto.clean = function clean(rule) {
    var _this = this;

    if (!this.bad) {
      this.bad = [];

      for (var _iterator = this.prefixes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
        this.bad.push(this.prefixName(prefix, 'min'));
        this.bad.push(this.prefixName(prefix, 'max'));
      }
    }

    rule.params = utils.editList(rule.params, function (queries) {
      return queries.filter(function (query) {
        return _this.bad.every(function (i) {
          return query.indexOf(i) === -1;
        });
      });
    });
  }
  /**
     * Add prefixed queries
     */
  ;

  _proto.process = function process(rule) {
    var _this2 = this;

    var parent = this.parentPrefix(rule);
    var prefixes = parent ? [parent] : this.prefixes;
    rule.params = utils.editList(rule.params, function (origin, prefixed) {
      for (var _iterator2 = origin, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var query = _ref2;

        if (query.indexOf('min-resolution') === -1 && query.indexOf('max-resolution') === -1) {
          prefixed.push(query);
          continue;
        }

        var _loop = function _loop() {
          if (_isArray3) {
            if (_i3 >= _iterator3.length) return "break";
            _ref3 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) return "break";
            _ref3 = _i3.value;
          }

          var prefix = _ref3;
          var processed = query.replace(REGEXP, function (str) {
            var parts = str.match(SPLIT);
            return _this2.prefixQuery(prefix, parts[1], parts[2], parts[3], parts[4]);
          });
          prefixed.push(processed);
        };

        for (var _iterator3 = prefixes, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref3;

          var _ret = _loop();

          if (_ret === "break") break;
        }

        prefixed.push(query);
      }

      return utils.uniq(prefixed);
    });
  };

  return Resolution;
}(Prefixer);

module.exports = Resolution;