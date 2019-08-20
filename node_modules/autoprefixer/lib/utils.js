"use strict";

var list = require('postcss').list;

module.exports = {
  /**
     * Throw special error, to tell beniary,
     * that this error is from Autoprefixer.
     */
  error: function error(text) {
    var err = new Error(text);
    err.autoprefixer = true;
    throw err;
  },

  /**
     * Return array, that doesn’t contain duplicates.
     */
  uniq: function uniq(array) {
    var filtered = [];

    for (var _iterator = array, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

      if (filtered.indexOf(i) === -1) {
        filtered.push(i);
      }
    }

    return filtered;
  },

  /**
     * Return "-webkit-" on "-webkit- old"
     */
  removeNote: function removeNote(string) {
    if (string.indexOf(' ') === -1) {
      return string;
    }

    return string.split(' ')[0];
  },

  /**
     * Escape RegExp symbols
     */
  escapeRegexp: function escapeRegexp(string) {
    return string.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
  },

  /**
     * Return regexp to check, that CSS string contain word
     */
  regexp: function regexp(word, escape) {
    if (escape === void 0) {
      escape = true;
    }

    if (escape) {
      word = this.escapeRegexp(word);
    }

    return new RegExp("(^|[\\s,(])(" + word + "($|[\\s(,]))", 'gi');
  },

  /**
     * Change comma list
     */
  editList: function editList(value, callback) {
    var origin = list.comma(value);
    var changed = callback(origin, []);

    if (origin === changed) {
      return value;
    }

    var join = value.match(/,\s*/);
    join = join ? join[0] : ', ';
    return changed.join(join);
  },

  /**
     * Split the selector into parts.
     * It returns 3 level deep array because selectors can be comma
     * separated (1), space separated (2), and combined (3)
     * @param {String} selector selector string
     * @return {Array<Array<Array>>} 3 level deep array of split selector
     * @see utils.test.js for examples
     */
  splitSelector: function splitSelector(selector) {
    return list.comma(selector).map(function (i) {
      return list.space(i).map(function (k) {
        return k.split(/(?=\.|#)/g);
      });
    });
  }
};