// @flow strict

import { type ValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { print } from '../../language/printer';
import { type ASTVisitor } from '../../language/visitor';
import { isCompositeType } from '../../type/definition';
import { typeFromAST } from '../../utilities/typeFromAST';

export function inlineFragmentOnNonCompositeErrorMessage(type: string): string {
  return `Fragment cannot condition on non composite type "${type}".`;
}

export function fragmentOnNonCompositeErrorMessage(
  fragName: string,
  type: string,
): string {
  return `Fragment "${fragName}" cannot condition on non composite type "${type}".`;
}

/**
 * Fragments on composite type
 *
 * Fragments use a type condition to determine if they apply, since fragments
 * can only be spread into a composite type (object, interface, or union), the
 * type condition must also be a composite type.
 */
export function FragmentsOnCompositeTypes(
  context: ValidationContext,
): ASTVisitor {
  return {
    InlineFragment(node) {
      const typeCondition = node.typeCondition;
      if (typeCondition) {
        const type = typeFromAST(context.getSchema(), typeCondition);
        if (type && !isCompositeType(type)) {
          context.reportError(
            new GraphQLError(
              inlineFragmentOnNonCompositeErrorMessage(print(typeCondition)),
              typeCondition,
            ),
          );
        }
      }
    },
    FragmentDefinition(node) {
      const type = typeFromAST(context.getSchema(), node.typeCondition);
      if (type && !isCompositeType(type)) {
        context.reportError(
          new GraphQLError(
            fragmentOnNonCompositeErrorMessage(
              node.name.value,
              print(node.typeCondition),
            ),
            node.typeCondition,
          ),
        );
      }
    },
  };
}
