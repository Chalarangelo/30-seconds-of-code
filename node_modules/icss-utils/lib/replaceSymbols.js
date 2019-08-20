'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _replaceValueSymbols = require('./replaceValueSymbols.js');

var _replaceValueSymbols2 = _interopRequireDefault(_replaceValueSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var replaceSymbols = function replaceSymbols(css, replacements) {
  css.walkDecls(function (decl) {
    return decl.value = (0, _replaceValueSymbols2.default)(decl.value, replacements);
  });
  css.walkAtRules('media', function (atRule) {
    return atRule.params = (0, _replaceValueSymbols2.default)(atRule.params, replacements);
  });
};

exports.default = replaceSymbols;