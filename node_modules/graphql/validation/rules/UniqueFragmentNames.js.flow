// @flow strict

import { type ASTValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { type ASTVisitor } from '../../language/visitor';

export function duplicateFragmentNameMessage(fragName: string): string {
  return `There can be only one fragment named "${fragName}".`;
}

/**
 * Unique fragment names
 *
 * A GraphQL document is only valid if all defined fragments have unique names.
 */
export function UniqueFragmentNames(context: ASTValidationContext): ASTVisitor {
  const knownFragmentNames = Object.create(null);
  return {
    OperationDefinition: () => false,
    FragmentDefinition(node) {
      const fragmentName = node.name.value;
      if (knownFragmentNames[fragmentName]) {
        context.reportError(
          new GraphQLError(duplicateFragmentNameMessage(fragmentName), [
            knownFragmentNames[fragmentName],
            node.name,
          ]),
        );
      } else {
        knownFragmentNames[fragmentName] = node.name;
      }
      return false;
    },
  };
}
