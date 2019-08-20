'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _alphanumSort = require('alphanum-sort');

var _alphanumSort2 = _interopRequireDefault(_alphanumSort);

var _uniqs = require('uniqs');

var _uniqs2 = _interopRequireDefault(_uniqs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unique(rule) {
    rule.selector = (0, _alphanumSort2.default)((0, _uniqs2.default)(rule.selectors), { insensitive: true }).join();
}

exports.default = (0, _postcss.plugin)('postcss-unique-selectors', () => {
    return css => css.walkRules(unique);
});
module.exports = exports['default'];