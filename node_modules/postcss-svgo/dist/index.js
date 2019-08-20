'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _svgo = require('svgo');

var _svgo2 = _interopRequireDefault(_svgo);

var _isSvg = require('is-svg');

var _isSvg2 = _interopRequireDefault(_isSvg);

var _url = require('./lib/url');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PLUGIN = 'postcss-svgo';
const dataURI = /data:image\/svg\+xml(;((charset=)?utf-8|base64))?,/i;
const dataURIBase64 = /data:image\/svg\+xml;base64,/i;

function minifyPromise(decl, getSvgo, opts) {
    const promises = [];
    const parsed = (0, _postcssValueParser2.default)(decl.value);

    decl.value = parsed.walk(node => {
        if (node.type !== 'function' || node.value.toLowerCase() !== 'url' || !node.nodes.length) {
            return;
        }

        let { value, quote } = node.nodes[0];
        let isBase64, isUriEncoded;
        let svg = value.replace(dataURI, '');

        if (dataURIBase64.test(value)) {
            svg = Buffer.from(svg, 'base64').toString('utf8');
            isBase64 = true;
        } else {
            let decodedUri;

            try {
                decodedUri = (0, _url.decode)(svg);
                isUriEncoded = decodedUri !== svg;
            } catch (e) {
                // Swallow exception if we cannot decode the value
                isUriEncoded = false;
            }

            if (isUriEncoded) {
                svg = decodedUri;
            }

            if (opts.encode !== undefined) {
                isUriEncoded = opts.encode;
            }
        }

        if (!(0, _isSvg2.default)(svg)) {
            return;
        }

        promises.push(getSvgo().optimize(svg).then(result => {
            let data, optimizedValue;

            if (isBase64) {
                data = Buffer.from(result.data).toString('base64');
                optimizedValue = 'data:image/svg+xml;base64,' + data;
            } else {
                data = isUriEncoded ? (0, _url.encode)(result.data) : result.data;
                // Should always encode # otherwise we yield a broken SVG
                // in Firefox (works in Chrome however). See this issue:
                // https://github.com/cssnano/cssnano/issues/245
                data = data.replace(/#/g, '%23');
                optimizedValue = 'data:image/svg+xml;charset=utf-8,' + data;
                quote = isUriEncoded ? '"' : '\'';
            }

            node.nodes[0] = Object.assign({}, node.nodes[0], {
                value: optimizedValue,
                quote: quote,
                type: 'string',
                before: '',
                after: ''
            });
        }).catch(error => {
            throw new Error(`${PLUGIN}: ${error}`);
        }));

        return false;
    });

    return Promise.all(promises).then(() => decl.value = decl.value.toString());
}

exports.default = _postcss2.default.plugin(PLUGIN, (opts = {}) => {
    let svgo = null;

    const getSvgo = () => {
        if (!svgo) {
            svgo = new _svgo2.default(opts);
        }

        return svgo;
    };

    return css => {
        return new Promise((resolve, reject) => {
            const svgoQueue = [];

            css.walkDecls(decl => {
                if (!dataURI.test(decl.value)) {
                    return;
                }

                svgoQueue.push(minifyPromise(decl, getSvgo, opts));
            });

            return Promise.all(svgoQueue).then(resolve, reject);
        });
    };
});
module.exports = exports['default'];