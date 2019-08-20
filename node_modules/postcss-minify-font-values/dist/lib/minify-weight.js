'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (value) {
    const valueInLowerCase = value.toLowerCase();

    return valueInLowerCase === 'normal' ? '400' : valueInLowerCase === 'bold' ? '700' : value;
};

;
module.exports = exports['default'];