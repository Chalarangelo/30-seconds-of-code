const paths = require('config/paths');
import parseSnippets from 'build/parsers/parseSnippets';

/**
 * Read content configs, generating the snippet data JSON files.
 */
parseSnippets(paths.contentPath);
