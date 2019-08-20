"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = insertCloned;
function insertCloned(rule, decl, props) {
    const newNode = Object.assign(decl.clone(), props);

    rule.insertAfter(decl, newNode);

    return newNode;
};
module.exports = exports["default"];