// @flow strict

import { GraphQLError } from '../error/GraphQLError';
import {
  type OperationDefinitionNode,
  type OperationTypeDefinitionNode,
} from '../language/ast';
import { type GraphQLSchema } from '../type/schema';
import { type GraphQLObjectType } from '../type/definition';

/**
 * Extracts the root type of the operation from the schema.
 */
export function getOperationRootType(
  schema: GraphQLSchema,
  operation: OperationDefinitionNode | OperationTypeDefinitionNode,
): GraphQLObjectType {
  if (operation.operation === 'query') {
    const queryType = schema.getQueryType();
    if (!queryType) {
      throw new GraphQLError(
        'Schema does not define the required query root type.',
        operation,
      );
    }
    return queryType;
  }

  if (operation.operation === 'mutation') {
    const mutationType = schema.getMutationType();
    if (!mutationType) {
      throw new GraphQLError(
        'Schema is not configured for mutations.',
        operation,
      );
    }
    return mutationType;
  }

  if (operation.operation === 'subscription') {
    const subscriptionType = schema.getSubscriptionType();
    if (!subscriptionType) {
      throw new GraphQLError(
        'Schema is not configured for subscriptions.',
        operation,
      );
    }
    return subscriptionType;
  }

  throw new GraphQLError(
    'Can only have query, mutation and subscription operations.',
    operation,
  );
}
