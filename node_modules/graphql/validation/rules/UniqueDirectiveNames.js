"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.duplicateDirectiveNameMessage = duplicateDirectiveNameMessage;
exports.existedDirectiveNameMessage = existedDirectiveNameMessage;
exports.UniqueDirectiveNames = UniqueDirectiveNames;

var _GraphQLError = require("../../error/GraphQLError");

function duplicateDirectiveNameMessage(directiveName) {
  return "There can be only one directive named \"".concat(directiveName, "\".");
}

function existedDirectiveNameMessage(directiveName) {
  return "Directive \"".concat(directiveName, "\" already exists in the schema. It cannot be redefined.");
}
/**
 * Unique directive names
 *
 * A GraphQL document is only valid if all defined directives have unique names.
 */


function UniqueDirectiveNames(context) {
  var knownDirectiveNames = Object.create(null);
  var schema = context.getSchema();
  return {
    DirectiveDefinition: function DirectiveDefinition(node) {
      var directiveName = node.name.value;

      if (schema && schema.getDirective(directiveName)) {
        context.reportError(new _GraphQLError.GraphQLError(existedDirectiveNameMessage(directiveName), node.name));
        return;
      }

      if (knownDirectiveNames[directiveName]) {
        context.reportError(new _GraphQLError.GraphQLError(duplicateDirectiveNameMessage(directiveName), [knownDirectiveNames[directiveName], node.name]));
      } else {
        knownDirectiveNames[directiveName] = node.name;
      }

      return false;
    }
  };
}
