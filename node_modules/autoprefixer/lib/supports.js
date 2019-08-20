"use strict";

var postcss = require('postcss');

var data = require('caniuse-lite').feature(require('caniuse-lite/data/features/css-featurequeries.js'));

var Browsers = require('./browsers');

var brackets = require('./brackets');

var Value = require('./value');

var utils = require('./utils');

var supported = [];

for (var browser in data.stats) {
  var versions = data.stats[browser];

  for (var version in versions) {
    var support = versions[version];

    if (/y/.test(support)) {
      supported.push(browser + ' ' + version);
    }
  }
}

var Supports =
/*#__PURE__*/
function () {
  function Supports(Prefixes, all) {
    this.Prefixes = Prefixes;
    this.all = all;
  }
  /**
     * Return prefixer only with @supports supported browsers
     */


  var _proto = Supports.prototype;

  _proto.prefixer = function prefixer() {
    if (this.prefixerCache) {
      return this.prefixerCache;
    }

    var filtered = this.all.browsers.selected.filter(function (i) {
      return supported.indexOf(i) !== -1;
    });
    var browsers = new Browsers(this.all.browsers.data, filtered, this.all.options);
    this.prefixerCache = new this.Prefixes(this.all.data, browsers, this.all.options);
    return this.prefixerCache;
  }
  /**
     * Parse string into declaration property and value
     */
  ;

  _proto.parse = function parse(str) {
    var parts = str.split(':');
    var prop = parts[0];
    var value = parts[1];
    if (!value) value = '';
    return [prop.trim(), value.trim()];
  }
  /**
     * Create virtual rule to process it by prefixer
     */
  ;

  _proto.virtual = function virtual(str) {
    var _this$parse = this.parse(str),
        prop = _this$parse[0],
        value = _this$parse[1];

    var rule = postcss.parse('a{}').first;
    rule.append({
      prop: prop,
      value: value,
      raws: {
        before: ''
      }
    });
    return rule;
  }
  /**
     * Return array of Declaration with all necessary prefixes
     */
  ;

  _proto.prefixed = function prefixed(str) {
    var rule = this.virtual(str);

    if (this.disabled(rule.first)) {
      return rule.nodes;
    }

    var result = {
      warn: function warn() {
        return null;
      }
    };
    var prefixer = this.prefixer().add[rule.first.prop];
    prefixer && prefixer.process && prefixer.process(rule.first, result);

    for (var _iterator = rule.nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var decl = _ref;

      for (var _iterator2 = this.prefixer().values('add', rule.first.prop), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var value = _ref2;
        value.process(decl);
      }

      Value.save(this.all, decl);
    }

    return rule.nodes;
  }
  /**
     * Return true if brackets node is "not" word
     */
  ;

  _proto.isNot = function isNot(node) {
    return typeof node === 'string' && /not\s*/i.test(node);
  }
  /**
     * Return true if brackets node is "or" word
     */
  ;

  _proto.isOr = function isOr(node) {
    return typeof node === 'string' && /\s*or\s*/i.test(node);
  }
  /**
     * Return true if brackets node is (prop: value)
     */
  ;

  _proto.isProp = function isProp(node) {
    return typeof node === 'object' && node.length === 1 && typeof node[0] === 'string';
  }
  /**
     * Return true if prefixed property has no unprefixed
     */
  ;

  _proto.isHack = function isHack(all, unprefixed) {
    var check = new RegExp("(\\(|\\s)" + utils.escapeRegexp(unprefixed) + ":");
    return !check.test(all);
  }
  /**
     * Return true if we need to remove node
     */
  ;

  _proto.toRemove = function toRemove(str, all) {
    var _this$parse2 = this.parse(str),
        prop = _this$parse2[0],
        value = _this$parse2[1];

    var unprefixed = this.all.unprefixed(prop);
    var cleaner = this.all.cleaner();

    if (cleaner.remove[prop] && cleaner.remove[prop].remove && !this.isHack(all, unprefixed)) {
      return true;
    }

    for (var _iterator3 = cleaner.values('remove', unprefixed), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var checker = _ref3;

      if (checker.check(value)) {
        return true;
      }
    }

    return false;
  }
  /**
     * Remove all unnecessary prefixes
     */
  ;

  _proto.remove = function remove(nodes, all) {
    var i = 0;

    while (i < nodes.length) {
      if (!this.isNot(nodes[i - 1]) && this.isProp(nodes[i]) && this.isOr(nodes[i + 1])) {
        if (this.toRemove(nodes[i][0], all)) {
          nodes.splice(i, 2);
          continue;
        }

        i += 2;
        continue;
      }

      if (typeof nodes[i] === 'object') {
        nodes[i] = this.remove(nodes[i], all);
      }

      i += 1;
    }

    return nodes;
  }
  /**
     * Clean brackets with one child
     */
  ;

  _proto.cleanBrackets = function cleanBrackets(nodes) {
    var _this = this;

    return nodes.map(function (i) {
      if (typeof i !== 'object') {
        return i;
      }

      if (i.length === 1 && typeof i[0] === 'object') {
        return _this.cleanBrackets(i[0]);
      }

      return _this.cleanBrackets(i);
    });
  }
  /**
     * Add " or " between properties and convert it to brackets format
     */
  ;

  _proto.convert = function convert(progress) {
    var result = [''];

    for (var _iterator4 = progress, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      var _ref4;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref4 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref4 = _i4.value;
      }

      var i = _ref4;
      result.push([i.prop + ": " + i.value]);
      result.push(' or ');
    }

    result[result.length - 1] = '';
    return result;
  }
  /**
     * Compress value functions into a string nodes
     */
  ;

  _proto.normalize = function normalize(nodes) {
    var _this2 = this;

    if (typeof nodes !== 'object') {
      return nodes;
    }

    nodes = nodes.filter(function (i) {
      return i !== '';
    });

    if (typeof nodes[0] === 'string' && nodes[0].indexOf(':') !== -1) {
      return [brackets.stringify(nodes)];
    }

    return nodes.map(function (i) {
      return _this2.normalize(i);
    });
  }
  /**
     * Add prefixes
     */
  ;

  _proto.add = function add(nodes, all) {
    var _this3 = this;

    return nodes.map(function (i) {
      if (_this3.isProp(i)) {
        var prefixed = _this3.prefixed(i[0]);

        if (prefixed.length > 1) {
          return _this3.convert(prefixed);
        }

        return i;
      }

      if (typeof i === 'object') {
        return _this3.add(i, all);
      }

      return i;
    });
  }
  /**
     * Add prefixed declaration
     */
  ;

  _proto.process = function process(rule) {
    var ast = brackets.parse(rule.params);
    ast = this.normalize(ast);
    ast = this.remove(ast, rule.params);
    ast = this.add(ast, rule.params);
    ast = this.cleanBrackets(ast);
    rule.params = brackets.stringify(ast);
  }
  /**
     * Check global options
     */
  ;

  _proto.disabled = function disabled(node) {
    if (!this.all.options.grid) {
      if (node.prop === 'display' && node.value.indexOf('grid') !== -1) {
        return true;
      }

      if (node.prop.indexOf('grid') !== -1 || node.prop === 'justify-items') {
        return true;
      }
    }

    if (this.all.options.flexbox === false) {
      if (node.prop === 'display' && node.value.indexOf('flex') !== -1) {
        return true;
      }

      var other = ['order', 'justify-content', 'align-items', 'align-content'];

      if (node.prop.indexOf('flex') !== -1 || other.indexOf(node.prop) !== -1) {
        return true;
      }
    }

    return false;
  };

  return Supports;
}();

module.exports = Supports;