'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _cssnanoUtilGetArguments = require('cssnano-util-get-arguments');

var _cssnanoUtilGetArguments2 = _interopRequireDefault(_cssnanoUtilGetArguments);

var _cssnanoUtilGetMatch = require('cssnano-util-get-match');

var _cssnanoUtilGetMatch2 = _interopRequireDefault(_cssnanoUtilGetMatch);

var _map = require('./lib/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function evenValues(list, index) {
    return index % 2 === 0;
}

const repeatKeywords = _map2.default.map(mapping => mapping[0]);

const getMatch = (0, _cssnanoUtilGetMatch2.default)(_map2.default);

exports.default = _postcss2.default.plugin('postcss-normalize-repeat-style', () => {
    return css => {
        const cache = {};

        css.walkDecls(/background(-repeat)?|(-webkit-)?mask-repeat/i, decl => {
            const value = decl.value;

            if (cache[value]) {
                decl.value = cache[value];

                return;
            }

            const parsed = (0, _postcssValueParser2.default)(value);

            if (parsed.nodes.length === 1) {
                cache[value] = value;

                return;
            }

            const args = (0, _cssnanoUtilGetArguments2.default)(parsed);
            const relevant = [];

            args.forEach(arg => {
                relevant.push({
                    start: null,
                    end: null
                });

                arg.forEach((part, index) => {
                    const isRepeat = ~repeatKeywords.indexOf(part.value.toLowerCase());
                    const len = relevant.length - 1;

                    if (relevant[len].start === null && isRepeat) {
                        relevant[len].start = index;
                        relevant[len].end = index;

                        return;
                    }

                    if (relevant[len].start !== null) {
                        if (part.type === 'space') {
                            return;
                        } else if (isRepeat) {
                            relevant[len].end = index;

                            return;
                        }

                        return;
                    }
                });
            });

            relevant.forEach((range, index) => {
                if (range.start === null) {
                    return;
                }

                const val = args[index].slice(range.start, range.end + 1);

                if (val.length !== 3) {
                    return;
                }

                const match = getMatch(val.filter(evenValues).map(n => n.value.toLowerCase()));

                if (match) {
                    args[index][range.start].value = match;
                    args[index][range.start + 1].value = '';
                    args[index][range.end].value = '';
                }
            });

            const result = parsed.toString();

            decl.value = result;
            cache[value] = result;
        });
    };
});
module.exports = exports['default'];