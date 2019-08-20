'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.agents = undefined;

var _browsers = require('./browsers');

var _browserVersions = require('./browserVersions');

var agentsData = require('../../data/agents');

function unpackBrowserVersions(versionsData) {
    return Object.keys(versionsData).reduce(function (usage, version) {
        usage[_browserVersions.browserVersions[version]] = versionsData[version];
        return usage;
    }, {});
}

var agents = exports.agents = Object.keys(agentsData).reduce(function (map, key) {
    var versionsData = agentsData[key];
    map[_browsers.browsers[key]] = Object.keys(versionsData).reduce(function (data, entry) {
        if (entry === 'A') {
            data.usage_global = unpackBrowserVersions(versionsData[entry]);
        } else if (entry === 'C') {
            data.versions = versionsData[entry].reduce(function (list, version) {
                if (version === '') {
                    list.push(null);
                } else {
                    list.push(_browserVersions.browserVersions[version]);
                }
                return list;
            }, []);
        } else if (entry === 'D') {
            data.prefix_exceptions = unpackBrowserVersions(versionsData[entry]);
        } else if (entry === 'E') {
            data.browser = versionsData[entry];
        } else if (entry === 'F') {
            data.release_date = Object.keys(versionsData[entry]).reduce(function (map, key) {
                map[_browserVersions.browserVersions[key]] = versionsData[entry][key];
                return map;
            }, {});
        } else {
            // entry is B
            data.prefix = versionsData[entry];
        }
        return data;
    }, {});
    return map;
}, {});