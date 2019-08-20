"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var graphql_import_1 = require("graphql-import");
var minimatch = require("minimatch");
var yaml = require("js-yaml");
var graphql_1 = require("graphql");
function readConfig(configPath) {
    var config;
    try {
        var rawConfig = fs_1.readFileSync(configPath, 'utf-8');
        if (configPath.endsWith('.yaml') || configPath.endsWith('.yml')) {
            config = yaml.safeLoad(rawConfig);
        }
        else {
            config = JSON.parse(rawConfig);
        }
    }
    catch (error) {
        error.message = "Parsing " + configPath + " file has failed.\n" + error.message;
        throw error;
    }
    return config;
}
exports.readConfig = readConfig;
function writeConfig(configPath, config) {
    var configContents;
    if (configPath.endsWith('.yaml') || configPath.endsWith('.yml')) {
        configContents = yaml.safeDump(config);
    }
    else {
        configContents = JSON.stringify(config);
    }
    fs_1.writeFileSync(configPath, configContents, 'utf-8');
}
exports.writeConfig = writeConfig;
function normalizeGlob(glob) {
    if (glob.startsWith('./')) {
        return glob.substr(2);
    }
    return glob;
}
exports.normalizeGlob = normalizeGlob;
function matchesGlobs(filePath, configDir, globs) {
    return (globs || []).some(function (glob) {
        try {
            var globStat = fs_1.lstatSync(path_1.join(configDir, glob));
            var newGlob = glob.length === 0 ? '.' : glob;
            var globToMatch = globStat.isDirectory() ? glob + "/**" : glob;
            return minimatch(filePath, globToMatch, { matchBase: true });
        }
        catch (error) {
            // Out of errors that lstat provides, EACCES and ENOENT are the
            // most likely. For both cases, run the match with the raw glob
            // and return the result.
            return minimatch(filePath, glob, { matchBase: true });
        }
    });
}
exports.matchesGlobs = matchesGlobs;
function validateConfig(config) {
    // FIXME: implement
}
exports.validateConfig = validateConfig;
function mergeConfigs(dest, src) {
    var result = __assign({}, dest, src);
    if (dest.extensions && src.extensions) {
        result.extensions = __assign({}, dest.extensions, src.extensions);
    }
    if (dest.projects && src.projects) {
        result.projects = __assign({}, dest.projects, src.projects);
    }
    return result;
}
exports.mergeConfigs = mergeConfigs;
function schemaToIntrospection(schema) {
    return graphql_1.graphql(schema, graphql_1.introspectionQuery);
}
exports.schemaToIntrospection = schemaToIntrospection;
// Predicate for errors/data can be removed after typescript 2.7.
// See: https://github.com/Microsoft/TypeScript/pull/19513
function introspectionToSchema(introspection) {
    if (introspection.errors != null) {
        throw new Error('Introspection result contains errors');
    }
    return graphql_1.buildClientSchema(introspection.data ? introspection.data : introspection);
}
exports.introspectionToSchema = introspectionToSchema;
function readSchema(path) {
    // FIXME: prefix error
    switch (path_1.extname(path)) {
        case '.graphql':
            return valueToSchema(graphql_import_1.importSchema(path));
        case '.json':
            var data = fs_1.readFileSync(path, { encoding: 'utf-8' });
            var introspection = JSON.parse(data);
            return valueToSchema(introspection);
        default:
            throw new Error('Unsupported schema file extention. Only ".graphql" and ".json" are supported');
    }
}
exports.readSchema = readSchema;
function valueToSchema(schema) {
    if (schema instanceof graphql_1.GraphQLSchema) {
        return schema;
    }
    else if (typeof schema === 'string') {
        return graphql_1.buildSchema(schema);
    }
    else if (schema instanceof graphql_1.Source) {
        return graphql_1.buildSchema(schema);
    }
    else if (typeof schema === 'object' && !Array.isArray(schema)) {
        return introspectionToSchema(schema);
    }
    throw new Error('Can not convert data to a schema');
}
function writeSchema(path, schema, schemaExtensions) {
    return __awaiter(this, void 0, void 0, function () {
        var data, _a, name_1, introspection, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    schema = valueToSchema(schema);
                    _a = path_1.extname(path);
                    switch (_a) {
                        case '.graphql': return [3 /*break*/, 1];
                        case '.json': return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 4];
                case 1:
                    data = '';
                    if (schemaExtensions) {
                        for (name_1 in schemaExtensions) {
                            data += "# " + name_1 + ": " + schemaExtensions[name_1] + "\n";
                        }
                        data += '\n';
                    }
                    data += graphql_1.printSchema(schema);
                    return [3 /*break*/, 5];
                case 2: return [4 /*yield*/, schemaToIntrospection(schema)];
                case 3:
                    introspection = _c.sent();
                    introspection.extensions = (_b = {},
                        _b['graphql-config'] = schemaExtensions,
                        _b);
                    data = JSON.stringify(introspection, null, 2);
                    return [3 /*break*/, 5];
                case 4: throw new Error('Unsupported schema file extention. Only ".graphql" and ".json" are supported');
                case 5:
                    fs_1.writeFileSync(path, data, 'utf-8');
                    return [2 /*return*/];
            }
        });
    });
}
exports.writeSchema = writeSchema;
function getSchemaExtensions(path) {
    var data = fs_1.readFileSync(path, 'utf-8');
    switch (path_1.extname(path)) {
        case '.graphql':
            var extensions = {};
            for (var _i = 0, _a = data.split('\n'); _i < _a.length; _i++) {
                var line = _a[_i];
                var result = /# ([^:]+): (.+)$/.exec(line);
                if (result == null) {
                    break;
                }
                var _ = result[0], key = result[1], value = result[2];
                extensions[key] = value;
            }
            return extensions;
        case '.json':
            var introspection = JSON.parse(data);
            if (!introspection.extentions) {
                return {};
            }
            return introspection.extensions['graphql-config'] || {};
        default:
            throw new Error('Unsupported schema file extention. Only ".graphql" and ".json" are supported');
    }
}
exports.getSchemaExtensions = getSchemaExtensions;
