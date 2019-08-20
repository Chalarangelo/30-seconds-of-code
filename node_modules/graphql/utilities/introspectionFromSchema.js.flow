// @flow strict

import invariant from '../jsutils/invariant';
import isPromise from '../jsutils/isPromise';
import { type GraphQLSchema } from '../type/schema';
import { execute } from '../execution/execute';
import { parse } from '../language/parser';
import {
  type IntrospectionQuery,
  type IntrospectionOptions,
  getIntrospectionQuery,
} from './introspectionQuery';

/**
 * Build an IntrospectionQuery from a GraphQLSchema
 *
 * IntrospectionQuery is useful for utilities that care about type and field
 * relationships, but do not need to traverse through those relationships.
 *
 * This is the inverse of buildClientSchema. The primary use case is outside
 * of the server context, for instance when doing schema comparisons.
 */
export function introspectionFromSchema(
  schema: GraphQLSchema,
  options?: IntrospectionOptions,
): IntrospectionQuery {
  const queryAST = parse(getIntrospectionQuery(options));
  const result = execute(schema, queryAST);
  invariant(!isPromise(result) && !result.errors && result.data);
  return (result.data: any);
}
