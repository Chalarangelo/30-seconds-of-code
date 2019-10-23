/**
 * Combines the given queries, creating a usable GraphQL query string.
 */
const parseQueries = (...queries) =>
  `query {
    ${queries.join('\n\n')}
  }`;

export default parseQueries;
