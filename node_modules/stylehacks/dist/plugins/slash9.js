'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _plugin = require('../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _browsers = require('../dictionary/browsers');

var _identifiers = require('../dictionary/identifiers');

var _postcss = require('../dictionary/postcss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _plugin2.default)([_browsers.IE_6, _browsers.IE_7, _browsers.IE_8], [_postcss.DECL], function (decl) {
    let v = decl.value;
    if (v && v.length > 2 && v.indexOf('\\9') === v.length - 2) {
        this.push(decl, {
            identifier: _identifiers.VALUE,
            hack: v
        });
    }
});
module.exports = exports['default'];