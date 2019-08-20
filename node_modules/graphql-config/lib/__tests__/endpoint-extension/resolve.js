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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var graphql_1 = require("graphql");
var _1 = require("../../");
var utils_1 = require("../utils");
ava_1.default.before(function (t) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.serveSchema()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); });
var confPath = __dirname + "/.graphqlconfig";
ava_1.default('getEndpointsMap when endpoint is string url', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var configData, config, endpoints;
    return __generator(this, function (_a) {
        configData = {
            schemaPath: '../schema.json',
            extensions: {
                endpoints: {
                    dev: 'http://default',
                },
            },
        };
        config = new _1.GraphQLProjectConfig(configData, confPath);
        endpoints = config.endpointsExtension;
        t.deepEqual(endpoints && endpoints.getRawEndpointsMap(), {
            dev: { url: 'http://default' },
        });
        return [2 /*return*/];
    });
}); });
ava_1.default('getEndpointsMap when endpoint is single endpoint config', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var configData, config, endpoint;
    return __generator(this, function (_a) {
        configData = {
            schemaPath: '../schema.json',
            extensions: {
                endpoints: {
                    dev: {
                        url: 'http://default',
                        subscription: {
                            url: 'ws://test',
                        },
                    },
                },
            },
        };
        config = new _1.GraphQLProjectConfig(configData, confPath, undefined);
        endpoint = config.endpointsExtension;
        t.deepEqual(endpoint && endpoint.getRawEndpointsMap(), {
            dev: configData.extensions.endpoints.dev,
        });
        return [2 /*return*/];
    });
}); });
ava_1.default('getEndpointsMap when endpoint is endpoints map', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var configData, config, endpoint;
    return __generator(this, function (_a) {
        configData = {
            schemaPath: '../schema.json',
            extensions: {
                endpoints: {
                    dev: 'http://dev',
                    prod: {
                        url: 'http://prod',
                        subscription: {
                            url: 'ws://prod',
                        },
                    },
                },
            },
        };
        config = new _1.GraphQLProjectConfig(configData, confPath, undefined);
        endpoint = config.endpointsExtension;
        t.deepEqual(endpoint && endpoint.getRawEndpointsMap(), {
            dev: {
                url: 'http://dev',
            },
            prod: {
                url: 'http://prod',
                subscription: {
                    url: 'ws://prod',
                },
            },
        });
        return [2 /*return*/];
    });
}); });
ava_1.default('resolveSchemaFromEndpoint should throw if non-existing endpoint is specified', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var configData, config, error, endpoint;
    return __generator(this, function (_a) {
        configData = {
            schemaPath: '../schema.json',
            extensions: {
                endpoints: {
                    dev: {
                        url: 'http://dev',
                        subscription: {
                            url: 'ws://dev',
                        },
                    },
                },
            },
        };
        config = new _1.GraphQLProjectConfig(configData, confPath, undefined);
        endpoint = config.endpointsExtension;
        error = t.throws(function () { return endpoint && endpoint.getEndpoint('prod').resolveSchema(); });
        t.regex(error.message, /"prod" is not valid endpoint name. Valid endpoint names: dev/);
        return [2 /*return*/];
    });
}); });
ava_1.default('resolveSchemaFromEndpoint HTTP', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var configData, config, schema, resolvedIntrospection;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                configData = {
                    schemaPath: '../schema.json',
                    extensions: {
                        endpoints: {
                            dev: 'http://127.0.0.1:33333',
                        },
                    },
                };
                config = new _1.GraphQLProjectConfig(configData, confPath, undefined);
                if (!config.endpointsExtension) {
                    throw 'endpointExtension can\'t be empty';
                }
                return [4 /*yield*/, config.endpointsExtension
                        .getEndpoint('dev')
                        .resolveSchema()];
            case 1:
                schema = _a.sent();
                return [4 /*yield*/, graphql_1.graphql(schema, graphql_1.introspectionQuery)];
            case 2:
                resolvedIntrospection = _a.sent();
                t.snapshot(resolvedIntrospection);
                return [2 /*return*/];
        }
    });
}); });
