'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _parseTrbl = require('./parseTrbl');

var _parseTrbl2 = _interopRequireDefault(_parseTrbl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = v => {
    const value = (0, _parseTrbl2.default)(v);

    if (value[3] === value[1]) {
        value.pop();

        if (value[2] === value[0]) {
            value.pop();

            if (value[0] === value[1]) {
                value.pop();
            }
        }
    }

    return value.join(' ');
};

module.exports = exports['default'];