'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = unpackRegion;

var _browsers = require('./browsers');

function unpackRegion(packed) {
    return Object.keys(packed).reduce(function (list, browser) {
        var data = packed[browser];
        list[_browsers.browsers[browser]] = Object.keys(data).reduce(function (memo, key) {
            var stats = data[key];
            if (key === '_') {
                stats.split(' ').forEach(function (version) {
                    return memo[version] = null;
                });
            } else {
                memo[key] = stats;
            }
            return memo;
        }, {});
        return list;
    }, {});
}