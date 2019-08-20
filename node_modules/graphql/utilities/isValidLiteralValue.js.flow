// @flow strict

import { TypeInfo } from './TypeInfo';
import { type GraphQLError } from '../error/GraphQLError';
import { type ValueNode } from '../language/ast';
import { Kind } from '../language/kinds';
import { visit, visitWithTypeInfo } from '../language/visitor';
import { type GraphQLInputType } from '../type/definition';
import { GraphQLSchema } from '../type/schema';
import { ValuesOfCorrectType } from '../validation/rules/ValuesOfCorrectType';
import { ValidationContext } from '../validation/ValidationContext';

/**
 * Utility which determines if a value literal node is valid for an input type.
 *
 * Deprecated. Rely on validation for documents containing literal values.
 *
 * This function will be removed in v15
 */
export function isValidLiteralValue(
  type: GraphQLInputType,
  valueNode: ValueNode,
): $ReadOnlyArray<GraphQLError> {
  const emptySchema = new GraphQLSchema({});
  const emptyDoc = { kind: Kind.DOCUMENT, definitions: [] };
  const typeInfo = new TypeInfo(emptySchema, undefined, type);
  const context = new ValidationContext(emptySchema, emptyDoc, typeInfo);
  const visitor = ValuesOfCorrectType(context);
  visit(valueNode, visitWithTypeInfo(typeInfo, visitor));
  return context.getErrors();
}
