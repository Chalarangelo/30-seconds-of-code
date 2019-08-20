'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isMixin;
function isMixin(node) {
    const { selector } = node;

    // If the selector ends with a ':' it is likely a part of a custom mixin.
    if (!selector || selector[selector.length - 1] === ':') {
        return true;
    }

    return false;
}
module.exports = exports['default'];