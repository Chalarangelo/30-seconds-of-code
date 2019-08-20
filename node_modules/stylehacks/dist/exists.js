"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exists;
function exists(selector, index, value) {
    const node = selector.at(index);

    return node && node.value && node.value.toLowerCase() === value;
}
module.exports = exports["default"];