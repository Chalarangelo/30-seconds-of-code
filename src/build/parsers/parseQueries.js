/**
 * Combines the given queries, creating a usable GraphQL query string.
 */
const parseQueries = (...queries) => {
  return `query {
    ${queries.join('\n\n')}
  }`;
};

export default parseQueries;
