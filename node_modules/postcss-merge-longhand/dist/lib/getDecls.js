"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getDecls;
function getDecls(rule, properties) {
    return rule.nodes.filter(({ prop }) => prop && ~properties.indexOf(prop.toLowerCase()));
}
module.exports = exports["default"];