import { GraphQLType, GraphQLInputType, GraphQLObjectType } from '../graphql';
import { InputTypeComposer } from '../InputTypeComposer';
import { ObjectTypeComposer } from '../ObjectTypeComposer';
import { InterfaceTypeComposer } from '../InterfaceTypeComposer';
import { SchemaComposer } from '../SchemaComposer';

export interface ToInputObjectTypeOpts {
  prefix?: string;
  postfix?: string;
}

export function toInputObjectType<TContext>(
  tc: ObjectTypeComposer<any, TContext> | InterfaceTypeComposer<any, TContext>,
  opts?: ToInputObjectTypeOpts
): InputTypeComposer<TContext>;

export interface ConvertInputObjectFieldOpts {
  prefix?: string;
  postfix?: string;
  fieldName?: string;
  outputTypeName?: string;
}

export function convertInputObjectField(
  field: GraphQLType,
  opts: ConvertInputObjectFieldOpts,
  schemaComposer: SchemaComposer<any>
): GraphQLInputType | null;
