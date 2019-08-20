'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = unpackFeature;

var _statuses = require('../lib/statuses');

var _statuses2 = _interopRequireDefault(_statuses);

var _supported = require('../lib/supported');

var _supported2 = _interopRequireDefault(_supported);

var _browsers = require('./browsers');

var _browserVersions = require('./browserVersions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MATH2LOG = Math.log(2);

function unpackSupport(cipher) {
    // bit flags
    var stats = Object.keys(_supported2.default).reduce(function (list, support) {
        if (cipher & _supported2.default[support]) list.push(support);
        return list;
    }, []);

    // notes
    var notes = cipher >> 7;
    var notesArray = [];
    while (notes) {
        var note = Math.floor(Math.log(notes) / MATH2LOG) + 1;
        notesArray.unshift('#' + note);
        notes -= Math.pow(2, note - 1);
    }

    return stats.concat(notesArray).join(' ');
}

function unpackFeature(packed) {
    var unpacked = { status: _statuses2.default[packed.B], title: packed.C };
    unpacked.stats = Object.keys(packed.A).reduce(function (browserStats, key) {
        var browser = packed.A[key];
        browserStats[_browsers.browsers[key]] = Object.keys(browser).reduce(function (stats, support) {
            var packedVersions = browser[support].split(' ');
            var unpacked = unpackSupport(support);
            packedVersions.forEach(function (v) {
                return stats[_browserVersions.browserVersions[v]] = unpacked;
            });
            return stats;
        }, {});
        return browserStats;
    }, {});
    return unpacked;
}