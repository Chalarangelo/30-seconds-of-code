// @flow strict

import inspect from '../../jsutils/inspect';
import { type ValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { type ASTVisitor } from '../../language/visitor';
import { doTypesOverlap } from '../../utilities/typeComparators';
import { typeFromAST } from '../../utilities/typeFromAST';
import { isCompositeType } from '../../type/definition';

export function typeIncompatibleSpreadMessage(
  fragName: string,
  parentType: string,
  fragType: string,
): string {
  return `Fragment "${fragName}" cannot be spread here as objects of type "${parentType}" can never be of type "${fragType}".`;
}

export function typeIncompatibleAnonSpreadMessage(
  parentType: string,
  fragType: string,
): string {
  return `Fragment cannot be spread here as objects of type "${parentType}" can never be of type "${fragType}".`;
}

/**
 * Possible fragment spread
 *
 * A fragment spread is only valid if the type condition could ever possibly
 * be true: if there is a non-empty intersection of the possible parent types,
 * and possible types which pass the type condition.
 */
export function PossibleFragmentSpreads(
  context: ValidationContext,
): ASTVisitor {
  return {
    InlineFragment(node) {
      const fragType = context.getType();
      const parentType = context.getParentType();
      if (
        isCompositeType(fragType) &&
        isCompositeType(parentType) &&
        !doTypesOverlap(context.getSchema(), fragType, parentType)
      ) {
        context.reportError(
          new GraphQLError(
            typeIncompatibleAnonSpreadMessage(
              inspect(parentType),
              inspect(fragType),
            ),
            node,
          ),
        );
      }
    },
    FragmentSpread(node) {
      const fragName = node.name.value;
      const fragType = getFragmentType(context, fragName);
      const parentType = context.getParentType();
      if (
        fragType &&
        parentType &&
        !doTypesOverlap(context.getSchema(), fragType, parentType)
      ) {
        context.reportError(
          new GraphQLError(
            typeIncompatibleSpreadMessage(
              fragName,
              inspect(parentType),
              inspect(fragType),
            ),
            node,
          ),
        );
      }
    },
  };
}

function getFragmentType(context, name) {
  const frag = context.getFragment(name);
  if (frag) {
    const type = typeFromAST(context.getSchema(), frag.typeCondition);
    if (isCompositeType(type)) {
      return type;
    }
  }
}
