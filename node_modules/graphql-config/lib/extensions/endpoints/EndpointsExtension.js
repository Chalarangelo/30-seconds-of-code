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
var graphql_request_1 = require("graphql-request");
var graphql_1 = require("graphql");
var resolveRefString_1 = require("./resolveRefString");
var GraphQLEndpointsExtension = /** @class */ (function () {
    function GraphQLEndpointsExtension(endpointConfig, configPath) {
        this.raw = endpointConfig;
        this.configPath = configPath;
    }
    GraphQLEndpointsExtension.prototype.getRawEndpointsMap = function () {
        var endpoints = {};
        for (var name_1 in this.raw) {
            var rawEndpoint = this.raw[name_1];
            if (typeof rawEndpoint === 'string') {
                endpoints[name_1] = { url: rawEndpoint };
            }
            else {
                endpoints[name_1] = rawEndpoint;
            }
        }
        return endpoints;
    };
    GraphQLEndpointsExtension.prototype.getEnvVarsForEndpoint = function (endpointName) {
        return resolveRefString_1.getUsedEnvs(this.getRawEndpoint(endpointName));
    };
    GraphQLEndpointsExtension.prototype.getEndpoint = function (endpointName, env) {
        if (env === void 0) { env = process.env; }
        var endpoint = this.getRawEndpoint(endpointName);
        try {
            var resolved = resolveRefString_1.resolveEnvsInValues(endpoint, env);
            // graphql-config extensions might have already instantiated a GraphQLEndpoint
            // or derived class from the GraphQLConfigEndpointConfig data. In that case,
            // getRawEndpoint will already return a GraphQLEndpoint and it should not be overwritten.
            if (!(resolved instanceof GraphQLEndpoint)) {
                return new GraphQLEndpoint(resolved);
            }
            return resolved;
        }
        catch (e) {
            e.message = this.configPath + ": " + e.message;
            throw e;
        }
    };
    GraphQLEndpointsExtension.prototype.getRawEndpoint = function (endpointName) {
        if (endpointName === void 0) { endpointName = process.env.GRAPHQL_CONFIG_ENDPOINT_NAME; }
        var rawEndpointsMap = this.getRawEndpointsMap();
        var endpointNames = Object.keys(rawEndpointsMap);
        if (endpointName == null) {
            if (endpointNames.length === 1) {
                endpointName = endpointNames[0];
            }
            else {
                throw new Error('You have to specify endpoint name or define GRAPHQL_CONFIG_ENDPOINT_NAME environment variable');
            }
        }
        var endpoint = rawEndpointsMap[endpointName];
        if (!endpoint) {
            throw new Error(this.configPath + ": \"" + endpointName + "\" is not valid endpoint name. " +
                ("Valid endpoint names: " + endpointNames.join(', ')));
        }
        if (!endpoint.url && !(endpoint instanceof GraphQLEndpoint)) {
            throw new Error(this
                .configPath + ": \"url\" is required but is not specified for \"" + endpointName + "\" endpoint");
        }
        return endpoint;
    };
    return GraphQLEndpointsExtension;
}());
exports.GraphQLEndpointsExtension = GraphQLEndpointsExtension;
var GraphQLEndpoint = /** @class */ (function () {
    function GraphQLEndpoint(resolvedConfig) {
        Object.assign(this, resolvedConfig);
    }
    GraphQLEndpoint.prototype.getClient = function (clientOptions) {
        if (clientOptions === void 0) { clientOptions = {}; }
        return new graphql_request_1.GraphQLClient(this.url, __assign({}, clientOptions, { headers: this.headers }));
    };
    GraphQLEndpoint.prototype.resolveIntrospection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = this.getClient();
                        return [4 /*yield*/, client.request(graphql_1.introspectionQuery)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, { data: data }];
                }
            });
        });
    };
    GraphQLEndpoint.prototype.resolveSchema = function () {
        return __awaiter(this, void 0, void 0, function () {
            var introspection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolveIntrospection()];
                    case 1:
                        introspection = _a.sent();
                        return [2 /*return*/, graphql_1.buildClientSchema(introspection.data)];
                }
            });
        });
    };
    GraphQLEndpoint.prototype.resolveSchemaSDL = function () {
        return __awaiter(this, void 0, void 0, function () {
            var schema;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.resolveSchema()];
                    case 1:
                        schema = _a.sent();
                        return [2 /*return*/, graphql_1.printSchema(schema)];
                }
            });
        });
    };
    return GraphQLEndpoint;
}());
exports.GraphQLEndpoint = GraphQLEndpoint;
