/* eslint-disable no-new */
const paths = require('config/paths');
import coeus from 'coeus';
const processArgs = process.argv.slice(2);

/**
 * Run coeus with the supplied combined configuration.
 */
coeus({
  args: processArgs,
  paths,
});
