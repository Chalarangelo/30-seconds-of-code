"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var findGraphQLConfigFile_1 = require("./findGraphQLConfigFile");
var GraphQLConfig_1 = require("./GraphQLConfig");
function getGraphQLConfig(rootDir) {
    if (rootDir === void 0) { rootDir = process.cwd(); }
    var configPath = findGraphQLConfigFile_1.findGraphQLConfigFile(rootDir);
    var config = utils_1.readConfig(configPath);
    utils_1.validateConfig(config);
    return new GraphQLConfig_1.GraphQLConfig(config, configPath);
}
exports.getGraphQLConfig = getGraphQLConfig;
function getGraphQLProjectConfig(rootDir, projectName) {
    if (projectName === void 0) { projectName = process.env.GRAPHQL_CONFIG_PROJECT; }
    return getGraphQLConfig(rootDir).getProjectConfig(projectName);
}
exports.getGraphQLProjectConfig = getGraphQLProjectConfig;
