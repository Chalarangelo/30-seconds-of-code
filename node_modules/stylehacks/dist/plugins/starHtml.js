'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcssSelectorParser = require('postcss-selector-parser');

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

var _exists = require('../exists');

var _exists2 = _interopRequireDefault(_exists);

var _isMixin = require('../isMixin');

var _isMixin2 = _interopRequireDefault(_isMixin);

var _plugin = require('../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _browsers = require('../dictionary/browsers');

var _identifiers = require('../dictionary/identifiers');

var _postcss = require('../dictionary/postcss');

var _tags = require('../dictionary/tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function analyse(ctx, rule) {
    return selectors => {
        selectors.each(selector => {
            if ((0, _exists2.default)(selector, 0, '*') && (0, _exists2.default)(selector, 1, ' ') && (0, _exists2.default)(selector, 2, _tags.HTML) && (0, _exists2.default)(selector, 3, ' ') && selector.at(4)) {
                ctx.push(rule, {
                    identifier: _identifiers.SELECTOR,
                    hack: selector.toString()
                });
            }
        });
    };
}

exports.default = (0, _plugin2.default)([_browsers.IE_5_5, _browsers.IE_6], [_postcss.RULE], function (rule) {
    if ((0, _isMixin2.default)(rule)) {
        return;
    }

    (0, _postcssSelectorParser2.default)(analyse(this, rule)).processSync(rule.selector);
});
module.exports = exports['default'];