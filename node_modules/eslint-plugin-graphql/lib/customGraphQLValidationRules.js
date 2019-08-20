"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperationsMustHaveNames = OperationsMustHaveNames;
exports.RequiredFields = RequiredFields;
exports.typeNamesShouldBeCapitalized = typeNamesShouldBeCapitalized;
exports.noDeprecatedFields = noDeprecatedFields;

var _graphql = require("graphql");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function OperationsMustHaveNames(context) {
  return {
    OperationDefinition: function OperationDefinition(node) {
      if (!node.name) {
        context.reportError(new _graphql.GraphQLError("All operations must be named", [node]));
      }
    }
  };
}

function getFieldWasRequestedOnNode(node, field) {
  return node.selectionSet.selections.some(function (n) {
    return n.kind === "Field" && n.name.value === field;
  });
}

function fieldAvailableOnType(type, field) {
  return type && type._fields && type._fields[field] || type.ofType && fieldAvailableOnType(type.ofType, field);
}

function RequiredFields(context, options) {
  var requiredFields = options.requiredFields;


  return {
    FragmentDefinition: function FragmentDefinition(node) {
      requiredFields.forEach(function (field) {
        var type = context.getType();

        if (fieldAvailableOnType(type, field)) {
          var fieldWasRequested = getFieldWasRequestedOnNode(node, field);
          if (!fieldWasRequested) {
            context.reportError(new _graphql.GraphQLError("'" + field + "' field required on 'fragment " + node.name.value + " on " + node.typeCondition.name.value + "'", [node]));
          }
        }
      });
    },


    // Every inline fragment must have the required field specified inside
    // itself or in some parent selection set.
    InlineFragment: function InlineFragment(node, key, parent, path, ancestors) {
      requiredFields.forEach(function (field) {
        var type = context.getType();

        if (fieldAvailableOnType(type, field)) {
          // First, check the selection set on this inline fragment
          if (node.selectionSet && getFieldWasRequestedOnNode(node, field)) {
            return true;
          }

          var ancestorClone = [].concat(_toConsumableArray(ancestors));

          var nearestField = void 0;
          var nextAncestor = void 0;

          // Now, walk up the ancestors, until you see a field.
          while (!nearestField) {
            nextAncestor = ancestorClone.pop();

            if (nextAncestor.selectionSet && getFieldWasRequestedOnNode(nextAncestor, field)) {
              return true;
            }

            if (nextAncestor.kind === "Field") {
              nearestField = nextAncestor;
            }
          }

          // If we never found a field, the query is malformed
          if (!nearestField) {
            throw new Error("Inline fragment found inside document without a parent field.");
          }

          // We found a field, but we never saw the field we were looking for in
          // the intermediate selection sets.
          context.reportError(new _graphql.GraphQLError("'" + field + "' field required on '... on " + node.typeCondition.name.value + "'", [node]));
        }
      });
    },


    // Every field that can have the field directly on it, should. It's not
    // enough to have some child fragment to include the field, since we don't
    // know if that fragment covers all of the possible type options.
    Field: function Field(node) {
      var def = context.getFieldDef();
      if (!def) {
        return;
      }

      requiredFields.forEach(function (field) {
        if (fieldAvailableOnType(def.type, field)) {
          var fieldWasRequested = getFieldWasRequestedOnNode(node, field);
          if (!fieldWasRequested) {
            context.reportError(new _graphql.GraphQLError("'" + field + "' field required on '" + node.name.value + "'", [node]));
          }
        }
      });
    }
  };
}

function typeNamesShouldBeCapitalized(context) {
  return {
    NamedType: function NamedType(node) {
      var typeName = node.name.value;
      if (typeName[0] == typeName[0].toLowerCase()) {
        context.reportError(new _graphql.GraphQLError("All type names should start with a capital letter", [node]));
      }
    }
  };
}

// Mostly taken from https://github.com/graphql/graphql-js/blob/063148de039b02670a760b8d3dfaf2a04a467169/src/utilities/findDeprecatedUsages.js
// See explanation in [#93](https://github.com/apollographql/eslint-plugin-graphql/pull/93)
function noDeprecatedFields(context) {
  return {
    Field: function Field(node) {
      var fieldDef = context.getFieldDef();
      if (fieldDef && fieldDef.isDeprecated) {
        var parentType = context.getParentType();
        if (parentType) {
          var reason = fieldDef.deprecationReason;
          context.reportError(new _graphql.GraphQLError("The field " + parentType.name + "." + fieldDef.name + " is deprecated." + (reason ? " " + reason : ""), [node]));
        }
      }
    },
    EnumValue: function EnumValue(node) {
      // context is of type ValidationContext which doesn't export getEnumValue.
      // Bypass the public API to grab that information directly from _typeInfo.
      var enumVal = context._typeInfo.getEnumValue();
      if (enumVal && enumVal.isDeprecated) {
        var type = (0, _graphql.getNamedType)(context.getInputType());
        if (!type) {
          return;
        }

        var reason = enumVal.deprecationReason;
        context.reportError(new _graphql.GraphQLError("The enum value " + type.name + "." + enumVal.name + " is deprecated." + (reason ? " " + reason : ""), [node]));
      }
    }
  };
}