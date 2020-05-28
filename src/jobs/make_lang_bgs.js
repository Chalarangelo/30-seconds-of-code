import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';
const paths = require('config/paths');

/**
 * Read content configs, generating the SCSS code for their preview card icons.
 */
const parseConfigs = contentDirPath => {
  // Load configurations
  let configs = [];
  glob.sync(`${contentDirPath}/configs/*.json`)
    .forEach( file => {
      configs.push(
        require( path.resolve( file ) )
      );
    });
  const scss = configs
    .map(cfg => cfg.theme)
    .filter(Boolean)
    .reduce((acc, cfg) => `${acc}
    .card-icon.icon-${cfg.iconName}, .btn.icon-${cfg.iconName} {
      background: ${cfg.backColor};
      color: ${cfg.foreColor};
    }
    `, '');
  fs.writeFileSync(`${__dirname}/../../src/styles/_icon_colors.scss`, scss);
};

parseConfigs(paths.contentPath);
