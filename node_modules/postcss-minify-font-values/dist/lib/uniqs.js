"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = uniqueExcept;
function uniqueExcept(exclude) {
    return function unique() {
        const list = Array.prototype.concat.apply([], arguments);
        return list.filter((item, i) => {
            if (item.toLowerCase() === exclude) {
                return true;
            }
            return i === list.indexOf(item);
        });
    };
};
module.exports = exports["default"];