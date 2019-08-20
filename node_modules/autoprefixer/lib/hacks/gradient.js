"use strict";

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _defaults(subClass, superClass); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var parser = require('postcss-value-parser');

var range = require('normalize-range');

var OldValue = require('../old-value');

var Value = require('../value');

var utils = require('../utils');

var IS_DIRECTION = /top|left|right|bottom/gi;

var Gradient =
/*#__PURE__*/
function (_Value) {
  _inheritsLoose(Gradient, _Value);

  function Gradient() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Value.call.apply(_Value, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "directions", {
      top: 'bottom',
      left: 'right',
      bottom: 'top',
      right: 'left' // Direction to replace

    });

    _defineProperty(_assertThisInitialized(_this), "oldDirections", {
      'top': 'left bottom, left top',
      'left': 'right top, left top',
      'bottom': 'left top, left bottom',
      'right': 'left top, right top',
      'top right': 'left bottom, right top',
      'top left': 'right bottom, left top',
      'right top': 'left bottom, right top',
      'right bottom': 'left top, right bottom',
      'bottom right': 'left top, right bottom',
      'bottom left': 'right top, left bottom',
      'left top': 'right bottom, left top',
      'left bottom': 'right top, left bottom'
      /**
       * Change degrees for webkit prefix
       */

    });

    return _this;
  }

  var _proto = Gradient.prototype;

  _proto.replace = function replace(string, prefix) {
    var ast = parser(string);

    for (var _iterator = ast.nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var node = _ref;

      if (node.type === 'function' && node.value === this.name) {
        node.nodes = this.newDirection(node.nodes);
        node.nodes = this.normalize(node.nodes);

        if (prefix === '-webkit- old') {
          var changes = this.oldWebkit(node);

          if (!changes) {
            return false;
          }
        } else {
          node.nodes = this.convertDirection(node.nodes);
          node.value = prefix + node.value;
        }
      }
    }

    return ast.toString();
  }
  /**
   * Replace first token
   */
  ;

  _proto.replaceFirst = function replaceFirst(params) {
    for (var _len2 = arguments.length, words = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      words[_key2 - 1] = arguments[_key2];
    }

    var prefix = words.map(function (i) {
      if (i === ' ') {
        return {
          type: 'space',
          value: i
        };
      }

      return {
        type: 'word',
        value: i
      };
    });
    return prefix.concat(params.slice(1));
  }
  /**
   * Convert angle unit to deg
   */
  ;

  _proto.normalizeUnit = function normalizeUnit(str, full) {
    var num = parseFloat(str);
    var deg = num / full * 360;
    return deg + "deg";
  }
  /**
   * Normalize angle
   */
  ;

  _proto.normalize = function normalize(nodes) {
    if (!nodes[0]) return nodes;

    if (/-?\d+(.\d+)?grad/.test(nodes[0].value)) {
      nodes[0].value = this.normalizeUnit(nodes[0].value, 400);
    } else if (/-?\d+(.\d+)?rad/.test(nodes[0].value)) {
      nodes[0].value = this.normalizeUnit(nodes[0].value, 2 * Math.PI);
    } else if (/-?\d+(.\d+)?turn/.test(nodes[0].value)) {
      nodes[0].value = this.normalizeUnit(nodes[0].value, 1);
    } else if (nodes[0].value.indexOf('deg') !== -1) {
      var num = parseFloat(nodes[0].value);
      num = range.wrap(0, 360, num);
      nodes[0].value = num + "deg";
    }

    if (nodes[0].value === '0deg') {
      nodes = this.replaceFirst(nodes, 'to', ' ', 'top');
    } else if (nodes[0].value === '90deg') {
      nodes = this.replaceFirst(nodes, 'to', ' ', 'right');
    } else if (nodes[0].value === '180deg') {
      nodes = this.replaceFirst(nodes, 'to', ' ', 'bottom');
    } else if (nodes[0].value === '270deg') {
      nodes = this.replaceFirst(nodes, 'to', ' ', 'left');
    }

    return nodes;
  }
  /**
   * Replace old direction to new
   */
  ;

  _proto.newDirection = function newDirection(params) {
    if (params[0].value === 'to') {
      return params;
    }

    IS_DIRECTION.lastIndex = 0; // reset search index of global regexp

    if (!IS_DIRECTION.test(params[0].value)) {
      return params;
    }

    params.unshift({
      type: 'word',
      value: 'to'
    }, {
      type: 'space',
      value: ' '
    });

    for (var i = 2; i < params.length; i++) {
      if (params[i].type === 'div') {
        break;
      }

      if (params[i].type === 'word') {
        params[i].value = this.revertDirection(params[i].value);
      }
    }

    return params;
  }
  /**
   * Look for at word
   */
  ;

  _proto.isRadial = function isRadial(params) {
    var state = 'before';

    for (var _iterator2 = params, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var param = _ref2;

      if (state === 'before' && param.type === 'space') {
        state = 'at';
      } else if (state === 'at' && param.value === 'at') {
        state = 'after';
      } else if (state === 'after' && param.type === 'space') {
        return true;
      } else if (param.type === 'div') {
        break;
      } else {
        state = 'before';
      }
    }

    return false;
  }
  /**
   * Change new direction to old
   */
  ;

  _proto.convertDirection = function convertDirection(params) {
    if (params.length > 0) {
      if (params[0].value === 'to') {
        this.fixDirection(params);
      } else if (params[0].value.indexOf('deg') !== -1) {
        this.fixAngle(params);
      } else if (this.isRadial(params)) {
        this.fixRadial(params);
      }
    }

    return params;
  }
  /**
   * Replace `to top left` to `bottom right`
   */
  ;

  _proto.fixDirection = function fixDirection(params) {
    params.splice(0, 2);

    for (var _iterator3 = params, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref3 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref3 = _i3.value;
      }

      var param = _ref3;

      if (param.type === 'div') {
        break;
      }

      if (param.type === 'word') {
        param.value = this.revertDirection(param.value);
      }
    }
  }
  /**
   * Add 90 degrees
   */
  ;

  _proto.fixAngle = function fixAngle(params) {
    var first = params[0].value;
    first = parseFloat(first);
    first = Math.abs(450 - first) % 360;
    first = this.roundFloat(first, 3);
    params[0].value = first + "deg";
  }
  /**
   * Fix radial direction syntax
   */
  ;

  _proto.fixRadial = function fixRadial(params) {
    var first = [];
    var second = [];
    var a, b, c, i, next;

    for (i = 0; i < params.length - 2; i++) {
      a = params[i];
      b = params[i + 1];
      c = params[i + 2];

      if (a.type === 'space' && b.value === 'at' && c.type === 'space') {
        next = i + 3;
        break;
      } else {
        first.push(a);
      }
    }

    var div;

    for (i = next; i < params.length; i++) {
      if (params[i].type === 'div') {
        div = params[i];
        break;
      } else {
        second.push(params[i]);
      }
    }

    params.splice.apply(params, [0, i].concat(second, [div], first));
  };

  _proto.revertDirection = function revertDirection(word) {
    return this.directions[word.toLowerCase()] || word;
  }
  /**
   * Round float and save digits under dot
   */
  ;

  _proto.roundFloat = function roundFloat(float, digits) {
    return parseFloat(float.toFixed(digits));
  }
  /**
   * Convert to old webkit syntax
   */
  ;

  _proto.oldWebkit = function oldWebkit(node) {
    var nodes = node.nodes;
    var string = parser.stringify(node.nodes);

    if (this.name !== 'linear-gradient') {
      return false;
    }

    if (nodes[0] && nodes[0].value.indexOf('deg') !== -1) {
      return false;
    }

    if (string.indexOf('px') !== -1 || string.indexOf('-corner') !== -1 || string.indexOf('-side') !== -1) {
      return false;
    }

    var params = [[]];

    for (var _iterator4 = nodes, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
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
      params[params.length - 1].push(i);

      if (i.type === 'div' && i.value === ',') {
        params.push([]);
      }
    }

    this.oldDirection(params);
    this.colorStops(params);
    node.nodes = [];

    for (var _i5 = 0, _params = params; _i5 < _params.length; _i5++) {
      var param = _params[_i5];
      node.nodes = node.nodes.concat(param);
    }

    node.nodes.unshift({
      type: 'word',
      value: 'linear'
    }, this.cloneDiv(node.nodes));
    node.value = '-webkit-gradient';
    return true;
  }
  /**
   * Change direction syntax to old webkit
   */
  ;

  _proto.oldDirection = function oldDirection(params) {
    var div = this.cloneDiv(params[0]);

    if (params[0][0].value !== 'to') {
      return params.unshift([{
        type: 'word',
        value: this.oldDirections.bottom
      }, div]);
    } else {
      var words = [];

      for (var _iterator5 = params[0].slice(2), _isArray5 = Array.isArray(_iterator5), _i6 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
        var _ref5;

        if (_isArray5) {
          if (_i6 >= _iterator5.length) break;
          _ref5 = _iterator5[_i6++];
        } else {
          _i6 = _iterator5.next();
          if (_i6.done) break;
          _ref5 = _i6.value;
        }

        var node = _ref5;

        if (node.type === 'word') {
          words.push(node.value.toLowerCase());
        }
      }

      words = words.join(' ');
      var old = this.oldDirections[words] || words;
      params[0] = [{
        type: 'word',
        value: old
      }, div];
      return params[0];
    }
  }
  /**
   * Get div token from exists parameters
   */
  ;

  _proto.cloneDiv = function cloneDiv(params) {
    for (var _iterator6 = params, _isArray6 = Array.isArray(_iterator6), _i7 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
      var _ref6;

      if (_isArray6) {
        if (_i7 >= _iterator6.length) break;
        _ref6 = _iterator6[_i7++];
      } else {
        _i7 = _iterator6.next();
        if (_i7.done) break;
        _ref6 = _i7.value;
      }

      var i = _ref6;

      if (i.type === 'div' && i.value === ',') {
        return i;
      }
    }

    return {
      type: 'div',
      value: ',',
      after: ' '
    };
  }
  /**
   * Change colors syntax to old webkit
   */
  ;

  _proto.colorStops = function colorStops(params) {
    var result = [];

    for (var i = 0; i < params.length; i++) {
      var pos = void 0;
      var param = params[i];
      var item = void 0;

      if (i === 0) {
        continue;
      }

      var color = parser.stringify(param[0]);

      if (param[1] && param[1].type === 'word') {
        pos = param[1].value;
      } else if (param[2] && param[2].type === 'word') {
        pos = param[2].value;
      }

      var stop = void 0;

      if (i === 1 && (!pos || pos === '0%')) {
        stop = "from(" + color + ")";
      } else if (i === params.length - 1 && (!pos || pos === '100%')) {
        stop = "to(" + color + ")";
      } else if (pos) {
        stop = "color-stop(" + pos + ", " + color + ")";
      } else {
        stop = "color-stop(" + color + ")";
      }

      var div = param[param.length - 1];
      params[i] = [{
        type: 'word',
        value: stop
      }];

      if (div.type === 'div' && div.value === ',') {
        item = params[i].push(div);
      }

      result.push(item);
    }

    return result;
  }
  /**
   * Remove old WebKit gradient too
   */
  ;

  _proto.old = function old(prefix) {
    if (prefix === '-webkit-') {
      var type = this.name === 'linear-gradient' ? 'linear' : 'radial';
      var string = '-gradient';
      var regexp = utils.regexp("-webkit-(" + type + "-gradient|gradient\\(\\s*" + type + ")", false);
      return new OldValue(this.name, prefix + this.name, string, regexp);
    } else {
      return _Value.prototype.old.call(this, prefix);
    }
  }
  /**
   * Do not add non-webkit prefixes for list-style and object
   */
  ;

  _proto.add = function add(decl, prefix) {
    var p = decl.prop;

    if (p.indexOf('mask') !== -1) {
      if (prefix === '-webkit-' || prefix === '-webkit- old') {
        return _Value.prototype.add.call(this, decl, prefix);
      }
    } else if (p === 'list-style' || p === 'list-style-image' || p === 'content') {
      if (prefix === '-webkit-' || prefix === '-webkit- old') {
        return _Value.prototype.add.call(this, decl, prefix);
      }
    } else {
      return _Value.prototype.add.call(this, decl, prefix);
    }

    return undefined;
  };

  return Gradient;
}(Value);

_defineProperty(Gradient, "names", ['linear-gradient', 'repeating-linear-gradient', 'radial-gradient', 'repeating-radial-gradient']);

module.exports = Gradient;