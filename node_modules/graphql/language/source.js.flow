// @flow strict

import invariant from '../jsutils/invariant';
import defineToStringTag from '../jsutils/defineToStringTag';

type Location = {|
  line: number,
  column: number,
|};

/**
 * A representation of source input to GraphQL.
 * `name` and `locationOffset` are optional. They are useful for clients who
 * store GraphQL documents in source files; for example, if the GraphQL input
 * starts at line 40 in a file named Foo.graphql, it might be useful for name to
 * be "Foo.graphql" and location to be `{ line: 40, column: 0 }`.
 * line and column in locationOffset are 1-indexed
 */
export class Source {
  body: string;
  name: string;
  locationOffset: Location;

  constructor(body: string, name?: string, locationOffset?: Location): void {
    this.body = body;
    this.name = name || 'GraphQL request';
    this.locationOffset = locationOffset || { line: 1, column: 1 };
    invariant(
      this.locationOffset.line > 0,
      'line in locationOffset is 1-indexed and must be positive',
    );
    invariant(
      this.locationOffset.column > 0,
      'column in locationOffset is 1-indexed and must be positive',
    );
  }
}

// Conditionally apply `[Symbol.toStringTag]` if `Symbol`s are supported
defineToStringTag(Source);
