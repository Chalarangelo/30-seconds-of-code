'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _plugin = require('../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _isMixin = require('../isMixin');

var _isMixin2 = _interopRequireDefault(_isMixin);

var _browsers = require('../dictionary/browsers');

var _identifiers = require('../dictionary/identifiers');

var _postcss = require('../dictionary/postcss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _plugin2.default)([_browsers.IE_5_5, _browsers.IE_6, _browsers.IE_7], [_postcss.RULE], function (rule) {
    if ((0, _isMixin2.default)(rule)) {
        return;
    }

    const { selector } = rule;
    const trim = selector.trim();

    if (trim.lastIndexOf(',') === selector.length - 1 || trim.lastIndexOf('\\') === selector.length - 1) {
        this.push(rule, {
            identifier: _identifiers.SELECTOR,
            hack: selector
        });
    }
});
module.exports = exports['default'];