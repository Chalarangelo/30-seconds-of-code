/* eslint-disable no-new */
const paths = require('config/paths');
import yild from 'yild';
const processArgs = process.argv.slice(2);

/**
 * Run yild with the supplied combined configuration.
 */
yild({
  args: processArgs,
  paths,
});
