'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

const { space } = _postcss.list;

exports.default = (...rules) => {
    return rules.reduce((memo, rule) => memo += space(rule.value).length, 0);
};

module.exports = exports['default'];