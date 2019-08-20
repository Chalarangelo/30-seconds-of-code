'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

exports.default = v => {
    const s = typeof v === 'string' ? _postcss.list.space(v) : v;
    return [s[0], // top
    s[1] || s[0], // right
    s[2] || s[0], // bottom
    s[3] || s[1] || s[0]];
};

module.exports = exports['default'];