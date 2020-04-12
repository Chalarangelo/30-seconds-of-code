import fs from 'fs-extra';
import path from 'path';

/**
 * Dynamically load the schema from the schema.graphql file.
 * Export it as a string for use in sourceNodes lifecycle hook.
 */
const schema = fs.readFileSync(path.resolve(__dirname, 'schema.graphql'));

export default schema;
