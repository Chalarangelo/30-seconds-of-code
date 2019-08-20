"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var graphql_1 = require("graphql");
var utils_1 = require("./utils");
var extensions_1 = require("./extensions");
/*
 * this class can be used for simple usecases where there is no need in per-file API
 */
var GraphQLProjectConfig = /** @class */ (function () {
    function GraphQLProjectConfig(config, configPath, projectName) {
        utils_1.validateConfig(config);
        this.config = loadProjectConfig(config, projectName);
        this.configPath = configPath;
        this.projectName = projectName;
    }
    GraphQLProjectConfig.prototype.resolveConfigPath = function (relativePath) {
        return path_1.resolve(this.configDir, relativePath);
    };
    GraphQLProjectConfig.prototype.includesFile = function (fileUri) {
        var filePath = fileUri.startsWith('file://') ?
            fileUri.substr(7) : fileUri;
        var fullFilePath = filePath.startsWith(this.configDir) ?
            filePath : path_1.resolve(path_1.join(this.configDir, filePath));
        var relativePath = path_1.relative(this.configDir, fullFilePath);
        return ((!this.config.includes ||
            utils_1.matchesGlobs(relativePath, this.configDir, this.includes)) && !utils_1.matchesGlobs(relativePath, this.configDir, this.excludes));
    };
    GraphQLProjectConfig.prototype.getSchema = function () {
        if (this.schemaPath) {
            return utils_1.readSchema(this.resolveConfigPath(this.schemaPath));
        }
        throw new Error("\"schemaPath\" is required but not provided in " + this.configPath);
    };
    GraphQLProjectConfig.prototype.resolveIntrospection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, utils_1.schemaToIntrospection(this.getSchema())];
            });
        });
    };
    GraphQLProjectConfig.prototype.getSchemaSDL = function () {
        return graphql_1.printSchema(this.getSchema());
    };
    Object.defineProperty(GraphQLProjectConfig.prototype, "configDir", {
        // Getters
        get: function () {
            return path_1.dirname(this.configPath);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphQLProjectConfig.prototype, "schemaPath", {
        get: function () {
            return this.config.schemaPath ? this.resolveConfigPath(this.config.schemaPath) : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphQLProjectConfig.prototype, "includes", {
        get: function () {
            return (this.config.includes || []).map(utils_1.normalizeGlob);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphQLProjectConfig.prototype, "excludes", {
        get: function () {
            return (this.config.excludes || []).map(utils_1.normalizeGlob);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphQLProjectConfig.prototype, "extensions", {
        get: function () {
            return this.config.extensions || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphQLProjectConfig.prototype, "endpointsExtension", {
        /*
         extension related helper functions
        */
        get: function () {
            if (!this.extensions.endpoints) {
                return null;
            }
            var endpoints = this.extensions.endpoints;
            if (typeof endpoints !== 'object' || Array.isArray(endpoints)) {
                throw new Error(this.configPath + ": \"endpoints\" should be an object");
            }
            if (Object.keys(endpoints).length === 0) {
                return null;
            }
            return new extensions_1.GraphQLEndpointsExtension(this.extensions.endpoints, this.configPath);
        },
        enumerable: true,
        configurable: true
    });
    return GraphQLProjectConfig;
}());
exports.GraphQLProjectConfig = GraphQLProjectConfig;
function loadProjectConfig(config, projectName) {
    var projects = config.projects, configBase = __rest(config, ["projects"]);
    if (projects == null || !Object.keys(projects).length) {
        return config;
    }
    if (!projectName) {
        throw new Error("Project name must be specified for multiproject config. " +
            ("Valid project names: " + Object.keys(projects).join(', ')));
    }
    var projectConfig = projects[projectName];
    if (!projectConfig) {
        throw new Error("\"" + projectName + "\" is not a valid project name. " +
            ("Valid project names: " + Object.keys(projects).join(', ')));
    }
    return utils_1.mergeConfigs(configBase, projectConfig);
}
