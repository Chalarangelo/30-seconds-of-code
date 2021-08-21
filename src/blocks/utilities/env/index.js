import globalConfig from 'settings/global';
import pathConfig from 'settings/paths';
import { JSONParser } from 'blocks/parsers/json';
import { ContentConfig } from 'blocks/entities/contentConfig';
import { Logger } from 'blocks/utilities/logger';
import { Content } from 'blocks/utilities/content';

/**
 * Environment setup utility.
 */
export class Env {
  /**
   * Sets up the global environment variables, so that they are available everywhere.
   * Make sure this is the first thing your code runs before executing anything requiring
   * global variables.
   * Use this only the first time you are setting up, otherwise prefer `setup`.
   */
  static init = async (env = 'PRODUCTION') => {
    if (env === 'PRODUCTION') await Content.update();
    return Env.setup(env);
  };

  /**
   * Sets up the global environment variables, so that they are available everywhere.
   * Make sure this is the first thing your code runs before executing anything requiring
   * global variables.
   * If this is the first time you are setting up, use `init` instead.
   */
  static setup = (env = 'PRODUCTION') => {
    const boundLog = Logger.bind('utilities.env.setup');
    boundLog(`Setting up environment in "${env}" mode.`, 'info');
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
          `${pathConfig.rawContentPath}/configs/repos/*.json`
        ).map(cfg => new ContentConfig(cfg)),
        env,
      }
    );
    boundLog('Finished loading settings and configuration files.', 'success');
    boundLog(`Loaded ${settings.configs.length} config files.`, 'success');

    global.settings = settings;
    return settings;
  };
}
