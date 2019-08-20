/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict-local
 * @format
 */
'use strict';

var GraphQLCompilerContext = require("./GraphQLCompilerContext");

var GraphQLIRTransformer = require("./GraphQLIRTransformer");

var invariant = require("fbjs/lib/invariant");

var _require = require("./GraphQLSchemaUtils"),
    assertTypeWithFields = _require.assertTypeWithFields,
    canHaveSelections = _require.canHaveSelections,
    getRawType = _require.getRawType;

var _require2 = require("graphql"),
    SchemaMetaFieldDef = _require2.SchemaMetaFieldDef,
    TypeMetaFieldDef = _require2.TypeMetaFieldDef,
    TypeNameMetaFieldDef = _require2.TypeNameMetaFieldDef;

/**
 * A transform that removes any selections that are not valid relative to the
 * server schema. The primary use case is for fields added via client
 * `extend type ...` definitions and for inline fragments / fragment spreads
 * whose types are added with client `type ...` type extensions.
 *
 * Given a base schema:
 *
 * ```
 * # Note: full schema definition elided for clarity
 * interface Viewer {
 *   name: String
 * }
 * type User implements Viewer {
 *   name: String
 * }
 * ```
 *
 * And a fragment:
 *
 * ```
 * fragment on Viewer {
 *   name
 *   ... on User {
 *     clientField # (1)
 *   }
 *   ... on ClientType { # (2)
 *     clientField
 *   }
 * }
 * extend type User {
 *   clientField: String
 * }
 * type ClientType implements Viewer {
 *   name: String
 *   clientField: String
 * }
 * ```
 *
 * This transform will output:
 *
 * ```
 * fragment on Viewer {
 *   name
 * }
 * ```
 *
 * Note that (1) is removed because this field does not exist on the base `User`
 * type, and (2) is removed because the `ClientType` type does not exist in the
 * base schema.
 */
function skipClientFieldTransform(context) {
  return GraphQLIRTransformer.transform(context, {
    FragmentSpread: visitFragmentSpread,
    InlineFragment: visitInlineFragment,
    LinkedField: visitField,
    MatchField: visitField,
    ScalarField: visitField
  }, function (node) {
    return buildState(context, node);
  });
}
/**
 * @internal
 *
 * Build the initial state, returning null for fragments whose type is not
 * defined in the server schema.
 */


function buildState(context, node) {
  var schema = context.serverSchema;

  switch (node.kind) {
    case 'Fragment':
      return schema.getType(node.type.name);

    case 'Root':
      switch (node.operation) {
        case 'query':
          return schema.getQueryType();

        case 'mutation':
          return schema.getMutationType();

        case 'subscription':
          return schema.getSubscriptionType();

        default:
          node.operation;
      }

      break;

    case 'SplitOperation':
      return schema.getType(node.type.name);

    default:
      node;
  }

  return null;
}
/**
 * @internal
 *
 * Skip fields that were added via `extend type ...`.
 */


function visitField(field, parentType) {
  if ( // Field is defined in the original parent type definition:
  canHaveSelections(parentType) && assertTypeWithFields(parentType).getFields()[field.name] || // Allow metadata fields and fields defined on classic "fat" interfaces
  field.name === SchemaMetaFieldDef.name || field.name === TypeMetaFieldDef.name || field.name === TypeNameMetaFieldDef.name || field.directives.some(function (_ref) {
    var name = _ref.name;
    return name === 'fixme_fat_interface';
  })) {
    var rawType = getRawType(field.type);
    var type = this.getContext().serverSchema.getType(rawType.name);
    !type ? process.env.NODE_ENV !== "production" ? invariant(false, 'SkipClientFieldTransform: Expected type `%s` to be defined in ' + 'the server schema.', rawType.name) : invariant(false) : void 0;
    return this.traverse(field, type);
  }

  return null;
}
/**
 * @internal
 *
 * Skip fragment spreads where the referenced fragment is not defined in the
 * original schema.
 */


function visitFragmentSpread(spread, parentType) {
  var context = this.getContext();
  var fragment = context.getFragment(spread.name);

  if (context.serverSchema.getType(fragment.type.name)) {
    return this.traverse(spread, parentType);
  }

  return null;
}
/**
 * @internal
 *
 * Skip inline fragments where the type is not in the schema.
 */


function visitInlineFragment(fragment, parentType) {
  var schema = this.getContext().serverSchema;
  var type = schema.getType(fragment.typeCondition.name);

  if (type) {
    return this.traverse(fragment, type);
  }

  return null;
}

module.exports = {
  transform: skipClientFieldTransform
};