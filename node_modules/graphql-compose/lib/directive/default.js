"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graphql = require("../graphql");

var _json = _interopRequireDefault(require("../type/json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = new _graphql.GraphQLDirective({
  name: 'default',
  description: 'Provides default value for input field.',
  locations: [_graphql.DirectiveLocation.INPUT_FIELD_DEFINITION],
  args: {
    value: {
      type: new _graphql.GraphQLNonNull(_json.default)
    }
  }
});

exports.default = _default;