import fs from 'fs-extra';
import paths from 'config/paths';

/**
 * Copies xml files to the public directory.
 */
const onPostBuild = () => {
  console.log('aacaca');
  fs.copySync(paths.xmlPath, 'public');
};

export default onPostBuild;
