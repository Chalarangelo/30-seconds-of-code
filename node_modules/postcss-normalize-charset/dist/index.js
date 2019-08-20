'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let charset = 'charset';

exports.default = _postcss2.default.plugin('postcss-normalize-' + charset, (opts = {}) => {
    return css => {
        let charsetRule;
        let nonAsciiNode;
        let nonAscii = /[^\x00-\x7F]/;

        css.walk(node => {
            if (node.type === 'atrule' && node.name === charset) {
                if (!charsetRule) {
                    charsetRule = node;
                }
                node.remove();
            } else if (!nonAsciiNode && node.parent === css && nonAscii.test(node)) {
                nonAsciiNode = node;
            }
        });

        if (nonAsciiNode) {
            if (!charsetRule && opts.add !== false) {
                charsetRule = _postcss2.default.atRule({
                    name: charset,
                    params: '"utf-8"'
                });
            }
            if (charsetRule) {
                charsetRule.source = nonAsciiNode.source;
                css.prepend(charsetRule);
            }
        }
    };
});
module.exports = exports['default'];