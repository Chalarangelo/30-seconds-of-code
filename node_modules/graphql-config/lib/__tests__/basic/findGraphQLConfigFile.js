"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var path_1 = require("path");
var fs_1 = require("fs");
var os_1 = require("os");
var _1 = require("../../");
ava_1.default('returns a correct config filename', function (t) {
    var configFile = _1.findGraphQLConfigFile(__dirname);
    t.deepEqual(configFile, path_1.join(__dirname, '.graphqlconfig'));
});
ava_1.default('returns a correct config filename for 1st level of sub directories', function (t) {
    var configFile = _1.findGraphQLConfigFile(__dirname + "/../sub-directory-config");
    t.deepEqual(configFile, path_1.join(__dirname + "/../sub-directory-config/sub-directory-2", '.graphqlconfig'));
});
ava_1.default('throws GraphQLConfigNotFoundError when config is not found', function (t) {
    var tempDir = fs_1.mkdtempSync(path_1.join(os_1.tmpdir(), 'graphql-config'));
    t.throws(function () { return _1.findGraphQLConfigFile(tempDir); }, _1.ConfigNotFoundError);
});
