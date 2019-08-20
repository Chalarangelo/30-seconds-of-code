'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _normalizeUrl = require('normalize-url');

var _normalizeUrl2 = _interopRequireDefault(_normalizeUrl);

var _isAbsoluteUrl = require('is-absolute-url');

var _isAbsoluteUrl2 = _interopRequireDefault(_isAbsoluteUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const multiline = /\\[\r\n]/;
const escapeChars = /([\s\(\)"'])/g;

function convert(url, options) {
    if ((0, _isAbsoluteUrl2.default)(url) || url.startsWith('//')) {
        let normalizedURL = null;

        try {
            normalizedURL = (0, _normalizeUrl2.default)(url, options);
        } catch (e) {
            normalizedURL = url;
        }

        return normalizedURL;
    }

    // `path.normalize` always returns backslashes on Windows, need replace in `/`
    return _path2.default.normalize(url).replace(new RegExp('\\' + _path2.default.sep, 'g'), '/');
}

function transformNamespace(rule) {
    rule.params = (0, _postcssValueParser2.default)(rule.params).walk(node => {
        if (node.type === 'function' && node.value.toLowerCase() === 'url' && node.nodes.length) {
            node.type = 'string';
            node.quote = node.nodes[0].quote || '"';
            node.value = node.nodes[0].value;
        }
        if (node.type === 'string') {
            node.value = node.value.trim();
        }
        return false;
    }).toString();
}

function transformDecl(decl, opts) {
    decl.value = (0, _postcssValueParser2.default)(decl.value).walk(node => {
        if (node.type !== 'function' || node.value.toLowerCase() !== 'url' || !node.nodes.length) {
            return false;
        }

        let url = node.nodes[0];
        let escaped;

        node.before = node.after = '';
        url.value = url.value.trim().replace(multiline, '');

        // Skip empty URLs
        // Empty URL function equals request to current stylesheet where it is declared
        if (url.value.length === 0) {
            url.quote = '';

            return false;
        }

        if (/^data:(.*)?,/i.test(url.value)) {
            return false;
        }

        if (!/^.+-extension:\//i.test(url.value)) {
            url.value = convert(url.value, opts);
        }

        if (escapeChars.test(url.value) && url.type === 'string') {
            escaped = url.value.replace(escapeChars, '\\$1');
            if (escaped.length < url.value.length + 2) {
                url.value = escaped;
                url.type = 'word';
            }
        } else {
            url.type = 'word';
        }

        return false;
    }).toString();
}

exports.default = _postcss2.default.plugin('postcss-normalize-url', opts => {
    opts = Object.assign({}, {
        normalizeProtocol: false,
        stripFragment: false,
        stripWWW: false
    }, opts);

    return css => {
        css.walk(node => {
            if (node.type === 'decl') {
                return transformDecl(node, opts);
            } else if (node.type === 'atrule' && node.name.toLowerCase() === 'namespace') {
                return transformNamespace(node);
            }
        });
    };
});
module.exports = exports['default'];