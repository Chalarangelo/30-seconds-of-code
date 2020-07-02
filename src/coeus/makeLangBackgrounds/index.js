import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import { hasKeys } from 'utils';
import logger from '../logOutput';

const generateBgStyles = async(inPath, outPath, boundLog) => {
  boundLog(`Loading individual configuration files in ${path.resolve(inPath, 'configs')}`, 'info');
  let configs = [];
  if(global._coeus_instance.contentConfigs) {
    configs = global._coeus_instance.contentConfigs;
    boundLog(`Using already loaded configuration files`, 'success');
  } else {
    glob.sync(`${inPath}/configs/*.json`)
      .forEach( file => {
        configs.push(
          require( path.resolve( file ) )
        );
      });
    global._coeus_instance.contentConfigs = configs;
    boundLog(`Loaded ${configs.length} configuration files`, 'success');
  }

  boundLog(`Generating SCSS code from configuration files`, 'success');
  const scss = configs
    .map(cfg => cfg.theme)
    .filter(Boolean)
    .reduce((acc, cfg) => `${acc}
    .card-icon.icon-${cfg.iconName}, .btn.icon-${cfg.iconName} {
      background: ${cfg.backColor};
      color: ${cfg.foreColor};
    }
    `, '');

  boundLog(`Writing SCSS code to ${path.resolve(outPath)}`, 'info');
  fs.writeFileSync(outPath, scss);
  boundLog('Generating language background styles complete', 'success');

  return;
};

const makeLanguageBgs = async() => {
  const boundLog = logger.bindProcessLogger('makeLanguageBgs');
  if(typeof global._coeus_instance === 'undefined' || typeof global._coeus_instance.config === 'undefined')
    return logger.log('Fatal error: coeus instance or config not found. Exiting...', 'error');

  const config = global._coeus_instance.config;
  boundLog('Generating language background styles from config...', 'info');

  if (hasKeys(config.paths, ['rawContentPath', 'iconBgFilePath']))
    await generateBgStyles(config.paths.rawContentPath, config.paths.iconBgFilePath, boundLog);

};

export default makeLanguageBgs;
