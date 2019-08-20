'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _parseWsc = require('./parseWsc');

var _parseWsc2 = _interopRequireDefault(_parseWsc);

var _minifyTrbl = require('./minifyTrbl');

var _minifyTrbl2 = _interopRequireDefault(_minifyTrbl);

var _validateWsc = require('./validateWsc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaults = ['medium', 'none', 'currentcolor'];

exports.default = v => {
    const values = (0, _parseWsc2.default)(v);

    if (!(0, _validateWsc.isValidWsc)(values)) {
        return (0, _minifyTrbl2.default)(v);
    }

    const value = [...values, ''].reduceRight((prev, cur, i, arr) => {
        if (cur === undefined || cur.toLowerCase() === defaults[i] && (!i || (arr[i - 1] || '').toLowerCase() !== cur.toLowerCase())) {
            return prev;
        }

        return cur + ' ' + prev;
    }).trim();

    return (0, _minifyTrbl2.default)(value || 'none');
};

module.exports = exports['default'];