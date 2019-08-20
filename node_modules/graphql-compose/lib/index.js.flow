/* @flow strict */

import * as graphql from './graphql';
import { SchemaComposer } from './SchemaComposer';

export { graphql };

type TContext = any;

const schemaComposer = new SchemaComposer<TContext>();
const sc = schemaComposer;
export {
  SchemaComposer, // SchemaComposer class
  schemaComposer, // SchemaComposer default global instance
  sc, // SchemaComposer default global instance (alias for schemaComposer)
};

export { ObjectTypeComposer, isComposeOutputType } from './ObjectTypeComposer';
export { InputTypeComposer, isComposeInputType } from './InputTypeComposer';
export { EnumTypeComposer } from './EnumTypeComposer';
export { ScalarTypeComposer } from './ScalarTypeComposer';
export { InterfaceTypeComposer } from './InterfaceTypeComposer';
export { UnionTypeComposer } from './UnionTypeComposer';
export { Resolver } from './Resolver';

export { TypeStorage } from './TypeStorage';
export { TypeMapper } from './TypeMapper';

// Scalar types
export { GraphQLDate, GraphQLBuffer, GraphQLGeneric, GraphQLJSON } from './type';

// Utils
export { getProjectionFromAST, getFlatProjectionFromAST } from './utils/projection';
export { toInputObjectType, convertInputObjectField } from './utils/toInputObjectType';
export * from './utils/misc';
export * from './utils/is';
export * from './utils/graphqlVersion';
export { default as toDottedObject } from './utils/toDottedObject';
export { default as deepmerge } from './utils/deepmerge';
export { filterByDotPaths } from './utils/filterByDotPaths';
export { pluralize } from './utils/pluralize';

export type {
  GetRecordIdFn,
  GraphQLObjectTypeExtended,
  ComposeObjectTypeConfig,
  ComposeOutputType,
  ComposeFieldConfig,
  ComposeFieldConfigAsObject,
  ComposeFieldConfigMap,
  ComposeArgumentType,
  ComposeArgumentConfig,
  ComposeArgumentConfigAsObject,
  ComposeFieldConfigArgumentMap,
  RelationThunkMap,
  RelationOpts,
  RelationOptsWithResolver,
  RelationOptsWithFieldConfig,
  ArgsMap,
  RelationArgsMapperFn,
  RelationArgsMapper,
  ObjectTypeComposeDefinition,
} from './ObjectTypeComposer';

export type {
  ComposeInputType,
  ComposeInputFieldConfig,
  ComposeInputFieldConfigAsObject,
  ComposeInputFieldConfigMap,
  ComposeInputObjectTypeConfig,
  InputTypeComposeDefinition,
} from './InputTypeComposer';

export type { ComposeScalarTypeConfig, ScalarTypeComposeDefinition } from './ScalarTypeComposer';
export type { ComposeEnumTypeConfig, EnumTypeComposeDefinition } from './EnumTypeComposer';
export type { ComposeUnionTypeConfig, UnionTypeComposeDefinition } from './UnionTypeComposer';
export type {
  ComposeInterfaceTypeConfig,
  InterfaceTypeComposeDefinition,
} from './InterfaceTypeComposer';

export type {
  ResolveParams,
  ResolverKinds,
  ResolverFilterArgFn,
  ResolverFilterArgConfig,
  ResolverSortArgFn,
  ResolverSortArgConfig,
  ResolverOpts,
  ResolverWrapCb,
  ResolverRpCb,
  ResolverNextRpCb,
  ResolverWrapArgsCb,
  ResolverWrapTypeCb,
  ResolveDebugOpts,
} from './Resolver';

export type { ProjectionType, ProjectionNode } from './utils/projection';

export type { TypeDefinitionString, TypeWrappedString, TypeNameString } from './TypeMapper';
