'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browserslist = require('browserslist');

var _browserslist2 = _interopRequireDefault(_browserslist);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const regexLowerCaseUPrefix = /^u(?=\+)/;

function unicode(range) {
    const values = range.slice(2).split('-');
    if (values.length < 2) {
        return range;
    }
    const left = values[0].split('');
    const right = values[1].split('');

    if (left.length !== right.length) {
        return range;
    }

    let questionCounter = 0;

    const merged = left.reduce((group, value, index) => {
        if (group === false) {
            return false;
        }
        if (value === right[index] && !questionCounter) {
            return group + value;
        }
        if (value === '0' && right[index] === 'f') {
            questionCounter++;
            return group + '?';
        }
        return false;
    }, 'u+');

    /*
     * The maximum number of wildcard characters (?) for ranges is 5.
     */

    if (merged && questionCounter < 6) {
        return merged;
    }

    return range;
}

/*
 * IE and Edge before 16 version ignore the unicode-range if the 'U' is lowercase
 *
 * https://caniuse.com/#search=unicode-range
 */

function hasLowerCaseUPrefixBug(browser) {
    return ~(0, _browserslist2.default)('ie <=11, edge <= 15').indexOf(browser);
}

function transform(legacy = false, node) {
    node.value = (0, _postcssValueParser2.default)(node.value).walk(child => {
        if (child.type === 'word') {
            const transformed = unicode(child.value.toLowerCase());
            child.value = legacy ? transformed.replace(regexLowerCaseUPrefix, 'U') : transformed;
        }
        return false;
    }).toString();
}

exports.default = _postcss2.default.plugin('postcss-normalize-unicode', () => {
    return (css, result) => {
        const resultOpts = result.opts || {};
        const browsers = (0, _browserslist2.default)(null, {
            stats: resultOpts.stats,
            path: __dirname,
            env: resultOpts.env
        });
        css.walkDecls(/^unicode-range$/i, transform.bind(null, browsers.some(hasLowerCaseUPrefixBug)));
    };
});
module.exports = exports['default'];