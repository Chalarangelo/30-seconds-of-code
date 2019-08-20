// @flow strict

import { visit } from '../language/visitor';
import { type ObjMap } from '../jsutils/ObjMap';
import {
  type DocumentNode,
  type OperationDefinitionNode,
} from '../language/ast';

/**
 * separateOperations accepts a single AST document which may contain many
 * operations and fragments and returns a collection of AST documents each of
 * which contains a single operation as well the fragment definitions it
 * refers to.
 */
export function separateOperations(
  documentAST: DocumentNode,
): ObjMap<DocumentNode> {
  const operations = [];
  const fragments = Object.create(null);
  const positions = new Map();
  const depGraph: DepGraph = Object.create(null);
  let fromName;
  let idx = 0;

  // Populate metadata and build a dependency graph.
  visit(documentAST, {
    OperationDefinition(node) {
      fromName = opName(node);
      operations.push(node);
      positions.set(node, idx++);
    },
    FragmentDefinition(node) {
      fromName = node.name.value;
      fragments[fromName] = node;
      positions.set(node, idx++);
    },
    FragmentSpread(node) {
      const toName = node.name.value;
      (depGraph[fromName] || (depGraph[fromName] = Object.create(null)))[
        toName
      ] = true;
    },
  });

  // For each operation, produce a new synthesized AST which includes only what
  // is necessary for completing that operation.
  const separatedDocumentASTs = Object.create(null);
  for (const operation of operations) {
    const operationName = opName(operation);
    const dependencies = Object.create(null);
    collectTransitiveDependencies(dependencies, depGraph, operationName);

    // The list of definition nodes to be included for this operation, sorted
    // to retain the same order as the original document.
    const definitions = [operation];
    for (const name of Object.keys(dependencies)) {
      definitions.push(fragments[name]);
    }
    definitions.sort(
      (n1, n2) => (positions.get(n1) || 0) - (positions.get(n2) || 0),
    );

    separatedDocumentASTs[operationName] = {
      kind: 'Document',
      definitions,
    };
  }

  return separatedDocumentASTs;
}

type DepGraph = ObjMap<ObjMap<boolean>>;

// Provides the empty string for anonymous operations.
function opName(operation: OperationDefinitionNode): string {
  return operation.name ? operation.name.value : '';
}

// From a dependency graph, collects a list of transitive dependencies by
// recursing through a dependency graph.
function collectTransitiveDependencies(
  collected: ObjMap<boolean>,
  depGraph: DepGraph,
  fromName: string,
): void {
  const immediateDeps = depGraph[fromName];
  if (immediateDeps) {
    for (const toName of Object.keys(immediateDeps)) {
      if (!collected[toName]) {
        collected[toName] = true;
        collectTransitiveDependencies(collected, depGraph, toName);
      }
    }
  }
}
