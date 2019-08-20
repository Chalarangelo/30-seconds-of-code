"use strict";

exports.__esModule = true;
exports.default = unesc;
var HEX_ESC = /\\(?:([0-9a-fA-F]{6})|([0-9a-fA-F]{1,5})(?: |(?![0-9a-fA-F])))/g;
var OTHER_ESC = /\\(.)/g;
function unesc(str) {
    str = str.replace(HEX_ESC, function (_, hex1, hex2) {
        var hex = hex1 || hex2;
        var code = parseInt(hex, 16);
        return String.fromCharCode(code);
    });
    str = str.replace(OTHER_ESC, function (_, char) {
        return char;
    });
    return str;
}
module.exports = exports["default"];