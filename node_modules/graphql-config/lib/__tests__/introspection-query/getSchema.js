"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = require("ava");
var graphql_1 = require("graphql");
var _1 = require("../../");
ava_1.default('reads single schema', function (t) {
    var config = _1.getGraphQLConfig(__dirname);
    var typeDefs = "schema {\n  query: RootQueryType\n}\n\ntype Bar {\n  widgets: [Widget]\n}\n\ntype RootQueryType {\n  foo: String\n  bar: Bar\n}\n\ntype Widget {\n  count: Int\n}\n";
    t.is(graphql_1.printSchema(config.getProjectConfig('testSchemaA').getSchema()), typeDefs);
});
