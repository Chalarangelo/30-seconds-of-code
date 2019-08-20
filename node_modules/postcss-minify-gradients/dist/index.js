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

var _isColorStop = require('is-color-stop');

var _isColorStop2 = _interopRequireDefault(_isColorStop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const angles = {
    top: '0deg',
    right: '90deg',
    bottom: '180deg',
    left: '270deg'
};

function isLessThan(a, b) {
    return a.unit.toLowerCase() === b.unit.toLowerCase() && parseFloat(a.number) >= parseFloat(b.number);
}

function optimise(decl) {
    const value = decl.value;

    if (!~value.toLowerCase().indexOf('gradient')) {
        return;
    }

    decl.value = (0, _postcssValueParser2.default)(value).walk(node => {
        if (node.type !== 'function' || !node.nodes.length) {
            return false;
        }

        const lowerCasedValue = node.value.toLowerCase();

        if (lowerCasedValue === 'linear-gradient' || lowerCasedValue === 'repeating-linear-gradient' || lowerCasedValue === '-webkit-linear-gradient' || lowerCasedValue === '-webkit-repeating-linear-gradient') {
            let args = (0, _cssnanoUtilGetArguments2.default)(node);

            if (node.nodes[0].value.toLowerCase() === 'to' && args[0].length === 3) {
                node.nodes = node.nodes.slice(2);
                node.nodes[0].value = angles[node.nodes[0].value.toLowerCase()];
            }

            let lastStop = null;

            args.forEach((arg, index) => {
                if (!arg[2]) {
                    return;
                }

                let isFinalStop = index === args.length - 1;
                let thisStop = (0, _postcssValueParser.unit)(arg[2].value);

                if (lastStop === null) {
                    lastStop = thisStop;

                    if (!isFinalStop && lastStop && lastStop.number === '0' && lastStop.unit.toLowerCase() !== 'deg') {
                        arg[1].value = arg[2].value = '';
                    }

                    return;
                }

                if (lastStop && thisStop && isLessThan(lastStop, thisStop)) {
                    arg[2].value = 0;
                }

                lastStop = thisStop;

                if (isFinalStop && arg[2].value === '100%') {
                    arg[1].value = arg[2].value = '';
                }
            });

            return false;
        }

        if (lowerCasedValue === 'radial-gradient' || lowerCasedValue === 'repeating-radial-gradient') {
            let args = (0, _cssnanoUtilGetArguments2.default)(node);
            let lastStop;

            const hasAt = args[0].find(n => n.value.toLowerCase() === 'at');

            args.forEach((arg, index) => {
                if (!arg[2] || !index && hasAt) {
                    return;
                }

                let thisStop = (0, _postcssValueParser.unit)(arg[2].value);

                if (!lastStop) {
                    lastStop = thisStop;

                    return;
                }

                if (lastStop && thisStop && isLessThan(lastStop, thisStop)) {
                    arg[2].value = 0;
                }

                lastStop = thisStop;
            });

            return false;
        }

        if (lowerCasedValue === '-webkit-radial-gradient' || lowerCasedValue === '-webkit-repeating-radial-gradient') {
            let args = (0, _cssnanoUtilGetArguments2.default)(node);
            let lastStop;

            args.forEach(arg => {
                let color;
                let stop;

                if (arg[2] !== undefined) {
                    if (arg[0].type === 'function') {
                        color = `${arg[0].value}(${(0, _postcssValueParser.stringify)(arg[0].nodes)})`;
                    } else {
                        color = arg[0].value;
                    }

                    if (arg[2].type === 'function') {
                        stop = `${arg[2].value}(${(0, _postcssValueParser.stringify)(arg[2].nodes)})`;
                    } else {
                        stop = arg[2].value;
                    }
                } else {
                    if (arg[0].type === 'function') {
                        color = `${arg[0].value}(${(0, _postcssValueParser.stringify)(arg[0].nodes)})`;
                    }

                    color = arg[0].value;
                }

                color = color.toLowerCase();

                const colorStop = stop || stop === 0 ? (0, _isColorStop2.default)(color, stop.toLowerCase()) : (0, _isColorStop2.default)(color);

                if (!colorStop || !arg[2]) {
                    return;
                }

                let thisStop = (0, _postcssValueParser.unit)(arg[2].value);

                if (!lastStop) {
                    lastStop = thisStop;

                    return;
                }

                if (lastStop && thisStop && isLessThan(lastStop, thisStop)) {
                    arg[2].value = 0;
                }

                lastStop = thisStop;
            });

            return false;
        }
    }).toString();
}

exports.default = _postcss2.default.plugin('postcss-minify-gradients', () => {
    return css => css.walkDecls(optimise);
});
module.exports = exports['default'];