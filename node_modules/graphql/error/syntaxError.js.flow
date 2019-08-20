// @flow strict

import { type Source } from '../language/source';
import { GraphQLError } from './GraphQLError';

/**
 * Produces a GraphQLError representing a syntax error, containing useful
 * descriptive information about the syntax error's position in the source.
 */
export function syntaxError(
  source: Source,
  position: number,
  description: string,
): GraphQLError {
  return new GraphQLError(`Syntax Error: ${description}`, undefined, source, [
    position,
  ]);
}
