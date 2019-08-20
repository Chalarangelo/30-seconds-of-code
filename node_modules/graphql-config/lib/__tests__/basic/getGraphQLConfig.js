"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var path_1 = require("path");
var graphql_1 = require("graphql");
var _1 = require("../../");
var CONFIG_DIR = path_1.join(__dirname, 'config');
var config;
ava_1.default.beforeEach(function () {
    config = _1.getGraphQLConfig(CONFIG_DIR);
});
ava_1.default('returns a correct name', function (t) {
    var testWithSchemaConfig = config.getProjectConfig('testWithSchema');
    t.deepEqual(testWithSchemaConfig.projectName, 'testWithSchema');
});
ava_1.default('returns config for file', function (t) {
    var testWithSchemaConfig = config.getConfigForFile(path_1.resolve('./config/schema-a.graphql'));
    if (testWithSchemaConfig) {
        t.deepEqual(testWithSchemaConfig.projectName, 'testWithSchema');
    }
    else {
        t.fail();
    }
});
ava_1.default('returns a correct root dir', function (t) {
    t.deepEqual(config.configDir, CONFIG_DIR);
});
ava_1.default('returns a correct schema path', function (t) {
    t.deepEqual(config.getProjectConfig('testWithSchema').schemaPath, path_1.join(CONFIG_DIR, '__schema__/StarWarsSchema.graphql'));
    t.deepEqual(config.getProjectConfig('testWithoutSchema').schemaPath, null);
});
ava_1.default('reads single schema', function (t) {
    var typeDefs = "type Query {\n  hello: String!\n}\n";
    t.is(graphql_1.printSchema(config.getProjectConfig('testSchemaA').getSchema()), typeDefs);
});
ava_1.default('reads imported schema', function (t) {
    var typeDefs = "type Query {\n  hello: String!\n  user: User!\n}\n\ntype User {\n  name: String\n}\n";
    t.is(graphql_1.printSchema(config.getProjectConfig('testSchemaB').getSchema()), typeDefs);
});
