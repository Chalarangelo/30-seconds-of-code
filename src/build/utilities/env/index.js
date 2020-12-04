import globalConfig from 'settings/global';
import pathConfig from 'settings/paths';
import { JSONParser } from 'build/parsers/json';

/**
 * Sets up the global environment variables, so that they are available everywhere.
 * Make sure this is the first thing your code runs before executing anything requiring
 * global variables.
 */
export const setupEnv = (env = 'PRODUCTION') => {
  // This is the only function in a sea of classes.
  // It needs to stand out as it's unique and has a special role.
  const settings = JSONParser.fromGlob(pathConfig.settingsPath, {
    withNames: true,
  }).reduce(
    (acc, [fileName, fileData]) => {
      const keyName = fileName.slice(fileName.lastIndexOf('/') + 1, -5);
      acc[keyName] = fileData;
      return acc;
    },
    {
      ...globalConfig,
      paths: { ...pathConfig },
      env,
    }
  );

  global.settings = settings;
  return settings;
};
