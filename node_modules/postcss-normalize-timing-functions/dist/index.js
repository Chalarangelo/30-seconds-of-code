'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _cssnanoUtilGetMatch = require('cssnano-util-get-match');

var _cssnanoUtilGetMatch2 = _interopRequireDefault(_cssnanoUtilGetMatch);

var _map = require('./lib/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getMatch = (0, _cssnanoUtilGetMatch2.default)(_map2.default);
const getValue = node => parseFloat(node.value);

function evenValues(list, index) {
    return index % 2 === 0;
}

function reduce(node) {
    if (node.type !== 'function') {
        return false;
    }

    const lowerCasedValue = node.value.toLowerCase();

    if (lowerCasedValue === 'steps') {
        // Don't bother checking the step-end case as it has the same length
        // as steps(1)
        if (getValue(node.nodes[0]) === 1 && node.nodes[2] && node.nodes[2].value.toLowerCase() === 'start') {
            node.type = 'word';
            node.value = 'step-start';

            delete node.nodes;

            return;
        }

        // The end case is actually the browser default, so it isn't required.
        if (node.nodes[2] && node.nodes[2].value.toLowerCase() === 'end') {
            node.nodes = [node.nodes[0]];

            return;
        }

        return false;
    }

    if (lowerCasedValue === 'cubic-bezier') {
        const match = getMatch(node.nodes.filter(evenValues).map(getValue));

        if (match) {
            node.type = 'word';
            node.value = match;

            delete node.nodes;

            return;
        }
    }
}

exports.default = (0, _postcss.plugin)('postcss-normalize-timing-functions', () => {
    return css => {
        const cache = {};

        css.walkDecls(/(animation|transition)(-timing-function|$)/i, decl => {
            const value = decl.value;

            if (cache[value]) {
                decl.value = cache[value];

                return;
            }

            const result = (0, _postcssValueParser2.default)(value).walk(reduce).toString();

            decl.value = result;
            cache[value] = result;
        });
    };
});
module.exports = exports['default'];