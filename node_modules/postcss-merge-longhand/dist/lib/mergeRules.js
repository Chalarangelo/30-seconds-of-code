'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mergeRules;

var _hasAllProps = require('./hasAllProps');

var _hasAllProps2 = _interopRequireDefault(_hasAllProps);

var _getDecls = require('./getDecls');

var _getDecls2 = _interopRequireDefault(_getDecls);

var _getRules = require('./getRules');

var _getRules2 = _interopRequireDefault(_getRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isConflictingProp(propA, propB) {
    if (!propB.prop || propB.important !== propA.important) {
        return;
    }

    const parts = propA.prop.split('-');

    return parts.some(() => {
        parts.pop();

        return parts.join('-') === propB.prop;
    });
}

function hasConflicts(match, nodes) {
    const firstNode = Math.min.apply(null, match.map(n => nodes.indexOf(n)));
    const lastNode = Math.max.apply(null, match.map(n => nodes.indexOf(n)));
    const between = nodes.slice(firstNode + 1, lastNode);

    return match.some(a => between.some(b => isConflictingProp(a, b)));
}

function mergeRules(rule, properties, callback) {
    let decls = (0, _getDecls2.default)(rule, properties);

    while (decls.length) {
        const last = decls[decls.length - 1];
        const props = decls.filter(node => node.important === last.important);
        const rules = (0, _getRules2.default)(props, properties);

        if ((0, _hasAllProps2.default)(rules, ...properties) && !hasConflicts(rules, rule.nodes)) {
            if (callback(rules, last, props)) {
                decls = decls.filter(node => !~rules.indexOf(node));
            }
        }

        decls = decls.filter(node => node !== last);
    }
}
module.exports = exports['default'];