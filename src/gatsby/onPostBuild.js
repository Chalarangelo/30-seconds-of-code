import fs from 'fs-extra';
import paths from 'settings/paths';

/**
 * Copies XML & JSON files to the public directory.
 */
const onPostBuild = () => {
  fs.copySync(paths.xmlPath, 'public');
  fs.copySync(paths.jsonPath, 'public');
};

export default onPostBuild;
