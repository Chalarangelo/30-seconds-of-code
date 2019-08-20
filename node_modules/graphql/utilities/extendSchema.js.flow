// @flow strict

import flatMap from '../polyfills/flatMap';
import objectValues from '../polyfills/objectValues';
import inspect from '../jsutils/inspect';
import invariant from '../jsutils/invariant';
import mapValue from '../jsutils/mapValue';
import keyValMap from '../jsutils/keyValMap';
import { ASTDefinitionBuilder } from './buildASTSchema';
import { assertValidSDLExtension } from '../validation/validate';
import {
  type GraphQLSchemaValidationOptions,
  assertSchema,
  GraphQLSchema,
} from '../type/schema';
import { isIntrospectionType } from '../type/introspection';
import { isSpecifiedScalarType } from '../type/scalars';

import {
  type GraphQLNamedType,
  isScalarType,
  isObjectType,
  isInterfaceType,
  isUnionType,
  isListType,
  isNonNullType,
  isEnumType,
  isInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLUnionType,
  GraphQLEnumType,
  GraphQLInputObjectType,
} from '../type/definition';

import { GraphQLDirective } from '../type/directives';

import { Kind } from '../language/kinds';

import {
  type DocumentNode,
  type DirectiveDefinitionNode,
  type SchemaExtensionNode,
  type SchemaDefinitionNode,
} from '../language/ast';
import {
  isTypeDefinitionNode,
  isTypeExtensionNode,
} from '../language/predicates';

type Options = {|
  ...GraphQLSchemaValidationOptions,

  /**
   * Descriptions are defined as preceding string literals, however an older
   * experimental version of the SDL supported preceding comments as
   * descriptions. Set to true to enable this deprecated behavior.
   * This option is provided to ease adoption and will be removed in v16.
   *
   * Default: false
   */
  commentDescriptions?: boolean,

  /**
   * Set to true to assume the SDL is valid.
   *
   * Default: false
   */
  assumeValidSDL?: boolean,
|};

/**
 * Produces a new schema given an existing schema and a document which may
 * contain GraphQL type extensions and definitions. The original schema will
 * remain unaltered.
 *
 * Because a schema represents a graph of references, a schema cannot be
 * extended without effectively making an entire copy. We do not know until it's
 * too late if subgraphs remain unchanged.
 *
 * This algorithm copies the provided schema, applying extensions while
 * producing the copy. The original schema remains unaltered.
 *
 * Accepts options as a third argument:
 *
 *    - commentDescriptions:
 *        Provide true to use preceding comments as the description.
 *
 */
