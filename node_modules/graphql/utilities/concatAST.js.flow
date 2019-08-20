// @flow strict

import flatMap from '../polyfills/flatMap';
import { type DocumentNode } from '../language/ast';

/**
 * Provided a collection of ASTs, presumably each from different files,
 * concatenate the ASTs together into batched AST, useful for validating many
 * GraphQL source files which together represent one conceptual application.
 */
export function concatAST(asts: $ReadOnlyArray<DocumentNode>): DocumentNode {
  return {
    kind: 'Document',
    definitions: flatMap(asts, ast => ast.definitions),
  };
}
