// @flow strict

import { type ASTValidationContext } from '../ValidationContext';
import { GraphQLError } from '../../error/GraphQLError';
import { type FragmentDefinitionNode } from '../../language/ast';
import { type ASTVisitor } from '../../language/visitor';

export function cycleErrorMessage(
  fragName: string,
  spreadNames: $ReadOnlyArray<string>,
): string {
  const via = spreadNames.length ? ' via ' + spreadNames.join(', ') : '';
  return `Cannot spread fragment "${fragName}" within itself${via}.`;
}

export function NoFragmentCycles(context: ASTValidationContext): ASTVisitor {
  // Tracks already visited fragments to maintain O(N) and to ensure that cycles
  // are not redundantly reported.
  const visitedFrags = Object.create(null);

  // Array of AST nodes used to produce meaningful errors
  const spreadPath = [];

  // Position in the spread path
  const spreadPathIndexByName = Object.create(null);

  return {
    OperationDefinition: () => false,
    FragmentDefinition(node) {
      detectCycleRecursive(node);
      return false;
    },
  };

  // This does a straight-forward DFS to find cycles.
  // It does not terminate when a cycle was found but continues to explore
  // the graph to find all possible cycles.
  function detectCycleRecursive(fragment: FragmentDefinitionNode) {
    if (visitedFrags[fragment.name.value]) {
      return;
    }

    const fragmentName = fragment.name.value;
    visitedFrags[fragmentName] = true;

    const spreadNodes = context.getFragmentSpreads(fragment.selectionSet);
    if (spreadNodes.length === 0) {
      return;
    }

    spreadPathIndexByName[fragmentName] = spreadPath.length;

    for (const spreadNode of spreadNodes) {
      const spreadName = spreadNode.name.value;
      const cycleIndex = spreadPathIndexByName[spreadName];

      spreadPath.push(spreadNode);
      if (cycleIndex === undefined) {
        const spreadFragment = context.getFragment(spreadName);
        if (spreadFragment) {
          detectCycleRecursive(spreadFragment);
        }
      } else {
        const cyclePath = spreadPath.slice(cycleIndex);
        const fragmentNames = cyclePath.slice(0, -1).map(s => s.name.value);
        context.reportError(
          new GraphQLError(
            cycleErrorMessage(spreadName, fragmentNames),
            cyclePath,
          ),
        );
      }
      spreadPath.pop();
    }

    spreadPathIndexByName[fragmentName] = undefined;
  }
}
