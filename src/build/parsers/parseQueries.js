import glob from 'glob';
import fs from 'fs-extra';
import path from 'path';

/**
 * Combines the given GraphQL queries in the given directory, returning a
 * single query string to be run against the GraphQL schema.
 * @param {string} contentDirPath - The path to the queries directory.
 */
const parseQueries = queryDirPath => {
  // Load queries
  let queries = [];
  glob.sync(`${queryDirPath}/*.graphql`)
    .forEach( file => {
      queries.push(
        fs.readFileSync(path.resolve(`${file}`), 'utf8')
          .replace(/^query\s+{\n/g, '\n')
          .replace(/\n}\n*$/g, '\n')
      );
    });
  return `query {
    ${queries.join('\n')}
  }`;
};

export default parseQueries;
