'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceAll = replaceAll;
var matchConstName = /[$#]?[\w-\.]+/g;

function replaceAll(replacements, text) {
  var matches = void 0;
  while (matches = matchConstName.exec(text)) {
    var replacement = replacements[matches[0]];
    if (replacement) {
      text = text.slice(0, matches.index) + replacement + text.slice(matchConstName.lastIndex);
      matchConstName.lastIndex -= matches[0].length - replacement.length;
    }
  }
  return text;
}

exports.default = function (css, translations) {
  css.walkDecls(function (decl) {
    return decl.value = replaceAll(translations, decl.value);
  });
  css.walkAtRules('media', function (atRule) {
    return atRule.params = replaceAll(translations, atRule.params);
  });
};