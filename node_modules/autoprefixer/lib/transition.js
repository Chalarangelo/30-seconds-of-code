"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var parser = require('postcss-value-parser');

var vendor = require('postcss').vendor;

var list = require('postcss').list;

var Transition =
/*#__PURE__*/
function () {
  function Transition(prefixes) {
    _defineProperty(this, "props", ['transition', 'transition-property']);

    this.prefixes = prefixes;
  }
  /**
   * Process transition and add prefixes for all necessary properties
   */


  var _proto = Transition.prototype;

  _proto.add = function add(decl, result) {
    var _this = this;

    var prefix, prop;
    var add = this.prefixes.add[decl.prop];
    var declPrefixes = add && add.prefixes || [];
    var params = this.parse(decl.value);
    var names = params.map(function (i) {
      return _this.findProp(i);
    });
    var added = [];

    if (names.some(function (i) {
      return i[0] === '-';
    })) {
      return;
    }

    for (var _iterator = params, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var param = _ref;
      prop = this.findProp(param);
      if (prop[0] === '-') continue;
      var prefixer = this.prefixes.add[prop];
      if (!prefixer || !prefixer.prefixes) continue;

      for (var _iterator3 = prefixer.prefixes, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          prefix = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          prefix = _i3.value;
        }

        var prefixed = this.prefixes.prefixed(prop, prefix);

        if (prefixed !== '-ms-transform' && names.indexOf(prefixed) === -1) {
          if (!this.disabled(prop, prefix)) {
            added.push(this.clone(prop, prefixed, param));
          }
        }
      }
    }

    params = params.concat(added);
    var value = this.stringify(params);
    var webkitClean = this.stringify(this.cleanFromUnprefixed(params, '-webkit-'));

    if (declPrefixes.indexOf('-webkit-') !== -1) {
      this.cloneBefore(decl, "-webkit-" + decl.prop, webkitClean);
    }

    this.cloneBefore(decl, decl.prop, webkitClean);

    if (declPrefixes.indexOf('-o-') !== -1) {
      var operaClean = this.stringify(this.cleanFromUnprefixed(params, '-o-'));
      this.cloneBefore(decl, "-o-" + decl.prop, operaClean);
    }

    for (var _iterator2 = declPrefixes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        prefix = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        prefix = _i2.value;
      }

      if (prefix !== '-webkit-' && prefix !== '-o-') {
        var prefixValue = this.stringify(this.cleanOtherPrefixes(params, prefix));
        this.cloneBefore(decl, prefix + decl.prop, prefixValue);
      }
    }

    if (value !== decl.value && !this.already(decl, decl.prop, value)) {
      this.checkForWarning(result, decl);
      decl.cloneBefore();
      decl.value = value;
    }
  }
  /**
   * Find property name
   */
  ;

  _proto.findProp = function findProp(param) {
    var prop = param[0].value;

    if (/^\d/.test(prop)) {
      for (var i = 0; i < param.length; i++) {
        var token = param[i];

        if (i !== 0 && token.type === 'word') {
          return token.value;
        }
      }
    }

    return prop;
  }
  /**
   * Does we already have this declaration
   */
  ;

  _proto.already = function already(decl, prop, value) {
    return decl.parent.some(function (i) {
      return i.prop === prop && i.value === value;
    });
  }
  /**
   * Add declaration if it is not exist
   */
  ;

  _proto.cloneBefore = function cloneBefore(decl, prop, value) {
    if (!this.already(decl, prop, value)) {
      decl.cloneBefore({
        prop: prop,
        value: value
      });
    }
  }
  /**
   * Show transition-property warning
   */
  ;

  _proto.checkForWarning = function checkForWarning(result, decl) {
    if (decl.prop !== 'transition-property') {
      return;
    }

    decl.parent.each(function (i) {
      if (i.type !== 'decl') {
        return undefined;
      }

      if (i.prop.indexOf('transition-') !== 0) {
        return undefined;
      }

      if (i.prop === 'transition-property') {
        return undefined;
      }

      if (list.comma(i.value).length > 1) {
        decl.warn(result, 'Replace transition-property to transition, ' + 'because Autoprefixer could not support ' + 'any cases of transition-property ' + 'and other transition-*');
      }

      return false;
    });
  }
  /**
   * Process transition and remove all unnecessary properties
   */
  ;

  _proto.remove = function remove(decl) {
    var _this2 = this;

    var params = this.parse(decl.value);
    params = params.filter(function (i) {
      var prop = _this2.prefixes.remove[_this2.findProp(i)];

      return !prop || !prop.remove;
    });
    var value = this.stringify(params);

    if (decl.value === value) {
      return;
    }

    if (params.length === 0) {
      decl.remove();
      return;
    }

    var double = decl.parent.some(function (i) {
      return i.prop === decl.prop && i.value === value;
    });
    var smaller = decl.parent.some(function (i) {
      return i !== decl && i.prop === decl.prop && i.value.length > value.length;
    });

    if (double || smaller) {
      decl.remove();
      return;
    }

    decl.value = value;
  }
  /**
   * Parse properties list to array
   */
  ;

  _proto.parse = function parse(value) {
    var ast = parser(value);
    var result = [];
    var param = [];

    for (var _iterator4 = ast.nodes, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref2 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref2 = _i4.value;
      }

      var node = _ref2;
      param.push(node);

      if (node.type === 'div' && node.value === ',') {
        result.push(param);
        param = [];
      }
    }

    result.push(param);
    return result.filter(function (i) {
      return i.length > 0;
    });
  }
  /**
   * Return properties string from array
   */
  ;

  _proto.stringify = function stringify(params) {
    if (params.length === 0) {
      return '';
    }

    var nodes = [];

    for (var _iterator5 = params, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray5) {
        if (_i5 >= _iterator5.length) break;
        _ref3 = _iterator5[_i5++];
      } else {
        _i5 = _iterator5.next();
        if (_i5.done) break;
        _ref3 = _i5.value;
      }

      var param = _ref3;

      if (param[param.length - 1].type !== 'div') {
        param.push(this.div(params));
      }

      nodes = nodes.concat(param);
    }

    if (nodes[0].type === 'div') {
      nodes = nodes.slice(1);
    }

    if (nodes[nodes.length - 1].type === 'div') {
      nodes = nodes.slice(0, +-2 + 1 || undefined);
    }

    return parser.stringify({
      nodes: nodes
    });
  }
  /**
   * Return new param array with different name
   */
  ;

  _proto.clone = function clone(origin, name, param) {
    var result = [];
    var changed = false;

    for (var _iterator6 = param, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
      var _ref4;

      if (_isArray6) {
        if (_i6 >= _iterator6.length) break;
        _ref4 = _iterator6[_i6++];
      } else {
        _i6 = _iterator6.next();
        if (_i6.done) break;
        _ref4 = _i6.value;
      }

      var i = _ref4;

      if (!changed && i.type === 'word' && i.value === origin) {
        result.push({
          type: 'word',
          value: name
        });
        changed = true;
      } else {
        result.push(i);
      }
    }

    return result;
  }
  /**
   * Find or create separator
   */
  ;

  _proto.div = function div(params) {
    for (var _iterator7 = params, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
      var _ref5;

      if (_isArray7) {
        if (_i7 >= _iterator7.length) break;
        _ref5 = _iterator7[_i7++];
      } else {
        _i7 = _iterator7.next();
        if (_i7.done) break;
        _ref5 = _i7.value;
      }

      var param = _ref5;

      for (var _iterator8 = param, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
        var _ref6;

        if (_isArray8) {
          if (_i8 >= _iterator8.length) break;
          _ref6 = _iterator8[_i8++];
        } else {
          _i8 = _iterator8.next();
          if (_i8.done) break;
          _ref6 = _i8.value;
        }

        var node = _ref6;

        if (node.type === 'div' && node.value === ',') {
          return node;
        }
      }
    }

    return {
      type: 'div',
      value: ',',
      after: ' '
    };
  };

  _proto.cleanOtherPrefixes = function cleanOtherPrefixes(params, prefix) {
    var _this3 = this;

    return params.filter(function (param) {
      var current = vendor.prefix(_this3.findProp(param));
      return current === '' || current === prefix;
    });
  }
  /**
   * Remove all non-webkit prefixes and unprefixed params if we have prefixed
   */
  ;

  _proto.cleanFromUnprefixed = function cleanFromUnprefixed(params, prefix) {
    var _this4 = this;

    var remove = params.map(function (i) {
      return _this4.findProp(i);
    }).filter(function (i) {
      return i.slice(0, prefix.length) === prefix;
    }).map(function (i) {
      return _this4.prefixes.unprefixed(i);
    });
    var result = [];

    for (var _iterator9 = params, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
      var _ref7;

      if (_isArray9) {
        if (_i9 >= _iterator9.length) break;
        _ref7 = _iterator9[_i9++];
      } else {
        _i9 = _iterator9.next();
        if (_i9.done) break;
        _ref7 = _i9.value;
      }

      var param = _ref7;
      var prop = this.findProp(param);
      var p = vendor.prefix(prop);

      if (remove.indexOf(prop) === -1 && (p === prefix || p === '')) {
        result.push(param);
      }
    }

    return result;
  }
  /**
   * Check property for disabled by option
   */
  ;

  _proto.disabled = function disabled(prop, prefix) {
    var other = ['order', 'justify-content', 'align-self', 'align-content'];

    if (prop.indexOf('flex') !== -1 || other.indexOf(prop) !== -1) {
      if (this.prefixes.options.flexbox === false) {
        return true;
      }

      if (this.prefixes.options.flexbox === 'no-2009') {
        return prefix.indexOf('2009') !== -1;
      }
    }

    return undefined;
  };

  return Transition;
}();

module.exports = Transition;