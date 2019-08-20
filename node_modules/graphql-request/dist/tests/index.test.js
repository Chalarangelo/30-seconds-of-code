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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var fetchMock = require("fetch-mock");
var index_1 = require("../src/index");
ava_1.default('minimal query', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = {
                    viewer: {
                        id: 'some-id',
                    },
                };
                return [4 /*yield*/, mock({ body: { data: data } }, function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _b = (_a = t).deepEqual;
                                    return [4 /*yield*/, index_1.request('https://mock-api.com/graphql', "{ viewer { id } }")];
                                case 1:
                                    _b.apply(_a, [_c.sent(), data]);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('minimal raw query', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var data, extensions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = {
                    viewer: {
                        id: 'some-id',
                    },
                };
                extensions = {
                    version: '1',
                };
                return [4 /*yield*/, mock({ body: { data: data, extensions: extensions } }, function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a, headers, result;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, index_1.rawRequest('https://mock-api.com/graphql', "{ viewer { id } }")];
                                case 1:
                                    _a = _b.sent(), headers = _a.headers, result = __rest(_a, ["headers"]);
                                    t.deepEqual(result, { data: data, extensions: extensions, status: 200 });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('minimal raw query with response headers', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var data, extensions, reqHeaders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = {
                    viewer: {
                        id: 'some-id',
                    },
                };
                extensions = {
                    version: '1',
                };
                reqHeaders = {
                    'Content-Type': 'application/json',
                    'X-Custom-Header': 'test-custom-header',
                };
                return [4 /*yield*/, mock({ headers: reqHeaders, body: { data: data, extensions: extensions } }, function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a, headers, result;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, index_1.rawRequest('https://mock-api.com/graphql', "{ viewer { id } }")];
                                case 1:
                                    _a = _b.sent(), headers = _a.headers, result = __rest(_a, ["headers"]);
                                    t.deepEqual(result, { data: data, extensions: extensions, status: 200 });
                                    t.deepEqual(headers.get('X-Custom-Header'), reqHeaders['X-Custom-Header']);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('basic error', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var errors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = {
                    message: "Syntax Error GraphQL request (1:1) Unexpected Name \"x\"\n\n1: x\n   ^\n",
                    locations: [
                        {
                            line: 1,
                            column: 1
                        }
                    ]
                };
                return [4 /*yield*/, mock({ body: { errors: errors } }, function () { return __awaiter(_this, void 0, void 0, function () {
                        var err;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, t.throws(index_1.request('https://mock-api.com/graphql', "x"))];
                                case 1:
                                    err = _a.sent();
                                    t.deepEqual(err.response.errors, errors);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('raw request error', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var errors;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = {
                    message: "Syntax Error GraphQL request (1:1) Unexpected Name \"x\"\n\n1: x\n   ^\n",
                    locations: [
                        {
                            line: 1,
                            column: 1
                        }
                    ]
                };
                return [4 /*yield*/, mock({ body: { errors: errors } }, function () { return __awaiter(_this, void 0, void 0, function () {
                        var err;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, t.throws(index_1.rawRequest('https://mock-api.com/graphql', "x"))];
                                case 1:
                                    err = _a.sent();
                                    t.deepEqual(err.response.errors, errors);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('content-type with charset', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = {
                    viewer: {
                        id: 'some-id',
                    },
                };
                return [4 /*yield*/, mock({
                        headers: { 'Content-Type': 'application/json; charset=utf-8' },
                        body: { data: data }
                    }, function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _b = (_a = t).deepEqual;
                                    return [4 /*yield*/, index_1.request('https://mock-api.com/graphql', "{ viewer { id } }")];
                                case 1:
                                    _b.apply(_a, [_c.sent(), data]);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('extra fetch options', function (t) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var options, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = {
                    credentials: 'include',
                    mode: 'cors',
                    cache: 'reload',
                };
                client = new index_1.GraphQLClient('https://mock-api.com/graphql', options);
                return [4 /*yield*/, mock({
                        body: { data: { test: 'test' } }
                    }, function () { return __awaiter(_this, void 0, void 0, function () {
                        var actualOptions, name_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, client.request('{ test }')];
                                case 1:
                                    _a.sent();
                                    actualOptions = fetchMock.lastCall()[1];
                                    for (name_1 in options) {
                                        t.deepEqual(actualOptions[name_1], options[name_1]);
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
function mock(response, testFn) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fetchMock.mock({
                        matcher: '*',
                        response: {
                            headers: __assign({ 'Content-Type': 'application/json' }, response.headers),
                            body: JSON.stringify(response.body),
                        },
                    });
                    return [4 /*yield*/, testFn()];
                case 1:
                    _a.sent();
                    fetchMock.restore();
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=index.test.js.map