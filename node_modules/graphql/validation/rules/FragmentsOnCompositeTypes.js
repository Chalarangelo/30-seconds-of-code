"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inlineFragmentOnNonCompositeErrorMessage = inlineFragmentOnNonCompositeErrorMessage;
exports.fragmentOnNonCompositeErrorMessage = fragmentOnNonCompositeErrorMessage;
exports.FragmentsOnCompositeTypes = FragmentsOnCompositeTypes;

var _GraphQLError = require("../../error/GraphQLError");

var _printer = require("../../language/printer");

var _definition = require("../../type/definition");

var _typeFromAST = require("../../utilities/typeFromAST");

function inlineFragmentOnNonCompositeErrorMessage(type) {
  return "Fragment cannot condition on non composite type \"".concat(type, "\".");
}

function fragmentOnNonCompositeErrorMessage(fragName, type) {
  return "Fragment \"".concat(fragName, "\" cannot condition on non composite type \"").concat(type, "\".");
}
/**
 * Fragments on composite type
 *
 * Fragments use a type condition to determine if they apply, since fragments
 * can only be spread into a composite type (object, interface, or union), the
 * type condition must also be a composite type.
 */


function FragmentsOnCompositeTypes(context) {
  return {
    InlineFragment: function InlineFragment(node) {
      var typeCondition = node.typeCondition;

      if (typeCondition) {
        var type = (0, _typeFromAST.typeFromAST)(context.getSchema(), typeCondition);

        if (type && !(0, _definition.isCompositeType)(type)) {
          context.reportError(new _GraphQLError.GraphQLError(inlineFragmentOnNonCompositeErrorMessage((0, _printer.print)(typeCondition)), typeCondition));
        }
      }
    },
    FragmentDefinition: function FragmentDefinition(node) {
      var type = (0, _typeFromAST.typeFromAST)(context.getSchema(), node.typeCondition);

      if (type && !(0, _definition.isCompositeType)(type)) {
        context.reportError(new _GraphQLError.GraphQLError(fragmentOnNonCompositeErrorMessage(node.name.value, (0, _printer.print)(node.typeCondition)), node.typeCondition));
      }
    }
  };
}
