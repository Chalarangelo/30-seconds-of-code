'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parseWsc;

var _postcss = require('postcss');

var _validateWsc = require('./validateWsc');

const none = /^\s*(none|medium)(\s+none(\s+(none|currentcolor))?)?\s*$/i;

const varRE = /(^.*var)(.*\(.*--.*\))(.*)/i;
const varPreserveCase = p => `${p[1].toLowerCase()}${p[2]}${p[3].toLowerCase()}`;
const toLower = v => {
    const match = varRE.exec(v);
    return match ? varPreserveCase(match) : v.toLowerCase();
};

function parseWsc(value) {
    if (none.test(value)) {
        return ['medium', 'none', 'currentcolor'];
    }

    let width, style, color;

    const values = _postcss.list.space(value);

    if (values.length > 1 && (0, _validateWsc.isStyle)(values[1]) && values[0].toLowerCase() === 'none') {
        values.unshift();
        width = '0';
    }

    const unknown = [];

    values.forEach(v => {
        if ((0, _validateWsc.isStyle)(v)) {
            style = toLower(v);
        } else if ((0, _validateWsc.isWidth)(v)) {
            width = toLower(v);
        } else if ((0, _validateWsc.isColor)(v)) {
            color = toLower(v);
        } else {
            unknown.push(v);
        }
    });

    if (unknown.length) {
        if (!width && style && color) {
            width = unknown.pop();
        }

        if (width && !style && color) {
            style = unknown.pop();
        }

        if (width && style && !color) {
            color = unknown.pop();
        }
    }

    return [width, style, color];
}
module.exports = exports['default'];