export function extendSchema(
  schema: GraphQLSchema,
  documentAST: DocumentNode,
  options?: Options,
): GraphQLSchema {
  assertSchema(schema);

  invariant(
    documentAST && documentAST.kind === Kind.DOCUMENT,
    'Must provide valid Document AST',
  );

  if (!options || !(options.assumeValid || options.assumeValidSDL)) {
    assertValidSDLExtension(documentAST, schema);
  }

  // Collect the type definitions and extensions found in the document.
  const typeDefs = [];
  const typeExtsMap = Object.create(null);

  // New directives and types are separate because a directives and types can
  // have the same name. For example, a type named "skip".
  const directiveDefs: Array<DirectiveDefinitionNode> = [];

  let schemaDef: ?SchemaDefinitionNode;
  // Schema extensions are collected which may add additional operation types.
  const schemaExts: Array<SchemaExtensionNode> = [];

  for (const def of documentAST.definitions) {
    if (def.kind === Kind.SCHEMA_DEFINITION) {
      schemaDef = def;
    } else if (def.kind === Kind.SCHEMA_EXTENSION) {
      schemaExts.push(def);
    } else if (isTypeDefinitionNode(def)) {
      typeDefs.push(def);
    } else if (isTypeExtensionNode(def)) {
      const extendedTypeName = def.name.value;
      const existingTypeExts = typeExtsMap[extendedTypeName];
      typeExtsMap[extendedTypeName] = existingTypeExts
        ? existingTypeExts.concat([def])
        : [def];
    } else if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      directiveDefs.push(def);
    }
  }

  // If this document contains no new types, extensions, or directives then
  // return the same unmodified GraphQLSchema instance.
  if (
    Object.keys(typeExtsMap).length === 0 &&
    typeDefs.length === 0 &&
    directiveDefs.length === 0 &&
    schemaExts.length === 0 &&
    !schemaDef
  ) {
    return schema;
  }

  const schemaConfig = schema.toConfig();
  const astBuilder = new ASTDefinitionBuilder(options, typeName => {
    const type = typeMap[typeName];
    invariant(type, `Unknown type: "${typeName}".`);
    return type;
  });

  const typeMap = keyValMap(
    typeDefs,
    node => node.name.value,
    node => astBuilder.buildType(node),
  );
  for (const existingType of schemaConfig.types) {
    typeMap[existingType.name] = extendNamedType(existingType);
  }

  // Get the extended root operation types.
  const operationTypes = {
    query: schemaConfig.query && schemaConfig.query.name,
    mutation: schemaConfig.mutation && schemaConfig.mutation.name,
    subscription: schemaConfig.subscription && schemaConfig.subscription.name,
  };

  if (schemaDef) {
    for (const { operation, type } of schemaDef.operationTypes) {
      operationTypes[operation] = type.name.value;
    }
  }

  // Then, incorporate schema definition and all schema extensions.
  for (const schemaExt of schemaExts) {
    if (schemaExt.operationTypes) {
      for (const { operation, type } of schemaExt.operationTypes) {
        operationTypes[operation] = type.name.value;
      }
    }
  }

  // Support both original legacy names and extended legacy names.
  const allowedLegacyNames = schemaConfig.allowedLegacyNames.concat(
    (options && options.allowedLegacyNames) || [],
  );

  // Then produce and return a Schema with these types.
  return new GraphQLSchema({
    // Note: While this could make early assertions to get the correctly
    // typed values, that would throw immediately while type system
    // validation with validateSchema() will produce more actionable results.
    query: (getMaybeTypeByName(operationTypes.query): any),
    mutation: (getMaybeTypeByName(operationTypes.mutation): any),
    subscription: (getMaybeTypeByName(operationTypes.subscription): any),

    types: objectValues(typeMap),
    directives: getMergedDirectives(),
    astNode: schemaDef || schemaConfig.astNode,
    extensionASTNodes: schemaConfig.extensionASTNodes.concat(schemaExts),
    allowedLegacyNames,
  });

  // Below are functions used for producing this schema that have closed over
  // this scope and have access to the schema, cache, and newly defined types.

  function replaceType(type) {
    if (isListType(type)) {
      return new GraphQLList(replaceType(type.ofType));
    } else if (isNonNullType(type)) {
      return new GraphQLNonNull(replaceType(type.ofType));
    }
    return replaceNamedType(type);
  }

  function replaceNamedType<T: GraphQLNamedType>(type: T): T {
    return ((typeMap[type.name]: any): T);
  }

  function getMaybeTypeByName(typeName: ?string): ?GraphQLNamedType {
    return typeName ? typeMap[typeName] : null;
  }

  function getMergedDirectives(): Array<GraphQLDirective> {
    const existingDirectives = schema.getDirectives().map(extendDirective);
    invariant(existingDirectives, 'schema must have default directives');

    return existingDirectives.concat(
      directiveDefs.map(node => astBuilder.buildDirective(node)),
    );
  }

  function extendNamedType(type: GraphQLNamedType): GraphQLNamedType {
    if (isIntrospectionType(type) || isSpecifiedScalarType(type)) {
      // Builtin types are not extended.
      return type;
    } else if (isScalarType(type)) {
      return extendScalarType(type);
    } else if (isObjectType(type)) {
      return extendObjectType(type);
    } else if (isInterfaceType(type)) {
      return extendInterfaceType(type);
    } else if (isUnionType(type)) {
      return extendUnionType(type);
    } else if (isEnumType(type)) {
      return extendEnumType(type);
    } else if (isInputObjectType(type)) {
      return extendInputObjectType(type);
    }

    // Not reachable. All possible types have been considered.
    /* istanbul ignore next */
    throw new Error(`Unexpected type: "${inspect((type: empty))}".`);
  }

  function extendDirective(directive: GraphQLDirective): GraphQLDirective {
    const config = directive.toConfig();

    return new GraphQLDirective({
      ...config,
      args: mapValue(config.args, extendArg),
    });
  }

  function extendInputObjectType(
    type: GraphQLInputObjectType,
  ): GraphQLInputObjectType {
    const config = type.toConfig();
    const extensions = typeExtsMap[config.name] || [];
    const fieldNodes = flatMap(extensions, node => node.fields || []);

    return new GraphQLInputObjectType({
      ...config,
      fields: () => ({
        ...mapValue(config.fields, field => ({
          ...field,
          type: replaceType(field.type),
        })),
        ...keyValMap(
          fieldNodes,
          field => field.name.value,
          field => astBuilder.buildInputField(field),
        ),
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendEnumType(type: GraphQLEnumType): GraphQLEnumType {
    const config = type.toConfig();
    const extensions = typeExtsMap[type.name] || [];
    const valueNodes = flatMap(extensions, node => node.values || []);

    return new GraphQLEnumType({
      ...config,
      values: {
        ...config.values,
        ...keyValMap(
          valueNodes,
          value => value.name.value,
          value => astBuilder.buildEnumValue(value),
        ),
      },
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendScalarType(type: GraphQLScalarType): GraphQLScalarType {
    const config = type.toConfig();
    const extensions = typeExtsMap[config.name] || [];

    return new GraphQLScalarType({
      ...config,
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendObjectType(type: GraphQLObjectType): GraphQLObjectType {
    const config = type.toConfig();
    const extensions = typeExtsMap[config.name] || [];
    const interfaceNodes = flatMap(extensions, node => node.interfaces || []);
    const fieldNodes = flatMap(extensions, node => node.fields || []);

    return new GraphQLObjectType({
      ...config,
      interfaces: () => [
        ...type.getInterfaces().map(replaceNamedType),
        // Note: While this could make early assertions to get the correctly
        // typed values, that would throw immediately while type system
        // validation with validateSchema() will produce more actionable results.
        ...interfaceNodes.map(node => (astBuilder.getNamedType(node): any)),
      ],
      fields: () => ({
        ...mapValue(config.fields, extendField),
        ...keyValMap(
          fieldNodes,
          node => node.name.value,
          node => astBuilder.buildField(node),
        ),
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendInterfaceType(
    type: GraphQLInterfaceType,
  ): GraphQLInterfaceType {
    const config = type.toConfig();
    const extensions = typeExtsMap[config.name] || [];
    const fieldNodes = flatMap(extensions, node => node.fields || []);

    return new GraphQLInterfaceType({
      ...config,
      fields: () => ({
        ...mapValue(config.fields, extendField),
        ...keyValMap(
          fieldNodes,
          node => node.name.value,
          node => astBuilder.buildField(node),
        ),
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendUnionType(type: GraphQLUnionType): GraphQLUnionType {
    const config = type.toConfig();
    const extensions = typeExtsMap[config.name] || [];
    const typeNodes = flatMap(extensions, node => node.types || []);

    return new GraphQLUnionType({
      ...config,
      types: () => [
        ...type.getTypes().map(replaceNamedType),
        // Note: While this could make early assertions to get the correctly
        // typed values, that would throw immediately while type system
        // validation with validateSchema() will produce more actionable results.
        ...typeNodes.map(node => (astBuilder.getNamedType(node): any)),
      ],
      extensionASTNodes: config.extensionASTNodes.concat(extensions),
    });
  }

  function extendField(field) {
    return {
      ...field,
      type: replaceType(field.type),
      args: mapValue(field.args, extendArg),
    };
  }

  function extendArg(arg) {
    return {
      ...arg,
      type: replaceType(arg.type),
    };
  }
}
