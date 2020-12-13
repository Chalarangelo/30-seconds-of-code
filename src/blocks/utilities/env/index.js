import globalConfig from 'settings/global';
import pathConfig from 'settings/paths';
import { JSONParser } from 'blocks/parsers/json';
import { ContentConfig } from 'blocks/entities/contentConfig';
import { Logger } from 'blocks/utilities/logger';

/**
 * Sets up the global environment variables, so that they are available everywhere.
 * Make sure this is the first thing your code runs before executing anything requiring
 * global variables.
 */
export const setupEnv = (env = 'PRODUCTION') => {
  const boundLog = Logger.bind('utilities.env.setupEnv');
  boundLog(`Setting up environment in "${env}" mode.`, 'info');
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
      configs: JSONParser.fromGlob(
        `${pathConfig.rawContentPath}/configs/*.json`
      ).map(cfg => new ContentConfig(cfg)),
      env,
    }
  );
  boundLog('Finished loading settings and configuration files.', 'success');
  boundLog(`Loaded ${settings.configs.length} config files.`, 'success');

  global.settings = settings;
  return settings;
};
