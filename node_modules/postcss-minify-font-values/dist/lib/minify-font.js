'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (nodes, opts) {
    let i, max, node, familyStart, family;
    let hasSize = false;

    for (i = 0, max = nodes.length; i < max; i += 1) {
        node = nodes[i];
        if (node.type === 'word') {
            if (hasSize) {
                continue;
            }
            const value = node.value.toLowerCase();
            if (value === 'normal' || ~_keywords2.default.style.indexOf(value) || ~_keywords2.default.variant.indexOf(value) || ~_keywords2.default.stretch.indexOf(value)) {
                familyStart = i;
            } else if (~_keywords2.default.weight.indexOf(value)) {
                node.value = (0, _minifyWeight2.default)(value);
                familyStart = i;
            } else if (~_keywords2.default.size.indexOf(value) || (0, _postcssValueParser.unit)(value)) {
                familyStart = i;
                hasSize = true;
            }
        } else if (node.type === 'div' && node.value === '/') {
            familyStart = i + 1;
            break;
        }
    }

    familyStart += 2;
    family = (0, _minifyFamily2.default)(nodes.slice(familyStart), opts);
    return nodes.slice(0, familyStart).concat(family);
};

var _postcssValueParser = require('postcss-value-parser');

var _keywords = require('./keywords');

var _keywords2 = _interopRequireDefault(_keywords);

var _minifyFamily = require('./minify-family');

var _minifyFamily2 = _interopRequireDefault(_minifyFamily);

var _minifyWeight = require('./minify-weight');

var _minifyWeight2 = _interopRequireDefault(_minifyWeight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
module.exports = exports['default'];