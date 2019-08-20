'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getParsed;

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getParsed(decl) {
    let { value, raws } = decl;
    if (raws && raws.value && raws.value.raw) {
        value = raws.value.raw;
    }
    return (0, _postcssValueParser2.default)(value);
}
module.exports = exports['default'];