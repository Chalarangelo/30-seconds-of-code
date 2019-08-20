'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

exports.default = (0, _postcss.plugin)('cssnano-util-raw-cache', () => {
    return (css, result) => {
        result.root.rawCache = {
            colon: ':',
            indent: '',
            beforeDecl: '',
            beforeRule: '',
            beforeOpen: '',
            beforeClose: '',
            beforeComment: '',
            after: '',
            emptyBody: '',
            commentLeft: '',
            commentRight: ''
        };
    };
});
module.exports = exports['default'];