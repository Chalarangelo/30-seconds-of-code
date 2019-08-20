'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _plugin = require('../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _browsers = require('../dictionary/browsers');

var _identifiers = require('../dictionary/identifiers');

var _postcss3 = require('../dictionary/postcss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _plugin2.default)([_browsers.IE_6], [_postcss3.DECL], function (decl) {
    const { before } = decl.raws;

    if (before && ~before.indexOf('_')) {
        this.push(decl, {
            identifier: _identifiers.PROPERTY,
            hack: `${before.trim()}${decl.prop}`
        });
    }

    if (decl.prop[0] === '-' && decl.prop[1] !== '-' && _postcss2.default.vendor.prefix(decl.prop) === '') {
        this.push(decl, {
            identifier: _identifiers.PROPERTY,
            hack: decl.prop
        });
    }
});
module.exports = exports['default'];