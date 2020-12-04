import fs from 'fs-extra';
import paths from 'settings/paths';

/**
 * Copies xml files to the public directory.
 */
const onPostBuild = () => {
  fs.copySync(paths.xmlPath, 'public');
};

export default onPostBuild;
