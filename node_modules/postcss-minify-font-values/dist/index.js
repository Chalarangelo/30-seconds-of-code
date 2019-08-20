'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _minifyWeight = require('./lib/minify-weight');

var _minifyWeight2 = _interopRequireDefault(_minifyWeight);

var _minifyFamily = require('./lib/minify-family');

var _minifyFamily2 = _interopRequireDefault(_minifyFamily);

var _minifyFont = require('./lib/minify-font');

var _minifyFont2 = _interopRequireDefault(_minifyFont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transform(opts, decl) {
    let tree;
    let prop = decl.prop.toLowerCase();

    if (prop === 'font-weight') {
        decl.value = (0, _minifyWeight2.default)(decl.value);
    } else if (prop === 'font-family') {
        tree = (0, _postcssValueParser2.default)(decl.value);
        tree.nodes = (0, _minifyFamily2.default)(tree.nodes, opts);
        decl.value = tree.toString();
    } else if (prop === 'font') {
        tree = (0, _postcssValueParser2.default)(decl.value);
        tree.nodes = (0, _minifyFont2.default)(tree.nodes, opts);
        decl.value = tree.toString();
    }
}

exports.default = _postcss2.default.plugin('postcss-minify-font-values', opts => {
    opts = Object.assign({}, {
        removeAfterKeyword: false,
        removeDuplicates: true,
        removeQuotes: true
    }, opts);

    return css => css.walkDecls(/font/i, transform.bind(null, opts));
});
module.exports = exports['default'];