"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
var errors_1 = require("./errors");
exports.GRAPHQL_CONFIG_NAME = '.graphqlconfig';
exports.GRAPHQL_CONFIG_YAML_NAME = '.graphqlconfig.yaml';
exports.GRAPHQL_CONFIG_YML_NAME = '.graphqlconfig.yml';
function isRootDir(path) {
    return path_1.dirname(path) === path;
}
function findGraphQLConfigFile(filePath) {
    filePath = path_1.resolve(filePath);
    if (filePath.endsWith(exports.GRAPHQL_CONFIG_NAME) ||
        filePath.endsWith(exports.GRAPHQL_CONFIG_YAML_NAME) ||
        filePath.endsWith(exports.GRAPHQL_CONFIG_YML_NAME)) {
        return filePath;
    }
    var currentDir = filePath;
    while (!isRootDir(currentDir)) {
        var configPath = path_1.join(currentDir, exports.GRAPHQL_CONFIG_NAME);
        if (fs_1.existsSync(configPath)) {
            return configPath;
        }
        if (fs_1.existsSync(configPath + '.yaml')) {
            return configPath + '.yaml';
        }
        if (fs_1.existsSync(configPath + '.yml')) {
            return configPath + '.yml';
        }
        currentDir = path_1.dirname(currentDir);
    }
    // Try to find GraphQL config in first level of sub-directories.
    var subDirectories = fs_1.readdirSync(filePath).map(function (dir) { return path_1.join(filePath, dir); }).filter(function (dir) {
        return (fs_1.lstatSync(dir).isDirectory());
    });
    var subDirectoriesWithGraphQLConfig = subDirectories.map(function (subDirectory) {
        var subDirectoryFiles = fs_1.readdirSync(subDirectory)
            .filter(function (file) {
            return !(fs_1.lstatSync(path_1.join(subDirectory, file)).isDirectory());
        })
            .map(function (file) {
            return path_1.basename(path_1.join(subDirectory, file));
        });
        if (subDirectoryFiles.includes(exports.GRAPHQL_CONFIG_NAME)) {
            return subDirectory + "/" + exports.GRAPHQL_CONFIG_NAME;
        }
        if (subDirectoryFiles.includes(exports.GRAPHQL_CONFIG_NAME + ".yml")) {
            return subDirectory + "/" + exports.GRAPHQL_CONFIG_NAME + ".yml";
        }
        if (subDirectoryFiles.includes(exports.GRAPHQL_CONFIG_NAME + ".yaml")) {
            return subDirectory + "/" + exports.GRAPHQL_CONFIG_NAME + ".yaml";
        }
    }).filter(function (subDirectory) { return Boolean(subDirectory); });
    if (subDirectoriesWithGraphQLConfig.length > 0) {
        return subDirectoriesWithGraphQLConfig[0];
    }
    throw new errors_1.ConfigNotFoundError("\"" + exports.GRAPHQL_CONFIG_NAME + "\" file is not available in the provided config " +
        ("directory: " + filePath + "\nPlease check the config directory."));
}
exports.findGraphQLConfigFile = findGraphQLConfigFile;
