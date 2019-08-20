"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserTC = exports.resolver = void 0;

var _ = require("../..");

const resolver = _.schemaComposer.createResolver({
  name: 'findMany',
  kind: 'query',
  type: 'String',
  args: {
    filter: 'JSON',
    limit: 'Int',
    skip: 'Int'
  },
  resolve: () => Promise.resolve(123)
});

exports.resolver = resolver;

const UserTC = _.schemaComposer.createObjectTC(`
  type User {
    id: Int
    name: String
    age: Int
    gender: String
  }
`);

exports.UserTC = UserTC;