import fs from 'fs-extra';
import path from 'path';
import { initAction, loadContentConfigs } from '../core';

/**
 * Generate a SCSS file with the language background styles.
 */
const makeLanguageBgs = async() => {
  const [boundLog, , inPath, outPath] = initAction('makeLanguageBgs', [
    ['paths', 'rawContentPath'], ['paths', 'iconBgFilePath'],
  ]);
  boundLog('Generating language background styles from config...', 'info');

  const configs = loadContentConfigs(inPath, boundLog);
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
  await fs.writeFile(outPath, scss);
  boundLog('Generating language background styles complete', 'success');

  return;
};

export default makeLanguageBgs;
