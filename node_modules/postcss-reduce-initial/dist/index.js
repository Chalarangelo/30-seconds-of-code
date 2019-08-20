'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _has = require('has');

var _has2 = _interopRequireDefault(_has);

var _browserslist = require('browserslist');

var _browserslist2 = _interopRequireDefault(_browserslist);

var _caniuseApi = require('caniuse-api');

var _fromInitial = require('../data/fromInitial.json');

var _fromInitial2 = _interopRequireDefault(_fromInitial);

var _toInitial = require('../data/toInitial.json');

var _toInitial2 = _interopRequireDefault(_toInitial);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initial = 'initial';

exports.default = (0, _postcss.plugin)('postcss-reduce-initial', () => {
    return (css, result) => {
        const resultOpts = result.opts || {};
        const browsers = (0, _browserslist2.default)(null, {
            stats: resultOpts.stats,
            path: __dirname,
            env: resultOpts.env
        });

        const initialSupport = (0, _caniuseApi.isSupported)('css-initial-value', browsers);

        css.walkDecls(decl => {
            const lowerCasedProp = decl.prop.toLowerCase();

            if (initialSupport && (0, _has2.default)(_toInitial2.default, lowerCasedProp) && decl.value.toLowerCase() === _toInitial2.default[lowerCasedProp]) {
                decl.value = initial;
                return;
            }

            if (decl.value.toLowerCase() !== initial || !_fromInitial2.default[lowerCasedProp]) {
                return;
            }

            decl.value = _fromInitial2.default[lowerCasedProp];
        });
    };
});
module.exports = exports['default'];