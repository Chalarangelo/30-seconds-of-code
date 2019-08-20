/* @flow strict */
/* eslint-disable global-require */

export function getGraphqlVersion(): number {
  const graphql: any = require('../graphql');
  if (graphql.getOperationRootType) {
    return 14.0;
  } else if (graphql.lexicographicSortSchema) {
    return 13.0;
  } else if (graphql.lexographicSortSchema) {
    // 0.13-rc.1
    return 13.0;
  }
  return 11.0;
}

export const graphqlVersion = getGraphqlVersion();
