// @flow strict

import invariant from '../jsutils/invariant';
import { type GraphQLError } from './GraphQLError';
import { type SourceLocation } from '../language/location';

/**
 * Given a GraphQLError, format it according to the rules described by the
 * Response Format, Errors section of the GraphQL Specification.
 */
export function formatError(error: GraphQLError): GraphQLFormattedError {
  invariant(error, 'Received null or undefined error.');
  const message = error.message || 'An unknown error occurred.';
  const locations = error.locations;
  const path = error.path;
  const extensions = error.extensions;

  return extensions
    ? { message, locations, path, extensions }
    : { message, locations, path };
}

export type GraphQLFormattedError = {|
  +message: string,
  +locations: $ReadOnlyArray<SourceLocation> | void,
  +path: $ReadOnlyArray<string | number> | void,
  +extensions?: { [key: string]: mixed, ... },
|};
