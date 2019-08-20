"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = (...rules) => {
    const candidate = rules[0].value;
    return rules.every(({ value }) => value === candidate);
};

module.exports = exports["default"];