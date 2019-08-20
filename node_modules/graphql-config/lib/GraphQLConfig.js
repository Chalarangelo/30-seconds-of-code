"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var utils_1 = require("./utils");
var lodash_1 = require("lodash");
var GraphQLProjectConfig_1 = require("./GraphQLProjectConfig");
var GraphQLConfig = /** @class */ (function () {
    function GraphQLConfig(config, configPath) {
        utils_1.validateConfig(config);
        this.config = config;
        this.configPath = configPath;
    }
    Object.defineProperty(GraphQLConfig.prototype, "configDir", {
        get: function () {
            return path_1.dirname(this.configPath);
        },
        enumerable: true,
        configurable: true
    });
    GraphQLConfig.prototype.getProjectConfig = function (projectName) {
        return new GraphQLProjectConfig_1.GraphQLProjectConfig(this.config, this.configPath, projectName);
    };
    GraphQLConfig.prototype.getConfigForFile = function (filePath) {
        var projects = this.config.projects;
        if (!projects || Object.keys(projects).length === 0) {
            var config = new GraphQLProjectConfig_1.GraphQLProjectConfig(this.config, this.configPath, undefined);
            return config.includesFile(filePath) ? config : undefined;
        }
        return lodash_1.values(this.getProjects()).find(function (project) { return project.includesFile(filePath); }) || undefined;
    };
    GraphQLConfig.prototype.getProjectNameForFile = function (filePath) {
        var proj = this.getConfigForFile(filePath);
        return proj && proj.projectName || undefined;
    };
    GraphQLConfig.prototype.getProjects = function () {
        var result = {};
        for (var projectName in (this.config.projects || {})) {
            result[projectName] = this.getProjectConfig(projectName);
        }
        if (Object.keys(result).length === 0) {
            return undefined;
        }
        return result;
    };
    GraphQLConfig.prototype.saveConfig = function (newConfig, projectName) {
        var config;
        if (projectName) {
            config = this.config;
            config.projects = config.projects || {};
            config.projects[projectName] = config.projects[projectName] || {};
            config.projects[projectName] = newConfig;
        }
        else {
            config = newConfig;
        }
        utils_1.writeConfig(this.configPath, config);
    };
    return GraphQLConfig;
}());
exports.GraphQLConfig = GraphQLConfig;
