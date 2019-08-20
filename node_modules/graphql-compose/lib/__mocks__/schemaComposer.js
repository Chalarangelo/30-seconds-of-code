"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphql = require("../graphql");

var _ = require("..");

_.schemaComposer.getOrCreateOTC('User', tc => tc.addFields({
  name: {
    type: _graphql.GraphQLString
  },
  nickname: {
    type: _graphql.GraphQLString
  },
  age: {
    type: _graphql.GraphQLInt
  }
}));

var _default = _.schemaComposer;
exports.default = _default;