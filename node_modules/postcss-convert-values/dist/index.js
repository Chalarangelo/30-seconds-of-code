'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _convert = require('./lib/convert');

var _convert2 = _interopRequireDefault(_convert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LENGTH_UNITS = ['em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', 'cm', 'mm', 'q', 'in', 'pt', 'pc', 'px'];

function parseWord(node, opts, keepZeroUnit) {
    const pair = (0, _postcssValueParser.unit)(node.value);
    if (pair) {
        const num = Number(pair.number);
        const u = pair.unit;
        if (num === 0) {
            node.value = keepZeroUnit || !~LENGTH_UNITS.indexOf(u.toLowerCase()) && u !== '%' ? 0 + u : 0;
        } else {
            node.value = (0, _convert2.default)(num, u, opts);

            if (typeof opts.precision === 'number' && u.toLowerCase() === 'px' && ~pair.number.indexOf('.')) {
                const precision = Math.pow(10, opts.precision);
                node.value = Math.round(parseFloat(node.value) * precision) / precision + u;
            }
        }
    }
}

function clampOpacity(node) {
    const pair = (0, _postcssValueParser.unit)(node.value);
    if (!pair) {
        return;
    }
    let num = Number(pair.number);
    if (num > 1) {
        node.value = 1 + pair.unit;
    } else if (num < 0) {
        node.value = 0 + pair.unit;
    }
}

function shouldStripPercent(decl) {
    const { parent } = decl;
    const lowerCasedProp = decl.prop.toLowerCase();
    return ~decl.value.indexOf('%') && (lowerCasedProp === 'max-height' || lowerCasedProp === 'height') || parent.parent && parent.parent.name && parent.parent.name.toLowerCase() === 'keyframes' && lowerCasedProp === 'stroke-dasharray' || lowerCasedProp === 'stroke-dashoffset' || lowerCasedProp === 'stroke-width';
}

function transform(opts, decl) {
    const lowerCasedProp = decl.prop.toLowerCase();
    if (~lowerCasedProp.indexOf('flex') || lowerCasedProp.indexOf('--') === 0) {
        return;
    }

    decl.value = (0, _postcssValueParser2.default)(decl.value).walk(node => {
        const lowerCasedValue = node.value.toLowerCase();

        if (node.type === 'word') {
            parseWord(node, opts, shouldStripPercent(decl));
            if (lowerCasedProp === 'opacity' || lowerCasedProp === 'shape-image-threshold') {
                clampOpacity(node);
            }
        } else if (node.type === 'function') {
            if (lowerCasedValue === 'calc' || lowerCasedValue === 'hsl' || lowerCasedValue === 'hsla') {
                (0, _postcssValueParser.walk)(node.nodes, n => {
                    if (n.type === 'word') {
                        parseWord(n, opts, true);
                    }
                });
                return false;
            }
            if (lowerCasedValue === 'url') {
                return false;
            }
        }
    }).toString();
}

const plugin = 'postcss-convert-values';

exports.default = _postcss2.default.plugin(plugin, (opts = { precision: false }) => {
    return css => css.walkDecls(transform.bind(null, opts));
});
module.exports = exports['default'];