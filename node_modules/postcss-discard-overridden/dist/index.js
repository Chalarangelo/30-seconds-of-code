'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OVERRIDABLE_RULES = ['keyframes', 'counter-style'];
const SCOPE_RULES = ['media', 'supports'];

function isOverridable(name) {
    return ~OVERRIDABLE_RULES.indexOf(_postcss2.default.vendor.unprefixed(name.toLowerCase()));
}

function isScope(name) {
    return ~SCOPE_RULES.indexOf(_postcss2.default.vendor.unprefixed(name.toLowerCase()));
}

function getScope(node) {
    let current = node.parent;
    const chain = [node.name.toLowerCase(), node.params];
    do {
        if (current.type === 'atrule' && isScope(current.name)) {
            chain.unshift(current.name + ' ' + current.params);
        }
        current = current.parent;
    } while (current);
    return chain.join('|');
}

exports.default = _postcss2.default.plugin('postcss-discard-overridden', () => {
    return css => {
        const cache = {};
        const rules = [];
        css.walkAtRules(node => {
            if (isOverridable(node.name)) {
                const scope = getScope(node);
                cache[scope] = node;
                rules.push({
                    node,
                    scope
                });
            }
        });
        rules.forEach(rule => {
            if (cache[rule.scope] !== rule.node) {
                rule.node.remove();
            }
        });
    };
});
module.exports = exports['default'];