'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _decl = require('./lib/decl');

var _decl2 = _interopRequireDefault(_decl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _postcss2.default.plugin('postcss-merge-longhand', () => {
    return css => {
        css.walkRules(rule => {
            _decl2.default.forEach(p => {
                p.explode(rule);
                p.merge(rule);
            });
        });
    };
});
module.exports = exports['default'];