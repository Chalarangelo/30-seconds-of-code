import { globSync } from 'glob';
import fs from 'fs-extra';
import * as sass from 'sass';
import settings from '#src/config/settings.js';

export default class ContentComponents {
  static prepare() {
    // 1. Copy scripts
    this.copyScripts();

    // 2. Process styles
    this.processStyles();
  }

  static copyScripts = () => {
    const scriptsPath = `${settings.paths.contentComponentsDirectory}/scripts`;
    const scriptsDestPath = `${settings.paths.out.contentComponents}/scripts`;

    fs.cpSync(scriptsPath, scriptsDestPath, { recursive: true, force: true });
  };

  static processStyles = () => {
    const stylesPath = `${settings.paths.contentComponentsDirectory}/styles`;
    const stylesDestPath = `${settings.paths.out.contentComponents}/styles`;

    // Create the destination directory if it doesn't exist
    fs.ensureDirSync(stylesDestPath);

    // Find all .scss files in the source directory
    const scssFiles = globSync(`${stylesPath}/**/*.scss`);

    // Process each .scss file
    scssFiles.forEach(file => {
      const result = sass.compile(file);
      const destFile = file
        .replace(stylesPath, stylesDestPath)
        .replace(/\.scss$/, '.css');
      fs.outputFileSync(destFile, result.css);
    });
  };
}
