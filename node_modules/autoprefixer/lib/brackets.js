"use strict";

function last(array) {
  return array[array.length - 1];
}

var brackets = {
  /**
     * Parse string to nodes tree
     */
  parse: function parse(str) {
    var current = [''];
    var stack = [current];

    for (var i = 0; i < str.length; i++) {
      var sym = str[i];

      if (sym === '(') {
        current = [''];
        last(stack).push(current);
        stack.push(current);
        continue;
      }

      if (sym === ')') {
        stack.pop();
        current = last(stack);
        current.push('');
        continue;
      }

      current[current.length - 1] += sym;
    }

    return stack[0];
  },

  /**
     * Generate output string by nodes tree
     */
  stringify: function stringify(ast) {
    var result = '';

    for (var _iterator = ast, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var i = _ref;

      if (typeof i === 'object') {
        result += "(" + brackets.stringify(i) + ")";
        continue;
      }

      result += i;
    }

    return result;
  }
};
module.exports = brackets;