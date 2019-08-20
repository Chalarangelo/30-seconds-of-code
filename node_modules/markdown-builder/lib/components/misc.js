'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.image = exports.link = exports.anchor = exports.collapsible = exports.hr = undefined;

var _util = require('../util');

var hr = function hr() {
  return (0, _util.surround)(_util.SECTION_LINE_BREAK, _util.HORIZONTAL_RULE);
}; /**
    * Misc
    * 
    */

var collapsible = function collapsible(summary, content) {
  return _util.SECTION_LINE_BREAK + ('\n<details>\n<summary>' + summary + '</summary>\n\n' + content + '\n</details>\n');
};

var anchor = function anchor(val) {
  var re = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g;
  var replacement = '-';
  var whitespace = /\s/g;

  if (typeof val !== 'string') return '';
  var anchor = val.replace(/[A-Z]+/g, function (str) {
    return str.toLowerCase();
  });
  return '#' + anchor.trim().replace(re, '').replace(whitespace, replacement);
};

var link = function link(title) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (url === null) {
    url = anchor(title);
  }
  return '[' + title + '](' + url + ')';
};

var image = function image(alt, url) {
  var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  return '![' + alt + '](' + url + (title !== '' ? ' "' + title + '"' : '') + ')';
};

exports.hr = hr;
exports.collapsible = collapsible;
exports.anchor = anchor;
exports.link = link;
exports.image = image;