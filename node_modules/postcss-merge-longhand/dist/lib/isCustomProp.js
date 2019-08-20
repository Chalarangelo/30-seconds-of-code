"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = node => ~node.value.search(/var\s*\(\s*--/i);

module.exports = exports["default"];