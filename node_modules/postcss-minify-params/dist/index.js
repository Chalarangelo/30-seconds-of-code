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

var _alphanumSort = require('alphanum-sort');

var _alphanumSort2 = _interopRequireDefault(_alphanumSort);

var _uniqs = require('uniqs');

var _uniqs2 = _interopRequireDefault(_uniqs);

var _cssnanoUtilGetArguments = require('cssnano-util-get-arguments');

var _cssnanoUtilGetArguments2 = _interopRequireDefault(_cssnanoUtilGetArguments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Return the greatest common divisor
 * of two numbers.
 */

function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
}

function aspectRatio(a, b) {
    const divisor = gcd(a, b);

    return [a / divisor, b / divisor];
}

function split(args) {
    return args.map(arg => (0, _postcssValueParser.stringify)(arg)).join('');
}

function removeNode(node) {
    node.value = '';
    node.type = 'word';
}

function transform(legacy, rule) {
    const ruleName = rule.name.toLowerCase();

    // We should re-arrange parameters only for `@media` and `@supports` at-rules
    if (!rule.params || !["media", "supports"].includes(ruleName)) {
        return;
    }

    const params = (0, _postcssValueParser2.default)(rule.params);

    params.walk((node, index) => {
        if (node.type === 'div' || node.type === 'function') {
            node.before = node.after = '';

            if (node.type === 'function' && node.nodes[4] && node.nodes[0].value.toLowerCase().indexOf('-aspect-ratio') === 3) {
                const [a, b] = aspectRatio(node.nodes[2].value, node.nodes[4].value);

                node.nodes[2].value = a;
                node.nodes[4].value = b;
            }
        } else if (node.type === 'space') {
            node.value = ' ';
        } else {
            const prevWord = params.nodes[index - 2];

            if (node.value.toLowerCase() === 'all' && rule.name.toLowerCase() === 'media' && !prevWord) {
                const nextWord = params.nodes[index + 2];

                if (!legacy || nextWord) {
                    removeNode(node);
                }

                if (nextWord && nextWord.value.toLowerCase() === 'and') {
                    const nextSpace = params.nodes[index + 1];
                    const secondSpace = params.nodes[index + 3];

                    removeNode(nextWord);
                    removeNode(nextSpace);
                    removeNode(secondSpace);
                }
            }
        }
    }, true);

    rule.params = (0, _alphanumSort2.default)((0, _uniqs2.default)((0, _cssnanoUtilGetArguments2.default)(params).map(split)), {
        insensitive: true
    }).join();

    if (!rule.params.length) {
        rule.raws.afterName = '';
    }
}

function hasAllBug(browser) {
    return ~['ie 10', 'ie 11'].indexOf(browser);
}

exports.default = _postcss2.default.plugin('postcss-minify-params', () => {
    return (css, result) => {
        const resultOpts = result.opts || {};
        const browsers = (0, _browserslist2.default)(null, {
            stats: resultOpts.stats,
            path: __dirname,
            env: resultOpts.env
        });

        return css.walkAtRules(transform.bind(null, browsers.some(hasAllBug)));
    };
});
module.exports = exports['default'];