import pathSettings from 'settings/paths';
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
  static init = async () => {
    if (process.env.NODE_ENV === 'production') await Content.update();
    Env.setup();
  };

  /**
   * Sets up the global environment variables, so that they are available everywhere.
   * Make sure this is the first thing your code runs before executing anything requiring
   * global variables.
   * If this is the first time you are setting up, use `init` instead.
   */
  static setup = () => {
    const boundLog = Logger.bind('utilities.env.setup');
    boundLog(
      `Setting up environment in "${process.env.NODE_ENV}" mode.`,
      'info'
    );
    const configs = JSONParser.fromGlob(
      `${pathSettings.rawContentPath}/configs/repos/*.json`
    ).map(cfg => new ContentConfig(cfg));
    boundLog('Finished loading settings and configuration files.', 'success');
    boundLog(`Loaded ${configs.length} config files.`, 'success');
  };
}
