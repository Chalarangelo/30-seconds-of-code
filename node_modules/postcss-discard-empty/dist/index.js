'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const plugin = 'postcss-discard-empty';

function discardAndReport(css, result) {
    function discardEmpty(node) {
        const { type, nodes: sub, params } = node;

        if (sub) {
            node.each(discardEmpty);
        }

        if (type === 'decl' && !node.value || type === 'rule' && !node.selector || sub && !sub.length || type === 'atrule' && (!sub && !params || !params && !sub.length)) {
            node.remove();

            result.messages.push({
                type: 'removal',
                plugin,
                node
            });
        }
    }

    css.each(discardEmpty);
}

exports.default = _postcss2.default.plugin(plugin, () => discardAndReport);
module.exports = exports['default'];